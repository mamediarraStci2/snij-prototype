import { useMemo, useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const DATA = {
  Dakar: {
    'Dakar': [
      { id: 1, nom: 'Tribunal de Commerce HC Dakar', type: 'Tribunal', adresse: 'Plateau, Dakar', contact: '+221 33 821 00 00' },
      { id: 2, nom: "Cour d'Appel de Dakar", type: 'Cour', adresse: 'Plateau, Dakar', contact: '+221 33 821 00 01' },
    ],
    'Pikine': [
      { id: 3, nom: 'TGI Pikine', type: 'Tribunal', adresse: 'Pikine', contact: '+221 33 900 11 11' },
    ],
  },
  Thiès: {
    'Thiès': [
      { id: 4, nom: 'TGI Thiès', type: 'Tribunal', adresse: 'Thiès Centre', contact: '+221 33 951 00 00' },
    ],
  },
  Kaolack: {
    'Kaolack': [
      { id: 5, nom: 'TGI Kaolack', type: 'Tribunal', adresse: 'Kaolack', contact: '+221 33 941 00 00' },
    ],
  },
}

const regions = Object.keys(DATA)

export default function Juridictions() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true })
  }, [])
  
  const [region, setRegion] = useState('Dakar')
  const [departement, setDepartement] = useState('Dakar')
  const [selected, setSelected] = useState(null)

  const departements = useMemo(() => Object.keys(DATA[region] || {}), [region])
  const items = useMemo(() => (DATA[region]?.[departement] || []), [region, departement])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white py-12">
        <div className="container-snij">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Juridictions du Sénégal</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">Retrouvez toutes les juridictions par région et département</p>
          </div>
        </div>
      </div>
      
      <div className="container-snij py-8">

      <div className="card p-6 mb-8 shadow-xl" data-aos="fade-up">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Région</label>
            <select value={region} onChange={e=>{setRegion(e.target.value); setDepartement(Object.keys(DATA[e.target.value])[0])}} className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Département</label>
            <select value={departement} onChange={e=>setDepartement(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
              {departements.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
              <i className="fas fa-building text-emerald-600 mr-2"></i>
              <span className="text-sm font-semibold text-emerald-900">{items.length} juridiction(s)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
        {items.map((j, idx) => {
          const isCourt = j.type.toLowerCase().includes('cour')
          const iconClass = isCourt ? 'fa-balance-scale' : 'fa-gavel'
          return (
            <div key={j.id} className="card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 group-hover:text-emerald-700 transition-colors"><i className={`fas ${iconClass} text-emerald-600`}></i>{j.nom}</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-lime-100 text-lime-800 font-medium text-xs">{j.type}</span>
              </div>
              <p className="text-gray-600 text-sm mb-1"><i className="fas fa-map-marker-alt text-emerald-700 mr-2"></i>{j.adresse}</p>
              <p className="text-gray-600 text-sm mb-3"><i className="fas fa-phone text-emerald-700 mr-2"></i>{j.contact}</p>
              <div className="grid grid-cols-2 xl:grid-cols-5 gap-2 mb-4">
                {[
                  'Saisine au Fond',
                  'Référé',
                  'Requête',
                  'Procédure collective',
                  'Comparution volontaire',
                ].map((t,i)=> (
                  <div key={i} className="border-2 border-emerald-700 rounded-md px-3 py-2 text-center text-[12px] font-semibold text-gray-800 hover:shadow-soft transition">
                    <i className="fas fa-pen-to-square text-emerald-700 mr-1"></i>{t}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <button className="btn-outline px-3 py-2" onClick={()=>setSelected(j)}>Voir détails</button>
                <button className="btn-primary px-3 py-2">Accéder</button>
              </div>
            </div>
          )
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full overflow-hidden scale-in" onClick={(e)=>e.stopPropagation()}>
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className={`fas ${selected.type.toLowerCase().includes('cour')?'fa-balance-scale':'fa-gavel'} text-emerald-700`}></i>
                <h3 className="text-xl font-bold text-gray-900">{selected.nom}</h3>
              </div>
              <button className="text-gray-500 hover:text-gray-700" onClick={()=>setSelected(null)}><i className="fas fa-times"></i></button>
            </div>
            <div className="p-6 grid lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 mb-2">Informations</h4>
                <p className="text-sm text-gray-700"><i className="fas fa-map-marker-alt text-emerald-700 mr-2"></i>{selected.adresse}</p>
                <p className="text-sm text-gray-700"><i className="fas fa-phone text-emerald-700 mr-2"></i>{selected.contact}</p>
                <div className="h-28 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs">Zone image du bâtiment</div>
              </div>
              <div className="lg:col-span-2">
                <h4 className="font-bold text-gray-800 mb-3">Modes de saisine</h4>
                <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
                  {[
                    'Comment saisir le Tribunal au Fond ?',
                    'Comment saisir le président en référé ?',
                    'Comment saisir le président par requête ?',
                    'Comment saisir le tribunal pour une procédure collective ?',
                    'Comment saisir le tribunal par Comparution Volontaire ?',
                  ].map((t,i)=> (
                    <div key={i} className="border-2 border-emerald-700 rounded-lg p-4 hover:shadow-lg transition reveal">
                      <div className="w-14 h-14 rounded-full border-2 border-emerald-700 grid place-items-center text-emerald-700 mx-auto mb-3"><i className="fas fa-pen-to-square text-2xl"></i></div>
                      <p className="text-sm font-semibold text-center text-gray-800">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 text-right">
              <button className="btn-outline" onClick={()=>setSelected(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
