class ScoreBubble {
  constructor(x, y, score, combo, speed) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.combo = combo;
    this.speed = speed;
    this.counter = 0;
  }

  draw(lerpLimit, maxScore, showScore) {
    this.counter += this.speed;
    if (this.counter >= lerpLimit) {
      return false;
    }

    const y1 = lerp(this.y, this.y - 200, this.counter);
    const y2 = lerp(this.y, this.y - 300, this.counter);
    const c = this.getColor(maxScore);

    fill(c);

    if (showScore) {
      textSize(30);
      text(this.score, this.x, y1);
    }

    textSize(20);
    if (this.score < 20) {
      text('bad', this.x, y2 - 50);
    } else if (this.score >= 99) {
      text('UNBELIEVABLE', this.x, y2 - 50);
    } else if (this.score > 95) {
      text('perfect!', this.x, y2 - 50);
    } else if (this.score > 80) {
      text('great', this.x, y2 - 50);
    }

    if (this.combo >= 3) {
      textSize(30);
      const r = Math.random() <= 0.33 ? 0 : 255;
      const g = Math.random() <= 0.33 ? 0 : 255;
      const b = 0;

      fill(r, g, b);

      const y3 = lerp(this.y, this.y - 100, this.counter);
      text(`combo x${this.combo}!`, this.x + 50, y3 - 100);
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
