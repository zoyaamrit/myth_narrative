let panels = [];
let tree_panels = [];
let xshift = 0;
let yshift = 0;
let forestArray = [];
let pheonixArray = [];
let scene = 0;

let isLoading = true;
let loadingMessage = "time...";

const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const buttontext_1 = document.getElementById("hidden_1");
const buttontext_2 = document.getElementById("hidden_2");

// For typing reveal animation
$('h2').each(function(i) {
  $(this).css({
      "animation-delay": i + "s"
  })
});

let textToDisplay = "";
let displayText = false;
let textDuration = 3000; 


function preload() {
  // Preload all images before the setup
  forestArray.push(loadImage('./forestb.png'));
  forestArray.push(loadImage('./unicorn.png'));
  forestArray.push(loadImage('./forest5.png'));
  forestArray.push(loadImage('./forest4.png'));
  forestArray.push(loadImage('./forest3.png'));
  forestArray.push(loadImage('./forest2.png'));
  forestArray.push(loadImage('./forest1.png'));

  // pheonixArray.push(loadImage('./treeb.png'));
  pheonixArray.push(loadImage('./tree3.png'));
  pheonixArray.push(loadImage('./tree1.png'));
  pheonixArray.push(loadImage('./tree3.png'));
  pheonixArray.push(loadImage('./bird.png'));
  pheonixArray.push(loadImage('./tree2.png'));
  pheonixArray.push(loadImage('./tree1.png'));

  customFont = loadFont('./Lato-LightItalic.ttf');


}

function setup1() {

  createCanvas(window.innerWidth, window.innerHeight);
  imageMode(CENTER);
  generateTreePanels();
  generatePheonixPanels();

}

function generateTreePanels() {
  let y = 2 * height / 4;
  
  for (let i = 0; i < forestArray.length; i++) {
    let img = forestArray[i];
    let panelY = y + (i * height / 12);
    if (i == 1) {
      panelY = 0;
    }
    panels.push(img);
    y += height / 12;
  }


}

function generatePheonixPanels() {
  let y = 2 * height / 4;
  
  for (let i = 0; i < pheonixArray.length; i++) {
    let img = pheonixArray[i];
    let panelY = y + (i * height / 12);
    if (i == 3) {
      panelY = 0;
    }
    tree_panels.push(img);
    y += height / 12;
  }
}



function displayPlanes() {

  let txshift = (mouseX - width / 2) / 15;
  xshift = lerp(xshift, txshift, 0.05);
  
  let tyshift = (mouseY - height / 2) / 20;
  yshift = lerp(yshift, tyshift, 0.05);
  
  let scaledWidth = 1.5 * width;
  let scaledHeight = 2 * height;

  for (let i = 0; i < panels.length; i++) {
    let img = panels[i];

    if (i != 1) {
      image(img, width / 2 + i * xshift, height / 2 + i * yshift, scaledWidth, scaledHeight); 
    } else {
      image(img, width / 2 + i * xshift, height - 300, 800, 800); 
    }    
  }

}

function displayPheonix() {

  let txshift = (mouseX - width / 2) / 15;
  xshift = lerp(xshift, txshift, 0.05);
  
  let tyshift = (mouseY - height / 2) / 20;
  yshift = lerp(yshift, tyshift, 0.05);
  
  let scaledWidth = 1.5 * width;
  let scaledHeight = 2 * height;

  for (let i = 0; i < tree_panels.length; i++) {
    let img = tree_panels[i];

    if (i != 3) {
      image(img, width / 2 + i * xshift, height / 2 + i * yshift, scaledWidth, scaledHeight); 
    } else {
      image(img, width / 2 + i * xshift, height - 300, 800, 800); 
    }    
  }

}

function draw() {
  background(0);


  if (displayText) {
    fill(255);
    textFont(customFont);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(textToDisplay, width / 2, height / 2);

    return; // Stop rendering the scene during text display
  }


  if (scene == 1) {   displayPlanes(); }
  else if (scene == 2) { displayPheonix(); }

}

function buttonsScene2() {
  choice1.removeEventListener('click', exit_world2)
  choice2.removeEventListener('click', moveCloser)
  choice1.addEventListener('click', exit_world3)
  choice2.addEventListener('click', exit_world4)

}



function displayCanvas() {
  document.getElementById("landing").style.display = 'none';

  document.getElementById("scenes").style.display = 'block';
  setup1();
  scene = 1; 
  choice2.addEventListener('click', moveCloser);
  choice1.addEventListener('click', exit_world1);
 


}

function exit_world1() {
  document.getElementById("exit1").style.display = 'flex';
  document.getElementById("scenes").style.display = 'none';
}

function exit_world2() {
  document.getElementById("exit2").style.display = 'flex';
  document.getElementById("scenes").style.display = 'none';
}

function exit_world3() {
  document.getElementById("exit3").style.display = 'flex';
  document.getElementById("scenes").style.display = 'none';
}

function exit_world4() {
  document.getElementById("exit4").style.display = 'flex';
  document.getElementById("scenes").style.display = 'none';
}

function moveCloser() {

  console.log(forestArray.length)

  forestArray.pop();
    panels = [];
    generateTreePanels();


  if (forestArray.length == 2) {
    buttontext_2.innerHTML = "take a picture"
    buttontext_1.innerHTML = "aim to kill"
    choice1.removeEventListener('click', exit_world1)
    choice1.addEventListener('click', exit_world2)

  }

  if (forestArray.length == 1) {
    textToDisplay = "After finding the unicorn, you move ahead in the forest. ";
    displayText = true;

    setTimeout(() => {
      displayText = false; 
      buttonsScene2();
      switchScene(2); 
    }, textDuration);
  }


}



function switchScene(number) {
  scene = number;
}