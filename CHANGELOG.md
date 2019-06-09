# Change Log

## v1.1.1
### Added
- Improved support to Node.js v6.
### Fixed
- Fix wrong type in constructor of `caipora.Caipora`.
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