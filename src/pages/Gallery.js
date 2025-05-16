import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'           // ← importe o Link
import CertificateCard from '../components/CertificateCard'

export default function Gallery() {
  const [certs, setCerts] = useState([])

  useEffect(() => {
    fetch('https://gallery-proxy-service-236688625650.southamerica-east1.run.app/?t=${Date.now()}')
      .then(r => r.json())
      .then(data => {
        const mapped = data.map(item => ({
          tokenId:  item.ipfs_hash,
          imageUrl: item.pinata_url,
          title:    item.file_name,
          date:     new Date(item.timestamp).toLocaleDateString('pt-BR')
        }))
        setCerts(mapped)
      })
      .catch(console.error)
  }, [])

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Galeria de Certificados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map(c => (
          <Link
            key={c.tokenId}
            to={`/certificates/${c.tokenId}`}     // rota de detalhe
            state={{ cert: c }}                  // passa o objeto inteiro
            className="block"                    // para garantir que ocupe o card todo
          >
            <CertificateCard cert={c} />
          </Link>
        ))}
      </div>
    </main>
  )
}
