let chip8 = new Chip8();
let regArr = new Array(16);
let display = new Array(64*32);
let stack = [];

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

//function keyPress () {
//    document.addEventListener("keydown", function(event){chip8.setKey(event.keyCode)});
//}
//function keyLetgo () {
//    document.addEventListener("keyup", function(event){chip8.unsetKey(event.keyCode)});
//}

function update() {
    clearDisplay();
    clearReg();
    clearPointers();
    drawDisplay();
    updateReg();
    drawReg();
    updatePointers();
    drawPointers();

    instructionrender.clearText();
    instructionrender.setMsg("instruction = " + chip8.instruction);
    instructionrender.printToCanvas();

    console.log(this.instruction);

    //keyPress();
    //keyLetgo();
}

function runningFunction() 
{
    for (let i = 0; i < 5; i++) //run 8 lines of opcodes and let the rest of the code run too. We dont have threading.
    {
        if (chip8.running) 
        {
            chip8.emulateCycle();

            if (chip8.delaytimer > 0)
                chip8.delaytimer--;

            if (chip8.soundtimer > 0)
                chip8.soundtimer--;

            stack.push(_.cloneDeep(chip8));

            update();
        }
    }
}

function playPause() 
{
    if (chip8.running == true) // if playing, pause it
    {
        chip8.running = false;
        clearInterval(run);
    }
    else if (chip8.running == false) // if paused, play it
    {
        chip8.running = true;
        var run = setInterval(runningFunction, 100);

    }
}

function stepForward() 
{
    if (!chip8.running) 
    {
        chip8.emulateCycle();

        if (chip8.delaytimer > 0)
                chip8.delaytimer--;

        if (chip8.soundtimer > 0)
            chip8.soundtimer--;

        stack.push(_.cloneDeep(chip8));
        
        update();

        //console.log('hello');
    }
}

function stepBackward() 
{
    if (!chip8.running) 
    {
        if (stack.length > 0 )
        {
            //document.write('stack is filling')
            chip8 = stack.pop();
            chip8.running = false;
            update();
        }
    }
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
let instructionrender = new textObj(document.getElementById("Registers"), "instruction = " + chip8.instruction, 100, (((i+3)-11)+1)*14);

for (let r = 0; r < 32; r++) {
    for (let c = 0; c < 64; c++) {
        display[64*r+c] = new displayPixel(document.getElementById("display"), c*10, r*10);
        display[64*r+c].printToCanvas();
    }
}

document.addEventListener("keydown", function(event){
    chip8.setKey(event.keyCode);
    
});

document.addEventListener("keyup", function(event){
    chip8.releaseKey(event.keyCode);
});

update();
