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
    <div className={style.filters}>
      {/* чипсы выбранных категорий + выбор */}
      <div className={style.wrap}>
        <CategorySelect value={categories} onChange={onChangeCategories} />
        {categories.length>0 && (<button type="button" onClick={onClearAll}>Clear all</button>)}
      </div>

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