export const answerQuestion = `
  mutation answerQuestion($input: QuestionResponse) {
    answerQuestion (input: $input) {
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
