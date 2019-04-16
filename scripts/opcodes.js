
const opcodes = {
   opcode0x00E0: (display) => {
    for (let i = 0; i < display.length; i++) {
        display[i] = 0;
    }
    return display;
},

   opcode0x00EE: (sp, pc, stack) => {
    sp = sp - 1; 
    pc = stack[sp]; 
    return sp, pc;
},

   opcode0x1NNN: (pc, opcode) => {
    pc = opcode & 0x0FFF;
    return pc;
},

opcode0x2NNN: (stack, sp, pc, opcode) => {
    stack[sp] = pc;
    sp = sp + 1;
    pc = opcode & 0x0FFF;

    return sp, pc, stack;
},

   opcode0x3XNN: (V, opcode, pc) => {
    if ((V[(opcode & 0x0F00) >> 8]) === (opcode & 0x00FF)) {
        pc = pc + 2;
    }
    return pc;
},

   opcode0x4XNN: (V, x, opcode, pc) => {
    if (V[x] != (opcode & 0x00FF) ) {
        pc = pc + 2;
    }
    return pc;
},

   opcode0x5XY0: (V, x, y, pc) => {
    if (V[x] === V[y]) {
        pc = pc + 2;
        
    } 
    return pc;
},

   opcode0x6XNN: (V, x, opcode) => {
    V[x] = opcode & 0x00FF;
    return V[x];
}
,
   opcode0x7XNN: (opcode, V, x) => {
    let val = (opcode & 0x00FF) + V[x];

    if (val > 255) {
        val -= 256;
    }

    V[x] = val;
    return V[x];
},

   opcode0x8XY0: (V, x, y) => {
    V[x] = V[y];
    return V[x];
},

   opcode0x8XY1: (x, y, V) => {
    V[x] = V[x] | V[y];
    return V[x];
},

   opcode0x8XY2: (x, y, V) => {
    V[x] = V[x] & V[y];
    return V[x];
},

   opcode0x8XY3: (x, y, V) => {
    V[x] = V[x] ^ V[y];
    return V[x];
},
   opcode0x8XY4: (x, y, V) => {
    V[x] = V[x] + V[y]; 
    if (V[x] > 255){
        V[0xF] = 1;
    }
    else if (V[x] <= 255){
        V[0xF] = 0;
    }

    return V[x];
},

   opcode0x8XY5: (x, y, V) => {
    if (V[x] > V[y])
    {
        V[x] -= V[y];
        V[0x0] = 1; 
    }
    else if (V[x] <= V[y])
    {
        V[x] -=  V[y];
        V[0xF] = 0;
    }
    return V[x];
},

   opcode0x8XY6: (x, V) => {

    if (V[x] & 0x1){
        V[0xF] = 0x1;        
    }

    V[x] = V[x] / 2; 
    return V[x];
},

   opcode0x8XY7: (x, y, V) => { 
    V[x] = V[y] - V[x];
    if (V[y] > V[x])
    {
        V[0xF] = 1;
    }
    else if (V[y] <= V[x])
    {
        V[0xF] = 0;
    }
    return V[x];
},

   opcode0x8XYE: (V, x, pc) => {
    if ( V[x] >> 7 & 0x0001){
        V[0xF] = 1;                   
    }
    else{
        V[0xF] = 0;
    }
    V[x] = V[x] << 1;
    return V[0xF];
},

   opcode0x9XY0: (V, x, y, pc) => {
    if (V[x] != V[y]){
        pc = pc + 2;               
    }
    return pc;
},

   opcode0xANNN: (I, opcode) => {
    I = opcode & 0x0FFF;
    return I;
},

   opcode0xBNNN: (V, opcode, pc) => {
    pc = ( (opcode & 0x0FFF) + V[0] );
    return pc;
},

   opcode0xEX9E: (opcode, pc, V, keypressed) =>{
    let num = V[(opcode & 0x0F00) >> 8];
    if (keypressed[num] === 1){
        pc += 2;
    }
    return pc;
},
   opcode0xEXA1: (opcode, pc, V, keypressed) => {
    let num = V[(opcode & 0x0F00) >> 8];
    if (keypressed[num] === 0){
        pc += 2;
    }
    return pc;
},

    opcode0xFX07: (opcode, V, delaytimer) => {
        V[(opcode & 0x0F00) >> 8] = delaytimer;
        return V[(opcode & 0x0F00) >> 8];
    },

    opcode0xFX15: (opcode, delaytimer, V) => {
        delaytimer = V[(opcode & 0x0F00) >> 8];
        return delaytimer;
    },

    opcode0xFX18: (opcode, soundtimer, V) => {
        soundtimer = V[(opcode & 0x0F00) >> 8];
        return soundtimer;
    },

    opcode0xFX1E: (I, V, opcode) => {
        I = I + V[((opcode & 0x0F00) >> 8)];
        return I;
    },

   opcode0xFX29: (I, V, x) => {
    I = V[x] * 5;
    return I;
}, 
   opcode0xFX33: (memory, I, V, x) => {

    memory[I] = V[x] / 100;
    memory[I + 1] = (V[x] / 10) % 10;
    memory[I + 2] = (V[x]  % 100) % 10;

    return memory;
},
   opcode0xFX55: (memory, I, V, x) => {
    
    for (let i = 0; i <= x ; i++){
        memory[I+i] = V[i];
    }
    return memory;
},
   opcode0xFX65: (memory, I, V, x) => {
    
    for (let i = 0; i <= x ; i++){
        V[i] = memory[i+I];
    }
    return V;
}  

};

module.exports = opcodes;