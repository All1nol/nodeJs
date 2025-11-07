// we can use Promises, Callback, Synchronous API to do the same work
// but how they execute it, it is different
//stick with Promises most of the time and Callback when you need performance.
//You don't need to use synchronous api most of the time !! Stay away from it because it is blocking main thread




const fs = require('fs')

const content = fs.readFileSync("./text.txt")

console.log(content.toString("utf-8"));
 
