from utils.groq_client import client
from utils.constants import first_page_output_prompt
from utils.topic_response_parser import parse_input_text

def generate_topics(topic_name, level):
    chat_completion = client.chat.completions.create(
    messages=[
            {
                "role": "user",
                "content": first_page_output_prompt(topic_name, level),
            }
        ],
        model="llama3-70b-8192",
    )

    content = chat_completion.choices[0].message.content

    return parse_input_text(content)

