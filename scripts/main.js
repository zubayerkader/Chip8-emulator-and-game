let chip8 = new Chip8();
let regArr = new Array(16);

let i = 0
for (let r = 1; r <= 2; r++) {
    for (i; i < 11*r-((r-1)*3); i++) {
        //console.log(i,chip8.getV(i),(r-1)*30,((i-11*(r-1))+1)*13)
        let msg = "V"+i.toString()+"= "+chip8.getV(i).toString();
        regArr[i] = new textObj(document.getElementById("Memory"), msg, (r-1)*100, ((i-11*(r-1))+1)*14);
        regArr[i].printToCanvas();
    }
}