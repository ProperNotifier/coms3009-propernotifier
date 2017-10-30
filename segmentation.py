import json
import numpy as np
import scipy.ndimage as ndi
from skimage import segmentation
from bounding_box import BoundingBox


class Segmentor:
    @staticmethod
    def _slice_to_bbox(object_slice, label=None):
        left = object_slice[1].start
        right = object_slice[1].stop
        top = object_slice[0].start
        bottom = object_slice[0].stop
        return BoundingBox(left, right, top, bottom, label)

    @staticmethod
    def _make_labels(img):
        markers = np.zeros_like(img)
        markers[img < 100] = 1
        markers[img > 240] = 2
        segments = segmentation.watershed(img, markers)
        for ws in np.nditer(segments, op_flags=['readwrite']):
            if ws == 2:
                ws[...] = 0
        return ndi.measurements.label(segments)

    def _get_bboxes(self, label_matrix, max_label):
        object_slices = ndi.measurements.find_objects(label_matrix)
        proposed_bboxes = []
        labels = range(1, max_label + 1)
        for curr_slice, l in zip(object_slices, labels):
            bbox = self._slice_to_bbox(curr_slice, l)
            proposed_bboxes.append(bbox)
        return proposed_bboxes

    def segment(self, img):
        label_matrix, max_label = self._make_labels(img)
        bboxes = self._get_bboxes(label_matrix, max_label)
        return json.dumps([o.__dict__ for o in bboxes])


