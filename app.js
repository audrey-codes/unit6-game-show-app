document.addEventListener('DOMContentLoaded', () => {

  const qwerty = document.getElementById('qwerty');
  const phraseUL = document.querySelector('#phrase ul');
  const startButton = document.querySelector('.btn__reset');
  const overlay = document.getElementById('overlay');
  const tries = document.querySelector('#scoreboard ol');
  const title = document.querySelector('.title');

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

// GET & RETURN RANDOM PHRASE FUNCTION
  function getRandomPhraseAsArray(arr) {
    let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    let words = randomPhrase.split("");
    return words;
  }

// ADD PHRASE TO DISPLAY - LOOP & CREATE ELEMENTS
  function addPhraseToDisplay(arr) {
    for (let i = 0; i < phrases.length; i++) {
      const li = document.createElement('li');
      li.textContent = arr[i];
      if (arr[i] === "") {
        li.className = 'space';
      } else {
        li.className = 'letter';
      }
    }
    phraseUL.appendChild(li);
  }

// CHECK LETTER FUNCTION
  function checkLetter(button) {
    const letter = document.querySelector('.letter');
    let correct = null;
    for (let i = 0; i < letter.length; i++) {
      if (button.textContent.toUpperCase() == letter[i].textContent.toUpperCase()){
        letter[i].classList.add('show')
        correct = button.textContent;
      }
    }
    return correct;
  }

// KEYBOARD EVENT LISTENER
  qwerty.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
      const button = e.target;
      const letterFound = checkLetter(button);
      let heart = tries.firstElementChild;

      if (letterFound == null) {
        button.classList.add('wrongGuess');
        tries.removeChild(heart);
        missed += 1;
      } else {
        button.classList.add('chosen')
      }
      button.disabled = true;
    }
    checkWin();
  });

});
