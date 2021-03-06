const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');
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

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input EventInput {
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
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
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
      },
      createUser: args=> {
          return User.findOne({ email: args.userInput.email })
          .then(user => {
              if (user) {
                  throw new Error('User exists already.');
              } 
              return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(result => {
                return {...result._doc, password: null, _id: result.id }; // password: null here overrides the password which now cannot be returned & is hashed anyway
            })
            .catch(err => {
                throw err;
            });
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