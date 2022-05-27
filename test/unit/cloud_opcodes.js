const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const analysis = require('../../lib/index');

const sb2 = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/cloud_opcodes.sb2')
);
const sb3 = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb3/cloud_opcodes.sb3')
);

test('sb2', t => {
    analysis(sb2, (err, result) => {
        t.ok(typeof err === 'undefined' || err === null);
        t.type(result, 'object');
        t.type(result.blocks, 'object');
        t.type(result.blocks.id, 'object');
        t.same(result.blocks.id, [
            'whenGreenFlag',
            'doForever',
            'setVar:to:',
            'randomFrom:to:',
            'changeVar:by:',
            'setVar:to:',
            'randomFrom:to:',
            'changeVar:by:',
            'setVar:to:cloud:',
            'randomFrom:to:',
            'changeVar:by:cloud:',
            'wait:elapsed:from:'
        ]);
        t.end();
    });
});

test('sb3', t => {
    analysis(sb3, (err, result) => {
        t.ok(typeof err === 'undefined' || err === null);
        t.type(result, 'object');
        t.type(result.blocks, 'object');
        t.type(result.blocks.id, 'object');
        t.same(result.blocks.id, [
            'event_whenflagclicked',
            'control_forever',
            'control_wait',
            'data_setvariableto',
            'data_setvariableto',
            'data_setvariableto_cloud',
            'operator_random',
            'operator_random',
            'operator_random',
            'data_changevariableby',
            'data_changevariableby',
            'data_changevariableby_cloud'
        ]);
        t.end();
    });
});
