exports.id = 'hash';

const md5 = require('md5');

String.prototype.hashCode = function() {
  let hash = 0, chr;
  for (let i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

exports.md5 = (s) => md5(s).hashCode();

/*
const crypto = require('crypto');
const arr2int = (digest) => {
  let hash = 0;
  digest.forEach((b) => {
    hash = ((hash << 5) - hash) + b;
    hash |= 0;
  });
  return hash;
}

exports.string = (s) => {
  let digest = new crypto.Hash("sha1").update(s).digest();
  return arr2int(digest);
};
*/
