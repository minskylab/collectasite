export const answerQuestion = `
  mutation answerQuestion($questionID: ID!, $answer: [String!]!) {
    answerQuestion (questionID: $questionID, answer: $answer) {
      id
      dueDate
      title
      description
      tags
      flow {
        questions {
          id
          title
          description
          input {
            kind
          }
        }
      }
    }
  }
`;
