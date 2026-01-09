---
title: Installation
description: Install RAPS CLI using several methods. Choose the one that best fits your needs.
sidebar:
  order: 1
---

RAPS CLI can be installed using several methods. Choose the one that best fits your needs.

## Package Managers

### Cargo (Rust)

If you have Rust installed, this is the easiest method:

```bash
cargo install raps
```

**Requirements:** [Rust 1.70+ (rustup.rs)](https://rustup.rs)

### Homebrew (macOS/Linux)

```bash
brew tap dmytro-yemelianov/raps
brew install raps
```

### Scoop (Windows)

```bash
scoop bucket add raps https://github.com/dmytro-yemelianov/scoop-bucket
scoop install raps
```

### npm (Node.js)

```bash
npm install -g @raps/cli
```

### Docker

```bash
docker run --rm -it ghcr.io/dmytro-yemelianov/raps:latest
```

## Download Binaries

Download pre-built binaries from [GitHub Releases](https://github.com/dmytro-yemelianov/raps/releases/latest):

- [Windows x64](https://github.com/dmytro-yemelianov/raps/releases/latest/download/raps-windows-x64.zip)
- [macOS ARM64](https://github.com/dmytro-yemelianov/raps/releases/latest/download/raps-macos-arm64.tar.gz)
- [macOS Intel](https://github.com/dmytro-yemelianov/raps/releases/latest/download/raps-macos-x64.tar.gz)
- [Linux x64](https://github.com/dmytro-yemelianov/raps/releases/latest/download/raps-linux-x64.tar.gz)

## Verify Installation

```bash
raps --version
```

You should see output like:
```
raps 3.2.0
```

## What's Next?

- [Configuration Guide](/getting-started/configuration/) - Set up your APS credentials
- [Quick Start Tutorial](/getting-started/quick-start/) - Upload your first model
- [Shell Completions](/getting-started/shell-completions/) - Enable TAB completion