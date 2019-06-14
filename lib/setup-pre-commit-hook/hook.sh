#!/bin/sh
# husky

# Hook created by Husky
#   Version: 2.4.1
#   At: 6/14/2019, 9:47:18 AM
#   See: https://github.com/typicode/husky#readme

# From
#   Directory: /Users/medikoo/npm-packages/cli-color/node_modules/husky
#   Homepage: https://github.com/typicode/husky#readme

scriptPath="node_modules/husky/run.js"
hookName=`basename "$0"`
gitParams="$*"

debug() {
  if [ "${HUSKY_DEBUG}" = "true" ] || [ "${HUSKY_DEBUG}" = "1" ]; then
    echo "husky:debug $1"
  fi
}

debug "$hookName hook started"

if [ "${HUSKY_SKIP_HOOKS}" = "true" ] || [ "${HUSKY_SKIP_HOOKS}" = "1" ]; then
  debug "HUSKY_SKIP_HOOKS is set to ${HUSKY_SKIP_HOOKS}, skipping hook"
  exit 0
fi


if ! command -v node >/dev/null 2>&1; then
  echo "Info: can't find node in PATH, trying to find a node binary on your system"
fi

if [ -f "$scriptPath" ]; then
  # if [ -t 1 ]; then
  #   exec < /dev/tty
  # fi
  if [ -f ~/.huskyrc ]; then
    debug "source ~/.huskyrc"
    . ~/.huskyrc
  fi
  node "$scriptPath" $hookName "$gitParams"
else
  echo "Can't find Husky, skipping $hookName hook"
  echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
fi
