import json
import os
import sys
import multiprocessing as mp
import base64
from io import BytesIO
from PIL import Image
import numpy as np
from bounding_box import BoundingBox
import latex_gen
import subprocess


def _database(conn):
    import MySQLdb
    db = MySQLdb.connect(passwd="password", db="root")
    cursor = db.cursor()
    while True:
        query = conn.recv()
        if query == 'stop':
            break
        try:
            cursor.execute(query)
            db.commit()
        except:
            db.rollback()

    db.close()


def _segment(conn, lck):
    from segmentation import Segmentor
    seg = Segmentor()
    im = conn.recv()
    out = seg.segment(im)
    lck.acquire()
    try:
        print(out)
    finally:
        lck.release()


def _classify(conn, lck):
    from recognition import Classifier
    classifier = Classifier()
    bboxes = conn.recv()
    im = conn.recv()
    out = classifier.classify(bboxes, im)
    conn.send(out)
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

    seg_process = mp.Process(target=_segment, args=(child_conn1, lock))
    rec_process = mp.Process(target=_classify, args=(child_conn2, lock))
    seg_process.start()
    rec_process.start()

    lines_in = 0
    for line in sys.stdin:
        lines_in += 1
        if lines_in == 1:
            img = _convert_base64_img(line)
            parent_conn1.send(img)
        elif lines_in == 2:
            parent_conn2.send(_json_to_bboxes(line))
            parent_conn2.send(img)
            break

    # parent_conn3, child_conn3 = mp.Pipe()
    # db_process = mp.Process(target=_database, args=(child_conn3,))
    # db_process.start()

    final_json = parent_conn2.recv()
    with open('temp_file', 'w') as f:
        f.write(final_json)
    latex_gen.gen_tex("temp_file")
    os.remove("temp_file")

    # sql = "INSERT INTO Pages (?) VALUES (%s)" % ('test.tex')
    # parent_conn3.send(sql)

    process = subprocess.Popen(['pdflatex', '-interaction=nonstopmode', 'test.tex'],
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    process.communicate()

    os.remove('test.log')
    os.remove('test.aux')
    # if errcode == 0:
    #     sql = "INSERT INTO Books (?) VALUES (%s)" % ('test.pdf')
    #     parent_conn3.send(sql)
    #
    # parent_conn3.send('stop')


if __name__ == '__main__':
    run_main()
