import {combineReducers} from 'redux'
import quizReducer from './quizReducer'
import quizCreator from './quizCreator'
export default combineReducers({
      quiz:quizReducer,
      creator: quizCreator
})