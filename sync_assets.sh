#!/bin/bash
mkdir -p images/about images/trust images/reviews videos

# About & Team
curl -L "https://sc04.alicdn.com/kf/H5f91bf00fd524d5b8f865d4cd1302b0d7.jpg" -o "images/about/about-shinelee.jpg"
curl -L "https://sc04.alicdn.com/kf/H44143c092bb64b029fbdafd80f7478719.png" -o "images/about/our-team.png"
curl -L "https://sc04.alicdn.com/kf/Hda484667cf1d49209b7907e53eab2243t.jpg" -o "images/about/our-exhibition.jpg"
cp "/Users/shengli/Downloads/Why Shinelee.png" "images/about/why-shinelee.png"

# Video
cp "/Users/shengli/Downloads/About  Shinelee 2025.mp4" "videos/about-shinelee-2025.mp4"

# Certifications
curl -L "https://sc04.alicdn.com/kf/H33a6549299f343d1bfa4d64d4530bc5c9.png" -o "images/trust/iso-14001.png"
curl -L "https://sc04.alicdn.com/kf/H52218d8ea53649b694909d9b47efe126k.jpg" -o "images/trust/bsci-audit.jpg"
curl -L "https://sc04.alicdn.com/kf/H81c08e638f8340df8732a344c6c1d9f36.jpg" -o "images/trust/fsc-certificate.jpg"
curl -L "https://sc04.alicdn.com/kf/Hf6fec6e496324d6fabc5d9d5ee9547dbV.jpg" -o "images/trust/fba-service.jpg"

# Reviews & Proof
curl -L "https://sc04.alicdn.com/kf/H9b36087ec7da4064bb518329301c486d0.jpg" -o "images/reviews/katrina-feedback.jpg"
curl -L "https://sc04.alicdn.com/kf/Hba0fe4fe53df44a0b91316124c0ad187r.jpg" -o "images/reviews/emma-feedback.jpg"
curl -L "https://sc04.alicdn.com/kf/He0d21fd10f3f4daf8708846506e89697Q.jpg" -o "images/reviews/alyssa-feedback.jpg"
curl -L "https://sc04.alicdn.com/kf/H797a9e938245492799dfde6c60d777e8V.png" -o "images/reviews/trust-over-price.png"
curl -L "https://sc04.alicdn.com/kf/H710bfc9b2363470aa497c97f2e37a6b6y.png" -o "images/reviews/competitor-lie.png"
curl -L "https://sc04.alicdn.com/kf/Hbb1f0e227cac4806bc3dc4271a62e511A.jpg" -o "images/reviews/competitor-delay.jpg"
curl -L "https://sc04.alicdn.com/kf/H88dc33e86a684be682d97df4d1680c05L.jpg" -o "images/reviews/competitor-cheating-gsm.jpg"

echo "Asset synchronization complete!"
