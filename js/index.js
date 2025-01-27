console.log("Hello from ILLIA index.js");

"use strict"; // код в суворому режимі

import { randomLine } from "./admins.js";



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
}


function closeModal() {
  modal.classList.add("is-hidden");
  closeModalBtn.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeModalEsc);

  
  numberTask = 1;
  numberTaskTeg.textContent = numberTask; // рестарт номера задачі на екран 1
}

function closeModalEsc(e) {
  if(e.code === "Escape") {
      closeModal();
  }
}





// ==== submit =====
const myForm = document.querySelector(".modal-form");
myForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.answer.value;
  if(inputValue === "") {
    alert("Потрібно ввести число!");
    return;
  }
  
  resultArr[numberTask - 1] = Number(inputValue); // Записуєм введену відповідь у масив
  numberTask += 1;
  

  // console.log(numberTask);

  if(numberTask >= 9) {
    numberTask = 1;
    numberTaskTeg.textContent = numberTask; // рестарт номера задачі на екран 1
    openModalBtn.textContent = "Спробувати ще раз";
    randomSubTeg.textContent = 1; // множник стартує з 1
    console.log(numberTask);
    resultDescrTeg.innerHTML = renderResult();
    renderResultList();
    closeModal();
  }

  numberTaskTeg.textContent = numberTask; // вивід номера задачі на екран
  randomSubTeg.textContent = randomSubArr[numberTask - 1]; // вивід наступного множника на екран
  myForm.reset();

}






// ===== FUNCTIONS =============

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