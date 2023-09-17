/**
 * Mutation mean any change to be done on the data 
 */


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
        },
        // args to access any parameters passed to the query
        // context ==> ued for supplying context values accross all of our resolvers uch as authentication information 
        review(_,args,context){
            return db.reviews.find((review)=> review.id === args.id
            )
        },
        game(_,args,context){
            return db.games.find((game)=> game.id === args.id
            )
        },
        author(_,args,context){
            return db.authors.find((author)=> author.id === args.id
            )
        },
    },
    Game:{
        // parent ==> is a reference to the value returned by previous or parent resolver 
        // in this case, it will look at the game resolver 
        reviews(parent,){
            return db.reviews.filter((r)=> r.game_id === parent.id)
        },
    },
    Author:{
        // parent ==> is a reference to the value returned by previous or parent resolver 
        // in this case, it will look at the author resolver 
        reviews(parent,){
            return db.reviews.filter((r)=> r.author_id === parent.id)
        },
    },
    Review:{
        // parent ==> is a reference to the value returned by previous or parent resolver 
        // in this case, it will look at the review resolver 
        game(parent,){
            return db.games.find((g)=> g.id === parent.game_id)
        },
        author(parent){
            return db.authors.find((a)=> a.id === parent.author_id)
        }
    },
    Mutation:{
        deleteGame(parent, args, ){
            db.games = db.games.filter((g)=> g.id != args.id)
            return db.games
        },
        addGame(parent, args, ){
            let game = {
                ...args.game,
                id: Math.floor(Math.random()*100000).toString()
            }
            db.games.push(game)
            return game
        },
        updateGame(parent, args){
            db.games= db.games.map((g)=>{
                if(g.id === args.id){
                    return {...g, ...args.edits}
                }

                return g
            })
            return db.games.find((g)=> g.id == args.id)
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


