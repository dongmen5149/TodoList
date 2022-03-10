import { gql } from "apollo-server-express";
import messageSchema from "./message";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, messageSchema];
