const matchAll = require("match-all");
console.log(matchAll(process.argv[2], /img src="(\S+)"/g).toArray()[0]);