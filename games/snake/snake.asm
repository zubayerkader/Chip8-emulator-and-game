; snake game

     ; V0         
     ; V1
     ; V2			; (X, Y)  coordinates 
     ; V3          	; (X, Y)  coordinates
     ; V4          	; (X, Y)  coordinates
     ; V5          	; used for current score
     ; V6
     ; V7
     ; V8			; I MOVEMENT IN MOOVLOOP
     ; V9
     ; VA 			; X - INITIAL HEAD
     ; VB          	; Y - INITIAL HEAD
     ; VC          	; RND X OF BALL
     ; VD          	; RND Y OF BALL
     ; VE

OPTION  BINARY
ALIGN   OFF
OPTION  SCHIP11
UNDEF   HPHEAD

start:
	CLS

	LD I, xcoordinate 
	LD V0, #00
	LD V1, #00
	LD V2, #01
refreshdisplaymemory: 		; 
	LD [I], V0 				; ERASE 256B AFTER END OF PROGRAM TO REFRESH DISPLAY MEMORY
	ADD I, V2 				; 
	ADD V1, #01 			
	SE V1, #00 				
	JP refreshdisplaymemory


;drwhead:
	LD I, head
	LD VA, #06
	LD VB, #0F
	DRW VA, VB, 3


	LD V2, #01 		; Y TOP - 1
	LD V3, #1E		; Y BOTTOM - 30
	LD V4, #01		; X STARTS AT 1, ENDS AT 57 (0x39)
drwhorizontalline:
	LD I, horizontalline
	DRW V4, V2, 1
	DRW V4, V3, 1
	ADD V4, #04
	SE V4, #39
	JP drwhorizontalline


	LD V2, #01 		; X LEFT - 1
	LD V3, #38		; X RIGHT - 57
	LD V4, #02		; Y STARTS AT 1, ENDS AT 30 (0x1E)
drwverticalline:
	LD I, verticalline
	DRW V2, V4, 4
	DRW V3, V4, 4
	ADD V4, #04
	SE V4, #1E
	JP drwverticalline

;drwscore:
;	LD I, BCD
;	LD V5, #00
;	LD B, V5
;	CALL drwBCD

	CALL drwball

	
	LD V8, #00 		; V8 IS ADDED TO I WHEN SAVING CURRENT (X, Y) COORDINATE OF HEAD 
					; V8 INCREMENTS BY 1
	LD V9, #00		; V9 IS ADDED TO I TO GO TO CORRECT DIRECTION
	LD VE, #04		; VE IS USED TO COMPARE V8 AND VE, IF (V8 == VE) THEN RESET V8 (V8=00)
moveloop:
	LD V3, #06		; SET DT = 06
	LD DT, V3

	LD I, xcoordinate
	ADD I, V8
	LD V0, [I]		; SAVING PREVIOUS X COORDINATE OF HEAD IN V4
	LD V4, V0		; AND CURRENT X COORDINATE OF HEAD IN [I]
	LD V0, VA
	LD [I], V0

	;LD I, ycoordinate
	DW   #A468
	ADD I, V8
	LD V0, [I]		; SAVING PREVIOUS Y COORDINATE OF HEAD IN V1
	LD V1, V0		; AND CURRENT Y COORDINATE OF HEAD IN [I]
	LD V0, VB
	LD [I], V0

	LD I, tail
	SE V4, #00 		; IF (V4 != 00) 
	DRW V4, V1, 3 	; 	DRW TAIL PREVIOUS HEAD LOCATION

	LD I, direction
	ADD I, V9		; GO TO CORRECT DIRECTION
	LD V1, [I] 		; STORE DISPLACEMENT IN V0 AND V1
	
	LD I, headtotail
	DRW VA, VB, 2 	; CONVERTING HEAD TO TAIL
	
	ADD VA, V0
	ADD VB, V1		; DRW NEW HEAD IN NEW LOCATION
	LD I, head
	DRW VA, VB, 3

	SE VF, #00 		; IF NO COLLISION (NO BALL EATEN OR HIT BOUNDARY) BY THE MOVEMENT --> SKIP
	JP collision  	; ELSE --> DRW NEW BALL



	RND V0, #0F 	; IF (V0 IS ANYTHING BETWEEN 01 - 15)
	SNE V0, #00 	; 		SKIP
	ADD VE, #01 	; ELSE
					; 		ADD VE, #01
ptrmovement:
	ADD V8, #01 	; V8++
	SNE V8, VE 		; IF (V8 == VE) THEN RESET V8 (V8=00)
	LD V8, #00


dirloop: 			; task of dirloop and next dir:
	LD V1, #08 		; V1 = 08
	SKP V1			; IF (KEY WITH 08 IS PRESSED)
	LD V6, #00 		; 		V6 REMAINS SAME
	SKP V1 			; ELSE
	JP nextdir 		; 		V6 = 00
	SE V6, #00 		; IF (KEY WITH 08 IS PRESSED)
	JP nextdir 		; 		IF (V6 == 0)   ; if 08 was not pressed previously
	ADD V9, #02 	; 			V9 += 02
	LD V6, #06 		; 			V6 = 06
	AND V9, V6 		; 			AND V9, V6
					; 		ELSE
					;			JP nextdir
					; ELSE
					; 		JP nextdir

nextdir:
	LD V1, #09
	SKP V1
	LD V7, #00
	SKP V1
	JP checkDT
	SE V7, #00
	JP checkDT
	ADD V9, #FE
	LD V7, #06
	AND V9, V7

checkDT:
	LD V3, DT 		; IF (DT == 0)
	SE V3, #00 		; 		JP moveloop
	JP dirloop 		; ELSE
	JP moveloop 	; 		JP dirloop


collision:
	CALL eraseball 	; DRW NEW BALL

	LD I, head
	DRW VA, VB, 3 	
	DRW VA, VB, 3
					; WHAT HAPPENS IF THERE IS A COLLISION WHILE THE SNAKE IS MOVING
	SE VF, #00 		; IF (BALL IS EATEN)
	JP boundaryhit 	; 		UPDATE SCORE
					; 		DRW NEW SCORE
	LD V4, #02 		; 		MAKE SOUND
	LD ST, V4 		; ELSE --> BOUNDARY HIT
	ADD V5, #01 	; 		MAKE SOUND
;	LD I, BCD 		; 		DRW HEADTOTAIL
;	LD B, V5 		; 		DELAY
;	CALL drwBCD 	; 		START NEW GAME
	JP ptrmovement

boundaryhit:
	LD V4, #0A
	LD ST, V4
	DRW VA, VB, 3
	SUB VA, V0
	SUB VB, V1

	LD I, headtotail
	DRW VA, VB, 2

	LD V0, #00
delay:
	ADD V0, #01
	SE V0, #0F
	JP delay
	JP start

drwball:
	LD I, ball

	RND VC, #36		; MAX X - 54 
	ADD VC, #02		; X RANGE: 2 - 56

	RND VD, #1B		; MAX Y - 27 
	ADD VD, #02		; Y RANGE: 2 - 29

	DRW VC, VD, 7
	SNE VF, #00
	RET

eraseball:
	LD I, ball
	DRW VC, VD, 7
	JP drwball

drwBCD:
	LD V3, #06		; Y - 6
	LD V4, #3B		; X - 59
	LD I, BCD
	LD V2, [I]

	LD F, V0
	DRW V4, V3, 5
	ADD V3, #06

	LD F, V1
	DRW V4, V3, 5
	ADD V3, #06

	LD F, V2
	DRW V4, V3, 5
	
	RET


direction:
	 DW #0400 		; RIGHT --> X+4, Y+0
	 DW #00FC 		; UP --> X+0, Y-4
	 DW #FC00 		; LEFT --> X-4, Y+0
	 DW #0004 		; DOWN --> X+0, Y+4

ball:
    DB $..111... 
    DB $.11111..
    DB $1111111.
    DB $1111111.
    DB $1111111.
    DB $.11111..
    DB $..111...

verticalline:
	DB $1.......
	DB $1.......
	DB $1.......
	DB $1.......
	

horizontalline:
	DB $1111....

head:
	DB $111.....
	DB $111.....
	DB $111.....

tail:
	DB $111.....
    DB $1.1.....
   	DB $111.....

headtotail:
	DB $........
	DB $.1......

BCD:
	DA 'snake'


xcoordinate:








;ycoordinate:







