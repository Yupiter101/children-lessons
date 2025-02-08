/*
    Тут задаємо час таймер для отримання медалей
*/


export const setting = {
    base: [30, 30, 30, 30, 30, 30, 30, 30],
    getIron() {
        return this.base.map(i=>i+30);
    },
    getSilver() {
        return this.base.map(i=>i+10);
    },
    getGold() {
        return this.base.map(i=>i);
    },
}