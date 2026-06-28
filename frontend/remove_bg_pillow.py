from PIL import Image
import sys

def process():
    try:
        img = Image.open('c:\\ipl_mock_auction\\frontend\\public\\trophy.png').convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # Checkerboard colors are gray (R=G=B) and > 190
        def is_checkerboard(r, g, b):
            cmax = max(r, g, b)
            cmin = min(r, g, b)
            return (cmax - cmin) < 20 and cmax > 185
            
        # We need a stack-based flood fill since recursion will exceed limit
        def flood_fill(x, y):
            stack = [(x, y)]
            visited = set()
            while stack:
                cx, cy = stack.pop()
                if (cx, cy) in visited:
                    continue
                visited.add((cx, cy))
                
                if 0 <= cx < width and 0 <= cy < height:
                    r, g, b, a = pixels[cx, cy]
                    if a > 0 and is_checkerboard(r, g, b):
                        pixels[cx, cy] = (0, 0, 0, 0)
                        # add neighbors
                        stack.append((cx+1, cy))
                        stack.append((cx-1, cy))
                        stack.append((cx, cy+1))
                        stack.append((cx, cy-1))
                        
        # Start flood fill from the 4 corners
        flood_fill(0, 0)
        flood_fill(width-1, 0)
        flood_fill(0, height-1)
        flood_fill(width-1, height-1)
        
        # Save output
        img.save('c:\\ipl_mock_auction\\frontend\\public\\trophy.png')
        print("Processed successfully with Pillow")
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    process()
