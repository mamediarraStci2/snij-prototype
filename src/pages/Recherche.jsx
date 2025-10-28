import { useMemo, useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const MOCK_DECISIONS = Array.from({ length: 57 }).map((_, i) => ({
  id: i + 1,
  numeroRole: `2025-${(i + 1).toString().padStart(4, '0')}`,
  date: new Date(2025, (i % 12), (i % 28) + 1).toISOString().slice(0, 10),
  type: ['Jugement', 'Ordonnance', 'Arrêt'][i % 3],
  juridiction: ['Tribunal de Commerce HC Dakar', 'Cour d\'Appel de Dakar', 'TGI Thiès'][i % 3],
  resume: ['Contrat commercial', 'Procédure collective', 'Contentieux bancaire'][i % 3],
  motsCles: ['contrat', 'liquidation', 'banque'][i % 3],
}))

const TYPES = ['Jugement', 'Ordonnance', 'Arrêt']
const JURIDICTIONS = [
  'Tribunal de Commerce HC Dakar',
  "Cour d'Appel de Dakar",
  'TGI Thiès',
]

export default function Recherche() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true })
  }, [])
  
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [jur, setJur] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [page, setPage] = useState(1)
  const [detail, setDetail] = useState(null)
  const pageSize = 10

  const filtered = useMemo(() => {
    const from = dateFrom ? new Date(dateFrom) : null
    const to = dateTo ? new Date(dateTo) : null
    return MOCK_DECISIONS.filter(d => {
      const text = `${d.numeroRole} ${d.resume} ${d.motsCles}`.toLowerCase()
      const matchQ = !q || text.includes(q.toLowerCase())
      const matchType = !type || d.type === type
      const matchJur = !jur || d.juridiction === jur
      const dDate = new Date(d.date)
      const matchFrom = !from || dDate >= from
      const matchTo = !to || dDate <= to
      return matchQ && matchType && matchJur && matchFrom && matchTo
    })
  }, [q, type, jur, dateFrom, dateTo])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  function onSubmit(e) {
    e.preventDefault()
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white py-12">
        <div className="container-snij">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Recherche de Décisions</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">Accédez à l'ensemble des décisions judiciaires du Sénégal</p>
          </div>
        </div>
      </div>
      
      <div className="container-snij py-8">

      <form onSubmit={onSubmit} className="card p-6 mb-8 shadow-xl" data-aos="fade-up">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mots-clés / N° rôle</label>
            <input value={q} onChange={e=>setQ(e.target.value)} type="text" placeholder="ex: contrat, 2025-0001" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Type de décision</label>
            <select value={type} onChange={e=>setType(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
              <option value="">Tous</option>
              {TYPES.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Juridiction</label>
            <select value={jur} onChange={e=>setJur(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
              <option value="">Toutes</option>
              {JURIDICTIONS.map(j=> <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Du</label>
              <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Au</label>
              <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <i className="fas fa-search"></i> Rechercher
          </button>
          <button type="button" onClick={()=>{setQ('');setType('');setJur('');setDateFrom('');setDateTo('');setPage(1)}} className="btn-outline">
            <i className="fas fa-redo"></i> Réinitialiser
          </button>
          <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
            <i className="fas fa-file-alt text-emerald-600"></i>
            <span className="text-sm font-semibold text-emerald-900">{filtered.length} résultat(s)</span>
          </div>
        </div>
      </form>

      <div className="card overflow-hidden shadow-lg" data-aos="fade-up" data-aos-delay="100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Date</th>
                <th className="text-left px-4 py-3 font-semibold">N° rôle</th>
                <th className="text-left px-4 py-3 font-semibold">Type</th>
                <th className="text-left px-4 py-3 font-semibold">Juridiction</th>
                <th className="text-left px-4 py-3 font-semibold">Résumé</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {current.map(d => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{new Date(d.date).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{d.numeroRole}</td>
                  <td className="px-4 py-3"><span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-medium text-xs">{d.type}</span></td>
                  <td className="px-4 py-3 text-gray-700">{d.juridiction}</td>
                  <td className="px-4 py-3 text-gray-600">{d.resume} – {d.motsCles}</td>
                  <td className="px-4 py-3 text-right"><button onClick={()=>setDetail(d)} className="btn-outline px-3 py-2"><i className="fas fa-file-pdf"></i> Voir</button></td>
                </tr>
              ))}
              {current.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">Aucun résultat — ajustez vos filtres.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
          <span className="text-sm text-gray-500">Page {page} / {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1, p-1))} className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed">Précédent</button>
            <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages, p+1))} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">Suivant</button>
          </div>
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={()=>setDetail(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="text-xl font-bold text-emerald-800">Décision {detail.numeroRole}</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={()=>setDetail(null)}><i className="fas fa-times"></i></button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <p><span className="font-semibold text-gray-700">Date:</span> {new Date(detail.date).toLocaleDateString('fr-FR')}</p>
              <p><span className="font-semibold text-gray-700">Type:</span> {detail.type}</p>
              <p><span className="font-semibold text-gray-700">Juridiction:</span> {detail.juridiction}</p>
              <p><span className="font-semibold text-gray-700">Résumé:</span> {detail.resume}</p>
              <p><span className="font-semibold text-gray-700">Mots-clés:</span> {detail.motsCles}</p>
            </div>
            <div className="px-5 py-4 border-t flex justify-end gap-2">
              <button className="btn-outline" onClick={()=>setDetail(null)}>Fermer</button>
              <button className="btn-primary"><i className="fas fa-download"></i> Télécharger PDF</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
