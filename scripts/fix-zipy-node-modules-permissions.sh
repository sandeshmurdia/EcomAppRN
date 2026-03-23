#!/usr/bin/env bash
# Fixes Zipy EACCES when Xcode/Gradle tries to patch debugid.cjs under node_modules.
#
# Root cause: if npm/yarn was ever run with `sudo`, packages under node_modules can be
# owned by root. Zipy's iOS prepare step then fails with:
#   EACCES: permission denied, open '.../node_modules/zipyai-react-native/.../debugid.cjs'
#
# Fix: reclaim ownership for your user (requires sudo password once per poisoned tree).
#
# Usage (from repo root):
#   npm run fix:zipy-permissions
#   # or:
#   bash scripts/fix-zipy-node-modules-permissions.sh
#
# Best practice: never run `sudo npm install`; use a Node version manager instead.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -d node_modules ]]; then
  echo "node_modules not found. Run npm install from the project root first."
  exit 1
fi

OWNER="$(whoami):staff"
FIXED=0

for pkg in zipyai-react-native zipy-react-native; do
  TARGET="node_modules/${pkg}"
  if [[ ! -d "$TARGET" ]]; then
    continue
  fi
  echo "Fixing ownership of ${TARGET} -> ${OWNER} (sudo may prompt for your password)..."
  sudo chown -R "${OWNER}" "${TARGET}"
  FIXED=1
done

if [[ "$FIXED" -eq 0 ]]; then
  echo "No zipy packages found under node_modules (zipyai-react-native / zipy-react-native)."
  exit 0
fi

echo "Done. Re-run your iOS archive or Android release build."
