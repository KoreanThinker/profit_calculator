import { Stock } from "../../context/stock";
import ttlBuys from "./ttlBuys";
import ttlSell from "./ttlSell";

export default function (stock: Stock): number {
    return Math.floor(((ttlBuys(stock.buys) + ttlSell(stock)) * parseFloat(stock.sell.commission) / 100))
}