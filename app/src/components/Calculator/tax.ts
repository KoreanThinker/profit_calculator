import { Stock } from "../../context/stock";
import ttlSell from "./ttlSell";

export default function (stock: Stock): number {
    return Math.floor(ttlSell(stock) * 0.3 / 100)
}