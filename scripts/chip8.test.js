const Chip8 = require("./chip8");


test("has all his members initialized to null", () => {
//    const chip8 = chip.Chip8();
    const chip8 = Chip8();
    expect(chip8.i).toEqual(null);
    expect(chip8.sp).toEqual(null);
    expect(chip8.pc).toEqual(0x200);
    expect(chip8.delaytimer).toEqual(null);
    expect(chip8.soundtimer).toEqual(null);
});

