#the beginnings of an assembler.
import binascii

with open("input.txt") as fin, open("test", "wb") as fout:
    for line in fin:
        fout.write(binascii.unhexlify(''.join(line.split())))
