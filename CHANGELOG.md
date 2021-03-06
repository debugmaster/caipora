# Changelog

## v1.4.1
### Changed
- Extend super instance with `Object.assign()`.

## v1.4.0
### Changed
- Move type definitions back to `index.d.ts` with different organization.
### Fixed
- Using custom loggers no longer throws an error in Node.js v11 or later.

## v1.3.0
### Changed
- Improve types.
- Moved type definitions to a different file.
### Fixed
- Remove reflection of global console that breaks some methods

## v1.2.3
### Added
- Improve autocomplete by adding declaration files.
### Changed
- Change `setLevel()` to be case insensitive.

## v1.2.2
### Changed
- Hide constructor of Caipora.

## v1.2.1
### Fixed
- Fixed `register()` and `unregister()` for Node.js v6 and v8.

## v1.2.0
### Added
- Add `register()` and `unregister()` to allow quick import of `caipora`.
- Improved support to ES3 and ES5.
- Improved documentation.
### Changed
- Renamed interface `CaiporaInterface` to `CaiporaLogger`.

## v1.1.2
### Fixed
- Fix exported constructors of `caipora`.
- Fix `caipora`'s constructor is shown as `Console`.

## v1.1.1
### Added
- Improved support to Node.js v6.
### Fixed
- Fix wrong signature in constructor of `caipora.Caipora`.
- Fix indefinite pronoun in documentation.
- Fix `caipora.debug()` throws error in Node.js v6.

## v1.1.0
### Added
- Add support to multiple loggers.
### Changed
- Refactor to inherit from `console.Console` to allow multiple loggers.
- Create global logger same way `console` is created.

## v1.0.1
### Fixed
- Fix `package.json` to point to correct main script.

## v1.0.0
### Added
- Introduce initial version based on extending `console` object.
- Add `setLevel(level)` and `getLevel()` to logger.
- Add lazy evaluation to all log methods.