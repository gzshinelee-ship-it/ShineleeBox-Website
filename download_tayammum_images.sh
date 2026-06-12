#!/bin/bash
IMAGE_DIR="images/products/RG-010_premium-tayammum-pad-dry-ablution"
mkdir -p "$IMAGE_DIR"

curl -L "https://s.alicdn.com/@sc04/kf/H043bda759c7648b3860f5f2ffdb76f48A.png_960x960q80.jpg" -o "$IMAGE_DIR/image_01.png"
curl -L "https://s.alicdn.com/@sc04/kf/H3e94d7a60ccc43d9acb1fd22dc34585cu.png_960x960q80.jpg" -o "$IMAGE_DIR/image_02.png"
curl -L "https://s.alicdn.com/@sc04/kf/Ha5afc4f6409a430296da9a6e757115a0b.png_960x960q80.jpg" -o "$IMAGE_DIR/image_03.png"
curl -L "https://s.alicdn.com/@sc04/kf/H6c8cd48e9acc41629dc47d424ddb3785h.png_960x960q80.jpg" -o "$IMAGE_DIR/image_04.png"
curl -L "https://s.alicdn.com/@sc04/kf/H1666b4951fe0495b8444dbb4e0314b1dX.png_960x960q80.jpg" -o "$IMAGE_DIR/image_05.png"

echo "Tayammum Pad Images Downloaded!"
