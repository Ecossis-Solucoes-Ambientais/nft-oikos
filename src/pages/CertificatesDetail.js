import { useLocation, Navigate } from 'react-router-dom'

export default function CertificateDetail() {
  const { state } = useLocation()
  const cert = state?.cert

  // Se vier sem state, volta pra galeria
  if (!cert) return <Navigate to="/gallery" replace />

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{cert.title}</h1>

      {/* 👉 Aqui está a imagem do Pinata */}
      <img
        src={cert.imageUrl}
        alt={cert.title}
        className="w-full h-auto mb-6 rounded-lg shadow"
      />

      <p><strong>Data:</strong> {cert.date}</p>
      <p><strong>Token ID:</strong> {cert.tokenId}</p>
      {/* etc… você decide quais campos mostrar */}
    </main>
  )
}
