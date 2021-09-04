var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ObstaclesGroup 
var CloudsGroup 
var cloudImage
var c1,c2,c3,c4,c5,c6
//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart;
var gameOverImg,restartImg
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudImage= loadImage("cloud.png")
  c1=loadImage("obstacle1.png")
  c2=loadImage("obstacle2.png")
c3=loadImage("obstacle3.png")
  c4=loadImage("obstacle4.png")
c5=loadImage("obstacle5.png")
c6=loadImage("obstacle6.png")
  gameOverImg= loadImage("gameOver.png")
  restartImg= loadImage("restart.png")

}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
   ObstaclesGroup = createGroup();
 CloudsGroup = createGroup();
   gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(restartImg)
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(255);
  if(gameState===PLAY){
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnclouds()
  spawncactus()
     if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
       }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided)
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
   if(mousePressedOver(restart)){
      reset()
  }
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running)
  
 score=0;
  
}
function spawnclouds() {
  //write code here to spawn the clouds
if ( frameCount % 80 === 0 ) {
  var cloud = createSprite(556,40,25,30)
  cloud.velocityX=-6
  cloud.addImage("cloud",cloudImage)
  cloud.y=random(40,100)
  cloud.scale=0.6
  cloud.lifetime=100
  CloudsGroup.add(cloud)
}
}
function spawncactus(){
  if (frameCount% 80 === 0){
    var cactus = createSprite(556,160,25,30)
    cactus.velocityX=-5

    var n=Math.round(random(1,6))
    
    if (n===1){
      cactus.addImage("cactus1",c1);
      
    }
    else if (n===2){
      cactus.addImage("cactus2",c2);
    }
     else if (n===3){
      cactus.addImage("cactus3",c3);
    }
     else if (n===4){
      cactus.addImage("cactus4",c4);
    }
     else if (n===5){
      cactus.addImage("cactus5",c5);
     }
     else if (n===6){
      cactus.addImage("cactus6",c6);
    }
    cactus.scale=0.4
    
    cactus.lifetime=100
    ObstaclesGroup.add (cactus)
     }
  
}

