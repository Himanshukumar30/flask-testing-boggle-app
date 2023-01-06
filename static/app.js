class boggleApp {
  constructor(boardId) {
    this.word = word;
    this.score = 0;
    this.words = new Set();
    this.board = $("#" + boardId);

    $(".word").on("submit", this.handleSubmit(this));
  }

  //   Handle form submit
  async handleSubmit(e) {
    e.preventDefault();
    const $word = $(".word", this.board);
    let word = $word.val();

    if (!word) return;

    if (this.words.has(word)) {
      this.showMessage(`${word} already exists`, "err");
      return;
    }

    const resp = await axios.get("/check-word", { params: { word: word } });

    if (resp.data.result === "not-word") {
      this.showMessage(`${word} is not a valid English word`, "err");
    } else if (resp.data.result === "not-on-board") {
      this.showMessage(`${word} is not a valid word on this board`, "err");
    } else {
      this.showWord(word);
      this.score += word.length;
      this.showScore();
      this.words.add(word);
      this.showMessage(`Added: ${word}`, "ok");
    }
    $word.val("").focus();
  }

  //   Display status message
  showMessage(msg, cls) {
    $(".msg", this.board).text(msg).removeClass().addClass(`msg ${cls}`);
  }
}
