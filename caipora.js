"use strict";

var _console = require("console");

const logLevels = {
    trace: false,
    debug: false,
    info: false,
    warn: false,
    error: false
};

function _log(level, args) {
    if (args[0] && args.length === 1 && typeof (args[0]) === "function") {
        const computedArgs = args[0].call(undefined);
        if (Array.isArray(computedArgs)) {
            _console[level].apply(undefined, computedArgs);
        } else {
            _console[level].apply(undefined, [computedArgs])
        }
    }
    else {
        _console[level].apply(undefined, args);
    }
}

function _logIfEnabled(level, args) {
    if (logLevels[level])
        _log(level, args);
}

const caipora = Object.assign({}, _console, {
    setLevel: function (level) {
        logLevels.trace = level === "trace";
        logLevels.debug = logLevels.trace || level === "debug";
        logLevels.info = logLevels.debug || level === "info";
        logLevels.warn = logLevels.info || level === "warn";
        logLevels.error = logLevels.warn || level === "error";
    }, getLevel: function () {
        return logLevels.trace && "trace" ||
            logLevels.debug && "debug" ||
            logLevels.info && "info" ||
            logLevels.warn && "warn" ||
            logLevels.error && "error" ||
            "silent"
    }, debug: function () {
        _logIfEnabled("debug", arguments);
    }, error: function () {
        _logIfEnabled("error", arguments);
    }, info: function () {
        _logIfEnabled("info", arguments);
    }, trace: function () {
        _logIfEnabled("trace", arguments);
    }, warn: function () {
        _logIfEnabled("warn", arguments);
    }, log: function () {
        _log("info", arguments);
    }
});

delete caipora.Console;

// Set default level
caipora.setLevel(process.env.LOG_LEVEL || "info");

module.exports = caipora;
