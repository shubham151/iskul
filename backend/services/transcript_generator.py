from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=api_key)

def whisper(file_name):
    audio_file = open(file_name, "rb")
    translation = client.audio.translations.create(
    model="whisper-1", 
    file=audio_file
    )
    return translation.text