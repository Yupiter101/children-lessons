


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
