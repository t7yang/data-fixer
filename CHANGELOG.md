# Data Fixer Changelog

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [5.0.1] - 2021-07-12

Bump deps version for security issues.

## [5.0.0] - 2020-12-24

A bump for major version due applying recursive types and variadic tuple types in TypeScript 4.1.3.

## [4.0.2] - 2020-09-26

### Security

- Update dependencies to latest version.

## [4.0.1] - 2020-04-19

### Refactor

- Rewrite isObject validation function

## [4.0.0] - 2020-04-05

BREAKING CHANGE
To allow using difference schema validator to validate data, a new adapter feature provided in v4.

### Feature

- Add `Adapter` feature to let user choose from diffenrece schema validator.
- `vctrl` signature from `<T>(schema: JSONSchema7, alt: T, opt?: Ajv.options) => Control<T>` to `<T>(vtor: Vtor, alt: T) => Control<T>` which `Vtor` is `(data: any) => boolean`.

## [3.0.1] - 2020-03-20

- Update deps.

## [3.0.0] - 2020-01-20

BREAKING CHANGE
v3.0.0 replace all built-in validate functions by json schema and check internally by ajv.
The changes is huge, but now we can stand on the giant shoulder.
Another big step improvement is now `dctrl` and `tctrl` has better type defination and output type infer.

### Refactor

- `vctrl` apply json schema and ajv to validate.

### Fix

- Correctly define the type of `TupleControl` and `DictionaryControl`.

### Deprecated

- Remove all validator functions instead using json schema.
- Rename `getValue` API to `value`.

## [2.0.0] - 2019-05-06

- Readme

### Refactor

- `actrl` no longer handle for checking dictionary object.
- `octrl` no longer handle for empty schema.

### Feature

- Function can now pass to `vctrl` as `alt` param which receive incoming value and produce fallback value.
- New validate function `isVdWith` added, custom validate function can now pass to `vctrl` with `isVdWith`.
- New controller `dctrl` added for check dictionary object.
- New controller `tctrl` added for check tuple array.

## [1.1.3] - 2019-04-22

### Fix

- `actrl` can properly handle for void input.
- `octrl` can properly handle for none Object input.

## [1.1.2] - 2019-04-09

- Hotfix
  - Export `isOneOf`.

## [1.1.0] - 2019-04-08

### Update

- Make actrl support to hanlde object that must match a type.

### Add

- Add a new validator `isOneOf` for match value in a list of candidates.

## [1.0.0] - 2019-04-03

- First release.
