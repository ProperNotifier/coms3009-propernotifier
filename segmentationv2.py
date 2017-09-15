import keras.backend as K
import matplotlib.patches as mpatches
import matplotlib.pyplot as plt
import numpy as np
import scipy.ndimage as ndi
from keras.models import load_model
from skimage import segmentation, io, transform


def _initial_segmentation(img, beta=10):
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
    s = ndi.generate_binary_structure(2, 2)
    label_mask, num = ndi.measurements.label(segments, s)
    return label_mask, num


def slice_to_rec(object_slice):
    top_left=(object_slice[1].start, object_slice[0].start)
    height=object_slice[0].stop-object_slice[0].start
    width=object_slice[1].stop-object_slice[1].start
    return top_left, height, width


def segment(filename, character_list, beta=10, modelfile='model.h5', learnt_dim=(45, 45), ):
    if K.image_data_format() == 'channels_first':
        input_shape = (1, 1, learnt_dim[1], learnt_dim[0])
    else:
        input_shape = (1, learnt_dim[1], learnt_dim[0], 1)
    model = load_model(modelfile)
    img = io.imread(filename)
    labels, num_labels = _initial_segmentation(img, beta)
    char_slices = ndi.measurements.find_objects(labels)
    print(num_labels)
    for curr_region in char_slices:
        curr_sub_img = img[curr_region]
        probs_list = model.predict(transform.resize(curr_sub_img, (45, 45), mode='constant').reshape(input_shape),
                                   batch_size=1)[0]
        max_probs_index = probs_list.argmax(axis=-1)
        certainty = probs_list[max_probs_index]
        if probs_list[max_probs_index] >= 0.65:
            print(curr_region)

            plt.figure(1)
            plt.imshow(curr_sub_img, cmap='gray')

            plt.figure(2)
            plt.imshow(img, cmap='gray')
            xy, height, width=slice_to_rec(curr_region)
            print(xy, width, height)
            rec = mpatches.Rectangle(xy,width, height, edgecolor='red', facecolor='none')
            print(rec.get_xy())
            plt.axes().add_patch(rec)
            plt.show()
            break


segment('test_nt_tut.jpg', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
