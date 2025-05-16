export default function CertificateCard({ cert }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <img src={cert.imageUrl} alt={cert.title}
           className="w-full h-40 object-cover"/>
      <div className="p-4">
        <h2 className="font-semibold">{cert.title}</h2>
        <p className="text-sm text-gray-600">{cert.description}</p>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>NFT #{cert.tokenId}</span>
          <span>{cert.date}</span>
        </div>
      </div>
    </div>
  )
}
