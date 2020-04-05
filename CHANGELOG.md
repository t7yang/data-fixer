# Data Fixer Changelog

### v4.0.0
BREAKING CHANGE
To allow using difference schema validator to validate data, a new adapter feature provided in v4.

- Feature
  - Add `Adapter` feature to let user choose from diffenrece schema validator.
  - `vctrl` signature from `<T>(schema: JSONSchema7, alt: T, opt?: Ajv.options) => Control<T>` to `<T>(vtor: Vtor, alt: T) => Control<T>` which `Vtor` is `(data: any) => boolean`.

### v3.0.1
- Update deps.

### v3.0.0
BREAKING CHANGE
v3.0.0 replace all built-in validate functions by json schema and check internally by ajv.
The changes is huge, but now we can stand on the giant shoulder.
Another big step improvement is now `dctrl` and `tctrl` has better type defination and output type infer.

- Refactor
  - `vctrl` apply json schema and ajv to validate.
- Fix
  - Correctly define the type of `TupleControl` and `DictionaryControl`.
- Deprecated
  - Remove all validator functions instead using json schema.
  - Rename `getValue` API to `value`.

### v2.0.0
- Readme
- Refactor
  - `actrl` no longer handle for checking dictionary object.
  - `octrl` no longer handle for empty schema.
- Feature
  - Function can now pass to `vctrl` as `alt` param which receive incoming value and produce fallback value.
  - New validate function `isVdWith` added, custom validate function can now pass to `vctrl` with `isVdWith`.
  - New controller `dctrl` added for check dictionary object.
  - New controller `tctrl` added for check tuple array.

### v1.1.3

- Fix
  - `actrl` can properly handle for void input.
  - `octrl` can properly handle for none Object input.

### v1.1.2

- Hotfix
  - Export `isOneOf`.

### v1.1.0

- Update
  - Make actrl support to hanlde object that must match a type.
- Add
  - Add a new validator `isOneOf` for match value in a list of candidates.

### v1.0.0

- First release.
