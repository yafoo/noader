const noader = require('../index');

const loader = noader();
console.log(loader.app.module.a.prop); // a
console.log(loader.app.module.a.fun('test1')); // test1
console.log(new loader.app.module.a.cls().fun()); // undefined
console.log(new loader.app.module.a.cls('test2').fun()); // test2

console.log('---------------------------------');

const loader2 = noader(__dirname, 'test3');
//if the module is a class, the loader will auto new a instance
console.log(loader2.app.module.b); // class b
console.log(loader2.app.module.b.str); // test3
console.log(loader2.app.module.b.fun('testx')); // testx

console.log('---------------------------------');

console.log(loader2.app.module.b); // class b
console.log(loader2.app.module.b.str); // testx
loader2.app.module.b.str = 'test4';
console.log(loader2.app.module.b.str); // test4
console.log(loader2.app.module.b.fun('test5')); // test5
console.log(new loader2.app.module.b('test6').str); // test6 && the result is a new instance
console.log(loader2.app.module.b.str); // test5
console.log(loader2.app.module.b.self()); // class b && can not get the instance of this
console.log(loader2.app.module.b.$prop); // {path: , is_class: , instance: }
console.log(loader2.app.module.b.$prop.instance === loader2.app.module.b.$prop.instance.self()); //get instance by $prop