// Set up plugins
Leap.loop()
.use('boneHand', {
  targetEl: document.body,
  arm: false,
  opacity: 0.5
});

// Set up scene

var scene    = Leap.loopController.plugins.boneHand.scene;
var camera   = Leap.loopController.plugins.boneHand.camera;
var renderer = Leap.loopController.plugins.boneHand.renderer;

var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(80,80),
  new THREE.MeshPhongMaterial({wireframe: false})
  );
plane.scale.set(2,2,2);
plane.position.set(0,200,-100);
camera.lookAt( plane.position );

// scene.add(plane);

// var axisHelper = new THREE.AxisHelper( 100 );
// scene.add( axisHelper );
//  var controls = new THREE.OrbitControls( camera, renderer.domElement );
var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;
var flag5 = false;

Leap.loopController.on('handFound', function(hand) {
  document.querySelector('canvas').style.display = 'block';
}).on('handLost', function(hand){
  if (Leap.loopController.frame(0).hands.length === 0){
    document.querySelector('canvas').style.display = 'none';
  }
}).on('frame', function(hand) { //every frame, aka every second or so
  if (hand.valid){
    var extendedFingers = 0;
    for(var f = 0; f < hand.fingers.length; f++){
      var finger = hand.fingers[f];
      if(finger.extended){
        extendedFingers++;
        if(finger.type == 0){
          flag1 = true;
        } //A!
        if(finger.type == 1){
          flag2 = true;
        }
        if(finger.type == 2){
          flag3 = true;
        }
        if(finger.type == 3){
          flag4 = true;
        }
        if(finger.type == 4){
          flag5 = true;
        }
      } 
    }

    if(extendedFingers == 1){
      if(flag1 == true && flag2 == false && flag3 == false && flag4 == false && flag5 == false){
       GenerateLetters("A");
       flag1 = false;
     }
   }
   else if(extendedFingers == 4){
    if(flag1 == false && flag2 == true && flag3 == true && flag4 == true && flag5 == true){
      GenerateLetters("B");
      flag2 = false;
      flag3 = false;
      flag4 = false;
      flag5 = false;
    }
  }
}
});

// end setting up scene
//jquery experimentation edit: WOW IT WORKS 
$(document).ready(function() {
  $("#testbutton").click(function() {
    GenerateLetters("hello"); 
  });
});


  // methods

  function GenerateLetters(x) {
    var text = $("<text></text>").text(x);
    $("#Letters").append(text);
  }
