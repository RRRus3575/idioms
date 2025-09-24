import { useGetCategoriesQuery } from "@/store/api";

const CategorySelect = ({ value, onChange }) => {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

  const toggle = (cat) => {
    if (value.includes(cat)) {
      onChange(value.filter((c) => c !== cat));
    } else {
      onChange([...value, cat]);
    }
  };

  if (isLoading) return <p>Loading categories…</p>;
  if (isError) return <p>Failed to load categories</p>;

  return (
    <div className="category-select">
      {value.map((cat) => (
        <span key={cat} className="chip" onClick={() => toggle(cat)}>
          {cat} ×
        </span>
      ))}

      <select onChange={(e) => toggle(e.target.value)} value="">
        <option value="" disabled>
          Choose a category +
        </option>
        {categories
          .filter((c) => !value.includes(c))
          .map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
      </select>
    </div>
  );
};


export default CategorySelect;