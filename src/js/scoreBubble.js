class ScoreBubble {
  constructor(x, y, score, combo, speed, showScore) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.combo = combo;
    this.speed = speed;
    this.showScore = showScore;
    this.counter = 0;
  }

  draw(lerpLimit, maxScore) {
    this.counter += this.speed;
    if (this.counter >= lerpLimit) {
      return false;
    }

    const dx = 30 * sin(7 * this.counter);
    const y1 = lerp(this.y, this.y - 200, this.counter);
    const y2 = lerp(this.y, this.y - 300, this.counter);
    const y3 = lerp(this.y, this.y - 100, this.counter);

    const c = this.getColor(maxScore);
    fill(c);

    if (this.showScore) {
      this.showScoreValue(this.x + dx, y1);
    }

    this.showScoreLabel(this.x - dx, y2 - 30);

    if (this.combo >= 3) {
      this.showCombo(this.x + dx + 50, y3 - 100);
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

  showScoreValue(x, y) {
    textSize(30);
    text(this.score, x, y);
  }

  showScoreLabel(x, y) {
    textSize(20);
    if (this.score < 20) {
      text('bad', x, y);
    } else if (this.score >= 99) {
      text('UNBELIEVABLE', x, y);
    } else if (this.score > 95) {
      text('perfect!', x, y);
    } else if (this.score > 80) {
      text('great', x, y);
    }
  }

  showCombo(x, y) {
    const r = Math.random() <= 0.33 ? 0 : 255;
    const g = Math.random() <= 0.33 ? 0 : 255;
    const b = 0;

    textSize(30);
    fill(r, g, b);
    text(`combo x${this.combo}!`, x, y);
  }
}
