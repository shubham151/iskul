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

                The proficiency level in the topic given is {proficiency}.There should be no more than 5 main topics, and each main topic can have at most 2 subtopics. Make sure that the main topics and subtopics are specific and technical. Each subtopic should cover a distinct technical aspect of {topic_name}. Each sub topic should be a specific topic and should be precise. No explanation or sub topics required.
        '''

def question_prompt(txt):
    return f'''
        Given the following text: {txt}. Generate a question in the following format:

        Ques) Question
        A) Option A
        B) Option B
        C) Option C
        D) Option D
        Correct Response) Option C
    '''