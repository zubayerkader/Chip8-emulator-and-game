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
    this.stack = new Uint8Array(arraybuffer);// For insturctions
    this.ip = null; //Instruction Pointer
    this.sp = null; //Stack Pointer
    this.pc = 0x200; //program counter starts at 0x200
    this.delaytimer = null;
    this.soundtimer = null;
    this.display = new Array(64*32);

}

Chip8.prototype.setIP = function(memLocation) { // set Instruction pointer
    this.ip = memLocation;
}
Chip8.prototype.getIP = function() { 
    return this.ip;
}


Chip8.prototype.setSP = function(stackLocation) { // set Stack Pointer
    this.sp = stackLocation;
}
Chip8.prototype.getSP = function() {
    return this.sp;
}


Chip8.prototype.setV = function(rnum,vnum){ // Set specific register
    this.V[rnum]=vnum;
}
Chip8.prototype.getV = function(num) {
    return this.V[num];
}


Chip8.prototype.setDelay = function() { //later to be moved to reset()
    this.delaytimer = 0;
}
Chip8.prototype.getDelay = function() {
    return this.delaytimer;
}


Chip8.prototype.setSound = function() { //later to be moved to reset()
    this.soundtimer = 0;
}
Chip8.prototype.getSound = function() {
    return this.soundtimer;
}


Chip8.prototype.setDisplay = function() { //set display to black
    for (var i = 0; i < 64*32; i++) {
    	this.display[i]=0;
    }
}


Chip8.prototype.reset = function() {
	this.delaytimer = 0; //set delay timer to 0
	this.soundtimer = 0; //set soundtimer to 0
	this.sp = 0; //stack pointer set to 0
	this.ip = 0; //instruction pointer set to 0
	this.pc = 0x200;
    for (var i = 0; i < 64*32; i++) {// set display to black
    	this.display[i]=0;
    }
    for (var i = 0; i < 16; i++) {//set all registers to 0
    	this.V[i]=0;
    }
    for (var i = 0; i < 4096; i++) {//set all mem to 0
    	this.memory[i] = 0;
    }
//tba
}


