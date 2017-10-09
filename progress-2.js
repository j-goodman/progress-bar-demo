var progress = {
  quizProgress: 0,
  quizPages: 10,
  seriesProgress: 0,
  seriesQuizzes: 6,
  totalPages: 100,
}

var canvas;
var ctx;

// function keydown (event, value) {
//   value = (!value && value !== 0)? document.getElementById('quiz-progress').value : 0;
//   if (parseInt(value)) {
//     progress.quizProgress = parseInt(value);
//   }
//   update();
// }

// window.onkeydown = keydown;

function animateRectangle (ctx, from, to, time, frameLength, backgroundFnc, callback) {
  // 'from' and 'to' are objects: {x: 0, y: 0, width: 1, height: 1}
  // time and frameLength are given in milliseconds

  var frame = 0;
  var frames = time / frameLength;
  var height = from.height;
  var interval;
  var rate;
  var width = from.width;
  var x = from.x;
  var y = from.y;

  var increments = {
    x: (to.x - from.x) / frames,
    y: (to.y - from.y) / frames,
    width: (to.width - from.width) / frames,
    height: (to.height - from.height) / frames,
  }

  interval = window.setInterval(function () {
    rate = (.5 - Math.abs((frame/frames) - .5)) * 4;
    x += increments.x * rate;
    y += increments.y * rate;
    width += increments.width * rate;
    height += increments.height * rate;
    if (backgroundFnc) { backgroundFnc() };
    ctx.fillRect(x, y, width, height);
    frame ++;
    if (frame >= frames) {
      window.clearInterval(interval);
      ctx.fillRect(to.x, to.y, to.width, to.height);
      if (callback) { callback() };
    }
  }, frameLength);
}

function update () {
  draw();
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Empty bars
  ctx.fillStyle = '#ddd';
  ctx.fillRect(0, 0, canvas.width, 28);
  ctx.fillRect(0, 36, canvas.width, 28);

  // Quiz bar
  ctx.fillStyle = '#800';
  ctx.fillRect(0, 36, canvas.width * (progress.quizProgress / progress.quizPages), 28);
  ctx.stroke()

  // Series bar
  ctx.fillStyle = '#800';
  ctx.fillRect(0, 0, canvas.width * (progress.seriesProgress / progress.seriesQuizzes), 28);
}

window.onload = function () {
  canvas = document.getElementsByClassName('progress-bar-container')[0];
  ctx = canvas.getContext('2d');
  document.getElementsByClassName('advance')[0].onclick = advance;
  update();
}

function advance () {
  var quizInput;
  var seriesInput;
  quizInput = document.getElementById('quiz-progress');
  seriesInput = document.getElementById('series-progress');
  if (parseInt(quizInput.value) + 1 <= progress.quizPages) {
    var from;
    var to;
    animateRectangle(ctx,
      {
        x: 0,
        y: 36,
        width: canvas.width * (progress.quizProgress / progress.quizPages),
        height: 28,
      }, {
        x: 0,
        y: 36,
        width: canvas.width * ((progress.quizProgress + 1) / progress.quizPages),
        height: 28,
      },
      100, 30, draw,
      function (quizInput, progress) {
        quizInput.value = parseInt(quizInput.value) + 1;
        progress.quizProgress = parseInt(quizInput.value);
        update();
      }.bind(this, quizInput, progress)
    )
  } else {
    quizInput.value = 0;
    progress.quizProgress = 0;
    animateRectangle(ctx,
      {
        x: 0,
        y: 36,
        width: canvas.width,
        height: 28,
      }, {
        x: (progress.seriesProgress) * canvas.width * (1 / progress.seriesQuizzes),
        y: 0,
        width: canvas.width * (1 / progress.seriesQuizzes),
        height: 28,
      },
      300, 30, draw,
      function (quizInput, seriesInput, progress) {
        seriesInput.value = parseInt(seriesInput.value) + 1;
        progress.seriesProgress = parseInt(seriesInput.value);
      }.bind(this, quizInput, seriesInput, progress)
    )
  }
}
