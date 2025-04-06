"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Auto in- en verkoop",
    summary:
      "Wij kopen en verkopen betrouwbare occasions tegen eerlijke prijzen.",
    details:
      "Bij Albazar Autoservice kunt u terecht voor de aankoop van betrouwbare occasions en het verkopen van uw voertuig tegen scherpe condities. Wij verzorgen alles van taxatie tot vrijwaring.",
  },
  {
    title: "Auto Export-Import",
    summary:
      "Volledige RDW-exportdienstverlening inclusief verzekering en tijdelijke kentekenplaten.",
    details: `
RDW EXPORT DIENSTVERLENING

Als u uw auto wilt exporteren, dan dient de auto te worden uitgeschreven uit het Nederlands kentekenregister. Bij Albazar Autoservice regelen wij dat graag voor u!

Om een auto voor u te kunnen exporteren dienen wij te beschikken over een aantal zaken:

- Originele Nederlandse kentekenplaten  
- Afgelezen kilometerstand van het voertuig  
- Kentekenpapieren of kentekenkaart met tenaamstellingscodes  
- Geldig legitimatiebewijs van diegene die de auto exporteert  

Na goedkeuring ontvangt u van ons:

- Kentekenbewijs deel II  
- Vrijwaringsbewijs  

Let op: rijden op de openbare weg is daarna niet meer toegestaan zonder tijdelijke verzekering. Wij kunnen tijdelijke verzekering + witte platen voor 14 dagen regelen indien nodig.

Tarieven vanaf 01-01-2023:

- Exportpapieren: € 40  
- SOC Papieren: € 75  
- Export + verzekering (14 dagen) + platen: € 150,-
`,
  },
  {
    title: "Alle soorten reparaties",
    summary: "Van kleine storingen tot complete motorrevisies.",
    details:
      "Wij voeren alle soorten reparaties uit, van kleine problemen tot grote mechanische herstellingen. Altijd met garantie en heldere communicatie.",
  },
  {
    title: "Schade afwikkeling en reparatie",
    summary:
      "Volledige schadeherstelservice inclusief verzekeringsafhandeling.",
    details:
      "Wij nemen het volledige schadeproces voor u uit handen, inclusief contact met uw verzekering, herstel van de schade en het in originele staat brengen van uw voertuig.",
  },
  {
    title: "Autobandenafdeling",
    summary: "Nieuwe banden, balanceren en uitlijnen – alles onder één dak.",
    details:
      "Wij bieden een ruim assortiment aan banden, snelle montage, uitlijnen en balanceren zodat u weer veilig de weg op kunt.",
  },
  {
    title: "Airco-service",
    summary: "Onderhoud en bijvullen van uw aircosysteem.",
    details:
      "Een goed werkende airco verhoogt het comfort en de veiligheid. Wij controleren, reinigen en vullen uw airco bij wanneer nodig.",
  },
  {
    title: "Financiering",
    summary: "Mogelijkheden voor het financieren van uw nieuwe auto.",
    details:
      "Wij helpen u met passende financieringsopties zodat u uw droomauto direct kunt rijden. Vraag naar de mogelijkheden in onze showroom.",
  },
];

export default function ServicesSection() {
  const [expanded, setExpanded] = useState([]);

  const toggle = (index) => {
    setExpanded((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="services"
      className="relative px-4 sm:px-6 py-12 overflow-hidden"
    >
      {/* 🔳 Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("/images/garage-bg.jpg")' }}
      />

      {/* 🔲 Overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />

      {/* 🔤 Content */}
      <div className="relative z-20 w-full max-w-4xl text-yellow-100">
        <h2 className="text-3xl font-bold text-yellow-400 mb-10 text-center">
          Onze Diensten
        </h2>

        <div className="space-y-4">
          {services.map((service, i) => (
            <div
              key={i}
              className="border border-yellow-600 dark:border-yellow-400 rounded bg-black/30 backdrop-blur"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-4 py-3 flex justify-between items-center font-semibold text-yellow-300 hover:text-yellow-100"
              >
                <span>{service.title}</span>
                <span>{expanded.includes(i) ? "▲" : "▼"}</span>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  expanded.includes(i)
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden px-4 pb-4 text-sm text-yellow-200 whitespace-pre-line"
              >
                <p className="font-medium mb-2">{service.summary}</p>
                {expanded.includes(i) && <div>{service.details}</div>}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
