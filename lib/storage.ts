import { Provider, SiteSettings } from './types';
import { SEED_PROVIDERS, DEFAULT_SETTINGS } from './data';

const PROVIDERS_KEY = 'servisarare_providers_v1';
const SETTINGS_KEY = 'servisarare_settings_v1';

// In-memory fallback
let memoryProviders: Provider[] = [...SEED_PROVIDERS];

export function getStoredProviders(): Provider[] {
  if (typeof window === 'undefined') return SEED_PROVIDERS;
  try {
    const raw = localStorage.getItem(PROVIDERS_KEY);
    if (!raw) {
      localStorage.setItem(PROVIDERS_KEY, JSON.stringify(SEED_PROVIDERS));
      memoryProviders = SEED_PROVIDERS;
      return SEED_PROVIDERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryProviders = parsed;
      return parsed;
    }
    return SEED_PROVIDERS;
  } catch (err) {
    console.error('Error reading providers from storage:', err);
    return memoryProviders.length > 0 ? memoryProviders : SEED_PROVIDERS;
  }
}

export function saveProviders(providers: Provider[]): void {
  memoryProviders = providers;
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROVIDERS_KEY, JSON.stringify(providers));
  } catch (err) {
    console.warn('Storage quota exceeded or storage error, trying fallback:', err);
    // Fallback: remove heavy images from oldest items if necessary
    try {
      const lightweight = providers.map((p, index) => {
        if (index > 20) {
          return { ...p, workPhotos: undefined };
        }
        return p;
      });
      localStorage.setItem(PROVIDERS_KEY, JSON.stringify(lightweight));
    } catch (fallbackErr) {
      console.error('Unable to persist to localStorage, keeping in memory:', fallbackErr);
    }
  }
}

export function addProvider(newProvider: Omit<Provider, 'id' | 'createdAt' | 'rating' | 'reviewCount'>): Provider {
  const providers = getStoredProviders();
  const provider: Provider = {
    ...newProvider,
    id: 'prov-' + Date.now(),
    createdAt: new Date().toISOString(),
    rating: 5.0,
    reviewCount: 1,
  };
  const updated = [provider, ...providers];
  saveProviders(updated);

  // Update promo count if applicable
  const settings = getStoredSettings();
  if (provider.isPromo && provider.status === 'active') {
    saveSettings({
      ...settings,
      promosUsed: Math.min(settings.promoSlotsTotal, settings.promosUsed + 1),
    });
  }

  return provider;
}

export function updateProvider(id: string, updates: Partial<Provider>): Provider | null {
  const providers = getStoredProviders();
  const index = providers.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const prevStatus = providers[index].status;
  const updatedProvider = { ...providers[index], ...updates };
  providers[index] = updatedProvider;
  saveProviders(providers);

  // If approved and promo, increment promo used
  if (prevStatus === 'pending_payment' && updatedProvider.status === 'active' && updatedProvider.isPromo) {
    const settings = getStoredSettings();
    saveSettings({
      ...settings,
      promosUsed: Math.min(settings.promoSlotsTotal, settings.promosUsed + 1),
    });
  }

  return updatedProvider;
}

export function deleteProvider(id: string): boolean {
  const providers = getStoredProviders();
  const filtered = providers.filter((p) => p.id !== id);
  if (filtered.length === providers.length) return false;
  saveProviders(filtered);
  return true;
}

export function getStoredSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error reading settings from storage:', err);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}

export function resetToSeedData(): void {
  if (typeof window === 'undefined') return;
  memoryProviders = SEED_PROVIDERS;
  localStorage.setItem(PROVIDERS_KEY, JSON.stringify(SEED_PROVIDERS));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
}
