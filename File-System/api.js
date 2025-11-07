// Promise API
const fsp = require("fs/promises");

(async () => {
    try {
        await fsp.copyFile("command.txt", "copied-promise.txt");
    }  catch(error){
        console.log(error);
    }
}) ();

// Callback API
const fsc = require("fs");

fsc.copyFile("command.txt","copied-callback.txt", (error)=> {
    if(error) console.log(error);
});

// Synchronous API
const fss = require("fs");

fss.copyFile("command.txt", "copied-sync.txt")