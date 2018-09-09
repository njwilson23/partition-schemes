const partition = require('./partition');
const assert = require("assert");

const testBisect = () => {
  assert.strictEqual(partition.utils.bisectBelow(5, [0, 3, 4, 6, 8, 10]), 3);
  assert.strictEqual(partition.utils.bisectBelow(0, [-30, -3, 4, 6, 8, 10]), 2);
  assert.strictEqual(partition.utils.bisectBelow(-50, [-30, -3, 4, 6, 8, 10]), 0);
  assert.strictEqual(partition.utils.bisectBelow(15, [-30, -3, 4, 6, 8, 10]), 0);

  let arr = [
    -1701879808, -1684152004, -1647728023, -1634630517, -1547764020,
    -1505880878, -1326520427, -1235180929, -1138419399, -940495594, -850416066,
    -357443323, -323128001, -229048730, -171408614, -88016860, 195428042,
    345337947, 557625726, 567008737, 894224820, 961484700, 1065178726,
    1091129608, 1502414148, 1506929756, 1661908341, 1669020998, 1695592704,
    1705950570, 1972573031, 1992332334
  ];

  assert.strictEqual(partition.utils.bisectBelow(279353200, arr), 17);

  console.log("BISECT PASSED");
}

const testPartitionerConsistency = (partitionFunc, name) => {
  let things = [...Array(100).keys()].map((n) => `thing${n}`);
  things.forEach((item) => assert(partitionFunc(item) === partitionFunc(item)));
}

const testUniformity = (partitionFunc, name) => {
  const k = 100
  let things = [...Array(k).keys()].map((n) => `thing${n}`);
  let mappedHosts = things.map(partitionFunc);
  let allHosts = new Set(mappedHosts);
  let counts = [...allHosts].map(host => mappedHosts.filter((item) => item === host).length);
  console.log(
`${name} uniformity
    ${1 - (Math.max(...counts) - Math.min(...counts)) / k}`
  );
}

const testReassignments = (partitionFuncGenerator, name) => {
  let things = [...Array(100).keys()].map((n) => `thing${n}`);
  let hosts = ["hostA", "hostB", "hostC", "hostD", "hostE", "hostF"];
  let part2 = partitionFuncGenerator(hosts.slice(0, 4));
  let part3 = partitionFuncGenerator(hosts.slice(0, 5));
  let part4 = partitionFuncGenerator(hosts);

  let assignments2 = things.map(part2);
  let assignments3 = things.map(part3);
  let assignments4 = things.map(part4);

  let removalChanges = assignments3.filter((originalPartition, idx) => {
    let newPartition = assignments2[idx];
    return originalPartition != newPartition;
  });

  let additionChanges = assignments3.filter((originalPartition, idx) => {
    let newPartition = assignments4[idx];
    return originalPartition != newPartition;
  });

  console.log(
`${name} upheaval rate
    addition: ${additionChanges.length / things.length}
    removal: ${removalChanges.length / things.length}`
  );
}


testBisect()

let hosts = ["hostA", "hostB", "hostC", "hostD"];
testUniformity(partition.roundRobin(hosts), "Round-Robin");
testUniformity(partition.modK(hosts), "mod-K");
testUniformity(partition.HRW(hosts), "HRW");
testUniformity(partition.consistentHash(hosts), "ConsistentHash");

testReassignments(partition.roundRobin, "Round-Robin");
testReassignments(partition.modK, "mod-K");
testReassignments(partition.HRW, "HRW");
testReassignments(partition.consistentHash, "ConsistentHash");


// let partitioner = partition.consistentHash(["hostA", "hostB"]);
// let things = [...Array(10).keys()].map((n) => `thing${n}`);
// console.log(things.map(partitioner));
