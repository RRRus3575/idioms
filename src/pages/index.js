import React, { useState } from "react";
import { useRouter } from "next/router"; // Pages Router

import Header from "@/Components/Header/Header";
import MainHome from "@/Components/MainHome/MainHome";
import Footer from "@/Components/Footer/Footer";

const HomePage = () => {
  const router = useRouter();

  const handleFormSubmit = ({ idiom, language, categoryIds = [], sort = "az" }) => {
    router.push({
      pathname: "/search",
      query: {
        q: idiom || "",
        lang: language || "english",
        categories: categoryIds.join(","), 
        sort,                              
        hideOutdated: "0",                 
      },
    });
  };

  return (
    <div className="App">
      <Header onFormSubmit={handleFormSubmit} />
      <MainHome onFormSubmit={handleFormSubmit} />
      <Footer />
    </div>
  );
};

export default HomePage;
