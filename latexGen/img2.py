from PIL import Image, ImageFont, ImageDraw, ImageEnhance
import json
source_img = Image.open("test_nt_tut.jpg").convert("RGBA")

def get_av(my_data):
	av = []
	for block in my_data:
		if len(av) == 0:
			av.append({"bottom": block['bottom'], "top":block['top']})
		else:
			apnded = True
			for i in range(len(av)):
				if min(av[i]['bottom'], block['bottom']) - max(av[i]['top'], block['top']) > 0: # some error value
					av[i]['bottom'] = max(av[i]['bottom'], block['bottom'])
					av[i]['top'] = min(av[i]['top'], block['top'])
					apnded = False;
					break
			if apnded:
				av.append({"bottom": block['bottom'], "top":block['top']})
	i = 0
	while i < len(av):
		j = 0
		while j < len(av):
			if i != j and min(av[i]['bottom'], av[j]['bottom']) - max(av[i]['top'], av[j]['top']) > 0:
				av[i]['bottom'] = max(av[i]['bottom'], av[j]['bottom'])
				av[i]['top'] = min(av[i]['top'], av[j]['top'])
				del av[j]
				if j < i:
					i-=1
				j-=1
			j+=1
		i+=1
	newlist = sorted(av, key=lambda k: k['top'])
	return newlist

def assign_char(my_data, rows):
	result = [list() for _ in range(len(rows))]
	for block in my_data:
		mdpnt = (block["bottom"]-block["top"])/2+block["top"]
		for i in range(len(rows)):
			if rows[i]['top'] <= mdpnt and rows[i]['bottom'] >= mdpnt:
				result[i].append(block)

	for i in range(len(result)):
		newlist = sorted(result[i], key=lambda k: k['left'])
		result[i] = newlist
	return result

def parse_line(row):
	sp = " \quad "
	mt_str = ""
	char_width = 10
	char_height = 20
	if len(row)==0:
		return mt_str
	my_prev = None
	underline = False
	supers = False
	subscr = False
	superscript = ""
	subscript = ""
	for block in row:
		if block['right']-block['left'] > 100: # if it's a long line
			mt_str += (superscript+subscript+" newline "+sp) # fix this ),:
			supers = False
			subscr = False
			superscript = ""
			subscript = ""
			my_prev = None
		elif my_prev == None: # if it's the 1st char
			mt_str += (superscript+subscript+"W")
			my_prev = block
			supers = False
			subscr = False
			superscript = ""
			subscript = ""
		else:
			if block['left'] - my_prev['right'] >= char_width: # add a space
				mt_str+=(superscript+subscript+sp+"W")
				my_prev = block
				supers = False
				subscr = False
				superscript = ""
				subscript = ""
			elif block['top']-my_prev['top'] >= char_height/2:
				if subscr == False:
					subscript="_{W}"
				else:
					subscript = subscript[0:-1]+"W}"
				subscr = True
			elif my_prev['bottom']-block['bottom'] >= char_height/2:
				if supers == False:
					superscript="^{W}"
				else:
					superscript = superscript[0:-1]+"W}"
				supers = True
			else:
				mt_str+=(superscript+subscript+"W")
				my_prev = block
				supers = False
				subscr = False
				superscript = ""
				subscript = ""
	return mt_str
with open ("test_nt.json", "r") as myfile:
    data=myfile.readlines()[0].replace("\\\"", "\"")
    data = data[1:-1]

data = json.loads(data)

draw = ImageDraw.Draw(source_img)
my_av = get_av(data)

my_rows = assign_char(data, my_av)

colors = ["red","orange","lime","cyan","blue"]
indx = 0
my_latex = "\documentclass[12pt]{article}\n\\usepackage{xcolor}\n\\usepackage[utf8]{inputenc}\n\\usepackage[margin=0.5in]{geometry}\n\\usepackage[english]{babel}\n\\usepackage[document]{ragged2e}\n\\begin{document}\n\section{Heading on Level 1 (section)}\n"

for row in my_rows:
	color = colors[indx%5]
	draw.rectangle((0, my_av[indx]['top'], 1600, my_av[indx]['bottom']), fill=None, outline=color)
	indx+=1
	my_latex += ("\color{"+color+"}\["+parse_line(row)+"\]\n")
	for block in row:
		draw.rectangle(((block['left'], block['top']), (block['right'], block['bottom'])), fill=None, outline=color)
	# draw.text((block['left'], block['top']), "3", fill="red")
source_img.save("out_file.jpg", "JPEG")

file = open("test.tex","w")
file.write(my_latex+"\end{document}")
file.close()
