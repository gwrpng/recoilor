

var Engine = Matter.Engine;
var Bodies = Matter.Bodies;
var World = Matter.World;
var Runner = Matter.Runner;
var Body = Matter.Body;
var Vector = Matter.Vector;
var Vertices = Matter.Vertices;
var Common = Matter.Common;

Common.getDecomp()






var playerColor1='#45BFBF'
var playerColor2='#F2AE2E'
var backgroundColor='#B01ED9'
var arenaColor='#8717A6'
var bulletsColor1;
var bulletsColor2;
var obj;
let myFont;
let shape;


var engine;
var world;
var runner;

let bullets1= [];
let bullets2= [];
let player1;
let player2;
let shootingForce;
  

var gameState;
var playerScore1;
var playerScore2;


var playerOptions1 = {
  friction: 0.3,
  restitution: 0.6,
  collisionFilter: {
    category: 0x0001,
    mask: 0x0002},
    density:0.0001,

};

var playerOptions2 = {
  friction: 0.3,
  restitution: 0.6,
  collisionFilter: {
    category: 0x0002,
    mask:0x0001},
  density:0.0001,
};

var bulletsOptions1={

  frictionAir: 0,
  restitution: 0.6,
  
  collisionFilter: {
      category: 0x0001,
      mask:0x0002},
  density:0.001,
}

var bulletsOptions2={
  frictionAir: 0,
  restitution: 0.6,
  collisionFilter: {
      category: 0x0002,
      mask:0x0001},
  density:0.001,
}


function preload(){
  myFont = loadFont("assets/ISL_Andvari/andvari.ttf")
  


}


function setup() {
  Common.setDecomp(decomp);
  playerScore1=0;
  playerScore2=0;
  currentRound=0;
  
  

  gameState= "load"

  textAlign(CENTER, CENTER)
  textFont(myFont)
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  
  imageMode(CENTER)
  engine = Engine.create();
  runner = Runner.create();
  world = engine.world;
  Matter.Runner.run(engine)

  engine.gravity.y = 0;
  shootingForce = createVector(0,-0.004);
  
}


function draw() {
  if(gameState=="load"){
    loadScreen()
  } else if (gameState=="start"){
    startScreen()  
  } else if (gameState=="game"){
    game()
  } else if (gameState=="end"){
    endScreen()
  } else{
    print("no game state")
  }
}

function game(){
  background(backgroundColor);
  noStroke()
  fill(playerColor1);
  if(playerScore1>=1){
    rect(width*0.75,height*0.05,width/2,height*0.1)
  }
  if(playerScore1>=2){
    rect(width*0.75,height*0.95,width/2,height*0.1)
  }
  if(playerScore1>=3){
    rect(width*0.95,height/2,width*0.1,height)
  }
  
  fill(playerColor2);
  if(playerScore2>=1){
    rect(width*0.25,height*0.05,width/2,height*0.1)
  }
  if(playerScore2>=2){
    rect(width*0.25,height*0.95,width/2,height*0.1)
  }
  if(playerScore2>=3){
    rect(width*0.05,height/2,width*0.1,height)
  }
  
  
  
  noFill()
  stroke("white")
  strokeWeight(1);
  textSize(10)
  
  strokeWeight(10);
  stroke(arenaColor);
  rect(width/2,height/2,width*0.8,height*0.8)


  strokeWeight(1)
  fill(arenaColor)
  textSize(30)
  text(playerScore1,width/3,height*0.05)
  text(playerScore2,width*2/3,height*0.05)
  text(":",width/2+3 ,height*0.05)


  
  noFill()
  if(keyIsDown(68)){
    Body.rotate(player1.body,0.07)
  }

  if(keyIsDown(65)){
    Body.rotate(player1.body,-0.07)
  }
   
  if(keyIsDown(LEFT_ARROW)){
    Body.rotate(player2.body,-0.07)
  }

  if(keyIsDown(RIGHT_ARROW)){
    Body.rotate(player2.body,0.07)
  }
  
  

  player1.show()
  player2.show()
  for(let i = 0; i<bullets1.length;i++){
    bullets1[i].show()
    if(outOfBounds(bullets1[i])){
      bullets1.splice(i,1);
      i--;
    }
  }

  for(let i = 0; i<bullets2.length;i++){
    bullets2[i].show()
    if(outOfBounds(bullets2[i])){
      bullets2.splice(i,1);
      i--;
    }
  }

  if(outOfBounds(player1)){
    Body.setPosition(player1.body,{x:width/3, y:height/2})
    Body.setAngle(player1.body,0)
    Body.setAngularVelocity(player1.body,0)
    Body.setVelocity(player1.body,{x:0,y:0})
    Body.setPosition(player2.body,{x:width*2/3, y:height/2})
    Body.setAngle(player2.body,0)
    Body.setAngularVelocity(player2.body,0)
    Body.setVelocity(player2.body,{x:0,y:0})
    bullets1=[]
    bullets2=[]

    playerScore2++;
    currentRound++;
  }
  if(outOfBounds(player2)){
    Body.setPosition(player1.body,{x:width/3, y:height/2})
    Body.setAngle(player1.body,0)
    Body.setAngularVelocity(player1.body,0)
    Body.setVelocity(player1.body,{x:0,y:0})
    Body.setPosition(player2.body,{x:width*2/3, y:height/2})
    Body.setAngle(player2.body,0)
    Body.setAngularVelocity(player2.body,0)
    Body.setVelocity(player2.body,{x:0,y:0})
    bullets1=[]
    bullets2=[]

    playerScore1++;
    currentRound++;
  }
 
  


  if (playerScore1==4 || playerScore2==4) {
    gameState="end"
  }
}

function loadScreen(){
  
  fill(255)
  //text("loading",width*0.2,height*0.1)
  
  
  gameState = "start"
  bulletsColor1 = playerColor1
  bulletsColor2 = playerColor2
  
  
  player1= new Player(width/3, height/2, 45, playerOptions1, playerColor1)
  player2= new Player(width*2/3, height/2, 45, playerOptions2, playerColor2)
}

function startScreen(){
  background(backgroundColor)
  fill(playerColor1)
  textSize(90)
  text("RECOILOR",width/2,height*0.25);
  fill(playerColor2)
  textSize(20);
  text("1.", width/2,height*0.05)
  push()
  translate(width*0.95,height/2)
  rotate(HALF_PI)
  text("2.", 0,0)
  pop()
  push()
  translate(width/2,height*0.95)
  text("3.", 0,0)
  pop()
  push()
  translate(width*0.05,height/2)
  rotate(-HALF_PI)
  text("4.", 0,0)
  pop()
  
  text("use A,D / left,right to rotate", width/2, height*0.45)
  text("use w / up to shoot", width/2, height*0.5)
  text("push your oponent out of arena", width/2, height*0.55)


  fill(arenaColor)
  textSize(30)
  text("press SPACE to start the game", width/2, height*0.85)
  if(keyIsDown(32)){
    gameState="game"
  }
}

function endScreen(){
  background(backgroundColor)
  fill(playerColor1)
  noStroke();
  textSize(70)
  if(playerScore1>playerScore2){
    fill(playerColor1)
    text("Player 1 Won", width/2, height*0.35)
  } else{
    fill(playerColor2)
    text("Player 2 Won", width/2, height*0.35)
  }

  textSize(30)
  text("Press ENTER to play again", width/2, height*0.7)
  if(keyIsDown(13)){
    playerScore1=0;
    playerScore2=0;
    gameState="start"
  }
}



function keyPressed(){
  if (keyCode === 87 && gameState == "game"){
    
    bullets1.push(new Bullet(player1.body.position.x, player1.body.position.y, 10, bulletsOptions1, bulletsColor1))

    Body.applyForce(bullets1[bullets1.length-1].body, {x:bullets1[bullets1.length-1].body.position.x, y:bullets1[bullets1.length-1].body.position.y}, Vector.rotate(shootingForce,player1.body.angle))
    Body.applyForce(player1.body, {x:player1.body.position.x, y:player1.body.position.y}, Vector.mult(Vector.rotate(shootingForce,player1.body.angle),-0.4))
  }

  if (keyCode === 38 && gameState == "game"){
    
    bullets2.push(new Bullet(player2.body.position.x, player2.body.position.y, 10, bulletsOptions2, bulletsColor2))

    Body.applyForce(bullets2[bullets2.length-1].body, {x:bullets2[bullets2.length-1].body.position.x, y:bullets2[bullets2.length-1].body.position.y}, Vector.rotate(shootingForce,player2.body.angle))
    Body.applyForce(player2.body, {x:player2.body.position.x, y:player2.body.position.y}, Vector.mult(Vector.rotate(shootingForce,player2.body.angle),-0.4))
  }

  if (keyCode === 49 && gameState == "start"){
    playerColor1='#45BFBF'
    playerColor2='#F2AE2E'
    backgroundColor='#B01ED9'
    arenaColor='#8717A6'

    
    
    player1 = undefined
    player2 = undefined
    preload()
    gameState = "load"
  }
  
  if (keyCode === 50 && gameState == "start"){
    playerColor1='#9AEBA3'
    playerColor2='#45C4B0'
    backgroundColor='#012030'
    arenaColor='#13678A'
    
    
    player1 = undefined
    player2 = undefined
    preload()
    gameState = "load"
  }
  
  if (keyCode === 51 && gameState == "start"){
    playerColor1='#41D91E'
    playerColor2='#C2D914'
    backgroundColor='#F22E62'
    arenaColor='#F2CC0C'
    
    player1 = undefined
    player2 = undefined
    preload()
    gameState = "load"
  }
  
  if (keyCode === 52 && gameState == "start"){
    playerColor1='#F28729'
    playerColor2='#68A683'
    backgroundColor='#BBF2D8'
    arenaColor='#194159'
    
    
    player1 = undefined
    player2 = undefined
    preload()
    gameState = "load"
  }



}

function outOfBounds(object){
  if (object.body.position.x > width*0.9 || object.body.position.x < width*0.1 ||
      object.body.position.y > height*0.9 || object.body.position.y < height*0.1){
    return true
  }
}


