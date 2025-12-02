// src/pages/Gallery.js
import { useMemo } from 'react'
import usePollingFetch from '../hooks/usePollingFetch'
import CertificateCard from '../components/CertificateCard'

export default function Gallery() {
  
  const rawData = usePollingFetch('https://gallery-proxy-service-236688625650.southamerica-east1.run.app', 2 * 60 * 1000)
  console.log('Gallery rawData:', rawData)

  // Proteção: se rawData for null/undefined, usar array vazio
  const list = Array.isArray(rawData)
    ? rawData
    : Array.isArray(rawData?.certificates)
      ? rawData.certificates
      : []

  const certs = useMemo(() => {
    return list
      .filter(item => item?.ipfs_hash) // Filtrar itens inválidos
      .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
      .map(item => ({
        tokenId:  item.ipfs_hash,
        imageUrl: item.pinata_url?.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') 
                  || item.image 
                  || item.image_url 
                  || '',
        title:    item.file_name || 'Certificado',
        date:     item.timestamp 
                  ? new Date(item.timestamp).toLocaleDateString('pt-BR') 
                  : '',
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