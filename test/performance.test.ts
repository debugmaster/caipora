import * as assert from "assert";
import * as caipora from "..";
import * as utils from "./utils";

describe("Performance", () => {

    let revert: utils.RevertCallback;

    before(() => {
        const revertStdOut = utils.captureStdOut(
            (args) => {
                let first = args[0];
                return first &&
                    typeof first === "string" &&
                    first === "test\n";
            },
            (args) => {
                args[0] = "";
            },
            false
        );

        const defaultLevel = caipora.getLevel();
        caipora.setLevel("error");

        revert = () => {
            revertStdOut();
            caipora.setLevel(defaultLevel);
        };
    });

    after(() => revert());

    it('should be more performatic than console if log level is disabled', () => {
        let consoleDelta = Date.now();
        for (let i=0; i < 100000; i++) {
            console.info("test");
        }
        consoleDelta = Date.now() - consoleDelta;

        let caiporaDelta = Date.now();
        for (let i=0; i < 100000; i++) {
            caipora.info();
        }
        caiporaDelta = Date.now() - caiporaDelta;

        assert.ok(caiporaDelta < consoleDelta, "caipora took longer than console");
    });

    it('should be more performatic if complex parameters are lazily evaluated', () => {
        let eagerDelta = Date.now();
        for (let i=0; i < 100000; i++) {
            caipora.info(JSON.stringify({
                i,
                max: 10000
            }));
        }
        eagerDelta = Date.now() - eagerDelta;

        let lazyDelta = Date.now();
        for (let i=0; i < 100000; i++) {
            caipora.info(() => JSON.stringify({
                i,
                max: 10000
            }));
        }
        lazyDelta = Date.now() - lazyDelta;

        assert.ok(lazyDelta < eagerDelta, "lazy evaluation took longer than eager evaluation");
    });

    it('should not be more performatic if simple parameters are lazily evaluated', () => {
        let eagerDelta = Date.now();
        for (let i=0; i < 100000; i++) {
            caipora.info("test");
        }
        eagerDelta = Date.now() - eagerDelta;

        let lazyDelta = Date.now();
        for (let i=0; i < 100000; i++) {
            caipora.info(() => "test");
        }
        lazyDelta = Date.now() - lazyDelta;

        // In this case, they may occasionally have the same delta
        assert.ok(eagerDelta <= lazyDelta, "eager evaluation took longer than lazy evaluation");
    });
});