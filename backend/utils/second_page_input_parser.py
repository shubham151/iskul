import re
import json

def parse_input_text(text):
    # Compile patterns with improved whitespace handling
    main_topic_pattern = re.compile(r'^\d+\)\s*(.+)$', re.M)
    sub_topic_pattern = re.compile(r'^\s+[a-z]\)\s*(.+)$', re.M)

    # Split the input text by main topics but retain them in the results
    sections = main_topic_pattern.split(text)[1:]
    
    topics = []

    # Process each section, assuming they alternate between main topics and subtopics blocks
    for i in range(0, len(sections), 2):
        main_topic = sections[i].strip()
        sub_topics = sub_topic_pattern.findall(sections[i+1])
        
        topics.append({
            "main_topic": main_topic,
            "sub_topics": [{"sub_topic": sub.strip(), "url":"", "captions":""} for sub in sub_topics],
            "flash_cards": [{"content": ""}],
            "quiz": [{f"question{i}":{"question":"","option1":"","option2":"","option3":"","option4":"","correct_option":""}} for i in range(len())]
        })

    return topics

def save_as_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

with open('outputs/output_topic_list.txt', 'r') as file:
    input_text = file.read()

# Parse the input text
parsed_data = parse_input_text(input_text)

# Save the parsed data as JSON
save_as_json(parsed_data, 'outputs/output_structured.json')