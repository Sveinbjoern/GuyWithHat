/*

CANDIDATE NR.WP0246

GAME PROJECT: DELIVERY VERSION

I have chosen graphics and enemies as my optional extensions.


GRAPHICS: 
For graphics I tried to make a 2d background with depth. 
This meant making a distorted space that had few values but great distances in the front and many values but short distances in the back.
I animated the dogs mouth, the hammer and the players arm. I made speachbubbles for DOG, the birs and the main character.

Challenges: Distorted space is hard! I nearly cried when I found the formula to create a straight line through the space.
Optimization is hard. I wanted to make a lot more optimizations but simply could not find the time. The biggest saves would be good optmization
the background elements and canyonlines as they are the heavies. 
Randomness is hard. I made a map for the entier background space. A nested array with over a million values, and used it to place the
background items without them colliding. Saddly, I was not able to make it work with the canyonlines so the background items go into the canyonlines.

What I learnd: I learn to manage the warped space! I learned a lot about optimizing, for example not to optimze everything, but rather to 
optimize the heaviest elements. I am quite proud of the timerControllers as they provide a great debug log of what is running
and I want to implement them fully! 

ENEMIES
For enemies I made a dog that follows the player. If you stand still it gets bored barks and walks around and sniffs.
By default it moves around, sniffs and "looks" for you. It barks when it sees you.
I also made birds that you can hit with your hammer.

Challenges: Hitboxes are hard to do, and to control in detail the movement and pauses of DOG was difficult. 

What I learned: I was able to make a hitbox that rotated around with the hammer for precise hits! I learned to 
use a constructor to make enemies (birdsConstructor in levelController.js) and to find ways to control them and
their interaction with the caracter. I learned to use vectors.I learned to build the most rudementary artificial intelligence for DOG. 




YOU CAN USE "B" TO USE THE DEBUG OPTTION. IT CYCLES BETWEEN THREE DIFFERENT PLACES ON THE MAP TO EASILY 
CHECK THING OUT. "Z" TAKES A SCREENSHOT. 

Verion 0.001  29. March. 2021

For previous versions se Versions.txt
*/


/////////////////////////////////////////////////////////////////////////////////////
//SETUP
/////////////////////////////////////////////////////////////////////////////////////

function setup() 
{
    //  CANVAS AND OTHER P5 SETTINGS  
    createCanvas(GAME_PROPS.WIDTH,GAME_PROPS.HEIGHT); 

    //COLORS
     colours();  

    // SETUP FROM characterController.js
    gameChar.setup();
     // SETUP FROM levelGenerator.js
    GAME_PROPS.setup();
    // SETUP FROM levelController.js
    BACKGR.SETUP();
    // SETUP FROM levelController.js
    DIST_BACKG_EL.setup();
    INTER_EL.setup();
    BACKGR.SETUP_CANYONLINES_AND_BACKGR_MAP();
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
    BACKGR.MAP = [];
    
    
    
    
    // LERPING THE COLOR WHEEL COLORS
   for ( i = 0; i < 240; i++) 
   {        
        let currentC = [
                            round(colorWheelMain[i][0]),
                            round(colorWheelMain[i][1]),
                            round(colorWheelMain[i][2])
                        ];
    
        COLOR.colorWheelFull[i] = [];
        
       
        
        for ( j = 0; j < 120; j++) {  
        
                COLOR.colorWheelFull[i][j] =  color( lerp(  255,currentC[0], j/119),
                                                    lerp( 255,currentC[1], j/119),    
                                                    lerp( 255,currentC[2], j/119)
                                                 );
        }
    
        for ( j = 0; j < 120; j++) { 
                COLOR.colorWheelFull[i].push (  color(  lerp(  currentC[0],0, j/119),
                                                lerp( currentC[1],0, j/119),    
                                                lerp( currentC[2],0, j/119)
                                                ));
        } 
   }
   //ONE LINE OF GRAY COLORS
   COLOR.colorWheelFull[240] = [];
   for ( i = 0; i < 240; i++) 
   {        
       
        COLOR.colorWheelFull[240].push(color(   lerp(  255,0, i/239),
                                                lerp(  255,0, i/239),    
                                                lerp(  255,0, i/239)
                                    ));

        
   }

    
  
    optimization.backgrOptimization();

} // End of setup

   

//////////////////////////////////////////////////////////////////////////////////////////////////
//          DRAW FUNCTION
///////////////////////////////////////////////////////////////////////////////////////////////

function draw() 
{ 

    ////////////////////////////////////////////////////////////////////////////////////
    //    Logics
    ////////////////////////////////////////////////////////////////////////////////////
    INTER_EL.DOG.logics();
    INTER_EL.BIRDS.logics();
    gameChar.calculateHitbox();

    charLogics.updateAccelation();
    charLogics.scrollController();
    charLogics.testingBounds();
    optimization.backgrOptimization();
    
    
    if (charLogics.keyPressed.space)
    {
        gameChar.hammerChargeCounter = min (++gameChar.hammerChargeCounter, GAME_CHAR.HAMMER_ROTATION_MAX_INDEX); 
    } 
    
    // FROM UIcontroller
    timerController.runWaitingTimers();

    //
   
    stroke(255, 0, 0);
    
    
    // Lerped
    noStroke();
    for ( i = 0; i < 157; i += 1)
    {  
        fill( COLOR.colorWheelFull[120][ int(177-i)]);
        rect(0, i*2, GAME_PROPS.WIDTH, 2); 
    }
    fill(0);
    //  FROM daytimeController.js
    dtVars.skyLogics();
    
    
    
    drawMountain(   DIST_BACKG_EL.MOUNTAIN_X,
                    DIST_BACKG_EL.MOUNTAIN_Y,
                    DIST_BACKG_EL.MOUNTAIN_SCROLL,
                    DIST_BACKG_EL.MOUNTAIN_SIZE_X);
        
        
    for (i = 0; i < 2; i++)
    {                
    drawHills(  DIST_BACKG_EL.HILLS_X[i],  
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
        fill( COLOR.colorWheelFull[70][ int(210-i/3)]);
        rect(0, BACKGR.START_Y +i, GAME_PROPS.WIDTH, 1); 
        fill(0);
    }


    stroke(150);
    strokeWeight (1);
    fill(101  , 67  , 33  , 255);
    rect(0, height -56, width, 10);
    noStroke();
    fill(0);
    
    
    for (let i = 0  ; i < BACKGR.CANYONLINES.length ; i ++)
    {  
        for (j = optimization.currentCanyonlinesDisplay[0]; j <= optimization.currentCanyonlinesDisplay[1]; j++)
        {
            if (BACKGR.CANYONLINES[i][j].length != 0)
            {
                rect(BACKGR.CANYONLINES[i][j][0] -  optimization.scrollFacArray[BACKGR.NUMBER_Y_CANYON-i]  , BACKGR.STOP_Y_CANYON - i, BACKGR.CANYONLINES[i][j][1], 1); 
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

    //Draw hammer in level and 
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
    
   

    //MAKING IT DARK AT NIGHT
    dtVars.nightTimeShroud();
    
    // displayUI FROM UIController.js
    displayUI ();
    

} //END OF DRAW

 

