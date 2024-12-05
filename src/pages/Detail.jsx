import { useParams } from 'react-router-dom';
import characters from '../data/characters.json';
import episodes from '../data/episode.json';
import locations from '../data/location.json';
import '../styles/Detail.css';

const categoryData = { characters, episodes, locations };

const Detail = () => {
  const { category, id } = useParams();
  const item = categoryData[category]?.find((el) => el.id === parseInt(id));

  if (!item) {
    return <p className="error">Item not found!</p>;
  }

  return (
    <div className="detail">
      <h2>{item.name}</h2>
      <div className="details">
        {Object.entries(item).map(([key, value]) => (
          <div key={key} className="detail-item">
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;

