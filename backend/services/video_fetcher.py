from youtubesearchpython import VideosSearch
from youtube_transcript_api import YouTubeTranscriptApi
from services.transcript_downloader import download_video
from services.transcript_generator import whisper
from datetime import datetime

def fetch_vids(topic_name):
    videosSearch = VideosSearch(topic_name, limit = 1, region = "US")
    vid_srch = videosSearch.result()
    arr = []
    for i in vid_srch['result']:
        dic = {}
        dic['title'] = i['title']
        dic['link'] = i['link']
        try:
            t = YouTubeTranscriptApi.get_transcript(i['id'], languages=['en'])
            st = ""
            for j in t:
                st += j['text'] + " "
            dic['transcript'] = st
        except Exception:
            print("test")
            now = datetime.now()
            timestamp = now.strftime("%Y%m%d_%H%M%S")
            f_name = f"audio/{timestamp}.mp3"
            download_video(dic['link'],f_name)
            dic['transcript'] = whisper(f_name)
        arr.append(dic)
    return arr
    # dt = json.dumps(arr, indent=4)
    # return dt


# js = fetch_vids("Dynamic programming+Advanced Dynamic Programming Concepts+Dynamic Programming on Trees")
# with open("test.txt", 'w') as file:
#     json.dump(js, file, indent=4)
