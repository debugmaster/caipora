import * as assert from "assert";

describe("Register and Unregister", () => {

    it("should change global console to caipora", () => {

        assert.equal(console, require("console"));
        require("../register");
        assert.equal(console, require(".."));

    });

    it("should change global caipora back to console", () => {
        // This is a side-effect of the previous test.
        assert.equal(console, require(".."));
        require("../unregister");
        assert.equal(console, require("console"));

    });
});