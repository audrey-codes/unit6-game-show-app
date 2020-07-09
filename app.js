document.addEventListener('DOMContentLoaded', () => {

  const qwerty = document.getElementById('qwerty');
  const phrase = document.getElementById('phrase');
  const startButton = document.querySelector('.btn__reset');
  const overlay = document.getElementById('overlay');

  let missed = 0;

  startButton.addEventListener('click', () => {
    overlay.style.display = none;
  });

});
