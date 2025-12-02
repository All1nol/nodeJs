const fs = require ("fs/promises");

//open (file descriptor) just number assigned to files we want to read 
//  file then able to read or write


(async () => {
    const commandFileHandler = await fs.open("command.txt", "r") 

    const watcher = fs.watch("./command.txt");
    
    for await (const event of watcher) {
        if(event.eventType === "change"){
            console.log("The file was changed");
            //get size
            const size = (await commandFileHandler.stat()).size;
            const offset = 0;
            const buff=  Buffer.alloc(size)
            const length = buff.byteLength;
            const position = 0;

            const content = await commandFileHandler.read(buff, offset, length, position)
            console.log(content);
              
        }
    }
}) ();





// The file was changed
// [Object: null prototype] {
//   bytesRead: 0,
//   buffer: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 16334 more bytes>
// }


// The file was changed
// [Object: null prototype] {
//   bytesRead: 13,
//   buffer: <Buffer 20 6e 65 77 20 63 6f 6e 74 65 6e 74 73>
// }