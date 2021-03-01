import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import IssuesReducer from './IssuesReducer'

let middleware = [thunk]

// eslint-disable-next-line
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

const store = createStore(
  combineReducers({ issues: IssuesReducer }),
  applyMiddleware(...middleware),
)

export default store
