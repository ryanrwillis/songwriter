import flask
from flask import jsonify
from helpers import generateLyrics


app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/test', methods=['GET'])
def home():
    return "test response"


@app.route('/complete', methods=['GET'])
def complete():
    seed = flask.request.headers['input']
    predict_length = int(flask.request.headers['predict_length'])
    prediction = generateLyrics(seed, new_words=predict_length)

    return jsonify({
        'request': seed,
        'response': prediction
    })

app.run()