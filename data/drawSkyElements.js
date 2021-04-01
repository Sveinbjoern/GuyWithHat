
function drawSun(){
    push();
    
    translate (dtVars.sunCoordinates[0], dtVars.sunCoordinates[1]);
    scale (dtVars.sunScale)
    
    // stroke(0)
//    console.log(ColorGradientSun[timeofDay], timeofDay);
    // ColorGradientSun[timeofDay].setAlpha(200);
//        console.log(ColorGradientSun[0], timeofDay);

    fill (drawSoft.colorWheelFull[ dtVars.sunColor[0]][dtVars.sunColor[1]])
    strokeWeight( 2 );
    beginShape(); 
    vertex( -22,   62 )
    vertex( 40,  -38 )
    vertex( -58,  -40 )
    vertex( 46,  46 )
    vertex( -13,  -57 )
    vertex( 15,   54 )
    vertex( -28,   17 )
    vertex( 72, -24 )
    vertex( -43,  -7 )
    vertex( 27,  -63 )
    vertex( 6,   50 )
    vertex( -34,   2 )
    vertex( 83,  -3 )
    vertex( -28,  -6 )
    vertex( -49,  -55 )
    vertex( 13,   36 )
    vertex( -33,  -64 )
    vertex( 58,   27 )
    vertex( -42,  -12 )
    vertex( -51,   44 )
    vertex( 14,  -39 )
    vertex( -34,   53 )
    vertex( 17,  -23 )
    vertex( -71,  -2 )
    vertex( 6,   7 )
    vertex( -22,   62 )
    endShape();
    
//    console.log(ColorGradientSun[timeofDay], timeofDay);
    noStroke();
    fill(drawSoft.colorWheelFull[ dtVars.sunColor[0]][dtVars.sunColor[1]]) //(250 alpha)
    ellipse( 0 ,  0 , 50);
    // dtVars.sunColor.setAlpha(2);
    // fill(dtVars.sunColor) //(2 alpha) 
   for (i = 0; i< 200 ; i++){
   ellipse( 0 ,  0 , 50+i);
   } 
    
//   console.log(ColorGradientSun[timeofDay], timeofDay);
    pop();
}









