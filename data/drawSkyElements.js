
function drawSun(){
    push();
    
    translate (dtVars.sunCoordinates[0], dtVars.sunCoordinates[1]);
    scale (dtVars.sunScale)
    noStroke();
    fill(COLOR.colorWheelFull[ dtVars.sunColor[0]][dtVars.sunColor[1]]) //(250 alpha)
    ellipse( 0 ,  0 , 250);

    pop();
}









