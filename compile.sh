#! /bin/bash

set -eu

browserify -r ./js/partition.js:partition -o tmp.js
uglifyjs tmp.js -o partitioning.js --compress --mangle

rm tmp.js
