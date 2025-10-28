import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Link, useNavigate } from 'react-router-dom'
// Vite: import the SVG as raw string to avoid runtime fetch issues
import carteRaw from '/carte.svg?raw'

export default function Home() {
  const [selectedTribunal, setSelectedTribunal] = useState(null);
  // Initialisation des animations AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/senegal_droit.jpg')] opacity-50 bg-cover bg-center bg-fixed"></div>
        <div className="relative bg-gradient-to-br from-emerald-900/60 to-emerald-950/60 backdrop-blur-[2px] text-white py-16 min-h-[480px] flex items-center">
          <div className="container-snij text-center space-y-6 fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold">Accès Transparent à l'Information Judiciaire</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">Plateforme unifiée pour l’accès aux informations des juridictions du Sénégal, par région et par département.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/recherche" className="btn-primary scale-in"><i className="fas fa-search"></i> Rechercher une décision</a>
              <a href="/telechargements" className="btn-outline scale-in"><i className="fas fa-download"></i> Téléchargements</a>
            </div>
            <div className="float-slow mx-auto w-28 h-1 rounded-full bg-white/30"></div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container-snij">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8 reveal">Services clés</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-search', title: 'Recherche de décisions', text: 'Filtrez par date, type, mots-clés, juridiction.' },
              { icon: 'fa-scale-balanced', title: 'Espace citoyen', text: 'Guides et informations utiles.' },
              { icon: 'fa-calendar-alt', title: 'Calendrier audiences', text: 'Consultez les audiences programmées.' },
              { icon: 'fa-download', title: 'Téléchargements', text: 'Lois, décrets, formulaires, rapports.' },
            ].map((m, idx) => (
              <div key={m.title} className="card p-6 text-center hover:shadow-lg2 transition hover:-translate-y-0.5 reveal" style={{transitionDelay: `${idx * 80}ms`}}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 text-white grid place-items-center text-xl mx-auto mb-3">
                  <i className={`fas ${m.icon}`}></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">{m.title}</h4>
                <p className="text-gray-600 text-sm">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-10 bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern-scales.svg')] bg-repeat"></div>
        </div>
        <div className="container-snij relative">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-emerald-800 bg-emerald-100 rounded-full mb-4">
              <i className="fas fa-map-marked-alt mr-2"></i>Cartographie Interactive
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Découvrez le Réseau Judiciaire <span className="text-emerald-700">Sénégalais</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 mb-8">
              Naviguez à travers notre carte interactive pour localiser les différentes juridictions, 
              accéder à leurs informations et découvrir les services disponibles dans chaque région du Sénégal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#carte-juridictions" className="btn-primary group">
                Explorer la carte
                <i className="fas fa-arrow-down ml-2 transition-transform group-hover:translate-y-0.5"></i>
              </a>
              <a href="/juridictions" className="btn-outline">
                <i className="fas fa-list-ul mr-2"></i>Voir la liste complète
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedTribunal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTribunal(null)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-auto relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedTribunal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">{selectedTribunal.name}</h3>
            <p className="text-gray-600 mb-4">Région: {selectedTribunal.region}</p>
            <div className="space-y-3">
              <Link 
                to={`/juridictions?region=${encodeURIComponent(selectedTribunal.region)}`}
                className="block w-full text-center bg-emerald-100 text-emerald-800 py-2 px-4 rounded-lg hover:bg-emerald-200 transition-colors"
                onClick={() => setSelectedTribunal(null)}
              >
                Voir les détails
              </Link>
            </div>
          </div>
        </div>
      )}
      <section id="carte-juridictions" className="pt-14 pb-4 bg-white overflow-hidden">
        <div className="container-snij">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-emerald-800 mb-3">Carte Interactive des Juridictions</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Cliquez sur les points rouges pour découvrir les juridictions disponibles dans chaque région
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-2 relative">
            <div className="relative w-full" style={{ paddingBottom: '80%' }}>
              <div className="absolute inset-0 w-full h-full">
                <div dangerouslySetInnerHTML={{ __html: carteRaw }} className="w-full h-full" />
                
                {/* Points rouges des juridictions */}
                <div className="absolute inset-0">
                  {[
                    // Dakar
                    { id: 1, x: 15, y: 35, name: 'Tribunal de Grande Instance de Dakar', region: 'Dakar' },
                    { id: 2, x: 12, y: 40, name: 'Tribunal de Commerce de Dakar', region: 'Dakar' },
                    // Thiès
                    { id: 3, x: 10, y: 50, name: 'Tribunal de Grande Instance de Thiès', region: 'Thiès' },
                    // Saint-Louis
                    { id: 4, x: 20, y: 18, name: 'Tribunal de Grande Instance de Saint-Louis', region: 'Saint-Louis' },
                    // Ziguinchor
                    { id: 5, x: 5, y: 75, name: 'Tribunal de Grande Instance de Ziguinchor', region: 'Ziguinchor' },
                    // Kaolack
                    { id: 6, x: 25, y: 45, name: 'Tribunal de Grande Instance de Kaolack', region: 'Kaolack' },
                    // Tambacounda
                    { id: 7, x: 65, y: 42, name: 'Tribunal de Grande Instance de Tambacounda', region: 'Tambacounda' },
                    // Kolda
                    { id: 8, x: 55, y: 85, name: 'Tribunal de Grande Instance de Kolda', region: 'Kolda' },
                    // Matam
                    { id: 9, x: 55, y: 22, name: 'Tribunal de Grande Instance de Matam', region: 'Matam' },
                    // Kaffrine
                    { id: 10, x: 35, y: 38, name: 'Tribunal de Grande Instance de Kaffrine', region: 'Kaffrine' },
                  ].map((tribunal) => (
                    <div
                      key={tribunal.id}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${tribunal.x}%`,
                        top: `${tribunal.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTribunal(tribunal);
                      }}
                    >
                      <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg transform transition-all duration-300 group-hover:scale-150 group-hover:bg-red-700"></div>
                      <div className="absolute bottom-full left-1/2 mb-2 px-3 py-1 bg-white rounded shadow-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2">
                        <div className="font-bold text-emerald-800">{tribunal.name}</div>
                        <div className="text-gray-600 text-xs">{tribunal.region}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <Link to="/juridictions" className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-800 transition-colors">
              Voir toutes les juridictions
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Statistiques avec animations */}
      <section className="py-10 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container-snij">
          <div className="text-center mb-12" data-aos="fade-up">
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-3">Notre Impact en Chiffres</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Découvrez l'étendue de notre réseau judiciaire à travers le Sénégal
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: 24, label: 'Tribunaux', icon: 'fa-scale-balanced', color: 'emerald' },
              { number: 14, label: 'Régions', icon: 'fa-map-location-dot', color: 'teal' },
              { number: '10k+', label: 'Décisions', icon: 'fa-file-contract', color: 'green' },
              { number: '98%', label: 'Satisfaction', icon: 'fa-star', color: 'lime' },
            ].map((stat, idx) => (
              <div 
                key={stat.label}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className={`w-16 h-16 rounded-full bg-${stat.color}-100 text-${stat.color}-700 text-3xl flex items-center justify-center mb-4 mx-auto`}>
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    <CountUp end={stat.number} duration={2.5} />
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <h3 className="text-2xl font-bold text-emerald-800">Une Justice Plus Accessible</h3>
              <p className="text-gray-600">
                Notre plateforme révolutionne l'accès à l'information judiciaire au Sénégal, mettant à votre disposition des outils innovants pour suivre les affaires, consulter les décisions et comprendre vos droits.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'fa-clock', text: 'Accès 24/7 aux informations' },
                  { icon: 'fa-mobile-screen', text: 'Interface adaptée mobile' },
                  { icon: 'fa-shield-halved', text: 'Données sécurisées' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <i className={`fas ${item.icon} text-sm`}></i>
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 px-6 py-3 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center group">
                En savoir plus
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
            
            <div className="relative h-80 md:h-96 bg-white rounded-xl shadow-lg overflow-hidden" data-aos="fade-left">
              <div className="absolute inset-0 bg-[url('/justice-scales.jpg')] bg-cover bg-center transform hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-emerald-800/20"></div>
              </div>
              <div className="relative p-6 h-full flex flex-col justify-end">
                <h4 className="text-xl font-bold text-white mb-2">Notre Engagement</h4>
                <p className="text-emerald-100 text-sm">
                  Une justice transparente et accessible à tous les citoyens sénégalais, où que vous soyez dans le pays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi + image */}
      <section className="py-10 bg-white">
        <div className="container-snij">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="reveal">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pourquoi le SNIJ ?</h3>
              <p className="text-gray-600">
                Transparence, accessibilité et modernisation de la justice au Sénégal. Le SNIJ centralise les informations de toutes les juridictions pour simplifier les démarches.
              </p>
              <p className="text-gray-600 mb-4">Transparence, accessibilité et modernisation de la justice au Sénégal. Le SNIJ centralise les informations de toutes les juridictions pour simplifier les démarches.</p>
              <ul className="space-y-2 text-gray-700">
                <li><i className="fas fa-check text-emerald-700 mr-2"></i>Recherche de décisions rapide</li>
                <li><i className="fas fa-check text-emerald-700 mr-2"></i>Calendriers et audiences</li>
                <li><i className="fas fa-check text-emerald-700 mr-2"></i>Téléchargements officiels</li>
              </ul>
            </div>
            <div className="reveal">
              <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">Zone image (bâtiment/illustration)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités récentes — carousel avec flèches */}
      <section className="py-8">
        <div className="container-snij">
          <h3 className="text-2xl font-bold text-emerald-800 text-center mb-8">Actualités récentes</h3>
          <RecentNewsCarousel />
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-10 bg-gradient-to-br from-green-900 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container-snij relative">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Témoignages</h2>
            <div className="w-20 h-1 bg-white/50 mx-auto"></div>
            <p className="text-green-100 mt-4 max-w-2xl mx-auto">Ce que disent les utilisateurs de notre plateforme</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Amadou Diop', role: 'Avocat', text: 'Une plateforme révolutionnaire qui facilite grandement mon travail quotidien. Accès rapide aux décisions et informations.', rating: 5 },
              { name: 'Fatou Sall', role: 'Citoyenne', text: 'Très pratique pour suivre les affaires. Interface claire et facile à utiliser, même pour les non-initiés.', rating: 5 },
              { name: 'Moussa Kane', role: 'Juriste', text: 'Le SNIJ est un outil indispensable pour tous les professionnels du droit au Sénégal. Bravo pour cette initiative!', rating: 5 },
            ].map((t, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{t.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-green-200">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Guides Pratiques */}
      <section className="py-10 bg-gradient-to-br from-white to-gray-50">
        <div className="container-snij">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-emerald-800 bg-emerald-100 rounded-full mb-4">
              <i className="fas fa-book mr-2"></i>Ressources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Guides Pratiques</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">Tout ce que vous devez savoir pour naviguer dans le système judiciaire sénégalais</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-file-alt', title: 'Comment déposer une plainte', color: 'emerald', desc: 'Étapes et documents nécessaires' },
              { icon: 'fa-users', title: 'Vos droits en justice', color: 'blue', desc: 'Connaître et exercer vos droits' },
              { icon: 'fa-clock', title: 'Délais de procédure', color: 'amber', desc: 'Comprendre les délais légaux' },
              { icon: 'fa-handshake', title: 'Médiation et conciliation', color: 'teal', desc: 'Alternatives au procès' },
            ].map((guide, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className={`w-14 h-14 rounded-xl bg-${guide.color}-100 text-${guide.color}-700 text-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${guide.icon}`}></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{guide.desc}</p>
                <a href="#" className="text-emerald-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                  Lire le guide <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-10 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-snij">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Questions Fréquentes</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-6"></div>
            <p className="text-gray-600">Trouvez rapidement des réponses à vos questions</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'Comment consulter une décision de justice ?', a: 'Utilisez notre moteur de recherche avancé pour trouver des décisions par numéro, date, juridiction ou mots-clés.' },
              { q: 'Puis-je télécharger les décisions ?', a: 'Oui, toutes les décisions disponibles peuvent être téléchargées au format PDF après authentification.' },
              { q: 'Comment suivre l\'évolution de mon dossier ?', a: 'Connectez-vous à votre espace personnel pour accéder au suivi en temps réel de vos dossiers.' },
              { q: 'Les services sont-ils gratuits ?', a: 'L\'accès aux informations publiques est gratuit. Certains services avancés nécessitent un abonnement.' },
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} delay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Partenaires */}
      <section className="py-8 bg-gray-50">
        <div className="container-snij">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Nos Partenaires</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              { name: 'Ministère de la Justice' },
              { name: 'Ordre des Avocats' },
              { name: 'OHADA' },
              { name: 'Conseil Constitutionnel' },
            ].map((partner, idx) => (
              <div key={idx} className="h-24 bg-white rounded-lg shadow flex items-center justify-center p-4 hover:shadow-lg transition-shadow" data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div className="text-center text-gray-600 font-medium">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bouton CTA Flottant */}
      <a href="/contact" className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group" aria-label="Nous contacter">
        <i className="fas fa-comment-dots text-2xl group-hover:animate-pulse"></i>
      </a>

      {/* Bandes flottantes animées */}
      <div className="fixed top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent animate-pulse pointer-events-none" style={{animationDelay: '1s'}}></div>
    </>
  )
}

/* ------------------ utilitaires ------------------ */
function SvgEmbedRaw({ className = '' }) {
  // carteRaw provient de Vite (?raw)
  let svg = carteRaw || ''
  if (!svg) return null

  // si la balise <svg> n'a pas de viewBox, on injecte un viewBox par défaut (préférable de corriger le fichier source)
  if (/^\s*<svg/i.test(svg)) {
    if (!/(<svg[^>]*\b(viewBox|width|height)\b)/i.test(svg)) {
      svg = svg.replace(/<svg([^>]*)>/i, '<svg$1 viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">')
    } else {
      svg = svg.replace(/<svg([^>]*)>/i, '<svg$1 style="width:100%;height:100%;display:block">')
    }
  }

  return (
    <div className={`absolute inset-0 map-embed ${className}`} style={{ zIndex: 0 }} dangerouslySetInnerHTML={{ __html: svg }} />
  )
}

function RecentNewsCarousel() {
  const slides = [
    {
      id: 'dgid',
      image: '/dgid.jpeg',
      tag: 'Sécurité',
      title: "La Direction des Impôts et des Domaines victime d’une cyberattaque, 1 To de données dérobé.",
      excerpt: 'Enquête en cours, renforcement des mesures de sécurité et communication officielle à venir.',
    },
    {
      id: 'place2',
      image: '/proces.jpeg',
      tag: 'Annonce',
      title: 'Digitalisation des procédures: nouvelles étapes pour les usagers',
      excerpt: "Le ministère présente les prochaines phases du processus de modernisation.",
    },
    {
      id: 'place3',
      image: '/PMN.jpeg',
      tag: 'Flash',
      title: 'Sénégal – De nouveau convoqué à la Section de Recherches, Pape Malick Ndour finalement libéré',
      excerpt: "Retour sur les faits et précisions des autorités compétentes.",
    },
  ]

  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)
  const delay = 5000

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  function startAutoPlay() {
    stopAutoPlay()
    timeoutRef.current = setTimeout(() => setIndex(i => (i + 1) % slides.length), delay)
  }
  function stopAutoPlay() { if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null } }

  function prev() { setIndex(i => (i - 1 + slides.length) % slides.length) }
  function next() { setIndex(i => (i + 1) % slides.length) }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translate3d(-${index * 100}%,0,0)`, willChange: 'transform' }}>
          {slides.map(s => (
            <article key={s.id} className="min-w-full card overflow-hidden group">
              <div className="relative h-64 bg-gray-100 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                <img 
                  src={s.image} 
                  alt={s.title} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">{s.tag}</span>
                <h4 className="text-lg font-bold text-gray-900 mt-2 mb-1 group-hover:text-emerald-700 transition-colors duration-300">{s.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{s.excerpt}</p>
                <a href="/actualites" className="btn-primary px-4 py-2">Lire</a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button onClick={prev} aria-label="Précédent" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button onClick={next} aria-label="Suivant" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Indicators */}
      <div className="flex gap-2 mt-3 justify-center">
        {slides.map((_, i) => (
          <button key={i} onClick={()=>setIndex(i)} aria-label={`Aller au slide ${i+1}`} className={`w-2 h-2 rounded-full ${i===index ? 'bg-emerald-800' : 'bg-gray-300'}`}></button>
        ))}
      </div>
    </div>
  )
}

/* ------------------ autres composants/utilitaires (inchangés sauf adaptations) ------------------ */
function useInView(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, options || { threshold: 0.3 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [options])
  return { ref, inView }
}

function useCountUp(end, duration = 2000, startNow = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!startNow) return
    let raf
    const start = performance.now()
    const animate = (time) => {
      const progress = Math.min(1, (time - start) / duration)
      setValue(Math.floor(end * progress))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, startNow])
  return value
}

function StatCard({ icon, color = 'emerald', label, end, suffix = '' }) {
  const { ref, inView } = useInView({ threshold: 0.4 })
  const val = useCountUp(end, 2000, inView)
  const colorMap = {
    emerald: 'bg-emerald-800',
    amber: 'bg-amber-600',
    gray: 'bg-gray-700',
  }
  return (
    <div ref={ref} className={`card p-6 text-center reveal ${inView ? 'reveal-visible' : ''}`}>
      <div className={`w-14 h-14 rounded-full ${colorMap[color] || colorMap.emerald} text-white grid place-items-center text-xl mx-auto mb-3`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="text-3xl font-extrabold text-emerald-800">{val.toLocaleString()}{suffix}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

function FAQItem({ question, answer, delay }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden" data-aos="fade-up" data-aos-delay={delay}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-gray-900 pr-4">{question}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-emerald-700 transition-transform`}></i>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-6 pt-0 text-gray-600">{answer}</div>
      </div>
    </div>
  )
}

// Données d'exemple – tribunaux et cours d'appel (à étendre si besoin)
const HOME_INSTITUTIONS = [
  { id:1, nom:"Tribunal de Commerce HC Dakar", type:"Tribunal", region:"Dakar", departement:"Dakar" },
  { id:2, nom:"Cour d'Appel de Dakar", type:"Cour", region:"Dakar", departement:"Dakar" },
  { id:3, nom:"TGI Thiès", type:"Tribunal", region:"Thiès", departement:"Thiès" },
  { id:4, nom:"TGI Kaolack", type:"Tribunal", region:"Kaolack", departement:"Kaolack" },
  { id:5, nom:"Cour d'Appel de Saint-Louis", type:"Cour", region:"Saint-Louis", departement:"Saint-Louis" },
  { id:6, nom:"TGI Ziguinchor", type:"Tribunal", region:"Ziguinchor", departement:"Ziguinchor" },
  { id:7, nom:"TGI Pikine", type:"Tribunal", region:"Dakar", departement:"Pikine" },
  { id:8, nom:"Cour d'Appel de Thiès", type:"Cour", region:"Thiès", departement:"Thiès" },
  { id:9, nom:"TGI Tambacounda", type:"Tribunal", region:"Tambacounda", departement:"Tambacounda" },
  { id:10, nom:"TGI Saint-Louis", type:"Tribunal", region:"Saint-Louis", departement:"Saint-Louis" },
  { id:11, nom:"Cour d'Appel de Kaolack", type:"Cour", region:"Kaolack", departement:"Kaolack" },
  { id:12, nom:"TGI Rufisque", type:"Tribunal", region:"Dakar", departement:"Rufisque" },
]

// Emplacements approximatifs pour les régions (illustratif) — ajoute pin.id pour lier
const MAP_PINS = [
  { id: 2, name: 'Dakar', top: '55%', left: '15%' },
  { id: 3, name: 'Thiès', top: '50%', left: '25%' },
  { id: 4, name: 'Kaolack', top: '60%', left: '40%' },
  { id: 5, name: 'Saint-Louis', top: '20%', left: '30%' },
  { id: 6, name: 'Ziguinchor', top: '80%', left: '15%' },
  { id: 9, name: 'Tambacounda', top: '65%', left: '70%' },
]

// Filtre rapide (par région, type)
function QuickFilter() {
  const [region, setRegion] = useState('')
  const [type, setType] = useState('')
  window.__homeFilter = { region, type }
  return (
    <>
      <select value={region} onChange={e=>setRegion(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 bg-white">
        <option value="">Toutes les régions</option>
        {[...new Set(HOME_INSTITUTIONS.map(i=>i.region))].map(r=> <option key={r} value={r}>{r}</option>)}
      </select>
      <select value={type} onChange={e=>setType(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 bg-white">
        <option value="">Tous les types</option>
        <option value="Tribunal">Tribunal</option>
        <option value="Cour">Cour</option>
      </select>
    </>
  )
}

function useFilteredInstitutions() {
  const [, rerender] = useState(0)
  const [filters, setFilters] = useState({ region:'', type:'' })
  useEffect(()=>{
    const i = setInterval(()=>{
      if (window.__homeFilter && (window.__homeFilter.region !== filters.region || window.__homeFilter.type !== filters.type)) {
        setFilters({ ...window.__homeFilter })
        rerender(x=>x+1)
      }
    }, 200)
    return ()=>clearInterval(i)
  }, [filters])
  return HOME_INSTITUTIONS.filter(i => (
    (!filters.region || i.region === filters.region) &&
    (!filters.type || i.type === filters.type)
  ))
}

function getRegionCounts() {
  const total = HOME_INSTITUTIONS.length
  const byRegion = {}
  HOME_INSTITUTIONS.forEach(i => {
    byRegion[i.region] = (byRegion[i.region] || 0) + 1
  })
  return Object.entries(byRegion).map(([region, count]) => ({
    region,
    count,
    percent: Math.round((count / total) * 100)
  }))
}