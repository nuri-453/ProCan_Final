import React from 'react';

export default function CanvasArea({ layers, selectLayer }) {
  return (
    <div className="relative w-full h-[24rem] border-2 border-dashed border-gray-400 bg-white">
      {layers.map(layer => {
        const style = { position: 'absolute', left: layer.x, top: layer.y, cursor: 'pointer' };
        if (layer.type === 'Kare') {
          return <div key={layer.id} style={{...style, width: layer.width, height: layer.height, backgroundColor:'#cbd5e1'}} onClick={()=>selectLayer(layer.id)}/>;
        }
        if (layer.type === 'Daire') {
          return <div key={layer.id} style={{...style, width: layer.width, height: layer.height, borderRadius:'50%', backgroundColor:'#fde68a'}} onClick={()=>selectLayer(layer.id)}/>;
        }
        if (layer.type === 'Metin') {
          return <div key={layer.id} style={{...style, padding:'4px 8px', fontSize:'1rem', color:'#1f2937'}} onClick={()=>selectLayer(layer.id)}>
            {layer.text}
          </div>;
        }
        return null;
      })}
    </div>
  );
}
