import json
from flask import Flask, jsonify, request
from services.services_main import service
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/app', methods=['GET'])
def get_course():
  topic = request.args.get('topic')
  duration = request.args.get('duration')
  level = request.args.get('level')

  ip = {
            "topic": topic,
            "max_duration_in_hours": duration ,
            "level": level
        } 
  return jsonify(service(ip))
  
if __name__ == '__main__':
   app.run(port=5000)