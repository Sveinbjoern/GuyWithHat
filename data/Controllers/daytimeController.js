/*
daytimeController contains two objects
DT_CONSTS - Contains constants for time of day
dtVars - contains variables and functions for controlling time of day
*/

const DT_CONSTS =
{
    MORNING_TWILLIGHT_DUR: 1000,
    DAY_DUR: 4800, //4800
    EVENING_TWILLIGHT_DUR: 1000,
    NIGHT_DUR: 500,
    NIGHT_DARK_FAC: 110,

    setup: function ()
    {
        this.MORNING_TWILLIGHT_DARK_FAC = this.NIGHT_DARK_FAC / this.MORNING_TWILLIGHT_DUR;
        this.EVENING_TWILLIGHT_DARK_FAC =  this.NIGHT_DARK_FAC / this.EVENING_TWILLIGHT_DUR;
        this.SUN_MORNING_START_END_FAC =  [0, 2, 0.1];
    },

    
}





let dtVars = //daytime variables
{
    sunCoordinates : [],
    sunScale : 1,
    sunColor : [ 40 ,120],
    daytimeCounter : 1,
    
    B_NigthToDay : false,
    B_Day : true,
     
    nightDarkVar: 0,

    cloudMovement : 0, 
    cloudSpeed : 0.3,

    nightTimeShroud: function ()
    {
        // SETTING A DAMPENER OVER THE WHOLE OF THE SCREEN BEFORE DRAWING NIGHT LIGHTS
        
        if (dtVars.B_Day)
        {
            if (dtVars.B_NigthToDay)
            {
                dtVars.nightDarkVar -= DT_CONSTS.MORNING_TWILLIGHT_DARK_FAC;
                push(); 
                fill (0,dtVars.nightDarkVar);
                noStroke();
                rect (0,0,width,height); 
                pop();
            } 
            
        } else if (!dtVars.B_NigthToDay)
        {
            dtVars.nightDarkVar += DT_CONSTS.EVENING_TWILLIGHT_DARK_FAC;
            push(); 
            fill (0,dtVars.nightDarkVar);
            noStroke();
            rect (0,0,width,height); 
            pop();
        } else
        {
            push(); 
            fill (0,dtVars.nightDarkVar);
            noStroke();
            rect (0,0,width,height); 
            pop();
        }
        
    },
    
    skyLogics: function ()
    {    
        dtVars.cloudMovement += dtVars.cloudSpeed; 
        
        
        if (dtVars.B_Day)
            {
                if (dtVars.B_NigthToDay)
                {
                    sunMorning();            
                    if (dtVars.daytimeCounter < DT_CONSTS.MORNING_TWILLIGHT_DUR) 
                    {
                        dtVars.daytimeCounter ++;
                    }
                    else {dtVars.B_NigthToDay = false;dtVars.daytimeCounter = 1;dtVars.nightDarkVar = 0;} 
                } else 
                {
                    sunDay();

                    if (dtVars.daytimeCounter < DT_CONSTS.DAY_DUR) {dtVars.daytimeCounter ++;}
                    else {dtVars.B_Day = false; dtVars.daytimeCounter = 1;} 
                }
            } else if (!dtVars.B_NigthToDay)
            {
            
                sunEvening();
                if (dtVars.daytimeCounter < DT_CONSTS.EVENING_TWILLIGHT_DUR) 
                {
                    dtVars.daytimeCounter ++;
                }
                else {dtVars.B_NigthToDay = true;dtVars.daytimeCounter = 1} 

            } else
            {
                
                if (dtVars.daytimeCounter < DT_CONSTS.NIGHT_DUR) 
                {
                    dtVars.daytimeCounter ++;
                }
                else {dtVars.B_Day = true;dtVars.daytimeCounter = 1} 
                
            }
        

        
    function sunMorning() 
        {
            let x =  map(dtVars.daytimeCounter, 1, DT_CONSTS.MORNING_TWILLIGHT_DUR , 2, 4);
            dtVars.sunScale = map(dtVars.daytimeCounter, 1, DT_CONSTS.MORNING_TWILLIGHT_DUR , 0.5,0.3);  
            

            dtVars.sunCoordinates = [   lerp(   sunMovement[Math.floor(x)][0],
                                                sunMovement[Math.ceil(x)][0],
                                                x % 1),
                                        lerp (  sunMovement[Math.floor(x)][1],
                                                sunMovement[Math.ceil(x)][1],
                                                x % 1)]

            drawSun();            
    
            
        }
        function sunDay() 
        {
            let x =  map(dtVars.daytimeCounter, 1, DT_CONSTS.DAY_DUR , 4, 11);
            
            dtVars.sunScale = 0.3; 
            dtVars.sunCoordinates = [   lerp(   sunMovement[Math.floor(x)][0],
                                                sunMovement[Math.ceil(x)][0],
                                                x % 1),
                                        lerp (  sunMovement[Math.floor(x)][1],
                                                sunMovement[Math.ceil(x)][1],
                                                x % 1)]
            drawSun();            
    
            
        }

        function sunEvening() 
        {
            let x =  map(dtVars.daytimeCounter, 1, DT_CONSTS.EVENING_TWILLIGHT_DUR , 11, 14);
            
            dtVars.sunScale = map(dtVars.daytimeCounter, 1, DT_CONSTS.EVENING_TWILLIGHT_DUR , 0.3, 0.5);  
            dtVars.sunCoordinates = [   lerp(   sunMovement[Math.floor(x)][0],
                                                sunMovement[Math.ceil(x)][0],
                                                x % 1),
                                        lerp (  sunMovement[Math.floor(x)][1],
                                                sunMovement[Math.ceil(x)][1],
                                                x % 1)]

            drawSun();            
    
            
        }
        


        
    },





} 


