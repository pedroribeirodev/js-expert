const assert = require('assert')
const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
  .set(1, 'one')
  .set('Erick', { text: 'two' })
  .set(true, () => 'hello')

// usando um constructor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

// console.log('myMap', myMap)
// console.log('get', myMap.get(1))
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Erick Wendel' }) 

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Erick Wendel' })

// utilitarios
// - no Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coercao implicita para boolean e retorna false
// o jeito certo em Object é ({ name: 'Erick' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// imperformático para o JavaScript
assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Erick",{"text":"two"}],[true, () => {}]]))

// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({  }).toString() => '[object, Object]'
// ({toString: () => 'Hey' }).toString() === 'Hey

// qualquer chave pode colidir, com as propriedades herdadas do objecto, como
// constructor, toString, valueOf e etc.

const actor = {
  name: 'xuxa',
  toString: 'Queen: Xuxa da Silva'
}

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Nao da para limpar um Obj sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// --- WeakMap

// Pode ser coletado após perder as referencias
// usado em casos beeeem específicos

// tem a maioria dos benefícios do Map
// MAS: não é iterável
// Só chaves de referência e que você já conheça
// mais leve e preve leak de memória,pq depois que as intâncias saem da memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'flash' }

// weakMap.set(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
// weakMap.get(hero)