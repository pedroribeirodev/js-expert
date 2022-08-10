'use strict'

const assert = require('assert')

// garantir semantica e segurança em objetos

// --- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

// myObj.add.apply = function () {throw new Error('vixxx')}
assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// esse aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError('vixxx') }

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'vixxx'
  }
)

// usando reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)

// --- apply
// --- defineProperty

// questoes semanticas

function myDate() {}

// feio pra kct, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(myDate, 'withObject', { value: () => 'hey there' })

// agora faz mais sentido
Reflect.defineProperty(myDate, 'withReflection', { value: () => 'hey dude' })

assert.deepStrictEqual(myDate.withObject(), 'hey there')
assert.deepStrictEqual(myDate.withReflection(), 'hey dude')
// --- defineProperty

// ---deleteProperty
const withDelete = { user: 'ErickWendel' }
// imperformático, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'XuxaDaSilva' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// --- deleteProperty
// --- get

// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['userName'], undefined)
// com reflection, uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'userName'), TypeError)
// ---get

// ---has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))
// ---has

// --- ownKeys
const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'erickwendel'
}

// Com os metodos de object, temos que fazer duas requisições
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// com reflection, só um metódo
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])