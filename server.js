//bring in apollo server
const { ApolloServer, gql }  = require('apollo-server');

//bring in mongoose to make connection to db
const mongoose = require('mongoose');

//grab variables from dotenv file
require('dotenv').config({ path: 'variables.env' });

const User = require('./models/User')
const Post = require('./models/Post')

//setup connection to db
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

mongoose.set('useCreateIndex', true)

const typeDefs = gql`

type Query {
  getTodos: [Todo]
}

type Todo {
  task: String
  completed: Boolean
}
`;

const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${ url }`)
});