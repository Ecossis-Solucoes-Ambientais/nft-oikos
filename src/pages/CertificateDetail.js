// src/pages/CertificateDetail.js

import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CertificateDetail() {
  const { tokenId } = useParams()
  const location = useLocation()
  const passedCert = location.state?.cert

  const [cert, setCert]       = useState(passedCert || null)
  const [loading, setLoading] = useState(!passedCert)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (passedCert) return
    setLoading(true)
    fetch(`https://gallery-proxy-service-236688625650.southamerica-east1.run.app/?t=${Date.now()}`, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        const found = Array.isArray(data)
          ? data.find(item => item.ipfs_hash === tokenId)
          : data.ipfs_hash === tokenId
            ? data
            : null
        if (!found) {
          setError('Certificado não encontrado')
        } else {
          setCert({
            tokenId:        found.ipfs_hash,
            imageUrl:       found.pinata_url,
            title:          found.file_name,
            description:    found.description || found.file_name,
            date:           new Date(found.timestamp).toLocaleString('pt-BR'),
            transaction:    found.transaction_hash,
            transactionUrl: found.transaction_url
          })
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [passedCert, tokenId])

  if (loading) return <p className="text-center p-8">Carregando detalhe…</p>
  if (error)   return <p className="text-center p-8 text-red-500">{error}</p>
  if (!cert)   return <p className="text-center p-8">Certificado não disponível</p>

  // Prefixa o valor da transação com "0x" se necessário
  const txDisplay = cert.transaction
    ? (cert.transaction.startsWith('0x') ? cert.transaction : `0x${cert.transaction}`)
    : null
  // Reconstrói a URL de transação incluindo o prefixo 0x
  const txUrl = txDisplay
    ? `https://sepolia.etherscan.io/tx/${txDisplay}`
    : null

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
          {txDisplay ? (
            <a
              href={`https://sepolia.etherscan.io/tx/0x${txDisplay}`}
              target="_blank"
              rel="noreferrer"
              className="[text-#bbd259] hover:underline"
            >
              {txDisplay}
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

