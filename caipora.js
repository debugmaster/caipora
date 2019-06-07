"use strict";

var constructor = require("./constructor");

var caipora = Object.create(constructor._console);

Reflect.ownKeys(constructor._console).forEach(function (prop) {
    const desc = Reflect.getOwnPropertyDescriptor(constructor._console, prop);
    Reflect.defineProperty(caipora, prop, desc);
});

Reflect.ownKeys(constructor.Caipora.prototype).forEach(function (prop) {
    if (prop === "constructor") { return; }
    const desc = Reflect.getOwnPropertyDescriptor(constructor.Caipora.prototype, prop);
    desc.value = desc.value.bind(caipora);
    Reflect.defineProperty(caipora, prop, desc);
});

caipora.Console = caipora.Caipora = constructor.Caipora;

constructor.init(caipora);

module.exports = caipora;
