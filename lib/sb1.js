const {SB1File} = require('scratch-sb1-converter');

const sb2 = require('./sb2');

/**
 * Converts an SB1 project buffer to an SB2 project object,
 * analyzes it, and returns summary information about the project.
 * @param  {Buffer}   buffer  Project buffer (SB1 format)
 * @param  {Function} callback Callback function
 * @return {void}
 */
module.exports = function (buffer, callback) {
    try {
        const sb1File = new SB1File(buffer);
        const project = sb1File.json;
        project.isBundle = true;
        project.projectVersion = 1;

        return sb2(project, callback);
    } catch (err) {
        return callback(err);
    }
};
