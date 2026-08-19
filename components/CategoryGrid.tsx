'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/data';
import { CategoryIcon } from './IconHelper';
import { Provider } from '@/lib/types';

interface CategoryGridProps {
  selectedCategorySlug: string | null;
  onSelectCategory: (slug: string | null) => void;
  providers: Provider[];
}

export function CategoryGrid({
  selectedCategorySlug,
  onSelectCategory,
  providers,
}: CategoryGridProps) {
  // Count active providers that have this category (either as primary or in their multi-category list)
  const countByCategory = (slug: string) => {
    return providers.filter((p) => {
      if (p.status !== 'active') return false;
      if (p.categorySlug === slug) return true;
      if (Array.isArray(p.categorySlugs) && p.categorySlugs.includes(slug)) return true;
      return false;
    }).length;
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Categorías de Servicios y Oficios
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Toca una categoría para ver los trabajadores que la realizan
          </p>
        </div>
        {selectedCategorySlug && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Ver todas las categorías ✕
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategorySlug === cat.slug;
          const count = countByCategory(cat.slug);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
              className={`text-left p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-linear-to-b from-emerald-600 to-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/20 scale-[1.02]'
                  : 'bg-white hover:bg-amber-50/40 border-slate-200/80 hover:border-amber-300 text-slate-800 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-100/70 text-amber-800 group-hover:bg-amber-200 group-hover:text-amber-900'
                    }`}
                  >
                    <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                  </div>
                  {cat.popular && !isSelected && (
                    <span className="text-[9px] font-extrabold uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-md">
                      Popular
                    </span>
                  )}
                </div>

                <h3
                  className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                    isSelected ? 'text-white' : 'text-slate-900 group-hover:text-amber-900'
                  }`}
                >
                  {cat.name}
                </h3>
              </div>

              <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between text-[11px]">
                <span
                  className={
                    isSelected
                      ? 'text-emerald-100 font-medium'
                      : 'text-slate-400 font-medium'
                  }
                >
                  {count > 0 ? `${count} disponible${count > 1 ? 's' : ''}` : 'Ver oficio'}
                </span>
                <span
                  className={`font-bold ${
                    isSelected ? 'text-white' : 'text-emerald-700 group-hover:translate-x-0.5'
                  } transition-transform`}
                >
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
