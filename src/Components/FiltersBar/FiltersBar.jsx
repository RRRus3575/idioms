import CategorySelect from "../CategorySelect/CategorySelect";
import SortSelect from "../SortSelect/SortSelect";
import style from "./FiltersBar.module.css";
import React from "react";


 
const FiltersBar = ({
  categories, onChangeCategories,
  sort, onChangeSort,
  hideOutdated, onToggleOutdated,
  onClearAll
}) => {


  return (
    <div className="filters">
      {/* чипсы выбранных категорий + выбор */}
      <CategorySelect value={categories} onChange={onChangeCategories} />

      <button type="button" onClick={onClearAll}>Clear all</button>

      <label>
        <input type="checkbox" checked={!hideOutdated ? false : true}
               onChange={onToggleOutdated} />
        Don’t show outdated
      </label>

      <SortSelect value={sort} onChange={onChangeSort} />
    </div>
  );
};

export default FiltersBar;