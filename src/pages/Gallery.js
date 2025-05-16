
import { useEffect, useState } from 'react';
import CertificateCard from '../components/CertificateCard';

export default function Gallery() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch('https://gallery-proxy-service-236688625650.southamerica-east1.run.app/proxy_list')
      .then(r => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r;
      })
      .then(r => r.json())
      .then(setCerts)
      .catch(console.error);
  }, []);

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Galeria de Certificados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map(c => <CertificateCard key={c.tokenId} cert={c} />)}
      </div>
    </main>
  )
}
