/* eslint-disable */
// this is an auto generated file. This will be overwritten

/*

export const onCreateCanvas = 
  subscription OnCreateCanvas {
    onCreateCanvas {
      id
      clientId
      data
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCanvas = 
  subscription OnUpdateCanvas {
    onUpdateCanvas {
      id
      clientId
      data
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCanvas =  `
  subscription OnDeleteCanvas {
    onDeleteCanvas {
      id
      clientId
      data
      createdAt
      updatedAt
    }
  }
`;
*/



export const onCreateExerciseReal = `
  subscription OnCreateExerciseReal(
    $room: ID
    $query: String
    $video: String
    $submit: Int
  ) {
    onCreateExerciseReal(
      room: $room
      query: $query
      video: $video
      submit: $submit
    ) {
      room
      query
      video
      submit
    }
  }
`;
export const onUpdateExerciseReal = `
  subscription OnUpdateExerciseReal(
    $room: ID
  ) {
    onUpdateExerciseReal(
      room: $room
    ) {
      room
      query
      video
      submit
    }
  }
`;
export const onDeleteExerciseReal = `
  subscription OnDeleteExerciseReal(
    $room: ID
    $query: String
    $video: String
    $submit: Int
  ) {
    onDeleteExerciseReal(
      room: $room
      query: $query
      video: $video
      submit: $submit
    ) {
      room
      query
      video
      submit
    }
  }
`;
/*
export const onCreateExerciseReal = `
  subscription OnCreateExerciseReal {
    OnCreateExerciseReal {
      room
      query
      video
      submit
    }
  }
`;


export const onUpdateExerciseReal = `
  subscription OnUpdateExerciseReal {
    OnUpdateExerciseReal {
      room
      query
      video
      submit
    }
  }
`;

export const onDeleteExerciseReal = `
  subscription OnDeleteExerciseReal {
    OnDeleteExerciseReal {
      room
      query
      video
      submit
    }
  }
`;*/
