export function getRandomNumber(length: number): string {
    let result = ""
    const digits = "0123456789"

    for (let i = 0; i < length; i++) {
        result += digits.charAt(Math.floor(Math.random() * digits.length))
    }

    return result
}
