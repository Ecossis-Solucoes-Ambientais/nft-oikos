// src/pages/Upload.js
import { useState } from 'react';
import HowItWorks         from '../components/HowItWorks';
import RecentCertificates from '../components/RecentCertificates';  // ← IMPORT

export default function Upload() {
  const [file, setFile]     = useState(null);
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    setStatus('Enviando...');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch(
        'https://proxy-service-236688625650.southamerica-east1.run.app/',
        { method: 'POST', body: form }
      );
      if (!res.ok) throw new Error(await res.text());
      setStatus('✔ Certificado criado!');
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      setStatus('❌ Falha no envio');
    }
    
  }

  return (
    <main className="container py-8"> {/* usei container pra padding responsivo */}
      <h1 className="text-4xl font-bold text-primary-dark mb-6">
        Criar Certificado
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full border border-gray-300 rounded p-2"
        />
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Enviar
        </button>
      </form>
      {status && <p className="mt-4 text-center">{status}</p>}

      <HowItWorks />

      <RecentCertificates />
    </main>
  )
}
