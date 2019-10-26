# Caipora

A full replacement of Node.js `console` with support to log levels.

## Installation

```
npm install caipora
```

## API

If you are familiar with `console` and its methods, this library introduces two methods to take logging to *the next level*.

### setLevel()

By calling `caipora.setLevel(level)` or setting `LOG_LEVEL` environment variable, you are able to increase or decrease the amount of logs your application produces.

### getLevel()

If you want to check the current log level, you can get it with `caipora.getLevel()`.

### Supported log levels

These log levels are supported: `trace`, `debug`, `info`, `warn`, `error`, and `silent`. They are defined from the smallest to the highest priority.

For example, setting to `warn` will disable `trace`, `debug`, and `info`.

By default, `caipora` will set the log level to `info`.

Log levels are case insensitive, thus `DEBUG` and `debug` mean the same log level.

### Behavior of caipora.log()

`caipora.log()` is not affected by any log level. If you want to log a message regardless of the current log level, you should use it. It will print **even** if the current log level is `silent`.

## How to use

There are three ways to use this library:
- Replace `console` with `caipora` completely;
- Import `caipora` wherever you need to add log levels;
- Creating a customized logger with `caipora.Caipora`;

### Replacing global console

This is the recommended way if you want to add log levels to your whole application with a single line of code. Place this line as the first or one of the first lines of your application:

```js
require("caipora/register");
```
or
```es6
import "caipora/register";
```

From now on, you can invoke any of the `console` or `caipora` methods directly from global `console`.

Example:
```es6
import "caipora/register";

console.debug("Hello World!"); // It does nothing
console.setLevel("debug"); // It changed log level from "info" to "debug"
console.debug("Hello World!"); // It outputs "Hello World!\n" on STDOUT
```

It also provides a way to revert the replacement. You should import `caipora/unregister` instead.

### Importing caipora selectively

If you want to add log levels only to parts of your application, you should import `caipora` only to the modules you need. You can achieve this by adding this line of code:

```js
var console = require("caipora");
```
or
```es6
import * as console from "caipora";
```

Please note that setting the level in a module will affect the others. Its behavior will be similar to the global `console` although it is scoped to the modules that it has been imported.

Example:
```es6
// From file1.js where caipora is imported
import * as console from "caipora";

console.setLevel("error"); // It changed log level from "info" to "error"
console.info("Hello World!"); // It does nothing

// From file2.js where caipora is not imported
console.info("Hello World!"); // It outputs "Hello World!\n" on STDOUT
```

### Creating a customized logger

If you want to create isolated loggers or output to different streams (such as files), you should create a new instance of `caipora` with `caipora.Caipora`.

For example:
```es6
import { Caipora } from "caipora";

let errorLogger = new Caipora(process.stderr);
errorLogger.info("This message will go to the error log.");
```

If you wonder what constructors are available, you should look at the official API of [Console](https://nodejs.org/docs/latest-v10.x/api/console.html#console_class_console).

For compatibility reasons, `caipora` also exports a `Console` class, but it is just an alias of `Caipora`.

## Additional features

#### Lazy evaluation

Caipora does introduce lazy evaluation to log messages. It is recommended for any message that contains CPU-intensive computed parameters.

In order to use this, pass a function that returns either a value or an array of values. It does support formatted messages when an array is returned.

For example:
```es6
import * as console from "caipora";

let complexObject = {
    id: "ab23af96",
    timestamp: 123456123
};
console.error(() => JSON.stringify(complexObject));
// It outputs '{"id":"ab23af96","timestamp":123456123}' on STDERR

console.error(() => ["Failed for %s", JSON.stringify(complexObject)]);
// It outputs 'Failed for {"id":"ab23af96","timestamp":123456123}.' on STDERR
```

#### Cleaner Mocha results

If you require `caipora` and set your log level to `silent` while running tests with [Mocha](https://mochajs.org/), you can supress all `console` messages from the output, making it cleaner.

For example:
```sh
LOG_LEVEL=silent mocha --require caipora/register 'test/**/*.test.ts'
```

## Known limitations

#### Imported console

For instance, there is one scenario where `console` cannot be replaced by `caipora`: `console` was explicitly imported like:

```js
var console = require("console");
```
or
```es6
import * as console from "console";
```

The only way to fix this is removing the import statement or replacing it with `caipora` instead.

#### Interface CaiporaLogger is not exported

Unfortunately, the library was developed to support contemporary and obsolete systems, which caused `export = module` to be used. You can work this limitation by doing this:

```typescript
import { Caipora } from "caipora";

let logger: typeof Caipora.prototype;
```

## License
[MIT](LICENSE)