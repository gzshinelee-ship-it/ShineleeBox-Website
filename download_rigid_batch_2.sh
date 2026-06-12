#!/bin/bash
IMAGE_DIR="images/products"
mkdir -p "$IMAGE_DIR"

# SLF-001
mkdir -p "$IMAGE_DIR/SLF-001_collapsible-magnetic-tote-gift-box"
curl -L "https://sc02.alicdn.com/kf/A72a51f0c85c14071bf862b0c2dfeb8da9.png" -o "$IMAGE_DIR/SLF-001_collapsible-magnetic-tote-gift-box/image_01.png"
curl -L "https://sc02.alicdn.com/kf/Aab74d4d15dbd424da7682c8583aa476cY.png" -o "$IMAGE_DIR/SLF-001_collapsible-magnetic-tote-gift-box/image_02.png"
# Add other angles from zip if needed - I'll just use the main clean ones for now

# SLF-002
mkdir -p "$IMAGE_DIR/SLF-002_large-magnetic-box-ribbon-closure"
curl -L "https://sc02.alicdn.com/kf/A4b69bc0481b942a19a2e858137d437bbA.png" -o "$IMAGE_DIR/SLF-002_large-magnetic-box-ribbon-closure/image_01.png"

# SLF-003
mkdir -p "$IMAGE_DIR/SLF-003_classic-lid-base-rigid-box"
curl -L "https://sc02.alicdn.com/kf/A6e2e128c76354aceb043a2b5b661cf316.png" -o "$IMAGE_DIR/SLF-003_classic-lid-base-rigid-box/image_01.png"

# SLF-004
mkdir -p "$IMAGE_DIR/SLF-004_magnetic-rigid-box-integrated-handle"
curl -L "https://sc02.alicdn.com/kf/A2f0496e59da3469d98d77eebd336228bV.png" -o "$IMAGE_DIR/SLF-004_magnetic-rigid-box-integrated-handle/image_01.png"

# SLF-005
mkdir -p "$IMAGE_DIR/SLF-005_premium-sliding-drawer-rigid-box"
curl -L "https://sc02.alicdn.com/kf/A865b48ea21454d43b90c90e199592caap.png" -o "$IMAGE_DIR/SLF-005_premium-sliding-drawer-rigid-box/image_01.png"

# SLF-006
mkdir -p "$IMAGE_DIR/SLF-006_double-door-butterfly-opening-box"
curl -L "https://sc02.alicdn.com/kf/Ab1a6580dfb3247119f1064cb57850ffci.png" -o "$IMAGE_DIR/SLF-006_double-door-butterfly-opening-box/image_01.png"

echo "Rigid Box Batch 2 Images Downloaded!"
