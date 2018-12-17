const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const analysis = require('../../lib/index');

const invalidBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/invalid/garbage.jpg')
);

test('invalid object', t => {
    analysis('{}', (err, result) => {
        t.type(err, 'object');
        t.type(result, 'undefined');
        t.end();
    });
});

test('invalid binary', t => {
    analysis(invalidBinary, (err, result) => {
        t.type(err, 'string');
        t.type(result, 'undefined');
        t.end();
    });
});
