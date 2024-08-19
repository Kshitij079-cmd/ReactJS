import { combineReducers } from 'redux'
import amoutReducer from "./amoutReducer";
// eslint-disable-next-line no-undef
const reducers = combineReducers({
    // eslint-disable-next-line no-undef
    //including all reducers and combining them
    amount : amoutReducer
    //removeItem: itemReducer
})
export default reducers

 