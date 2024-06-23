import requests
import os
from dotenv import load_dotenv
import time

load_dotenv()
api_key = os.getenv('YT_TO_MP3_KEY')

api_url = "https://youtube-to-mp315.p.rapidapi.com/download"

def download_video(link, file_name):
    querystring = {"url":link,"format":"mp3"}
    payload = {}
    headers = {
	    "x-rapidapi-key": api_key,
	    "x-rapidapi-host": "youtube-to-mp315.p.rapidapi.com",
	    "Content-Type": "application/json"
    }

    response = requests.post(api_url, json=payload, headers=headers, params=querystring)

    # print(response.json())
    res = response.json()
    dl_url = res['downloadUrl']
    status = None
    flag = 0

    while status != 200:
        response = requests.get(dl_url)
        status = response.status_code

        if status == 200:
            with open(file_name, 'wb') as file:
                file.write(response.content)
                flag = 1
            break
        # else:
        #     print(status)
        time.sleep(10)

    if flag == 0:
        response = requests.get(dl_url)
        with open(file_name, 'wb') as file:
            file.write(response.content)

# download_video("https://www.youtube.com/watch?v=DuikFLPt8WQ","audio/test4.mp3")