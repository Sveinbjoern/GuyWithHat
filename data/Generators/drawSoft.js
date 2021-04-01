/*

To be implemented:

Transfering global variables into objects
Make a sleection of favorite colors and recent colors
Give you the abillity to change colors with the arrowkeys(When in drawmode)




DRAW SOFTWARE FOR: THE TOWN

For use see KeyMap.txt

version 0.01 01.12.2020 
Drawing modes 1 - 5

Vertex drawing 1 - 5
remove and clear  vertexarray functionality
Color Wheel (needs debug) 






pervious versions:

Vertex drawing Single figure
print to console
Debug colorwheel

*/



// DRAWSOFT VARIABLES   
let drawSoft =
{
    vertexArray: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
    arrayIndex: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    returnsToStart: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    strokeWeightArray: [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    currentVertexArray: 0,
    bFill: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true], 
    vertexModeChoice: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    vertexModes: ["", "LINES","POINTS","TRIANGLES","TRIANGLE_STRIP",
                        "TRIANGLE_FAN","QUADS","QUAD_STRIP","TESS"], 
    colorArrayi: [240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240],
    colorArrayj: [119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119],
    mousepointRecent: [],
    mouseDistNextPoint: 10,

    drawPointZero : [], 
    drawModeOn : false,  
    pointsArray : [],
  

    colorChooserOn: false,
    currentColorChooser : {}, 
    newColor : [240,100],  
    colorWheelFull: [], 
    currentColors: [],





    COLOR_CHOOSER:
    {
        EDGEDIST_X: 10,
        EDGEDIST_Y: 10,
        SIZE_X : 400,
        SIZE_Y : 250,

        WHEEL_EDGE_DIST_X: 5,
        WHEEL_EDGE_DIST_Y: 5,
        COLOR_RANGE: 240,

    },
    SETUP_COLOR_CHOOSER: function ()
    {
        this.COLOR_CHOOSER.SIZE_END_X = this.COLOR_CHOOSER.EDGEDIST_X + this.COLOR_CHOOSER.SIZE_X;
        this.COLOR_CHOOSER.SIZE_END_Y = this.COLOR_CHOOSER.EDGEDIST_Y + this.COLOR_CHOOSER.SIZE_Y;
    },


    


}





// FOR drawSoft POINT DRAWING. THIS ARRAY OF NULL HAS THE SIZE OF THE PIXELS OF THE CANVAS SO YOU CAN DRAW ANYWHERE ON THE SCREEN
function pointsArraySetup() 
{   

for (i = 0 ;i < width; i++ ) {
    drawSoft.pointsArray[i] = []
    for (j = 0;j < height;j++){
    drawSoft.pointsArray[i][j] = null; 
    
    }
} 

}
//MAKES THE VERTICIES FOR VERTEX DRAWING
function createVertex(item) { 
    vertex(item[0], item[1]);
}






/////////////////////////////////////////////////////////////////////////////////////////////////////////
       //      FATORY SETUP THAT CONSTUCTS THE COLOR CHOOSER    IS INITIALICED WITH KEY C 
function colorChooser (x,y) {
  
  c = {    
      x : round(x),
      y : round(y),
      
      
    
     drawChooser: function(){ 
         push();
        fill (100);
         rect(this.x,this.y, drawSoft.COLOR_CHOOSER.SIZE_X, drawSoft.COLOR_CHOOSER.SIZE_Y);
         
        
         for (i = 0 ; i < drawSoft.COLOR_CHOOSER.COLOR_RANGE ; i ++)
         {
                
                strokeWeight (1);
                
                for (j = 0; j < drawSoft.COLOR_CHOOSER.COLOR_RANGE; j ++)
                {
                    stroke (drawSoft.colorWheelFull[j][i]);
                    beginShape(POINTS);
                    
                    vertex(this.colorWheelStartX + j  , this.colorWheelStartY +i);    
                    endShape();
                }
         }
        fill("white")
         
         stroke(0);
         text("CURRENT", this.x+300,this.y+102);
         text("NEW", this.x+300,this.y+156);
         
         fill(drawSoft.colorWheelFull[drawSoft.colorArrayi[drawSoft.currentVertexArray]][  
                                    drawSoft.colorArrayj[drawSoft.currentVertexArray]]);
         rect(this.x+300,this.y+10, 80, 80 );
         
         
        fill(drawSoft.colorWheelFull[drawSoft.newColor[0]][drawSoft.newColor[1]]);
         rect(this.x+300,this.y+160, 80, 80 ); 
         
         pop();
      },
// Mousepressed funtion
        mousePressed: function(Mx,My)
      {
          
           
          // FIRST IF: IF NOT INSIDE THE RECT JUST CONTINUE THE PROGRAM WITH THE NEW COLOR
      if (Mx < this.x || Mx > this.xSizeEnd || My < this.y || My > this.ySizeEnd)
        {
            drawSoft.colorChooserOn = false;
            drawSoft.colorArrayi[drawSoft.currentVertexArray] = drawSoft.newColor[0];
            drawSoft.colorArrayj[drawSoft.currentVertexArray] = drawSoft.newColor[1];
        } else if (Mx >= this.colorWheelStartX && Mx <= this.colorWheelEndX && My >= this.colorWheelStartY && My <= this.colorWheelEndY)
        {
            console.log(  Mx - this.colorWheelStartX , My - this.colorWheelStartY)
            drawSoft.newColor = [Mx - this.colorWheelStartX,My - this.colorWheelStartY];
        } else 
        {
        console.log( Mx - this.x, My - this.y ) 
        
        }
      },  

  }
  
return c;
  
  }      
        
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Mouse drawing function for drawSoft!
////////////////////////////////////////////////////////////////////// 
function drawSoftVertecies () 
{
    push();
    
    
    for (i = 0; i < 19; i++) 
    {
         
        if (drawSoft.vertexArray[i].length != 0) 
        {
            strokeWeight(drawSoft.strokeWeightArray[i]);
            if (drawSoft.bFill[i]) {fill(drawSoft.colorWheelFull[ drawSoft.colorArrayi[i] ][ drawSoft.colorArrayj[i]]);} 
            else {noFill();}
       
            if (drawSoft.vertexArray[i].length == 1) 
            {   
                beginShape(POINTS); 
                createVertex(drawSoft.vertexArray[i][0],drawSoft.vertexArray[i][1]);
                endShape();
            }
            else 
            {  
                switch(drawSoft.vertexModes[drawSoft.vertexModeChoice[i]])
                {
                    case "":
                    beginShape();
                    break;
                    case "LINES":
                    beginShape(LINES);
                    break;
                    case "POINTS":
                    beginShape(POINTS);
                    break;
                    case "TRIANGLES":
                    beginShape(TRIANGLES);
                    break;
                    case "TRIANGLE_STRIP":
                    beginShape(TRIANGLE_STRIP);
                    break;
                    case "TRIANGLE_FAN":
                    beginShape(TRIANGLE_FAN);
                    break;
                    case "QUADS":
                    beginShape(QUADS);
                    break;
                    case "QUAD_STRIP":
                    beginShape(QUAD_STRIP);
                    break;
                    case "TESS":
                    beginShape(TESS);
                    break;
                    default:
                    console.log("Error in DrawSoftVertecies")
                
                }
                
                drawSoft.vertexArray[i].forEach(createVertex);
                if (drawSoft.returnsToStart[i]){endShape(CLOSE);}
                else {endShape();} 
            }
                
            
                
               
      
        
        }
        
    }
    
    pop();
    
}