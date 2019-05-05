# Data Fixer Changelog

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
