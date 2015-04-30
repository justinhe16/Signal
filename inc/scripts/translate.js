controller.use('screenPosition')
  // or
   controller.use('screenPosition', {positioning: 'absolute'}) // the default
   // or
   controller.use 'screenPosition', {
     positioning: function(positionVec3){
       // Arguments for Leap.vec3 are (out, a, b)
       [
         Leap.vec3.subtract(positionVec3, positionVec3, this.frame.interactionBox.center)
       Leap.vec3.divide(positionVec3, positionVec3, this.frame.interactionBox.size)
        Leap.vec3.multiply(positionVec3, positionVec3, [window.innerWidth, window.innerHeight, 0])
     ]
    }
  }

  // later...
  hand.screenPosition() // returns [156,204,0]
