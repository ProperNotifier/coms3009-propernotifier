from skimage import feature
import cv2
import numpy as np

class HOG:
    def __init__(self, orientations=9 , pixelsPerCell = (8 ,8) , cellsPerBlock = (3,3)):
        self.orientations = orientations
        self.pixelsPerCell = pixelsPerCell
        self.cellsPerBlock = cellsPerBlock


    def describe(self, image):

        hist =feature.hog(image ,orientations=self.orientations,
                          pixels_per_cell=self.pixelsPerCell,cells_per_block=self.cellsPerBlock,
                          transform_sqrt=True)
        return hist


    def clean(self,image):


        #convert to gray
        image = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
        #remove nose
        kernel = np.ones((1,1),np.uint8)
        image = cv2.dilate(image,kernel,iterations=1)
        image = cv2.erode(image,kernel,iterations=1)
        #get blackandwhite image
        image = cv2.adaptiveThreshold(image,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)

        image = cv2.resize(image,(45,45),interpolation=cv2.INTER_AREA)


        return  image


