/*

For controlling the stuff in the level!

*/









// INTERACTABLE ELEMENTS CANYONS AND HAMMER
const INTER_EL  =
{
    CANYONS: [],
    CANYON_WIDTH: 114,
    CANYON_Y: GAME_PROPS.HEIGHT- (540 -485),
    CANYONS_X: [600,  1000, 1800-114, 1800, 2100, 2504, 3100, 3214 , 3400,3514, 3750, 4900, 5111, 5111+114,5111+114*2],
    CANYON_RANGE: 0,
    currentCanyon: 0,
    currentDisplayCanyons: [0,0],

    FLAGPOLE_X: 100,
    FLAGPOLE_Y: GAME_PROPS.HEIGHT- (540 -484),
    FLAGPOLE_LIMIT_X: [80,100],
    FLAGPOLE_LIMIT_Y: GAME_PROPS.HEIGHT- (540 - 474),
    flagCounter : 0,
    flagStart: 0,
    birdsGoingRight: [],
    birdsGoingLeft: [],
    birdsGoingDown: [],
    
    drawBirds: function ()
    {
        // console.log("birdsGoingRight", INTER_EL.birdsGoingRight)
        // console.log("INTER_EL.drawBirds")  
        for (i= 0; i < INTER_EL.birdsGoingRight.length; i ++)
        {
            
            drawBirds(INTER_EL.birdsGoingRight[i])
        }
        for (i= 0; i < INTER_EL.birdsGoingLeft.length; i ++)
        {
            drawBirds(INTER_EL.birdsGoingLeft[i])
        }
        for (i= 0; i < INTER_EL.birdsGoingDown.length; i ++)
        {
            // console.log("INTER_EL.birdsGoingDown",INTER_EL.birdsGoingDown)
            drawBirds(INTER_EL.birdsGoingDown[i])
        }

    },

    BIRDS:   
    {
        START_HEIGHT: 150,
        SPACE_COUNTER_LEVEL1: 30,
        SPACE_COUNTER_LEVEL2: 30,
        SPACE_COUNTER_LEVEL3: 15,
        WAIT_LEVEL1: 200,
        WAIT_LEVEL2: 100,
        WAIT_LEVEL3: 10,
        MAX_LEVEL1: 3,
        MAX_LEVEL2: 10,
        MAX_LEVEL3: 1, 
        START_X_DIFF: 30,
        SCALE: 0.3,
        SPEED: 4,
        

        counter: 0,
        currentCountLim: 0,

        logics: function ()
        {
            
          
            let lengthLeft = INTER_EL.birdsGoingLeft.length;
            let lengthRight = INTER_EL.birdsGoingRight.length;
            // console.log(lengthRight, "length just after being made", INTER_EL.birdsGoingRight.length )
            let testleft = charLogics.scroll[0] -  INTER_EL.BIRDS.START_X_DIFF;
            let testRight = charLogics.scroll[0] + GAME_PROPS.WIDTH +INTER_EL.BIRDS.START_X_DIFF;
            
            testBoundsRight();
            testBoundsLeft();
           


             INTER_EL.BIRDS.currentCountLim = INTER_EL.BIRDS.SPACE_COUNTER_LEVEL1;
           if (INTER_EL.BIRDS.counter++ > INTER_EL.BIRDS.currentCountLim)
           {
                INTER_EL.BIRDS.counter = floor(random(0,40));

                if (lengthLeft +  lengthRight < INTER_EL.BIRDS.MAX_LEVEL3)
                {
                    
                    if (random(0,2) < 1)
                    {
                        
                       
                        // console.log(INTER_EL.birdsGoingLeft.length)
                        // // console.log("bird left constr")
                        let b = new INTER_EL.BIRDS.BirdsConstructor(
                                "bird going left",
                                testRight, 
                                INTER_EL.BIRDS.START_HEIGHT + floor(random (-40,40)),
                                INTER_EL.BIRDS.SCALE,
                                -1)
                                // console.log(b)
                        INTER_EL.birdsGoingLeft.push(b) ;
                        
                        // console.log(INTER_EL.birdsGoingLeft[INTER_EL.birdsGoingLeft.length-1]);  
                                                        

                    } else
                    {
                        // console.log("bird right constr")
                        let b = new INTER_EL.BIRDS.BirdsConstructor(
                            "bird going right",
                            testleft, 
                            INTER_EL.BIRDS.START_HEIGHT + floor(random (-40,40)),
                            INTER_EL.BIRDS.SCALE,
                            1)
                            // console.log(b)
                        INTER_EL.birdsGoingRight.push( b );



                    
                    } 
                }
            }    
           
            
            for (i = 0, length = INTER_EL.birdsGoingLeft.length  ; i < length ; i ++)
            {
                INTER_EL.birdsGoingLeft[i].x += INTER_EL.birdsGoingLeft[i].speed;
                if (INTER_EL.birdsGoingLeft[i].sinCounter ++ >= GAME_PROPS.SIN_128X2_ARRAY_LIMIT)
                {INTER_EL.birdsGoingLeft[i].sinCounter = 0}
                INTER_EL.birdsGoingLeft[i].y += GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.birdsGoingLeft[i].sinCounter]*3;
            }   
            for (i = 0, length = INTER_EL.birdsGoingRight.length  ; i < length ; i ++)
            {
                INTER_EL.birdsGoingRight[i].x += INTER_EL.birdsGoingRight[i].speed; 
                if (INTER_EL.birdsGoingRight[i].sinCounter ++ >= GAME_PROPS.SIN_128X2_ARRAY_LIMIT)
                {INTER_EL.birdsGoingRight[i].sinCounter = 0 }
                INTER_EL.birdsGoingRight[i].y += GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.birdsGoingRight[i].sinCounter]*3;
                
            }
            for (i = 0, length = INTER_EL.birdsGoingDown.length  ; i < length ; i ++)
            {
                // console.log("INTER_EL.birdsGoingDown[i].y",INTER_EL.birdsGoingDown[i].y)
                // console.log("INTER_EL.birdsGoingDown[i]",INTER_EL.birdsGoingDown[i])
                INTER_EL.birdsGoingDown[i].y += INTER_EL.birdsGoingDown[i].speed; // * INTER_EL.birdsGoingDown.direction;
                if (INTER_EL.birdsGoingDown[i].sinCounter ++ >= GAME_PROPS.SIN_128X2_ARRAY_LIMIT)
                {INTER_EL.birdsGoingDown[i].sinCounter = 0 }
                INTER_EL.birdsGoingDown[i].y += GAME_PROPS.SIN_128X2_ARRAY[INTER_EL.birdsGoingDown[i].sinCounter]*3; 
                if (INTER_EL.birdsGoingDown[i].y > 700)
                {
                    INTER_EL.birdsGoingDown.splice(i,1);
                    i--;
                    length--;
                }
            }        


            function testBoundsLeft ()
            {
                if (lengthLeft <= 0 )
                {return;}
                else if (lengthLeft == 1)
                {
                    if (INTER_EL.birdsGoingLeft[0].x > testRight)
                    {
                        lengthLeft--;
                        INTER_EL.birdsGoingLeft.pop();
                    }
                    else if (INTER_EL.birdsGoingLeft[0].x < testleft)
                    {
                        lengthLeft--;
                        INTER_EL.birdsGoingLeft.shift();
                    }
                }
                else 
                {
                    if (INTER_EL.birdsGoingLeft[lengthLeft -1].x > testRight)
                    {
                        lengthLeft--
                        INTER_EL.birdsGoingLeft.pop();
                        // console.log("birds going left After removal",INTER_EL.birdsGoingLeft);
                    }
                    if (INTER_EL.birdsGoingLeft[0].x < testleft)
                    {
                        lengthLeft--
                        INTER_EL.birdsGoingLeft.shift();
                        // console.log("birds going left After removal",INTER_EL.birdsGoingLeft);
                    }
                }
            }
            function testBoundsRight ()
            {
                if (lengthRight <= 0 )
                {return;}
                else if (lengthRight == 1)
                {
                    if (INTER_EL.birdsGoingRight[0].x < testleft)
                    {
                        lengthRight--;
                        INTER_EL.birdsGoingRight.pop();
                        
                    }
                    else if (INTER_EL.birdsGoingRight[0].x > testRight)
                    {
                        lengthRight--;
                        INTER_EL.birdsGoingRight.shift();

                    }
                }
                else 
                {
                    // console.log("length method",INTER_EL.birdsGoingRight.length)
                    // console.log(lengthRight)
                    if (INTER_EL.birdsGoingRight[lengthRight-1].x < testleft)
                    {
                        lengthRight--;
                        INTER_EL.birdsGoingRight.pop();
                        // console.log("birds going right After removal",INTER_EL.birdsGoingRight);
                    }
                    if (INTER_EL.birdsGoingRight[0].x > testRight)
                    {
                        lengthRight--;
                        INTER_EL.birdsGoingRight.shift();
                        // console.log("birds going right After removal",INTER_EL.birdsGoingRight);
                    }
                }
            }
        },    

        speechBubble: function (DURATION, TEXT)
        {
            let bubble =
            {
                duration: DURATION,
                text_ : TEXT,
                textLength: TEXT.length,
                timer: 0, 

                executeTimer: function ()
                {
                     
                    // if (INTER_EL.DOG.currentDirection < 0)
                    // {
                    //     let X = INTER_EL.DOG.x -charLogics.scroll[0] + 25
                    // } else
                    // {

                    // }
                    // let Y = INTER_EL.DOG
                    strokeWeight(2);
                    stroke(0);
                    fill(255);
                    
                    //for Dog bark
                    translate (X,INTER_EL.DOG.y-75);
                    
                    // Sooooooooooo
                    
                    // scale (-1,1);
                    // Startpoint
                    let startPoint1 = [40,39];
                    let middlePoint1 = [40,60];
                    let endPoint1 = [10,60]; 
                    
                    
                    
                    
                    // let startPoint2 = [startPoint1[0]-10,endPoint1[1]];
                    // let middlePoint2 = [middlePoint1[0]-10,middlePoint1[1]];
                    // let endPoint2 = [endPoint1[0], endPoint1[1]];
                    let startPoint2 = [     endPoint1[0],       endPoint1[1]];
                    let middlePoint2 = [    middlePoint1[0]-10 , middlePoint1[1]];
                    let endPoint2 = [       startPoint1[0]-10,  startPoint1[1]];

                    rect(8,15, 12 +6*this.textLength,25,15);    

                    beginShape(); 
                    vertex(40, 39);
                    bezierVertex(startPoint1[0], startPoint1[1], middlePoint1[0], middlePoint1[1], endPoint1[0], endPoint1[1]);
                    bezierVertex(startPoint2[0], startPoint2[1], middlePoint2[0], middlePoint2[1], endPoint2[0], endPoint2[1]);
                    endShape();

                    fill (0);
                    textSize(15);
                    text(this.text_, 15,32);
                    stroke (255,0,0);
                    
                    translate (-X,-(INTER_EL.DOG.y-75))
                },    
            }
            // console.log("bubble made")
            timerController.setExecuteTimer(bubble);

        },

        BirdsConstructor: function (name,x_pos,y_pos, scale_, direction)
        {
            //vector controlled
            
            this.name = name;
            this.x = x_pos;
            this.y = y_pos;
            this.scale = scale_;
            this.direction = direction;
            this.speed = INTER_EL.BIRDS.SPEED *direction;
            this.hit = false;
            this.sinCounter = 0;
            // vector is used for hitbox in charcterController.js
            this.vector = 0;
        },
        
    },

    

    DOG:
    {
        x: 513,
        y: 487,

        drawDog: true,
        currentDirection: 1,
        dogWalkIndex: 0,
        dogMouthIndex: 0,
        WALKINGSPEED: -2,
        SEARCH_DISTANCE_X: 150,
        STOP_DISTANCE_X: 50,
        SEARCH_DISTANCE_Y: 100,
        headPotition : 0,

        currentWaitObj: {marked: false,},
        firstDicovered: true,
        // waitCounter: 0,
        waitPosition: [0,0],
        WAIT_BARK_LIMIT: 225,
        WAIT_AFTER_BARK: 75,
        notWaitingAnymore: false,

        
        // barkCounter: 0,
        numberOfBarks: 0,
        currentBark: 0,
        BARK_COUNTER_LIMIT: 200,
        isBarking: false,
        lastBark: false,
        voffTime: 0,
        BarkTextDuration: 40,
        
        currentSmellObj : {marked: false,},
        isSmelling: false,
        smellStop: false,
        // smellCounter: 0,
        SMELL_OBJS_ARRAY: [],  
          
        SMELL_START: [100,200],
        SMELL_STOP_START: [150,200],
        SMELL_STOP_END: [10,100],
        SMELL_END: [50,150],
        HEAD_POTITION: [0, -0.7],

        LIMITS_X: [], 
        
        

        logics: function ()
        {
            

            if (charLogics.scroll[0] < GAME_PROPS.WIDTH)
            {
                INTER_EL.DOG.drawDog = true; 
                let xDistance = abs(gameChar.worldX - INTER_EL.DOG.x);
                if (INTER_EL.DOG.isBarking)
                {
                    if (INTER_EL.DOG.currentBark > INTER_EL.DOG.numberOfBarks)
                    {
                        INTER_EL.DOG.isBarking = false;   
                    } else
                    {
                        INTER_EL.DOG.dogMouthIndex += 2;
                         if (INTER_EL.DOG.dogMouthIndex > GAME_PROPS.SIN_128X2_ARRAY_LIMIT) 
                         {
                            INTER_EL.DOG.dogMouthIndex = floor(GAME_PROPS.SIN_128X2_ARRAY_LIMIT/2);
                            INTER_EL.DOG.currentBark ++; 
                         }
                    }
                    
                } 
                

                if (!INTER_EL.DOG.notWaitingAnymore &&  xDistance < INTER_EL.DOG.SEARCH_DISTANCE_X 
                    && abs(gameChar.y - INTER_EL.DOG.y) < INTER_EL.DOG.SEARCH_DISTANCE_Y)
                {
                    // console.log("running follow")
                    follow(xDistance);
                } else 
                {
                    // console.log("running looking")
                    looking ();
                }


            } else {INTER_EL.DOG.drawDog = false}
            // INTER_EL.DOG.x = 513;
            // INTER_EL.DOG.currentDirection = 1;

            
            

            function follow (xDistance)
            {
               
                if (!INTER_EL.DOG.currentSmellObj.marked)
                {
                    INTER_EL.DOG.currentSmellObj.marked = true;
                    INTER_EL.DOG.isSmelling = false;
                    INTER_EL.DOG.smellStop = false;
                    INTER_EL.DOG.headPotition = INTER_EL.DOG.HEAD_POTITION[0];
                }
                
                if (gameChar.worldX < INTER_EL.DOG.x)
                {
                    INTER_EL.DOG.currentDirection = 1
                } else
                {
                    INTER_EL.DOG.currentDirection = -1
                }

                if (INTER_EL.DOG.firstDicovered) 
                {
                    // console.log("first discovered!")
                    INTER_EL.DOG.firstDicovered = false;
                    bark();
                }

                if ( xDistance > INTER_EL.DOG.STOP_DISTANCE_X) {walk();} 
                else { INTER_EL.DOG.dogWalkIndex = 0; }

                
                if ( INTER_EL.DOG.waitPosition[0] == gameChar.worldX && INTER_EL.DOG.waitPosition[1] == gameChar.y )
                {
                    if (INTER_EL.DOG.currentWaitObj.marked)
                    {
                        //revive
                        // console.log("should not run while waiting")
                        timerController.setWaitingTimer( INTER_EL.DOG.currentWaitObj = 
                        {
                            name: "WaitObj[0]",
                            timer: 0,
                            marked: false,
                            duration: INTER_EL.DOG.WAIT_BARK_LIMIT,
                            
                            

                            waitingTimer: function ()
                            {
                                //revive
                                // console.log("now")
                                bark();
                                

                                timerController.setWaitingTimer( 
                                    INTER_EL.currentWaitObj =
                                    {
                                        name: "WaitObj[1]",
                                        timer: 0,
                                        marked: false,
                                        duration: INTER_EL.DOG.WAIT_AFTER_BARK,
                                        waitingTimer: function ()
                                        {
                                            //revive
                                            INTER_EL.DOG.notWaitingAnymore = true;
                                        }
                                    }
                                );
                                
                                
                                
                            }, 
                        })
                    }

                } else
                {
                    // INTER_EL.DOG.currentWaitObj.marked = true;
                    INTER_EL.DOG.waitPosition[0] = gameChar.worldX;
                    INTER_EL.DOG.waitPosition[1] = gameChar.y;
                }
                
                

            }

            function looking ()
            {
                if (!INTER_EL.DOG.currentWaitObj.marked)
                {
                    INTER_EL.DOG.currentWaitObj.marked = true
                }
                if (!INTER_EL.DOG.isBarking && !INTER_EL.DOG.isSmelling)
                {
                    INTER_EL.DOG.firstDicovered = true;
                    INTER_EL.DOG.lastBark = false;
                    INTER_EL.DOG.isSmelling = true;
                    // console.log("isSmelling = ", INTER_EL.DOG.isSmelling);
                    INTER_EL.DOG.currentSmellObj.marked = true;
                    // console.log("oldCurrentsmell = ", INTER_EL.DOG.currentSmellObj.marked);


                    //revive
                    INTER_EL.DOG.currentSmellObj = INTER_EL.DOG.SMELL_OBJS_ARRAY[0]();


                    // console.log("newCurrentsmell = ", INTER_EL.DOG.currentSmellObj.marked);
                    // console.log(INTER_EL.DOG.currentSmellObj);
                    // INTER_EL.DOG.currentSmellObj.marked = false;
                   
                   //revive
                    timerController.setWaitingTimer( INTER_EL.DOG.currentSmellObj);
                }    
                    
                if (walk())
                {
                    INTER_EL.DOG.currentDirection *= -1
                }


                if (INTER_EL.DOG.waitPosition[0] != gameChar.worldX || INTER_EL.DOG.waitPosition[1] != gameChar.y )
                {
                    INTER_EL.DOG.notWaitingAnymore = false;
                }

            }
            function walk()
            {

                if (INTER_EL.DOG.smellStop)
                {
                    
                    INTER_EL.DOG.dogWalkIndex = 0
                    
                } else
                {
                    // console.log(INTER_EL.DOG.dogWalkIndex)
                    INTER_EL.DOG.x += INTER_EL.DOG.WALKINGSPEED * INTER_EL.DOG.currentDirection;
                    INTER_EL.DOG.dogWalkIndex += 2;
                    if (INTER_EL.DOG.dogWalkIndex > GAME_PROPS.SIN_128X2_ARRAY_LIMIT){INTER_EL.DOG.dogWalkIndex = 0; }
                }

                if (INTER_EL.DOG.x < INTER_EL.DOG.LIMITS_X[0])
                {
                    INTER_EL.DOG.x = INTER_EL.DOG.LIMITS_X[0];
                    return true;
                }
                else if (INTER_EL.DOG.x > INTER_EL.DOG.LIMITS_X[1])
                { 
                    INTER_EL.DOG.x = INTER_EL.DOG.LIMITS_X[1];
                    return true;
                } else 
                {return false}

            }
           
            
            function bark ()
            {
                // console.log(!INTER_EL.DOG.isSmelling , " ", !INTER_EL.DOG.isBarking)
                if (!INTER_EL.DOG.isSmelling && !INTER_EL.DOG.isBarking)
                {
                    INTER_EL.DOG.isBarking = true;
                    INTER_EL.DOG.lastBark = false;
                    // INTER_EL.DOG.barkCounter = 0;
                    INTER_EL.DOG.currentBark = 0;
                    INTER_EL.DOG.dogMouthIndex = floor(GAME_PROPS.SIN_128X2_ARRAY_LIMIT/2)
                    INTER_EL.DOG.numberOfBarks = floor (random (0,3));
                    let VOFF = "Voff!" + " Voff!".repeat(INTER_EL.DOG.numberOfBarks);
                    INTER_EL.DOG.speechBubble( INTER_EL.DOG.numberOfBarks * INTER_EL.DOG.BarkTextDuration + INTER_EL.DOG.BarkTextDuration *2, VOFF)
                }
               
                
            }
            
            
        },
        speechBubble: function (DURATION, TEXT)
        {
            let bubble =
            {
                duration: DURATION,
                text_ : TEXT,
                textLength: TEXT.length,
                timer: 0, 

                executeTimer: function ()
                {
                    let X
                    if (INTER_EL.DOG.currentDirection < 0)
                    {
                        X = INTER_EL.DOG.x -charLogics.scroll[0] + 30;
                    } else
                    {
                        X = INTER_EL.DOG.x -charLogics.scroll[0];
                    }
                    let Y = INTER_EL.DOG.y -85;
                    
                    
                    strokeWeight(2);
                    stroke(0);
                    fill(255);
                    
                    //for Dog bark
                    translate (X,Y);
                    
                    // Sooooooooooo
                    
                    // scale (-1,1);
                    // Startpoint
                    let startPoint1 = [40,39];
                    let middlePoint1 = [40,60];
                    let endPoint1 = [10,60]; 
                    
                    
                    
                    
                    // let startPoint2 = [startPoint1[0]-10,endPoint1[1]];
                    // let middlePoint2 = [middlePoint1[0]-10,middlePoint1[1]];
                    // let endPoint2 = [endPoint1[0], endPoint1[1]];
                    let startPoint2 = [     endPoint1[0],       endPoint1[1]];
                    let middlePoint2 = [    middlePoint1[0]-10 , middlePoint1[1]];
                    let endPoint2 = [       startPoint1[0]-10,  startPoint1[1]];

                    rect(8,15, 12 +6*this.textLength,25,15);    

                    beginShape(); 
                    vertex(40, 39);
                    bezierVertex(startPoint1[0], startPoint1[1], middlePoint1[0], middlePoint1[1], endPoint1[0], endPoint1[1]);
                    bezierVertex(startPoint2[0], startPoint2[1], middlePoint2[0], middlePoint2[1], endPoint2[0], endPoint2[1]);
                    endShape();

                    fill (0);
                    textSize(15);
                    text(this.text_, 15,32);
                    stroke (255,0,0);
                    
                    translate (-X,-Y)
                },    
            }
            // console.log("bubble made")
            timerController.setExecuteTimer(bubble);

        }
    },
    

    HAMMER:
    {
        pos1X: 3627 ,
        pos1Y: 474 ,  
    }, 
     
 

    setup: function ()
    {
        //Setup for elelemnts in GAME_CHAR That needs elements in INTER_EL:
        GAME_CHAR.BIRD_LIMITS = [-100*INTER_EL.BIRDS.SCALE ,+100 *INTER_EL.BIRDS.SCALE, -30*INTER_EL.BIRDS.SCALE,+5*INTER_EL.BIRDS.SCALE]   
        this.CANYON_RANGE = [0, this.CANYONS_X.length-1];

        this.CANYON_MID_INDEX = Math.floor (this.CANYON_RANGE[1]/2);
        
        
        
        for( i = INTER_EL.CANYON_RANGE[0]; i <= this.CANYON_RANGE[1]; i ++)
        {
            makeCanyonElement (this.CANYONS_X[i], i); 
        }

        for (i = INTER_EL.CANYON_RANGE[0]; i <= INTER_EL.CANYON_RANGE[1]; i ++)
        {
            let condition = true;
            let distance = 1;
            INTER_EL.CANYONS[i].CONNECTED_INDEX = [];
            while (condition && i-distance >= 0) 
            {
                condition = checkIfConnected(INTER_EL.CANYONS[i], INTER_EL.CANYONS[i-distance] ,i-distance, distance);
                distance ++;
                
            }
            INTER_EL.CANYONS[i].CONNECTED_INDEX.push(i); 
            condition = true;
            distance = 1;
            while (condition && i+distance <= INTER_EL.CANYON_RANGE[1]) 
            {
                condition = checkIfConnected(INTER_EL.CANYONS[i], INTER_EL.CANYONS[i+distance] ,i+distance, distance);
                distance ++;
               
            } 
            //FROM: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            INTER_EL.CANYONS[i].CONNECTED_INDEX.sort((a, b) => a - b);

            
        } 
        
        for( i = INTER_EL.CANYON_RANGE[0]; i <= this.CANYON_RANGE[1]; i ++)
        {
            INTER_EL.CANYONS[i].DISPLAY_INDEX = i;
            for (j=i+1;;j++)
            {
                // console.log(i,INTER_EL.CANYONS[i]) 
                if (j > this.CANYON_RANGE[1])
                {break;}
                if (INTER_EL.CANYONS[i].RIGHT + GAME_PROPS.WIDTH > INTER_EL.CANYONS[j].LEFT)
                {INTER_EL.CANYONS[i].DISPLAY_INDEX = j} else {break;}
        
            }
        }

        
        // this.BIRDS.BirdsConstructor



        this.DOG.LIMITS_X = [0+30,this.CANYONS[0].LEFT -30];
        this.DOG.SMELL_OBJS_ARRAY.push(
            function ()
            {
                return{
                name: "Dog smell[0]",
                timer: 0,
                marked: false,
                duration: floor (random(...INTER_EL.DOG.SMELL_START ) ),
                waitingTimer: function ()
                    {
                        //revive
                        // console.log("head down")
                        // console.log(INTER_EL.DOG.currentSmellObj)

                        INTER_EL.DOG.headPotition = INTER_EL.DOG.HEAD_POTITION[1];
                        INTER_EL.DOG.currentSmellObj = INTER_EL.DOG.SMELL_OBJS_ARRAY[1]();
                        
                        timerController.setWaitingTimer(INTER_EL.DOG.currentSmellObj);
                        // console.log(INTER_EL.DOG.currentSmellObj)
                    },
                }
            }     
           
        );
        this.DOG.SMELL_OBJS_ARRAY.push(
            function ()
            {
                return{
               
                    name: "Dog smell[1]",
                    timer: 0,
                    marked: false,
                    duration: floor (random(...INTER_EL.DOG.SMELL_STOP_START ) ),
                    waitingTimer: function ()
                    {
                        // console.log("stop to smell")
                        
                  
                        INTER_EL.DOG.speechBubble(INTER_EL.DOG.currentSmellObj.duration/2, "Sniff!");
                        // console.log("walk -> stop" , timerController.executeTimers);
                        INTER_EL.DOG.smellStop = true;
                        timerController.setWaitingTimer( INTER_EL.currentSmellObj = 
                                                        INTER_EL.DOG.SMELL_OBJS_ARRAY[2]())
                        
                    }
                }    
            });
               
        this.DOG.SMELL_OBJS_ARRAY.push(
        function () 
        {   
            return {
                name: "Dog smell[2]",
                timer: 0,
            marked: false,
            duration: floor (random(...INTER_EL.DOG.SMELL_STOP_END ) ),
            waitingTimer: function ()
                {
                    // console.log("continue walking")
                    INTER_EL.DOG.smellStop = false;
                    timerController.setWaitingTimer( INTER_EL.currentSmellObj = 
                                                    INTER_EL.DOG.SMELL_OBJS_ARRAY[3]())
                }
            }                                    
        });
        this.DOG.SMELL_OBJS_ARRAY.push(
        function ()
        {
            return {
                name: "Dog smell[3]",
                timer: 0,
            marked: false,
            duration: floor (random(...INTER_EL.DOG.SMELL_END ) ),
            waitingTimer: function ()
                {
                    // console.log("finished smelling")
                    INTER_EL.DOG.isSmelling = false;
                    INTER_EL.DOG.headPotition = INTER_EL.DOG.HEAD_POTITION[0];
                }
            }                                    
        });
        
    
        function checkIfConnected( CANYON, CANYON_TO_CHECK, index, distance) 
        {
            if (   abs (CANYON.X  -  
                CANYON_TO_CHECK.X )  <= INTER_EL.CANYON_WIDTH *distance )
            {CANYON.CONNECTED_INDEX.push( index ); return true;}
            return false;

        }
        

        function makeCanyonElement (position, index)
        {
            INTER_EL.CANYONS.push
            ({
            X : position,
            })
            INTER_EL.CANYONS[index].CONSTRAIN_LEFT = 
            INTER_EL.CANYONS[index].X - INTER_EL.CANYON_WIDTH/2;
            INTER_EL.CANYONS[index].LEFT = INTER_EL.CANYONS[index].CONSTRAIN_LEFT -13;

            INTER_EL.CANYONS[index].CONSTRAIN_RIGHT = 
            INTER_EL.CANYONS[index].X + INTER_EL.CANYON_WIDTH/2;
            INTER_EL.CANYONS[index].RIGHT = INTER_EL.CANYONS[index].CONSTRAIN_RIGHT +13
        
        } 


    }, 

    findPotitionInArray: function (array ,  start, range, limits )
    {
        if (array != [])
        {   
        //    console.log(array, start, range, limits)
            trueCheck = true;
            // // console.log("if statement hitbox Right")
            // console.log(array);
            for (;;)
            { 
                // console.log("hitbox while Right")
                if (array[start].RIGHT <=  limits[0])
                {
                    start++; 
                    // console.log("first if First value Left"); 
                    if (start > range[1]) { return start;} 
                    trueCheck = false; //true check here means no one to the right
                }    
                else if (trueCheck && array[start].LEFT >=  limits[0])  
                {
                    start--; 
                    if (start < 0 ) 
                    {;return ++start;}
                    
                } 
                else 
                {
                    // console.log(start);
                    return start;
                }
                // console.log(searchIndexRight)
            }
            
        }
        return false
    }, 
} 

