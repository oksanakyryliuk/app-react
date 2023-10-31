import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export function TestPage() {

  const { testId } = useParams();
  
  // State for form data
  const [Title, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>(['', '']); // Array for answers

  // Event handler for changing the question field
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  // Event handler for changing the answer field
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  // Event handler for submitting the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data and create an object to send to the server
    const requestData = {
      Title,
      Answers: answers.map((answer, index) => ({
        Text: answer,
        isCorrect: true, // You can customize this value as needed
        isStrictText: true, // You can customize this value as needed
      })),
    };

    // Send a POST request to the server to create a question
    try {
      const response = await fetch(`http://localhost:5243/api/Question/${testId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // If the request was successful, you can clear the form data
        setQuestion('');
        setAnswers(['', '']);
      } else {
        // Handle errors if the server returns an unsuccessful status
        console.error('Error while sending the request to the server');
      }
    } catch (error) {
      // Handle errors for network or other exceptions
      console.error('Error while sending the request:', error);
    }
  };

  return (
    <div>
      <h1>Creating a question for the test with ID: {testId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input type="text" value={Title} onChange={handleQuestionChange} />
        </div>
        <div>
          <label>Answers:</label>
          {answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(e, index)}
            />
          ))}
        </div>
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}