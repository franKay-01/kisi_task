import { combineReducers } from "redux";
import { userReducer, groupReducer, selectedGroup} from "./allReducer";

const reducers = combineReducers({
  allGroups: groupReducer,
  userInfo: userReducer,
  group: selectedGroup
});

export default reducers;
