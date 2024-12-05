import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import characters from '../data/characters.json';
import episodes from '../data/episode.json';
import locations from '../data/location.json';
import '../styles/Category.css';

const categoryData = { characters, episodes, locations };

const Category = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get('sort') || 'ASC';
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = categoryData[category] || [];
    const sortedData = [...data].sort((a, b) =>
      sortOrder === 'ASC'
        ? new Date(a.created) - new Date(b.created)
        : new Date(b.created) - new Date(a.created)
    );
    setItems(sortedData);
  }, [category, sortOrder]);

  if (!categoryData[category]) {
    return <p className="error">Invalid category!</p>;
  }

  return (
    <div className="category">
      <h2>{category}</h2>
      <button onClick={() => setSearchParams({ sort: 'ASC' })}>Sort ASC</button>
      <button onClick={() => setSearchParams({ sort: 'DESC' })}>Sort DESC</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/${category}/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
