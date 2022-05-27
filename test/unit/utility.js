const test = require('tap').test;
const utility = require('../../lib/utility');

test('spec', t => {
    t.type(utility, 'function');
    t.type(utility.frequency, 'function');
    t.end();
});

test('frequency', t => {
    const input = ['foo', 'foo', 'foo', 'bar', 'bar', 'baz'];
    const result = utility.frequency(input);
    t.same(result, {
        foo: 3,
        bar: 2,
        baz: 1
    });
    t.end();
});
