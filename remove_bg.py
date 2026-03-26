import sys
import os

try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

def remove_white_bg(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return
        
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # changing all white (and near white) pixels to transparent
            if item[0] > 235 and item[1] > 235 and item[2] > 235:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Saved {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

remove_white_bg("MST.jpg", "MST_transparent.png")
remove_white_bg("ISC.jpg", "ISC_transparent.png")
