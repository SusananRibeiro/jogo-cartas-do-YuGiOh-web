// Será o status do jogo
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.querySelector("#score_points"),
    },
    // Serão as imagens das cartas
    cardSprites: {
        avatar: document.querySelector("#card-image"),
        name: document.querySelector("#card-name"),
        type: document.querySelector("#card-type"),

    },
    fieldCards: {
        player: document.querySelector("#player-field-card"),
        computer: document.querySelector("#computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.querySelector("#next-duel"),
    }
}


const pathImages = "./src/assets/icons/"; // é o camimho basico da imagem
// Acrescentar mais cartas depois aqui
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon", // nome da carta
        type: "Paper", // é o tipo da carta, neste caso papel, do jogo pedra, papel e tesoura
        img: `${pathImages}dragon.png`, // é o camimho da imagem da carta
        WinOf: [1], // ganha
        LoseOf: [2], // perde
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",  // pedra
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors", // tesoura
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    }
]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id
}


async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img"); // para criar um elemento dinamicamente
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card"); // essa classe "card" será implementado no CSS "main.css"
    // será o evento que vai ficar escutando
    if(fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }


    return cardImage
}

async function setCardsField(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await ShowHiddenCardFieldsImages(true);
    await hiddenCardsDetails();
    await drawCardsInFields(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawCardsInFields(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function ShowHiddenCardFieldsImages(value) {
    if(value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    } else {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function hiddenCardsDetails() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function drawButton(text) {
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function updateScore() {
    state.score.scoreBox.innerHTML = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

async function checkDuelResults(playerCardId, ComputerCardId) {
    let duelResult = "Empate";
    let playerCard = cardData[playerCardId];


    if(playerCard.WinOf.includes(ComputerCardId)) {
        duelResult = "GANHOU";
        await playAudio("win");
        state.score.playerScore++;
    }

    if(playerCard.LoseOf.includes(ComputerCardId)) {
        duelResult = "PERDEU";
        await playAudio("lose");
        state.score.computerScore++;
    }

    return duelResult
}

async function removeAllCardsImages() {
    let {computerBOX, player1BOX} = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach(img => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach(img => img.remove());
}


async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute : " + cardData[index].type;
}

// Função que vai sortear as cartas
async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {
        audio.play();
    } catch {}
}

// Vai ser a primeira função a ser executada, pois é o estado inicial do jogo.
function init() {
    ShowHiddenCardFieldsImages(false);

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();