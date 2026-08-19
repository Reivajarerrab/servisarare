export type Municipality = 'Saravena' | 'Tame' | 'Arauquita' | 'Fortul' | 'Cravo Norte' | 'Puerto Rondón';

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  popular?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  categorySlug: string; // Primary category
  categoryName: string;
  categorySlugs: string[]; // All categories this person can do (Multi-trade support!)
  categoryNames: string[];
  customCategory?: string; // If they have an unlisted trade (e.g. Drywall, Ayudante, etc.)
  municipality: Municipality;
  phone: string; // WhatsApp format: 573123456789
  displayPhone: string; // 312 345 6789
  experienceYears: number;
  description: string;
  servicesOffered: string[];
  neighborhoodsCovered: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isPromo: boolean;
  status: 'active' | 'pending_payment' | 'suspended';
  subscriptionExpiresAt: string;
  createdAt: string;
  paymentProofRef?: string;
  notes?: string;
  avatarUrl?: string; // Profile photo (base64 or URL)
  workPhotos?: string[]; // Gallery of completed jobs (base64 or URLs)
}

export interface SiteSettings {
  promoActive: boolean;
  promoPrice: number;
  standardPrice: number;
  promoSlotsTotal: number;
  promosUsed: number;
  nequiNumber: string;
  daviplataNumber: string;
  accountHolder: string;
  contactWhatsApp: string;
  adminPin: string;
}
