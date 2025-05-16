import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header             from './components/Header'
import Upload             from './pages/Upload'
import Gallery            from './pages/Gallery'
import CertificateDetail  from './pages/CertificatesDetail'  // ← importe aqui

export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>

        const [refresh, setRefresh] = useState(0)
        
        <Route path="/"                 element={<Upload />}        element={<Upload onUploadSuccess={() => setRefresh(r => r + 1)} />} />
        <Route path="/gallery"          element={<Gallery />}       element={<Gallery refresh={refresh} />} />
        <Route
          path="/certificates/:tokenId"  // ← defina a rota de detalhe
          element={<CertificateDetail />}
        />
      </Routes>
    </Router>
  )
}
