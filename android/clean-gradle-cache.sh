#!/usr/bin/env bash
# Fixes "Could not read workspace metadata" / corrupted Gradle cache.
# Run from project root: ./android/clean-gradle-cache.sh
# Or from android/: ./clean-gradle-cache.sh

set -e
ANDROID_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ANDROID_DIR"

echo "Stopping Gradle daemons..."
./gradlew --stop 2>/dev/null || true

echo "Removing Gradle user cache (fixes metadata.bin / kotlin-dsl errors)..."
rm -rf "$HOME/.gradle/caches"

echo "Removing project build dirs..."
rm -rf "$ANDROID_DIR/build" "$ANDROID_DIR/.gradle" "$ANDROID_DIR/app/build"

echo "Done. Run: cd $ANDROID_DIR && ./gradlew assembleRelease"
echo "(First run will re-download dependencies.)"
