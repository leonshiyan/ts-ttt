/*-------------------------------- Constants --------------------------------*/
const winningCombos : number [][] = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],]

/*---------------------------- Variables (state) ----------------------------*/
let turn : number
let winner : boolean
let tie : boolean
let board : number [] = new Array(9)

/*------------------------ Cached Element References ------------------------*/

const squareEles: NodeListOf<Element> = document.querySelectorAll('.sqr')
const messageEl : HTMLElement = document.getElementById('message')!
const boardEl:Element = document.querySelector('.board')!
const resetBtnEl:Element = document.querySelector('.reset-button')!

