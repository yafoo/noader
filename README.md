# noader
NodeJS module automatic on-demand lazy loader（NodeJS模块自动按需懒加载器）

# Install

```bash
npm install noader
```

# Usage

```javascript
/*
  module a
  /app/module/a.js
*/
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

/*
  module b
  /app/b.js
*/
module.exports = class {
  constructor(str) {
    this.str = str;
  }
  fun() {
    return this.str;
  }
}

/*
  module test
  /test.js
*/

const noader = require('noader');

const loader = noader();
console.log(loader.app.module.a.name); // test
console.log(loader.app.module.a.fun('test1')); // test1
console.log(new loader.app.module.a.cls('test2').fun()); // test2

//if the module is a class, the loader will auto new a instance
console.log(loader.app.b); // class function
console.log(loader.app.b.fun()); // undefined

//the args will be used at new
const loader2 = noader('./', 'test3');
console.log(loader2.app.b.fun()); // test3

```

# License

[MIT](LICENSE)
