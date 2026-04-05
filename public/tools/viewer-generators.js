const TAU = Math.PI * 2;

function vec(x = 0, y = 0, z = 0) {
  return [x, y, z];
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(a, value) {
  return [a[0] * value, a[1] * value, a[2] * value];
}

function length(a) {
  return Math.hypot(a[0], a[1], a[2]);
}

function normalize(a) {
  const len = length(a) || 1;
  return [a[0] / len, a[1] / len, a[2] / len];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function midpoint(a, b) {
  return [(a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5];
}

function orthonormalBasis(direction) {
  const forward = normalize(direction);
  const reference = Math.abs(forward[1]) < 0.9 ? vec(0, 1, 0) : vec(1, 0, 0);
  const side = normalize(cross(reference, forward));
  const up = normalize(cross(forward, side));
  return { forward, side, up };
}

function rotateBranch(direction, yaw, pitch) {
  const { forward, side, up } = orthonormalBasis(direction);
  return normalize(add(
    scale(forward, Math.cos(pitch)),
    add(
      scale(side, Math.sin(pitch) * Math.cos(yaw)),
      scale(up, Math.sin(pitch) * Math.sin(yaw)),
    ),
  ));
}

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = Math.imul(value ^ (value >>> 15), value | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function format(value) {
  if (Math.abs(value) < 1e-6) {
    return '0';
  }

  return value.toFixed(3);
}

class ObjBuilder {
  constructor(name) {
    this.name = name;
    this.vertices = [];
    this.faces = [];
  }

  addVertex(point) {
    this.vertices.push(point);
    return this.vertices.length;
  }

  addTriangle(a, b, c) {
    this.faces.push([a, b, c]);
  }

  addQuad(a, b, c, d) {
    this.addTriangle(a, b, c);
    this.addTriangle(a, c, d);
  }

  addBox(center, size) {
    const [cx, cy, cz] = center;
    const [hx, hy, hz] = scale(size, 0.5);

    const vertices = [
      this.addVertex([cx - hx, cy - hy, cz - hz]),
      this.addVertex([cx + hx, cy - hy, cz - hz]),
      this.addVertex([cx + hx, cy + hy, cz - hz]),
      this.addVertex([cx - hx, cy + hy, cz - hz]),
      this.addVertex([cx - hx, cy - hy, cz + hz]),
      this.addVertex([cx + hx, cy - hy, cz + hz]),
      this.addVertex([cx + hx, cy + hy, cz + hz]),
      this.addVertex([cx - hx, cy + hy, cz + hz]),
    ];

    this.addQuad(vertices[0], vertices[1], vertices[2], vertices[3]);
    this.addQuad(vertices[4], vertices[7], vertices[6], vertices[5]);
    this.addQuad(vertices[0], vertices[4], vertices[5], vertices[1]);
    this.addQuad(vertices[1], vertices[5], vertices[6], vertices[2]);
    this.addQuad(vertices[2], vertices[6], vertices[7], vertices[3]);
    this.addQuad(vertices[4], vertices[0], vertices[3], vertices[7]);
  }

  addCylinder(start, end, radiusStart, radiusEnd = radiusStart, segments = 10, options = {}) {
    const { capStart = true, capEnd = true } = options;
    const direction = sub(end, start);
    if (length(direction) < 1e-6) {
      return;
    }

    const { side, up } = orthonormalBasis(direction);
    const ringStart = [];
    const ringEnd = [];

    for (let i = 0; i < segments; i += 1) {
      const angle = (i / segments) * TAU;
      const radial = add(scale(side, Math.cos(angle)), scale(up, Math.sin(angle)));
      ringStart.push(this.addVertex(add(start, scale(radial, radiusStart))));
      ringEnd.push(this.addVertex(add(end, scale(radial, radiusEnd))));
    }

    for (let i = 0; i < segments; i += 1) {
      const next = (i + 1) % segments;
      this.addQuad(ringStart[i], ringStart[next], ringEnd[next], ringEnd[i]);
    }

    if (capStart) {
      const center = this.addVertex(start);
      for (let i = 0; i < segments; i += 1) {
        const next = (i + 1) % segments;
        this.addTriangle(center, ringStart[i], ringStart[next]);
      }
    }

    if (capEnd) {
      const center = this.addVertex(end);
      for (let i = 0; i < segments; i += 1) {
        const next = (i + 1) % segments;
        this.addTriangle(center, ringEnd[next], ringEnd[i]);
      }
    }
  }

  addOctahedron(center, radius) {
    const [cx, cy, cz] = center;
    const top = this.addVertex([cx, cy + radius, cz]);
    const bottom = this.addVertex([cx, cy - radius, cz]);
    const east = this.addVertex([cx + radius, cy, cz]);
    const west = this.addVertex([cx - radius, cy, cz]);
    const north = this.addVertex([cx, cy, cz - radius]);
    const south = this.addVertex([cx, cy, cz + radius]);

    this.addTriangle(top, east, north);
    this.addTriangle(top, south, east);
    this.addTriangle(top, west, south);
    this.addTriangle(top, north, west);
    this.addTriangle(bottom, north, east);
    this.addTriangle(bottom, east, south);
    this.addTriangle(bottom, south, west);
    this.addTriangle(bottom, west, north);
  }

  addWindowPane(center, size) {
    this.addBox(center, [size[0], size[1], Math.max(size[2], 0.06)]);
  }

  addLeafCluster(center, size, rng, clusters = 3) {
    for (let i = 0; i < clusters; i += 1) {
      const offset = [
        (rng() - 0.5) * size * 0.8,
        (rng() - 0.35) * size * 0.6,
        (rng() - 0.5) * size * 0.8,
      ];
      this.addOctahedron(add(center, offset), size * (0.55 + rng() * 0.35));
    }
  }

  toModel(metadata = {}) {
    const header = [
      `# Generated model: ${this.name}`,
      `# vertices=${this.vertices.length} triangles=${this.faces.length}`,
    ];

    for (const [key, value] of Object.entries(metadata)) {
      header.push(`# ${key}=${value}`);
    }

    const lines = [
      ...header,
      `o ${this.name}`,
      ...this.vertices.map((point) => `v ${format(point[0])} ${format(point[1])} ${format(point[2])}`),
      ...this.faces.map((face) => `f ${face[0]} ${face[1]} ${face[2]}`),
    ];

    return {
      name: this.name,
      obj: `${lines.join('\n')}\n`,
      metadata: {
        ...metadata,
        vertexCount: this.vertices.length,
        triangleCount: this.faces.length,
      },
    };
  }
}

function addTerrainMesh(builder, origin, spec) {
  const { grid, layers, span, amplitude } = spec;
  const row = grid + 1;
  const layerOffsets = [];

  for (let layer = 0; layer < layers; layer += 1) {
    layerOffsets.push(builder.vertices.length + 1);
    for (let y = 0; y <= grid; y += 1) {
      const v = y / grid;
      const pz = origin[2] + (v - 0.5) * span;
      for (let x = 0; x <= grid; x += 1) {
        const u = x / grid;
        const px = origin[0] + (u - 0.5) * span;
        const ridge = Math.sin(u * Math.PI * 10 + layer * 0.45) * amplitude * 0.42;
        const swell = Math.cos(v * Math.PI * 7 - layer * 0.35) * amplitude * 0.28;
        const diagonal = Math.sin((u + v) * Math.PI * 6) * amplitude * 0.18;
        const crater = Math.cos(Math.hypot(u - 0.5, v - 0.5) * Math.PI * 3.25) * amplitude * 0.16;
        const terrace = (layer - (layers - 1) / 2) * (amplitude * 0.4);
        builder.addVertex([px, origin[1] + terrace + ridge + swell + diagonal + crater, pz]);
      }
    }
  }

  for (let layer = 0; layer < layers; layer += 1) {
    const offset = layerOffsets[layer];
    for (let y = 0; y < grid; y += 1) {
      for (let x = 0; x < grid; x += 1) {
        const a = offset + y * row + x;
        const b = a + 1;
        const c = a + row;
        const d = c + 1;
        builder.addTriangle(a, b, d);
        builder.addTriangle(a, d, c);
      }
    }
  }
}

function addValve(builder, center, axis, radius) {
  const direction = normalize(axis);
  const start = add(center, scale(direction, -0.42));
  const end = add(center, scale(direction, 0.42));
  builder.addCylinder(start, end, radius * 1.15, radius * 1.15, 10);
  builder.addBox(center, [radius * 2.7, radius * 1.8, radius * 1.8]);
  builder.addCylinder(add(center, vec(0, radius * 0.95, 0)), add(center, vec(0, radius * 2.3, 0)), radius * 0.18, radius * 0.12, 8);
  builder.addOctahedron(add(center, vec(0, radius * 2.75, 0)), radius * 0.72);
}

function addPipeRackAssembly(builder, origin = vec(0, 0, 0)) {
  const spanX = 10;
  const bayX = 8;
  const rackWidth = 16;
  const supportHeight = 8.5;
  const startX = origin[0] - (spanX * bayX) / 2;
  const pipeRuns = [
    { y: origin[1] + 6.0, z: origin[2] - 5.4, radius: 0.24 },
    { y: origin[1] + 5.45, z: origin[2] - 2.7, radius: 0.18 },
    { y: origin[1] + 6.55, z: origin[2] - 0.2, radius: 0.28 },
    { y: origin[1] + 5.9, z: origin[2] + 2.5, radius: 0.2 },
    { y: origin[1] + 6.4, z: origin[2] + 5.1, radius: 0.16 },
  ];

  for (let ix = 0; ix <= spanX; ix += 1) {
    const x = startX + ix * bayX;
    builder.addBox([x, origin[1] + supportHeight / 2, origin[2] - rackWidth / 2], [0.32, supportHeight, 0.32]);
    builder.addBox([x, origin[1] + supportHeight / 2, origin[2] + rackWidth / 2], [0.32, supportHeight, 0.32]);
    builder.addBox([x, origin[1] + supportHeight + 0.2, origin[2]], [0.24, 0.24, rackWidth + 1.1]);
    builder.addBox([x, origin[1] + supportHeight + 0.05, origin[2]], [0.6, 0.35, rackWidth + 0.4]);
    if (ix < spanX) {
      builder.addBox([x + bayX * 0.5, origin[1] + 4.5, origin[2] + 0.8], [bayX, 0.16, 2.4]);
    }
  }

  for (const run of pipeRuns) {
    for (let ix = 0; ix < spanX; ix += 1) {
      const x0 = startX + ix * bayX;
      const x1 = x0 + bayX;
      builder.addCylinder([x0, run.y, run.z], [x1, run.y, run.z], run.radius, run.radius, 12);
      const flangeCenter = [x0 + bayX * 0.5, run.y, run.z];
      builder.addCylinder(
        add(flangeCenter, vec(-0.18, 0, 0)),
        add(flangeCenter, vec(0.18, 0, 0)),
        run.radius * 1.18,
        run.radius * 1.18,
        12,
      );
    }
  }

  for (const ix of [2, 5, 8]) {
    const x = startX + ix * bayX;
    builder.addCylinder([x, origin[1] + 6.25, origin[2] - 5.4], [x, origin[1] + 6.25, origin[2] + 5.1], 0.14, 0.14, 10);
    builder.addOctahedron([x, origin[1] + 6.25, origin[2]], 0.36);
  }

  const risers = [
    [startX + bayX * 1.5, origin[2] - 5.4, 5.45],
    [startX + bayX * 4.5, origin[2] + 2.5, 5.9],
    [startX + bayX * 7.5, origin[2] + 5.1, 6.4],
  ];

  for (const [x, z, topY] of risers) {
    builder.addCylinder([x, origin[1] + 0.25, z], [x, origin[1] + topY, z], 0.13, 0.13, 10);
    builder.addOctahedron([x, origin[1] + topY, z], 0.24);
  }

  addValve(builder, [startX + bayX * 3.25, origin[1] + 6.0, origin[2] - 5.4], vec(1, 0, 0), 0.24);
  addValve(builder, [startX + bayX * 6.1, origin[1] + 5.9, origin[2] + 2.5], vec(1, 0, 0), 0.2);
  addValve(builder, [startX + bayX * 4.8, origin[1] + 6.25, origin[2]], vec(0, 0, 1), 0.14);
}

function addFacadeWallWithOpenings(builder, center, size, options) {
  const {
    thickness,
    door = null,
    windowBand = null,
    axis = 'x',
    depthOffset = 0,
  } = options;
  const [cx, cy, cz] = center;
  const [width, height] = size;
  const widthHalf = width * 0.5;
  const heightHalf = height * 0.5;

  const addPanel = (centerX, centerY, panelWidth, panelHeight) => {
    if (panelWidth <= 0.02 || panelHeight <= 0.02) {
      return;
    }

    if (axis === 'x') {
      builder.addBox([centerX, centerY, cz], [panelWidth, panelHeight, thickness]);
    } else {
      builder.addBox([cx, centerY, centerX], [thickness, panelHeight, panelWidth]);
    }
  };

  if (door) {
    const leftWidth = door.center - door.width * 0.5 + widthHalf;
    const rightWidth = widthHalf - (door.center + door.width * 0.5);
    addPanel(cx - widthHalf + leftWidth * 0.5, cy, leftWidth, height);
    addPanel(cx + widthHalf - rightWidth * 0.5, cy, rightWidth, height);
    addPanel(cx + door.center, cy + (heightHalf - door.height) * 0.5 + door.height * 0.5, door.width, height - door.height);
    if (axis === 'x') {
      builder.addBox([cx + door.center, cy - heightHalf + door.height * 0.5, cz + depthOffset], [door.width * 0.84, door.height * 0.96, thickness * 0.32]);
    } else {
      builder.addBox([cx + depthOffset, cy - heightHalf + door.height * 0.5, cz + door.center], [thickness * 0.32, door.height * 0.96, door.width * 0.84]);
    }
    return;
  }

  if (windowBand) {
    const topHeight = heightHalf - (windowBand.sill + windowBand.height);
    addPanel(cx, cy - heightHalf + windowBand.sill * 0.5, width, windowBand.sill);
    addPanel(cx, cy + windowBand.sill + windowBand.height + topHeight * 0.5 - heightHalf, width, topHeight);

    const bayWidth = width / windowBand.bays;
    for (let bay = 0; bay <= windowBand.bays; bay += 1) {
      const line = cx - widthHalf + bay * bayWidth;
      addPanel(line, cy, windowBand.mullion, height);
    }

    for (let bay = 0; bay < windowBand.bays; bay += 1) {
      const line = cx - widthHalf + bay * bayWidth;
      const paneWidth = bayWidth - windowBand.mullion * 1.8;
      const paneCenter = line + bayWidth * 0.5;
      if (axis === 'x') {
        builder.addWindowPane(
          [paneCenter, cy - heightHalf + windowBand.sill + windowBand.height * 0.5, cz + depthOffset],
          [paneWidth, windowBand.height, thickness * 0.2],
        );
      } else {
        builder.addWindowPane(
          [cx + depthOffset, cy - heightHalf + windowBand.sill + windowBand.height * 0.5, paneCenter],
          [thickness * 0.2, windowBand.height, paneWidth],
        );
      }
    }
    return;
  }

  if (axis === 'x') {
    builder.addBox([cx, cy, cz], [width, height, thickness]);
  } else {
    builder.addBox([cx, cy, cz], [thickness, height, width]);
  }
}

function addBuildingAssembly(builder, origin = vec(0, 0, 0), options = {}) {
  const floors = options.floors ?? 8;
  const width = options.width ?? 34;
  const depth = options.depth ?? 22;
  const floorHeight = 3.9;
  const slabThickness = 0.34;
  const wallThickness = 0.28;
  const podiumWidth = width + 12;
  const podiumDepth = depth + 8;
  const totalHeight = floors * floorHeight;

  builder.addBox([origin[0], origin[1] - 0.2, origin[2]], [podiumWidth + 22, 0.4, podiumDepth + 22]);

  for (let floor = 0; floor <= floors; floor += 1) {
    const y = origin[1] + floor * floorHeight;
    builder.addBox([origin[0], y, origin[2]], [width, slabThickness, depth]);
  }

  builder.addBox([origin[0], origin[1] + floorHeight * 0.5, origin[2] + depth * 0.55], [podiumWidth, floorHeight, podiumDepth]);
  builder.addBox([origin[0] - width * 0.34, origin[1] + floorHeight * 0.52, origin[2] - depth * 0.62], [width * 0.42, floorHeight * 1.05, depth * 0.5]);
  builder.addBox([origin[0], origin[1] + totalHeight * 0.5, origin[2]], [8.6, totalHeight + slabThickness, 7.4]);

  for (let floor = 0; floor < floors; floor += 1) {
    const centerY = origin[1] + floor * floorHeight + slabThickness * 0.5 + (floorHeight - slabThickness) * 0.5;

    addFacadeWallWithOpenings(builder, [origin[0], centerY, origin[2] + depth * 0.5 - wallThickness * 0.5], [width, floorHeight - slabThickness], {
      thickness: wallThickness,
      axis: 'x',
      depthOffset: wallThickness * 0.2,
      door: floor === 0 ? { center: 0, width: 3.8, height: 2.8 } : null,
      windowBand: floor === 0 ? null : { sill: 0.8, height: 2.15, bays: 7, mullion: 0.14 },
    });

    addFacadeWallWithOpenings(builder, [origin[0], centerY, origin[2] - depth * 0.5 + wallThickness * 0.5], [width, floorHeight - slabThickness], {
      thickness: wallThickness,
      axis: 'x',
      depthOffset: -wallThickness * 0.2,
      windowBand: { sill: 0.9, height: 2.05, bays: 7, mullion: 0.14 },
    });

    addFacadeWallWithOpenings(builder, [origin[0] - width * 0.5 + wallThickness * 0.5, centerY, origin[2]], [depth, floorHeight - slabThickness], {
      thickness: wallThickness,
      axis: 'z',
      depthOffset: -wallThickness * 0.2,
      windowBand: { sill: 0.95, height: 1.95, bays: 5, mullion: 0.14 },
    });

    addFacadeWallWithOpenings(builder, [origin[0] + width * 0.5 - wallThickness * 0.5, centerY, origin[2]], [depth, floorHeight - slabThickness], {
      thickness: wallThickness,
      axis: 'z',
      depthOffset: wallThickness * 0.2,
      windowBand: { sill: 0.95, height: 1.95, bays: 5, mullion: 0.14 },
    });
  }

  builder.addBox([origin[0], origin[1] + totalHeight + 0.6, origin[2]], [width + 1.2, 1.2, 0.35]);
  builder.addBox([origin[0], origin[1] + totalHeight + 0.6, origin[2] - depth * 0.5], [width + 1.2, 1.2, 0.35]);
  builder.addBox([origin[0] - width * 0.5, origin[1] + totalHeight + 0.6, origin[2]], [0.35, 1.2, depth + 1.2]);
  builder.addBox([origin[0] + width * 0.5, origin[1] + totalHeight + 0.6, origin[2]], [0.35, 1.2, depth + 1.2]);

  builder.addBox([origin[0], origin[1] + totalHeight + 1.6, origin[2]], [8.4, 1.6, 7.2]);
  builder.addBox([origin[0] - 5.2, origin[1] + totalHeight + 1.3, origin[2] + 3.8], [2.5, 1.0, 2.0]);
  builder.addBox([origin[0] + 5.6, origin[1] + totalHeight + 1.3, origin[2] - 3.2], [3.2, 1.0, 2.4]);
  builder.addBox([origin[0], origin[1] + 2.1, origin[2] + depth * 0.5 + 1.2], [7.6, 0.26, 2.8]);
}

function addBranch(builder, start, direction, lengthValue, radius, depth, rng) {
  const branchEnd = add(start, scale(direction, lengthValue));
  builder.addCylinder(start, branchEnd, radius, Math.max(radius * 0.74, 0.03), depth > 0 ? 8 : 7, { capStart: depth === 3 });

  if (depth <= 0) {
    builder.addLeafCluster(branchEnd, radius * 6.2, rng, 4);
    return;
  }

  const childCount = depth >= 2 ? 3 : 2;
  for (let index = 0; index < childCount; index += 1) {
    const yaw = (index / childCount) * TAU + rng() * 0.55;
    const pitch = 0.55 + rng() * 0.5;
    const childDirection = rotateBranch(direction, yaw, pitch);
    addBranch(
      builder,
      branchEnd,
      childDirection,
      lengthValue * (0.56 + rng() * 0.12),
      radius * (0.64 + rng() * 0.08),
      depth - 1,
      rng,
    );
  }
}

function addTree(builder, origin, rng, scaleValue = 1) {
  const trunkHeight = (5.5 + rng() * 2.8) * scaleValue;
  const trunkRadius = (0.24 + rng() * 0.12) * scaleValue;
  const leanDirection = normalize([rng() - 0.5, 0.15 + rng() * 0.1, rng() - 0.5]);
  const trunkEnd = add(origin, scale(leanDirection, trunkHeight));

  builder.addCylinder(origin, trunkEnd, trunkRadius * 1.18, trunkRadius * 0.82, 10);
  addBranch(builder, add(origin, scale(leanDirection, trunkHeight * 0.46)), rotateBranch(leanDirection, 0.4, 0.72), trunkHeight * 0.46, trunkRadius * 0.58, 2, rng);
  addBranch(builder, add(origin, scale(leanDirection, trunkHeight * 0.55)), rotateBranch(leanDirection, 2.4, 0.78), trunkHeight * 0.42, trunkRadius * 0.54, 2, rng);
  addBranch(builder, add(origin, scale(leanDirection, trunkHeight * 0.68)), rotateBranch(leanDirection, 4.7, 0.85), trunkHeight * 0.36, trunkRadius * 0.44, 1, rng);
  addBranch(builder, trunkEnd, rotateBranch(leanDirection, rng() * TAU, 0.52), trunkHeight * 0.28, trunkRadius * 0.36, 1, rng);
}

function addForestAssembly(builder, origin = vec(0, 0, 0), options = {}) {
  const seed = options.seed ?? 17;
  const treeCount = options.treeCount ?? 34;
  const area = options.area ?? 78;
  const rng = mulberry32(seed);

  addTerrainMesh(builder, origin, {
    grid: 48,
    layers: 1,
    span: area,
    amplitude: 1.9,
  });

  builder.addBox([origin[0], origin[1] + 0.18, origin[2] - 10], [area * 0.62, 0.12, 3.8]);

  for (let i = 0; i < treeCount; i += 1) {
    const x = origin[0] + (rng() - 0.5) * (area - 12);
    const z = origin[2] + (rng() - 0.5) * (area - 12);
    const distanceToPath = Math.abs(z - (origin[2] - 10));
    if (distanceToPath < 4.5 && Math.abs(x - origin[0]) < area * 0.24) {
      continue;
    }

    addTree(builder, [x, origin[1] + 0.25, z], rng, 0.9 + rng() * 0.4);
  }

  for (let i = 0; i < 12; i += 1) {
    builder.addOctahedron(
      [
        origin[0] + (rng() - 0.5) * (area - 10),
        origin[1] + 0.65 + rng() * 0.45,
        origin[2] + (rng() - 0.5) * (area - 10),
      ],
      0.45 + rng() * 0.6,
    );
  }
}

export function buildPipeRackModel() {
  const builder = new ObjBuilder('pipe-rack-and-fittings');
  addPipeRackAssembly(builder, vec(0, 0, 0));
  return builder.toModel({
    category: 'pipes',
    summary: 'Straight runs, valves, tees, risers, and support steel',
  });
}

export function buildBuildingModel() {
  const builder = new ObjBuilder('building-shell-and-core');
  addBuildingAssembly(builder, vec(0, 0.2, 0), { floors: 9 });
  return builder.toModel({
    category: 'building',
    summary: 'Walls, slabs, lobby doors, curtain windows, parapets, and rooftop units',
  });
}

export function buildForestModel() {
  const builder = new ObjBuilder('forest-grove');
  addForestAssembly(builder, vec(0, 0, 0), { treeCount: 36, seed: 23, area: 92 });
  return builder.toModel({
    category: 'forest',
    summary: 'Recursive trunks and branches with clustered leaf masses over rolling terrain',
  });
}

export function buildCampusModel() {
  const builder = new ObjBuilder('mixed-campus');
  addTerrainMesh(builder, vec(0, -0.2, 0), {
    grid: 96,
    layers: 1,
    span: 220,
    amplitude: 4.6,
  });
  addBuildingAssembly(builder, vec(-48, 0.4, -12), { floors: 8, width: 32, depth: 20 });
  addBuildingAssembly(builder, vec(18, 0.4, 42), { floors: 4, width: 22, depth: 16 });
  addPipeRackAssembly(builder, vec(54, 0.2, 10));
  addForestAssembly(builder, vec(-12, 0, 46), { treeCount: 22, seed: 61, area: 86 });
  addForestAssembly(builder, vec(-78, 0, 58), { treeCount: 16, seed: 93, area: 54 });
  builder.addBox([0, 0.25, -34], [130, 0.18, 5.5]);
  builder.addBox([0, 0.18, -34], [132, 0.06, 7.2]);
  builder.addBox([32, 1.0, -8], [14, 2.0, 14]);
  return builder.toModel({
    category: 'campus',
    summary: 'Terrain, buildings, pipe systems, roads, and planted zones',
  });
}
