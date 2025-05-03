export type User = {
    name: string
    id: string
    balance: number
    stocks: {ticker: string, shares: number}[]
}
