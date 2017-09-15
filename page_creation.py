import numpy as np

from skimage.filter import sobel
from skimage.segmentation import felzenszwalb
from skimage.segmentation import mark_boundaries
from skimage import io
from skimage import transform
from skimage import img_as_ubyte
import matplotlib.pyplot as plt
from pathlib import Path

rootdir = Path('/home/tau/Documents/Bsc3/Coms3/Software Design/Project/Data/extracted_images/alpha-numeric/')
max_pages = 1
min_chars = 5
max_chars = 20
min_char_size = 40
max_char_size = 90
spacing = 2
dim_list = [720, 960, 640, 1080]

file_list = [f for f in rootdir.glob('**/*.jpg') if f.is_file()]
for i in range(0, max_pages):
    height = 0
    page_height = np.random.choice(dim_list)
    page_width = np.random.choice(dim_list)
    canvas = np.full((page_height, page_width), 1)
    char_list = np.random.choice(file_list, np.random.randint(min_chars, max_chars))
    while height < page_height:
        width = 0
        line_height = np.random.random_integers(min_char_size, max_char_size)
        while width < page_width:
            img_name = np.random.choice(char_list)
            delta_width = np.random.random_integers(min_char_size, max_char_size)
            if width + delta_width >= page_width or height + line_height >= page_height:
                break
            img = transform.resize(io.imread(img_name), (line_height, delta_width))
            canvas[height:height + line_height, width: width + delta_width] = img
            width += delta_width
        height += line_height
    io.imsave('test'+str(i)+".jpg", canvas)
    print(canvas)
