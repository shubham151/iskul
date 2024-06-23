from utils.groq_client import client 

def generate_summary(txt):
    intermediate_summary = ""

    for i in range(0,len(txt.split(". ")),50):
        #time.sleep here?
        partial_txt = "".join(txt.split(". ")[i:i+50])
        partial_summary = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Summarize the following text in 100 words: {partial_txt}",
                }
            ],
            model="llama3-70b-8192",
        )
        intermediate_summary+=(partial_summary.choices[0].message.content+" ")

    final_summary = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Summarize the following text in 100 words: {intermediate_summary}",
                }
            ],
            model="llama3-70b-8192",
        )

    return final_summary.choices[0].message.content