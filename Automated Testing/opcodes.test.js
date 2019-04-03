opcodes =  require("./opcodes.js");

test('Test Opcode 00E0. Clears the screen', () => {
    expect( opcodes.opcode0x00E0([3, 7, 6, 2], false)).toEqual([0, 0, 0, 0], true);
  });

  test('Test Opcode 0x00EE. Returns from a subroutine', () => {
    expect(  opcodes.opcode0x00EE(1, 0, [0, 1])).toBe(0, 0);
  });
  
  test('Test Opcode 0x1NNN. Jumps to address NNN.', () => {
    for(let i=0; i<0xFFF; i++){
      expect(  opcodes.opcode0x1NNN(0, i|0x1000)).toBe(i & 0x0FFF);
    }
  });
  
  test('Test Opcode 0x2NNN. Calls subroutine at NNN.', () => {
    expect(  opcodes.opcode0x2NNN([0, 0, 0, 0], 0, 5, 0xFFFF)).toEqual([5, 0, 0, 0], 1, 0x0FFF);
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x3XNN. Skips the next instruction if VX equals NN.', () => {
    for(let x=0; x < 0xF; x++){
      for(let k=0; k < 0xFF; k++){
        if (x == k){
          expect(  opcodes.opcode0x3XNN(registers, 0x3000 | (x << 8) | k , 0)).toBe(2);
        }
        else{
          expect(  opcodes.opcode0x3XNN(registers, 0x3000 | (x << 8) | k , 0)).toBe(0);
        }
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x4XNN. 	Skips the next instruction if VX doesnt equal NN.', () => {
    for(let x=0; x < 0xF; x++){
      for(let k=0; k < 0xFF; k++){
        if (x == k){
          expect(  opcodes.opcode0x4XNN(registers, x, 0x4000 | (x << 8) | k , 0)).toBe(0);
        }
        else{
          expect(  opcodes.opcode0x4XNN(registers, x, 0x4000 | (x << 8) | k , 0)).toBe(2);
        }
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x5XY0. Skips the next instruction if VX equals VY.', () => {
    for(let x=0; x < 0xF; x++){
      for(let y=0; y < 0xF; y++){
        if (x == y){
          expect(  opcodes.opcode0x5XY0(registers, x, y, 0)).toBe(2);
        }
        else{
          expect(  opcodes.opcode0x5XY0(registers, x, y, 0)).toBe(0);
        }
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x6XNN. Sets VX to NN.', () => {
    for(let x=0; x < 0xF; x++){
      for(let k=0; k < 0xFF; k++){
        expect(  opcodes.opcode0x6XNN(registers, x, 0x6000 | (x << 8) | k)).toBe(k);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x7XNN. Adds NN to VX.', () => {
    for(let x=0; x < 0xF; x++){
      for(let k=0; k < 0xFF; k++){
        expect(  opcodes.opcode0x7XNN(0x7000 | (x << 8) | k, registers, x)).toBe((k + x) % 256);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x8XY0. Sets VX to the value of VY.', () => {
    for(let x=0; x<0xF; x++){
      for(let y=0; y<0xF; y++){
        expect(  opcodes.opcode0x8XY0(registers, x, y)).toBe(y);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x8XY1. Sets VX to VX or VY. (Bitwise OR operation).',()=>{
    for (let x=0; x<0xF; x++){
      for (let y=0; y<0xF; y++){
        expect(  opcodes.opcode0x8XY1(x, y, registers)).toBe(x | y);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x8XY2. Sets VX to VX and VY. (Bitwise AND operation).',()=>{
    for (let x=0; x<0xF; x++){
      for (let y=0; y<0xF; y++){
        expect(  opcodes.opcode0x8XY2(x, y, registers)).toBe(x & y);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x8XY3. Sets VX to VX xor VY.',()=>{
    for (let x=0; x<0xF; x++){
      for (let y=0; y<0xF; y++){
        expect(  opcodes.opcode0x8XY3(x, y, registers)).toBe(x ^ y);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x8XY4. Adds VY to VX. VF is set to 1 when theres a carry, and to 0 when there isnt.',()=>{
    for (let x=0; x<0xF; x++){
      for (let y=0; y<0xF; y++){
        expect(  opcodes.opcode0x8XY4(x, y, registers)).toBe(x + y);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x8XY5. VY is subtracted from VX. VF is set to 0 when theres a borrow, and 1 when there isnt.',()=>{
    for (let x=0; x<0xF; x++){
      for(let y=0; y<0xF; y++){
        expect(  opcodes.opcode0x8XY5(x, y, registers)).toBe(x - y);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x8XY6. Stores the least significant bit of VX in VF and then shifts VX to the right by 1.',()=>{
    for (let x=0; x<0xF; x++){
      expect(  opcodes.opcode0x8XY6(x, registers)).toEqual(x/2);
      registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    }  
  });
  
  test('Test Opcode 0x8XY7. Sets VX to VY minus VX. VF is set to 0 when theres a borrow, and 1 when there isnt.',()=>{
    for (let x=0; x<0xF; x++){
      for(let y=0; y<0xF; y++){
        expect(  opcodes.opcode0x8XY7(x, y, registers)).toBe(y - x);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });

  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x8XYE. Stores the most significant bit of VX in VF and then shifts VX to the left by 1.', () => {
    for (let x=0; x<0xF; x++){
      expect(  opcodes.opcode0x8XYE(registers, x, 0)).toEqual(0);
      registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0x9XY0. Skips the next instruction if VX doesnt equal VY.', () => {
    for (let x=0; x<0xF; x++){
      for (let y=0; y<0xF; y++){
        if (x == y){
          expect(  opcodes.opcode0x9XY0(registers, x, y, 0)).toEqual(0);
        }
        else{
          expect(  opcodes.opcode0x9XY0(registers, x, y, 0)).toEqual(2);
        }
      }
    }
  });

  test('Test Opcode 0xANNN. Sets I to the address NNN.', () => {
    for (let n=0; n<0x1000; n++){
      expect(  opcodes.opcode0xANNN(0, 0xA000 | n)).toBe(n);
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0xBNNN. Jumps to the address NNN plus V0.', () => {
    for (let x=0; x<0x100; x++){
      registers = [x,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      for (let n=0; n<0x1000; n++){
        expect(  opcodes.opcode0xBNNN(registers, 0xB000 | n, 0)).toBe(x+n);
      }
    }
  });

  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0xCXNN. Sets VX to the result of a bitwise and operation on a random number (Typically: 0 to 255) and NN.',()=>{
    for (let x = 0; x < 0xF; x++){
      for (let n = 0; n < 0x100; n++){
        expect( opcodes.opcode0xCXNN(x, 0xC000 | (x<<8) | n, registers)).toBe(n);
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  keys = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  test('Test Opcode 0xEX9E. Skips the next instruction if the key stored in VX is pressed. (Usually the next instruction is a jump to skip a code block).', () => {
    for (let x=0; x<0xF; x++){
      for (let k=0; k<0xF; k++){
        keys[k] = 1;
        if (k == x){
          expect(  opcodes.opcode0xEX9E(0xE09E | (x << 8), 0, registers, keys)).toBe(2);
        }
        else{
          expect(  opcodes.opcode0xEX9E(0xE09E | (x << 8), 0, registers, keys)).toBe(0);
        }
        keys = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  keys = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  test('Test Opcode 0xEXA1. Skips the next instruction if the key stored in VX isnt pressed. (Usually the next instruction is a jump to skip a code block).', () => {
    for (let x=0; x<0xF; x++){
      for (let k=0; k<0xF; k++){
        keys[k] = 1;
        if (k != x){
          expect(  opcodes.opcode0xEXA1(0xE0A1 | (x << 8), 0, registers, keys)).toBe(2);
        }
        else{
          expect(  opcodes.opcode0xEXA1(0xE0A1 | (x << 8), 0, registers, keys)).toBe(0);
        }
        keys = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0xFX07. Sets VX to the value of the delay timer.', () => {
    for(let x=0; x<0xF; x++){
      registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      expect(  opcodes.opcode0xFX07(0xF007 | (x<<8), registers, x)).toBe(x);
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0xFX15. Sets the delay timer to VX.', () => {
    for (let x=0; x<0xF; x++){
      expect(  opcodes.opcode0xFX15(0xF015 | (x<<8), 0, registers)).toBe(x);
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0xFX18. Sets the sound timer to VX.', () => {
    for (let x=0; x<0xF; x++){
      expect(  opcodes.opcode0xFX18(0xF018 | (x<<8), 0, registers)).toBe(x);
    }
  });

  // FX0A, DXYN
 
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0xFX1E. Adds VX to I.',() =>{
    for (let x=0; x<0xF; x++){
      for (let i=0; i<0x100; i++){
        registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        expect(  opcodes.opcode0xFX1E(i, registers, 0xF01E| (x<<8))).toBe(x+i);
      }
    }
  });
  
  registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  test('Test Opcode 0xFX29. Sets I to the location of the sprite for the character in VX. Characters 0-F (in hexadecimal) are represented by a 4x5 font.',() =>{
    for (let x=0; x<0xF; x++){
      registers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      for (let n=0; n<0x100; n++){
        registers[x] = n;
        expect(  opcodes.opcode0xFX29(0x100, registers, x)).toBe(n);
      }
    }
  });
  
  test('Test Opcode 0xFX33. Stores the binary-coded decimal representation of VX, with the most significant of three digits at the address in I, the middle digit at I plus 1, and the least significant digit at I plus 2.',() =>{
    expect(  opcodes.opcode0xFX33([10,15,20,25,30],1,[12,24,36],2)).toEqual([10,0.36,3.6,6,30])
  });
  
  test('Test Opcode 0xFX55. Stores V0 to VX (including VX) in memory starting at address I. The offset from I is increased by 1 for each value written, but I itself is left unmodified.',() =>{
    expect(  opcodes.opcode0xFX55([30,30,50,60,70],1,[5,6,7,8,9],2)).toEqual([30,5,6,7,70])
  });
  
  test('Test Opcode 0xFX65. Fills V0 to VX (including VX) with values from memory starting at address I. The offset from I is increased by 1 for each value written, but I itself is left unmodified.',()=>{
    expect(  opcodes.opcode0xFX65([5,10,15,20,25,30],3,[6,7,8,9,10,12,15,17],3)).toEqual([6,7,8,5,10,15,20,17])
  });
  
 
