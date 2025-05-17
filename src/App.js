// src/App.js

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header  from './components/Header'
import Upload  from './pages/Upload'
import Gallery from './pages/Gallery'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/certificates/:tokenId" element={<CertificateDetail />} />
      </Routes>
    </Router>
  )
}
