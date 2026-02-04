import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Round_2 from './pages/Round_2.jsx';
import Round_3 from './pages/Round_3.jsx';
// import EventDetails from './pages/EventDetails';
// Import other pages similarly

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/round_2" element={<Round_2 />} />
      <Route path="/round_3" element={<Round_3 />} />
    </Routes>
  );
}

export default App;