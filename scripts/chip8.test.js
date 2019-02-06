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
    expect(chip8.V).toBeInstanceOf(Uint8Array);
    expect(chip8.V).toHaveLength(16);
    expect(chip8.stack).toBeInstanceOf(Uint8Array); // Conflict. Datatype -> Array
    expect(chip8.stack).toHaveLength(16); // Conflict. Length -> 0
    expect(chip8.display).toBeInstanceOf(Array);
    expect(chip8.display).toHaveLength(64 * 32);
});

