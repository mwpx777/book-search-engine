// resolvers
// define the query and mutation functionality to work with Mongoose Models

const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
            }

            throw new AuthenitcationError('Not Logged In!')
        },
    },

    Mutation: {

        addUser: async (parent, args) => {
            // create new user with args passed in 
            const user = await User.create(args);
            // create token from signToken(user)
            const token = signToken(user);

            return { token, user };
        },
        // destructure email and password from args
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect credentials');

            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { input }, context) => {
            // console.log({input})
            if (context.user) {

                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    // return savedBook array with added savedBook
                    { new: true }
                );

                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, args, context) => {

            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    // return savedBooks array with removed savedBook
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;