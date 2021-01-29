// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

var inc = 0.1;
var scl;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

var root = {
  backgroundColor: {  
    r: 0,
    g: 0,
    b: 0
    },
    flowfieldScale:30,
    minParticleSpeed:1,
    maxParticleSpeed:5,
    particleAmount: 300,
    particleSize: 1,
    randomParticleColor:true,
    displayFlowFeild:false    
};


function setup() {
  scl = root.flowfieldScale;
  createCanvas(window.innerWidth, window.innerHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < root.particleAmount; i++) {
    particles[i] = new Particle();
  }
  
}

function mouseClicked() {
    particles = [];
    flowfield = new Array(cols * rows);

    for (var i = 0; i < root.particleAmount; i++) {
      particles[i] = new Particle();
    }
    background(0);
    scl = root.flowfieldScale;
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      
      if(root.displayFlowFeild == true){
        stroke(255);

        push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        strokeWeight(1);
        line(0, 0, scl, 0);
        pop();
      }

    }
    yoff += inc;

    zoff += 0.00003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  background(root.backgroundColor.r,root.backgroundColor.g,root.backgroundColor.b,15);
  // fr.html(floor(frameRate()));
}

function livelyPropertyListener(name, val)
{
  switch(name) {
    case "backgroundColor":
      root.backgroundColor =  hexToRgb(val);
      break;
    case "flowfieldScale":
      root.flowfieldScale = floor(val);
      break;    
    case "particleAmount":
      root.particleAmount = floor(val);
      break; 
    case "maxParticleSpeed":
      root.maxParticleSpeed = floor(val);
      break; 
    case "randomParticleColor":
      root.randomParticleColor = val;
      break; 
    case "displayFlowFeild":
        root.displayFlowFeild = val;
        break; 
    case "particleSize":
      root.particleSize = val;
      break;
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}