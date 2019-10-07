
#http://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=100x100&color=255-255-255&bgcolor=3F2A56

import pandas as pd
import dominate
from dominate.tags import *
from dominate.util import raw

import logging as log 
log.basicConfig(format='%(asctime)s - %(message)s', level=log.INFO)

import os 
def createPersonDirectory(firstName,lastName):
        try:
                log.info(f"Attempting to create{firstName} {lastName}")
                rootPath='../people/'
                firstName=firstName.strip()
                path=rootPath+firstName+'/'
                if(not os.path.isdir(path)):
                        os.mkdir(path)
                        log.info(f"Succesfully create{firstName} {lastName} directory.Here is located:{path}")
                        return path
                else:
                        log.info(f"{path} folder already exists")
                        return path
        except Exception as e:
                log.error(f'Failed to create{firstName} {lastName}'+ type(e))


def createInfoJson(first_name,last_name,role,phone_number,email,twitter,linkedin,github):
        try:
                import json
                log.info(f'Attempting to create an info.json for {first_name} {last_name}')
                infoTemplate='../infoJsonTemplate.json'
                with open(infoTemplate,'r') as f:

                        template = json.loads(f.read())
                        template['first_name']=first_name
                        template['last_name']=last_name
                        template['role']=role
                        template['profile_pic']=findPersonImage(first_name,last_name,os.listdir('./pics'))
                        template['phone_number']=phone_number
                        template['email']=email
                        template['linkedin']=linkedin
                        template['twitter']=twitter
                        template['github']=github
                        personDirectory=createPersonDirectory(first_name,last_name)
                        with open(personDirectory+'info.json','w') as personDir:
                                personDir.write(json.dumps(template))
                log.info(f'info.json was succuesfully created for {first_name} {last_name}')
        except Exception as e:
                log.error(f'Unable to create a directory for {first_name} {last_name} \n Error:{e}' )
        



def downloadQRCode(data,directory):
    import requests
    url = "http://api.qrserver.com/v1/create-qr-code/?data="
    url2='&size=200x200&color=255-255-255&bgcolor=3F2A56'
    log.info('URL:'+url+data+url2)
    response = requests.get(url+data+url2)
    if response.status_code == 200:
            with open(directory, 'wb') as f:
                    f.write(response.content)
    else:
        log.error(f"Failed to download QR code for following data: {data} for this directory:{directory}")

def createQRcodes():
        data = pd.read_csv('Corresponding details - Sheet1.csv' ).fillna('') 
        
        for index, row in data.iterrows():
                urlbase='https://darrenpierre90.github.io/digital-business-cards/?'
                fullUrl=urlbase+('person='+row[0].strip())
                log.info(f'Creating QR code for this url:{fullUrl} for this {row[0]}')
                downloadQRCode(fullUrl,createPersonDirectory(row[0],row[2]) +row[0]+'QR.png')

def createProfilecard(firstName,lastName,jobTitle,number,email,twitter,linkedin,github):
        import os 
        fileNames=os.listdir('./pics')
        log.info(f"Creating Profile card for {firstName} {lastName}")
        
        with div(cls="card") as d:
                img(src=findPersonImage(firstName,lastName,fileNames) ,alt="Jane" )
                
                name= firstName + ' '+ lastName
                h1(name)
                p(jobTitle,cls='title')
                log.info(f"Creating Social icons card for {firstName} {lastName}")
                createSocialIcons(number,email,twitter,linkedin,github)
                raw("<a class='contact w3-hover-shadow' href='https://www.csps-efpc.gc.ca/About_us/Business_lines/digitalacademy-eng.aspx' target='_blank'>Digital Academy / Academie Du Numerique</a>")
                

                    
        log.debug(f"This is what {firstName} profile card looks like:{d}")
             
        return d


def nameHasPicture(name,listNames):
    for x in listNames:
        if name.lower() in x.lower():
            return x
    return False

def findPersonImage(firstName,lastName,listOfPics):
        image=nameHasPicture(firstName,listOfPics)
        if(image):
                log.info(f"Image Found for {firstName} {lastName}")
                return './python/pics/'+image
        else:
                log.warn(f"Unable to find image for {firstName} {lastName}")
                return 'https://pbs.twimg.com/profile_images/1083069803236073472/oJzQVirc_400x400.jpg'



def createSocialIcons(number,email,twitter,linkedin,github):
    
    with div(cls="social-icons") as d:
        email='mailto:'+email

        with a(href=email):
                 i(cls="fa fa-envelope")
        number='tel:'+number
        with a(href=number):
                i(cls="fa fa-phone-square")

        if(twitter ):    
                with a(href=twitter):
                        i(cls="fa fa-twitter")
        if(linkedin):         
                with a(href=linkedin):
                        i(cls="fa fa-linkedin")
        if(github):         
                with a(href=github):
                        i(cls="fa fa-github-square")
        
        return d      
def createMeetTheTeamPage():
    data = pd.read_csv('Corresponding details - Sheet1.csv' ).fillna('') 
    with open('./meetTheTeamOutput.txt','w') as f:
        f.write('<div class="container">\n')
        for index, row in data.iterrows():
                createInfoJson(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
                log.info(f'Starting to create Profile cards:')
                a=createProfilecard(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
                f.write(str(a))
        f.write('</div>\n')
def email(to,subject,body,html,attachment):
        import yagmail
        yag = yagmail.SMTP('dpapplication90@gmail.com','Basketball77')
        yag.send(to='d-pierre90@hotmail.com',subject='hi',contents='hihifdfd')
        yag.send(to = to, subject = subject, contents = [body, html, attachment])


def main():
        createMeetTheTeamPage()
        createQRcodes()

if __name__ == '__main__':
        main()