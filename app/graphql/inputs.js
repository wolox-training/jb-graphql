const { gql } = require('apollo-server');

module.exports = gql`
  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String! @constraint(format: "email", minLength: 12, pattern: ".*@wolox.(ar|co|cl|com.ar)$")
    password: String! @constraint(minLength: 8)
  }
  input LoginInput {
    username: String!
    password: String!
  }
  input SortingInput {
    sortField: String!
    sortOrder: String!
  }
  input FilterInput {
    fieldFilter: String!
    valueFilter: String!
  }
  directive @constraint(pattern: String, format: String, minLength: Int) on INPUT_FIELD_DEFINITION
`;
