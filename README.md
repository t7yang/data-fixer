# Data Fixer

A tool for check and fix data with schema, inspired by angular reactive form.

### Installation

npm:

```bash
$ npm install data-fixer
```

yarn:

```bash
$ yarn add data-fixer
```

### Type Definition

This project develop with TypeScript, type is build-in with publish.

### Usage

There are three "Controllers" which `vctrl` for primivite value, `actrl` for array, and `octrl` for object.

Several "validators" can help you to check the value validity:

- `isType`: check value type (`Number`, `String`, `Boolean`, `Object`, `Array`).
- `isEq`: check is value equal to specify value.
- `isOneOf`: check is value match one of candidates.
- `isGt`: check is value great than specify value.
- `isLt`: check is value least than specify value.
- `isGte`: check is value great than or equal specify value.
- `isLte`: check is value least than or equal specify value.
- `isLgt`: check is value length great than specify value.
- `isLlt`: check is value length least than specify value.
- `isPatt`: check is value fit the regex pattern.
- `or`: combine 2+ validator with logic "or".
- `isVdWith`: able to receive a custom validate function to check value.

`vctrl` demo

```javascript
import { vctrl, isEq, isType, isGt, or } from 'data-fixer';

// vctrl: (p1: validatorFn|validatorFn[], p2: fallback value)
const isEq0 = vctrl(isEq(0), 0);

const holder1 = isEq0(0);
holder.valid; // true
holder.invalid; // false
holder.getValue(); // 0

const holder2 = isEq0(7);
holder.valid; // false
holder.invalid; // true
holder.getValue(); // 0

const isIndex = vctrl([isType(Number), or([isEq(-1), isGte(0)])], 0);

const holder1 = isIndex(0);
holder.valid; // true
holder.invalid; // false
holder.getValue(); // 0

const holder2 = isIndex(-2);
holder.valid; // false
holder.invalid; // true
holder.getValue(); // 0

// isOneOf is a shorthand of combination of or and isEq
const isColor1 = vctrl(or([isEq('black'), isEq('red')]));
const isColor2 = vctrl(isOneOf(['black', 'red']));
```

`actrl` demo

```javascript
import { actrl, vctrl, isType } from 'data-fixer';

const isNumber = vctrl(isType(Number), 1);
const isAllNumber = actrl(isNumber);

const holder = isAllNumber([1, 2, 3, '4']);
holder.valid; // false
holder.invalid; // true
holder.getValue(); // [1, 2, 3, 1]
```

`dctrl` demo

```javascript
import { dctrl, vctrl, isType } from 'data-fixer';

const isNumber = vctrl(isType(Number), 1);
const isAllNumber = dctrl(isNumber);

// dctrl can handle for object that care only for its value type
const holder = isAllNumber({ a: 1, b: 2, c: 3, d: '4' });
holder.valid; // false
holder.invalid; // true
holder.getValue(); // { a: 1, b: 2, c: 3, d: 1 }
```

`octrl` demo

```javascript
import { octrl, vctrl, isEq, isType } from 'data-fixer';

const isConfig = octrl({
  version: vctrl(isEq(2), 2),
  menus: octrl({
    enabled: vctrl(isType(Boolean), false),
    clipboard: vctrl(isType(Boolean), true),
  }),
});

const holder = isConfig({});
holder.valid; // false
holder.invalid; // true
holder.getValue(); // { version: 2, menus: { enabled: false, clipboard: true } }
```

`tctrl` demo

```javascript
import { tctrl, vctrl, isType } from 'data-fixer';

const isNumber = vctrl(isType(Number), 1);
const isString = vctrl(isType(String), 'a');
const isNumberString = tctrl([isNumber, isString]);

// tctrl can check tuple type array
const holder = isNumberString([1, 1]);
holder.valid; // false
holder.invalid; // true
holder.getValue(); // [1, 'a']
```

### Caution

Becareful for type coercion in JavaScript, for example `isGt(0)('123') === true`, you should handle you self by checking the type correctness.
