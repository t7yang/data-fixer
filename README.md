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
import Ajv from 'ajv';
import * as yup from 'yup';
import { ajvAdt, vctrl } from 'data-fixer';

// for Ajv
const isGt0 = vctrl(ajvAdt(new Ajv().compile({ type: 'number', exclusiveMinimum: 0 })), 1);
// since Ajv ValidateFunction already fit the signature of Vtor, if dev in JS, below is OK too.
// but not OK for TS, due Data Fixer only handle for sync validation.
const isGt0 = vctrl(new Ajv().compile({ type: 'number', exclusiveMinimum: 0 }), 1);

// for yup
const isGt0 = vctrl(yupAdt(yup.number().moreThan(0)), 1);

const holder1 = isGt0(0);
holder1.valid; // false
holder1.invalid; // true
holder1.value(); // 1

const holder2 = isGt0(7);
holder2.valid; // true
holder2.invalid; // false
holder2.value(); // 7

// type coercion case
const isGt0 = vctrl(ajvAdt({ type: 'number', exclusiveMinimum: 0 }, { coerceTypes: true }), 1);

const holder1 = isGt0('7');
holder1.valid; // true
holder1.invalid; // false
holder1.value(); // '7', ajv only coerce object property

// fallback function
const fallback = (data: any) => Number.isNaN(+data) ? +data : 1;
const isNumber = vctrl(ajvAdt({ type: 'number' }), fallback);

const holder = isNumber('7');
holder.valid; // false
holder.invalid; // true
holder.value(); // 7
```

`actrl` demo

```javascript
import { actrl, vctrl, ajvAdt } from 'data-fixer';

const isNumber = vctrl(ajvAdt({ type: 'number' }), 1);
const isAllNumber = actrl(isNumber);

const holder = isAllNumber([1, 2, 3, '4']);
holder.valid; // false
holder.invalid; // true
holder.value(); // [1, 2, 3, 1];
```

`rctrl` demo

```javascript
import { rctrl, vctrl, ajvAdt } from 'data-fixer';

const isNumber = vctrl(ajvAdt({ type: 'number' }), 1);
const isAllNumber = rctrl(isNumber);

// rctrl can handle for object that care only for its value type
const holder = isAllNumber({ a: 1, b: 2, c: 3, d: '4' });
holder.valid; // false
holder.invalid; // true
holder.value(); // { a: 1, b: 2, c: 3, d: 1 }
```

`dctrl` demo

```javascript
import { dctrl, vctrl, ajvAdt } from 'data-fixer';

const isConfig = dctrl({
  version: vctrl(ajvAdt({ type: 'number', const: 2 }), 2),
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
import { tctrl, vctrl, ajvAdt } from 'data-fixer';

const isNumber = vctrl(ajvAdt({ type: 'number' }), 1);
const isString = vctrl(ajvAdt({ type: 'string' }), 'a');
const isNumberString = tctrl(isNumber, isString);

// tctrl can check tuple type array
const holder = isNumberString([1, 1]);
holder.valid; // false
holder.invalid; // true
holder.value(); // [1, 'a']
```

### Infer type in TypeScript
Most of the time the return value of `Holder.value()` have the correct type, due it infer the type from the `alt` type.

```typescript
import Ajv from 'ajv';
import { ajvAdt } from '../adapter';
import { vctrl } from '../vctrl/vctrl';
import { dctrl } from './dctrl';

const ctrl = dctrl({
  version: vctrl(ajvAdt(new Ajv().compile({ type: 'number', const: 2 })), 2),
  menus: dctrl({
    enabled: vctrl(ajvAdt(new Ajv().compile({ type: 'boolean' })), false),
    clipboard: vctrl(ajvAdt(new Ajv().compile({ type: 'boolean' })), true),
  }),
});

const holder = ctrl({ version: 2, menus: { enabled: true, clipboard: true } });

// typeof holder.value()
{
  version: number;
  menus: {
    enabled: boolean;
    clipboard: boolean;
  };
}

// The infer result is good, but the version is actually a constant 2 rather than just number.
// There are two ways you can fix this.

// either
vctrl<2>(ajvAdt(new Ajv().compile({ type: 'number', const: 2 })), 2);
// or
vctrl(ajvAdt(new Ajv().compile({ type: 'number', const: 2 })), 2 as 2);
```

### Caveats
- Data Fixer is currently only handle for sync validation.

### More
Data Fixer let developer choose schema validator by using adapter, currently support Ajv and yup. For how to define the schema, please check the below informations:
- For Ajv, please [check here](https://json-schema.org/understanding-json-schema/index.html) .
- For yup, please [check here](https://github.com/jquense/yup) .
