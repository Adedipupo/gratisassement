exports.calculateTip = (total,tipPercent) => {
    const tip = total * tipPercent
    return total + tip
}