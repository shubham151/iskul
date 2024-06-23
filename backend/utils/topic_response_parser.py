import re

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
            "sub_topics": [{"sub_topic": sub.strip()} for sub in sub_topics]
        })

    return topics