import { BuyStockType } from "../../context/stock";
import ttlBuys from "./ttlBuys";
import ttlBuyMany from "./ttlBuyMany";

export default function (buys: BuyStockType[]): number {
    const res = Math.floor(ttlBuys(buys) / ttlBuyMany(buys))
    return res.toString() == 'NaN' ? 0 : res
}