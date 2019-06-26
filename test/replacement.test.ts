import * as assert from "assert";
import * as caipora from "..";

describe("Console replacement", () => {

    it("same assert() function", () => {
        assert.strictEqual(caipora.assert, console.assert);
    });

    it("same clean() function", () => {
        assert.strictEqual(caipora.clear, console.clear);
    });

    it("same count() function", () => {
        assert.strictEqual(caipora.count, console.count);
    });

    it("same countReset() function", () => {
        assert.strictEqual(caipora.countReset, console.countReset);
    });

    it("same dir() function", () => {
        assert.strictEqual(caipora.dir, console.dir);
    });

    it("same dirxml() function", () => {
        assert.strictEqual(caipora.dirxml, console.dirxml);
    });

    it("same group() function", () => {
        assert.strictEqual(caipora.group, console.group);
    });

    it("same groupCollapsed() function", () => {
        assert.strictEqual(caipora.groupCollapsed, console.groupCollapsed);
    });

    it("same groupEnd() function", () => {
        assert.strictEqual(caipora.groupEnd, console.groupEnd);
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

    it("same table() function", () => {
        assert.strictEqual(caipora.table, console.table);
    });

    it("same time() function", () => {
        assert.strictEqual(caipora.time, console.time);
    });

    it("same timeEnd() function", () => {
        assert.strictEqual(caipora.timeEnd, console.timeEnd);
    });

    it("same timeEnd() function", () => {
        assert.strictEqual(caipora.timeEnd, console.timeEnd);
    });

    it("same timeLog() function", () => {
        assert.strictEqual(caipora.timeLog, console.timeLog);
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