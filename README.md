# noader
NodeJS module automatic on-demand lazy loader（NodeJS模块自动按需懒加载器）

# Install

```bash
npm install noader
```

# Usage

## project example

```
├── test
│  ├── app
│  │  └── module
│  │     └── a.js
│  ├── app2
│  │  └── b.js
│  └── index.js
```
## // a.js

```javascript
module.exports = {
    prop: 'prop a',
    fun: function(str){
        this.prop = str;
        return this.prop;
    }
}
```
## // b.js

```javascript
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
```
## // index.js

```javascript
const noader = require('noader');

const loader = noader();
console.log(loader.app.module.a); // Object: a
console.log(loader.app.module.a.prop); // String: 'prop a'
console.log(loader.app.module.a.fun('test1')); // String: 'test1'
console.log(loader.app2.b); // Class: b
console.log(loader.app2.b === loader.app2.b); // Boolean: true
console.log(loader.app2.b.str); // Undefined
console.log(loader.app2.b.fun('test2')); // String: 'test2'
console.log(loader.app2.b.$map.instance); // Class: b instance
console.log(loader.app2.b.$map.instance === loader.app2.b.$map.instance); // Boolean: true
console.log(loader.app2.b.$map.is_class); // Boolean: true
const c = new loader.app2.b('test3');
console.log(c); // Class b instance: c
console.log(c.str); // String: 'test3'

console.log('---------------------------------');

const loader2 = noader(__dirname + '/../', 'test4');
console.log(loader2.test.app.module.a); // Object: a
console.log(loader2.test.app2.b); // Class: b
console.log(loader2.test.app2.b.str); // String: 'test4'

console.log('---------------------------------');

console.log(loader2.test.app2.b === loader.app2.b); // Boolean: false (because the class is a proxy object)
console.log(loader2.test.app2.b.$map.instance === loader.app2.b.$map.instance); // Boolean: false
console.log(loader2.test.app2.b.$map.path); // the absoulte path of b
```
## result

```javascript
{ prop: 'prop a', fun: [Function: fun] }
prop a
test1
[Function]
true
undefined
test2
{ str: 'test2' }
true
true
{ str: 'test3' }
test3
---------------------------------
{ prop: 'test1', fun: [Function: fun] }
[Function]
test4
---------------------------------
false
false
D:\wwwroot\noader\test/app2/b/
```
# test

```javascript
npm test
```

# links

- [github(noader)](https://github.com/yafoo/noader)
- [github(iijs)](https://github.com/yafoo/iijs)

# License

[MIT](LICENSE)