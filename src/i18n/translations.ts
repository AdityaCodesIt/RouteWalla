export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  appName: string;
  tagline: string;
  planMyDay: string;
  exploreDesign: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroBadge: string;
  liveManifest: string;
  activeDeliveries: string;
  nav: {
    home: string;
    plan: string;
    route: string;
    go: string;
    wishlist: string;
    summary: string;
    design: string;
    settings: string;
  };
  actions: {
    addStop: string;
    optimizeRoute: string;
    startRoute: string;
    markDelivered: string;
    nextStop: string;
    callCustomer: string;
    viewMap: string;
    addToWishlist: string;
    resetRoute: string;
    quickAdd: string;
    filter: string;
    highContrast: string;
  };
  priority: {
    high: string;
    medium: string;
    low: string;
    highDesc: string;
    medDesc: string;
    lowDesc: string;
  };
  problem: {
    title: string;
    subtitle: string;
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
    card3Title: string;
    card3Text: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  comparison: {
    title: string;
    subtitle: string;
    featureCol: string;
    gmapsCol: string;
    routewalaCol: string;
  };
  wishlistSection: {
    title: string;
    subtitle: string;
    desc: string;
  };
  privacy: {
    title: string;
    subtitle: string;
    optInLoc: string;
    localOnly: string;
    offlineReady: string;
  };
  stopCard: {
    stop: string;
    eta: string;
    priority: string;
    delivered: string;
    pending: string;
    parcels: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'RouteWala',
    tagline: 'Multi-stop route planner built for Mumbai delivery riders',
    planMyDay: 'Plan My Day',
    exploreDesign: 'View Design System',
    heroHeadline: 'Stop typing addresses with wet fingers in Mumbai traffic.',
    heroSubtitle: 'Turn 15 chaotic WhatsApp delivery addresses into a sequenced, prioritized run. With on-the-way chai and vada pav stops that never add dead kilometers.',
    heroBadge: 'BUILT FOR MUMBAI TRANSIT CONSTRAINTS',
    liveManifest: 'TODAY’S MANIFEST',
    activeDeliveries: 'ACTIVE DELIVERIES',
    nav: {
      home: 'Overview',
      plan: 'Plan Stops',
      route: 'Route Board',
      go: 'Driver Mode',
      wishlist: 'On-the-Way',
      summary: 'Shift Summary',
      design: 'Design Tokens',
      settings: 'Settings',
    },
    actions: {
      addStop: 'Add Delivery Stop',
      optimizeRoute: 'Optimize Mumbai Sequence',
      startRoute: 'Launch Driver Mode',
      markDelivered: 'Delivered (Tap Next)',
      nextStop: 'Next Stop',
      callCustomer: 'Call Customer',
      viewMap: 'View Transit Map',
      addToWishlist: 'Add to On-the-Way',
      resetRoute: 'Reset Manifest',
      quickAdd: 'Quick Add Landmark',
      filter: 'Filter Stops',
      highContrast: 'High Contrast',
    },
    priority: {
      high: 'URGENT PRIORITY',
      medium: 'STANDARD RUN',
      low: 'FLEXIBLE DROP',
      highDesc: 'Time-sensitive medicine / warm food delivery',
      medDesc: 'Scheduled ecommerce delivery window',
      lowDesc: 'Bulk parcel drop or end-of-day return',
    },
    problem: {
      title: 'The Real Mumbai Delivery Grind',
      subtitle: 'Why standard navigation apps fail delivery workers between Churchgate and Borivali',
      card1Title: 'Monsoon S.V. Road Chaos',
      card1Text: 'Water on the touchscreen stops Google Maps from accepting typing. Riders pull over under flyovers just to paste the next parcel address into search.',
      card2Title: 'The Forgotten Vada Pav Wishlist',
      card2Text: 'You planned to grab snacks at Ashok Vada Pav (Dadar) or chai at Kyani & Co, but realized 4km later that your route went right behind it.',
      card3Title: '“Bhaiya Kitna Time Lagega?”',
      card3Text: 'Customers call constantly. When one parcel is flagged urgent, reordering 12 other stops in standard navigation requires 40 frustrating manual taps.',
    },
    howItWorks: {
      title: 'How RouteWala Sequences Your Run',
      subtitle: 'Four tactile steps designed for grease-stained, one-handed phone use',
      step1Title: 'Add stops in seconds',
      step1Desc: 'Paste your WhatsApp manifest, tap Mumbai landmark shortcuts, or enter addresses with quick-pick neighborhood pins.',
      step2Title: 'Set stop priorities',
      step2Desc: 'Flag high-urgency deliveries (medicines, ice cream) so the routing algorithm locks their time-slots first.',
      step3Title: 'Get traffic-smart sequence',
      step3Desc: 'RouteWala sorts stops by geographic corridors, avoiding notorious bottlenecks like Kurla signal and Kalanagar.',
      step4Title: 'Tap Next in 56px Driver Mode',
      step4Desc: 'Massive single-tap buttons, offline-ready ticket stubs, and automatic one-touch customer dialing.',
    },
    comparison: {
      title: 'Google Maps vs RouteWala',
      subtitle: 'Engineered for courier riders, not weekend tourists',
      featureCol: 'Capability',
      gmapsCol: 'Standard Google Maps',
      routewalaCol: 'RouteWala (Courier First)',
    },
    wishlistSection: {
      title: 'On-the-Way Wishlist Stops',
      subtitle: 'Never miss Mumbai’s best chai, snacks, or tyre mechanics',
      desc: 'Pin your personal pitstops. RouteWala alerts you when a drop is within 150m of your pinned tapri, without detouring into traffic.',
    },
    privacy: {
      title: 'Accessibility & Privacy Commitments',
      subtitle: 'No predatory battery drain. No constant background tracking.',
      optInLoc: 'Location strictly on opt-in: works 100% offline with manual milestone taps.',
      localOnly: 'Local-first: your customer phone numbers and parcel manifests stay saved on your device.',
      offlineReady: 'Zero lag in underground basements, Dadar subways, or high-density chawls.',
    },
    stopCard: {
      stop: 'STOP',
      eta: 'ETA',
      priority: 'PRIORITY',
      delivered: 'DELIVERED',
      pending: 'PENDING',
      parcels: 'PARCELS',
    },
  },
  hi: {
    appName: 'रूटवाला',
    tagline: 'मुंबई के डिलीवरी राइडर्स के लिए मल्टी-स्टॉप रूट प्लानर',
    planMyDay: 'आज का रूट प्लान करें',
    exploreDesign: 'डिज़ाइन सिस्टम देखें',
    heroHeadline: 'मुंबई ट्रैफिक में भीगे हाथों से बार-बार एड्रेस टाइप करना बंद करें।',
    heroSubtitle: '15 अलग-अलग व्हाट्सएप एड्रेस को एक ही बार में समझदारी से सजाएं। रास्ते के चाय और वड़ा पाव स्टॉप्स बिना एक्स्ट्रा किलोमीटर के जोड़ें।',
    heroBadge: 'मुंबई ट्रांजिट नियमों के अनुसार निर्मित',
    liveManifest: 'आज की डिलीवरी लिस्ट',
    activeDeliveries: 'सक्रिय पार्सल',
    nav: {
      home: 'होम',
      plan: 'स्टॉप जोड़ें',
      route: 'रूट बोर्ड',
      go: 'ड्राइवर मोड',
      wishlist: 'रास्ते के स्टॉप',
      summary: 'शिफ्ट सारांश',
      design: 'डिज़ाइन टोकन्स',
      settings: 'सेटिंग्स',
    },
    actions: {
      addStop: 'नया स्टॉप जोड़ें',
      optimizeRoute: 'रूट ऑप्टिमाइज़ करें',
      startRoute: 'ड्राइवर मोड शुरू करें',
      markDelivered: 'डिलीवरी पूरी (अगला स्टॉप)',
      nextStop: 'अगला स्टॉप',
      callCustomer: 'ग्राहक को कॉल करें',
      viewMap: 'ट्रांजिट मैप देखें',
      addToWishlist: 'विशलिस्ट में जोड़ें',
      resetRoute: 'लिस्ट रीसेट करें',
      quickAdd: 'प्रसिद्ध लैंडमार्क चुनें',
      filter: 'फ़िल्टर स्टॉप',
      highContrast: 'हाई कंट्रास्ट',
    },
    priority: {
      high: 'अति आवश्यक',
      medium: 'सामान्य डिलीवरी',
      low: 'लचीला समय',
      highDesc: 'दवाइयाँ या गरम खाना डिलीवरी',
      medDesc: 'सामान्य ई-कॉमर्स पार्सल',
      lowDesc: 'दिन के अंत में वापसी या थोक सामान',
    },
    problem: {
      title: 'मुंबई डिलीवरी की असली मुश्किलें',
      subtitle: 'चर्चगेट से बोरीवली के बीच सामान्य नेविगेशन ऐप क्यों फेल हो जाते हैं',
      card1Title: 'मानसून और एस.वी. रोड का जाम',
      card1Text: 'स्क्रीन पर पानी की बूँदें गिरते ही गूगल मैप्स काम नहीं करता। पार्सल एड्रेस ढूंढने के लिए फ्लाईओवर के नीचे रुकना पड़ता है।',
      card2Title: 'छूट जाता है चाय-नाश्ता',
      card2Text: 'अशोक वड़ा पाव या ईरानी चाय पीने की सोची थी, पर 4 किमी आगे जाकर याद आता है कि आप उसी गली से गुजरे थे।',
      card3Title: '“भैया कितना टाइम लगेगा?”',
      card3Text: 'ग्राहक बार-बार कॉल करते हैं। अगर एक पार्सल जल्दी देना हो, तो बाकी 12 स्टॉप्स को दोबारा सेट करने में 15 मिनट बर्बाद होते हैं।',
    },
    howItWorks: {
      title: 'रूटवाला कैसे काम करता है',
      subtitle: 'एक हाथ से फोन चलाने के लिए बनाए गए चार आसान कदम',
      step1Title: 'सेकंडों में स्टॉप जोड़ें',
      step1Desc: 'व्हाट्सएप लिस्ट पेस्ट करें या मुंबई के प्रमुख लैंडमार्क्स पर क्लिक करके स्टॉप बनाएं।',
      step2Title: 'प्राथमिकता तय करें',
      step2Desc: 'ज़रूरी पार्सल को हाई प्रायोरिटी दें ताकि ऐप उन्हें सही समय पर पहले रखे।',
      step3Title: 'स्मार्ट रूट पाएं',
      step3Desc: 'कुर्ला सिग्नल और कलानगर जैसे जाम वाले पॉइंट्स को ध्यान में रखकर सही क्रम बनता है।',
      step4Title: '56px बड़े बटन से अगला स्टॉप दबाएं',
      step4Desc: 'बड़े टच बटन, ऑफलाइन टिकट स्टाइल स्टॉप्स और सिंगल टैप कॉल सुविधा।',
    },
    comparison: {
      title: 'गूगल मैप्स बनाम रूटवाला',
      subtitle: 'डिलीवरी वर्कर्स के लिए खास तौर पर तैयार',
      featureCol: 'सुविधा',
      gmapsCol: 'साधारण गूगल मैप्स',
      routewalaCol: 'रूटवाला (कूरियर विशेष)',
    },
    wishlistSection: {
      title: 'रास्ते के खास स्टॉप्स (विशलिस्ट)',
      subtitle: 'मुंबई की बेहतरीन चाय, नाश्ता या पंचर वाले को कभी न भूलें',
      desc: 'अपने पसंदीदा ठिकाने सेव करें। जब डिलीवरी उसी रास्ते पर होगी, ऐप आपको बिना भटकाए याद दिलाएगा।',
    },
    privacy: {
      title: 'सुलभता और गोपनीयता का वादा',
      subtitle: 'बैटरी बचाने वाला और केवल आपकी अनुमति पर आधारित',
      optInLoc: 'लोकेशन सिर्फ अनुमति से: बिना जीपीएस के भी मैनुअल टिकट के साथ चलता है।',
      localOnly: 'लोकल-फर्स्ट: पार्सल और कस्टमर फोन नंबर आपके ही फोन में सुरक्षित रहते हैं।',
      offlineReady: 'दादर सबवे या बेसमेंट में भी बिना रुके चलता है।',
    },
    stopCard: {
      stop: 'स्टॉप',
      eta: 'पहुंचने का समय',
      priority: 'प्राथमिकता',
      delivered: 'पूरी हुई',
      pending: 'बाकी है',
      parcels: 'पार्सल',
    },
  },
  mr: {
    appName: 'रूटवाला',
    tagline: 'मुंबईतील डिलिव्हरी रायडर्ससाठी मल्टि-स्टॉप रूट प्लॅनर',
    planMyDay: 'माझा दिवस प्लॅन करा',
    exploreDesign: 'डिझाइन सिस्टम पहा',
    heroHeadline: 'मुंबईच्या ट्रॅफिकमध्ये ओल्या बोटांनी वारंवार पत्ते टाईप करणे थांबवा.',
    heroSubtitle: '१५ व्हॉट्सॲप डिलिव्हरी पत्ते एकाच वेळेस क्रमवार लावा. वाटेतील चहा आणि वडापावचे थांबे न चुकता आणि एक्स्ट्रा किलोमीटर न फिरता जोडा.',
    heroBadge: 'मुंबई ट्रॅन्झिट संकेतांवर आधारित रचना',
    liveManifest: 'आजची डिलिव्हरी यादी',
    activeDeliveries: 'सक्रिय पार्सल्स',
    nav: {
      home: 'मुख्य पान',
      plan: 'थांबे जोडा',
      route: 'रूट बोर्ड',
      go: 'ड्रायव्हर मोड',
      wishlist: 'वाटेतील थांबे',
      summary: 'दिवसाचा गोषवारा',
      design: 'डिझाइन टोकन्स',
      settings: 'सेटिंग्ज',
    },
    actions: {
      addStop: 'थांबा जोडा',
      optimizeRoute: 'रूट सुलभ करा',
      startRoute: 'ड्रायव्हर मोड सुरू करा',
      markDelivered: 'डिलिव्हरी झाली (पुढचा थांबा)',
      nextStop: 'पुढचा थांबा',
      callCustomer: 'ग्राहकाला कॉल करा',
      viewMap: 'नकाशा पहा',
      addToWishlist: 'विशलिस्टमध्ये जोडा',
      resetRoute: 'यादी रीसेट करा',
      quickAdd: 'प्रसिद्ध ठिकाण निवडा',
      filter: 'फिल्टर करा',
      highContrast: 'हाय कॉन्ट्रास्ट',
    },
    priority: {
      high: 'अति तातडीचे',
      medium: 'नेहमीचा क्रम',
      low: 'लवचिक वेळ',
      highDesc: 'औषधे किंवा गरम जेवण',
      medDesc: 'नियमित ई-कॉमर्स पार्सल',
      lowDesc: 'दिवसाच्या शेवटी द्यायचे पार्सल',
    },
    problem: {
      title: 'मुंबई डिलिव्हरीतील प्रत्यक्ष आव्हाने',
      subtitle: 'चर्चगेट ते बोरिवली दरम्यान साधे मॅप्स का अपुरे पडतात',
      card1Title: 'पावसाळा आणि एस.व्ही. रोडची कोंडी',
      card1Text: 'स्क्रीनवर पावसाचे पाणी पडताच गुगल मॅप्सवर टाईप करणे अशक्य होते. पुलाखाली थांबून पत्ता पेस्ट करावा लागतो.',
      card2Title: 'हुकणारा प्रसिद्ध वडापाव थांबा',
      card2Text: 'अशोक वडापाव किंवा इराणी चहा घ्यायचा ठरवूनही पुढे गेल्यावर आठवते की आपण त्या गल्लीतूनच गेलो होतो.',
      card3Title: '“भाऊ किती वेळ लागेल?”',
      card3Text: 'ग्राहक सतत विचारतात. एखादे पार्सल तातडीचे आले की उरलेले १२ थांबे बदलण्यासाठी ४० वेळा टॅप करावे लागते.',
    },
    howItWorks: {
      title: 'रूटवाला कसा काम करतो',
      subtitle: 'एका हाताने वापरण्यासाठी बनवलेल्या चार सोप्या पायऱ्या',
      step1Title: 'क्षणार्धात थांबे जोडा',
      step1Desc: 'व्हॉट्सॲप यादी पेस्ट करा किंवा मुंबईच्या प्रसिद्ध लँडमार्कवरून थांबे निवडा.',
      step2Title: 'प्राधान्यक्रम ठरवा',
      step2Desc: 'औषधे आणि तातडीच्या पार्सलला हाय प्रायोरिटी द्या जेणेकरून वेळेवर पोहोचता येईल.',
      step3Title: 'स्मार्ट मार्ग मिळवा',
      step3Desc: 'कुर्ला सिग्नल आणि कलानगर सारख्या बॉटलनेक टाळून अचूक क्रम मिळतो.',
      step4Title: '५६px मोठ्या बटनाने पुढे जा',
      step4Desc: 'मोठे टच बटन्स, ऑफलाइन तिकीट स्टाइल्ड कार्डे आणि एका टॅपमध्ये कॉल.',
    },
    comparison: {
      title: 'गुगल मॅप्स विरुद्ध रूटवाला',
      subtitle: 'डिलिव्हरी कामगारांच्या गरजांनुसार तयार केलेले',
      featureCol: 'वैशिष्ट्ये',
      gmapsCol: 'सामान्य गुगल मॅप्स',
      routewalaCol: 'रूटवाला (डिलिव्हरी स्पेशल)',
    },
    wishlistSection: {
      title: 'वाटेतील विशलिस्ट थांबे',
      subtitle: 'मुंबईचा चहा, नाश्ता किंवा पंचरवाला कधीही विसरू नका',
      desc: 'तुमचे आवडते थांबे सेव्ह करा. जेव्हा डिलिव्हरी त्याच मार्गावर असेल, तेव्हा ॲप न चुकता आठवण करून देईल.',
    },
    privacy: {
      title: 'प्रायव्हसी आणि सुलभता',
      subtitle: 'बॅटरी वाचवणारे आणि पूर्णपणे तुमच्या नियंत्रणात',
      optInLoc: 'लोकेशन केवळ परवानगीने: इंटरनेट नसतानाही मॅन्युअल तिकीट पद्धतीने चालते.',
      localOnly: 'स्थानिक स्टोरेज: ग्राहकांचे नंबर आणि पत्ते तुमच्याच फोनवर सेव्ह राहतात.',
      offlineReady: 'दादर सबवे किंवा इमारतींच्या तळघरातही विनाअडथळा सुरू राहते.',
    },
    stopCard: {
      stop: 'थांबा',
      eta: 'वेळ',
      priority: 'प्राधान्य',
      delivered: 'झाली',
      pending: 'बाकी',
      parcels: 'पार्सल्स',
    },
  },
};
