module.exports = {
    prop: 'prop a',
    fun: function(str){
        this.prop = str;
        return this.prop;
    }
}