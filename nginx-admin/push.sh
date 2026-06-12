#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
cd "$REPO_ROOT"

if [ -f "$REPO_ROOT/.env" ]; then
    # shellcheck disable=SC1091
    source "$REPO_ROOT/.env"
fi

: "${APP_VERSION:?APP_VERSION must be set in .env}"
: "${DOCKER_IMAGE:?DOCKER_IMAGE must be set in .env}"

echo "Building ${DOCKER_IMAGE}:${APP_VERSION}"
docker build -t "${DOCKER_IMAGE}:${APP_VERSION}" nginx-admin
docker push "${DOCKER_IMAGE}:${APP_VERSION}"
echo "Done - ${DOCKER_IMAGE}:${APP_VERSION}"
docker run -p 8080:80 "${DOCKER_IMAGE}:${APP_VERSION}"
