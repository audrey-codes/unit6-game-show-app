document.addEventListener('DOMContentLoaded', () => {

  const qwerty = document.getElementById('qwerty');
  const phraseUL = document.querySelector('#phrase ul');
  const startButton = document.querySelector('.btn__reset');
  const overlay = document.getElementById('overlay');
  const tries = document.querySelector('#scoreboard ol');
  const title = document.querySelector('.title');

  let missed = 0;

// PHRASES
  let phrases = [
    "for the birds",
    "a different kettle of fish",
    "bet your bottom dollar",
    "a drop in the ocean",
    "for all intents and purposes"
  ]

// START BUTTON
  startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    resetGame();
  });

// GET & RETURN RANDOM PHRASE FUNCTION
  function getRandomPhraseAsArray(arr) {
    let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    let word = randomPhrase.split("");
    return word;
  }

// ADD PHRASE TO DISPLAY - LOOP & CREATE ELEMENTS
  function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement('li');
      li.textContent = arr[i];
      if (arr[i] === "") {
        li.className = 'space';
      } else {
        li.className = 'letter';
      }
      phraseUL.appendChild(li);
    }
  }

// CHECK LETTER FUNCTION
  function checkLetter(button) {
    const lis = document.querySelector('.letter');
    let match = null;
    for (let i = 0; i < lis.length; i++) {
      if (button.textContent.toUpperCase() == lis[i].textContent.toUpperCase()){
        lis[i].classList.add('show')
        match = button.textContent;
      }
    }
    return match;
  }

// KEYBOARD EVENT LISTENER
  qwerty.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
      const button = event.target;
      const letterFound = checkLetter(button);
      let heart = tries.firstElementChild;

      if (letterFound == null) {
        button.classList.add('wrongletter');
        tries.removeChild(heart);
        missed += 1;
      } else {
        button.classList.add('chosen')
      }
      button.disabled = true;
    }
    checkWin();
  });

  // WIN OR LOSS FUNCTION
    function checkWin() {
      let letters = document.getElementsByClassName('letter');
      let shown = document.getElementsByClassName('show');

      if (letters.length == shown.length) {
        overlay.className = 'win';
        const win = document.querySelector('.win');
        win.style.display = 'flex';
        title.textContent = "Congratulations: You Won!"
        startButton.textContent = "Play Again";
      } else {
        if (missed > 4) {
          overlay.className = 'lose';
          const win = document.querySelector('.lose');
          lose.style.display = 'flex';
          title.textContent = "You Lost: Better Luck Next Time!"
          startButton.textContent = "Try Again";
        }
      }
    }

// GAME RESET
    function resetGame() {
      phraseUL.innerHTML = '';
      const phraseArray = getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(phraseArray);

      removeButton = document.querySelectorAll('button');
      for (let i = 0; i <removeButton.length; i++) {
        removeButton[i].disabled = false;
        removeButton[i].className = '';
      }

      const heartsRow = document.querySelectorAll('#scoreboard ol li');
      const missingHearts = 5 - heartsRow.length;
      if (missingHearts > 0) {
        for (let i = 0; i < missingHearts.length; i++) {
          let heartLI = document.createElement('li');
          let heartIMG = document.createElement('img');
          heartIMG.src = "images/liveHeart.png";
          heartLI.classList.add('tries');
          heartLI.appendChild(heartIMG);
          tries.appendChild(heartLI);
        }
      }
      missed = 0;
    }

});
