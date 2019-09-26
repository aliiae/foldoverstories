// import {hri as HumanReadableIdMaker} from 'human-readable-ids';
//
// export default HumanReadableIdMaker;

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];


export default class HumanReadableIdMaker {
  constructor(delimiter = '-') {
    this.delimiter = delimiter;
  }

  adjectives = ['bright', 'small'];

  nouns = ['cat', 'badger'];

  random() {
    const adjective = getRandomItem(this.adjectives);
    const noun = getRandomItem(this.nouns);
    return adjective + this.delimiter + noun;
  }
}
