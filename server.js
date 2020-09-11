//bring in apollo server
const { ApolloServer }  = require('apollo-server');

//bring in mongoose to make connection to db
const mongoose = require('mongoose');

const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

//grab variables from dotenv file
require('dotenv').config({ path: './variables.env' });

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${ url }`)
});