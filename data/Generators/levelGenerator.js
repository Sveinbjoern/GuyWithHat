/*

levelGenerator contains three objects:
GAME_PROPS- basic level constants, and functions to creatable math arrays and screenshots 
BACKGR - Generates the advanced background that exist in drawBackGroundElements.js and canyonlines
DIST_BACKG_EL - Generates the items from drawDistantBackgroundElements.js


*/


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
        
       
        if (!obj.slowStart) 
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
            NUMBER: 5, 
            LEFT: -54,
            RIGHT: 39,
            BASE_SCALE: 3.5,
            DEPTH: [60,200],
            BASE: [-54*4,35*4],
            
            RANDOM_RANGE: [1,1],
            Y_RANGE: [330, 380],
            DISTRIBUTION: [0,2000], 
            NAME: "HOUSES",
        },
        {
            NUMBER: 8,  
            LEFT: -60, 
            RIGHT: 79, 
            BASE_SCALE: 1,
            DEPTH: [5,10],
            BASE: [-25*2,25*2],
           
            RANDOM_RANGE: [0.8,1],
            Y_RANGE: [315, 470],
            DISTRIBUTION: [0, 672],
            NAME: "TREES",
        }, 
        {
            NUMBER: 8,
            LEFT: -52,
            RIGHT: 59,
            BASE_SCALE: 1,
            DEPTH: [15,15],
            BASE: [-25*2,25*2],
            
            RANDOM_RANGE: [0.7,1],
            Y_RANGE: [315, 470],
            DISTRIBUTION: [0, 672],
            NAME: "TREES2",
        },
        {
            NUMBER: 8,
            LEFT: -14,
            RIGHT: 11,
            BASE_SCALE: 2.8,
            DEPTH: [10,10],
            BASE: [-4*10.8,5*10.8],
            
            RANDOM_RANGE: [0.7,1],
            Y_RANGE: [315, 400],
            DISTRIBUTION: [0, 672],
            NAME: "DISTANT_TREES",
        },
        {
            NUMBER: 8,
            LEFT: -21,
            RIGHT: 9,
            BASE_SCALE: 1.35,
            DEPTH: [5,5],
            BASE: [-8*1.35,8*1.35],
           
            RANDOM_RANGE: [0.7,1.3],
            Y_RANGE: [315, 400],
            DISTRIBUTION: [0, 672],
            NAME: "DISTANT_TREES2",
        },
        { 
            NUMBER: 8,
            LEFT: -5,
            RIGHT: 7,
            BASE_SCALE: 1,
            DEPTH: [5,5],
            BASE: [-5*10,5*10],
           
            RANDOM_RANGE: [0.7,1],
            Y_RANGE: [430, 464],
            DISTRIBUTION: [0, 672], 
            NAME: "ROCKS",
        }
    ], 

    DISTANT_TREES_X: [],
    DISTANT_TREES2_X: [],
    TREES_X: [], 
    TREES2_X: [], 
    ROCKS_X: [], 
    HOUSES_X: [],

    DISTANT_TREES_Y: [], 
    DISTANT_TREES2_Y: [],
    TREES_Y: [],
    TREES2_Y: [],
    ROCKS_Y: [],
    HOUSES_Y: [],

    SCROLLFAC: [],
    SCROLLFAC_315:  0.1,
    SCROLLFAC_484:  1,
    SPACE: [],
    SCROLL_CHANGE_FAC: 5.325/1000,
    TEST_BOX: [],

    MAP: [],
    TOTAL_NUMBER: 0,
    ADDITIONAL_MAP_DIST: 80,
    DIFFERENCE_IN_MAP: [],
    

    CANYONLINES: [],
    SETUP_CANYONLINES_AND_BACKGR_MAP: function() 
    { 
        this.CANYONLINES[0] = [];
        
        for (let i = 0, j = 0; i < INTER_EL.CANYONS.length; )
        {

            if (i >= INTER_EL.CANYONS.length-1)
            {
                j = INTER_EL.CANYONS.length-1;
                break;    
            }
            j = i;
            while (INTER_EL.CANYONS[j].RIGHT >= INTER_EL.CANYONS[j+1].LEFT)
            { 
                
                j++;
                if (j+1 >= INTER_EL.CANYONS.length) 
                {
                    j = INTER_EL.CANYONS.length-1;
                    break;
                }

            } 
            
            this.CANYONLINES[0].push ( [INTER_EL.CANYONS[i].LEFT-1, INTER_EL.CANYONS[j].RIGHT+1 ]);
            i = ++j;

        }

        let currentLine = 1;
        let direction = [];
        let contraction = [];
        
        for (i = 0 ; i < this.CANYONLINES[0].length; i++)
        {
            direction.push(random(-5,5));
            contraction.push(random(-5,5));
        }
        
        while (currentLine < this.NUMBER_Y_CANYON)
        {
            
            let array = [];
            this.CANYONLINES[currentLine] = [];
            for (let i = 0; i < this.CANYONLINES[0].length; i++)
            {
                direction[i] = direction[i] += random (-3,3);
                contraction[i] = contraction[i] += random (-3,3);
                

                let x1 =    (this.CANYONLINES[0][i][0]+direction[i]) - (currentLine-1)  *BACKGR.SCROLL_CHANGE_FAC  *(this.CANYONLINES[0][i][0] -GAME_PROPS.SCREEN_MIDDLE_X ) +0.4*currentLine; 
                let x2 =    ((this.CANYONLINES[0][i][1] +contraction[i])- (currentLine-1)  *BACKGR.SCROLL_CHANGE_FAC  *(this.CANYONLINES[0][i][1] -GAME_PROPS.SCREEN_MIDDLE_X ) -0.4*currentLine) - x1 ;

                if (x2 < 0)
                { 
                    array.push ([]);
                } else
                {
                    array.push([round(x1), round(x2)]);
                }
            } 

            this.CANYONLINES[currentLine].push (...array)

            currentLine++;
        } 
        for (let i =0; i < this.CANYONLINES[0].length; i++)
        {
            this.CANYONLINES[0][i][1] = this.CANYONLINES[0][i][1] - this.CANYONLINES[0][i][0];
        }

        
        for (let i =0; i < this.CANYONLINES.length; i++)
        { 
            if (this.CANYONLINES[i].length != 0) 
            {
                for (let j = 0; j < this.CANYONLINES[i].length; j++ )
                {
                    for (k = this.CANYONLINES[i][j][0]   ; k <=  this.CANYONLINES[i][j][0] + this.CANYONLINES[i][j][1] ; k++)
                    {

                        BACKGR.MAP[BACKGR.NUMBER_Y_CANYON -i-1][k + BACKGR.DIFFERENCE_IN_MAP[BACKGR.NUMBER_Y_CANYON -1 - i] ] =
                                    {
                                        object: "CANYON", 
                                        filled: true, 
                                        
                                            
                                    } 
                                    
                        if (j == 0 )
                        {
                            for (let k = 0; k < BACKGR.DIFFERENCE_IN_MAP[BACKGR.NUMBER_Y_CANYON -i-1]/2; k++  )
                            {
                                BACKGR.MAP[BACKGR.NUMBER_Y_CANYON -i-1][k + BACKGR.DIFFERENCE_IN_MAP[BACKGR.NUMBER_Y_CANYON -i-1] -k] =
                                    {
                                        object: "CANYON",
                                        filled: true, 
                                        
                                            
                                    } 
                            }
                        }
                        if (j == this.CANYONLINES[i].length-1)
                        {
                            for (let k = 0; k < BACKGR.DIFFERENCE_IN_MAP[BACKGR.NUMBER_Y_CANYON -i-1]/2; k++  )
                            {
                                BACKGR.MAP[BACKGR.NUMBER_Y_CANYON -i-1][k + BACKGR.DIFFERENCE_IN_MAP[BACKGR.NUMBER_Y_CANYON -i-1] +k] =
                                { 
                                    object: "CANYON",
                                    filled: true, 
                                     
                                }   
                            }
                        }
                    }
                } 
            } 
        }


        for (let i = 0; i < this.TOTAL_NUMBER; i++ )
        {
            let foundSpace = false;
            let index = changeIndex(i);
            let xAtFac1;
            let yRange;
            let xRange;
            
            
            for (let k = 0; k < 100; k++)
            {   
                let x;
                let y = floor(random(...this.BASE_OBJ[index].Y_RANGE));
                if (index == 0)
                { 
                   
                    x = floor (random(BACKGR.BASE_OBJ[index].DISTRIBUTION[0], BACKGR.BASE_OBJ[index].DISTRIBUTION[1] - 
                            (y -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *(BACKGR.BASE_OBJ[index].DISTRIBUTION[1] -GAME_PROPS.SCREEN_MIDDLE_X)))
                        
                } else
                {
                    x = floor(random( 0, this.SPACE[y-BACKGR.START_Y] + this.DIFFERENCE_IN_MAP[y-BACKGR.START_Y] *2  ));
                } 

                for (let j = 0; j < 100; j++)
                {
                    if (testSpace(y,x))
                    {
                        foundSpace = true;
                        break;
                    } else    
                    {
                        if (index == 0)
                        {
                            x = floor (random(BACKGR.BASE_OBJ[index].DISTRIBUTION[0], BACKGR.BASE_OBJ[index].DISTRIBUTION[1] - 
                                (y -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *(BACKGR.BASE_OBJ[index].DISTRIBUTION[1] -GAME_PROPS.SCREEN_MIDDLE_X)))
                                                
                        } else
                        {
                            x = floor(random( 0, this.SPACE[y-BACKGR.START_Y] + this.DIFFERENCE_IN_MAP[y-BACKGR.START_Y] *2  ));
                        }
                    }
                } 
                if (foundSpace)
                { 

                    fillSpace(y,x);
                    break;
                } 


                function testSpace(y,x)
                {
                    yRange = [  round(y - BACKGR.BASE_OBJ[index].DEPTH[1]*BACKGR.SCROLLFAC[y-BACKGR.START_Y]), 
                                round(y + BACKGR.BASE_OBJ[index].DEPTH[0]*BACKGR.SCROLLFAC[y-BACKGR.START_Y])];

                    xAtFac1 =(x + (y -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC*GAME_PROPS.SCREEN_MIDDLE_X) / 
                                               (1-(y -BACKGR.START_Y)*BACKGR.SCROLL_CHANGE_FAC);
                    
                    xRange = [  ( xAtFac1  + BACKGR.BASE_OBJ[index].BASE[0]),
                                ( xAtFac1  + BACKGR.BASE_OBJ[index].BASE[1])]
                    
                    
                    yRange[0] = max( BACKGR.START_Y, yRange[0] );
                    yRange[1] = min( BACKGR.STOP_Y_CANYON, yRange[1] );
                    xRange[0] = max(0 ,xRange[0] );
                    xRange[1] = min(BACKGR.MAP[y-BACKGR.START_Y].length-1,xRange[1] );
                          
                    for (let i = yRange[0]; i <= yRange[1]; i++ )
                    {
                       
                        let adjustedXRange = []; 
                        
                        
                        adjustedXRange[0] = round(xRange[0] - (i -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                                        (xRange[0]-GAME_PROPS.SCREEN_MIDDLE_X));
                        adjustedXRange[1] = round(xRange[1] - (i -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                                        (xRange[1]-GAME_PROPS.SCREEN_MIDDLE_X)); 
                        
                    
                         
                        for (let j = adjustedXRange[0]; j <= adjustedXRange[1]; j++ )
                        {
                            if (BACKGR.MAP[i-BACKGR.START_Y][j + BACKGR.DIFFERENCE_IN_MAP[i-BACKGR.START_Y] ]) 
                            { 
                                if (BACKGR.MAP[i-BACKGR.START_Y][j + BACKGR.DIFFERENCE_IN_MAP[i-BACKGR.START_Y] ].filled)
                                {return false;}
                            } 
                        }
                        
                    }

                    
                    return true;
                    
                }

                


                function fillSpace(y,x)
                {
                                
                    for (let i = yRange[0]; i <= yRange[1]; i++ )
                    {
                        
                        let adjustedXRange = []; 
                        
                        
                        adjustedXRange[0] = round(xRange[0] - (i -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                                        (xRange[0]-GAME_PROPS.SCREEN_MIDDLE_X));
                        adjustedXRange[1] = round(xRange[1] - (i -BACKGR.START_Y) * BACKGR.SCROLL_CHANGE_FAC *
                                        (xRange[1]-GAME_PROPS.SCREEN_MIDDLE_X)); 


                        for (let j = adjustedXRange[0]; j <= adjustedXRange[1]; j++ )
                        {

                            BACKGR.MAP[i-BACKGR.START_Y][j + BACKGR.DIFFERENCE_IN_MAP[i-BACKGR.START_Y] ] =
                            {
                                object: "NONE",
                                filled: true, 
                            } 
                        }
                    }
                   
                    BACKGR.MAP[y-BACKGR.START_Y][x + BACKGR.DIFFERENCE_IN_MAP[y-BACKGR.START_Y]] =
                    {
                        object: BACKGR.BASE_OBJ[index].NAME,
                        filled: true,
                        height: BACKGR.BASE_OBJ[0].HEIGHT,
                    }  
                }
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
                            BACKGR.HOUSES_X.push( j - BACKGR.DIFFERENCE_IN_MAP[i]);
                            break;
                        case BACKGR.BASE_OBJ[1].NAME:
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
                while (BACKGR.type_pos_x.length != 0)
                {
                //     // // ELEMENTS ADDED TO BACKGR.ELEMENTS[] SORTED BY XPOSITION FOR LATER OPTIMIZATION
                    
                    let splice_ = BACKGR.type_pos_x.splice(findArrayIndexOfMin (array), 3 ) 
        
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
                           
                            BACKGR.ELEMENTS[i].push (makeDistantTree2   (   this.BASE_OBJ[4].NAME,
                                                                            BACKGR.DISTANT_TREES2_X[splice_[1]]*BACKGR.SCROLLFAC[i],
                                                                            BACKGR.DISTANT_TREES2_Y[splice_[1]],
                                                                            BACKGR.SCROLLFAC[i],
                                                                            BACKGR.SCROLLFAC[i] *this.BASE_OBJ[4].BASE_SCALE * random(...this.BASE_OBJ[4].RANDOM_RANGE))
                                                                        );
                            break;
                        case  BACKGR.T_STR: 
                                
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
            BACKGR.type_pos_x = [];
        }

    

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
                
                for (k = 0; k < BACKGR.TREES_Y.length ;k++)
                {
                    if (BACKGR.TREES_Y[k] == y_pos)
                    {
                        BACKGR.type_pos_x.push(BACKGR.T_STR);
                        BACKGR.type_pos_x.push(k);
                        BACKGR.type_pos_x.push(BACKGR.TREES_X[k]); 
                    }
                    
                }
                
                for (k = 0; k < BACKGR.TREES2_Y.length ;k++)
                {
                    if (BACKGR.TREES2_Y[k] == y_pos)
                    {
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

    SETUP: function(){

        // LERP THE SCROLLFAC the factor that scroll needs to be multiplied with for correct parallax motion
        for (i = 0; i < BACKGR.NUMBER_Y_CANYON  ; i ++) 
        {
            BACKGR.SCROLLFAC.push(   round (lerp(BACKGR.SCROLLFAC_315, BACKGR.SCROLLFAC_484 , i/(BACKGR.NUMBER_Y_CANYON -1) ),4 ) );
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
        
        for (let i = 1; i < this.BASE_OBJ.length;i++)
        {
            this.BASE_OBJ[i].DISTRIBUTION = [GAME_PROPS.LEVEL_LIMITS_X[0],GAME_PROPS.LEVEL_LIMITS_X[1]]
        }
        
        this.TOTAL_NUMBER = this.BASE_OBJ[0].NUMBER +
                            this.BASE_OBJ[1].NUMBER +
                            this.BASE_OBJ[2].NUMBER +
                            this.BASE_OBJ[3].NUMBER +
                            this.BASE_OBJ[4].NUMBER +
                            this.BASE_OBJ[5].NUMBER;

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
        //making the memory from the arrays availbale again.    
        this.CLOUDS_X =  [];
        this.CLOUDS_Y = [];
        this.CLOUDS_SCROLL = [];
        this.CLOUDS_SIZE_X = [];
        this.CLOUDS_SIZE_Y = []; 
    },  
}

