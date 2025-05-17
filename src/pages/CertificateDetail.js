// src/pages/CertificateDetail.js

import { useParams, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CertificateDetail() {
  const { tokenId } = useParams()
  const [cert, setCert]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function fetchCert() {
      try {
        const res = await fetch(`https://gallery-proxy-service-236688625650.southamerica-east1.run.app/?id=${tokenId}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        const c = Array.isArray(data) ? data[0] : data
        setCert({
          tokenId:       c.ipfs_hash,
          imageUrl:      c.pinata_url,
          title:         c.file_name,
          description:   c.description || c.file_name,
          date:          new Date(c.timestamp).toLocaleString('pt-BR'),
          transaction:   c.transaction_hash,
          transactionUrl:c.transaction_url,
        })
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCert()
  }, [tokenId])

  if (loading) return <p className="text-center p-8">Carregando detalhe…</p>
  if (error)   return <p className="text-center p-8 text-red-500">Erro: {error}</p>
  if (!cert)   return <Navigate to="/gallery" replace />

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">{cert.title}</h1>
      <div className="flex justify-center mb-6">
        <img
          src={cert.imageUrl}
          alt={cert.title}
          className="w-full max-w-2xl h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="space-y-4 text-lg">
        <p><strong>Data:</strong> {cert.date}</p>
        <p><strong>Token ID:</strong> {cert.tokenId}</p>
        <p>
          <strong>Transação:</strong>{' '}
          {cert.transaction ? (
            <a
              href={cert.transactionUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              {cert.transaction}
            </a>
          ) : (
            <span className="text-gray-500">Não disponível</span>
          )}
        </p>
        <p><strong>Descrição:</strong> {cert.description}</p>
      </div>
    </main>
  )
}
