require=function(){return function r(t,n,e){function o(i,s){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(u)return u(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var a=n[i]={exports:{}};t[i][0].call(a.exports,function(r){return o(t[i][1][r]||r)},a,a.exports,r,t,n,e)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<e.length;i++)o(e[i]);return o}}()({1:[function(r,t,n){n.id="hash";const e=r("md5");String.prototype.hashCode=function(){let r,t=0;for(let n=0;n<this.length;n++)t=(t<<5)-t+(r=this.charCodeAt(n)),t|=0;return t},n.md5=(r=>e(r).hashCode())},{md5:5}],2:[function(r,t,n){var e={utf8:{stringToBytes:function(r){return e.bin.stringToBytes(unescape(encodeURIComponent(r)))},bytesToString:function(r){return decodeURIComponent(escape(e.bin.bytesToString(r)))}},bin:{stringToBytes:function(r){for(var t=[],n=0;n<r.length;n++)t.push(255&r.charCodeAt(n));return t},bytesToString:function(r){for(var t=[],n=0;n<r.length;n++)t.push(String.fromCharCode(r[n]));return t.join("")}}};t.exports=e},{}],3:[function(r,t,n){var e,o;e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o={rotl:function(r,t){return r<<t|r>>>32-t},rotr:function(r,t){return r<<32-t|r>>>t},endian:function(r){if(r.constructor==Number)return 16711935&o.rotl(r,8)|4278255360&o.rotl(r,24);for(var t=0;t<r.length;t++)r[t]=o.endian(r[t]);return r},randomBytes:function(r){for(var t=[];r>0;r--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(r){for(var t=[],n=0,e=0;n<r.length;n++,e+=8)t[e>>>5]|=r[n]<<24-e%32;return t},wordsToBytes:function(r){for(var t=[],n=0;n<32*r.length;n+=8)t.push(r[n>>>5]>>>24-n%32&255);return t},bytesToHex:function(r){for(var t=[],n=0;n<r.length;n++)t.push((r[n]>>>4).toString(16)),t.push((15&r[n]).toString(16));return t.join("")},hexToBytes:function(r){for(var t=[],n=0;n<r.length;n+=2)t.push(parseInt(r.substr(n,2),16));return t},bytesToBase64:function(r){for(var t=[],n=0;n<r.length;n+=3)for(var o=r[n]<<16|r[n+1]<<8|r[n+2],u=0;u<4;u++)8*n+6*u<=8*r.length?t.push(e.charAt(o>>>6*(3-u)&63)):t.push("=");return t.join("")},base64ToBytes:function(r){r=r.replace(/[^A-Z0-9+\/]/gi,"");for(var t=[],n=0,o=0;n<r.length;o=++n%4)0!=o&&t.push((e.indexOf(r.charAt(n-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(r.charAt(n))>>>6-2*o);return t}},t.exports=o},{}],4:[function(r,t,n){function e(r){return!!r.constructor&&"function"==typeof r.constructor.isBuffer&&r.constructor.isBuffer(r)}t.exports=function(r){return null!=r&&(e(r)||function(r){return"function"==typeof r.readFloatLE&&"function"==typeof r.slice&&e(r.slice(0,0))}(r)||!!r._isBuffer)}},{}],5:[function(r,t,n){var e,o,u,i,s;e=r("crypt"),o=r("charenc").utf8,u=r("is-buffer"),i=r("charenc").bin,(s=function(r,t){r.constructor==String?r=t&&"binary"===t.encoding?i.stringToBytes(r):o.stringToBytes(r):u(r)?r=Array.prototype.slice.call(r,0):Array.isArray(r)||(r=r.toString());for(var n=e.bytesToWords(r),c=8*r.length,f=1732584193,a=-271733879,h=-1732584194,l=271733878,g=0;g<n.length;g++)n[g]=16711935&(n[g]<<8|n[g]>>>24)|4278255360&(n[g]<<24|n[g]>>>8);n[c>>>5]|=128<<c%32,n[14+(c+64>>>9<<4)]=c;var p=s._ff,d=s._gg,y=s._hh,v=s._ii;for(g=0;g<n.length;g+=16){var b=f,m=a,T=h,B=l;a=v(a=v(a=v(a=v(a=y(a=y(a=y(a=y(a=d(a=d(a=d(a=d(a=p(a=p(a=p(a=p(a,h=p(h,l=p(l,f=p(f,a,h,l,n[g+0],7,-680876936),a,h,n[g+1],12,-389564586),f,a,n[g+2],17,606105819),l,f,n[g+3],22,-1044525330),h=p(h,l=p(l,f=p(f,a,h,l,n[g+4],7,-176418897),a,h,n[g+5],12,1200080426),f,a,n[g+6],17,-1473231341),l,f,n[g+7],22,-45705983),h=p(h,l=p(l,f=p(f,a,h,l,n[g+8],7,1770035416),a,h,n[g+9],12,-1958414417),f,a,n[g+10],17,-42063),l,f,n[g+11],22,-1990404162),h=p(h,l=p(l,f=p(f,a,h,l,n[g+12],7,1804603682),a,h,n[g+13],12,-40341101),f,a,n[g+14],17,-1502002290),l,f,n[g+15],22,1236535329),h=d(h,l=d(l,f=d(f,a,h,l,n[g+1],5,-165796510),a,h,n[g+6],9,-1069501632),f,a,n[g+11],14,643717713),l,f,n[g+0],20,-373897302),h=d(h,l=d(l,f=d(f,a,h,l,n[g+5],5,-701558691),a,h,n[g+10],9,38016083),f,a,n[g+15],14,-660478335),l,f,n[g+4],20,-405537848),h=d(h,l=d(l,f=d(f,a,h,l,n[g+9],5,568446438),a,h,n[g+14],9,-1019803690),f,a,n[g+3],14,-187363961),l,f,n[g+8],20,1163531501),h=d(h,l=d(l,f=d(f,a,h,l,n[g+13],5,-1444681467),a,h,n[g+2],9,-51403784),f,a,n[g+7],14,1735328473),l,f,n[g+12],20,-1926607734),h=y(h,l=y(l,f=y(f,a,h,l,n[g+5],4,-378558),a,h,n[g+8],11,-2022574463),f,a,n[g+11],16,1839030562),l,f,n[g+14],23,-35309556),h=y(h,l=y(l,f=y(f,a,h,l,n[g+1],4,-1530992060),a,h,n[g+4],11,1272893353),f,a,n[g+7],16,-155497632),l,f,n[g+10],23,-1094730640),h=y(h,l=y(l,f=y(f,a,h,l,n[g+13],4,681279174),a,h,n[g+0],11,-358537222),f,a,n[g+3],16,-722521979),l,f,n[g+6],23,76029189),h=y(h,l=y(l,f=y(f,a,h,l,n[g+9],4,-640364487),a,h,n[g+12],11,-421815835),f,a,n[g+15],16,530742520),l,f,n[g+2],23,-995338651),h=v(h,l=v(l,f=v(f,a,h,l,n[g+0],6,-198630844),a,h,n[g+7],10,1126891415),f,a,n[g+14],15,-1416354905),l,f,n[g+5],21,-57434055),h=v(h,l=v(l,f=v(f,a,h,l,n[g+12],6,1700485571),a,h,n[g+3],10,-1894986606),f,a,n[g+10],15,-1051523),l,f,n[g+1],21,-2054922799),h=v(h,l=v(l,f=v(f,a,h,l,n[g+8],6,1873313359),a,h,n[g+15],10,-30611744),f,a,n[g+6],15,-1560198380),l,f,n[g+13],21,1309151649),h=v(h,l=v(l,f=v(f,a,h,l,n[g+4],6,-145523070),a,h,n[g+11],10,-1120210379),f,a,n[g+2],15,718787259),l,f,n[g+9],21,-343485551),f=f+b>>>0,a=a+m>>>0,h=h+T>>>0,l=l+B>>>0}return e.endian([f,a,h,l])})._ff=function(r,t,n,e,o,u,i){var s=r+(t&n|~t&e)+(o>>>0)+i;return(s<<u|s>>>32-u)+t},s._gg=function(r,t,n,e,o,u,i){var s=r+(t&e|n&~e)+(o>>>0)+i;return(s<<u|s>>>32-u)+t},s._hh=function(r,t,n,e,o,u,i){var s=r+(t^n^e)+(o>>>0)+i;return(s<<u|s>>>32-u)+t},s._ii=function(r,t,n,e,o,u,i){var s=r+(n^(t|~e))+(o>>>0)+i;return(s<<u|s>>>32-u)+t},s._blocksize=16,s._digestsize=16,t.exports=function(r,t){if(void 0===r||null===r)throw new Error("Illegal argument "+r);var n=e.wordsToBytes(s(r,t));return t&&t.asBytes?n:t&&t.asString?i.bytesToString(n):e.bytesToHex(n)}},{charenc:2,crypt:3,"is-buffer":4}],partition:[function(r,t,n){n.id="partition";const e=r("./hash.js");var o,u;n.roundRobin=(r=>{const t=r.length;let n=0;return e=>{const o=r[n];return n=n==t-1?0:n+1,o}}),n.columnMajor=((r,t)=>{const n=t/r.length;let e=0;return o=>{const u=Math.floor(e/n);return e=e==t-1?0:e+1,r[u]}}),n.modK=(r=>{const t=r.length;return n=>{let e=n.hashCode();return r[(e%t+t)%t]}}),n.HRW=(r=>{return t=>{let n=r.map((r,n)=>(o=n,t=t,(1103515245*((1103515245*o+12345)%2**31^(e.md5(t)%2**31+2**31)%2**31)+12345)%2**31));return r[n.indexOf(Math.max(...n))]}}),n.consistentHash=(r=>{let t=[...Array(32).keys()].map(t=>r.map(r=>({name:r,i:t,hash:e.md5(`${r}${t}`)}))).reduce((r,t)=>r.concat(t),[]).sort((r,t)=>r.hash<t.hash?-1:r.hash>t.hash?1:0);return r=>{let n=e.md5(r),o=i(n,t.map(r=>r.hash));return t[o].name}});const i=(r,t)=>{const n=t.length;if(0==n)return null;if(1==n)return 0;if(t[0]>=r)return 0;if(t[n-1]<r)return 0;let e=Math.floor(.5*(n-1));return t[e]<r&&t[e+1]>r?e+1:t[e]<r?e+1+i(r,t.slice(e+1)):t[e]>r?i(r,t.slice(0,e+1)):void console.log("ERROR: bisect fallthrough")};n.utils={bisectBelow:i}},{"./hash.js":1}]},{},[]);