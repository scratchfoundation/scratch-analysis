## scratch-analysis
#### Analysis tool for summarizing the structure, composition, and complexity of [Scratch](https://scratch.mit.edu) programs.

[![Build Status](https://travis-ci.org/LLK/scratch-analysis.svg?branch=develop)](https://travis-ci.org/LLK/scratch-analysis)
[![Greenkeeper badge](https://badges.greenkeeper.io/LLK/scratch-analysis.svg)](https://greenkeeper.io/)

## Getting Started
```bash
npm install scratch-analysis
```

```js
const analysis = require('scratch-analysis');
analysis(buffer, function (err, result) {
    // handle any validation errors and ...
    // do something interesting with the results!
});
```

## Analysis Modules
### General
The `scratch-analysis` module will return an object containing high-level summary information about the project:

| Key               | Attributes                                               |
| ----------------- | -------------------------------------------------------- |
| `scripts`         | `count`                                                  |
| `blocks`          | `count`, `unique`, `list`, `frequency`                   |
| `sprites`         | `count`                                                  |
| `variables`       | `count`                                                  |
| `lists`           | `count`                                                  |
| `costumes`        | `count`, `list`, `hash`                                  |
| `sounds`          | `count`, `list`, `hash`                                  |
| `extensions`      | `count`, `list`                                          |
| `comments`        | `count`                                                  |

### Concepts
**Coming Soon**

### Complexity
**Coming Soon**

### Classification
**Coming Soon**

## References
### New Frameworks for Studying and Assessing the Development of Computational Thinking
Author(s): Karen Brennan, Mitchel Resnick
PDF: [Download](https://web.media.mit.edu/~kbrennan/files/Brennan_Resnick_AERA2012_CT.pdf)
