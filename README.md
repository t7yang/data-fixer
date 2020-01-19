# Data Fixer

A tool for check and fix data with json schema, inspired by angular reactive form.

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

There are three "Controllers" which `vctrl` for primivite value, `actrl` for array, `dctrl` for Dictionary, `rctrl` for Record, and `tctrl` for tuple.

Simply provide a json schema and fallback value/function to `vctrl`, compose one or many `vctrl` in other `*ctrl` for structural data.

`vctrl` demo

```javascript
import { vctrl } from 'data-fixer';

// vctrl: (p1: JSONSchema, p2: fallback value/function)
const isGt0 = vctrl({ type: 'number', exclusiveMinimum: 0 }, 1);

const holder1 = isGt0(0);
holder1.valid; // false
holder1.invalid; // true
holder1.value(); // 1

const holder2 = isGt0(7);
holder2.valid; // true
holder2.invalid; // false
holder2.value(); // 7

// type coercion case
const isGt0 = vctrl({ type: 'number', exclusiveMinimum: 0 }, 1, { coerceTypes: true });

const holder1 = isGt0('7');
holder1.valid; // true
holder1.invalid; // false
holder1.value(); // '7', ajv only coerce object property

// fallback function
const fallback = (data: any) => Number.isNaN(+data) ? +data : 1;
const isNumber = vctrl({ type: 'number' }, fallback);

const holder = isNumber('7');
holder.valid; // false
holder.invalid; // true
holder.value(); // 7
```

`actrl` demo

```javascript
import { actrl, vctrl } from 'data-fixer';

const isNumber = vctrl({ type: 'number' }, 1);
const isAllNumber = actrl(isNumber);

const holder = isAllNumber([1, 2, 3, '4']);
holder.valid; // false
holder.invalid; // true
holder.value(); // [1, 2, 3, 1];
```

`rctrl` demo

```javascript
import { rctrl, vctrl } from 'data-fixer';

const isNumber = vctrl({ type: 'number' }, 1);
const isAllNumber = rctrl(isNumber);

// rctrl can handle for object that care only for its value type
const holder = isAllNumber({ a: 1, b: 2, c: 3, d: '4' });
holder.valid; // false
holder.invalid; // true
holder.value(); // { a: 1, b: 2, c: 3, d: 1 }
```

`dctrl` demo

```javascript
import { dctrl, vctrl } from 'data-fixer';

const isConfig = dctrl({
  version: vctrl({ type: 'number', const: 2 }, 2),
  menus: dctrl({
    enabled: vctrl({ type: 'boolean' }, false),
    clipboard: vctrl({ type: 'boolean' }, true),
  }),
});

const holder = isConfig({});
holder.valid; // false
holder.invalid; // true
holder.value(); // { version: 2, menus: { enabled: false, clipboard: true } }
```

`tctrl` demo

```javascript
import { tctrl, vctrl } from 'data-fixer';

const isNumber = vctrl({ type: 'number' }, 1);
const isString = vctrl({ type: 'string' }, 'a');
const isNumberString = tctrl(isNumber, isString);

// tctrl can check tuple type array
const holder = isNumberString([1, 1]);
holder.valid; // false
holder.invalid; // true
holder.value(); // [1, 'a']
```

### More

Data Fixer is based json schema and ajv, please [check here](https://json-schema.org/understanding-json-schema/index.html) to get more detail about how to use json schema.
