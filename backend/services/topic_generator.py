import os
from groq import Groq
from dotenv import load_dotenv
from utils.constants import first_page_output_prompt

load_dotenv()

client = Groq(
    # This is the default and can be omitted
    api_key=os.environ.get("GROQ_SECRET_ACCESS_KEY"),
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": first_page_output_prompt("React JS","Beginner"),
        }
    ],
    model="llama3-70b-8192",
)

with open("./output.txt", 'w') as file:
    file.write(chat_completion.choices[0].message.content)

