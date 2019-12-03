import * as actions from './actions'
import { combineReducers } from 'redux'

const reducerNames = Object.keys(actions).filter(a => a.substring(a.length - 7) === 'Reducer')
const reducers = {}
reducerNames.forEach(reducer => (reducers[reducer.substring(0, reducer.length - 7)] = actions[reducer]))

export default combineReducers(reducers)
