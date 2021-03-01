class ScoreBubble {
  constructor(x, y, score, speed) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.speed = speed;
    this.counter = 0;
  }

  draw(lerpLimit, maxScore, showScore) {
    this.counter += this.speed;
    if (this.counter >= lerpLimit) {
      return false;
    }

    const y = lerp(this.y, this.y - 200, this.counter);
    const c = this.getColor(maxScore);

    fill(c);

    if (showScore) {
      textSize(30);
      text(this.score, this.x, y);
    }

    textSize(20);
    if (this.score < 20) {
      text('bad', this.x, y - 50);
    } else if (this.score >= 99) {
      text('UNBELIEVABLE', this.x, y - 50);
    } else if (this.score > 95) {
      text('perfect!', this.x, y - 50);
    } else if (this.score > 80) {
      text('great', this.x, y - 50);
    }

    return true;
  }

  getColor(maxScore) {
    const alphaStart = 1.0;

    const alpha = lerp(0, 1, this.counter);
    const red = color(`rgba(255, 0, 0, ${alphaStart - alpha})`);
    const yellow = color(`rgba(255, 255, 0, ${alphaStart - alpha})`);
    const green = color(`rgba(0, 255, 0, ${alphaStart - alpha})`);

    let c;
    let amount = this.score / maxScore;

    if (amount <= 0.5) {
      c = lerpColor(red, yellow, map(amount, 0, 0.5, 0, 1.0));
    } else {
      c = lerpColor(yellow, green, map(amount, 0.5, 1.0, 0, 1.0));
    }

    return c;
  }
}
