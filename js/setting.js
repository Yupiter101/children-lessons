


export const setting = {
    base: [11, 14, 14, 11, 14, 14, 14, 14],
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