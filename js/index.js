// console.log("Hello from ILLIA_ index.js");
// "use strict"; // код в суворому режимі

// let isLoglist = true;
let isLoglist = false;

// Repeta:
// const textArea = currentTarget.value; // Всплівает
// const textArea = target.value; // завжди однакове
// npm i lodash.trottle
// import trottle from "lodash.trottle"
// https://handlebarsjs.com/
// perfomance.now(); - Измерение производительности функций в JavaScript
// Шаблонізація
// event.currentTarget.reset();


import { randomLine, onTimeCount, onDateTime } from "./admins.js";
import { createProgressArr, renderProgressList } from "./progress.js";
import { jsonParser, renderLogList, renderLogListItem } from "./loglist.js";


// =========== Таблиця множення =================

let numberTask = 1; // Номер завдання 1-8
let mult2RandomArr = []; // Масив з рандомної черги 2-9
let resultAnswArr = []; // Масив відповідей 
let logObjectArr = []; // Масив з обєктів логів 
let mult_1 = 2; // Змінна про перший множник, стягується з селекту 
let timeCounter = 0;
let interval_Id = null; 
let rightAnswer = 0; // Лічильник правильних відповідей
let isSound = false;


const myTimer = document.querySelector(".my-timer");
const logList = document.querySelector("#log-list");
let userName = "";



const numberTaskTeg = document.querySelector(".form-title span"); //  Тег Номер завдання = Тег html
const mult2RandomTeg = document.querySelector(".random-sub"); //  Тег Множник  з рандомної черги = Тег html
const resultDescrTeg = document.querySelector("#result-answ"); // Тег Відповідь message = Тег html
const tableList = document.querySelector("#t-body"); // Тег для рендеру таблиці прогресу

// ==== audio players  =====
const playerGameWon = document.querySelector(".sounds-game-won"); // Player Won
const playerSoundWin = document.querySelector(".sounds-win"); // Player Win
const playerSoundLost = document.querySelector(".sounds-lost"); // Player Lost

// ==== sound off/on  =====
const soundTogle = document.querySelector("#sound-togle"); //
soundTogle.addEventListener("change", ()=> {
  isSound = !isSound;
});


// ==== Select множника 2 - 9 =====
const subTeg_1 = document.querySelector(".sub-1"); // Перший множник  = Тег html
const select = document.querySelector("#_select"); //  Стягуємо Тег "Select"
// console.log(select.value);







// === removeLocalStor Очищення історії користувача =========
const removeLocalStor = document.querySelector("#remove-item"); //
removeLocalStor.addEventListener("click", ()=> {
  const removeLogUsername = logObjectArr.filter(item => item.userName != userName);
  logObjectArr = [...removeLogUsername];
  localStorage.setItem("school", JSON.stringify(logObjectArr)); // set lockalStorage()

  tableList.innerHTML = renderProgressList(createProgressArr(logObjectArr, userName));
  // loglist
  if(isLoglist) {
    logList.innerHTML = renderLogList(logObjectArr);
  }
});



//  ==== Select для вибору користувача =====

const helloUserTeg = document.querySelector(".main-title"); // Тег для вітання користувача
helloUserTeg.style = "color: red";
helloUserTeg.textContent = "Обери користувача!";

const userNameSelect = document.querySelector("#user-name-select"); // Тег Select для вибору користувача
userNameSelect.addEventListener("change", onHandleUserName);

function onHandleUserName(event) {
    // const val = userNameSelect.value; // Ok
    // const val = event.target.value; // Ok
    const val = event.currentTarget.value; // Ok
    if(val === "username_0") {
      openModalBtn.disabled = true;
      helloUserTeg.style = "color: red";
      helloUserTeg.textContent = "Обери користувача!";
      return;
    }
    const idx = event.currentTarget.selectedIndex;  
    // === USERNAME ===
    userName = event.currentTarget.options[idx].text; // Ok
    renderUserName(userName);
}

// Тут вітання і ProgressList
function renderUserName(u_name) {
    helloUserTeg.style = "color: green";
    helloUserTeg.textContent = `Вітаю ${u_name}! 😀`;
    tableList.innerHTML = renderProgressList(createProgressArr(logObjectArr, u_name));
    openModalBtn.disabled = false;
}


// ===== getLocalStorage and Render LogList at start page ======
const getLocalStorage = localStorage.getItem("school") ?? "";
if(getLocalStorage !== "") {
  logObjectArr = jsonParser(getLocalStorage);

  // loglist
  if(isLoglist) {
    logList.innerHTML = renderLogList(logObjectArr);
  }
  

  const uniqueUsers = getUsers(logObjectArr);

  uniqueUsers.forEach((value, index) => {
    renderSelectUsername(index + 1, value);
    // console.log(`Індекс: ${index + 1}, Значення: ${value}`);
  });

}

function getUsers(arr) {
  return arr.reduce((acc, item)=> {
    if(!acc.includes(item.userName)) {
      acc.push(item.userName);
    }
    return acc;
  }, []);
}
// ===== Заповнення списку користувачів ======




//  === Button Додати нового користувача =====
const addUserBtn = document.querySelector("#addUser");
addUserBtn.addEventListener("click", onMakeNewUser);

function onMakeNewUser() {
  addUserBtn.disabled = true;

  const markupInput = `
      <input id="input-new-username" 
        type="text"
        maxlength="10"
        name="newUser">
      <button type="button" data-action="save">Save</button>
  `;
  addUserBtn.insertAdjacentHTML('afterend', markupInput); //Рендер input і button після addUserBtn

  const newNameInput = document.querySelector('#input-new-username');
  const saveButton = document.querySelector('button[data-action="save"]');
  saveButton.addEventListener('click', onSaveNewUser);

  function onSaveNewUser() {
    const nextNumOpt = userNameSelect.options.length;
    
    // console.log(nextNumOpt);
    const newName = newNameInput.value.trim();
    if(newName === "") {
      alert("Пусте ім'я!");
      return;
    }
    for(let i=0; i<nextNumOpt; i++) {
      if(newName === userNameSelect.options[i].text) {
        alert("Таке ім'я вже є!");
        // console.log(userNameSelect.options[i].text);
        return;
      }
    }
   
    userName = newName;
    // видалення елементів після збереження
    newNameInput.remove();
    saveButton.removeEventListener('click', onSaveNewUser);
    saveButton.remove();
    addUserBtn.disabled = false;

    renderSelectUsername(nextNumOpt, userName); // Наповняємо селект новими імям
    userNameSelect.value = `username_${nextNumOpt}`; // Обираемо його за змовчуванням
    renderUserName(userName); //  вітання і ProgressList
  }
}

function renderSelectUsername(numOption, name) {
    const markupNewName = `<option value="username_${numOption}">${name}</option>`;
    userNameSelect.insertAdjacentHTML('beforeend', markupNewName);
}




// ======== MODAL WINDOW ========

const openModalBtn = document.querySelector("[data-modal-open]");
openModalBtn.disabled = true;
const closeModalBtn = document.querySelector("[data-modal-close]");
const modal = document.querySelector("[data-modal]");


// const modalInput2 = document.querySelector(".modal-form-input2");
// // modalInput2.autofocus = true;
// modalInput2.focus();

// const modalInput = document.querySelector(".modal-form-input");
// modalInput.focus();



openModalBtn.addEventListener("click", openModal);

let isOpenModal = false;



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

  // const modalInput = document.querySelector(".modal-form-input");
  // modalInput.focus(); // focus()
  // console.log(modalInput);

  mult_1 = Number(select.value);
  subTeg_1.textContent = select.value;
  mult2RandomArr = randomLine(); // Масив з рандомної черги
  mult2RandomTeg.textContent = mult2RandomArr[numberTask - 1]; // вивід наступного множника на екран 
  modalInput.focus();
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




// ======================= FORM SUBMIE =====================

const myForm = document.querySelector(".modal-form");
myForm.addEventListener("submit", onSubmit);
let lostFlag = false;

function onSubmit(event) {
  event.preventDefault();
  // const inputValue = event.currentTarget.answer.value;
  const inputValue = event.target.answer.value;
  if(inputValue === "") {
    alert("Потрібно ввести число!");
    return;
  }
  
  resultAnswArr[numberTask - 1] = Number(inputValue); // Записуєм введену відповідь у масив

  // ====== sound =======

  if(mult2RandomArr[numberTask - 1] * mult_1 === resultAnswArr[numberTask - 1]) {
    rightAnswer +=1;
  }

  if(isSound) {
    playerSoundWin.pause();
    playerSoundWin.currentTime = 0;
    playerSoundLost.pause();
    playerSoundLost.currentTime = 0;
    
    if(numberTask < 8) {
      if(mult2RandomArr[numberTask - 1] * mult_1 === resultAnswArr[numberTask - 1]) {
        playerSoundWin.play();
      }
      else {
        playerSoundLost.play();
        lostFlag = true;
      }
    }
    else {
      if(!lostFlag) {
        console.log("Seccess!");
        playerGameWon.play();
      }
    }
  }

  numberTask += 1;

  // === finish  test ===
  if(numberTask >= 9) {
    numberTask = 1;
    lostFlag = false;
    numberTaskTeg.textContent = numberTask; // рестарт номера задачі на екран 1
    // openModalBtn.textContent = "Спробувати ще раз";
    mult2RandomTeg.textContent = 1; // множник стартує з 1

    const logObject = {
      userName,
      needTime: timeCounter,
      rightAnswer,
      mult_1,
      id: onDateTime(),
    };

    const findIndx = logObjectArr.findIndex(item => {
      return item.userName === userName && item.mult_1 === mult_1;
    });

    if(findIndx === -1) {
      logObjectArr.push(logObject);
    }
    else {
      if(logObjectArr[findIndx].rightAnswer < logObject.rightAnswer) {
        logObjectArr[findIndx] = logObject;
      }
      else if(logObject.rightAnswer === 8) {
        if(logObjectArr[findIndx].needTime > logObject.needTime) {
          logObjectArr[findIndx] = logObject;
        }
      }  
    }

    // ===== Render ProgressList at finish  test ======
    tableList.innerHTML = renderProgressList(createProgressArr(logObjectArr, userName));

    //  ==== Збереження у localStorage =====
    localStorage.setItem("school", JSON.stringify(logObjectArr)); // set lockalStorage()
    // loglist
    if(isLoglist)  {
      logList.insertAdjacentHTML("beforeend", renderLogListItem(logObject)); // рендер логів
      // logList.insertAdjacentHTML("afterbegin", renderLogListItem(logObject)); // рендер логів
    }
    

    resultDescrTeg.innerHTML = renderResult(); // Вівід повідомлення та рендер контейнера для списку
    renderResultList(); // рендер рузультатів віддповідей 
    closeModal();
  }

  numberTaskTeg.textContent = numberTask; // вивід номера задачі на екран
  mult2RandomTeg.textContent = mult2RandomArr[numberTask - 1]; // вивід наступного множника на екран
  myForm.reset();
}




// =========== FUNCTIONS === FUNCTIONS ===== FUNCTIONS ===========



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
  const markup = resultAnswArr.map((item, idx) => {
    const ix = mult2RandomArr[idx]; // Другий множник
    // const iy = ix * 2 === item ? "✅" : "❌";
    let iy = "✅";
    let classColor = "green";
    if(ix * mult_1 != item) {
      iy = "❌";
      classColor = "red";
    }
    return `
      <li class="js-${classColor}">${iy} ${mult_1} x ${ix} = ${item}</li>
    `;
  }).join("");
  listTeg.innerHTML = markup;
  
}
