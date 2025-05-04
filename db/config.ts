import { defineDb, defineTable, column } from 'astro:db';

const Stock = defineTable({
  columns: {
    availableShares: column.number(),
    name: column.text(),
    price: column.number(),
    ticker: column.text({primaryKey: true}),
    totalShares: column.number(),
  }
})

const User = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    name: column.text(),
    balance: column.number(),
    stocks: column.json(),
  }
})

export default defineDb({
  tables: { Stock, User },
})