// pages/index.tsx или pages/search.tsx — без разницы, главное передать onFormSubmit
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import MainIdioms from "@/Components/MainIdioms/MainIdioms";

const Search = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Breadcrumbs
          labelMap={{
            "/": "Home",
            "/search": "Search",
            idioms: "Idioms",         // переименования сегментов (опционально)
          }}
          preserveQuery={false}        // true — оставит ?q=... у последней крошки
        />
      </div>
      <MainIdioms /> 
      <Footer />
    </div>
  );
};

export default Search;
