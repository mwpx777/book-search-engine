// typeDefs

// import gwl tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        me: User
    }

    type User{
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth{
        token: ID
        user: User
    }

    type Book{
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook) : User
        removeBook(bookId: String!) : User
       
       
    }

    input savedBook{
        bookId: String
        authors: [String]
        title: String
        description: String
        image: String
        link: String

    }
    `;
    

module.exports = typeDefs;