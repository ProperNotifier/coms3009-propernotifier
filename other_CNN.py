from keras import backend as K
from keras.callbacks import ModelCheckpoint, EarlyStopping, TensorBoard
from keras.layers import Dropout, Flatten, Dense, Conv2D, MaxPooling2D
from keras.layers.advanced_activations import LeakyReLU
from keras.models import Sequential
from keras.preprocessing.image import ImageDataGenerator

# dimensions of our images.
img_width, img_height = 45, 45
num_classes = 82
train_data_dir = '/home/tau/Documents/Bsc3/Coms3/Software Design/COMS3009Project/Data/extracted_images/train'
validation_data_dir = '/home/tau/Documents/Bsc3/Coms3/Software Design/COMS3009Project/Data/extracted_images/test'
num_train_samples = 281947
num_validation_samples = 94027
epochs = 10
batch_size = 512

if K.image_data_format() == 'channels_first':
    input_shape = (1, img_width, img_height)
else:
    input_shape = (img_width, img_height, 1)

model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=input_shape))
model.add(LeakyReLU())
model.add(Conv2D(32, (3, 3)))
model.add(LeakyReLU())
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(64, (3, 3)))
model.add(LeakyReLU())
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Flatten())
model.add(Dense(64))
model.add(LeakyReLU())
model.add(Dropout(0.5))
model.add(Dense(num_classes, activation='softmax'))

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

checkpoint = ModelCheckpoint(filepath='model-{epoch:02d}-acc:{val_acc:.2f}-loss:{val_loss:.2f}.h5', monitor='val_acc',
                             save_best_only=True)
early_stop = EarlyStopping(patience=2)
tensor_board = TensorBoard(log_dir='/home/tau/Documents/Bsc3/Coms3/Software Design/COMS3009Project/Data/logs',
                           histogram_freq=1, write_grads=True, write_graph=True)
callbacks = [checkpoint, early_stop, tensor_board]

# Augment training data
train_datagen = ImageDataGenerator(rotation_range=25, rescale=1. / 255, shear_range=0.2, zoom_range=0.2)
# Augment testing data
test_datagen = ImageDataGenerator(rescale=1. / 255, rotation_range=25, shear_range=0.2)

train_generator = train_datagen.flow_from_directory(train_data_dir, target_size=(img_width, img_height),
                                                    color_mode='grayscale', batch_size=batch_size,
                                                    class_mode='categorical')
validation_generator = test_datagen.flow_from_directory(validation_data_dir, target_size=(img_width, img_height),
                                                        color_mode='grayscale', batch_size=batch_size,
                                                        class_mode='categorical')

model.fit_generator(train_generator, steps_per_epoch=num_train_samples // batch_size, epochs=epochs,
                    validation_data=validation_generator, validation_steps=num_validation_samples // batch_size,
                    callbacks=callbacks)

model.save('model2.h5')
