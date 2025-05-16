import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Upload  from './pages/Upload';
import Gallery from './pages/Gallery';

function App() {
  return (
    <Router basename="/nft-oikos">
      <Header />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
