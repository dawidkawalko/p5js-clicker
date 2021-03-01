class Pulse {
  constructor(x, y, r, score, speed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.score = score;
    this.speed = speed;
    this.counter = 0.0;
  }

  draw(lerpLimit, maxScore) {
    this.counter += this.speed;
    if (this.counter >= lerpLimit) {
      return false;
    }

    const radius = lerp(0, this.r, this.counter);
    const c = this.getColor(maxScore);

    noStroke();
    fill(c);
    ellipse(this.x, this.y, radius);

    return true;
  }

  getColor(maxScore) {
    const alphaStart = 0.3;

    const alpha = lerp(0, alphaStart, this.counter);
    const red = color(`rgba(255, 0, 0, ${alphaStart - alpha})`);
    const yellow = color(`rgba(255, 255, 0, ${alphaStart - alpha})`);
    const green = color(`rgba(0, 255, 0, ${alphaStart - alpha})`);

    let c = color(`rgba(150, 150, 150, ${alphaStart - alpha})`);
    let amount = this.score / maxScore;

    if (this.score < 0) {
      return c;
    }

    if (amount <= 0.5) {
      c = lerpColor(red, yellow, map(amount, 0, 0.5, 0, 1.0));
    } else {
      c = lerpColor(yellow, green, map(amount, 0.5, 1.0, 0, 1.0));
    }

    return c;
  }
}
