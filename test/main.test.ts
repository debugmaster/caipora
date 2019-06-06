import * as assert from "assert";
import * as caipora from "../caipora";

enum Result {
    NONE,
    JUST_CONSOLE,
    CONSOLE_AND_CAIPORA
}

describe("Caipora", () => {

    let stdout: Result;
    let stderr: Result;

    let revert: () => void;
    let printedValue: string;

    /**
     * In order to test output, some strings are intercepted.
     */
    before(() => {
        const stdoutWrite = process.stdout.write;
        process.stdout.write = function () {
            let first = arguments[0];
            if (first) {
                if (typeof(first) === "string" && first.includes("test")) {
                    stdout++;
                    // Remove UTF-8 color codes
                    printedValue = first.replace(/\u001b\[.*?m/gu,"");
                    return true;
                }
            }
            return stdoutWrite.apply(process.stdout, arguments);
        };

        const stderrWrite = process.stderr.write;
        process.stderr.write = function () {
            let first = arguments[0];
            if (first) {
                if (typeof(first) === "string" && first.includes("test")) {
                    stderr++;
                    // Remove UTF-8 color codes
                    printedValue = first.replace(/\u001b\[.*?m/gu,"");
                    return true;
                }
            }
            return stderrWrite.apply(process.stderr, arguments);
        };

        revert = () => {
            process.stdout.write = stdoutWrite;
            process.stderr.write = stderrWrite;
        };
    });

    after(() => revert())

    beforeEach(() => {
        stdout = stderr = Result.NONE;
    });

    it ("should not interfere with regular logging", () => {
        console.log("Hi from console!");
        caipora.log("Hi from caipora!");

        assert.strictEqual(stdout, Result.NONE);
        assert.strictEqual(stderr, Result.NONE);
    });

    it ("should have 'info' as default level", () => {
        assert.strictEqual(caipora.getLevel(), "info");
    });

    describe("signatures", () => {

        it ("allow multiple params", () => {
            caipora.info(1000, "test", "multiple", "params", true);

            assert.strictEqual(printedValue, "1000 'test' 'multiple' 'params' true\n");
        });

        it ("allow formatted message", () => {
            caipora.info("%d This is a %s", 2000, "test");

            assert.strictEqual(printedValue, "2000 This is a test\n");
        });

        it ("allow single value lazily", () => {
            caipora.info(() => "test");

            assert.strictEqual(printedValue, "test\n");
        });

        it ("allow multiple values lazily", () => {
            caipora.info(() => [3000, "test", null]);

            assert.strictEqual(printedValue, "3000 'test' null\n");
        });

        it ("allow formatted message lazily", () => {
            caipora.info(() => ["Another %s is needed!", "test"]);

            assert.strictEqual(printedValue, "Another test is needed!\n");
        });
    });

    describe("set/get log level", () => {

        const DEFAULT_LEVEL = caipora.getLevel();

        after(() => caipora.setLevel(DEFAULT_LEVEL));

        describe("silent level", () => {

            before(() => caipora.setLevel("silent"));

            it ("should be able to retrieve current level", () => {
                assert.strictEqual(caipora.getLevel(), "silent");
            });

            it ("should always write with log()", () => {
                console.log("test0", "camilo");
                caipora.log("test0");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with error()", () => {
                console.error("test1");
                caipora.error("test1");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.JUST_CONSOLE);
            });

            it ("should not write with warn()", () => {
                console.warn("test2");
                caipora.warn("test2");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.JUST_CONSOLE);
            });

            it ("should not write with info()", () => {
                console.info("test3");
                caipora.info("test3");

                assert.strictEqual(stdout, Result.JUST_CONSOLE);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with debug()", () => {
                console.debug("test4");
                caipora.debug("test4");

                assert.strictEqual(stdout, Result.JUST_CONSOLE);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with trace()", () => {
                console.trace("test5");
                caipora.trace("test5");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.JUST_CONSOLE);
            });
        });

        describe("error level", () => {

            before(() => caipora.setLevel("error"));

            it ("should be able to retrieve current level", () => {
                assert.strictEqual(caipora.getLevel(), "error");
            });

            it ("should always write with log()", () => {
                console.log("test0");
                caipora.log("test0");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should write with error()", () => {
                console.error("test1");
                caipora.error("test1");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should not write with warn()", () => {
                console.warn("test2");
                caipora.warn("test2");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.JUST_CONSOLE);
            });

            it ("should not write with info()", () => {
                console.info("test3");
                caipora.info("test3");

                assert.strictEqual(stdout, Result.JUST_CONSOLE);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with debug()", () => {
                console.debug("test4");
                caipora.debug("test4");

                assert.strictEqual(stdout, Result.JUST_CONSOLE);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with trace()", () => {
                console.trace("test5");
                caipora.trace("test5");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.JUST_CONSOLE);
            });
        });

        describe("warn level", () => {

            before(() => caipora.setLevel("warn"));

            it ("should be able to retrieve current level", () => {
                assert.strictEqual(caipora.getLevel(), "warn");
            });

            it ("should always write with log()", () => {
                console.log("test0");
                caipora.log("test0");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should write with error()", () => {
                console.error("test1");
                caipora.error("test1");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should write with warn()", () => {
                console.warn("test2");
                caipora.warn("test2");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should not write with info()", () => {
                console.info("test3");
                caipora.info("test3");

                assert.strictEqual(stdout, Result.JUST_CONSOLE);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with debug()", () => {
                console.debug("test4");
                caipora.debug("test4");

                assert.strictEqual(stdout, Result.JUST_CONSOLE);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with trace()", () => {
                console.trace("test5");
                caipora.trace("test5");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.JUST_CONSOLE);
            });
        });

        describe("info level", () => {

            before(() => caipora.setLevel("info"));

            it ("should be able to retrieve current level", () => {
                assert.strictEqual(caipora.getLevel(), "info");
            });

            it ("should always write with log()", () => {
                console.log("test0");
                caipora.log("test0");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should write with error()", () => {
                console.error("test1");
                caipora.error("test1");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should write with warn()", () => {
                console.warn("test2");
                caipora.warn("test2");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should write with info()", () => {
                console.info("test3");
                caipora.info("test3");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with debug()", () => {
                console.debug("test4");
                caipora.debug("test4");

                assert.strictEqual(stdout, Result.JUST_CONSOLE);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with trace()", () => {
                console.trace("test5");
                caipora.trace("test5");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.JUST_CONSOLE);
            });
        });

        describe("debug level", () => {

            before(() => caipora.setLevel("debug"));

            it ("should be able to retrieve current level", () => {
                assert.strictEqual(caipora.getLevel(), "debug");
            });

            it ("should always write with log()", () => {
                console.log("test0");
                caipora.log("test0");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should write with error()", () => {
                console.error("test1");
                caipora.error("test1");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should write with warn()", () => {
                console.warn("test2");
                caipora.warn("test2");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should write with info()", () => {
                console.info("test3");
                caipora.info("test3");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should write with debug()", () => {
                console.debug("test4");
                caipora.debug("test4");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should not write with trace()", () => {
                console.trace("test5");
                caipora.trace("test5");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.JUST_CONSOLE);
            });
        });

        describe("trace level", () => {

            before(() => caipora.setLevel("trace"));

            it ("should be able to retrieve current level", () => {
                assert.strictEqual(caipora.getLevel(), "trace");
            });

            it ("should always write with log()", () => {
                console.log("test0");
                caipora.log("test0");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should write with error()", () => {
                console.error("test1");
                caipora.error("test1");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should write with warn()", () => {
                console.warn("test2");
                caipora.warn("test2");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });

            it ("should write with info()", () => {
                console.info("test3");
                caipora.info("test3");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should write with debug()", () => {
                console.debug("test4");
                caipora.debug("test4");

                assert.strictEqual(stdout, Result.CONSOLE_AND_CAIPORA);
                assert.strictEqual(stderr, Result.NONE);
            });

            it ("should write with trace()", () => {
                console.trace("test5");
                caipora.trace("test5");

                assert.strictEqual(stdout, Result.NONE);
                assert.strictEqual(stderr, Result.CONSOLE_AND_CAIPORA);
            });
        });
    });
});
