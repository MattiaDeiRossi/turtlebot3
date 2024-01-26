#!/usr/bin/env python
# Copyright (c) 2024
# Author: Mattia Dei Rossi

import json
import math
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO

import zenoh
from turtlebot3_server.turtlebot3 import *

app = Flask(__name__)
# cors = CORS(app, origins=['http://localhost:5173'])
socketio = SocketIO(app, cors_allowed_origins=['http://localhost:5173'])

z = zenoh.open()
turtlebot = Turtlebot3(z, socketio)

@socketio.on('connect')
def connected():
    print("--- Client connected")

@socketio.on('disconnect')
def disconnect():
    print('--- Client disconnected')

@socketio.on('move')
def move(json):
    turtlebot.move(json['direction'], json['percentuage']) 
# @app.route('/', methods=['GET'])
# @cross_origin()
# def index():
#     return json.dumps({'version' : 1.0})

# @app.route('/joint_states', methods=['GET'])
# @cross_origin()
# def joint_states():
#     return json.dumps({'joint_states': turtlebot._joint_states})

# @app.route('/fwd', methods=['POST'])
# @cross_origin()
# def fwd():
#     turtlebot.move(json.loads(request.data))
#     return "", 201

# @app.route('/bwd', methods=['POST'])
# @cross_origin()
# def bwd():
#     turtlebot.move(json.loads(request.data))
#     return "", 201

# @app.route('/stop', methods=['POST'])
# @cross_origin()
# def stop():
#     turtlebot.move(json.loads(request.data))
#     return "", 201

# @app.route('/sx', methods=['POST'])
# @cross_origin()
# def sx():
#     turtlebot.move(json.loads(request.data))
#     return "", 201

# @app.route('/dx', methods=['POST'])
# @cross_origin()
# def dx():
#     turtlebot.move(json.loads(request.data))
#     return "", 201

if __name__ == '__main__':
#   app.run(debug=True,host='0.0.0.0')
  socketio.run(app, debug=True)