import { useParams } from 'react-router-dom';
import characters from '../data/characters.json';
import episodes from '../data/episode.json';
import locations from '../data/location.json';

const categoryData = {
  characters,
  episodes,
  locations,
};

const Detail = () => {
  const { category, id } = useParams();
  const item = categoryData[category]?.find((el) => el.id === parseInt(id));

  if (!item) {
    return <p>Item not found!</p>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  );
};

export default Detail;
