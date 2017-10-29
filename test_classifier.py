from nose.tools import *
from recognition import *


class TestClassifier:
    def setup(self):
        self.classifier = Classifier()

    def test_resize(self):
        img = np.ones((50, 50))
        new_img = self.classifier._resize(img)
        eq_(new_img.shape, (45, 45))
        img = np.ones((20, 20))
        new_img = self.classifier._resize(img)
        eq_(new_img.shape, (45, 45))

