from flask_socketio import send, emit

from flask import send_from_directory
from flask import Flask, render_template
from flask_socketio import SocketIO
from flask import send_file

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))
    json['wa'] = 'weee'
    emit('my response', json, broadcast=True)


@app.route('/')
def index():
    print("sending index")
    return send_file('static/index.html')

@app.route('/go.js')
def js():
    print("sending index")
    return send_file('static/go.js')





if __name__ == '__main__':
    socketio.run(app)