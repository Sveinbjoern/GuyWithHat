// draw the character in one of four states. 
// Standing Walking Left/Right Jumping Up/Left/Right 
// Update position code




////////////////////////////////////////////////////////////////
//VARIABLES AND CONSTANTS AND FUNCTIONS FOR CHARACTER CONTROL:
////////////////////////////////////////////////////////////////
const GAME_CHAR = 
{
    
    GRAVITY : 0.3, 
    
    JUMP_MAX : -12,
    JUMP_MIN : -4,
    JUMP_INCREMENT : -0.5,

    JUMP_COMP_ARRAY: [], // Values for compressing and expanding the charcter for charging jump
    JUMP_EXP_ARRAY: [],
    JUMP_MAX_COMP: 0.8,
    JUMP_MAX_EXP: 1.1,
    JUMP_COMP_LAST_INDEX: 0, 
    JUMP_COMP_OBJECT:
    {
        startVal: 1,
        endVal: 0,
        amount: 0, 
        slowStart: false, 
        power: 2, 
        precision: 5, 
    },
    JUMP_EXP_OBJECT:
    {
        startVal: 1, 
        endVal: 0, 
        amount: 0, 
        slowStart: false, 
        power: 2, 
        precision: 5,
    },

    MAX_SPEED_X : 10,
    SPEED_DROP_X : 0.8,
    ACCELERATION_X : 0.5,
    SLIPPING_SPEED : 0.2,

    HAMMER_CHARGE_ARRAY: [],
    HAMMER_CHARGE_ROTATION_ARR: [],
    HAMMER_CHARGE_OBJECT:
    {
        startVal: 5, 
        endVal: 20, 
        amount: 41, 
        slowStart: false, 
        power: 1, 
        precision: 5,
    },
    HAMMER_CHARGE_ROTATION_OBJ: 
    {
        startVal: 0, 
        endVal: 1.25, 
        amount: 41, 
        slowStart: false, 
        power: 2, 
        precision: 7,
    },
    HAMMER_ROTATION_MAX_INDEX: 40,
    HAMMER_CHARGING_MIN_X: 3,
    HAMMER_CHARGING_MAX_X: 10,
    HAMMER_STARTING_SPEED_Y: -5,
    HAMMER_STANDING_ROTATION: 1,
    HAMMER_THROWN_ROTATION_START: 0,
    HAMMER_THROWN_ROTATION_MIN: 0.3,
    HAMMER_THROWN_ROTATION_MAX: 2,

    HAMMER_OUT_OF_BOUNDS:
    {
        TOP: -200,
        BOTTOM: +600,
        LEFT: -100,
        RIGHT: 0,//Fixed in setup in gameChar
    },

    STARTING_LIVES : 4,

    //HITBOX CONSTANTS
    BIRD_LIMITS : [],
}
 


const gameChar = 
{
    // MOVEMENT AND POSITION
    startX: 200,
    startY: 200,
    screenX : 0,
    speedX : 0,
    speedY : 0,
    y: 0,
    worldX: 0,
    isStanding : false,
    jumpCounter : GAME_CHAR.JUMP_MIN, 
    jumpCompCounter: 0,
    inCanyon : false,
    
    currentCanyonIndex: 0,
    currentDirection: 1,
    points : 0,
    landingPos: 0,
    

    //UI and Pickable items variables
    hasWon: false,
    gameOver : false,
    winCondition: false,
    infoText : false,
    lives : 4, 
    hammerPickedUp : false,
    hammerRotationStanding: 0,

    hammerRotationSpeed: 0.03,
    
    hammerChargeCounter: 0,
    hammerChargeRotation: 0, 
    numberOfHammers: 0,
    hammers: [],
    hammerTextCounter : 150,
    hammerLeftTest: false,
    hammerRightTest: false,
    

    //HITBOX system
    lastBirdIndexLeft : 0,
    lastBirdIndexRight : 0,
    lastHammerIndexLeft: 0,
    lastHammerIndexRight: 0,
    


    setup: function ()
    {   
        //VALUES IN THIS OBJECT
        this.y = this.startY;
        this.worldX = this.startX; 
        
        // CONSTANTS FOR GAME_CHAR
        let lengthOfJump = (GAME_CHAR.JUMP_MAX - GAME_CHAR.JUMP_MIN) / GAME_CHAR.JUMP_INCREMENT +1;
        GAME_CHAR.JUMP_EXP_OBJECT.amount = lengthOfJump;
        GAME_CHAR.JUMP_COMP_OBJECT.amount = lengthOfJump;
        GAME_CHAR.JUMP_EXP_OBJECT.endVal = GAME_CHAR.JUMP_MAX_EXP;
        GAME_CHAR.JUMP_COMP_OBJECT.endVal = GAME_CHAR.JUMP_MAX_COMP;
        GAME_CHAR.HAMMER_OUT_OF_BOUNDS.RIGHT = GAME_PROPS.WIDTH + 100;
        
        //QUADRATIC EASING for COMP AND EXP arrays    
        
        GAME_CHAR.JUMP_COMP_ARRAY = GAME_PROPS.easedArray( GAME_CHAR.JUMP_COMP_OBJECT );
        GAME_CHAR.JUMP_EXP_ARRAY = GAME_PROPS.easedArray( GAME_CHAR.JUMP_EXP_OBJECT );
       
        GAME_CHAR.HAMMER_CHARGE_ARRAY = GAME_PROPS.easedArray( GAME_CHAR.HAMMER_CHARGE_OBJECT );
        GAME_CHAR.HAMMER_CHARGE_ROTATION_ARR =  GAME_PROPS.easedArray( GAME_CHAR.HAMMER_CHARGE_ROTATION_OBJ );
        


        GAME_CHAR.JUMP_COMP_LAST_INDEX = GAME_CHAR.JUMP_COMP_ARRAY.length -1;
    

    },

    
    throwHammer: function ()
    {
        

        // this.hammers.push ( {
        //     X: gameChar.worldX,
        //     Y: gameChar.y -40,
        //     rotationSpeed: 0.01,
        //     rotation: 0,
        //     direction: gameChar.currentDirection,
        //     speedX: 0,
        //     speedY: 0,
        //     // speedVector: createVector (currentdirection*gameChar gameChar.speedX, );

        // })
           // DO STUFF
        if (this.numberOfHammers > this.hammers.length)
        {
            this.hammers.push( factoryHammer());
        }


        function factoryHammer ()
        {
            let hammer = 
            {
                X: gameChar.worldX,
                Y: gameChar.y -40,
                rotationSpeed: map( gameChar.hammerChargeCounter,0, GAME_CHAR.HAMMER_ROTATION_MAX_INDEX,
                                    GAME_CHAR.HAMMER_THROWN_ROTATION_MIN,GAME_CHAR.HAMMER_CHARGING_MAX_X) * gameChar.currentDirection,
                rotation: GAME_CHAR.HAMMER_THROWN_ROTATION_START* gameChar.currentDirection,
                direction: gameChar.currentDirection,
                speedX: gameChar.speedX + GAME_CHAR.HAMMER_CHARGE_ARRAY[gameChar.hammerChargeCounter] * gameChar.currentDirection,
                speedY: GAME_CHAR.HAMMER_STARTING_SPEED_Y,
                marked: false,

                //hitbox
                currentHitBoxIndexRight: (floor (INTER_EL.birdsGoingRight.length/2)),
                currentHitBoxIndexLeft: (floor (INTER_EL.birdsGoingLeft.length/2)),


                // speedVector: createVector (currentdirection*gameChar gameChar.speedX, );

            }
            return hammer;
        }
    }, 

    calculateHitbox: function ()
    {
        // hitBox
        let hitBox = 
        {
            left :  gameChar.worldX -18,
            right:  gameChar.worldX + 18,
            top:    gameChar.y - 70,
            bottom: gameChar.y -10,
            center: gameChar.y -40,
        }  
        

        let birdDifference = 
        {
            left: hitBox.left+ GAME_CHAR.BIRD_LIMITS[0],
            right: hitBox.right+ GAME_CHAR.BIRD_LIMITS[1],
            top: hitBox.top + GAME_CHAR.BIRD_LIMITS[2],
            bottom: hitBox.bottom+ GAME_CHAR.BIRD_LIMITS[3],
        }
        
        let maxIndexLeft = INTER_EL.birdsGoingLeft.length-1;
        let maxIndexRight = INTER_EL.birdsGoingRight.length-1;

        let trueCheck = true;
        let startIndexLeft = gameChar.lastBirdIndexLeft;
        let startIndexRight = gameChar.lastBirdIndexRight;
        let searchIndexLeft = []  ;
        let searchIndexRight = [] ;

        let posssibleMatches = []
        let adjustedIndex = 0;
        // console.log("regular hitbox",birdDifference)
        if (maxIndexLeft +1) 
        {   
            startIndexLeft = min (startIndexLeft , maxIndexLeft)
            // console.log("if statement hitbox Left")
            for (i = startIndexLeft;;)
            { 
                // console.log("hitbox while Left",  INTER_EL.birdsGoingLeft[i].x <=  birdDifference[0])
                // console.log(i)
                if (INTER_EL.birdsGoingLeft[i].x <=  birdDifference.left)
                {
                    i++; 
                    // console.log("first if First value Left"); 
                    if (i > maxIndexLeft) { break;} 
                    trueCheck = false; //true check here means no one to the left
                }
                else if (trueCheck)
                {
                    // console.log("second if First value Left")
                    searchIndexLeft[0] =i;
                    i--; 
                    if (i < 0 ) 
                    {break;}
                    
                }  else
                {
                    // console.log("getting values for SearchIndexLeft")
                    searchIndexLeft[0] = i;
                    break;
                } 
                // console.log(searchIndexRight)
                // console.log(++timesRun)
            }
            // // console.log("searchLeft after fist check",searchIndexLeft)
            if (searchIndexLeft.length == 1)
                for (i = searchIndexLeft[0];;)
                { 
                    // console.log(searchIndexLeft)

                    // console.log("hitbox while Left Second")
                    if (INTER_EL.birdsGoingLeft[i].x >=  birdDifference.right)
                    {
                        break;
                        
                    } 
                    else  
                    {
                        searchIndexLeft[1] = i;
                          
                        if (++i > maxIndexLeft) 
                        { break;}
                        
                    } 
                } 


               
                // console.log(gameChar.lastBirdIndexLeft);
        }


    

         

        // console.log("XrangeLeft",searchIndexLeft)

        
        if (maxIndexRight +1)
        {   
            trueCheck = true;
            // // console.log("if statement hitbox Right")
            
            startIndexRight = min (startIndexRight , maxIndexRight)
            for (i = startIndexRight;;)
            { 
                // console.log("hitbox while Right")
                if (INTER_EL.birdsGoingRight[i].x >=  birdDifference.right)
                {
                    i++; 
                    // console.log("first if First value Left"); 
                    if (i > maxIndexRight) { break;} 
                    trueCheck = false; //true check here means no one to the right
                }    
                else if (trueCheck) 
                {
                    searchIndexRight[0] = i;
                    i--; 
                    if (i < 0 ) 
                    {break;}
                    
                } 
                else 
                {
                    searchIndexRight[0] = i;
                    
                    break;
                }
                // console.log(searchIndexRight)
            }
            if (searchIndexRight.length == 1)
                for (i = searchIndexRight[0];;)
                { 
                    // console.log(searchIndexRight)
                    // console.log("hitbox while Right Second")
                    // console.log(i)
                    if (INTER_EL.birdsGoingRight[i].x <=  birdDifference.left)
                    { break;} 
                    else  
                    {
                        searchIndexRight[1] = i;
                         
                        if (++i > maxIndexRight) 
                        {
                            break;
                        }
                    } 
                    // console.log(searchIndexRight)
                    // console.log(++timesRun)
                    
                } 
        }
        

        gameChar.lastBirdIndexLeft = searchIndexLeft[0] ||  gameChar.lastBirdIndexLeft;
        gameChar.lastBirdIndexRight = searchIndexRight[0] || gameChar.lastBirdIndexRight;

        // if (searchIndexRight.length > 0 || searchIndexLeft.length > 0)
        // {console.log( searchIndexLeft, "LEFT , RIGTH", searchIndexRight)}


        if (searchIndexRight.length == 2)
        {
            for (i= searchIndexRight[0]; i <= searchIndexRight[1];i++)
            {
               
                if (INTER_EL.birdsGoingRight[i].y > birdDifference.top && INTER_EL.birdsGoingRight[i].y < birdDifference.bottom )
                {
                   
                   
                    INTER_EL.birdsGoingRight[i].vector = createVector(  gameChar.worldX - INTER_EL.birdsGoingRight[i].x,
                                                                        hitBox.center - INTER_EL.birdsGoingRight[i].y);
                    // console.log("mag",INTER_EL.birdsGoingRight[i].vector.mag());
                    // console.log("parts of vector", INTER_EL.birdsGoingRight[i].vector.x ,INTER_EL.birdsGoingRight[i].vector.y )
                    
                    INTER_EL.birdsGoingRight[i].x -= INTER_EL.birdsGoingRight[i].vector.x;
                    INTER_EL.birdsGoingRight[i].y -= INTER_EL.birdsGoingRight[i].vector.y;
                    gameChar.speedX = constrain(gameChar.speedX += INTER_EL.birdsGoingRight[i].vector.x, -15,15);
                    gameChar.speedY = constrain(gameChar.speedY += INTER_EL.birdsGoingRight[i].vector.y, -10,15);
               
                    // MAKE SURE THE BIRS ARE IN THE CORRECT POSITION IN THE ARRAY AGAIN
                    let isChecking = true;
                    let checkLeft = i >= maxIndexRight ? false : true;
                    let checkRight = i <= 0 ? false : true;
                    while (isChecking)
                    {
                        
                        if (checkRight && INTER_EL.birdsGoingRight[i].x > INTER_EL.birdsGoingRight[i-1].x )
                        {
                            checkLeft = false;
                            let tmp = INTER_EL.birdsGoingRight[i-1];
                            INTER_EL.birdsGoingRight[i-1] = INTER_EL.birdsGoingRight[i];
                            INTER_EL.birdsGoingRight[i] = tmp;
                            i--;
                            isChecking = i <= 0 ? false: true; 
                        } else if (checkLeft && INTER_EL.birdsGoingRight[i].x < INTER_EL.birdsGoingRight[i+1].x)
                        {
                            checkRight = false;
                            let tmp = INTER_EL.birdsGoingRight[i+1];
                            INTER_EL.birdsGoingRight[i+1] = INTER_EL.birdsGoingRight[i];
                            INTER_EL.birdsGoingRight[i] = tmp;
                            i++;
                            isChecking = i >= maxIndexRight ? false: true;

                        } else {isChecking = false;}
                    }
               
                }

                // gameChar.worldX += 10;
                // gameChar.screenX += 10;
                // gameChar.speedX += 10;
            } 
        }

        
        if (searchIndexLeft.length == 2)
        {
            for (i= searchIndexLeft[0]; i <= searchIndexLeft[1];i++)
            {
                if (INTER_EL.birdsGoingLeft[i].y > birdDifference.top && INTER_EL.birdsGoingLeft[i].y < birdDifference.bottom )
                {
                    let x = gameChar.worldX - INTER_EL.birdsGoingLeft[i].x;
                    let y = hitBox.center - INTER_EL.birdsGoingLeft[i].y;

                    INTER_EL.birdsGoingLeft[i].vector = createVector(x,y);

                    INTER_EL.birdsGoingLeft[i].x -= INTER_EL.birdsGoingLeft[i].vector.x;
                    INTER_EL.birdsGoingLeft[i].y -= INTER_EL.birdsGoingLeft[i].vector.y;
                    gameChar.speedX = constrain(gameChar.speedX += INTER_EL.birdsGoingLeft[i].vector.x, -15,15);
                    gameChar.speedY = constrain(gameChar.speedY += INTER_EL.birdsGoingLeft[i].vector.y, -10,15);
               
                    // MAKE SURE THE BIRS ARE IN THE CORRECT POSITION IN THE ARRAY AGAIN
                    let isChecking = true;
                    let checkRight = i >= maxIndexLeft ? false : true;
                    let checkLeft = i <= 0 ? false : true;
                    while (isChecking)
                    {
                        if (checkLeft && INTER_EL.birdsGoingLeft[i].x < 
                            INTER_EL.birdsGoingLeft[i-1].x )
                        {
                            checkRight = false;
                            let tmp = INTER_EL.birdsGoingLeft[i-1];
                            INTER_EL.birdsGoingLeft[i-1] = INTER_EL.birdsGoingLeft[i];
                            INTER_EL.birdsGoingLeft[i] = tmp;
                            i--;
                            isChecking = i <= 0 ? false: true; 
                        } else if (checkRight && INTER_EL.birdsGoingLeft[i].x > INTER_EL.birdsGoingLeft[i+1].x)
                        {
                            checkLeft = false;
                            let tmp = INTER_EL.birdsGoingLeft[i+1];
                            INTER_EL.birdsGoingLeft[i+1] = INTER_EL.birdsGoingLeft[i];
                            INTER_EL.birdsGoingLeft[i] = tmp;
                            i++;
                            isChecking = i >= maxIndexLeft ? false: true;

                        } else {isChecking = false;}
                    }
                   
                }

            }
        }
        // console.log("XrangeRight",searchIndexRight)
        // isMember ? '$2.00' : 
        // rect (-18,-70,34,60);
        
        // candidates:
        // find closests birds ()

        // Bird hitbox
        // rect (-100,-30,200,35)

        gameChar.hammers.forEach(hammerBoxes);
        // forEach 
        

        function hammerBoxes(element)
        {
            

            let sinElementRotation = sin(element.rotation);
            let cosElementRotation = cos(element.rotation);

            let hammerSinX = element.X   + sinElementRotation *10;
            let hammerCosY = element.Y   - cosElementRotation *10;

            let handleSinX = element.X   - sinElementRotation *6;
            let handleCosY = element.Y   + cosElementRotation *6;

            let headBox = 
            {
                left :  hammerSinX - 16,
                right:  hammerSinX + 16,
                top:    hammerCosY - 16,
                bottom: hammerCosY + 16,
                center: [hammerSinX,hammerCosY],
            }


            let handleBox =
            {
                left :  handleSinX - 10,
                right:  handleSinX + 10,
                top:    handleCosY - 10,
                bottom: handleCosY + 10,
                center: [handleSinX,handleCosY],

            }
        
            if (handleBox.left < headBox.left)
            {
                birdDifference = 
                {
                    left: handleBox.left+ GAME_CHAR.BIRD_LIMITS[0],
                    right: headBox.right+ GAME_CHAR.BIRD_LIMITS[1],
                }
            } else
            [
                birdDifference = 
                {
                    left: headBox.left+ GAME_CHAR.BIRD_LIMITS[0],
                    right: handleBox.right+ GAME_CHAR.BIRD_LIMITS[1],
                }
            ]
            
            if (handleBox.top < headBox.top)
            {
                birdDifference.top = handleBox.top + GAME_CHAR.BIRD_LIMITS[2];
                birdDifference.bottom = headBox.bottom+ GAME_CHAR.BIRD_LIMITS[3];
            } else
            {
                birdDifference.top = headBox.top + GAME_CHAR.BIRD_LIMITS[2];
                birdDifference.bottom = handleBox.bottom+ GAME_CHAR.BIRD_LIMITS[3];
            }
            

            trueCheck = true;
            startIndexLeft = min (gameChar.lastHammerIndexLeft , maxIndexLeft );
            startIndexRight = min (gameChar.lastHammerIndexRight , maxIndexRight);
            searchIndexLeft = []  ;
            searchIndexRight = [] ;
            // console.log("birdDifference",birdDifference)
            if (maxIndexLeft +1) 
            {   
                
                // console.log("if statement hitbox Left")
                for (let i = startIndexLeft;;)
                { 
                    // console.log("hitbox while Left",  INTER_EL.birdsGoingLeft[i].x <=  birdDifference.left)
                    // console.log("hitbox while Left",  INTER_EL.birdsGoingLeft[i].x <=  birdDifference.left)
                    // console.log("startindexLeft",i)
                    if (INTER_EL.birdsGoingLeft[i].x <=  birdDifference.left)
                    {
                        i++; 
                        // console.log("first if First value Left"); 
                        if (i > maxIndexLeft) { break;} 
                        trueCheck = false; //true check here means no one to the left
                    }
                    else if (trueCheck)
                    {
                        // console.log("second if First value Left")
                        searchIndexLeft[0] =i;
                        i--; 
                        if (i < 0 ) 
                        {break;}
                        
                    }  else
                    {
                        // console.log("getting values for SearchIndexLeft")
                        searchIndexLeft[0] = i;
                        break;
                    } 
                    // console.log(searchIndexRight)
                    // console.log(++timesRun)
                }
                // // console.log("searchLeft after fist check",searchIndexLeft)
                if (searchIndexLeft.length == 1)
                    for (i = searchIndexLeft[0];;)
                    { 
                        // console.log(searchIndexLeft)

                        // console.log("hitbox while Left Second")
                        if (INTER_EL.birdsGoingLeft[i].x >=  birdDifference.right)
                        {
                            break; 
                            
                        } 
                        else  
                        {
                            searchIndexLeft[1] = i;
                            
                            if (++i > maxIndexLeft) 
                            { break;}
                            
                        } 
                    } 


                
                    // console.log(gameChar.lastBirdIndexLeft);
            }


        

            

            // console.log("XrangeLeft",searchIndexLeft)

            
            if (maxIndexRight +1)
            {   
                trueCheck = true;
                // console.log("if statement hitbox Right")
                
                
                for (i = startIndexRight;;) 
                { 
                    // console.log("hitbox while Right")
                    if (INTER_EL.birdsGoingRight[i].x >=  birdDifference.right)
                    {
                        i++; 
                        // console.log("first if First value Left"); 
                        if (i > maxIndexRight) { break;} 
                        trueCheck = false; //true check here means no one to the right
                    }    
                    else if (trueCheck) 
                    {
                        searchIndexRight[0] = i;
                        i--; 
                        if (i < 0 ) 
                        {break;}
                        
                    } 
                    else 
                    {
                        searchIndexRight[0] = i;
                        
                        break;
                    }
                    // console.log("searchIndexRight after check",searchIndexRight)
                }
                if (searchIndexRight.length == 1)
                    for (i = searchIndexRight[0];;)
                    { 
                        // console.log(searchIndexRight)
                        // console.log("hitbox while Right Second")
                        // console.log(i)
                        if (INTER_EL.birdsGoingRight[i].x <=  birdDifference.left)
                        { break;} 
                        else  
                        {
                            searchIndexRight[1] = i;
                            
                            if (++i > maxIndexRight) 
                            {
                                break;
                            }
                        } 
                        // console.log(searchIndexRight)
                        // console.log(++timesRun)
                        
                    } 
            }
            

            gameChar.lastHammerIndexLeft = searchIndexLeft[0] ||  gameChar.lastBirdIndexLeft;
            gameChar.lastHammerIndexRight = searchIndexRight[0] || gameChar.lastBirdIndexRight;
            //    console.log(headBox, handleBox)
           
            // rectMode(CENTER)
            //            noStroke();
            //            fill(255,120);
                    
            //         rect ( (element.X -charLogics.scroll[0]) - sin (element.rotation) *6  , (element.Y )  + cos (element.rotation) *8, 10 , 10 );
            //         rect ( (element.X -charLogics.scroll[0]) + sin (element.rotation) *10  , (element.Y )  - cos (element.rotation) *10, 16,16 ); 
            
            // variable for the last part
            
            
            if (searchIndexRight.length == 2)
            {
                
                // console.log("searchIndexRight.length ==2 Right")
                for (let i= searchIndexRight[0]; i <= searchIndexRight[1];i++)
                {
                    if (INTER_EL.birdsGoingRight[i].y < birdDifference.bottom && 
                        INTER_EL.birdsGoingRight[i].y > birdDifference.top)
                    {
                        posssibleMatches.push(i);
                    }
                } 
                // console.log("possibleMathces after trimming", posssibleMatches)
                if (posssibleMatches.length > 0)
                {
                    
                    // console.log("possiblematches",posssibleMatches)
                    birdDifferenceHead = 
                    {
                        left: headBox.left+ GAME_CHAR.BIRD_LIMITS[0],
                        right: headBox.right+ GAME_CHAR.BIRD_LIMITS[1],
                        top: headBox.top + GAME_CHAR.BIRD_LIMITS[2],
                        bottom: headBox.bottom+ GAME_CHAR.BIRD_LIMITS[3],
                    }

                    birdDifferenceHandle = 
                    {
                        left: handleBox.left+ GAME_CHAR.BIRD_LIMITS[0],
                        right: handleBox.right+ GAME_CHAR.BIRD_LIMITS[1],
                        top: handleBox.top + GAME_CHAR.BIRD_LIMITS[2],
                        bottom: handleBox.bottom+ GAME_CHAR.BIRD_LIMITS[3],
                    }

                    for (let j = 0; j < posssibleMatches.length; j++)
                    {
                        i = posssibleMatches[j] +adjustedIndex;
                        let handleHit = false;
                        let headHit = false;

                        if (INTER_EL.birdsGoingRight[i].x < birdDifferenceHead.right &&
                            INTER_EL.birdsGoingRight[i].x > birdDifferenceHead.left &&
                            INTER_EL.birdsGoingRight[i].y < birdDifferenceHead.bottom &&
                            INTER_EL.birdsGoingRight[i].y > birdDifferenceHead.top)
                        {headHit = true;}

                        if (INTER_EL.birdsGoingRight[i].x < birdDifferenceHead.right &&
                            INTER_EL.birdsGoingRight[i].x > birdDifferenceHead.left &&
                            INTER_EL.birdsGoingRight[i].y < birdDifferenceHead.bottom &&
                            INTER_EL.birdsGoingRight[i].y > birdDifferenceHead.top)
                        {handleHit = true;}

                        // console.log("handlhit", handleHit ,"headhit", headHit)
                        // console.log("birds.x", INTER_EL.birdsGoingRight[i].x ,"birddiffleft", birdDifferenceHead.left)

                        if (handleHit && headHit)
                        {
                            let x = element.X - INTER_EL.birdsGoingRight[i].x;
                            let y = element.Y - INTER_EL.birdsGoingRight[i].y;
                             
                            INTER_EL.birdsGoingRight[i].vector = createVector(x,y);

                            

                            INTER_EL.birdsGoingRight[i].x -= INTER_EL.birdsGoingRight[i].vector.x *3;
                            INTER_EL.birdsGoingRight[i].y -= INTER_EL.birdsGoingRight[i].vector.y *3;
                            element.rotationSpeed -= INTER_EL.birdsGoingRight[i].vector.mag()/8;
                            element.speedX += INTER_EL.birdsGoingRight[i].vector.x/3;
                            element.speedY += INTER_EL.birdsGoingRight[i].vector.y/3;
                            
                            INTER_EL.birdsGoingRight[i].vector.x += 5;
                            console.log(INTER_EL.birdsGoingRight[i].vector.mag());
                            if (INTER_EL.birdsGoingRight[i].vector.mag() > 15 )
                            {
                                INTER_EL.birdsGoingRight[i].hit = true;
                                INTER_EL.birdsGoingDown.push(INTER_EL.birdsGoingRight[i]);
                                INTER_EL.birdsGoingRight.splice(i,1);
                                adjustedIndex--;
                            } else
                            {
                                //find position in going right function
                                let isChecking = true;
                                let checkLeft = i >= maxIndexRight ? false : true;
                                let checkRight = i <= 0 ? false : true;
                                while (isChecking)
                                {
                                    
                                    if (checkRight && INTER_EL.birdsGoingRight[i].x > INTER_EL.birdsGoingRight[i-1].x )
                                    {
                                        checkLeft = false;
                                        let tmp = INTER_EL.birdsGoingRight[i-1];
                                        INTER_EL.birdsGoingRight[i-1] = INTER_EL.birdsGoingRight[i];
                                        INTER_EL.birdsGoingRight[i] = tmp;
                                        i--;
                                        isChecking = i <= 0 ? false: true; 
                                    } else if (checkLeft && INTER_EL.birdsGoingRight[i].x < INTER_EL.birdsGoingRight[i+1].x)
                                    {
                                        checkRight = false;
                                        let tmp = INTER_EL.birdsGoingRight[i+1];
                                        INTER_EL.birdsGoingRight[i+1] = INTER_EL.birdsGoingRight[i];
                                        INTER_EL.birdsGoingRight[i] = tmp;
                                        i++;
                                        isChecking = i >= maxIndexRight ? false: true;

                                    } else {isChecking = false;}
                                }
                            }
                            
                            
                        } else if (headHit)
                        {
                            let x = headBox.center[0] - INTER_EL.birdsGoingRight[i].x;
                            let y = headBox.center[1] - INTER_EL.birdsGoingRight[i].y;
                             
                            INTER_EL.birdsGoingRight[i].vector = createVector(x,y);

                            

                            INTER_EL.birdsGoingRight[i].x -= INTER_EL.birdsGoingRight[i].vector.x *3;
                            INTER_EL.birdsGoingRight[i].y -= INTER_EL.birdsGoingRight[i].vector.y *3;
                            element.rotationSpeed -= INTER_EL.birdsGoingRight[i].vector.mag()/8;
                            element.speedX += INTER_EL.birdsGoingRight[i].vector.x/3;
                            element.speedY += INTER_EL.birdsGoingRight[i].vector.y/3;
                            
                            INTER_EL.birdsGoingRight[i].vector.x += 5;
                            if (INTER_EL.birdsGoingRight[i].vector.mag() > 15 )
                            {
                                INTER_EL.birdsGoingLeft[i].hit = true;
                                INTER_EL.birdsGoingRight.push(INTER_EL.birdsGoingRight[i])
                                INTER_EL.birdsGoingRight.splice(i,1);
                                adjustedIndex--;
                            } else
                            {
                                //find position in going right function
                                let isChecking = true;
                                let checkLeft = i >= maxIndexRight ? false : true;
                                let checkRight = i <= 0 ? false : true;
                                while (isChecking)
                                {
                                    
                                    if (checkRight && INTER_EL.birdsGoingRight[i].x > INTER_EL.birdsGoingRight[i-1].x )
                                    {
                                        checkLeft = false;
                                        let tmp = INTER_EL.birdsGoingRight[i-1];
                                        INTER_EL.birdsGoingRight[i-1] = INTER_EL.birdsGoingRight[i];
                                        INTER_EL.birdsGoingRight[i] = tmp;
                                        i--;
                                        isChecking = i <= 0 ? false: true; 
                                    } else if (checkLeft && INTER_EL.birdsGoingRight[i].x < INTER_EL.birdsGoingRight[i+1].x)
                                    {
                                        checkRight = false;
                                        let tmp = INTER_EL.birdsGoingRight[i+1];
                                        INTER_EL.birdsGoingRight[i+1] = INTER_EL.birdsGoingRight[i];
                                        INTER_EL.birdsGoingRight[i] = tmp;
                                        i++;
                                        isChecking = i >= maxIndexRight ? false: true;

                                    } else {isChecking = false;}
                                }
                            }
                        } else if (handleHit)
                        {
                            let x = handleBox.center[0] - INTER_EL.birdsGoingRight[i].x;
                            let y = handleBox.center[1] - INTER_EL.birdsGoingRight[i].y;
                             
                            INTER_EL.birdsGoingRight[i].vector = createVector(x,y);

                            

                            INTER_EL.birdsGoingRight[i].x -= INTER_EL.birdsGoingRight[i].vector.x *3;
                            INTER_EL.birdsGoingRight[i].y -= INTER_EL.birdsGoingRight[i].vector.y *3;
                            element.rotationSpeed -= INTER_EL.birdsGoingRight[i].vector.mag()/8;
                            element.speedX += INTER_EL.birdsGoingRight[i].vector.x/3;
                            element.speedY += INTER_EL.birdsGoingRight[i].vector.y/3;
                            
                            INTER_EL.birdsGoingRight[i].vector.x += 5;
                            if (INTER_EL.birdsGoingRight[i].vector.mag() > 15 )
                            {
                                INTER_EL.birdsGoingLeft[i].hit = true;
                                INTER_EL.birdsGoingRight.push(INTER_EL.birdsGoingRight[i])
                                INTER_EL.birdsGoingRight.splice(i,1);
                                adjustedIndex--;
                            } else
                            {
                                //find position in going right function
                                let isChecking = true;
                                let checkLeft = i >= maxIndexRight ? false : true;
                                let checkRight = i <= 0 ? false : true;
                                while (isChecking)
                                {
                                    
                                    if (checkRight && INTER_EL.birdsGoingRight[i].x > INTER_EL.birdsGoingRight[i-1].x )
                                    {
                                        checkLeft = false;
                                        let tmp = INTER_EL.birdsGoingRight[i-1];
                                        INTER_EL.birdsGoingRight[i-1] = INTER_EL.birdsGoingRight[i];
                                        INTER_EL.birdsGoingRight[i] = tmp;
                                        i--;
                                        isChecking = i <= 0 ? false: true; 
                                    } else if (checkLeft && INTER_EL.birdsGoingRight[i].x < INTER_EL.birdsGoingRight[i+1].x)
                                    {
                                        checkRight = false;
                                        let tmp = INTER_EL.birdsGoingRight[i+1];
                                        INTER_EL.birdsGoingRight[i+1] = INTER_EL.birdsGoingRight[i];
                                        INTER_EL.birdsGoingRight[i] = tmp;
                                        i++;
                                        isChecking = i >= maxIndexRight ? false: true;

                                    } else {isChecking = false;}
                                }
                            }
                        }
                    }

                }

            }

            if (searchIndexLeft.length == 2)
            {
                // console.log("searchIndexLeft.length ==2 LEFT")
                
                // console.log("searchIndexRight.length ==2 Right")
                posssibleMatches = []
                adjustedIndex = 0;  
                for (let i= searchIndexLeft[0]; i <= searchIndexLeft[1];i++)
                {
                    if (INTER_EL.birdsGoingLeft[i].y < birdDifference.bottom && 
                        INTER_EL.birdsGoingLeft[i].y > birdDifference.top)
                    {
                        posssibleMatches.push(i);
                    }
                } 
                // console.log("possibleMathces after trimming", posssibleMatches)
                if (posssibleMatches.length > 0)
                {
                    
                    // console.log("possiblematches",posssibleMatches)
                    birdDifferenceHead = 
                    {
                        left: headBox.left+ GAME_CHAR.BIRD_LIMITS[0],
                        right: headBox.right+ GAME_CHAR.BIRD_LIMITS[1],
                        top: headBox.top + GAME_CHAR.BIRD_LIMITS[2],
                        bottom: headBox.bottom+ GAME_CHAR.BIRD_LIMITS[3],
                    }

                    birdDifferenceHandle = 
                    {
                        left: handleBox.left+ GAME_CHAR.BIRD_LIMITS[0],
                        right: handleBox.right+ GAME_CHAR.BIRD_LIMITS[1],
                        top: handleBox.top + GAME_CHAR.BIRD_LIMITS[2],
                        bottom: handleBox.bottom+ GAME_CHAR.BIRD_LIMITS[3],
                    }

                    for (let j = 0; j < posssibleMatches.length; j++)
                    {
                        i = posssibleMatches[j] +adjustedIndex;
                        let handleHit = false;
                        let headHit = false;

                        if (INTER_EL.birdsGoingLeft[i].x < birdDifferenceHead.right &&
                            INTER_EL.birdsGoingLeft[i].x > birdDifferenceHead.left &&
                            INTER_EL.birdsGoingLeft[i].y < birdDifferenceHead.bottom &&
                            INTER_EL.birdsGoingLeft[i].y > birdDifferenceHead.top)
                        {headHit = true;}

                        if (INTER_EL.birdsGoingLeft[i].x < birdDifferenceHead.right &&
                            INTER_EL.birdsGoingLeft[i].x > birdDifferenceHead.left &&
                            INTER_EL.birdsGoingLeft[i].y < birdDifferenceHead.bottom &&
                            INTER_EL.birdsGoingLeft[i].y > birdDifferenceHead.top)
                        {handleHit = true;}

                        // console.log("handlhit", handleHit ,"headhit", headHit)
                        // console.log("birds.x", INTER_EL.birdsGoingLeft[i].x ,"birddiffleft", birdDifferenceHead.left)

                        if (handleHit && headHit)
                        {
                            let x = element.X - INTER_EL.birdsGoingLeft[i].x;
                            let y = element.Y - INTER_EL.birdsGoingLeft[i].y;
                            
                            INTER_EL.birdsGoingLeft[i].vector = createVector(x,y);

                            INTER_EL.birdsGoingLeft[i].x -= INTER_EL.birdsGoingLeft[i].vector.x *3;
                            INTER_EL.birdsGoingLeft[i].y -= INTER_EL.birdsGoingLeft[i].vector.y *3;
                            element.rotationSpeed -= INTER_EL.birdsGoingLeft[i].vector.mag()/8;
                            element.speedX += INTER_EL.birdsGoingLeft[i].vector.x/3;
                            element.speedY += INTER_EL.birdsGoingLeft[i].vector.y/3;
                            
                            INTER_EL.birdsGoingLeft[i].vector.x -= 5;
                            // console.log("birdsgoig Left mag",INTER_EL.birdsGoingLeft[i].vector.mag());
                            if (INTER_EL.birdsGoingLeft[i].vector.mag() > 15 )
                            {
                                INTER_EL.birdsGoingLeft[i].hit = true;
                                // console.log("birdsgoig Left speedX",INTER_EL.birdsGoingLeft[i].speedX);
                                INTER_EL.birdsGoingLeft[i].speed *= -1;
                                // console.log("birdsgoig Left speedX updated",INTER_EL.birdsGoingLeft[i].speedX);
                                INTER_EL.birdsGoingDown.push(INTER_EL.birdsGoingLeft[i]);
                                INTER_EL.birdsGoingLeft.splice(i,1);
                                adjustedIndex--;
                            } else
                            {

                                //find position in going Left function
                                let isChecking = true;
                                let checkRight = i >= maxIndexLeft ? false : true;
                                let checkLeft = i <= 0 ? false : true;
                                while (isChecking)
                                {
                                    if (checkLeft && INTER_EL.birdsGoingLeft[i].x < 
                                        INTER_EL.birdsGoingLeft[i-1].x )
                                    {
                                        checkRight = false;
                                        let tmp = INTER_EL.birdsGoingLeft[i-1];
                                        INTER_EL.birdsGoingLeft[i-1] = INTER_EL.birdsGoingLeft[i];
                                        INTER_EL.birdsGoingLeft[i] = tmp;
                                        i--;
                                        isChecking = i <= 0 ? false: true; 
                                    } else if (checkRight && INTER_EL.birdsGoingLeft[i].x > INTER_EL.birdsGoingLeft[i+1].x)
                                    {
                                        checkLeft = false;
                                        let tmp = INTER_EL.birdsGoingLeft[i+1];
                                        INTER_EL.birdsGoingLeft[i+1] = INTER_EL.birdsGoingLeft[i];
                                        INTER_EL.birdsGoingLeft[i] = tmp;
                                        i++;
                                        isChecking = i >= maxIndexLeft ? false: true;

                                    } else {isChecking = false;}
                                }
                            }
                            
                            
                        } else if (headHit)
                        {
                            let x = headBox.center[0] - INTER_EL.birdsGoingLeft[i].x;
                            let y = headBox.center[1] - INTER_EL.birdsGoingLeft[i].y;
                             
                            INTER_EL.birdsGoingLeft[i].vector = createVector(x,y);

                            

                            INTER_EL.birdsGoingLeft[i].x -= INTER_EL.birdsGoingLeft[i].vector.x *3;
                            INTER_EL.birdsGoingLeft[i].y -= INTER_EL.birdsGoingLeft[i].vector.y *3;
                            element.rotationSpeed -= INTER_EL.birdsGoingLeft[i].vector.mag()/8;
                            element.speedX += INTER_EL.birdsGoingLeft[i].vector.x/3;
                            element.speedY += INTER_EL.birdsGoingLeft[i].vector.y/3;
                            
                            INTER_EL.birdsGoingLeft[i].vector.x -= 5;
                            if (INTER_EL.birdsGoingLeft[i].vector.mag() > 15 )
                            {
                                INTER_EL.birdsGoingLeft[i].hit = true;
                                // console.log("birdsgoig Left speedX",INTER_EL.birdsGoingLeft[i].speedX);
                                INTER_EL.birdsGoingLeft[i].speed *= -1;
                                // console.log("birdsgoig Left speedX updated",INTER_EL.birdsGoingLeft[i].speedX);
                                INTER_EL.birdsGoingDown.push(INTER_EL.birdsGoingLeft[i]);
                                INTER_EL.birdsGoingLeft.splice(i,1);
                                adjustedIndex--;
                            } else
                            {
                                //find position in going Left function
                                let isChecking = true;
                                let checkRight = i >= maxIndexLeft ? false : true;
                                let checkLeft = i <= 0 ? false : true;
                                while (isChecking)
                                {
                                    if (checkLeft && INTER_EL.birdsGoingLeft[i].x < 
                                        INTER_EL.birdsGoingLeft[i-1].x )
                                    {
                                        checkRight = false;
                                        let tmp = INTER_EL.birdsGoingLeft[i-1];
                                        INTER_EL.birdsGoingLeft[i-1] = INTER_EL.birdsGoingLeft[i];
                                        INTER_EL.birdsGoingLeft[i] = tmp;
                                        i--;
                                        isChecking = i <= 0 ? false: true; 
                                    } else if (checkRight && INTER_EL.birdsGoingLeft[i].x > INTER_EL.birdsGoingLeft[i+1].x)
                                    {
                                        checkLeft = false;
                                        let tmp = INTER_EL.birdsGoingLeft[i+1];
                                        INTER_EL.birdsGoingLeft[i+1] = INTER_EL.birdsGoingLeft[i];
                                        INTER_EL.birdsGoingLeft[i] = tmp;
                                        i++;
                                        isChecking = i >= maxIndexLeft ? false: true;

                                    } else {isChecking = false;}
                                }
                            }
                        } else if (handleHit)
                        {
                            let x = handleBox.center[0] - INTER_EL.birdsGoingLeft[i].x;
                            let y = handleBox.center[1] - INTER_EL.birdsGoingLeft[i].y;
                             
                            INTER_EL.birdsGoingLeft[i].vector = createVector(x,y);

                            

                            INTER_EL.birdsGoingLeft[i].x -= INTER_EL.birdsGoingLeft[i].vector.x *3;
                            INTER_EL.birdsGoingLeft[i].y -= INTER_EL.birdsGoingLeft[i].vector.y *3;
                            element.rotationSpeed -= INTER_EL.birdsGoingLeft[i].vector.mag()/8;
                            element.speedX += INTER_EL.birdsGoingLeft[i].vector.x/3;
                            element.speedY += INTER_EL.birdsGoingLeft[i].vector.y/3;
                            
                            INTER_EL.birdsGoingLeft[i].vector.x -= 5;
                            if (INTER_EL.birdsGoingLeft[i].vector.mag() > 15 )
                            {
                                INTER_EL.birdsGoingLeft[i].hit = true;
                                // console.log("birdsgoig Left speedX",INTER_EL.birdsGoingLeft[i].speed);
                                INTER_EL.birdsGoingLeft[i].speed *= -1;
                                // console.log("birdsgoig Left speedX updated",INTER_EL.birdsGoingLeft[i].speed);
                                INTER_EL.birdsGoingDown.push(INTER_EL.birdsGoingLeft[i]);
                                INTER_EL.birdsGoingLeft.splice(i,1);
                                adjustedIndex--;
                            } else
                            {
                                //find position in going Left function
                                let isChecking = true;
                                let checkRight = i >= maxIndexLeft ? false : true;
                                let checkLeft = i <= 0 ? false : true;
                                while (isChecking)
                                {
                                    if (checkLeft && INTER_EL.birdsGoingLeft[i].x < 
                                        INTER_EL.birdsGoingLeft[i-1].x )
                                    {
                                        checkRight = false;
                                        let tmp = INTER_EL.birdsGoingLeft[i-1];
                                        INTER_EL.birdsGoingLeft[i-1] = INTER_EL.birdsGoingLeft[i];
                                        INTER_EL.birdsGoingLeft[i] = tmp;
                                        i--;
                                        isChecking = i <= 0 ? false: true; 
                                    } else if (checkRight && INTER_EL.birdsGoingLeft[i].x > INTER_EL.birdsGoingLeft[i+1].x)
                                    {
                                        checkLeft = false;
                                        let tmp = INTER_EL.birdsGoingLeft[i+1];
                                        INTER_EL.birdsGoingLeft[i+1] = INTER_EL.birdsGoingLeft[i];
                                        INTER_EL.birdsGoingLeft[i] = tmp;
                                        i++;
                                        isChecking = i >= maxIndexLeft ? false: true;

                                    } else {isChecking = false;}
                                }
                            }
                        }
                    }

                }
            }


        }


        
    },
}

//////////////////////////////////////////////////////////////////////////////////////////
// VARIALBES AND CONSTANTS FOR GAME PROPERTIES AND CONSTRAINTS
////////////////////////////////////////////////////////////////////////////////////////////
const charLogics =  
{
    scroll: [0,GAME_PROPS.WIDTH],
    screenshotIteration: 0,
    

    keyPressed :
    {
        jump: false,
        leftArr: false,
        rightArr: false,
        space: false,

    },

    ////////////////////////////////////////////////////////////////////////////////////////
    //      FUNCTIONS  - DISTANCE TO ELEMENTS
    ////////////////////////////////////////////////////////////////////////////////////////
    distanceToHammer: function () 
    {
        if (gameChar.worldX  > INTER_EL.HAMMER.pos1X -10 &&
            gameChar.worldX < INTER_EL.HAMMER.pos1X +10 &&
            gameChar.y < INTER_EL.HAMMER.pos1Y +40 &&
            gameChar.y > INTER_EL.HAMMER.pos1Y -10)
            {
                gameChar.hammerPickedUp = true;
                gameChar.numberOfHammers ++; 
                gameChar.hammerTextCounter += frameCount; 
            }
    },       
    distanceToFlag: function ()
    {
        if (gameChar.worldX < INTER_EL.CANYONS[0].LEFT && !gameChar.winCondition)
        {
            gameChar.infoText = true;
        } else if ( gameChar.winCondition && 
                    gameChar.worldX > INTER_EL.FLAGPOLE_LIMIT_X[0] &&
                    gameChar.worldX < INTER_EL.FLAGPOLE_LIMIT_X[1] &&
                    gameChar.y < INTER_EL.FLAGPOLE_LIMIT_Y +40 &&
                    gameChar.y > INTER_EL.FLAGPOLE_LIMIT_Y -10)
            {
                gameChar.hasWon = true;
            } else {gameChar.infoText = false;}
            
            
    },
        
    ///////////////////////////////////////////////
    //      MOVEMENT FUNCTIONS
    ///////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    // AS LONG AS THE CHARACTER IS WALKING ON THE GROUND
    ////////////////////////////////////////////////////////////////
    controlCharacterOnground: function () 
    {
    
        if (gameChar.currentDirection < 0)
        {
            if (gameChar.speedX  <= -GAME_CHAR.SLIPPING_SPEED)
                    {
                        drawCharacterWalking("left");
                    
                    } else
                    {
                        drawCharacterStanding("left");
                    }


        }
        else 
        {
            if (gameChar.speedX  >= GAME_CHAR.SLIPPING_SPEED)
            {
                drawCharacterWalking("right");
            } else
            {
                drawCharacterStanding("right");
            }

        }
        
        
    
    },   
    //////////////////////////////////////////////////
    // AS LONG AS THE CHARACTER IS IN THE AIR
    /////////////////////////////////////////////////
    controlCharacterInAir: function ()
    {

        if (gameChar.currentDirection < 0)
        {
            if (gameChar.speedX  <= -GAME_CHAR.SLIPPING_SPEED)
                    {
                        drawCharacterInAir("left");
                    } else
                    {
                        drawCharacterStanding("left");
                    }
        }
        else 
        {
            if (gameChar.speedX  >= GAME_CHAR.SLIPPING_SPEED)
            {
                drawCharacterInAir("right");
            } else
            {
                drawCharacterStanding("right");
            }
        }
    },

    /////////////////////////////////////////////////
    // ACCELERATION 
    //////////////////////////////////////////////////
    updateAccelation: function()
    {
        if (charLogics.keyPressed.leftArr && charLogics.keyPressed.rightArr)
        {
            
            gameChar.speedX *= GAME_CHAR.SPEED_DROP_X ;
        } else if (charLogics.keyPressed.leftArr)
        {
                    
            gameChar.speedX += -GAME_CHAR.ACCELERATION_X ;
            gameChar.speedX = max (gameChar.speedX, -GAME_CHAR.MAX_SPEED_X);
            gameChar.currentDirection = -1;

        
        } else  if (charLogics.keyPressed.rightArr)
        {
            gameChar.speedX += GAME_CHAR.ACCELERATION_X ;
            gameChar.speedX = min (gameChar.speedX, GAME_CHAR.MAX_SPEED_X);
            gameChar.currentDirection = 1;
        
        } else 
        {
            gameChar.speedX *= GAME_CHAR.SPEED_DROP_X ;
        }
        
        if (charLogics.keyPressed.jump) 
        {gameChar.jumpCounter += GAME_CHAR.JUMP_INCREMENT
         gameChar.jumpCompCounter = min(++gameChar.jumpCompCounter, GAME_CHAR.JUMP_COMP_LAST_INDEX);
            
            if (gameChar.jumpCounter <= GAME_CHAR.JUMP_MAX 
                && gameChar.isStanding)  {CONTROLS.jumpKeyRelease();}

        }
        
        gameChar.speedY += GAME_CHAR.GRAVITY;
        gameChar.y += gameChar.speedY;
        gameChar.worldX += gameChar.speedX;
        
    
    }, 


    //////////////////////////////////////////////////////////////
    // SCROLLING FUNCTIONS
    /////////////////////////////////////////////////////////////////



    scrollController: function () 
    {
        if (gameChar.worldX > GAME_PROPS.SCREEN_MIDDLE_X &&
            gameChar.worldX < GAME_PROPS.LEVEL_LIMITS_X[1] -
                            GAME_PROPS.SCREEN_MIDDLE_X )
        {
            gameChar.screenX = GAME_PROPS.SCREEN_MIDDLE_X;
            charLogics.scroll[0] = gameChar.worldX -GAME_PROPS.SCREEN_MIDDLE_X;
            charLogics.scroll[1] = charLogics.scroll[0] + GAME_PROPS.WIDTH
        } else if (gameChar.worldX >    GAME_PROPS.LEVEL_LIMITS_X[1] - 
                                        GAME_PROPS.SCREEN_MIDDLE_X)
        { 
            gameChar.screenX =    gameChar.worldX - 
                            GAME_PROPS.LEVEL_LIMITS_X[1] + 
                            GAME_PROPS.WIDTH;
            charLogics.scroll[0] = GAME_PROPS.SCROLL_LIMITS[1];
            charLogics.scroll[1] = charLogics.scroll[0] + GAME_PROPS.WIDTH
        } else
        {
            gameChar.screenX = gameChar.worldX;
            charLogics.scroll[0] = GAME_PROPS.SCROLL_LIMITS[0];
            charLogics.scroll[1] = charLogics.scroll[0] + GAME_PROPS.WIDTH
        }                      
        
    },   
    


    ///////////////////////////////////////////////////////////////////
    // BOUNDARY FUNCTIONS
    /////////////////////////////////////////////////////////    
    testingBounds:  function ()
    {
    if (gameChar.inCanyon)   
        {
            
            let x = INTER_EL.CANYONS[gameChar.currentCanyonIndex].CONNECTED_INDEX.length-1;
            let y = INTER_EL.CANYONS[gameChar.currentCanyonIndex].CONNECTED_INDEX[0];
            let z = INTER_EL.CANYONS[gameChar.currentCanyonIndex].CONNECTED_INDEX[x];
            gameChar.worldX = constrain (   gameChar.worldX, INTER_EL.CANYONS[y].CONSTRAIN_LEFT, INTER_EL.CANYONS[z].CONSTRAIN_RIGHT);                        
        } else 
        {
            gameChar.worldX = constrain (gameChar.worldX, 
                                    GAME_PROPS.GAME_CHAR_CONTAIN[0], 
                                    GAME_PROPS.GAME_CHAR_CONTAIN[1]);
                                
        }
        
        gameChar.currentCanyonIndex = this.returnCurrentCanyon ();    


        if (gameChar.y >= GAME_PROPS.FLOOR_POS) 
        {



            
            
                if (gameChar.currentCanyonIndex < INTER_EL.CANYON_RANGE[1]+1 && gameChar.worldX >= INTER_EL.CANYONS[gameChar.currentCanyonIndex].CONSTRAIN_LEFT)
                {
                    
                    gameChar.inCanyon = true;
                    gameChar.isStanding = false;
                    charLogics.respawn();
                } else 
                {
                    gameChar.y = GAME_PROPS.FLOOR_POS;
                    gameChar.speedY = 0;
                    gameChar.isStanding = true; 

                    //FROM UIController.js
                    UI_EL.calcPoints ();

                
                }
            
        }    

    }, 
    ///////////////////////////////////////////////////////////////////////////
    // RECURSIVE CHECK FOR CURRENTCANYON BASED ON gameChar.currentCanyonIndex
    //////////////////////////////////////////////////////////////////////////////
    returnCurrentCanyon:  function ()
    {   
        let index = gameChar.currentCanyonIndex;
        if ( gameChar.worldX > INTER_EL.CANYONS[INTER_EL.CANYON_RANGE[1]].CONSTRAIN_RIGHT)
            {return INTER_EL.CANYON_RANGE[1]+1;} ///DO YOU NEED THE ONE??
        else if (index > INTER_EL.CANYON_RANGE[1]) {index--;}
        return choose();

        function choose ()
        {   
            
            if ( gameChar.worldX <= INTER_EL.CANYONS[index].CONSTRAIN_RIGHT)
            {
                
                index --;
                
                if (index < 0)
                {
                    return INTER_EL.CANYON_RANGE[0];
                }
                else if (gameChar.worldX >  INTER_EL.CANYONS[index].CONSTRAIN_RIGHT)
                {return index+1;} 
                else
                { 
                    
                    return choose();
                }
            } else 
            {
                index++;
                
                return choose ();
            }   
        }
    },



    
    //////////////////////////////////////////////
    // RESPAWN / RESET FUNCTION   
    //////////////////////////////////////////////
    respawn: function ()  
    {

        if (gameChar.y > 800 && UI_EL.calcLives() ) 
        {
        
                //logics
                gameChar.inCanyon = false; 
                gameChar.isStanding = false;
                gameChar.winCondition = false;
            
                //reset
                // gameChar.x = gameChar.startX;
                gameChar.worldX = INTER_EL.CANYONS[ INTER_EL.CANYONS[gameChar.currentCanyonIndex].CONNECTED_INDEX[0]].CONSTRAIN_LEFT -40
                gameChar.hammerTextCounter = 150;
                charLogics.scroll[0] = 0;
                gameChar.y = gameChar.startY;
                gameChar.speedX = 0;

                // gameChar.currentCanyonIndex = this.returnCurrentCanyon ();  
                // gameChar.landingPos = gameChar.currentCanyonIndex;
                gameChar.hammerChargeCounter = 0;
                gameChar.hammerChargeRotation = 0;
            

                //keys
                charLogics.keyPressed.space = false;
                charLogics.keyPressed.jump = false;
                charLogics.keyPressed.rightArr = false;
                charLogics.keyPressed.leftArr = false;

                //remove bird enemies
                INTER_EL.birdsGoingLeft = [];
                INTER_EL.birdsGoingRight = [];

        }

    },

    resetGame: function ()
    {
        gameChar.inCanyon = false; 
        gameChar.isStanding = false;
        gameChar.hammerPickedUp = false;  
        gameChar.numberOfHammers = 0; 
        gameChar.points = 0;
        gameChar.landingPos = 0;
        gameChar.lives = GAME_CHAR.STARTING_LIVES;
        gameChar.hasWon = false;
        gameChar.gameOver = false;
        gameChar.winCondition = false;
        gameChar.infoText =  true;
        gameChar.hammerChargeCounter = 0;
        gameChar.hammerChargeRotation = 0;

        gameChar.x = gameChar.startX;
        gameChar.worldX = gameChar.startX;
        gameChar.hammerTextCounter = 150;
        charLogics.scroll = [0,GAME_PROPS.WIDTH];
        gameChar.y = gameChar.startY;


        gameChar.currentCanyonIndex = this.returnCurrentCanyon ();  
        gameChar.landingPos = gameChar.currentCanyonIndex;
        //key pressed
        // keyPressed.leftArr = false;
        // keyPressed.rightArr = false;
        charLogics.keyPressed.space = false;
        charLogics.keyPressed.jump = false;
    },

    DEBUG_move: function ()
    {
        gameChar.inCanyon = false; 
        gameChar.isStanding = false;
        gameChar.landingPos = 0;
        gameChar.lives = GAME_CHAR.STARTING_LIVES;
        gameChar.points = 18;
        gameChar.hasWon = false;
        gameChar.gameOver = false;
        gameChar.winCondition = false;
        gameChar.infoText =  false;
        
        

        if (gameChar.worldX -5 <= INTER_EL.HAMMER.pos1X &&
            gameChar.worldX +5 >= INTER_EL.HAMMER.pos1X)
        {gameChar.worldX = gameChar.startX; charLogics.scroll[0] = 0}
        else if (gameChar.worldX -5 <= gameChar.startX &&
                gameChar.worldX +5 >= gameChar.startX)
        {
            gameChar.worldX = GAME_PROPS.LEVEL_LIMITS_X[1] -100
        } else
        {gameChar.worldX = INTER_EL.HAMMER.pos1X;}

        gameChar.hammerTextCounter = 150;
        
        gameChar.y = gameChar.startY;


        gameChar.currentCanyonIndex = this.returnCurrentCanyon (); 
        gameChar.landingPos = gameChar.currentCanyonIndex;
    },


    





}




 






    














