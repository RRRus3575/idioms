import React, { useState } from "react";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";

function App() {
  const [idioms, setIdioms] = useState([]);

  const handleFormSubmit = (data) => {
    console.log("Submitted Data:", data);
    setIdioms((prev) => [...prev, data]);
  };

  return (
    <div className="App">
      <Header onFormSubmit={handleFormSubmit} />
      <Main idioms={idioms} onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
