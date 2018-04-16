import emoji from 'node-emoji';

export class TextFormat {
  static emojify = text => emoji.emojify(text);
}
