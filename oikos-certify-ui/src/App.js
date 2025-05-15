import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Upload  from './pages/Upload';
import Gallery from './pages/Gallery';

function App() {
  return (
    <BrowserRouter basename="/<seu-repo>">
      <Header />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
