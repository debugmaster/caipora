import * as assert from "assert";
import { RevertCallback } from "./utils";

function loadCaipora() {
    delete require.cache[require.resolve("..")];
    return require("..") as typeof import("..");
}

describe("Compatiblity", () => {

    // Clean modified cache if any
    after(() => loadCaipora());

    describe("v6", () => {

        it("should not define caipora.debug()", () => {
            let revert: undefined | RevertCallback;
            // Remove Console.debug() in other node versions
            if (!process.version.startsWith('v6')) {
                let debugGlobal = console.debug;
                let debugPrototype = console.Console.prototype.debug;

                delete console.debug
                delete console.Console.prototype.debug;

                revert = () => {
                    console.debug = debugGlobal;
                    console.Console.prototype.debug = debugPrototype;
                };
            }

            const caipora = loadCaipora();

            assert.strictEqual(caipora.debug, undefined);
            assert.strictEqual(caipora.Caipora.prototype.debug, undefined);

            revert && revert();
        });
    });
});