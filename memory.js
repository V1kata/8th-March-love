let score = 0;
let timeLeft = 30;
let flippedCards = [];
let matchedCards = 0;
let gameInterval, timerInterval;

const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const endScreen = document.getElementById('end-screen');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const finalScore = document.getElementById('final-score');
const resultImage = document.getElementById('result-image');
const cardsContainer = document.getElementById('cards-container');
const textMessage = document.getElementById('textMessage');

const cardValues = ['❤️', '💖', '💌', '🎁', '💝', '✨', '❤️', '💖', '💌', '🎁', '💝', '✨']; // Повтарящи се стойности за картите

function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}`;
    matchedCards = 0;
    flippedCards = [];
    generateCards();
    timerInterval = setInterval(updateTimer, 1000);
}

function generateCards() {
    cardsContainer.innerHTML = '';
    const shuffledCards = shuffle(cardValues);

    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.value = value;

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = '?';

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = value;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', () => flipCard(card));

        cardsContainer.appendChild(card);
    });
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex, tempValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }

    return array;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards += 2;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        flippedCards = [];

        if (matchedCards === cardValues.length) {
            setTimeout(endGame, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;
    } else {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    gameContainer.style.display = 'none';
    endScreen.style.display = 'flex';
    finalScore.textContent = `Your Score: ${score}`;

    if (score < 5) {
        resultImage.src = 'images/dissapointed.jpg';
        textMessage.textContent = 'You can do better!';
    } else if (score < 15) {
        resultImage.src = 'images/middle.jpg';
        textMessage.textContent = 'Nuh uh, go again!';
    } else {
        resultImage.src = 'images/win.jpg';
        textMessage.textContent = 'You are a winner! Awesome! A heart from you!';
    }
}

function restartGame() {
    endScreen.style.display = 'none';
    startScreen.style.display = 'flex';
}
