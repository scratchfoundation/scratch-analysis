const parser = require('scratch-parser');

const sb2 = require('./sb2');
const sb3 = require('./sb3');

module.exports = function (buffer, callback) {
    parser(buffer, false, (err, result) => {
        if (err) return callback(err);

        // Extract only the project object from the parser results
        const project = result[0];

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
