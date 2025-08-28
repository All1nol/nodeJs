const {Buffer} = require("buffer")

const buffer = Buffer.alloc(10000,0)  //normal slow version

const fastAlloc = Buffer.allocUnsafe(10000) //fast allocation

const newBuffer = Buffer.allocUnsafeSlow(2) // new buffer created instead of already allocated buffer

for(let i =0; i < fastAlloc.length; i++){
if(fastAlloc[i] !== 0){
        console.log(`Elements at position ${i} has value: ${fastAlloc[i].toString("2")}`);  //take decimal and show it in binary 
    }
}

//safe option but still use allocUnsafe
Buffer.from()
Buffer.concat()


 