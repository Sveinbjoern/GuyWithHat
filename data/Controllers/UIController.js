/*

UIcontroller has one function and three objects:
displayUI () - Displays text, gameChar speachbubbles and points

UI_EL - UI constants and functions for points and lives 
TEXT_EL - contains text
timerController - optimazation for timed values. waitingTimer executes when the timer is runs out
    execute timer runs until the timer runs out.
*/
const UI_EL =
{
    LIVES_Y : 75,
    LIVES_X : 20,
    LIVES_X_DISTANCE : 40,

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
}

const TEXT_EL = 
{
    win: "You WIN!!!",
    gameOver: "You lose!!!",
    // info: "You need 18 points and the hammer!",
    tryAgain: 'Press "N" to try again!',
    haveHammer: "You have THE HAMMER!!!",

    evening: "evening",
    morning: "morning",
    day: "day",
    night: "night",
    

    infoTalk1: "",
    infoTalk2: "Arrow keys for walking",
    infoTalk3: "Arrow up for jumping",

    infoHammer1: "Great! A hammer!",
    infoHammer2: "I can trow it",
    infoHammer3: "with 'SPACEBAR'",


}

const timerController =
{
    waitingTimers: [],
    executeTimers: [],

    setWaitingTimer: function (newObject)
    {
        let timersLength = this.waitingTimers.length;
        let searchIndex = floor(timersLength /2);
        let lowBar = 0;
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
        this.executeTimers.splice(searchIndex, 0, newObject);
    },
    runExecuteTimers: function ()
    {
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
            }
        }   
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
        printDefaultText();
        printWinText();
    }
    else if (gameChar.gameOver)
    {
        printDefaultText();
        printGameOverText();
    } 
    else if (gameChar.infoText)
    {
        printInfoText ();
        printDefaultText();
    }
    else        
    {
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

        strokeWeight(2);
        stroke(0);
        fill(255);
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
        translate (-(gameChar.screenX+10),-(gameChar.y-115))
        
    } 

    function printHammerText ()
    {
        if (gameChar.hammerPickedUp) 
            {
                
                
                if (gameChar.hammerTextCounter > frameCount)
                { 
                    strokeWeight(2);
                    stroke(0);
                    fill(255);
                    translate (gameChar.screenX+10,gameChar.y-115)
                    
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
                    textAlign(LEFT);
                    text(TEXT_EL.infoHammer1, 50,0-15); 
                    text(TEXT_EL.infoHammer2, 50,17-15);
                    text(TEXT_EL.infoHammer3, 50,34-15);
                }
            }  
    } 

    function printDefaultText ()
    {
        if (gameChar.points < 18)
        {

            fill (255)
            stroke(0)
            textSize(32);
            
            text( `You have ${gameChar.points} points!`, GAME_PROPS.WIDTH/2 , 20)
        }
    } 
    pop();
     
} 




