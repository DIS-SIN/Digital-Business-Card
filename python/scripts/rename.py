import os
import subprocess as sp
from shutil import copyfile

DEST='./dest/'
def main():
    for x in os.listdir('./pics'):
        sp.call(['eog','./pics/'+x])
        name=raw_input("What is the person name?")
        copyfile('./pics/'+x,DEST+name+'.jpg')
        
main()
