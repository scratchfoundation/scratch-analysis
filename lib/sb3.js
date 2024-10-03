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

const costumes = function (targets) {
    // Storage objects
    let occurrences = 0;
    let nameList = [];
    let hashList = [];

    for (let t in targets) {
        for (let a in targets[t].costumes) {
            const costume = targets[t].costumes[a];
            occurrences++;
            nameList.push(costume.name);

            let hash = costume.md5ext || `${costume.assetId}.${costume.dataFormat}`;
            hashList.push(hash);
        }
    }

    // field are named this way to keep backward compatibility
    return {
        count: occurrences,
        id: nameList,
        hash: hashList
    };
};

const variables = function (targets, attribute) {
    // Storage objects
    let occurrences = 0;
    let idList = [];

    // Cloud variables are a type of variable
    const isCloud = (attribute === 'cloud');
    if (isCloud) attribute = 'variables';

    for (let t in targets) {
        for (let a in targets[t][attribute]) {
            const variable = targets[t][attribute][a];
            if (isCloud && (variable.length !== 3 || !variable[2])) continue;
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

    /**
     * Determine if a argument is the name of a known cloud variable.
     * @param  {string} arg Argument (variable name)
     * @return {boolean}    Is cloud variable?
     */
    const isArgCloudVar = function (arg) {
        // Validate argument
        if (typeof arg !== 'string') return false;

        // Check first target (stage) to determine if arg is a cloud variable id
        const stage = targets[0];
        if (typeof stage.variables[arg] !== 'undefined') {
            return stage.variables[arg].length === 3 && stage.variables[arg][2];
        }
    };

    // Iterate over all targets and push block opcodes to storage object
    for (let t in targets) {
        for (let a in targets[t].blocks) {
            const block = targets[t].blocks[a];

            // Get opcode and check variable manipulation for the presence of
            // cloud variables
            let opcode = block.opcode;
            if (opcode === 'data_setvariableto' || opcode === 'data_changevariableby') {
                if (isArgCloudVar(block.fields.VARIABLE[1])) {
                    opcode += '_cloud';
                }
            }

            if (!block.shadow) result.push(opcode);
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
        count: (typeof list === 'object' ? list.length : 0),
        id: (typeof list === 'object' ? list : [])
    };
};

const metadata = function (meta) {
    let obj = {};
    if (meta.origin) {
        obj.origin = meta.origin;
    }
    return obj;
};

const stageTargets = function (targets) {
    return targets.filter((target) => target.isStage);
};

module.exports = function (project, callback) {
    const meta = {
        scripts: scripts(project.targets),
        variables: variables(project.targets, 'variables'),
        cloud: variables(project.targets, 'cloud'),
        lists: variables(project.targets, 'lists'),
        comments: extract(project.targets, 'comments'),
        sounds: extract(project.targets, 'sounds', 'name', 'md5ext'),
        costumes: costumes(project.targets),
        // backdrops are costumes on the stage target
        backdrops: costumes(stageTargets(project.targets)),
        sprites: sprites(project.targets),
        blocks: blocks(project.targets),
        extensions: extensions(project.extensions),
        meta: metadata(project.meta)
    };

    callback(null, meta);
};
