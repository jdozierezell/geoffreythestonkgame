import type { Stock } from "../../types/stock"
import type { User } from "../../types/user"

export const sellStock = (stock: Stock, sharesToSell: number, user: User) => {
    user.stocks.forEach(s => {
        if(s.ticker === stock.ticker) {
            if(s.shares < sharesToSell) {
                throw new Error("Not enough shares to sell. Are you sure you're selling the right stock?")
            }
            s.shares -= sharesToSell
            stock.availableShares += sharesToSell
            user.balance += stock.price * sharesToSell
        }
    })
}
