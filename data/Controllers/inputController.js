////////////////////////////////////////////////////////////////////////////////////////////
// INPUT RELATED VARIABLES AND OBJECTS 
/////////////////////////////////////////////////////////////////////////////////
const CONTROLS = 
{
    SPACEBAR_KEY: 32,
    UP_ARROW_KEY: 38,
    LEFT_ARROW_KEY: 37,
    RIGHT_ARROW_KEY: 39,
    KEY_B: 66,
    KEY_N: 78,
    KEY_Z: 90,
     
    jumpKeyRelease: function ()
    {
        gameChar.jumpCounter = max( gameChar.jumpCounter , GAME_CHAR.JUMP_MAX)
        if (gameChar.isStanding) 
        {
            gameChar.speedY = gameChar.jumpCounter;
            gameChar.isStanding = false;
        }
        gameChar.jumpCounter = GAME_CHAR.JUMP_MIN;
        gameChar.jumpCompCounter = 0;
        charLogics.keyPressed.jump = false;
    },
}
    
  
//KEYS
function keyPressed()
{
    
    if (gameChar.gameOver || gameChar.hasWon)
    {
        if (keyCode == CONTROLS.KEY_N) 
            {charLogics.resetGame();}
        else if (keyCode == CONTROLS.KEY_Z) 
            {GAME_PROPS.makeScreenshot();} 
        else if (keyCode == CONTROLS.KEY_B) 
            {charLogics.DEBUG_move();} 
    } else if (keyCode == CONTROLS.KEY_Z) 
        {GAME_PROPS.makeScreenshot();} 
    else if (keyCode == CONTROLS.KEY_B) 
        {charLogics.DEBUG_move();} 
    else if (keyCode == CONTROLS.KEY_Z) 
        {GAME_PROPS.makeScreenshot();} 
    else if (keyCode == CONTROLS.KEY_B)
        {charLogics.DEBUG_move();} 
    else if (keyCode == CONTROLS.UP_ARROW_KEY) 
        {charLogics.keyPressed.jump = true;} 
    else if (keyCode == CONTROLS.LEFT_ARROW_KEY) 
        { charLogics.keyPressed.leftArr = true;}
    else if (keyCode == CONTROLS.RIGHT_ARROW_KEY) 
        {charLogics.keyPressed.rightArr = true;} 
    else if (keyCode == CONTROLS.SPACEBAR_KEY ) 
        { charLogics.keyPressed.space = true;} 

       
}
function keyReleased() 
{

    
        if (keyCode == CONTROLS.UP_ARROW_KEY) 
            {
         
                CONTROLS.jumpKeyRelease();
         
            }  
        else if  (keyCode == CONTROLS.LEFT_ARROW_KEY) 
            {
         
                charLogics.keyPressed.leftArr = false;
         
            } 
        else if (keyCode == CONTROLS.RIGHT_ARROW_KEY) 
            {
         
                charLogics.keyPressed.rightArr = false;
         
            } 
        else if (keyCode == CONTROLS.SPACEBAR_KEY)
            {
                gameChar.throwHammer();
                charLogics.keyPressed.space = false;
                gameChar.hammerChargeRotation = 0;
                gameChar.hammerChargeCounter = 0;
            }
    
    // P5.js WEBPPAGE RECOMMENDs RETURNING FALSE TO AVOID DEFAULT BEHAVIOUR.
    return false;

}