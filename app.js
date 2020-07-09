document.addEventListener('DOMContentLoaded', () => {

  const qwerty = document.getElementById('qwerty');
  const phrase = document.querySelector('#phrase ul');
  const startButton = document.querySelector('.btn__reset');
  const overlay = document.getElementById('overlay');

  let missed = 0;

// START BUTTON
  startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

// PHRASES
  let phrases = [
    "for the birds",
    "a different kettle of fish",
    "bet your bottom dollar",
    "a drop in the ocean",
    "for all intents and purposes"
  ]

// GET RANDOM PHRASE FUNCTION
  function getRandomPhraseAsArray(arr) {
    let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    let words = randomPhrase.split("");
    return words;
  }

});
