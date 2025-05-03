import type { Stock } from "../../types/stock"

export const createStock = (name: string, ticker: string, price: number): Stock => {
    return {
        availableShares: 5000,
        name: name,
        price: price,
        ticker: ticker,
        totalShares: 5000
    }    
}