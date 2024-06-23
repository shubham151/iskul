from utils.groq_client import client 
from utils.constants import question_prompt
from utils.question_response_parser import parse_questions_with_regex

def generate_quiz(txts):
    questions = []
    for txt in txts:
        question = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": question_prompt(txt),
                }
            ],
            model="llama3-70b-8192",
        )
        
        questions.append(question.choices[0].message.content)
    qq = parse_questions_with_regex(questions)
    return qq
    