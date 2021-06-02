import keras.models
import tensorflow as tf
from keras.preprocessing.text import Tokenizer, tokenizer_from_json
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout, Bidirectional, Embedding, Activation
import json


# Load Tokenizers
rap_tokenizer = Tokenizer
rap_longest_sequence = 90

with open('models/prod1_t.json') as f:
    data = json.load(f)
    rap_tokenizer = tokenizer_from_json(data)

rap_dict_length = list(rap_tokenizer.word_index.values())[-1] + 1

# Create model

def create_model(dict_length, longest_sequence):
    model = Sequential()
    model.add(Embedding(dict_length, 64, input_length=longest_sequence))
    model.add(Bidirectional(LSTM(100, return_sequences=True)))
    model.add(Dropout(0.2))
    model.add(Bidirectional(LSTM(80)))
    model.add(Dense(dict_length / 2, activation='relu'))
    model.add(Dense(dict_length, activation='softmax'))
    return model

# rap_model = create_model(dict_length=rap_dict_length, longest_sequence=rap_longest_sequence)

rap_model = keras.models.load_model('models/prod1.h5')


def generateLyrics(seed_, model=rap_model, lyric_tokenizer=rap_tokenizer, new_words=8, longest_sequence=rap_longest_sequence):
    seed = seed_
    for i in range(new_words):
        token_list = lyric_tokenizer.texts_to_sequences([seed])[0]
        token_list = pad_sequences([token_list], maxlen=longest_sequence, padding='pre')
        predicted = model.predict_classes(token_list, verbose=0)
        output_word = ""
        for word, index in lyric_tokenizer.word_index.items():
            if index == predicted[0]:
                output_word = word
                break
        seed += " " + output_word
    return seed

