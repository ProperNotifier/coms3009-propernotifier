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
        self.cats = {"0": "!", "1": "(", "2": ")", "3": "+", "4": ",", "5": "-", "6": "0", "7": "1", "8": "2", "9": "3",
                     "10": "4", "11": "5", "12": "6", "13": "7", "14": "8", "15": "9", "16": "=", "17": "A", "18": "C",
                     "19": "Delta", "20": "G", "21": "H", "22": "M", "23": "N", "24": "R", "25": "S", "26": "T",
                     "27": "X", "28": "[", "29": "]", "30": "alpha", "31": "ascii_124", "32": "b", "33": "beta",
                     "34": "d", "35": "div", "36": "e", "37": "exists", "38": "f", "39": "forall",
                     "40": "forward_slash", "41": "gamma", "42": "geq", "43": "gt", "44": "i", "45": "in",
                     "46": "infty", "47": "int", "48": "j", "49": "k", "50": "l", "51": "lambda", "52": "ldots",
                     "53": "leq", "54": "lim", "55": "log", "56": "lt", "57": "mu", "58": "neq", "59": "o", "60": "p",
                     "61": "phi", "62": "pi", "63": "pm", "64": "prime", "65": "q", "66": "rightarrow", "67": "sigma",
                     "68": "sqrt", "69": "sum", "70": "theta", "71": "times", "72": "u", "73": "v", "74": "w",
                     "75": "y", "76": "z", "77": "{", "78": "}"}

    def test_seg(self):
        dir = "./pages"
        rootdir = Path(dir)
        file_list = [f for f in rootdir.glob('**/*.jpg') if f.is_file()]
        file = random.choice(file_list)
        bboxes = self.seg.segment(file)

