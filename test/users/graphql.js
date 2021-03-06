const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          name,
          firstName,
          lastName,
          email
        }
      }`;

const getUsers = () => gql`
  query {
    users {
      name
      firstName
      lastName
      email
    }
  }
`;

const createUser = userInput => ({
  mutation: gql`
    mutation createUser($userInput: UserInput!) {
      createUser(user: $userInput) {
        firstName
        lastName
        id
        username
        password
        email
      }
    }
  `,
  variables: { userInput }
});

const login = loginInput => ({
  mutation: gql`
    mutation login($loginInput: LoginInput!) {
      login(credentials: $loginInput) {
        accessToken
      }
    }
  `,
  variables: { loginInput }
});

module.exports = { getUser, getUsers, createUser, login };
