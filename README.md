# How to Create Surrogate Pairs

Run node and see log.

```
node index.js
```

## `encodeUTF16Pair`

```js
// https://unicodebook.readthedocs.io/unicode_encodings.html#utf-16-surrogate-pairs
function encodeUTF16Pair(character) {
  const code = character - 0x10000;
  return [
    0xD800 + (code >> 10),
    0xDC00 + (code & 0x3FF)
  ];
}

const character = 0x28277; // 𨉷
encodeUTF16Pair(character);
// => [ 55392, 56951 ]
```

## Doodle

```js
const R = require('ramda');
const character = 0x28277; // 𨉷
R.pipe(
  code => code - 0x10000,
  code => code.toString(2),
  code => code.padStart(20, '0'),
  R.splitAt(10),
  pair => [
    0xD800 + parseInt(pair[0], 2),
    0xDC00 + parseInt(pair[1], 2)
  ]
)(character);
// => [ 55392, 56951 ]
```