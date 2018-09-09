exports.id = 'hash';

crypto = require('crypto');

String.prototype.hashCode = function() {
  let hash = 0, chr;
  for (let i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

exports.string = (s) => {
  let digest = new crypto.Hash("sha1").update(s).digest();
  let hash = 0;
  digest.forEach((b) => {
    hash = ((hash << 5) - hash) + b;
    hash |= 0;
  });
  return hash;
}

