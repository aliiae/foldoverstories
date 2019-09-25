// import {hri as HumanReadableIdMaker} from 'human-readable-ids';
//
// export default HumanReadableIdMaker;
export default class HumanReadableIdMaker {
  constructor(delimiter = '-') {
    this.delimiter = delimiter;
  }

  adjectives = ['bright', 'small'];
  nouns = ['cat', 'badger'];

  random() {
    const adjective = this._getRandomItem(this.adjectives);
    const noun = this._getRandomItem(this.nouns);
    return adjective + this.delimiter + noun;
  }

  _getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

