import React from "react";
import "./app.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header/Header";
import Flight from "./components/Flight/Flight";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div>
        <Header>
          <Flight />
        </Header>
      </div>
    </ThemeProvider>
  );
};

export default App;
