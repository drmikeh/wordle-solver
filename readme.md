# Wordle Solver

This is a simple command-line app that helps to solve [Wordle](https://www.powerlanguage.co.uk/wordle/) puzzles.

## Usage

Let's say that your first guess is "media" and Wordle gives back this:

![media results](media-results.png)

You would then enter the following to get a list of candidates for your next guess:

```shell
$ node wordle-solver -g media -r 20010
candidates: 21
[
  'micks', 'micro', 'miffs',
  'might', 'milch', 'milks',
  'milky', 'mills', 'mimsy',
  'minks', 'minor', 'mints',
  'minus', 'mirth', 'missy',
  'mists', 'misty', 'mitts',
  'mixup', 'moist', 'mufti'
]
```

The option `-g` is for guess and the option `-r` is for results. So

`-g media` means we guessed the word `media` and `20010` is the encoded result using the following encoding:

```
0 = no match (color is gray)
1 = match but not in the correct position (color is yellow)
2 = an exact match (color is green)
```

Thus a green/gray/gray/yellow/gray result is encoded as `20010`

Now we are ready for the next guess. Let's choose `milky` for our next guess.
Wordle then gives us another result, this time it is green/yellow/gray/gray/gray.
So we add the 2nd guess and the 2nd result in our next call to wordle-solver (using commas to provide all of the guesses and all of the results).

> NOTE: Be sure that the 1st guess matches the first result and the 2nd result is for the 2nd guess (keep the data in the proper order).

```shell
$ node wordle-solver -g media,milky -r 20010,21000
candidates: 2
[ 'moist', 'mufti' ]
```

Now we only have 2 words left to guess.

⚡️ Amazing ⚡️

## How It Works

The program simply starts with a list of all 5-letter words and then uses the provided guesses and results to filter the list of words to see which words match the given results. The matching is done by filtering what letters are included, what letters are excluded, and any positional matches.

## References

* [Wordle](https://www.powerlanguage.co.uk/wordle/)
* [Games Like Wordle](https://www.inverse.com/gaming/games-like-wordle)
* [hellowordl](https://hellowordl.net/?random)
* [Cypress Wordle](https://github.com/bahmutov/cypress-wordle)
