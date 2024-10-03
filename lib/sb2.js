const utility = require('./utility');

/**
 * Returns an array of items matching the specified attribute.
 * @param  {object} project   Project object (SB2 format)
 * @param  {string} attribute Attribute to extract and flatten
 * @return {array}            Array of specified attribute
 */
const flatten = function (project, attribute) {
    // Storage object
    let result = [];

    // If attribute exists at the top level of the project, append it
    if (typeof project[attribute] !== 'undefined') {
        result = project[attribute];
    }

    // Iterate over child elements and append to result array
    for (let i in project.children) {
        const child = project.children[i];
        if (typeof child[attribute] !== 'undefined') {
            result = result.concat(child[attribute]);
        }
    }

    return result;
};

/**
 * Extract summary information from a specific project attribute. Will attempt
 * to concatinate all children when generating summary.
 * @param  {object} project   Project object (SB2 format)
 * @param  {string} attribute Attribute key
 * @param  {string} id        "id" key
 * @param  {string} hash      "hash" key
 * @return {object}           Summary information
 */
const extract = function (project, attribute, id, hash) {
    // Create storage objects and flatten project
    let idList = null;
    let hashList = null;
    let elements = flatten(project, attribute);

    // Extract ids if specified
    if (typeof id !== 'undefined') {
        idList = [];
        for (var x in elements) {
            idList.push(elements[x][id]);
        }
    }

    // Extract hashes if specified
    if (typeof hash !== 'undefined') {
        hashList = [];
        for (var y in elements) {
            hashList.push(elements[y][hash]);
        }
    }

    // Build result and return
    var result = {
        count: elements.length
    };
    if (idList !== null) result.id = idList;
    if (hashList !== null) result.hash = hashList;

    return result;
};

/**
 * Extract summary information about backdrops including
 * count, list of backdrop names and list of backdrop hashes.
 * Backdrops are a subset of all costumes.
 * Backdrops are a costumes from the stage object.
 * @param  {object} project Project object (SB2 format)
 * @return {object}         Summary information
 */
const backdrops = function (project) {
    let stageCostumes = project.costumes;

    return {
        count: stageCostumes.length,
        id: stageCostumes.map((sc) => sc.costumeName),
        hash: stageCostumes.map((sc) => sc.baseLayerMD5)
    };
};

/**
 * Extract number of sprites from a project object. Will attempt to ignore
 * "children" which are not sprites.
 * @param  {object} input Project object (SB2 format)
 * @return {object}       Sprite information
 */
const sprites = function (input) {
    let result = 0;

    for (let i in input.children) {
        if (Object.prototype.hasOwnProperty.call(input.children[i], 'spriteInfo')) result++;
    }

    return {count: result};
};

/**
 * Extracts all blocks and generates a frequency count.
 * @param  {object} project Project object (SB2 format)
 * @return {object}         Block information
 */
const blocks = function (project) {
    // Storage objects
    const result = [];

    /**
     * Determine if a argument is the name of a known cloud variable.
     * @param  {string} arg Argument (variable name)
     * @return {boolean}    Is cloud variable?
     */
    const isArgCloudVar = function (arg) {
        // Validate argument
        // @note "Hacked" inputs here could be objects (arrays)
        if (typeof arg !== 'string') return false;

        // Iterate over global variables and check to see if arg matches
        for (let i in project.variables) {
            const variable = project.variables[i];
            if (variable.name === arg && variable.isPersistent) return true;
        }
        return false;
    };

    /**
     * Walk scripts array(s) and build block list.
     * @param  {array} stack Stack of blocks
     * @return {void}
     */
    const walk = function (stack) {
        for (let i in stack) {
            // Skip if item is not array
            if (!Array.isArray(stack[i])) continue;

            // Recurse if first item is not a string
            if (typeof stack[i][0] !== 'string') {
                walk(stack[i]);
                continue;
            }

            // Get opcode and check variable manipulation for the presence of
            // cloud variables
            let opcode = stack[i][0];
            if (opcode === 'setVar:to:' || opcode === 'changeVar:by:') {
                if (isArgCloudVar(stack[i][1])) {
                    opcode += 'cloud:';
                }
            }

            // Add to block list
            result.push(opcode);

            // Don't pull in params from procedures
            if (opcode === 'procDef') continue;

            // Move to next item and walk
            walk(stack[i].slice(1));
        }
    };
    walk(flatten(project, 'scripts'));

    // Generate frequency count
    const freq = utility.frequency(result);

    // Build result and return
    return {
        count: result.length,
        unique: Object.keys(freq).length,
        id: result,
        frequency: freq
    };
};

/**
 * Extracts extension information.
 * @param  {object} project Project object (SB2 format)
 * @return {object}         Extension information
 */
const extensions = function (project) {
    const result = {count: 0, id: []};
    const ext = project.info.savedExtensions;

    // Check to ensure project includes any extensions
    if (typeof ext === 'undefined') return result;

    // Iterate over extensions and build list
    for (let i in ext) {
        result.id.push(ext[i].extensionName);
    }

    // Count and return
    result.count = result.id.length;
    return result;
};

/**
 * Extracts cloud variable information.
 * @param  {object} project Project object (SB2 format)
 * @param  {array}  names   Names of all variables in project
 * @return {object}         Cloud variable information
 */
const cloud = function (project, names) {
    const obj = [];

    // Extract "isPersistent" parameter from all variables in project
    const cloudyness = extract(project, 'variables', 'isPersistent').id;

    // Ensure that variable names and isPersistent parameter list are the same
    // length
    if (names.length !== cloudyness.length) return -1;

    // Iterate over isPersistent values, and extract names of any that are true
    for (let i in cloudyness) {
        if (cloudyness[i]) {
            obj.push(names[i]);
        }
    }

    return {
        count: obj.length,
        id: obj
    };
};

/**
 * Analyzes a project and returns summary information about the project.
 * @param  {object}   project  Project object (SB2 format)
 * @param  {Function} callback Callback function
 * @return {void}
 */
module.exports = function (project, callback) {
    // Create metadata object
    const meta = {
        scripts: extract(project, 'scripts'),
        variables: extract(project, 'variables', 'name'),
        lists: extract(project, 'lists', 'listName'),
        comments: extract(project, 'scriptComments'),
        sounds: extract(project, 'sounds', 'soundName', 'md5'),
        costumes: extract(project, 'costumes', 'costumeName', 'baseLayerMD5')
    };

    meta.backdrops = backdrops(project);

    meta.cloud = cloud(project, meta.variables.id);

    // Sprites
    meta.sprites = sprites(project);

    // Blocks
    meta.blocks = blocks(project);

    // Extensions
    meta.extensions = extensions(project);

    // Metadata is only in sb3s so just fill in an empty object.
    meta.meta = {};

    // Return all metadata
    return callback(null, meta);
};
