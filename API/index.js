// const startServerAndCreateLambdaHandler = require('@as-integrations/aws-lambda');
import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from "@apollo/server";
import { gql } from "apollo-server";
import neo4j from "neo4j-driver";
// const { Neo4jGraphQL } = require("@neo4j/graphql");
// const { ApolloServer, gql } = require("apollo-server");
// const neo4j = require("neo4j-driver");
// const { ApolloServer, gql } = require(‘apollo-server-lambda’);

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
// const resolvers = {
//   Query: {
//     hello: () => 'world',
//   },
// };
// const resolvers = {
//   Query: {
//     hello: () => 'world',
//   },
// };
// const schema = neoSchema.getSchema().then((schema) => {
//     const server = new ApolloServer({
//       schema,
//     });

//   });
const schema = await neoSchema.getSchema();
const server = new ApolloServer({
  schema,
  // resolvers
});
export const graphqlHandler = startServerAndCreateLambdaHandler(server);
// export const graphqlHandler = async () => {
//   return await neoSchema.getSchema().then((schema) => {
//     const server = new ApolloServer({
//       schema,
//       // context: ({ event }) => ({ req: event }),
//       // introspection: process.env.SLS_STAGE === 'dev',
//     });
//     return startServerAndCreateLambdaHandler(server);
//   });
// };

// neoSchema.getSchema().then((schema) => {
//   const server = new ApolloServer({
//     schema,
//   });

//   server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
//   });
// });
