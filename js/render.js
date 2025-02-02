console.log("Hello from test js");
console.log("Тут я сортую масиви");

import { getFormatTime } from "./admins.js";

// const tableList = document.querySelector("#t-body");

const setting = {
    base: [11, 13, 14, 12, 16, 15, 18, 18],
    getIron() {
        return this.base.map(i=>i+10);
    },
    getSilver() {
        return this.base.map(i=>i+5);
    },
    getGold() {
        return this.base.map(i=>i);
    },
    
}


// ===== FUNCTIONS =============

export function createProgressArr(dataarr, usename) {
    const progressArr = [];
    for (let i=0; i<8; i+=1) {
        // фыльтрування по імені та множнику (2-9)
        const newArr = dataarr.filter(item => {
            return item.userName === usename && item.mult_1 === i+2;
        });
        
        if(newArr.length === 0) {
            progressArr[i] = {userName: usename, mult_1: i+2, rightAnswer: "-", needTime: "-"};
            continue; 
        }
        progressArr[i] = newArr[0];
    }
    // console.log(progressArr);
    return progressArr;
}

// export function createProgressArr(dataarr) {
//     const progressArr = [];
//     for (let i=0; i<8; i+=1) {
//         // фыльтрування по імені та множнику (2-9)
//         const newArr = dataarr.filter(item => {
//             return item.userName === "Ілля" && item.mult_1 === i+2;
//         });
        
//         if(newArr.length === 0) {
//             progressArr[i] = {userName: "Noname", mult_1: i+2, rightAnswer: "-", needTime: "-"};
//             continue; 
//         }
//         // створити масив правильних відповідей
//         const newAnswerArr = [];
//         newArr.forEach(element => newAnswerArr.push(element.rightAnswer));

//         // Створити масив з максимального числа правильних відповідей (0-8)
//         const maxAnswerArr = newArr.filter(item => item.rightAnswer === Math.max(...newAnswerArr));

//         // Взяти обєкт з найкращим результатом таймера
//         const newTimeArr = [];
//         maxAnswerArr.forEach(element => newTimeArr.push(element.needTime));
//         const minTimeArr = maxAnswerArr.filter(item => item.needTime === Math.min(...newTimeArr));
//         progressArr[i] = minTimeArr[0];
//     }
//     // console.log(progressArr);
//     return progressArr;
// }


export function renderProgressList(arr) {
   
    const markup = arr.map((item, idx) => {
        // let iron = "";
        // if(item.needTime <= setting.getIron()[idx] && item.rightAnswer === 8) {

        // }


        let iron =   item.needTime <= setting.getIron()[idx] && item.rightAnswer === 8 ? "🎇" : getFormatTime(setting.getIron()[idx]);
        let silver = item.needTime <= setting.getSilver()[idx] && item.rightAnswer === 8 ? "🥈" : getFormatTime(setting.getSilver()[idx]);
        let gold =   item.needTime <= setting.getGold()[idx] && item.rightAnswer === 8 ? "🏆" : getFormatTime(setting.getGold()[idx]);

        return `
            <tr>
                <td>${item.mult_1}</td>
                <td>${item.rightAnswer}/8</td>
                <td>${getFormatTime(item.needTime)}</td>
                <td class="no-result">${iron}</td>
                <td class="no-result">${silver}</td>
                <td class="no-result">${gold}</td>
            </tr>
        `
    }).join("");
    return markup;
}


