var assert = require('assert');
var FuelInfoAppnder = require('../logic/FuelInfoAppender');

describe('TestFuelInfoAppnder', function() {
    describe('appendLine', function() {
        it('should use fs.appendFile', function() {
            // ARRANGE
            var config = { fuelDataPath: "foo.txt" };

            var appendLineCounter = 0;
            var fs = {};
            fs.appendFile = function(fileName, data, callback) {
                appendLineCounter++;
            }

            var fuelInfoAppender = new FuelInfoAppnder(fs, config);

            // ACT
            fuelInfoAppender.appendFuelInfo("foo", function() {});

            // ASSERT
            assert.strictEqual(appendLineCounter, 1);
        })
    });
});