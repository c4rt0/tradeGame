const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const events = eventIds => {
    return Event.find({_id: {$in: eventIds}})
    .then(events => {
        return events.map(event => {
            return{ 
                ...event._doc, 
                _id: event.id, 
                date: new Date(event._doc.date).toISOString(),
                creator: user
                .bind(this, event.creator)
            };
        });
    })
    .catch(err => {
        throw err;
    });
};

const user = userId => {
    return User.findById(userId)
    .then(user => {
        return { ...user._doc,
            _id: user.id, 
            placedTrades: events.bind(this, user._doc.placedTrades)
        };
    })
    .catch(err => {
        throw err;
    });
}

module.exports = {
    events: () => {
      return Event.find()
      .then(events => {
          return events.map(event =>{
              return { 
                  ...event._doc, 
                  _id: event.id,
                  date: new Date(event._doc.date).toISOString(),
                  creator: user.bind(this, event._doc.creator)
              };
          });
      })
      .catch(err => {
          throw err;
      });
    },
    placeTrade: args => {
      const event = new Event({
          ticker: args.eventInput.ticker,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator : '6043b9a6b805a717e8b5e1cf'
      });
      let placedTrade;
      return event
      .save()
      .then(result => {
          placedTrade = { 
              ...result._doc, 
              _id: result._doc._id.toString(), 
              date: new Date(event._soc.date).toISOString, 
              creator: user.bind(this, result._doc.creator)
          };
          return User.findById('6043b9a6b805a717e8b5e1cf');
      })
      .then(user => {
          if (!user) {
              throw new Error('User not found.');
          }
          user.placedTrades.push(event);
          return user.save();
      })
      .then(result => {
          return placedTrade;
      })
      .catch(err => {
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
              return {
                  ...result._doc, 
                  password: null, 
                  _id: result.id 
                }; // password: null here overrides the password which now cannot be returned & is hashed anyway
          })
          .catch(err => {
              throw err;
          });
          }
      }