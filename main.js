// sttings game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Abdelrahman Hany`

// setting game options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// manage words
let wordToGuess = "";
const words = ["Create","Update","Delete","Master","Branch","School","Animal","Huaman"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".messeg");

// manage hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const gitHintButton = document.querySelector(".hint");
gitHintButton.addEventListener("click", getHint);

function generateInput() {
    // create main try div
    const inputsContainer = document.querySelector(".inputs");
    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`Try${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        // create inputs
        for (let j = 1; j <= numberOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess${i}letter${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    // Disable all inputs exept first one
    const inputsInDisableDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisableDiv.forEach((input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        // convert to upper case
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            // console.log(index);
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });

        input.addEventListener("keydown", function (e) {
            // console.log(e);
            const currentIndex = Array.from(inputs).indexOf(e.target);
            // console.log(currentIndex);
            if (e.key === "ArrowRight") {
                const nextInput = currentIndex +1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (e.key === "ArrowLeft") {
                const PrevInput = currentIndex -1;
                if (PrevInput >= 0) inputs[PrevInput].focus();
            }
        });
    });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleWord);

console.log(wordToGuess);
function handleWord() {
    let successGuess = true;
    
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputField = document.querySelector(`#guess${currentTry}letter${i}`);
        const letter = inputField.value.toLowerCase();
        const acctualLatter = wordToGuess[i - 1];

        // game logic
        if (letter === acctualLatter) {
            // correct and place
            inputField.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
            // correct but not in place
            inputField.classList.add("not-in-place");
            successGuess = false;
        } else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    // check if user win or lose
    if (successGuess === true) {
        messageArea.innerHTML = `you win after ${currentTry} tries the word is <span>${wordToGuess}</span>`;
        // add disabled class on all try dives
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        // disable guess button
        guessButton.disabled = true;

    } else {
        document.querySelector(`.Try${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.Try${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));
        currentTry++;
        const nextTryInput = document.querySelectorAll(`.Try${currentTry} input`)
        nextTryInput.forEach((input) => (input.disabled = false));

        let el = document.querySelector(`.Try${currentTry}`);
        if (el) {
            document.querySelector(`.Try${currentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        } else {
            guessButton.disabled = true;
            messageArea.innerHTML = `You lose the word is <span>${wordToGuess}</span>`
        }
    }
}

function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints
    }
    if (numberOfHints === 0) {
        gitHintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])")
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    
    

    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        console.log(randomIndex);
        console.log(randomInput);
        console.log(indexToFill);
        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }
}

function handelBackSpace(event) {
    if (event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        // console.log(currentIndex);
        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex -1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
}
document.addEventListener("keydown", handelBackSpace)

window.onload = function () {
    generateInput();
};


