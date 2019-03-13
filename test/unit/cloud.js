const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const analysis = require('../../lib/index');

const sb2 = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/cloud.sb2')
);
const sb3 = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb3/cloud.sb3')
);
const sb2Complex = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/cloud_complex.sb2')
);
const sb3Complex = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb3/cloud_complex.sb3')
);

test('sb2', t => {
    analysis(sb2, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');
        t.type(result.cloud, 'object');
        t.equals(result.cloud.count, 1);
        t.deepEquals(result.cloud.id, ['☁ baz']);
        t.end();
    });
});

test('sb3', t => {
    analysis(sb3, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');
        t.type(result.cloud, 'object');
        t.equals(result.cloud.count, 1);
        t.deepEquals(result.cloud.id, ['☁ baz']);
        t.end();
    });
});

test('sb2 complex', t => {
    analysis(sb2Complex, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');
        t.type(result.cloud, 'object');
        t.equals(result.cloud.count, 8);
        t.deepEquals(result.cloud.id, [
            '☁ Player_1',
            '☁ Player_2',
            '☁ Player_3',
            '☁ Player_4',
            '☁ Player_5',
            '☁ GameData',
            '☁ Player_6',
            '☁ SAVE_DATA2'
        ]);
        t.end();
    });
});

test('sb3 complex', t => {
    analysis(sb3Complex, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');
        t.type(result.cloud, 'object');
        t.equals(result.cloud.count, 8);
        t.deepEquals(result.cloud.id, [
            '☁ Player_1',
            '☁ Player_2',
            '☁ Player_3',
            '☁ Player_4',
            '☁ Player_5',
            '☁ GameData',
            '☁ Player_6',
            '☁ SAVE_DATA2'
        ]);
        t.end();
    });
});
