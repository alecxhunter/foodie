import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import dbStore from './dbStore'

export default combineReducers({
    routing: routerReducer,
    dbStore
})