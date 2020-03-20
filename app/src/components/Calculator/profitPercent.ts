import { Stock } from "../../context/stock";
import ttlBuys from "./ttlBuys";
import commission from "./commission";
import tax from "./tax";
import ttlBuyMany from "./ttlBuyMany";

export default function (stock: Stock): number {
    const pay = ttlBuys(stock.buys) + commission(stock) + tax(stock)
    const ret = ttlBuyMany(stock.buys) * stock.sell.price
    const res = Math.floor(ret / pay * 100) - 100
    return res.toString() == 'NaN' ? 0 : res
}