const prayers = {
"2026-03-15":{
sab:"05:12",
pod:"12:32",
iki:"15:41",
aks:"17:48",
jac:"19:36"
}
}

function today(){

const d = new Date()
const date = d.toISOString().slice(0,10)

document.getElementById("date").innerText=date

const p = prayers[date]

let html=""

html+=`<div class="prayer">Sabah (Fajr) ${p.sab}</div>`
html+=`<div class="prayer">Podne (Dhuhr) ${p.pod}</div>`
html+=`<div class="prayer">Ikindija (Asr) ${p.iki}</div>`
html+=`<div class="prayer">Akšam (Maghrib) ${p.aks}</div>`
html+=`<div class="prayer">Jacija (Isha) ${p.jac}</div>`

document.getElementById("prayers").innerHTML=html
}

today()

function enableNotifications(){

Notification.requestPermission().then(p=>{

if(p==="granted"){
alert("Obavijesti uključene")
}

})

}
