'use strict'


var nums = []
var errors = 0
var currentNumber = 1
var startTime
var timerInterval

function createNumberArray(size) {
    const nums = []
    for (var i = 1; i <= size; i++) {
        nums.push(i)
    }
    return nums
}
// // // array like the createNumber (we are working with array)
// // // rearrange in random order
// from google 
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard(size) {
    const table = document.querySelector('.numbersRandom')
    table.innerHTML = ''
    nums = createNumberArray(size)
    nums = shuffleArray(nums)
    currentNumber = 1

    const dimension = Math.sqrt(size)
    // // 4*4 for exsemple
    for (var i = 0; i < dimension; i++) {
        const row = document.createElement('tr')
        // // Creates a new <tr> (table row) element that will hold the cells
        for (var j = 0; j < dimension; j++) {
            const cell = document.createElement('td')
            //  // Creates a new <td> (table cai ) element that will hold the cells
            cell.innerText = nums.pop()
            cell.addEventListener('click', function () {
                // anonymous function
                // that defines what should happen when the click event occurs.
                // This function will be executed whenever the cell is clicked
                console.log(this.click)

                // // the event to listen for is a mouse click.
                onCellClicked(this, parseInt(cell.innerText), size)
                // // return only full number with no 0.2
            });
            row.appendChild(cell)
            // // Adds the cell to the current row.
        }
        table.appendChild(row)
        // //Adds the row to the table
    }
}

function onCellClicked(cell, clickedNum, size) {

    if (clickedNum === currentNumber) {
        // startTimer()
        cell.style.backgroundColor = 'lightgreen';
        if (clickedNum === 1) startTimer()

        currentNumber++;
    } else {
        // Ignore wrong clicks
        // startGame();
        // error++

        errors += 1;
        document.getElementById("errors").innerText = errors;
        // errorsElement.innerText = errors;
        //  document.getElementById("errors").style.color = getRandomColor()
        // errorsElement.style.color = getRandomColor();
        // & not working (getRandomColor()) Grr

        if (errors === 3) {
            stopTimer()
            alert('Game Over!🙃🙃🙃')
            return;
            // Stop the game if 3 errors are reached
        }
        // alert('Wrong number! Please click the correct sequence.')
    }

    // Check if the user has clicked all numbers in the correct order
    if (currentNumber > size) {
        alert('Congratulations!😊 You completed the game!')
        stopTimer()
        error = 0
    }

}

function stopTimer() {
    clearInterval(timerInterval)
}

// function tooManyErrors(){
//     if(errors === 3)
//         alert('you lost')
// }

// from google
//but i could create startTimer like stopTimer but with sec or mill sec 
function startTimer() {
    startTime = Date.now()
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000)
        const milliseconds = elapsedTime % 1000
        document.getElementById('timer').innerText = `Timer: ${seconds} : ${milliseconds.toString().padStart(3, '0')}`;
    }, 10)
}

function startGame() {
    const difficulty = parseInt(document.getElementById('difficulty').value)
    createBoard(difficulty)
    document.getElementById('timer').innerText = 'Timer: 00 : 000'
    clearInterval(timerInterval)
    // // Reset errors to 0
    errors = 0
    currentNumber = 1
    document.getElementById('errors').innerText = errors
}
function restartGame() {
    clearInterval(timerInterval)
    startGame()


}

// function getRandomColor() {
//     var varters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 3; i++) {
//         color += varters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

//////////////////////////////////////////////////////////////////////////
// ^better work

// !!!!

// var gBoard
// var gSize = 9
// var gNextNum = 1
// var gTimerInterval
// var gStartTime

// function onInit() {
//     gNextNum = 1
//     gBoard = createBoard(gSize)
//     renderBoard(gBoard)
//     clearInterval(gTimerInterval)
//     document.querySelector('.timer').innerText = 'Time: 0 : 000'
// }

// function play() {
//     renderBoard(gBoard)
// }

// function createBoard(size) {
//     var nums = []
//     for (var i = 1; i <= size; i++) {
//         nums.push(i)
//     }
//     nums = shuffle(nums)

//     var board = []
//     for (var i = 0; i < Math.sqrt(size); i++) {
//         board.push([])
//         for (var j = 0; j < Math.sqrt(size); j++) {
//             board[i][j] = nums.pop()
//         }
//     }
//     return board
// }

// function shuffle(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1))
//         const temp = array[i]
//         array[i] = array[j]
//         array[j] = temp
//     }
//     return array
// }

// function renderBoard(board) {
//     var strHTML = '<table border="1"><tbody>'
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < board[i].length; j++) {
//             strHTML += `<td onclick="onCellClicked(this, ${board[i][j]})">${board[i][j]}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     var elBoard = document.querySelector('.board')
//     elBoard.innerHTML = strHTML
// }

// function onCellClicked(elCell, clickedNum) {
//     if (clickedNum === gNextNum) {
//         elCell.style.backgroundColor = 'lightgreen'
//         if (gNextNum === 1) {
//             startTimer()
//         }
//         gNextNum++
//         if (gNextNum > gSize) {
//             clearInterval(gTimerInterval)
//             alert('You won!')
//         }
//     }
// }

// function startTimer() {
//     gStartTime = Date.now()
//     gTimerInterval = setInterval(updateTimer, 50)
// }

// function updateTimer() {
//     const now = Date.now()
//     const diff = now - gStartTime
//     const seconds = Math.floor(diff / 1000)
//     const milliseconds = diff % 1000
//     document.querySelector('.timer').innerText = `Time: ${seconds} : ${milliseconds.toString().padStart(3, '0')}`
// }

// function onRestart() {
//     onInit()
// }

// function onChangeDifficulty(elSelect) {
//     gSize = +elSelect.value
//     onRestart()
// }

// Initialize the board when the page loads
