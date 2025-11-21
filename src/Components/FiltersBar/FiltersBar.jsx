import CategorySelect from "../CategorySelect/CategorySelect";
import Checkbox from "../Checkbox/Checkbox";
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
        <CategorySelect value={categories} onChange={onChangeCategories} onClearAll={onClearAll} />
      </div>
      <div className={style.wrapper} >
        <label className={style.checkboxLabel}>
          <Checkbox
              checked={!hideOutdated ? false : true}
              onChange={onToggleOutdated}

          />

          {/* <span className={style.checkboxCustom}> */}
            {/* <svg className={style.checkbox} width="16" height="16" aria-hidden="true">
              <use xlinkHref="/sprite.svg#checkbox" />
            </svg> */}
          {/* </span> */}
          Don’t show outdated
        </label>


        <SortSelect value={sort} onChange={onChangeSort} />
      </div>
    
      
    </div>
  );
};

export default FiltersBar;