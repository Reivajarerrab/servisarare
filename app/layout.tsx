import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ServiSarare | Directorio de Servicios en Saravena y el Sarare',
  description:
    'Encuentra electricistas, plomeros, maestros de construcción, soldadores, técnicos, guadañadores y servicios de confianza en Saravena, Tame, Arauquita y Fortul. Contacto directo por WhatsApp.',
  keywords: [
    'Saravena',
    'Sarare',
    'Arauca',
    'electricista Saravena',
    'plomero Saravena',
    'maestro de obra Saravena',
    'guadañador',
    'acarreos Saravena',
    'servicios Saravena',
  ],
  authors: [{ name: 'ServiSarare' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full bg-slate-50 antialiased">
      <body className="min-h-full flex flex-col font-sans selection:bg-amber-300 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
