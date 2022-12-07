const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type SKILL {
        skill_name: String
        users: [USER!]! @relationship(type: "HAS_SKILL", direction: IN)
    }

    type USER {
        name: String
        skills: [SKILL!]! @relationship(type: "HAS_SKILL", direction: OUT)
    }

`;

const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic("neo4j", "12345678910")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });
  
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
  })