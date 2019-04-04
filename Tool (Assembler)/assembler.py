#the beginnings of an assembler.
import binascii
import sys

def createFile(filepath:str):
    with open(filepath) as fin, open("test", "wb") as fout:
        for line in fin:
            fout.write(binascii.unhexlify(''.join(line.split())))

if __name__ == '__main__':

    operators = [op.upper() for op in ["cls", "ret", "jp", "call", "seb", "sneb", "se", "ldb", "addb", "ld", "or", "and", "xor", "add", "sub", "shr", "subn",
                 "shl", "sne", "ldi", "jpv", "rnd", "drw", "skp", "sknp", "ldt", "ldk", "ldd", "lds", "addi", "ldm", "ldv", "ldr", "ldl"]]
    print(len(operators),operators)

    hextable = {0:"0", 1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", 10:"A", 11:"B", 12:"C", 13:"D", 14:"E", 15:"F"}

    for filepath in sys.argv[1:]:
        with open(filepath) as fin, open("temphex.txt","w") as fout:
            output = ""
            for linenum,line in enumerate(fin,1):
                try:
                    instruction = line.upper().rstrip().replace(',', '').split(" ")

                    op=0
                    for word in instruction:
                        if word in operators:
                            op+=1

                    if op >= 2:
                        raise Exception("In line " + str(linenum) + " , more than one operator given!")

                    if instruction[0] not in operators:
                        raise Exception(instruction[0] + " is not an operator! See assemblerhelp.txt for list of operators.")

                    if instruction[0] == operators[0]: # CLS
                        output += "00 E0 "

                    elif instruction[0] == operators[1]: # RET
                        output += "00 EE "

                    elif instruction[0] == operators[2]: # JP
                        if instruction[1][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the JP requires a hexadecimal.")

                        if len(instruction[1]) > 5:
                            raise Exception("In line " + str(linenum) + " , the address must be between 0x000 to 0xFFF")

                        output += "1" + instruction[1][2:3] + " " + instruction[1][3:5] + " "

                    elif instruction[0] == operators[3]: # CALL
                        if instruction[1][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the CALL requires a hexadecimal.")

                        if len(instruction[1]) > 5:
                            raise Exception("In line " + str(linenum) + " , the address must be between 0x000 to 0xFFF")

                        output += "2" + instruction[1][2:3] + " " + instruction[1][3:5] + " "

                    elif instruction[0] == operators[4]: # SEB
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SEB first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the SEB second operand but be a hexadecimal byte.")

                        if len(instruction[1]) > 4:
                            raise Exception("In line " + str(linenum) + " , the byte must be between 0x00 to 0xFF")

                        output += "3" + hextable[int(instruction[1][1:])] + " " + instruction[2][2:] + " "

                    elif instruction[0] == operators[5]: # SNEB
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SNEB first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the SNEB second operand but be a hexadecimal byte.")

                        if len(instruction[1]) > 4:
                            raise Exception("In line " + str(linenum) + " , the byte must be between 0x00 to 0xFF")

                        output += "4" + hextable[int(instruction[1][1:])] + " " + instruction[2][2:] + " "

                    elif instruction[0] == operators[6]: # SE
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SE first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SE first operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "5" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "0 "

                    elif instruction[0] == operators[7]: #LDB
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDB first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the LDB second operand but be a hexadecimal byte.")

                        if len(instruction[1]) > 4:
                            raise Exception("In line " + str(linenum) + " , the byte must be between 0x00 to 0xFF")

                        output += "6" + hextable[int(instruction[1][1:])] + " " + instruction[2][2:] + " "

                    elif instruction[0] == operators[8]: # ADDB
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , ADDB first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the ADDB second operand but be a hexadecimal byte.")

                        if len(instruction[1]) > 4:
                            raise Exception("In line " + str(linenum) + " , the byte must be between 0x00 to 0xFF")

                        output += "7" + hextable[int(instruction[1][1:])] + " " + instruction[2][2:] + " "

                    elif instruction[0] == operators[9]: # LD
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LD first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LD second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "0 "

                    elif instruction[0] == operators[10]: # OR
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , OR first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , OR second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "1 "

                    elif instruction[0] == operators[11]: # AND
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , AND first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , AND second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "2 "

                    elif instruction[0] == operators[12]: #XOR
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , XOR first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , XOR second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "3 "

                    elif instruction[0] == operators[13]: # ADD
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , ADD first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , ADD second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "4 "

                    elif instruction[0] == operators[14]: # SUB
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SUB first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SUB second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "5 "

                    elif instruction[0] == operators[15]: # SHR
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SHR first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SHR second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "6 "

                    elif instruction[0] == operators[16]: # SUBN
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SUBN first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SUBN second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "7 "

                    elif instruction[0] == operators[17]: # SHL
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SHL first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SHL second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "8" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "E "

                    elif instruction[0] == operators[18]: # SNE
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SNE first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SNE second operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "9" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + "0 "

                    elif instruction[0] == operators[19]: # LDI
                        if instruction[1][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the JP requires a hexadecimal.")

                        if len(instruction[1]) > 5:
                            raise Exception("In line " + str(linenum) + " , the address must be between 0x000 to 0xFFF")

                        output += "A" + instruction[1][2:3] + " " + instruction[1][3:5] + " "

                    elif instruction[0] == operators[20]: # JPV
                        if instruction[1][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the JP requires a hexadecimal.")

                        if len(instruction[1]) > 5:
                            raise Exception("In line " + str(linenum) + " , the address must be between 0x000 to 0xFFF")

                        output += "B" + instruction[1][2:3] + " " + instruction[1][3:5] + " "

                    elif instruction[0] == operators[21]: # RND
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SHR first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the JP requires a hexadecimal.")

                        if len(instruction[2]) > 4:
                            raise Exception("In line " + str(linenum) + " , the address must be between 0x00 to 0xFF")

                        output += "C" + hextable[int(instruction[1][1:])] + " " + instruction[2][2:] + " "

                    elif instruction[0] == operators[22]:  # DRW
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , DRW first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[2][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , DRW first operand must be a register.")

                        if int(instruction[2][1:]) > 16 or int(instruction[2][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        if instruction[3][:2] != "0X":
                            raise Exception("In line " + str(linenum) + " , the JP requires a hexadecimal.")

                        if len(instruction[3]) > 3:
                            raise Exception("In line " + str(linenum) + " , the address must be between 0x0 to 0xF")

                        output += "D" + hextable[int(instruction[1][1:])] + " " + hextable[int(instruction[2][1:])] + instruction[3][2:] + " "

                    elif instruction[0] == operators[23]:  # SKP
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SKP first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "E" + hextable[int(instruction[1][1:])] + " " + "9E" + " "

                    elif instruction[0] == operators[24]:  # SKNP
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , SKNP first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "E" + hextable[int(instruction[1][1:])] + " " + "A1" + " "

                    elif instruction[0] == operators[25]:  # LDT
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDT first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "07" + " "

                    elif instruction[0] == operators[26]:  # LDK
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDK first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "0A" + " "

                    elif instruction[0] == operators[27]:  # LDD
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDD first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "15" + " "

                    elif instruction[0] == operators[28]:  # LDS
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDS first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "18" + " "

                    elif instruction[0] == operators[29]:  # ADDI
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , ADDI first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "1E" + " "

                    elif instruction[0] == operators[30]:  # LDM
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDM first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "29" + " "

                    elif instruction[0] == operators[31]:  # LDV
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDV first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "33" + " "

                    elif instruction[0] == operators[32]:  # LDR
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDR first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "55" + " "

                    elif instruction[0] == operators[33]:  # LDL
                        if instruction[1][:1] != "V":
                            raise Exception("In line " + str(linenum) + " , LDL first operand must be a register.")

                        if int(instruction[1][1:]) > 16 or int(instruction[1][1:]) < 0:
                            raise Exception("In line " + str(linenum) + " , the register must be either 1 to 16.")

                        output += "F" + hextable[int(instruction[1][1:])] + " " + "65" + " "

                except Exception as e:
                    print (e)
                    quit(-1)

            fout.write(output)
            print(output)

        with open("temphex.txt", "r") as file, open(filepath[:filepath.find('.')], "wb") as output:
            for line in file:
                output.write(binascii.unhexlify(''.join(line.split())))





