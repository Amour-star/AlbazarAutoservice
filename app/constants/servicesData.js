const servicesData = {
  en: [
    {
      title: "Vehicle Purchase & Sale",
      description:
        "We buy and sell reliable used cars. Let us help you find or sell your vehicle with honest advice and great service.",
    },
    {
      title: "Export & Import Services",
      description:
        "We handle the entire import/export process including RDW documents and international transport – fast and hassle-free.",
    },
    {
      title: "All Types of Repairs",
      description:
        "From engine diagnostics to brakes and electronics — our expert mechanics are ready for any issue.",
    },
    {
      title: "Damage Repair & Insurance Handling",
      description:
        "We handle both the damage and the paperwork. From small scratches to major collisions — your car is in good hands.",
    },
    {
      title: "Tire Services",
      description:
        "Tire sales, seasonal changes, mounting, balancing and alignment — quick and professional.",
    },
    {
      title: "Air Conditioning Service",
      description:
        "Diagnosis, refill, and cleaning of your car’s air conditioning system. Stay cool and fresh all year.",
    },
    {
      title: "Financing Options",
      description:
        "Flexible car financing solutions tailored to your budget. We help you drive away stress-free.",
    },
    {
      title: "Paintless Dent Removal",
      description:
        "Using advanced techniques, we remove dents without repainting — affordable and efficient.",
    },
    {
      title: "Scratch Removal",
      description:
        "From surface marks to deep scratches — send photos and receive a fair quote fast.",
    },
    {
      title: "Spot Repair",
      description:
        "A fast, eco-friendly solution for small paint damage — restored without repainting the whole panel.",
    },
    {
      title: "Partial or Full Car Painting",
      description:
        "Our professional spray booth delivers showroom-quality paint jobs, whether it’s one panel or the whole car.",
    },
    {
      title: "Cosmetic Repairs",
      description:
        "Visible scratches, dents, and trims — we restore them all. Upload photos and get a quote in 24h.",
    },
    {
      title: "Complete Body Repair",
      description:
        "We fully restore body damage, scratches, paint, and parts to like-new condition.",
    },
    {
      title: "Maintenance & Oil Changes",
      description:
        "Small and full services, including oil changes, filters, brakes and more — keep your car in top shape.",
    },
    {
      title: "Battery Replacement",
      description:
        "Battery problems? We test and replace your battery on the spot.",
    },
    {
      title: "Vehicle Wrapping & Styling",
      description:
        "Wrap your car in black gloss or any color you like — stylish, durable, and protective.",
    },
    {
      title: "Remote Start System",
      description:
        "Start your car remotely using a key or app — ideal in cold or hot weather.",
    },
    {
      title: "Interior & Exterior Cleaning",
      description:
        "Deep cleaning for both interior and exterior — fresh, clean, and shiny results guaranteed.",
    },
    {
      title: "Polishing",
      description:
        "We remove fine scratches and oxidation for a showroom-quality shine.",
    },
    {
      title: "Detailing & Cosmetic Enhancements",
      description:
        "We offer paint sealing, chrome restoration, interior care, and more to perfect your car’s look.",
    },
    {
      title: "Comfort Services",
      description:
        "Wi-Fi waiting lounge, great coffee, and a pickup & drop-off service — old-school service with modern touches.",
    },
    {
      title: "Why Albazar?",
      description:
        "Skilled mechanics, fair prices, quick service, and full insurance support. We treat your car like our own.",
    },
  ],
  nl: [
    {
      title: "Auto in- en verkoop",
      description:
        "Wij kopen en verkopen betrouwbare occasions. Laat ons je helpen bij aankoop of verkoop met eerlijk advies en service.",
    },
    {
      title: "Export & import van voertuigen",
      description:
        "Wij regelen het volledige import/exportproces inclusief RDW-documenten en internationaal transport – snel en zorgeloos.",
    },
    {
      title: "Alle soorten reparaties",
      description:
        "Van motordiagnose tot remmen en elektronica — onze experts lossen elk probleem op.",
    },
    {
      title: "Schadeherstel & verzekering",
      description:
        "We regelen zowel de schade als de verzekering. Van kras tot botsing — jouw auto is in goede handen.",
    },
    {
      title: "Bandenservice",
      description:
        "Verkoop, wissel, montage, balanceren en uitlijnen — snel en professioneel.",
    },
    {
      title: "Airco-service",
      description:
        "Diagnose, vulling en reiniging van de airco – frisse lucht in elk seizoen.",
    },
    {
      title: "Financieringsopties",
      description:
        "Flexibele autoleningen op maat. Wij helpen je snel en zorgeloos op weg.",
    },
    {
      title: "Uitdeuken zonder spuiten",
      description:
        "Met geavanceerde technieken verwijderen we deuken zonder te spuiten — voordelig en netjes.",
    },
    {
      title: "Krassen verwijderen",
      description:
        "Van oppervlakkige tot diepe krassen — stuur foto's en ontvang snel een eerlijke offerte.",
    },
    {
      title: "Spotrepair",
      description:
        "Snelle, milieuvriendelijke oplossing voor kleine lakschade — zonder het hele paneel te spuiten.",
    },
    {
      title: "Spuiten (deel of volledig)",
      description:
        "In onze professionele spuitcabine zorgen wij voor een perfect eindresultaat – groot of klein.",
    },
    {
      title: "Cosmetisch herstel",
      description:
        "Zichtbare schade of bekleding? Upload foto's en ontvang binnen 24 uur een prijsopgave.",
    },
    {
      title: "Volledig carrosserieherstel",
      description:
        "We herstellen schade, lak en onderdelen volledig — alsof hij net uit de showroom komt.",
    },
    {
      title: "Onderhoud en olie verversen",
      description:
        "Van kleine tot grote beurt, inclusief olie, filters en remmen — alles voor een betrouwbare auto.",
    },
    {
      title: "Accu vervangen",
      description: "Startproblemen? We testen en vervangen je accu direct.",
    },
    {
      title: "Auto folieren & styling",
      description:
        "Kies zwart glanzend of elke andere kleur – strak gewrapt en beschermd.",
    },
    {
      title: "Afstandsbediening starten",
      description:
        "Start je auto op afstand via sleutel of app – ideaal bij kou of hitte.",
    },
    {
      title: "Interieur- en exterieurreiniging",
      description:
        "Dieptereiniging van binnen en buiten — fris, schoon en glanzend resultaat gegarandeerd.",
    },
    {
      title: "Polijsten",
      description:
        "Fijne krasjes en doffe lak verdwijnen — wij geven je auto zijn glans terug.",
    },
    {
      title: "Detailing & verzorging",
      description:
        "Lakverzegeling, interieurverzorging, chroomherstel — wij laten je auto schitteren.",
    },
    {
      title: "Comfortservices",
      description:
        "WiFi-lounge, heerlijke koffie en haal- & brengservice – ouderwetse service in een modern jasje.",
    },
    {
      title: "Waarom Albazar?",
      description:
        "Ervaren monteurs, eerlijke prijzen, snelle service en hulp bij schade – jouw auto is bij ons veilig.",
    },
  ],
  ar: [
    {
      title: "شراء وبيع السيارات",
      description:
        "نشتري ونبيع سيارات مستعملة موثوقة. نساعدك على الشراء أو البيع بنصائح صادقة وخدمة ممتازة.",
    },
    {
      title: "خدمات التصدير والاستيراد",
      description:
        "نقوم بكافة إجراءات التصدير والاستيراد، بما في ذلك وثائق RDW والنقل الدولي بسرعة وبدون عناء.",
    },
    {
      title: "جميع أنواع الإصلاحات",
      description:
        "من تشخيص الأعطال إلى الفرامل والإلكترونيات — خبراؤنا جاهزون لحل أي مشكلة.",
    },
    {
      title: "إصلاح الأضرار والتأمين",
      description:
        "نتولى إصلاح الضرر والتعامل مع شركة التأمين. من الخدوش البسيطة إلى الحوادث الكبرى.",
    },
    {
      title: "خدمة الإطارات",
      description:
        "بيع وتبديل وتركيب الإطارات مع التوازن والمحاذاة — بسرعة واحترافية.",
    },
    {
      title: "خدمة التكييف",
      description: "تشخيص وتعبئة وتنظيف نظام التكييف — هواء نقي طوال العام.",
    },
    {
      title: "خيارات التمويل",
      description:
        "تمويل مخصص يناسب ميزانيتك. نساعدك على اقتناء سيارتك بسهولة.",
    },
    {
      title: "إزالة الصدمات بدون طلاء",
      description:
        "نستخدم تقنيات متقدمة لإزالة الصدمات بدون دهان — بسرعة وتكلفة منخفضة.",
    },
    {
      title: "إزالة الخدوش",
      description:
        "من الخدوش السطحية إلى العميقة — أرسل الصور واحصل على عرض سعر سريع.",
    },
    {
      title: "تصليح البقع",
      description:
        "حل سريع وصديق للبيئة للأضرار الطفيفة في الطلاء — بدون إعادة طلاء كامل.",
    },
    {
      title: "دهان جزئي أو كامل للسيارة",
      description:
        "نقدم خدمة رش احترافية بجودة المعرض – لجزء معين أو السيارة كاملة.",
    },
    {
      title: "إصلاحات تجميلية",
      description:
        "نصلح جميع الأضرار الظاهرة والداخلية — أرسل الصور واحصل على عرض خلال 24 ساعة.",
    },
    {
      title: "إصلاح هيكل كامل",
      description:
        "نُعيد سيارتك إلى حالتها الأصلية بعد أي ضرر في الهيكل أو الطلاء أو القطع.",
    },
    {
      title: "الصيانة وتغيير الزيت",
      description:
        "فحص كامل أو سريع مع تغيير الزيت والفلاتر والفرامل — حافظ على سيارتك بأفضل حال.",
    },
    {
      title: "تبديل البطارية",
      description: "نعمل على اختبار البطارية وتبديلها فورًا في حال وجود مشكلة.",
    },
    {
      title: "تلبيس السيارات وتغيير الشكل",
      description:
        "اختر اللون الذي تريده — تغليف أنيق يحمي ويحسن مظهر السيارة.",
    },
    {
      title: "تشغيل السيارة عن بعد",
      description:
        "ابدأ تشغيل سيارتك عن بعد باستخدام المفتاح أو التطبيق — مثالي للبرد أو الحر.",
    },
    {
      title: "تنظيف داخلي وخارجي",
      description:
        "تنظيف شامل للمقصورة والهيكل الخارجي — نتائج لامعة ونظافة تامة.",
    },
    {
      title: "تلميع السيارة",
      description:
        "نزيل الخدوش البسيطة والأكسدة — لتألق يشبه السيارات الجديدة.",
    },
    {
      title: "التجميل الداخلي والتفاصيل",
      description:
        "نقدم العناية الداخلية، طلاء الحماية، استعادة الكروم والمزيد — لتبدو سيارتك بأجمل صورة.",
    },
    {
      title: "خدمات الراحة",
      description:
        "منطقة انتظار مريحة مع Wi-Fi وقهوة رائعة وخدمة استلام وتسليم.",
    },
    {
      title: "لماذا البازار؟",
      description:
        "ميكانيكيون محترفون، أسعار شفافة، خدمة سريعة، دعم كامل مع شركات التأمين — سيارتك بأمان معنا.",
    },
  ],
};

export default servicesData;
