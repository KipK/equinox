#!/usr/bin/env node
import { gzipSync } from "node:zlib";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const DIST_DIR = resolve("dist");
const COMPRESS_EXTENSIONS = new Set([".js"]);

function gzipFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      gzipFiles(path);
      continue;
    }

    if (!COMPRESS_EXTENSIONS.has(extname(path))) continue;

    const source = readFileSync(path);
    const compressed = gzipSync(source, { level: 9 });
    writeFileSync(`${path}.gz`, compressed);
  }
}

gzipFiles(DIST_DIR);
