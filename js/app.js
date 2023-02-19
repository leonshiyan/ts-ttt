"use strict";
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],];
/*---------------------------- Variables (state) ----------------------------*/
let turn;
let winner;
let tie;
let board = new Array(9);
/*------------------------ Cached Element References ------------------------*/
const squareEles = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardEl = document.querySelector('.board');
const resetBtnEl = document.querySelector('.reset-button');
/*----------------------------- Event Listeners -----------------------------*/
// boardEl.addEventListener('click',handleClick)
// resetBtnEl.addEventListener('click',init)
// boardEl.addEventListener('animationend', handleAnimationEnd, {once: false});
/*-------------------------------- Functions --------------------------------*/
function init() {
    board.fill(0);
    turn = -1;
    winner = false;
    tie = false;
    messageEl.classList.remove('animate__animated', 'animate__flip');
    //render()
}
