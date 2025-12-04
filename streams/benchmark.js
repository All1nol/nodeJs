//benchmarking writing millions times to a file
// console.time("writeMany")
// const fs = require("fs/promises");

// const writeNumbers = async () => {
//     let i = 1;
//     const file = await fs.open("numbers.txt", "w");

//     try {
//         while (i <= 1000000) {
//             await file.write(` ${i} `);
//             i++;
//         }
//     } finally {
//         await file.close();
//     }

//     console.log("Finished writing 1,000,000 numbers!");
//     console.timeEnd("writeMany");
// };

// writeNumbers().catch(console.error);

// Finished writing 1,000,000 numbers!
// writeMany: 41.334s
// CPU: 6%

// const fs = require("node:fs");

// console.time("writeMany");

// const writeNumbers = async () => {
//     const fd = fs.openSync("numbers.txt", "w");

//     try {
//         for (let i = 1; i <= 1000000; i++) {
//             const buff = Buffer.from(` ${i} `, "utf-8");
//             fs.writeSync(fd, buff);
//         }
//     } finally {
//         fs.closeSync(fd);
//     }

//     console.log("Finished writing 1,000,000 numbers!");
//     console.timeEnd("writeMany");
// };

// writeNumbers();

// Finished writing 1,000,000 numbers!
// writeMany: 4.474s


//Callback
// Finished writing 1,000,000 numbers!
// writeMany: 1.763s




const fs = require("node:fs");

(async () => {
    console.time("writeMany");

    fs.open("test.txt", "w", (err, fd) => {
        for( let i = 0; i < 1000000; i++){
            const buff =Buffer.from(` ${i} `, "utf-8");
            fs.writeSync(fd, buff);
        }
        console.timeEnd("writeMany");
    });
}) ();