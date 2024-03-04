pins.onPulsed(DigitalPin.P2, PulseValue.Low, function () {
    EncoderImpulse += 1
    if (EncoderImpulse >= EncoderMinuten * (191 / 3)) {
        if (!(bUhrstellen)) {
            motors.dualMotorPower(Motor.M0, 0)
            o4digit.show((EncoderImpulse - E2) * 100 + Minuten60)
            E2 = EncoderImpulse
            basic.setLedColors(0x00ff00, 0x000000, 0x000000, 5)
        }
    }
})
function _ (Kommentar: string) {
	
}
let Minuten60 = 0
let E2 = 0
let EncoderImpulse = 0
let bUhrstellen = false
let EncoderMinuten = 0
let o4digit: grove.TM1637 = null
o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
o4digit.set(0)
o4digit.point(true)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
EncoderMinuten = 0
bUhrstellen = false
basic.setLedColor(0xff0000)
loops.everyInterval(60000, function () {
    if (!(bUhrstellen)) {
        EncoderMinuten += 1
        if (Minuten60 < 59) {
            Minuten60 += 1
        } else {
            Minuten60 = 0
        }
        motors.dualMotorPower(Motor.M0, 20)
        basic.setLedColors(0x000000, 0xb09eff, 0x000000)
    }
})
