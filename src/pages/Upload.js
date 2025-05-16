import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    setStatus('Enviando...');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('https://proxy-service-236688625650.southamerica-east1.run.app', {
        method: 'POST',
        body: form
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('✔ Certificado criado!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Falha no envio');
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Criar Certificado</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file"
               onChange={e => setFile(e.target.files[0])}
               className="block w-full"/>
        <button type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded">
          Enviar
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </main>
  )
}
