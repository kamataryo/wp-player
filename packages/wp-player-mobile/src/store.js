import { combineReducers, createStore, applyMiddleware } from 'redux'
import bookMarksReducer from './reducers/book-marks'
import createSagaMiddleware from 'redux-saga'
// import rootSaga from 'sagas'

const sagaMiddleWare = createSagaMiddleware()

const middlewares = [sagaMiddleWare]

const rootReducer = combineReducers({
  bookMarks: bookMarksReducer,
})

const rootStore = createStore(rootReducer, applyMiddleware(...middlewares))

// sagaMiddleWare.run(rootSaga)

export default rootStore
