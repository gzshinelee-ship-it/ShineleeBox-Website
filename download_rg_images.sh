#!/bin/bash
IMAGE_DIR="images/products"
mkdir -p "$IMAGE_DIR"

# 1. Miswak Sleeves
mkdir -p "$IMAGE_DIR/RG-001_breathable-paper-miswak-sleeves"
curl -L "https://sc02.alicdn.com/kf/A495f0127745b448eb15e12bcb4fe65dfF.png" -o "$IMAGE_DIR/RG-001_breathable-paper-miswak-sleeves/image_01.png"

# 2. Hajj Tracking Cards
mkdir -p "$IMAGE_DIR/RG-002_hajj-umrah-tracking-cards"
curl -L "https://sc02.alicdn.com/kf/A16f3ce0bc78146af9e00b5b3eea246d09.png" -o "$IMAGE_DIR/RG-002_hajj-umrah-tracking-cards/image_01.png"

# 3. Zakat Box
mkdir -p "$IMAGE_DIR/RG-003_diy-cardboard-zakat-box"
curl -L "https://sc02.alicdn.com/kf/A0434cf220fd541f7915d809cb6eee3c1U.png" -o "$IMAGE_DIR/RG-003_diy-cardboard-zakat-box/image_01.png"

# 4. Hospital Wudu Kit
mkdir -p "$IMAGE_DIR/RG-004_professional-hospital-wudu-kit"
curl -L "https://sc02.alicdn.com/kf/A7236db9ea38f41bb8e4f8ec8746c0c3bN.png" -o "$IMAGE_DIR/RG-004_professional-hospital-wudu-kit/image_01.png"

# 5. Holy Water Gift Box (Using Jamarat image as placeholder if not found, but I found one in listing_copy_v1 mentions)
# Actually the listing_copy_v1 didn't have URL, just text. I'll use the sc02 alicdn ones for the 3 main new ones.
# Let's map accurately:
# RG-005 (Holy Water) -> Placeholder for now or find one.
# RG-006 (Ritual Stone Box) -> A468d0d3b50394afabec446987df4656fc.png (Jamarat)
# RG-007 (Janazah) -> A6b6a78e23129406cbc21b3bbba9fea2a5.png
# RG-008 (Sadaqah) -> Ac1cf14bb451c44dc923a0ca844a2aa67h.png

mkdir -p "$IMAGE_DIR/RG-005_led-holy-water-gift-box"
curl -L "https://sc02.alicdn.com/kf/A34aafbcd761e4d50ab26a0001386d3c7u.png" -o "$IMAGE_DIR/RG-005_led-holy-water-gift-box/image_01.png"

mkdir -p "$IMAGE_DIR/RG-006_ritual-stone-box-set"
curl -L "https://sc02.alicdn.com/kf/A468d0d3b50394afabec446987df4656fc.png" -o "$IMAGE_DIR/RG-006_ritual-stone-box-set/image_01.png"

mkdir -p "$IMAGE_DIR/RG-007_janazah-emergency-kit"
curl -L "https://sc02.alicdn.com/kf/A6b6a78e23129406cbc21b3bbba9fea2a5.png" -o "$IMAGE_DIR/RG-007_janazah-emergency-kit/image_01.png"

mkdir -p "$IMAGE_DIR/RG-008_sadaqah-milestone-box"
curl -L "https://sc02.alicdn.com/kf/Ac1cf14bb451c44dc923a0ca844a2aa67h.png" -o "$IMAGE_DIR/RG-008_sadaqah-milestone-box/image_01.png"

# 9. Qibla Stickers
mkdir -p "$IMAGE_DIR/RG-009_qibla-direction-stickers"
curl -L "https://sc02.alicdn.com/kf/A34aafbcd761e4d50ab26a0001386d3c7u.png" -o "$IMAGE_DIR/RG-009_qibla-direction-stickers/image_01.png"

echo "Religious Product Images Downloaded!"
