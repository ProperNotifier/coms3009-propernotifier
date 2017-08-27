print("Hello World")

for i in range(10):
  print("Goodbye, cruel world")

def read_stdin(number):
	try:
		mode=int(number) #raw_input('Input:'))
		return mode
	except ValueError:
		return "Not a number"
