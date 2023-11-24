let action = document.querySelector('.action');
let text = document.querySelector('.text');

let startBtn = document.querySelector('.start');
let restartBtn = document.querySelector('.restart');

let teamXBtn = document.querySelector('.team-x');
let teamOBtn = document.querySelector('.team-o');
let scoreX = document.querySelector('.score-x');
let scoreO = document.querySelector('.score-o');
let selectDifficulty = document.querySelector('#selectDifficulty');

let result = document.querySelector('.result');
let ticTacTie = document.querySelector('.tic-tac-toe');
let cells = document.querySelectorAll('.cell');


/* Start button and game itself */

startBtn.addEventListener('click', startGame);

function startGame(){
    teamXBtn.disabled = false;
    teamOBtn.disabled = false;

    startBtn.disabled = true;

    continueCode = true;

    for(i=0; i<cells.length; i++){
        cells[i].textContent = null;
        cells[i].style.backgroundColor = '';
        cells[i].style.color = '';
    };

    restartBtn.hidden = false;

    teamXBtn.classList.add('current-move');

    ticTacTie.removeEventListener('click', game);
    
    ticTacTie.addEventListener('click', game);
};

let team = 'X';
let team2 = 'O';
let difficulty = selectDifficulty.value;

selectDifficulty.addEventListener('change', ()=>{

    difficulty = selectDifficulty.value;
    
    for(i=0; i<cells.length; i++){
        cells[i].textContent = null;
        cells[i].style.backgroundColor = '';
        cells[i].style.color = '';
    };

    if(!continueCode){
        ticTacTie.removeEventListener('click', game);
    
        ticTacTie.addEventListener('click', game);
    }

    result.hidden = true;
    continueCode = true;

    if(team == 'O'){
        ticTacTie.style.color = 'red';
        switch(difficulty){
            case `easy`:
                easyBotMoves();
                break;
            
            case `hard`:
                hardBotMoves();
                break;
    
            case `player`:
                playerMoves();
                break;
        }
    }

    scoreO.textContent = '0';
    scoreX.textContent = '0';
});

function game(e){
    if(e.target.className != 'cell') return
    if(e.target.textContent) return

    if(team == 'X') {
        e.target.style.color = 'red';
        ticTacTie.style.color = 'blue';
    }
    else if(team == 'O') {
        e.target.style.color = 'blue';
        ticTacTie.style.color = 'red';
    }
    e.target.textContent = team;

    checkingWinner();

    switch(difficulty){
        case `easy`:
            easyBotMoves();
            break;
        
        case `hard`:
            hardBotMoves();
            break;

        case `player`:
            playerMoves();
            break;
    }
};

function checkingWinner(){
    let cellsLive = document.querySelectorAll('.cell');

    let winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (let i = 0; i < winCombos.length; i++) {
        let array = winCombos[i];

        const xWins =  array.every(cell=>
            cellsLive[cell].textContent == 'X'
        )
        
        if(xWins){
            initialisationWinner(array, 'X');
            break;
        }
    };

    for (let i = 0; i < winCombos.length; i++) {
        let array = winCombos[i];

        const oWins = array.every(cell=>
            cellsLive[cell].textContent == 'O'
        )
        
        if(oWins){
            initialisationWinner(array, 'O');
            break;
        }
    };
};

let continueCode = true;

function initialisationWinner(array, team){
    array.forEach(cell =>{
        cells[cell].style.backgroundColor = 'yellow';
    });
    
    if(team == 'X'){
        scoreX.textContent = +scoreX.textContent + 1;
        result.hidden = false;
        result.classList.add('result-x');
        result.classList.remove('result-o');
        result.classList.remove('result-draw');
        result.textContent = 'Team X wins!'
    }
    else if(team == 'O'){
        scoreO.textContent = +scoreO.textContent + 1;
        result.hidden = false;
        result.classList.add('result-o');
        result.classList.remove('result-x');
        result.classList.remove('result-draw');
        result.textContent = 'Team O wins!'
    }
    
    continueCode = false;
    
    ticTacTie.removeEventListener('click', game);
};

function draw(){
    result.hidden = false;
    result.classList.add('result-draw');
    result.classList.remove('result-x');
    result.classList.remove('result-o');
    result.textContent = 'DRAW!'
};

/* Setting for opponents */

function easyBotMoves(){
    if(!continueCode) return;

    if(team2 == 'O'){
        teamXBtn.classList.remove('current-move');
        teamOBtn.classList.add('current-move');
    }
    else{
        teamXBtn.classList.add('current-move');
        teamOBtn.classList.remove('current-move');
    }

    ticTacTie.removeEventListener('click', game);

    let cellsLive = document.querySelectorAll('.cell');
    let cellEmpty = [];
    cellsLive.forEach(cell =>{
        if(!cell.textContent) cellEmpty.push(cell.id);
    });
    const randomIndex = Math.floor(Math.random() * cellEmpty.length);

    setTimeout(() => {
        if(team2 == 'O'){
            teamXBtn.classList.add('current-move');
            teamOBtn.classList.remove('current-move');
        }
        else{
            teamXBtn.classList.remove('current-move');
            teamOBtn.classList.add('current-move');
        }

        ticTacTie.addEventListener('click', game);

        if(!cellEmpty[0]) {
            draw();
            return;
        }

        cellsLive[cellEmpty[randomIndex]].textContent = team2;

        checkingWinner();

        if(continueCode && !cellEmpty[1]){
            draw();
            return;
        }
    }, 250);
};

function hardBotMoves(){
    if(!continueCode) return;

    if(team2 == 'O'){
        teamXBtn.classList.remove('current-move');
        teamOBtn.classList.add('current-move');
    }
    else{
        teamXBtn.classList.add('current-move');
        teamOBtn.classList.remove('current-move');
    }

    setTimeout(() => {
        if(team2 == 'O'){
            teamXBtn.classList.add('current-move');
            teamOBtn.classList.remove('current-move');
        }
        else{
            teamXBtn.classList.remove('current-move');
            teamOBtn.classList.add('current-move');
        }
    }, 250);

    ticTacTie.removeEventListener('click', game);
    
    let choosingMove = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    
    let cellsLive = document.querySelectorAll('.cell');
    if(!cellsLive[4].textContent){
        setTimeout(() => {
            ticTacTie.addEventListener('click', game);
            cellsLive[4].textContent = team2; 
            checkingWinner(); 
        }, 250);
        return;
    };

    let hardBotMoved = true;

    let cellEmpty = [];
    cellsLive.forEach(cell =>{
        if(!cell.textContent) cellEmpty.push(cell.id);
    });

    for (let i = 0; i < choosingMove.length; i++) {
        if(cellsLive[choosingMove[i][0]].textContent && cellsLive[choosingMove[i][0]].textContent == cellsLive[choosingMove[i][1]].textContent && !cellsLive[choosingMove[i][2]].textContent){
            setTimeout(() => {
                ticTacTie.addEventListener('click', game);
                cellsLive[choosingMove[i][2]].textContent = team2;
                checkingWinner();

                if(continueCode && !cellEmpty[1]){
                    draw();
                    return
                }
            }, 250);
            hardBotMoved = false;
            break;
        }
        else if(cellsLive[choosingMove[i][1]].textContent && cellsLive[choosingMove[i][1]].textContent == cellsLive[choosingMove[i][2]].textContent && !cellsLive[choosingMove[i][0]].textContent){
            setTimeout(() => {
                ticTacTie.addEventListener('click', game);
                cellsLive[choosingMove[i][0]].textContent = team2;
                checkingWinner();
                
                if(continueCode && !cellEmpty[1]){
                    draw();
                    return
                }
            }, 250);
            hardBotMoved = false;
            break;
        }
        else if(cellsLive[choosingMove[i][0]].textContent && cellsLive[choosingMove[i][0]].textContent == cellsLive[choosingMove[i][2]].textContent && !cellsLive[choosingMove[i][1]].textContent){
            setTimeout(() => {
                ticTacTie.addEventListener('click', game);
                cellsLive[choosingMove[i][1]].textContent = team2;
                checkingWinner();

                if(continueCode && !cellEmpty[1]){
                    draw();
                    return
                }
            }, 250);
            hardBotMoved = false;
            break;
        }
    };

    if(hardBotMoved){
        let cellEmpty = [];
        cellsLive.forEach(cell =>{
            if(!cell.textContent) cellEmpty.push(cell.id);
        });
        const randomIndex = Math.floor(Math.random() * cellEmpty.length);
        setTimeout(() => {
            ticTacTie.addEventListener('click', game);
    
            if(!cellEmpty[0]){
                draw();
                return;
            };
            cellsLive[cellEmpty[randomIndex]].textContent = team2;
            checkingWinner();

            if(continueCode && !cellEmpty[1]){
                draw();
                return
            };
        }, 250);
    };
};

function playerMoves(){
    if(!continueCode) return;

    if(team == 'O'){
        team = 'X';
        team2 = 'O';
        teamXBtn.classList.add('current-move');
        teamOBtn.classList.remove('current-move');
    }
    else {
        team = 'O';
        team2 = 'X';
        teamXBtn.classList.remove('current-move');
        teamOBtn.classList.add('current-move');
    }

    let cellsLive = document.querySelectorAll('.cell');
    let cellEmpty = [];
    cellsLive.forEach(cell =>{
        if(!cell.textContent) cellEmpty.push(cell.id);
    })

    if(!cellEmpty[0]) {
        draw();
        return;
    }
};

/* Show result - Continue game */

result.addEventListener('click', continueGame);

function continueGame(){
        for(i=0; i<cells.length; i++){
            cells[i].textContent = null;
            cells[i].style.backgroundColor = '';
            cells[i].style.color = '';
        };

        result.hidden = true;

        continueCode = true;

        ticTacTie.addEventListener('click', game);

        if(team == 'O'){
            switch(difficulty){
                case `easy`:
                    easyBotMoves();
                    break;
                
                case `hard`:
                    hardBotMoves();
                    break;
        
                case `player`:
                    playerMoves();
                    break;
            }
        }
};

/* Restart button */

restartBtn.addEventListener('click', restartGame);

function restartGame(){
    teamXBtn.disabled = true;
    teamOBtn.disabled = true;

    startBtn.disabled = false;

    for(i=0; i<cells.length; i++){
        cells[i].textContent = null;
        cells[i].style.backgroundColor = '';
        cells[i].style.color = '';
    };

    team = 'X';
    team2 = 'O';

    scoreO.textContent = '0';
    scoreX.textContent = '0';

    teamXBtn.classList.remove('current-move');
    teamOBtn.classList.remove('current-move');

    restartBtn.hidden = true;
    result.hidden = true;

    ticTacTie.removeEventListener('click', game);
};

/* Choose team */

teamXBtn.addEventListener('click', ()=>{
    if(isGameBegan()) return;

    team = 'X';
    team2 = 'O';
});

teamOBtn.addEventListener('click', ()=>{
    if(isGameBegan()) return;
    
    team = 'O';
    team2 = 'X';

    ticTacTie.style.color = 'red';
    switch(difficulty){
        case `easy`:
            easyBotMoves();
            break;
                
        case `hard`:
            hardBotMoves();
            break;
        
        case `player`:
            playerMoves();
            break;
    }
 

});

function isGameBegan(){
    let cellsLive = document.querySelectorAll('.cell');
    let disabled = false;
    
    for (let i = 0; i < 9; i++) {
        if(cellsLive[i].textContent) {
            disabled = true;
            break;
        }
    }
    return disabled;
};
