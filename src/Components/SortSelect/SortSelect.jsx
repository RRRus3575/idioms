import style from "./SortSelect.module.css"

const SortSelect = ({ value, onChange }) => (
  <div className="sort">
    <span>Sort by:&nbsp;</span>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="az">A–Z</option>
      <option value="popular">Most popular</option>
      <option value="last_searched">Recent search</option>
    </select>
  </div>
);


export default SortSelect;