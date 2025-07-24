// src/pages/Gallery.js
import { useMemo } from 'react'
import usePollingFetch from '../hooks/usePollingFetch'
import CertificateCard from '../components/CertificateCard'

export default function Gallery() {
  
  const rawData = usePollingFetch('https://gallery-proxy-service-236688625650.southamerica-east1.run.app', 2 * 60 * 1000)
  console.log('Gallery rawData:', rawData)

  // ② mapeia para a shape que o CertificateCard espera
  const list = Array.isArray(rawData) ? rawData : []

  const certs = useMemo(() => {
    return list
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map(item => ({
        tokenId:  item.ipfs_hash,
        imageUrl: item.pinata_url,
        title:    item.file_name,
        date:     new Date(item.timestamp).toLocaleDateString('pt-BR'),
      }))
  }, [list])

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Galeria de Certificados</h1>
      {certs.length === 0 ? (
        <p>Carregando ou sem certificados...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map(c => (
            <CertificateCard key={c.tokenId} cert={c} />
          ))}
        </div>
      )}
    </main>
  )
}
