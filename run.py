import matplotlib.patches as mpatches
import matplotlib.pyplot as plt

from segmentationv2 import Segmentor


def display_bbox(bbox, color='green'):
    xy = (bbox.left, bbox.top)
    box = mpatches.Rectangle(xy, width=bbox.get_width(), height=bbox.get_height(), edgecolor=color, facecolor='none')
    plt.axes().add_patch(box)


seg = Segmentor('model-05-acc:0.87-loss:0.46.h5', (45, 45))
json_out = seg.segment('test_nt_tut.jpg')
print(json_out)

# plt.imshow(io.imread('test_nt_tut.jpg'), cmap='gray')
# for b in bbox_list1:
#     display_bbox(b)
# for b in bbox_list2:
#     display_bbox(b, color='red')
# plt.show()
