// notes 

const a = null;
const b = 0;
const c = b ?? a;
// console.log(c); // 0


// ======= Random (from - to) =======

export function randomNumber (x, y) {
    // return Math.round(Math.random() * (10 - 1) + 1);
    return Math.round(Math.random() * (y - x) + x);
}


// ======= Random (Повертає масив номерів з 2 до 9 у рандомному порядку) =======

export function randomLine () {
    // Створення масиву 2-9
    let currArr = []; // 
    for (let i=2; i<=9; i++) currArr[i-2] = i;

    // Заповнення масиву рандомним порядком
    let randomArr = [];
    let myLenth = 8;
    for (let i=0; i<=7; i++) {
        const randIdx = randomNumber(0, myLenth-1);
        randomArr[i] = currArr[randIdx];
        currArr.splice(randIdx, 1);
        myLenth -= 1;
      }

    return randomArr;
}


// ====== TIME_COUNTER ============

export function onTimeCount (s) {
    let h = Math.floor(s/3600);

    let min  = Math.floor(s/60);
    if(min < 10) min = "0" + min;

    let sec =  Math.floor(s%60);
    if(sec < 10) sec = "0" + sec;

    return `${h}:${min}:${sec}`;
}

// ====== ON DATE TIME ============

export function onDateTime () {
    const currentTime = new Date();
    // == DATE ==
    const carrDate = currentTime.getDate();
    const carrMonth = currentTime.getMonth() + 1;
    const carrYear = currentTime.getFullYear();
    // == TIME ==
    const carrHour = currentTime.getHours();
    let carrMin = currentTime.getMinutes();
    if(carrMin < 10) carrMin = "0" + carrMin;
    let carrSec = currentTime.getSeconds();
    if(carrSec < 10) carrSec = "0" + carrSec;
    // const formatTime = `${carrHours} : ${xx(carrMin)} : ${xx(carrSec)}`;
    return `${carrDate}.${carrMonth}.${carrYear} ${carrHour}:${carrMin}:${carrSec}`;
}

export function onDateTimeUk () {
    const arrMonth = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня" ];
    const arrDay = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];

    const currentTime = new Date();
    // == DATE ==
    const carrDay = arrDay[currentTime.getDay()];
    const carrDate = currentTime.getDate();
    const carrMonth = arrMonth[currentTime.getMonth()];
    const carrYear = currentTime.getFullYear();
    // == TIME ==
    const carrHour = currentTime.getHours();
    let carrMin = currentTime.getMinutes();
    if(carrMin < 10) carrMin = "0" + carrMin;
    let carrSec = currentTime.getSeconds();
    if(carrSec < 10) carrSec = "0" + carrSec;
    // const formatTime = `${carrHours} : ${xx(carrMin)} : ${xx(carrSec)}`;
    return `${carrDate} ${carrMonth} ${carrYear} року. Time: ${carrHour}:${carrMin}:${carrSec}`;
}