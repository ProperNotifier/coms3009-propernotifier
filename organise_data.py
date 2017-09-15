from pathlib import Path

rootdir = Path('/home/tau/Documents/Bsc3/Coms3/Software Design/Project/Data1')

folder_list=[f for f in rootdir.iterdir()if f.is_dir()]
for folder in folder_list:
    file_list = [f for f in folder.glob('**/*.jpg') if f.is_file()]
    for file in file_list:

