# laod env
from dotenv import load_dotenv
load_dotenv()

import os
import openai

openai.api_key = os.getenv("AZURE_OPENAI_KEY")
openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
openai.api_type = 'azure'
openai.api_version = '2022-12-01'

# text-davinci-003
deployment_name='first-deployment'

# Send a completion call to generate an answer
start_phrase = 'Write a tagline for an ice cream shop. '
response = openai.Completion.create(engine=deployment_name, prompt=start_phrase, max_tokens=10)
text = response['choices'][0]['text'].strip()
print(text)