'use client';

import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Phone,
  CheckCircle2,
  Star,
  MapPin,
  Briefcase,
  AlertCircle,
  Copy,
  Check,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { Provider } from '@/lib/types';

interface ProviderModalProps {
  provider: Provider | null;
  onClose: () => void;
}

export function ProviderModal({ provider, onClose }: ProviderModalProps) {
  const [copied, setCopied] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!provider) return null;

  const whatsappMessage = encodeURIComponent(
    `¡Hola ${provider.name}! Vi tu perfil en ServiSarare y me gustaría cotizar un servicio de ${provider.categoryName}. ¿Tienes disponibilidad?`
  );
  const whatsappUrl = `https://wa.me/${provider.phone}?text=${whatsappMessage}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(provider.displayPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasWorkPhotos = Array.isArray(provider.workPhotos) && provider.workPhotos.length > 0;
  const allTrades = Array.isArray(provider.categoryNames) && provider.categoryNames.length > 0
    ? provider.categoryNames
    : [provider.categoryName];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-50">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-emerald-700 via-emerald-600 to-amber-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            {provider.avatarUrl ? (
              <img
                src={provider.avatarUrl}
                alt={provider.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-lg shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-800 font-black text-2xl flex items-center justify-center shadow-lg shrink-0">
                {provider.name.charAt(0)}
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-white leading-tight">
                  {provider.name}
                </h2>
                {provider.isVerified && (
                  <span className="bg-emerald-100 text-emerald-900 text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verificado
                  </span>
                )}
              </div>
              <p className="text-emerald-100 font-semibold text-sm">
                {provider.categoryName} • {provider.municipality}
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-200">
                <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  {provider.rating.toFixed(1)} ({provider.reviewCount} opiniones)
                </span>
                <span>•</span>
                <span>{provider.experienceYears} años de experiencia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* All trades / skills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Oficios que realiza:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {allTrades.map((trade, idx) => (
                <span
                  key={idx}
                  className="bg-amber-100 text-amber-950 font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-200"
                >
                  ⚡ {trade}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Sobre el trabajador / negocio:
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {provider.description}
            </p>
          </div>

          {/* Photo Gallery of Completed Work */}
          {hasWorkPhotos && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Fotos de Trabajos Realizados ({provider.workPhotos!.length})</span>
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {provider.workPhotos!.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer group"
                  >
                    <img
                      src={photo}
                      alt={`Trabajo ${idx + 1} de ${provider.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                      🔍 Ver
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Servicios y especialidades:
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {provider.servicesOffered.map((srv, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 bg-emerald-50/60 border border-emerald-100 px-3 py-2 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Coverage */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Cobertura y Zonas de Atención:
            </h4>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-amber-50/60 border border-amber-100 p-3 rounded-xl">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{provider.neighborhoodsCovered}</span>
            </div>
          </div>

          {/* Quick copy phone */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 text-slate-800 text-xs">
            <span className="font-semibold">Teléfono / WhatsApp: {provider.displayPhone}</span>
            <button
              onClick={handleCopyPhone}
              className="flex items-center gap-1 text-emerald-700 font-bold hover:underline cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Safety tip */}
          <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Consejo de seguridad:</strong> Acuerda el precio y el alcance del trabajo por WhatsApp o llamada antes de iniciar la labor.
            </span>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm py-3 px-4 rounded-xl shadow-md transition-transform active:scale-98"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Contactar por WhatsApp</span>
          </a>

          <a
            href={`tel:${provider.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-sm py-3 px-4 rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4 text-slate-600" />
            <span>Llamar</span>
          </a>
        </div>
      </div>

      {/* Enlarged Photo Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white bg-white/20 p-2 rounded-full hover:bg-white/40 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Trabajo ampliado"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
