def first_page_output_prompt(topic_name, proficiency):
    return f'''
                Please provide a structured list of topics to learn for the subject {topic_name} in the following format:

                1) Main Topic 1
                    a) Sub Topic 1
                    b) Sub Topic 2

                2) Main Topic 2
                    a) Sub Topic 1
                    b) Sub Topic 2

                3) Main Topic 3
                    a) Sub Topic 1
                    b) Sub Topic 2
                    c) Sub Topic 3

                The proficiency level in the topic given is {proficiency}.There should be no more than 5 main topics, but each main topic can have as many subtopics as necessary. Make sure that the main topics and subtopics are specific and technical. Avoid generic terms. Each subtopic should cover a distinct technical aspect of {topic_name}. The list should be practical and concise.
        '''