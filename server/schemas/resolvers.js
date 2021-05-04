// resolvers
// define the query and mutation functionality to work with Mongoose Models

const {Book} = require('../models');

const resolvers = {
    Query: {
        Book: () => {
            return ' {book.authors}'
        }
    }
}


// getSingleUser

// createUser

// login

// saveBook

// deleteBook
module.exports = resolvers;