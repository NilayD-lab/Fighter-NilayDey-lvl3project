let bars = document.querySelectorAll(".bar")
let attackMove = document.getElementById('attack')
let defenseMove = document.getElementById('defense')
let originalStats = []
let maxStats = []
let stats = []
/*
    stats[0] = player 1 strength
    stats[1] = player 1 cunning
    stats[2] = player 1 speed
    stats[3] = player 1 fatigue
    stats[4] = player 2 strength
    stats[5] = player 2 cunning
    stats[6] = player 2 speed
    stats[7] = player 2 fatigue
*/
let movesList = document.getElementById('move-container').querySelector('ol')
let finisherButton = document.getElementById('finisher')
let fightButton = document.querySelector('h1')
let movesContainer = document.getElementById('move-container')
movesContainer.remove()
finisherButton.remove()

fightButton.onclick = ()=>{
    maxStats = [10, 10, 10, 30, 10, 10, 10, 30]
    stats = [6, 6, 6, 30, 6, 6, 6, 30]
    fightButton.remove()
    document.body.appendChild(movesContainer)
    let random = Math.random() > .5
    for (let i = 0; i < 8; i++) {
        if (i == 3 || i == 7) {
            stats[i] += !random ? 6 : 0
            maxStats[i] += !random ? 6 : 0
        }
        else {
            if (i % 2 == 0) {
                stats[i] += random ? 1 : 0
            }
            else {
                stats[i] += !random ? 1 : 0

            }
        }
    }
    originalStats[0] = stats[3]
    originalStats[1] = stats[7]
    updateStats()
}


attackMove.onclick = () => {
    let billydef = billyAtk(false)
    stats[7] = calcAtk("Tommy") > calcDef("Billy", billydef) ? stats[7] - Math.abs(calcDef("Billy", billydef) - calcAtk("Tommy")) : (stats[7] + rand(1, 6)) > maxStats[7] ? maxStats[7] : (stats[7] + rand(1, 6))
    stats[7] = stats[7] < 0 ? 0 : stats[7]
    stats[7] = stats[7] > maxStats[7] ? maxStats[7] : stats[7]
    
    updateStats()
}
defenseMove.onclick = () => {
    billyAtk(true)
    stats[7] += rand(1, 6)
    stats[7] = stats[7] > maxStats[7] ? maxStats[7] : stats[7]
    updateStats()

}



function giveFinisherFunction() {
    finisherButton.onclick = () => {
        let billydef = billyAtk(false)
        stats[7] = calcFinisher("Tommy") > calcDef("Billy", billydef) ? 0 : stats[7]+rand(1, 6)
        
        updateStats()

    }
}
function billyAtk(tommyDef){
    let billydef = Math.random() < 0
    if (stats[3] > Math.floor(stats[7] / 2)) {
        stats[3] = !billydef ? calcAtk("Billy") > calcDef("Tommy", tommyDef) ? stats[3] - Math.abs(calcDef("Tommy", tommyDef) - calcAtk("Billy")) : (stats[3] + rand(1, 6)) : (stats[3] + rand(1, 6))
        stats[3] = stats[3] < 0 ? 0 : stats[3]
        stats[3] = stats[3] > maxStats[3] ? maxStats[3] : stats[3]
        console.log(billydef ? "Defended" : "Attacked")

    }
    else {
        stats[3] = calcFinisher("Billy") > calcDef("Tommy", tommyDef) ? 0 : stats[3]
        
        console.log("finisher")
        return false
    }
    return billydef
}
function calcFinisher(player) {
    let shift = player == "Tommy" ? 0 : 4
    return Math.floor((stats[0 + shift] + stats[2 + shift]) / rand(1, 3))
}

function rand(first, second) {
    return Math.floor(Math.random() * second) + first
}
function calcAtk(player) {
    let shift = player == "Tommy" ? 0 : 4
    return Math.floor((stats[0 + shift] + stats[1 + shift] + stats[2 + shift]) / rand(1, 3))
}
function calcDef(player, onDefense) {
    let shift = player == "Tommy" ? 0 : 4
    return onDefense ? stats[2 + shift] + stats[1 + shift] : stats[2 + shift] + rand(1, 6)
}


function updateStats() {
    if (stats[3] <= originalStats[0] - 5) {
        for (let i = 0; i < 3; i++) {
            stats[i]--
        }
        originalStats[0] = stats[3]
    }
    else if (stats[3] >= originalStats[0] + 5) {
        for (let i = 0; i < 3; i++) {
            stats[i]++
        }
        originalStats[0] = stats[3]
    }
    if (stats[7] <= originalStats[1] - 5) {
        for (let i = 4; i < 7; i++) {
            stats[i]--
        }
        originalStats[1] = stats[7]

    }
    else if (stats[7] >= originalStats[1] + 5) {
        for (let i = 4; i < 7; i++) {
            stats[i]++
        }
        originalStats[1] = stats[7]
    }
    for (let i = 0; i < bars.length; i++) {
        setStatValue(i, stats[i])
    }
    if (stats[3]==0){
        showResults("Billy")   
    }
    if (stats[7]==0){
        showResults("Tommy")   
    }
    if (stats[7] < Math.floor(stats[3] / 2)) {
        movesList.appendChild(finisherButton)
        giveFinisherFunction()
    }
    else {
        finisherButton.remove()
    }
}
function showResults(player){
    document.body.appendChild(fightButton)
    fightButton.innerHTML = player+" won"
    fightButton.style.fontSize = '7rem'
    finisherButton.remove()
    movesContainer.remove()
}
function getStatValue(bar) {
    return getComputedStyle(bar).getPropertyValue('--value')
}

function setStatValue(num, val) {

    bars[num].style.setProperty('--value', '"' + "" + val + '"')
    bars[num].style.setProperty('--width', "" + Math.floor(val * 100 / maxStats[num]) + "%")

}

 