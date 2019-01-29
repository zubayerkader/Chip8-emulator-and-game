let chip8 = new Chip8();
let Memcanvas = document.getElementById("Memory");
let reg1 = Memcanvas.getContext("2d");
reg1.font = "14px Arial";
reg1.fillStyle = "white";
reg1.fillText("V0 = " + chip8.getV(0).toString(),0,14);