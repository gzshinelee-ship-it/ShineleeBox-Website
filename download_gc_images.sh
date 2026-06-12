#!/bin/bash
IMAGE_DIR="images/products/GC-001_3d-popup-interactive-birthday-card"
mkdir -p "$IMAGE_DIR"

curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01F6Iud01cF6zaLclXE_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/image_01.png"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01SFRUuE1cF6zaLQTiM_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/image_02.png"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN018blhjp1cF74UBlbQr_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/image_03.png"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01iIFMZj1cF6zaqWr4B_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/image_04.png"
curl -L "https://cbu01.alicdn.com/img/ibank/O1CN01NkrajZ1cF709SEWEy_!!934253570-0-cib.jpg" -o "$IMAGE_DIR/image_05.png"

echo "Greeting Card Images Downloaded!"
