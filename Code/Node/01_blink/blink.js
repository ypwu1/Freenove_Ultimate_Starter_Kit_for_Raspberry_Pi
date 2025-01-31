#!/usr/local/bin/node

const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(11, 'out');       // Export GPIO17 as an output
let stopBlinking = false;

if (!led.accessible) {
    throw "gpio is not available!"
}

// Toggle the state of the LED connected to GPIO17 every 200ms
const blinkLed = () => {
    if (stopBlinking) {
        return led.unexport();
    }

    led.read()
        .then(value => led.write(value ^ 1))
        .then(_ => setTimeout(blinkLed, 200))
        .catch(err => console.log(err));
};

blinkLed();

// Stop blinking the LED after 5 seconds
setTimeout(_ => stopBlinking = true, 5000);