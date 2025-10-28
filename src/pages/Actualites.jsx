import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const FEATURED = [
  {
    id: 'pmn',
    title: "Sénégal – De nouveau convoqué à la Section de Recherches, Pape Malick Ndour finalement libéré",
    image: '/PMN.jpeg',
    tag: 'Flash',
    date: new Date().toISOString().slice(0,10),
  },
]

const POSTS = Array.from({length:8}).map((_,i)=>({
  id:i+1,
  title:[
    "Nomination de magistrats",
    "Calendrier des audiences commerciales",
    "Lancement du portail SNIJ",
    "Rapport d'activité trimestriel",
  ][i%4],
  date:new Date(2025, (i%12), (i%28)+1).toISOString().slice(0,10),
  tag:["Communiqué","Agenda","Annonce","Statistiques"][i%4],
  excerpt:"Texte d'exemple: description courte de l'actualité. Placez ici 2-3 lignes.",
}))

export default function Actualites() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true })
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="bg-gradient-to-r from-green-900 to-teal-900 text-white py-12">
        <div className="container-snij">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Actualités & Communiqués</h1>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">Restez informé des dernières actualités du système judiciaire sénégalais</p>
          </div>
        </div>
      </div>
      
      <div className="container-snij py-10">
      <div data-aos="fade-up">
        <FeaturedSlider items={FEATURED} />
      </div>

      <div className="card p-5 mb-8" data-aos="fade-up" data-aos-delay="100">
        <div className="flex flex-wrap gap-3 items-center">
          <button className="btn-primary">Tous</button>
          <button className="btn-outline">Communiqués</button>
          <button className="btn-outline">Agenda</button>
          <button className="btn-outline">Publications</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="200">
        {POSTS.map((p,idx)=> (
          <article key={p.id} className="card overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-48 bg-gradient-to-br from-lime-100 to-teal-100 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
              <i className="fas fa-newspaper text-6xl text-lime-300 group-hover:scale-110 transition-transform"></i>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-100 text-teal-800">{p.tag}</span>
                <time className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString('fr-FR')}</time>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{p.excerpt}</p>
              <button className="btn-primary px-4 py-2">Lire</button>
            </div>
          </article>
        ))}
      </div>
      </div>
    </div>
  )
}

function FeaturedSlider({ items }) {
  const [idx, setIdx] = useState(0)
  const current = items[idx % items.length]
  useEffect(() => {
    const t = setInterval(()=> setIdx(i=> (i+1)%items.length), 7000)
    return ()=>clearInterval(t)
  }, [items.length])
  if (!current) return null
  return (
    <div className="relative card overflow-hidden mb-8">
      <div className="h-56 sm:h-72 bg-gray-100">
        <img src={current.image} alt="actualité" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
        <div className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded bg-emerald-600/90 mr-2">{current.tag}</div>
        <time className="text-xs opacity-80">{new Date(current.date).toLocaleDateString('fr-FR')}</time>
        <h3 className="text-lg sm:text-xl font-bold mt-1 sm:mt-2">{current.title}</h3>
      </div>
      <button aria-label="Précédent" onClick={() => setIdx(i => (i - 1 + items.length) % items.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-emerald-800 hover:bg-white shadow flex items-center justify-center">
        <span className="sr-only">Précédent</span>
        ‹
      </button>
      <button aria-label="Suivant" onClick={() => setIdx(i => (i + 1) % items.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-emerald-800 hover:bg-white shadow flex items-center justify-center">
        <span className="sr-only">Suivant</span>
        ›
      </button>
    </div>
  )
}
