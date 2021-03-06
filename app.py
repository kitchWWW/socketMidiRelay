from flask_socketio import send, emit

from flask import send_from_directory
from flask import Flask, render_template
from flask_socketio import SocketIO
from flask import send_file

app = Flask(__name__, static_url_path='/socketMidiRelay',static_folder='socketMidiRelay')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))
    json['wa'] = 'weee'
    emit('my response', json, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
