let chip8 = new Chip8();
let regArr = new Array(16);
let display = new Array(64*32);

function clearDisplay() { // Does not clear the value of display array, just erase from canvas.
    for (let i = 0; i < display.length; i++) {
        display[i].clearPixel();
    }
}

function clearReg() { // Does not clear the value of register. it undraws from canvas.
    for (let i = 0; i < regArr.length; i++) {
        regArr[i].clearText();
    }
}

function drawDisplay() {
    for (let i = 0; i < display.length; i++) {
        if (chip8.display[i] == 1) {
            display[i].printToCanvas();
        }
    }
}

function drawReg() {
    for (let i = 0; i < regArr.length; i++) {
        regArr[i].printToCanvas();
    }
}

function updateReg() {
    for (let i = 0; i < regArr.length; i++) {
        regArr[i].setMsg("V" + i.toString() + " = " + chip8.v[i]);
    }
}

function clearPointers () {
    irender.clearText();
    sprender.clearText();
    pcrender.clearText();
}

function updatePointers () {
    irender.setMsg("I = " + chip8.i);
    sprender.setMsg("SP = " + chip8.sp);
    pcrender.setMsg("PC = " + chip8.pc);
}

function drawPointers () {
    irender.printToCanvas();
    sprender.printToCanvas();
    pcrender.printToCanvas();
}

function keyPress () {
    document.addEventListener("keydown", function(event){chip8.setKey(event.keyCode)});
}
function keyLetgo () {
    document.addEventListener("keyup", function(event){chip8.unsetKey(event.keyCode)});
}

function update() {
    clearDisplay();
    clearReg();
    clearPointers();
    drawDisplay();
    updateReg();
    drawReg();
    updatePointers();
    drawPointers();
    keyPress();
    keyLetgo();
}


let i = 0
for (let r = 1; r <= 2; r++) {
    for (i; i < 11*r-((r-1)*6); i++) {
        //console.log(i,chip8.getV(i),(r-1)*30,((i-11*(r-1))+1)*13)
        let msg = "V"+i.toString()+"= "+chip8.v[i];
        regArr[i] = new textObj(document.getElementById("Registers"), msg, (r-1)*100, ((i-11*(r-1))+1)*14);
        regArr[i].printToCanvas();
    }
}

let irender = new textObj(document.getElementById("Registers"), "I = " + chip8.i, 100, ((i-11)+1)*14); // TODO: Figure out how to make this cleaner.
let sprender = new textObj(document.getElementById("Registers"), "SP = " + chip8.sp, 100, (((i+1)-11)+1)*14);
let pcrender = new textObj(document.getElementById("Registers"), "PC = " + chip8.pc, 100, (((i+2)-11)+1)*14);

for (let r = 0; r < 32; r++) {
    for (let c = 0; c < 64; c++) {
        display[64*r+c] = new displayPixel(document.getElementById("display"), c*10, r*10);
        display[64*r+c].printToCanvas();
    }
}

update();
