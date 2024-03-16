var towerImg, tower;
var windowImg, window, windowsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.jpg");
  windowImg = loadImage("window.jpg");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost_standing.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 
  windowsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
 
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("a") || keyDown("left")){
      ghost.x = ghost.x - 3;
    }
   
    if(keyDown("d") || keyDown("right")){
      ghost.x = ghost.x + 3;
    }
   
    if(keyDown("space")|| keyDown("w")){
      ghost.velocityY = -10;
    }
   
    ghost.velocityY = ghost.velocityY + 0.8
   
    if(tower.y > 400){
      tower.y = 300
    }
    spawnwindows();

   
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
   
    drawSprites();
  }
 
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
    
  }

}

function spawnwindows() {
  //write code here to spawn the windows in the tower
  if (frameCount % 240 === 0) {
    var window = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
   
    window.x = Math.round(random(120,400));
    climber.x = window.x;
    invisibleBlock.x = window.x;
   
    window.addImage(windowImg);
    climber.addImage(climberImg);
   
    window.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
   
    ghost.depth = window.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    window.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

   
    //add each window to the group
    windowsGroup.add(window);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}