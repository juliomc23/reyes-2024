import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import conversation from "../conversation";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [currentMessageId, setCurrentMessageId] = useState(
    localStorage.getItem("messageId")
      ? Number(localStorage.getItem("messageId"))
      : 0
  );

  const nextMessage = () => {
    if (currentMessageId >= conversation.length - 1) {
      localStorage.setItem("messageId", JSON.stringify(0));
      return;
    }
    if (currentMessageId === 10) {
      navigate("/questions");
    }
    if (currentMessageId === 12) {
      navigate("/memory");
    }
    if (currentMessageId === 14) {
      navigate("/guesser");
    }
    if (currentMessageId === 16) {
      navigate("/ccaa");
    }
    setCurrentMessageId(currentMessageId + 1);
    localStorage.setItem("messageId", JSON.stringify(currentMessageId + 1));
  };

  const previousMessage = () => {
    localStorage.setItem("messageId", JSON.stringify(currentMessageId - 1));
    if (currentMessageId <= 0) {
      return;
    }
    setCurrentMessageId(currentMessageId - 1);
  };

  return (
    <section className="home">
      <section className="conversation">
        {
          <p className="conversation__text">
            {conversation[currentMessageId].text}
          </p>
        }
        <div className="conversation__buttons">
          <button
            onClick={previousMessage}
            disabled={currentMessageId <= 0}
            className="message__button previousMessage__button"
          >
            <ArrowBackIosNewIcon />
          </button>
          <button
            onClick={nextMessage}
            className="message__button nextMessage__button"
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </section>
      <img src="/src/assets/Oiluj-fondo.png" alt="Oiluj" className="oiluj" />
    </section>
  );
};

export default Home;
