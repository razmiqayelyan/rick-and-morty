import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import Detail from './pages/Detail';
import NotFound from './components/NotFound';
import './styles/App.css'

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Category />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
