const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// instead of .get request reaching here graphQL endpoint
app.use(
  '/graphql', // could be called anything (i.e.: api)
  graphqlHttp({
    schema: graphQlSchema, // this points at the valid graphQL schema
    rootValue: graphQlResolvers, // points at js object which have all the graphQL resolver functions (which on the other hand need to point at schema)
    graphiql: true
  })
);

// Connecting to db
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@tradecluster0.dmvrd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() => {
    console.log('Connection succesfull! ')
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});