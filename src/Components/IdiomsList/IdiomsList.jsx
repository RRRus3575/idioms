import React from "react";


const IdiomsList = ({ idioms }) => {


  return (
    <ul>
      {idioms.map((item, index) => (
        <li key={index}>
          {item.idiom} - {item.language}
        </li>
      ))}
    </ul>
  );
};

export default IdiomsList;
