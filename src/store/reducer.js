import { SET_DATA, SET_API_STATUS, ADD_TO_SELECTION_LIST, REMOVE_FROM_SELECTION_LIST } from './actionTypes';
import statusCodes from '../api-service/status-codes';

const initialState = {
  list: [],
  apiStatus: statusCodes.notUsed,
  selections: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DATA: {
      const { data } = action.payload;
      return {
        ...state,
        list: data,
      };
    }
    case SET_API_STATUS: {
      const { data } = action.payload;
      return {
        ...state,
        apiStatus: data,
      };
    }
    case ADD_TO_SELECTION_LIST: {
      const { id } = action.payload;
      return {
        ...state,
        selections: state.selections.concat([id]),
      };
    };
    case REMOVE_FROM_SELECTION_LIST: {
      const { id } = action.payload;
      const selections = state.selections.slice(0);
      const index = selections.findIndex(selectionId => selectionId === id);
      if (index > -1) {
        selections.splice(index, 1);
      }
      return {
        ...state,
        selections,
      };
    };
    default:
      return state;
  }
}
