#!/bin/bash
# System environment variables in Next.js with Docker
# source: https://raphaelpralat.medium.com/system-environment-variables-in-next-js-with-docker-1f0754e04cde
# no verbose
set +x
# config
envFilename='.env.production'
nextFolder='./.next/'
function apply_path {
  # read all config file  
  while read line; do    
    # no comment or not empty
    if [ "${line:0:1}" == "#" ] || [ "${line}" == "" ]; then
      continue
    fi
    
    
    # split
    configName="$(cut -d'=' -f1 <<<"$line")"
    configValue="$(cut -d'=' -f2 <<<"$line")"
    # get system env
    envValue=$(env | grep "^$configName=" | grep -oe '[^=]*$');
    
    # echo "Replace: ${configValue} with: ${envValue}"
    # if config found
    if [ -n "$configValue" ] && [ -n "$envValue" ]; then
      # replace all
      echo "Replace: ${configValue} with: ${envValue}"
      find $nextFolder \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#$configValue#$envValue#g"
    fi
  done < $envFilename
}
apply_path
echo "Starting Nextjs"
exec "$@"