import keras.backend as K
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


def segment(filename, beta=10, modelfile='model.h5', learnt_dim=(45, 45)):
    if K.image_data_format() == 'channels_first':
        input_shape = (1, 1, learnt_dim[1], learnt_dim[0])
    else:
        input_shape = (1, learnt_dim[1], learnt_dim[0], 1)
    model = load_model(modelfile)
    img = io.imread(filename)
    labels, num_labels = _initial_segmentation(img, beta)
    char_slices=ndi.measurements.find_objects(labels)
    print(num_labels)
    for curr_region in char_slices:
        curr_sub_img = img[curr_region]
        probs = model.predict(transform.resize(curr_sub_img, (45, 45), mode='constant').reshape(input_shape),
                                  batch_size=1)
        character=probs.argmax(axis=-1)
        print(character)


segment('test_nt_tut.jpg')
