print("Hello World")

for i in range(10):
  print("Goodbye, cruel world")

try:
    mode=int(raw_input('Input:'))
    print(mode)
except ValueError:
    print "Not a number"
