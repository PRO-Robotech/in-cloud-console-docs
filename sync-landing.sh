#!/bin/bash
set -e

echo "🔄 Updating submodules to latest remote branches..."

# Initialize submodules if not already done
git submodule init

# Update each submodule to the latest remote branch
git submodule update --remote --merge --recursive

# Show status after update
echo "✅ Submodule status:"
git submodule status
