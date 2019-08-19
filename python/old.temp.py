
#http://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=100x100&color=255-255-255&bgcolor=3F2A56

import pandas as pd
import dominate
from dominate.tags import *
from dominate.util import raw

import os 

def downloadQRApp(data,directory):
        import requests

        url = "http://api.qrserver.com/v1/create-qr-code/?data"
        url2='&size=100x100&color=255-255-255&bgcolor=3F2A56'
        response = requests.get(url+data+url2)
        if response.status_code == 200:
                with open(directory, 'wb') as f:
                        f.write(response.content)
        else:
                print("Unable to download qr code")

def createProfilecard(firstName,lastName,jobTitle,number,email,twitter,linkedin,github):
        with div(cls='column') as d:
            with div(cls="card"):
                img(src=findPersonImage(firstName,lastName,os.listdir('./pics') ) ,alt="Jane" ,style="width:100%")
                with div(cls="container"):
                    name= firstName + ' '+ lastName
                    h2(name)
                    p(jobTitle,cls='title')
                    
                    createSocialIcons(number,email,twitter,linkedin,github)
                    raw("<a class='contact w3-hover-shadow' href='https://www.csps-efpc.gc.ca/About_us/Business_lines/digitalacademy-eng.aspx' target='_blank'>Digital Academy / Academie Du Numerique</a>")
                    
                    
        return d


def findPersonImage(firstName,lastName,listOfPics):
        image=nameHasPicture(firstName,listOfPics)
        if(image):
                return './python/pics/'+image
        else:
                return 'https://pbs.twimg.com/profile_images/1083069803236073472/oJzQVirc_400x400.jpg'


# In[4]:


def createSocialIcons(number,email,twitter,linkedin,github):
    with div(cls="social-icons") as d:
        email='mailto:'+email

        with a(href=email):
                 i(cls="fa fa-envelope")
        number='tel:'+number
        with a(href=number):
                i(cls="fa fa-phone-square")

        if(twitter or not(twitter.isnull())):    
                with a(href=twitter):
                        i(cls="fa fa-twitter")
        if(linkedin or not(linkedin.isnull())):         
                with a(href=linkedin):
                        i(cls="fa fa-linkedin")
        if(github):         
                with a(href=github):
                        i(cls="fa fa-github-square")

        
        
        return d      


# In[5]:


def createMeetTheTeamPage():
    data = pd.read_csv('Corresponding details - Sheet1.csv' ).fillna('') 
    for index, row in data.iterrows():
        a=createProfilecard(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
        print(a)


# In[6]:


def nameHasPicture(name,listNames):
    for x in listNames:
        if name.lower() in x.lower():
            return x
    return False


# In[7]:

k="""
import os
listOfPics=os.listdir('./pics') 
namePic={}
for index ,row in data.iterrows():
    fName=row[0]
    lName=row[1]
 
    if (nameHasPicture(fName,listOfPics)):
        print('yes we found a pic for ' + fName +' '+ lName)
        namePic[fName+lName]=nameHasPicture(fName,listOfPics)
    else:
        print('no pic for ' + fName)
"""
            



# In[ ]:



createMeetTheTeamPage()

# In[ ]:




