import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true })
  }, [])
  
  const [form, setForm] = useState({ nom:'', email:'', motif:'Information', message:'' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const es = {}
    if (!form.nom.trim()) es.nom = 'Nom requis'
    if (!form.email.trim()) es.email = 'Email requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) es.email = 'Email invalide'
    if (!form.message.trim()) es.message = 'Message requis'
    setErrors(es)
    return Object.keys(es).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Simulation d'envoi
    setTimeout(() => {
      setSent(true)
      setForm({ nom:'', email:'', motif:'Information', message:'' })
    }, 300)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="bg-gradient-to-r from-emerald-900 to-green-900 text-white py-12">
        <div className="container-snij">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">Nous sommes à votre écoute pour toute question ou demande d'information</p>
          </div>
        </div>
      </div>
      
      <div className="container-snij py-10">

      <div className="grid lg:grid-cols-2 gap-6">
        <form className="card p-8 space-y-5 shadow-xl" data-aos="fade-right" onSubmit={onSubmit} noValidate>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-envelope"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
            <p className="text-gray-600">Remplissez le formulaire ci-dessous</p>
          </div>
          
          {sent && (
            <div className="mb-4 rounded-lg border-2 border-emerald-200 bg-emerald-50 text-emerald-800 px-4 py-3 flex items-center gap-3">
              <i className="fas fa-check-circle text-2xl"></i>
              <div>
                <p className="font-semibold">Message envoyé !</p>
                <p className="text-sm">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="nom">Nom</label>
            <input id="nom" name="nom" value={form.nom} onChange={onChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Votre nom" />
            {errors.nom && <p className="text-xs text-red-600 mt-1">{errors.nom}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="nom@domaine.sn" />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="motif">Motif</label>
              <select id="motif" name="motif" value={form.motif} onChange={onChange} className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
                <option>Information</option>
                <option>Calendrier</option>
                <option>Documents</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={onChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[120px]" placeholder="Votre message..."></textarea>
            {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
          </div>
          <button type="submit" className="btn-primary w-full py-3 text-lg"><i className="fas fa-paper-plane mr-2"></i> Envoyer le message</button>
        </form>

        <div className="space-y-6" data-aos="fade-left">
          <div className="card p-6 reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Coordonnées</h3>
            </div>
            <p className="text-gray-600"><i className="fas fa-map-marker-alt text-emerald-700 mr-2"></i>Plateau, Dakar</p>
            <p className="text-gray-600"><i className="fas fa-phone text-emerald-700 mr-2"></i>+221 33 821 00 00</p>
            <p className="text-gray-600"><i className="fas fa-envelope text-emerald-700 mr-2"></i>contact@snij.sn</p>
          </div>
          <div className="card p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                <i className="fas fa-question-circle text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Questions Fréquentes</h3>
            </div>
            <details className="mb-2">
              <summary className="cursor-pointer font-semibold text-gray-800">Comment consulter le calendrier ?</summary>
              <p className="text-gray-600 mt-1">Rendez-vous dans l’onglet Recherche puis filtrez par juridiction et date.</p>
            </details>
            <details className="mb-2">
              <summary className="cursor-pointer font-semibold text-gray-800">Où trouver les formulaires ?</summary>
              <p className="text-gray-600 mt-1">Dans Téléchargements, section Formulaires.</p>
            </details>
            <details>
              <summary className="cursor-pointer font-semibold text-gray-800">Les décisions sont-elles publiques ?</summary>
              <p className="text-gray-600 mt-1">Les extraits et décisions disponibles sont consultables selon la réglementation.</p>
            </details>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
