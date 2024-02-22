// Será o status do jogo
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    // Serão as imagens das cartas
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const playerSides = {
    player1: "player-field-card",
    computer: "computer-field-card",
}
const pathImages = ".src/assets/icons/"; // é o camimho basico da imagem

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
        type: "Rock", // pedra
        img: `${pathImages}magician.png`, 
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia ", // nome da carta
        type: "Scissors", // tesoura
        img: `${pathImages}exodia.png`, 
        WinOf: [0],
        LoseOf: [1],
    }
];

async function getRandomCardsId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img"); // para criar um elemento dinamicamente
    cardImage.setAttribute("height", "100px");    
    cardImage.setAttribute("src", ".src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id",IdCard);
    cardImage.classList.add("card"); // essa classe "card" será implementado no CSS "main.css"

    if(fieldSide === playerSides.player1) {
        // será o evento que vai ficar escutando
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"))

        }); 
    }

    cardImage.addEventListener("mouseover", () => {
        drawSelectCard(IdCard);
    });

    return cardImage;

}

// Função que vai sortear as cartas
async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardsId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide)
    }

}

// Vai ser a primeira função a ser executada, pois é o estado inicial do jogo.
function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

}

init()