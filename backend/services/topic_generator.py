from utils.groq_client import client
from utils.constants import first_page_output_prompt

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": first_page_output_prompt("Dynamic Programming","Advanced"),
        }
    ],
    model="llama3-70b-8192",
)

content = chat_completion.choices[0].message.content

with open("./outputs/output_topic_list.txt", 'w') as file:
    file.write(content)

