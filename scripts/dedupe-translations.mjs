#!/usr/bin/env node
// Removes redundant translation keys made obsolete by the case-insensitive + prefix-stripping lookup engine.
// Canonical form: lowercase, then strip leading fan_/swing_ prefix.
// Groups of keys sharing a canonical form are collapsed to the canonical key when all values are identical.
// Divergent groups (conflicting values) are left untouched and reported as warnings.
// Usage: node scripts/dedupe-translations.mjs [--dry-run]

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const LANGS_DIR = resolve(__dir, "../src/localize/languages");
const DRY_RUN = process.argv.includes("--dry-run");

// Returns the canonical form of a translation key.
function toCanonical(key) {
  return key.toLowerCase().replace(/^(fan_|swing_)/, "");
}

/**
 * Recursively deduplicates string-valued keys in a translation object.
 * Returns [deduped object, removed count, warning list].
 * @param {Record<string, unknown>} obj
 * @param {string} path - dot-separated path for warnings
 * @returns {[Record<string, unknown>, number, string[]]}
 */
function dedupeObject(obj, path) {
  // Group string-value keys by canonical form.
  const canonicalGroups = new Map(); // canonical -> [{key, value}]
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string") {
      const c = toCanonical(k);
      if (!canonicalGroups.has(c)) canonicalGroups.set(c, []);
      canonicalGroups.get(c).push({ key: k, value: v });
    }
  }

  // Identify keys to remove and canonical keys to inject when absent.
  const toRemove = new Set();
  const toInject = new Map(); // canonical key -> value (when canonical was absent)
  const warnings = [];
  let removed = 0;

  for (const [c, entries] of canonicalGroups) {
    if (entries.length < 2) continue;

    const values = entries.map((e) => e.value);
    const allEqual = values.every((v) => v === values[0]);

    if (allEqual) {
      const canonicalPresent = entries.some((e) => e.key === c);
      if (!canonicalPresent) {
        toInject.set(c, values[0]);
        for (const { key } of entries) {
          toRemove.add(key);
          removed++;
        }
      } else {
        for (const { key } of entries) {
          if (key !== c) {
            toRemove.add(key);
            removed++;
          }
        }
      }
    } else {
      const detail = entries.map((e) => `"${e.key}": "${e.value}"`).join(", ");
      warnings.push(`  ${path}.${c}: divergent values { ${detail} }`);
    }
  }

  // Reconstruct object preserving original key order.
  const result = {};
  const injected = new Set();

  for (const [k, v] of Object.entries(obj)) {
    if (toRemove.has(k)) {
      // If this key belongs to a group that needs a canonical injection,
      // inject the canonical at the position of the first removed key in the group.
      const c = typeof v === "string" ? toCanonical(k) : null;
      if (c && toInject.has(c) && !injected.has(c)) {
        result[c] = toInject.get(c);
        injected.add(c);
      }
      // Original key is dropped.
    } else if (typeof v === "object" && v !== null) {
      // Recurse into nested namespace.
      const [sub, subRemoved, subWarnings] = dedupeObject(v, `${path}.${k}`);
      result[k] = sub;
      removed += subRemoved;
      warnings.push(...subWarnings);
    } else {
      result[k] = v;
    }
  }

  return [result, removed, warnings];
}

const files = readdirSync(LANGS_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

let anyWarning = false;

for (const file of files) {
  const lang = file.replace(".json", "");
  const filePath = join(LANGS_DIR, file);
  const raw = readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const [deduped, removed, warnings] = dedupeObject(data, lang);

  if (warnings.length > 0) {
    anyWarning = true;
    console.warn(`\nWARNING ${lang}: ${warnings.length} divergent group(s) left untouched:`);
    for (const w of warnings) console.warn(w);
  }

  if (removed === 0) {
    console.log(`${lang}: nothing to remove`);
    continue;
  }

  if (DRY_RUN) {
    console.log(`${lang}: would remove ${removed} key(s) [dry-run]`);
  } else {
    writeFileSync(filePath, JSON.stringify(deduped, null, 2) + "\n", "utf-8");
    console.log(`${lang}: removed ${removed} key(s)`);
  }
}

if (anyWarning) {
  console.warn("\nSome divergent groups were left untouched — review issues.md for details.");
}
