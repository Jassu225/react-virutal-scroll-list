import { API_URL } from '../config';
import statusCodes from './status-codes';
import { setApiStatus } from '../store/actions';

export async function fetchListService(dispatch) {
    let result = [];
    try {
        dispatch(setApiStatus(statusCodes.requesting));
        result = await fetch(API_URL).then(response => response.json());
        dispatch(setApiStatus(statusCodes.successful));
    } catch(ex) {
        dispatch(setApiStatus(statusCodes.failed));
    };
    return result;
}