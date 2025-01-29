const parser = require('scratch-parser');

const sb1 = require('./sb1');
const sb2 = require('./sb2');
const sb3 = require('./sb3');

module.exports = function (buffer, callback) {
    parser(buffer, false, (err, result) => {
        if (err === 'Parser only supports Scratch 2.X and above') {
            return sb1(buffer, callback);
        } else if (err) {
            return callback(err);
        }

        // Extract the project object from the parser results
        const project = result[0];
        // Check if the input buffer was a zip file
        const zip = result[1];
        project.isBundle = typeof zip !== 'undefined' && zip !== null;

        // Push project object to the appropriate analysis handler
        switch (project.projectVersion) {
        case 2:
            sb2(project, callback);
            break;
        case 3:
            sb3(project, callback);
            break;
        }
    });
};
