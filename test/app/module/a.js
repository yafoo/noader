module.exports = {
  prop: 'a',
  fun: function(str){
    this.prop = str;
    return this.prop;
  },
  cls: class {
    constructor(str) {
      this.str = str;
    }
    fun() {
      return this.str;
    }
  }
}