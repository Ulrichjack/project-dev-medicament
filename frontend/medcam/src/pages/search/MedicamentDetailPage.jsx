import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import medicamentService from '../../services/medicamentService';
import PharmacyCard from '../../components/medicament/PharmacyCard';

const MedicamentDetailPage = () => {
  const { id } = useParams();
  const [med, setMed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await medicamentService.getById(id);
        setMed(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-bold">Chargement...</div>;
  if (!med) return <div className="p-20 text-center text-red-500">Médicament introuvable.</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER PRODUIT */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-[#F8FAFC] rounded-3xl p-12 flex items-center justify-center border border-slate-100">
            <i className="fa-solid fa-pills text-[120px] text-[#38BDF8] opacity-40"></i>
          </div>

          {/* Infos */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">{med.manufacturer}</span>
              <h1 className="text-4xl font-montserrat font-extrabold text-[#1E293B]">{med.name}</h1>
              {med.prescription_required && (
                <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-lg text-xs font-bold">
                  ORDONNANCE OBLIGATOIRE
                </span>
              )}
            </div>

            <div className="py-6 border-y border-slate-100 space-y-4">
              <h3 className="font-bold text-[#1E293B]">Description</h3>
              <p className="text-slate-600 leading-relaxed">{med.description || "Aucune description disponible pour ce produit."}</p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase">Substance Active</p>
                <p className="font-semibold text-[#1E293B]">{med.active_substance || "N/A"}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase">Dosage</p>
                <p className="font-semibold text-[#1E293B]">{med.dosage || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicamentDetailPage;