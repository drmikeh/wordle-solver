import { readFile } from 'fs/promises';
import yargs from 'yargs'
import { makeMaskFilter, makeInverseMaskFilter, makeMasks } from './masks.js'
import {
    makeIncludeFilter,
    makeExcludeFilter,
    makeIncludesAndExcludes,
} from './includes-excludes.js'

const words = JSON.parse(await readFile(new URL('./dictionary.json', import.meta.url)));

const argv = yargs(process.argv.slice(2)).options({
    guesses: {
        alias: 'g',
        description: 'Specify the guess',
        type: 'string',
    },
    results: {
        alias: 'r',
        description: 'Specify the result (for example (01120)',
        type: 'string',
    },
}).argv

function main() {
    const guesses = argv.guesses.split(',')
    const results = argv.results.split(',')

    const { includes, excludes } = makeIncludesAndExcludes(guesses, results)
    const { mask, inverseMask } = makeMasks(guesses, results)

    console.debug({ includes, excludes, mask, inverseMask })

    const maskFilter = makeMaskFilter(mask)
    const inverseMaskFilter = makeInverseMaskFilter(inverseMask)
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

    const candidates = words.filter(mainFilter)
    console.log('candidates:', candidates.length)
    console.log(candidates)
}

main()
