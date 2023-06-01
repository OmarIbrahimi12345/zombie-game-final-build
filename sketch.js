/*
1. add background sound - refer pirates game or c7 games
2. a nice sweet alert game image and sound - feedback element
3. revise first 7 classes on code.org refering to class summary 

*/
var PLAY = 1;
var END  = 0;
var gameState = PLAY

var score =0;
var gun, monster, bigZombie, redbubble, bullet, backBoard, reload;

var gunImg, bubbleImg, bulletImg, blastImg, backBoardImg, bigZombieImg, reloadImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  monsterImg = loadImage("monster.png")
 redBubbleImg = loadImage("redBubble.png")
  bigZombieImg = loadImage("Big Zombie.png")
  backBoardImg = loadImage("back.jpg")
  reloadImg = loadImage("realod.png")
  gunShootSound = loadSound("gunshoot sound.mp3")
  loseSound = loadSound("Lose.mp3") 
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.1
  
  reload = createSprite(windowWidth/2, windowHeight/15);
  reload.addImage(reloadImg)
  reload.scale = 0.3
  
  
  bulletGroup = createGroup();   
  monsterGroup = createGroup(); 
  zombieGroup = createGroup();  
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backBoardImg);
 
  heading.style('color:red'); 
  heading.position(150,20)
  if(gameState === PLAY){
    
    
    heading.html("Life: "+life)
    scoreboard.html("Score: "+score)
    scoreboard.style('color:red'); 
    scoreboard.position(width-200,20)
  
    if(gameState===1){
      gun.y=mouseY  
  
      if (frameCount % 80 === 0) {
        drawMonster();
      }
  
      if(keyDown("space")){
        shootBullet();
      }
  
      if (monsterGroup.collide(gun)){
        handleGameover(monsterGroup);
      }
      
      if(monsterGroup.collide(bulletGroup)){
        handleBubbleCollision(monsterGroup);
      }
     
      if(zombieGroup.isTouching(bullet)){
        for(var i = 0; i<zombieGroup.length; i++){
          if(zombieGroup[i].isTouching(bullet)){
            zombieGroup[i].destroy();
          }
        }
      }
      
    }
    

    else if(gameState === END){
    reload.visible = true




    }
  
  }
   if(mousePressedOver(reload)){
    restart()
   }
  
    // enemy();
    drawSprites();
  }
    
  

function drawMonster(){
  monster = createSprite(width/2,random(height/2,570),40,40);
  monster.addImage(monsterImg);
  monster.scale = 0.2;
  console.log(monster.y);
  monster.velocityX = -8;
  monster.lifetime = 400;
  monsterGroup.add(monster);
}
// function drawredBubble(){
//   redbubble = createSprite(width-150,random(20,780),40,40);
//   redbubble.addImage(redBubbleImg);
//   redbubble.scale = 0.1;
//   redbubble.velocityX = -8;
//   redbubble.lifetime = 400;
//   redBubbleGroup.add(redbubble);
// }

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.05
  bullet.velocityX= 7
  bulletGroup.add(bullet)
  gunShootSound.play()
}

function restart(){
gameState = PLAY 
reload.visible = false
score = 0








}

function enemy(){
if(frameCount%50 === 0){
  bigZombie = createSprite(random(500,1100),random(100,500),40,40)
  bigZombie.addImage(bigZombieImg)
  bigZombie.scale = 0.5
  bigZombie.velocityX = -5
 
}
}

function handleBubbleCollision(monsterGroup){
    if (life > 0) {
       score=score+1;
    }

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    monsterGroup.destroyEach()
}

function handleGameover(monsterGroup){
  
    loseSound.play()

    life=life-1;
    monsterGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}