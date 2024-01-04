import { Toaster } from "react-hot-toast";
import "./App.css";
import Router from "./router";
function App() {
  return (
    <main className="main">
      <Router />
      <Toaster />
    </main>
  );
}

export default App;
