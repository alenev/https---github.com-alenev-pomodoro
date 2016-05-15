font-family: 'PTSans', Arial, Helvetica, sans-serif; 
font-family: 'PTSerif', Georgia, 'Palatino Linotype', Palatino, serif;


/* -------------- Colir Scheme -------------- */


/* 	-------------- 
	TEXTS: 
	-------------- */

black:			rgb(1,1,1);
white:			rgb(254,254,254);	
gold:			rgb(171,130,81);			headers
gray:			rgb(153,153,153);
gray:			rgb(55,55,55); 				comments		
beg:			rgb(240,213,141);			text on red bg
green dark:		rgb(0,115,0);			
gray light:		rgb(153,153,153);			fonts
gray light:		rgb(240,240,240);			fonts on dark
red:			rgb(255,12,0);				fonts on dark (black) bg; cena
red:			rgb(204,0,0);				fonts on light bg



/* 	-------------- 
	BG: 
	-------------- */	

gray light:		rgb(240,240,240);			фоны больших блоков
red:			rgb(238,0,0);				фоны красных блоков
green:			rgb(0,156,0);				фоны зеленых блоков
gold:			rgb(240,226,188);			фоны бежевых блоков



/* 	-------------- 
	LINKS: 
	-------------- */
	
red:			color: rgb(172,0,0);		основные ссылки в текстах
				color: rgb(238,0,0);

green:			rgb(0,156,0); 				bg menu, bg buttons
				rgb(0,115,0); 				bg menu, bg buttons	

gold			rgb(119,93,24);				.footer ссылки на беж фоне
				rgb(150,115,22);

yell:			rgb(255,240,0); 			.footer ссылки на красном фоне
				rgb(240,226,188);				

green			rgb(103,242,103); 			€рко-зелена€ ссылка на черном фоне
yell			rgb(255,240,0);				€рко-желтый на черном фоне



/* 	-------------- 
	BORDERS: 
	-------------- */
	
gray light:		rgb(194,194,194); 			borders on black



/* 	-------------- 
	TABLES: 
	-------------- */
	
green light		rgb(192,238,192);		bg tables

blue light		rgb(194,226,226);
			
gray light		rgb(226,226,226);		bg tables	
gray light		rgb(194,194,194);		borders in tables



/* 	-------------- 
	BUTTONS: 
	-------------- */

1/  расна€ кнопка на черном фоне:
				STATIC:
	background: rgb(226,0,26);				red
		border: rgb(255,0,29);				red
				HOVER:
	background: rgb(172,0,0);				red	
	
	
2/ «елена€ кнопка на черном фоне:
				STATIC:
	background: rgb(20,146,50);				green
				HOVER:
	background: rgb(0,115,0);				green
		color: 	rgb(255,240,0);				yellow
		
		
3/  расна€ кнопка
				STATIC:
	background: rgb(226,0,26);				red
		border: rgb(255,0,29);				red
				HOVER:
	background: rgb(172,0,0);				red
		color: 	rgb(255,240,0);				yellow


4/ «елена€ кнопка
				STATIC:
	background: rgb(20,146,50);				green 
		border: rgb(20,146,50);				green
				HOVER:
	background: rgb(0,115,0);				green
		color: 	rgb(255,240,0);				yellow
		
		
5/ «олота€ кнопка
				STATIC:
	background: rgb(171,130,81);			gold
				HOVER:
	background: rgb(119,93,24);				gold
	
	
	
6/  нопки выбора города /голубой-красный/
				STATIC:
				HOVER:
				
				
7/  нопка close
				STATIC:
	background: rgb(238,0,0);				red			
				HOVER:		
	background: rgb(172,0,0);				red
	
	
/* -------------- z-index -------------- */

z-index: 

.asvpopup-body							1000
.asvpopup-large,						1001
.asvpopup-small							1001
.asvpopup-large a.button-close,			1002
.asvpopup-small a.button-close			1002
.pomodoro-adress a.bt-mid				1


.label-new,								1
.label-hit								1
a#toTop									2

.tocart-pult a.tocart-up,				2
.tocart-pult a.tocart-down				2

ul.menu-base ul							110
.banner-holder .control-container-over	101

.item-basket a.button-close				2




















