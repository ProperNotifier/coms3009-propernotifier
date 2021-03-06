# from PIL import Image, ImageFont, ImageDraw, ImageEnhance
import json

# source_img = Image.open("test_nt_tut.jpg").convert("RGBA")
import os
import sys
import subprocess

im_height = 2337  # height of pixels
im_width = 1637  # width of pixels


def get_av(my_data):
    av = []
    for block in my_data:
        if len(av) == 0:
            av.append({"bottom": block['bottom'], "top": block['top']})
        else:
            apnded = True
            for i in range(len(av)):
                if min(av[i]['bottom'], block['bottom']) - max(av[i]['top'], block['top']) > 0:  # some error value
                    av[i]['bottom'] = max(av[i]['bottom'], block['bottom'])
                    av[i]['top'] = min(av[i]['top'], block['top'])
                    apnded = False;
                    break
            if apnded:
                av.append({"bottom": block['bottom'], "top": block['top']})
    i = 0
    while i < len(av):
        j = 0
        while j < len(av):
            if i != j and min(av[i]['bottom'], av[j]['bottom']) - max(av[i]['top'], av[j]['top']) > 0:
                av[i]['bottom'] = max(av[i]['bottom'], av[j]['bottom'])
                av[i]['top'] = min(av[i]['top'], av[j]['top'])
                del av[j]
                if j < i:
                    i -= 1
                j -= 1
            j += 1
        i += 1
    newlist = sorted(av, key=lambda k: k['top'])
    return newlist


def is_script(t_val, b_val, block):
    return (b_val - t_val) > 1.5 * (block['bottom'] - block['top']) and (
        "\\sum" not in block['label'] and "\\prod" not in block['label'] and "\\int" not in block['label'])


def assign_char(my_data, rows):
    result = [list() for _ in range(len(rows))]
    for block in my_data:
        mdpnt = (block["bottom"] - block["top"]) / 2 + block["top"]
        for i in range(len(rows)):
            if rows[i]['top'] <= mdpnt and rows[i]['bottom'] >= mdpnt:
                result[i].append(block)

    for i in range(len(result)):
        newlist = sorted(result[i], key=lambda k: k['left'])
        result[i] = newlist
    return result


def parse_line(row):
    sp = " \quad "
    line_divide = "\\noindent\\makebox[\\linewidth]{\\rule{\\textwidth}{1pt}}"
    mt_str = ""
    char_width = 10
    char_height = 20
    if len(row) == 0:
        return mt_str
    my_prev = None
    underline = False
    supers = False
    subscr = False
    superscript = ""
    subscript = ""
    word = ""
    my_top = 0
    my_bot = 0
    lngdvd = None
    nmrtr = ""
    dnmtr = ""
    for block in row:
        if block['label'] == "-" and block['right'] - block['left'] > 100:
            underline = True
        else:
            if my_prev != None and my_prev['right'] + 1 < block['left']:
                word += (subscript + superscript)
                supers = False
                subscr = False
                superscript = ""
                subscript = ""
                if "\\" in word or "_" in word or "^" in word or "<" in word or ">" in word:
                    word = " \\( " + word + " \\) "
                mt_str += (word + sp)
                word = ""
                my_top = im_height
                my_bot = 0
            is_s = is_script(my_top, my_bot, block)
            if block['label'] == "long_divide" or block['label'] == "lond_divide":
                lngdvd = block
            elif lngdvd != None:
                if lngdvd['left'] < block['left'] and lngdvd['right'] > block['right']:
                    if block['top'] < lngdvd['top']:
                        nmrtr += block['label']
                    else:
                        dnmtr += block['label']
                    block = lngdvd
                else:
                    word += " \\frac{" + nmrtr + "}{" + dnmtr + "} "
                    lngdvd = None
            elif is_s and my_top > block['top']:  # superscript
                if supers:
                    superscript = superscript[0:-1] + block['label'] + "}"
                else:
                    superscript = "^{" + block['label'] + "}"
                supers = True
            elif is_s and my_bot < block['bottom']:  # subscript
                if subscr:
                    subscript = subscript[0:-1] + block['label'] + "}"
                else:
                    subscript = "_{" + block['label'] + "}"
                subscr = True
            else:
                my_top = min(my_top, block['top'])
                my_bot = max(my_bot, block['bottom'])
                word += (subscript + superscript + block['label'])
                superscript = ""
                subscript = ""
                supers = False
                subscr = False
            my_prev = block
    if lngdvd != None:
        word += " \\frac{" + nmrtr + "}{" + dnmtr + "} "
    word += (subscript + superscript)
    if "\\" in word or "_" in word or "^" in word or "<" in word or ">" in word:
        word = " \\( " + word + " \\) "
    mt_str += word
    if underline and len(mt_str) > 0:
        mt_str = "\\underline{" + mt_str + "}"
    if underline and len(mt_str) == 0:
        mt_str = line_divide
    return mt_str


def gen_tex(my_json, uid, bid):
    with open(my_json, "r") as myfile:
        data = json.load(myfile)

    # draw = ImageDraw.Draw(source_img)
    my_av = get_av(data)

    my_rows = assign_char(data, my_av)

    # colors = ["red","orange","lime","cyan","blue"]
    # indx = 0
    my_latex = "\documentclass[12pt]{article}\n\\usepackage{xcolor}\n\\usepackage[normalem]{ulem}\n\\usepackage[utf8]{inputenc}\n\\usepackage[margin=0.5in]{geometry}\n\\usepackage[english]{babel}\n\\usepackage[document]{ragged2e}\n\\usepackage{ushort}\n\\begin{document}\n\t\\begin{center}\n"

    for row in my_rows:
        # color = colors[indx%5]
        # draw.rectangle((0, my_av[indx]['top'], 1600, my_av[indx]['bottom']), fill=None, outline=color)
        # indx+=1
        this_line = parse_line(row)
        if len(this_line) > 0:
            my_latex += ("\t\t" + this_line + "\\newline\n")
            # for block in row:
            #	draw.rectangle(((block['left'], block['top']), (block['right'], block['bottom'])), fill=None, outline=color)
            #	if block['label'] != None:
            #		draw.text((block['left'], block['top']), block['label'], fill="black")
    # source_img.save("out_file.jpg", "JPEG")
    filename = str(uid) + str(bid)
    file = open(filename, "w")
    file.write(my_latex + "\t\\end{center}\n\\end{document}")
    file.close()
    return filename


def run_main():
    filename = ''
    for line in sys.stdin:
        json_dicts = json.loads(line)
        user_id = json_dicts['userId']
        book_id = json_dicts['bookId']
        temp_file = 'temp' + str(user_id) + str(book_id)
        with open(temp_file, 'w') as f:
            json.dump(json_dicts['data'], f)
        filename = gen_tex(temp_file, user_id, book_id)
        os.remove(temp_file)
        break

    process = subprocess.Popen(['pdflatex', '-interaction=nonstopmode', filename],
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    process.communicate()

    os.remove(filename + '.log')
    os.remove(filename + '.aux')


if __name__ == '__main__':
    run_main()
