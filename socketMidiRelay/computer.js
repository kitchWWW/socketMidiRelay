console.log("hi!")


myStatus = document.getElementById("myStatus");
myStatus.innerHTML = "waiting for id";



things = document.getElementById("things")
things.innerHTML = "js loaded!"

var whichToUse = null
function updateWhichToSend(){
    console.log("changed!")
    whichToUse = parseInt(document.getElementById("whichToSend").value)
    myStatus.innerHTML = "id set"
}


var socket = io();
socket.on('connect', function() {
    socket.emit('my event', {data: 'I\'m connected!'});
});

socket.on('my response', function(msg) {
    console.log(msg)
    console.log(msg["data"])
    // try{
        if(msg["data"].startsWith("I")){
            return
        }
        console.log("wat")
        dat = JSON.parse(msg["data"])
        console.log(dat)        
        if(whichToUse !== null){
            console.log("sending!")
            console.log(midi.outputs)
            var output = midi.outputs.get(whichToUse);
            output.send( [dat[0],dat[1],dat[2],] );
            myStatus.innerHTML = "sent data "+JSON.stringify(dat)
        }
    // }catch{
    //     console.log("oops")
    // }

});



var midi = null;  // global MIDIAccess object
function onMIDISuccess( midiAccess ) {
  console.log( "MIDI ready!" );
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
  listInputsAndOutputs(midi)
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );




// function sendMiddleC( midiAccess, portID ) {
//   var noteOnMessage = [0x90, 60, 0x7f];    // note on middle C, full velocity
//   var output = midiAccess.outputs.get(portID);
//   output.send( noteOnMessage );  //omitting the timestamp means send immediately.
//   output.send( [0x80, 60, 0x40], window.performance.now() + 1000.0 ); // timestamp = now + 1000ms.
// }



function listInputsAndOutputs( midiAccess ) {
  for (var entry of midiAccess.inputs) {
    var input = entry[1];
    var allString =  "Input port [type:'" + input.type + "'] id:'" + input.id +
      "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
      "' version:'" + input.version + "'" ;
    console.log(allString)
    // var iDiv = document.createElement('div');
    // iDiv.id = 'block';
    // iDiv.className = 'block';
    // iDiv.innerHTML = allString
    // // document.getElementById('things').appendChild(iDiv);

  }
  var count = 0
  for (var entry of midiAccess.outputs) {
    var output = entry[1];
    var allString = "Output port [type:'" + output.type + "'] id:'" + output.id +
      "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
      "' version:'" + output.version + "'" ;
      console.log(allString)
    var iDiv = document.createElement('div');
    iDiv.id = 'block';
    iDiv.className = 'block';
    iDiv.innerHTML = allString
    document.getElementById('things').appendChild(iDiv);
    count+=1
  }
}
