// src/pages/CertificateDetail.js

import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CertificateDetail() {
  const { tokenId } = useParams()
  const location = useLocation()
  const passedCert = location.state?.cert

  const [cert, setCert]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // Converte o payload do backend para a shape usada no front
  const normalize = (raw) => ({
    tokenId:        raw.ipfs_hash || raw.cid || raw.tokenId || tokenId,
    imageUrl:       raw.pinata_url?.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') || raw.image || raw.image_url,
    title:          raw.file_name || raw.title || 'Certificado',
    description:    raw.description || raw.file_name || '',
    date:           raw.timestamp ? new Date(raw.timestamp).toLocaleString('pt-BR') : '',
    
    // Transaction hash - buscar em várias localizações possíveis
    transaction:    raw.certificate?.transaction_hash || 
                    raw.transaction_hash || 
                    raw.txHash || 
                    raw.tx_hash || 
                    null,
    
    // Transaction URL completa - PRIORIDADE MÁXIMA (já vem formatada do backend)
    transactionUrl: raw.certificate?.transaction_viewer_url || 
                    raw.transaction_viewer_url || 
                    raw.transaction_url || 
                    null,
    
    // Rede - converter para lowercase
    network:        (raw.network || raw.chain || 'besu').toLowerCase(),
  })

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `https://gallery-proxy-service-236688625650.southamerica-east1.run.app/?t=${Date.now()}`,
          { cache: 'no-store' }
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = await res.json()

        // Suporta 3 formatos: [] na raiz, { certificates: [] }, ou objeto único
        const list = Array.isArray(data)
          ? data
          : (Array.isArray(data?.certificates) ? data.certificates : [])

        let found = null
        if (list.length) {
          found = list.find(item => String(item.ipfs_hash) === String(tokenId))
        } else if (data && data.ipfs_hash && String(data.ipfs_hash) === String(tokenId)) {
          found = data
        }

        if (!found) {
          // Fallback: renderiza o que veio via navegação, se existir
          if (passedCert) {
            setCert(normalize(passedCert))
          } else {
            throw new Error('Certificado não encontrado')
          }
        } else {
          setCert(normalize(found))
        }
      } catch (e) {
        setError(e.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [tokenId, location.key])

  if (loading) return <p className="text-center p-8">Carregando detalhe…</p>
  if (error)   return <p className="text-center p-8 text-red-500">{error}</p>
  if (!cert)   return <p className="text-center p-8">Certificado não disponível</p>

  // Montagem do display/URL da transação
  const txDisplay = cert.transaction
    ? (String(cert.transaction).startsWith('0x') ? cert.transaction : `0x${cert.transaction}`)
    : null

  // URLs dos explorers por rede (usado apenas como FALLBACK)
  const explorerBase = {
    sepolia: 'https://sepolia.etherscan.io/tx/',
    mainnet: 'https://etherscan.io/tx/',
    polygon: 'https://polygonscan.com/tx/',
    besu:    'https://besu-transaction-viewer-ktrbmj2jvq-rj.a.run.app/tx/',
  }

  // ============================================================
  // CORREÇÃO AQUI: PRIORIDADE INVERTIDA
  // ============================================================
  // 1º - Usar transactionUrl do backend (JÁ VEM COMPLETA E CORRETA)
  // 2º - Construir URL usando explorerBase + hash (FALLBACK)
  // ============================================================
  const txUrl = cert.transactionUrl 
    ? cert.transactionUrl  // ← PRIORIDADE 1: Usar URL completa do backend
    : (txDisplay && explorerBase[cert.network]  // ← FALLBACK: Construir se não tiver
        ? `${explorerBase[cert.network]}${txDisplay}` 
        : null)

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
            txUrl ? (
              <a
                href={txUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#bbd259] hover:underline break-all"
              >
                {txDisplay}
              </a>
            ) : (
              <span className="break-all">{txDisplay} <em>(sem explorer)</em></span>
            )
          ) : (
            <span className="text-gray-500">Não disponível</span>
          )}
        </p>

        <p><strong>Rede:</strong> {cert.network === 'besu' ? 'Hyperledger Besu' : cert.network}</p>
        <p><strong>Descrição:</strong> {cert.description}</p>
      </div>
    </main>
  )
}