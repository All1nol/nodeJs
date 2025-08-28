const EventEmitter = require("events")

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", ()=>{
    console.log("An event occured 1");
})

myE.on("foo", ()=>{
    console.log("An event occured 2");
})

myE.once("foo", (x)=>{
    console.log("An event with a parameter occured:");
    console.log(x);
})

myE.on("bar", ()=>{
    console.log("An event occurred bar");
    
})

myE.emit('foo', "5");
myE.emit('foo', "5");
myE.emit('foo', "5");
myE.emit('foo', "5");
myE.emit("bar")