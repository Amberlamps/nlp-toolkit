/**
 * Using module in a non-streaming context.
 */

/**
 * MODULES.
 */
var nlp = require('../index.js');


/**
 * VARIABLES.
 */
var text = 'Emperor Akbar was in the habit of putting riddles and puzzles to his courtiers. He often asked questions which were strange and witty. It took much wisdom to answer these questions. Once he asked a very strange question. The courtiers were dumb folded by his question. Akbar glanced at his courtiers. As he looked, one by one the heads began to hang low in search of an answer. It was at this moment that Birbal entered the courtyard. Birbal who knew the nature of the emperor quickly grasped the situation and asked, "May I know the question so that I can try for an answer". Akbar said, "How many crows are there in this city?" Without even a moments thought, Birbal replied "There are fifty thousand five hundred and eighty nine crows, my lord". "How can you be so sure?" asked Akbar. Birbal said, "Make you men count, My lord. If you find more crows it means some have come to visit their relatives here. If you find less number of crows it means some have gone to visit their relatives elsewhere". Akbar was pleased very much by Birbals wit.';


/**
 * NLP.
 */
nlp.stopwords(nlp.tokenizer(text))
.then(function (tokens) {
  console.log(nlp.stemmer(tokens));
})
.catch(function (err) {
  console.error(err);
});