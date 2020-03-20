import { Stock } from "../../context/stock";
import ttlBuyMany from "./ttlBuyMany";

export default function (stock: Stock): number {
    return ttlBuyMany(stock.buys) * stock.sell.price
}