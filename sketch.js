var retry
var rex
var ground
var invisibleGround
var cloud
var score=0
var cactusGroup
var cloudGroup
var gamestate="play" 
var trex
var gameover
var check,jump,die
var message="shiven"

function preload(){
  
 rexrunning=loadAnimation("trex1.png","trex3.png",
"trex4.png" )
  
  trex=loadAnimation("trex_collided.png")
  
  cactus1=loadImage("obstacle1.png")
   cactus2=loadImage("obstacle2.png")
   cactus3=loadImage("obstacle3.png")
   cactus4=loadImage("obstacle4.png")
   cactus5=loadImage("obstacle5.png")
   cactus6=loadImage("obstacle6.png")
  
  r=loadImage("restart.png")
  g=loadImage("gameOver.png")
  groundrunning=loadImage("ground2.png")
  
  cloudrunning=loadImage("cloud.png")
  
  check=loadSound("checkPoint.mp3")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  
}
//preload end
function setup(){ 
  
 createCanvas(600,400)
//                          creating sprites
  rex=createSprite(50,380,20,50)
  ground=createSprite(300,380,600,10)
  invisibleGround=createSprite(300,390,600,10)
  retry=createSprite(300,150,20,20)
gameover=createSprite(300,100,20,20)
  
  //adding animation and image to the sprites
 rex.addAnimation("running",rexrunning )
  rex.addAnimation("abcd".trex)
   ground.addImage(groundrunning )
retry.addImage(r)
  gameover.addImage(g)
  
  
  //reducing the size of trex
  rex.scale=0.60
  edges=createEdgeSprites();
   
  invisibleGround.visible=false
  
 cactusGroup=new Group();
 cloudGroup=new Group();

  rex.setCollider("rectangle",0,0,65,rex.height )
  
  rex.debug=false
  
 
 
  
  
}
//                 funtion setup ends here
function draw(){
  background("white")
  rex.collide(invisibleGround)
   text("score-"+score,500,50)
  
 console.log(message)
  
  if(gamestate=="play"){
 //to make trex jump 
  if(keyDown("space")&&rex.y>=349){
    
 rex.velocityY=-13.5
    
 jump.play();  
  }
  
  //gravity  
  rex.velocityY=rex.velocityY+0.6
    
  
  
ground.velocityX=-6 
  
  //infinite ground 
  if(ground.x<0){
  ground.x=300
  
  }
  
  obs();

  cloudmaking();
  score=score+Math.round(getFrameRate()/60)

if(rex.isTouching(cactusGroup)){
  
gamestate="end"
  
  die.play();
}    
  retry.visible=false
    gameover.visible=false
  }//                       end of play state
  
 else if(gamestate=="end"){
   
ground.velocityX=0
   
rex.changeAnimation("abcd",trex) 
   
rex.velocityY=0
   
cactusGroup.setVelocityXEach(0)
cloudGroup.setVelocityXEach(0)   
   
 retry.visible=true
   gameover.visible=true
   
   if(mousePressedOver(retry)){
    reset();
    
    
  }
 } //                             end of end
  
  if(score%100==0 && score>0){ 
   
    check.play();
  }
    
  
  
  drawSprites(); 
  
}

//                                 end of function draw

function cloudmaking(){

if(frameCount%30==0){
  
var rand=Math.round(random(1,50))
cloud=createSprite(700,rand,20,10)

cloud.velocityX=-7
  
  
  cloud.addImage(cloudrunning )
  
  
 cloud.scale=0.80
  
  
//  console.log(cloud.depth)
  
  rex.depth=cloud.depth+1
  
  cloudGroup.add(cloud)
  
  cloudGroup.setLifetimeEach(-1)
  
  
  
}
  
  

}
//cloud end here
function obs(){

  if(frameCount%80==0){
var cactus= createSprite(650,355,10,40)

cactus.velocityX=-6-3*score/100
var rand1=Math.round(random(1,6))
switch(rand1){
  case 1:cactus.addImage(cactus1)
break
case 2: cactus.addImage(cactus2)
break
case 3  :   cactus.addImage(cactus3)
break
case 4:cactus.addImage(cactus4)
break
case 5:cactus.addImage(cactus5)
    break
    case 6:cactus.addImage(cactus6)
    break
    default:break
}//                end of switch
    
 cactus.scale=0.80 
  
 cactusGroup.add(cactus)   
    cactusGroup.setLifetimeEach(-1)
}//               end of if
  }      //                      end of obs
  
function reset(){
  


retry.visible=true
  gameover.visible=true
  
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  gamestate="play"
  score=0
}
  