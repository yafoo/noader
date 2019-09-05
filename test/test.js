const noader = require('../index');

const loader = noader();
console.log(loader.app.module.a.name); // test
console.log(loader.app.module.a.fun('test1')); // test1
console.log(new loader.app.module.a.cls('test2').fun()); // test2

//if the module is a class, the loader will auto new a instance
console.log(loader.app.b); // class function
console.log(loader.app.b.fun()); // undefined

//the args will be used at new
const loader2 = noader(__dirname, 'test3');
console.log(loader2.app.b.fun()); // test3

console.log(loader2.app.b.$class); // true
console.log(loader2.app.b.$instance); // class instance
console.log(loader2.app.b.$path); // true