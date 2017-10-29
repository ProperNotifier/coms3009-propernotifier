import sys, json, numpy as np
import time

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    print(lines[0])
    return lines[0]

def main():
    #get our data as an array from read_in()
    lines = read_in()
    name=lines#[0]
    image=name#lines[1]
    '''print("name")
    print(name)
    print("image")
    print(image)'''
    time.sleep(5)
    # image_ext = name # A field from the Android device
    '''image_data = image.decode("base64") # The data image
    filehandler = open("img.jpeg", "wb+")
    filehandler.write(image_data)
    filehandler.close()'''
    #return the sum to the output stream
    print "done"


#start process
if __name__ == '__main__':
    main()