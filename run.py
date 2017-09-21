from pathlib import Path

import matplotlib.patches as mpatches
import matplotlib.pyplot as plt
from skimage import io

from segmentationv2 import Segmentor


def display_bbox(bbox, color='green'):
    xy = (bbox.left, bbox.top)
    box = mpatches.Rectangle(xy, width=bbox.get_width(), height=bbox.get_height(), edgecolor=color, facecolor='none')
    plt.axes().add_patch(box)


dir = "/home/tau/Documents/Bsc3/Coms3/Software Design/COMS3009Project/Data/Pages/Other/"
rootdir = Path(dir)
file_list = [f for f in rootdir.glob('**/*.jpg') if f.is_file()]

seg = Segmentor('model-05-acc:0.87-loss:0.46.h5', (45, 45))

file = file_list[5]
json_out, bbox_list = seg.segment(file)
print(json_out)
plt.imshow(io.imread(file), cmap='gray')
for bbox in bbox_list:
    display_bbox(bbox)
plt.show()
