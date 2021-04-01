

function drawCanyon(){
 
   INTER_EL.currentDisplayCanyons[0] = INTER_EL.findPotitionInArray(   INTER_EL.CANYONS, 
                                                            INTER_EL.currentDisplayCanyons[0],
                                                            INTER_EL.CANYON_RANGE,
                                                            charLogics.scroll)
    
      // console.log("INTER_EL.currentDisplayCanyons",INTER_EL.currentDisplayCanyons)
   if (INTER_EL.currentDisplayCanyons[0] > INTER_EL.CANYON_RANGE[1] )
   {
      INTER_EL.currentDisplayCanyons[0] = INTER_EL.CANYON_RANGE[1];
      return;
   } else if (INTER_EL.currentDisplayCanyons[0] < INTER_EL.CANYON_RANGE[0])
   {
      INTER_EL.currentDisplayCanyons[0] = INTER_EL.CANYON_RANGE[0];
   }
   
   INTER_EL.currentDisplayCanyons[1] = INTER_EL.CANYONS[INTER_EL.currentDisplayCanyons[0]].DISPLAY_INDEX;
   // console.log("INTER_EL.currentDisplayCanyons",INTER_EL.currentDisplayCanyons);
   while  (INTER_EL.CANYONS[INTER_EL.currentDisplayCanyons[1]].LEFT > charLogics.scroll[1] ) 
   {
      // console.log("runnning")
      INTER_EL.currentDisplayCanyons[1]--;
      if (INTER_EL.currentDisplayCanyons[1] < 0)
      {return;}
   }

   if (INTER_EL.currentDisplayCanyons[0] > INTER_EL.currentDisplayCanyons[1])
   {return}
   // console.log("INTER_EL.currentDisplayCanyons",INTER_EL.currentDisplayCanyons)
      for ( i = INTER_EL.currentDisplayCanyons[0]; 
            i <= INTER_EL.currentDisplayCanyons[1]; i ++)    
   {
 
    
 
  translate(INTER_EL.CANYONS[i].X -charLogics.scroll[0] , INTER_EL.CANYON_Y)
  scale (1,1)
  noStroke(); 
   fill(0);

 
    
strokeWeight( 2 );

   beginShape();
  vertex( -73 ,  -1 );
  vertex( -67 ,  9 );
  vertex( -66 ,  25 );
  vertex( -63 ,  39 );
  vertex( -53 ,  72 );
  vertex( 52 ,  73 );
  vertex( 62 ,  35 );
  vertex( 69 ,  18 ); 
  vertex( 72 ,  -1 );
   endShape(CLOSE);
  
 
   translate(-(INTER_EL.CANYONS[i].X -charLogics.scroll[0]) , -INTER_EL.CANYON_Y)
  
   }

   fill(255,0,0);
   stroke(0);
}


function drawFlagpole ()
{
   push();
   translate(INTER_EL.FLAGPOLE_X - charLogics.scroll[0], INTER_EL.FLAGPOLE_Y )
   stroke(0);
   //Foot
   for (i = -10; i < 11; i++)
   {
      line (i,0 , i, -5);   
   }
   
   
   //Middle pole
   for (i = -5, j = 1; i < -2; i++ , j++ )
   {
      line (i,-6 , i, -60-j);   
   }
   for (i = -2; i < 3; i++)
   {
      line (i,-6 , i, -63);   
   }
   for (i = 3, j = 0; i < 6; i++ , j++ )
   {
      line (i,-6 , i, -63+j);   
   }
   // High pole
   for (i = -2; i < 3; i++)
   {
      line (i,-64 , i, -253);   
   }
   //Pole top
   ellipse(0, -257, 10 ,10);
   //Flag
   if (gameChar.hasWon)
   {
      
      
      if (INTER_EL.flagStart > GAME_PROPS.SIN_128X2_ARRAY_LIMIT){INTER_EL.flagStart = 0 }
      INTER_EL.flagCounter = INTER_EL.flagStart;
      for (i = 5, j = 0; i < 90; i++, j +=0.02)
      {
         let temp = GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.flagCounter++] *3 * j;
         
         if (i <27 || i >42)
         {
         //RED
         stroke(255,0,0);
         line (i,-203 + temp , i, -203-15 + temp);
         //white
         stroke(255,255,255);
         line (i,-203-16 + temp , i, -203-15-5 + temp);
         // Blue
         stroke(0,0,255);
         line (i,-203-15-6 + temp , i, -203-15-5-7 + temp); 
         //White
         stroke(255,255,255)
         line (i,-203-15-5-8 + temp , i, -203-15-5-7-5 + temp);
         //Red
         stroke(255,0,0)
         line (i,-203-15-5-7-6 + temp , i, -250 + temp);
         } else if (i >= 27 && i <= 31 || i >= 38 && i <=42)
         {
            
            //white
            stroke(255,255,255);
            line (i,-203 + temp , i, -203-15-5 + temp);
            // Blue
            stroke(0,0,255);
            line (i,-203-15-6 + temp , i, -203-15-5-7 + temp); 
            //White
            stroke(255,255,255)
            line (i,-203-15-5-8 + temp , i, -250 + temp);
            //Red
            
         } else
         {
            // Blue
            stroke(0,0,255);
            line (i,-203 + temp , i, -250 + temp); 
         }

         if (INTER_EL.flagCounter > GAME_PROPS.SIN_128X2_ARRAY_LIMIT){INTER_EL.flagCounter = 0 }
      }
      INTER_EL.flagStart ++;
   }

   // console.log (GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.flagCounter++] *3);
   pop(); 
}






// ENEMIES
function drawDog () 
{
   push();
   translate( INTER_EL.DOG.x -charLogics.scroll[0] , INTER_EL.DOG.y );
scale(INTER_EL.DOG.currentDirection,1)
stroke (0)

//FRONTLEG BEHIND
translate(  316 -337 , 470 -487 );
rotate (-1*GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogWalkIndex]);
strokeWeight( 2 );
fill( drawSoft.colorWheelFull[29 ][186] );
beginShape();
vertex( -4 ,  -1 );
vertex( -4 ,  18 );
vertex( 4 ,  17 );
vertex( 3 ,  -4 );
endShape();
rotate (GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogWalkIndex]);
translate(  -(316 -337) , -(470 -487) );

//BACKLEG BEHIND
translate( 344 -337, 470 -487 );
rotate (GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogWalkIndex]);
strokeWeight( 2 );

beginShape();
vertex( -6 ,  -3 );
vertex( 2 ,  10 );
vertex( -3 ,  18 );
vertex( 6 ,  18 );
vertex( 10 ,  5 );
vertex( 2 ,  -6 );
endShape();
rotate (-GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogWalkIndex]);
translate( -(344 -337), -(470 -487) );









//BODY
   strokeWeight( 2 );

beginShape();
vertex( -24 ,  -29 );
vertex( -26 ,  -12 );
vertex( 12 ,  -11 );
vertex( 14 ,  -23 );
vertex( 24 ,  -17 );
vertex( 27 ,  -22 );
vertex( 13 ,  -30 );
endShape(CLOSE);

//HEAD
translate( 316 -337, 466 -487);
rotate (INTER_EL.DOG.headPotition);
strokeWeight( 2 );

beginShape();
vertex( 1 ,  -6 );
vertex( -4 ,  -16 );
vertex( -16 ,  -13 );
vertex( -20 ,  -6 );
vertex( -28 ,  -2 );
vertex( -24 ,  1 );
vertex( -12 ,  -2 );
vertex( -1 ,  8 );

endShape();


// EAR
// translate( 33 , 32 );
strokeWeight( 2 );

beginShape();
vertex( 447 -33 -448 - (316-337),  421-32 -422- (466-487));
//wolf
// vertex( 448 -33 -448 - (316-337)+2,  428-32 -422- (466-487)-18);


// dog
vertex( 448 -33 -448 - (316-337),  428-32 -422- (466-487));
vertex( 454 -33 -448 - (316-337),  427-32 -422- (466-487));

vertex( 455 -33 -448 - (316-337),  419-32 -422- (466-487));
endShape();

// EYE
// translate( 480 , 270 );

strokeWeight( 3 );
fill( 120  , 120  , 120  , 255 );
beginShape(POINTS);
vertex( -179 +480 -337 -(316 -337) , 187+270 -487 -(466 -487));
 endShape();

 fill( drawSoft.colorWheelFull[29 ][186] );
//MOUTH
translate( 303 -337 -(316 -337) , 466 -487-(466 -487) );
rotate (GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogMouthIndex]);
strokeWeight( 2 );

beginShape();
vertex( -1 ,  -2 );
vertex( -12 ,  1 );
vertex( -9 ,  5 );
vertex( 4 ,  1 );
endShape();
rotate (-GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogMouthIndex]);

translate( -(303 -337 -(316 -337)), -(466 -487-(466 -487)));
rotate (-INTER_EL.DOG.headPotition);
translate( -(316 -337), -(466 -487));

//FRONTLEG FRONT
translate(  316 -337 , 470 -487 );
rotate (GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogWalkIndex]);
strokeWeight( 2 );

beginShape();
vertex( -4 ,  -1 );
vertex( -4 ,  18 );
vertex( 4 ,  17 );
vertex( 3 ,  -4 );
endShape();
rotate (-GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogWalkIndex]);
translate(  -(316 -337) , -(470 -487) );

//BACKLEG FRONT
translate( 344 -337, 470 -487 );
rotate (-GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogWalkIndex]);
strokeWeight( 2 );

beginShape();
vertex( -6 ,  -3 );
vertex( 2 ,  10 );
vertex( -3 ,  18 );
vertex( 6 ,  18 );
vertex( 10 ,  5 );
vertex( 2 ,  -6 );
endShape();
rotate (GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.DOG.dogWalkIndex]);
translate( -(344 -337), -(470 -487) );




pop();

}



function drawBirds (bird) 
{
   push();
   // console.log("drawbird" , GAME_PROPS.SIN_128X2_ARRAY[bird.sinCounter])
   // console.log("drawbird" , bird)
   
   translate( bird.x -charLogics.scroll[0] , bird.y ); 
   if (bird.hit)
   {
      rotate (TEST_SIN )
   }
   scale(bird.direction, 1);
   scale(bird.scale);
   stroke (70);
   strokeWeight( 2 );
   fill( drawSoft.colorWheelFull[  115  ][  237  ]);
   beginShape();
   vertex( -89 ,  -20 );
   vertex( 15 ,  -22 );
   vertex( 38 ,  -36 );
   vertex( 63 ,  -36 );
   vertex( 76 ,  -24 );
   vertex( 56 ,  -10 );
   vertex( 78 ,  5 );
   vertex( 32 ,  9 );
   vertex( -10 ,  24 );
   vertex( -54 ,  8 );
   vertex( -88 ,  -12 );
   vertex( -139 ,  3 );
   vertex( -141 ,  -31 ); 
   endShape(CLOSE); 
   
   strokeWeight( 1 );
   fill( drawSoft.colorWheelFull[  27  ][ 94  ]);
   beginShape();
   vertex( 75 ,  -24 );
   vertex( 76 ,  -24 );
   vertex( 112 ,  -7 );
   vertex( 79 ,  4 );
   vertex( 58 ,  -10 );
   endShape();
   
   strokeWeight( 4 );
   stroke( drawSoft.colorWheelFull[  229   ][ 159  ]);
   
   beginShape(LINES);
   vertex( 64 ,  -25 );
   vertex( 54 ,  -33 );
   endShape();
   
   if (!bird.hit)
   {
      scale (1, TEST_SIN)
   }
   
   strokeWeight( 2 );
   stroke( 120  , 120  , 120  , 255 );
   fill( drawSoft.colorWheelFull[  115  ][  237  ]);
   beginShape();
   vertex( -24 ,  -3 );
   vertex( -40 ,  127 );
   vertex( 14 ,  114 );
   vertex( 31 ,  70 );
   vertex( 26 ,  0 );
   endShape();
   
   if (!bird.hit)
   {
      scale (1, 1/ TEST_SIN)
   }
   
   
   
   // translate( 758 , 429 );
   strokeWeight( 11 );
   stroke(drawSoft.colorWheelFull[  229  ][  159  ]);
   beginShape(POINTS);
   vertex( -177 +177 +57,  -133 +133 -23);
   endShape();

   strokeWeight(15);
   stroke(255);
   point(0,0);
   noStroke();
   // rect (-100,-30,200,35) // For calculating hitbox
   scale( 1/bird.scale)
   scale( bird.direction,  1);
   if (bird.hit)
   {
   rotate(-TEST_SIN)
   }
   translate( - bird.x + charLogics.scroll[0] , -bird.y );
   strokeWeight (2);
   
   pop();
   
   
}
function drawThings () 
{

}
//How many enemies. When to draw enemies. CurrentCanyon for scroll and scroll + width?