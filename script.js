let bars = document.querySelectorAll(".bar")
let attackMove = document.getElementById('attack')
let defenseMove = document.getElementById('defense')
let originalStats = [8, 8, 8, 30, 8, 8, 8, 30]
let stats = [6, 6, 6, 30, 6, 6, 6, 15]
let movesList = document.getElementById('move-container').querySelector('ol')
let finisherButton = document.getElementById('finisher')
finisherButton.remove()
let random = Math.random() > .5
for (let i = 0; i < 8; i++) {
    if (i == 3 || i == 7) {
        stats[i] += !random ? 6 : 0
        originalStats[i] += !random ? 6 : 0
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


updateStats()
attackMove.onclick = () => {
    let billydef = Math.random() < .5
    if (stats[3] > Math.floor(stats[7] / 2)) {
        stats[3] = !billydef ? calcAtk("Billy") > calcDef("Tommy", false) ? stats[3] - Math.abs(calcDef("Tommy", false) - calcAtk("Billy")) : (stats[3] + rand(1, 6)) : (stats[3] + rand(1, 6))
        stats[3] = stats[3] < 0 ? 0 : stats[3]
        stats[3] = stats[3] > originalStats[3] ? originalStats[3] : stats[3]

    }
    else {
        stats[3] = calcFinisher("Billy") > calcDef("Tommy", false) ? 0 : stats[3]
        billydef = false
    }
    stats[7] = calcAtk("Tommy") > calcDef("Billy", billydef) ? stats[7] - Math.abs(calcDef("Billy", billydef) - calcAtk("Tommy")) : (stats[7] + rand(1, 6)) > originalStats[7] ? originalStats[7] : (stats[7] + rand(1, 6))
    stats[7] = stats[7] < 0 ? 0 : stats[7]
    stats[7] = stats[7] > originalStats[7] ? originalStats[7] : stats[7]
    if (stats[7] < Math.floor(stats[3] / 2)) {
        movesList.appendChild(finisherButton)

    }
    else {
        finisherButton.remove()

    }
    updateStats()
}
defenseMove.onclick = () => {
    let billydef = Math.random() < .5
    if (stats[3] > Math.floor(stats[7] / 2)) {
        stats[3] = !billydef ? calcAtk("Billy") > calcDef("Tommy", true) ? stats[3] - Math.abs(calcDef("Tommy", true) - calcAtk("Billy")) : (stats[3] + rand(1, 6)) : (stats[3] + rand(1, 6))
        stats[3] = stats[3] < 0 ? 0 : stats[3]
        stats[3] = stats[3] > originalStats[3] ? originalStats[3] : stats[3]
    }
    else {
        stats[3] = calcFinisher("Billy") > calcDef("Tommy", false) ? 0 : stats[3]
    }
    stats[7] += rand(1, 6)
    stats[7] = stats[7] > originalStats[7] ? originalStats[7] : stats[7]
    if (stats[7] > Math.floor(stats[3] / 2)) {
        finisherButton.remove()
    }
    updateStats()

}
function giveFinisherFunction(){
    finisherButton.onclick = ()=>{
        stats[7] = calcFinisher("Tommy") > calcDef("Billy", billydef) ? 0 : stats[7]
    }
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
    return onDefense ? stats[2 + shift] + rand(1, 6) : stats[2 + shift] + stats[1 + shift]
}

function display() {
    updateStats()
}
function updateStats() {
    for (let i = 0; i < bars.length; i++) {
        setStatValue(i, stats[i])
    }
}
function getStatValue(bar) {
    return getComputedStyle(bar).getPropertyValue('--value')
}

function setStatValue(num, val) {
    bars[num].style.setProperty('--value', '"' + "" + val + '"')
    bars[num].style.setProperty('--width', "" + Math.floor(val * 100 / originalStats[num]) + "%")

}

