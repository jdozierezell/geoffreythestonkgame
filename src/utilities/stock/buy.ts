import type { Stock } from "../../types/stock"
import type { User } from "../../types/user"

export const buyStock = (stock: Stock, sharesToBuy: number, user: User) => {
    if(stock.availableShares >= sharesToBuy) {
        let stockExists = false
        const price = stock.price * sharesToBuy
        if(user.balance < price) {
            throw new Error("Not enough balance")
        }
        stock.availableShares -= sharesToBuy
        user.stocks.forEach(s => {
            if(s.ticker === stock.ticker) {
                s.shares += sharesToBuy
                stockExists = true
            }
        })
        if(!stockExists) {
            user.stocks.push({ticker: stock.ticker, shares: sharesToBuy})
        }
        user.balance -= price
    } else {
        throw new Error("Not enough shares available")
    }
}
