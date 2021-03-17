import {CREATE_QUIZ_ACTION, RESET_QUIZ_CREATION} from '../actions/actionTypes'
const initialState  = {
    quiz:[]
}

export default function QuizCreator(state = initialState, action){
    switch (action.type){

        case CREATE_QUIZ_ACTION:
            return {...state, quiz: [...state, action.item] }
        case RESET_QUIZ_CREATION:
            return{...state, quiz: []}
        default:
            return state
    }
}