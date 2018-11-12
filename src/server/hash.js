const Hashids = require('hashids');

const SALT = 'CharlesLiu';
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const MINLENGTH = 3;

var hashids = new Hashids(SALT, MINLENGTH, ALPHABET);

module.exports = {
  encode: (id) =>  hashids.encode(id),
  decode: (token) => hashids.decode(token)
}