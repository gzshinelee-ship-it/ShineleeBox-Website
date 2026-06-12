#!/bin/bash
IMAGE_DIR="images/products"
mkdir -p "$IMAGE_DIR"

# 1. Baby
mkdir -p "$IMAGE_DIR/LM-001_baby-milestone-video-keepsake-box"
curl -L "https://sc02.alicdn.com/kf/A0c80814124314a97b8d8af11707dff91W.png" -o "$IMAGE_DIR/LM-001_baby-milestone-video-keepsake-box/image_01.png"

# 2. Wedding
mkdir -p "$IMAGE_DIR/LM-002_wedding-anniversary-video-box"
curl -L "https://sc02.alicdn.com/kf/Abfd1318c8c34496b841db2f21b09e2c5R.png" -o "$IMAGE_DIR/LM-002_wedding-anniversary-video-box/image_01.png"

# 3. Memorial
mkdir -p "$IMAGE_DIR/LM-003_eternal-memorial-video-tribute-box"
curl -L "https://sc02.alicdn.com/kf/A93a5d413530c412dbdd44e3bb41bd6edI.png" -o "$IMAGE_DIR/LM-003_eternal-memorial-video-tribute-box/image_01.png"

# 4. Hajj
mkdir -p "$IMAGE_DIR/LM-004_hajj-umrah-heritage-video-gift-box"
curl -L "https://sc02.alicdn.com/kf/A5852ae05eb0a4fff8406656b4ae5b4edp.png" -o "$IMAGE_DIR/LM-004_hajj-umrah-heritage-video-gift-box/image_01.png"

# 5. Baptism
mkdir -p "$IMAGE_DIR/LM-005_baptism-holy-communion-keepsake-box"
curl -L "https://sc02.alicdn.com/kf/A997033ba2037412584aa2120c62ce0e6q.png" -o "$IMAGE_DIR/LM-005_baptism-holy-communion-keepsake-box/image_01.png"

# 6. Bar Mitzvah
mkdir -p "$IMAGE_DIR/LM-006_bar-bat-mitzvah-keepsake-video-box"
curl -L "https://sc02.alicdn.com/kf/A854f2f380e6542dd8396199795800cd7V.png" -o "$IMAGE_DIR/LM-006_bar-bat-mitzvah-keepsake-video-box/image_01.png"

# 7. Pet
mkdir -p "$IMAGE_DIR/LM-007_rainbow-bridge-pet-memorial-video-box"
curl -L "https://sc02.alicdn.com/kf/Abe95f14f7ee34ab18ffa5b296a0c6afcR.png" -o "$IMAGE_DIR/LM-007_rainbow-bridge-pet-memorial-video-box/image_01.png"

# 8. Graduation
mkdir -p "$IMAGE_DIR/LM-008_graduation-excellence-video-box"
curl -L "https://sc02.alicdn.com/kf/A8d7538cdf2c84781ab3d4f2669b2f0a9b.png" -o "$IMAGE_DIR/LM-008_graduation-excellence-video-box/image_01.png"

# 9. Corporate
mkdir -p "$IMAGE_DIR/LM-009_premium-corporate-vip-video-gift-box"
curl -L "https://sc02.alicdn.com/kf/A4e7b997bfda54569b903e48b0f0afde16.png" -o "$IMAGE_DIR/LM-009_premium-corporate-vip-video-gift-box/image_01.png"

echo "Life Memory Collection Images Downloaded!"
