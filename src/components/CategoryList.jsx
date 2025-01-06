import { arrayOf, string } from 'prop-types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CategoryList({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('');
    }
  }, [params]);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setParams({});
    } else {
      setParams({ category });
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold text-white">Popular Category</h1>

      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`${
              selectedCategory === category
                ? 'bg-blue-500 text-white' // Active style
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' // Default style
            } text-sm font-medium me-2 px-2.5 py-0.5 rounded`}
          >
            {'#' + category}
          </button>
        ))}
      </div>

      <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}

CategoryList.propTypes = {
  categories: arrayOf(string),
};
