import cv2
import numpy as np
import sys

def remove_checkerboard(input_path, output_path):
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print("Could not read image")
        sys.exit(1)
        
    # If it's already 4 channels, maybe the checkerboard is drawn on the RGB channels
    if img.shape[2] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
        
    # Create an initial mask
    # A fake transparency checkerboard typically has colors like white (255,255,255) and gray (204,204,204)
    # Let's find pixels that are roughly gray or white
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # We want to identify the background. We can use a flood fill from the top-left corner
    # Since it's a checkerboard, we might need a large tolerance
    
    h, w = img.shape[:2]
    mask = np.zeros((h+2, w+2), np.uint8)
    
    # We will do a flood fill with a tolerance that covers the checkerboard range
    # Checkerboard colors are usually around 190 to 255. 
    # Let's start from (0,0) and fill
    flooded = img.copy()
    
    # Define tolerance: 
    # If the checkerboard has colors around 204 and 255, the difference is ~51.
    # Let's use a tolerance of 60.
    diff = (60, 60, 60)
    cv2.floodFill(flooded, mask, (0,0), (0,255,0), diff, diff, cv2.FLOODFILL_FIXED_RANGE)
    
    # The mask now contains 1 where the background was filled.
    # Let's refine the mask to keep the glow and reflections.
    # Actually, the user says "Preserve the blue glow... Preserve the reflection".
    # If the glow is drawn on top of the checkerboard, it will have a mix of blue and checkerboard.
    # This makes it very hard to perfectly separate without a neural network or very careful matting.
    
    # Let's try rembg as a fallback if this looks too complex.
    pass

if __name__ == '__main__':
    print("Script created")
