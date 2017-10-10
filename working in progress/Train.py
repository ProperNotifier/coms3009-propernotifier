from sklearn import svm
import cPickle
import string
import os
import LoadImage


def Capslaters():
    A = list(string.ascii_uppercase)

    return A

def Lowcapslaters():
    A = list(string.ascii_lowercase)
    return A
def NumbersPath():
    A = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    return A
def NumbersLable():
    A = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    return A


target = []
data = []

CapsArray  = Capslaters()
SmallArray = Lowcapslaters()
Digitpath = NumbersPath()
DigitArray = NumbersLable()

for i in range(len(CapsArray)):
   PathtoC = os.getcwd()+'/TrainingData/NewTrainC/' + CapsArray[i]
   CapsL,CapsHist = LoadImage.LoadImage(CapsArray[i],PathtoC)
   for i in range(len(CapsHist)):
       data.append(CapsHist[i])

   for i in range(len(CapsL)):
       target.append(CapsL[i])


for i in range(len(CapsArray)):
   PathtoS = os.getcwd()+'/TrainingData/NewTrain/' + SmallArray[i]
   SmallL,SmallHist = LoadImage.LoadImage(SmallArray[i],PathtoS)
   for i in range(len(SmallHist)):
       data.append(SmallHist[i])

   for i in range(len(SmallL)):
       target.append(SmallL[i])


'''
for i in range(len(Digitpath)):
   PathtoD = os.getcwd()+'/TrainingData/NewTrainD/' + Digitpath[i]
   DigitL,DigitHist = LoadImage.LoadImage(DigitArray[i],PathtoD)
   for i in range(len(DigitHist)):
       data.append(DigitHist[i])

   for i in range(len(DigitL)):
       target.append(DigitL[i])


print (len(data),len(target))
'''


clf = svm.SVC(gamma=0.0001,C=100)
print (len(data),len(target))
clf.fit(data, target)


print ('done')

f2 = open("svc1.cpickle","w")
f2.write(cPickle.dumps(clf))
f2.close()

print ('done')
