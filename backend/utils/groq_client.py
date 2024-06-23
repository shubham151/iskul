import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    # This is the default and can be omitted
    api_key=os.environ.get("GROQ_SECRET_ACCESS_KEY"),
)
