import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecentCertificates() {
  const [certs, setCerts] = useState([])

  useEffect(() => {
    fetch('https://gallery-proxy-service-236688625650.southamerica-east1.run.app')   // a rota do proxy_list
      .then(r => r.json())
      .then(data => {
        const mapped = data
          .map(item => ({
            tokenId:     item.ipfs_hash,
            imageUrl:    item.pinata_url,
            title:       item.file_name,
            // se você armazenar um campo `description` no Firestore, use item.description
            description: item.description || item.file_name,
            date:        new Date(item.timestamp).toLocaleDateString('pt-BR')
          }))
          .slice(0, 3)    // só os 3 primeiros
        setCerts(mapped)
      })
      .catch(console.error)
  }, [])

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Certificados recentes</h2>
        <Link to="/gallery" className="text-purple-600 hover:underline">
          Ver todos
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map(cert => (
          <Link
            key={cert.tokenId}
            to={`/certificates/${cert.tokenId}`}
            state={{ cert }}
            className="block border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className="w-full h-48 object-cover bg-gray-100"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{cert.title}</h3>
              <p className="text-gray-600 text-sm mt-1 truncate">
                {cert.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span className="px-2 py-1 border rounded-full border-purple-200 text-purple-600">
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
