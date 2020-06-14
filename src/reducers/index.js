import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import linkReducer from './linkReducer';

export default combineReducers({
    links: linkReducer
});