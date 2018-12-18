const test = require('tap').test;
const analysis = require('../../lib/index');

test('spec', t => {
    t.type(analysis, 'function');
    t.end();
});
