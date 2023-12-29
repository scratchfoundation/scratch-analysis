const fs = require('fs');
const path = require('path');
const test = require('tap').test;
const analysis = require('../../lib/index');

// Test project with missing 'md5ext' field
const defaultObject = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/699953650.json')
);

test('Project with missing "md5ext" property can be analyzed correctly', t => {
    analysis(defaultObject, (err, result) => {
        t.not(err);
        t.ok(result);

        // Test that all the costume and sound hashes are not falsey
        t.equal(result.costumes.count, result.costumes.hash.length);
        t.equal(result.sounds.count, result.sounds.hash.length);

        for (let i = 0; i < result.costumes.count; i++) {
            const costumeHash = result.costumes.hash[i];
            t.type(costumeHash, 'string');
            t.ok(costumeHash);
        }

        for (let i = 0; i < result.sounds.count; i++) {
            const soundHash = result.sounds.hash[i];
            t.type(soundHash, 'string');
            t.ok(soundHash);
        }

        t.end();
    });
});
