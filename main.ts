input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (Status == 2) {
        if (Minuten60 > 0) {
            Minuten60 += -1
        } else {
            Minuten60 = 59
        }
    } else if (Status == 3) {
        EncoderMinuten += -1
        motors.dualMotorPower(Motor.M0, -20)
    }
    Ziffern()
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (Status == 2) {
        if (Minuten60 < 59) {
            Minuten60 += 1
        } else {
            Minuten60 = 0
        }
    } else if (Status == 3) {
        EncoderMinuten += 1
        motors.dualMotorPower(Motor.M0, 20)
    }
    Ziffern()
})
pins.onPulsed(DigitalPin.P2, PulseValue.Low, function () {
    EncoderImpulse += 1
    if (EncoderImpulse >= EncoderMinuten * (191 / 3)) {
        if (Status == 1) {
            motors.dualMotorPower(Motor.M0, 0)
            Ziffern()
            E2 = EncoderImpulse
            basic.setLedColors(0xff0000, 0x000000, 0x000000, 5)
        }
    }
})
function StatusLED () {
    if (Status == 2) {
        basic.setLedColors(0x000000, 0x00ffff, 0x000000)
    } else if (Status == 3) {
        basic.setLedColors(0x000000, 0x000000, 0xff00ff)
    }
}
function _ (Kommentar: string) {
	
}
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Hold), function () {
    if (Status > 1) {
        Status += -1
    }
    StatusLED()
})
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Hold), function () {
    if (Status < 3) {
        Status += 1
    }
    StatusLED()
})
function Ziffern () {
    o4digit.show((EncoderImpulse - E2) * 100 + Minuten60)
}
let E2 = 0
let EncoderImpulse = 0
let Minuten60 = 0
let Status = 0
let EncoderMinuten = 0
let o4digit: grove.TM1637 = null
o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
o4digit.set(4)
o4digit.point(true)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
EncoderMinuten = 0
let bUhrstellen = false
Status = 1
basic.setLedColor(0xff0000)
loops.everyInterval(60000, function () {
    if (Status == 1) {
        EncoderMinuten += 1
        if (Minuten60 < 59) {
            Minuten60 += 1
        } else {
            Minuten60 = 0
        }
        motors.dualMotorPower(Motor.M0, 20)
        basic.setLedColors(0xb09eff, 0x000000, 0x000000)
    }
})
