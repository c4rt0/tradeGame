const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();

const events = [];

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            ticker: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            ticker: String!
            description: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
        .then( events => {
            return events.map(event =>{
                return { ...event._doc, _id: event.id };
            });
        })
        .catch(err => {
            throw err;
        });
      },
      createEvent: args => {
        const event = new Event({
            ticker: args.eventInput.ticker,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date)
        });
        return event
        .save()
        .then(result => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() }; //spread operator 
        }).catch(err => {
            console.log(err);
            throw err; 
        });
        // events.push(event); //that's no more necessary since we already saved it in DB with above save() method
        // return event;
      }
    },
    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@tradecluster0.dmvrd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() => {
    console.log('Connection succesfull! ')
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});