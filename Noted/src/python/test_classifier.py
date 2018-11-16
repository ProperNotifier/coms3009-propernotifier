from nose.tools import *
from skimage import io

from recognition import *


def _json_to_bboxes(file):
    bboxes = []
    json_dicts = json.loads(file)
    for curr_dict in json_dicts:
        bbox = BoundingBox(curr_dict["left"], curr_dict["right"], curr_dict["top"], curr_dict["bottom"],
                           curr_dict["label"])
        bboxes.append(bbox)
    return bboxes


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

    def test_recognition(self):
        img = io.imread("test_data/APPM200715.jpg")
        with open("test_data/APPM200715.json", 'r') as f:
            json_string = json.load(f)
        bboxes = _json_to_bboxes(json_string)
        assert self.classifier.classify(bboxes, img)
