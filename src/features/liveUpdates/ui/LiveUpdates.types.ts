export interface PriceData {
    symbol: string;
    price: number;
    change24h: number;
    changePercent24h: number;
    volume24h: number;
    high24h: number;
    low24h: number;
    vwap24h: number;
    ask: number;
    askQty?: number;
    bid: number;
    bidQty?: number;
    spread: number;
    spreadPercent: number;
    lastUpdate?: number;
    priceDirection: "up" | "down" | "neutral";
}

export interface KrakenTickerData {
    ask: number;
    ask_qty: number;
    bid: number;
    bid_qty: number;
    change: number;
    change_pct: number;
    high: number;
    last: number;
    low: number;
    symbol: string;
    volume: number;
    vwap: number;
}
