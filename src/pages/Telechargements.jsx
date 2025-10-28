import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const CATEGORIES = [
  {
    id: 1,
    name: 'Lois & Décrets',
    icon: 'fa-gavel',
    color: 'emerald',
    files: [
      { id: 1, name: 'Loi organique sur le CSM', date: '2024-12-15', size: '2.3 MB', type: 'PDF' },
      { id: 2, name: 'Code de procédure civile', date: '2024-11-20', size: '5.1 MB', type: 'PDF' },
      { id: 3, name: 'Décret sur les juridictions', date: '2024-10-10', size: '1.8 MB', type: 'PDF' },
    ]
  },
  {
    id: 2,
    name: 'Formulaires',
    icon: 'fa-file-alt',
    color: 'emerald',
    files: [
      { id: 4, name: 'Formulaire de saisine', date: '2025-01-05', size: '450 KB', type: 'DOCX' },
      { id: 5, name: 'Requete en refere', date: '2024-12-28', size: '380 KB', type: 'DOCX' },
      { id: 6, name: "Declaration d'appel", date: '2024-12-15', size: '520 KB', type: 'DOCX' },
    ]
  },
  {
    id: 3,
    name: 'Rapports',
    icon: 'fa-chart-bar',
    color: 'lime',
    files: [
      { id: 7, name: 'Rapport annuel 2024', date: '2024-12-31', size: '8.5 MB', type: 'PDF' },
      { id: 8, name: 'Statistiques Q4 2024', date: '2024-12-20', size: '3.2 MB', type: 'PDF' },
    ]
  },
]

export default function Telechargements() {
  const [selectedCat, setSelectedCat] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    AOS.init({ duration: 600, once: true })
  }, [])
  
  const filteredFiles = selectedCat ? selectedCat.files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="bg-gradient-to-r from-teal-900 to-cyan-900 text-white py-12">
        <div className="container-snij">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Téléchargements</h1>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto">Accédez aux documents officiels, formulaires et rapports</p>
          </div>
        </div>
      </div>
      
      <div className="container-snij py-10">

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {CATEGORIES.map((cat, idx) => (
          <div 
            key={cat.id} 
            className="card p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            onClick={() => setSelectedCat(cat)}
          >
            <div className={`w-16 h-16 rounded-full bg-${cat.color}-100 text-${cat.color}-600 text-3xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
              <i className={`fas ${cat.icon}`}></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-${cat.color}-700 transition-colors">{cat.name}</h3>
            <p className="text-center text-gray-600 mb-4">{cat.files.length} documents disponibles</p>
            <button className="btn-primary w-full justify-center">
              <i className="fas fa-folder-open mr-2"></i>Explorer
            </button>
          </div>
        ))}
      </div>

      {selectedCat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCat(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className={`fas ${selectedCat.icon} text-3xl`}></i>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCat.name}</h2>
                  <p className="text-teal-100 text-sm">{selectedCat.files.length} documents</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCat(null)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text"
                    placeholder="Rechercher dans cette catégorie..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg bg-${selectedCat.color}-100 flex items-center justify-center`}>
                        <i className="fas fa-file-pdf text-${selectedCat.color}-600 text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{file.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span><i className="fas fa-calendar mr-1"></i>{new Date(file.date).toLocaleDateString('fr-FR')}</span>
                          <span><i className="fas fa-file mr-1"></i>{file.size}</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">{file.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary px-4 py-2">
                      <i className="fas fa-download mr-2"></i>Télécharger
                    </button>
                  </div>
                ))}
                {filteredFiles.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-search text-4xl mb-3"></i>
                    <p>Aucun document trouvé</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
