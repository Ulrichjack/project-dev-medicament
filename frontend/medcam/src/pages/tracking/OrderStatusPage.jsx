import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'

const STEPS = [
  { key: 'pending',   label: 'En attente' },
  { key: 'confirmed', label: 'Confirmée' },
  { key: 'preparing', label: 'En préparation' },
  { key: 'ready',     label: 'Prête' },
  { key: 'shipped',   label: 'Expédiée' },
  { key: 'delivered', label: 'Livrée' },
]

const getStepIndex = (status) => STEPS.findIndex(s => s.key === status)

export default function OrderStatusPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get(`/orders/${id}`)
      setOrder(response.data.data)
    } catch (err) {
      setError('Impossible de charger cette commande.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!window.confirm('Annuler cette commande ?')) return
    try {
      setCancelling(true)
      await api.patch(`/orders/${id}/cancel`)
      fetchOrder()
    } catch (err) {
      alert('Erreur lors de l\'annulation.')
    } finally {
      setCancelling(false)
    }
  }

  const handleReview = async () => {
    try {
      await api.post('/reviews', { order_id: id })
      alert('Merci pour votre avis !')
    } catch (err) {
      alert('Erreur lors de l\'envoi de l\'avis.')
    }
  }

  // ─── LOADING ──────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1E3A8A] border-t-transparent" />
    </div>
  )

  // ─── ERREUR ───────────────────────────────────────────
  if (error) return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-md">
        <i className="fa fa-circle-exclamation text-red-500 text-4xl mb-4" />
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button
          onClick={fetchOrder}
          className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-semibold"
        >
          Réessayer
        </button>
      </div>
    </div>
  )

  const currentStepIndex = getStepIndex(order?.status)

  return (
    <div className="min-h-screen bg-[#F0F4FF] px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-[#1E3A8A] font-semibold mb-6"
        >
          <i className="fa fa-arrow-left" />
          Retour
        </button>

        <h1 className="text-2xl font-bold text-[#1E3A8A] font-[Montserrat] mb-6">
          Commande #{order?.id}
        </h1>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-[#1E293B] mb-6">Suivi de commande</h2>
          <div className="flex flex-col gap-0">
            {STEPS.map((step, index) => {
              const isPast    = index < currentStepIndex
              const isCurrent = index === currentStepIndex
              const isFuture  = index > currentStepIndex
              const isLast    = index === STEPS.length - 1

              return (
                <div key={step.key} className="flex gap-4">
                  {/* Cercle + trait */}
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${isPast    ? 'bg-green-500 border-green-500' : ''}
                      ${isCurrent ? 'bg-[#1E3A8A] border-[#1E3A8A] animate-pulse' : ''}
                      ${isFuture  ? 'bg-white border-slate-300' : ''}
                    `}>
                      {isPast && <i className="fa fa-check text-white text-xs" />}
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 h-8 ${isPast ? 'bg-green-500' : 'bg-slate-200'}`} />
                    )}
                  </div>

                  {/* Label */}
                  <p className={`
                    pt-0.5 text-sm font-medium mb-6
                    ${isPast    ? 'text-green-600' : ''}
                    ${isCurrent ? 'text-[#1E3A8A] font-bold' : ''}
                    ${isFuture  ? 'text-slate-400' : ''}
                  `}>
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Items commandés */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-[#1E293B] mb-4">Articles</h2>
          <div className="flex flex-col gap-3">
            {order?.items?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-[#1E293B]">{item.name}</p>
                  <p className="text-sm text-slate-400">Qté : {item.quantity}</p>
                </div>
                <p className="font-semibold text-[#1E3A8A]">
                  {item.price?.toLocaleString('fr-FR')} FCFA
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between">
            <p className="font-bold text-[#1E293B]">Total</p>
            <p className="font-bold text-[#1E3A8A]">
              {order?.total?.toLocaleString('fr-FR')} FCFA
            </p>
          </div>

          {/* Méthode paiement */}
          {order?.payment_method && (
            <p className="text-sm text-slate-400 mt-2">
              <i className="fa fa-credit-card mr-2" />
              {order.payment_method}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {order?.tracking_url && (
            
              href={order.tracking_url}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#38BDF8] text-white rounded-xl py-3 text-center font-semibold"
            <a>
              <i className="fa fa-truck mr-2" />
              Suivre la livraison
            </a>
          )}

          {order?.status === 'delivered' && (
            <button
              onClick={handleReview}
              className="w-full bg-[#4ADE80] text-white rounded-xl py-3 font-semibold"
            >
              <i className="fa fa-star mr-2" />
              Laisser un avis
            </button>
          )}

          {order?.status === 'pending' && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="w-full border-2 border-red-500 text-red-500 rounded-xl py-3 font-semibold hover:bg-red-50 transition-all disabled:opacity-50"
            >
              {cancelling ? 'Annulation...' : 'Annuler la commande'}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}