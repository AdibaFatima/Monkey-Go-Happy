var PLAY = 1
var END = 0
var gameState = PLAY
var monkey , monkey_running, monkeyImg
var ground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0
var time = 0

function preload(){
  
  
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyImg = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(50, 490, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(300, 530, 1200, 10);
  ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("skyblue");
    
    food();
    obstacles();
    
    ground.velocityX = -6;
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(keyDown("space") ){
    monkey.velocityY = -12;
  }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    time = time + Math.round(getFrameRate()/60.5);
    
    if(foodGroup.isTouching(monkey)) {
    score = score + 1;
    foodGroup[0].destroy();
  }
  

    

  
  textSize(16);
  fill("black");
  text("Survival Time : " + time, 50, 50);
  text("Score : " + score, 50, 70);
  
  monkey.collide(ground);
  
  
    
  
  
  
  drawSprites();
}

function food() {
  if(frameCount % 80 === 0){
    banana = createSprite(600, Math.round(random(120, 400)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.12;
    banana.velocityX = -4
    
    banana.lifetime = 190;
    
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 300 === 0){
    obstacle = createSprite(600, 500, 10, 10);
    obstacle.velocityX = -6;
    obstacle.addImage("stone", obstacleImage);
    obstacle.scale = 0.15
    
    obstacle.lifetime = 140;
    
    obstacleGroup.add(obstacle);
  }
}

function restart() {
  gameState = PLAY;
}