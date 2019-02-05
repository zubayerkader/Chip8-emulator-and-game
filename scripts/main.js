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
        regArr[i].setMsg("V" + i.toString() + " = " + chip8.getV(i));
    }
}

function update() {

    clearDisplay();
    clearReg();
    drawDisplay();
    updateReg();
    drawReg();
    setInterval(update,100);
}


let i = 0
for (let r = 1; r <= 2; r++) {
    for (i; i < 11*r-((r-1)*6); i++) {
        //console.log(i,chip8.getV(i),(r-1)*30,((i-11*(r-1))+1)*13)
        let msg = "V"+i.toString()+"= "+chip8.getV(i);
        regArr[i] = new textObj(document.getElementById("Memory"), msg, (r-1)*100, ((i-11*(r-1))+1)*14);
        regArr[i].printToCanvas();
    }
}

for (let r = 0; r < 32; r++) {
    for (let c = 0; c < 64; c++) {
        display[64*r+c] = new displayPixel(document.getElementById("display"), c*10, r*10);
        display[64*r+c].printToCanvas();
    }
}

update();
