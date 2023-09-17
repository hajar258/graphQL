export const typeDefs = `#graphql
    type Game{
        id : ID!
        title: String!
        platform:[String!]!

        # we need to create a resolver for this 
        reviews:[Review!]
    }
    type Review{
        id: ID!
        rating:Int!
        content: String!


        # we need to create a resolver for these
        game: Game!
        author: Author!
    }

    type Author{
        id: ID!
        name: String! 
        verified: Boolean!
        
        reviews:[Review!] # we need to create a resolver for this 
    }


    # this is a must , it is not optional, this is to specify the end points of our api 
    # this is the root query! like the root route
    type Query{
        # these are the endpoits that users can use to get the data 
        # this allow the usrrs to go to all the data that we have 
        reviews: [Review]
        games: [Game]
        authors: [Author]

        # this is to land on a single one of data 
        review(id: ID!):Review # what inside this () specify the parameter to be passed to the query
        game(id: ID!):Game
        author(id:ID!):Author
    }

    # here we will define the mutations 
    type Mutation{
        deleteGame(id:ID!):[Game]
        addGame(game: AddGameInput!):Game
        updateGame(id:ID!, edits: EditGameInput):Game

    }

    # thi is a collection of fields that can be used in a mutation a a single argumant
    input AddGameInput{
        title:String!
        platform:[String!]!
    }
    input EditGameInput{
        title:String
        platform:[String!]
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