export function makeMaskFilter(mask) {
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

export function makeInverseMaskFilter(inverseMask) {
    return function (word) {
        for (let i = 0; i < inverseMask.length; i++) {
            const ch = inverseMask[i]
            if (ch !== '*' && word[i] === ch) {
                return false
            }
        }
        return true
    }
}

export function makeMasks(guesses, results) {
    const mask = '*****'.split('')
    const inverseMask = '*****'.split('')
    for (let i = 0; i < guesses.length; i++) {
        const guess = guesses[i]
        const result = results[i]
        for (let j = 0; j < guess.length; j++) {
            if (result[j] === '2') {
                mask[j] = guess[j]
            }
            if (result[j] === '1') {
                inverseMask[j] = guess[j]
            }
        }
    }
    return { mask: mask.join(''), inverseMask: inverseMask.join('') }
}
