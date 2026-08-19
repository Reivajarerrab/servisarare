'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, PlusCircle, Menu, X, ShieldCheck, HelpCircle, PhoneCall, Printer } from 'lucide-react';
import { Municipality } from '@/lib/types';
import { MUNICIPALITIES } from '@/lib/data';

interface NavbarProps {
  currentMunicipality: Municipality;
  onSelectMunicipality: (m: Municipality) => void;
}

export function Navbar({ currentMunicipality, onSelectMunicipality }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                  Servi<span className="text-emerald-600">Sarare</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  Arauca
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Directorio local de trabajadores y servicios
              </p>
            </div>
          </Link>

          {/* Center: Municipality Switcher */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-sm font-semibold transition-colors cursor-pointer"
              title="Cambiar municipio"
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>{currentMunicipality}</span>
              <span className="text-[10px] text-amber-700 bg-amber-200/70 px-1.5 py-0.2 rounded font-bold">
                Cambiar
              </span>
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 sm:left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Selecciona tu municipio:
                  </div>
                  {MUNICIPALITIES.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        onSelectMunicipality(item.name);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                        currentMunicipality === item.name
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin
                          className={`w-4 h-4 ${
                            currentMunicipality === item.name
                              ? 'text-emerald-600'
                              : 'text-slate-400'
                          }`}
                        />
                        {item.name}
                      </span>
                      {item.active ? (
                        <span className="text-[10px] text-emerald-700 bg-emerald-100 font-medium px-1.5 py-0.5 rounded">
                          Activo
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 bg-slate-100 font-medium px-1.5 py-0.5 rounded">
                          Próximamente
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/como-funciona"
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              ¿Cómo funciona?
            </Link>

            <Link
              href="/volante"
              className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              title="Ver afiche con código QR para imprimir"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Afiches QR</span>
            </Link>

            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-slate-700 font-medium transition-colors"
            >
              Admin
            </Link>

            <Link
              href="/registro"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Inscribir mi Servicio</span>
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
                $10k Promo
              </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/registro"
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Inscribirme</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
          >
            🏠 Ver todos los servicios
          </Link>
          <Link
            href="/como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
          >
            💡 ¿Cómo funciona la plataforma?
          </Link>
          <Link
            href="/volante"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg bg-amber-50 text-amber-900 text-sm font-bold"
          >
            🖨️ Ver e Imprimir Afiches con Código QR
          </Link>
          <Link
            href="/unete"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            📱 Página de Aterrizaje del QR (/unete)
          </Link>
          <Link
            href="/registro"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-base font-bold"
          >
            ⭐ Inscribir mi Servicio ($10.000/mes)
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50"
          >
            🔐 Panel de Administración
          </Link>
        </div>
      )}
    </header>
  );
}
