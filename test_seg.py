import random
from pathlib import Path

from nose.tools import *
from segmentation import *


class TestSegmentation:
    def setup(self):
        self.seg = Segmentor()

    def test_seg(self):
        bboxes = self.seg.segment("test_nt_tut.jpg")

    def test_slice_to_bbox(self):
        slices = (slice(10, 30), slice(5, 25))
        bbox = self.seg._slice_to_bbox(slices)
        eq_(bbox.left, 5)
        eq_(bbox.right, 25)
        eq_(bbox.top, 10)
        eq_(bbox.bottom, 30)

