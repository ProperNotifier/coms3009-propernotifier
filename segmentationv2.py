import json
import math
import statistics
from itertools import product

import keras.backend as K
import numpy as np
import scipy.ndimage as ndi
from keras.models import load_model
from skimage import segmentation, io, transform

from bounding_box import *


class Segmentor:
    def __init__(self, model_file, learnt_dim):
        self.model, self.input_shape = self.load_cnn(model_file, learnt_dim)
        self.learnt_dim = learnt_dim

    @staticmethod
    def load_cnn(model_file, learnt_dim):
        if K.image_data_format() == 'channels_first':
            input_shape = (1, 1, learnt_dim[1], learnt_dim[0])
        else:
            input_shape = (1, learnt_dim[1], learnt_dim[0], 1)

        return load_model(model_file), input_shape

    def get_proposals(self, labels):
        object_slices = ndi.measurements.find_objects(labels)
        proposed_bboxes = list()
        for curr_slice in object_slices:
            bbox = self.slice_to_bbox(curr_slice)
            proposed_bboxes.append(bbox)
        return proposed_bboxes

    def _initial_segmentation(self, img, beta=10):
        markers = np.zeros_like(img)
        markers[img < 50] = 1
        markers[img > 120] = 2
        segments_rw = segmentation.random_walker(img, markers, beta)
        segments_ws = segmentation.watershed(img, markers)
        segments = np.ones_like(segments_rw)
        it = np.nditer([segments_ws, segments_rw], flags=['multi_index'])
        for ws, rw in it:
            if ws == 2 and rw == 2:
                segments[it.multi_index] = 0

        labels, num_labels = ndi.measurements.label(segments)
        proposed_bboxes = self.get_proposals(labels)
        return proposed_bboxes

    @staticmethod
    def slice_to_bbox(object_slice):
        left = object_slice[1].start
        right = object_slice[1].stop
        top = object_slice[0].start
        bottom = object_slice[0].stop
        return boundingBox(left, right, top, bottom)

    def slide_windows(self, bbox, window_dims, step_size):
        boxes = []
        num_row_slices = int(((bbox.bottom - bbox.top) - window_dims[0]) // step_size[0]) + 1
        num_col_slices = int(((bbox.right - bbox.left) - window_dims[1]) // step_size[1]) + 1
        rows = range(0, num_row_slices)
        col = range(0, num_col_slices)
        for b, j in product(rows, col):
            row_start = b * step_size[0]
            row_stop = row_start + window_dims[0]
            col_start = j * step_size[0]
            col_stop = col_start + window_dims[0]
            curr_box = self.slice_to_bbox((slice(row_start, row_stop), slice(col_start, col_stop)))
            if not curr_box:
                boxes.append(curr_box)
        return boxes

    def _resize(self, sub_img):
        try:
            return transform.resize(sub_img, output_shape=self.learnt_dim, mode='constant')
        except ValueError:
            print("value error")

    def _predict(self, bbox, img):
        sub_img = img[bbox.top:bbox.bottom, bbox.left:bbox.right]
        if sub_img is not None:
            resized_sub_img = self._resize(sub_img)
            probs_list = self.model.predict(resized_sub_img.reshape(self.input_shape), batch_size=1, verbose=0)[0]
            certainty = probs_list[probs_list.argmax(axis=-1)]
            bbox.add_certainty(certainty)

    def _find_max_certainty(self, bbox_list, img):
        if not bbox_list:
            return
        best_bbox = None
        max_certainty = 0
        for bbox in bbox_list:
            if not bbox:
                continue
            if bbox.certainty == 0:
                self._predict(bbox, img)
            if bbox.certainty > max_certainty:
                max_certainty = bbox.certainty
                best_bbox = bbox
        return best_bbox

    def segment(self, filename, beta=10):
        img = io.imread(filename, as_grey=True)
        print(img.shape)
        proposed_bboxes = self._initial_segmentation(img, beta)
        num = len(proposed_bboxes) - (len(proposed_bboxes) // 1.25)
        offset = int(num // 2)

        proposed_bboxes.sort(key=lambda x: x.get_width())
        width_stdev = int(math.ceil(statistics.stdev(c.get_width() for c in proposed_bboxes[offset:-offset])))
        avg_width = int(sum(c.get_width() for c in proposed_bboxes[offset:-offset]) // num)

        proposed_bboxes.sort(key=lambda x: x.get_height())
        height_stdev = int(math.ceil(statistics.stdev(c.get_height() for c in proposed_bboxes[offset:-offset])))
        avg_height = int(sum(c.get_height() for c in proposed_bboxes[offset:-offset]) // num)

        proposed_bboxes.sort(key=lambda x: x.get_area())
        area_stdev = int(math.ceil(statistics.stdev(c.get_area() for c in proposed_bboxes[offset:-offset])))
        avg_area = int(sum(c.get_area() for c in proposed_bboxes[offset:-offset]) // num)

        final_bounding_boxes = []
        for i, curr_bbox in enumerate(proposed_bboxes):
            print(str(i) + " / " + str(len(proposed_bboxes)))
            candidates_list = [curr_bbox]
            if curr_bbox.get_width() <= avg_width - 3 * width_stdev \
                    and curr_bbox.get_height() <= avg_height - 3 * height_stdev \
                    and curr_bbox.get_area() <= avg_area - 3 * area_stdev:
                l = max(curr_bbox.left - 2 * curr_bbox.get_width(), 0)
                r = min(curr_bbox.right + 2 * curr_bbox.get_width(), img.shape[1])
                t = max(math.floor(curr_bbox.top - 2 * curr_bbox.get_height()), 0)
                b = min(math.floor(curr_bbox.bottom + 2 * curr_bbox.get_height()), img.shape[0])
                bigger_bbox = boundingBox(l, r, t, b)
                candidates_list.append(bigger_bbox)

            # Short but wide
            elif curr_bbox.get_width() >= avg_width + 2 * width_stdev \
                    and curr_bbox.get_height() <= avg_height:
                l = curr_bbox.left
                r = curr_bbox.right
                t = max(math.floor(curr_bbox.top - curr_bbox.get_height()), 0)
                b = min(math.floor(curr_bbox.bottom + curr_bbox.get_height()), img.shape[0])
                bigger_bbox = boundingBox(l, r, t, b)
                candidates_list.append(bigger_bbox)
                for j in range(avg_width - width_stdev, avg_width, int(0.75 * width_stdev)):
                    for k in range(avg_height - height_stdev, avg_height, int(0.75 * height_stdev)):
                        dims = (k, j)
                        steps = (max(dims[0] // 2, 1), max(dims[1] // 2, 1))
                        windows = self.slide_windows(bigger_bbox, window_dims=dims, step_size=steps)
                        best_window = self._find_max_certainty(windows, img)
                        if best_window:
                            candidates_list.append(best_window)

            # Tall but thin
            elif curr_bbox.get_width() <= avg_width \
                    and curr_bbox.get_height() >= avg_height + 2 * height_stdev:
                l = max(curr_bbox.left - curr_bbox.get_width(), 0)
                r = min(curr_bbox.right + curr_bbox.get_width(), img.shape[1])
                t = curr_bbox.top
                b = curr_bbox.bottom
                bigger_bbox = boundingBox(l, r, t, b)
                candidates_list.append(bigger_bbox)
                for j in range(avg_height - height_stdev, avg_height, int(0.75 * height_stdev)):
                    for k in range(avg_width - width_stdev, avg_width, int(0.75 * width_stdev)):
                        dims = (j, k)
                        steps = (max(dims[0] // 2, 1), max(dims[1] // 2, 1))
                        windows = self.slide_windows(bigger_bbox, window_dims=dims, step_size=steps)
                        best_window = self._find_max_certainty(windows, img)
                        if best_window:
                            candidates_list.append(best_window)

            # All below average
            elif curr_bbox.get_width() <= avg_width \
                    and curr_bbox.get_height() <= avg_height \
                    and curr_bbox.get_area() <= avg_area:
                l = max(curr_bbox.left - curr_bbox.get_width(), 0)
                r = min(curr_bbox.right + curr_bbox.get_width(), img.shape[1])
                t = max(math.floor(curr_bbox.top - curr_bbox.get_height()), 0)
                b = min(math.floor(curr_bbox.bottom + curr_bbox.get_height()), img.shape[0])
                bigger_bbox = boundingBox(l, r, t, b)
                candidates_list.append(bigger_bbox)
                for j in range(avg_height - height_stdev, avg_height, int(0.75 * height_stdev)):
                    for k in range(avg_width - width_stdev, avg_width, int(0.75 * width_stdev)):
                        dims = (j, k)
                        steps = (max(dims[0] // 2, 1), max(dims[1] // 2, 1))
                        windows = self.slide_windows(bigger_bbox, window_dims=dims, step_size=steps)
                        best_window = self._find_max_certainty(windows, img)
                        if best_window:
                            candidates_list.append(best_window)
            # All above average
            elif curr_bbox.get_width() >= avg_width \
                    and curr_bbox.get_height() >= avg_height \
                    and curr_bbox.get_area() >= avg_area:
                l = max(curr_bbox.left - 0.5 * curr_bbox.get_width(), 0)
                r = min(curr_bbox.right + 0.5 * curr_bbox.get_width(), img.shape[1])
                t = max(math.floor(curr_bbox.top - 0.5 * curr_bbox.get_height()), 0)
                b = min(math.floor(curr_bbox.bottom + 0.5 * curr_bbox.get_height()), img.shape[0])
                bigger_bbox = boundingBox(l, r, t, b)
                candidates_list.append(bigger_bbox)
                for j in range(avg_height - height_stdev, avg_height, int(0.75 * height_stdev)):
                    for k in range(avg_width - width_stdev, avg_width, int(0.75 * width_stdev)):
                        dims = (j, k)
                        steps = (max(dims[0] // 2, 1), max(dims[1] // 2, 1))
                        windows = self.slide_windows(bigger_bbox, window_dims=dims, step_size=steps)
                        best_window = self._find_max_certainty(windows, img)
                        if best_window:
                            candidates_list.append(best_window)
                else:
                    l = max(curr_bbox.left - 0.5 * curr_bbox.get_width(), 0)
                    r = min(curr_bbox.right + 0.5 * curr_bbox.get_width(), img.shape[1])
                    t = max(math.floor(curr_bbox.top - 0.5 * curr_bbox.get_height()), 0)
                    b = min(math.floor(curr_bbox.bottom + 0.5 * curr_bbox.get_height()), img.shape[0])
                    bigger_bbox = boundingBox(l, r, t, b)
                    candidates_list.append(bigger_bbox)
                    for j in range(avg_height - height_stdev, avg_height,
                                   int(0.75 * height_stdev)):
                        for k in range(avg_width - width_stdev, avg_width,
                                       int(0.75 * width_stdev)):
                            dims = (j, k)
                            steps = (max(dims[0] // 2, 1), max(dims[1] // 2, 1))
                            windows = self.slide_windows(bigger_bbox, window_dims=dims, step_size=steps)
                            best_window = self._find_max_certainty(windows, img)
                            if best_window:
                                candidates_list.append(best_window)

            best = self._find_max_certainty(candidates_list, img)
            if best:
                final_bounding_boxes.append(best)
        # TODO: Call Ernests/Mellows Clasifier on each element to set labels
        return json.dumps([o.dump() for o in proposed_bboxes]), proposed_bboxes
