import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import BoardReducer from './BoardReducer'

let middleware = [thunk]

// eslint-disable-next-line
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

const store = createStore(BoardReducer, applyMiddleware(...middleware))

export default store
