import { BuyStockType } from "../../context/stock";

export default function (buys: BuyStockType[]): number {
    let result = 0
    for (let i = 0; i < buys.length; i++) {
        result += buys[i].many * buys[i].price
    }
    return result
}