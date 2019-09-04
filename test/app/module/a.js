module.exports = {
  name: 'test',
  fun: function(str){
    return str;
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