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
- Setting `LOG_LEVEL` environment variable;

You can get the current log level by calling `console.getLevel()`.

Example:
```es6
import * as console from "caipora";

console.debug("Hello World!"); // It does anything
console.setLevel("debug"); // It changed log level from "info" to "debug"
console.debug("Hello World!"); // It outputs "Hello World!\n" on STDOUT
```

Please note that setting the log level will affect all messages logged with caipora regardless of which part of your application set it.

### console.log()

If you want a message to be logged regardless of the current log level, you should use `console.log()`. It will print **even** if the log level is `silent`.

## Additional features

Caipora does introduce lazily-evaluated log messages. It is recommended for any message that contains CPU-intensive computed parameters.

In order to use this, pass a function that returns either a value or an array of values. It does support formatted messages when an array is used.

For example:
```es6
import * as console from "caipora";

let complexObject = {
    id: "ab23af96",
    timestamp: 123456123
};
console.error(() => JSON.stringify(complexObject));
// It outputs '{"id":"ab23af96","timestamp":123456123}' on STDOUT

console.error(() => ["Failed for %s", JSON.stringify(complexObject)]);
// It outputs 'Failed for {"id":"ab23af96","timestamp":123456123}.' on STDOUT
```

## License
[MIT](LICENSE)