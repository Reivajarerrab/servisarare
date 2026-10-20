'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Phone,
  Flame,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  DollarSign,
  HelpCircle,
  Clock,
  ThumbsUp,
  AlertTriangle,
  MapPin,
} from 'lucide-react';
import { getStoredSettings } from '@/lib/storage';
import { SiteSettings, Municipality } from '@/lib/types';
import { MUNICIPALITIES } from '@/lib/data';

function UneteContent() {
  const searchParams = useSearchParams();
  const initialMun = (searchParams.get('m') as Municipality) || 'Saravena';

  const [municipality, setMunicipality] = useState<Municipality>(initialMun);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(getStoredSettings());
    const mParam = searchParams.get('m') as Municipality;
    if (mParam && MUNICIPALITIES.some((item) => item.name === mParam)) {
      setMunicipality(mParam);
    }
  }, [searchParams]);

  const adminPhone = settings?.contactWhatsApp || settings?.daviplataNumber || '573123456789';
  const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(
    `¡Hola! Escaneé el código QR de ServiSarare en ${municipality} y me gustaría inscribir mi servicio para empezar a recibir clientes.`
  )}`;

  const promoPrice = settings?.promoPrice || 10000;
  const slotsLeft = Math.max(0, (settings?.promoSlotsTotal || 50) - (settings?.promosUsed || 8));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar currentMunicipality={municipality} onSelectMunicipality={(m) => setMunicipality(m)} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 flex-1">
        
        {/* HERO SALES HOOK */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-red-600 to-amber-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
            <Flame className="w-4 h-4 fill-white animate-bounce" />
            <span>Oportunidad Exclusiva para Trabajadores de {municipality} y el Sarare</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Deje de esperar a que le salga trabajo por casualidad. <span className="text-emerald-700 underline decoration-amber-400">Haga que los clientes de {municipality} lo llamen a usted.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
            Únase a <strong>ServiSarare</strong>, la plataforma donde las familias y negocios de <strong>{municipality}</strong> buscan electricistas, maestros de obra, plomeros, pintores, soldadores, instaladores de PVC, mecánicos, acarreos y más.
          </p>

          {/* Urgency Counter Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black text-amber-950">
            <span>🔥 Promoción de Lanzamiento:</span>
            <span className="bg-amber-300 text-slate-950 px-2 py-0.5 rounded-lg">${promoPrice.toLocaleString('es-CO')} COP/mes</span>
            <span>— ¡Solo quedan {slotsLeft} cupos con precio congelado por 1 año!</span>
          </div>
        </div>

        {/* PERSUASIVE REALITY & EMPATHY SECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ¿Por qué depender solo del "boca a boca" en {municipality} le hace perder dinero?
            </h2>
            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                Todos sabemos que en nuestra región el trabajo se ha conseguido tradicionalmente cuando un vecino o amigo lo recomienda. <strong>Pero esa recomendación tarda días o semanas en llegar.</strong>
              </p>
              <p>
                Hoy en día, cuando a una persona en {municipality} se le rompe un tubo, se le daña un breaker, necesita pintar su casa o cambiar el cielo raso, <strong>lo primero que hace es coger su celular</strong>. Si usted tiene su perfil con fotos de sus trabajos y su número de WhatsApp en ServiSarare, esa persona lo ve y le escribe de inmediato.
              </p>
            </div>
          </div>

          {/* Mathematical Proof */}
          <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-950 font-black text-sm sm:text-base">
              <DollarSign className="w-5 h-5 text-emerald-700" />
              <span>Haga la cuenta usted mismo:</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              La inscripción vale <strong>$10.000 pesos al mes</strong> (menos de $350 pesos al día). Con un solo trabajito pequeño de $50.000 o $100.000 pesos que le salga gracias a la plataforma, <strong>ya pagó la suscripción de 5 a 10 meses completos</strong>. Todo lo demás es ganancia pura y limpia para su hogar.
            </p>
          </div>
        </section>

        {/* THE 5 BIG ADVANTAGES */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900">
              Lo que usted recibe al inscribirse hoy:
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Diseñado pensando 100% en el bienestar del trabajador independiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Benefit 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
                💰
              </div>
              <h3 className="font-bold text-base text-slate-900">0% de Comisiones</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nosotros no nos quedamos con ningún porcentaje de lo que usted trabaje. Lo que usted acuerde y cobre con el cliente es 100% suyo.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg">
                📲
              </div>
              <h3 className="font-bold text-base text-slate-900">Clientes Directos a su WhatsApp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Los clientes le escriben y lo llaman directamente a su propio número. Sin intermediarios, usted maneja sus precios y sus horarios.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
                🛠️
              </div>
              <h3 className="font-bold text-base text-slate-900">1 Solo Pago para Todos sus Oficios</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ¿Es maestro de obra pero también sabe de pintura, PVC y plomería? Regístrelos todos. Aparece en todas las categorías pagando una sola mensualidad.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-lg">
                📸
              </div>
              <h3 className="font-bold text-base text-slate-900">Muestre Fotos de sus Mejores Obras</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Los clientes confían más cuando ven fotos reales de sus trabajos anteriores. Su perfil incluye una galería para mostrar su calidad.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BUTTONS */}
        <section className="bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-emerald-500/20 text-center space-y-6">
          <div className="space-y-2">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Paso Siguiente
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ¿Listo para empezar a recibir más llamadas en {municipality}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Inscribirse toma menos de 2 minutos. Puede hacerlo usted mismo en línea o escribirnos por WhatsApp y nosotros le ayudamos con todo el proceso.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {/* Direct WhatsApp chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm px-7 py-4 rounded-2xl shadow-xl transition-transform active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Hablar con el Administrador por WhatsApp</span>
            </a>

            {/* Inscribe online button */}
            <Link
              href="/registro"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-slate-950 font-black text-sm px-7 py-4 rounded-2xl shadow-lg transition-transform active:scale-98"
            >
              <span>Llenar Formulario de Inscripción en Línea</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Activación el mismo día
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Pago fácil por Nequi o Daviplata
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Cupos limitados de lanzamiento
            </span>
          </div>
        </section>

        {/* FREQUENT OBJECTIONS FAQ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 text-center mb-2">
            Preguntas Frecuentes de Trabajadores:
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900">
                ¿Qué pasa si no sé mucho de tecnología o celulares?
              </div>
              <p className="text-slate-600">
                No se preocupe. Escríbanos o llámenos por WhatsApp y nosotros mismos le creamos el perfil, le ayudamos a subir las fotos de sus trabajos y le dejamos todo listo.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900">
                ¿Tengo que pagar antes o después de ver mi perfil?
              </div>
              <p className="text-slate-600">
                Usted llena sus datos, realiza la transferencia de los $10.000 COP a Nequi o Daviplata, y en menos de 2 horas su perfil queda verificado y visible para toda la comunidad.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900">
                ¿Mi oficio no está en la lista principal, me puedo inscribir?
              </div>
              <p className="text-slate-600">
                ¡Claro que sí! Puede escribir su oficio personalizado (oficial de obra, ayudante práctico, tapicería, arreglos en general) y la gente lo encontrará al buscar.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default function UneteLandingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Cargando información...</div>}>
      <UneteContent />
    </Suspense>
  );
}
