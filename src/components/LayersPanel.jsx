import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { IconButton } from '@/components/ui/button';

export default function LayersPanel({ layers, setLayers, selectLayer }) {
  const moveLayer = (index, direction) => {
    setLayers(prev => {
      const newLayers = [...prev];
      const target = index + direction;
      if (target < 0 || target >= newLayers.length) return newLayers;
      [ newLayers[index], newLayers[target] ] = [ newLayers[target], newLayers[index] ];
      return newLayers;
    });
  };

  return (
    <div className="p-2 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-2">Layers</h3>
      <ul className="space-y-1">
        {layers.map((layer, i) => (
          <li key={layer.id} className="flex items-center justify-between p-1 hover:bg-gray-100 rounded">
            <span className="flex-1 cursor-pointer" onClick={() => selectLayer(layer.id)}>
              {layer.name}
            </span>
            <div className="flex space-x-1">
              <IconButton size="sm" onClick={() => moveLayer(i, -1)} disabled={i===0} aria-label="Up">
                <ArrowUp size={16}/>
              </IconButton>
              <IconButton size="sm" onClick={() => moveLayer(i, 1)} disabled={i===layers.length-1} aria-label="Down">
                <ArrowDown size={16}/>
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
