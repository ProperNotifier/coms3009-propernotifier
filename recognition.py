import os
import keras.backend as k
import sys
from keras.models import load_model
import numpy as np
from skimage import transform
import json
from bounding_box import BoundingBox

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


class Classifier:
    def __init__(self):
        model = "big_model-acc:0.95-loss:0.17.h5"

        self.learnt_dim = (45, 45)
        self.model = load_model(model)
        self.categories = {"0": "!", "1": "(", "2": ")", "3": "+", "4": ",", "5": "-", "6": "0", "7": "1", "8": "2",
                           "9": "3",
                           "10": "4", "11": "5", "12": "6", "13": "7", "14": "8", "15": "9", "16": "=", "17": "A",
                           "18": "C",
                           "19": "\delta", "20": "G", "21": "H", "22": "M", "23": "N", "24": "R", "25": "S", "26": "T",
                           "27": "X",
                           "28": "[", "29": "]", "30": "alpha", "31": "ascii_124", "32": "b", "33": "\\beta", "34": "d",
                           "35": "div",
                           "36": "e", "37": "\exists", "38": "f", "39": "\\forall", "40": "forward_slash",
                           "41": "\gamma",
                           "42": "\geq", "43": ">", "44": "i", "45": "\int_", "46": "\infty", "47": "int", "48": "j",
                           "49": "k",
                           "50": "l", "51": "\lambda", "52": "\ldots", "53": "\leq", "54": "\lim", "55": "\log",
                           "56": "<",
                           "57": "\mu", "58": "\\neq", "59": "o", "60": "p", "61": "\phi", "62": "\pi", "63": "\pm",
                           "64": "\prime",
                           "65": "q", "66": "\\rightarrow", "67": "\sigma", "68": "\sqrt", "69": "\sum_",
                           "70": "\\theta",
                           "71": "\\times", "72": "u", "73": "v", "74": "w", "75": "y", "76": "z", "77": "{", "78": "}"}
        if k.image_data_format() == 'channels_first':
            self.input_shape = (1, 1, self.learnt_dim[1], self.learnt_dim[0])
        else:
            self.input_shape = (1, self.learnt_dim[1], self.learnt_dim[0], 1)

    def _resize(self, img):
        try:
            return transform.resize(np.ascontiguousarray(img), output_shape=self.learnt_dim, mode='constant')
        except ValueError:
            print("Can't resize")

    def _sub_img_predict(self, bbox, img):
        slices = (slice(bbox.top, bbox.bottom), slice(bbox.left, bbox.right))
        resized_sub_img = self._resize(img[slices])
        probabilities = self.model.predict(resized_sub_img.reshape(self.input_shape), batch_size=1, verbose=0)[0]
        bbox.label = self.categories[str(probabilities.argmax(axis=-1))]

    def classify(self, bbox_list, img):
        for bbox in bbox_list:
            self._sub_img_predict(bbox, img)
        return json.dumps([o.__dict__ for o in bbox_list])
