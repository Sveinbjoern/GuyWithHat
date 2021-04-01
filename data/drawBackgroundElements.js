function makeRock(name,x, y , scrollFac , scale_) 
{   
    rock = 
    {   
        NAME: name, 
        X : x,
        Y : y,
        SCROLL_FAC : scrollFac,
        SCALE: scale_, 

        draw: function()
        { 
           
            
            push();
            translate(this.X- charLogics.scroll[0] * this.SCROLL_FAC,this.Y);
            scale(this.SCALE);
            fill(DarkGrayC);
            stroke(0)
            strokeWeight( 2 );
            beginShape();
            vertex( -5, -5   );
            vertex( 0, -6    );
            vertex( 6, -5    );
            vertex( 7, -2    );
            vertex( 6, 2     );
            vertex( 3, 2     );
            vertex( -5, -2   );
            vertex( -5, -5   );
            endShape();
            pop();
            
        },
        // setup: function()
        // {

        // },
    }    
    return rock;
}




function makeTree_2 (name,x, y , scrollFac , scale_) 
{
    
    
    tree2 =
    {
        NAME: name,
        X : x,
        Y : y,
        SCROLL_FAC : scrollFac,
        SCALE: scale_, 
        
        
        draw: function()
        {
           
              push()
            translate(this.X- charLogics.scroll[0] * this.SCROLL_FAC,this.Y);
            scale(this.SCALE);
            stroke(0);
            
            fill(BrownC);
            
            strokeWeight( 2 );
            beginShape();
            vertex( -6, -40  );
            vertex( -9, -6   );
            vertex( -22, 2   );
            vertex( -10, -2  );
            vertex( 11, 4    );
            vertex( 27, 9    );
            vertex( 8, -8    );
            vertex( 9, -38   );
            vertex( -6, -40  );
            endShape();
            
            fill(ForestGreenC);
            strokeWeight( 2 );
            beginShape();
            vertex( -10, -33         );
            vertex( -52, -17         );
            vertex( -14, -58         );
            vertex( -51, -56         );
            vertex( 0, -98           );
            vertex( -42, -84         );
            vertex( -5, -141         );
            vertex( -31, -118        );
            vertex( -1, -169         );
            vertex( -29, -149        );
            vertex( 1, -200          );
            vertex( -7, -197         );
            vertex( 5, -224          );
            vertex( -3, -226         );
            vertex( 9, -242          );
            vertex( 20, -230         );
            vertex( 11, -230         );
            vertex( 20, -219         );
            vertex( 12, -220         );
            vertex( 27, -200         );
            vertex( 11, -203         );
            vertex( 30, -178         );
            vertex( 11, -183         );
            vertex( 28, -149         );
            vertex( 8, -162          );
            vertex( 30, -120         );
            vertex( 10, -139         );
            vertex( 28, -108         );
            
            vertex( 13, -115         );
            vertex( 53, -59          );
            vertex( 23, -81          );
            vertex( 59, -30          );
            vertex( -10, -33         );
            
            endShape();

            translate(-(this.X- charLogics.scroll[0] * this.SCROLL_FAC),-this.Y);
            scale(1/this.SCALE);
            pop();
        },    
    }
    return tree2;
}


function makeTree (name, x, y , scrollFac , scale_) 
{
    
    
    tree =
    {

        NAME: name, 
        X : x,
        Y : y,
        SCROLL_FAC : scrollFac,
        SCALE: scale_, 
        
        
        
    
        
        
        draw: function()
        {
           
            push();
            translate(this.X- charLogics.scroll[0] * this.SCROLL_FAC,this.Y);
            scale(this.SCALE);
            stroke(0);
            strokeWeight( 2 );  
            fill(BrownC);
            beginShape();
            vertex( -9, -30  );
            vertex( -9, -5   );
            vertex( -22, -1  );
            vertex( -21, 1   );
            vertex( -17, 1   );
            vertex( -6, -1   );
            vertex( -6, 4   );
            vertex( -11, 7   );
            vertex( -4, 10   );
            vertex( 2, 3     );
            vertex( 2, 0     );
            vertex( 5, -3    );
            vertex( 8, 3     );
            vertex( 9, 7     );
            vertex( 10, 5    );
            vertex( 11, 0    );
            vertex( 17, 2    );
            vertex( 22, 6    );
            vertex( 21, -5   );
            vertex( 13, -5   );
            vertex( 11, -8   );
            vertex( 9, -25   );
            
            endShape();    
            
            fill(ForestGreenC);
            strokeWeight( 2 );
            beginShape();
            vertex( -60, 3      );
            vertex( -25, -47     );
            vertex( -60, -28     );
            vertex( -22, -83     );
            vertex( -52, -80     );
            vertex( -15, -125    );
            vertex( -48, -107    );
            vertex( 1, -156     );
            vertex( -24, -148    );
            vertex( 16, -197     );
            vertex( 60, -158    );
            vertex( 31, -160     );
            vertex( 78, -117     );
            vertex( 39, -127     );
            vertex( 64, -104    );
            vertex( 29, -97     );
            vertex( 69, -73     );
            vertex( 16, -74     );
            vertex( 63, -41     );
            vertex( 19, -53     );
            vertex( 79, -1      );
            vertex( 14, -24     );
            vertex( -14, -25    );
            vertex( -60, 3      );    
            endShape();
            
            pop();
            
        },
    }
    return tree;        
}





function makeDistantTree (name,x, y , scrollFac , scale_) 
{
    
    
    dtree =
    {

        NAME: name,
        X : x,
        Y : y,
        SCROLL_FAC : scrollFac,
        SCALE: scale_, 
        
        draw: function()
        {
       
            push();
            let translateValueX = this.X- charLogics.scroll[0] * this.SCROLL_FAC;
            let translateValueY = this.Y ;
            translate(translateValueX,translateValueY);
            
            scale(this.SCALE);
            stroke(0);
            strokeWeight( 2 );
            fill(BrownC);
            beginShape();
            vertex( -6, 0    ); // -6, 4
            vertex( -3, -1   );
            vertex( -3, -10  ); // -3, -10 
            vertex( 2, -11   ); // 2, -11
            vertex( 2, -4    );
            vertex( 4, -2    );
            vertex( 1, 1     ); //1,3
            vertex( -1, 0    );
            endShape();
            strokeWeight( 1 );
            fill(ForestGreenC);
            beginShape();
            vertex( -13, -9  );
            vertex( -8, -24  );
            vertex( -14, -20 );
            vertex( -7, -36  );
            vertex( -13, -32 );
            vertex( -5, -50  );
            vertex( 1, -41  );
            vertex( -4, -41  );
            vertex( 3, -37   );
            vertex( -3, -33  );
            vertex( 8, -27   );
            vertex( -1, -23  );
            vertex( 11, -18  );
            vertex( 0, -17   );
            vertex( 9, -10   );
            vertex( -13, -9  );
            endShape();
            scale(1/this.scale);
            
            translate(-translateValueX,-translateValueY);
            pop();
        },

    }
    return dtree;
}

    
function makeDistantTree2 (name,x, y , scrollFac , scale_) 
{
    
    
    dtree2 =
    {

        NAME: name,
        X : x,
        Y : y,
        SCROLL_FAC : scrollFac,
        SCALE: scale_, 
        
        draw: function()
        {
            
            push();
            translate(this.X- charLogics.scroll[0] * this.SCROLL_FAC,this.Y);
            scale(this.SCALE);
            stroke(0);
            strokeWeight( 2 );
            fill(BrownC);
            beginShape();
            vertex( -2, -11  );
            vertex( -11, 1   );
            vertex( -3, 0    );
            vertex( 7, 2     );
            vertex( 6, -8    );
            vertex( 3, -18   );
            vertex( -5, -23  );
            vertex( -2, -11  );
            endShape();
            strokeWeight( 2 );
            fill(ForestGreenC);
            beginShape();
            vertex( 9, -16   );
            vertex( -16, -13 );
            vertex( -9, -31  );
            vertex( -17, -34 );
            vertex( -10, -45 );
            vertex( -21, -42 );
            vertex( -13, -56 );
            vertex( -21, -60 );
            vertex( -13, -68 );
            vertex( -11, -64 );
            vertex( -4, -63  );
            vertex( -11, -55 );
            vertex( -4, -56  );
            vertex( -6, -44  );
            vertex( 1, -48   );
            vertex( -5, -34  );
            vertex( 3, -37   );
            vertex( 1, -27   );
            vertex( 4, -30   );
            vertex( 9, -16   );
            endShape(); 
            pop();
        },    
    }  
    return dtree2; 
}



function makeHouse (name,x, y , scrollFac , scale_) 
{
    
    
    house =
    {

        NAME: name,
        X : x,
        Y : y,
        SCROLL_FAC : scrollFac,
        SCALE: scale_, 
        
        draw: function()
        {
            push();
            translate(this.X- charLogics.scroll[0] * this.SCROLL_FAC,this.Y);
            scale(this.SCALE);
            
            stroke (0);
            fill(YellowHouseC);
            strokeWeight( 2 );
            beginShape(); 
            
            
            
            vertex( -49, -29 );
            vertex( -51, 0 );
            vertex( -21, 10 );
            vertex( -21, -29 );
            vertex( -35, -52 );
            vertex( -54, -26 );
            vertex( -49, -29 );
            endShape();
            
            strokeWeight( 2 );
            beginShape();
            
            
            
            
            vertex( -21, -26 );
            vertex( 32, -40 );
            vertex( 39, -5 );
            vertex( -21, 8 );
            vertex( -21, -26 );
            endShape();
            
            fill(50);        
            strokeWeight( 2 );
            beginShape();
            
            
            
            vertex( -37, -53 );
            vertex( 17, -69 );
            vertex( 34, -39 );
            vertex( -22, -25 );
            vertex( -37, -53 );
            endShape();
            
            fill(BrownC);
            strokeWeight( 2 );
            beginShape();
            
            
            vertex( -4, 2 );
            vertex( -5, -21 );
            vertex( 5, -24 );
            vertex( 5, -1 );
            vertex( -4, 2 );
            endShape();
            
            fill(LightSkyBlueC);
            strokeWeight( 2 );
            beginShape();
            
            
            
            vertex( -42, -34 );
            vertex( -44, -16 );
            vertex( -33, -16 );
            vertex( -33, -35 );
            vertex( -42, -34 );
            endShape(); 
            stroke(255,0,0);
            strokeWeight(10);
            point(0,0)
            pop();
        },
    }
    return house;        
       
 
}


// 