from PIL import Image, ImageFont, ImageDraw, ImageEnhance
import json
import sys
from skimage.transform import resize
from skimage import io
from classify import *
#from segmentationv2 import Segmentor

source_img = Image.open("test_nt_tut.jpg").convert("RGBA")
img = io.imread("test_nt_tut.jpg", as_grey=True)
#seg = Segmentor('model-05-acc:0.87-loss:0.46.h5', (45, 45))

with open ("test_nt.json", "r") as myfile:
    data=myfile.readlines()[0].replace("\\\"", "\"")
    data = data[1:-1]
    
data = json.loads(data)
draw = ImageDraw.Draw(source_img)

def _predict2(block, img):
	sub_img = img[block['top']:block['bottom'], block['left']:block['right']]
	if sub_img is not None:
		resized_sub_img = resize(sub_img, output_shape=(45,45), mode='constant')
		model = open("svc2.cpickle").read()
		model = cPickle.loads(model)
		hog = HOG(orientations=18,pixelsPerCell=(10, 10), cellsPerBlock=(1, 1))
		#image = hog.clean(sub_img)
		histogram = hog.describe(resized_sub_img)
		predicted_class = model.predict(histogram)[0]
		#probs_list = seg.model.predict(resized_sub_img.reshape(self.input_shape), batch_size=1, verbose=0)[0]
		#predicted_class = probs_list.argmax(axis=-1)
        #bbox.add_certainty(certainty)
	return predicted_class

#creates box and writes recognised character
for block in data:
	result = _predict2(block, img)
	print(result)
	draw.rectangle(((block['left'], block['top']), (block['right'], block['bottom'])), fill=None, outline="red")
	#img = source_img.crop((block['left'], block['top'],block['right'], block['bottom']))
	#img.show()
	draw.text(((block['left']+block['right'])/2, block['bottom']), result, fill="green")
	
    
source_img.save("out with result", "JPEG")
