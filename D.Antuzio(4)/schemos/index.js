const graphql = require("graphql");
const userData = require("../Data.json");
const userType = require("../TypeDefs/userType");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const RootQuery = new GraphQLObjectType({
    name: 'RootQuerryType',
    fields: {
        getAllUsers: { 
        type: new GraphQLList(userType),
        args: { id: { type: GraphQLInt}},
        resolve(parent, args) {
            return userData
        }
    }
}
}) 

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
        type: userType,
        args: {
            Name: {type: GraphQLString},
            Username: {type: GraphQLString},
            Nationality: {type: GraphQLString},
            Movie_Name: {type: GraphQLString},
            Age: {type: GraphQLInt},
        },
        resolve(parent, args) {
            userData.push({id: userData.length + 1, Name: args.Name, Username: args.Username, Nationality: args.Nationality, Movie_Name: args.Movie_Name, Age: args.Age})
            return args;
        }
    }
}
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation});