// pages/Detail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Detail.module.css';

const BASE_URLS = {
  characters: 'https://rickandmortyapi.com/api/character/',
  locations: 'https://rickandmortyapi.com/api/location/',
  episodes: 'https://rickandmortyapi.com/api/episode/',
};

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const url = BASE_URLS[category];
    if (!url) return;
    (async () => {
      try {
        const res = await fetch(url + id);
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [category, id]);

  if (!BASE_URLS[category]) {
    return <p>Invalid category!</p>;
  }

  if (!item) {
    return <p>Loading...</p>;
  }

  if (item.error) {
    return <p>Item not found!</p>;
  }

  return (
    <div className={styles.detailContainer}>
      <h2 className={styles.detailTitle}>{item.name}</h2>
      {Object.entries(item).map(([key, value]) => (
        <div key={key}>
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
};

export default Detail;
