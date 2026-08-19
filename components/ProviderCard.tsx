'use client';

import React from 'react';
import {
  MessageCircle,
  Phone,
  CheckCircle2,
  Star,
  MapPin,
  Briefcase,
  ExternalLink,
  Camera,
} from 'lucide-react';
import { Provider } from '@/lib/types';

interface ProviderCardProps {
  provider: Provider;
  onOpenModal: (provider: Provider) => void;
}

export function ProviderCard({ provider, onOpenModal }: ProviderCardProps) {
  const whatsappMessage = encodeURIComponent(
    `¡Hola ${provider.name}! Vi tu perfil en ServiSarare y me gustaría cotizar un servicio de ${provider.categoryName}. ¿Estás disponible?`
  );
  const whatsappUrl = `https://wa.me/${provider.phone}?text=${whatsappMessage}`;

  const hasPhotos = Array.isArray(provider.workPhotos) && provider.workPhotos.length > 0;
  const secondarySkills = Array.isArray(provider.categoryNames)
    ? provider.categoryNames.filter((c) => c !== provider.categoryName)
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Card Body */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Header: Avatar, Name, Category */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar image or stylized letter */}
            {provider.avatarUrl ? (
              <img
                src={provider.avatarUrl}
                alt={provider.name}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-500 to-amber-500 text-white font-extrabold text-lg flex items-center justify-center shadow-xs shrink-0">
                {provider.name.charAt(0)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {provider.name}
                </h3>
                {provider.isVerified && (
                  <span
                    className="inline-flex items-center text-emerald-600"
                    title="Perfil Verificado por ServiSarare"
                  >
                    <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-emerald-700">
                {provider.categoryName}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/70 px-2 py-1 rounded-lg shrink-0">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-black text-amber-900">
              {provider.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-amber-700">
              ({provider.reviewCount})
            </span>
          </div>
        </div>

        {/* Experience & Municipality */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
            <Briefcase className="w-3 h-3 text-slate-400" />
            {provider.experienceYears} años de experiencia
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
            <MapPin className="w-3 h-3 text-emerald-600" />
            {provider.municipality}
          </span>
          {hasPhotos && (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold text-[10px]">
              <Camera className="w-3 h-3" />
              {provider.workPhotos!.length} fotos de trabajos
            </span>
          )}
        </div>

        {/* Secondary skills badge if multi-trade */}
        {secondarySkills.length > 0 && (
          <div className="text-[11px] text-slate-600 bg-amber-50/70 border border-amber-200/60 px-2.5 py-1 rounded-lg">
            <strong className="text-amber-900 font-bold">También hace:</strong>{' '}
            {secondarySkills.join(', ')}
          </div>
        )}

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {provider.description}
        </p>

        {/* Service tags */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Trabajos que realiza:
          </div>
          <div className="flex flex-wrap gap-1">
            {provider.servicesOffered.slice(0, 3).map((srv, idx) => (
              <span
                key={idx}
                className="bg-emerald-50/80 text-emerald-900 border border-emerald-200/60 text-[11px] font-medium px-2 py-0.5 rounded-md line-clamp-1"
              >
                ✓ {srv}
              </span>
            ))}
            {provider.servicesOffered.length > 3 && (
              <button
                onClick={() => onOpenModal(provider)}
                className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                +{provider.servicesOffered.length - 3} más
              </button>
            )}
          </div>
        </div>

        {/* Coverage */}
        <div className="text-[11px] text-slate-500 flex items-start gap-1">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
          <span className="line-clamp-1">
            <strong className="text-slate-700">Cubre:</strong> {provider.neighborhoodsCovered}
          </span>
        </div>
      </div>

      {/* Action Footer: WhatsApp & Call */}
      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        {/* Direct WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-98"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Escribir por WhatsApp</span>
        </a>

        {/* Phone Call */}
        <a
          href={`tel:${provider.phone}`}
          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors"
          title={`Llamar a ${provider.name} (${provider.displayPhone})`}
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Info button */}
        <button
          onClick={() => onOpenModal(provider)}
          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          title="Ver perfil completo y fotos"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
