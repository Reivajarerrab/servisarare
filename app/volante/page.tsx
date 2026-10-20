'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Printer, ArrowLeft, MessageCircle, Flame, CheckCircle2, MapPin } from 'lucide-react';
import { getStoredSettings } from '@/lib/storage';
import { SiteSettings, Municipality } from '@/lib/types';
import { MUNICIPALITIES } from '@/lib/data';
import { Logo } from '@/components/Logo';

export default function VolantePrintPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [municipality, setMunicipality] = useState<Municipality>('Saravena');
  const [origin, setOrigin] = useState('https://servisarare.vercel.app');

  useEffect(() => {
    setSettings(getStoredSettings());
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const targetUrl = `${origin}/unete?m=${encodeURIComponent(municipality)}`;
  // Clean, high-contrast QR code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetUrl)}`;
  const adminPhone = settings?.daviplataNumber || settings?.contactWhatsApp || '312 345 6789';

  return (
    <div className="min-h-screen bg-slate-200 text-slate-900 py-6 px-4 flex flex-col items-center print:bg-white print:p-0 print:m-0">
      {/* Dynamic Print CSS to force SINGLE-PAGE Letter format */}
      <style jsx global>{`
        @media print {
          @page {
            size: letter portrait;
            margin: 8mm;
          }
          html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 100% !important;
            overflow: hidden !important;
          }
          .no-print {
            display: none !important;
          }
          .print-card {
            border: 3px solid #0f172a !important;
            box-shadow: none !important;
            border-radius: 12px !important;
            padding: 14px 18px !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
        }
      `}</style>

      {/* Control bar (hidden when printing) */}
      <div className="w-full max-w-2xl mb-4 bg-white p-4 rounded-2xl shadow-md space-y-3 print:hidden no-print">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-2 rounded-xl flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Directorio</span>
          </Link>

          <button
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
          >
            <Printer className="w-4 h-4" />
            <span>🖨️ Imprimir Afiche (1 Sola Hoja Carta / PDF)</span>
          </button>
        </div>

        {/* Municipality Selector for Printing */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-600 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Municipio para este afiche:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {MUNICIPALITIES.map((mun) => (
              <button
                key={mun.name}
                type="button"
                onClick={() => setMunicipality(mun.name)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  municipality === mun.name
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {mun.name}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-medium">
          💡 <strong>Garantía de 1 sola hoja:</strong> Diseñado con medidas exactas para que el afiche completo con su pie de página encaje perfectamente en una hoja de papel carta.
        </p>
      </div>

      {/* PRINTABLE POSTER / AFICHE (Fits snugly on a single letter page) */}
      <div className="print-card w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 border-4 border-slate-950 shadow-2xl space-y-3.5 text-center print:space-y-2.5 print:p-4">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2 print:pb-1">
          <Logo size="sm" showText={true} />
          <span className="bg-amber-100 text-amber-950 font-black text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-300">
            Directorio Oficial de {municipality}
          </span>
        </div>

        {/* Psychological Pain Hook Headline */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-950 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider">
            <Flame className="w-3 h-3 text-red-600 fill-red-600 inline" />
            <span>¿Cansado de esperar a que le salga trabajo?</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl print:text-xl font-black uppercase tracking-tight text-slate-950 leading-tight">
            ¡HAGA QUE LOS CLIENTES DE {municipality.toUpperCase()} LO LLAMEN A SU WHATSAPP!
          </h1>
          
          <p className="text-[11px] sm:text-xs font-extrabold text-emerald-800 uppercase tracking-wide leading-snug">
            Electricistas • Maestros de Obra • Plomeros • Pintores • Soldadores • PVC/Drywall • Guadañadores • Mecánicos • Acarreos • Técnicos... <span className="underline decoration-amber-400 decoration-2">Y CUALQUIER OTRO OFICIO</span>
          </p>
        </div>

        {/* Persuasive Reality Check Body */}
        <div className="bg-slate-50 p-3 print:p-2 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed text-left space-y-1">
          <p>
            <strong>La realidad es simple:</strong> El que no se muestra, no vende. Cuando una familia o negocio en {municipality} necesita un arreglo urgente, busca en su celular. <strong>Si usted no está ahí, el cliente contrata a otro.</strong>
          </p>
          <p className="text-slate-600 text-[11px]">
            En <strong>ServiSarare</strong> publicamos su nombre, número de WhatsApp y fotos de sus obras para que la gente lo contrate directamente, sin intermediarios.
          </p>
        </div>

        {/* QR CODE CALL TO ACTION BOX (Tightened height for 1-page fit) */}
        <div className="bg-linear-to-b from-amber-50 to-amber-100/70 border-2 border-dashed border-amber-500 p-3 print:p-2 rounded-xl space-y-1.5 inline-block w-full">
          <div className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wide">
            👇 APUNTA LA CÁMARA DE TU CELULAR AL CÓDIGO QR 👇
          </div>

          <div className="w-36 h-36 sm:w-40 sm:h-40 print:w-32 print:h-32 mx-auto bg-white p-1.5 rounded-xl shadow-md border-2 border-slate-900 flex items-center justify-center">
            <img
              src={qrCodeUrl}
              alt={`Código QR para inscribirse en ServiSarare ${municipality}`}
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-[10px] sm:text-xs font-black text-amber-950">
            Escanea el código para ver la información y asegurar tu cupo en {municipality}
          </p>
        </div>

        {/* Irresistible Value Proposition Pills */}
        <div className="grid grid-cols-3 gap-1.5 text-left text-xs bg-slate-950 text-white p-2.5 print:p-2 rounded-xl">
          <div className="space-y-0.5 border-r border-slate-800 pr-1">
            <div className="font-black text-amber-400 text-[11px] sm:text-xs">0% Comisión</div>
            <div className="text-[9px] text-slate-300">Todo lo que cobre es 100% suyo.</div>
          </div>
          <div className="space-y-0.5 border-r border-slate-800 px-1">
            <div className="font-black text-amber-400 text-[11px] sm:text-xs">Solo $10.000/mes</div>
            <div className="text-[9px] text-slate-300">Precio promo garantizado 1 año.</div>
          </div>
          <div className="space-y-0.5 pl-1">
            <div className="font-black text-amber-400 text-[11px] sm:text-xs">Varios Oficios</div>
            <div className="text-[9px] text-slate-300">1 pago para todo lo que hace.</div>
          </div>
        </div>

        {/* Contact Footer (Guaranteed to be included on Page 1) */}
        <div className="pt-2 border-t-2 border-slate-950 space-y-1 print:pt-1">
          <p className="text-[11px] font-bold text-slate-700">
            ¿No sabe cómo escanear el QR o prefiere que lo inscribamos por teléfono?
          </p>
          <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-1.5 rounded-full font-black text-xs sm:text-sm shadow-md">
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Administrador: {adminPhone}</span>
          </div>
          <p className="text-[9px] text-slate-500 font-bold pt-0.5">
            ServiSarare • Impulsando el trabajo honesto en {municipality} y la región del Sarare, Arauca
          </p>
        </div>
      </div>
    </div>
  );
}
