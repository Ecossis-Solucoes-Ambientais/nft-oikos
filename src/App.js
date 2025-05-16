import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'                
import Header from './components/Header'
import Upload from './pages/Upload'
import Gallery from './pages/Gallery'
import CertificateDetail from './pages/CertificatesDetail'

export default function App() {
  const [refresh, setRefresh] = useState(0)
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/"                 element={<Upload onUploadSuccess={() => setRefresh(r => r + 1)} />} />
        <Route path="/gallery"          element={<Gallery refresh={refresh} />} />
        <Route path="/certificates/:tokenID"     element={<CertificateDetail />} />
      </Routes>
    </Router>
  )
}
