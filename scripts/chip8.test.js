
const Chip8 = require("./chip8");


test("Testing Initial Conditions", () => {
    const chip8 = Chip8();
    expect(chip8.i).toEqual(null);
    expect(chip8.sp).toEqual(null);
    expect(chip8.pc).toEqual(0x200);
    expect(chip8.delaytimer).toEqual(null);
    expect(chip8.soundtimer).toEqual(null);
    expect(chip8.memory).toBeInstanceOf(Uint8Array);
    expect(chip8.memory).toHaveLength(4096);
    expect(chip8.v).toBeInstanceOf(Uint8Array);
    expect(chip8.v).toHaveLength(16);
    expect(chip8.stack).toBeInstanceOf(Uint8Array);
    expect(chip8.stack).toHaveLength(16);
    expect(chip8.display).toBeInstanceOf(Array);
    expect(chip8.display).toHaveLength(64 * 32);
    expect(chip8.running).toEqual(false);
});

test("Test reset function. Sets all values to 0", () => {
    const resetTest = Chip8.prototype.reset();
    expect(resetTest.i).toEqual(0);
    expect(resetTest.sp).toEqual(0);
    expect(resetTest.pc).toEqual(0x200);
    expect(resetTest.delaytimer).toEqual(0);
    expect(resetTest.soundtimer).toEqual(0);
    expect(resetTest.running).toEqual(false);
    for (let i = 0; i < resetTest.displayLength; i++) {
      expect(resetTest.display[i]).toEqual(0);
    }
    for (let i = 0; i < resetTest.vLength; i++) {
      expect(resetTest.v[i]).toEqual(0);
    }
    for (let i = 0x200; i < resetTest.memoryLength; i++) {
      expect(resetTest.memory[i]).toEqual(0);
    }
});

test("Test setI function. Set i to memory location", () => {
    const v = 0xff;
    const testI = Chip8.prototype.setI(v);
    expect(testI.i).toEqual(v);
    expect(testI.i).not.toEqual(Chip8.prototype.reset());
});
/*
test("Test setV function. Set v[rnum] register to value vnum", () => {
    const rnum = 0;
    const vnum = 0xff;
    const testV = Chip8.prototype.setV(rnum, vnum);
    expect(testV.v[rnum]).toEqual(vnum);
//    expect(testV.v[rnum]).not.toEqual(Chip8.prototype.reset());
});
*/
test("Test setDelay function. Set delaytimer to 0", () => {
    const delayTest = Chip8.prototype.setDelay();
    expect(delayTest.delaytimer).toEqual(0);
  });

  test("Test setSP function. Set Stack Pointer to Stack Location", () => {
    const memLoc = 0xff;
    const testSP = Chip8.prototype.setSP(memLoc);
    expect(testSP.sp).toEqual(memLoc);
  });

  test("Test setSound function. Set sound to 0", () => {
    const soundTest = Chip8.prototype.setSound();
    expect(soundTest.soundtimer).toEqual(0);
  });
