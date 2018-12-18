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
 * Extract number of sprites from a project object. Will attempt to ignore
 * "children" which are not sprites.
 * @param  {object} input Project object (SB2 format)
 * @return {object}       Sprite information
 */
const sprites = function (input) {
    let result = 0;

    for (let i in input.children) {
        if (input.children[i].hasOwnProperty('spriteInfo')) result++;
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

            // Add to block list
            result.push(stack[i][0]);

            // Don't pull in params from procedures
            if (stack[i][0] === 'procDef') continue;

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

    // Sprites
    meta.sprites = sprites(project);

    // Blocks
    meta.blocks = blocks(project);

    // Extensions
    meta.extensions = extensions(project);

    // Return all metadata
    return callback(null, meta);
};
