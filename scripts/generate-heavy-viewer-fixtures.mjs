import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FIXTURE_DIR = join(process.cwd(), 'public', 'tools', 'viewer-fixtures');

function heightAt(u, v, layer, layers, amplitude) {
  const ridge = Math.sin(u * Math.PI * 10 + layer * 0.45) * amplitude * 0.42;
  const swell = Math.cos(v * Math.PI * 7 - layer * 0.35) * amplitude * 0.28;
  const diagonal = Math.sin((u + v) * Math.PI * 6) * amplitude * 0.18;
  const crater = Math.cos(Math.hypot(u - 0.5, v - 0.5) * Math.PI * 3.25) * amplitude * 0.16;
  const terrace = (layer - (layers - 1) / 2) * (amplitude * 0.4);
  return terrace + ridge + swell + diagonal + crater;
}

function buildTerrainObj({ name, grid, layers, span, amplitude }) {
  const row = grid + 1;
  const vertexCount = row * row * layers;
  const triangleCount = grid * grid * 2 * layers;
  const lines = new Array(3 + vertexCount + triangleCount);
  let index = 0;

  lines[index++] = `# Generated fixture: ${name}`;
  lines[index++] = `# grid=${grid} layers=${layers} vertices=${vertexCount} triangles=${triangleCount}`;
  lines[index++] = `o ${name}`;

  for (let layer = 0; layer < layers; layer += 1) {
    for (let y = 0; y <= grid; y += 1) {
      const v = y / grid;
      const pz = (v - 0.5) * span;

      for (let x = 0; x <= grid; x += 1) {
        const u = x / grid;
        const px = (u - 0.5) * span;
        const py = heightAt(u, v, layer, layers, amplitude);
        lines[index++] = `v ${px.toFixed(3)} ${py.toFixed(3)} ${pz.toFixed(3)}`;
      }
    }
  }

  let offset = 1;
  for (let layer = 0; layer < layers; layer += 1) {
    for (let y = 0; y < grid; y += 1) {
      for (let x = 0; x < grid; x += 1) {
        const a = offset + y * row + x;
        const b = a + 1;
        const c = a + row;
        const d = c + 1;
        lines[index++] = `f ${a} ${b} ${d}`;
        lines[index++] = `f ${a} ${d} ${c}`;
      }
    }

    offset += row * row;
  }

  return {
    vertexCount,
    triangleCount,
    contents: `${lines.join('\n')}\n`,
  };
}

function writeFixture(spec) {
  const { contents, vertexCount, triangleCount } = buildTerrainObj(spec);
  const objPath = join(FIXTURE_DIR, `${spec.name}.obj`);
  const metaPath = join(FIXTURE_DIR, `${spec.name}.json`);

  writeFileSync(objPath, contents, 'utf8');
  writeFileSync(
    metaPath,
    JSON.stringify({
      name: spec.name,
      grid: spec.grid,
      layers: spec.layers,
      span: spec.span,
      amplitude: spec.amplitude,
      vertexCount,
      triangleCount,
    }, null, 2) + '\n',
    'utf8',
  );

  console.log(`${spec.name}: ${vertexCount.toLocaleString()} vertices, ${triangleCount.toLocaleString()} triangles`);
}

mkdirSync(FIXTURE_DIR, { recursive: true });

writeFixture({
  name: 'heavy-terrain-320',
  grid: 320,
  layers: 2,
  span: 260,
  amplitude: 22,
});
