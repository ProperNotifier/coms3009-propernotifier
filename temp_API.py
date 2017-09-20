# unit test temp_API
# temp_API read image(jpg), return JSON
from PIL import Image
def temp_api(path):
	im = Image.open(path)
	print(im.format, im.size, im.mode)
	return "{}"
