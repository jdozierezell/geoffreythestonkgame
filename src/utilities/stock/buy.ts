import {db, Stock, User, eq } from 'astro:db';

// Add type annotation for db parameter
export const buyStock = async (stockTicker: string, sharesToBuy: number, userId: string) => {
    const user = await db.select().from(User).where(eq(User.id, userId)).get();
    const stockToBuy = await db.select().from(Stock).where(eq(Stock.ticker, stockTicker)).get();

    if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
    }
    if (!stockToBuy) {
        throw new Error(`Stock with ticker ${stockTicker} not found.`);
    }

    if (stockToBuy.availableShares >= sharesToBuy) {
        const price = stockToBuy.price * sharesToBuy;
        if (user.balance < price) {
            throw new Error("Not enough balance");
        }

        let stockExists = false;
        const updatedStocks = Array.isArray(user.stocks) ? [...user.stocks] : []; 

        updatedStocks.forEach(s => {
            if (s.ticker === stockTicker) {
                s.shares += sharesToBuy;
                stockExists = true;
            }
        });

        if (!stockExists) {
            updatedStocks.push({ ticker: stockTicker, shares: sharesToBuy });
        }

        await db.update(Stock)
            .set({ availableShares: stockToBuy.availableShares - sharesToBuy })
            .where(eq(Stock.ticker, stockTicker));

        await db.update(User)
            .set({ 
                balance: user.balance - price, 
                stocks: updatedStocks 
            })
            .where(eq(User.id, userId));

    } else {
        throw new Error("Not enough shares available");
    }
};
