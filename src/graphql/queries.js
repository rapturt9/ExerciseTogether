/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getExerciseReal = /* GraphQL */ `
  query GetExerciseReal($room: ID!) {
    getExerciseReal(room: $room) {
      room
      query
      video
      submit
    }
  }
`;
export const listExerciseReals = /* GraphQL */ `
  query ListExerciseReals(
    $filter: TableExerciseRealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExerciseReals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        room
        query
        video
        submit
      }
      nextToken
    }
  }
`;
