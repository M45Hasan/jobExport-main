import React, { useState } from "react";
import axios from "axios";

function App() {
  const [englishWord, setEnglishWord] = useState("");
  const [bengaliTranslation, setBengaliTranslation] = useState("");
  const [error, setError] = useState("");

  const translateWord = async () => {
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          englishWord
        )}&langpair=en|bn`
      );

      if (
        response.data.responseData &&
        response.data.responseData.translatedText
      ) {
        setBengaliTranslation(response.data.responseData.translatedText);
        setError("");
      } else {
        setBengaliTranslation("");
        setError("Translation not found.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Translation failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          English to Bengali Translation
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter an English word or phrase"
            value={englishWord}
            onChange={(e) => setEnglishWord(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          onClick={translateWord}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Translate
        </button>
        {bengaliTranslation && (
          <div className="mt-4">
            <p className="text-gray-800 font-semibold">Bengali Translation:</p>
            <p className="mt-2">{bengaliTranslation}</p>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default App;
