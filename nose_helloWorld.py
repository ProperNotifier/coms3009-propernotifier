
from hello import read_stdin

def test_number ():
	assert read_stdin("8") == 8
    
def test_not_number ():
	assert read_stdin("5000g") == "Not a number
