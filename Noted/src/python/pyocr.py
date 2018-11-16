import json
import sys
import multiprocessing as mp
import base64
from io import BytesIO
from PIL import Image
import numpy as np
from bounding_box import BoundingBox


def _segment(conn):
    from segmentation import Segmentor
    seg = Segmentor()
    im = conn.recv()
    out = seg.segment(im)
    conn.send(out)


def _classify(conn, lck):
    from recognition import Classifier
    classifier = Classifier()
    bboxes = conn.recv()
    im = conn.recv()
    out = classifier.classify(bboxes, im)
    lck.acquire()
    try:
        print(out)
    finally:
        lck.release()


def _convert_base64_img(img_64_string):
    i = Image.open(BytesIO(base64.b64decode(img_64_string)))
    return np.array(i)


def _json_to_bboxes(line):
    bboxes = []
    json_dicts = json.loads(line)
    for curr_dict in json_dicts:
        bbox = BoundingBox(curr_dict["left"], curr_dict["right"], curr_dict["top"], curr_dict["bottom"],
                           curr_dict["label"])
        bboxes.append(bbox)
    return bboxes


def run_main():
    parent_conn1, child_conn1 = mp.Pipe()
    parent_conn2, child_conn2 = mp.Pipe()
    lock = mp.Lock()

    seg_process = mp.Process(target=_segment, args=(child_conn1,))
    rec_process = mp.Process(target=_classify, args=(child_conn2, lock))
    seg_process.start()
    rec_process.start()

    for line in sys.stdin:
        img = _convert_base64_img(line)
        parent_conn1.send(img)
        initial_json = parent_conn1.recv()
        seg_process.join()
        parent_conn2.send(_json_to_bboxes(initial_json))
        parent_conn2.send(img)
        break


if __name__ == '__main__':
    run_main()
