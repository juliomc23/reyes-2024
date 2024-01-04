import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import questions from "../questions";
import "./QuestionsGame.css";
import { useNavigate } from "react-router-dom";

function QuestionsGame() {
  const navigate = useNavigate();
  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  const nextMessage = () => {
    if (currentQuestionId >= questions.length - 1) {
      navigate("/home");
    }

    setCurrentQuestionId(currentQuestionId + 1);
  };

  const previousMessage = () => {
    if (currentQuestionId <= 0) {
      return;
    }
    setCurrentQuestionId(currentQuestionId - 1);
  };
  return (
    <div className="questions">
      <h1>Juego de preguntas</h1>
      <span>A ver cuantas preguntas sabes contestar 😁</span>
      <section className="questions__section">
        <span>{questions[currentQuestionId]}</span>
        <article className="question__buttons">
          <button
            onClick={previousMessage}
            disabled={currentQuestionId <= 0}
            className="question__button previousQuestion__button"
          >
            <ArrowBackIosNewIcon />
          </button>
          <button
            onClick={nextMessage}
            className="question__button nextQuestion__button"
          >
            <ArrowForwardIosIcon />
          </button>
        </article>
      </section>
    </div>
  );
}

export default QuestionsGame;
