
/*
Tree Sprites
Copyright 2013
Michelle Carlin and Matthew Carlin

Redistribute as you see fit.

This file contains the entire js source code for the game Tree Sprites.
*/


//
// Art files
//

//Letter and number art

letters = ["a", "b", "c", "d", "e", "f",
           "g", "h", "i", "j", "k", "l",
           "m", "n", "o", "p", "q", "r",
           "s", "t", "u", "v", "w", "x",
           "y", "z", "0", "1", "2", "3",
           "4", "5", "6", "7", "8", "9",
           "(", ")"];

LetterSprite = [];
for(var i = 0; i < letters.length; i++)
{
  LetterSprite[letters[i]] = new Image();
  LetterSprite[letters[i]].src = "Letters/" + letters[i].toUpperCase() + ".png";
}        

//Background art

SkyBackground = new Image();
SkyBackground.src = "Art/Sky.png";
GreenMountainsBackground = new Image();
GreenMountainsBackground.src = "Art/GreenMountainsBackground.png";
MountainBackground = new Image();
MountainBackground.src = "Art/MountainBackground.png";
TopMountainBackground = new Image();
TopMountainBackground.src = "Art/TopMountainBackground.png";
TreeBackground = new Image();
TreeBackground.src = "Art/TreeBackground.png";
GrassBackground = new Image();
GrassBackground.src = "Art/GrassBackground.png";

//Player art
PlayerSprite = new Image();
PlayerSprite.src = "Art/TreeSprite.png";
PlayerSpriteFlip = new Image();
PlayerSpriteFlip.src = "Art/TreeSpriteFlip.png";
PlayerSpriteWalk1 = new Image();
PlayerSpriteWalk1.src = "Art/TreeSpriteWalk1.png";
PlayerSpriteWalk1Flip = new Image();
PlayerSpriteWalk1Flip.src = "Art/TreeSpriteWalk1Flip.png";
PlayerSpriteWalk2 = new Image();
PlayerSpriteWalk2.src = "Art/TreeSpriteWalk2.png";
PlayerSpriteWalk2Flip = new Image();
PlayerSpriteWalk2Flip.src = "Art/TreeSpriteWalk2Flip.png";
PlayerSpriteJump1 = new Image();
PlayerSpriteJump1.src = "Art/TreeSpriteJump1.png";
PlayerSpriteJump1Flip = new Image();
PlayerSpriteJump1Flip.src = "Art/TreeSpriteJump1Flip.png";
PlayerSpriteJump2 = new Image();
PlayerSpriteJump2.src = "Art/TreeSpriteJump2.png";
PlayerSpriteJump2Flip = new Image();
PlayerSpriteJump2Flip.src = "Art/TreeSpriteJump2Flip.png";
PlayerSpriteFall = new Image();
PlayerSpriteFall.src = "Art/TreeSpriteFall.png";
PlayerSpriteFallFlip = new Image();
PlayerSpriteFallFlip.src = "Art/TreeSpriteFallFlip.png";
PlayerSpriteGameOver = new Image();
PlayerSpriteGameOver.src = "Art/TreeSpriteGameOver.png";

//Flower art
BouncyFlower = new Image();
BouncyFlower.src = "Art/BouncyFlower.png";
VictoryFlower = new Image();
VictoryFlower.src = "Art/VictoryFlower.png";
DeadFlower = new Image();
DeadFlower.src = "Art/DeadFlower.png";

//Cloud art
CloudSprite = new Image();
CloudSprite.src = "Art/Cloud.png";
CloudBouncedSprite = new Image();
CloudBouncedSprite.src = "Art/CloudBounced.png";
WaterDropSprite = new Image();
WaterDropSprite.src = "Art/WaterDrop.png";
WaterDropBurstSprite = new Image();
WaterDropBurstSprite.src = "Art/WaterBurst.png";

//Button/menu art
SoundOnSprite = new Image();
SoundOnSprite.src = "Art/SoundOn.png";
SoundOffSprite = new Image();
SoundOffSprite.src = "Art/SoundOff.png";
CreditsSprite = new Image();
CreditsSprite.src = "Art/Credits.png";
CreditLeafSprite = new Image();
CreditLeafSprite.src = "Art/CreditLeaf.png";
CloseSprite = new Image();
CloseSprite.src = "Art/Close.png";
InfoButtonSprite = new Image();
InfoButtonSprite.src = "Art/InfoButton.png";
ParchmentBackgroundSprite = new Image();
ParchmentBackgroundSprite.src = "Art/ParchmentBackground.png";
BlackBackground = new Image();
BlackBackground.src = "Art/BlackBackground.png";
GameOver = new Image();
GameOver.src = "Art/GameOver.png";
Retry = new Image();
Retry.src = "Art/Retry.png";
PlayAgain = new Image();
PlayAgain.src = "Art/PlayAgain.png";
Victory = new Image();
Victory.src = "Art/YouWin.png";
PressEnter = new Image();
PressEnter.src = "Art/PressEnter.png";


// 
// Game variables
//
var scrollHeight;

var player_x;
var player_y;
var player_vx;
var player_vy;

var currentFrame;
var menuTimer;
var gameOver;
var gameVictory;

var leftkeydown;
var rightkeydown;
var spacekeydown;

var credits_on

var leftKeyPressed;

var sound_on = true;
var credits_on;
var music = null;
var instruct_on;
var first_time;

var cloudList; 
var cloudReached; 
var waterDropCount;

gameWidth = 900;
gameHeight = 600;

var context;

//
// initialize: called from html. This sets up the canvas and input events,
//             initializes the game variables, and sets update to run 40
//             times a second.
//

function initialize()
{
  $('img').bind('dragstart', function(event) { event.preventDefault(); });
  
  canvas = document.getElementById('canvas');

  canvas.width = gameWidth;
  canvas.height = gameHeight;
  var pos = findPos(canvas);
  canvas.left = pos[0];
  canvas.top = pos[1];

  context = canvas.getContext('2d');

  window.onkeydown = KeyDown;
  window.onkeyup = KeyUp;
  // window.onkeypress = KeyPress;
  window.onclick = Click;

  initializeGame();

  instruct_on = true;

  drawGame();

  setInterval(update,40);

  canvas.style.visibility = 'visible';
  var loadingdiv = document.getElementById('loadingdiv');
  loadingdiv.style.visibility = 'hidden';
}

//
// initializeGame: reset the game vars; cloud placement, player position, menu choice, etc.
//
function initializeGame()
{
  scrollHeight = 0;
  leftkeydown = false;
  rightkeydown = false;
  spacekeydown = false;

  menuTimer = 60;
  gameOver = false;
  gameVictory = false;

  leftKeyPressed = false;
  cloudReached = false;
  waterDropCount = 0;

  cloudList = [];
  cloudList.push([310, 0, false]);
  for(var i = 0; i < 14; i++) {
    margin = 150;
    cloud_x = margin + Math.floor(Math.random() * (900 - 2 * margin)) - 80;
      // 900 total range - 100 margin on each side - 80 to compensate for cloud length
      // (gauging cloud drawing from lefthand edge)
    cloud_y = (-300 * i) - 300 + Math.floor(Math.random() * 50); 
      // set distance between each cloud + starting height above initial cloud + 
      //   randomized distance of 50 pixels
    cloudList.push([cloud_x, cloud_y, false]);
      // append random clouds within specified x/y range to cloud list
  }

  player_x = 550;
  player_y = 420;

  player_vx = 0;
  player_vy = 0;

  credits_on = false;


  if(sound_on)
  {
    music = new Audio("Sound/Celtic Music - Fairy Forest.ogg");
    music.play();
  }
}

//
// update: called 40 times a second. this is the main game loop. it calls draw.
//
function update()
{
  menuTimer -= 1; 

  if (instruct_on == false) {
    playerFeet_x = player_x + 41;
    playerFeet_y = player_y + 107;
    // Cloud hit detection
    for(var i = 0; i < cloudList.length; i++) {
      if (playerFeet_x < cloudList[i][0] || playerFeet_x > cloudList[i][0] + 159) {
        continue;
      }
      // testing for playersprite within x boundaries of cloud (+159 = cloud width)
      if (playerFeet_y < cloudList[i][1] + 20 && playerFeet_y + player_vy > cloudList[i][1] + 20 &&
                      cloudList[i][2] == false) {
      // +20 = width of cloud "platform" (imaginary cloud midpoint)
        // player_vy = -0.8 * player_vy - 50;
        player_vy = -60;
        // -60 gives him extra jump power (y boost)
        player_y = cloudList[i][1] + 20 - 107 - player_vy;
        // -107 compensates for using actual player_y rather than playerFeet_y
        // -player_vy stops him on the cloud for frame
        cloudList[i][2] = true;
        cloudReached = true;
        waterDropCount += 1;
      }
      // context.drawImage(CloudSprite, cloudList[i][0], cloudList[i][1] + scrollHeight, 159, 81);
    }

    //Flower hit detection
    if (gameOver == false) {
      if (playerFeet_x > 335 && playerFeet_x < 335 + 110 && player_y >= 420) {
        player_vy = -60;
      }
    }

    // Horizontal position update
    player_x += player_vx;
    if (player_x > 836) {
      player_vx = 0;
      player_x = 836;
      // 836 = (background width (900) - PlayerSprite width (84)) + transparent margin (20)
    }
    else if (player_x < -20) {
      player_vx = 0;
      player_x = -20;
      // -20 = transparent margin
    }

    // Vertical position update
    player_y += player_vy;
    if (player_y > 420){
      player_vy = 0;
      // player_vy = -0.8 * player_vy;
      player_y = 420;
    }

    // vertical velocity update
    player_vy += 3.5;

    // Ground velocity/conserved speed
    if (player_y >= 420) {
      if (leftkeydown == true){
        // horizontal velocity update left
       player_vx -= 2;
       leftKeyPressed = true; 
      }
      if (rightkeydown == true){
        //horizontal velocity update right
        player_vx += 2;
        leftKeyPressed = false
      }
      // conserved speed (percentage) update
      player_vx *= .7;
    }
    // Air velocity/conserved speed
    else if (player_y < 420) {
      if (leftkeydown == true){
      // horizontal velocity update left
       player_vx -= 5;
       leftKeyPressed = true;
      }
      if (rightkeydown == true){
        //horizontal velocity update right
        player_vx += 5;
        leftKeyPressed = false;
      }
      // conserved speed (percentage) update
      player_vx *= .8;
    }


    //scrolling update
    if (player_y < 250) {
      scrollHeight = 250 - player_y;
      if (scrollHeight >= 5600) {
        scrollHeight = 5600;
      }
    }
    else if (player_y >= 250) {
      scrollHeight = 0;
    }

    // Frame count update
    if (leftkeydown == true || rightkeydown == true) {
      currentFrame += 1;
    }
    else {
      currentFrame = 0;
    }

    if (waterDropCount >= 1 && player_y > 320 && gameVictory != true && gameOver != true) {
      gameOver = true;
      menuTimer = 60;
    } 

    if (waterDropCount == 15 && gameOver != true && gameVictory != true) {
      gameVictory = true;
      menuTimer = 60;
    }

    //play sounds!!

    if (sound_on) {
      if (cloudReached == true) {
        sound = new Audio("Sound/OOT_Steps_ShallowWater1.wav");
        sound.play();
      }
      //Water drop burst sound effect

      if (gameOver == true) {
        if (menuTimer <= 40 && menuTimer > 0){
          proportion = (menuTimer) / 40.0;
          music.volume = proportion;
        }
        if (menuTimer == 0) {
          music.pause;
          music = new Audio("Sound/Zelda Wind Waker - Medli's Prayer.ogg");
          music.play();
        }
      }
      // Game Over music

      if (gameVictory == true) {
        if (menuTimer <= 40 && menuTimer > 0){
          proportion = (menuTimer) / 40.0;
          music.volume = proportion;
        }
        if (menuTimer == 0) {
          music.pause;
          music = new Audio("Sound/Irish tavern music.ogg");
          music.play();
        }
      }
      // Victory music!

    }
  }


  drawGame();
}

//
// drawWord: helper function to print a word at coords x,y with given size.
//
function drawWord(word, x, y, size)
{
  word = word.toLowerCase();
  left = 0;
  for(var i = 0; i < word.length; i++)
  {
    character = word[i];
    if(character != " ")
    {
      context.drawImage(LetterSprite[character], x + left, y, size, size);
    }
    left += size * 0.65;
  }
}

//
// drawPlayer: draws all animations of PlayerSprite
//

function drawPlayer()
{

  //PlayerSprite height = 430 pixels
  // playerSprite feet 41, 107 

  // PlayerSprite on ground
  if (player_y > 320) {
  
    if (leftkeydown == false && rightkeydown == false && leftKeyPressed == false) {
      //draw Player Sprite right facing
      context.drawImage(PlayerSprite, player_x, player_y + scrollHeight, 84, 110);
    }
    else if (leftkeydown == false && rightkeydown == false && leftKeyPressed == true) {
      //draw Player Sprite left facing
      context.drawImage(PlayerSpriteFlip, player_x, player_y + scrollHeight, 84, 110);
    }
    else {
      if ((currentFrame % 8) <= 3) {
          if (rightkeydown == true) {
            context.drawImage(PlayerSpriteWalk1, player_x, player_y + scrollHeight, 84, 110);
           } 
          else if (leftkeydown == true) {
            context.drawImage(PlayerSpriteWalk1Flip, player_x, player_y + scrollHeight, 84, 110);
          }
      }
      else {
          if (rightkeydown == true) {
            context.drawImage(PlayerSpriteWalk2, player_x, player_y + scrollHeight, 84, 110);
           } 
          else if (leftkeydown == true) {
            context.drawImage(PlayerSpriteWalk2Flip, player_x, player_y + scrollHeight, 84, 110);
          }
      }
    }
  }
  // PlayerSprite in air
  else if (player_y <= 320) {
    if (cloudReached == true) {
      if (leftKeyPressed == false) {
        context.drawImage(PlayerSpriteJump1, player_x, player_y + scrollHeight, 84, 110);
        // // draw water burst
        // xShake = -20 + Math.floor(Math.random() * 41); 
        // yShake = -20 + Math.floor(Math.random() * 41); 
        // context.drawImage(WaterDropBurstSprite, player_x + xShake, player_y + yShake + 40, 54, 54);

        // xShake = -20 + Math.floor(Math.random() * 41); 
        // yShake = -20 + Math.floor(Math.random() * 41); 
        // context.drawImage(WaterDropBurstSprite, player_x + xShake, player_y + yShake + 40, 54, 54);

        // xShake = -20 + Math.floor(Math.random() * 41); 
        // yShake = -20 + Math.floor(Math.random() * 41); 
        // context.drawImage(WaterDropBurstSprite, player_x + xShake, player_y + yShake + 40, 54, 54);
        // //+40 lowers water drop bursts to center of player sprite

        cloudReached = false;
        }          
      else if (leftKeyPressed == true) {
        context.drawImage(PlayerSpriteJump1Flip, player_x, player_y + scrollHeight, 84, 110);
        // // draw water burst
        // xShake = -20 + Math.floor(Math.random() * 41); 
        // yShake = -20 + Math.floor(Math.random() * 41); 
        // context.drawImage(WaterDropBurstSprite, player_x + xShake, player_y + yShake + 40, 54, 54);

        // xShake = -20 + Math.floor(Math.random() * 41); 
        // yShake = -20 + Math.floor(Math.random() * 41); 
        // context.drawImage(WaterDropBurstSprite, player_x+ xShake, player_y + yShake + 40, 54, 54);

        // xShake = -20 + Math.floor(Math.random() * 41); 
        // yShake = -20 + Math.floor(Math.random() * 41); 
        // context.drawImage(WaterDropBurstSprite, player_x + xShake, player_y + yShake + 40, 54, 54);
        // //+40 lowers water drop bursts to center of player sprite

        cloudReached = false;
      }
    }
    else if (player_vy < 0) {        
      if (leftKeyPressed == false) {
        context.drawImage(PlayerSpriteJump2, player_x, player_y + scrollHeight, 84, 110);
        cloudReached = false;
      } 
      else if (leftKeyPressed == true) {
        context.drawImage(PlayerSpriteJump2Flip, player_x, player_y + scrollHeight, 84, 110);
        cloudReached = false;
      }
    }
    else {
      if (leftKeyPressed == false) {
        context.drawImage(PlayerSpriteFall, player_x, player_y + scrollHeight, 84, 110);
        cloudReached = false;
      } 
      else if (leftKeyPressed == true) {
        context.drawImage(PlayerSpriteFallFlip, player_x, player_y + scrollHeight, 84, 110);
        cloudReached = false;
      }
    }
  }
}


//
// drawClouds: draws all animations clouds, water drops, and drop counter
//
function drawClouds()
{
  // draw start cloud + random clouds
  for(var i = 0; i < cloudList.length; i++) {
    if (cloudReached == true){
      context.drawImage(CloudBouncedSprite, cloudList[i][0], cloudList[i][1] + scrollHeight, 
          159, 81);
    }
    else {
    context.drawImage(CloudSprite, cloudList[i][0], cloudList[i][1] + scrollHeight, 159, 81);
    }
  }

  // draw water in clouds
  for(var i = 0; i < cloudList.length; i++) {
    if (cloudList[i][2] == false){
      context.drawImage(WaterDropSprite, cloudList[i][0] + 60, (cloudList[i][1] + 20) 
                  + scrollHeight, 30, 40);
    }
  }
  // (+60) and (+20) center water drop on cloud 

  drawWord("Drops " + waterDropCount, 10, 10, 30);
}


//
// drawGame: draws background pieces and calls all other draw functions
//
function drawGame()
{
  // clear the screen
  context.clearRect(0,0,canvas.width,canvas.height);

  // draw sky 
  context.drawImage(SkyBackground, 0, -1400 + scrollHeight * 0.25, 900, 2000);
  // draw mountains
  context.drawImage(TopMountainBackground, 0, -100 + scrollHeight * 0.3, 900, 600);
  context.drawImage(MountainBackground, 0, -150 + scrollHeight * 0.4, 900, 600);
  context.drawImage(GreenMountainsBackground, 0, -100 + scrollHeight * 0.5, 900, 600);
  // draw trees
  context.drawImage(TreeBackground, 0, 0 + scrollHeight * 0.8, 900, 600);
  // draw grass
  context.drawImage(GrassBackground, 0, 0 + scrollHeight, 900, 600);
  // draw Bouncy Flower
  context.drawImage(BouncyFlower, 335, 480 + scrollHeight, 110, 100);

  drawClouds();
  drawPlayer();
  drawHud();

  if (gameOver == true) {
    drawGameOver();
  }

  if (gameVictory == true){
    drawVictory();
  }
}

//
// drawHud: draw the overlays; buttons and credits 
//
function drawHud()
{
  context.drawImage(InfoButtonSprite, 810, 10, 32, 32);
  if(instruct_on) {
    context.drawImage(ParchmentBackgroundSprite, 250, 70, 350, 455);
    context.drawImage(CloseSprite, 560, 75, 32, 32);
    cred_left = 260;
    cred_top = 130;
    drawWord("Instructions", cred_left, 80, 30);
    drawWord("The precious flower of", cred_left, cred_top, 20);
    drawWord("the Tree Sprites is", cred_left, cred_top + 30, 20);
    drawWord("wilting", cred_left, cred_top + 55, 20);

    drawWord("Use the left and right", cred_left, cred_top + 105, 20);
    drawWord("arrow keys to collect", cred_left, cred_top + 130, 20);
    drawWord("15 water drops and save", cred_left, cred_top + 155, 20);
    drawWord("the magic flower", cred_left, cred_top + 180, 20);

    drawWord("Step on the pink", cred_left, cred_top + 230, 20);
    drawWord("Bouncy Flower", cred_left, cred_top + 255, 20);
    drawWord("to get started", cred_left, cred_top + 280, 20);

    if (menuTimer <= 60 && menuTimer > 40) {
      context.drawImage(VictoryFlower, 430, 320, 168, 220);
    }
    else if (menuTimer <= 40 && menuTimer > 0) {
      context.drawImage(DeadFlower, 390, 235, 252, 330);
    }
    else if (instruct_on && menuTimer == 0){
      menuTimer = 60;
    }
  }

  if(sound_on) {
      context.drawImage(SoundOnSprite, 760, 10, 32, 32);
    }
    else {
      context.drawImage(SoundOffSprite, 760, 10, 32, 32);
    }
  context.drawImage(CreditLeafSprite, 840, -15, 68, 88);
  if(credits_on) {
    // draw credits
    cred_left = 260;
    cred_top = 130;
    context.drawImage(CreditsSprite, 0, 0, 900, 600);
    drawWord("Credits", cred_left, 100, 40);
    drawWord("Michelle Carlin", cred_left, cred_top + 30, 30);
    drawWord("Matthew Carlin", cred_left, cred_top + 60, 30);

    drawWord("Resources", cred_left, cred_top + 120, 40);
    drawWord("LinkVsBunny", cred_left, cred_top + 180, 30);
    drawWord("Wolgovanordan", cred_left, cred_top + 210, 30);
    drawWord("Adrian von Ziegler", cred_left, cred_top + 240, 30);
    drawWord("Legend of Zelda Wind Waker", cred_left, cred_top + 270, 30);
    drawWord("Zelda Sound Effects", cred_left, cred_top + 300, 30);
    drawWord("Gaelic Storm", cred_left, cred_top + 330, 30);
    drawWord("ABS Studios", cred_left, cred_top + 360, 30);

    context.drawImage(CloseSprite, 860, 5, 32, 32);
  }
}
//
// drawGameOver: initializes Game Over screen/retry button
//

function drawGameOver() 
{

  if(menuTimer <= 60 && menuTimer > 40)
  {
    proportion = (60 - menuTimer) / 20.0;
    canvas.getContext('2d').globalAlpha = proportion;

    // draw black background
    context.drawImage(BlackBackground, 0, 0, 900, 600);

    canvas.getContext('2d').globalAlpha = 1.0;
  }
  else
  {
    // draw black background
    context.drawImage(BlackBackground, 0, 0, 900, 600);

    if (menuTimer <= 40 && menuTimer > 0)
    {
      proportion = (menuTimer) / 40.0;
      canvas.getContext('2d').globalAlpha = proportion;
      canvas.getContext('2d').globalAlpha = 1.0;
    }

    else if (menuTimer <= 0 && menuTimer > -40)
    {
      proportion = (0 - menuTimer) / 40.0;
      canvas.getContext('2d').globalAlpha = proportion;
      // draw Game Over text
      context.drawImage(GameOver, 200, 0);
      //draw PlayerSprite
      context.drawImage(PlayerSpriteGameOver, 350, 300, 95, 110);
      //draw dead flower
      context.drawImage(DeadFlower, 400, 135, 252, 330);
      //draw Retry
      context.drawImage(Retry, 350, 420, 160, 120);
      // draw (press enter) instructions
      context.drawImage(PressEnter, 350, 455, 160, 120);

      canvas.getContext('2d').globalAlpha = 1.0;
    }
    else
    {
      // draw Game Over text
      context.drawImage(GameOver, 200, 0);
      //draw PlayerSprite
      context.drawImage(PlayerSpriteGameOver, 350, 300, 95, 110);
      //draw dead flower
      context.drawImage(DeadFlower, 400, 135, 252, 330);
      //draw Retry
      context.drawImage(Retry, 350, 420, 160, 120);
      // draw (press enter) instructions
      context.drawImage(PressEnter, 350, 455, 160, 120);
    }
  }
}

//
// drawVictory: initializes Victory screen/play again button
//

function drawVictory() 
{
  if(menuTimer <= 60 && menuTimer > 40)
  {
    proportion = (60 - menuTimer) / 20.0;
    canvas.getContext('2d').globalAlpha = proportion;

    // draw black background
    context.drawImage(BlackBackground, 0, 0, 900, 600);

    canvas.getContext('2d').globalAlpha = 1.0;
  }
  else
  {
    // draw black background
    context.drawImage(BlackBackground, 0, 0, 900, 600);

    if (menuTimer <= 40 && menuTimer > 0)
    {
      proportion = (menuTimer) / 40.0;
      canvas.getContext('2d').globalAlpha = proportion;
      canvas.getContext('2d').globalAlpha = 1.0;
    }
    else if (menuTimer <= 0 && menuTimer > -40)
    {
      proportion = (0 - menuTimer) / 40.0;
      canvas.getContext('2d').globalAlpha = proportion;
      // draw Victory text
      context.drawImage(Victory, 200, -10);
      //draw PlayerSprite
      context.drawImage(PlayerSprite, 350, 330, 84, 110);
      //draw Victory flower
      context.drawImage(VictoryFlower, 450, 250, 168, 220);
      // draw water burst
      xShake = -20 + Math.floor(Math.random() * 41); 
      yShake = -20 + Math.floor(Math.random() * 41); 
      context.drawImage(WaterDropBurstSprite, 515 + xShake, 290 + yShake, 54, 54);

      xShake = -20 + Math.floor(Math.random() * 41); 
      yShake = -20 + Math.floor(Math.random() * 41); 
      context.drawImage(WaterDropBurstSprite, 515 + xShake, 290 + yShake, 54, 54);

      xShake = -20 + Math.floor(Math.random() * 41); 
      yShake = -20 + Math.floor(Math.random() * 41); 
      context.drawImage(WaterDropBurstSprite, 515 + xShake, 290 + yShake, 54, 54);

      //draw Play Again
      context.drawImage(PlayAgain, 350, 420, 160, 120);
      // draw (press enter) instructions
      context.drawImage(PressEnter, 355, 455, 160, 120);

      canvas.getContext('2d').globalAlpha = 1.0;
    }
    else
    {
      // draw Victory text
      context.drawImage(Victory, 200, -10);
      //draw PlayerSprite
      context.drawImage(PlayerSprite, 350, 330, 84, 110);
      //draw Victory flower
      context.drawImage(VictoryFlower, 450, 250, 168, 220);
      // draw water burst
      xShake = -20 + Math.floor(Math.random() * 41); 
      yShake = -20 + Math.floor(Math.random() * 41); 
      context.drawImage(WaterDropBurstSprite, 515 + xShake, 290 + yShake, 54, 54);

      xShake = -20 + Math.floor(Math.random() * 41); 
      yShake = -20 + Math.floor(Math.random() * 41); 
      context.drawImage(WaterDropBurstSprite, 515 + xShake, 290 + yShake, 54, 54);

      xShake = -20 + Math.floor(Math.random() * 41); 
      yShake = -20 + Math.floor(Math.random() * 41); 
      context.drawImage(WaterDropBurstSprite, 515 + xShake, 290 + yShake, 54, 54);
      //draw Play Again
      context.drawImage(PlayAgain, 350, 420, 160, 120);
      // draw (press enter) instructions
      context.drawImage(PressEnter, 355, 455, 160, 120);
    }
  }
}



//
// findPos: just a quick adjustment of x,y coordinates to reflect the fact that
//          the canvas is not at the left edge of the browser window.
//
function findPos(element)
{
  var curLeft = 0;
  var curTop = 0;
  if(element.offsetParent)
  {
    do{
      curLeft += element.offsetLeft;
      curTop += element.offsetTop;
    } while(element = element.offsetParent);
  }
  
  return [curLeft, curTop];
}

//
// KeyDown: fired whenever a key is held down. ev.keyCode is the particular key.
//
function KeyDown(ev)
{
  if(ev.keyCode == 39)
  {
    ev.preventDefault();
    rightkeydown = true;
  }
    if(ev.keyCode == 37)
  {
    ev.preventDefault();
    leftkeydown = true;
  }
}

//
// KeyUp: fired whenever a key is released. ev.keyCode is the particular key.
//
function KeyUp(ev)
{
  if(ev.keyCode == 32)
  {
    ev.preventDefault();  
    // player_vy = -50; 
  }

  if(ev.keyCode == 39)
  {
    ev.preventDefault();
    rightkeydown = false;
  }

  if(ev.keyCode == 37)
  {
    ev.preventDefault();
    leftkeydown =  false;
  }

  if (ev.keyCode == 13 && menuTimer < 40 && (gameOver == true || gameVictory == true))
  {
    music.pause();
    initializeGame();
  }
}

//
// Click: fired whenever the mouse is clicked.
//
function Click(ev)
{
  var x = ev.pageX - canvas.left;
  var y = ev.pageY - canvas.top;

  console.log(x + "," + y);
  if(x > 760 && x < 800 && y > 0 && y < 40)
  {
    if(sound_on)
    {
      sound_on = false;
      music.pause();
    }
    else
    {
      sound_on = true;
      music.play();
    }
  }

  if((x > 820 && x < 860 && y > 0 && y < 40)||(x > 560 && x < 595 && y > 75 && y < 110))
  {
    if(instruct_on)
    {
      instruct_on = false;
    }
    else
    {
      instruct_on = true;
    }
  }

  if(x > 860 && x < 901 && y > 0 && y < 40)
  {
    if(credits_on)
    {
      credits_on = false;
    }
    else
    {
      credits_on = true;
    }
  }
}