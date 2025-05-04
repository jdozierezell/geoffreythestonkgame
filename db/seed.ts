import { db, User, Stock } from 'astro:db';

export default async function() {
  await db.insert(User).values([
    {id: "001",
		name: "John Doe",
		balance: 80,
		stocks: []},
    {id: "002",
		name: "Jane Doe",
		balance: 80,
		stocks: []},
    {id: "003",
		name: "Jim Doe",
		balance: 80,
		stocks: []}
  ]);

  await db.insert(Stock).values([
    {availableShares: 5000,
		name: "Apple",
		price: 100,
		ticker: "AAPL",
		totalShares: 5000},
    {availableShares: 5000,
		name: "Microsoft",
		price: 100,
		ticker: "MSFT",
		totalShares: 5000},
    {availableShares: 5000,
		name: "Google",
		price: 100,
		ticker: "GOOG",
		totalShares: 5000},
  ])
}	