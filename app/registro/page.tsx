'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  ArrowLeft,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building,
  User,
  Phone,
  Briefcase,
  MapPin,
  Flame,
  HelpCircle,
  Copy,
  Check,
  Camera,
  Upload,
  X,
  Plus,
} from 'lucide-react';
import { CATEGORIES, MUNICIPALITIES } from '@/lib/data';
import { addProvider, getStoredSettings } from '@/lib/storage';
import { Municipality, SiteSettings, Provider } from '@/lib/types';
import { compressImage } from '@/lib/imageUtils';

export default function RegistroPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [copiedNequi, setCopiedNequi] = useState(false);
  const [copiedDavi, setCopiedDavi] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [primaryCategorySlug, setPrimaryCategorySlug] = useState('electricista');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['electricista']);
  const [customTrade, setCustomTrade] = useState('');
  const [municipality, setMunicipality] = useState<Municipality>('Saravena');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [description, setDescription] = useState('');
  const [neighborhoodsCovered, setNeighborhoodsCovered] = useState('');
  const [customServices, setCustomServices] = useState('');
  const [paymentProofRef, setPaymentProofRef] = useState('');

  // Photos State
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [workPhotos, setWorkPhotos] = useState<string[]>([]);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  const [createdProvider, setCreatedProvider] = useState<Provider | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setSettings(getStoredSettings());
  }, []);

  // Handle avatar upload with compression
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessingPhoto(true);
      try {
        const compressed = await compressImage(file, 400, 0.75);
        setAvatarUrl(compressed);
      } catch (err) {
        console.error('Error compressing avatar:', err);
      } finally {
        setIsProcessingPhoto(false);
      }
    }
  };

  // Handle work photos upload with compression (up to 3)
  const handleWorkPhotosChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + workPhotos.length > 3) {
      alert('Puedes subir hasta 3 fotos de trabajos como máximo.');
      return;
    }

    setIsProcessingPhoto(true);
    try {
      const compressedList: string[] = [];
      for (const file of files) {
        const compressed = await compressImage(file, 600, 0.7);
        compressedList.push(compressed);
      }
      setWorkPhotos((prev) => [...prev, ...compressedList].slice(0, 3));
    } catch (err) {
      console.error('Error compressing work photos:', err);
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const removeWorkPhoto = (index: number) => {
    setWorkPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle category checkbox
  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      if (selectedCategories.length === 1 && !customTrade) {
        alert('Debes seleccionar al menos un oficio.');
        return;
      }
      setSelectedCategories(selectedCategories.filter((s) => s !== slug));
      if (primaryCategorySlug === slug) {
        const remaining = selectedCategories.filter((s) => s !== slug);
        if (remaining.length > 0) setPrimaryCategorySlug(remaining[0]);
      }
    } else {
      setSelectedCategories([...selectedCategories, slug]);
    }
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Por favor escribe tu nombre o nombre de tu taller.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Por favor escribe un número de WhatsApp válido de 10 dígitos (ej: 312 345 6789).');
      return;
    }
    if (selectedCategories.length === 0 && !customTrade.trim()) {
      setErrorMsg('Por favor selecciona al menos un oficio.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Por favor escribe una breve descripción de tu experiencia.');
      return;
    }
    if (!neighborhoodsCovered.trim()) {
      setErrorMsg('Por favor indica qué barrios o veredas atiendes.');
      return;
    }
    setErrorMsg('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishRegistration = (e: React.FormEvent) => {
    e.preventDefault();

    // Primary category name
    const primaryCat = CATEGORIES.find((c) => c.slug === primaryCategorySlug);
    const primaryName = customTrade.trim() ? customTrade.trim() : primaryCat ? primaryCat.name : 'Servicio';

    // All category names
    const allCatNames = selectedCategories
      .map((slug) => CATEGORIES.find((c) => c.slug === slug)?.name)
      .filter((n): n is string => Boolean(n));

    if (customTrade.trim() && !allCatNames.includes(customTrade.trim())) {
      allCatNames.push(customTrade.trim());
    }

    // Clean phone
    const cleanPhone = phone.replace(/\D/g, '');
    const fullPhone = cleanPhone.startsWith('57') ? cleanPhone : `57${cleanPhone}`;

    // Parsed custom services
    const parsedServices = customServices
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const isPromoEligible = settings ? settings.promosUsed < settings.promoSlotsTotal : true;

    const newProv = addProvider({
      name: name.trim(),
      categorySlug: primaryCategorySlug,
      categoryName: primaryName,
      categorySlugs: selectedCategories,
      categoryNames: allCatNames.length > 0 ? allCatNames : [primaryName],
      customCategory: customTrade.trim() || undefined,
      municipality,
      phone: fullPhone,
      displayPhone: phone.trim(),
      experienceYears: parseInt(experienceYears, 10) || 1,
      description: description.trim(),
      servicesOffered:
        parsedServices.length > 0
          ? parsedServices
          : [`Servicio especializado de ${primaryName}`, 'Atención a domicilio'],
      neighborhoodsCovered: neighborhoodsCovered.trim(),
      isVerified: true,
      isPromo: isPromoEligible,
      status: 'pending_payment',
      subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      paymentProofRef: paymentProofRef.trim() || 'Pendiente de validación',
      avatarUrl: avatarUrl || undefined,
      workPhotos: workPhotos.length > 0 ? workPhotos : undefined,
    });

    setCreatedProvider(newProv);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (text: string, type: 'nequi' | 'davi') => {
    navigator.clipboard.writeText(text);
    if (type === 'nequi') {
      setCopiedNequi(true);
      setTimeout(() => setCopiedNequi(false), 2000);
    } else {
      setCopiedDavi(true);
      setTimeout(() => setCopiedDavi(false), 2000);
    }
  };

  const price = settings?.promoActive ? settings.promoPrice : settings?.standardPrice || 10000;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg mb-6 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Directorio</span>
        </Link>

        {/* Header Title */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Inscripción de Trabajadores y Negocios</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Únete a ServiSarare y recibe clientes a tu WhatsApp
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Pagas una sola suscripción de <strong>$10.000/mes</strong> y puedes marcar todos los oficios que realizas.
          </p>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                step >= 1
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              <span>1</span> Datos & Fotos
            </div>
            <div className="w-6 h-0.5 bg-slate-200" />
            <div
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                step >= 2
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              <span>2</span> Pago y Activación
            </div>
            <div className="w-6 h-0.5 bg-slate-200" />
            <div
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                step === 3
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              <span>3</span> ¡Listo!
            </div>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm rounded-xl font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* STEP 1: Personal, Multi-Trade & Photo Upload */}
        {step === 1 && (
          <form
            onSubmit={handleNextStep1}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6"
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Paso 1: Información de tus Servicios y Fotos
              </h2>
              <p className="text-xs text-slate-500">
                Completa tus datos para que los vecinos de {municipality} te contacten directamente.
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Tu Nombre Completo o Nombre de tu Taller *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Don Carlos Martínez o Construcciones y Acabados El Sarare"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
              />
            </div>

            {/* Municipality & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Municipio donde estás ubicado *
                </label>
                <select
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value as Municipality)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-hidden bg-white font-medium"
                >
                  {MUNICIPALITIES.map((mun) => (
                    <option key={mun.name} value={mun.name}>
                      {mun.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Número de WhatsApp (10 dígitos) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: 312 345 6789"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            {/* MULTI-CATEGORY CHECKBOXES */}
            <div className="space-y-2 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-900">
                  ¿Qué oficios o servicios realizas? (Marca todos los que apliquen) *
                </label>
                <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                  1 Sola Mensualidad
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Si haces varios oficios (ej: Maestro de obra + Pintor + PVC/Drywall + Plomero), márcalos todos. Aparecerás en las búsquedas de cada uno sin pagar nada extra.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {CATEGORIES.map((cat) => {
                  const isChecked = selectedCategories.includes(cat.slug);
                  return (
                    <label
                      key={cat.id}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-emerald-100/90 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat.slug)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <span className="text-xs">{cat.name}</span>
                    </label>
                  );
                })}
              </div>

              {/* Custom unlisted trade input */}
              <div className="pt-3 border-t border-amber-200/60">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  ¿Realizas otro oficio que no está en la lista? (Escríbelo aquí):
                </label>
                <input
                  type="text"
                  value={customTrade}
                  onChange={(e) => setCustomTrade(e.target.value)}
                  placeholder="Ej: Oficial de obra, ayudante práctico de electricidad, reparación de lavadoras"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            {/* PHOTOS SECTION */}
            <div className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Fotos de Perfil y Trabajos Realizados
                  </h3>
                </div>
                {isProcessingPhoto && (
                  <span className="text-xs text-amber-700 font-bold animate-pulse">
                    Optimizando foto...
                  </span>
                )}
              </div>

              {/* Profile Photo */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-3 border-b border-slate-200">
                <div className="relative">
                  {avatarUrl ? (
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xs">
                      <img src={avatarUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setAvatarUrl('')}
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-bl-lg"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xl font-bold">
                      👤
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Foto de Perfil o Logo del Taller (Opcional)
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Una foto tuya trabajando o el logo genera más confianza en los clientes.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Work Photos Gallery */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Fotos de Trabajos Anteriores Realizados (Hasta 3 fotos)
                </label>
                <p className="text-[11px] text-slate-500">
                  Sube fotos de trabajos que hayas hecho (ej: una casa pintada, un baño remodelado, un portón soldado, un techo en PVC).
                </p>

                {/* Photo Previews */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {workPhotos.map((photo, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-300 shadow-xs">
                      <img src={photo} alt={`Trabajo ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeWorkPhoto(idx)}
                        className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {workPhotos.length < 3 && (
                    <label className="w-20 h-20 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 hover:bg-emerald-100/70 flex flex-col items-center justify-center text-emerald-700 cursor-pointer transition-colors text-center p-1">
                      <Upload className="w-4 h-4 mb-0.5" />
                      <span className="text-[10px] font-bold leading-tight">Subir foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleWorkPhotosChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Experience & Bio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Años de Experiencia *
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Barrios y Veredas que atiendes *
                </label>
                <input
                  type="text"
                  required
                  value={neighborhoodsCovered}
                  onChange={(e) => setNeighborhoodsCovered(e.target.value)}
                  placeholder="Ej: Centro, Prado, Santander, Villa Fanny y veredas"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Descripción de tu experiencia y garantías *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cuéntale a la gente por qué contratarte. Ej: Maestro de obra con 15 años de experiencia en pegado de bloque, pañete, pisos y cielo raso en PVC. Trabajo garantizado y puntual..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            {/* Services list */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Lista de trabajos específicos que haces (separados por coma)
              </label>
              <textarea
                rows={2}
                value={customServices}
                onChange={(e) => setCustomServices(e.target.value)}
                placeholder="Ej: Pegado de bloque, estuco, pintura de fachadas, cielo raso en PVC, enchape de baños"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            {/* Submit Step 1 */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Paso 1 de 2 completado
              </span>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Continuar al Pago →
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Details */}
        {step === 2 && (
          <form
            onSubmit={handleFinishRegistration}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6"
          >
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Paso 2: Activación de tu Suscripción Mensual
                </h2>
                <p className="text-xs text-slate-500">
                  Transfiere por Nequi o Daviplata para activar tu perfil en el directorio.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                Editar datos
              </button>
            </div>

            {/* Promo Price Callout */}
            <div className="bg-linear-to-br from-amber-500 to-emerald-600 text-white p-4 sm:p-5 rounded-2xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                  Precio Promoción de Lanzamiento
                </span>
                <span className="text-xs font-extrabold bg-amber-300 text-slate-900 px-2 py-0.5 rounded-full">
                  1 Año Garantizado
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black">
                  ${price.toLocaleString('es-CO')}
                </span>
                <span className="text-sm font-semibold text-emerald-100">
                  COP / al mes
                </span>
              </div>
              <p className="text-xs text-emerald-50">
                Pagas una sola cuota y apareces en todos tus oficios: <strong className="text-white">{selectedCategories.length + (customTrade ? 1 : 0)} oficios registrados</strong>. Sin comisiones por trabajos.
              </p>
            </div>

            {/* Payment Accounts */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Transfiere tu mensualidad a cualquiera de estas cuentas:
              </h3>

              {/* Nequi Card */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-black text-sm">
                    N
                  </div>
                  <div>
                    <div className="text-xs text-purple-300 font-bold uppercase">Nequi</div>
                    <div className="text-base font-extrabold tracking-wider">
                      {settings?.nequiNumber || '312 345 6789'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Titular: {settings?.accountHolder || 'ServiSarare'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(settings?.nequiNumber || '3123456789', 'nequi')}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copiedNequi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Daviplata Card */}
              <div className="p-4 rounded-2xl bg-red-700 text-white flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-900 flex items-center justify-center font-black text-sm">
                    D
                  </div>
                  <div>
                    <div className="text-xs text-red-200 font-bold uppercase">Daviplata</div>
                    <div className="text-base font-extrabold tracking-wider">
                      {settings?.daviplataNumber || '312 345 6789'}
                    </div>
                    <div className="text-[11px] text-red-200">
                      Titular: {settings?.accountHolder || 'ServiSarare'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(settings?.daviplataNumber || '3123456789', 'davi')}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copiedDavi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Payment Proof Reference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Número de comprobante, referencia o fecha de transferencia (opcional)
              </label>
              <input
                type="text"
                value={paymentProofRef}
                onChange={(e) => setPaymentProofRef(e.target.value)}
                placeholder="Ej: Aprobación #128495 o pagué en efectivo"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-hidden"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                También podrás enviar la foto del comprobante directamente por WhatsApp en el siguiente paso.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                ← Volver al paso 1
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Completar Registro y Activar 🚀
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && createdProvider && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              🎉
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">
                ¡Registro recibido con éxito, {createdProvider.name}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Tu perfil de <strong className="text-emerald-700">{createdProvider.categoryName}</strong> (y oficios asociados) en <strong className="text-slate-800">{createdProvider.municipality}</strong> ha sido creado en ServiSarare.
              </p>
            </div>

            {/* Next step info */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-left space-y-2 max-w-md mx-auto text-xs sm:text-sm text-amber-900">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Último paso para activación inmediata:
              </div>
              <p>
                Envía el pantallazo de tu pago de <strong>${price.toLocaleString('es-CO')} COP</strong> al WhatsApp del administrador para que tu perfil aparezca publicado hoy mismo.
              </p>
            </div>

            {/* Send WhatsApp proof button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${settings?.contactWhatsApp || '573123456789'}?text=${encodeURIComponent(
                  `¡Hola ServiSarare! Acabo de registrarme en la plataforma como ${createdProvider.name} (${createdProvider.categoryName} en ${createdProvider.municipality}). Adjunto mi comprobante de pago de $${price.toLocaleString('es-CO')} para activación.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enviar Comprobante por WhatsApp</span>
              </a>

              <Link
                href="/"
                className="w-full sm:w-auto text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-5 py-3.5 rounded-xl transition-colors"
              >
                Volver al Directorio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
