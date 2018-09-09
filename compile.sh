#! /bin/bash

set -eu

browserify js/partition.js -o tmp.js
uglifyjs tmp.js -o partitioning.js --compress --mangle

rm tmp.js
