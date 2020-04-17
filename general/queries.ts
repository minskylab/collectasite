import gql from "graphql-tag";

export const queryUser = gql`
	query user($id: ID!) {
		user(id: $id) {
			id
			name
			picture
			username
			lastActivity
			surveys {
				id
				dueDate
				title
				description
				tags
			}
			domain {
				name
				domain
			}
			contacts {
				kind
				value
			}
		}
	}
`;

export const querySurvey = gql`
	query survey($id: ID!) {
		survey(id: $id) {
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

export const queryQuestion = gql`
	query question($id: ID!) {
		question(id: $id) {
			id
			title
			description
			input {
				kind
				options
			}
			answers {
				id
				responses
			}
			flow {
				state
			}
		}
	}
`;

export const queryLastQuestionOfSurvey = gql`
	query lastQuestionOfSurvey($id: ID!) {
		lastQuestionOfSurvey(id: $id) {
			id
			title
			description
			anonymous
			input {
				kind
				options
				multiple
			}
			answers {
				id
				responses
			}
			flow {
				state
			}
		}
	}
`;

export const userByToken = gql`
	query userByToken($token: String!) {
		userByToken(token: $token) {
			id
			name
			picture
			username
			lastActivity
			surveys {
				id
				dueDate
				title
				description
				tags
			}
			domain {
				name
				domain
			}
			contacts {
				kind
				value
			}
		}
	}
`;
