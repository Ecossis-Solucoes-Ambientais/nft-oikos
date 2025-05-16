import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'           // ← importe o Link
import CertificateCard from '../components/CertificateCard'

export default function Gallery({refresh}) {
  const [certs, setCerts] = useState([])

  const fetchData = () => {
    fetch(`https://gcp-list-certificates-service-236688625650.southamerica-east1.run.app/?t=${Date()}`, {cache: 'no-store'})
      .then(r => r.json())
      .then(data => {
        const mapped = data
          .sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map(item => ({
            tokenId:  item.ipfs_hash,
            imageUrl: item.pinata_url,
            title:    item.file_name,
            date:     new Date(item.timestamp).toLocaleDateString('pt-BR'),
          }))
        setCerts(mapped)
      })
      .catch(console.error)
  }

  // 2) Chame-a no useEffect, e também quando o “refresh” mudar
  useEffect(() => {
    fetchData()
  }, [refresh])

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Galeria de Certificados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {certs.map(c => {
        return <CertificateCard key={c.tokenId} cert={c} />;
    })}
      </div>
    </main>
  )
}
