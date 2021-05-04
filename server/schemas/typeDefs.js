// typeDefs

// import gwl tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        me: User
    }

    type User{
        _id: ID!
        username: String!
        email: String!
        bookCount: String
        savedBooks: [Book]
    }

    type Auth{
        token: ID!
        user: User
    }

    type Book{
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: String!) : User
        removeBook(bookId: String!) : User
       
       
    }

    type SavedBook{
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String

    }
    `;

module.exports = typeDefs;