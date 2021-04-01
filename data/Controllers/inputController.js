////////////////////////////////////////////////////////////////////////////////////////////
// VARIABLES AND OBJECTS 
const CONTROLS = 
{
    SPACEBAR_KEY: 32,
    UP_ARROW_KEY: 38,
    LEFT_ARROW_KEY: 37,
    RIGHT_ARROW_KEY: 39,
    DOWN_ARROW_KEY: 40,
    RETURN_KEY: 13,
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68,
    KEY_F: 70,
    KEY_L: 76,
    KEY_M: 77,
    KEY_N: 78,
    KEY_P: 80,
    KEY_S: 83,
    KEY_Z: 90,
     

    jumpKeyRelease: function ()
    {
        gameChar.jumpCounter = max( gameChar.jumpCounter , GAME_CHAR.JUMP_MAX)
        if (gameChar.isStanding) {gameChar.speedY = gameChar.jumpCounter;
                        gameChar.isStanding = false;}
        gameChar.jumpCounter = GAME_CHAR.JUMP_MIN;
        gameChar.jumpCompCounter = 0;
        charLogics.keyPressed.jump = false;
    
    },

    movementController: function ()
    {
        if (keyCode == CONTROLS.UP_ARROW_KEY) {charLogics.keyPressed.jump = true;} 
        if (keyCode == CONTROLS.DOWN_ARROW_KEY) {} // TO BE DONE
        if (keyCode == CONTROLS.LEFT_ARROW_KEY) 
            { 
                charLogics.keyPressed.leftArr = true;
                
            }
        if (keyCode == CONTROLS.RIGHT_ARROW_KEY) 
            {
                charLogics.keyPressed.rightArr = true;
            } 

        if (keyCode == CONTROLS.SPACEBAR_KEY ) { charLogics.keyPressed.space = true;} 

    },





    /////////FOR DRAWSOFT INPUTS ONLY
    mouseDraggedDrawFunc: function ()
    {

        

        
            if (!drawSoft.colorChooserOn)
            {
                let A,B; //values for calculating distance pytagoras

                A = drawSoft.mousepointRecent[0] - mouseX;
                B = drawSoft.mousepointRecent[1] - mouseY;
                let C; // Distance from last point
                C = round(sqrt(A*A + B*B));
                if (C >= drawSoft.mouseDistNextPoint) 
                { 
                    drawSoft.vertexArray[drawSoft.currentVertexArray][drawSoft.arrayIndex[drawSoft.currentVertexArray]] = 
                                                    [round(mouseX), round(mouseY)];
                    drawSoft.arrayIndex[drawSoft.currentVertexArray] ++;
                    drawSoft.mousepointRecent = [mouseX, mouseY];
                }
            } else 
            {
                
                    
                    drawSoft.currentColorChooser.mousePressed(mouseX,mouseY);
            
                
                
            }
            
    
    
    },



    keyPressedForDrawSoft: function ()
    {

        
        //    A removes all elements of a figure
        if (keyCode == CONTROLS.KEY_A) 
        {
            drawSoft.vertexArray[drawSoft.currentVertexArray] = [];
            drawSoft.arrayIndex[drawSoft.currentVertexArray] = 0;
            
        } 
        else if   //    Space takes away one point
        (keyCode == CONTROLS.SPACEBAR_KEY) 
        {
            drawSoft.vertexArray[drawSoft.currentVertexArray].pop();
            if (drawSoft.arrayIndex[drawSoft.currentVertexArray] > 0){drawSoft.arrayIndex[drawSoft.currentVertexArray] --; };
        }
        else if//    S changes stokeweight between 1, 2, 3 
        (keyCode == CONTROLS.KEY_S) {
                if (drawSoft.strokeWeightArray[drawSoft.currentVertexArray] > 3) 
                {drawSoft.strokeWeightArray[drawSoft.currentVertexArray] = 1 } 
            else {drawSoft.strokeWeightArray[drawSoft.currentVertexArray]++ ;}
                        } 
        

        else if (keyCode == CONTROLS.KEY_D) { drawSoft.drawPointZero = [mouseX,mouseY];}
    
        //    L makes the shape make a complete loop
        
        else if (keyCode == CONTROLS.KEY_L) { drawSoft.returnsToStart[drawSoft.currentVertexArray] = 
                                    !drawSoft.returnsToStart[drawSoft.currentVertexArray];}
            
        
        //    F changes if the models are filled
        
        else if (keyCode == CONTROLS.KEY_F) { drawSoft.bFill[drawSoft.currentVertexArray] = !drawSoft.bFill[drawSoft.currentVertexArray] ;}
        
        //    P prints out to the console the entire 5 part figure with stokewight and code to copy
        //       console.log("vertex(" ,drawSoft.vertexArray[0][0] , ", " , drawSoft.vertexArray[0][1] , ");")
        else if (keyCode == CONTROLS.KEY_P) 
        { 
            

            // drawSoft.fullPrintout();
            console.log("Full printout:");
            
            let i,j;
            
            for (i = 0 ; i <  5; i++) 
            {
                if (drawSoft.vertexArray[i].length > 0 )
                {
                console.log("translate(", drawSoft.drawPointZero[0], "," , drawSoft.drawPointZero[1], ");" )
                console.log("strokeWeight(", drawSoft.strokeWeightArray[i], ");"); 
                if (drawSoft.bFill[i]) {console.log( "fill( drawSoft.colorWheelFull[ " , drawSoft.colorArrayi[i] , " ][ " ,
                                                                drawSoft.colorArrayj[i] , " ]);"
                                    );
                        } else {console.log("noFill();")}
                console.log("beginShape(" + drawSoft.vertexModes[drawSoft.vertexModeChoice[i]] + ");")  
                    for (j =0 ; j < drawSoft.vertexArray[i].length; j++ )
                    {createLogVertex(drawSoft.vertexArray[i][j]) } 
                if (drawSoft.returnsToStart[i]) {console.log("endShape(CLOSE);")} else
                                        {console.log("endShape();");}
                }
            }
            //  MAKES A LOG OUTPUT FOR COPYING AND USING IN NEW CODE
            


        }

        
        else if (keyCode == CONTROLS.KEY_M) 
        { 
            
            drawSoft.vertexModeChoice[drawSoft.currentVertexArray] ++;
            if (drawSoft.vertexModeChoice[drawSoft.currentVertexArray] > 8) {drawSoft.vertexModeChoice[drawSoft.currentVertexArray] = 0;}
            

            
                console.log("Vertex mode for array " + 
                            drawSoft.vertexModeChoice[drawSoft.currentVertexArray] + 
                            " is " + 
                            drawSoft.vertexModes[drawSoft.vertexModeChoice[drawSoft.currentVertexArray]]);    
        }
            
        
                        
                        
        else if (keyCode == CONTROLS.KEY_C) 
        { 
            
            drawSoft.colorChooserOn = !drawSoft.colorChooserOn;
            if (drawSoft.colorChooserOn) {
                let x = mouseX;
                let y = mouseY;
                if (x < drawSoft.COLOR_CHOOSER.EDGEDIST_X) 
                    {x = drawSoft.COLOR_CHOOSER.EDGEDIST_X;}
                else if (x + drawSoft.COLOR_CHOOSER.SIZE_END_X > width) 
                    {x = width - drawSoft.COLOR_CHOOSER.SIZE_END_X}  
                if (y < drawSoft.COLOR_CHOOSER.EDGEDIST_Y) 
                {y = drawSoft.COLOR_CHOOSER.EDGEDIST_Y}
                else if (y + drawSoft.COLOR_CHOOSER.SIZE_END_Y > height) 
                {y = height - drawSoft.COLOR_CHOOSER.SIZE_END_Y}
                
                drawSoft.currentColorChooser = colorChooser ( x, y);
                drawSoft.currentColorChooser.xSizeEnd =  x + drawSoft.COLOR_CHOOSER.SIZE_END_X;
                drawSoft.currentColorChooser.ySizeEnd =  y + drawSoft.COLOR_CHOOSER.SIZE_END_Y;
                
                drawSoft.currentColorChooser.colorWheelStartX = x + drawSoft.COLOR_CHOOSER.WHEEL_EDGE_DIST_X;
                drawSoft.currentColorChooser.colorWheelStartY = y + drawSoft.COLOR_CHOOSER.WHEEL_EDGE_DIST_Y;
                drawSoft.currentColorChooser.colorWheelZeroX = x + 5;
                drawSoft.currentColorChooser.colorWheelZeroY = y + 5;
                drawSoft.currentColorChooser.colorWheelEndX = drawSoft.currentColorChooser.colorWheelStartX + drawSoft.COLOR_CHOOSER.COLOR_RANGE;
                drawSoft.currentColorChooser.colorWheelEndY = drawSoft.currentColorChooser.colorWheelStartY + drawSoft.COLOR_CHOOSER.COLOR_RANGE;
                
            } 
        }


        //    Keyys 1,2,3,4,5 changes the drawSoft.currentVertexArray and what you are drawing
        else if (key == "1") { drawSoft.currentVertexArray = 0; console.log("You are working on figure: " + key) ;}
        else if (key == "2") { drawSoft.currentVertexArray = 1; console.log("You are working on figure: " + key) ;}
        else if (key == "3") { drawSoft.currentVertexArray = 2; console.log("You are working on figure: " + key) ;}
        else if (key == "4") { drawSoft.currentVertexArray = 3; console.log("You are working on figure: " + key) ;}
        else if (key == "5") { drawSoft.currentVertexArray = 4; console.log("You are working on figure: " + key) ;}
        else if (key == "6") { drawSoft.currentVertexArray = 5; console.log("You are working on figure: " + key) ;}
        else if (key == "7") { drawSoft.currentVertexArray = 6; console.log("You are working on figure: " + key) ;}
        else if (key == "8") { drawSoft.currentVertexArray = 7; console.log("You are working on figure: " + key) ;}
        else if (key == "9") { drawSoft.currentVertexArray = 8; console.log("You are working on figure: " + key) ;}
        else if (key == "0") { drawSoft.currentVertexArray = 9; console.log("You are working on figure: " + "10") ;}
        else if (keyCode == 81) { drawSoft.currentVertexArray = 10; console.log("You are working on figure: " + "11") ;}
        else if (keyCode == 87) { drawSoft.currentVertexArray = 11; console.log("You are working on figure: " + "12") ;}
        else if (keyCode == 69) { drawSoft.currentVertexArray = 12; console.log("You are working on figure: " + "13") ;}
        else if (keyCode == 82) { drawSoft.currentVertexArray = 13; console.log("You are working on figure: " + "14") ;}
        else if (keyCode == 84) { drawSoft.currentVertexArray = 14; console.log("You are working on figure: " + "15") ;}
        else if (keyCode == 89) { drawSoft.currentVertexArray = 15; console.log("You are working on figure: " + "16") ;}
        else if (keyCode == 85) { drawSoft.currentVertexArray = 16; console.log("You are working on figure: " + "17") ;}
        else if (keyCode == 73) { drawSoft.currentVertexArray = 17; console.log("You are working on figure: " + "18") ;}
        else if (keyCode == 79) { drawSoft.currentVertexArray = 18; console.log("You are working on figure: " + "19") ;}
        
        //    if (keyCode == CONTROLS.UP_ARROW_KEY) 
        // { if (drawSoft.currentColorsIndex[drawSoft.currentVertexArray]  )
        //  drawSoft.currentColors[drawSoft.currentVertexArray] = 
        //                                              drawSoft.colorWheelFull[ ]} 
        //    else if (keyCode == CONTROLS.DOWN_ARROW_KEY) { drawSoft.currentColors[drawSoft.currentVertexArray] = 
        //                                                     drawSoft.colorWheelFull[min(57 599, )]} 
        //    else if (keyCode == CONTROLS.RIGHT_ARROW_KEY) { drawSoft.currentColors[drawSoft.currentVertexArray] = 
        //     drawSoft.colorWheelFull[min(57 599, )]} 
        //    else if (keyCode == CONTROLS.LEFT_ARROW_KEY) { drawSoft.currentColors[drawSoft.currentVertexArray] = 
        //     drawSoft.colorWheelFull[min(57 599, )]} 
        
        function createLogVertex(item) 
            {
    
                console.log(    "vertex(" , 
                        item[0] - drawSoft.drawPointZero[0],
                        ", ",
                        item[1] - drawSoft.drawPointZero[1 ],  
                        ");");
                       
             }

    },

};
  
//KEYS
function keyPressed()
{
    
    if (gameChar.gameOver || gameChar.hasWon)
    {
        if (keyCode == CONTROLS.KEY_N) {charLogics.resetGame()};
    }
    
        if (keyCode == CONTROLS.RETURN_KEY)
        {
            drawSoft.drawModeOn = !drawSoft.drawModeOn;
            
        }
        
        
        if (drawSoft.drawModeOn)
        {
            
            //KEY PRESSED CODE FROM inputController.js 
            CONTROLS.keyPressedForDrawSoft();
            
        } else 
        {
            if (keyCode == CONTROLS.KEY_Z) {GAME_PROPS.makeScreenshot();} 

            if (keyCode == CONTROLS.KEY_B) {charLogics.DEBUG_move();}
            
            //        MOVEMENTCONTROLLER FROM characterController.js
            CONTROLS.movementController();
            
            
        }
       
}
function keyReleased() 
{

    if (drawSoft.drawModeOn) 
     {
         
         
    
           
         
    } else
    {
    
    
        if (keyCode == CONTROLS.UP_ARROW_KEY) 
            {
         
                CONTROLS.jumpKeyRelease();
         
            }  
        if  (keyCode == CONTROLS.LEFT_ARROW_KEY) 
            {
         
                charLogics.keyPressed.leftArr = false;
         
            } 
        if (keyCode == CONTROLS.RIGHT_ARROW_KEY) 
            {
         
                charLogics.keyPressed.rightArr = false;
         
            } 
        if (keyCode == CONTROLS.SPACEBAR_KEY)
            {
                gameChar.throwHammer();
                charLogics.keyPressed.space = false;
                gameChar.hammerChargeRotation = 0;
                gameChar.hammerChargeCounter = 0;
            }
    
    
    
    
    } 
    
    
    // P5.js WEBPPAGE RECOMMENDs RETURNING FALSE TO AVOID DEFAULT BEHAVIOUR.
    return false;

}





function mouseDragged()
{
    
    if (drawSoft.drawModeOn) {CONTROLS.mouseDraggedDrawFunc();}

 // P5.js WEBPPAGE RECOMMENDS RETURNING FALSE TO AVOID DEFAULT BEHAVIOUR   
    return false;
}






function mouseWheel(event) 
{
  if (drawSoft.drawModeOn)
    {
    drawSoft.mouseDistNextPoint = constrain(drawSoft.mouseDistNextPoint -= (event.delta)/100, 5,30)
    console.log("You have a mouseDraged draw of " + drawSoft.mouseDistNextPoint);
    }
    //  
    return false;
}




// Mouse pressed in drawSoft creates a vertes for drawing in vertex mode 1-5 or 
// makes a point in pointdraw mode 6
function mousePressed() {
    if (drawSoft.drawModeOn)
    {

       if (drawSoft.colorChooserOn) 
       {
            
           drawSoft.currentColorChooser.mousePressed(mouseX, mouseY);
       } else 
       {
       
       
               drawSoft.vertexArray[drawSoft.currentVertexArray][drawSoft.arrayIndex[drawSoft.currentVertexArray]] = 
               [round(mouseX), round(mouseY)];
                drawSoft.arrayIndex[drawSoft.currentVertexArray] ++;
                drawSoft.mousepointRecent = [mouseX, mouseY];
          
           
       }
           
    }
       
       
}