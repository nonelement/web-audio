// Create a context to use.
var context = new AudioContext();
// Twinkle Twinkle Little Star note string
var ttls = "ccggaag ffeeddc ggffeed ggffeed ccggaag ffeeddc ";
// Hz values for certain notes -- includes blank for musical rests.
var Notes = {
    'c': 261,
    'd': 294,
    'e': 329,
    'f': 349,
    'g': 392,
    'a': 440,
    'b': 493,
    ' ': 0
};

// args: frequency, duration, callback onEnded
function playSound(hz, t, cb) {
    // Create Oscillator Node
    window.osc = context.createOscillator();
    // Create Gain Node
    window.gain = context.createGain();
    // Connect Oscillator to Gain Node
    window.osc.connect(window.gain);
    // Connect Gain Node to context.destination (audio renderer)
    window.gain.connect(context.destination);
    // Set our sound up...
    window.osc.type = 'sine';
    window.osc.frequency.value = hz;
    window.osc.onended = cb;
    // ... start our oscillator...
    window.osc.start();
    // ... and set future stop time of now + t.
    window.osc.stop(context.currentTime + t);
}

// args: note string to play
function melody (seq) {
    // Transform note string to individual notes.
    var notes = seq.split("");
    var current = 0;
    // Recursive function that recursively iterates over notes in sequence (seq).
    function note () {
        if(current>seq.length-1) {
            console.log("End!");
            return;
        }
        console.log(notes[current]);
        playSound(Notes[notes[current++]], .5, note);
    }
    note();
};

// Play Twinkle Twinkle Little Star (Note: define your own note string and pass it in here)
// melody(ttls);

/*
    Bonus JS Block: Simple JS-fu to do class manip for dope anims.
    Comment the following AND bonus CSS block to eliminate eye-candy. Also uncomment `melody(ttls);`
*/
setTimeout(function () {
    document.getElementById("hey").className += " now";
    setTimeout(function () {
        document.getElementById("listen").className += " now";
        setTimeout(function () { melody(ttls); }, 1000);
    }, 1000);
}, 500);
