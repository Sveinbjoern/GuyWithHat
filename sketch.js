/*

GAME PROJECT: Firs Github version


 

implemented:

Verion 0.0005  1. Aril. 2021

For previous versions se Versions.txt
*/


let TEST_VAR = 0;
var TEST_SIN = 0;
let TEST_SIN_INDEX = 0;

let test = true;


/////////////////////////////////////////////////////////////////////////////////////
//SETUP
/////////////////////////////////////////////////////////////////////////////////////

function setup() 
{
    //  CANVAS AND OTHER P5 SETTINGS  
    createCanvas(GAME_PROPS.WIDTH,GAME_PROPS.HEIGHT); 
    pixelDensity();
    
    
    
    //COLORS
     colours();  
    
    

    // SETUP FOR drawSoft.js
    
    drawSoft.drawPointZero = [GAME_PROPS.WIDTH/2,GAME_PROPS.HEIGHT/2]; 
    drawSoft.SETUP_COLOR_CHOOSER();

    // SETUP FROM characterController.js
    gameChar.setup();
    
    GAME_PROPS.setup();
    // SETUP FROM levelController.js
    
    BACKGR.SETUP();
    
    DIST_BACKG_EL.setup();
    INTER_EL.setup();
    BACKGR.SETUP_CANYONLINES();
    // SETUP FOR DAY AND TIME VARIABLES
    DT_CONSTS.setup();

    //EMPTYING ARRAYS TO FREE SPACE
    BACKGR.DISTANT_TREES_X = [];
    BACKGR.DISTANT_TREES2_X = [];
    BACKGR.TREES_X = [];
    BACKGR.TREES2_X = [];
    BACKGR.ROCKS_X = [];
    BACKGR.HOUSES_X = [];
    BACKGR.DISTANT_TREES_Y = [];
    BACKGR.DISTANT_TREES2_Y = [];
    BACKGR.TREES_Y = [];
    BACKGR.TREES2_Y = [];
    BACKGR.ROCKS_Y = []; 
    BACKGR.HOUSES_Y = [];
    
    
    
    //COORDINATES

    //    FROM changeNumbers.js 
    changeCoordinates();
  
    
    
    // LERPING THE COLOR WHEEL COLORS
 
     
   for ( i = 0; i < 240; i++) 
   {        
          let currentC = [round(colorWheelMain[i][0]),
                            round(colorWheelMain[i][1]),
                            round(colorWheelMain[i][2])
                            ];
    
            drawSoft.colorWheelFull[i] = [];
            
       
            
            for ( j = 0; j < 120; j++) {  
            
                    drawSoft.colorWheelFull[i][j] =  color( lerp(  255,currentC[0], j/119),
                                                        lerp( 255,currentC[1], j/119),    
                                                        lerp( 255,currentC[2], j/119)
                                                     );
            }
    
            for ( j = 0; j < 120; j++) { 
                    drawSoft.colorWheelFull[i].push (  color(  lerp(  currentC[0],0, j/119),
                                                    lerp( currentC[1],0, j/119),    
                                                    lerp( currentC[2],0, j/119)
                                                    ));
            } 
   }
   //ONE LINE OF GRAY COLORS
   drawSoft.colorWheelFull[240] = [];
   for ( i = 0; i < 240; i++) 
   {        
       
        drawSoft.colorWheelFull[240].push(color(  lerp(  255,0, i/239),
                                        lerp(  255,0, i/239),    
                                        lerp(  255,0, i/239)
                                    ));

        
   }
//    console.log(drawSoft.colorWheelFull)
    dtVars.sunColor = [ 40 ,120];
  
    
//  frameRate(30);
} // End of setup

   

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////DRAW FUNCTION
 

function draw() 
{ 
    


    // console.log(frameRate())

    
    
    //   IF FOR THE COLOR SELECTION MENU
    if (drawSoft.colorChooserOn)
    {
        
        drawSoft.currentColorChooser.drawChooser(); 
    } else  
    {
        ////////////////////////////////////////////////////////////////////////////////////
        //    Logics
        ////////////////////////////////////////////////////////////////////////////////////
        
        if (! drawSoft.drawModeOn) //    TO DRAW VERTECIES IN CANVAS FROM drawSoft.js
        {
            INTER_EL.DOG.logics();
            INTER_EL.BIRDS.logics();
            gameChar.calculateHitbox();

            charLogics.updateAccelation();
            charLogics.scrollController();
            charLogics.testingBounds();

            if (! gameChar.hammerPickedUp)
            {
                charLogics.distanceToHammer(); 
            } 
            if (charLogics.scroll[0] <= 120)
            {
                charLogics.distanceToFlag();
            }
        } 
        if (charLogics.keyPressed.space)
        {
            
            gameChar.hammerChargeCounter = min (++gameChar.hammerChargeCounter, GAME_CHAR.HAMMER_ROTATION_MAX_INDEX); 
        }
        
        
        

        // FROM UIcontroller
        timerController.runWaitingTimers();
        

        
        //    image(img,0,0); 
        background(0);
        stroke(255, 0, 0);
        
        
        //    Skybox
        
        
        //  FROM daytimeController.js
        
        dtVars.skyLogics();
        
        
        
        // FROM skyElements.js
        
        
        
        
        drawMountain(   DIST_BACKG_EL.MOUNTAIN_X,
                        DIST_BACKG_EL.MOUNTAIN_Y,
                        DIST_BACKG_EL.MOUNTAIN_SCROLL,
                        DIST_BACKG_EL.MOUNTAIN_SIZE_X);
            
            
            for (i = 0; i < 2; i++)
            {                
                drawHills(      DIST_BACKG_EL.HILLS_X[i],  
                    DIST_BACKG_EL.HILLS_Y[i],
                    DIST_BACKG_EL.HILLS_SCROLL[i],
                    DIST_BACKG_EL.HILLS_SIZE_X[i]);
                } 
                // For loop going through every CLUODS element and drawing each
                for (i = 0; i < DIST_BACKG_EL.CLOUDS.length; i++)
                {
                    drawCloud(  DIST_BACKG_EL.CLOUDS[i].X,
                        DIST_BACKG_EL.CLOUDS[i].Y,
                        DIST_BACKG_EL.CLOUDS[i].SCROLL,
                        DIST_BACKG_EL.CLOUDS[i].SIZE_X,
                        DIST_BACKG_EL.CLOUDS[i].SIZE_Y)    
                    }
                    
                    
                    
                    
                    
        //    Ground
                    
                    
        push();
        
       
        
        noStroke();
        
        
                    //BACKGROUND GREEN GRAS
        for ( i = 0; i < 169; i += 1)
        {  
            fill( drawSoft.colorWheelFull[70][ int(210-i/3)]);
            rect(0, BACKGR.START_Y +i, GAME_PROPS.WIDTH, 1); 
            fill(0);
        }
         stroke(150);
        strokeWeight (1);
        fill(101  , 67  , 33  , 255);
        rect(0, height -56, width, 10);
        noStroke();
        fill(0);
        
        for ( i = 0  ; i < BACKGR.CANYONLINES.length ; i ++)
        {  
            
            
            if (BACKGR.CANYONLINES[i].length != [])
            {
                for (j = 0; j < BACKGR.CANYONLINES[i].length; j++)
                {
                    // console.log("going")
                    if(test)
                    {
                        // console.log(BACKGR.CANYONLINES[i][j])
                        // console.log("BACKGR.CANYONLINES[i][j][0]",BACKGR.CANYONLINES[i][j][0] - charLogics.scroll[0] * BACKGR.SCROLLFAC[BACKGR.STOP_Y_CANYON-i],BACKGR.SCROLLFAC[BACKGR.STOP_Y_CANYON-i], BACKGR.STOP_Y_CANYON - i,BACKGR.CANYONLINES[i][j][1] )
                    }
                    
                    
                    rect(BACKGR.CANYONLINES[i][j][0] - charLogics.scroll[0] * BACKGR.SCROLLFAC[BACKGR.NUMBER_Y_CANYON-i] , BACKGR.STOP_Y_CANYON - i, BACKGR.CANYONLINES[i][j][1], 1); 
                    
                }   
            }
            
        }

        fill( GroundC);
        rect(0, height- 46 , width, 100);  

        pop();
        
        
        // Loop that goes through every background element, Tress included, and draws them firrt after y then sequentially on x(for later optimatication). The actual background elements can be found in drawBackgroundElements.js
        push();
        for (i = 0 ; i < BACKGR.NUMBER_Y_CANYON ;  i ++)
        {
            
            
            if (BACKGR.ELEMENTS[i].length != 0)
            {
                
                
                for (j = 0 ; j < BACKGR.ELEMENTS[i].length ;  j ++) 
                {
                    
                    BACKGR.ELEMENTS[i][j].draw();
                }
                
            }
            
        }
        pop();
        
        
        // FROM interactableElements.js
        drawCanyon(); 
        
       
        
        drawFlagpole ();
        
        //// Draw main character
        
        if (gameChar.isStanding)
        {charLogics.controlCharacterOnground ()} 
        else {charLogics.controlCharacterInAir()}
        
        if (INTER_EL.DOG.drawDog)
        {
            drawDog();
        }
        
        INTER_EL.drawBirds(); 

        //Draw hammer in level
        if (gameChar.hammerPickedUp)
        {
            gameChar.hammers.forEach(element => 
                {
                    
                    push();
                    translate(element.X -charLogics.scroll[0] ,element.Y);
                    scale(0.15); 
                    rotate(element.rotation);
                    drawHammerCenterPosition();
                   
                    
                    
                    pop();
                    //HITBOX
                    
                    element.rotation += element.rotationSpeed/4; 
                    element.X = element.X + element.speedX;
                    element.Y = element.Y + (element.speedY  += GAME_CHAR.GRAVITY);

                    if (gameChar.hammerLeftTest)
                    {
                        if (element.X - gameChar.scrol < GAME_CHAR.HAMMER_OUT_OF_BOUNDS.LEFT)
                        {
                            element.marked = true;
                        }
                    } else if (gameChar.hammerRightTest)
                    {
                        if (element.X -gameChar.scroll > GAME_CHAR.HAMMER_OUT_OF_BOUNDS.RIGHT)
                        {
                            element.marked = true;
                        }
                    } else 
                    {
                        if (element.Y < GAME_CHAR.HAMMER_OUT_OF_BOUNDS.TOP ||
                            element.Y > GAME_CHAR.HAMMER_OUT_OF_BOUNDS.BOTTOM)
                        {
                            element.marked = true;
                        }
                    } 
                });
            
            for (i = 0; i < gameChar.hammers.length; i++)
            {
                if (gameChar.hammers[i].marked)
                {
                    gameChar.hammers.splice(i,1);
                    i--;
                    
                }
            }
            
                
                  
            if (gameChar.hammerLeftTest)
            {
                gameChar.hammerLeftTest = false;
            } else if (gameChar.hammerRightTest)
            {
                gameChar.hammerRightTest = false;
            } else 
            {
                gameChar.hammerLeftTest = true;
                gameChar.hammerRightTest = true;
            }
               

        } else
        {
            push();
            translate(INTER_EL.HAMMER.pos1X -charLogics.scroll[0] ,INTER_EL.HAMMER.pos1Y);
            scale(0.15); 
            rotate( gameChar.hammerRotationStanding)
            drawHammerCenterPosition();
            gameChar.hammerRotationStanding += gameChar.hammerRotationSpeed;

            pop();
            
        }

        //From UIcontroller
        timerController.runExecuteTimers();
        
        
        drawThings();


        //MAKING IT DARK AT NIGHT
        dtVars.nightTimeShroud();
        
        // displayUI FROM UIController.js
        displayUI ();
        
        push();
        

       



        stroke(255,0,0);
        for (let i = BACKGR.NUMBER_Y_CANYON-1 ,j = 0; i >= 0 ; i-- , j++)
        {
            // console.log(  BACKGR.SPACE[i]/2 - charLogics.scroll * BACKGR.SCROLLFAC[i]);
            
            let x;
            
            
            
            
            //WORKS BUT OLD METHOD
            // point ( GAME_PROPS.SCREEN_MIDDLE_X  - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i] , y+i );        
            // point ( GAME_PROPS.LEVEL_LIMITS_X[1] - GAME_PROPS.SCREEN_MIDDLE_X  - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i] , y+i );        
            // point ( GAME_PROPS.LEVEL_LIMITS_X[1] - GAME_PROPS.WIDTH   - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i] , y+i );        
            // point ( (BACKGR.SPACE[i]*0.3) * BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i] +193, y+i );
                    
            // point ( (BACKGR.SPACE[i]*0.18) * BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i] +307, y+i );    
            
            
            
            // point ( 0 - j * BACKGR.SCROLL_CHANGE_FAC *(0-GAME_PROPS.SCREEN_MIDDLE_X) -//* BACKGR.SCROLLFAC[i] - 
            //             charLogics.scroll[0] * BACKGR.SCROLLFAC[i], BACKGR.START_Y +i );

            // x = INTER_EL.CANYONS[0].LEFT -1
            // point ( x - j * BACKGR.SCROLL_CHANGE_FAC *(x-GAME_PROPS.SCREEN_MIDDLE_X) -//* BACKGR.SCROLLFAC[i] - 
            //             charLogics.scroll[0] * BACKGR.SCROLLFAC[i], BACKGR.START_Y +i );
            // x = INTER_EL.CANYONS[0].RIGHT +1
            // point ( x - j * BACKGR.SCROLL_CHANGE_FAC *(x-GAME_PROPS.SCREEN_MIDDLE_X) -//* BACKGR.SCROLLFAC[i] - 
            //             charLogics.scroll[0] * BACKGR.SCROLLFAC[i], BACKGR.START_Y +i );

            // x = INTER_EL.CANYONS[12].LEFT -1
            // point ( x - j * BACKGR.SCROLL_CHANGE_FAC *(x-GAME_PROPS.SCREEN_MIDDLE_X) -//* BACKGR.SCROLLFAC[i] - 
            //             charLogics.scroll[0] * BACKGR.SCROLLFAC[i], BACKGR.START_Y +i );
            // x = INTER_EL.CANYONS[14].RIGHT +1
            // point ( x - j * BACKGR.SCROLL_CHANGE_FAC *(x-GAME_PROPS.SCREEN_MIDDLE_X) -//* BACKGR.SCROLLFAC[i] - 
            //             charLogics.scroll[0] * BACKGR.SCROLLFAC[i], BACKGR.START_Y +i );
            // point ( GAME_PROPS.SCREEN_MIDDLE_X +2000 - j*ChangeFactor*2000 -//* BACKGR.SCROLLFAC[i] - 
            //                 charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            // point ( GAME_PROPS.SCREEN_MIDDLE_X +3000 - j*ChangeFactor*3000 -//* BACKGR.SCROLLFAC[i] - 
            //                     charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            
            // point ( 100 - j*ChangeFactor* (100-GAME_PROPS.SCREEN_MIDDLE_X) -//* BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            // point ( GAME_PROPS.SCREEN_MIDDLE_X -100 + j*ChangeFactor*100 -//* BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            // point ( GAME_PROPS.SCREEN_MIDDLE_X - j*0 -//* BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            // point ( GAME_PROPS.SCREEN_MIDDLE_X +50 - j * ChangeFactor *50 -//* BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            // point ( (GAME_PROPS.LEVEL_LIMITS_X[1]/2) - 
            //     j*ChangeFactor *(GAME_PROPS.LEVEL_LIMITS_X[1]/2-GAME_PROPS.SCREEN_MIDDLE_X)-//* BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            // point ( GAME_PROPS.LEVEL_LIMITS_X[1] - 
            //     j*ChangeFactor *(GAME_PROPS.LEVEL_LIMITS_X[1]-GAME_PROPS.SCREEN_MIDDLE_X)-//* BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            
            
            // point ( 2786 - j*ChangeFactor  *(2786 -GAME_PROPS.SCREEN_MIDDLE_X)     - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i] , y+i );
            // point ( GAME_PROPS.LEVEL_LIMITS_X[1] -1000 - j*ChangeFactor  *(GAME_PROPS.LEVEL_LIMITS_X[1] -1000 -GAME_PROPS.SCREEN_MIDDLE_X)     - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i] , y+i );

            // point ( BACKGR.SPACE[i]*0.4 * BACKGR.SCROLLFAC[i]  +98- 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i] , y+i );

            // point ( (BACKGR.SPACE[i]) * BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i]-GAME_PROPS.SCREEN_MIDDLE_X, y+i );
                    
            // point ( (x - charLogics.scroll) * BACKGR.SCROLLFAC[i], y+i );
            
            // if (test)
            // {console.log(x)}
            // point ( 2000 *0.99 - charLogics.scroll * BACKGR.SCROLLFAC[i] -1000, y+i );
            // point ( 1000 *0.99 - charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            // point ( 1000 *0.99 - charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
        

            // point ( (BACKGR.SPACE[i] -GAME_PROPS.SCREEN_MIDDLE_X)+ i*-23 - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            if (test)
            {
                

            

            }
            // point ( (0) * BACKGR.SCROLLFAC[i] - 
            //         charLogics.scroll * BACKGR.SCROLLFAC[i], y+i );
            // let testX = map (x , 0, BACKGR.SPACE[169] -change, 0 , BACKGR.SPACE[i]-change);
                    
            // point ( (testX - charLogics.scroll) * BACKGR.SCROLLFAC[i], y+i );
            
        }


        // line(...BACKGR.TEST_BOX);
        // line(   BACKGR.TEST_BOX[0]-charLogics.scroll[0]*BACKGR.SCROLLFAC[BACKGR.TEST_BOX[1]-BACKGR.START_Y],
        //         BACKGR.TEST_BOX[1],BACKGR.TEST_BOX[2]-charLogics.scroll[0]*BACKGR.SCROLLFAC[BACKGR.TEST_BOX[3]-BACKGR.START_Y],BACKGR.TEST_BOX[3]);
        // console.log(...BACKGR.TEST_BOX);
       
        pop();
        
        
        if (drawSoft.drawModeOn) //    TO DRAW VERTECIES IN CANVAS FROM drawSoft.js
        {
            push();
            strokeWeight(4);
            
            point(drawSoft.drawPointZero[0], drawSoft.drawPointZero[1])
            pop();
            drawSoftVertecies (); 
        } 

       

        // TEST
            // push();
            // strokeWeight (10)
            // line  ( 100,200,300 ,315);
            // line  ( 100,200,300 ,315);

        // TEST_VAR = 0;    
        TEST_VAR += 0.1 ;
        // if (TEST_VAR >= 1) {TEST_VAR = 0}; 
        TEST_SIN_INDEX += 1;
        if (TEST_SIN_INDEX > GAME_PROPS.SIN_128X2_ARRAY_LIMIT) {TEST_SIN_INDEX = 0;} 
        TEST_SIN = GAME_PROPS.SIN_128X2_ARRAY[TEST_SIN_INDEX];
            // pop()
            test = false;
    }// END OF ELSE
} //END OF DRAW

 

