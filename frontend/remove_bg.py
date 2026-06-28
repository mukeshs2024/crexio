from PIL import Image
import numpy as np
import sys

def process():
    try:
        img = Image.open('c:\\ipl_mock_auction\\frontend\\public\\trophy.png').convert("RGBA")
        data = np.array(img)
        
        # We need a robust flood fill from the borders
        from skimage.segmentation import flood_fill
        
        # Create a mask for "checkerboard colors"
        # Checkerboard colors are gray (R=G=B) and > 190
        # Let's define a tolerance for "grayness": max(R,G,B) - min(R,G,B) < 15
        # And brightness > 190
        
        r = data[:,:,0].astype(int)
        g = data[:,:,1].astype(int)
        b = data[:,:,2].astype(int)
        
        cmax = np.max(data[:,:,:3], axis=2)
        cmin = np.min(data[:,:,:3], axis=2)
        
        is_gray = (cmax - cmin) < 20
        is_bright = cmax > 185
        
        checkerboard_mask = is_gray & is_bright
        
        # Now we need to flood fill this mask from the edges
        # We'll create an expanded mask initialized to 0
        h, w = checkerboard_mask.shape
        filled_mask = np.zeros((h, w), dtype=bool)
        
        # We will just iterate and find edge pixels that are in the checkerboard mask
        # and run a flood fill on them (since the checkerboard is contiguous)
        # However, skimage flood_fill requires us to pass a point.
        # It's easier to just use OpenCV or scipy for connected components.
        
        import cv2
        # Convert mask to uint8
        mask_u8 = (checkerboard_mask * 255).astype(np.uint8)
        
        # Find connected components connected to the border
        # We pad the mask with 1s so the border components touch the padding
        padded = np.pad(mask_u8, 1, mode='constant', constant_values=255)
        
        # Flood fill from (0,0) which is in the padding
        # This will fill all connected checkerboard pixels touching the border
        filled_padded = padded.copy()
        cv2.floodFill(filled_padded, None, (0,0), 128)
        
        # 128 is the filled value.
        # Now we extract the filled regions (value == 128)
        bg_mask = (filled_padded[1:-1, 1:-1] == 128)
        
        # For pixels in the bg_mask, we set alpha to 0
        data[bg_mask, 3] = 0
        
        # We also need to handle the anti-aliased edges and glow.
        # The glow is blue. If we just zero out the background, the glow might still have 
        # a gray/white background mixed with it. 
        # But this is a simple attempt.
        out_img = Image.fromarray(data)
        out_img.save('c:\\ipl_mock_auction\\frontend\\public\\trophy.png')
        print("Processed successfully")
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    process()
