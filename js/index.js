console.log("Hello from ILLIA index.js");
"use strict"; // код в суворому режимі

import { randomLine, onTimeCount, onDateTime } from "./admins.js";
// const fs = require("fs");
// import fs from "./fs";

// fs.writeFileSync("../files/log.txt", "Hello");


// ORIGIN ===

// (() => {
//     const refs = {
//       openModalBtn: document.querySelector("[data-modal-open]"),
//       closeModalBtn: document.querySelector("[data-modal-close]"),
//       modal: document.querySelector("[data-modal]"),
//     };
  
//     refs.openModalBtn.addEventListener("click", toggleModal);
//     refs.closeModalBtn.addEventListener("click", toggleModal);
  
//     function toggleModal() {
//       refs.modal.classList.toggle("is-hidden");
//     }
//   })();


// By me ===





// =========== Таблиця множення =================


let numberTask = 1; // Номер завдання =
let randomSubArr = []; // Масив з рандомної черги
let resultArr = []; // Масив відповідей 
let logObjectArr = []; // Масив відповідей 
let int_sub_1 = 2; // Змінна про перший множник, стягується з селекту 
let timeCounter = 0;
let interval_Id = null;
let rightAnswer = 0;

// const logObject = {
//   userName: "Noname",
//   needTime: timeCounter,
//   rightAnswer,
//   id
// };

// console.log(rengResult);
const myTimer = document.querySelector(".my-timer");
const logList = document.querySelector("#log-list");
// renderLogList();




const removeLocalStor = document.querySelector("#remove-item"); //
removeLocalStor.addEventListener("click", ()=> {
  localStorage.removeItem("school");
  logList.innerHTML = "";
  console.log("removeItem");
});

const numberTaskTeg = document.querySelector(".form-title span"); // Номер завдання = Тег html
const randomSubTeg = document.querySelector(".random-sub"); // Множник  з рандомної черги = Тег html
const resultDescrTeg = document.querySelector(".result-answ"); // Відповідь message = Тег html

// ==== Select =====
const subTeg_1 = document.querySelector(".sub-1"); // Перший множник  = Тег html
const select = document.querySelector("#_select"); //  Стягуємо Тег "Select"
// console.log(select.value);

// ======== MODAL WINDOW ========

const openModalBtn = document.querySelector("[data-modal-open]");
const closeModalBtn = document.querySelector("[data-modal-close]");
const modal = document.querySelector("[data-modal]");

openModalBtn.addEventListener("click", openModal);

let isOpenModal = false;




// const logObject2 = {
//   userName: "Ілля",
//   needTime: "timeCounter",
//   rightAnswer: 5,
//   int_sub_1: "2",
// };


// async function getLocalStor() {
//   try{
//     const myObjStorage = localStorage.getItem("school") ?? [];
//     const myData = await JSON.parse(myObjStorage);
//     // console.log(myData);
//     return myData;
//   }catch(err) {
//     console.log(err);
//   }
  
// }

// getLocalStor().then((myData)=> console.log(myData) )

// localStorage.setItem("school", JSON.stringify(logObject2));


// Try/Catch
// ===== Rendet LogList at start page ======
// const getLocalStorage = localStorage.getItem("school") ?? "";

// console.log("Start");

// const jsonParser = (datajson) => {
//   try {
//       return JSON.parse(datajson);
//   } catch (error) {
//       // console.error(error);
//       return "My Error JSON!";
//   }
// }

// jsonParser(getLocalStorage);
// console.log(jsonParser( '{"nik": "Yupi"}' ));
// console.log(jsonParser(''));
// console.log("End");

// logObjectArr = JSON.parse(getLocalStorage);
// console.log(getLocalStorage);

// if(logObjectArr.length) {
//     // logObjectArr = JSON.parse(getLocalStorage);
//     const markup = logObjectArr.map( item => {
//         return renderLogList(item);
//     }).join("");
//     logList.innerHTML = markup;
// }



// ===== Rendet LogList at start page ======
const getLocalStorage = localStorage.getItem("school") ?? "";

if(getLocalStorage !== "") {
  logObjectArr = JSON.parse(getLocalStorage);
  console.log(getLocalStorage);

  if(logObjectArr.length) {
    // logObjectArr = JSON.parse(getLocalStorage);
    const markup = logObjectArr.map( item => {
        return renderLogList(item);
    }).join("");
    logList.innerHTML = markup;
  }

}




// // ===== Rendet LogList at start page ======
// const getLocalStorage = localStorage.getItem("school") ?? [];
// logObjectArr = JSON.parse(getLocalStorage);
// console.log(getLocalStorage);

// if(logObjectArr.length) {
//     logObjectArr = JSON.parse(getLocalStorage);
//     const markup = logObjectArr.map( item => {
//         return renderLogList(item);
//     }).join("");
//     logList.innerHTML = markup;
//  }





// ======== openModal =========
function openModal () {
  if(isOpenModal) {
    console.log("openModal is opened!");
    return;
  } 
  isOpenModal = true;
  modal.classList.remove("is-hidden");
  closeModalBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", closeModalEsc);


  int_sub_1 = Number(select.value);
  subTeg_1.textContent = select.value;

  randomSubArr = randomLine(); // Масив з рандомної черги
  console.log(randomSubArr);
  // console.log("openModal");
  randomSubTeg.textContent = randomSubArr[numberTask - 1]; // вивід наступного множника на екран 
  onStartTimer();
}


function closeModalEsc(e) {
  if(e.code === "Escape") {
      closeModal();
  }
}


function closeModal() {
  isOpenModal = false;
  modal.classList.add("is-hidden");
  closeModalBtn.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeModalEsc);

  onStoptTimer();
  numberTask = 1;
  rightAnswer = 0;
  numberTaskTeg.textContent = numberTask; // рестарт номера задачі на екран 1
}




// Завантаження звуків

const soundWin_1s = new Audio();
soundWin_1s.src = "../sounds/sound-win-1s.wav"; // 1s

const soundWin_3s = new Audio();
soundWin_3s.src = "../sounds/game-won.wav"; // 3s

const soundLost = new Audio();
soundLost.src = "../sounds/sound-lost.wav"; // 1s



// ======================= FORM SUBMIE =====================

const myForm = document.querySelector(".modal-form");
myForm.addEventListener("submit", onSubmit);
let lostFlag = false;


function onSubmit(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.answer.value;
  if(inputValue === "") {
    alert("Потрібно ввести число!");
    return;
  }
  
  resultArr[numberTask - 1] = Number(inputValue); // Записуєм введену відповідь у масив

  // ====== sound =======
  soundWin_1s.pause();
  soundWin_1s.currentTime = 0;
  soundLost.pause();
  soundLost.currentTime = 0;
  
  if(randomSubArr[numberTask - 1] * int_sub_1 === resultArr[numberTask - 1]) {
    rightAnswer +=1;
  }
  // console.log(numberTask);
  if(numberTask < 8) {
    if(randomSubArr[numberTask - 1] * int_sub_1 === resultArr[numberTask - 1]) {
      // console.log("Win");
      soundWin_1s.play();
    }
    else {
      // console.log("Lost");
      soundLost.play();
      lostFlag = true;
    }
  }
  else {
    // console.log("I am here");
    if(!lostFlag) {
      soundWin_3s.play();
    }
    // else {
    //   soundLost.play();
    // }
  }

  numberTask += 1;

  console.log(numberTask);
  // console.log("closeModal");

  if(numberTask >= 9) {
    numberTask = 1;
    numberTaskTeg.textContent = numberTask; // рестарт номера задачі на екран 1
    openModalBtn.textContent = "Спробувати ще раз";
    randomSubTeg.textContent = 1; // множник стартує з 1
    // console.log(numberTask);
    

    const logObject = {
      userName: "Ілля",
      needTime: timeCounter,
      rightAnswer,
      int_sub_1,
      id: onDateTime(),
    };

  
  

    logObjectArr.push(logObject);
   

    // === set lockalStorage() ====
    localStorage.setItem("school", JSON.stringify(logObjectArr));








    logList.insertAdjacentHTML("beforeend", renderLogList(logObject));

    resultDescrTeg.innerHTML = renderResult();
    renderResultList();
    closeModal();
    console.log("closeModal");
  }

  numberTaskTeg.textContent = numberTask; // вивід номера задачі на екран
  randomSubTeg.textContent = randomSubArr[numberTask - 1]; // вивід наступного множника на екран
  myForm.reset();
}





// ===== FUNCTIONS =============


function renderLogList({ id, userName, needTime, rightAnswer }) {
  const formatTime = String(needTime).padStart(3, '0');
  return `<li>${id}. ${userName}. Time: ${formatTime} s. Level: ${int_sub_1} Result: ${rightAnswer}/8</li>`;
}


function onStartTimer() {
  interval_Id = setInterval(()=> {
    timeCounter += 1;
    myTimer.textContent = onTimeCount(timeCounter);
  }, 1000);
  
}


function onStoptTimer() {
  clearInterval(interval_Id);
  timeCounter = 0;
  myTimer.textContent = "0:00:00";
}


function renderResult() {
  let resMessage = '';
  let msgColor = '';

  if(rightAnswer < 5) {
    resMessage = `Результат ${rightAnswer} із 8. 😒`;
    msgColor = "dscr-red";
  }
  else if (rightAnswer > 4 && rightAnswer < 8) {
    resMessage = `Твій результат ${rightAnswer} із 8. Не зупиняйся`;
    msgColor = "dscr-yellow";
  }
  else {
    resMessage = `Супер! Ти молодець! Результат ${rightAnswer} із 8 😎`;
    msgColor = "dscr-green";
  }

  return `
    <ul class="result-list"></ul>
    <h2 class="result-descr ${msgColor}">${resMessage}</h2>
  `;
}



function renderResultList() {
  const listTeg = document.querySelector(".result-list");
  const markup = resultArr.map((item, idx) => {
    const ix = randomSubArr[idx]; // Другий множник
    // const iy = ix * 2 === item ? "✅" : "❌";
    let iy = "✅";
    let classColor = "green";
    if(ix * int_sub_1 != item) {
      iy = "❌";
      classColor = "red";
    }
    return `
      <li class="js-${classColor}">${iy} ${int_sub_1} x ${ix} = ${item}</li>
    `;
  }).join("");
  listTeg.innerHTML = markup;
  
}




// ==== Select =====
// const select = document.querySelector("#_select");
// console.log(select.value);

// select.addEventListener("change", (event)=> {
//   console.log(event.currentTarget.value);

// });