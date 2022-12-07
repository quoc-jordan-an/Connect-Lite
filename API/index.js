const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type SKILL {
        id: ID! @id
        skill_name: String
        users: [USER!]! @relationship(type: "HAS_SKILL", properties: "Rating", direction: IN)
    }

    type USER {
        id: ID! @id
        name: String
        has_skills: [SKILL!]! @relationship(type: "HAS_SKILL", properties: "Rating", direction: OUT)
    }

    interface Rating @relationshipProperties{
        rating: Int
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