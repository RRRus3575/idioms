import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
  return(
    <Routes>
        <Route path="/" element={<HomePage />} />
      {/* <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CamperDetailsPage />} /> */}
    </Routes>
      
    
    
  )
}

export default App;
