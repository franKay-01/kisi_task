import { ActionTypes } from "../constants/action-types";

export const setGroups = (groups) => {
  return {
    type: ActionTypes.SET_GROUPS,
    payload: groups,
  };
};

export const selectedGroup= (group) => {
  return {
    type: ActionTypes.SELECTED_GROUP,
    payload: group,
  };
};
export const removeSelectedGroup = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_GROUP,
  };
};

export const setUsers = (user) => {
  return {
    type: ActionTypes.SET_USER,
    payload: user,
  }
}
