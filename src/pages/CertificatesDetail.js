import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CertificateDetail() {
  const { tokenId } = useParams()
  const [cert, setCert] = useState(null)

  useEffect(() => {
    fetch(`https://gallery-proxy-service-236688625650.southamerica-east1.run.app`)
      .then(r => r.json())
      .then(data => setCert(data))
      .catch(console.error)
  }, [tokenId])

  if (!cert) return <p>Carregando…</p>

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{cert.file_name}</h1>
      <img src={cert.pinata_url} alt={cert.file_name} className="mb-4" />
      <p><strong>Data:</strong> {new Date(cert.timestamp).toLocaleString()}</p>
      <p><strong>Tx Hash:</strong> <a href={cert.transaction_url} target="_blank" rel="noreferrer">{cert.transaction_hash}</a></p>
      {/* demais campos… */}
    </main>
  )
}
