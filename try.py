import random
from pathlib import Path
from segmentation import Segmentor
import matplotlib.pyplot as plt
from matplotlib import patches as mpatches
import json

dpi = 80
file = "test_nt_tut"

seg = Segmentor()
bbox_list, json_data = seg.segment(file + ".jpg")
with open(file + ".json", 'w') as out:
    json.dump(json_data, out)

im_data = plt.imread(file + ".jpg")
height, width = im_data.shape
figsize = (width / float(dpi), height / float(dpi))

fig = plt.figure(1, figsize=figsize)
ax = fig.add_axes([0, 0, 1, 1])
ax.axis('off')
ax.imshow(im_data, cmap='gray')
ax.set(xlim=[0, width], ylim=[height, 0], aspect=1)

for i, bbox in enumerate(bbox_list):
    xy = (bbox.left, bbox.top)
    box = mpatches.Rectangle(xy, width=bbox.width(), height=bbox.height(), edgecolor='red',
                             facecolor='none')
    ax.add_patch(box)
    plt.text(xy[0], xy[1], str(bbox.label))

plt.savefig(file + ".jpg")