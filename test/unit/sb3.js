const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const analysis = require('../../lib/index');

const defaultObject = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb3/default.json')
);
const defaultBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb3/default.sb3')
);
const complexBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb3/complex.sb3')
);

const extensionsBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb3/extensions.sb3')
);

test('defalt (object)', t => {
    analysis(defaultObject, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.scripts, 'object');
        t.equal(result.scripts.count, 0);

        t.type(result.variables, 'object');
        t.equal(result.variables.count, 1);
        t.deepEqual(result.variables.id, [
            'my variable'
        ]);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 0);
        t.deepEqual(result.lists.id, []);

        t.type(result.comments, 'object');
        t.equal(result.comments.count, 0);

        t.type(result.sounds, 'object');
        t.equal(result.sounds.count, 2);
        t.deepEqual(result.sounds.id, [
            'pop',
            'Meow'
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
            'cd21514d0531fdffb22204e0ec5ed84a.svg',
            'b7853f557e4426412e64bb3da6531a99.svg',
            'e6ddc55a6ddd9cc9d84fe0b4c21e016f.svg'
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

        t.type(result.meta, 'object');
        t.equal(result.meta.origin, 'test.scratch.mit.edu');
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
        t.equal(result.variables.count, 1);
        t.deepEqual(result.variables.id, [
            'my variable'
        ]);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 0);
        t.deepEqual(result.lists.id, []);

        t.type(result.comments, 'object');
        t.equal(result.comments.count, 0);

        t.type(result.sounds, 'object');
        t.equal(result.sounds.count, 2);
        t.deepEqual(result.sounds.id, [
            'pop',
            'Meow'
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
            'cd21514d0531fdffb22204e0ec5ed84a.svg',
            'b7853f557e4426412e64bb3da6531a99.svg',
            'e6ddc55a6ddd9cc9d84fe0b4c21e016f.svg'
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

        t.type(result.meta, 'object');
        t.deepEqual({}, result.meta);

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
            '7633d36de03d1df75808f581bbccc742.svg',
            'e6bcb4046c157f60c9f5c3bb5f299fce.svg',
            '64208764c777be25d34d813dc0b743c7.svg'
        ]);

        t.type(result.sprites, 'object');
        t.equal(result.sprites.count, 1);

        t.type(result.blocks, 'object');
        t.equal(result.blocks.count, 34);
        t.equal(result.blocks.unique, 18);
        t.deepEqual(result.blocks.id, [
            'event_whenflagclicked',
            'control_forever',
            'looks_changeeffectby',
            'event_whenflagclicked',
            'data_deleteoflist',
            'data_deleteoflist',
            'control_forever',
            'motion_movesteps',
            'motion_turnright',
            'operator_random',
            'motion_ifonedgebounce',
            'event_whenflagclicked',
            'control_forever',
            'looks_seteffectto',
            'motion_xposition',
            'event_whenflagclicked',
            'control_forever',
            'procedures_call',
            'operator_random',
            'motion_direction',
            'operator_random',
            'motion_direction',
            'procedures_definition',
            'data_setvariableto',
            'argument_reporter_string_number',
            'data_setvariableto',
            'argument_reporter_string_number',
            'data_addtolist',
            'argument_reporter_string_number',
            'data_addtolist',
            'argument_reporter_string_number',
            'wedo2_whenTilted',
            'wedo2_setLightHue',
            'operator_random'
        ]);
        t.deepEqual(result.blocks.frequency, {
            argument_reporter_string_number: 4,
            control_forever: 4,
            data_addtolist: 2,
            data_deleteoflist: 2,
            data_setvariableto: 2,
            event_whenflagclicked: 4,
            looks_changeeffectby: 1,
            looks_seteffectto: 1,
            motion_direction: 2,
            motion_ifonedgebounce: 1,
            motion_movesteps: 1,
            motion_turnright: 1,
            motion_xposition: 1,
            operator_random: 4,
            procedures_call: 1,
            procedures_definition: 1,
            wedo2_setLightHue: 1,
            wedo2_whenTilted: 1
        });

        t.type(result.extensions, 'object');
        t.equal(result.extensions.count, 1);
        t.deepEqual(result.extensions.id, [
            'wedo2'
        ]);

        t.end();
    });
});

test('extensions', t => {
    analysis(extensionsBinary, (err, result) => {
        t.true(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.extensions, 'object');
        t.equal(result.extensions.count, 2);
        t.deepEqual(result.extensions.id, [
            'translate',
            'text2speech'
        ]);

        t.end();
    });
});
