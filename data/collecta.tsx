import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
  Map: any;
};

export type Survey = {
   __typename?: 'Survey';
  id: Scalars['ID'];
  tags: Array<Scalars['String']>;
  lastInteraction: Scalars['Time'];
  dueDate: Scalars['Time'];
  title: Scalars['String'];
  description: Scalars['String'];
  metadata: Array<MetadataPair>;
  done: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  flow: Flow;
  for: User;
  owner: Domain;
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type QuestionCreator = {
  title: Scalars['String'];
  description: Scalars['String'];
  kind: InputType;
  multiple?: Maybe<Scalars['Boolean']>;
  anonymous?: Maybe<Scalars['Boolean']>;
  options?: Maybe<Array<Pair>>;
};

export type SurveyGenerator = {
  title: Scalars['String'];
  description: Scalars['String'];
  tags: Array<Scalars['String']>;
  questions: Array<QuestionCreator>;
  target: SurveyTargetUsers;
  metadata?: Maybe<Array<Pair>>;
  logic?: Maybe<Scalars['String']>;
  due?: Maybe<Scalars['Time']>;
};

export type LastSurveyState = {
   __typename?: 'LastSurveyState';
  lastQuestion: Question;
  percent: Scalars['Float'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  username: Scalars['String'];
  lastActivity: Scalars['Time'];
  picture: Scalars['String'];
  roles: Array<Scalars['String']>;
  accounts: Account;
  contacts: Contact;
  surveys: Array<Survey>;
  domains: Array<Domain>;
  adminOf: Array<Domain>;
};

export type Question = {
   __typename?: 'Question';
  id: Scalars['ID'];
  hash: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  anonymous: Scalars['Boolean'];
  metadata: Array<MetadataPair>;
  validator: Scalars['String'];
  answers: Array<Answer>;
  input: Input;
  flow: Flow;
};

export type SurveyTargetUsers = {
  targetKind: SurveyAudenceKind;
  whitelist?: Maybe<Array<Scalars['ID']>>;
};

export type DomainCreator = {
  name: Scalars['String'];
  email: Scalars['String'];
  domain: Scalars['String'];
  collectaDomain: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  answerQuestion: Survey;
  backwardSurvey: Survey;
  loginByPassword: LoginResponse;
  updatePassword: Scalars['Boolean'];
  createNewDomain: Domain;
  generateSurveys: SuveyGenerationResult;
};


export type MutationAnswerQuestionArgs = {
  questionID: Scalars['ID'];
  answer: Array<Scalars['String']>;
};


export type MutationBackwardSurveyArgs = {
  surveyID: Scalars['ID'];
};


export type MutationLoginByPasswordArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateNewDomainArgs = {
  draft: DomainCreator;
};


export type MutationGenerateSurveysArgs = {
  domainSelector: SurveyDomain;
  draft: SurveyGenerator;
};


export type SuveyGenerationResult = {
   __typename?: 'SuveyGenerationResult';
  how: Scalars['Int'];
  surveys: Array<Survey>;
};

export type MetadataPair = {
   __typename?: 'MetadataPair';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Domain = {
   __typename?: 'Domain';
  id: Scalars['ID'];
  tags: Array<Scalars['String']>;
  name: Scalars['String'];
  email: Scalars['String'];
  domain: Scalars['String'];
  collectaDomain: Scalars['String'];
  surveys: Array<Survey>;
  users: Array<User>;
  admins: Array<User>;
};

export type Contact = {
   __typename?: 'Contact';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  value: Scalars['String'];
  kind: Scalars['String'];
  principal: Scalars['Boolean'];
  validated: Scalars['Boolean'];
  fromAccount: Scalars['Boolean'];
  owner: User;
};

export type Answer = {
   __typename?: 'Answer';
  id: Scalars['ID'];
  at: Scalars['Time'];
  responses: Array<Scalars['String']>;
  valid: Scalars['Boolean'];
  question: Question;
};

export type Query = {
   __typename?: 'Query';
  domain: Domain;
  survey: Survey;
  question: Question;
  user: User;
  profile: User;
  isFirstQuestion: Scalars['Boolean'];
  isFinalQuestion: Scalars['Boolean'];
  surveyPercent: Scalars['Float'];
  lastQuestionOfSurvey: LastSurveyState;
};


export type QueryDomainArgs = {
  id: Scalars['ID'];
};


export type QuerySurveyArgs = {
  id: Scalars['ID'];
};


export type QueryQuestionArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryIsFirstQuestionArgs = {
  questionID: Scalars['ID'];
};


export type QueryIsFinalQuestionArgs = {
  questionID: Scalars['ID'];
};


export type QuerySurveyPercentArgs = {
  surveyID: Scalars['ID'];
};


export type QueryLastQuestionOfSurveyArgs = {
  surveyID: Scalars['ID'];
};


export type Flow = {
   __typename?: 'Flow';
  id: Scalars['ID'];
  state: Scalars['ID'];
  stateTable: Scalars['String'];
  initialState: Scalars['ID'];
  terminationState: Scalars['ID'];
  pastState: Scalars['ID'];
  inputs: Array<Scalars['String']>;
  questions: Array<Question>;
};

export enum SurveyAudenceKind {
  Public = 'PUBLIC',
  Domain = 'DOMAIN',
  Close = 'CLOSE'
}

export type SurveyDomain = {
  byID?: Maybe<Scalars['ID']>;
  byDomainName?: Maybe<Scalars['String']>;
};

export type Pair = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Account = {
   __typename?: 'Account';
  id: Scalars['ID'];
  type: Scalars['String'];
  sub: Scalars['String'];
  remoteID: Scalars['String'];
  secret: Scalars['String'];
  owner: User;
};

export type Short = {
   __typename?: 'Short';
  key: Scalars['String'];
  value: Scalars['ID'];
};

export enum InputType {
  Option = 'OPTION',
  Text = 'TEXT',
  Boolean = 'BOOLEAN',
  Satisfaction = 'SATISFACTION'
}

export type Input = {
   __typename?: 'Input';
  id: Scalars['ID'];
  kind: Scalars['String'];
  multiple: Scalars['Boolean'];
  defaults: Array<Maybe<Scalars['String']>>;
  options: Scalars['Map'];
  question: Question;
};

export type AnswerQuestionMutationVariables = {
  questionID: Scalars['ID'];
  answer: Array<Scalars['String']>;
};


export type AnswerQuestionMutation = (
  { __typename?: 'Mutation' }
  & { answerQuestion: (
    { __typename?: 'Survey' }
    & Pick<Survey, 'id' | 'dueDate' | 'title' | 'description' | 'tags'>
    & { flow: (
      { __typename?: 'Flow' }
      & { questions: Array<(
        { __typename?: 'Question' }
        & Pick<Question, 'id' | 'title' | 'description'>
        & { input: (
          { __typename?: 'Input' }
          & Pick<Input, 'kind'>
        ) }
      )> }
    ) }
  ) }
);

export type BackwardSurveyMutationVariables = {
  surveyID: Scalars['ID'];
};


export type BackwardSurveyMutation = (
  { __typename?: 'Mutation' }
  & { backwardSurvey: (
    { __typename?: 'Survey' }
    & Pick<Survey, 'id' | 'dueDate' | 'title' | 'description' | 'tags'>
    & { flow: (
      { __typename?: 'Flow' }
      & { questions: Array<(
        { __typename?: 'Question' }
        & Pick<Question, 'id' | 'title' | 'description'>
        & { input: (
          { __typename?: 'Input' }
          & Pick<Input, 'kind'>
        ) }
      )> }
    ) }
  ) }
);

export type LoginByPasswordMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type LoginByPasswordMutation = (
  { __typename?: 'Mutation' }
  & { loginByPassword: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
  ) }
);

export type SurveyQueryVariables = {
  id: Scalars['ID'];
};


export type SurveyQuery = (
  { __typename?: 'Query' }
  & { survey: (
    { __typename?: 'Survey' }
    & Pick<Survey, 'id' | 'dueDate' | 'title' | 'description' | 'tags'>
    & { flow: (
      { __typename?: 'Flow' }
      & Pick<Flow, 'state' | 'initialState' | 'terminationState'>
    ) }
  ) }
);

export type QuestionQueryVariables = {
  id: Scalars['ID'];
};


export type QuestionQuery = (
  { __typename?: 'Query' }
  & { question: (
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'title' | 'description'>
    & { input: (
      { __typename?: 'Input' }
      & Pick<Input, 'kind' | 'options'>
    ), answers: Array<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'id' | 'responses'>
    )>, flow: (
      { __typename?: 'Flow' }
      & Pick<Flow, 'state'>
    ) }
  ) }
);

export type LastQuestionOfSurveyQueryVariables = {
  surveyID: Scalars['ID'];
};


export type LastQuestionOfSurveyQuery = (
  { __typename?: 'Query' }
  & { lastQuestionOfSurvey: (
    { __typename?: 'LastSurveyState' }
    & Pick<LastSurveyState, 'percent'>
    & { lastQuestion: (
      { __typename?: 'Question' }
      & Pick<Question, 'id' | 'title' | 'description' | 'anonymous'>
      & { input: (
        { __typename?: 'Input' }
        & Pick<Input, 'kind' | 'multiple' | 'defaults' | 'options'>
      ), answers: Array<(
        { __typename?: 'Answer' }
        & Pick<Answer, 'id' | 'responses'>
      )>, flow: (
        { __typename?: 'Flow' }
        & Pick<Flow, 'state'>
      ) }
    ) }
  ) }
);

export type IsFirstQuestionQueryVariables = {
  questionID: Scalars['ID'];
};


export type IsFirstQuestionQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isFirstQuestion'>
);

export type IsFinalQuestionQueryVariables = {
  questionID: Scalars['ID'];
};


export type IsFinalQuestionQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isFinalQuestion'>
);

export type ProfileQueryVariables = {};


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { profile: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'picture' | 'username' | 'lastActivity'>
    & { surveys: Array<(
      { __typename?: 'Survey' }
      & Pick<Survey, 'id' | 'dueDate' | 'title' | 'description' | 'tags'>
    )>, domains: Array<(
      { __typename?: 'Domain' }
      & Pick<Domain, 'name' | 'domain'>
    )>, contacts: (
      { __typename?: 'Contact' }
      & Pick<Contact, 'kind' | 'value'>
    ) }
  ) }
);


export const AnswerQuestionDocument = gql`
    mutation AnswerQuestion($questionID: ID!, $answer: [String!]!) {
  answerQuestion(questionID: $questionID, answer: $answer) {
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

export const AnswerQuestionComponent = (props: Omit<Urql.MutationProps<AnswerQuestionMutation, AnswerQuestionMutationVariables>, 'query'> & { variables?: AnswerQuestionMutationVariables }) => (
  <Urql.Mutation {...props} query={AnswerQuestionDocument} />
);


export function useAnswerQuestionMutation() {
  return Urql.useMutation<AnswerQuestionMutation, AnswerQuestionMutationVariables>(AnswerQuestionDocument);
};
export const BackwardSurveyDocument = gql`
    mutation BackwardSurvey($surveyID: ID!) {
  backwardSurvey(surveyID: $surveyID) {
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

export const BackwardSurveyComponent = (props: Omit<Urql.MutationProps<BackwardSurveyMutation, BackwardSurveyMutationVariables>, 'query'> & { variables?: BackwardSurveyMutationVariables }) => (
  <Urql.Mutation {...props} query={BackwardSurveyDocument} />
);


export function useBackwardSurveyMutation() {
  return Urql.useMutation<BackwardSurveyMutation, BackwardSurveyMutationVariables>(BackwardSurveyDocument);
};
export const LoginByPasswordDocument = gql`
    mutation LoginByPassword($username: String!, $password: String!) {
  loginByPassword(username: $username, password: $password) {
    token
  }
}
    `;

export const LoginByPasswordComponent = (props: Omit<Urql.MutationProps<LoginByPasswordMutation, LoginByPasswordMutationVariables>, 'query'> & { variables?: LoginByPasswordMutationVariables }) => (
  <Urql.Mutation {...props} query={LoginByPasswordDocument} />
);


export function useLoginByPasswordMutation() {
  return Urql.useMutation<LoginByPasswordMutation, LoginByPasswordMutationVariables>(LoginByPasswordDocument);
};
export const SurveyDocument = gql`
    query Survey($id: ID!) {
  survey(id: $id) {
    id
    dueDate
    title
    description
    tags
    flow {
      state
      initialState
      terminationState
    }
  }
}
    `;

export const SurveyComponent = (props: Omit<Urql.QueryProps<SurveyQuery, SurveyQueryVariables>, 'query'> & { variables: SurveyQueryVariables }) => (
  <Urql.Query {...props} query={SurveyDocument} />
);


export function useSurveyQuery(options: Omit<Urql.UseQueryArgs<SurveyQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SurveyQuery>({ query: SurveyDocument, ...options });
};
export const QuestionDocument = gql`
    query Question($id: ID!) {
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

export const QuestionComponent = (props: Omit<Urql.QueryProps<QuestionQuery, QuestionQueryVariables>, 'query'> & { variables: QuestionQueryVariables }) => (
  <Urql.Query {...props} query={QuestionDocument} />
);


export function useQuestionQuery(options: Omit<Urql.UseQueryArgs<QuestionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuestionQuery>({ query: QuestionDocument, ...options });
};
export const LastQuestionOfSurveyDocument = gql`
    query LastQuestionOfSurvey($surveyID: ID!) {
  lastQuestionOfSurvey(surveyID: $surveyID) {
    lastQuestion {
      id
      title
      description
      anonymous
      input {
        kind
        multiple
        defaults
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
    percent
  }
}
    `;

export const LastQuestionOfSurveyComponent = (props: Omit<Urql.QueryProps<LastQuestionOfSurveyQuery, LastQuestionOfSurveyQueryVariables>, 'query'> & { variables: LastQuestionOfSurveyQueryVariables }) => (
  <Urql.Query {...props} query={LastQuestionOfSurveyDocument} />
);


export function useLastQuestionOfSurveyQuery(options: Omit<Urql.UseQueryArgs<LastQuestionOfSurveyQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LastQuestionOfSurveyQuery>({ query: LastQuestionOfSurveyDocument, ...options });
};
export const IsFirstQuestionDocument = gql`
    query IsFirstQuestion($questionID: ID!) {
  isFirstQuestion(questionID: $questionID)
}
    `;

export const IsFirstQuestionComponent = (props: Omit<Urql.QueryProps<IsFirstQuestionQuery, IsFirstQuestionQueryVariables>, 'query'> & { variables: IsFirstQuestionQueryVariables }) => (
  <Urql.Query {...props} query={IsFirstQuestionDocument} />
);


export function useIsFirstQuestionQuery(options: Omit<Urql.UseQueryArgs<IsFirstQuestionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsFirstQuestionQuery>({ query: IsFirstQuestionDocument, ...options });
};
export const IsFinalQuestionDocument = gql`
    query IsFinalQuestion($questionID: ID!) {
  isFinalQuestion(questionID: $questionID)
}
    `;

export const IsFinalQuestionComponent = (props: Omit<Urql.QueryProps<IsFinalQuestionQuery, IsFinalQuestionQueryVariables>, 'query'> & { variables: IsFinalQuestionQueryVariables }) => (
  <Urql.Query {...props} query={IsFinalQuestionDocument} />
);


export function useIsFinalQuestionQuery(options: Omit<Urql.UseQueryArgs<IsFinalQuestionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsFinalQuestionQuery>({ query: IsFinalQuestionDocument, ...options });
};
export const ProfileDocument = gql`
    query Profile {
  profile {
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
    domains {
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

export const ProfileComponent = (props: Omit<Urql.QueryProps<ProfileQuery, ProfileQueryVariables>, 'query'> & { variables?: ProfileQueryVariables }) => (
  <Urql.Query {...props} query={ProfileDocument} />
);


export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options });
};