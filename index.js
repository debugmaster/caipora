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
    var that = _console.Console.apply(this, arguments);
    /* istanbul ignore next */
    if (that) {
        var keys = Object.getOwnPropertyNames(that)
        keys = Object.getOwnPropertySymbols(that).concat(keys)
        for (var i = 0; i < keys.length; i ++) {
            if (!this[keys[i]]) {
                this[keys[i]] = that[keys[i]]
            }
        }
    }
    init(this);
}

Caipora.prototype = Object.create(_console.Console.prototype);
Object.defineProperty(Caipora.prototype, "constructor", {
    value: Caipora
});

Caipora.prototype.setLevel = function (level) {
    level = (level || "").toLowerCase();
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

Object.defineProperty(Caipora.prototype, "_log", {
    value: function (level, args) {
        if (args.length === 1 && typeof (args[0]) === "function") {
            var computedArgs = args[0].call(undefined);
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

Object.defineProperty(Caipora.prototype, "_logIfEnabled", {
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

Reflect.ownKeys(Caipora.prototype).forEach(function (prop) {
    if (prop === "constructor") { return; }
    var desc = Reflect.getOwnPropertyDescriptor(Caipora.prototype, prop);
    desc.value = desc.value.bind(caipora);
    Reflect.defineProperty(caipora, prop, desc);
});

caipora.Console = caipora.Caipora = Caipora;

Object.defineProperty(caipora, "constructor", {
    value: Caipora
});

init(caipora);

module.exports = caipora;
