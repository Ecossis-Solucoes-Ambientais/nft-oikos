import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-light.png';

export default function Header() {
  return (
    <header style={{backgroundColor: "#505d69", paddingRight: "350px", paddingLeft: "350px"}} className="text-white shadow p-4 flex justify-between mx-auto">
      <div style={{display: "flex", alignItems: 'center'}}>
        <img src={logo} alt='Logo'/>
        <h1 className="font-bold text-xl ml-4">Oikos Certify</h1>
      </div>
      <nav className="space-x-4" style={{display: "flex", alignItems: 'center'}}>
        <Link to="/" className="hover:underline">Início</Link>
        <Link to="/gallery" className="hover:underline">Galeria</Link>
      </nav>
    </header>
  );
}
