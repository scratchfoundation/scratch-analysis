const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const analysis = require('../../lib/index');

const defaultObject = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/default.json')
);
const defaultBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/default.sb2')
);
const complexBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/complex.sb2')
);

test('defalt (object)', t => {
    analysis(defaultObject, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.scripts, 'object');
        t.equal(result.scripts.count, 0);

        t.type(result.variables, 'object');
        t.equal(result.variables.count, 0);
        t.deepEqual(result.variables.id, []);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 0);
        t.deepEqual(result.lists.id, []);

        t.type(result.comments, 'object');
        t.equal(result.comments.count, 0);

        t.type(result.sounds, 'object');
        t.equal(result.sounds.count, 2);
        t.deepEqual(result.sounds.id, [
            'pop',
            'meow'
        ]);
        t.deepEqual(result.sounds.hash, [
            '83a9787d4cb6f3b7632b4ddfebf74367.wav',
            '83c36d806dc92327b9e7049a565c6bff.wav'
        ]);

        t.type(result.costumes, 'object');
        t.equal(result.costumes.count, 3);
        t.deepEqual(result.costumes.id, [
            'backdrop1',
            'costume1',
            'costume2'
        ]);
        t.deepEqual(result.costumes.hash, [
            '739b5e2a2435f6e1ec2993791b423146.png',
            '09dc888b0b7df19f70d81588ae73420e.svg',
            '3696356a03a8d938318876a593572843.svg'
        ]);

        t.type(result.sprites, 'object');
        t.equal(result.sprites.count, 1);

        t.type(result.blocks, 'object');
        t.equal(result.blocks.count, 0);
        t.equal(result.blocks.unique, 0);
        t.deepEqual(result.blocks.id, []);
        t.deepEqual(result.blocks.frequency, {});

        t.type(result.extensions, 'object');
        t.equal(result.extensions.count, 0);
        t.deepEqual(result.extensions.id, []);

        t.end();
    });
});

test('defalt (binary)', t => {
    analysis(defaultBinary, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.scripts, 'object');
        t.equal(result.scripts.count, 0);

        t.type(result.variables, 'object');
        t.equal(result.variables.count, 0);
        t.deepEqual(result.variables.id, []);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 0);
        t.deepEqual(result.lists.id, []);

        t.type(result.comments, 'object');
        t.equal(result.comments.count, 0);

        t.type(result.sounds, 'object');
        t.equal(result.sounds.count, 2);
        t.deepEqual(result.sounds.id, [
            'pop',
            'meow'
        ]);
        t.deepEqual(result.sounds.hash, [
            '83a9787d4cb6f3b7632b4ddfebf74367.wav',
            '83c36d806dc92327b9e7049a565c6bff.wav'
        ]);

        t.type(result.costumes, 'object');
        t.equal(result.costumes.count, 3);
        t.deepEqual(result.costumes.id, [
            'backdrop1',
            'costume1',
            'costume2'
        ]);
        t.deepEqual(result.costumes.hash, [
            '739b5e2a2435f6e1ec2993791b423146.png',
            'f9a1c175dbe2e5dee472858dd30d16bb.svg',
            '6e8bd9ae68fdb02b7e1e3df656a75635.svg'
        ]);

        t.type(result.sprites, 'object');
        t.equal(result.sprites.count, 1);

        t.type(result.blocks, 'object');
        t.equal(result.blocks.count, 0);
        t.equal(result.blocks.unique, 0);
        t.deepEqual(result.blocks.id, []);
        t.deepEqual(result.blocks.frequency, {});

        t.type(result.extensions, 'object');
        t.equal(result.extensions.count, 0);
        t.deepEqual(result.extensions.id, []);

        t.end();
    });
});

test('complex (binary)', t => {
    analysis(complexBinary, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.scripts, 'object');
        t.equal(result.scripts.count, 6);

        t.type(result.variables, 'object');
        t.equal(result.variables.count, 2);
        t.deepEqual(result.variables.id, [
            'global',
            'local'
        ]);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 2);
        t.deepEqual(result.lists.id, [
            'globallist',
            'locallist'
        ]);

        t.type(result.comments, 'object');
        t.equal(result.comments.count, 0);

        t.type(result.sounds, 'object');
        t.equal(result.sounds.count, 2);
        t.deepEqual(result.sounds.id, [
            'pop',
            'meow'
        ]);
        t.deepEqual(result.sounds.hash, [
            '83a9787d4cb6f3b7632b4ddfebf74367.wav',
            '83c36d806dc92327b9e7049a565c6bff.wav'
        ]);

        t.type(result.costumes, 'object');
        t.equal(result.costumes.count, 3);
        t.deepEqual(result.costumes.id, [
            'backdrop1',
            'costume1',
            'costume2'
        ]);
        t.deepEqual(result.costumes.hash, [
            '5b465b3b07d39019109d8dc6d6ee6593.svg',
            'f9a1c175dbe2e5dee472858dd30d16bb.svg',
            '6e8bd9ae68fdb02b7e1e3df656a75635.svg'
        ]);

        t.type(result.sprites, 'object');
        t.equal(result.sprites.count, 1);

        t.type(result.blocks, 'object');
        t.equal(result.blocks.count, 34);
        t.equal(result.blocks.unique, 18);
        t.deepEqual(result.blocks.id, [
            'whenGreenFlag',
            'doForever',
            'changeGraphicEffect:by:',
            'whenGreenFlag',
            'deleteLine:ofList:',
            'deleteLine:ofList:',
            'doForever',
            'forward:',
            'turnRight:',
            'randomFrom:to:',
            'bounceOffEdge',
            'whenGreenFlag',
            'doForever',
            'setGraphicEffect:to:',
            'xpos',
            'whenGreenFlag',
            'doForever',
            'call',
            'randomFrom:to:',
            'heading',
            'randomFrom:to:',
            'heading',
            'procDef',
            'setVar:to:',
            'getParam',
            'setVar:to:',
            'getParam',
            'append:toList:',
            'getParam',
            'append:toList:',
            'getParam',
            'LEGO WeDo 2.0\u001FwhenTilted',
            'LEGO WeDo 2.0\u001FsetLED',
            'randomFrom:to:'
        ]);
        t.deepEqual(result.blocks.frequency, {
            'LEGO WeDo 2.0\u001FsetLED': 1,
            'LEGO WeDo 2.0\u001FwhenTilted': 1,
            'bounceOffEdge': 1,
            'call': 1,
            'changeGraphicEffect:by:': 1,
            'doForever': 4,
            'deleteLine:ofList:': 2,
            'forward:': 1,
            'getParam': 4,
            'heading': 2,
            'procDef': 1,
            'append:toList:': 2,
            'randomFrom:to:': 4,
            'setGraphicEffect:to:': 1,
            'setVar:to:': 2,
            'turnRight:': 1,
            'whenGreenFlag': 4,
            'xpos': 1
        });

        t.type(result.extensions, 'object');
        t.equal(result.extensions.count, 1);
        t.deepEqual(result.extensions.id, [
            'LEGO WeDo 2.0'
        ]);

        t.end();
    });
});
