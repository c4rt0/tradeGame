const { buildSchema } = require('graphql');

module.exports = buildSchema(`

""" Main Trade schema """
type Trade {
    _id: ID!
    ticker: String!
    description: String!
    price: Float!
    quantity: Int!
    date: String!
    "Trader is for now pre-defined"
    user: User!
}

type AllAvailableTrades {
    _id: ID!
    ticker: String!
    description: String!
    user: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdTrades: [Trade!]
    # placedTrades: [PlacedTrades!]     # Something to work on
    admin: Boolean!
}

type PlacedTrades{
    _id: ID!
    trade: Trade!
    createdAt: String!
    updatedAt: String!
}

input PlacedTradeInput{
    _id: ID!
    price: Float!
    quantity: Float!
}

input CreatedTradeInput {
    ticker: String!
    description: String!
    #price: Float!
    #date: String!
}

input UserInput {
    email: String!
    password: String!
}

type RootQuery {
    trades: [Trade!]!           # it could be also called getTrades,but keeping it 
    placedTrades: [PlacedTrades!]!          # in mind as an object it's called as a property
                                            # which can hold a list/array of all of the trades
}
type RootMutation {
    createTrade(createTradeInput: CreatedTradeInput): Trade      # createTrade(named tradeinput: of type TradeInput) : returning Trade
    createUser(userInput: UserInput): User
    placeTrade(placeTrade: PlacedTradeInput): PlacedTrades!
    cancelTrade(placedTradeId: ID!): Trade!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);