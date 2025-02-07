


export const setting = {
    base: [15, 40, 40, 40, 40, 40, 40, 40],
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