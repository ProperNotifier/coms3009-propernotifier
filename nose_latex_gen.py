from latex_gen import gen_tex
 
def test_gen ():
    assert gen_tex("parsed.json", 1, 2)
