import json
import keras.backend as k
import numpy as np
import scipy.ndimage as ndi
from keras.models import load_model
from skimage import segmentation, io, transform
from bounding_box import BoundingBox

categories = {"0": "!", "1": "(", "2": ")", "3": "+", "4": ",", "5": "-", "6": "0", "7": "1", "8": "2", "9": "3",
              "10": "4", "11": "5", "12": "6", "13": "7", "14": "8", "15": "9", "16": "=", "17": "A", "18": "C",
              "19": "\delta", "20": "G", "21": "H", "22": "M", "23": "N", "24": "R", "25": "S", "26": "T", "27": "X",
              "28": "[", "29": "]", "30": "alpha", "31": "ascii_124", "32": "b", "33": "\\beta", "34": "d", "35": "div",
              "36": "e", "37": "\exists", "38": "f", "39": "\\forall", "40": "forward_slash", "41": "\gamma",
              "42": "\geq", "43": ">", "44": "i", "45": "\int_", "46": "\infty", "47": "int", "48": "j", "49": "k",
              "50": "l", "51": "\lambda", "52": "\ldots", "53": "\leq", "54": "\lim", "55": "\log", "56": "<",
              "57": "\mu", "58": "\\neq", "59": "o", "60": "p", "61": "\phi", "62": "\pi", "63": "\pm", "64": "\prime",
              "65": "q", "66": "\\rightarrow", "67": "\sigma", "68": "\sqrt", "69": "\sum_", "70": "\\theta",
              "71": "\\times", "72": "u", "73": "v", "74": "w", "75": "y", "76": "z", "77": "{", "78": "}"}

learnt_dim = (45, 45)
small_model = 'model-05-acc:0.87-loss:0.46.h5'
big_model = "big_model-acc:0.95-loss:0.17.h5"


def slice_to_bbox(object_slice, label=None):
    left = object_slice[1].start
    right = object_slice[1].stop
    top = object_slice[0].start
    bottom = object_slice[0].stop
    return BoundingBox(left, right, top, bottom, label)


def make_labels(img):
    markers = np.zeros_like(img)
    markers[img < 100] = 1
    markers[img > 240] = 2
    segments = segmentation.watershed(img, markers)
    for ws in np.nditer(segments, op_flags=['readwrite']):
        if ws == 2:
            ws[...] = 0
    return ndi.measurements.label(segments)


def resize(img):
    try:
        return transform.resize(np.ascontiguousarray(img), output_shape=learnt_dim, mode='constant')
    except ValueError:
        raise ValueError("Resize can't resize None")


class Segmentor:
    def __init__(self):
        self.model = load_model(big_model)
        if k.image_data_format() == 'channels_first':
            self.input_shape = (1, 1, learnt_dim[1], learnt_dim[0])
        else:
            self.input_shape = (1, learnt_dim[1], learnt_dim[0], 1)

    def segment(self, filename):
        img = io.imread(filename, as_grey=True)
        label_matrix, max_label = make_labels(img)
        proposed_bboxes = self.get_bboxes(img, label_matrix, max_label)
        better_bboxes = self.clean(proposed_bboxes, img, label_matrix, max_label)
        self.merge(better_bboxes, img, label_matrix, max_label)
        return better_bboxes, json.dumps([o.__dict__ for o in better_bboxes])

    def predict(self, bbox, img, label_matrix, set_cats=False):
        label = bbox.label
        slices = (slice(bbox.top, bbox.bottom), slice(bbox.left, bbox.right))
        masked_sub_img = np.ma.masked_where(label_matrix[slices] != label, img[slices])

        resized_sub_img = resize(masked_sub_img)

        probabilities = self.model.predict(resized_sub_img.reshape(self.input_shape), batch_size=1, verbose=0)[0]
        certainty = probabilities[probabilities.argmax(axis=-1)]
        bbox.certainty = int(certainty * 100)
        if set_cats:
            bbox.label = categories[str(probabilities.argmax(axis=-1))]

    def get_bboxes(self, img, label_matrix, max_label):
        object_slices = ndi.measurements.find_objects(label_matrix)
        proposed_bboxes = []
        labels = range(1, max_label + 1)
        for curr_slice, l in zip(object_slices, labels):
            bbox = slice_to_bbox(curr_slice, l)
            proposed_bboxes.append(bbox)
        return proposed_bboxes

    def clean(self, bboxes_list, img, label_matrix, max_label):
        out = []
        for i in bboxes_list:
            if i:
                out.append(i)
        return out

    def merge(self, bbox_list, img, label_matrix, max_label):
        for i in bbox_list:
            self.predict(i, img, label_matrix, set_cats=True)
        return bbox_list
