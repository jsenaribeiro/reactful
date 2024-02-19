<script src='./index.js'></script>
<style>@import url(./index.css);</style>

<article>
<embed type='text/html' src='./header.html' />
<header>helper prototyping</header>

> function • object • string<br/>number • JSON • array

## Function

The `isAsync()` function method returns true if the the function is a promise without the need that the target function be called to be checked its result is a promise.

```ts
import 'reactive/extensions'

const myAsyncFunction = () => new Promise()

const isAsync = myAsyncFunction.isAsync() // true
```

## Object

The `Object.valueOf` overrides allows to get or set a object using dot syntax.

```ts
import 'reactive/extensions'

const myObject = { name: 'john', address: { postalCode: 123 }  }

const postalCode = myObject.valueOf('address.postalCode')

myObject.valueOf('address.postalCode', 0123456789) // changing
```

## Number

The `Number.format` enable numeric format with comma separator and decimal digits.

```ts
import 'reactive/extensions'

const myNumber = 123456789

myNumber.format(true)     // 123,456,789
myNumber.format(true, 2)  // 1,234,567.89
```

## String

New versatile and common case conversors to string type.

```ts
const myNumberString = '0123456789'

myNumberString.toNumber() // 123456789

const myArrayString1 = 'asdf,asd,asdf'
const myArrayString2 = '["asdf","asd","asdf"]'

myArrayString1.toArray() == myArrayString2.toArray()

const myJSONObject = '{ name:"json" }'

// its main differenct from JSON.parse
// is that returns '{}' if parse error
myJSONObject.toObject() // { name: 'json' }
```

## Array

Array receives some utility helpers like distinct, first, pairs, and static range.

```ts
[0,1, undefined, 2, 3].distinct() // [0,1,2,3]

[0,1,2,3,4,5,6,7,8,9].first() // 1

[{ name:'john' }].pairs() // [['name','john']]

Array.range(1,3) // [1,2,3]
```

## JSON

The `JSON.scriptify` is a variation of `JSON.stringify` that generates a valid javascript string from an object, enabling to parse not just variables, but also function scripts.

<aside cols=2>

```ts
import 'reactive/extensions'

const myObject = { 
   name: 'hi',
   done: () => true,
}
```
```tsx
JSON.scriptify(myObject)

// { 
//    name: 'hi',
//    done: () => true,
// }
```

</aside>

</article>
<br/><br/>