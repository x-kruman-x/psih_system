export function stringToNumber(arr: string[]) {
    const numberArr = arr.map(el => parseInt(el))
    return numberArr
}