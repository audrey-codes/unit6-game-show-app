const qwerty = document.getElementById('qwerty');
const phraseUL = document.querySelector('#phrase ul');
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const tries = document.querySelector('#scoreboard ol');
const title = document.querySelector('.title');
let missed = 0;

// PHRASES
let phrases = ["for the birds",
    "a different kettle of fish",
    "bet your bottom dollar",
    "a drop in the ocean",
    "for all intents and purposes",
    "happy as a clam",
    "rack your brain",
    "saved by the bell"
]

// START BUTTON
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    resetGame();
});

// GET & RETURN RANDOM PHRASE FUNCTION
function getRandomPhrasesAsArray(arr) {
    let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    let word = randomPhrase.split("");
    return word;
};

// ADD PHRASE TO DISPLAY - LOOP & CREATE ELEMENTS
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        if (arr[i] === " ") {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        phraseUL.appendChild(li);
    }
}

// CHECK LETTER FUNCTION
function checkLetter(button) {
    const lis = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < lis.length; i++) {
        if (button.textContent.toUpperCase() == lis[i].textContent.toUpperCase()) {
            lis[i].classList.add('show');
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
            console.log("letter not found");
            button.classList.add('wrongLetter');
            tries.removeChild(heart);
            missed += 1;
        } else {
            console.log("letter found")
            button.classList.add('chosen');

            // css transition??
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
        title.textContent = 'You won!';
        startButton.textContent = 'Play Again';
    } else {
        if (missed > 4) {
            overlay.className = 'lose';
            const lose = document.querySelector('.lose');
            lose.style.display = 'flex';
            title.textContent = 'You lost!';
            startButton.textContent = 'Try Again';
        }
    }
}

// GAME RESET
function resetGame() {
    phraseUL.innerHTML = '';

    const phraseArray = getRandomPhrasesAsArray(phrases);
    console.log(phraseArray);

    addPhraseToDisplay(phraseArray);

    removeButton = document.querySelectorAll('button');
    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].disabled = false;
        removeButton[i].className = '';
    }

    const heartsRow = document.querySelectorAll('#scoreboard ol li');
    const missingHeart = 5 - heartsRow.length;
    if (missingHeart > 0) {
        for (let i = 0; i < missingHeart; i++) {
            let heartLi = document.createElement('li');
            let heartImg = document.createElement('img');
            heartImg.src = "images/liveHeart.png";
            // add size
            heartImg.width = "30";
            heartImg.height = "35";
            // add class
            heartLi.classList.add('tries');
            heartLi.appendChild(heartImg);
            tries.appendChild(heartLi);
        }
    }
    missed = 0;
}
