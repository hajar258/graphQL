import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from './schema.js'
import {db} from './_db.js'

// server setup

const resolvers ={
    Query:{
        games(){
            return db.games
        },
        reviews(){
            return db.reviews
        },
        authors(){
            return db.authors
        }
        
    }
}

const server = new ApolloServer({
// this object takes two arguments 
// 1. typeDefs ==> type definitions =>  descriptions of our data types and the relationship they have with other data types 
// 2. resolvers ==> bunch of resolver functions that determine how we respond to queries for different data on the graph 
    typeDefs,
    resolvers
})



const {url} = await startStandaloneServer(server,{
    listen:{port:4000}
})


console.log("Server ready at port", 4000 );