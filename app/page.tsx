'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PromoBanner } from '@/components/PromoBanner';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProviderCard } from '@/components/ProviderCard';
import { ProviderModal } from '@/components/ProviderModal';
import { Footer } from '@/components/Footer';
import { Provider, Municipality, SiteSettings } from '@/lib/types';
import { getStoredProviders, getStoredSettings } from '@/lib/storage';
import { CATEGORIES } from '@/lib/data';
import { filterProvidersSmart } from '@/lib/search';
import { Sparkles, MessageCircle, AlertCircle, PlusCircle, Search, X, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [municipality, setMunicipality] = useState<Municipality>('Saravena');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [activeModalProvider, setActiveModalProvider] = useState<Provider | null>(null);
  const [mounted, setMounted] = useState(false);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setProviders(getStoredProviders());
    setSettings(getStoredSettings());
    setMounted(true);
  }, []);

  const handleScrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Run smart search engine
  const { matchedProviders, detectedCategorySlug } = useMemo(() => {
    return filterProvidersSmart(
      providers,
      searchQuery,
      selectedCategorySlug,
      municipality
    );
  }, [providers, searchQuery, selectedCategorySlug, municipality]);

  const currentCategoryName = useMemo(() => {
    if (!selectedCategorySlug) return null;
    return CATEGORIES.find((c) => c.slug === selectedCategorySlug)?.name || null;
  }, [selectedCategorySlug]);

  const detectedCategoryName = useMemo(() => {
    if (!detectedCategorySlug) return null;
    return CATEGORIES.find((c) => c.slug === detectedCategorySlug)?.name || null;
  }, [detectedCategorySlug]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-200">
      {/* Navbar */}
      <Navbar
        currentMunicipality={municipality}
        onSelectMunicipality={(m) => setMunicipality(m)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        {/* Dynamic Launch Promo Banner with selected municipality */}
        {settings && (
          <PromoBanner
            settings={settings}
            currentMunicipality={municipality}
          />
        )}

        {/* Hero Section with Smart Search */}
        <Hero
          currentMunicipality={municipality}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
          }}
          onPerformSearch={handleScrollToResults}
        />

        {/* Category Selector Grid */}
        <CategoryGrid
          selectedCategorySlug={selectedCategorySlug}
          onSelectCategory={(slug) => {
            setSelectedCategorySlug(slug);
            handleScrollToResults();
          }}
          providers={providers}
        />

        {/* Providers Section / Search Results */}
        <section ref={resultsRef} id="listado-prestadores" className="pt-4 space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {searchQuery ? (
                    <span>
                      Resultados para <span className="text-emerald-700 font-extrabold">"{searchQuery}"</span> en {municipality}
                    </span>
                  ) : currentCategoryName ? (
                    `${currentCategoryName}s en ${municipality}`
                  ) : (
                    `Trabajadores Disponibles en ${municipality}`
                  )}
                </h2>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                  {matchedProviders.length} encontrado{matchedProviders.length !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Contacta directamente por WhatsApp o llamada sin intermediarios
              </p>
            </div>

            {/* Active search filter reset pill */}
            {(selectedCategorySlug || searchQuery) && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCategorySlug(null);
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-900 font-bold bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Limpiar búsqueda ({selectedCategorySlug ? currentCategoryName : ''} {searchQuery ? `"${searchQuery}"` : ''})</span>
                </button>
              </div>
            )}
          </div>

          {/* Smart Category Detection Banner */}
          {searchQuery && detectedCategoryName && !selectedCategorySlug && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Relacionamos tu búsqueda de <strong>"{searchQuery}"</strong> con especialistas en{' '}
                  <strong className="text-emerald-800 underline">{detectedCategoryName}</strong>.
                </span>
              </div>
              <button
                onClick={() => setSelectedCategorySlug(detectedCategorySlug)}
                className="font-bold text-emerald-700 hover:text-emerald-900 underline text-xs shrink-0 cursor-pointer"
              >
                Filtrar solo {detectedCategoryName}
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {matchedProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {matchedProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onOpenModal={(p) => setActiveModalProvider(p)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto shadow-xs">
              <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">
                  {searchQuery
                    ? `No encontramos trabajadores con "${searchQuery}" en ${municipality}`
                    : `Aún no hay trabajadores registrados en este oficio en ${municipality}`}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  ¿Realizas este trabajo o conoces a alguien en {municipality}? Inscríbete hoy por solo $10.000/mes y sé el primero en recibir llamadas.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/registro"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Inscribir mi Servicio ($10.000/mes)</span>
                </Link>
                {(selectedCategorySlug || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategorySlug(null);
                      setSearchQuery('');
                    }}
                    className="w-full sm:w-auto text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 font-bold px-4 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Ver todos los servicios
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Community Callout */}
        <section className="bg-linear-to-r from-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Comunidad de {municipality}
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              ¿No encuentras el servicio o trabajador que necesitas?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Escríbenos por WhatsApp y te ayudamos a buscar un trabajador recomendado en el pueblo sin ningún costo.
            </p>
          </div>

          <a
            href={`https://wa.me/${settings?.contactWhatsApp || '573123456789'}?text=${encodeURIComponent(
              `¡Hola ServiSarare! Estoy en ${municipality} y necesito ayuda para conseguir un servicio o trabajador.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-98 shrink-0"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Pedir Ayuda por WhatsApp</span>
          </a>
        </section>
      </main>

      {/* Provider Details Modal */}
      <ProviderModal
        provider={activeModalProvider}
        onClose={() => setActiveModalProvider(null)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
