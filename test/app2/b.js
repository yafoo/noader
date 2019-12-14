module.exports = class {
    constructor(str) {
        this.str = str;
    }
    fun(str) {
        this.str = str;
        return this.str;
    }
    self() {
        return this;
    }
}