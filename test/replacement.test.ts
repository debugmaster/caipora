import * as assert from "assert";
import * as caipora from "..";
import * as utils from "./utils";

describe("Console replacement", () => {

    describe("assert()", () => {

        it("should be same function", () => {
            assert.strictEqual(caipora.assert, console.assert);
        });

        it("should have same output", () => {
            compare((logger) => logger.assert(true));
            compare((logger) => logger.assert(false));
            compare((logger) => logger.assert(false, 'hey'));
        });
    });

    it("same clear() function", () => {
        assert.strictEqual(caipora.clear, console.clear);
    });

    describe("count() and countReset()", () => {

        it("should be same function", () => {
            assert.strictEqual(caipora.count, console.count);
            assert.strictEqual(caipora.countReset, console.countReset);
        });

        it("should have same output", () => {
            compare((logger) => {
                logger.count();
                logger.countReset();
                logger.count('test');
                logger.count('test');
                logger.countReset('test');
                logger.count();
                logger.countReset();
            });
        });
    });

    describe('dir() and dirxml()', () => {

        it("should be same function", () => {
            assert.strictEqual(caipora.dir, console.dir);
            assert.strictEqual(caipora.dirxml, console.dirxml);
        });

        it("should have same output", () => {
            compare((logger) => logger.dir(process.versions));
            compare((logger) => logger.dirxml(process.versions));
        });
    });

    describe('group(), groupCollapsed(), and groupEnd()', () => {

        beforeEach(function () {
            if (this.currentTest && utils.isOlderThanNode('8.5.0')) {
                this.skip();
            }
        });

        it("should be same function", () => {
            assert.strictEqual(caipora.group, console.group);
            assert.strictEqual(caipora.groupCollapsed, console.groupCollapsed);
            assert.strictEqual(caipora.groupEnd, console.groupEnd);
        });

        it("should have same output", () => {
            compare((logger) => {
                logger.log(1);
                logger.group(2);
                logger.log(3);
                logger.groupCollapsed();
                logger.log(4);
                logger.groupEnd()
                logger.groupEnd()
                logger.log(5)
            });
        });
    });

    it("same markTimeline() function", () => {
        assert.strictEqual(caipora.markTimeline, console.markTimeline);
    });

    it("same profile() function", () => {
        assert.strictEqual(caipora.profile, console.profile);
    });

    it("same profileEnd() function", () => {
        assert.strictEqual(caipora.profileEnd, console.profileEnd);
    });

    describe('table()', () => {

        beforeEach(function () {
            if (this.currentTest && utils.isOlderThanNode('10.0.0')) {
                this.skip();
            }
        });

        it("should be same function", () => {
            assert.strictEqual(caipora.table, console.table);
        });

        it("should have same output", () => {
            compare((logger) => {
                logger.table(["apples", "oranges", "bananas"]);
                logger.table([["John", "Smith"], ["Jane", "Doe"], ["Emily", "Jones"]]);
            });
        });
    });

    describe('time(), timeLog(), and timeEnd()', () => {
        let hrtime: NodeJS.HRTime

        before(() => {
            hrtime = process.hrtime;
            let generator = function* generate() {
                let i = 10;
                let j = 1000;
                while (true) {
                    i++;
                    yield [i % 5 * 100, i % 5 * 100]
                }
            }();
            process.hrtime = (() => generator.next().value as [number, number]) as NodeJS.HRTime
        });

        after(() => {
            process.hrtime = hrtime
        });

        it("should be same function", () => {
            assert.strictEqual(caipora.time, console.time);
            assert.strictEqual(caipora.timeLog, console.timeLog);
            assert.strictEqual(caipora.timeEnd, console.timeEnd);
        });

        it("should have the same output", () => {
            compare((logger) => {
                logger.time();
                logger.time("test");
                if (!utils.isOlderThanNode('10.7.0')) {
                    logger.timeLog("test");
                } else {
                    process.hrtime();
                }
                logger.timeEnd();
                logger.timeEnd("test");
            })
        })
    });

    it("same timeStamp() function", () => {
        assert.strictEqual(caipora.timeStamp, console.timeStamp);
    });

    it("same timeline() function", () => {
        assert.strictEqual(caipora.timeline, console.timeline);
    });

    it("same timelineEnd() function", () => {
        assert.strictEqual(caipora.timelineEnd, console.timelineEnd);
    });
});

type Logger = typeof import('..') | typeof import('console')

function compare(testCallback: (logger: Logger) => void) {
    let lastStdOut: string[];
    let lastStdErr: string[];

    const revertStdOut = utils.captureStdOut(
        () => true,
        (args) => lastStdOut.push(Array.from(args).slice(0, 1).pop()),
        true
    );
    const revertStdErr = utils.captureStdErr(
        () => true,
        (args) => lastStdErr.push(Array.from(args).slice(0, 1).pop()),
        true
    );

    const results = [
        caipora,
        console,
        new caipora.Caipora(process.stdout, process.stderr),
        new console.Console(process.stdout, process.stderr)
    ].map((logger) => {
        lastStdOut = []
        lastStdErr = []

        let error
        try {
            testCallback.call(null, logger)
        } catch (e) {
            error = e
        }

        return [lastStdOut, lastStdErr, error]
    })

    revertStdOut();
    revertStdErr();

    assert.deepStrictEqual(results[0][0], results[1][0], 'stdout is not equal');
    assert.deepStrictEqual(results[0][1], results[1][1], 'stderr is not equal');
    assert.deepStrictEqual(results[0][2], results[1][2], 'thrown exception is not equal')


    assert.deepStrictEqual(results[2][0], results[3][0], 'stdout is not equal');
    assert.deepStrictEqual(results[2][1], results[3][1], 'stderr is not equal');
    assert.deepStrictEqual(results[2][2], results[3][2], 'thrown exception is not equal')
};
