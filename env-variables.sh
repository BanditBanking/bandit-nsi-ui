#!/bin/sh

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment
echo "window.env = {" >> ./env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]]; do
  # Split on first equals sign
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  #Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

# Add to config file
# Remove \r from value
echo "  $varname: \"${value//[$'\r']}\"," >> ./env-config.js

done < .env

# Read environment variables beginning with REACT_APP_ and their values and add them to config file
printenv | grep REACT_APP_ | while read -r line || [[ -n "$line" ]]; do
  # Split on first equals sign
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Add to config file
  echo "  $varname: \"$varvalue\"," >> ./env-config.js
done

echo "}" >> ./env-config.js