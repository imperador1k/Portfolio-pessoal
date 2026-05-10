import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

// Topologia simplificada do mundo
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function LocationMap() {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] relative overflow-hidden group">
      
      {/* Cabeçalho do Card */}
      <div className="mb-6 flex items-center justify-between relative z-10">
        <h4 className="text-xl font-black text-slate-900 tracking-tighter">The Basecamp</h4>
        <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
           <MapPin className="w-3.5 h-3.5 text-[#FC4C02]" />
           <span className="text-[10px] font-black text-[#FC4C02] uppercase tracking-widest">Portugal, GMT+1</span>
        </div>
      </div>

      <p className="text-slate-500 text-sm font-medium mb-8 relative z-10">
         Disponível para trabalho remoto global asíncrono. Localizado no fuso horário da Europa Ocidental.
      </p>

      {/* Container do Mapa - Centrado na Europa/Portugal */}
      <div className="-mx-8 -mb-16 mt-4 relative h-[300px] overflow-hidden pointer-events-none select-none flex justify-center items-center">
         {/* Gradientes para suavizar as bordas */}
         <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
         
         <ComposableMap
            projection="geoOrthographic"
            projectionConfig={{
               rotate: [-15, -35, 0], // Foca na Europa/Oceano Atlântico
               scale: 350 // Zoom equilibrado para o globo
            }}
            className="w-full h-full opacity-80"
         >
            {/* Opcional: Adicionar a cor do oceano, um círculo base */}
            <circle cx="400" cy="300" r="350" fill="#f8fafc" />

            <Geographies geography={geoUrl}>
               {({ geographies }) =>
                  geographies.map((geo) => (
                     <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#e2e8f0" // slate-200
                        stroke="#cbd5e1" // slate-300
                        strokeWidth={0.5}
                        style={{
                           default: { outline: "none" },
                           hover: { fill: "#cbd5e1", outline: "none" },
                           pressed: { outline: "none" },
                        }}
                     />
                  ))
               }
            </Geographies>

            {/* Marcador de Portugal (Long, Lat) */}
            <Marker coordinates={[-9.1393, 38.7223]}>
               <g fill="none" stroke="#FC4C02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(-12, -24)">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" fill="white" />
                  <circle cx="12" cy="10" r="3" fill="#FC4C02" />
               </g>
               
               {/* Pulsar Animado Laranja */}
               <motion.circle 
                  cx="0" 
                  cy="0" 
                  r="6" 
                  fill="#FC4C02" 
                  opacity="0.3"
                  animate={{ r: [6, 24], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
               />
            </Marker>
         </ComposableMap>
      </div>
    </div>
  );
}