import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { motion } from "motion/react";
import { MapPin, Globe2, Clock, Zap, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function LocationMap() {
  const { t } = useLanguage();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-PT', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      timeZone: 'Europe/Lisbon' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-24 lg:mb-32">
      <div className="relative group overflow-hidden bg-white rounded-[2.5rem] border border-slate-200 shadow-xl">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch min-h-[500px] lg:min-h-[600px]">
          {/* Left Column: Info Card */}
          <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100 bg-white">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#FC4C02]/10 border border-[#FC4C02]/20 px-3 py-1.5 rounded-full mb-8 w-fit"
            >
               <MapPin className="w-3.5 h-3.5 text-[#E03C00]" />
               <span className="text-[10px] font-black text-[#E03C00] uppercase tracking-widest">{t('location_map.badge')}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-[0.9] uppercase">
                {t('location_map.title_main')} <br/>
                <span className="text-[#E03C00]">{t('location_map.title_highlight')}</span>
              </h4>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md mb-12">
                {t('location_map.description')}
              </p>
            </motion.div>

            {/* Live Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{t('location_map.label_timezone')}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                  {formatTime(time)}
                </div>
                <p className="text-[11px] text-[#E03C00] font-medium">Lisboa, Portugal (WET)</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-xl font-bold text-slate-900 uppercase tracking-tight">Disponível</span>
                </div>
                <p className="text-[11px] text-slate-500">{t('location_map.region')}</p>
              </div>
            </div>

            <motion.a
              href="#contactos"
              whileHover={{ x: 5 }}
              className="mt-12 flex items-center gap-2 text-[#E03C00] font-bold text-sm group/btn"
            >
              Vamos trabalhar juntos <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
            </motion.a>
          </div>

          {/* Right Column: Recognizable Map */}
          <div className="flex-1 relative bg-slate-50/50 flex items-center justify-center p-0 overflow-hidden min-h-[400px] lg:min-h-full">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 190, // Aumentado de 140 para preencher mais
                center: [10, 25] // Ajustado para centrar melhor a massa terrestre
              }}
              className="w-full h-full pointer-events-none opacity-80"
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#cbd5e1" // Cinza um pouco mais definido
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Marcador em Portugal */}
              <Marker coordinates={[-9.1393, 38.7223]}>
                <motion.circle 
                  r="12" fill="#FC4C02" opacity="0.2"
                  animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <circle r="5" fill="#FC4C02" stroke="#ffffff" strokeWidth={2} />
                
                {/* Etiqueta de Localização */}
                <foreignObject x="12" y="-40" width="120" height="50">
                  <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-2xl inline-block">
                    <p className="text-[10px] font-black uppercase whitespace-nowrap tracking-wider">Portugal</p>
                    <div className="absolute -bottom-1 left-2 w-2 h-2 bg-slate-900 rotate-45" />
                  </div>
                </foreignObject>
              </Marker>
            </ComposableMap>

            {/* Overlay Info Card */}
            <div className="absolute bottom-10 right-10 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-[#FC4C02]/10 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-[#E03C00]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Localização</p>
                <p className="text-xs font-black text-slate-900">Alcobaça, PT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}