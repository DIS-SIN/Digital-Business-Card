import yagmail
import pandas as pd
import logging as log
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


def main():
        exemplePic='/home/darren/Pictures/exemple.png'
        dataDetails='../details.csv'
        data = pd.read_csv(dataDetails).fillna('') 
        indexOfName=0
        indexOfEmail=4
        yag = yagmail.SMTP('dpapplication90@gmail.com','Basketball77')
        baseUrl='https://dis-sin.github.io/Digital-Business-Card/?person='
        yag.send(to='d-pierre90@hotmail.com',subject='Here is your QR Code for your personal card',contents="hi")
        for index, row in data.iterrows():
          userName=row[indexOfName].strip()
          userEmail=row[indexOfEmail].strip()
          userUrl=baseUrl+userName
          message=f"""
          Hey {userName},
          
	In case, you wanted a personal business card so people can contact you directly without searching your name in the meet the team page (https://dis-sin.github.io/Digital-Business-Card/meetTheTeam.html) here you go. Your personal business card should look to something similar to the picture below except personalized for you. When your QR code is scanned it should lead you to this URL:{userUrl}
          
To scan a QR code, you need a smartphone with a camera and, in some cases, a mobile app.
          An iPhone running iOS 11 (or later) comes with a built-in QR reader in its camera, and some Android phones also have native functionality.
          Other smartphones may require that you download a mobile app.
          """
        
          downloadQRCode(userUrl,f'./{userName}QRCode.png')
          
if __name__ == '__main__':
    main()