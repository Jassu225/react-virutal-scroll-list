import { SET_DATA, SET_API_STATUS, ADD_TO_SELECTION_LIST, REMOVE_FROM_SELECTION_LIST } from './actionTypes';
import { fetchListService } from '../api-service';

export const setDataList = (data) => ({
    type: SET_DATA,
    payload: { data },
});

export const setApiStatus = (data) => ({
    type: SET_API_STATUS,
    payload: { data },
});

export const addToSelections = (id) => ({
    type: ADD_TO_SELECTION_LIST,
    payload: { id },
});

export const removeFromSelections = (id) => ({
    type: REMOVE_FROM_SELECTION_LIST,
    payload: { id },
});

export const fetchList = () => {
    return (dispatch) => {
        return fetchListService(dispatch).then(
            (list) => dispatch(setDataList(list)),
            (error) => {
                console.error(error);
            },
        );
    };
}