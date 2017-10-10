import glob
import cv2


from hog import HOG


def LoadImage(lable, path):
    hog = HOG(orientations=18, pixelsPerCell=(10, 10), cellsPerBlock=(1, 1))
    histogramArray = []
    LablesArray = []
    print path
    for filename in glob.glob(path + '/*.jpg'):

        image = cv2.imread(filename)
        image = hog.clean(image)
        histogram = hog.describe(image)
        histogramArray.append(histogram)
        LablesArray.append(lable)
    print "runing"
    return LablesArray, histogramArray

