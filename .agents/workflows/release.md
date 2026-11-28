# Release

Only the owner publishes. Agents prepare and check; they never commit, tag, push or publish unless the user expressly asks.

## Version locations

- `package.json` `version` and the two `version` fields at the top of `package-lock.json` (root and `packages[""]`); keep all three equal.
- `CHANGELOG.md`: a `## <version>` section per release, newest first. The section of an unreleased version is the one entries are added to; past sections are never edited.
- `hacs.json`: minimum Home Assistant version (`homeassistant`) and minimum HACS version (`hacs`); the README states the same Home Assistant minimum. Raise both together when the code needs a newer Home Assistant API.
- The card has no version string in code.
- `.npmrc` sets `tag-version-prefix=""`: `npm version` creates tags without a `v` prefix, matching the tag pattern below.
- A pre-release carries a suffix (`X.Y.Z-rc.N`); the release workflow ignores it.

## Workflows (`.github/workflows/`)

| File | Trigger | Does |
| --- | --- | --- |
| `.github/workflows/build.yml` | every push to any branch | Node 24, `npm ci`, `npm run build` |
| `.github/workflows/validate.yml` | push, pull request, daily, manual | `hacs/action` with category `plugin` |
| `.github/workflows/release.yml` | push of a tag matching `*.*.*` | skipped when the tag contains `-`; otherwise checks the tag is plain `X.Y.Z`, `npm ci`, `npm run build`, verifies `dist/equinox-card.js` is non-empty, and creates a draft GitHub release with that file attached |

- The release asset is built by CI from the tagged sources, not taken from the committed bundle. The committed `dist/equinox-card.js` is what a manual copy from a branch installs; rebuild and commit it on every branch that changes `src/`, never merge it between branches.
- The draft release is published by the owner. The published version is the tag of the latest non-prerelease release.
- Install channel: HACS or the Home Assistant Marketplace, type dashboard (`plugin`). The README keeps `ha-marketplace:exclude-start` / `exclude-end` markers around the Marketplace badge block; keep them when editing the install section.

## Before a release (checklist)

1. Typecheck, both test files and `npm run build` pass; the bundle is rebuilt from the final sources and committed.
2. Version equal in `package.json` and `package-lock.json`; `CHANGELOG.md` has the section for it, describing user-visible changes only.
3. `README.md` and `docs/regulation-dashboard.md` describe the current behavior; the options and the dashboards listed there match the code (`src/types/config.ts`, `src/data/dashboards/index.ts`).
4. The producer contract fixture and `context/data-contract.md` match the plugin revisions the dashboards were written for; the README and changelog name the minimum VT or plugin versions a dashboard needs.
5. `hacs.json` minimums correct; the validate workflow is green on the branch.
6. `python3 .agents/scripts/check_memory.py` passes; no private context in versioned files.
7. The owner tags `X.Y.Z` (the tag name must be exactly the version) and publishes the draft release after checking the attached `dist/equinox-card.js` asset.
