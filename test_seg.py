import random
from pathlib import Path

from nose.tools import *
from segmentation import *


def test_slice_to_bbox():
    slices = (slice(10, 30), slice(5, 25))
    bbox = slice_to_bbox(slices)
    eq_(bbox.left, 5)
    eq_(bbox.right, 25)
    eq_(bbox.top, 10)
    eq_(bbox.bottom, 30)


def test_resize():
    img = np.ones((50, 50))
    new_img = resize(img)
    eq_(new_img.shape, (45, 45))
    img = np.ones((20, 20))
    new_img = resize(img)
    eq_(new_img.shape, (45, 45))


class TestSegmentation:
    def setup(self):
        self.seg = Segmentor()

    def test_seg(self):
        bboxes = self.seg.segment("test_nt_tut.jpg")

