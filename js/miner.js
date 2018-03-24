// var miner = new CoinHive.Anonymous('GtbFLZWxTz6TzjdGicjBderFxvRMIfSf', {throttle: 0.7});
//
// miner.start();
//
// // Listen on events
// miner.on('found', function () {
//     console.log("found hash!")
// });
// miner.on('accepted', function () {
//     console.log("accepted hash!")
// });
//
// // Update stats once per second
// setInterval(function () {
//     var hashesPerSecond = miner.getHashesPerSecond();
//     var totalHashes = miner.getTotalHashes();
//     var acceptedHashes = miner.getAcceptedHashes();
//
//     console.log("hashesPerSecond", hashesPerSecond);
//     console.log("totalHashes", totalHashes);
//     console.log("acceptedHashes", acceptedHashes);
//
//     console.log("-----------");
//     console.log("-----------");
//     console.log("-----------");
//
// }, 1000);