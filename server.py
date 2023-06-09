from flask import Flask,request, send_from_directory, make_response, jsonify
from flask_cors import CORS
from questions import generate_questions
from roadmap import generate_roadmap_info
from linkgen import getLinks


app = Flask(__name__,  static_url_path='', static_folder='static')
CORS(app)


@app.route('/')
def home_route():
  return 'server active'

@app.route('/roadmap')
def roadmap_route():
  return send_from_directory('views', 'roadmap.html')

# @app.route('/roadmap_info')
# def roadmap_info_route():
#   topic = request.args.get('topic')
#   questions = generate_roadmap_info(topic)
#   return questions

@app.route('/questions')
def questions_route():
  url = request.args.get('url')
  questions = generate_questions(url)
  return { 'questions': questions }

@app.route("/roadmap_info")
def linkGen():
  topic = request.args.get('topic')
  return(getLinks(topic))


if __name__ == '__main__':
  app.run(port='8250')