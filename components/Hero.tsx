'use client';

import React from 'react';
import { Search, MapPin, CheckCircle2, MessageSquare, ArrowDown } from 'lucide-react';
import { Municipality } from '@/lib/types';

interface HeroProps {
  currentMunicipality: Municipality;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onPerformSearch?: () => void;
}

export function Hero({
  currentMunicipality,
  searchQuery,
  onSearchChange,
  onPerformSearch,
}: HeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onPerformSearch) {
        onPerformSearch();
      } else {
        const el = document.getElementById('listado-prestadores');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchClick = () => {
    if (onPerformSearch) {
      onPerformSearch();
    } else {
      const el = document.getElementById('listado-prestadores');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 pb-8 bg-linear-to-b from-amber-50/60 via-white to-slate-50 rounded-3xl border border-amber-100/80 px-4 sm:px-8 mt-2 shadow-xs">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {/* Location pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
          <span>Servicios disponibles en {currentMunicipality}, Arauca</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Encuentra trabajadores de <span className="text-emerald-700 underline decoration-amber-400 decoration-4 underline-offset-4">confianza</span> para cualquier oficio
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl mx-auto">
          Electricistas, maestros de obra, plomeros, instaladores de PVC y Drywall, guadañadores y más. 
          <strong className="text-slate-800"> Sin intermediarios</strong>, habla directo por WhatsApp con la persona indicada.
        </p>

        {/* Search Bar with Action Button */}
        <div className="relative max-w-xl mx-auto pt-3">
          <div className="relative flex items-center shadow-lg shadow-slate-200/60 rounded-2xl bg-white border-2 border-emerald-600/40 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10 transition-all p-1.5">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="¿Qué necesitas? Ej: Electricista, fuga de agua, PVC, soldar puerta..."
              className="w-full py-2.5 pl-3 pr-2 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="mr-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Borrar
              </button>
            )}
            <button
              type="button"
              onClick={handleSearchClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black px-4 sm:px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span>Buscar</span>
              <ArrowDown className="w-3.5 h-3.5 hidden sm:inline" />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            100% Gratis para quien busca
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            Contacto directo por WhatsApp
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Trabajadores verificados de tu municipio
          </span>
        </div>
      </div>
    </section>
  );
}
