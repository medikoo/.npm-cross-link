#!/bin/sh
# husky

# Hook created by Husky
#   Version: 1.3.1
#   At: 2/4/2019, 11:29:30 AM
#   See: https://github.com/typicode/husky#readme

# From npm package
#   Name: husky
#   Directory: /Users/medikoo/npm-packages/tape-index/node_modules/husky
#   Homepage: https://github.com/typicode/husky#readme

scriptPath="node_modules/husky/run.js"
hookName=`basename "$0"`
gitParams="$*"

debug() {
  [ "${HUSKY_DEBUG}" = "true" ] && echo "husky:debug $1"
}

debug "$hookName hook started..."

if ! command -v node >/dev/null 2>&1; then
  echo "Can't find node in PATH, trying to find a node binary on your system"
fi

if [ -f "$scriptPath" ]; then
  # if [ -t 1 ]; then
  #   exec < /dev/tty
  # fi
  if [ -f ~/.huskyrc ]; then
    debug "source ~/.huskyrc"
    source ~/.huskyrc
  fi
  node "$scriptPath" $hookName "$gitParams"
else
  echo "Can't find Husky, skipping $hookName hook"
  echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
fi
