import React from 'react'
import Answer from './Answer'
import {nanoid} from 'nanoid'

export default function Question(props) {
    
    let displayAnswers
    if(props.answers) {
        displayAnswers = props.answers.map(ans=> {
            return(
                <Answer 
                    key={ans.id} 
                    answer={ans.value} 
                    answerClicked={()=>props.answerClicked(ans.id)}
                    chosen={ans.chosen}
                    correct = {ans.correct}
                    gameEnd={props.gameEnd}
                /> 
            )
        })
        
    }
    return(
        <div className='question-wrapper' >
            {props.answers && <h3 className='question-title'> {props.question} </h3> }
            <div className='answer-wrapper'>
                {props.answers && displayAnswers}
            </div>
        </div>
    )
}