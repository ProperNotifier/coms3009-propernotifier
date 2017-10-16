from nose.tools import *
from bounding_box import *


class TestBoundingBox:
    def test_join(self):
        bbox1 = BoundingBox(10, 50, 10, 60)
        bbox2 = BoundingBox(50, 70, 5, 50)
        join_bbox = bbox1.join(bbox2)
        eq_(join_bbox.left, 10)
        eq_(join_bbox.right, 70)
        eq_(join_bbox.top, 5)
        eq_(join_bbox.bottom, 60)

    def test_get_area(self):
        bbox=BoundingBox(10, 50, 10, 60)
        eq_(bbox.get_area(), 2000)

    def test_height(self):
        bbox = BoundingBox(10, 50, 10, 60)
        eq_(bbox.height(), 50)

    def test_width(self):
        bbox = BoundingBox(10, 50, 10, 60)
        eq_(bbox.width(), 40)

    def test_str(self):
        bbox = BoundingBox(10, 50, 10, 60)
        string=" left: 10 right: 50 top: 10 bottom: 60 label: None certainty: 0"
        eq_(bbox.__str__(), string)
