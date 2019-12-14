const noader = require('../index');

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