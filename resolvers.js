module.exports = {
  Query: {
    getUser: () => null
  },

  Mutation: {
    signupUser: async (_, { username, email, password}, { User }) => {
      const user = await User.findOne({ username });

      if(user){
        throw new Error('User already exists');
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return newUser;
    },

    addPost: async (_, { title, imageUrl, categories, description,  createdId }, { Post }) => {

      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: createdId
      }).save();

      return newPost;


    }
  }
}