// import { calculateTip } from "../src/math.js"
const { calculateTip } = require("../src/math.js")


test('calculate tip', () => {
    const total = calculateTip(10, .3)

    if (total !== 13) {
        throw new Error('Total should equal 13' + total)
    }
})