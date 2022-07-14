export function toFahrenheit(tempInCelsius){
    tempInCelsius = parseInt(tempInCelsius, 10);
    return Math.floor((tempInCelsius * 9/5) + 32);
}
