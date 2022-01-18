import React from 'react'

export default function Start(props) {
    return(
        <div className='start'> 
           <h1 className='start-title'> Quizzical </h1>  
           <h3 className='author'> BY: NIRAJ PATIL </h3> 
           <button className='start-btn' onClick={props.showQuiz}> Start Quiz </button>
        </div>
    )
}