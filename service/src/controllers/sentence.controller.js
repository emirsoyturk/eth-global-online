const example = require('../services/example.service')
const {handleAsync} = require('../services/error.service')
const {generalLogger} = require('../services/logger.service')
const word_to_index = require('/Users/volthai7us/Desktop/dev/hackathons/zkml-censor/ml/word_to_index.json')
const index_to_word = require("/Users/volthai7us/Desktop/dev/hackathons/zkml-censor/ml/index_to_word.json")

function levenshtein(a, b) {
    const matrix = [];

    let i, j;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function findClosestWordIndex(word) {
    let minDistance = Infinity;
    let closestWordIndex = -1;

    for (const [key, value] of Object.entries(word_to_index)) {
        const distance = levenshtein(word, key);
        if (distance < minDistance) {
            minDistance = distance;
            closestWordIndex = value;
        }
    }

    return closestWordIndex;
}

async function toIndexes(req, res) {
    let {sentence} = req.body

    let arr = sentence.split(" ")
    arr = arr.map(x => {
        const i = index_to_word[x]
        if (i) {
            return i
        }
        return findClosestWordIndex(x)
    })

    while (arr.length < 27) {
        arr.push(0)
    }

    res.json(arr)
}

async function fromIndexes(req, res) {
    let {indexes} = req.body

    indexes = indexes.map(x => index_to_word[x])

    res.json(indexes)
}

module.exports = {
    toIndexes: handleAsync(toIndexes),
    fromIndexes: handleAsync(fromIndexes)
}
