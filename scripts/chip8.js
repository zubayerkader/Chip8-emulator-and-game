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
    this.i = null; //Register I. The sprite pointer.
    this.sp = null; //Stack Pointer
    this.pc = 0x200; //program counter starts at 0x200
    this.delaytimer = null;
    this.soundtimer = null;
	this.display = new Array(64*32);

}

Chip8.prototype.setI = function(memLocation) { // set I
    this.i = memLocation;
}
Chip8.prototype.getI = function() { 
    return this.i;
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
	this.i = 0; //instruction pointer set to 0
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
			if (this.v[x] & 0x1) {
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
			break; 
		}
		if (opend == 0x000E) {
			if (this.v[x] & 0x8) {
				this.v[0xF] = 0x1;
			}
			this.v[x] = this.v[x] << 1;
			break;
		} 
	}
	if (opno == 0x9000) {
		if (this.v[x] != this.v[y]) {
			this.pc = this.pc + 2;
		}
		break;
	}
	if (opno == 0xA000) {
		this.i = opconl3;
		break;
	}
	if (opno == 0xB000) {
		this.pc = this.v[0x0] + opconl3;
		break;
	}
	if (opno == 0xC000) {
		this.v[x] = (Math.random()*0xFF) & opconl2;
		break;
	}
	if (opno == 0xD000) {
		this.v[0xF] = 0;
		var index;

		for (var i = 0; i < opend; i++) { // height 0x000N
			index = this.memory[this.i + i]; // Sprite location. One byte at a time.
			for (var dx = 0; dx < 8; dx++) {
				if ((index&0x80) > 0) { // 0x80 = 10000000
					if (this.display[64 * ((this.v[x]+x)%32) + ((this.v[y]+i)%64)] == 1) {
						this.v[0xF] = 1;
					}
					this.display[64 * ((this.v[x]+x)%32) + ((this.v[y]+i)%64)] ^= 1; // if pixel on display is 0 than set that pixel to 1 (0 XOR 1 = 1).
				}
				index = index << 1; // e.g. 1001 0101 = 0010 1010 & 1000 0000 fetches first MSB
			}
		}
		break;
	}
	// opno == 0xE000 need to be made after input codes is written
	if (opno == 0xF000) {
		if(opconl2 == 0x0007){
			this.v[x] = this.delaytimer;
			break;
		}
		if(opconl2 == 0x000A){
			//need to be made after input codes are written
			break;
		}
		if (opconl2 == 0x0015) {
			this.delaytimer = this.v[x];
			break;
		}
		if (opconl2 == 0x0018) {
			this.soundtimer = this.v[x];
			break;
		}
		if (opconl2 == 0x001E) {
			this.i = this.i + this.v[x];
			break;
		}
		if (opconl2 == 0x0029) {
			// need to be made after sprite is constructed
			break;
		}
		if (opconl2 == 0x0055) {
			for (var i = 0; i<= x; i++){
				this.memory[this.i + i] = this.v[i];
			}
			break;
		}
		if (opconl2 == 0x0065) {
			for (var i = 0; i<=x; i++){
			this.memory[this.i + i] = this.v[i];
			}		
		}
	}

	break;
	//insert error code if opcode is not recognized
	
}