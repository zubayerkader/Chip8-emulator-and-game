This assembler is bare bones and does not have any features such as labels and jump points. 
You'll need to count and keep track of where your code is going to be in the memory.
For our chip8 emulator all code starts are 0x200 in memory, every instruction takes 2 bytes which is 4 hexadecimals.
That means the first line in your code will start at 0x200 and end at 0x204 and the second instruction will start at 0x205 and end at 0x209.

ONLY ONE INSTRUCTION PER LINE!

If you need more detail on indivdual instructions, go to cowgod's technical reference.

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

SUBN:
SHL:
SNE:
LDI:
JPV:
RND:
DRW:
SKP:
SKNP:
LDT:
LDK:
LDD:
LDS:
ADDI:
LDM:
LDV:
LDR:
LDL:
