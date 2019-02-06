//No getter and setter for memory?
//Display's setter only for 0?
//Cant setV to the value since V is not necessarily defined
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
    return this;
}

module.exports = Chip8;

Chip8.prototype.setI = function(memLocation) { // set I
    this.i = memLocation;
    return this;
}
Chip8.prototype.getI = function() { 
    return this.i;
}


Chip8.prototype.setSP = function(stackLocation) { // set Stack Pointer
    this.sp = stackLocation;
    return this;
}

Chip8.prototype.getSP = function() {
    return this.sp;
}


Chip8.prototype.setV = function(rnum,vnum){ // Set specific register
    this.V[rnum]=vnum;
    return this;
}

Chip8.prototype.getV = function(num) {
    return this.V[num];
}

Chip8.prototype.setDelay = function() { //later to be moved to reset()
    this.delaytimer = 0;
    return this;
}

Chip8.prototype.getDelay = function() {
    return this.delaytimer;
}


Chip8.prototype.setSound = function() { //later to be moved to reset()
    this.soundtimer = 0;
    return this;
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
        display.fill(0);
        V.fill(0);
        memory.fill(0);

//tba
}

Chip8.prototype.emulateCycle = function () {
	var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
	var x = (opcode & 0x0F00) >> 8;
 	var y = (opcode & 0x00F0) >> 4;
	var opno = opcode & 0xF000;
	var opend = opcode & 0x000F;
	var opconl2 = opcode & 0x00FF;
	var opconl3 = opcode & 0x0FFF; 
	this.pc = this.pc + 2;
	if (opno == 0x0000){
		//opode 00E0: 
		//Clears the display
		if(opend == 0x0){
			for (var i = 0; i<64*32; i++){
				this.display[i]=0;
				return;
			}
		}
		//opcode 00EE:
		//Returns form the subroutine setting the program counter to the top of the stack
		if(opend == 0xE){
			this.sp = this.sp-1;
			this.pc = this.stack[this.sp]
			return;
		}
	}
	//opcode 1NNN:
	//Jumps to location NNN by setting the program counter
	if (opno == 0x1000){
		this.pc == opconl3;
		return;
	}
	//opcode 2NNN:
	//Calls the subroutine at NNN, 
	if (opno == 0x2000) {
		this.stack[this.sp] = this.pc;
		this.sp = this.sp+1;
		this.pc = opconl3;
		return;
	}
	//opcode 3xNN:
	//Skip the next instruction if V[x] = NN
	if (opno == 0x3000){
		if(this.v[x] == opconl2){
			this.pc = this.pc + 2;
		}
		return;
	}
	//opcode 4xNN:
	//Skip the next instruction if V[x] != NN
	if (opno == 0x4000){
		if(this.v[x] != opconl2){
			this.pc = this.pc + 2;
		}
		return;
	}
	//opcode 5xy0
	//Skip the next instuction if V[x] = V[y]
	if (opno == 0x5000){
		if(this.v[x] == this.v[y]){
			this.pc = this.pc + 2;
		}
	}
	//opcode 6xNN
	//set V[x] = NN
	if (opno == 0x6000){
		this.v[x] = opconl2;
	}
	//opcode 7xNN
	//set V[x] = V[x] + NN
	if (opno == 0x7000){
		this.v[x] = this.v[x] + opconl2;
		//might have conditions tied to it (such as if size exceeds emulator parameters)
	}
	if (opno == 0x8000){
		//opcode 8xy0
		//set V[x] = V[y]
		if (opend == 0x0000) {
			this.v[x] = this.v[y];
			return;
		}
		//opcode 8xy1
		//set V[x] = V[x] or V[y]
		if (opend == 0x0001) {
			this.v[x] = this.v[x] | this.v[y];
			return;
		}
		//opcode 8xy2
		//set V[x] = V[x] and V[y]
		if (opend == 0x0002) {
			this.v[x] = this.v[x] & this.v[y];
			return;
		}
		//opcode 8xy3
		//set V[x] = V[x] xor V[y]
		if (opend == 0x0003) {
			this.v[x] = this.v[x] ^ this.v[y];
			return;

		}
		//opcode 8xy4
		//set V[x] = V[x] + V[y] 
		//V[F] = carry of V[x] + V[y]
		if (opend == 0x0004) {
			this.v[x] = this.v[x] + this.v[y];
			if(this.v[x]>255){
				this.v[0xF]= 1;
			}
			return;

		}
		//opcode 8xy5
		//set V[x] = V[x] - V[y]
		// if V[x] > V[y] then V[0xF] = 1
		if (opend == 0x0005) {
			if(this.v[x]>this.v[y]){
				this.v[0xF] = 0x1;
			}
			this.v[x] = this.v[x] - this.v[y];
		}
		//opcode 8xy6
		//set V[x] = V[x] >> 1 
		if (opend == 0x0006) {
			if (this.v[x] & 0x1) {
				this.v[0xF] = 0x1;
			}
			this.v[x] = this.v[x] >> 1;
			return;
		}
		//opcode 8xy7 
		//set V[x] = V[y] - V[x]
		//if V[y] > V[x] then V[0xF]
		if (opend == 0x0007) {
			this.v[x] = this.v[y] - this.v[x];
			if (this.v[y] > this.v[x]) {
				this.v[0xF] = 0x1;
			}
			return; 
		}
		//opcode 8xyE
		//set V[x] = V[x] << 1
		if (opend == 0x000E) {
			if (this.v[x] & 0x8) {
				this.v[0xF] = 0x1;
			}
			this.v[x] = this.v[x] << 1;
			return;
		} 
	}
	//opcode 9xy0
	// skip next instruction if V[x] != V[y]
	if (opno == 0x9000) {
		if (this.v[x] != this.v[y]) {
			this.pc = this.pc + 2;
		}
		return;
	}
	//opcode ANNN
	//set ip = NNN
	if (opno == 0xA000) {
		this.i = opconl3;
		return;
	}
	//opcode BNNN
	//set pc = V[0] + NNN
	if (opno == 0xB000) {
		this.pc = this.v[0x0] + opconl3;
		return;
	}
	//opcode CxNN
	//Set V[x] = random byte & NN
	if (opno == 0xC000) {
		this.v[x] = (Math.random()*0xFF) & opconl2;
		return;
	}
	//opcode Dxyn
	//Display a N-byte sprite starting at memory locaiton I at (V[x],V[y])
	//set V[0xF] = 1
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
		return;
	}

	// opno == 0xE000 need to be made after input codes is written
	

	if (opno == 0xF000) {
		//opcode Fx07
		//set V[x] = Delay timer
		if(opconl2 == 0x0007){
			this.v[x] = this.delaytimer;
			return;
		}

		//opcode Fx0A need to be made after input codes
		if(opconl2 == 0x000A){
			//need to be made after input codes are written
			return;
		}
		//opcode Fx15
		//set Delay timer = V[x]
		if (opconl2 == 0x0015) {
			this.delaytimer = this.v[x];
			return;
		}
		//opcode Fx18
		//Set Sound timer = V[x]
		if (opconl2 == 0x0018) {
			this.soundtimer = this.v[x];
			return;
		}
		//opcode Fx1E
		//Set I = I + V[x]
		if (opconl2 == 0x001E) {
			this.i = this.i + this.v[x];
			return;
		}
		//opcode Fx29
		//Set I = the location of the sprite for digit V[x]
		if (opconl2 == 0x0029) {
			// need to be made after sprite is constructed
			return;
		}
		//opcode Fx55
		// store registers V[0] through V[x] into memory from address ip
		if (opconl2 == 0x0055) {
			for (var i = 0; i<= x; i++){
				this.memory[this.i + i] = this.v[i];
			}
			return;
		}
		//opcode Fx65
		//read the registers V[0] through V[x] from memory starting at address ip
		if (opconl2 == 0x0065) {
			for (var i = 0; i<=x; i++){
			this.memory[this.i + i] = this.v[i];
			}		
		}
	}

	return;
	//insert error code if opcode is not recognized
	
}
