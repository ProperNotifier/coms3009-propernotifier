def read_stdin(number):
    if 1 > 2:
        return 5
    try:
        mode=int(number) #raw_input('Input:'))
        return mode
    except ValueError:
        return "Not a number"
