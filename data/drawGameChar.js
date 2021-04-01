
//hat color         120  , 102  , 0  , 255
//skin color        255  , 215  , 191  , 255
// grey             120  , 120  , 120  , 255
//Dark blue         0  , 48  , 114  , 255
// hair             208  , 161  , 0  , 255


/// FRONT FACING





function drawCharacterStanding(str)
{


    
push();




//hatColor         120  , 102  , 0  , 255
//skin color        255  , 215  , 191  , 255
// grey             120  , 120  , 120  , 255
//Dark blue         0  , 48  , 114  , 255
// hair             208  , 161  , 0  , 255
translate(gameChar.screenX,gameChar.y);  
// console.log(gameChar.jumpCompCounter)
scale(GAME_CHAR.JUMP_EXP_ARRAY[gameChar.jumpCompCounter],GAME_CHAR.JUMP_COMP_ARRAY[gameChar.jumpCompCounter]);

stroke(0);
    switch(str) 
    {
        case "left":
             scale(1,1)
            break;
        case "right":
            scale(-1,1)
            break;
        default:
            console.log("failiure of switch in drawCharacterWalking")
    }
  
  


//  HAT
strokeWeight( 1 );
 fill( 120  , 102  , 0  , 255 );
 beginShape();
vertex( -19 ,  -62  );
vertex( -14 ,  -63  );
vertex( -9  ,  -64  );
vertex( -9  ,  -70  );
vertex( -9  ,  -75  );
vertex( -5  ,  -76  );
vertex( 3   ,  -77  );
vertex( 7   ,  -76  );
vertex( 8   ,  -67  );
vertex( 8   ,  -65  );
vertex( 18  ,  -66  );
vertex( 19  ,  -62  );
vertex( -20 ,  -60  );
 endShape(CLOSE);
//  FACE
 strokeWeight( 1 );
 fill( 255  , 215  , 191  , 255 );
 beginShape();
vertex( -8 , -59 );
vertex( -8 , -56 );
vertex( -8 , -51 );
vertex( -4 , -51 );
vertex( 1  , -51 );
vertex( 8  , -51 );
vertex( 8  , -62 );
 endShape(CLOSE);

//EYES
strokeWeight( 1 );
fill( 120  , 120  , 120  , 255 );
beginShape(LINES);
vertex( -4 ,  -60 );
vertex( -4 ,  -57 );
vertex( 2  ,  -60 );
vertex( 2  ,  -57 );
endShape();

//MOUTH
strokeWeight( 1 );
fill( 120  , 120  , 120  , 255 );

beginShape();
vertex( -6 ,  -54 );
vertex( 4  ,  -54 );
endShape(CLOSE);


//NECK
 strokeWeight( 1 );
 fill( 120  , 120  , 120  , 255 );
 beginShape();
vertex( -2 ,  -51 );
vertex( -3 ,  -47 );
vertex( 1  ,  -47 );
vertex( 0  ,  -51 );
 endShape();

 //UPPER BODY
 strokeWeight( 2 );
 fill( 120  , 120  , 120  , 255 );
    beginShape();
    vertex( -15 ,  -45 );
    vertex( 14  ,  -47 );
    vertex( 7   ,  -23 );
    vertex( -8  ,  -23 );
     endShape(CLOSE);
    
     strokeWeight( 2 );
     
     fill( 0  , 48  , 114  , 255 );
// LEGS 
beginShape();
vertex( -8  ,  -24 );
vertex( -19 ,  -2 );
vertex( -7  ,  -2 );
vertex( -2  ,  -14 );
vertex( 8   ,  -2 );
vertex( 20  ,  -3 );
vertex( 6   ,  -24 );
 endShape(CLOSE);





//Non hammer hand
strokeWeight( 2 );
fill( 120  , 120  , 120  , 255 );
beginShape();
vertex( -17 ,  -45 );
vertex( -23 ,  -35 );
vertex( -11 ,  -26 );
vertex( -17 ,  -38 );
vertex( -13 ,  -40 );
endShape();



if (gameChar.numberOfHammers - gameChar.hammers.length)
{
    
    

    if (charLogics.keyPressed.space)
    {
        // let translateX = 7;
        // let translateY = -35;
        // let scaleH = 0.15;
        // let rotateH = -0.3;

        let translateH_X = -100;
        let translateH_Y = 30;
        let scaleH = 0.15;
        // let rotateH = 1.8 ;
        let rotateH = -0.6 ;
       
        
        translate (15,-48);
        rotate(-(gameChar.hammerChargeRotation+=GAME_CHAR.HAMMER_CHARGE_ROTATION_ARR[gameChar.hammerChargeCounter]));
       

        scale(scaleH );            
        rotate(rotateH)
        translate( translateH_X, translateH_Y )
        drawHammerHandlePosition();
        translate(-translateH_X, -translateH_Y);
        scale(1/scaleH);
        rotate(-rotateH);
        


        // rotate(armFirstTrowAngle);
        //HAMMER ARM
        strokeWeight( 2 );
        fill( 120  , 120  , 120  , 255 );
        beginShape();
        vertex( 0, 0     );
        vertex( 6, 11    );
        vertex( -10, 18 );
        vertex( -12, 11 );
        vertex( -4, 8   );
        endShape(CLOSE);
        // rotate(-armFirstTrowAngle);
        
        rotate(gameChar.hammerChargeRotation);
        ///
        translate (-15,48);

    } else
    {  


        let translateX = 7;
        let translateY = -35;
        let scaleH = 0.15;
        let rotateH = -0.3;
    
    
    
        translate( translateX, translateY )
        scale(scaleH );            
        rotate(rotateH)
        drawHammerCenterPosition();
        scale(1/scaleH);
        rotate(-rotateH);
        translate(-translateX, -translateY);
        
        
        
    
        //HAMMER ARM
        translate (15,-48);
        strokeWeight( 2 );
        fill( 120  , 120  , 120  , 255 );
        beginShape();
        vertex( 0, 0     );
        vertex( 6, 11    );
        vertex( -10, 18 );
        vertex( -12, 11 );
        vertex( -4, 8   );
        endShape(CLOSE);
        translate (-15,48);


    }
    
   
}    else
{
    if (charLogics.keyPressed.space)
    {
        
        //HAMMER ARM
        translate (15,-48);
        rotate(-(gameChar.hammerChargeRotation +=GAME_CHAR.HAMMER_CHARGE_ROTATION_ARR[gameChar.hammerChargeCounter]));
        
        strokeWeight( 2 );
        fill( 120  , 120  , 120  , 255 );
        beginShape();
        vertex( 0, 0     );
        vertex( 6, 11    );
        vertex( -10, 18 );
        vertex( -12, 11 );
        vertex( -4, 8   );
        endShape(CLOSE);
        rotate(gameChar.hammerChargeRotation);
        
        translate (-15,48);

    }
    else
    {
    //HAMMER ARM
    strokeWeight( 2 );
    fill( 120  , 120  , 120  , 255 );
    beginShape();
    vertex( 15 ,  -48 );
    vertex( 21 ,  -37 );
    vertex( 5  ,  -30 );
    vertex( 3  ,  -37 );
    vertex( 11 ,  -40 );
    endShape(CLOSE);
    }
}
push();
strokeWeight(15)
stroke(255);        
point (0, -40)
pop();
    //hitbox
    // noStroke();
    // rect (-20,-70,34,60);

    scale(1/GAME_CHAR.JUMP_EXP_ARRAY[gameChar.jumpCompCounter],1/GAME_CHAR.JUMP_COMP_ARRAY[gameChar.jumpCompCounter]);
    pop();
}


//////WALKING RIGHT

function drawCharacterWalking(str)
{
push();
    
//hat color         120  , 102  , 0  , 255
//skin color        255  , 215  , 191  , 255
// grey             120  , 120  , 120  , 255
//Dark blue         0  , 48  , 114  , 255
// hair             208  , 161  , 0  , 255
  
stroke(0);
    
    
    
   translate(gameChar.screenX,gameChar.y);  
   
   
   scale(GAME_CHAR.JUMP_EXP_ARRAY[gameChar.jumpCompCounter],GAME_CHAR.JUMP_COMP_ARRAY[gameChar.jumpCompCounter]);
    switch(str) 
    {
        case "left":
             scale(-1,1)
            break;
        case "right":
            scale(1,1)
            break;
        default:
            console.log("failiure of switch in drawCharacterWalking")
    }
 
//SCREEEN FACING LEG
    strokeWeight( 2 );
 fill( 0  , 19  , 94  , 255 );
 beginShape();
vertex( -21 ,  -4 );
vertex( -9  ,  -5 );
vertex( 6   ,  -25 );
vertex( -4  ,  -25 );
 endShape(CLOSE);
 strokeWeight( 2 );
 fill( 0  , 19  , 94  , 255 );
 // AWAY FACING LEG
 beginShape();
vertex( -1 ,  -16 );
vertex( 11 ,  -5 );
vertex( 20 ,  -6 );
vertex( 6  ,  -24 );
 endShape(CLOSE);
 //TORSO
 strokeWeight( 2 );
 fill( 120  , 120  , 120  , 255 );
 beginShape();
vertex( -8 ,  -48 );
vertex( 10 ,  -49 );
vertex( 6  ,  -25 );
vertex( -5 ,  -26 );
 endShape(CLOSE);
// AWAY FACING ARM
 strokeWeight( 2 );
 fill( 120  , 120  , 120  , 255 );
 beginShape();
vertex( -8  ,  -38 );
vertex( -14 ,  -26 );
vertex( -9  ,  -25 );
vertex( -6  ,  -29 );
 endShape();

// NECK
strokeWeight( 1 );
 fill( 120  , 120  , 120  , 255 );
 beginShape();
vertex( -1 ,  -49 );
vertex( 0  ,  -54 );
vertex( 2  ,  -53 );
vertex( 3  ,  -49 );
 endShape();
// HAIR
 strokeWeight( 1 );
 fill( 208  , 161  , 0  , 255 );
 beginShape();
vertex( -8 ,  -63 );
vertex( -9 ,  -57 );
vertex( -6 ,  -56 );
vertex( -2 ,  -63 );
 endShape();
// HAT
 strokeWeight( 1 );
 fill( 120  , 102  , 0  , 255 );
 beginShape();
vertex( -8  ,  -77 );
vertex( -9  ,  -67 );
vertex( -17 ,  -67 );
vertex( -23 ,  -66 );
vertex( -23 ,  -65 );
vertex( -14 ,  -64 );
vertex( -7  ,  -63 );
vertex( 0   ,  -63 );
vertex( 7   ,  -63 );
vertex( 16  ,  -65 );
vertex( 16  ,  -69 );
vertex( 8   ,  -68 );
vertex( 7   ,  -78 );
vertex( 2   ,  -79 );
 endShape(CLOSE);
// HEAD
 strokeWeight( 1 );
 fill( 255  , 215  , 191  , 255 );
 beginShape();
vertex( 8  ,  -64 );
vertex( 7  ,  -53 );
vertex( 2  ,  -53 );
vertex( -6 ,  -57 );
vertex( -2 ,  -63 );
vertex( 7  ,  -63 );
 endShape();
// FACE DETAILS
    strokeWeight( 1 );
 beginShape(LINES);
vertex( 4 ,  -62 );
vertex( 4 ,  -60 );
vertex( 3 ,  -57 );
vertex( 6 ,  -56 );
 endShape();


 if (gameChar.numberOfHammers - gameChar.hammers.length)
 {
     
     
 
     if (charLogics.keyPressed.space)
     {
         // let translateX = 7;
         // let translateY = -35;
         // let scaleH = 0.15;
         // let rotateH = -0.3;
 
         let translateX = 110;
         let translateY = 22;
         let scaleH = 0.15;
         let rotateH = 0.3;
 
         
        
        translate (0,-44);
         rotate(gameChar.hammerChargeRotation +=GAME_CHAR.HAMMER_CHARGE_ROTATION_ARR[gameChar.hammerChargeCounter]);

 
         scale(scaleH );            
         rotate(rotateH)
         translate( translateX, translateY )
         drawHammerHandlePosition();
         translate(-translateX, -translateY);
         scale(1/scaleH);
         rotate(-rotateH);
         
 
  
         
         
         // FRONT FACING ARM
         
        strokeWeight( 2 );
        fill( 120  , 120  , 120  , 255 );
        beginShape();
        vertex( 2,-4 );
        vertex( 4,2 );
        vertex( 18,6 );
        vertex( 17,13 );
        vertex( 0,8 );
        vertex( -4,-4 );
        endShape();
        rotate(-gameChar.hammerChargeRotation );
        translate (0,44);



        
     } else
     {  
         let translateX = 13;
         let translateY = -35;
         let scaleH = 0.15;
         let rotateH = 0.3;

        //  let translateX = 0;
        //  let translateY = 0;
        //  let scaleH = 0.15;
        //  let rotateH = 0;
     
         
     
         translate( translateX, translateY );
         scale(scaleH );            
         rotate(rotateH);
         drawHammerCenterPosition();
         scale(1/scaleH);
         rotate(-rotateH);
         translate(-translateX, -translateY);
         
         
         
      
        
        translate (0,-44);
        
         // FRONT FACING ARM
        strokeWeight( 2 );
        fill( 120  , 120  , 120  , 255 );
        beginShape();
        vertex( 2,-4 );
        vertex( 4,2 );
        vertex( 18,6 );
        vertex( 17,13 );
        vertex( 0,8 );
        vertex( -4,-4 );

        
        endShape();

        
         translate (0,44);
 
     }
     
    
 }    else
 {
     if (charLogics.keyPressed.space)
     {
         
         
         
         
         translate (0,-44);
         rotate( gameChar.hammerChargeRotation +=GAME_CHAR.HAMMER_CHARGE_ROTATION_ARR[gameChar.hammerChargeCounter]);
         
         // FRONT FACING ARM
        strokeWeight( 2 );
        fill( 120  , 120  , 120  , 255 );
        beginShape();
        vertex( 2,-4 );
        vertex( 4,2 );
        vertex( 18,6 );
        vertex( 17,13 );
        vertex( 0,8 );
        vertex( -4,-4 );
        endShape();
         rotate(-gameChar.hammerChargeRotation);
         
         translate (0,44);
 
     }
     else
     {
    // FRONT FACING ARM
    translate (0,-44);
    strokeWeight( 2 );
    fill( 120  , 120  , 120  , 255 );
    beginShape();
    vertex( 2,-4 );
    vertex( 4,2 );
    vertex( 18,6 );
    vertex( 17,13 );
    vertex( 0,8 ); 
    vertex( -4,-4 );
    endShape();


    


    translate (0,44);
     }
 }

push();
    strokeWeight(15)
    stroke(255);        
    point (0, -40)
    pop();


//  hitbox
    // noStroke();
    // rect (-20,-70,34,60);
 scale(1/GAME_CHAR.JUMP_EXP_ARRAY[gameChar.jumpCompCounter],1/GAME_CHAR.JUMP_COMP_ARRAY[gameChar.jumpCompCounter]);
pop();
}




//Jumping Right

function drawCharacterInAir(str)
{
push();
    
//hat color         120  , 102  , 0  , 255
//skin color        255  , 215  , 191  , 255
// grey             120  , 120  , 120  , 255
//Dark blue         0  , 48  , 114  , 255
// hair             208  , 161  , 0  , 255
  
stroke(0);
    translate(gameChar.screenX,gameChar.y); 

    scale(GAME_CHAR.JUMP_EXP_ARRAY[gameChar.jumpCompCounter],GAME_CHAR.JUMP_COMP_ARRAY[gameChar.jumpCompCounter]);
     switch(str)  
    {
        case "left":
             scale(-1,1)
            break;
        case "right":
            scale(1,1)
            break;
        default:
            console.log("failiure of switch in drawCharacterInAir")
    }
  
   //LEGS
strokeWeight( 2 );
 fill( 0  , 48  , 114  , 255);
 beginShape();
vertex( -22 ,  -4 );
vertex( 9 ,  -17 );
vertex( -4 ,  -21 );
vertex( -22 ,  -12 );
vertex( -22 ,  -5 );
vertex( -4 ,  -12 );
vertex( 8 ,  -3 );
vertex( 21 ,  -9 );
vertex( 10 ,  -17 );
 endShape();
 //UPPER BODY
 strokeWeight( 2 );
 fill( 120  , 120  , 120  , 255 );
 beginShape();
vertex( -4 ,  -22 );
vertex( 7 ,  -45 );
vertex( 21 ,  -41 );
vertex( 10 ,  -17 );
 endShape();
 
//HAT
 strokeWeight( 1 );
 fill( 120  , 102  , 0  , 255 );
 beginShape();
vertex( 14 ,  -72 );
vertex( -2 ,  -43 );
vertex( -3 ,  -45 );
vertex( 0 ,  -55 );
vertex( -8 ,  -62 );
vertex( -3 ,  -73 );
vertex( 2 ,  -75 );
vertex( 10 ,  -71 );
vertex( 14 ,  -79 );
vertex( 17 ,  -77 );
 endShape(CLOSE);
//HAIR
 strokeWeight( 1 );
 fill( 208  , 161  , 0  , 255 );
 beginShape();
vertex( 6 ,  -57 );
vertex( 6 ,  -52 );
vertex( 9 ,  -52 );
vertex( 16 ,  -60 );
vertex( 23 ,  -60 );
vertex( 23 ,  -65 );
vertex( 19 ,  -68 );
vertex( 12 ,  -68 );
 endShape();
//FACE
 strokeWeight( 1 );
 fill( 255  , 215  , 191  , 255 );
 beginShape();
vertex( 22 ,  -60 );
vertex( 21 ,  -52 );
vertex( 18 ,  -52 );
vertex( 19 ,  -49 );
vertex( 17 ,  -47 );
vertex( 15 ,  -48 );
vertex( 10 ,  -53 );
vertex( 16 ,  -60 );
 endShape();
//NECK
 strokeWeight( 1 );
 fill( 120  , 120  , 120  , 255 );
 beginShape();
vertex( 10 ,  -45 );
vertex( 14 ,  -48 );
vertex( 15 ,  -48 );
vertex( 15 ,  -44 );
 endShape();
 //FACE FEATURES
 strokeWeight( 1 );
 fill( 120  , 120  , 120  , 255 );
 beginShape(LINES);
vertex( 19 ,  -59 );
vertex( 18 ,  -56 );
vertex( 21 ,  -50 );
 endShape();  
/* 
 RESET ARM IN AIR VALUES
 var x= 10; 
 var y= -39;
 // ARM
//  rotate(frameCount);
*/

if (gameChar.numberOfHammers - gameChar.hammers.length)
 {
     
     
 
     if (charLogics.keyPressed.space)
     {
         // let translateX = 7;
         // let translateY = -35;
         // let scaleH = 0.15;
         // let rotateH = -0.3;
 
         let translateX = 90;
         let translateY = 45;
         let scaleH = 0.15;
         let rotateH = 0.6 ;
 
        translate (10,-39);
        
         rotate(gameChar.hammerChargeRotation+=GAME_CHAR.HAMMER_CHARGE_ROTATION_ARR[gameChar.hammerChargeCounter])

 
         scale(scaleH );            
         rotate(rotateH)
         translate( translateX, translateY )
         drawHammerHandlePosition();
         translate(-translateX, -translateY);
         scale(1/scaleH);
         rotate(-rotateH);
         
 
  
         
         //  ARM
         
         strokeWeight( 2 );
         fill( 120  , 120  , 120  , 255 );
         beginShape();
            vertex( 0,0 );
            vertex( -6,12 );
            vertex( 7,21 ); 
            vertex( 10,15 );
            vertex( 1,8 );
            vertex( 4,0 );
         endShape();
         translate (-10,39);
         rotate( -gameChar.hammerChargeRotation  )
        
 
     } else
     {  
         let translateX = 15;
         let translateY = -22;
         let scaleH = 0.15;
         let rotateH = 0.3;

        //  let translateX = 0;
        //  let translateY = 0;
        //  let scaleH = 0.15;
        //  let rotateH = 0;
     
         
     
         translate( translateX, translateY );
         scale(scaleH );            
         rotate(rotateH);
         drawHammerCenterPosition();
         scale(1/scaleH);
         rotate(-rotateH);
         translate(-translateX, -translateY);
         
         
        
        
         //  ARM
         translate (10,-39);
         strokeWeight( 2 );
         fill( 120  , 120  , 120  , 255 );
         beginShape();
            vertex( 0,0 );
            vertex( -6,12 );
            vertex( 7,21 );
            vertex( 10,15 );
            vertex( 1,8 );
            vertex( 4,0 );
         endShape();
         translate (-10,39);

    
        
 
     }
     
    
 }    else
 {
     if (charLogics.keyPressed.space)
     {
         
         
         translate (10,-39);
         
         rotate(gameChar.hammerChargeRotation+=GAME_CHAR.HAMMER_CHARGE_ROTATION_ARR[gameChar.hammerChargeCounter] );
         
         //  ARM
         
         strokeWeight( 2 );
         fill( 120  , 120  , 120  , 255 );
         beginShape();
            vertex( 0,0 );
            vertex( -6,12 );
            vertex( 7,21 );
            vertex( 10,15 );
            vertex( 1,8 );
            vertex( 4,0 );
         endShape();
         rotate(-gameChar.hammerChargeRotation );
         translate (-10,39);
         
  
     }
     else
     {
    //  ARM
    translate (10,-39);
 strokeWeight( 2 );
 fill( 120  , 120  , 120  , 255 );
 beginShape();
    vertex( 0,0 );
    vertex( -6,12 );
    vertex( 7,21 );
    vertex( 10,15 );
    vertex( 1,8 );
    vertex( 4,0 );
 endShape();

    


 translate (-10,39);
     }
 } 
 
 rotate(-gameChar.hammerChargeRotation );
push();
    strokeWeight(15)
    stroke(255);        
    point (0, -40)
    pop();
//hitbox
    // noStroke();
    // rect (-20,-70,34,60);

 scale(1/GAME_CHAR.JUMP_EXP_ARRAY[gameChar.jumpCompCounter],1/GAME_CHAR.JUMP_COMP_ARRAY[gameChar.jumpCompCounter]);
pop();    
} 
    
     
    


function drawCharacterLives(x,y)
{
    push();
    
    //hatColor         120  , 102  , 0  , 255
    //skin color        255  , 215  , 191  , 255
    // grey             120  , 120  , 120  , 255
    //Dark blue         0  , 48  , 114  , 255
    // hair             208  , 161  , 0  , 255
    translate(x,y);    
    stroke(0);
    scale(0.9)
    
  
  


    strokeWeight( 1 );
    fill( 120  , 102  , 0  , 255 );
    beginShape();
    vertex( -19 ,  -62  );
    vertex( -14 ,  -63  );
    vertex( -9  ,  -64  );
    vertex( -9  ,  -70  );
    vertex( -9  ,  -75  );
    vertex( -5  ,  -76  );
    vertex( 3   ,  -77  );
    vertex( 7   ,  -76  );
    vertex( 8   ,  -67  );
    vertex( 8   ,  -65  );
    vertex( 18  ,  -66  );
    vertex( 19  ,  -62  );
    vertex( -20 ,  -60  );
    endShape(CLOSE);
    strokeWeight( 1 );
    fill( 255  , 215  , 191  , 255 );
    beginShape();
    vertex( -8 , -59 );
    vertex( -8 , -56 );
    vertex( -8 , -51 );
    vertex( -4 , -51 );
    vertex( 1  , -51 );
    vertex( 8  , -51 );
    vertex( 8  , -62 );
    endShape(CLOSE);
    strokeWeight( 1 );
    fill( 120  , 120  , 120  , 255 );
    beginShape();
    vertex( -2 ,  -51 );
    vertex( -3 ,  -47 );
    vertex( 1  ,  -47 );
    vertex( 0  ,  -51 );
    endShape();
    strokeWeight( 1 );
    strokeWeight( 2 );

    strokeWeight( 1 );
    fill( 120  , 120  , 120  , 255 );
    beginShape(LINES);
    vertex( -4 ,  -60 );
    vertex( -4 ,  -57 );
    vertex( 2  ,  -60 );
    vertex( 2  ,  -57 );
    endShape();
    strokeWeight( 1 );
    fill( 120  , 120  , 120  , 255 );
    beginShape();
    vertex( -6 ,  -54 );
    vertex( 4  ,  -54 );
    endShape(CLOSE);
    
    pop();
}