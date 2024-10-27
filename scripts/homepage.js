import { auth,db, provider } from "./config.js"
import {onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import {getActiveStock, getDayGainers, getDayLosers} from "./api.js";

const avatarURL = "https://profile.accounts.firefox.com/v1/avatar/";
const logOutElement = document.getElementById("logout");
const tableButtons = document.getElementsByClassName("table-button");
const greeting = document.querySelector(".greeting");
const startButton = document.querySelector(".active-button");

logOutElement.addEventListener("click",()=>{
    signOut(auth).then(()=>{
        window.location.href = 'index.html';
    });
});

for (let button of tableButtons){
  button.addEventListener("click", (event)=>{

    for (let otherButton of tableButtons){
      if (otherButton != button){
        otherButton.removeAttribute("disabled");
        if (otherButton.classList.contains("buttonClicked")){
          otherButton.classList.remove("buttonClicked");
        }
      }
    }

    button.classList.add("buttonClicked");
    const value = button.name;
    button.setAttribute("disabled", "");
    changeTable(value);
  });
}


function renderImage(imgURL){
    const image = document.createElement("img");
    const wrap = document.getElementById("avatar-wrap");
    image.setAttribute("class", "image");
    
    image.setAttribute("src",imgURL);
    image.style.objectFit = "cover";

    image.addEventListener("load", ()=>{
       wrap.appendChild(image);

       image.addEventListener("click", ()=>{
        const ddContent = document.querySelector(".dropdown-content");
        ddContent.classList.add("show");
       });
    });
}

window.onclick = function(event) {
    if (!event.target.matches('.image')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


function getURL(username){
    const last = username.at(0);
    return avatarURL + username.at(0).toLowerCase();
}

onAuthStateChanged(auth, (user)=> {
    if(user) {
        const username =  user.displayName;
        const email = document.getElementById("email");
        email.textContent = user.email;
        greeting.textContent = 'Welcome' + ', ' + user.displayName;
        const imgURL = getURL(username);
        renderImage(imgURL);
        
    }
});

async function changeTable(value){
  // Cleaning the Table
  const tableBody = document.querySelector(".table-body")
  while (tableBody.firstChild){
    tableBody.removeChild(tableBody.lastChild);
  }
  // Filling with new values
  await renderTables(value);
}

async function renderTables(tableDesc){
  const table = document.querySelector(".table");
  const tableBody = document.querySelector(".table-body");

  let quotes;
  if (tableDesc == "active"){
       quotes = await getActiveStock();
  }
  else if (tableDesc == "gainer") {
       quotes = await getDayGainers();
  }
  else if (tableDesc == "loser") {
       quotes = await getDayLosers();
  }

  for (let row of quotes){
      const currrow = document.createElement("tr");
      let arr = [];
      arr.push(row.longName ?? row.displayName ?? row.shortName)
      arr.push(row.regularMarketPrice)
      arr.push(row.regularMarketChangePercent)
      arr.push(row.regularMarketVolume)
      arr.push(row.averageDailyVolume3Month)


    for (let i=0; i<5;i++){
        const col = document.createElement("td");
        col.textContent = arr[i];
        currrow.appendChild(col);
    }
    tableBody.appendChild(currrow);
  }

}

async function enableStartButton(){
  startButton.setAttribute("disabled","");
  startButton.classList.add("buttonClicked");
  await renderTables("active")
}

await enableStartButton();




