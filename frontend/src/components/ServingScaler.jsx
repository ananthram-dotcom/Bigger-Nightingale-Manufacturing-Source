import React, { useState } from 'react';
import { Users, Plus, Minus } from 'lucide-react';

const ServingScaler = ({ baseServings = 2, onScaleChange }) => {
  const [servings, setServings] = useState(baseServings);

  const updateServings = (newVal) => {
    if (newVal < 1 || newVal > 20) return;
    setServings(newVal);
    if (onScaleChange) onScaleChange(newVal / baseServings);
  };

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface rounded-2xl border border-cream text-xs">
      <div className="flex items-center gap-1.5 font-semibold text-charcoal">
        <Users className="w-4 h-4 text-gold" />
        <span>Servings:</span>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-lg border border-cream px-2 py-1 shadow-sm">
        <button
          onClick={() => updateServings(servings - 1)}
          className="p-0.5 text-muted hover:text-charcoal hover:bg-surface rounded transition-colors"
          aria-label="Decrease servings"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="font-bold text-charcoal w-4 text-center">{servings}</span>
        <button
          onClick={() => updateServings(servings + 1)}
          className="p-0.5 text-muted hover:text-charcoal hover:bg-surface rounded transition-colors"
          aria-label="Increase servings"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ServingScaler;
