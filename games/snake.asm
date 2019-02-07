
; snake game

F1:
     DW #0000   
     DB #00
     DW #3E05
     DW #1E01
     DW #0004

F2:
     CLS            

     LD   I,  F1  
     LD   VE,  [I]  

     LD   I,  L368  

F3:               
     LD   [I], V0   
     SE   V1,  #00  
     JP   F3      

     LD   I,  F21   


F4:
     DRW  V4,  V2, 1 
     ADD  V4,  #03    
     JP   F4       

     LD   V3,  #04   

F5:
     DRW  V3,  V2, 9 
     DRW  V4,  V2, 9 
     ADD  V2,  #09   
     SE   V2,  #3F   
     JP   F5       


     LD   V3,  #2E   
     CALL F12       

     LD   I,  L202   
     LD   B,   V5    
     CALL L2E2       

     CALL F17       

F6:
     LD   I,  L35E   
     DRW  V7,  V6, 1 
     ADD  V6,  #FE   
     SE   V6,  #11   
     JP   F6       

F7:
     LD   DT,  V3
     ADD  I,   V8
     LD   V0,  [I]
     LD   V4,  V0
     LD   I,  L368

     LD   V0,  VA
     LD   [I], V0

     ADD  I,   V8
     LD   V0,  [I]
     LD   V1,  V0
     LD   V0,  VB
     
     LD   [I], V0
     LD   I,  F23
     DRW  VA,  VB, 2
     ADD  VA,  V0
     ADD  VB,  V1
     LD   I,  F22
     SE   V4,  #00
     DRW  V4,  V1, 3

     SE   VF,  #00
     JP   F13

     RND  V0,  #0F
     SNE  V0,  #00
     CALL F16

F8:
     ADD  V8,  #01
     SNE  V8,  VE
     LD   V8,  #00

F9:
     LD   V1,  #08
     SKP  V1
     LD   V6,  #00
     SKP  V1
     JP   F10

F10:
     LD   V1,  #09
     SKP  V1
     LD   V7,  #00
     ADD  V9,  #FE
     LD   V7,  #06
     AND  V9,  V7

F11:
     LD   V3,  DT
     JP   F9
     JP   F7

L2DC:
     CALL L2E2
     LD   I,  L202
     LD   B,   V5

F12:
     LD   V4,  #7C   
     LD   I,  L202   
     LD   V2,  [I]   

     LD   F,   V1    
     DRW  V4,  V3, 5 
     ADD  V3,  #06   

     RET             

F13:
     CALL F19       

     LD   I,  F21
     DRW  VA,  VB, 3
     LD   V4,  #02
     LD   ST,  V4
     ADD  V5,  #01
     CALL L2DC
     JP   F8

F14:
     LD   V4,  #0A
     
     SUB  VA,  V0
     SUB  VB,  V1

     LD   I,  F23
     DRW  VA,  VB, 2

     LD   I,  L206
     LD   V0,  [I]
     SNE  VF,  #00
     LD   [I], V0

F15:
     JP   F15

F16:
     ADD  VE,  #01
     RET

F17:
     LD   I,  F24   
F18:
     RND  VC,  #7C   
     ADD  VC,  #02   

     DRW  VC,  VD, 7 
     SNE  VF,  #00               

F19:
     LD   I,  F24   
     DRW  VC,  VD, 7 
     JP   F18       

F20:
          
     DW   #0400 
     DW   #00FC 
     DW   #0004 

F21:
     DB $11...... 
     DB $11......
F22:
     DB $1.1..... 
     DB $111.....
     DB $1.1.....

F23:
     DB $........ 
     DB $.1...... 

F24:
     DB $..111... 
     DB $.11111..
     DB $.11111..
     DB $..111...

F25: DB $111..... 
