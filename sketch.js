var monkey, player_running;
var bgImage, bananaImage, obstacleImage;
var banana, obstacle, ground;
var obstacleGroup, bananaGroup;
var gameState = "start";
var score = 0;
var ground;
var count = 0

function preload() {
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bgImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  goimg = loadImage("gameover.png");
}

function setup() {
  createCanvas(400, 400);
  bg = createSprite(0, 0);
  bg.addImage(bgImage);
  bg.scale = 1.5;
  monkey = createSprite(50, 300);
  monkey.addAnimation("running", player_running)
  monkey.scale = 0.2;

  //monkey.debug=true;
  invig = createSprite(200, 350, 400, 10);
  invig.visible = false;
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

}

function draw() {
  background(0);

  if (gameState == "start") {
      bg.velocityX = -1;
      if (bg.x < 0) {
      bg.x = bg.width / 2
    }

    if (keyDown("space") && monkey.y >= 250) {
      monkey.velocityY = -14;
    }
    
    monkey.velocityY = monkey.velocityY + 0.7;
    
    if (monkey.isTouching(bananaGroup)) {
      score += 10;
      bananaGroup.destroyEach();
    }
    
    if (monkey.isTouching(obstacleGroup)) {
      score = score - 1
      count += 1;
      obstacleGroup.destroyEach();
      monkey.scale -= 0.1;
    }
    
    if (count == 2) {
      gameState = "end";
    }
    
    Banana();
    Obstacles();
    
    switch (score) {
      case 20:
        monkey.scale = 0.25;
        break;
      case 40:
        monkey.scale = 0.3;
        break;
      case 60:
        monkey.scale = 0.35;
        break;
      default:
        break;
    }
  } 
  
  else if (gameState == "end") {
    bg.velocityX = 0;
    monkey.scale = 0.1;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(2);
    bananaGroup.setLifetimeEach(2);
    var go = createSprite(200, 200);
    go.addImage(goimg);
  }
  
  drawSprites();

  stroke("black");
  fill("white");
  textSize(25);
  text("Score: " + score, 250, 90);

  monkey.collide(invig);

  fill("black");
  text(mouseX + "," + mouseY, mouseX, mouseY);
}

function Banana() {
  if (frameCount % 50 === 0) {
    var banana = createSprite(400, 60, 20, 20);
    banana.y = random(200, 300);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.05;
    bananaGroup.add(banana);
    //banana.debug=true;
  }
}

function Obstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(380, 345, 10, 40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.1;
    obstacle.lifetime = 210;
    obstacleGroup.add(obstacle);
    obstacle.addImage(obstacleImage);
    //obstacle.debug=true;
  }
}