import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => { //REDUCER Function
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log("Comment: ", comment);
      return state.concat(comment); //DOES NOT MODIFY THE EXISTING ARRAY. CREATES A NEW ONE

    default:
      return state;
  }
};