"use strict";

var _console = require("console");

function init(instance) {
    Object.defineProperty(instance, "_logLevels", {
        value: {
            trace: false,
            debug: false,
            info: false,
            warn: false,
            error: false
        }
    });

    instance.setLevel(process.env.LOG_LEVEL || "info");
}

function Caipora() {
    _console.Console.apply(this, arguments);

    init(this);
}

Caipora.prototype = Object.create(_console.Console.prototype);
Caipora.prototype.constructor = Caipora;

Caipora.prototype.setLevel = function (level) {
    this._logLevels.trace = level === "trace";
    this._logLevels.debug = this._logLevels.trace || level === "debug";
    this._logLevels.info = this._logLevels.debug || level === "info";
    this._logLevels.warn = this._logLevels.info || level === "warn";
    this._logLevels.error = this._logLevels.warn || level === "error";
};

Caipora.prototype.getLevel = function () {
    return this._logLevels.trace && "trace" ||
        this._logLevels.debug && "debug" ||
        this._logLevels.info && "info" ||
        this._logLevels.warn && "warn" ||
        this._logLevels.error && "error" ||
        "silent"
};

Object.defineProperty(Caipora.prototype, '_log', {
    value: function (level, args) {
        if (args.length === 1 && typeof (args[0]) === "function") {
            const computedArgs = args[0].call(undefined);
            if (Array.isArray(computedArgs)) {
                _console.Console.prototype[level].apply(this, computedArgs);
            } else {
                _console.Console.prototype[level].apply(this, [computedArgs])
            }
        }
        else {
            _console.Console.prototype[level].apply(this, args);
        }
    }
});

Object.defineProperty(Caipora.prototype, '_logIfEnabled', {
    value: function (level, args) {
        if (this._logLevels[level]) this._log(level, args);
    }
});

["trace", "debug", "info", "warn", "error"].forEach(function (level) {
    // Do not inherit methods that do not exist in the chain
    if (_console.Console.prototype[level]) {
        Caipora.prototype[level] = function () {
            this._logIfEnabled(level, arguments);
        };
    }
});

Caipora.prototype.log = function () {
    this._log("info", arguments);
}

var caipora = Object.create(_console);

Reflect.ownKeys(_console).forEach(function (prop) {
    const desc = Reflect.getOwnPropertyDescriptor(_console, prop);
    Reflect.defineProperty(caipora, prop, desc);
});

Reflect.ownKeys(Caipora.prototype).forEach(function (prop) {
    if (prop === "constructor") { return; }
    const desc = Reflect.getOwnPropertyDescriptor(Caipora.prototype, prop);
    desc.value = desc.value.bind(caipora);
    Reflect.defineProperty(caipora, prop, desc);
});

caipora.Console = caipora.Caipora = Caipora;

init(caipora);

module.exports = caipora;
