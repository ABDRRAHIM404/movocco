/**
 * Strings for the Movocco Android pilot.
 *
 * Level A ships English and French first. The architecture is built for all
 * seven Movocco languages (EN, FR, MSA, Darija, Tachelhit, ES, DE); the
 * remaining five are listed as planned, not dropped. Arabic-script languages
 * need RTL layout support, which is prepared via `dir` on each locale.
 * Safety-relevant journey instructions need human-reviewed translations
 * before a language is labelled fully supported.
 */

export type Locale = 'en' | 'fr' | 'ar' | 'darija' | 'tachelhit' | 'es' | 'de';

export interface LocaleMeta {
  code: Locale;
  /** Name shown in its own language. */
  label: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
  /** Only locales with reviewed translations are selectable in Level A. */
  available: boolean;
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'English', englishName: 'English', dir: 'ltr', available: true },
  { code: 'fr', label: 'Français', englishName: 'French', dir: 'ltr', available: true },
  { code: 'ar', label: 'العربية', englishName: 'Modern Standard Arabic', dir: 'rtl', available: false },
  { code: 'darija', label: 'الدارجة', englishName: 'Moroccan Darija', dir: 'rtl', available: false },
  { code: 'tachelhit', label: 'Tachelhit', englishName: 'Tamazight / Tachelhit', dir: 'ltr', available: false },
  { code: 'es', label: 'Español', englishName: 'Spanish', dir: 'ltr', available: false },
  { code: 'de', label: 'Deutsch', englishName: 'German', dir: 'ltr', available: false },
];

export type SupportedLocale = 'en' | 'fr';

export type StringKey =
  | 'appTagline'
  | 'demo'
  | 'demoNotice'
  | 'demoJourneyNotice'
  | 'welcomeTitle'
  | 'welcomeSubtitle'
  | 'chooseLanguage'
  | 'clearSearch'
  | 'comingSoon'
  | 'continue'
  | 'skip'
  | 'tabPlan'
  | 'tabNearby'
  | 'tabExplore'
  | 'tabSaved'
  | 'tabAccount'
  | 'planTitle'
  | 'planSubtitle'
  | 'origin'
  | 'destination'
  | 'chooseOrigin'
  | 'chooseDestination'
  | 'swap'
  | 'searchJourneys'
  | 'searchPlaceholder'
  | 'noResults'
  | 'noResultsHint'
  | 'resultsTitle'
  | 'resultsEmpty'
  | 'resultsEmptyHint'
  | 'cheapest'
  | 'fastest'
  | 'fewestTransfers'
  | 'cannotRank'
  | 'cannotRankHint'
  | 'legs'
  | 'transfers'
  | 'noTransfers'
  | 'fareUnknown'
  | 'durationUnknown'
  | 'fareRange'
  | 'durationRange'
  | 'perPerson'
  | 'perVehicle'
  | 'viewDetails'
  | 'saveJourney'
  | 'saved'
  | 'unsaveJourney'
  | 'journeySavedOn'
  | 'offlineWarning'
  | 'steps'
  | 'mapView'
  | 'listView'
  | 'schematicMapNote'
  | 'boardingPoint'
  | 'direction'
  | 'getOffAt'
  | 'walkNote'
  | 'source'
  | 'lastUpdated'
  | 'evidenceDemo'
  | 'evidenceUnconfirmed'
  | 'reportIssue'
  | 'nearbyTitle'
  | 'nearbySubtitle'
  | 'useMyLocation'
  | 'gpsDenied'
  | 'gpsDeniedHint'
  | 'gpsUnavailable'
  | 'gpsUnavailableHint'
  | 'chooseOriginManually'
  | 'nearbyEmpty'
  | 'exploreTitle'
  | 'exploreSubtitle'
  | 'places'
  | 'transportGuides'
  | 'guideGrandTaxi'
  | 'guidePetitTaxi'
  | 'guideCityBus'
  | 'guideInfoUnavailable'
  | 'savedTitle'
  | 'savedSubtitle'
  | 'savedEmpty'
  | 'savedEmptyHint'
  | 'openOfflineReader'
  | 'accountTitle'
  | 'guest'
  | 'guestHint'
  | 'signIn'
  | 'signInUnavailable'
  | 'signInUnavailableHint'
  | 'settings'
  | 'language'
  | 'accessibility'
  | 'largeText'
  | 'largeTextHint'
  | 'lowData'
  | 'lowDataHint'
  | 'privacy'
  | 'privacyNote'
  | 'clearSavedData'
  | 'clearSavedDataDone'
  | 'deleteAccount'
  | 'deleteAccountHint'
  | 'about'
  | 'version'
  | 'supabaseStatus'
  | 'supabaseNotConfigured'
  | 'supabaseReady'
  | 'back'
  | 'loading'
  | 'errorTitle'
  | 'errorHint'
  | 'retry'
  | 'offline'
  | 'offlineHint'
  | 'agadirOnly'
  | 'agadirOnlyHint'
  | 'noVerifiedData'
  | 'noVerifiedDataHint'
  | 'stopsAndHubs'
  | 'connections'
  | 'officialBookingLink'
  | 'noBookingLink';

export const STRINGS: Record<SupportedLocale, Record<StringKey, string>> = {
  en: {
    appTagline: 'Travel · Plan · Explore Morocco',
    demo: 'DEMO',
    demoNotice:
      'Demo data only. Nothing on this screen is verified transport information.',
    demoJourneyNotice:
      'Illustrative demo journey. Fares, times and boarding instructions are not real and must not be used to travel.',
    welcomeTitle: 'Welcome to Movocco',
    welcomeSubtitle:
      'Your Moroccan transport guide and journey planner. Agadir only for now.',
    chooseLanguage: 'Choose your language',
    clearSearch: 'Clear search',
    comingSoon: 'Coming soon',
    continue: 'Continue',
    skip: 'Skip',
    tabPlan: 'Plan',
    tabNearby: 'Nearby',
    tabExplore: 'Explore',
    tabSaved: 'Saved',
    tabAccount: 'Account',
    planTitle: 'Where do you want to go?',
    planSubtitle: 'Plan a journey in Agadir. Public planning needs no account.',
    origin: 'From',
    destination: 'To',
    chooseOrigin: 'Choose starting point',
    chooseDestination: 'Choose destination',
    swap: 'Swap origin and destination',
    searchJourneys: 'Search journeys',
    searchPlaceholder: 'Search places in Agadir…',
    noResults: 'No places found',
    noResultsHint: 'Try a different spelling. Only Agadir places are covered in this pilot.',
    resultsTitle: 'Journey options',
    resultsEmpty: 'No journeys found',
    resultsEmptyHint:
      'There is no verified journey for this pair yet. Try nearby hubs or a different destination.',
    cheapest: 'Cheapest',
    fastest: 'Fastest',
    fewestTransfers: 'Fewest transfers',
    cannotRank: 'Ranking unavailable',
    cannotRankHint:
      'Fares or times are incomplete for these options, so cheapest / fastest cannot be labelled honestly.',
    legs: 'legs',
    transfers: 'transfers',
    noTransfers: 'Direct, no transfers',
    fareUnknown: 'Fare unknown',
    durationUnknown: 'Duration unknown',
    fareRange: 'Fare',
    durationRange: 'Duration',
    perPerson: 'per person',
    perVehicle: 'per vehicle',
    viewDetails: 'View details',
    saveJourney: 'Save journey offline',
    saved: 'Saved',
    unsaveJourney: 'Remove saved journey',
    journeySavedOn: 'Saved on',
    offlineWarning: 'Saved instructions may be outdated. They do not prove a service is running today.',
    steps: 'Steps',
    mapView: 'Map',
    listView: 'List',
    schematicMapNote: 'Schematic map — positions are approximate (DEMO). Use the list view for the full instructions.',
    boardingPoint: 'Boarding point',
    direction: 'Direction',
    getOffAt: 'Get off at',
    walkNote: 'Walking connection — feasibility not verified.',
    source: 'Source',
    lastUpdated: 'Last updated',
    evidenceDemo: 'Demo — not verified',
    evidenceUnconfirmed: 'Unconfirmed',
    reportIssue: 'Report a problem',
    nearbyTitle: 'Nearby transport',
    nearbySubtitle: 'Find stops and hubs near you in Agadir.',
    useMyLocation: 'Use my location',
    gpsDenied: 'Location permission denied',
    gpsDeniedHint:
      'Movocco cannot use GPS without your permission. You can still choose an origin manually.',
    gpsUnavailable: 'Location unavailable',
    gpsUnavailableHint:
      'GPS or the map service is unavailable right now. Showing the list of Agadir hubs instead.',
    chooseOriginManually: 'Choose an origin manually',
    nearbyEmpty: 'No stops or hubs listed nearby yet.',
    exploreTitle: 'Explore Agadir',
    exploreSubtitle: 'Places and transport guides. Only verified facts are shown as verified.',
    places: 'Places',
    transportGuides: 'Transport guides',
    guideGrandTaxi: 'How grand taxis work',
    guidePetitTaxi: 'How petit taxis work',
    guideCityBus: 'How city buses work',
    guideInfoUnavailable: 'Guide content is not verified yet.',
    savedTitle: 'Saved journeys',
    savedSubtitle: 'Your offline journey instructions, with their saved date.',
    savedEmpty: 'No saved journeys yet',
    savedEmptyHint: 'Save a journey from its detail screen to read it offline later.',
    openOfflineReader: 'Open offline instructions',
    accountTitle: 'Account',
    guest: 'Guest',
    guestHint: 'You are browsing as a guest. Searching and viewing journeys needs no account.',
    signIn: 'Sign in',
    signInUnavailable: 'Sign-in is not available in this pilot',
    signInUnavailableHint:
      'No backend is configured yet, so accounts, saved journeys sync and contributions are unavailable.',
    settings: 'Settings',
    language: 'Language',
    accessibility: 'Accessibility',
    largeText: 'Larger text',
    largeTextHint: 'Increases text size across the app.',
    lowData: 'Low-data mode',
    lowDataHint: 'Hides the map and images and prefers text lists.',
    privacy: 'Privacy',
    privacyNote:
      'Movocco does not keep a continuous location history. Location is used only when you ask for nearby transport.',
    clearSavedData: 'Clear saved journeys and settings',
    clearSavedDataDone: 'Saved data cleared.',
    deleteAccount: 'Delete account',
    deleteAccountHint: 'Account deletion needs a backend and is not available in this pilot.',
    about: 'About',
    version: 'Version',
    supabaseStatus: 'Backend status',
    supabaseNotConfigured: 'Not configured — demo data only',
    supabaseReady: 'Connected',
    back: 'Back',
    loading: 'Loading…',
    errorTitle: 'Something went wrong',
    errorHint: 'Please try again. If the problem continues, the data may be unavailable.',
    retry: 'Try again',
    offline: 'You are offline',
    offlineHint: 'Saved journeys still work. New searches need a connection.',
    agadirOnly: 'Agadir only',
    agadirOnlyHint: 'This pilot covers Agadir only. Other areas need explicit approval.',
    noVerifiedData: 'No verified data yet',
    noVerifiedDataHint: 'Movocco shows unknown instead of inventing a route, fare or timetable.',
    stopsAndHubs: 'Stops and hubs',
    connections: 'Connections',
    officialBookingLink: 'Official booking page',
    noBookingLink: 'No official booking link is known for this service.',
  },
  fr: {
    appTagline: 'Voyager · Planifier · Explorer le Maroc',
    demo: 'DÉMO',
    demoNotice:
      'Données de démonstration uniquement. Rien sur cet écran n’est une information de transport vérifiée.',
    demoJourneyNotice:
      'Trajet de démonstration illustratif. Les tarifs, les durées et les points d’embarquement ne sont pas réels et ne doivent pas être utilisés pour voyager.',
    welcomeTitle: 'Bienvenue sur Movocco',
    welcomeSubtitle:
      'Votre guide de transport marocain et planificateur de trajets. Agadir uniquement pour l’instant.',
    chooseLanguage: 'Choisissez votre langue',
    clearSearch: 'Effacer la recherche',
    comingSoon: 'Bientôt disponible',
    continue: 'Continuer',
    skip: 'Passer',
    tabPlan: 'Trajet',
    tabNearby: 'Proche',
    tabExplore: 'Explorer',
    tabSaved: 'Enregistrés',
    tabAccount: 'Compte',
    planTitle: 'Où voulez-vous aller ?',
    planSubtitle: 'Planifiez un trajet à Agadir. La recherche publique ne nécessite pas de compte.',
    origin: 'Départ',
    destination: 'Arrivée',
    chooseOrigin: 'Choisir le point de départ',
    chooseDestination: 'Choisir la destination',
    swap: 'Inverser le départ et la destination',
    searchJourneys: 'Rechercher des trajets',
    searchPlaceholder: 'Rechercher un lieu à Agadir…',
    noResults: 'Aucun lieu trouvé',
    noResultsHint: 'Essayez une autre orthographe. Seuls les lieux d’Agadir sont couverts dans ce pilote.',
    resultsTitle: 'Options de trajet',
    resultsEmpty: 'Aucun trajet trouvé',
    resultsEmptyHint:
      'Il n’existe pas encore de trajet vérifié pour ce couple. Essayez un pôle proche ou une autre destination.',
    cheapest: 'Le moins cher',
    fastest: 'Le plus rapide',
    fewestTransfers: 'Moins de correspondances',
    cannotRank: 'Classement indisponible',
    cannotRankHint:
      'Les tarifs ou les durées sont incomplets pour ces options, le moins cher / le plus rapide ne peut donc pas être indiqué honnêtement.',
    legs: 'étapes',
    transfers: 'correspondances',
    noTransfers: 'Direct, sans correspondance',
    fareUnknown: 'Tarif inconnu',
    durationUnknown: 'Durée inconnue',
    fareRange: 'Tarif',
    durationRange: 'Durée',
    perPerson: 'par personne',
    perVehicle: 'par véhicule',
    viewDetails: 'Voir le détail',
    saveJourney: 'Enregistrer le trajet hors ligne',
    saved: 'Enregistré',
    unsaveJourney: 'Retirer le trajet enregistré',
    journeySavedOn: 'Enregistré le',
    offlineWarning: 'Les instructions enregistrées peuvent être dépassées. Elles ne prouvent pas qu’un service circule aujourd’hui.',
    steps: 'Étapes',
    mapView: 'Carte',
    listView: 'Liste',
    schematicMapNote: 'Carte schématique — les positions sont approximatives (DÉMO). Utilisez la vue liste pour les instructions complètes.',
    boardingPoint: 'Point d’embarquement',
    direction: 'Direction',
    getOffAt: 'Descendre à',
    walkNote: 'Correspondance à pied — faisabilité non vérifiée.',
    source: 'Source',
    lastUpdated: 'Dernière mise à jour',
    evidenceDemo: 'Démo — non vérifié',
    evidenceUnconfirmed: 'Non confirmé',
    reportIssue: 'Signaler un problème',
    nearbyTitle: 'Transports à proximité',
    nearbySubtitle: 'Trouvez les arrêts et pôles près de vous à Agadir.',
    useMyLocation: 'Utiliser ma position',
    gpsDenied: 'Permission de localisation refusée',
    gpsDeniedHint:
      'Movocco ne peut pas utiliser le GPS sans votre permission. Vous pouvez toujours choisir un départ manuellement.',
    gpsUnavailable: 'Position indisponible',
    gpsUnavailableHint:
      'Le GPS ou le service de carte est indisponible pour l’instant. La liste des pôles d’Agadir est affichée à la place.',
    chooseOriginManually: 'Choisir un départ manuellement',
    nearbyEmpty: 'Aucun arrêt ni pôle répertorié à proximité pour l’instant.',
    exploreTitle: 'Explorer Agadir',
    exploreSubtitle: 'Lieux et guides de transport. Seuls les faits vérifiés sont présentés comme vérifiés.',
    places: 'Lieux',
    transportGuides: 'Guides de transport',
    guideGrandTaxi: 'Comment fonctionnent les grands taxis',
    guidePetitTaxi: 'Comment fonctionnent les petits taxis',
    guideCityBus: 'Comment fonctionnent les bus urbains',
    guideInfoUnavailable: 'Le contenu du guide n’est pas encore vérifié.',
    savedTitle: 'Trajets enregistrés',
    savedSubtitle: 'Vos instructions de trajet hors ligne, avec leur date d’enregistrement.',
    savedEmpty: 'Aucun trajet enregistré pour l’instant',
    savedEmptyHint: 'Enregistrez un trajet depuis son écran de détail pour le lire hors ligne plus tard.',
    openOfflineReader: 'Ouvrir les instructions hors ligne',
    accountTitle: 'Compte',
    guest: 'Invité',
    guestHint: 'Vous naviguez en tant qu’invité. La recherche et la consultation des trajets ne nécessitent pas de compte.',
    signIn: 'Se connecter',
    signInUnavailable: 'Connexion indisponible dans ce pilote',
    signInUnavailableHint:
      'Aucun backend n’est configuré pour l’instant, les comptes, la synchronisation des trajets enregistrés et les contributions sont donc indisponibles.',
    settings: 'Réglages',
    language: 'Langue',
    accessibility: 'Accessibilité',
    largeText: 'Texte plus grand',
    largeTextHint: 'Augmente la taille du texte dans toute l’application.',
    lowData: 'Mode données réduites',
    lowDataHint: 'Masque la carte et les images et privilégie les listes textuelles.',
    privacy: 'Confidentialité',
    privacyNote:
      'Movocco ne conserve pas d’historique continu de localisation. La position n’est utilisée que lorsque vous demandez les transports à proximité.',
    clearSavedData: 'Effacer les trajets enregistrés et les réglages',
    clearSavedDataDone: 'Données enregistrées effacées.',
    deleteAccount: 'Supprimer le compte',
    deleteAccountHint: 'La suppression de compte nécessite un backend et n’est pas disponible dans ce pilote.',
    about: 'À propos',
    version: 'Version',
    supabaseStatus: 'État du backend',
    supabaseNotConfigured: 'Non configuré — données de démonstration uniquement',
    supabaseReady: 'Connecté',
    back: 'Retour',
    loading: 'Chargement…',
    errorTitle: 'Une erreur est survenue',
    errorHint: 'Veuillez réessayer. Si le problème persiste, les données sont peut-être indisponibles.',
    retry: 'Réessayer',
    offline: 'Vous êtes hors ligne',
    offlineHint: 'Les trajets enregistrés fonctionnent toujours. Les nouvelles recherches nécessitent une connexion.',
    agadirOnly: 'Agadir uniquement',
    agadirOnlyHint: 'Ce pilote couvre Agadir uniquement. Les autres zones nécessitent une approbation explicite.',
    noVerifiedData: 'Aucune donnée vérifiée pour l’instant',
    noVerifiedDataHint: 'Movocco affiche « inconnu » plutôt que d’inventer un itinéraire, un tarif ou un horaire.',
    stopsAndHubs: 'Arrêts et pôles',
    connections: 'Correspondances',
    officialBookingLink: 'Page officielle de réservation',
    noBookingLink: 'Aucun lien officiel de réservation n’est connu pour ce service.',
  },
};
