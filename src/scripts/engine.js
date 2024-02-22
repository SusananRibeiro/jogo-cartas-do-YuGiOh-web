// Será o status do jogo
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    // Serao as imagens das cartas
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

// Vai ser a primeira função a ser executado, pois é o estado inicial do jogo.
function init() {

}

init()