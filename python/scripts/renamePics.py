import os 
import shutil

for file in os.listdir('../pics/'):
    #print(file)
    if("-min"  in file):
        print(file)
        newFileName=file.replace("-min","")
        
        shutil.copy("../pics/"+file,"../pics/"+newFileName)