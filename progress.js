var progress = {
  quizProgress: 0,
  quizPages: 10,
  seriesProgress: 0,
  seriesQuizzes: 10,
  totalPages: 100,
}

function keydown (event, value) {
  value = (!value && value !== 0)? document.getElementById('quiz-progress').value : 0;
  if (parseInt(value)) {
    progress.quizProgress = parseInt(value);
  }
  update();
}

window.onkeydown = keydown;

function update () {
  drawQuizProgress();
}

window.onload = function () {
  initializeProgressBar();
  keydown();
  document.getElementsByClassName('advance')[0].onclick = advance;
}

function advance () {
  var quizInput;
  var seriesInput;
  quizInput = document.getElementById('quiz-progress');
  seriesInput = document.getElementById('series-progress');
  if (parseInt(quizInput.value) + 1 <= progress.quizPages) {
    quizInput.value = parseInt(quizInput.value) + 1;
    progress.quizProgress = quizInput.value;
  } else {
    quizInput.value = 0;
    progress.quizProgress = 0;
    addSeriesCounter();
    seriesInput.value = parseInt(seriesInput.value) + 1;
    progress.seriesProgress = seriesInput.value;
  }
  keydown();
}

function addSeriesCounter () {
  var counter;
  var firstCounter;
  var seriesBar;
  var quizBar;
  seriesBar = document.getElementsByClassName('series-bar')[0];
  quizBar = document.getElementsByClassName('quiz-bar')[0];
  counter = document.createElement('div');
  counter.className = 'series-counter';
  firstCounter = document.getElementsByClassName('series-counter')[0];
  firstCounter = firstCounter ? firstCounter : {getBoundingClientRect: function () {return {width: 0}}};
  counter.style.width = quizBar.getBoundingClientRect().width + 'px';
  counter.style.transform = 'translate(0, ' +
    (quizBar.getBoundingClientRect().top - seriesBar.getBoundingClientRect().top).toString()
  + 'px)'
  seriesBar.appendChild(counter);
  setTimeout(function (seriesBar, quizBar, counter) {
    counter.style.transform = 'translate(0, 0)';
    counter.style.width = seriesBar.getBoundingClientRect().width / progress.seriesQuizzes + 'px'
  }.bind(this, seriesBar, quizBar, counter), 200);
}

function initializeProgressBar () {
  var container;
  var element;
  var quizBar;
  var seriesBar;
  var i;
  quizBar = document.createElement('div');
  quizBar.className = 'quiz-bar';
  seriesBar = document.createElement('div');
  seriesBar.className = 'series-bar'
  container = document.getElementsByClassName('progress-bar-container')[0];
  container.appendChild(seriesBar);
  container.appendChild(quizBar);
  for (i = 0; i < progress.quizPages; i++) {
    element = document.createElement('div');
    element.className = 'quiz-counter';
    element.style.width = quizBar.getBoundingClientRect().width / progress.quizPages + 'px';
    quizBar.append(element);
  }
}

function drawQuizProgress () {
  var counters;
  var i;

  counters = document.getElementsByClassName('quiz-counter');
  for (i = 0; i < counters.length; i++) {
    if (i >= progress.quizProgress) {
      counters[i].className = 'quiz-counter';
    } else {
      counters[i].className = 'quiz-counter full-counter';
    }
  }
}
