from PIL import Image, ImageDraw

def remove_white_bg_floodfill(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        w, h = img.size
        
        # 塗りつぶし（Floodfill）を使って、外側のつながっている「白系」の背景だけを透明化
        # thresh=50 でJPGのノイズやグラデーションにも対応
        ImageDraw.floodfill(img, (0, 0), (255, 255, 255, 0), thresh=50)
        ImageDraw.floodfill(img, (w-1, 0), (255, 255, 255, 0), thresh=50)
        ImageDraw.floodfill(img, (0, h-1), (255, 255, 255, 0), thresh=50)
        ImageDraw.floodfill(img, (w-1, h-1), (255, 255, 255, 0), thresh=50)
        
        img.save(output_path, "PNG")
        print(f"v2 Done: {output_path}")
    except Exception as e:
        print(f"Error on {input_path}: {e}")

remove_white_bg_floodfill("MST.jpg", "MST_transparent.png")
remove_white_bg_floodfill("ISC.jpg", "ISC_transparent.png")
