const gameScore = JSON.parse(localStorage.getItem('gameData')) || {
    win : 0 ,
    lose : 0 ,
    tie : 0
} ;

updateScore();

document.querySelector('.rock-btn').addEventListener('click',()=>{playGame('rock')});
document.querySelector('.paper-btn').addEventListener('click',()=>{playGame('paper')});
document.querySelector('.scissors-btn').addEventListener('click',()=>{playGame('scissors')});

document.querySelector('.reset-btn').addEventListener('click',()=>{
    gameScore.win = 0 ;
    gameScore.lose = 0 ;
    gameScore.tie = 0 ;
    localStorage.removeItem('gameData');
    updateScore();
    document.querySelector('.js-result').innerHTML = '' ;
    document.querySelector('.js-move').innerHTML = '';
});

function playGame( playerMove ){
    const computerMove = pickComputerMove();
    let result = '';

    if(playerMove === 'rock'){
        if(computerMove === 'rock'){
            result = 'Tie.';
        }else if(computerMove === 'paper'){
            result = 'You lose.';
        }else if(computerMove === 'scissors'){
            result = 'You win.';
        }
    }else if(playerMove === 'paper'){
        if(computerMove === 'rock'){
            result = 'You win.';
        }else if(computerMove === 'paper'){
            result = 'Tie.';
        }else if(computerMove === 'scissors'){
            result = 'You lose.';
        }  
    }else if(playerMove === 'scissors'){
        if(computerMove === 'rock'){
            result = 'You lose.';
        }else if(computerMove === 'paper'){
            result = 'You win.';
        }else if(computerMove === 'scissors'){
            result = 'Tie.';
        }
    }

    if( result === 'You win.' ){
        gameScore.win++;
    }else if( result === 'You lose.'){
        gameScore.lose++;
    }else if( result === 'Tie.'){
        gameScore.tie++;
    }

    updateScore();
    
    const resultElement = document.querySelector('.js-result');
    resultElement.innerHTML = result;

    const moveElement = document.querySelector('.js-move');
    moveElement.innerHTML = `You
    <img src="game_img/${playerMove}-emoji.png" alt="${playerMove} icon" class="game-icon">
    <img src="game_img/${computerMove}-emoji.png" alt="${computerMove} icon" class="game-icon">
    Computer`;

    localStorage.setItem('gameData', JSON.stringify(gameScore))
    //localStorage.removeItem('gameData')
}

function pickComputerMove(){
    const randomNum = Math.random();
    let computerMove = ''; 
    if( randomNum >= 0 && randomNum < 1/3){
        computerMove = 'rock';
    }else if( randomNum >= 1/3 && randomNum < 2/3){
        computerMove = 'paper';
    }else if( randomNum >= 2/3 && randomNum < 1){
        computerMove = 'scissors';
    }
    return computerMove;
}

function updateScore(){
    document.querySelector('.js-score')
    .innerHTML= ` Wins: ${gameScore.win} , Looses: ${gameScore.lose} , Ties: ${gameScore.tie}`;
}

const autoPlayBtn = document.querySelector('.auto-play-btn');
let isPlaying = false ;
let autoPlayID ;
autoPlayBtn.addEventListener('click',()=>{
    if(!isPlaying){
        autoPlayBtn.innerText = `Stop Auto Play`
        autoPlayID = setInterval(()=>{
            autoPlay();
        },2000)
        //console.log('id', autoPlayID)
        isPlaying = true ;
    }else{
        autoPlayBtn.innerText = `Auto Play`;
        isPlaying = false ;
        //console.log('cleared', autoPlayID)
        clearInterval(autoPlayID);
    }
});

function autoPlay(){
    const autoPlayMove = pickComputerMove();
    playGame(autoPlayMove);
}

document.body.addEventListener('keydown',(e)=>{
    if(e.key === 'r'){
        playGame('rock');
    }else if(e.key === 'p'){
        playGame('paper');
    }else if(e.key === 's'){
        playGame('scissors');
    }
});