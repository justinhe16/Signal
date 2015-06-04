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


var universalflag = false;
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
}).on('frame', function(hand, frame){ //every frame, aka every second or so
  var extendedFingers = 0;
  if (hand.valid){
    for(var f = 0; f < hand.fingers.length; f++){
      var finger = hand.fingers[f];
      if(finger.extended){
        extendedFingers++;
        if(finger.type == 0){
          console.log("flag1");
          flag1 = true;
        } //Thumb
        if(finger.type == 1){
          console.log("flag2");
          flag2 = true;
        } //Index
        if(finger.type == 2){
          console.log("flag3");
          flag3 = true;
        } //Middle
        if(finger.type == 3){
          console.log("flag4");
          flag4 = true;
        } //Ring
        if(finger.type == 4){
          console.log("flag5");
          flag5 = true;
        } //Pinkie
      } 
    }

    if(extendedFingers == 1){
      console.log("1 finger extended");
      if(flag1 == true && flag2 == false && flag3 == false && flag4 == false && flag5 == false && universalflag == true){
       GenerateLetters("A");
       universalflag = false;
     }
     else if(flag1 == false && flag2 == true && flag3 == false && flag4 == false && flag5 == false && universalflag == true){
      GenerateLetters("D");
      universalflag = false;
    }
    else if(flag1 == false && flag2 == false && flag3 == false && flag4 == false && flag5 == true && universalflag == true){
      GenerateLetters("I");
      universalflag = false;
    }
    flag1 = false;
    flag2 = false;
    flag3 = false;
    flag4 = false;
    flag5 = false;
  }
  else if(extendedFingers == 2){
    console.log("2 fingers extended");
    if(flag1 == false && flag2 == true && flag3 == true && flag4 == false && flag5 == false && universalflag == true){
      GenerateLetters("H");
      universalflag = false;
    }
    if(flag1 == true && flag2 == false && flag3 == false && flag4 == false && flag5 == true && universalflag == true){
      GenerateLetters("Y");
      universalflag = false;
    }
    else if(flag1 == true && flag2 == true && flag3 == false && flag4 == false && flag5 == false && universalflag == true){
      for(var f = 0; f < hand.fingers.length; f++){
        var finger = hand.fingers[f];
        if (finger.type == 0){
          if(finger.direction[0] < -0.5){
            GenerateLetters("L");
            universalflag = false;
          }
          else{
            GenerateLetters("G");
            universalflag = false;
          }
        }
      }
    }
    flag1 = false;
    flag2 = false;
    flag3 = false;
    flag4 = false;
    flag5 = false;
  } 
  else if(extendedFingers == 3){
    console.log("3 fingers extended");
    if(flag1 == false && flag2 == false && flag3 == true && flag4 == true && flag5 == true && universalflag == true){
      GenerateLetters("F");
      universalflag = false;
    }
    if(flag1 == false && flag2 == true && flag3 == true && flag4 == true && flag5 == false && universalflag == true){
      GenerateLetters("W");
      universalflag=false;
    }
    if(flag1 == true && flag2 == true && flag3 == true && flag4 == false && flag5 == false && universalflag == true){
      GenerateLetters("P");
      universalflag=false;
    }
    flag1 = false;
    flag2 = false;
    flag3 = false;
    flag4 = false;
    flag5 = false;
  } 
  else if(extendedFingers == 0){
    console.log("0 fingers extended");
    if(flag1 == false && flag2 == false && flag3 == false && flag4 == false && flag5 == false && universalflag == true){
      GenerateLetters("E");
      universalflag = false;
    }
    flag1 = false;
    flag2 = false;
    flag3 = false;
    flag4 = false;
    flag5 = false;
  } 
  else if(extendedFingers == 4){
    console.log("4 fingers extended");
    if(flag1 == false && flag2 == true && flag3 == true && flag4 == true && flag5 == true && universalflag == true){
      GenerateLetters("B");
      universalflag = false;
    }
    flag1 = false;
    flag2 = false;
    flag3 = false;
    flag4 = false;
    flag5 = false;
  }
  else{
    universalflag = true;
  }
}
});

var controllerOptions = {enableGestures: true};
Leap.loop(controllerOptions, function(frame) {

  // Display Gesture object data
  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      if(gesture.type == "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          var isVertical = Math.abs(gesture.direction[1]) > Math.abs(gesture.direction[0]);
          //Classify as right-left or up-down
          if(isHorizontal){
            if(gesture.direction[0] > 0 && flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true && universalflag == true){
              swipeDirection = "right";
              swipeSpace();
              universalflag = false;
            } else if (gesture.direction[0] < 0 && flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true && universalflag == true) {
              swipeDirection = "left";
              swipeSpace();
              universalflag = false;
            }
          } else if (isVertical) { //vertical
            if(gesture.direction[1] > 0){
              swipeDirection = "up";
            } else {
              swipeDirection = "down";
            }                  
          }
          else {
            universalflag = true;
          }
          //console.log(swipeDirection);
        }
      }
    }

  });

// end setting up scene
  // methods added swipeSpace

  function GenerateLetters(x) {
    var text = $("<text></text>").text(x);
    $("#Letters").append(text);
  }

  function swipeSpace(){
    var text = $("<text></text>").text(" ");
    $("#Letters").append(text);
  }
