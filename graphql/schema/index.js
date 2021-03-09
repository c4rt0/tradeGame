const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Portfolio {
            _id: ID!
            ticker: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            placedTrades: [Portfolio!]
        }

        input PortfolioInput {
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
            portfolios: [Portfolio!]!
        }
        type RootMutation {
            placeTrade(portfolioInput: PortfolioInput): Portfolio
            createUser(userInput: UserInput): User
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);