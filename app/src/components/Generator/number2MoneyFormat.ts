export default function (num: number) {
    let isMinus = false
    if (num < 0) {
        num *= -1
        isMinus = true
    }

    const nums = num.toString().split('.')
    let result = ''

    let str = nums[0].split("").reverse();
    for (let i = 0; i < str.length; i++) {
        if (i !== 0 && i % 3 === 0) result += ','
        result += str[i]
    }
    const integer = result.split("").reverse().join("");

    return (isMinus ? '-' : '') + integer + (nums.length > 1 ? '.' + nums[1] : '')
}