const assert = require('assert')

const obj = {}
const arr = []
const fn = () => {}

// internamente, objetos literais viram funcoes explicitas

console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referencia do objeto que possui as propriedades nele

console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// o __proto__ de Object.prototype é null

console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null)
assert.deepStrictEqual(obj.__proto__.__proto__, null)

// ---------

console.log('------------')

function Employee() {}
Employee.prototype.salary = () => 'salary**'

function Supervisor() {}
// herda a instância de employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => 'profitShare**'

// function Manager() {}
// Manager.prototype = Object.create(Supervisor.prototype)
// Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// // podemos chamar via prototype, mas se tentar chamar direto dá erro!
// console.log('Manager.prototype.salary()'. Manager.prototype.salary())
// // se não chamar o 'new', o primeiro __proto__ vai ser sempre
// // a instancia de Function, sem herdar nossas classes
// // Para acessar as classes sem o new, pode acessar direto via prototype
// console.log(Manager.prototype.__proto__ === Supervisor.prototype)

console.log('----------')

class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3()
console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)
console.log('t3.ping', t3.ping())
console.log('t3.pong', t3.pong())
console.log('t3.shoot', t3.shoot())