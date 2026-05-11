import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Sphere,
  Graticule
} from "react-simple-maps";
import { motion } from "motion/react";
import { MapPin, Plus, Minus, RotateCcw, Globe2, Clock, Map } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

// Topologia simplificada do mundo
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function LocationMap() {
  const { t } = useLanguage();
  // Estado para a Tooltip (nome do país)
  const [tooltipContent, setTooltipContent] = useState("");
  
  // Estado controlado para o Panning/Zoom
  const initialPosition = { coordinates: [-9.1393, 38.7223] as [number, number], zoom: 3.5 };
  const [position, setPosition] = useState(initialPosition);

  // Controlos Programáticos do Zoom
  const handleZoomIn = () => {
    if (position.zoom >= 12) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition(initialPosition);
  };

  const handleMoveEnd = (newPosition: { coordinates: [number, number]; zoom: number }) => {
    setPosition(newPosition);
  };

  return (
    <div className="relative group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full max-w-7xl mx-auto p-8 lg:p-12 bg-white/5 backdrop-blur-[2px] rounded-[2.5rem] border border-slate-200/50 shadow-sm mb-12">
      
      {/* Coluna Esquerda: Informação Narrativa & Tags */}
      <div className="flex-1 w-full space-y-6 z-10 lg:pl-6">
        <div className="inline-flex items-center gap-2 bg-slate-100/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
           <MapPin className="w-3.5 h-3.5 text-[#FC4C02]" />
           <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{t('location_map.badge')}</span>
        </div>

        <div>
           <h4 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
              {t('location_map.title_main')} <br/><span className="text-[#FC4C02]">{t('location_map.title_highlight')}</span>
           </h4>
           <p className="text-slate-600 text-lg leading-relaxed font-medium max-w-lg">
              {t('location_map.description')}
           </p>
        </div>

        {/* Mini stats/badges minimalistas sem fundos pesados */}
        <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-200/50">
           <div className="flex items-center gap-3">
              <div className="bg-slate-100/80 p-2.5 rounded-xl text-slate-600"><Globe2 className="w-5 h-5" /></div>
              <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('location_map.label_location')}</p>
                 <p className="text-sm font-bold text-slate-800">{t('location_map.region')}</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="bg-slate-100/80 p-2.5 rounded-xl text-slate-600"><Clock className="w-5 h-5" /></div>
              <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('location_map.label_timezone')}</p>
                 <p className="text-sm font-bold text-slate-800">{t('location_map.timezone')}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Coluna Direita: Container do Mapa Interativo */}
      <div className="flex-1 w-full relative h-[400px] lg:h-[450px] flex items-center justify-center bg-transparent overflow-visible">
         {/* Interface Overlay do Mapa (Tooltips) */}
         <div className="absolute top-4 z-[60] flex justify-center w-full pointer-events-none transition-opacity duration-300">
           {tooltipContent && (
             <motion.div 
               initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
               className="bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest"
             >
               {tooltipContent}
             </motion.div>
           )}
         </div>
            
         {/* Controlos de Botões Flutuantes UI mais leves que o site transpira */}
         <div className="absolute left-0 bottom-4 z-20 flex flex-col gap-2">
               <button onClick={handleZoomIn} className="bg-slate-100/50 backdrop-blur-md p-2 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-all border border-slate-200/50"><Plus className="w-4 h-4" /></button>
               <button onClick={handleReset} className="bg-slate-100/50 backdrop-blur-md p-2 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-all border border-slate-200/50"><RotateCcw className="w-3.5 h-3.5" /></button>
               <button onClick={handleZoomOut} className="bg-slate-100/50 backdrop-blur-md p-2 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-all border border-slate-200/50"><Minus className="w-4 h-4" /></button>
         </div>

         {/* Bagde de Instrução */}
         <div className="absolute right-0 bottom-4 z-20 flex items-center gap-1.5 bg-slate-100/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
            <Map className="w-3 h-3" /> {t('location_map.interactive')}
         </div>
            
         <ComposableMap
            projection="geoOrthographic"
            width={800} 
            height={800} 
            projectionConfig={{ 
              scale: 300,
              rotate: [-5, -35, 0] // Centra o globo sobre a península Ibérica
            }}
            className="w-full h-[120%] outline-none cursor-grab active:cursor-grabbing transition-transform"
         >
            <ZoomableGroup 
               zoom={position.zoom}
               center={position.coordinates}
               onMoveEnd={handleMoveEnd}
               maxZoom={12} 
               minZoom={1}
               // O geoOrthographic com limites pode ser mais permissivo, 
               // pois é uma esfera e queremos conseguir arrastar
               translateExtent={[[-800, -800], [1600, 1600]]} 
            >
               {/* Esfera Oceânica e Grela */}
               <Sphere stroke="#e2e8f0" strokeWidth={0.5} fill="#f8fafc" id="sphere" />
               <Graticule stroke="#e2e8f0" strokeWidth={0.5} />

               <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                     geographies.map((geo) => (
                        <Geography
                           key={geo.rsmKey}
                           geography={geo}
                           onMouseEnter={() => setTooltipContent(geo.properties.name)}
                           onMouseLeave={() => setTooltipContent("")}
                           fill="#cbd5e1" // Cor dos países (Slate 300)
                           stroke="#f8fafc" // Linhas da fronteira (Slate 50)
                           strokeWidth={0.5}
                           style={{
                              default: { outline: "none", transition: "fill 0.2s" },
                              hover: { fill: "#94a3b8", cursor: "pointer", outline: "none", transition: "fill 0.2s" }, // Slate 400
                              pressed: { outline: "none" },
                           }}
                        />
                     ))
                  }
               </Geographies>

               {/* Marcador em PT */}
               <Marker coordinates={[-9.1393, 38.7223]}>
                  {/* Legenda Estática "PORTUGAL" sempre visível e inconfundível para leigos */}
                  <text x="18" y="-12" textAnchor="start" fill="#slate-900" className="text-[14px] font-black pointer-events-none select-none" style={{ fill: '#0f172a', fontWeight: 900, fontFamily: 'sans-serif' }}>
                     Portugal
                  </text>

                  <g fill="none" stroke="#FC4C02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(-12, -24)">
                     <circle cx="12" cy="10" r="3" />
                     <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" fill="white" />
                     <circle cx="12" cy="10" r="3" fill="#FC4C02" />
                  </g>
                  
                  {/* Pulsar Animado Extraordinário */}
                  <motion.circle 
                     cx="0" cy="0" r="6" fill="#FC4C02" opacity="0.3"
                     animate={{ r: [6, 28], opacity: [0.8, 0] }}
                     transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.circle 
                     cx="0" cy="0" r="6" fill="#FC4C02" opacity="0.5"
                     animate={{ r: [6, 14], opacity: [0.5, 0] }}
                     transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  />
               </Marker>
            </ZoomableGroup>
         </ComposableMap>
      </div>
    </div>
  );
}