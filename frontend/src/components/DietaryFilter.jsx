import React from 'react';
import { Filter, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

const filterOptions = [
  { id: 'All', label: 'All Recipes' },
  { id: 'Budget', label: 'Under $3 / Serving' },
  { id: 'Vegan', label: 'Vegan' },
  { id: 'Gluten-Free', label: 'Gluten-Free' },
  { id: 'High-Protein', label: 'High Protein' }
];

const DietaryFilter = () => {
  const { dietaryFilter, setDietaryFilter } = useStore();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-charcoal/70 bg-cream/50 rounded-full border border-cream">
        <Filter className="w-3.5 h-3.5 text-gold" />
        <span>Filter By:</span>
      </div>
      {filterOptions.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setDietaryFilter(opt.id)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
            dietaryFilter === opt.id
              ? 'bg-gold text-white shadow-soft scale-105'
              : 'bg-white text-muted border border-cream hover:border-gold hover:text-charcoal'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default DietaryFilter;
