const fs = require ("fs/promises");
const path = require("path");
const { RetryAgent } = require("undici-types");

//open (file descriptor) just number assigned to files we want to read 
//  file then able to read or write

//watcher
(async () => {
    //commands 
    const CREATE_FILE = "create a file" 
    const DELETE_FILE = "delete a file" 
    const RENAME_FILE = "rename a file" 
    const UPDATE_FILE = "update a file" 
    
    const createFile =async (path) => {
        try{
        const existingFileHandle = await fs.open(path, "r")
        existingFileHandle.close()

        return console.log(`The file ${path} already exists`);
        } catch (e) {
            const newFile = await fs.open(path, "w")
            console.log("A new file was successfully created");
            newFile.close()
        }      

    };

    const deleteFile = async (path) => {
        console.log(`Deleting ${path}...`);
        try{
        await fs.rm(path)  //unlink()
        console.log("File deleted");
        } catch (e) {
            console.log("file already deleted");
        }        
    }

    const renameFile = async (oldPath , newPath) => {
        console.log(`Renaming ${oldPath} to ${newPath}`);
        try{
            await fs.rename(oldPath, newPath)
        } catch (e) {
            console.log("Couldn't rename file");
            
        }
    }

    let addedContent; 
    const updateFile = async(path, content) => {
        if( addedContent = content ) return; 
        try {
            const fileHandle = await fs.open(path, "a");
            fileHandle.write(content);
            addedContent= content; 
            console.log("the content was added successfully");
        } catch (e) {
            console.log("an error occured while removing the file");
            
        }
    }

    const commandFileHandler = await fs.open("command.txt", "r") 

    const watcher = fs.watch("./command.txt");
    commandFileHandler.on("change", async () => {
        console.log("The file was changed");
        //get size
        const size = (await commandFileHandler.stat()).size;
        //the location at which we want to start filling our buffer
        const offset = 0;
        //allocate our vugger with the size of the file
        const buff=  Buffer.alloc(size)
        //how many bytes we want to read
        const length = buff.byteLength;
        //from which position
        const position = 0;
    
        await commandFileHandler.read(buff, offset, length, position)
        
        //decoder  
        const command = buff.toString("utf-8"); //default 
        
        //create a file: <path>
        if(command.includes(CREATE_FILE)){
            const filePath = command.substring(CREATE_FILE.length +1 );
            createFile(filePath);
        }

        //delete file <path>
        if(command.includes(DELETE_FILE)){
            const filePath = command.substring(DELETE_FILE.length + 1)
            deleteFile(filePath)
        }

        if(command.includes(RENAME_FILE)){
            const _idx = command.indexOf(" to ")
            const filePath = command.substring(RENAME_FILE.length +1, _idx)
            const content = command.substring(_idx + 4);
            renameFile(filePath, content)
        }

        if(command.includes(UPDATE_FILE)){
            const _idx = command.indexOf(" this content: ");
            const filePath = command.substring(UPDATE_FILE.length + 1, _idx)
            const content = command.substring(_idx + 15);

            UPDATE_FILE(filePath, content)
        }
    })

    for await (const event of watcher) {
        if(event.eventType === "change"){
            commandFileHandler.emit("change")
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