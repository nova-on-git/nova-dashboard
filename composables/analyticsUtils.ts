/** Formats number using K's and M's to represent thousand and millions. Keeps any number below 4 characters E.g: 1.53K , 15.3M 1.7B */
export function minifyNumber(number: number) {
    let k: string
    if (number > 999 && number < 99999) {
        k = `${(number / 1000).toFixed(1)}K`
    } else if (number > 99999 && number < 999999) {
        k = `${(number / 1000).toFixed(0)}K`
    } else if (number > 999999 && number < 99999999) {
        k = `${(number / 1000000).toFixed(1)}M`
    } else if (number > 99999999 && number < 999999999) {
        k = `${(number / 1000000).toFixed(0)}M`
        console.log("hello")
    } else if (number > 999999999) {
        k = `${(number / 1000000000).toFixed(1)}B`
    } else {
        k = String(number)
    }

    return k
}
