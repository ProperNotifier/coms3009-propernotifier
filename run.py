from pathlib import Path
import json
import matplotlib.patches as mpatches
import matplotlib.pyplot as plt
import random

from segmentationv2 import Segmentor

dir = "/home/tau/Documents/Bsc3/Coms3/Software Design/COMS3009Project/Data/Pages/Other/"
rootdir = Path(dir)
file_list = [f for f in rootdir.glob('**/*.jpg') if f.is_file()]
seg = Segmentor('model-05-acc:0.87-loss:0.46.h5', (45, 45))
dpi = 80


def run_on_dir():
    for i, file in enumerate(file_list):
        bbox_list = seg.segment(file)
        im_data = plt.imread(file)
        height, width = im_data.shape
        figsize = width / float(dpi), height / float(dpi)
        fig = plt.figure(figsize=figsize)
        ax = fig.add_axes([0, 0, 1, 1])
        ax.axis('off')
        ax.imshow(im_data, cmap='gray')
        ax.set(xlim=[0, width], ylim=[height, 0], aspect=1)
        for bbox in bbox_list:
            xy = (bbox.left, bbox.top)
            box = mpatches.Rectangle(xy, width=bbox.get_width(), height=bbox.get_height(), edgecolor='red',
                                     facecolor='none')
            ax.add_patch(box)
        fig.savefig('test'+str(i)+'.jpg', dpi=dpi, transparent=True)


def run_on_page(outfile, file=None):
    if not file:
        file=file = random.choice(file_list)
    json_data, bbox_list = seg.segment(file)
    im_data = plt.imread(file)
    height, width = im_data.shape
    figsize = (width / float(dpi), height / float(dpi))
    fig = plt.figure(figsize=figsize)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.axis('off')
    ax.imshow(im_data, cmap='gray')
    ax.set(xlim=[0, width], ylim=[height, 0], aspect=1)
    for i, bbox in enumerate(bbox_list):
        xy = (bbox.left, bbox.top)
        box = mpatches.Rectangle(xy, width=bbox.get_width(), height=bbox.get_height(), edgecolor='red',
                                 facecolor='none')
        ax.add_patch(box)
    plt.show()
    plt.savefig(outfile + ".jpg")
    with open(outfile + ".json", 'w') as out:
        json.dump(json_data, out)


def display_img(file):
    im_data = plt.imread(file)
    height, width = im_data.shape
    figsize = width / float(dpi), height / float(dpi)
    fig = plt.figure(figsize=figsize)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.axis('off')
    ax.imshow(im_data, cmap='gray')
    ax.set(xlim=[0, width], ylim=[height, 0], aspect=1)
    plt.show()
