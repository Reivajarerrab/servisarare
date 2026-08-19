'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, MessageCircle, ShieldCheck, Heart, Printer, QrCode } from 'lucide-react';
import { CATEGORIES, MUNICIPALITIES } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-white font-black text-lg">
                ⚡
              </div>
              <span className="font-extrabold text-xl text-white">
                Servi<span className="text-emerald-400">Sarare</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              La plataforma digital creada para conectar a las familias y negocios de <strong>Saravena</strong> y el <strong>Sarare</strong> con los mejores electricistas, plomeros, constructores y trabajadores de nuestra tierra.
            </p>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Saravena • Arauca • Colombia</span>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Servicios Populares
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/?categoria=${cat.slug}`} className="hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Municipios Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Cobertura Regional
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {MUNICIPALITIES.map((mun) => (
                <li key={mun.name} className="flex items-center justify-between">
                  <span className="hover:text-white transition-colors">{mun.name}</span>
                  {mun.active ? (
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded">
                      Activo
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Pronto</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* For Workers & Marketing Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Para Trabajadores & Difusión
            </h4>
            <p className="text-xs text-slate-400">
              ¿Trabajas en construcción, electricidad o cualquier oficio? Inscríbete y consigue clientes todos los días.
            </p>
            
            <div className="space-y-2 pt-1">
              <Link
                href="/registro"
                className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors"
              >
                Inscribirme ($10.000/mes)
              </Link>
              
              <Link
                href="/volante"
                className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2 px-3 rounded-xl transition-colors"
              >
                🖨️ Imprimir Afiches con Código QR
              </Link>

              <Link
                href="/unete"
                className="block text-center text-[11px] text-emerald-400 hover:underline"
              >
                Ver Página del Código QR (/unete) ↗
              </Link>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/admin"
                className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                🔐 Acceso Administrador
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ServiSarare. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con orgullo llanero <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> para Saravena.
          </p>
        </div>
      </div>
    </footer>
  );
}
