'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  MapPin,
  CheckCircle2,
  Users,
  Target,
  Compass,
  ArrowRight,
  PhoneCall,
  Hammer,
  Zap,
} from 'lucide-react';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar currentMunicipality="Saravena" onSelectMunicipality={() => {}} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 flex-1">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span>Nacida en las entrañas de nuestra tierra</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Nuestra Historia, Misión y Pasión por el <span className="text-emerald-700 underline decoration-amber-400">Sarare</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            Conoce por qué nació <strong>ServiSarare</strong> y cómo estamos devolviéndole la dignidad, el respeto y las oportunidades al trabajador independiente de nuestra región.
          </p>
        </div>

        {/* Story Section / El Origen */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xl shrink-0">
              🌱
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                ¿Cómo y por qué nace ServiSarare?
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                De la realidad de nuestras calles, no de una oficina lejana
              </p>
            </div>
          </div>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              Durante décadas, en municipios como <strong>Saravena, Tame, Arauquita y Fortul</strong>, el pan de miles de hogares ha dependido del sudor honesto de nuestros trabajadores: el electricista que resuelve una emergencia a medianoche, el maestro que pega bloque bajo el sol llanero, el plomero que desvara un hogar, el soldador, el pintor, el guadañador y el conductor que no se rinde.
            </p>
            <p>
              Sin embargo, los tiempos cambiaron. Con la llegada de los celulares, muchas personas no sabían a quién llamar cuando se les dañaba algo en casa, mientras grandes trabajadores se quedaban días enteros esperando en silencio a que sonara el teléfono o a que un vecino los recomendara.
            </p>
            <p className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl font-medium text-amber-950 italic">
              «ServiSarare no nació en Silicon Valley ni en las grandes capitales. Nació de un hombre de nuestra propia tierra que conoce lo que es madrugar a ganarse la vida con el volante y la construcción, y que entendió que la tecnología debe servir para ayudar al que trabaja con sus manos, no para quitarle comisiones.»
            </p>
          </div>
        </section>

        {/* Mission and Vision Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Misión */}
          <div className="bg-linear-to-br from-emerald-900 to-slate-950 text-white p-7 sm:p-9 rounded-3xl shadow-xl space-y-4 border border-emerald-500/20">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-2xl border border-emerald-400/30">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">Nuestra Misión</h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Conectar a cada familia, comercio y finca del Sarare de manera directa y rápida con el profesional idóneo para su necesidad, <strong>garantizando cero comisiones sobre sus ingresos</strong> y brindándole al trabajador local una vitrina digital respetada, organizada y accesible.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-linear-to-br from-amber-600 via-amber-700 to-slate-950 text-white p-7 sm:p-9 rounded-3xl shadow-xl space-y-4 border border-amber-400/20">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-200 flex items-center justify-center font-black text-2xl border border-amber-400/30">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">Nuestra Visión</h3>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              Consolidarnos como el <strong>directorio de servicios preferido y de mayor confianza en todo el departamento de Arauca</strong>, demostrando que con unión, transparencia y orgullo por nuestra gente podemos transformar la economía popular de nuestros municipios.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Los 4 Pilares Inquebrantables de ServiSarare
            </h2>
            <p className="text-xs text-slate-500">
              Lo que nos hace diferentes a cualquier otra plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>1. El dinero del trabajador es sagrado</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cobramos una cuota mínima de mantenimiento de solo $10.000/mes. Jamás cobramos porcentaje ni comisión por los contratos o arreglos que realices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>2. Trato Directo y Humano</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sin intermediarios ni algoritmos que oculten tu teléfono. El cliente hace clic y te habla directamente a tu WhatsApp personal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>3. 100% Identidad del Sarare</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Priorizamos y cuidamos el talento local. Apoyar a ServiSarare es apoyar a las familias de Saravena, Tame, Arauquita y Fortul.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>4. Inclusión para Todos los Oficios</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Si sabes hacer varios oficios, no te cobramos de más. Con una sola inscripción te damos visibilidad en todas tus ramas de especialidad.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-linear-to-r from-emerald-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-black text-amber-300">
            ¿Haces algún trabajo o servicio en el Sarare?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto">
            Únete a la familia de ServiSarare hoy mismo y haz que toda la región conozca tu talento.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/registro"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-98"
            >
              Inscribirme a la Promoción ($10.000/mes)
            </Link>
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors"
            >
              Ver Directorio de Servicios
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
