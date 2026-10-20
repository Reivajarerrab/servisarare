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
  Droplet,
  Paintbrush,
  Layers,
  Wrench,
  Flame,
  Award,
  DollarSign,
  HelpCircle,
  Truck,
  Scissors,
} from 'lucide-react';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-amber-200">
      <Navbar currentMunicipality="Saravena" onSelectMunicipality={() => {}} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 flex-1">
        {/* HEADER HERO */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span>Nacida en el corazón y las entrañas de nuestra tierra</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Nuestra Historia, Nuestra Gente y el Orgullo de Trabajar en el <span className="text-emerald-700 underline decoration-amber-400">Sarare y Arauca</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            ServiSarare es más que un directorio digital: es un homenaje vivo a las manos curtidas, la disciplina y el talento honrado que levantan a diario a nuestro departamento.
          </p>
        </div>

        {/* EL ORIGEN REAL / LA HISTORIA */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xl shrink-0">
              ⚡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                ¿Cómo y por qué nace ServiSarare?
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                De la realidad vivida en carne propia, no de un escritorio lejano
              </p>
            </div>
          </div>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              Durante generaciones, los pueblos de nuestro departamento —desde <strong>Saravena</strong>, la puerta del Sarare, pasando por <strong>Tame</strong>, <strong>Arauquita</strong>, <strong>Fortul</strong>, hasta la capital <strong>Arauca</strong>— han sido construidos a pulso por hombres y mujeres de valor inquebrantable. Familias enteras cuyo sustento depende de la destreza de sus manos, de su honradez y de la puntualidad de su palabra.
            </p>
            <p>
              Sin embargo, en los últimos años fuimos testigos de una injusticia silenciosa: cuando a una familia o negocio se le rompe una tubería, se le quema un tablero de breakers, necesita pintar una fachada o techar una obra, no sabe a quién llamar con total confianza. Mientras tanto, maestros y técnicos con años de experiencia se quedaban esperando en casa a que un conocido los recomendara de boca en boca.
            </p>

            {/* Cita textual del fundador */}
            <div className="bg-linear-to-r from-emerald-50 via-amber-50/50 to-emerald-50 border-l-4 border-emerald-600 p-5 rounded-r-2xl space-y-2">
              <p className="font-semibold text-slate-900 italic text-sm sm:text-base">
                «ServiSarare no nació en Silicon Valley ni en las oficinas frías de las grandes multinacionales. Nació aquí, de la mente y el esfuerzo de un <strong>técnico electricista</strong> de nuestra propia región, alguien que conoce en carne propia lo que significa cargar el maletín de herramientas bajo el sol llanero, resolver urgencias a deshoras y luchar cada día por el pan sagrado de su familia.»
              </p>
              <p className="text-xs text-emerald-900 font-bold uppercase tracking-wider">
                — Compromiso con la dignidad de nuestra gente
              </p>
            </div>

            <p>
              Nuestra meta fue clara desde el primer trazo: poner la tecnología más moderna y rápida al servicio de la gente humilde y trabajadora, <strong>sin intermediarios que cobren comisiones abusivas ni corporaciones que se queden con el sudor del trabajador</strong>.
            </p>
          </div>
        </section>

        {/* HOMENAJE A CADA OFICIO */}
        <section className="bg-linear-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/20 space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Homenaje al Trabajo Honesto
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Cada Oficio Construye la Grandeza de Nuestra Región
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              En ServiSarare valoramos y exaltamos cada gota de esfuerzo:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Zap className="w-4 h-4" />
                <span>Al Electricista</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Que con precisión y valentía domina el voltaje, devuelve la luz a nuestros hogares y protege a las familias de cortocircuitos.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Hammer className="w-4 h-4" />
                <span>Al Maestro y Oficial de Obra</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Que pegando bloque, fundiendo columnas y nivelando pisos convierte los sueños de vivienda de una familia en una realidad sólida.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Droplet className="w-4 h-4" />
                <span>Al Plomero y Fontanero</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                El salvador silencioso que soluciona fugas, destapa cañerías y asegura que el agua potable llegue limpia a cada rincón del hogar.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Layers className="w-4 h-4" />
                <span>Al Especialista en PVC y Drywall</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                El artesano de los acabados modernos que transforma techos y paredes con elegancia, aislamiento térmico y estética impecable.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Paintbrush className="w-4 h-4" />
                <span>Al Pintor y Estucador</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Que con paciencia y buen pulso le da color, vida y protección a las fachadas e interiores de nuestros pueblos.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Wrench className="w-4 h-4" />
                <span>Al Soldador y Metalúrgico</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Que une el hierro con fuego para brindar rejas seguras, portones firmes y estructuras resistentes para el campo y el comercio.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Scissors className="w-4 h-4" />
                <span>Al Guadañador y Jardinero</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Que desmaleza solares, poda prados y mantiene limpios los lotes y fincas frente a la inclemencia del monte y las plagas.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Truck className="w-4 h-4" />
                <span>A los Acarreos y Motocargueros</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Los guerreros del camino que mueven materiales, bultos y trasteos sin importar la distancia, el barro o el aguacero.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Heart className="w-4 h-4" />
                <span>A Cada Oficio del Hogar y Taller</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Mecánicos, técnicos de neveras, cerrajeros, carpinteros y trabajadoras del servicio doméstico. Todos tienen un lugar digno aquí.
              </p>
            </div>
          </div>
        </section>

        {/* MISSION AND VISION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-linear-to-br from-emerald-900 to-slate-950 text-white p-7 sm:p-9 rounded-3xl shadow-xl space-y-4 border border-emerald-500/20">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-2xl border border-emerald-400/30">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">Nuestra Misión</h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Empoderar y dignificar a los trabajadores independientes de <strong>Saravena, Arauca, Tame, Arauquita y Fortul</strong>, conectándolos directamente por WhatsApp con clientes de su propia comunidad, <strong>garantizando 0% de comisiones por sus trabajos</strong> y ofreciéndoles una plataforma moderna, confiable y al alcance de su bolsillo.
            </p>
          </div>

          <div className="bg-linear-to-br from-amber-600 via-amber-700 to-slate-950 text-white p-7 sm:p-9 rounded-3xl shadow-xl space-y-4 border border-amber-400/20">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-200 flex items-center justify-center font-black text-2xl border border-amber-400/30">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">Nuestra Visión</h3>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              Consolidarnos como el <strong>ecosistema de servicios de mayor reputación y orgullo en todo el departamento de Arauca</strong>, demostrando que desde el Sarare y el Llano somos capaces de crear soluciones tecnológicas propias, honestas y justas que dinamizan la economía popular de nuestros municipios.
            </p>
          </div>
        </section>

        {/* TRANSPARENCIA TOTAL EN LAS TARIFAS (PIONEROS VS GENERAL) */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-amber-300 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shrink-0">
              💎
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Transparencia Total: El Modelo de Tarifas Claras
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                Sin letras pequeñas, sin comisiones ocultas y con respeto absoluto a la palabra
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Para mantener el servidor, la publicidad y el soporte funcionando sin depender de bancos ni cobrar comisiones sobre los trabajos, manejamos un esquema de suscripción mensual transparente:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Promo Pioneros */}
            <div className="bg-linear-to-br from-amber-50 to-amber-100/80 p-5 rounded-2xl border-2 border-amber-400 space-y-3 relative overflow-hidden">
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block">
                Fase de Lanzamiento Pioneros
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-950">$10.000</span>
                <span className="text-xs text-slate-600 font-bold">COP / mensual</span>
              </div>
              <p className="text-xs text-amber-950 font-bold leading-snug">
                ⭐ Exclusivo para los primeros 50 trabajadores inscritos.
              </p>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                A los 50 pioneros que confían primero en este proyecto, <strong>les congelamos y garantizamos la tarifa de $10.000 COP al mes durante todo su primer año completo</strong>. Además, pueden registrar todos los oficios que sepan hacer bajo una sola mensualidad.
              </p>
            </div>

            {/* Tarifa General */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="bg-slate-200 text-slate-800 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block">
                Tarifa General Estándar
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">$15.000</span>
                <span className="text-xs text-slate-500 font-bold">COP / mensual</span>
              </div>
              <p className="text-xs text-slate-800 font-bold leading-snug">
                A partir del afiliado número 51 en adelante.
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Una tarifa simbólica de apenas <strong>$500 pesos al día</strong>. Con un solo trabajo pequeño que le salga en el mes ya recupera la inversión de todo el año. Y lo más importante: <strong>cero comisiones</strong>, todo lo que cobre es 100% para su bolsillo.
              </p>
            </div>
          </div>
        </section>

        {/* COBERTURA DE MUNICIPIOS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-slate-900">
              Uniendo a los Municipios Hermanos de Arauca
            </h3>
            <p className="text-xs text-slate-500">
              ServiSarare está activa y disponible para toda la región:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 font-black text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Saravena (Principal)
            </span>
            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 font-black text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Arauca (Capital)
            </span>
            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 font-black text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Tame (Cuna de la Libertad)
            </span>
            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 font-black text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Arauquita
            </span>
            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 font-black text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Fortul
            </span>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-linear-to-r from-emerald-800 to-slate-950 text-white rounded-3xl p-6 sm:p-9 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-black text-amber-300">
            ¿Quieres ser parte de los 50 Pioneros de ServiSarare?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Inscríbete hoy mismo con precio especial congelado de <strong>$10.000 COP al mes</strong> por un año entero. Muestra fotos de tus obras y empieza a recibir llamadas directas a tu WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/registro"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg transition-transform active:scale-98"
            >
              Inscribirme a la Promoción ($10.000/mes) 🚀
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
