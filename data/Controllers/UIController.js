const UI_EL =
{
    LIVES_Y : 75,
    LIVES_X : 20,
    LIVES_X_DISTANCE : 40,
    speechBubbles: [],

    calcPoints: function  ()
    {


        if ( gameChar.landingPos != gameChar.currentCanyonIndex)
        {
            gameChar.points += Math.abs (gameChar.landingPos - gameChar.currentCanyonIndex);

            gameChar.landingPos = gameChar.currentCanyonIndex;
        }

    },

    calcLives: function() 
    {
        gameChar.lives --;
        if (gameChar.lives <= 0)
            {
                gameChar.gameOver = true;
                return false;
            }
        return true;
    },

    makeSpeechBubble: function (text_, x, y, direction, timer)
    {
        push();
        draw();
        pop();
        function SpeechBubbleConst (X, Y, DURATION)
        {
            this.x = x;
            this.y = y;
            this.textLength = 0;
            this.text = text_;
            this.direction = 1; 
            this.duration = DURATION//RETURN INDEX FROM TIMER
            this.timer = 0;
            this.trueTimer = false;
            this.draw = function ()
            {
                //draw speechbubble
            }

        }

        function draw() {
            // strokeWeight(2);
            // stroke(0);
            // fill(255);
            


            // //for Dog bark
            // translate (INTER_EL.DOG.x -charLogics.scroll[0],INTER_EL.DOG.y-95)
            
            // // Sooooooooooo
            
            // // scale (-1,1);
            // // Startpoint
            // let startPoint1 = [40,39];
            // let middlePoint1 = [40,60];
            // let endPoint1 = [10,60]; 
            // let startPoint2 = [endPoint1[0],endPoint1[1]];
            // let middlePoint2 = [30,60];
            // let endPoint2 = [startPoint1[0]-10, startPoint1[1]];

            // rect(0,0,110,40,15)

            // beginShape();
            // vertex(40, 39);
            // bezierVertex(startPoint1[0], startPoint1[1], middlePoint1[0], middlePoint1[1], endPoint1[0], endPoint1[1]);
            // bezierVertex(startPoint2[0], startPoint2[1], middlePoint2[0], middlePoint2[1], endPoint2[0], endPoint2[1]);
            // endShape();

            // fill (0)
            // textSize(30);
            // text("VOFF!", 10,30)
            // fill (255,0,0)
            
            // translate (-(INTER_EL.DOG.x -charLogics.scroll),-(INTER_EL.DOG.y-95))
            
            
            //for gameChar speech
            // translate (gameChar.screenX+10,gameChar.y-115)

            // strokeWeight(2);
            // stroke(0);
            // fill(255);
            // //for gameChar speech
            // translate (gameChar.screenX+10,gameChar.y-115)
            
            // // scale (-1,1);
            // // Startpoint
            // let startPoint3 = [40,39];
            // let middlePoint3 = [40,60];
            // let endPoint3 = [10,60]; 
            // let startPoint4 = [endPoint1[0],endPoint1[1]];
            // let middlePoint4 = [30,60];
            // let endPoint4 = [startPoint1[0]-10, startPoint1[1]];
            // rect(0,-20,240,60,15)
            // beginShape();
            // vertex(40, 39);
            // bezierVertex(startPoint3[0], startPoint3[1], middlePoint3[0], middlePoint3[1], endPoint3[0], endPoint3[1]);
            // bezierVertex(startPoint4[0], startPoint4[1], middlePoint4[0], middlePoint4[1], endPoint4[0], endPoint4[1]);
            // endShape();

            // fill (0)
            // textSize(15);
            // text("NICE DAY FOR A WALK!", 10,0)
            // text("ARROW KEYS FOR WALKING", 10,17)
            // text("ARROW UP FOR JUMPING", 10,34)
            // fill (255)


          } 
    },

}

const TEXT_EL = 
{
    win: "You WIN!!!",
    gameOver: "You lose!!!",
    // info: "You need 18 points and the hammer!",
    tryAgain: 'Press "N" to try again!',
    haveHammer: "You have THE HAMMER!!!",
    noHammer: "You don't have a hammer.",
    goToFlagpole: "GO TO THE FLAGPOLE!!!",

    evening: "evening",
    morning: "morning",
    day: "day",
    night: "night",
    

    infoTalk1: "",
    infoTalk2: "Arrow keys for walking",
    infoTalk3: "Arrow up for jumping",




}

const timerController =
{
    waitingTimers: [],
    executeTimers: [],

    setWaitingTimer: function (newObject)
    {
        // console.log(newObject);
        let timersLength = this.waitingTimers.length;
        let searchIndex = floor(timersLength /2);
        let lowBar =0;
        let lastIndex = 0;
        let foundIndex = false;
        newObject.timer = frameCount + newObject.duration;
        
        
       while (!foundIndex)
       {
           lastIndex = searchIndex;
           if (searchIndex >= timersLength )  
           {
                break;
           }

           if (newObject.timer > this.waitingTimers[searchIndex].timer )
           {
               
               lowBar = ++searchIndex
               searchIndex = floor( ( lowBar + timersLength) /2);
              
           } else
           {
               timersLength = searchIndex;
            //    console.log(lowBar == lastIndex);
               searchIndex = floor( (timersLength +lowBar ) /2);
               
           }

           if (searchIndex == lastIndex)
           {
               foundIndex = true; 
           }
           if ( searchIndex == 0) 
            {
                if ( this.waitingTimers[0].timer <= newObject.timer)
                {
                searchIndex = 1;  
                } 
                
                break; 

            } 
       }
       
    //    console.log(searchIndex , newObject.timer, this.waitingTimers.length)
        
        this.waitingTimers.splice(searchIndex, 0, newObject);
    },
    setExecuteTimer: function (newObject)
    {

        let timersLength = this.executeTimers.length;
        let searchIndex = floor(timersLength /2);
        let lowBar =0;
        let lastIndex = 0;
        let foundIndex = false;
        newObject.timer = frameCount + newObject.duration; 
        // console.log(newObject, frameCount);
        
       while (!foundIndex) 
       {
            lastIndex = searchIndex;
            if (searchIndex >= timersLength )
            {
                    break;
            }

            if (newObject.timer > this.executeTimers[searchIndex].timer )
            {
                lowBar = ++searchIndex;
                searchIndex = floor( ( lowBar + timersLength) /2);
                
            } else
            {
                timersLength = searchIndex;
                
                searchIndex = floor( (timersLength + lowBar) /2);
            }

            if (searchIndex == lastIndex)
            {
                foundIndex = true;
            }
            if ( searchIndex == 0) 
                {
                    if ( this.executeTimers[0].timer <= newObject.timer)
                    {
                    searchIndex = 1;  
                    } 
                    
                    break; 

                } 
        }
        
        // console.log(searchIndex , newObject.timer, this.waitingTimers.length)

        this.executeTimers.splice(searchIndex, 0, newObject);
    },
    runExecuteTimers: function ()
    {
        // console.log("ExecuteTimers: ", this.executeTimers)
        if (this.executeTimers.length > 0)
        {
            while (this.executeTimers[0].timer <= frameCount)
            {
                this.executeTimers.shift();
                if (this.executeTimers.length <= 0)
                {break;}

            }
            for (i = 0; i < this.executeTimers.length ; i++)
            {
                this.executeTimers[i].executeTimer();
            }
        }   
    },
    runWaitingTimers: function ()
    {
        // console.log(this.waitingTimers)
        if (this.waitingTimers.length > 0)
        {
            if (this.waitingTimers[0].timer <= frameCount) 
            {
                if (this.waitingTimers[0].marked)
                {
                    this.waitingTimers.shift();
                } else
                {
                    
                    this.waitingTimers[0].waitingTimer();
                    this.waitingTimers.shift();
                }
                
                // if (this.waitingTimers.length <= 0)
                // {break;}
            }
        }   

        // console.log("waitingTimers: ", this.waitingTimers)
    }, 
}

function displayUI ()
{
    
    for (i = 0; i < gameChar.lives; i++)
    {
        drawCharacterLives(UI_EL.LIVES_X+UI_EL.LIVES_X_DISTANCE * i, UI_EL.LIVES_Y);
    }
    
     
    push();
    textAlign(CENTER,TOP);
    if (gameChar.hasWon)
                {
                    printWinText();
                }
        else if (gameChar.gameOver)
                {
                    printGameOverText();
                } 
        else if (gameChar.infoText)
                {
                    printInfoText ();
                }
        else    {
                printDefaultText();
                printHammerText();
                }
        
        
        function printWinText ()
    {
        textSize (30);
        text(TEXT_EL.tryAgain, GAME_PROPS.WIDTH/2, GAME_PROPS.HEIGHT/2 -150 )
        
        textAlign(CENTER,CENTER);
        fill(floor(random(255)),floor(random(255)), floor(random(255)) );
        stroke(floor(random(255)),floor(random(255)), floor(random(255)) );
        textSize (floor(random(45,50)));
        strokeWeight(floor(random (2,5)));
        text(TEXT_EL.win, GAME_PROPS.WIDTH/2, GAME_PROPS.HEIGHT/2 )
        
    } 

    function printGameOverText ()
    {
        textAlign(CENTER,CENTER);
        fill(0);
        stroke(255);
        textSize (50);
        strokeWeight(5);
        text(TEXT_EL.gameOver, GAME_PROPS.WIDTH/2, GAME_PROPS.HEIGHT/2 )
        textSize (30);
        text(TEXT_EL.tryAgain, GAME_PROPS.WIDTH/2, GAME_PROPS.HEIGHT/2 -150 )
        
    } 
    function printInfoText ()
    {
        // textAlign(CENTER,CENTER);
        // fill(0);
        // // stroke(255);
        // textSize (40);
        // // strokeWeight(5);
        // text(TEXT_EL.info, GAME_PROPS.WIDTH/2, GAME_PROPS.HEIGHT/2 )
        strokeWeight(2);
        stroke(0);
        fill(255);
        //for gameChar speech
        translate (gameChar.screenX+10,gameChar.y-115)
        
        if (dtVars.B_Day)
        {
            if (dtVars.B_NigthToDay)
            {
                
                TEXT_EL.timeOfDay = TEXT_EL.morning;
            } else
            {
                TEXT_EL.timeOfDay = TEXT_EL.day;
            }

        } else if (dtVars.B_NigthToDay)
        {
            TEXT_EL.timeOfDay = TEXT_EL.night;
        } else {TEXT_EL.timeOfDay = TEXT_EL.evening;}
        TEXT_EL.infoTalk1 = `Nice ${TEXT_EL.timeOfDay} for a walk!`
        // scale (-1,1);
        // Startpoint
        let startPoint3 = [40,39];
        let middlePoint3 = [40,60];
        let endPoint3 = [10,60]; 
        let startPoint4 = [endPoint3[0],endPoint3[1]];
        let middlePoint4 = [30,60];
        let endPoint4 = [startPoint3[0]-10, startPoint3[1]];
        rect(20,-20,180,60,15)
        beginShape();
        vertex(40, 39);
        bezierVertex(startPoint3[0], startPoint3[1], middlePoint3[0], middlePoint3[1], endPoint3[0], endPoint3[1]);
        bezierVertex(startPoint4[0], startPoint4[1], middlePoint4[0], middlePoint4[1], endPoint4[0], endPoint4[1]);
        endShape();
        
        fill (0)
        textSize(15);
        text(TEXT_EL.infoTalk1, 115,0-15);
        text(TEXT_EL.infoTalk2, 115,17-15);
        text(TEXT_EL.infoTalk3, 115,34-15);

        
    } 

    function printHammerText ()
    {
        if (gameChar.hammerPickedUp) 
            {
                
                // textSize(32);
                // textAlign(CENTER,TOP);
                // text("You have the hammer!" , GAME_PROPS.WIDTH/2 , 50)
                
                if (gameChar.hammerTextCounter > frameCount)
                { 
                    textAlign(CENTER,CENTER);
                    fill(floor(random(255)),floor(random(255)), floor(random(255)) );
                    stroke(floor(random(255)), floor(random(255)), floor(random(255)) );
                    textSize (floor(random(45,50)));
                    strokeWeight(floor(random (2,5)));
                    text(TEXT_EL.haveHammer, GAME_PROPS.WIDTH/2, GAME_PROPS.HEIGHT/2 )
                }
            }  
            
            else if (gameChar.points >= 18)
            {
                textSize(32);
                textAlign(CENTER,TOP);
                text(TEXT_EL.noHammer , GAME_PROPS.WIDTH/2 , 10)
            } else
            
            {
                textSize(32);
                textAlign(CENTER,TOP);
                text(TEXT_EL.noHammer , GAME_PROPS.WIDTH/2 , 50)
            }
    } 

    function printDefaultText ()
    {
        if (gameChar.points < 18)
        {
            textSize(32);
            
            text( `You have ${gameChar.points} points!`, GAME_PROPS.WIDTH/2 , 20)
        }
            else if (gameChar.hammerPickedUp) 
        {
            gameChar.winCondition = true;
            textSize(50);
            text(`You have enough, ${gameChar.points} points!`, GAME_PROPS.WIDTH/2 , 40);
            text(TEXT_EL.goToFlagpole, GAME_PROPS.WIDTH/2 , 90);
        }
            else
        {
            
            textSize(40);
            text(`You have enough, ${gameChar.points} points!`, GAME_PROPS.WIDTH/2 , 40);;
            
        }

    } 

    
    pop();
     
} 




