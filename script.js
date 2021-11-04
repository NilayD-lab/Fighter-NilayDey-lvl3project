let bars=  document.querySelectorAll(".bar")
let attackMove = document.getElementById('attack')
let defenseMove = document.getElementById('defense')
let originalStats = []
let stats = []
for (let i=0;i<8;i++){
    originalStats.push(Math.floor(Math.random()*10))
   
}
for (let i=0;i<8;i++){
    stats.push[originalStats[i]]
}
console.log(stats)

function updateStats(){
    for (let i=0;i<bars.length;i++){
        setStatValue(bars[i], stats[i])
    }
}
function getStatValue(bar){
    return getComputedStyle(bar).getPropertyValue('--value')
}

function setStatValue(bar, val){
    bar.style.setProperty('--value', '"'+ ""+val+'"')
}
updateStats()
attackMove.onclick = ()=>{
    console.log('attack')
}
defenseMove.onclick = ()=>{
    console.log('defense')
}
