let data = {}

fetch("vaktija_ostfold_2026.csv")
.then(response => response.text())
.then(text => {

const rows = text.split("\n").slice(1)

rows.forEach(r => {

const c = r.split(",")

data[c[0]] = {
sab:c[1],
pod:c[2],
iki:c[3],
aks:c[4],
jac:c[5]
}

})

showToday()

})

function showToday(){

const d = new Date()

const date = d.toISOString().slice(0,10)

document.getElementById("date").innerText =
"Østfold • " + date

const p = data[date]

if(!p){
document.getElementById("prayers").innerHTML="Ingen data"
return
}

let html=""

html+=`<div class="prayer">Sabah (Fajr) – ${p.sab}</div>`
html+=`<div class="prayer">Podne (Dhuhr) – ${p.pod}</div>`
html+=`<div class="prayer">Ikindija (Asr) – ${p.iki}</div>`
html+=`<div class="prayer">Akšam (Maghrib) – ${p.aks}</div>`
html+=`<div class="prayer">Jacija (Isha) – ${p.jac}</div>`

document.getElementById("prayers").innerHTML = html

nextPrayer(p)

}

function nextPrayer(p){

const now = new Date()

const times = [
["Sabah (Fajr)",p.sab],
["Podne (Dhuhr)",p.pod],
["Ikindija (Asr)",p.iki],
["Akšam (Maghrib)",p.aks],
["Jacija (Isha)",p.jac]
]

for(let t of times){

const parts = t[1].split(":")
const prayer = new Date()

prayer.setHours(parts[0])
prayer.setMinutes(parts[1])
prayer.setSeconds(0)

if(prayer > now){

countdown(prayer,t[0])
return

}

}

}

function countdown(target,name){

setInterval(()=>{

const now = new Date()

const diff = target-now

if(diff <=0) return

const h = Math.floor(diff/3600000)
const m = Math.floor(diff%3600000/60000)
const s = Math.floor(diff%60000/1000)

document.getElementById("countdown").innerText =
`Neste bønn: ${name} om ${h}h ${m}m ${s}s`

},1000)

}

function enableNotifications(){

Notification.requestPermission().then(p=>{

if(p==="granted"){
alert("Obavijesti uključene")
}

})

}
