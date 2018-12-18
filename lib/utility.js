/**
 * Utility methods for costructing Scratch project summaries.
 */
class Utility {
    /**
     * Tallies term frequency from an array of strings.
     * @param  {array} input Array of strings
     * @return {object}      Frequency information
     */
    static frequency (input) {
        const result = Object.create(null);

        for (let i in input) {
            var term = input[i];
            if (typeof result[term] === 'undefined') result[term] = 0;
            result[term]++;
        }

        return result;
    }
}

module.exports = Utility;
