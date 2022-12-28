const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
  type SKILL {
    id: ID! @id
    skill_name: String
    users: [USER!]!
      @relationship(type: "HAS_SKILL", properties: "Rating", direction: IN)
  }

  type USER {
    id: ID!
    name: String
    has_skills: [SKILL!]!
      @relationship(type: "HAS_SKILL", properties: "Rating", direction: OUT)
  }

  interface Rating @relationshipProperties {
    rating: Int
  }

  type Mutation {
    mergeUser(id: ID!, name: String!): USER
      @cypher(
        statement: """
        MERGE (u:USER {id: $id})
        ON CREATE SET u.id = $id, u.name = $name
        ON MATCH SET u.name = $name
        """
      )
  }
`;

const driver = neo4j.driver(
  "neo4j+s://cf6de691.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "hCvSoOC9UHTmt7ouRu2V7b1LYkZEDVyuHCEqX8kYF_w")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
    schema,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
