/**
 * UTF-16
 */
console.log('\u305D\u306E\u30C1\u30A7\u31F7\u309A\u306F\uD867\uDE3D');
// => そのチェㇷ゚は𩸽

/**
 * Unicode code point
 */
console.log('𩸽'.codePointAt());
// => 171581 (0x29e3d)
console.log(String.fromCodePoint(171581));
// => 𩸽
console.log('\u{29e3d}');
// => 𩸽

/**
 * Surrogate pair
 */
console.log('𩸽'.charCodeAt(), '𩸽'.charCodeAt(1));
// => 55399 56893 (0xd867 0xde3d)

/**
 * How to calculate surrogate pairs
 * 
 * Example:
 *   𨉷 (U+28277) => \ud860\ude77
 */
const R = require('ramda');
const character = 0x28277;
console.log(
  R.pipe(
    code => code - 0x10000,
    code => code.toString(2),
    code => code.padStart(20, '0'),
    R.splitAt(10),
    pair => [
      0xD800 + parseInt(pair[0], 2),
      0xDC00 + parseInt(pair[1], 2)
    ]
  )(character)
);
// [ 55392, 56951 ]

// https://unicodebook.readthedocs.io/unicode_encodings.html#utf-16-surrogate-pairs
function encodeToUTF16Pair(char) {
  const code = char - 0x10000;
  return [
    0xD800 + (code >> 10),
    0xDC00 + (code & 0x3FF)
  ];
}

console.log(encodeToUTF16Pair(0x28277));
// [ 55392, 56951 ]