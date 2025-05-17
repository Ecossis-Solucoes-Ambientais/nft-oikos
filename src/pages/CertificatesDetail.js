import { useLocation, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CertificateCard from '../components/CertificateCard'

export default function CertificateDetail() {
  const location = useLocation()
  // State passed via Link
  const passedCert = location.state?.cert

  const [cert, setCert] = useState(passedCert || null)
  const [loading, setLoading] = useState(!passedCert)
  const [error, setError] = useState(null)

  // Se não houve passado, fazemos fetch pelo tokenId
  const { tokenId } = location.pathname.match(/\/(?:certificates\/)?)?(?<tokenId>[^/]+)/)?.groups || {}

  useEffect(() => {
    if (passedCert) return
    setLoading(true)
    fetch(`https://gallery-proxy-service-236688625650.southamerica-east1.run.app/?id=${tokenId}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        // assume data é um array ou objeto
        const c = Array.isArray(data) ? data[0] : data
        setCert({
          tokenId:       c.ipfs_hash,
          imageUrl:      c.pinata_url,
          title:         c.file_name,
          description:   c.description || c.file_name,
          date:          new Date(c.timestamp).toLocaleString('pt-BR'),
          transaction:   c.transaction_hash,
          transactionUrl:c.transaction_url
        })
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [passedCert, tokenId])

  // Se não veio certificado e não está carregando
  if (!cert && !loading) return <Navigate to="/gallery" replace />

  if (loading) return <p className="text-center p-8">Carregando detalhe do certificado…</p>
  if (error)   return <p className="text-center p-8 text-red-500">Erro: {error}</p>

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{cert.title}</h1>
      <img
        src={cert.imageUrl}
        alt={cert.title}
        className="w-full h-auto mb-6 rounded-lg shadow"
      />
      <div className="space-y-2">
        <p><strong>Data:</strong> {cert.date}</p>
        <p>
          <strong>Token ID:</strong> {cert.tokenId}
        </p>
        <p>
          <strong>Transaction:</strong>{' '}
          {cert.transaction ? (
            <a
              href={cert.transactionUrl}
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 hover:underline"
            >
              {cert.transaction}
            </a>
          ) : (
            'N/A'
          )}
        </p>
      </div>
    </main>
  )
}
