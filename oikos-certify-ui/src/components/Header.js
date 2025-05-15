import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between max-w-5xl mx-auto">
      <h1 className="font-bold text-xl">Certify</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Início</Link>
        <Link to="/gallery" className="hover:underline">Galeria</Link>
      </nav>
    </header>
  );
}
