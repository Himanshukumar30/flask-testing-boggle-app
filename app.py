from boggle import Boggle
from flask import Flask, session, render_template, request,jsonify
app = Flask(__name__)

app.config['SECRET_KEY'] = "l6ts-k66p-1t-s6cr6t"

boggle_game = Boggle()

@app.route('/')
def homepage():
    """Display the board"""
    board = boggle_game.make_board()
    session['board'] = board
    high_score = session.get('high_score', 0)
    num_plays = session.get('num_plays', 0)
    return render_template('index.html', board=board, high_score = high_score, num_plays=num_plays)
    
@app.route('/check-word', methods=['POST'])
def check_word():
    print(request.form)
    word = request.form["word"]
    print(word)
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)
    return jsonify({'result': response})

@app.route("/post-score", methods=["POST"])
def post_score():
    score = request.json["score"]
    high_score = session.get("high_score", 0)
    num_plays = session.get("num_plays", 0)

    session['num_plays'] = num_plays + 1
    session['high_score'] = max(score, high_score)

    return jsonify(brokeRecord=score > high_score)