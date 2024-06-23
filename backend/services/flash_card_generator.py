from utils.groq_client import client 

def generate_flash_cards(txts):
    flash_cards = []
    for txt in txts:    
        fc_content = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Summarize the following text in 30 words: {txt}",
                }
            ],
            model="llama3-70b-8192",
        )

        content = fc_content.choices[0].message.content
        flash_cards.append({"content": content.split(":\n\n")[-1]})

    return flash_cards