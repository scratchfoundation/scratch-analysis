const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const analysis = require('../../lib/index');

const allBlocksBinary = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/sb1/AllBlocks-Scratch1.4.sb')
);

test('project using all block types', t => {
    analysis(allBlocksBinary, (err, result) => {
        t.ok(typeof err === 'undefined' || err === null);
        t.type(result, 'object');

        t.type(result.scripts, 'object');
        t.equal(result.scripts.count, 11);

        t.type(result.variables, 'object');
        t.equal(result.variables.count, 8);
        t.same(result.variables.id, [
            'Motion Blocks',
            'Control Blocks',
            'Sensing Blocks',
            'Operators Blocks',
            'Looks Blocks',
            'Variables Blocks',
            'Pen Blocks',
            'Sound Blocks'
        ]);

        t.type(result.lists, 'object');
        t.equal(result.lists.count, 1);
        t.same(result.lists.id, ['a list']);

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
            'background1',
            'costume1',
            'costume2'
        ]);
        t.same(result.costumes.hash, [
            'be2aa84eeac485ab8d9ca51294cd926e.png',
            '87b6d14fce8842fb56155dc7f6496308.png',
            '07a12efdb3cd7ffc94b55563268367b1.png'
        ]);

        t.type(result.backdrops, 'object');
        t.equal(result.backdrops.count, 1);
        t.same(result.backdrops.id, [
            'background1'
        ]);
        t.same(result.backdrops.hash, [
            'be2aa84eeac485ab8d9ca51294cd926e.png'
        ]);

        t.type(result.sprites, 'object');
        t.equal(result.sprites.count, 1);

        t.type(result.blocks, 'object');
        t.equal(result.blocks.count, 156);
        t.equal(result.blocks.unique, 114);
        t.same(result.blocks.id.slice(0, 3), [
            'setVar:to:',
            'changeVar:by:',
            'showVariable:'
        ]);
        t.type(result.blocks.frequency, 'object');
        t.equal(result.blocks.frequency['setVar:to:'], 40);

        t.type(result.extensions, 'object');
        t.equal(result.extensions.count, 0);
        t.same(result.extensions.id, []);

        t.type(result.meta, 'object');
        t.same(result.meta, {});

        t.type(result.projectVersion, 'number');
        t.equal(result.projectVersion, 1);

        t.type(result.isBundle, 'boolean');
        t.equal(result.isBundle, true);

        t.end();
    });
});

test('malformed project', t => {
    // A buffer with a correct SB1 signature but no content
    const malformedBinary = Buffer.from('Scr', 'ascii');

    analysis(malformedBinary, (err, result) => {
        t.ok(err);
        t.type(err, 'object');
        t.equal(err.message, 'Non-ascii character in FixedAsciiString');
        t.type(result, 'undefined');
        t.end();
    });
});
