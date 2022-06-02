import { ActionTypes } from "../constants/action-types";

export const userReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return {...state, user: payload}
    default:
      return state;
  }
}

export const groupReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_GROUPS:
      return {...state, groups: payload}
  
    default:
      return state;
  }
}


export const selectedGroup = (state = {}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SELECTED_GROUP:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_GROUP:
      return {};
    default:
      return state;
  }
}

