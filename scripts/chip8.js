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

function emulateCycle () {
	//opcode read in 
	//var x =
	//var y =
	//var opno = command number
	//var opend = command number distinction
	//var opconl3 = eg.1kkk 
	//var opconl2 =  eg 3xkk
	this.pc = this.pc + 2;
	if (opno == 0x0000){
		if(opend == 0x0){
			for (var i = 0; i<64*32; i++){
				this.display[i]=0;
				break;
			}
		}
		if(opend == 0xE){
			this.sp = this.sp-1;
			this.pc = this.stack[this.sp]
			break;
		}
	}
	if (opno == 0x1000){
		this.pc == opconl3;
		break;
	}
	if (opno == 0x2000) {
		this.stack[this.sp] = this.pc;
		this.sp = this.sp+1;
		this.pc = opconl3;
		break;
	}
	if (opno == 0x3000){
		if(this.v[x] == opconl2){
			this.pc = this.pc + 2;
		}
		break;
	}
	if (opno == 0x4000){
		if(this.v[x] != opconl2){
			this.pc = this.pc + 2;
		}
		break;
	}
	if (opno == 0x5000){
		if(this.v[x] == this.v[y]){
			this.pc = this.pc + 2;
		}
	}
	if (opno == 0x6000){
		this.v[x] = opconl2;
	}
	if (opno == 0x7000){
		this.v[x] = this.v[x] + opconl2;
		//might have conditions tied to it (such as if size exceeds emulator parameters)
	}
	if (opno == 0x8000){
		if (opend == 0x0000) {
			this.v[x] = this.v[y];
			break;
		}
		if (opend == 0x0001) {
			this.v[x] = this.v[x] | this.v[y];
			break;
		}
		if (opend == 0x0002) {
			this.v[x] = this.v[x] & this.v[y];
			break;
		}
		if (opend == 0x0003) {
			this.v[x] = this.v[x] ^ this.v[y];
			break;

		}
		if (opend == 0x0004) {
			this.v[x] = this.v[x] + this.v[y];
			if(this.v[x]>255){
				this.v[0xF]= 1;
			}
			break;

		}
		if (opend == 0x0005) {
			if(this.v[x]>this.v[y]){
				this.v[0xF] = 0x1;
			}
			this.v[x] = this.v[x] - this.v[y];
		}
		if (opend == 0x0006) {
			if (this.[x] & 0x1) {
				this.v[0xF] = 0x1;
			}
			this.v[x] = this.v[x] >> 1;
			break;
		}
		if (opend == 0x0007) {
			this.v[x] = this.v[y] - this.v[x];
			if (this.v[y] > this.v[x]) {
				this.v[0xF] = 0x1;
			} 
		}
		if (opend == 0x000E) {
			if (this.[x] & 0x8) {
				this.v[0xF] = 0x1;
			}
			this.v[x] = this.v[x] << 1;
		} 
		

	}
}