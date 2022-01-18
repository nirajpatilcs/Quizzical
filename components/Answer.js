import React from 'react'

export default function Answer(props) {
    
    let color; 
    let opacity;
    let border = props.chosen ? "none" : "1px solid #4D5B9E"
    if(props.gameEnd && props.chosen ) {
        color = props.correct ? "#94D7A2" : "#F8BCBC"
        opacity = props.correct? "1" : "0.5"
    } else if(props.chosen) {
        color = "#D6DBF5"
    } else if(props.gameEnd) {
        color= props.correct ? "#94D7A2" : ""
        opacity = (props.chosen || props.correct)? "1" : "0.5"
        border = (props.correct) ? "none" : "1px solid #4D5B9E"
    }
    
    const styles = {
        backgroundColor: color,
        border: border, 
        opacity: opacity
    }

    return (
        <div className='answer' style={styles} onClick={props.answerClicked}>
            <p className='answer-txt'>{props.answer} </p>
        </div> 
    )
}