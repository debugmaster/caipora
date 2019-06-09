# Caipora

A full replacement of Node.js `console` with support to log levels. It does support all other methods such as `console.count()` or `console.time()`, but it does not affect them.

Log levels supported: `trace`, `debug`, `info`, `warn`, `error`, and `silent`.

## Installation

```
npm install caipora
```

## Example usage

In order to use this library, you just need to add one line to your current code:
```js
var console = require("caipora");
```
or
```es6
import * as console from "caipora";
```

By default, caipora will set the log level to `info`. You have two ways to change the current log level:
- Calling `console.setLevel(level)`;
- Setting `LOG_LEVEL` environment variable to your application;

You can get the current log level by calling `console.getLevel()`.

Example:
```es6
import * as console from "caipora";

console.debug("Hello World!"); // It does nothing
console.setLevel("debug"); // It changed log level from "info" to "debug"
console.debug("Hello World!"); // It outputs "Hello World!\n" on STDOUT
```

### Customizing outputs

If you want to output to different streams (such as files), you should create a new instance of caipora with `Caipora`. If you wonder how the constructors that are available, you should look at [Console](https://nodejs.org/docs/latest-v10.x/api/console.html#console_class_console).

For example:
```es6
import * as console from "caipora";

let errorLogger = new console.Caipora(process.stderr);
errorLogger.log("This message will go to the error log.");
```

For compatibility reasons, caipora also export a `Console` class, but it is just an alias to `Caipora`.

### console.log()

If you want a message to be logged regardless of the current log level, you should use `console.log()`. It will print **even** if the current log level is `silent`.

## Additional features

Caipora does introduce lazy evaluation to log messages. It is recommended for any message that contains CPU-intensive computed parameters.

In order to use this, pass a function that returns either a value or an array of values. It does support formatted messages when an array is used.

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

## License
[MIT](LICENSE)