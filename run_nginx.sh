# #!/bin/bash
# VER=0.3

# # Build the Docker image with nginx
# echo "Building nginx Docker image..."
# docker build  -t fayyazabdulla/nehara-admin:$VER .

# # Run the container
# echo "Running the nginx container on port 80..."
# docker run -p 80:80 fayyazabdulla/nehara-admin:$VER


#!/bin/bash
set -e

# =========================
# Config
# =========================
VER="0.7"
IMAGE_NAME="shurafa28/nehara-admin"
IMAGE_TAG="${IMAGE_NAME}:${VER}"
CONTEXT="."

# =========================
# Info
# =========================
echo "🚀 Building & pushing Docker image"
echo "🏷️  Image: ${IMAGE_TAG}"
echo "🧬 Platforms: linux/amd64, linux/arm64"

# =========================
# Ensure buildx builder
# =========================
docker buildx create --name nehara-builder --use 2>/dev/null || docker buildx use nehara-builder
docker buildx inspect --bootstrap >/dev/null

# =========================
# Build & Push (MULTI-ARCH)
# =========================
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ${IMAGE_TAG} \
  -t ${IMAGE_NAME}:stable \
  --push \
  ${CONTEXT}

# =========================
# Success
# =========================
echo "✅ Image pushed successfully"
echo "🏷️  Version tag : ${IMAGE_TAG}"
echo "🏷️  Stable tag  : ${IMAGE_NAME}:stable"
echo "✅ Supports both amd64 & arm64"

