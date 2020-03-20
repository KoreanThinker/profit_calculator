import { Stock } from "../../context/stock";
import ttlBuyMany from "./ttlBuyMany";
import commission from "./commission";
import tax from "./tax";
import ttlBuys from "./ttlBuys";

export default function (stock: Stock): number {
    const pay = ttlBuys(stock.buys) + commission(stock) + tax(stock)
    const ret = ttlBuyMany(stock.buys) * stock.sell.price
    return ret - pay
}