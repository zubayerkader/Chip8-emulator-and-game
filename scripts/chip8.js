function Chip8() { // Constructor, ex. var chip8 = new Chip8();

    // Reserves 4096 bytes of memory.
    var arraybuffer = new ArrayBuffer(4096);

    // To read and write into ArrayBuffer, we create a DataView.
    // The Uint8Array(unsigned 8 bit in array) allows us to see only 8 bits at a time.
    // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
    this.memory = new Uint8Array(arraybuffer);

    // Chip8 has 16 8 bit data registers. 
    arraybuffer = new ArrayBuffer(16);

    // registers named from 0 to 15.
    // The last register is the carry flag
    this.V = new Uint8Array(arraybuffer);
    this.stack = new Uint8Array(arraybuffer);
    this.ip = null;
    this.sp = null;
    this.delaytimer = null;
    this.soundtimer = null;

    this.display = new Array(64*32);

}

Chip8.prototype.setIP = function (memLocation) { // Example of a method
    this.ip = memLocation;
}

Chip8.prototype.getV = function (num) {
    return this.V[num];
}


