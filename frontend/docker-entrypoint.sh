#!/bin/bash
set -e

# Create env.js, which collects environment variables beginning with
# "REACT_APP" and then stores them in window._ENV
echo -n "" > ./build/env.js
echo "window._ENV={" >> ./build/env.js
for key in $(compgen -v | grep ^REACT_APP_); do
  echo "$key:'${!key}'," >> ./build/env.js
done
echo "}" >> ./build/env.js

# Start service
exec serve -s build
