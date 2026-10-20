'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';
import { SiteSettings, Municipality } from '@/lib/types';

interface PromoBannerProps {
  settings: SiteSettings;
  currentMunicipality: Municipality;
}

export function PromoBanner({ settings, currentMunicipality }: PromoBannerProps) {
  if (!settings.promoActive) return null;

  const slotsLeft = Math.max(0, settings.promoSlotsTotal - settings.promosUsed);
  const percentageUsed = Math.min(100, Math.round((settings.promosUsed / settings.promoSlotsTotal) * 100));

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-amber-600 via-amber-500 to-emerald-600 text-white shadow-lg my-4 rounded-2xl p-4 sm:p-5">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-6 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Message with dynamic municipality name */}
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-amber-900/30 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-amber-100">
            <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-bounce" />
            <span>Gran Promoción de Lanzamiento</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
            ¿Prestas algún servicio en <span className="underline decoration-amber-300 decoration-2 underline-offset-2">{currentMunicipality}</span> o la región del Sarare?
          </h3>
          <p className="text-xs sm:text-sm text-amber-50 max-w-xl">
            Inscríbete hoy por solo <span className="font-extrabold text-amber-200 bg-amber-900/40 px-1.5 py-0.5 rounded">${settings.promoPrice.toLocaleString('es-CO')} COP al mes</span> garantizado por 1 año a los primeros 50 afiliados (luego $15.000/mes). ¡Pagas una sola cuota y apareces en todos tus oficios!
          </p>
        </div>

        {/* Right: Counter & Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <div className="bg-slate-900/30 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-xl text-center w-full sm:w-auto">
            <div className="text-[11px] font-bold text-amber-200 uppercase">
              Cupos promocionales
            </div>
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="text-xl font-extrabold text-white">
                {slotsLeft}
              </span>
              <span className="text-xs text-amber-100">disponibles de {settings.promoSlotsTotal}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentageUsed}%` }}
              />
            </div>
          </div>

          <Link
            href="/registro"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-amber-50 font-black text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Aprovechar Promo</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </Link>
        </div>
      </div>
    </div>
  );
}
