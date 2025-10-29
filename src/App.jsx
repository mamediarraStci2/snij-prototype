import './index.css'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

function Breadcrumb() {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)
  const crumbs = [{ name: 'Accueil', to: '/' }, ...parts.map((p, i) => ({
    name: p.charAt(0).toUpperCase() + p.slice(1),
    to: '/' + parts.slice(0, i + 1).join('/'),
  }))]
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="container-snij py-2 text-sm">
        {crumbs.map((c, i) => (
          <span key={c.to}>
            {i !== 0 && <span className="mx-2 text-gray-400">/</span>}
            <Link to={c.to} className="text-gray-600 hover:text-emerald-700">{c.name}</Link>
          </span>
        ))}
      </div>
    </nav>
  )
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-40 border-b-2 border-emerald-800 shadow-soft bg-white/80 backdrop-blur-sm">
        <div className="w-full px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 -ml-1 sm:-ml-2 lg:-ml-3">
            <img src="/ministere_justice.png" alt="Ministère de la Justice du Sénégal" className="h-18 w-auto object-contain" />
            <Link to="/" className="flex items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent tracking-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                SNIJ
              </span>
            </Link>
            <span className="sr-only">SNIJ - Système National d'Information Judiciaire</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4">
              <li><Link to="/" className="nav-pill">Accueil</Link></li>
              <li><Link to="/recherche" className="nav-pill inactive">Recherche</Link></li>
              <li><Link to="/juridictions" className="nav-pill inactive">Juridictions</Link></li>
              <li><Link to="/actualites" className="nav-pill inactive">Actualités</Link></li>
              <li><Link to="/telechargements" className="nav-pill inactive">Téléchargements</Link></li>
              <li><Link to="/contact" className="nav-pill inactive">Contact</Link></li>
            </ul>
          </nav>
          <button
            className="md:hidden text-emerald-800 text-2xl"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-emerald-800/20 bg-white/95 backdrop-blur-sm">
            <div className="px-3 sm:px-4 lg:px-6 py-3">
              <ul className="flex flex-col gap-2">
                <li><Link to="/" className="nav-pill" onClick={() => setMobileOpen(false)}>Accueil</Link></li>
                <li><Link to="/recherche" className="nav-pill inactive" onClick={() => setMobileOpen(false)}>Recherche</Link></li>
                <li><Link to="/juridictions" className="nav-pill inactive" onClick={() => setMobileOpen(false)}>Juridictions</Link></li>
                <li><Link to="/actualites" className="nav-pill inactive" onClick={() => setMobileOpen(false)}>Actualités</Link></li>
                <li><Link to="/telechargements" className="nav-pill inactive" onClick={() => setMobileOpen(false)}>Téléchargements</Link></li>
                <li><Link to="/contact" className="nav-pill inactive" onClick={() => setMobileOpen(false)}>Contact</Link></li>
              </ul>
            </div>
          </div>
        )}
      </header>

      <Breadcrumb />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white mt-10">
        <div className="container-snij py-10 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-emerald-500 font-bold mb-2">SNIJ</h4>
            <p>Portail des juridictions du Sénégal</p>
          </div>
          <div>
            <h4 className="text-emerald-500 font-bold mb-2">Liens utiles</h4>
            <ul className="space-y-1 text-sm">
              <li><a className="hover:text-emerald-400" href="#">Ministère de la Justice</a></li>
              <li><a className="hover:text-emerald-400" href="#">OHADA</a></li>
              <li><a className="hover:text-emerald-400" href="#">Ordre des Avocats</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-emerald-500 font-bold mb-2">Contact</h4>
            <p>Email: contact@snij.sn</p>
            <p>Tél: +221 33 821 00 00</p>
          </div>
        </div>
        <div className="text-center text-gray-400 py-4 border-t border-gray-800 text-sm">
          © 2025 SNIJ - République du Sénégal
        </div>
      </footer>
    </div>
  );
}
