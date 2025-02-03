const scratchParserValidate = require('scratch-parser/lib/validate');
const {SB1File} = require('scratch-sb1-converter');

const sb2 = require('./sb2');

/**
 * SB1Analyzer class for analyzing SB1 projects.
 */
class SB1Analyzer {
    /**
     * Creates a new SB1Analyzer instance.
     * @param {Function} validate - The validate function to use.
     */
    constructor (validate = scratchParserValidate) {
        this.validate = validate;
    }

    /**
     * Converts an SB1 project buffer to an SB2 project object,
     * validates it using the provided validate function,
     * analyzes it, and returns summary information about the project.
     * @param  {Buffer}   buffer  Project buffer (SB1 format)
     * @param  {Function} callback Callback function
     * @return {void}
     */
    analyze (buffer, callback) {
        try {
            const sb1File = new SB1File(buffer);
            const project = sb1File.json;

            this.validate(false, project, (err, validatedProject) => {
                if (err) {
                    return callback(err);
                }

                validatedProject.isBundle = true;
                validatedProject.projectVersion = 1;
                return sb2(validatedProject, callback);
            });
        } catch (err) {
            return callback(err);
        }
    }
}

module.exports = {SB1Analyzer};
