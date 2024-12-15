// pages/Category.jsx
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from './Category.module.css';

const BASE_URLS = {
  characters: 'https://rickandmortyapi.com/api/character',
  locations: 'https://rickandmortyapi.com/api/location',
  episodes: 'https://rickandmortyapi.com/api/episode',
};

const Category = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get('sort') || 'ASC';

  const [items, setItems] = useState([]);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const loadMoreRef = useRef(null);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setInfo(null);
  }, [category]);

  useEffect(() => {
    const url = BASE_URLS[category];
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}?page=${page}`);
        const data = await res.json();
        
        if (data.error) {
          setInfo(null);
          setItems([]);
          setLoading(false);
          return;
        }
        
        const newItems = data.results || [];
        
        newItems.sort((a, b) => {
          const diff = new Date(a.created) - new Date(b.created);
          return sortOrder === 'ASC' ? diff : -diff;
        });
        
        setItems(prev => [...prev, ...newItems]);
        setInfo(data.info);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [category, page, sortOrder]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && info?.next) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 1 });

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, info]);

  if (!BASE_URLS[category]) {
    return <p>Invalid category!</p>;
  }

  return (
    <div className={styles.category}>
      <h2 className={styles.categoryTitle}>{category}</h2>
      <div className={styles.sortButtons}>
        <button className={styles.sortButton} onClick={() => setSearchParams({ sort: 'ASC' })}>Sort ASC</button>
        <button className={styles.sortButton} onClick={() => setSearchParams({ sort: 'DESC' })}>Sort DESC</button>
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <Link to={`/${category}/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      
      {loading && <p>Loading...</p>}

      
      {!loading && info?.next && <div ref={loadMoreRef} style={{ height: '20px' }}></div>}
    </div>
  );
};

export default Category;
