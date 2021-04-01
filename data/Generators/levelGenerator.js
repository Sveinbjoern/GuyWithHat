const GAME_PROPS =
{
    WIDTH : 16*60,
    HEIGHT : 9*60,
    FLOOR_POS : 489,
    
    SIN_128X2_ARRAY : [],
    SIN_128X2_ARRAY_LIMIT: 127,
    SIN_128X2_ARRAY_HALF_LIMIT: 0,

    setup: function ()
    {
        
        this.SCROLL_LIMITS = [0, this.WIDTH *6]; 
        this.SCREEN_MIDDLE_X = this.WIDTH/2;
        this.LEVEL_LIMITS_X  = [0, (this.WIDTH *7) ]; 
        this.GAME_CHAR_CONTAIN  = [0 + 30, (this.WIDTH *7) -30]; 
        this.SIN_128X2_ARRAY_HALF_LIMIT = ceil (this.SIN_128X2_ARRAY_LIMIT/2);

        this.SIN_128X2_ARRAY = GAME_PROPS.createSin(128,2);
        
        // console.log(GAME_PROPS.easedArray(-30, 1, 11, true, 5,5)); // OKAY
        // console.log(GAME_PROPS.easedArray(1, -30, 11, true, 5,5)); 

        // console.log(GAME_PROPS.easedArray(-30, 1, 11, false, 5,5));
        // console.log(GAME_PROPS.easedArray(1, -30, 11, false, 5,5));
        
        // console.log(GAME_PROPS.easedArray(-3, 1, 11, true, false, 2));
        // console.log(GAME_PROPS.easedArray(1, -3, 11, true, false, 2));
        
        // console.log(GAME_PROPS.easedArray(-3, 1, 11, false, false, 2));
        // console.log(GAME_PROPS.easedArray(1, -3, 11, false, false, 2));
        
    },

    createSin: function ( length, strength) 
    {   
        let array = [];

        for (i = 0; i < length; i++)
        {
            array.push( sin(strength * Math.PI *  i/(length-1)));
        }
        
        return array; 
    
    },


    ////////////////////////////////////////////////////////////////////////////////////
    // MATH FUNCTIONS
    /////////////////////////////////////////////////////////////////////////////////

    easedArray: function ( obj )
    {
        let array = [];
        
       
        if (!obj.slowStart) // && startVal < endVal || !slowStart && startVal > endVal)
        {
            
            for (i = 0; i < obj.amount; i++)
            {
                array.push(- (pow(i,obj.power)/pow(obj.amount-1,obj.power))+1 );
            } 
            array.forEach( (value, index ) => { array[index] = 
                                        round (value *(obj.endVal-obj.startVal)+obj.startVal , obj.precision)});
            
            array.reverse();

        } else
        {
            for (i = 0; i < obj.amount; i++)
            {
                array.push(pow(i,obj.power)/pow(obj.amount-1,obj.power));
            }
            array.forEach( (value, index ) => { array[index] = 
                                        round (value *(obj.endVal-obj.startVal)+obj.startVal , obj.precision)});



        }
        


        
        return array;

    },

   


    //////////////////////////////////////////////////////////////////
    // Screenshot Functions
    ////////////////////////////////////////////////////////////////////
    //ADAPTED FROM:
    //screenshot demo
    //by ChrisOrban
    //https://editor.p5js.org/ChrisOrban/sketches/ryXx1hjWZ 




    formatNumberLength: function (num, length) 
    {
        let r = "" + num;
        while (r.length < length) 
        {
            r = "0" + r;
        }
        return r;
    },


    makeScreenshot: function ()
    {
        let formatted_number = this.formatNumberLength(this.screenshotIteration,4);
        saveCanvas("screenshot"+formatted_number,"png");

        charLogics.screenshotIteration ++;
    },

}

function CreateLevel ()
{


    generateForground();
    generateBackground();
    generateDistantBackGround();




    function generateForground ()
    {
        // MAke the size of the level
        // distribute canyons
        // make enemies positions
        // Make position array of birds
        

        // Starting area 
        // first birds many canyons
        // more birds less canyons
        // Hammer
        // more birds more canyons
        // a lot of birds, same amount of canyons
        // ending area

    } 


    function generateBackground ()
    {
        // Make the background map
        // Place stuff
        // [0, (this.WIDTH *7) ];
    }

    function generateDistantBackGround ()
    {

    }






}

// BACKGROUND ELMENTS THAT POPULATE THE MIDDLE OF THE SCREEN WITH SCROLLFACTOR GIVEN BY THEIR Y POSTION
const BACKGR    =
{
    // MOST IMPRORTANT ARRAY IN THE GAME, BACKGR.ELEMENTS - I IS MADE HERE IN THE levelGenerator.js
    ELEMENTS: [],

    START_Y : 315,
    STOP_Y : 461,
    STOP_Y_CANYON: 484,
    NUMBER_Y: 147,
    NUMBER_Y_CANYON: 170,
    type_pos_x: [],
    
    

    D_T_STR: "DISTANT_TREES",
    D_T2_STR: "DISTANT_TREES2",
    T_STR: "TREES",
    T2_STR: "TREES2",
    R_STR: "ROCKS",
    H_STR: "HOUSES",
    BASE_OBJ:
    [
        {
            NUMBER: 1, 
            LEFT: -54,
            RIGHT: 39,
            BASE_SCALE: 3.5,
            DEPTH: [60,300],
            BASE: [-54*3.5,35*3.5],//-54,35
            HEIGHT: -69,
            RANDOM_RANGE: [1,1],
            Y_RANGE: [330, 380],
            DISTRIBUTION: [0,1500],
            NAME: "HOUSES",
        },
        {
            NUMBER: 1, 
            LEFT: -60, 
            RIGHT: 79, 
            BASE_SCALE: 1,
            DEPTH: [5,10],
            BASE: [-20,20],
            HEIGHT: -197,
            RANDOM_RANGE: [0.8,1.3],
            Y_RANGE: [315, 484],
            DISTRIBUTION: [[30],[25],[20],[10],[10]],
            NAME: "TREES",
        },
        {
            NUMBER: 1,
            LEFT: -52,
            RIGHT: 59,
            BASE_SCALE: 1,
            DEPTH: [15,15],
            BASE: [-20,20],
            HEIGHT: -242,
            RANDOM_RANGE: [0.7,1.3],
            Y_RANGE: [315, 480],
            DISTRIBUTION: [[30],[25],[20],[10],[10]],
            NAME: "TREES2",
        },
        {
            NUMBER: 1,
            LEFT: -14,
            RIGHT: 11,
            BASE_SCALE: 2.8,
            DEPTH: [5,5],
            BASE: [-4*5.8,5*2.8],
            HEIGHT: -50,
            RANDOM_RANGE: [0.7,1.3],
            Y_RANGE: [315, 430],
            DISTRIBUTION: [[30],[25],[20],[10],[10]],
            NAME: "DISTANT_TREES",
        },
        {
            NUMBER: 1,
            LEFT: -21,
            RIGHT: 9,
            BASE_SCALE: 1.35,
            DEPTH: [5,5],
            BASE: [-4*1.35,4*1.35],
            HEIGHT: -68,
            RANDOM_RANGE: [0.7,1.3],
            Y_RANGE: [315, 400],
            DISTRIBUTION: [[30],[25],[20],[10],[10]],
            NAME: "DISTANT_TREES2",
        },
        {
            NUMBER: 1,
            LEFT: -5,
            RIGHT: 7,
            BASE_SCALE: 1,
            DEPTH: [4,4],
            BASE: [-2,2],
            HEIGHT: -6,
            RANDOM_RANGE: [0.7,1],
            Y_RANGE: [430, 484],
            DISTRIBUTION: [[20],[20],[20],[20],[20]],
            NAME: "ROCKS",
        }
    ], 

    DISTANT_TREES_X: [],//149, 124, 254, 363, 2325, 3088, 2643, 2916, 801, 3884, 4717, 2362, 4543, 4180, 2681, 3308, 3482, 2635, 4529, 1461, 3214, 3172, 4278],
    DISTANT_TREES2_X: [],//159, 351, 1224, 933, 570, 1364, 1528, 842, 2530,  2791, 3206,  3772, 1357, 4560, 4422, 2964, 3506, 3320, 2750, 4304, 2901, 3674, 895, 3390, 3710],
    TREES_X: [], // 369, 247, 2506, 3209, 1303, 3677, 3114, 3765, 551, 906, 968, 3332, 2605, 2551, 2902, 1978, 3603],
    TREES2_X: [], //279, 222, 142,589, 1089, 2226, 1209, 612, 636, 2736, 866, 2096, 947, 2147, 1321, 638, 1595, 3565],
    ROCKS_X: [], //124,429,600,8,364,223,42,219 ],
    HOUSES_X: [],//300,460,880],

    DISTANT_TREES_Y: [], //352, 319, 328, 338, 324, 364, 325, 343, 351, 349, 350, 349, 337, 334, 350, 360, 369, 355, 322, 349, 343,  367, 347], //distant only
    DISTANT_TREES2_Y: [],//332, 315, 348, 320,  315, 322, 347, 338, 349, 333, 334,  333, 326, 334, 359, 327, 339, 315, 348, 326,  353, 321, 346, 360, 366],  //distant only
    TREES_Y: [],//415, 371, 369, 435, 335, 357, 450, 407, 362, 376, 361, 437, 333, 369, 378, 316, 442 ],
    TREES2_Y: [],// 419, 315, 343,406, 401, 438, 408, 381, 348, 431, 316, 437, 361, 436, 449, 444, 428, 428],
    ROCKS_Y: [],// 417, 415, 433, 420, 422, 448, 429, 435  ], 
    HOUSES_Y: [],//350, 375, 400],

    SCROLLFAC: [],
    CANYONFAC: [],

    SCROLLFAC_315:  0.1,
    SCROLLFAC_484:  1,

    SPACE: [],
    CANYONFAC_315: 0.001,
    CANYONFAC_484:  0.98,
    SCROLL_CHANGE_FAC: 5.325/1000,
    TEST_BOX: [],

    MAP: [],
    TOTAL_NUMBER: 0,
    ADDITIONAL_MAP_DIST: 80,
    DIFFERENCE_IN_MAP: [],
    

    CANYONLINES: [],
    SETUP_CANYONLINES: function() 
    { 
        // console.log("running",INTER_EL.CANYONS.length)
        this.CANYONLINES[0] = [];
        
        for (let i = 0, j = 0; i < INTER_EL.CANYONS.length; )
        {
           
            // console.log("running")
            if (i >= INTER_EL.CANYONS.length-1)
            {
                j = INTER_EL.CANYONS.length-1;
                break;    
            }
            j = i;
            while (INTER_EL.CANYONS[j].RIGHT >= INTER_EL.CANYONS[j+1].LEFT)
            { 
                
                j++;
                // console.log("running")
                if (j+1 >= INTER_EL.CANYONS.length) 
                {
                    // console.log("running")
                    j = INTER_EL.CANYONS.length-1;
                    break;
                }

            }
            // console.log("[INTER_EL.CANYONS[i].LEFT, INTER_EL.CANYONS[j].RIGHT]",[INTER_EL.CANYONS[i].LEFT, INTER_EL.CANYONS[j].RIGHT])
            
            this.CANYONLINES[0].push ( [INTER_EL.CANYONS[i].LEFT-1, INTER_EL.CANYONS[j].RIGHT+1 ]);
            i = ++j;

        }
        // console.log(this.CANYONLINES);
        let currentLine = 1;
        let direction = [];
        let contraction = [];
        
        for (i = 0 ; i < this.CANYONLINES[0].length; i++)
        {
            direction.push(random(-5,5));
            contraction.push(random(-5,5));
        }
        // console.log(direction)
        
        while (currentLine < this.NUMBER_Y_CANYON)
        {
            
            let array = [];
            this.CANYONLINES[currentLine] = [];
            for (let i = 0; i < this.CANYONLINES[0].length; i++)
            {
                // console.log("this.CANYONLINES[currentLine-1].length",this.CANYONLINES[currentLine-1].length)
                direction[i] = direction[i] += random (-0,5)//constrain ( direction[i] += random (0,5), -50,50);
                contraction[i] = contraction[i] += random (-5,5);
                
                // console.log(contraction) 
                // console.log(this.CANYONLINES)
                // console.log("this.CANYONLINES[0][0]",(this.CANYONLINES[0][i][0] - (BACKGR.STOP_Y_CANYON-currentLine)  *BACKGR.SCROLL_CHANGE_FAC  *(this.CANYONLINES[0][i][0] -GAME_PROPS.SCREEN_MIDDLE_X)) )
                let x1 =    (this.CANYONLINES[0][i][0]+direction[i]) - (currentLine-1)  *BACKGR.SCROLL_CHANGE_FAC  *(this.CANYONLINES[0][i][0] -GAME_PROPS.SCREEN_MIDDLE_X );
                let x2 =    ((this.CANYONLINES[0][i][1] +contraction[i])- (currentLine-1)  *BACKGR.SCROLL_CHANGE_FAC  *(this.CANYONLINES[0][i][1] -GAME_PROPS.SCREEN_MIDDLE_X ) ) - x1 ;
                // console.log("ten pushesx1x2", [round(x1), round(x2)])
                if (x2 < 0)
                { 
                    continue;
                } //else
                // {
                //     this.CANYONLINES[currentLine] = [];
                // }

                array.push([round(x1), round(x2)]);
                // console.log("array.length",array.length)
                // this.CANYONLINES[currentLine][i] =   [round(x1), round(x2)];

                // console.log("this.CANYONLINES[currentLine-1].length",this.CANYONLINES[currentLine-1].length)

                // console.log(" CURENT ,I",currentLine,i)
                // console.log("ten CANTONLINE CURENT I",this.CANYONLINES[currentLine][i])
                

 
            } 
            // console.log(array)
            if (array == [])
            {
                this.CANYONLINES[currentLine].push(array);
            }else if (array.lenght == 1)
            {
                this.CANYONLINES[currentLine].push(array)
            } else
            {
                for (let i = 0, j = 0; i < array.length; )
                {
                    
                    // console.log("running", array.length)
                    // console.log(i)
                    if (i >= array.length-1)
                    {
                        j = array.length-1;
                        this.CANYONLINES[currentLine].push ( [array[i][0], array[j][1] ]);
                        break;  
                    }
                    j = i;
                    
                    while (array[j][1]+array[j][0] >= array[j+1][0])
                    {
                        
                        j++;
                        // console.log("running")
                        if (j+1 >= array.length) 
                        {
                            // console.log("running")
                            j = array.length-1;
                            break;
                        }

                    }
                    // console.log("[INTER_EL.CANYONS[i].LEFT, INTER_EL.CANYONS[j].RIGHT]",[INTER_EL.CANYONS[i].LEFT, INTER_EL.CANYONS[j].RIGHT])
                    
                    this.CANYONLINES[currentLine].push ( [array[i][0], array[j][1] ]);
                    i = ++j;
                    // console.log(i)

                }
            }

            currentLine++;
        } 
        for (let i =0; i < this.CANYONLINES[0].length; i++)
        {
            this.CANYONLINES[0][i][1] = this.CANYONLINES[0][i][1] - this.CANYONLINES[0][i][0];
        }
        // while ( x2 -x1 > 0)
        // {
        //     let y = BACKGR.STOP_Y_CANYON - i

        //     INTER_EL.CANYONS[i].x     
        //     for (i = 0; i < INTER_EL.CANYONS.length; i++)
        //     {
                
        //         let length = INTER_EL.CANYON_WIDTH*this.CANYONFAC[i];

                
        //     }
        //     length = INTER_EL.CANYON_WIDTH*this.CANYONFAC[i];
        // }
        
    },

    SETUP: function(){

      

        
        // LERP THE SCROLLFAC the factor that scroll needs to be multiplied with for correct parallax motion
        for (i = 0; i < BACKGR.NUMBER_Y_CANYON  ; i ++) 
        {
            BACKGR.SCROLLFAC.push(   round (lerp(BACKGR.SCROLLFAC_315, BACKGR.SCROLLFAC_484 , i/(BACKGR.NUMBER_Y_CANYON -1) ),4 ) );
        }
        for (i = 0; i < BACKGR.NUMBER_Y_CANYON  ; i ++) 
        {
            BACKGR.CANYONFAC.push(   lerp(BACKGR.CANYONFAC_315, BACKGR.SCROLLFAC_484 , i/(BACKGR.NUMBER_Y_CANYON -1))     ) ;
        }
        for (i = 0; i < BACKGR.NUMBER_Y_CANYON  ; i ++) 
        {
            BACKGR.SPACE.push( round ( (GAME_PROPS.WIDTH  / BACKGR.SCROLLFAC[i] ) + GAME_PROPS.SCROLL_LIMITS[1]         ));
        }


        this.MAP = new Array(this.NUMBER_Y_CANYON);
        for (i = 0 ; i < this.NUMBER_Y_CANYON; i++)
        {
            this.MAP[i] = new Array( this.SPACE[i] + floor(this.ADDITIONAL_MAP_DIST  * BACKGR.SCROLLFAC[i]) )
        }

        
        for (i = 0 ; i < this.NUMBER_Y_CANYON; i++)
        {
            this.DIFFERENCE_IN_MAP.push( floor((this.MAP[i].length - this.SPACE[i])/2) ) 
        }


        this.TOTAL_NUMBER = this.BASE_OBJ[0].NUMBER +
                            this.BASE_OBJ[1].NUMBER +
                            this.BASE_OBJ[2].NUMBER +
                            this.BASE_OBJ[3].NUMBER +
                            this.BASE_OBJ[4].NUMBER +
                            this.BASE_OBJ[5].NUMBER;

        //Create map[]
        // console.log(this.MAP);
        for (let i = 0; i < this.TOTAL_NUMBER; i++ )
        {
            let foundSpace = false;
            // console.log(i);
            
            let index = changeIndex(i);
            let rangeAtFac1 = []
            let yRange;
            let xRange;
            let stretchX = [];
            let xTransfomed; 
            // console.log("spread operator", ...this.BASE_OBJ[0].Y_RANGE)
            // console.log("random y",y);
            // console.log("map length",this.MAP[y - this.START_Y].length-1);
            // console.log("Bobobo",this.OBJECT_ARRAY[i].DISTRIBUTION[0], this.SPACE[y-this.START_Y], this.OBJECT_ARRAY[i].DISTRIBUTION[1], GAME_PROPS.LEVEL_LIMITS_X[1]);

            // let x = floor(random(this.BASE_OBJ[0].DISTRIBUTION[0], 
            //     this.SPACE[y-this.START_Y] *  
            //     this.BASE_OBJ[0].DISTRIBUTION[1] / 
            //     GAME_PROPS.LEVEL_LIMITS_X[1] ));
            // console.log("random x", x);
            for (let k = 0; k < 100; k++)
            {   
                let y = floor(random(...this.BASE_OBJ[index].Y_RANGE));
                let x = floor(random(   this.BASE_OBJ[0].DISTRIBUTION[0]  - (y-BACKGR.START_Y) *BACKGR.SCROLL_CHANGE_FAC *
                                        (this.BASE_OBJ[0].DISTRIBUTION[0] - GAME_PROPS.SCREEN_MIDDLE_X), 
                                        this.BASE_OBJ[0].DISTRIBUTION[1] - (y-BACKGR.START_Y) *BACKGR.SCROLL_CHANGE_FAC *
                                        (this.BASE_OBJ[0].DISTRIBUTION[1] - GAME_PROPS.SCREEN_MIDDLE_X)));

                

                for (let j = 0; j < 100; j++)
                {
                    if (testSpace(y,x))
                    {
                        // BACKGR.HOUSES_X = x;
                        // BACKGR.HOUSES_Y = y;
                        foundSpace = true;
                        break;
                    } else    
                    {
                        x = floor(random(this.BASE_OBJ[0].DISTRIBUTION[0]/BACKGR.SCROLLFAC[y-BACKGR.START_Y], 
                                        this.BASE_OBJ[0].DISTRIBUTION[1]/BACKGR.SCROLLFAC[y-BACKGR.START_Y]));
                    }
                } 
                if (foundSpace)
                { 
                    fillSpace(y,x);
                    break;
                }
                function testSpace(y,x)
                {
                    // console.log("i",i,"index", index, "x", x,"y",y);  
                    yRange = [  round(y - BACKGR.BASE_OBJ[index].DEPTH[1]*BACKGR.SCROLLFAC[y-BACKGR.START_Y]), 
                                round(y + BACKGR.BASE_OBJ[index].DEPTH[0]*BACKGR.SCROLLFAC[y-BACKGR.START_Y])];
                    xRange = [  round(x  + BACKGR.BASE_OBJ[index].BASE[0]*BACKGR.SCROLLFAC[y-BACKGR.START_Y]),
                                round(x  + BACKGR.BASE_OBJ[index].BASE[1]*BACKGR.SCROLLFAC[y-BACKGR.START_Y])]
                    
                    
                    yRange[0] = max( BACKGR.START_Y, yRange[0] );
                    yRange[1] = min( BACKGR.STOP_Y_CANYON, yRange[1] );
                    xRange[0] = max(0 ,xRange[0] );
                    xRange[1] = min(BACKGR.MAP[y-BACKGR.START_Y].length-1,xRange[1] );
                    stretchX.push(  x + round(BACKGR.BASE_OBJ[index].LEFT *BACKGR.SCROLLFAC[y-BACKGR.START_Y]),
                                    x + round(BACKGR.BASE_OBJ[index].RIGHT *BACKGR.SCROLLFAC[y-BACKGR.START_Y]))

                    rangeAtFac1[0] =    (xRange[0] - (y -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC*GAME_PROPS.SCREEN_MIDDLE_X) / 
                                        (1-(y -BACKGR.START_Y)*BACKGR.SCROLL_CHANGE_FAC);
                    rangeAtFac1[1] =    (xRange[1] - (y -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC*GAME_PROPS.SCREEN_MIDDLE_X) / 
                                        (1-(y -BACKGR.START_Y)*BACKGR.SCROLL_CHANGE_FAC);
                    xTransfomed =   round((x - (y -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC*GAME_PROPS.SCREEN_MIDDLE_X) / 
                                    (1-(y -BACKGR.START_Y)*BACKGR.SCROLL_CHANGE_FAC));
                    // console.log(x)
                    // xTransfomed =   round(xTransfomed - (y -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                    //                      (xTransfomed-GAME_PROPS.SCREEN_MIDDLE_X));   
                    // console.log(x, xTransfomed)           
                    for (let i = yRange[0]; i <= yRange[1]; i++ )
                    {
                        
                        let adjustedXRange = []; 
                        
                        
                        adjustedXRange[0] = round(rangeAtFac1[0] - (i -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                                        (rangeAtFac1[0]-GAME_PROPS.SCREEN_MIDDLE_X));
                        adjustedXRange[1] = round(rangeAtFac1[1] - (i -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                                        (x-GAME_PROPS.SCREEN_MIDDLE_X));
                        
                        // console.log(xRange[0], xRange[1]);                
                        // console.log("adjustedRange",adjustedXRange[0], adjustedXRange[1], xRange[0], xRange[1])
                        
                        for (let j = adjustedXRange[0]; j <= adjustedXRange[1]; j++ )
                        {
                            // console.log(i-BACKGR.START_Y,BACKGR.MAP[i-BACKGR.START_Y]);
                            if (BACKGR.MAP[i-BACKGR.START_Y][j]) 
                            {
                                return false;
                            } 
                        }
                        
                    }

                    for (let i = stretchX[0]; i <= stretchX[1]; i++ )
                    {
                        // console.log(i-BACKGR.START_Y,BACKGR.MAP[i-BACKGR.START_Y]);
                        if (BACKGR.MAP[y-BACKGR.START_Y][i]) 
                        {
                            return false;
                        } 
                    }

                    // xRange[0] = xRange[0] - (y-BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC*(xRange[0]-GAME_PROPS.SCREEN_MIDDLE_X)
                    // xRange[1] = xRange[1] - (y-BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC*(xRange[1]-GAME_PROPS.SCREEN_MIDDLE_X)
                    // BACKGR.TEST_BOX.push ( xRange[0] , yRange[0], xRange[1],yRange[1]);
                    return true;
                    
                }
                function fillSpace(y,x)
                {
                    // BACKGR.HOUSES_X.push(x);
                    // BACKGR.HOUSES_Y.push(y);
                    
                    
                    // console.log(yRange[0], yRange[1]) 
                    // console.log(xRange[0], xRange[1]);               
                    for (let i = yRange[0]; i <= yRange[1]; i++ )
                    {
                        
                        let adjustedXRange = []; 
                        
                        
                        adjustedXRange[0] = round(rangeAtFac1[0] - (i -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                                        (rangeAtFac1[0]-GAME_PROPS.SCREEN_MIDDLE_X));
                        adjustedXRange[1] = round(rangeAtFac1[1] - (i -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                                        (x-GAME_PROPS.SCREEN_MIDDLE_X)); 

                        // console.log("xRange",xRange[0], xRange[1]);                
                        // console.log("adjustedRange",adjustedXRange[0], adjustedXRange[1])
                        for (let j = adjustedXRange[0]; j <= adjustedXRange[1]; j++ )
                        {
                            // console.log(y, i, x, j);
                            // console.log(i-BACKGR.START_Y,BACKGR.MAP[i-BACKGR.START_Y]);
                            BACKGR.MAP[i-BACKGR.START_Y][j] =
                            {
                                object: "NONE",
                                filled: true, 
                                strech: true,
                                height: 0,   
                            } 
                        }
                        
                    }

                    // Fill the STRECH


                    for (let i = stretchX[0] ; i <= stretchX[1]; i++ )
                    {
                        if (BACKGR.MAP[y-BACKGR.START_Y][i] == [])
                        {
                            BACKGR.MAP[i-BACKGR.START_Y][j] =
                            {
                                object: "NONE",
                                filled: false, 
                                strech: true,
                                height: 0,   
                            } 
                        }
                    }
                    BACKGR.MAP[y-BACKGR.START_Y][x] =
                    {
                        object: BACKGR.BASE_OBJ[index].NAME,
                        filled: true,
                        strech: true,
                        height: BACKGR.BASE_OBJ[0].HEIGHT,
                    }  
                }

                if (!foundSpace)
                    {break;}
            }
        }        
        
                
            
        for(let i = 0; i < this.MAP.length; i++)
        {
            for (let j = 0; j < this.MAP[i].length; j++)
            {
                if (this.MAP[i][j])  
                {
                    switch (this.MAP[i][j].object) 
                    {
                        case BACKGR.BASE_OBJ[0].NAME:
                            BACKGR.HOUSES_Y.push( i + BACKGR.START_Y);
                            BACKGR.HOUSES_X.push( j - BACKGR.DIFFERENCE_IN_MAP[i]).
                            break;
                        case BACKGR.BASE_OBJ[1].NAME:
                            // console.log("Trees_X",i + BACKGR.START_Y,j - BACKGR.DIFFERENCE_IN_MAP[i] );
                            BACKGR.TREES_Y.push( i + BACKGR.START_Y);
                            BACKGR.TREES_X.push( j - BACKGR.DIFFERENCE_IN_MAP[i]);
                            break;
                        case BACKGR.BASE_OBJ[2].NAME:
                            BACKGR.TREES2_Y.push( i + BACKGR.START_Y);
                            BACKGR.TREES2_X.push( j - BACKGR.DIFFERENCE_IN_MAP[i]);
                            break;
                        case BACKGR.BASE_OBJ[3].NAME:
                            BACKGR.DISTANT_TREES_Y.push( i + BACKGR.START_Y);
                            BACKGR.DISTANT_TREES_X.push( j - BACKGR.DIFFERENCE_IN_MAP[i]);
                            break;
                        case BACKGR.BASE_OBJ[4].NAME:
                            BACKGR.DISTANT_TREES2_Y.push( i + BACKGR.START_Y);
                            BACKGR.DISTANT_TREES2_X.push( j - BACKGR.DIFFERENCE_IN_MAP[i]);
                            break;
                        case BACKGR.BASE_OBJ[5].NAME:
                            BACKGR.ROCKS_Y.push( i + BACKGR.START_Y);
                            BACKGR.ROCKS_X.push( j - BACKGR.DIFFERENCE_IN_MAP[i]);
                            break;
                    } 
                }
            }
        }



        //Put stuff in map
    

        // make flightpaths

        // make walkpaths
        
        


        // Make BACKGR.ELEMENTS contain all the elements we need for our background ordered by Y position
        for (i = 0; i < BACKGR.NUMBER_Y_CANYON  ; i ++) 
            {
                
                BACKGR.ELEMENTS[i] = new Array();  
                
                if (findAll_Y(i+BACKGR.START_Y))
                {
                    let array = [];
                    for (j = 0; j < BACKGR.type_pos_x.length /3; j++)
                    {    
                        array.push( BACKGR.type_pos_x[ 3 + j*3]  );
                    } 
                    // console.log(array);
                    // console.log("BACKGR.typ_pos_x",BACKGR.type_pos_x);
                    while (BACKGR.type_pos_x.length != 0)
                    {
                    //     // // ELEMENTS ADDED TO BACKGR.ELEMENTS[] SORTED BY XPOSITION FOR LATER OPTIMIZATION
                        
                        let splice_ = BACKGR.type_pos_x.splice(findArrayIndexOfMin (array), 3 ) 
                        // console.log(splice_[0]);
                        switch (splice_[0] )
                        {
                            case BACKGR.D_T_STR:
                                
                                BACKGR.ELEMENTS[i].push (makeDistantTree   (    this.BASE_OBJ[3].NAME,
                                                                                BACKGR.DISTANT_TREES_X[splice_[1]]*BACKGR.SCROLLFAC[i],
                                                                                BACKGR.DISTANT_TREES_Y[splice_[1]] ,
                                                                                BACKGR.SCROLLFAC[i],
                                                                                round(BACKGR.SCROLLFAC[i] *this.BASE_OBJ[3].BASE_SCALE * random(...this.BASE_OBJ[3].RANDOM_RANGE)),2) 
                                                                            );
                                break;
                        
                            case BACKGR.D_T2_STR:
                                // console.log("running",this.BASE_OBJ[4].NAME, splice_[0] );
                                BACKGR.ELEMENTS[i].push (makeDistantTree2   (   this.BASE_OBJ[4].NAME,
                                                                                BACKGR.DISTANT_TREES2_X[splice_[1]]*BACKGR.SCROLLFAC[i],
                                                                                BACKGR.DISTANT_TREES2_Y[splice_[1]],
                                                                                BACKGR.SCROLLFAC[i],
                                                                                BACKGR.SCROLLFAC[i] *this.BASE_OBJ[4].BASE_SCALE * random(...this.BASE_OBJ[4].RANDOM_RANGE))
                                                                            );
                                break;
                            case  BACKGR.T_STR: 
                                    // console.log("running",this.BASE_OBJ[1].NAME, BACKGR.T_STR);
                                    BACKGR.ELEMENTS[i].push (makeTree (     this.BASE_OBJ[1].NAME,
                                                                            BACKGR.TREES_X[splice_[1]]*BACKGR.SCROLLFAC[i],
                                                                            BACKGR.TREES_Y[splice_[1]],
                                                                            BACKGR.SCROLLFAC[i],
                                                                            BACKGR.SCROLLFAC[i]  *this.BASE_OBJ[1].BASE_SCALE * random(...this.BASE_OBJ[1].RANDOM_RANGE))
                                                                        );
                                    break;  
                            case  BACKGR.T2_STR:
                                
                                BACKGR.ELEMENTS[i].push (makeTree_2 (   this.BASE_OBJ[2].NAME,
                                                                        BACKGR.TREES2_X[splice_[1]]*BACKGR.SCROLLFAC[i],
                                                                        BACKGR.TREES2_Y[splice_[1]],
                                                                        BACKGR.SCROLLFAC[i],
                                                                        BACKGR.SCROLLFAC[i]  *this.BASE_OBJ[2].BASE_SCALE * random(...this.BASE_OBJ[2].RANDOM_RANGE))
                                                                    );
                                break;    
                            case BACKGR.R_STR:
                                
                                BACKGR.ELEMENTS[i].push (makeRock   (       this.BASE_OBJ[5].NAME,
                                                                            BACKGR.ROCKS_X[splice_[1]]*BACKGR.SCROLLFAC[i],
                                                                            BACKGR.ROCKS_Y[splice_[1]],
                                                                            BACKGR.SCROLLFAC[i],
                                                                            BACKGR.SCROLLFAC[i] *this.BASE_OBJ[5].BASE_SCALE * random(...this.BASE_OBJ[5].RANDOM_RANGE))
                                                                    );
                                break;          
                            case BACKGR.H_STR:
                                
                                BACKGR.ELEMENTS[i].push (makeHouse   (  this.BASE_OBJ[0].NAME,
                                                                        BACKGR.HOUSES_X[splice_[1]]*BACKGR.SCROLLFAC[i],
                                                                        BACKGR.HOUSES_Y[splice_[1]],
                                                                        BACKGR.SCROLLFAC[i], 
                                                                        BACKGR.SCROLLFAC[i] *this.BASE_OBJ[0].BASE_SCALE * random(...this.BASE_OBJ[0].RANDOM_RANGE) )
                                                                        );
                                break;          
                            
                            
                            default:
                                console.log("Fail in switch statement in Levelcontroller BACKGR.type_pos_x")   
                        } 

                        
                    }
                }
            
            
                // reset type_pos_x for next round just in case
                BACKGR.type_pos_x = [];
        }

        // console.log(BACKGR.ELEMENTS); 

        function findArrayIndexOfMin (array)
            {
                let min = Infinity;
                let length_ = array.length;
                let array_index;
                while (length_--)
                {
                    if (array[length_] < min)
                    {
                        min = array[length_];
                        array_index = length_;
                    }
                }
                
                return array_index;
        }

        


        function randomMaker(start, stop, numba)
            {
                let array = [];
                for (i = 0; i < numba; i++)
                {
                    array.push( floor(random( start,stop )));
                }
                return array;
        }
        
        function findAll_Y(y_pos)
            {
                
                
                
                
                for (k = 0; k < BACKGR.DISTANT_TREES_Y.length ;k++)
                {
                    if (BACKGR.DISTANT_TREES_Y[k] == y_pos)
                    {
                        
                        BACKGR.type_pos_x.push(BACKGR.D_T_STR);
                        BACKGR.type_pos_x.push(k);
                        BACKGR.type_pos_x.push(BACKGR.DISTANT_TREES_X[k]);
                    }
                }
                for (k = 0; k < BACKGR.DISTANT_TREES2_Y.length ;k++)
                {
                    if (BACKGR.DISTANT_TREES2_Y[k] == y_pos)
                    {
                        
                        BACKGR.type_pos_x.push(BACKGR.D_T2_STR);
                        BACKGR.type_pos_x.push(k);
                        BACKGR.type_pos_x.push(BACKGR.DISTANT_TREES2_X[k]);
                    }
                }
                
                // console.log("BACKGR.TREES_Y",BACKGR.TREES_Y,"BACKGR.TREES_Y.length",BACKGR.TREES_Y.length)
                for (k = 0; k < BACKGR.TREES_Y.length ;k++)
                {
                    if (BACKGR.TREES_Y[k] == y_pos)
                    {
                        // console.log("Findall_Y.Trees");
                        BACKGR.type_pos_x.push(BACKGR.T_STR);
                        BACKGR.type_pos_x.push(k);
                        BACKGR.type_pos_x.push(BACKGR.TREES_X[k]); 
                    }
                    
                }
                
                for (k = 0; k < BACKGR.TREES2_Y.length ;k++)
                {
                    if (BACKGR.TREES2_Y[k] == y_pos)
                    {
                        // console.log("Findall_Y.Trees2");
                        BACKGR.type_pos_x.push(BACKGR.T2_STR);
                        BACKGR.type_pos_x.push(k);
                        BACKGR.type_pos_x.push(BACKGR.TREES2_X[k]);
                    }
                    
                }
                
                for (k = 0; k < BACKGR.ROCKS_Y.length ;k++)
                {
                    if (BACKGR.ROCKS_Y[k] == y_pos)
                    {
                        
                        BACKGR.type_pos_x.push(BACKGR.R_STR);
                        BACKGR.type_pos_x.push(k);
                        BACKGR.type_pos_x.push(BACKGR.ROCKS_X[k]);
                    }
                    
                }
                
                for (k = 0; k < BACKGR.HOUSES_Y.length ;k++)
                {
                    if (BACKGR.HOUSES_Y[k] == y_pos)
                    {
                        
                        BACKGR.type_pos_x.push(BACKGR.H_STR);
                        BACKGR.type_pos_x.push(k);
                        BACKGR.type_pos_x.push(BACKGR.HOUSES_X[k]);
                    }
                    
                }
                if (BACKGR.type_pos_x.length == 0)
                {
                    
                    return false;
                } else
                {
                    
                    return true;
                }
        }
        function changeIndex (i)
        {
            if (i < BACKGR.BASE_OBJ[0].NUMBER)
            {
                return 0;
            } else if(i <   BACKGR.BASE_OBJ[0].NUMBER+
                            BACKGR.BASE_OBJ[1].NUMBER)
            {
                return 1;
            }else if (i <   BACKGR.BASE_OBJ[0].NUMBER +
                            BACKGR.BASE_OBJ[1].NUMBER +
                            BACKGR.BASE_OBJ[2].NUMBER)
            {
                return 2;
            }else if (i <   BACKGR.BASE_OBJ[0].NUMBER +
                            BACKGR.BASE_OBJ[1].NUMBER +
                            BACKGR.BASE_OBJ[2].NUMBER +
                            BACKGR.BASE_OBJ[3].NUMBER)
            {
                return 3;
            }else if (i <   BACKGR.BASE_OBJ[0].NUMBER +
                            BACKGR.BASE_OBJ[1].NUMBER +
                            BACKGR.BASE_OBJ[2].NUMBER +
                            BACKGR.BASE_OBJ[3].NUMBER +
                            BACKGR.BASE_OBJ[4].NUMBER)
            {
                return 4;
            }else
            {
                return 5;
            }
        }


    },     
            
    
    
    
    
}



// DISTANT BACKGROUND ELEMENTS LIKE MONTAINS COUDS AND HILLS
const DIST_BACKG_EL    =
{
    
    CLOUDS_X : [485, 857, 154, -451, -964, 53, 145, 554, 572, -508],
    CLOUDS_Y :  [184, 172, 192, 190, 84, 155, 51, 89, 197, 140],
    CLOUDS_SIZE_X :  [0.8856354831121305, 1.1948500883592952, 0.6529386029982691, 0.8058168833605703, 0.5156789607629664, 0.8182326772421581, 0.6258878248716929, 1.018051964743154, 0.5834188447306594, 0.9733736563667519],
    CLOUDS_SIZE_Y :  [0.40545001916699563, 0.41881362873914596, 0.40558260919361466, 0.4004779129918504, 0.4943816184499627, 0.44764080687041524, 0.40547603994719866, 0.47501976154707004, 0.4077174886031407, 0.40054529694179775],
    CLOUDS_SCROLL : [ ],
    

    HILLS_X : [500,1300],
    HILLS_Y : [450,460],
    HILLS_SCROLL : [0.075,0.1],
    HILLS_SIZE_X : [1,1.4],
    
    MOUNTAIN_X : 500 ,
    MOUNTAIN_Y : 440 ,
    MOUNTAIN_SCROLL : 0.01,
    MOUNTAIN_SIZE_X : 1.4,
    
    setup: function(){
        // making the scrollfactor for different size of clouds
        for (i = 0; i < this.CLOUDS_X.length;i++)
        {
            this.CLOUDS_SCROLL.push (  this.CLOUDS_SIZE_X[i] *
                                                this.CLOUDS_SIZE_Y[i] *
                                                this.CLOUDS_Y[i] /
                                                GAME_PROPS.HEIGHT * 0.5);
        }
        // Making the arrays of different elements into cloud objects for later drawing
        this.CLOUDS = [];
        for (i = 0 ; i < 10; i++)
        {
            this.CLOUDS.push (
                {
                    X : this.CLOUDS_X[i] ,
                    Y : this.CLOUDS_Y[i] ,
                    SCROLL : this.CLOUDS_SCROLL[i],
                    SIZE_X : this.CLOUDS_SIZE_X[i], 
                    SIZE_Y : this.CLOUDS_SIZE_Y[i],
                })
        }
        //making the space from the arrays availbale again.    
        this.CLOUDS_X =  [];
        this.CLOUDS_Y = [];
        this.CLOUDS_SCROLL = [];
        this.CLOUDS_SIZE_X = [];
        this.CLOUDS_SIZE_Y = []; 
    },


    
    
}

