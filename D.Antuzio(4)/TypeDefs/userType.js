const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} = graphql;

const userType = new GraphQLObjectType ({
    name: "User",
    fields: () => ({
        id: {type: GraphQLInt},
        Name: {type: GraphQLString},
        Username: {type: GraphQLString},
        Nationality: {type: GraphQLString},
        Movie_Name: {type: GraphQLString},
        Age: {type: GraphQLInt},
    }),
})

module.exports = userType