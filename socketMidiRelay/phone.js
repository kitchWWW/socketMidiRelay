console.log("hi!")

things = document.getElementById("things")
things.innerHTML = "js loaded!"



var socket = io();
socket.on('connect', function() {
    socket.emit('my event', {data: 'I\'m connected!'});
});

socket.on('my response', function(msg) {
    console.log(msg)
    // var item = document.createElement('li');
    // item.textContent = msg;
    // messages.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
});


function listInputsAndOutputs( midiAccess ) {
  for (var entry of midiAccess.inputs) {
    var input = entry[1];
    var allString =  "Input port [type:'" + input.type + "'] id:'" + input.id +
      "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
      "' version:'" + input.version + "'" ;
    console.log(allString)
    
    var iDiv = document.createElement('div');
    iDiv.id = 'block';
    iDiv.className = 'block';
    iDiv.innerHTML = allString
    document.getElementById('things').appendChild(iDiv);

  }

  for (var entry of midiAccess.outputs) {
    var output = entry[1];
    console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
      "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
      "' version:'" + output.version + "'" );
  }
}


var midi = null;  // global MIDIAccess object
function onMIDISuccess( midiAccess ) {
  console.log( "MIDI ready!" );
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
  listInputsAndOutputs(midi)
  startLoggingMIDIInput(midi)

}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );


function onMIDIMessage( event ) {
  var str = "MIDI message received at timestamp " + event.timeStamp + "[" + event.data.length + " bytes]: ";
  socket.emit('my event', {data: JSON.stringify(new Uint8Array(event.data))});
  for (var i=0; i<event.data.length; i++) {
    str += "0x" + event.data[i].toString(16) + " ";
  }
  console.log( str );
}

function startLoggingMIDIInput( midiAccess) {
  midiAccess.inputs.forEach( function(entry) {entry.onmidimessage = onMIDIMessage;});
}




var noSleep = new NoSleep();
document.addEventListener('click', function enableNoSleep() {
  document.removeEventListener('click', enableNoSleep, false);
  noSleep.enable();
}, false);