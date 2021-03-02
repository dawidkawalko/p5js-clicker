// Constants
const WIDTH = 900;
const HEIGHT = 900;
const LERP_LIMIT = 0.99;
const PULSE_RADIUS = 300;
const MIN_PULSE_RADIUS = 10;
const MAX_PULSE_RADIUS = 1000;
const PULSE_SPEED = 0.025;
const SCOREBUBBLE_SPEED = 0.015;
const MAX_SCORE = 100;

// Variables
let pulseInterval = 50;
let timeToPulse = pulseInterval;
let pulses = [];
let scoreBubbles = [];
let showScore = true;
let combo = 0;
let maxCombo = 0;
let totalScore = 0;
let clicks = 0;

// Controls
let showScoreCheckbox;
let pulseIntervalSlider;

function setup() {
  frameRate(60);
  createCanvas(WIDTH, HEIGHT);

  showScoreCheckbox = createCheckbox('Show score values', true);
  showScoreCheckbox.changed(function () {
    showScore = this.checked();
  });

  pulseIntervalSlider = createSlider(10, 100, pulseInterval, 10);
}

function draw() {
  background(0);

  timeToPulse -= 1;
  if (timeToPulse === 0) {
    addPulse(WIDTH / 2, HEIGHT / 2, PULSE_RADIUS, -1, PULSE_SPEED);
    timeToPulse = pulseIntervalSlider.value();
  }

  drawPulses();
  drawScoreBubbles();
  drawLabels();
}

function drawPulses() {
  for (let i = pulses.length - 1; i >= 0; i--) {
    if (!pulses[i].draw(LERP_LIMIT, MAX_SCORE)) {
      pulses.splice(i, 1);
    }
  }
}

function drawScoreBubbles() {
  for (let i = scoreBubbles.length - 1; i >= 0; i--) {
    if (!scoreBubbles[i].draw(LERP_LIMIT, MAX_SCORE, showScore)) {
      scoreBubbles.splice(i, 1);
    }
  }
}

function drawLabels() {
  textSize(25);
  noStroke();
  fill(color('rgba(255, 255, 255, 0.25)'));

  textAlign(LEFT);
  text('Synchronize your clicks with the pulse', 10, HEIGHT - 35);
  text('Use controls below to change your settings', 10, HEIGHT - 10);

  textAlign(RIGHT);
  text(`Max combo: ${maxCombo}`, WIDTH - 10, HEIGHT - 10);

  const averageScore = totalScore === 0 ? 0 : totalScore / clicks;
  textAlign(RIGHT);
  text(`Avg score: ${Math.floor(averageScore)}`, WIDTH - 10, HEIGHT - 35);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < WIDTH && mouseY > 0 && mouseY < HEIGHT) {
    const score = calculateScore();
    totalScore += score;
    clicks += 1;

    if (score >= 95) {
      combo += 1;
      if (combo > maxCombo) {
        maxCombo = combo;
      }
    } else {
      combo = 0;
    }

    addPulse(
      mouseX,
      mouseY,
      map(score, 0, MAX_SCORE, MIN_PULSE_RADIUS, MAX_PULSE_RADIUS),
      score,
      PULSE_SPEED
    );
    addScoreBubble(mouseX, mouseY, score, combo, SCOREBUBBLE_SPEED);
  }
}

function calculateScore() {
  // Calculate score as a percentage (0..1) and scale up
  // Score is based on how close to the actual pulse the user has clicked
  const halfInterval = pulseIntervalSlider.value() / 2;

  let score = Math.abs(timeToPulse - halfInterval);
  score = map(score, 0, halfInterval, 0, 1);
  score = Math.floor(MAX_SCORE * score);

  return score;
}

function addPulse(x, y, r, score, speed) {
  pulses.push(new Pulse(x, y, r, score, speed));
}

function addScoreBubble(x, y, score, combo, speed) {
  scoreBubbles.push(new ScoreBubble(x, y, score, combo, speed));
}
