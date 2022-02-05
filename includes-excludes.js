export function makeIncludeFilter(includeChars) {
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

export function makeExcludeFilter(excludeChars) {
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

export function makeIncludesAndExcludes(guesses, results) {
    const includes = new Set()
    const excludes = new Set()
    for (let i = 0; i < guesses.length; i++) {
        const guess = guesses[i]
        const result = results[i]
        for (let j = 0; j < guess.length; j++) {
            if (result[j] !== '0') {
                includes.add(guess[j])
            } else {
                excludes.add(guess[j])
            }
        }
    }

    const excludesNotInIncludes = [...excludes].filter(e => !includes.has(e))
    return { includes: [...includes], excludes: excludesNotInIncludes }
}
