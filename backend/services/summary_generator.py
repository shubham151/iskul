# import nltk
# from nltk.tokenize import word_tokenize
from utils.groq_client import client 
# nltk.download('punkt')

def generate_summary(txt, video_title):
    partial_summary = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": f"Summarize the following youtube video wit the title {video_title} in 100 words"
                    }
                ],
                model="llama3-70b-8192",
            )
    partial_summary = partial_summary.choices[0].message.content
    
    # partial_summary = ""

    # for i in range(0,len(txt.split(" ")),100):
    #     #time.sleep here?
    #     partial_txt = partial_summary.join(txt.split(" ")[i:i+100])
    #     # num_tokens = len(word_tokenize(partial_txt))

    #     try:
    #         partial_summary = client.chat.completions.create(
    #             messages=[
    #                 {
    #                     "role": "user",
    #                     "content": f"Summarize the following text in 50 words: {partial_txt}",
    #                 }
    #             ],
    #             model="llama3-70b-8192",
    #         )
    #         partial_summary = partial_summary.choices[0].message.content
    #     except Exception:
    #         l = len(partial_txt)//2
    #         partial_sum1 = client.chat.completions.create(
    #             messages=[
    #                 {
    #                     "role": "user",
    #                     "content": f"Summarize the following text in 25 words: {partial_txt[:l]}",
    #                 }
    #             ],
    #             model="llama3-70b-8192",
    #         )
    #         partial_sum2 = client.chat.completions.create(
    #             messages=[
    #                 {
    #                     "role": "user",
    #                     "content": f"Summarize the following text in 25 words: {partial_txt[l:]}",
    #                 }
    #             ],
    #             model="llama3-70b-8192",
    #         )
    #         partial_summary = partial_sum1.choices[0].message.content+partial_sum2.choices[0].message.content

        # if(i%20==0):
        #     partial_summary_at_30 = client.chat.completions.create(
        #         messages=[
        #             {
        #                 "role": "user",
        #                 "content": f"Summarize the following text in 100 words: {intermediate_summary}",
        #             }
        #         ],
        #         model="llama3-70b-8192",
        #     )
        #     intermediate_summary = partial_summary_at_30.choices[0].message.content
    
    return partial_summary