#!/bin/bash

# Check if the package name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <package_name> [--save-dev]"
  exit 1
fi

# Get the package name from the first argument
PACKAGE_NAME=$1

# Check if --save-dev flag is provided
SAVE_DEV_FLAG=""
if [ "$2" == "--save-dev" ]; then
  SAVE_DEV_FLAG="--save-dev"
fi

# Loop through all directories in the current directory
for dir in */; do
  # Check if directory name is 'types'
  if [ "${dir}" == "types/" ]; then
    echo "Skipping 'types' directory"
    continue # Skip the 'types' directory
  fi

  if [ -d "$dir" ]; then
    echo "Installing $PACKAGE_NAME in $dir..."

    # Change to the directory
    cd "$dir" || continue

    # Run bun add command
    bun add "$PACKAGE_NAME" $SAVE_DEV_FLAG

    # Go back to the parent directory
    cd ..

    echo "Package $PACKAGE_NAME installed in $dir."
  fi
done

echo "Installation complete in all base directories (except 'types')."
