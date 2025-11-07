// Promise API
const fs = require("fs/promises");

(async () => {
    const commandFileHandler = await fs.open("./command.txt", "r");

    const watcher = fs.watch("./command.txt");

    for await (const event of watcher) {
        if (event.eventType === "change") {
            console.log("the file was changed");
            console.log(await commandFileHandler.stat());
            // const content = await commandFileHandler.read();
            // console.log(content);
        }
    }
}) ();