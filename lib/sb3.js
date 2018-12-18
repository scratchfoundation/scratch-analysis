const utility = require('./utility');

const scripts = function (targets) {
    // Storage objects
    let occurrences = 0;

    // Iterate over all blocks in each target, and look for "top level" blocks
    for (let t in targets) {
        for (let b in targets[t].blocks) {
            if (targets[t].blocks[b].topLevel) occurrences++;
        }
    }

    return {
        count: occurrences
    };
};

const variables = function (targets, attribute) {
    // Storage objects
    let occurrences = 0;
    let idList = [];

    for (let t in targets) {
        for (let a in targets[t][attribute]) {
            const variable = targets[t][attribute][a];
            occurrences++;
            idList.push(variable[0]);
        }
    }

    return {
        count: occurrences,
        id: idList
    };
};

// Iterate over targets, extract attribute, and aggregate results
const extract = function (targets, attribute, id, hash) {
    // Storage objects
    let occurrences = 0;
    let idList = [];
    let hashList = [];

    for (let t in targets) {
        for (let a in targets[t][attribute]) {
            const asset = targets[t][attribute][a];
            occurrences++;
            if (typeof id !== 'undefined') idList.push(asset[id]);
            if (typeof hash !== 'undefined') hashList.push(asset[hash]);
        }
    }

    const result = {count: occurrences};
    if (typeof id !== 'undefined') result.id = idList;
    if (typeof hash !== 'undefined') result.hash = hashList;
    return result;
};

const sprites = function (targets) {
    return {
        count: targets.length - 1
    };
};

const blocks = function (targets) {
    // Storage object
    let result = [];

    for (let t in targets) {
        for (let a in targets[t].blocks) {
            const block = targets[t].blocks[a];
            if (!block.shadow) result.push(block.opcode);
        }
    }

    // Calculate block frequency
    const freq = utility.frequency(result);

    // Return summary
    return {
        count: result.length,
        unique: Object.keys(freq).length,
        id: result,
        frequency: freq
    };
};

const extensions = function (list) {
    return {
        count: list.length,
        id: list
    };
};

module.exports = function (project, callback) {
    const meta = {
        scripts: scripts(project.targets),
        variables: variables(project.targets, 'variables'),
        lists: variables(project.targets, 'lists'),
        comments: extract(project.targets, 'comments'),
        sounds: extract(project.targets, 'sounds', 'name', 'md5ext'),
        costumes: extract(project.targets, 'costumes', 'name', 'md5ext'),
        sprites: sprites(project.targets),
        blocks: blocks(project.targets),
        extensions: extensions(project.extensions)
    };

    callback(null, meta);
};
