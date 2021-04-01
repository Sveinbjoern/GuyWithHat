

function drawMountain(x, y , scrollFac , scale_x)
{
push();
    stroke(0);
     fill(DimGrayC)
 strokeWeight( 1 );
 
 translate(x - charLogics.scroll[0] * scrollFac, y);
 scale(scale_x,1);

 beginShape();
vertex( -410, -120 );
vertex( -375, -134 );
vertex( -350, -152 );
vertex( -330, -175 );
vertex( -317, -202 );
vertex( -308, -231 );
vertex( -294, -257 );
vertex( -235, -257 );
vertex( -222, -227 );
vertex( -204, -203 );
vertex( -184, -225 );
vertex( -154, -225 );
vertex( -135, -248 );
vertex( -107, -258 );
vertex( -13, -259 );
vertex( -3, -252 );
vertex( 16, -229 );
vertex( 46, -222 );
vertex( 68, -202 );
vertex( 82, -175 );
vertex( 100, -151 );
vertex( 120, -120 );
 endShape();
    
    
 
    
    fill(SnowC);
   
 strokeWeight( 1 );
 beginShape();
vertex( -295, -256 );
vertex( -272, -279 );
vertex( -253, -303 );
vertex( -241, -276 );
vertex( -235, -258 );
 endShape();
 strokeWeight( 1 );
 beginShape();

 
vertex( -109, -257 );
vertex( -89, -282 );
vertex( -70, -305);
vertex( -43, -293 );
vertex( -20, -274 );
vertex( -11, -259 );
 endShape();
    
    pop();
}




function drawHills(x, y , scrollFac , scale_x)
{
push();
stroke(0);
fill(lerpColor (ForestGreenC, BlackC,0.2)); 
strokeWeight( 1 );
translate(x - charLogics.scroll[0] * scrollFac, y);
 scale(scale_x,1);
beginShape();
vertex( -555, -125);
vertex( -517, -176);
vertex( -492, -193 );
vertex( -467, -209 );
vertex( -436, -216 );
vertex( -404, -219 );
vertex( -374, -215 );
vertex( -345, -204 );
vertex( -314, -196 );
vertex( -284, -188 );
vertex( -253, -183 );
vertex( -221, -186 );
vertex( -191, -194 );
vertex( -161, -201 );
vertex( -129, -201 );
vertex( -98, -195 );
vertex( -67, -186 );
vertex( -36, -177 );
vertex( -5, -180 );
vertex( 24, -174 );
vertex( 50, -158 );
vertex( 77, -145 );
vertex( 105, -129 );
vertex( 133, -117 );
endShape();
pop();
}
  
 
function drawCloud(x, y , scrollFac , scale_x, scale_y){

    push();    
    translate(x - ( charLogics.scroll[0] - dtVars.cloudMovement )* scrollFac, y);
    scale(scale_x,scale_y); 
    
    fill(255,255, 255,100);
        
    strokeWeight( 1 );
    stroke(0);
    
    beginShape();
    vertex( -52, -67 );
    vertex( -91, 28 );
    vertex( 57, 66   );
    vertex( 75, -40  );
    vertex( -13, -82 );
    vertex( -40, -7  );
    vertex( 5, 17    );
    vertex( 34, -32  );
    vertex( -15, -30 );
    vertex( 32, 16   );
    vertex( 47, -16  );
    vertex( 6, -52   );
    vertex( 23, -19  );
    vertex( 40, -35  );
    vertex( -52, -67 );
    endShape();
    
    
    
    
    
    pop();
    }
