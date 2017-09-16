import glob
import os
import sys

from sklearn.model_selection import train_test_split


def makedirs_wrapper(folder):
    """Simple wrapper around the os.makedirs function. It automatically checks if the argument folder exists, and creates it if not.
    """
    if not os.path.exists(folder):
        try:
            os.makedirs(folder)
        except OSError:
            print('error: ' + folder)
            pass


def split_each_label(root_folder, min_examples=0):
    """
    Algorithm:
    1. Check if root_folder exists
    2. Create train_folder and test_folder
    3. TODO: CREATE THE SUBFOLDER STRUCTURE FROM STRING NAME
    4. For each subfolder in the subfolder structure, check length and create sub-train and sub-test folders
    5. Split training and testing set
    6. Move images into proper folders
    """
    if not os.path.exists(root_folder):
        sys.exit("Root folder does not exist.")
    # Check if train and test folder exist. If not, create them.
    train_folder = os.path.abspath(os.path.join(root_folder, 'train'))
    test_folder = os.path.abspath(os.path.join(root_folder, 'test'))
    makedirs_wrapper(train_folder)
    makedirs_wrapper(test_folder)
    for root, dirs, files in os.walk(root_folder):
        for d in dirs:
            act_len = len(glob.glob(os.path.join(root, d + "/*")))
            dir_path = os.path.join(root_folder, d)
            # Ugly hack
            if d == 'train' or d == 'test':
                continue
            else:
                d_train_folder = os.path.join(train_folder, d)
                d_test_folder = os.path.join(test_folder, d)
                makedirs_wrapper(d_train_folder)
                makedirs_wrapper(d_test_folder)
            if act_len > min_examples:
                x = y = os.listdir(dir_path)
                x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=0)
                if x_test:
                    for x in x_train:
                        os.rename(os.path.join(dir_path, x), os.path.join(d_train_folder, x))
                    for x in x_test:
                        os.rename(os.path.join(dir_path, x), os.path.join(d_test_folder, x))


split_each_label('/home/tau/Documents/Bsc3/Coms3/Software Design/COMS3009Project/Data/extracted_images')
