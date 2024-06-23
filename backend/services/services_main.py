import json
from services.flash_card_generator import generate_flash_cards
from services.quiz_generator import generate_quiz
from services.summary_generator import generate_summary
from services.topic_generator import generate_topics
from services.video_fetcher import fetch_vids

user_input =    {
                "topic": "Deep Q Learning",
                "max_duration_in_hours": 2 ,
                "level": "Intermediate"
                }

def service(user_input):
    topic_name = user_input['topic']
    max_duration_in_hours = user_input['max_duration_in_hours']
    level = user_input["level"]

    #topic generation
    topics = generate_topics(topic_name,level)

    response = []

    for topic in topics:
        topic_body = {}
        main_topic = topic["main_topic"]
        topic_body["main_topic"] = main_topic
        topic_body["sub_topic"] = []
        summaries = []
        for sub_topic in topic["sub_topics"]:
            try:
                vid = fetch_vids(f"{topic_name}+{main_topic}+{sub_topic}")[0]
                print("video fetched")
                sub_topic_title = vid['title']
                link = vid['link']
                transcript = vid['transcript']
                summary = generate_summary(transcript, f"{topic_name}+{main_topic}+{sub_topic}")
                print("summary done")
                summaries.append(summary)
                topic_body["sub_topic"].append({
                    "sub_topic": sub_topic_title,
                    "url": link,
                    "summary": summary
                })
            except IndexError as i:
                continue
            
        quiz = generate_quiz(summaries)
        print("quiz generated")
        flash_cards = generate_flash_cards(summaries)
        print("flash card generated")
        topic_body["flash_cards"] = flash_cards
        topic_body["quiz"] = quiz
        response.append(topic_body)
    
    return response
