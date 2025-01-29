console.log("Hello from ILLIA index.js");

"use strict"; // код в суворому режимі

import { randomLine, onTimeCount, onDateTime } from "./admins.js";



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
let int_sub_1 = 2; // Змінна про перший множник, стягується з селекту 
let timeCounter = 0;
let interval_Id = null;

const myTimer = document.querySelector(".my-timer");
const listRang = document.querySelector("#list-rang");
renderRangList();




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


// ======== openModal =========
function openModal () {
  modal.classList.remove("is-hidden");
  closeModalBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", closeModalEsc);


  int_sub_1 = Number(select.value);
  subTeg_1.textContent = select.value;

  randomSubArr = randomLine(); // Масив з рандомної черги
  console.log(randomSubArr);
  randomSubTeg.textContent = randomSubArr[numberTask - 1]; // вивід наступного множника на екран 
  onStartTimer();
}


function closeModal() {
  modal.classList.add("is-hidden");
  closeModalBtn.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeModalEsc);

  
  numberTask = 1;
  numberTaskTeg.textContent = numberTask; // рестарт номера задачі на екран 1
  onStoptTimer();
  console.log(onDateTime());
}

function closeModalEsc(e) {
  if(e.code === "Escape") {
      closeModal();
  }
}


// Завантаження звуків

const soundWin_1s = new Audio();
soundWin_1s.src = "../sounds/sound-win-1s.wav"; // 1s

const soundWin_3s = new Audio();
soundWin_3s.src = "../sounds/game-won.wav"; // 3s

const soundLost = new Audio();
soundLost.src = "../sounds/sound-lost.wav"; // 1s



// ==== submit =====
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
  
  // console.log(numberTask);
  if(numberTask < 8) {
    if(randomSubArr[numberTask - 1] * int_sub_1 === resultArr[numberTask - 1]) {
      console.log("Win");
      soundWin_1s.play();
    }
    else {
      console.log("Lost");
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
  

  if(numberTask >= 9) {
    numberTask = 1;
    numberTaskTeg.textContent = numberTask; // рестарт номера задачі на екран 1
    openModalBtn.textContent = "Спробувати ще раз";
    randomSubTeg.textContent = 1; // множник стартує з 1
    // console.log(numberTask);
    resultDescrTeg.innerHTML = renderResult();
    renderResultList();
    closeModal();
  }

  numberTaskTeg.textContent = numberTask; // вивід номера задачі на екран
  randomSubTeg.textContent = randomSubArr[numberTask - 1]; // вивід наступного множника на екран
  myForm.reset();

}






// ===== FUNCTIONS =============

function renderRangList() {
  listRang.innerHTML = `<li>30.1.2025 0:12:26</li>`;
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
  let res = 0;
  let resMessage = '';
  let msgColor = '';

  // console.log(randomSubArr);
  // console.log(resultArr);

  for (let i=0; i<=8; i++) {
    if(randomSubArr[i] * int_sub_1 === resultArr[i]) {
      res +=1;
    }
  };

  if(res < 5) {
    resMessage = `Результат ${res} із 8. 😒`;
    msgColor = "dscr-red";
  }
  else if (res > 4 && res < 8) {
    resMessage = `Твій результат ${res} із 8. Не зупиняйся`;
    msgColor = "dscr-yellow";
  }
  else {
    resMessage = "Супер! Ти молодець! Результат 8 із 8 😎";
    msgColor = "dscr-green";
  }


  // if(res < 5) resMessage = `Результат ${res} із 8. 😒`
  // else if (res > 4 && res < 8) resMessage = `Твій результат ${res} із 8. Не зупиняйся`;
  // else resMessage = "Супер! Ти молодець! Результат 8 із 8 😎";


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