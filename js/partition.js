exports.id = 'partition';

const hash = require('./hash.js');

/* Round-Robin partitioner
 *
 * Common in load-balancing, this stateful partitioner guarantees an even
 * distribution of items.
 */
exports.roundRobin = (hosts) => {

  const hostCount = hosts.length;
  let nextToAllocate = 0;

  return (item) => {
    const host = hosts[nextToAllocate];
    nextToAllocate = (nextToAllocate == hostCount - 1) ? 0 : nextToAllocate + 1;
    return host;
  }
}

/* Column-wise partitioner
 *
 * This is essentially the transpose of round-robin, and reduces the
 * reassignment rate from (n-1)/n  to 1/2.
 *
 * NOT IMPLEMENTED
 */

/* mod-K partitioner
 *
 * This simple partitioning function is stateless, but it results in large
 * upheavals when a host is added or removed.
 */
exports.modK = (hosts) => {
  const hostCount = hosts.length;
  return (item) => {
    let hash = item.hashCode();
    return hosts[(hash % hostCount + hostCount) % hostCount];
  }
}

/* Highest-Random-Weight (HRW) partitioner
 *
 * HRW partitioning, a form of rendezvous partitioning, minimizes the number of
 * items that need to be moved when a host is added or removed.
 */
exports.HRW = (hosts) => {
  const weight = (hostNumber, item) => {
    const magic = 1103515245;
    const maxInt = 2**31;
    const itemDigest = (hash.md5(item) % maxInt + maxInt) % maxInt;
    return (magic * (((magic * hostNumber + 12345) % maxInt) ^ itemDigest) + 12345) % maxInt;
  };

  return (item) => {
    let weights = hosts.map((_, idx) => weight(idx, item));
    return hosts[weights.indexOf(Math.max(...weights))];
  }
}

/* Consistent Hashing partitioner
 *
 * This meets the low reassignment rates of the HRW partitioner, but does so in
 * O(log nHosts) time rather than O(nHosts) time as in the case of HRW. In
 * order to achieve even balancing, it uses a number of ghost nodes, which
 * increase the constant complexity.
 */
exports.consistentHash = (hosts) => {

  let multiplicity = 32;
  let hostHashes = [...Array(multiplicity).keys()].map(
    (i) => hosts.map(
      (host) => {
        return {"name": host, "i": i, "hash": hash.md5(`${host}${i}`)};
      }
    )
  )
  .reduce((a, b) => a.concat(b), [])
  .sort((a, b) => (a["hash"] < b["hash"]) ? -1 : (a["hash"] > b["hash"]) ? 1 : 0);

  return (item) => {
    let h = hash.md5(item);
    let i = bisectBelow(h, hostHashes.map((obj) => obj["hash"]));
    return hostHashes[i]["name"];
  }
}

// bisect a sorted list of values, finding the index of the smallest value larger than or equal to v
const bisectBelow = (v, list) => {
  const n = list.length;
  if (n == 0) return null;
  if (n == 1) return 0;
  // check boundaries
  if (list[0] >= v) return 0;
  if (list[n-1] < v) return 0;
  // bisect
  let half = Math.floor(0.5 * (n-1));
  if ((list[half] < v) && (list[half+1] > v)) return half+1;
  if (list[half] < v) return half + 1 + bisectBelow(v, list.slice(half+1));
  if (list[half] > v) return bisectBelow(v, list.slice(0, half+1));
  console.log('ERROR: bisect fallthrough');
}

exports.utils = {"bisectBelow": bisectBelow};
