import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick} from '../../store/actions/quizAction'


class Quiz extends Component {



  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.fetchQuizById(this.props.match.params.id)
  }

  render() {

    console.log(this.props);
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.props.loading || !this.props.quiz
             ? <Loader />
             : this.props.isFinished
              ? <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.retryHandler}
              />
              : <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  onAnswerClick={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answerState}
              />

          }
        </div>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion ,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz
  }
}


function mapDispatchToProps(dispatch){
  return{
      fetchQuizById: (id) => dispatch(fetchQuizById(id)),
      quizAnswerClick: answerId =>  dispatch(quizAnswerClick(answerId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)