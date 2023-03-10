/*-------------------------------- Constants --------------------------------*/
const winningCombos : number [][] = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],]

/*---------------------------- Variables (state) ----------------------------*/
let turn : number
let winner : boolean
let tie : boolean
let board : number [] = new Array(9)

/*------------------------ Cached Element References ------------------------*/

const squareEles: NodeListOf<Element> = document.querySelectorAll('.sqr')
const messageEl: HTMLElement = document.getElementById('message')!
const boardEl: HTMLElement = document.querySelector('.board')!
const resetBtnEl: HTMLElement = document.querySelector('.reset-button')!

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click',handleClick)
resetBtnEl.addEventListener('click',init)
boardEl.addEventListener('animationend', handleAnimationEnd, {once: false});

/*-------------------------------- Functions --------------------------------*/
function init(): void{
  board.fill(0)
  turn = -1 
  winner = false 
  tie = false 
  messageEl.classList.remove('animate__animated','animate__flip')
  render()
}

function boardAnimation(event: Event): void{
  boardEl.classList.add('animate__animated','animate__headShake')
}

function handleAnimationEnd(event: Event): void{
  event.stopPropagation();
  boardEl.classList.remove('animate__animated','animate__headShake');
}

function updateBoard(): void{
  for (let i = 0; i < board.length; i++) {
    if (board[i] === 1) {
      squareEles[i].textContent = 'X';
    } else if (board[i] === -1) {
      squareEles[i].textContent = 'O';
    } else {
      squareEles[i].textContent = '';
    }
  }
}

function updateMessage(): void{
  const playerMsg: string = turn == 1? 'X':'O'
  if(!winner && !tie){
    messageEl.textContent = `It is player ${playerMsg} turn!`
  }else if(!winner && tie){
    messageEl.textContent = `It is a tie game!`
  }else {
    messageEl.textContent = `Congratulations, player ${playerMsg} wins!`
    messageEl.classList.add('animate__animated','animate__flip')
  }
}

function handleClick (event: MouseEvent){
  let sqIdx: number
  const clickedEl = event.target as HTMLElement
  const sqId = clickedEl.getAttribute('id')!
  sqIdx = parseInt(sqId.slice(2))
  if (board[sqIdx] || winner) return
  boardEl.removeEventListener('click',handleClick)
  playerMove(sqIdx)
  computerMove()
  setTimeout(() => {
    boardEl.addEventListener('click',handleClick)
  }, 300)
}
function playerMove(sqIdx: number): void{
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}
function placePiece(sqIdx: number) : void{
  board[sqIdx] = turn
}
function checkForTie(): void{
  if(!board.includes(0)) tie = true
}

function checkForWinner(): void{
  let result : number
  for(const combo of winningCombos){
    result = Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]])
    if (result === 3){
      winner = true
      return
    }
  }
}
function switchPlayerTurn(): void{
  if(winner){
    return
  }else{
    turn *= -1
  }
}

function computerMove(): void{
  if(!winner && !tie){
    let computerIdx: number = chooseEmptySpot()
    playerMove(computerIdx)
  }
}

function chooseEmptySpot(): number{
  let moves:number[] = []
  for (let index = 0; index < board.length; index++) {
    if(board[index]=== 0) moves.push(index)
  }
  //Select a move
  let move = moves[Math.floor(Math.random() * moves.length)]
  return move
}

function render(){
  updateBoard()
  updateMessage()
}
/*-------------------------------- Game init --------------------------------*/
init()
