const fs = require('fs')
const yargs = require('yargs')

const text = fs.readFileSync('./words.txt', 'utf-8')
const words = text.split('\n')

const argv = yargs(process.argv.slice(2)).options({
    include: {
        alias: 'i',
        description: 'Specify the characters to include',
        type: 'string',
    },
    exclude: {
        alias: 'e',
        description: 'Specify the characters to exclude',
        type: 'string',
    },
    mask: {
        alias: 'm',
        description: 'Specify a mask to match (for example m*st*)',
        type: 'string',
    },
    imask: {
        alias: 'v',
        description: 'Specify an inverse mask to match',
        type: 'string',
    },
}).argv

function makeIncludeFilter(includeChars) {
    return function (word) {
        // a word must include all of the includeChars to return true
        for (let i = 0; i < includeChars.length; i++) {
            const ch = includeChars[i]
            if (word.includes(ch) === false) {
                return false
            }
        }
        return true
    }
}

function makeExcludeFilter(excludeChars) {
    return function (word) {
        // if a word includes any of the excludeChars it returns false
        for (let i = 0; i < excludeChars.length; i++) {
            const ch = excludeChars[i]
            if (word.includes(ch)) {
                return false
            }
        }
        return true
    }
}

function makeMaskFilter(mask) {
    return function (word) {
        for (let i = 0; i < mask.length; i++) {
            const ch = mask[i]
            if (ch !== '*' && word[i] !== ch) {
                return false
            }
        }
        return true
    }
}

function makeInverseMaskFilter(imask) {
    return function (word) {
        for (let i = 0; i < imask.length; i++) {
            const ch = imask[i]
            if (ch !== '*' && word[i] === ch) {
                return false
            }
        }
        return true
    }
}

function main() {
    const includes = argv.include ? argv.include.split('') : []
    const excludes = argv.exclude ? argv.exclude.split('') : []
    const mask = argv.mask || '*****'
    const imask = argv.imask || '*****'

    console.log({ mask, imask })

    const maskFilter = makeMaskFilter(mask)
    const inverseMaskFilter = makeInverseMaskFilter(imask)
    const includeFilter = makeIncludeFilter(includes)
    const excludeFilter = makeExcludeFilter(excludes)

    function mainFilter(word) {
        return (
            maskFilter(word) &&
            inverseMaskFilter(word) &&
            includeFilter(word) &&
            excludeFilter(word)
        )
    }

    const filtered = words.filter(mainFilter)
    console.log('candidates:', filtered.length)
    console.log(filtered)
}

main()
