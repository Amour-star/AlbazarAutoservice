"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("body");

const services = [
  {
    title: "Auto in- en verkoop",
    description:
      "Betrouwbare in- en verkoop van voertuigen met uitstekende service.",
    fullText: `Wij bieden betrouwbare voertuigen aan en nemen uw auto graag over. Onze deskundige medewerkers zorgen voor een eerlijke beoordeling en soepele afhandeling, zodat u zonder zorgen uw auto kunt kopen of verkopen. Neem vandaag nog contact met ons op voor persoonlijk advies en een scherpe offerte!`,
  },
  {
    title: "Auto Export-Import",
    description: "Wij regelen volledige RDW exportdocumenten en verzekering.",
    fullText: `RDW EXPORT DIENSTVERLENING

Als u uw auto wilt exporteren, dan dient de auto te worden uitgeschreven uit het Nederlands kentekenregister. Bij Car Vision Epe regelen wij dat graag voor u!

Voertuig exporteren RDW
Om een auto voor u te kunnen exporteren dienen wij te beschikken over een aantal zaken. Alleen met deze documenten kunnen wij de auto officieel afmelden bij de RDW. Als de export is goedgekeurd bent u gevrijwaard van het betalen van wegenbelasting en uw verzekering.

De volgende zaken en documenten hebben wij nodig om te exporteren:
• Originele Nederlandse kentekenplaten
• Afgelezen kilometerstand van het voertuig
• Kentekenpapieren of kentekenkaart met tenaamstellingscodes
• Geldig legitimatiebewijs

Na export ontvangt u:
• Kentekenbewijs deel II
• Vrijwaringsbewijs

Als u rijdend het land wilt verlaten, kunnen wij tijdelijke verzekering + witte kentekenplaten verzorgen (14 dagen geldig, voertuig moet APK-gekeurd zijn).

Tarieven per 01-01-2023:
• Export papieren: €40
• SOC papieren: €75
• Export + verzekering + platen: €150

Voor meer informatie of afspraak: stuur ons een bericht.`,
  },
  {
    title: "Alle soorten reparaties",
    description: "Van motor tot elektronica – wij herstellen alles vakkundig.",
    fullText: `Onze werkplaats is uitgerust voor alle soorten autoreparaties, van mechanische storingen tot complexe elektronische problemen. Onze ervaren monteurs gebruiken moderne diagnoseapparatuur en originele onderdelen om uw voertuig snel en professioneel te herstellen. Wij staan garant voor kwaliteit, transparantie en snelle service.`,
  },
  {
    title: "Schade afwikkeling en reparatie",
    description: "Volledige begeleiding bij schade en herstel.",
    fullText: `Heeft u schade aan uw voertuig opgelopen? Wij begeleiden u volledig in het proces van schadeafwikkeling en reparatie. Van contact met de verzekering tot professionele herstelling van uw auto – wij zorgen ervoor dat alles snel, zorgvuldig en zonder stress verloopt. Onze experts staan voor u klaar met transparant advies en hoogwaardige service.`,
  },
  {
    title: "Autobandenafdeling",
    description: "Nieuwe banden, uitlijnen en advies op maat.",
    fullText: `Onze autobandenafdeling biedt een ruim assortiment aan kwaliteitsbanden voor elk seizoen en type voertuig. Wij zorgen voor professionele montage, balanceren en uitlijnen voor optimale veiligheid en rijcomfort. Twijfelt u over de juiste band voor uw auto? Wij geven graag persoonlijk advies dat past bij uw rijstijl en budget.`,
  },
  {
    title: "Airco-service",
    description: "Onderhoud, bijvullen en reparatie van uw airco.",
    fullText: `Een goed werkende airco is essentieel voor comfort en veiligheid in uw voertuig. Wij verzorgen vakkundig onderhoud, controleren op lekkages, vullen het koudemiddel bij en voeren indien nodig reparaties uit. Zo blijft uw airco efficiënt functioneren en bent u voorbereid op warme dagen. Maak vandaag nog een afspraak voor een airco-check!`,
  },
  {
    title: "Financiering",
    description: "Flexibele financieringsmogelijkheden voor uw aankoop.",
    fullText: `Wij bieden diverse financieringsopties aan die aansluiten bij uw persoonlijke situatie. Of het nu gaat om de aankoop van een voertuig of een grote reparatie – wij helpen u graag met een betaaloplossing op maat. Transparante voorwaarden, snelle goedkeuring en professioneel advies zorgen ervoor dat u zorgeloos kunt investeren in uw mobiliteit.`,
  },
  {
    title: "Auto- en Glasfoliering",
    description:
      "Professionele foliering voor auto's en glas ter bescherming en verfraaiing van uw voertuig.",
    fullText: `Wilt u uw auto een compleet nieuwe uitstraling geven of uw ramen beschermen tegen zonlicht en inkijk? Bij ons bent u aan het juiste adres voor professionele auto- en glasfoliering.

Auto foliering
Met auto foliering kunt u eenvoudig en effectief uw auto een frisse, unieke uitstraling geven, zonder permanente lakverandering. Onze hoogwaardige folies beschermen daarnaast uw oorspronkelijke lak tegen steenslag, krassen en weersinvloeden. Kies uit diverse kleuren, finishes (mat, glanzend, satijn) en speciale effecten zoals carbon-look of metallic.

Glasfoliering
Glasfoliering biedt optimale bescherming en privacy voor uw voertuig. De speciale folie beschermt tegen UV-straling en houdt uw interieur koel, terwijl het zicht naar buiten behouden blijft. Onze glasfolies zijn verkrijgbaar in verschillende tinten, van subtiel tot volledig verduisterend.

Onze ervaren specialisten zorgen voor een naadloze, strakke afwerking. Neem vandaag nog contact op voor vrijblijvend advies of een offerte op maat!`,
  },
];

export default function ServicesSection() {
  const [modalContent, setModalContent] = useState(null);

  return (
    <section
      id="services"
      className="relative z-10 bg-[#0f0f0f] text-white px-4 py-8 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Onze Diensten</h2>
        <div className="w-40 h-1 bg-yellow-400 mx-auto mb-8" />
      </motion.div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-zinc-800 text-white rounded shadow p-4 w-full max-w-xs text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
            <p className="text-sm text-gray-300">
              {service.fullText ? (
                <>
                  {service.description}
                  <button
                    className="ml-2 text-yellow-400 underline text-sm"
                    onClick={() => setModalContent(service.fullText)}
                  >
                    Lees meer
                  </button>
                </>
              ) : (
                service.description
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        className="max-w-3xl bg-white dark:bg-zinc-900 p-6 rounded shadow-lg mx-auto my-20 relative text-black dark:text-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <button
          onClick={() => setModalContent(null)}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-white"
          title="Sluiten"
        >
          ✕
        </button>
        <div className="whitespace-pre-wrap text-sm max-h-[75vh] overflow-y-auto">
          {modalContent}
        </div>
      </Modal>
    </section>
  );
}
