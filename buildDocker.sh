#!/usr/bin/env bash
set -e

SECONDS=0 # start timer

echo "Start build in docker image";
docker build -t dcatno/registration-react:latest .

echo "SECONDS"
echo $SECONDS
