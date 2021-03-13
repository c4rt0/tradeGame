const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Trading{
    _id: ID!
    trade: Trade!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Trade {
    _id: ID!
    ticker: String!
    description: String!
    price: Float!
    date: String!
    trader: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdTrades: [Trade!]
}

input TradeInput {
    ticker: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput {
    email: String!
    password: String!
}

type RootQuery {
    trades: [Trade!]!
    placedTrades: [Trading!] 
}
type RootMutation {
    createTrade(tradeInput: TradeInput): Trade
    createUser(userInput: UserInput): User
    placeTrade(tradeId: ID!): Trading!
    cancelTrade(tradingID: ID!): Trade!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);