const FRUITS = ["BANANA", "PEACH", "GRAPE", "APPLE", "ORANGE", "MANGO"];

let word = FRUITS[Math.floor(Math.random() * FRUITS.length)]; 
let letters = word.split(""); 
let lives = 6; 
let guessedLetters = [];
let notCorrectedLetters = []
let wrongGuessCount = 0;

const updateLivesDisplay = () => {
    livesDisplay.innerText = ` ${wrongGuessCount} / ${lives}`
}

const hangmanImg = document.querySelector(`.hangman__wrap img`)
const displayContainer = document.querySelector(".answer")
let livesDisplay = document.querySelector(".lives")
let msg = document.querySelector(".msg")
let display = "";
const button = document.querySelector(".play__again")

const resetGame = () => {
    word = FRUITS[Math.floor(Math.random() * FRUITS.length)]; 
    letters = word.split(""); 
    lives = 6; 
    guessedLetters = [];
    notCorrectedLetters = []
    wrongGuessCount = 0;

    btn.forEach(button => {
        button.style.backgroundColor =``;
        button.removeAttribute(`disabled`)
    });

    hangmanImg.src = `images/hangman-0.svg`

    msg.textContent = "";

    updateLivesDisplay()
    
    updateDisplay()
};


button.addEventListener(`click`,() => {
    resetGame()
})


for (let i = 0; i < letters.length; i++) {
    display += " _"
}

displayContainer.textContent = display;
const correctColor = "#16476A"
const wrongColor ="#BF092F"
const btn = document.querySelectorAll("li")


const updateDisplay = () => {
    let showDisplay = ""; 

    for(let i = 0; i < letters.length; i ++)  {

        if(guessedLetters.includes(letters[i])) {
            showDisplay += letters[i]
        } else {
            showDisplay += " _"
        }
        
    } if (letters.every(allLetters => {
        return guessedLetters.includes(allLetters)}
    )) {
        msg.textContent =`You won! The word was ${word}`;
        setTimeout(() => {
            resetGame();
        },2000);
    }

displayContainer.textContent = showDisplay    

}

btn.forEach((item) => {
    item.addEventListener(`click`, (event) => {
        
        const guessLetter = event.currentTarget.textContent.toUpperCase();

        const usedLetters = [...guessedLetters, ...notCorrectedLetters]

        if (usedLetters.includes(guessLetter)) {
            alert("You already guessed that letter!")
            return
        } 

        if (letters.includes(guessLetter)) {
            guessedLetters.push(guessLetter)
            event.currentTarget.style.backgroundColor = correctColor            
            updateDisplay()

        } else {
            wrongGuessCount++
            event.currentTarget.style.backgroundColor = wrongColor
            notCorrectedLetters.push(guessLetter)
            hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`
            updateDisplay()
        }
        updateLivesDisplay()
        
        if(wrongGuessCount >= lives){
            event.currentTarget.setAttribute(`disabled` ,`true`)
            msg.textContent = `GAME OVER! The word was ${word}`;
            setTimeout(() => {
                resetGame();
            },2000);
        }
    }) 
})
updateDisplay()

$(() => {
    setTimeout(()=>$(`.layer`).text(`Welcome`),300)
    setTimeout(()=>$(`.layer`).text(`To`),700)
    setTimeout(()=>$(`.layer`).text(`A`),1100)
    setTimeout(()=>$(`.layer`).text(`Hangman`),1400)
    setTimeout(()=>$(`.layer`).text(`Game!`),1800)

    $(`.layer`).delay(3000).fadeOut(500, function() {
        $(`.header, .main`).animate({opacity: 1}, 1000);
    }); 
});



