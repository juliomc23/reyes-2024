import { Navigate, Route, Routes } from "react-router-dom";
import GuessTheCCAA from "./pages/GuessTheCCAA";
import GuessTheImage from "./pages/GuessTheImage";
import Home from "./pages/Home";
import Memory from "./pages/Memory";
import QuestionsGame from "./pages/QuestionsGame";

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to={"/home"} />} />
      <Route path="home" element={<Home />} />
      <Route path="questions" element={<QuestionsGame />} />
      <Route path="memory" element={<Memory />} />
      <Route path="guesser" element={<GuessTheImage />} />
      <Route path="ccaa" element={<GuessTheCCAA />} />
    </Routes>
  );
};

export default Router;
