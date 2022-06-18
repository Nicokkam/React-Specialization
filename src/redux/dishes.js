import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
  isLoading: true,
  errMess: null,
  dishes: []
}, action) => { //REDUCER Function
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return { ...state, isLoading: false, errMess: null, dishes: action.payload }; //... is called sprint operator. Takes the state and duplicates it to return a new object

    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };

    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, dishes: [] };

    default:
      return state;
  }
}