#mindmap-gen
deployment_name='chatgpt'

import os
import openai
import json

openai.api_key = "739fd2d9541742f481c08d8f79999b6b"
openai.api_base = "https://chi.openai.azure.com/"
openai.api_type = 'azure'
openai.api_version = '2023-03-15-preview'

def generate_questions(topic):
    pr = """
    create a roadmap of youtube videos along with links to learn %s
    in a json format
    example 
    {'difficulty':[
    {'title':title, 'video link':video link}]}
    """ % topic
    response = openai.ChatCompletion.create(
    engine="chatgpt", # engine = "deployment_name".
    messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": pr},
        ]
    )
    return(response['choices'][0]['message']['content'])

def removenoise(parseddata):
    newparse = parseddata[parseddata.find("{"):(len(parseddata)-parseddata[::-1].find('}'))]
    newparse = json.loads(newparse)

    return newparse

def getLinks(topic):
  rawjson = generate_questions(topic)
  rawjson = removenoise(rawjson)
  return rawjson