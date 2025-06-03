
import React from 'react';

const steps = [
  {
    number: 1,
    title: 'Faça o upload do arquivo',
    description: 'Envie seu arquivo para nossa plataforma. Suportamos vários formatos de arquivos.',
  },
  {
    number: 2,
    title: 'Geramos o certificado',
    description: 'Criamos um hash único do seu arquivo e armazenamos no IPFS para garantir a imutabilidade.',
  },
  {
    number: 3,
    title: 'Receba seu NFT',
    description: 'Seu certificado é mintado como um NFT no blockchain, fornecendo uma prova permanente de autenticidade.',
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-center text-3xl font-bold mb-12">Como funciona</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map(({ number, title, description }) => (
          <div 
            key={number}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start"
          >
            <div style={{backgroundColor: "#bbd259"}} className="w-10 h-10 text-white rounded-full flex items-center justify-center mb-4">
              <span className="font-bold">{number}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
