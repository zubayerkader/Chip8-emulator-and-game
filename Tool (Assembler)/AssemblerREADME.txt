This assembler is bare bones and does not have any features such as labels and jump points. 
You'll need to count and keep track of where your code is going to be in the memory.
For our chip8 emulator all code starts are 0x200 in memory, every instruction takes 2 bytes which is 4 hexadecimals.
That means the first line in your code will start at 0x200 and end at 0x203 and the second instruction will start at 0x204 and end at 0x207.
The instructions may vary in format from typical assemblers found online. This is the most simplistic assembler for our project and very straight forward to pick up
for small chip8 programs, such as test cases. I recommend to use an online assembler for large programs such as games.

TO RUN:
Requires python3.6 or higher.
In cmd or terminal, make sure you are in the same directory as assembler.py and the file you would like to assemble.
In cmd or terminal, type python assembler.py your_file.txt

In the same directory, the assembler.py generate a raw binary file.

DEBUG COMMON ISSUES:
python is not recongized, make sure python.exe is in the enviromental path. Google how to do that.
':' SyntaxError: invalid syntax, make sure you are running python 3.6 or higher.

Make sure there are no empty lines in the txt file, as the assembler reads it as an instruction.


ONLY ONE INSTRUCTION PER LINE!
E.g.
LDB V1, 0x01
SKP V1
JP 0x200

If you need more detail on indivdual instructions, go to cowgod's technical reference http://devernay.free.fr/hacks/chip8/C8TECH10.HTM .

0xNNN, a 12 bit value represented in hexadecimal
0xNN, a 8 bit value represented in hexadecimal
0xN, a 4 bit value represented in hexadecimal
x, a integer between 0 - 15
y, a integer between 0 - 15

Instruction list:
CLS:
Clear the display.

RET:
Return from a subroutine.

JP 0xNNN:
Jump to location 0xNNN in memory.

CALL 0xNNN:
Call subroutine at 0xNNN.

SEB Vx, 0xNN:
Skip next instruction if Vx = 0xNN

SNEB Vx, 0xNN:
Skip next instruction if Vx != 0xNN

SE Vx, Vy:
Skip next instruction if Vx = Vy.

LDB Vx, 0xNN:
Set Vx = 0xNN.

ADDB Vx, 0xNN:
Set Vx = Vx + 0xNN.

LD Vx, Vy:
Set Vx = Vy.

OR Vx, Vy:
Set Vx = Vx OR Vy.

AND Vx, Vy:
Set Vx = Vx AND Vy.

XOR Vx, Vy:
Set Vx = Vx XOR Vy.

ADD Vx, Vy:
Set Vx = Vx + Vy, set VF = carry.

SUB Vx, Vy:
Set Vx = Vx - Vy, set VF = NOT borrow.

SHR Vx, Vy:
Set Vx = Vx SHR 1

SUBN Vx, Vy:
Set Vx = Vy - Vx, set VF = NOT borrow.

SHL Vx, Vy:
Set Vx = Vx SHL 1.

SNE Vx, Vy:
Skip next instruction if Vx != Vy.

LDI 0xNNN:
Set I = NNN.

JPV 0xNNN:
Jump to location nnn + V0.

RND Vx, 0xNN:
Set Vx = random byte AND kk.

DRW Vx, Vy, 0xN:
Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.

SKP Vx:
Skip next instruction if key with the value of Vx is pressed.

SKNP Vx:
Skip next instruction if key with the value of Vx is not pressed.

LDT Vx:
Set Vx = delay timer value.

LDK Vx:
Wait for a key press, store the value of the key in Vx.

LDD Vx:
Set delay timer = Vx.

LDS Vx:
Set sound timer = Vx.

ADDI Vx:
Set I = I + Vx.

LDM Vx:
Set I = location of sprite for digit Vx.

LDV Vx:
Store BCD representation of Vx in memory locations I, I+1, and I+2.

LDR Vx:
Store registers V0 through Vx in memory starting at location I.

LDL Vx:
Read registers V0 through Vx from memory starting at location I.
