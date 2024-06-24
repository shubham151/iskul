import re
import json

def parse_questions_with_regex(lines):
    # Regular expression pattern to capture the structure of each question block
    pattern = re.compile(
        r'Ques\) (?P<question>.+?)\s*'
        r'A\) (?P<option1>.+?)\s*'
        r'B\) (?P<option2>.+?)\s*'
        r'C\) (?P<option3>.+?)\s*'
        r'D\) (?P<option4>.+?)\s*'
        r'Correct Response\) (?P<correct_response>[A-D])', re.DOTALL)

    # pattern = re.compile(
    #     r'Ques\) (?P<question>.+?)\s*' \
    #     r'A\) (?P<option1>.+?)\s*' \
    #     r'B\) (?P<option2>.+?)\s*' \
    #     r'C\) (?P<option3>.+?)\s*' \
    #     r'D\) (?P<option4>.+?)\s*' \
    #     r'Correct Response\) (?P<correct_response>[A-D])\) (?P<correct_answer>.+?)\s*', re.DOTALL)


    quiz = []

    for i, line in enumerate(lines):
        match = pattern.search(line)
        if match:
            # Extract all groups to a dictionary
            data = match.groupdict()
            correct_option = "option" + str(ord(data['correct_response']) - ord('A') + 1)
            # Create a dictionary for the current question formatted for JSON output
            question_dict = {
                f"question{i+1}": {
                    "question": data['question'].strip(),
                    "option1": data['option1'].strip(),
                    "option2": data['option2'].strip(),
                    "option3": data['option3'].strip(),
                    "option4": data['option4'].strip(),
                    "correct_response": data[correct_option].strip() 
                }
            }

            quiz.append(question_dict)

    # Convert the list of questions to JSON format
    # quiz_json = json.dumps({"quiz": quiz}, indent=4)
    return quiz

def write_json_to_file(json_data, filename):
    with open(filename, 'w') as file:
        file.write(json_data)

def question_parser(lines):
    parsed_json = parse_questions_with_regex(lines)
    filename = 'outputs/quiz_data.json'
    write_json_to_file(parsed_json, filename)
    return parsed_json

# txt = ["Ques) What is one of the challenges in deep learning mentioned in the text?        A) Face recognition        B) Medical diagnosis        C) Overfitting        D) Autonomous vehicles        Correct Response) C) Overfitting","Ques) What is one of the challenges in deep learning mentioned in the text?        A) Face recognition        B) Medical diagnosis        C) Overfitting        D) Autonomous vehicles        Correct Response) C) Overfitting"]
# txt = ['Ques) What is one of the challenges in deep learning mentioned in the text?        A) Face recognition        B) Medical diagnosis        C) Overfitting        D) Autonomous vehicles        Correct Response) C) Overfitting','Ques) What is one of the challenges in deep learning mentioned in the text?        A) Face recognition        B) Medical diagnosis        C) Overfitting        D) Autonomous vehicles        Correct Response) C) Overfitting','Ques) What is one of the challenges in deep learning mentioned in the text?        A) Face recognition        B) Medical diagnosis        C) Overfitting        D) Autonomous vehicles        Correct Response) C) Overfitting']
# txt = ['Ques) What is one of the challenges in deep learning mentioned in the text?        A) Face recognition        B) Medical diagnosis        C) Overfitting        D) Autonomous vehicles        Correct Response) C ']
# print(question_parser(txt))