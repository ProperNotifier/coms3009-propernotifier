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
        model = "model-45-0.90-0.45.h5"

        self.learnt_dim = (45, 45)
        self.model = load_model(model)
        self.categories = {0: '!', 1: '(', 2: ')', 3: '+', 4: ',', 5: '-', 6: '0', 7: '1', 8: '2', 9: '3', 10: '4',
                           11: '5', 12: '6', 13: '7', 14: '8', 15: '9', 16: '=', 17: 'A', 18: 'C', 19: '\delta', 20: 'G',
                           21: 'H', 22: 'M', 23: 'N', 24: 'R', 25: 'S', 26: 'T', 27: 'X', 28: '[', 29: ']', 30: '\\alpha',
                           31: 'b', 32: '\\beta', 33: 'd', 34: '\div', 35: 'e', 36: '\epsilon', 37: '\exists', 38: 'f',
                           39: '\\forall', 40: '/', 41: '\gamma', 42: '\geq', 43: '>', 44: 'i', 45: '\in',
                           46: '\infty', 47: '\int', 48: 'j', 49: 'k', 50: 'l', 51: '\lambda', 52: '\leq', 53: 'lt',
                           54: '\mu', 55: '\\neq', 56: 'o', 57: 'p', 58: '\phi', 59: '\pi', 60: '\pm', 61: 'q',
                           62: '\\rightarrow', 63: '\sigma', 64: '\sqrt', 65: '\sum', 66: '\\theta', 67: '\\times', 68: 'u',
                           69: 'v', 70: 'w', 71: 'y', 72: 'z', 73: '{', 74: '}'}
        if k.image_data_format() == 'channels_first':
            self.input_shape = (1, 1, self.learnt_dim[1], self.learnt_dim[0])
        else:
            self.input_shape = (1, self.learnt_dim[1], self.learnt_dim[0], 1)

    def _resize(self, img):
        return transform.resize(np.ascontiguousarray(img), output_shape=self.learnt_dim, mode='constant')

    def _sub_img_predict(self, bbox, img):
        slices = (slice(bbox.top, bbox.bottom), slice(bbox.left, bbox.right))
        resized_sub_img = self._resize(img[slices])
        probabilities = self.model.predict(resized_sub_img.reshape(self.input_shape), batch_size=1, verbose=0)[0]
        bbox.label = self.categories[probabilities.argmax(axis=-1)]

    def classify(self, bbox_list, img):
        for bbox in bbox_list:
            self._sub_img_predict(bbox, img)
        return json.dumps([o.__dict__ for o in bbox_list])
