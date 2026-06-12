#!/bin/bash
IMAGE_DIR="images/products"
mkdir -p "$IMAGE_DIR"

# GC-011 Christmas Sleigh
mkdir -p "$IMAGE_DIR/GC-011_luxury-3d-popup-christmas-sleigh-card"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01AKE8t91cF6zVfdGV6_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/GC-011_luxury-3d-popup-christmas-sleigh-card/image_01.png"

# GC-012 Christmas Tree Box
mkdir -p "$IMAGE_DIR/GC-012_deluxe-3d-popup-christmas-tree-box"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01Z2vG0f1cF73jNjjiG_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/GC-012_deluxe-3d-popup-christmas-tree-box/image_01.png"

# GC-013 Valentine Rose
mkdir -p "$IMAGE_DIR/GC-013_romantic-3d-popup-valentine-rose-heart-card"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01CKmixY1cF6zWdZQag_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/GC-013_romantic-3d-popup-valentine-rose-heart-card/image_01.png"

# GC-014 Wedding Carriage
mkdir -p "$IMAGE_DIR/GC-014_elegant-3d-popup-wedding-carriage-card"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01TS2z8T1cF74cDLt39_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/GC-014_elegant-3d-popup-wedding-carriage-card/image_01.png"

# GC-015 Best Mom Bouquet
mkdir -p "$IMAGE_DIR/GC-015_best-mom-3d-popup-floral-bouquet-box"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01SWYXI91cF6zVkKGL5_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/GC-015_best-mom-3d-popup-floral-bouquet-box/image_01.png"

# GC-016 Graduation Excellence
mkdir -p "$IMAGE_DIR/GC-016_graduation-excellence-3d-popup-card"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01jrMFED1cF74ccM0pz_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/GC-016_graduation-excellence-3d-popup-card/image_01.png"

# GC-017 Ramadan Moon
mkdir -p "$IMAGE_DIR/GC-017_islamic-heritage-ramadan-moon-star-3d-card"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01A8A2S71cF72e6YmC8_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/GC-017_islamic-heritage-ramadan-moon-star-3d-card/image_01.png"

# GC-018 Birthday Cake blowout
mkdir -p "$IMAGE_DIR/GC-018_luxury-3d-popup-birthday-cake-blowout-card"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN019iNybE1cF6qQOMsbX_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/GC-018_luxury-3d-popup-birthday-cake-blowout-card/image_01.png"

echo "Batch 3 Holiday Cards Images Downloaded!"
