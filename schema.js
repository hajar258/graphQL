export const typeDefs = `#graphql
    type Game{
        id : ID!
        title: String!
        platform:[String!]!
    }
    type Review{
        id: ID!
        rating:Int!
        content: String!
    }

    type Author{
        id: ID!
        name: String! 
        verified: Boolean!
    }


    # this is a must , it is not optional
    type Query{
        # these are the endpoits that users can use to get the data 
        # this allow the usrrs to go to all the data that we have 
        reviews: [Review]
        games: [Game]
        authors: [Author]

         
        # this is to land on a single one of data 
    }


`

/**
 * In GraphQL, there are 5 basic scalar types that we can use: 
 * 1. int
 * 2. float
 * 3. string
 * 4. boolean 
 * 5. ID
 */