import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import Footer from "@/components/Footer/Footer";

const HomePage = () => {
  const [idioms, setIdioms] = useState([]);

  const handleFormSubmit = (data) => {
    console.log("Submitted Data:", data);
    setIdioms((prev) => [...prev, data]);
  };

  return (
    <div className="App">
      <Header onFormSubmit={handleFormSubmit} />
      <Main idioms={idioms} onFormSubmit={handleFormSubmit} />
      <Footer />
    </div>
  );
};

export default HomePage;
