# Change Log

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