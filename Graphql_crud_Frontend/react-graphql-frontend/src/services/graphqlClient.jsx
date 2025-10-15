import { GraphQLClient } from "graphql-request";

const API_URL = "http://localhost:8080/graphql";

export const graphQLClient = new GraphQLClient(API_URL);

// GraphQL Queries
export const GET_ALL_USERS = `
  query {
    getAllUsers {
      id
      name
      email
      age
    }
  }
`;

export const GET_USER_BY_ID = `
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      email
      age
    }
  }
`;

export const GET_USERS_BY_NAME = `
  query GetUsersByName($name: String!) {
    getUsersByName(name: $name) {
      id
      name
      email
      age
    }
  }
`;

export const CREATE_USER = `
  mutation CreateUser($name: String!, $email: String!, $age: Int) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

export const UPDATE_USER = `
  mutation UpdateUser($id: ID!, $name: String!, $email: String!, $age: Int) {
    updateUser(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

export const DELETE_USER = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
