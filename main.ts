pins.onPulsed(DigitalPin.P2, PulseValue.Low, function () {
    Encoder += 1
    if (Encoder >= Minuten * (191 / 3)) {
        if (!(bUhrstellen)) {
            motors.dualMotorPower(Motor.M0, 0)
            basic.setLedColors(0x00ff00, 0x000000, 0x000000, 5)
        }
    }
})
function _ (Kommentar: string) {
	
}
let Encoder = 0
let bUhrstellen = false
let Minuten = 0
let o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
o4digit.set(0)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
Minuten = 0
bUhrstellen = false
basic.setLedColor(0xff0000)
loops.everyInterval(60000, function () {
    if (!(bUhrstellen)) {
        Minuten += 1
        motors.dualMotorPower(Motor.M0, 20)
        basic.setLedColors(0x000000, 0xb09eff, 0x000000)
    }
})
