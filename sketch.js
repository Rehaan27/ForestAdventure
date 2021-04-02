var hunter, hunterImg;
var tiger, tigerImg;
var bgImg, bg, ground;
var dragon, dragonImg;
var dragonGroup, tigerGroup, bulletImg, bullet, bulletGroup, tigerEnd, EndBg;

function preload(){
hunterImg = loadAnimation("man1.png", "man2.png", "MAN3.PNG", "MAN4.PNG");
bgImg = loadImage("forest.jpg");
tigerImg = loadAnimation("tiger.png","tiger2.png","tiger3.png","tiger4.png");
dragonImg = loadAnimation("dragon1.png","dragon2.png","dragon3.png");
bulletImg = loadImage("bullet.png");
tigerEnd = loadAnimation("tiger4.png");
}

function setup(){
createCanvas(1000, 550);

bg = createSprite(600 , 200, 2400, 800);
bg.addImage(bgImg);
bg.velocityX = -2;
bg.scale = 2;

hunter = createSprite(50, 450, 50, 60);
hunter.addAnimation("walking",hunterImg);
hunter.scale = 0.5;

EndBg = createSprite(500,275,1000,550);
EndBg.visible = false;

dragonGroup = new Group();
tigerGroup = new Group();
bulletGroup = new Group();
}

function draw(){
background("white");

if(bg.x<300){
    bg.x = 600;
}

spawnTigers();
spawnDragon();

if(keyDown("space")&& frameCount%5===0) {
    fill("yellow");
    bullet = createSprite(hunter.x+60, hunter.y+5);
    bullet.depth = hunter.depth-1 ;
    bullet.velocityX = 5;
    bullet.addImage(bulletImg);
    bullet.scale = 0.2;
    bulletGroup.add(bullet);
}

if(bulletGroup.isTouching(tigerGroup)){
    tigerGroup.destroyEach();
    bulletGroup.destroyEach();
}


if(tigerGroup.isTouching(hunter)){
    EndBg.visible = true;
}

drawSprites();
}

function spawnTigers(){
    if(frameCount%150===0){
    tiger = createSprite(900, 450, 100, 60);
    tiger.addAnimation("catching",tigerImg);
    tiger.velocityX = -5;
    tiger.scale = 0.8;
   
    EndBg.depth = tiger.depth+2;

    tigerGroup.add(tiger);
    }
}

function spawnDragon(){
    if(frameCount%1000===0){
    dragon = createSprite(900, 100, 100, 60);
    dragon.addAnimation("catching",dragonImg);
    dragon.velocityX = -5;
    dragon.scale = 0.8;
    dragonGroup.add(dragon);
    dragonGroup.lifeTime = 180;
    EndBg.depth = dragon.depth+2;

    }
}