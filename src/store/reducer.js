import { 
  SET_DATA, SET_API_STATUS, ADD_TO_SELECTION_LIST, REMOVE_FROM_SELECTION_LIST,
  SELECT_ALL, DESELECT_ALL,
} from './actionTypes';
import statusCodes from '../api-service/status-codes';

const initialState = {
  list: [],
  apiStatus: statusCodes.notUsed,
  selections: [],
  selectAll: false,
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
      const newSelections = state.selections.concat([id]);
      return {
        ...state,
        selections: newSelections,
        selectAll: state.list.length === newSelections.length,
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
        selectAll: false,
      };
    };
    case SELECT_ALL:
      // console.log('all selected');
      return {
        ...state,
        selectAll: true,
        selections: state.list.map(selection => selection.id),
      };
    case DESELECT_ALL:
      return {
        ...state,
        selectAll: false,
        selections: [],
      };
    default:
      return state;
  }
}
