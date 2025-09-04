import { Link } from 'react-router-dom'

export default function CertificateCard({ cert }) {
  return (
    <Link
      to={`/certificates/${encodeURIComponent(cert.tokenId)}`}
      state={{ cert }}
      className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150"
    >
      <img
        src={cert.imageUrl}
        alt={cert.title}
        className="w-full h-40 object-cover bg-gray-100"
      />
      <div className="p-4">
        {/* Exibe só o que você quer */}
        <h2 className="font-semibold">{cert.title}</h2>
        <p className="text-xs text-gray-500">{cert.date}</p>
      </div>
    </Link>
  )
}
