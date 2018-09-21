const assert = require("chai").assert;
const distanceHelper = require("../helpers/distanceHelper");

describe("testing the distance helper module", () => {
    it("should give the radius as half the gps distance between two points", () => {
        let loc1 = [0, 0]
        let loc2 = [2, 2]
        let expectedRadius = 157235;
        let actualRadius = parseInt(distanceHelper.parameters(loc1, loc2).radius);
        let diff = Math.abs(expectedRadius - actualRadius)
        assert.isBelow(diff, 10)
    });

    it("should calculate the middle point between two places, simple example", () => {
        let loc1 = [0, 0];
        let loc2 = [0, 2];
        let expectedMiddle = [0, 1];
        let actualMiddle = distanceHelper.parameters(loc1, loc2).location;
        assert.equal(expectedMiddle[0], actualMiddle[0]);
        assert.equal(expectedMiddle[1], actualMiddle[1]);
    })

    it("should calculate the middle point between two places, more complex example", () => {
        let loc1 = [0, 0];
        let loc2 = [3, 8];
        let expectedMiddle = [1.5, 4];
        let actualMiddle = distanceHelper.parameters(loc1, loc2).location;
        assert.equal(expectedMiddle[0], actualMiddle[0]);
        assert.equal(expectedMiddle[1], actualMiddle[1]);
    })
})