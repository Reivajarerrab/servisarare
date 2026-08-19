'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Search,
  MessageCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  DollarSign,
  Users,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar
        currentMunicipality="Saravena"
        onSelectMunicipality={() => {}}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 flex-1">
        {/* Header Hero */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Guía Rápida</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ¿Cómo funciona <span className="text-emerald-700">ServiSarare</span>?
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Conectamos a las familias de Saravena y el Sarare con electricistas, albañiles, plomeros y trabajadores calificados de forma rápida y segura.
          </p>
        </div>

        {/* SECTION 1: Para quienes buscan un servicio */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xl">
              🔍
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Para Vecinos y Familias (Clientes)
              </h2>
              <p className="text-xs text-slate-500">
                100% Gratis • Sin registros complicados • Contacto directo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900">Busca el oficio</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Entra a la página desde tu celular y selecciona el servicio que necesitas: electricista, plomero, guadañador, etc.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">Revisa los perfiles</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mira sus fotos, años de experiencia, especialidades y los barrios o veredas que atiende.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900">Escribe por WhatsApp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Toca el botón verde de WhatsApp para hablar directamente con el trabajador, acordar el precio y la hora del trabajo.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Para Trabajadores */}
        <section className="bg-linear-to-br from-amber-500 to-emerald-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/20 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-black text-xl">
              🛠️
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                Para Trabajadores, Maestros y Técnicos
              </h2>
              <p className="text-xs text-emerald-100">
                Consigue más clientes • Sin comisiones de tus trabajos
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/30 backdrop-blur-md border border-white/10">
              <div className="text-2xl font-black text-amber-300">0% Comisiones</div>
              <h3 className="font-bold text-sm text-white">Todo tu dinero es tuyo</h3>
              <p className="text-xs text-emerald-50 leading-relaxed">
                No te cobramos ningún porcentaje por los trabajos que realices. Todo lo que cobres al cliente va directo a tu bolsillo.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/30 backdrop-blur-md border border-white/10">
              <div className="text-2xl font-black text-amber-300">$10.000 / mes</div>
              <h3 className="font-bold text-sm text-white">Precio Promocional</h3>
              <p className="text-xs text-emerald-50 leading-relaxed">
                Los primeros 50 inscritos pagan solo $10.000 COP al mes durante todo el primer año. ¡Menos de lo que vale un almuerzo!
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/30 backdrop-blur-md border border-white/10">
              <div className="text-2xl font-black text-amber-300">WhatsApp Directo</div>
              <h3 className="font-bold text-sm text-white">Clientes a tu celular</h3>
              <p className="text-xs text-emerald-50 leading-relaxed">
                Los clientes te escriben y te llaman directamente a tu propio número. Tú decides tus horarios y tus precios.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-amber-100 font-black text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-98"
            >
              <span>Quiero Inscribir mi Servicio Ahora</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </Link>
          </div>
        </section>

        {/* SECTION 3: FAQ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 text-center">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 mb-1">
                ¿Tengo que pagar para buscar un trabajador?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                No, para los vecinos y familias buscar trabajadores y contactarlos por WhatsApp siempre es 100% gratuito.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 mb-1">
                ¿Cómo paga la mensualidad un trabajador?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Se paga de forma muy fácil transfiriendo por Nequi o Daviplata a la cuenta oficial de ServiSarare. Una vez verificado el pago, el perfil queda activo por 30 días.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 mb-1">
                ¿Funciona solo en Saravena o en otros pueblos?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Iniciamos en Saravena y ya estamos habilitando municipios como Tame, Arauquita y Fortul para conectar a toda la región del Sarare.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
