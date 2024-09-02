
// ! Lee project
//^ trying to learn

var gNumsIdx
var gNums
var timerId
var gTimer


function onInit(num = 9) {
    renderTable(num)
    gNums = createNums(num)
    gNumsIdx = 0
    gTimer = {
        seconds: 0,
        milliseconds: 0,
    }
    clearTimer()
    updateHeader()
}

function onRestart() {
    endTimer()
    onInit()
}

function onCellClicked(elCell, clickedNum) {
    if (clickedNum === gNums[gNumsIdx]) {
        console.log('Click')
        gNumsIdx++
        updateHeader()
        elCell.style.background = 'lightgreen'
        if (clickedNum === 1) startTimer()
        if (clickedNum === gNums[gNums.length - 1]) endTimer()

    }
}

function onChangeDif(elButton) {
    var difficulty = +elButton.innerText
    onInit(difficulty)
}

function updateHeader() {
    var header = document.querySelector('h4')
    if (gNums.length === gNumsIdx) {
        header.innerText = `All Done!`
    } else {
        header.innerText = `Next Number: ${gNums[gNumsIdx]}`
    }
}
function startTimer() {
    timerId = setInterval(updateTimer, 1)
}

function endTimer() {
    clearInterval(timerId)
}

function updateTimer() {
    gTimer.milliseconds++
    if (gTimer.milliseconds === 1000) {
        gTimer.milliseconds = 0
        gTimer.seconds++
    }
    var currTime = '0' + gTimer.seconds + ':' + gTimer.milliseconds
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = currTime
}

function clearTimer() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '00:000'
}

function renderTable(num) {
    var elTable = document.querySelector('table')
    elTable.innerHTML = createHTMLtable(num)

}

function createHTMLtable(num) {
    var nums = getShuffledNums(num)
    var length = Math.sqrt(num)
    var tableStr = '<tbody>\n'
    for (var i = 0; i < length; i++) {
        tableStr += '<tr>\n'
        for (var j = 0; j < length; j++) {
            var num = nums.pop()
            tableStr += `<td onclick="onCellClicked(this,${num})">${num}</td>`
        }
        tableStr += '</tr>\n'
    }
    tableStr += '</body>'
    return tableStr
}

function getShuffledNums(length) {
    var nums = createNums(length)
    var newNums = []
    var length = nums.length
    for (var i = 0; i < length; i++) {
        var randIdx = getRandomInt(0, nums.length)
        var num = nums.splice(randIdx, 1)
        newNums.push(num[0])
    }
    return newNums
}

function createNums(length) {
    var nums = []
    for (var i = 1; i <= length; i++) {
        nums.push(i)
    }
    return nums
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}