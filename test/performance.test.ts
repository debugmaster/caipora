import * as assert from "assert";
import * as caipora from "../caipora";

describe("Performance", () => {

    let revert: () => void;

    before(() => {
        const stdoutWrite = process.stdout.write;
        process.stdout.write = function () {
            let first = arguments[0];
            if (first) {
                // In order to avoid too many lines, nothing is printed.
                if (typeof(first) === "string" && first === "test\n") {
                    arguments[0] = "";
                }
            }
            return stdoutWrite.apply(process.stdout, arguments);
        };

        revert = () => {
            process.stdout.write = stdoutWrite;
        };
    });

    after(() => revert())

    it('should be more performatic than console if log level is disabled', () => {
        let consoleDelta = Date.now();
        for (let i=0; i < 1000; i++) {
            console.debug("test");
        }
        consoleDelta = Date.now() - consoleDelta;

        let caiporaDelta = Date.now();
        for (let i=0; i < 1000; i++) {
            caipora.debug();
        }
        caiporaDelta = Date.now() - caiporaDelta;

        assert.ok(caiporaDelta < consoleDelta, "caipora took longer than console");
    });

    it('should be more performatic if complex parameters are lazily evaluated', () => {
        let eagerDelta = Date.now();
        for (let i=0; i < 10000; i++) {
            caipora.debug(JSON.stringify({
                i,
                max: 10000
            }));
        }
        eagerDelta = Date.now() - eagerDelta;

        let lazyDelta = Date.now();
        for (let i=0; i < 10000; i++) {
            caipora.debug(() => JSON.stringify({
                i,
                max: 10000
            }));
        }
        lazyDelta = Date.now() - lazyDelta;

        assert.ok(lazyDelta < eagerDelta, "lazy evaluation took longer than eager evaluation");
    });

    it('should not be more performatic if simple parameters are lazily evaluated', () => {
        let eagerDelta = Date.now();
        for (let i=0; i < 10000; i++) {
            caipora.debug("test");
        }
        eagerDelta = Date.now() - eagerDelta;

        let lazyDelta = Date.now();
        for (let i=0; i < 10000; i++) {
            caipora.debug(() => "test");
        }
        lazyDelta = Date.now() - lazyDelta;

        assert.ok(eagerDelta < lazyDelta, "eager evaluation took longer than lazy evaluation");
    });
});