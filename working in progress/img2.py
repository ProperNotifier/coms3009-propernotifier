from PIL import Image, ImageFont, ImageDraw, ImageEnhance
import json
import sys
import cPickle
#from classify import Classify
#import cPickle
#import cv2
#from hog import HOG
#import os

source_img = Image.open("test_nt_tut.jpg").convert("RGBA")

#correcting the json file
with open ("test_nt.json", "r") as myfile:
    data=myfile.readlines()[0].replace("\\\"", "\"")
    data = data[1:-1]
data = json.loads(data)
#print(data[0]['top'])

draw = ImageDraw.Draw(source_img)

#creates box and writes recognised character
for block in data:
    draw.rectangle(((block['left'], block['top']), (block['right'], block['bottom'])), fill=None, outline="red")
    im = source_img.crop((block['left'], block['top'], block['right'], block['bottom']))
    #im.show()
    ## put ernests classifier:
    #result = Classify.Classify(im)
    draw.text(((block['left']+block['right'])/2, block['bottom']), "2", fill="green")
    
	
source_img.save("out1", "JPEG")

#img = source_img.crop((0,0,500,500))
#img.save("testing.jpg")
