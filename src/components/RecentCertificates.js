import { Link } from 'react-router-dom'
import usePollingFetch from '../hooks/usePollingFetch'

export default function RecentCertificates() {
  // Chama o hook de polling a cada 2 minutos
  const rawData = usePollingFetch('https://gallery-proxy-service-236688625650.southamerica-east1.run.app', 2 * 60 * 1000)

  // Mapeia e pega os 3 mais recentes
  const certs = rawData
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 3)
    .map(item => ({
      tokenId:     item.ipfs_hash,
      imageUrl:    item.pinata_url,
      title:       item.file_name,
      description: item.description || item.file_name,
      date:        new Date(item.timestamp).toLocaleDateString('pt-BR'),
    }))

  if (certs.length === 0) {
    return <p className="text-center py-8">Nenhum certificado recente.</p>
  }

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Certificados recentes</h2>
        <Link to="/gallery" className="text-primary hover:underline">
          Ver todos
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map(cert => (
          <Link
            key={cert.tokenId}
            to={`/certificates/${cert.tokenId}`}
            state={{ cert }}
            className="block border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition"
          >
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className="w-full h-48 object-cover bg-gray-100"
            />
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg">{cert.title}</h3>
              <p className="text-gray-600 text-sm mt-1 truncate">
                {cert.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span className="px-2 py-1 border rounded-full border-primary-light text-[#bbd259]">
                  NFT #{cert.tokenId}
                </span>
                <span>{cert.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
