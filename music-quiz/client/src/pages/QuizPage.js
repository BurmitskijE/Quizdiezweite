import React from "react";
import { useParams } from "react-router-dom";
import Quiz from "../components/Quiz";

const QuizPage = () => {
  const { mode } = useParams();
  const token = localStorage.getItem("spotify_token");

  return token ? <Quiz token={token} mode={mode} /> : <p>Bitte logge dich erneut ein.</p>;
};

export default QuizPage;
