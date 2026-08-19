import { Provider, Category, Municipality } from './types';
import { CATEGORIES } from './data';

// Helper to remove accents/tildes and lowercase text
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics / tildes
    .replace(/[^\w\s]/gi, ' ') // replace special chars with spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// Common Spanish stopwords that shouldn't trigger broad matching
const SPANISH_STOPWORDS = new Set([
  'de', 'la', 'el', 'en', 'un', 'una', 'unos', 'unas', 'los', 'las', 'del', 'al',
  'por', 'para', 'con', 'sin', 'que', 'se', 'mi', 'su', 'tu', 'y', 'o', 'a', 'es', 'son'
]);

// Dictionary of everyday colloquial terms, problems, and materials mapped to categories
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  electricista: [
    'electricista', 'electricidad', 'electrico', 'electrica', 'bombillo', 'bombillos', 'bombillo danado',
    'foco', 'lampara', 'luminaria', 'tomacorriente', 'toma', 'tomas', 'enchufe', 'enchufes', 'suiche',
    'interruptor', 'apagador', 'cable', 'cableado', 'cortocircuito', 'corto', 'chispa', 'breaker', 'breakers',
    'taco', 'tacos', 'acometida', 'contador', 'luz', 'sin luz', 'se fue la luz', 'panel solar', 'solar',
    'motobomba', 'bomba de agua', 'flotador', 'flotador electrico', 'voltaje', '110v', '220v', 'trifasico',
    'polo a tierra', 'electrodomestico', 'instalacion electrica', 'red electrica', 'timbre', 'ventilador de techo'
  ],
  plomero: [
    'plomero', 'plomeria', 'fontanero', 'fontaneria', 'fuga', 'fugas', 'fuga de agua', 'tubo roto', 'tuberia',
    'tubo', 'tubos', 'gotera', 'filtracion', 'humedad', 'sifon', 'caneria', 'bajante', 'destape', 'tapado',
    'atascado', 'inodoro', 'sanitario', 'taza', 'bano', 'lavamanos', 'lavaplatos', 'llave', 'llave de agua',
    'grifo', 'griferia', 'manguera', 'tanque', 'tanque de agua', 'tanque elevado', 'boya', 'flotador',
    'hidroflow', 'presion de agua', 'pvc hidraulico', 'pvc sanitario', 'aguas negras', 'aguas lluvias',
    'caja de inspeccion', 'ducha', 'registro', 'valvula'
  ],
  'maestro-construccion': [
    'maestro de construccion', 'maestro de obra', 'albanil', 'albanileria', 'constructor', 'construccion',
    'pegar bloque', 'bloque', 'ladrillo', 'cemento', 'arena', 'gravilla', 'panete', 'revoque', 'repello',
    'estuco', 'piso', 'pisos', 'baldosa', 'ceramica', 'porcelanato', 'enchape', 'enchapar', 'columna',
    'columnas', 'viga', 'vigas', 'placa', 'losa', 'fundicion', 'techo', 'techos', 'teja', 'tejas', 'zinc',
    'gotera en techo', 'remodelacion', 'ampliacion', 'demolicion', 'muro', 'pared', 'paredes', 'cimientos',
    'escalera', 'fachada', 'obra blanca', 'obra gris', 'pozo septico'
  ],
  'cielorrasos-drywall': [
    'cielorraso', 'cielo raso', 'cielos rasos', 'cielorrasos', 'pvc', 'techo en pvc', 'cielo raso en pvc',
    'drywall', 'durlock', 'yeso', 'tablaroca', 'muro en drywall', 'division', 'divisiones', 'techo falso',
    'cielo falso', 'moldura', 'molduras', 'ojos de buey', 'luces led empotradas', 'perfileria', 'omega',
    'aislamiento termico', 'dilatacion', 'cornisas'
  ],
  'oficial-ayudante': [
    'oficial', 'oficial de obra', 'oficial practico', 'ayudante', 'ayudantes', 'ayudante raso',
    'ayudante practico', 'ayudante de construccion', 'ayudante de albanil', 'ayudante de electricista',
    'mezclas', 'hacer mezcla', 'cargar bultos', 'cargar arena', 'demoler', 'picar pared', 'hacer zanja',
    'peon', 'peones', 'jornal', 'jornalero', 'mano de obra', 'descargar materiales'
  ],
  pintor: [
    'pintor', 'pintores', 'pintar', 'pintura', 'pintar casa', 'fachada', 'fachadas', 'interiores',
    'estuco', 'estucador', 'empastar', 'vinilo', 'esmalte', 'anticorrosivo', 'pintar rejas', 'pintar porton',
    'impermeabilizacion', 'impermeabilizar', 'placa', 'filtracion de humedad', 'descascarado', 'barniz',
    'laca', 'grafilado', 'veneciano', 'epoxica', 'rodillo', 'brocha'
  ],
  cerrajero: [
    'cerrajero', 'cerrajeria', 'chapa', 'chapas', 'llave', 'llaves', 'copia de llave', 'duplicado de llave',
    'abrir puerta', 'puerta trabada', 'puerta bloqueada', 'se me quedaron las llaves', 'candado', 'candados',
    'cerrojo', 'guardas', 'cambio de guarda', 'cambio de clave', 'chapa danada', 'cerradura', 'ganzua',
    'chapa de seguridad'
  ],
  'tecnico-electrodomesticos': [
    'tecnico', 'electrodomesticos', 'nevera', 'neveras', 'congelador', 'enfriador', 'vitrina refrigerada',
    'no enfria', 'bota agua', 'lavadora', 'lavadoras', 'no centrifuga', 'no bota agua', 'aire acondicionado',
    'aires', 'minisplit', 'mantenimiento de aire', 'carga de gas', 'refrigerante', 'r410a', 'r134a',
    'microondas', 'ventilador', 'abanico', 'licuadora', 'estufa', 'horno', 'tarjeta electronica', 'refrigeracion'
  ],
  'servicio-domestico': [
    'servicio domestico', 'empleada domestica', 'aseadora', 'muchacha del servicio', 'aseo', 'limpieza',
    'aseo por dias', 'limpieza profunda', 'lavar ropa', 'planchar', 'cocinar', 'cocinera', 'aseo de casa',
    'aseo de oficina', 'limpieza de locales', 'desinfeccion'
  ],
  'guadanador-jardinero': [
    'guadanador', 'guadanar', 'guadana', 'guadanyador', 'cortar pasto', 'cortar prado', 'desmalezar',
    'desmonte', 'limpiar lote', 'limpiar solar', 'monte', 'enmontado', 'maleza', 'rastrojo', 'jardin',
    'jardinero', 'jardineria', 'podar cesped', 'fumigar lote', 'herbicida', 'glifosato', 'orilladora', 'pasto'
  ],
  mecanico: [
    'mecanico', 'mecanica', 'taller de motos', 'moto', 'motos', 'motocarro', 'carro', 'automovil',
    'pinchada', 'despinche', 'parche', 'neumatico', 'llanta', 'cambio de aceite', 'frenos', 'pastillas de freno',
    'cadena', 'kit de arrastre', 'carburador', 'inyeccion', 'bateria', 'no prende', 'varado', 'sincronizacion'
  ],
  fumigador: [
    'fumigador', 'fumigacion', 'fumigar', 'plagas', 'control de plagas', 'comejen', 'termitas', 'madera picada',
    'cucarachas', 'cucaracha', 'zancudos', 'mosquitos', 'dengue', 'ratas', 'ratones', 'roedores', 'veneno',
    'polilla', 'garrapatas', 'pulgas', 'desinfeccion de casas'
  ],
  'acarreos-trasteos': [
    'acarreo', 'acarreos', 'trasteo', 'trasteos', 'mudanza', 'mudanzas', 'flete', 'fletes', 'viaje', 'viajes',
    'camioneta', 'camion', 'transporte de carga', 'llevar muebles', 'cambio de casa', 'carga pesada',
    'traslado de enseres'
  ],
  motocarguero: [
    'motocarguero', 'motocarro', 'motocarro de carga', 'mototaxi de carga', 'acarreo pequeno', 'acarreo rapido',
    'llevar bultos', 'cemento', 'varillas', 'cilindro de gas', 'mercado grande', 'viaje en el pueblo',
    'transporte barato'
  ],
  'poda-tala': [
    'poda', 'tala', 'podar arbol', 'talar arbol', 'arbol', 'arboles', 'cortar arbol', 'motosierra',
    'ramas peligrosas', 'descope', 'arbol caido', 'despejar redes', 'motosierrista', 'poda ornamental'
  ],
  'reparacion-herramientas': [
    'reparacion de herramientas', 'arreglar guadana', 'arreglar motosierra', 'afilar cadena', 'motobomba',
    'motor dos tiempos', 'carburar guadana', 'repuestos de guadana', 'podadora', 'motosierras', 'guadanas',
    'mantenimiento de motores'
  ],
  'soldador-estructuras': [
    'soldador', 'soldadura', 'soldar', 'taller de soldadura', 'hierro', 'reja', 'rejas', 'porton', 'portones',
    'puerta metalica', 'puerta de hierro', 'ventana', 'ventanas', 'cerramiento', 'techo metalico', 'estructura metalica',
    'bisagra', 'bisagras', 'galpon', 'pasamanos', 'baranda', 'electrodo', 'pulidora', 'cortina metalica'
  ],
  'otros-oficios': [
    'carpintero', 'carpinteria', 'madera', 'tapicero', 'tapiceria', 'zapatero', 'arreglos', 'instalador',
    'vidriero', 'vidrios', 'espejos', 'aluminio'
  ],
};

// Main intelligent search matcher
export function filterProvidersSmart(
  providers: Provider[],
  searchQuery: string,
  selectedCategorySlug: string | null,
  municipality: Municipality
): { matchedProviders: Provider[]; detectedCategorySlug: string | null } {
  const normQuery = normalizeText(searchQuery);

  // 1. Detect if query relates to a specific category through the colloquial dictionary
  let detectedCategorySlug: string | null = null;
  if (normQuery) {
    for (const [slug, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      const directMatch = keywords.some((kw) => {
        const normKw = normalizeText(kw);
        return normQuery === normKw || normQuery.includes(normKw) || (normKw.length > 3 && normKw.includes(normQuery));
      });
      if (directMatch) {
        detectedCategorySlug = slug;
        break;
      }
    }
  }

  // 2. Extract meaningful search words (excluding stopwords like "de", "la", "el", etc.)
  const meaningfulWords = normQuery
    .split(' ')
    .filter((w) => w.length >= 3 && !SPANISH_STOPWORDS.has(w));

  // 3. Filter the provider list
  const matched = providers.filter((p) => {
    // Must be active and match municipality
    if (p.status !== 'active') return false;
    if (p.municipality !== municipality) return false;

    // If a category pill is explicitly selected
    if (selectedCategorySlug) {
      const hasCat =
        p.categorySlug === selectedCategorySlug ||
        (Array.isArray(p.categorySlugs) && p.categorySlugs.includes(selectedCategorySlug));
      if (!hasCat) return false;
    }

    // If no search query, provider matches
    if (!normQuery) return true;

    // IF A SPECIFIC CATEGORY WAS DETECTED (e.g. "fuga de agua" -> "plomero")
    // Prioritize providers who actually do this category!
    if (detectedCategorySlug) {
      const isDirectCat = p.categorySlug === detectedCategorySlug;
      const isMultiCat = Array.isArray(p.categorySlugs) && p.categorySlugs.includes(detectedCategorySlug);
      if (isDirectCat || isMultiCat) return true;
    }

    // Check textual matches in provider fields
    const normName = normalizeText(p.name);
    const normCatName = normalizeText(p.categoryName);
    const normDesc = normalizeText(p.description);
    const normCover = normalizeText(p.neighborhoodsCovered);
    const normCustom = p.customCategory ? normalizeText(p.customCategory) : '';
    const normServices = Array.isArray(p.servicesOffered)
      ? p.servicesOffered.map((s) => normalizeText(s)).join(' ')
      : '';
    const normMultiCatNames = Array.isArray(p.categoryNames)
      ? p.categoryNames.map((c) => normalizeText(c)).join(' ')
      : '';

    // Direct phrase match in full fields
    const matchesPhrase =
      normName.includes(normQuery) ||
      normCatName.includes(normQuery) ||
      normMultiCatNames.includes(normQuery) ||
      normDesc.includes(normQuery) ||
      normServices.includes(normQuery) ||
      normCover.includes(normQuery) ||
      normCustom.includes(normQuery);

    if (matchesPhrase) return true;

    // Only match words if we have meaningful non-stopword tokens AND no category was specifically detected
    if (!detectedCategorySlug && meaningfulWords.length > 0) {
      const matchesMeaningfulWord = meaningfulWords.some(
        (w) =>
          normName.includes(w) ||
          normCatName.includes(w) ||
          normMultiCatNames.includes(w) ||
          normDesc.includes(w) ||
          normServices.includes(w)
      );
      return matchesMeaningfulWord;
    }

    return false;
  });

  return {
    matchedProviders: matched,
    detectedCategorySlug,
  };
}
