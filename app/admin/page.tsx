'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  Clock,
  DollarSign,
  PlusCircle,
  Settings,
  ArrowLeft,
  Lock,
  Trash2,
  RefreshCw,
  Phone,
  MessageCircle,
  AlertTriangle,
  Check,
  X,
  MapPin,
  Save,
  Camera,
  Printer,
  QrCode,
  Share2,
  Copy,
} from 'lucide-react';
import { Provider, SiteSettings, Municipality } from '@/lib/types';
import {
  getStoredProviders,
  getStoredSettings,
  updateProvider,
  deleteProvider,
  addProvider,
  saveSettings,
  resetToSeedData,
} from '@/lib/storage';
import { CATEGORIES, MUNICIPALITIES } from '@/lib/data';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'create' | 'marketing' | 'settings'>('pending');
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Manual provider creation state
  const [manualName, setManualName] = useState('');
  const [manualCategories, setManualCategories] = useState<string[]>(['electricista']);
  const [manualCustomTrade, setManualCustomTrade] = useState('');
  const [manualMunicipality, setManualMunicipality] = useState<Municipality>('Saravena');
  const [manualPhone, setManualPhone] = useState('');
  const [manualExp, setManualExp] = useState('5');
  const [manualDesc, setManualDesc] = useState('');
  const [manualCover, setManualCover] = useState('Saravena y veredas');
  const [manualSuccessMsg, setManualSuccessMsg] = useState('');

  // Settings form state
  const [nequiNum, setNequiNum] = useState('');
  const [daviNum, setDaviNum] = useState('');
  const [holderName, setHolderName] = useState('');
  const [promoPrice, setPromoPrice] = useState(10000);
  const [standardPrice, setStandardPrice] = useState(15000);
  const [promoSlots, setPromoSlots] = useState(50);
  const [whatsappContact, setWhatsappContact] = useState('');
  const [adminPin, setAdminPin] = useState('sarare2026');
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState('');

  useEffect(() => {
    const loadedProviders = getStoredProviders();
    const loadedSettings = getStoredSettings();
    setProviders(loadedProviders);
    setSettings(loadedSettings);

    if (loadedSettings) {
      setNequiNum(loadedSettings.nequiNumber);
      setDaviNum(loadedSettings.daviplataNumber);
      setHolderName(loadedSettings.accountHolder);
      setPromoPrice(loadedSettings.promoPrice);
      setStandardPrice(loadedSettings.standardPrice);
      setPromoSlots(loadedSettings.promoSlotsTotal);
      setWhatsappContact(loadedSettings.contactWhatsApp);
      setAdminPin(loadedSettings.adminPin || 'sarare2026');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPin = settings?.adminPin || 'sarare2026';
    if (pinInput === currentPin || pinInput === 'sarare2026') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleApprove = (id: string) => {
    const updated = updateProvider(id, {
      status: 'active',
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
    if (updated) {
      setProviders(getStoredProviders());
      setSettings(getStoredSettings());
    }
  };

  const handleReject = (id: string) => {
    if (confirm('¿Estás seguro de rechazar y eliminar este registro?')) {
      deleteProvider(id);
      setProviders(getStoredProviders());
    }
  };

  const handleToggleStatus = (id: string, currentStatus: Provider['status']) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    updateProvider(id, { status: newStatus });
    setProviders(getStoredProviders());
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este trabajador permanentemente?')) {
      deleteProvider(id);
      setProviders(getStoredProviders());
    }
  };

  const toggleManualCategory = (slug: string) => {
    if (manualCategories.includes(slug)) {
      if (manualCategories.length > 1) {
        setManualCategories(manualCategories.filter((s) => s !== slug));
      }
    } else {
      setManualCategories([...manualCategories, slug]);
    }
  };

  const handleManualCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const primarySlug = manualCategories[0] || 'electricista';
    const primaryCat = CATEGORIES.find((c) => c.slug === primarySlug);
    const primaryName = manualCustomTrade.trim() ? manualCustomTrade.trim() : primaryCat?.name || 'Servicio';

    const allCatNames = manualCategories
      .map((slug) => CATEGORIES.find((c) => c.slug === slug)?.name)
      .filter((n): n is string => Boolean(n));

    if (manualCustomTrade.trim() && !allCatNames.includes(manualCustomTrade.trim())) {
      allCatNames.push(manualCustomTrade.trim());
    }

    const cleanPhone = manualPhone.replace(/\D/g, '');
    const fullPhone = cleanPhone.startsWith('57') ? cleanPhone : `57${cleanPhone}`;

    addProvider({
      name: manualName.trim(),
      categorySlug: primarySlug,
      categoryName: primaryName,
      categorySlugs: manualCategories,
      categoryNames: allCatNames,
      customCategory: manualCustomTrade.trim() || undefined,
      municipality: manualMunicipality,
      phone: fullPhone,
      displayPhone: manualPhone.trim(),
      experienceYears: parseInt(manualExp, 10) || 1,
      description: manualDesc.trim() || `Servicio profesional de ${primaryName} en ${manualMunicipality}.`,
      servicesOffered: [`Servicio especializado de ${primaryName}`, 'Atención a domicilio'],
      neighborhoodsCovered: manualCover.trim(),
      isVerified: true,
      isPromo: true,
      status: 'active',
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentProofRef: 'Registrado manualmente por el Administrador (Efectivo/Directo)',
    });

    setProviders(getStoredProviders());
    setSettings(getStoredSettings());
    setManualSuccessMsg(`¡${manualName} fue añadido y activado con éxito!`);
    setManualName('');
    setManualPhone('');
    setManualDesc('');
    setManualCustomTrade('');
    setTimeout(() => setManualSuccessMsg(''), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    const newSettings: SiteSettings = {
      ...settings,
      nequiNumber: nequiNum.trim(),
      daviplataNumber: daviNum.trim(),
      accountHolder: holderName.trim(),
      promoPrice: Number(promoPrice) || 10000,
      standardPrice: Number(standardPrice) || 15000,
      promoSlotsTotal: Number(promoSlots) || 50,
      contactWhatsApp: whatsappContact.replace(/\D/g, ''),
      adminPin: adminPin.trim() || 'sarare2026',
    };
    saveSettings(newSettings);
    setSettings(newSettings);
    setSettingsSuccessMsg('¡Ajustes guardados correctamente!');
    setTimeout(() => setSettingsSuccessMsg(''), 3000);
  };

  const handleReset = () => {
    if (confirm('¿Restablecer datos de prueba iniciales de Saravena?')) {
      resetToSeedData();
      setProviders(getStoredProviders());
      setSettings(getStoredSettings());
      alert('Datos restablecidos con éxito.');
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  // Calculations
  const activeProviders = providers.filter((p) => p.status === 'active');
  const pendingProviders = providers.filter((p) => p.status === 'pending_payment');
  const monthlyRevenue = activeProviders.reduce((acc, p) => {
    return acc + (p.isPromo ? (settings?.promoPrice || 10000) : (settings?.standardPrice || 15000));
  }, 0);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Panel de Administración
            </h1>
            <p className="text-xs text-slate-400">
              Ingresa el PIN de seguridad para gestionar ServiSarare
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                PIN de Acceso
              </label>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Ingresa tu clave (por defecto: sarare2026)"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden"
              />
              {pinError && (
                <p className="text-xs text-red-400 font-medium mt-1">
                  ⚠️ PIN incorrecto. La clave inicial es: <strong className="text-white">sarare2026</strong>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Entrar al Panel
            </button>
          </form>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Volver al sitio público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-white font-black text-lg">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl">
                  Servi<span className="text-emerald-400">Sarare</span>
                </span>
                <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  Admin Master
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gestión de cobros, suscripciones y prestadores de servicio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/volante"
              target="_blank"
              className="text-xs font-black bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Afiches QR</span>
            </Link>
            
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl border border-slate-700 transition-colors"
            >
              Ver página en vivo ↗
            </Link>
            
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs font-bold bg-red-950/80 hover:bg-red-900 text-red-300 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* STATS METRICS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Active */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Activos en Línea</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {activeProviders.length}
            </div>
            <p className="text-[11px] text-slate-500">
              Prestadores visibles al público
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Por Aprobar</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">
              {pendingProviders.length}
            </div>
            <p className="text-[11px] text-slate-500">
              Nuevos registros pendientes de pago
            </p>
          </div>

          {/* Monthly Revenue Estimate */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Ingresos Recurrentes</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">
              ${monthlyRevenue.toLocaleString('es-CO')}
            </div>
            <p className="text-[11px] text-slate-500">
              COP por mes estimados
            </p>
          </div>

          {/* Promo Slots */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Cupos Promo</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-700">
              {settings?.promosUsed || 0} / {settings?.promoSlotsTotal || 50}
            </div>
            <p className="text-[11px] text-slate-500">
              Primeros 50 a $10.000/mes
            </p>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Por Aprobar</span>
            {pendingProviders.length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {pendingProviders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'active'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Prestadores Activos ({activeProviders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-500" />
            <span>Añadir Manualmente</span>
          </button>

          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'marketing'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>📢 Publicidad y Afiches QR</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cuentas y Precios</span>
          </button>
        </div>

        {/* TAB: MARKETING & QR POSTERS */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <div className="bg-linear-to-br from-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center">
                  🖨️
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Herramientas de Difusión y Afiches con Código QR
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Usa estas herramientas para promocionar ServiSarare en ferreterías, tiendas y grupos de WhatsApp de Saravena.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Link
                  href="/volante"
                  target="_blank"
                  className="bg-white hover:bg-amber-50 text-slate-950 p-5 rounded-2xl shadow-lg font-black text-sm sm:text-base flex items-center justify-between group transition-all"
                >
                  <div className="space-y-1">
                    <div className="text-emerald-700 text-xs font-bold uppercase">1. Formato Imprimible</div>
                    <div className="group-hover:text-emerald-700">Ver e Imprimir Afiches con QR</div>
                    <div className="text-xs text-slate-500 font-normal">Listo para imprimir en hoja carta y pegar en ferreterías</div>
                  </div>
                  <Printer className="w-6 h-6 text-emerald-700 shrink-0 ml-2" />
                </Link>

                <Link
                  href="/unete"
                  target="_blank"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-2xl shadow-lg font-black text-sm sm:text-base flex items-center justify-between group transition-all"
                >
                  <div className="space-y-1">
                    <div className="text-amber-300 text-xs font-bold uppercase">2. Página del QR</div>
                    <div>Ver Página de Aterrizaje (/unete)</div>
                    <div className="text-xs text-emerald-100 font-normal">La página persuasiva que se abre al escanear el QR</div>
                  </div>
                  <QrCode className="w-6 h-6 text-white shrink-0 ml-2" />
                </Link>
              </div>
            </div>

            {/* Ready WhatsApp Copy Templates */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Textos Listos para Difundir en Grupos de WhatsApp de Saravena:</span>
              </h3>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase">Mensaje para convencer a Trabajadores:</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        `📢 ¡Atención trabajadores de Saravena y el Sarare! 👷‍♂️⚡\n¿Eres electricista, maestro de obra, plomero, instalador de PVC/Drywall, pintor o guadañador?\n\nLanzamos ServiSarare, el nuevo directorio digital donde las familias del pueblo buscan servicios y te llaman directo a tu WhatsApp.\n\n🔥 Gran promoción de inauguración: Solo $10.000 COP al mes durante todo tu primer año para los primeros 50 inscritos. ¡Pagas una sola cuota y puedes registrar todos los oficios que sabes hacer sin comisiones!\n\n📲 Inscríbete hoy o pide información escribiéndome al WhatsApp: ${settings?.daviplataNumber || '312 345 6789'}`
                      )
                    }
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedMsg ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans bg-white p-3.5 rounded-xl border border-slate-200">
                  {`📢 ¡Atención trabajadores de Saravena y el Sarare! 👷‍♂️⚡
¿Eres electricista, maestro de obra, plomero, instalador de PVC/Drywall, pintor o guadañador?

Lanzamos ServiSarare, el nuevo directorio digital donde las familias del pueblo buscan servicios y te llaman directo a tu WhatsApp.

🔥 Gran promoción de inauguración: Solo $10.000 COP al mes durante todo tu primer año para los primeros 50 inscritos. ¡Pagas una sola cuota y puedes registrar todos los oficios que sabes hacer sin comisiones!

📲 Inscríbete hoy o pide información escribiéndome al WhatsApp: ${settings?.daviplataNumber || '312 345 6789'}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: PENDING REGISTRATIONS */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Registros Pendientes de Validación ({pendingProviders.length})
              </h2>
            </div>

            {pendingProviders.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-sm">
                🎉 No hay solicitudes pendientes en este momento. Todos los prestadores están al día.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pendingProviders.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {p.avatarUrl ? (
                        <img src={p.avatarUrl} alt={p.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xl shrink-0">
                          {p.name.charAt(0)}
                        </div>
                      )}

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-black text-slate-900">
                            {p.name}
                          </span>
                          <span className="bg-amber-100 text-amber-900 font-bold text-xs px-2 py-0.5 rounded-md">
                            {p.categoryName}
                          </span>
                          <span className="bg-slate-100 text-slate-700 font-medium text-xs px-2 py-0.5 rounded-md">
                            {p.municipality}
                          </span>
                        </div>

                        {Array.isArray(p.categoryNames) && p.categoryNames.length > 1 && (
                          <p className="text-xs text-slate-500">
                            <strong>Otros oficios:</strong> {p.categoryNames.join(', ')}
                          </p>
                        )}

                        <p className="text-xs text-slate-600">
                          <strong>WhatsApp:</strong> {p.displayPhone} • <strong>Exp:</strong> {p.experienceYears} años
                        </p>
                        <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {p.description}
                        </p>
                        <p className="text-xs text-amber-800 font-bold">
                          Comprobante / Ref: {p.paymentProofRef || 'Sin referencia'}
                        </p>
                        {Array.isArray(p.workPhotos) && p.workPhotos.length > 0 && (
                          <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                            <Camera className="w-3.5 h-3.5" />
                            <span>Adjuntó {p.workPhotos.length} fotos de trabajos</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0">
                      <a
                        href={`https://wa.me/${p.phone}?text=Hola%20${encodeURIComponent(p.name)},%20te%20escribo%20del%20equipo%20de%20ServiSarare%20respecto%20a%20tu%20inscripción.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>Chat</span>
                      </a>

                      <button
                        onClick={() => handleApprove(p.id)}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md transition-colors cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Aprobar y Publicar</span>
                      </button>

                      <button
                        onClick={() => handleReject(p.id)}
                        className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE PROVIDERS */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Listado de Prestadores Activos ({activeProviders.length})
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="p-3.5">Nombre & Oficios</th>
                      <th className="p-3.5">Municipio</th>
                      <th className="p-3.5">Teléfono</th>
                      <th className="p-3.5">Tarifa</th>
                      <th className="p-3.5">Estado</th>
                      <th className="p-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeProviders.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-xs text-emerald-700 font-medium">
                            {Array.isArray(p.categoryNames) && p.categoryNames.length > 0
                              ? p.categoryNames.join(', ')
                              : p.categoryName}
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-600 font-medium">
                          {p.municipality}
                        </td>
                        <td className="p-3.5">
                          <a
                            href={`https://wa.me/${p.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            {p.displayPhone}
                          </a>
                        </td>
                        <td className="p-3.5">
                          {p.isPromo ? (
                            <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded">
                              $10.000 (Promo)
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded">
                              $15.000 (Normal)
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Activo
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleToggleStatus(p.id, p.status)}
                            className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Pausar
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CREATE PROVIDER MANUALLY */}
        {activeTab === 'create' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Añadir Prestador Manualmente
              </h2>
              <p className="text-xs text-slate-500">
                Usa este formulario cuando hables con un trabajador en la calle y te pague en efectivo. Quedará activo de inmediato.
              </p>
            </div>

            {manualSuccessMsg && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                {manualSuccessMsg}
              </div>
            )}

            <form onSubmit={handleManualCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Nombre del Trabajador o Taller *
                </label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="Ej: Maestro Hernando Díaz"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Municipio *
                </label>
                <select
                  value={manualMunicipality}
                  onChange={(e) => setManualMunicipality(e.target.value as Municipality)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  {MUNICIPALITIES.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold uppercase text-slate-800">
                  Oficios que realiza (Marca todos los aplicables):
                </label>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {CATEGORIES.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={manualCategories.includes(c.slug)}
                        onChange={() => toggleManualCategory(c.slug)}
                        className="rounded text-emerald-600"
                      />
                      <span>{c.name}</span>
                    </label>
                  ))}
                </div>
                <div className="pt-2">
                  <input
                    type="text"
                    value={manualCustomTrade}
                    onChange={(e) => setManualCustomTrade(e.target.value)}
                    placeholder="Otro oficio no listado (ej: Oficial de obra, Drywall)"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    WhatsApp (10 dígitos) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="312 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Años de Experiencia
                  </label>
                  <input
                    type="number"
                    value={manualExp}
                    onChange={(e) => setManualExp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Descripción breve
                </label>
                <textarea
                  rows={2}
                  value={manualDesc}
                  onChange={(e) => setManualDesc(e.target.value)}
                  placeholder="Trabajador de confianza con experiencia comprobada..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Barrios / Veredas que cubre
                </label>
                <input
                  type="text"
                  value={manualCover}
                  onChange={(e) => setManualCover(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Guardar y Publicar en Vivo 🚀
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: SETTINGS & ACCOUNTS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Configuración de Cuentas de Cobro y Precios
              </h2>
              <p className="text-xs text-slate-500">
                Configura tus números de Nequi y Daviplata para recibir los pagos de las mensualidades.
              </p>
            </div>

            {settingsSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                {settingsSuccessMsg}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Número Nequi para recibir pagos
                  </label>
                  <input
                    type="text"
                    required
                    value={nequiNum}
                    onChange={(e) => setNequiNum(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Número Daviplata para recibir pagos
                  </label>
                  <input
                    type="text"
                    required
                    value={daviNum}
                    onChange={(e) => setDaviNum(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Nombre del Titular de las Cuentas
                </label>
                <input
                  type="text"
                  required
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Precio Promo ($ COP)
                  </label>
                  <input
                    type="number"
                    value={promoPrice}
                    onChange={(e) => setPromoPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Precio Normal ($ COP)
                  </label>
                  <input
                    type="number"
                    value={standardPrice}
                    onChange={(e) => setStandardPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Cupos Promocionales
                  </label>
                  <input
                    type="number"
                    value={promoSlots}
                    onChange={(e) => setPromoSlots(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    WhatsApp Administrador (Para recibir comprobantes)
                  </label>
                  <input
                    type="text"
                    value={whatsappContact}
                    onChange={(e) => setWhatsappContact(e.target.value)}
                    placeholder="573120000000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    PIN de Acceso Administrador
                  </label>
                  <input
                    type="text"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-red-600 hover:underline font-bold"
                >
                  Restablecer datos de prueba
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
