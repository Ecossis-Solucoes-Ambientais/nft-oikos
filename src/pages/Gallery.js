
import { useEffect, useState } from 'react';
import CertificateCard from '../components/CertificateCard';

export default function Gallery() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch('https://gallery-proxy-service-236688625650.southamerica-east1.run.app')
      .then(res => res.json())
      .then(data => {
        // mapear os campos retornados para a shape que o CertificateCard espera
        const mapped = data.map(item => ({
          tokenId:  item.ipfs_hash,
          imageUrl: item.pinata_url,
          title:    item.file_name,
          date:     new Date(item.timestamp).toLocaleDateString('pt-BR')
        }))
        setCerts(mapped)
      })
      .catch(console.error)
  }, [])

  return (
   <main className="max-w-5xl mx-auto p-8">
     <h1 className="text-2xl font-bold mb-6">Galeria de Certificados</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {certs.map(c => <CertificateCard key={c.tokenId} cert={c} />)}
     </div>
   </main>
 )
}
