// import React, { useState, MouseEvent } from 'react';
// import {Question} from "../../common/types";
//
// interface QuestionComponentProps {
//     questions: Question[];
// }
//
// const QuestionComponent: React.FC<QuestionComponentProps> = ({ questions }) => {
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
//
//     if (!questions || questions.length === 0) {
//         return <div>No questions available</div>;
//     }
//
//     const currentQuestion = questions[currentQuestionIndex];
//
//     const handleAnswerClick = (event: MouseEvent<HTMLDivElement>, index: number) => {
//         event.preventDefault();
//         if (selectedAnswerIndex === null) {
//             setSelectedAnswerIndex(index);
//         } else {
//             console.log('Already selected an answer.');
//         }
//     };
//
//     const renderAnswers = () => {
//         switch (currentQuestion.type.type) {
//             case 'multiple':
//                 return (
//                     <div>
//                         {currentQuestion.answers.map((answer, index) => (
//                             <div key={index} onClick={(event) => handleAnswerClick(event, index)}>
//                                 <input
//                                     type="checkbox"
//                                     name="multipleChoice"
//                                     value={answer.text}
//                                     checked={selectedAnswerIndex === index}
//                                     readOnly
//                                 />
//                                 {answer.text}
//                                 {selectedAnswerIndex !== null && answer.isCorrect && (
//                                     <span> (Correct)</span>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case 'single':
//                 return (
//                     <div>
//                         {currentQuestion.answers.map((answer, index) => (
//                             <div key={index} onClick={(event) => handleAnswerClick(event, index)}>
//                                 <input
//                                     type="radio"
//                                     name="singleChoice"
//                                     value={answer.text}
//                                     checked={selectedAnswerIndex === index}
//                                     readOnly
//                                 />
//                                 {answer.text}
//                                 {selectedAnswerIndex !== null && answer.isCorrect && (
//                                     <span> (Correct)</span>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 );
//             // Add more cases for other types if needed
//             default:
//                 return null;
//         }
//     };
//
//     return (
//         <div>
//             <h2>{currentQuestion.title}</h2>
//             {renderAnswers()}
//         </div>
//     );
// };
//
// export default QuestionComponent;

import React, { useState } from 'react';
import {Question} from "../../common/types";
import {ListItemButton, ListItemText, List, Button, Stack} from "@mui/material";
interface QuizProps {
    questions: Question[];
}

const QuestionComponent: React.FC<QuizProps> = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
    const [showResult, setShowResult] = useState(false);

    const getInputType = (questionType: any) => {
        switch (questionType) {
            case 'single':
                return 'radio';
            case 'multiple':
                return 'checkbox';
            case 'binary':
                return 'radio';
            case 'blank':
                return 'text';
            default:
                return 'radio';
        }
    };

    const getInputName = (questionType: any, index:any) => {
        switch (questionType) {
            case 'single':
                return 'answer';
            case 'multiple':
                return `answer-${index}`;
            case 'binary':
                return 'binary-answer';
            case 'blank':
                return 'blank-answer';
            default:
                return 'answer';
        }
    };
    if (!questions || questions.length === 0) {
        return <div>No questions available</div>;
    }
    const handleAnswerSubmit = () => {
        const userAnswer = userAnswers[currentQuestionIndex];
        console.log('Збереження відповіді користувача:', userAnswer);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setShowResult(false);
        } else {
            setShowResult(true);
        }
    };

    const handleAnswerSelection = (isCorrect: boolean) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = isCorrect;
        setUserAnswers(updatedUserAnswers);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h4>{currentQuestion.title}</h4>
            <h5>{currentQuestion.description}</h5>
            {currentQuestion.image && <img src={currentQuestion.image} alt="Question" />}

            <List>
                {currentQuestion.answers.map((answer, index) => (
                    <ListItemButton key={index} >
                        <label>
                            <input
                                type={getInputType(currentQuestion.type.type)}
                                name={getInputName(currentQuestion.type.type, index)}
                                onChange={() => handleAnswerSelection(answer.isCorrect)}
                            />
                            {answer.text}
                        </label>

                    </ListItemButton>
                ))}
            </List>

            <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ padding: '7px', margin: '12px', width: '200px' }}
                    onClick={handleAnswerSubmit}
                >
                    Надіслати
                </Button>
            </Stack>


            {/*{showResult && (*/}
            {/*    <div>*/}
            {/*        <p>Результат:</p>*/}
            {/*        <p>{userAnswers.every(answer => answer) ? 'Ви правильно відповіли на всі питання!' : 'Ви маєте помилки.'}</p>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default QuestionComponent;