import os
import subprocess as sp
from shutil import copyfile

DEST='./dest/'
picsToRename='newPics/'
def main():
    for x in os.listdir(picsToRename):
        sp.call(['eog',picsToRename+x])
        name=raw_input("What is the person name?")
        copyfile(picsToRename+x,DEST+name+'.jpg')
        
main()
