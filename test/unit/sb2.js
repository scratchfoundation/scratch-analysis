const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const analysis = require('../../lib/index');
// using the sb2 directly to bypass scratch-parser and excersise
// logic targeting broken project files
const sb2 = require('../../lib/sb2');

const defaultObject = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/default.json')
);
const defaultBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/default.sb2')
);
const complexBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/complex.sb2')
);

const invalidCostumes = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb2/invalid-costumes.json')
);

test('default (object)', t => {
    analysis(defaultObject, (err, result) => {
        t.ok(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.scripts, 'object');
        t.equal(result.scripts.count, 0);

        t.type(result.variables, 'object');
        t.equal(result.variables.count, 0);
        t.same(result.variables.id, []);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 0);
        t.same(result.lists.id, []);

        t.type(result.comments, 'object');
        t.equal(result.comments.count, 0);

        t.type(result.sounds, 'object');
        t.equal(result.sounds.count, 2);
        t.same(result.sounds.id, [
            'pop',
            'meow'
        ]);
        t.same(result.sounds.hash, [
            '83a9787d4cb6f3b7632b4ddfebf74367.wav',
            '83c36d806dc92327b9e7049a565c6bff.wav'
        ]);

        t.type(result.costumes, 'object');
        t.equal(result.costumes.count, 3);
        t.same(result.costumes.id, [
            'backdrop1',
            'costume1',
            'costume2'
        ]);
        t.same(result.costumes.hash, [
            '739b5e2a2435f6e1ec2993791b423146.png',
            '09dc888b0b7df19f70d81588ae73420e.svg',
            '3696356a03a8d938318876a593572843.svg'
        ]);

        t.type(result.backdrops, 'object');
        t.equal(result.backdrops.count, 1);
        t.same(result.backdrops.id, [
            'backdrop1'
        ]);
        t.same(result.backdrops.hash, [
            '739b5e2a2435f6e1ec2993791b423146.png'
        ]);

        t.type(result.sprites, 'object');
        t.equal(result.sprites.count, 1);

        t.type(result.blocks, 'object');
        t.equal(result.blocks.count, 0);
        t.equal(result.blocks.unique, 0);
        t.same(result.blocks.id, []);
        t.same(result.blocks.frequency, {});

        t.type(result.extensions, 'object');
        t.equal(result.extensions.count, 0);
        t.same(result.extensions.id, []);

        t.type(result.meta, 'object');
        t.same(result.meta, {});

        t.type(result.projectVersion, 'number');
        t.equal(result.projectVersion, 2);

        t.type(result.isZip, 'boolean');
        t.equal(result.isZip, false);

        t.end();
    });
});

test('default (binary)', t => {
    analysis(defaultBinary, (err, result) => {
        t.ok(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.scripts, 'object');
        t.equal(result.scripts.count, 0);

        t.type(result.variables, 'object');
        t.equal(result.variables.count, 0);
        t.same(result.variables.id, []);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 0);
        t.same(result.lists.id, []);

        t.type(result.comments, 'object');
        t.equal(result.comments.count, 0);

        t.type(result.sounds, 'object');
        t.equal(result.sounds.count, 2);
        t.same(result.sounds.id, [
            'pop',
            'meow'
        ]);
        t.same(result.sounds.hash, [
            '83a9787d4cb6f3b7632b4ddfebf74367.wav',
            '83c36d806dc92327b9e7049a565c6bff.wav'
        ]);

        t.type(result.costumes, 'object');
        t.equal(result.costumes.count, 3);
        t.same(result.costumes.id, [
            'backdrop1',
            'costume1',
            'costume2'
        ]);
        t.same(result.costumes.hash, [
            '739b5e2a2435f6e1ec2993791b423146.png',
            'f9a1c175dbe2e5dee472858dd30d16bb.svg',
            '6e8bd9ae68fdb02b7e1e3df656a75635.svg'
        ]);

        t.type(result.backdrops, 'object');
        t.equal(result.backdrops.count, 1);
        t.same(result.backdrops.id, [
            'backdrop1'
        ]);
        t.same(result.backdrops.hash, [
            '739b5e2a2435f6e1ec2993791b423146.png'
        ]);

        t.type(result.sprites, 'object');
        t.equal(result.sprites.count, 1);

        t.type(result.blocks, 'object');
        t.equal(result.blocks.count, 0);
        t.equal(result.blocks.unique, 0);
        t.same(result.blocks.id, []);
        t.same(result.blocks.frequency, {});

        t.type(result.extensions, 'object');
        t.equal(result.extensions.count, 0);
        t.same(result.extensions.id, []);

        t.type(result.projectVersion, 'number');
        t.equal(result.projectVersion, 2);

        t.type(result.isZip, 'boolean');
        t.equal(result.isZip, true);

        t.end();
    });
});

test('complex (binary)', t => {
    analysis(complexBinary, (err, result) => {
        t.ok(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.scripts, 'object');
        t.equal(result.scripts.count, 6);

        t.type(result.variables, 'object');
        t.equal(result.variables.count, 2);
        t.same(result.variables.id, [
            'global',
            'local'
        ]);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 2);
        t.same(result.lists.id, [
            'globallist',
            'locallist'
        ]);

        t.type(result.comments, 'object');
        t.equal(result.comments.count, 0);

        t.type(result.sounds, 'object');
        t.equal(result.sounds.count, 2);
        t.same(result.sounds.id, [
            'pop',
            'meow'
        ]);
        t.same(result.sounds.hash, [
            '83a9787d4cb6f3b7632b4ddfebf74367.wav',
            '83c36d806dc92327b9e7049a565c6bff.wav'
        ]);

        t.type(result.costumes, 'object');
        t.equal(result.costumes.count, 3);
        t.same(result.costumes.id, [
            'backdrop1',
            'costume1',
            'costume2'
        ]);
        t.same(result.costumes.hash, [
            '5b465b3b07d39019109d8dc6d6ee6593.svg',
            'f9a1c175dbe2e5dee472858dd30d16bb.svg',
            '6e8bd9ae68fdb02b7e1e3df656a75635.svg'
        ]);

        t.type(result.backdrops, 'object');
        t.equal(result.backdrops.count, 1);
        t.same(result.backdrops.id, [
            'backdrop1'
        ]);
        t.same(result.backdrops.hash, [
            '5b465b3b07d39019109d8dc6d6ee6593.svg'
        ]);

        t.type(result.sprites, 'object');
        t.equal(result.sprites.count, 1);

        t.type(result.blocks, 'object');
        t.equal(result.blocks.count, 34);
        t.equal(result.blocks.unique, 18);
        t.same(result.blocks.id, [
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
        t.same(result.blocks.frequency, {
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
        t.same(result.extensions.id, [
            'LEGO WeDo 2.0'
        ]);

        t.type(result.projectVersion, 'number');
        t.equal(result.projectVersion, 2);

        t.type(result.isZip, 'boolean');
        t.equal(result.isZip, true);

        t.end();
    });
});

test('stage with invalid costumes', t => {
    const project = JSON.parse(invalidCostumes);

    sb2(project, (err, result) => {
        t.ok(typeof err === 'undefined' || err === null);
        t.type(result, 'object');
        t.type(result.backdrops, 'object');
        t.equal(result.backdrops.count, 0);
        t.same(result.backdrops.id, []);
        t.same(result.backdrops.hash, []);

        t.end();
    });
});
