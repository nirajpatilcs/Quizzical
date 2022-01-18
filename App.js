import React from 'react'
import Start from './components/Start'
import Question from './components/Question'
import Answer from './components/Answer'
import {nanoid} from 'nanoid'

export default function App() {
    
    const [questions, setQuestions] = React.useState([]) 
    const [score, setScore] = React.useState(0)
    const [answers, setAnswers] = React.useState([])
    const [gameEnd, setGameEnd] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [displayScore, setDisplayScore] = React.useState(false);
    
    //fetch questoins only once at the start
    function getAnswers(questions) {
        for(const q of questions) {
            const correctAnswers = Array(q.correct_answer)
            const incorrectAnswers = q.incorrect_answers
            const allAnswers = correctAnswers.concat(incorrectAnswers)
            let answerObjects = []
            setAnswers(prevAnswers => {
                for(const ans of allAnswers) {
                    const ansObject = {
                        value: ans.replace(/&quot;/g,'"').replace(/&#039;/g, "'"), 
                        id: nanoid(), 
                        chosen: false, 
                        correct: ans === correctAnswers[0] ? true : false
                    }
                    answerObjects.push(ansObject)
                }
                return [...prevAnswers, answerObjects] 
            })
        }
    }

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data=> {
                setQuestions(data.results) 
            })
            // .catch(Error => console.error(error)
    }, [newGame])
    

    React.useEffect(() => {
        getAnswers(questions)       
    }, [questions])   


    function checkAnswers() {
        setDisplayScore(prevDisplayScore => !prevDisplayScore)
        if(!displayScore) {
            for(const question of answers) {       
                for (const ansObj of question) {
                    if(ansObj.chosen && ansObj.correct) {
                        setScore(prevScore => prevScore +=1) 
                    }
                }
            }
            setGameEnd(prevGameEnd=> !prevGameEnd)
        } else{
            setScore(0)
            setGameEnd(prevGameEnd=> !prevGameEnd)
            setAnswers([])
            setNewGame(old => !old)
        }
    }
       
    function answerClicked(id) {
        setAnswers(prevAnswers=> prevAnswers.map(ans => {
            for (let i=0; i< ans.length ; i++) {
                if (ans[i].id === id) {
                   ans[i] = {...ans[i], chosen: !ans[i].chosen}
                }
            }
            return ans
        })) 
    }
    
    function showQuiz() {
        setShow(true)
    }
    
    // randomly shuffle answers to display
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    // array that stores all the questoins elements with its props 
    const displayQuestions = questions.map((q, index) => {
        
        // extract the questoin and answers form the object
        const correctAnswers = Array(q.correct_answer)
        const questionString = q.question

        return (
            <Question 
                key={nanoid()} 
                question={questionString.replace(/&quot;/g,'"').replace(/&#039;/g, "'")} 
                answers={answers[index]} 
                correctAnswer={correctAnswers} 
                answerClicked = {answerClicked}
                gameEnd = {gameEnd}
                />
        )
    })
    
    return (
            <div className='wrapper'>
                { !show && <Start showQuiz={showQuiz}/> }
                
               {show && 
                    <div > 
                        {displayQuestions}
                        <div className = 'display-score'>
                            { displayScore && <p className='score-txt'>You scored {score}/5 correct answers</p>}
                            <button className='check-btn' onClick={checkAnswers}> {displayScore ? 'Play Again' : 'Check Answers'}</button> 
                        </div>
                    </div>
               }
            </div>   
    )
}