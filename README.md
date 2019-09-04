# noader
NodeJS module automatic on-demand lazy loader（NodeJS模块自动按需懒加载器）

# Install

```bash
npm install noader
```

# Usage

```javascript
/*
./app/module/test.js
*/
module.exports = {
  name: 'test',
  fun: function(str){
    return str;
  },
  cls: class {
    constructor(name) {
      this.name = name;
    }
    fun() {
      return this.name;
    }
  }
}

/*
./my.js
*/

const noader = require('noader');

const loader = noader();
console.log(loader.app.module.test.name); // test
console.log(loader.app.module.test.fun('test2')); // test2
console.log(new (loader.app.module.test.cls)('test3').fun()); // test3

const loader2 = noader('./', 'test4');
console.log(loader.app.module.test.cls.fun()); // test4

```

# License

[MIT](LICENSE)
