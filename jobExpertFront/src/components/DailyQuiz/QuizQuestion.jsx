import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizQuestion = () => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_URL_HERE' with the actual URL of your API
    const apiUrl = "YOUR_API_URL_HERE";

    axios
      .get(apiUrl)
      .then((response) => {
        const randomQuestionIndex = Math.floor(
          Math.random() * response.data.results.length
        );
        setQuestion(response.data.results[randomQuestionIndex]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!question) {
    return <div>Loading...</div>;
  }

  // The rest of your component code here
};

export default QuizQuestion;
