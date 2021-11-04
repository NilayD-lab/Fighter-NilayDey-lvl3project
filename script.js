let bars=  document.querySelectorAll(".bar")
let attackMove = document.getElementById('attack')
let defenseMove = document.getElementById('defense')
let stats = [15, 15, 15, 15, 15, 15, 15, 15]


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
