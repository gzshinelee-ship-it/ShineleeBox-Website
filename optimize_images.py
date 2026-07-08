import os
from PIL import Image

def compress_images(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                try:
                    with Image.open(file_path) as img:
                        webp_path = os.path.splitext(file_path)[0] + ".webp"
                        img.save(webp_path, "WEBP", quality=80)
                        print(f"Compressed: {file} -> {os.path.basename(webp_path)}")
                except Exception as e:
                    print(f"Error compressing {file}: {e}")

if __name__ == "__main__":
    target_dir = "images"
    if os.path.exists(target_dir):
        compress_images(target_dir)
    else:
        print(f"Directory {target_dir} not found.")
