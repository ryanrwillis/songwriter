import flask
from flask import jsonify
from helpers import generateLyrics
import os


app = flask.Flask(__name__, static_folder='./build', static_url_path='/')
app.config["DEBUG"] = True


@app.route('/')
def index():
    return app.send_static_file(filename='index.html')


@app.route('/complete', methods=['GET'])
def complete():
    seed = flask.request.headers['input']
    predict_length = int(flask.request.headers['predict_length'])
    prediction = generateLyrics(seed, new_words=predict_length)

    return jsonify({
        'request': seed,
        'response': prediction
    })

# @app.errorhandler(404)
# def not_found(e):
#     return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))