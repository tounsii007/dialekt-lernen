// Hessisch — Dialektdaten
// Format: jedes Objekt ist ein Ausdruck im Dialekt mit Bedeutung auf Hochdeutsch.

export default {
  id: 'hessisch',
  name: 'Hessisch',
  region: 'Hessen',
  bundesland: 'Hessen',
  flag: '🦁',
  farbe: '#e63946',
  beschreibung: 'Hessisch wird in weiten Teilen des Bundeslandes Hessen gesprochen. Besonders bekannt ist das Frankfurter Stadtmundart („Frankfurterisch") sowie das Mittelhessische rund um Gießen und Marburg. Charakteristisch sind das gerollte „R", weiche Konsonanten und der herzlich-rustikale Tonfall.',
  sprecher: 'ca. 4 Mio.',
  lang: 'de-DE',
  ausdruecke: [
    {
      id: 'h-001',
      ausdruck: 'Ei guude!',
      hochdeutsch: 'Hallo! / Wie geht\'s?',
      bedeutung: 'Die wohl bekannteste hessische Begrüßung. „Guude" kommt von „guten Tag", das „Ei" ist eine charakteristische Verstärkungspartikel. Wird jederzeit verwendet — morgens, mittags, abends.',
      beispiel: 'Ei guude, wie?',
      beispiel_hd: 'Hallo, wie geht\'s?',
      kategorie: 'begruessung'
    },
    {
      id: 'h-002',
      ausdruck: 'Bembel',
      hochdeutsch: 'Apfelweinkrug',
      bedeutung: 'Der ikonische, meist blau-graue Steinzeugkrug, in dem Frankfurter Apfelwein (Ebbelwoi) serviert wird. Symbol der hessischen Trinkkultur — typisch mit Salzgebäck und Handkäs.',
      beispiel: 'Bring emol en Bembel mit fünf Schoppe!',
      beispiel_hd: 'Bring mal einen Bembel mit fünf Gläsern!',
      kategorie: 'essen'
    },
    {
      id: 'h-003',
      ausdruck: 'Babbel net!',
      hochdeutsch: 'Rede keinen Unsinn!',
      bedeutung: '„Babbeln" bedeutet im Hessischen reden oder plappern. „Babbel net" ist die freundlich-direkte Aufforderung, ungläubigen Quatsch zu lassen — kann aber auch echte Empörung ausdrücken.',
      beispiel: 'Babbel net, des is doch unmöglich!',
      beispiel_hd: 'Rede keinen Unsinn, das ist doch unmöglich!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-004',
      ausdruck: 'Schorsch',
      hochdeutsch: 'Georg',
      bedeutung: 'Hessische Variante des Vornamens Georg. Oft Inbegriff des typischen hessischen Mannes — gemütlich, bodenständig, mit Vorliebe für Äppelwoi.',
      beispiel: 'Der Schorsch sitzt im Wirtshaus un trinkt sei Schoppe Ebbelwoi.',
      beispiel_hd: 'Der Georg sitzt im Wirtshaus und trinkt seinen Schoppen Apfelwein.',
      kategorie: 'menschen'
    },
    {
      id: 'h-005',
      ausdruck: 'Bobbelsche',
      hochdeutsch: 'Baby / Kleinkind',
      bedeutung: 'Liebevolle Bezeichnung für ein kleines Kind. Die Endung „-sche" ist die hessische Verkleinerungsform (entspricht hochdeutsch „-chen").',
      beispiel: 'Guck emol des süße Bobbelsche!',
      beispiel_hd: 'Schau mal das süße Baby!',
      kategorie: 'menschen'
    },
    {
      id: 'h-006',
      ausdruck: 'Allmächt!',
      hochdeutsch: 'Allmächtiger! / Mein Gott!',
      bedeutung: 'Ausruf der Überraschung oder leichten Entrüstung, abgeleitet von „allmächtiger Gott". Wird häufig in alltäglichen Situationen geäußert — von „toll" bis „oh weh".',
      beispiel: 'Allmächt, der Bembel is leer!',
      beispiel_hd: 'Allmächtiger, der Krug ist leer!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-007',
      ausdruck: 'Hibbdebach un Dribbdebach',
      hochdeutsch: 'Diesseits und jenseits des Mains',
      bedeutung: 'In Frankfurt unterscheidet man zwischen „Hibbdebach" (diesseits des Mains, nördliches Ufer) und „Dribbdebach" (jenseits, südliches Ufer / Sachsenhausen). Ein typisches Frankfurter Lokalkolorit.',
      beispiel: 'Mer wohne hibbdebach, awwer der Ebbelwoi is dribbdebach am beste.',
      beispiel_hd: 'Wir wohnen nördlich des Mains, aber der Apfelwein ist südlich des Mains am besten.',
      kategorie: 'orte'
    },
    {
      id: 'h-008',
      ausdruck: 'Gelleworscht',
      hochdeutsch: 'Gelbe Wurst / Streitwurst',
      bedeutung: 'Wörtlich „gelbe Wurst". In Frankfurt eine traditionelle, milde Brühwurst. Umgangssprachlich auch für etwas Belangloses oder einen kleinen Streit verwendet.',
      beispiel: 'Mach doch kaa Gelleworscht draus, des is doch ned so wichdig!',
      beispiel_hd: 'Mach doch keine große Sache daraus, das ist doch nicht so wichtig!',
      kategorie: 'essen'
    },
    {
      id: 'h-010',
      ausdruck: 'Worschd',
      hochdeutsch: 'Wurst',
      bedeutung: 'Klassische hessische Aussprache des Wortes „Wurst" — mit weichem „r" und „d" statt „t" am Ende. Auch als Redensart: „Des is mer worschd" = „Das ist mir egal".',
      beispiel: 'Des is mer doch alles worschd!',
      beispiel_hd: 'Das ist mir alles egal!',
      kategorie: 'redensart'
    },
    {
      id: 'h-011',
      ausdruck: 'Schwätzer',
      hochdeutsch: 'Vielredner / Schwätzer',
      bedeutung: 'Ein „Schwätzer" ist jemand, der ununterbrochen oder oberflächlich redet. Kann gutmütig oder leicht abwertend gemeint sein, je nach Kontext. „En alder Schwätzer" hört man oft als Charakterisierung eines geschwätzigen Nachbarn.',
      beispiel: 'Der Schorsch is en alde Schwätzer, dem sei Maul steht nie still.',
      beispiel_hd: 'Der Georg ist ein alter Schwätzer, sein Mund steht nie still.',
      kategorie: 'menschen'
    },
    {
      id: 'h-013',
      ausdruck: 'Daddrich',
      hochdeutsch: 'Tollpatschig / unbeholfen',
      bedeutung: '„Daddrich" beschreibt jemanden, der etwas verträumt, ungeschickt oder schusselig ist. Nicht böse gemeint, eher amüsiert-mitfühlend. „Sei doch ned so daddrich!" ruft die Großmutter dem Enkel zu, der wieder en Bembel umgeworfen hat.',
      beispiel: 'Sei doch ned so daddrich, sonst fällt der noch der Bembel um!',
      beispiel_hd: 'Sei doch nicht so tollpatschig, sonst fällt dir noch der Apfelweinkrug um!',
      kategorie: 'menschen'
    },
    {
      id: 'h-014',
      ausdruck: 'Schwall',
      hochdeutsch: 'Lärm / Trubel',
      bedeutung: 'Bezeichnet großes Gerede, Aufregung oder Lärm. „Mach kaan Schwall!" = „Mach kein Theater!".',
      beispiel: 'Mach kaan Schwall um die paar Euro, des is doch ned schlimm!',
      beispiel_hd: 'Mach keinen Aufstand um die paar Euro, das ist doch nicht schlimm!',
      kategorie: 'alltag'
    },
    {
      id: 'h-016',
      ausdruck: 'gell',
      hochdeutsch: 'nicht wahr? / oder?',
      bedeutung: 'Das „gell" ist eine Vergewisserungsfrage am Satzende, vergleichbar mit „ne?". Sehr typisch im südhessischen Raum und in Frankfurt. „Des is doch klar, gell?" hört man im Bembel-Land an jedem Tisch.',
      beispiel: 'Des Wedder is herrlich, gell?',
      beispiel_hd: 'Das Wetter ist herrlich, nicht wahr?',
      kategorie: 'redensart'
    },
    {
      id: 'h-017',
      ausdruck: 'Krätsche',
      hochdeutsch: 'Krähe / freches Mädchen',
      bedeutung: 'Wörtlich eine Krähe; übertragen auch ein freches, vorlautes Mädchen. Liebevoll-spöttisch verwendet.',
      beispiel: 'Die klaa Krätsche hat schon widder ihrer Mudder gewiderschproche!',
      beispiel_hd: 'Die kleine Krähe hat schon wieder ihrer Mutter widersprochen!',
      kategorie: 'menschen'
    },
    {
      id: 'h-018',
      ausdruck: 'Ebbelwoi',
      hochdeutsch: 'Apfelwein',
      bedeutung: 'Der hessische Apfelwein ist das Nationalgetränk Hessens und vor allem Frankfurts. Anders als Sekt oder Wein wird Ebbelwoi aus vergorenem Apfelsaft hergestellt und hat eine herbe, prickelnde Note. Er wird aus dem Bembel in die geriffelten Schoppen eingeschenkt und ist fester Bestandteil jeder Gaststätte in Sachsenhausen.',
      beispiel: 'Ohne Ebbelwoi is kaa richtigs Hessen-Fest!',
      beispiel_hd: 'Ohne Apfelwein ist kein richtiges Hessen-Fest!',
      kategorie: 'essen'
    },
    {
      id: 'h-019',
      ausdruck: 'Zibbbe',
      hochdeutsch: 'alte, verwitterte Frau (abwertend-liebevoll)',
      bedeutung: 'Eine abwertende, aber oft auch liebevoll-humorvolle Bezeichnung für eine ältere, schlecht gekleidete oder verwittert wirkende Frau. Der Begriff ist im hessischen Sprachraum weit verbreitet und wird unter Freundinnen auch selbstironisch verwendet. Die Zibbbe ist nicht böse gemeint — sie ist einfach die originelle Alte von nebenan.',
      beispiel: 'Die ald Zibbbe von nebenem hat schon wieder gemeckert.',
      beispiel_hd: 'Die alte Dame von nebenan hat schon wieder gemeckert.',
      kategorie: 'menschen'
    },
    {
      id: 'h-020',
      ausdruck: 'Struwwelpeter',
      hochdeutsch: 'ungepflegtes Kind / berühmte Kinderbuchfigur',
      bedeutung: 'Der Struwwelpeter ist eine weltberühmte Kinderbuchfigur des Frankfurter Arztes Heinrich Hoffmann (1845) — ein Kind mit wilden Haaren und langen Fingernägeln. Das Buch entstand ursprünglich als Weihnachtsgeschenk für Hoffmanns Sohn. Heute bezeichnet „Struwwelpeter" umgangssprachlich jemanden mit ungepflegtem Äußeren.',
      beispiel: 'Geh mol zum Friseur, du siehscht aus wie en Struwwelpeter!',
      beispiel_hd: 'Geh mal zum Friseur, du siehst aus wie ein Struwwelpeter!',
      kategorie: 'redensart'
    },
    {
      id: 'h-021',
      ausdruck: 'kumm emol',
      hochdeutsch: 'komm mal / komm doch',
      bedeutung: 'Eine typisch hessische Einladungs- oder Aufforderungsformel. Das „emol" entspricht hochdeutschem „mal" und mildert die Aufforderung freundlich ab. „Kumm emol rüwer" bedeutet eine herzliche Einladung zu sich nach Hause oder an einen Ort.',
      beispiel: 'Kumm emol ins Wohnzimmer, ich zeig dir was!',
      beispiel_hd: 'Komm mal ins Wohnzimmer, ich zeige dir etwas!',
      kategorie: 'alltag'
    },
    {
      id: 'h-022',
      ausdruck: 'Baggel',
      hochdeutsch: 'Buckel / Rücken',
      bedeutung: 'Das hessische Wort für Buckel oder Rücken, kann sowohl den Körperteil als auch einen echten Höcker bezeichnen. „Rutsch mir den Baggel runter!" ist eine deftige Abweisung. Der Begriff wird auch für eine gebückte, kleine Person verwendet.',
      beispiel: 'Mei Baggel tut weh vom lange Sitze.',
      beispiel_hd: 'Mein Rücken tut weh vom langen Sitzen.',
      kategorie: 'koerper'
    },
    {
      id: 'h-023',
      ausdruck: 'Granate',
      hochdeutsch: 'tolle Sache / Bombenidee',
      bedeutung: 'Im hessischen Slang eine enthusiastische Bezeichnung für etwas Großartiges oder eine besonders gute Idee. „Des is ne Granate!" ist höchstes Lob. Möglicherweise aus dem Fußballjargon übernommen, wo ein mächtiger Schuss als „Granate" bezeichnet wird.',
      beispiel: 'Des Konzert war ne echte Granate, einfach klasse!',
      beispiel_hd: 'Das Konzert war eine echte Bombe, einfach toll!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-024',
      ausdruck: 'Gebabbel',
      hochdeutsch: 'Gerede / Getuschel / sinnloses Reden',
      bedeutung: 'Abgeleitetes Substantiv von „babbeln" — bezeichnet unnötiges, oberflächliches oder klatschhaftes Gerede. „Des is alles nur Gebabbel!" wertet eine Aussage oder ein Gespräch als bedeutungslos ab. Eng mit dem Wort „babbeln" verwandt, das im gesamten mitteldeutschen Raum für reden/plappern steht.',
      beispiel: 'Hör uff mit dem Gebabbel und mach was!',
      beispiel_hd: 'Hör auf mit dem Gerede und tu etwas!',
      kategorie: 'alltag'
    },
    {
      id: 'h-025',
      ausdruck: 'Depp',
      hochdeutsch: 'Dummkopf / Tölpel',
      bedeutung: 'Ein leicht abwertendes Wort für jemanden, der sich dumm oder unklug verhält. Im hessischen Alltag oft ohne wirklich böse Absicht verwendet — zwischen Freunden eher ein augenzwinkerndes Schimpfen. Das Wort ist mittelhochdeutschen Ursprungs und weit über Hessen hinaus verbreitet.',
      beispiel: 'So en Depp — der hat schon wieder vergesse, seinen Schlüssel mitzunehme!',
      beispiel_hd: 'So ein Trottel — der hat schon wieder vergessen, seinen Schlüssel mitzunehmen!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-026',
      ausdruck: 'Gaa-nix',
      hochdeutsch: 'gar nichts',
      bedeutung: 'Hessische Aussprache von „gar nichts" — besonders betont und gedehnt, um die vollständige Verneinung zu unterstreichen. „Des is gaa-nix wert!" klingt vernichtender als jede hochdeutsche Formulierung. Die Dehnung des ersten Vokals ist typisch hessisch.',
      beispiel: 'Des versteh ich gaa-nix, erklär mir das nochmal!',
      beispiel_hd: 'Das verstehe ich gar nicht, erkläre mir das nochmal!',
      kategorie: 'redensart'
    },
    {
      id: 'h-027',
      ausdruck: 'Grumbeer',
      hochdeutsch: 'Kartoffel',
      bedeutung: 'Das hessische Wort für Kartoffel — wörtlich „Grundbirne", da die Kartoffel unter der Erde wächst. Dieser alte Begriff ist in weiten Teilen Hessens und des Rheinlandes gebräuchlich. Die Kartoffel war jahrhundertelang das Hauptnahrungsmittel der hessischen Landbevölkerung.',
      beispiel: 'Heute gibts Grumbeere mit Quark — des beste Essen der Welt!',
      beispiel_hd: 'Heute gibt es Kartoffeln mit Quark — das beste Essen der Welt!',
      kategorie: 'essen'
    },
    {
      id: 'h-028',
      ausdruck: 'Stinker',
      hochdeutsch: 'Schelm / frecher Kerl',
      bedeutung: 'Im hessischen Sprachgebrauch oft liebevoll-tadelnd für einen frechen oder durchtriebenen Menschen verwendet. Kann wörtlich jemanden bezeichnen, der unangenehm riecht, wird aber häufiger im übertragenen Sinne benutzt. Kinder werden oft liebevoll „du klaaner Stinker" genannt.',
      beispiel: 'Du klaaner Stinker, haste wieder alle Kekse aufgegesse?',
      beispiel_hd: 'Du kleiner Schelm, hast du wieder alle Kekse aufgegessen?',
      kategorie: 'schimpf'
    },
    {
      id: 'h-030',
      ausdruck: 'Waldschlösschen',
      hochdeutsch: 'Waldgaststätte / Ausflugslokal im Wald',
      bedeutung: 'Eine typische hessische Waldgaststätte, die oft als Ausflugsziel für Familien und Wanderer dient. Das Waldschlösschen verkörpert hessische Gemütlichkeit inmitten der Natur — Apfelwein, hausgemachte Küche und frische Waldluft. Viele Hessen verbinden damit Kindheitserinnerungen an Sonntagsausflüge.',
      beispiel: 'Mer gehn Sonntag ins Waldschlösschen, die ham die beste Grumbeeresupp!',
      beispiel_hd: 'Wir gehen Sonntag in die Waldgaststätte, die haben die beste Kartoffelsuppe!',
      kategorie: 'orte'
    },
    {
      id: 'h-031',
      ausdruck: 'Dösbaddel',
      hochdeutsch: 'Trottel / Schlafmütze',
      bedeutung: 'Eine deftige hessische Bezeichnung für jemanden, der begriffsstutzig, schusselig oder träge ist. Das Wort verbindet „dösen" (schlafen/träumen) mit „Baddel" (Pattel / Tölpel). Klingt stärker als „Daddrich" und hat eine ausdrucksstärkere Abweisung.',
      beispiel: 'Du Dösbaddel! Das steht doch direkt vor dir!',
      beispiel_hd: 'Du Trottel! Das steht doch direkt vor dir!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-032',
      ausdruck: 'Hemdsärmeligkeit',
      hochdeutsch: 'unkompliziertes, herzliches Wesen ohne Etikette',
      bedeutung: 'Ein typisch hessisches Tugendwort — die Fähigkeit, ohne Förmlichkeiten und Umstände direkt und herzlich miteinander umzugehen. Hemdsärmeligkeit ist in Hessen kein Schimpfwort, sondern ein Qualitätsmerkmal: Bodenständigkeit und Direktheit ohne Schnickschnack.',
      beispiel: 'Des mag ich an ihm — seine ehrliche Hemdsärmeligkeit!',
      beispiel_hd: 'Das mag ich an ihm — seine ehrliche, unkomplizierte Art!',
      kategorie: 'redensart'
    },
    {
      id: 'h-033',
      ausdruck: 'Mispel',
      hochdeutsch: 'Mispel (Frucht)',
      bedeutung: 'Die Mispel ist ein alter Obstbaum, der in Hessen noch häufig in Gärten und an Wegrändern wächst. Die Frucht wird erst nach dem ersten Frost genießbar (ein Vorgang, den man „bletting" nennt) und hat einen apfel-ähnlichen, süßlich-sauren Geschmack. In der hessischen Volksmedizin wurden Mispeln gegen Verdauungsbeschwerden verwendet.',
      beispiel: 'Im Garten von der Oma stehe noch zwaa alde Mispelbäum.',
      beispiel_hd: 'Im Garten von der Oma stehen noch zwei alte Mispelbäume.',
      kategorie: 'natur'
    },
    {
      id: 'h-034',
      ausdruck: 'nix wie hin',
      hochdeutsch: 'nichts wie hin / sofort los',
      bedeutung: 'Ein typisch hessischer Ausdruck für spontane Begeisterung und Entschlossenheit — man bricht sofort auf, ohne lange zu zögern. Das „nix" ist die hessische Form von „nichts", und die gesamte Phrase drückt impulsive Tatbereitschaft aus.',
      beispiel: 'Der neue Ebbelwoi-Stand hat auf? Nix wie hin!',
      beispiel_hd: 'Der neue Apfelweinstand hat geöffnet? Nichts wie hin!',
      kategorie: 'redensart'
    },
    {
      id: 'h-035',
      ausdruck: 'mäh',
      hochdeutsch: 'mal eben / kurz',
      bedeutung: 'Eine hessische Partikel, die eine kurze, beiläufige Handlung bezeichnet. „Geh mäh rüwer" bedeutet „geh mal eben rüber". Das Wort ist typisch für die hessische Abkürzungslust und macht Sätze knapper und direkter.',
      beispiel: 'Geh mäh zum Bäcker, wir brauchen Brot.',
      beispiel_hd: 'Geh mal eben zum Bäcker, wir brauchen Brot.',
      kategorie: 'alltag'
    },
    {
      id: 'h-036',
      ausdruck: 'Riwwelkuche',
      hochdeutsch: 'Streuselkuchen',
      bedeutung: 'Der hessische Streuselkuchen — ein einfacher Hefekuchen, auf dem „Riwwele" (Streusel) aus Butter, Zucker und Mehl verteilt werden. Der Riwwelkuche ist ein Klassiker auf jedem hessischen Kaffeetisch und bei Vereinsfesten. Der Name kommt von „riwweln" (reiben/zerbröseln), dem Vorgang beim Herstellen der Streusel.',
      beispiel: 'Zum Kaffeeklatsch gibt\'s heute Riwwelkuche vom Bäcker.',
      beispiel_hd: 'Zum Kaffeeklatsch gibt es heute Streuselkuchen vom Bäcker.',
      kategorie: 'essen'
    },
    {
      id: 'h-037',
      ausdruck: 'hessisch-uff',
      hochdeutsch: 'draufgängerisch / selbstbewusst / angeberisch',
      bedeutung: 'Bezeichnet eine typisch hessische Mischung aus Selbstbewusstsein, Draufgängertum und gelegentlichem Angebertum. Der Hesse ist stolz auf seine Herkunft und zeigt das auch. „Hessisch-uff" ist halb bewundernde, halb neckende Beschreibung des selbstbewussten Hessen.',
      beispiel: 'Den kenn ich — der is ganz hessisch-uff, der sagt immer seine Meinung.',
      beispiel_hd: 'Den kenne ich — der ist sehr direkt und selbstbewusst, der sagt immer seine Meinung.',
      kategorie: 'menschen'
    },
    {
      id: 'h-038',
      ausdruck: 'Schächer',
      hochdeutsch: 'Schlingel / Schlitzohr',
      bedeutung: 'Ein liebevolles Wort für einen charmant-listigen Menschen, der es immer schafft, aus allem das Beste herauszuholen. Der Schächer handelt nicht böse — er ist einfach klüger als die anderen. Das Wort hat religiöse Wurzeln (Schächer = Räuber in der Bibel), wird aber heute humorvoll verwendet.',
      beispiel: 'Du aler Schächer, wie hast du des wieder hingedeicht?',
      beispiel_hd: 'Du alter Schlitzohr, wie hast du das wieder hingekriegt?',
      kategorie: 'menschen'
    },
    {
      id: 'h-039',
      ausdruck: 'Karosse',
      hochdeutsch: 'großes, protziges Auto',
      bedeutung: 'Ein großes, oft prunkvolles Fahrzeug. Ursprünglich bezeichnete die Karosse eine prächtige Kutsche des Adels — heute wird das Wort humorvoll für ein überdimensioniertes Auto verwendet. „Der hat ne Karosse" kann bewundernd oder spöttisch klingen.',
      beispiel: 'Kuck mol die Karosse — der hat sicher viel Geld.',
      beispiel_hd: 'Schau mal das riesige Auto — der hat sicher viel Geld.',
      kategorie: 'alltag'
    },
    {
      id: 'h-040',
      ausdruck: 'Läbbchen',
      hochdeutsch: 'flaches Gesicht / liebes Kind (liebevoll)',
      bedeutung: 'Eigentlich ein kleines, flaches oder ledriges Gesicht — aber meist liebevoll für ein Kind oder eine vertraute Person verwendet. „Du Läbbchen!" ist herzlich gemeint. Das Wort hat eine weiche Kontur im Hessischen und klingt trotz seiner Herkunft zärtlich.',
      beispiel: 'Komm her, du klaanes Läbbchen, lass dich drücke!',
      beispiel_hd: 'Komm her, du kleines Liebchen, lass dich drücken!',
      kategorie: 'koerper'
    },
    {
      id: 'h-041',
      ausdruck: 'Zetter und Mordio',
      hochdeutsch: 'lautes Geschrei / Aufschrei',
      bedeutung: 'Ein altertümlicher Ausruf für großen Lärm und Aufregung — ursprünglich ein mittelalterlicher Hilferuf bei Verbrechen und Feuer. „Zetter" und „Mordio" sind alte Hilferufe. Heute verwendet man den Ausdruck übertragen für übertriebene Aufregung über Kleinigkeiten.',
      beispiel: 'Wege dem kleinen Malheur machst du gleich Zetter und Mordio!',
      beispiel_hd: 'Wegen dem kleinen Missgeschick machst du gleich ein großes Theater!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-042',
      ausdruck: 'Guckindieluft',
      hochdeutsch: 'Träumer / zerstreuter Mensch',
      bedeutung: 'Jemand, der ständig mit seinen Gedanken woanders ist und das Naheliegende übersieht. Der Begriff stammt aus dem Struwwelpeter von Heinrich Hoffmann — die Figur „Hans Guck-in-die-Luft" läuft in den Fluss, weil er nicht aufpasst. In Frankfurt ist diese Figur kulturelles Gemeingut.',
      beispiel: 'Der is immer so en Guckindieluft — der vergisst alles!',
      beispiel_hd: 'Der ist immer so ein Träumer — der vergisst alles!',
      kategorie: 'menschen'
    },
    {
      id: 'h-043',
      ausdruck: 'de Erbarme',
      hochdeutsch: 'das Erbarmen / erbärmlicher Zustand',
      bedeutung: '„Es is zum de Erbarme" — eine dramatische hessische Übertreibung für einen bejammernswerten Zustand. Das Wort beschreibt etwas so Schlimmes oder Trauriges, dass man nur noch Mitleid empfinden kann. Die hessische Dialektfärbung verleiht dem Ausdruck eine besondere emotionale Tiefe.',
      beispiel: 'Wie er da steht im Regen — es is wirklich zum de Erbarme.',
      beispiel_hd: 'Wie er da steht im Regen — es ist wirklich zum Erbarmen.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-044',
      ausdruck: 'Rammbock',
      hochdeutsch: 'sturer Mensch / Dickkopf',
      bedeutung: 'Ein bockiger, unnachgiebiger Mensch, der seine Meinung nicht ändert — wie ein Rammbock (ein schwerer Balken, der Tore einschlägt). Das Wort drückt eine Kombination aus Sturheit und Kraft aus. „Du bist en richticher Rammbock!" ist Kritik und Respekt zugleich.',
      beispiel: 'Mit dem kannste ned diskudiern, der is en echter Rammbock.',
      beispiel_hd: 'Mit dem kann man nicht diskutieren, der ist ein echter Dickkopf.',
      kategorie: 'menschen'
    },
    {
      id: 'h-045',
      ausdruck: 'Spaßverderber',
      hochdeutsch: 'Spielverderber / Miesepeter',
      bedeutung: 'Jemand, der anderen die Freude und den Spaß verdirbt — ein Spielverderber. Das Wort ist im gesamten deutschen Sprachraum gebräuchlich, aber in Hessen hat es eine besondere Schärfe. Gegen einen Spaßverderber wehrt man sich hessisch: „Babbel net rum und mach mit!"',
      beispiel: 'Sei kaan Spaßverderber und kumm mit uff die Party!',
      beispiel_hd: 'Sei kein Spielverderber und komm mit auf die Party!',
      kategorie: 'menschen'
    },
    {
      id: 'h-046',
      ausdruck: 'Batzbrill',
      hochdeutsch: 'alte, schlechte Brille',
      bedeutung: 'Eine abgewetzte, schlecht sitzende oder dicke alte Brille. „Batz" bezeichnet im Hessischen etwas Kleckerndes, Klebriges oder Minderwertiges. Die Batzbrill ist ein Kennzeichen des schrulligen Alten oder des armseligen Äußeren — oft liebevoll-spöttisch gemeint.',
      beispiel: 'Mit deinr Batzbrill siehst du ja nix richtig!',
      beispiel_hd: 'Mit deiner alten Brille siehst du ja nichts richtig!',
      kategorie: 'koerper'
    },
    {
      id: 'h-047',
      ausdruck: 'Worschtbrot',
      hochdeutsch: 'Wurstbrot / einfaches Pausenbrot',
      bedeutung: 'Das schlichte Pausenbrot mit Wurst — ein Klassiker in hessischen Schultaschen und auf Baustellen. Das Worschtbrot symbolisiert hessische Bodenständigkeit: keine Haute Cuisine, aber ehrlich, sättigend und gut. Mit Hausmacher-Wurst auf frischem Bauernbrot ist es ein regelrechter Genuss.',
      beispiel: 'Ich hab heut nur en Worschtbrot dabei — des muss reiche.',
      beispiel_hd: 'Ich habe heute nur ein Wurstbrot dabei — das muss reichen.',
      kategorie: 'essen'
    },
    {
      id: 'h-048',
      ausdruck: 'Geischt',
      hochdeutsch: 'Geist / Gespenst',
      bedeutung: 'Die hessische Aussprache von „Geist" — mit weichem „ei" und stimmhaftem Schluss. Bezeichnet sowohl den menschlichen Geist als auch Gespenster und Spukgestalten. In der ländlichen hessischen Folklore gibt es zahlreiche Geischt-Geschichten über Waldgeister, Irrlichter und umgehende Seelen.',
      beispiel: 'Des Haus ist voll Grusel — da geht bestimmt en Geischt um!',
      beispiel_hd: 'Das Haus ist voll gruselig — da geht bestimmt ein Gespenst um!',
      kategorie: 'redensart'
    },
    {
      id: 'h-049',
      ausdruck: 'Hesselappe',
      hochdeutsch: 'typischer Hesse (selbstironisch)',
      bedeutung: 'Eine selbstironische Bezeichnung für den Hessen — oft mit Augenzwinkern verwendet. Der Hesse weiß, dass er manchmal stur, direkt und eigenbrötlerisch wirkt, und macht daraus einen Witz. „Ich bin halt ne echte Hesselappe" ist Selbstbekenntnis und Liebeserklärung ans Heimatland zugleich.',
      beispiel: 'Ich bin halt ne echte Hesselappe — Ebbelwoi und guude Laune!',
      beispiel_hd: 'Ich bin halt ein echter Hesse — Apfelwein und gute Laune!',
      kategorie: 'menschen'
    },
    {
      id: 'h-050',
      ausdruck: 'Buchstabensupp',
      hochdeutsch: 'Buchstabensuppe / Kauderwelsch',
      bedeutung: 'Eigentlich eine Kindersuppenspezialität mit Buchstabennudeln — übertragen aber auch ein Durcheinander von Wörtern oder unverständliches Gerede. „Des is ja alles nur Buchstabensupp" bedeutet, dass etwas verwirrend und ohne Sinn ist. In Hessen ein humorvoller Weg, Kompliziertes abzutun.',
      beispiel: 'Was du da redest, is nur Buchstabensupp — ich verstehs ned!',
      beispiel_hd: 'Was du da redest, ist nur Kauderwelsch — ich verstehe es nicht!',
      kategorie: 'redensart'
    },
    {
      id: 'h-054',
      ausdruck: 'Eintracht',
      hochdeutsch: 'Eintracht Frankfurt (Fußballverein)',
      bedeutung: 'Eintracht Frankfurt — kurz „Eintracht" oder „die Adler" — ist der Fußballverein der Mainmetropole und Identifikationsobjekt der Frankfurter. Gegründet 1899, spielen sie im Deutsche-Bank-Park (früher Waldstadion). Der UEFA-Cup-Sieg 2022 in Sevilla löste in Frankfurt einen Freudentaumel aus. „SGE — Schwarz-Weiß bis zum Tod!" lautet der Schlachtruf.',
      beispiel: 'Am Samstag spielt die Eintracht — da muss ich ins Stadion!',
      beispiel_hd: 'Am Samstag spielt Eintracht Frankfurt — da muss ich ins Stadion!',
      kategorie: 'sport'
    },
    {
      id: 'h-055',
      ausdruck: 'FFM',
      hochdeutsch: 'Frankfurt am Main',
      bedeutung: 'FFM ist die liebevoll-knappe Abkürzung für Frankfurt am Main, die Mainmetropole und Finanzhauptstadt Deutschlands. Mit ihren Wolkenkratzern — „Mainhattan" — bietet sie eine einzigartige Skyline. Sitz der Europäischen Zentralbank, größter deutscher Flughafen und Heimat der Frankfurter Buchmesse. Echte Hessen sagen oft einfach „die Stadt", wenn sie Frankfurt meinen.',
      beispiel: 'Morgen muss ich nach FFM, wegen dem Termin in der Bank.',
      beispiel_hd: 'Morgen muss ich nach Frankfurt, wegen des Termins in der Bank.',
      kategorie: 'orte'
    },
    {
      id: 'h-056',
      ausdruck: 'Goethe',
      hochdeutsch: 'Johann Wolfgang von Goethe',
      bedeutung: 'Johann Wolfgang von Goethe (1749–1832) ist Frankfurts berühmtester Sohn und einer der bedeutendsten deutschen Dichter überhaupt. Geboren am Großen Hirschgraben, verbrachte er hier seine Jugend und schrieb Werke wie „Götz von Berlichingen" und „Die Leiden des jungen Werthers". Das Goethehaus ist heute Museum, und die Goethe-Universität trägt seinen Namen. Goethe liebte angeblich Frankfurter Grüne Soße.',
      beispiel: 'Goethe is der bekannteste Frankfurter — auch wenn er in Weimar gestorben is.',
      beispiel_hd: 'Goethe ist der bekannteste Frankfurter — auch wenn er in Weimar gestorben ist.',
      kategorie: 'menschen'
    },
    {
      id: 'h-057',
      ausdruck: 'Buchmess',
      hochdeutsch: 'Frankfurter Buchmesse',
      bedeutung: 'Die Frankfurter Buchmesse ist die weltgrößte Buchmesse und findet jedes Jahr im Oktober statt. Mit ihren Wurzeln im 15. Jahrhundert (kurz nach Gutenbergs Erfindung) ist sie die älteste Messe ihrer Art. Verleger aus aller Welt handeln hier Lizenzen, und das Publikum strömt am Wochenende ins Messegelände. Der Friedenspreis des Deutschen Buchhandels wird traditionell zur Buchmesse verliehen.',
      beispiel: 'Im Oktober is wieder Buchmess — die ganze Stadt is voll.',
      beispiel_hd: 'Im Oktober ist wieder Buchmesse — die ganze Stadt ist voll.',
      kategorie: 'orte'
    },
    {
      id: 'h-061',
      ausdruck: 'Schwälmer Land',
      hochdeutsch: 'Schwalm (Region in Nordhessen)',
      bedeutung: 'Das Schwälmer Land in Nordhessen ist eine traditionsreiche Region, bekannt für ihre einzigartige Tracht — die roten Schwälmer Hauben und die langen Trachtenröcke sind weltbekannt. Hier sollen die Brüder Grimm die Inspiration für Rotkäppchen gefunden haben. Die Schwälmer pflegen ihre Bräuche bis heute und tragen die Tracht zu Festen und kirchlichen Anlässen.',
      beispiel: 'Die Schwälmer Tracht is weltbekannt — die rote Hauben kennt jeder.',
      beispiel_hd: 'Die Schwälmer Tracht ist weltbekannt — die roten Hauben kennt jeder.',
      kategorie: 'orte'
    },
    {
      id: 'h-068',
      ausdruck: 'Hessischer Rundfunk',
      hochdeutsch: 'Hessischer Rundfunk (HR)',
      bedeutung: 'Der Hessische Rundfunk (HR) ist die öffentlich-rechtliche Rundfunkanstalt für Hessen mit Sitz in Frankfurt. Bekannt sind Sendungen wie „Hallo Hessen", die hessischen Tatort-Folgen und „Die Hessen-Schau". HR3 ist einer der beliebtesten Radiosender Hessens. Der HR pflegt aktiv den hessischen Dialekt mit Mundart-Sendungen wie „Bei Bachmann".',
      beispiel: 'Den Hessischen Rundfunk hör ich jeden Morge im Auto.',
      beispiel_hd: 'Den Hessischen Rundfunk höre ich jeden Morgen im Auto.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-069',
      ausdruck: 'Bei mir net!',
      hochdeutsch: 'Bei mir nicht! / Nicht mit mir!',
      bedeutung: 'Ein typisch hessischer Ausruf der Ablehnung — wenn jemand etwas vorschlägt oder behauptet, was man nicht akzeptieren möchte. „Bei mir net!" macht klar: Da bin ich raus, das mache ich nicht mit. Klingt resolut und unmissverständlich, aber durch den hessischen Tonfall niemals wirklich aggressiv. Ein Klassiker des hessischen Selbstbehauptung.',
      beispiel: 'Du willst, dass ich des bezahl? Bei mir net!',
      beispiel_hd: 'Du willst, dass ich das bezahle? Nicht mit mir!',
      kategorie: 'redensart'
    },
    {
      id: 'h-070',
      ausdruck: 'Gude!',
      hochdeutsch: 'Hallo! / Guten Tag!',
      bedeutung: 'Die ultrakurze hessische Begrüßung — abgeleitet von „guten Tag", aber radikal verkürzt zu einer einzigen Silbe. „Gude" funktioniert zu jeder Tageszeit, von morgens bis abends, und drückt herzliche Vertrautheit aus. Manchmal wird die Begrüßung sogar nur als „Gude!" hingeworfen, ohne dass das angesprochene Gegenüber direkt antworten muss.',
      beispiel: 'Gude, wie gehts? — Aach gude, kanns ned klage.',
      beispiel_hd: 'Hallo, wie gehts? — Auch hallo, kann nicht klagen.',
      kategorie: 'begruessung'
    },
    {
      id: 'h-071',
      ausdruck: 'Frankforter Worschtche',
      hochdeutsch: 'Frankfurter Würstchen',
      bedeutung: 'Die original Frankfurter Würstchen sind seit 1860 EU-geschützt — nur in Frankfurt am Main und Umgebung darf das Original hergestellt werden. Die schlanken, im Buchenholz geräucherten Brühwürste aus Schweinefleisch werden traditionell nur in heißem Wasser erhitzt, nicht gekocht. Mit Senf und Brot oder Kartoffelsalat sind sie ein hessischer Klassiker — und Vorbild für die amerikanischen Hot Dogs.',
      beispiel: 'Zum Mittag gibts Frankforter Worschtche mit Kartoffelsalat.',
      beispiel_hd: 'Zum Mittag gibt es Frankfurter Würstchen mit Kartoffelsalat.',
      kategorie: 'essen'
    },
    {
      id: 'h-072',
      ausdruck: 'Glubschauche',
      hochdeutsch: 'Glupschaugen / große starrende Augen',
      bedeutung: 'Bezeichnung für jemanden mit auffällig großen, hervortretenden Augen oder dafür, jemanden mit weit aufgerissenen Augen anzustarren. „Mach kaa Glubschauche!" sagt man zu jemandem, der ungläubig oder dümmlich starrt. Das Wort kombiniert „glubschen" (starren) mit „Auche" (hessisch für Augen) und ist liebevoll-spöttisch gemeint.',
      beispiel: 'Was machste denn für Glubschauche? Hast du en Geischt gsehe?',
      beispiel_hd: 'Was machst du denn für Glupschaugen? Hast du ein Gespenst gesehen?',
      kategorie: 'koerper'
    },
    {
      id: 'h-074',
      ausdruck: 'Quetschekuche',
      hochdeutsch: 'Zwetschgenkuchen',
      bedeutung: 'Der hessische Quetschekuche (Zwetschgenkuchen) ist im Spätsommer und Herbst ein Klassiker auf jedem Kaffeetisch. Ein Blechkuchen aus Hefeteig oder Mürbeteig, dicht belegt mit halbierten, entsteinten Zwetschgen und oft mit Streuseln oder Zimt-Zucker bestreut. Manche hessische Hausfrauen behaupten, der beste Quetschekuche werde mit Hefeteig gebacken.',
      beispiel: 'Mit Schlagsahne is der Quetschekuche unschlagbar!',
      beispiel_hd: 'Mit Schlagsahne ist der Zwetschgenkuchen unschlagbar!',
      kategorie: 'essen'
    },
    {
      id: 'h-075',
      ausdruck: 'Bach',
      hochdeutsch: 'Bach (im Frankfurter Lokalkolorit: Main)',
      bedeutung: 'In Frankfurt nennt man den Main liebevoll-augenzwinkernd „de Bach" — was die Frankfurter mit milder Selbstironie sehen: Der Main ist natürlich kein Bach, sondern ein Strom. Die Hibbdebach-Dribbdebach-Unterscheidung (siehe h-007) baut darauf auf. Auch außerhalb Frankfurts ist „Bach" das normale Wort für einen kleinen Fluss.',
      beispiel: 'Mer gehn am Bach spaziere — der Main is heut so schön.',
      beispiel_hd: 'Wir gehen am Main spazieren — der Main ist heute so schön.',
      kategorie: 'natur'
    },
    {
      id: 'h-076',
      ausdruck: 'Lumbe',
      hochdeutsch: 'Lumpen / liederlicher Mensch',
      bedeutung: 'Ein „Lumbe" ist eigentlich ein Lumpen (alter Stofffetzen), wird im Hessischen aber häufig übertragen für einen liederlichen, unzuverlässigen Menschen verwendet. „Du aler Lumbe!" kann milde tadelnd, aber auch wirklich schimpfend gemeint sein. In manchen Gegenden ist es fast schon ein liebevoller Ausdruck unter Freunden.',
      beispiel: 'Der aler Lumbe hat mir schon wieder ned zurückgerufe!',
      beispiel_hd: 'Der alte Lump hat mir schon wieder nicht zurückgerufen!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-077',
      ausdruck: 'kaputt',
      hochdeutsch: 'kaputt / müde / erschöpft',
      bedeutung: 'Im hessischen Sprachgebrauch wird „kaputt" nicht nur für defekte Gegenstände, sondern auch für erschöpfte Menschen verwendet. „Ich bin total kaputt!" bedeutet, dass man völlig fertig ist nach einem anstrengenden Tag. Das Wort kommt vom französischen „capot" (geschlagen, besiegt) — wer kaputt ist, hat schlicht keine Reserven mehr.',
      beispiel: 'Nach der Schaffer am Bau bin ich abends echt kaputt.',
      beispiel_hd: 'Nach der Arbeit am Bau bin ich abends echt erschöpft.',
      kategorie: 'koerper'
    },
    {
      id: 'h-078',
      ausdruck: 'Bei!',
      hochdeutsch: 'Hi! / Hey! (Begrüßung)',
      bedeutung: 'Eine kurze, lockere hessische Begrüßung unter Vertrauten — vor allem im Frankfurter Raum üblich. „Bei!" wird oft mit „Gude!" kombiniert oder allein verwendet, besonders unter jungen Leuten. Die Begrüßung ist informell und herzlich, kann aber auch als Aufmerksamkeitsruf dienen: „Bei, hörste mer zu?".',
      beispiel: 'Bei, alles fit?',
      beispiel_hd: 'Hey, alles gut?',
      kategorie: 'begruessung'
    },
    {
      id: 'h-079',
      ausdruck: 'Bappe',
      hochdeutsch: 'Papa / Vater',
      bedeutung: 'Die hessisch-liebevolle Bezeichnung für den Vater — entspricht dem hochdeutschen „Papa", klingt aber breiter und weicher. „Mei Bappe" ist die typische Anrede für den eigenen Vater im hessischen Familienleben. Das Wort verbindet Wärme und Respekt und ist von Generation zu Generation überliefert. Bei kleinen Kindern: „Bei zum Bappe!"',
      beispiel: 'Mei Bappe baut grad an seinem Häusche im Garten.',
      beispiel_hd: 'Mein Papa baut gerade an seinem Häuschen im Garten.',
      kategorie: 'familie'
    },
    {
      id: 'h-080',
      ausdruck: 'Mamme',
      hochdeutsch: 'Mama / Mutter',
      bedeutung: 'Das hessische Gegenstück zum „Bappe" — die liebevolle Bezeichnung für die Mutter. „Mei Mamme" hat einen warmen, vertrauten Klang und drückt die enge Familienbindung der Hessen aus. Großmütter werden oft „Großmamme" oder einfach „Oma" genannt. Bei kleinen Kindern: „Bei zur Mamme!" ist häufig das erste Wort.',
      beispiel: 'Mei Mamme kocht die beste Grie Soß weit und breit.',
      beispiel_hd: 'Meine Mama kocht die beste Grüne Soße weit und breit.',
      kategorie: 'familie'
    },
    {
      id: 'h-081',
      ausdruck: 'Frankforter Schoppe-Pedder',
      hochdeutsch: 'Frankfurter Apfelweinkenner',
      bedeutung: 'Ein „Schoppe-Pedder" (Schoppen-Peter) ist ein eingefleischter Frankfurter Apfelweinkenner und Stammgast in den Sachsenhäuser Wirtschaften — meist ein älterer Herr, der über jede Sorte Bescheid weiß und genau seine Lieblingswirtschaft hat. Der Schoppe-Pedder ist eine Frankfurter Institution: humorvoll, schlagfertig und immer mit einem Geripptes in der Hand.',
      beispiel: 'Mei Opa war en echter Schoppe-Pedder — der kannte jeden Wirt persönlich.',
      beispiel_hd: 'Mein Opa war ein echter Apfelweinkenner — der kannte jeden Wirt persönlich.',
      kategorie: 'menschen'
    },
    {
      id: 'h-082',
      ausdruck: 'Klaane',
      hochdeutsch: 'die Kleine / das kleine Mädchen',
      bedeutung: 'Liebevolle hessische Bezeichnung für ein kleines Mädchen oder die jüngste Tochter — auch als Kosename für die Partnerin im Gebrauch. „Mei Klaane" hat einen sehr zärtlichen Klang. Bei größeren Familien differenziert man oft: „die Klaane" (die jüngste Tochter), „die Mittler" und „die Groß" (die älteste).',
      beispiel: 'Mei Klaane geht jetzt schon in die Schul!',
      beispiel_hd: 'Meine Kleine geht jetzt schon in die Schule!',
      kategorie: 'familie'
    },
    {
      id: 'h-084',
      ausdruck: 'Bobbes',
      hochdeutsch: 'Hintern / Po',
      bedeutung: 'Eine humorvoll-zärtliche hessische Bezeichnung für den Hintern — vor allem bei Kindern und in entspannter Familienatmosphäre verwendet. „Setz dei Bobbes hin!" ist eine freundlich-direkte Aufforderung zum Hinsetzen. Das Wort ist weich und harmlos und kommt in keiner gehobenen Konversation, aber ständig im Alltag vor.',
      beispiel: 'Setz dei Bobbes hin und iss endlich!',
      beispiel_hd: 'Setz dich endlich hin und iss!',
      kategorie: 'koerper'
    },
    {
      id: 'h-085',
      ausdruck: 'Pleitegeier',
      hochdeutsch: 'Pleitegeier / drohende Pleite',
      bedeutung: 'Der „Pleitegeier" ist eine bildhafte Metapher für drohende finanzielle Schwierigkeiten oder den finanziellen Ruin. „Der Pleitegeier kreist über mir" sagt man, wenn die Schulden überhand nehmen. Das Wort ist im gesamten deutschen Sprachraum bekannt, hat aber im hessischen Kaufmannskontext (Frankfurt als Finanzplatz) eine besondere Resonanz.',
      beispiel: 'Wenn ich noch mehr ausgib, kreist gleich der Pleitegeier!',
      beispiel_hd: 'Wenn ich noch mehr ausgebe, droht die Pleite!',
      kategorie: 'arbeit'
    },
    {
      id: 'h-086',
      ausdruck: 'Schniefnas',
      hochdeutsch: 'Schnupfennase / verschnupfter Mensch',
      bedeutung: 'Eine liebevoll-spöttische hessische Bezeichnung für jemanden mit verstopfter, schniefender Nase — meist im Winter bei Erkältungswelle. „Du klaaner Schniefnas!" ist mitfühlend und neckend zugleich. Das Wort kombiniert „schniefen" (durch die Nase ziehen) mit „Nas" und gehört zum hessischen Gesundheitsvokabular.',
      beispiel: 'Mei Klaane is schon wieder en Schniefnas — der dritte Schnupfe im Winter!',
      beispiel_hd: 'Meine Kleine hat schon wieder Schnupfen — der dritte im Winter!',
      kategorie: 'koerper'
    },
    {
      id: 'h-087',
      ausdruck: 'Räs',
      hochdeutsch: 'ranzig / sehr reif (Käse)',
      bedeutung: '„Räs" beschreibt im hessischen Sprachgebrauch einen Käse, der sehr reif, würzig und scharf im Geschmack ist — besonders Handkäs mit Musik wird so beschrieben. Ein „räser Käs" ist nichts für Kostverächter. Das Wort hat eine positive Konnotation für Käseliebhaber — je räser, desto besser! Der Begriff ist verwandt mit dem schwäbischen „räs".',
      beispiel: 'Der Handkäs is heut richtig räs — genau wie ich ihn mag!',
      beispiel_hd: 'Der Handkäse ist heute richtig würzig — genau wie ich ihn mag!',
      kategorie: 'essen'
    },
    {
      id: 'h-088',
      ausdruck: 'Adventszeit',
      hochdeutsch: 'Adventszeit / Vorweihnachtszeit',
      bedeutung: 'Die Adventszeit hat in Hessen eine besondere Bedeutung — die Weihnachtsmärkte in Frankfurt (Römerberg), Wiesbaden (Sternschnuppenmarkt) und Marburg gehören zu den schönsten Deutschlands. Glühwein, Bethmännchen (Frankfurter Marzipangebäck) und Bratwurst gehören dazu. Der Frankfurter Weihnachtsmarkt ist einer der ältesten Deutschlands, urkundlich seit 1393 belegt.',
      beispiel: 'In der Adventszeit gehe mer jedes Wochenend uff den Weihnachtsmarkt.',
      beispiel_hd: 'In der Adventszeit gehen wir jedes Wochenende auf den Weihnachtsmarkt.',
      kategorie: 'redensart'
    },
    {
      id: 'h-089',
      ausdruck: 'Bethmännche',
      hochdeutsch: 'Bethmännchen (Frankfurter Marzipangebäck)',
      bedeutung: 'Bethmännchen sind kleine Marzipanküchlein mit drei halben Mandeln rundherum, eine Frankfurter Weihnachtsspezialität. Sie wurden angeblich vom Konditor des Bankiers Bethmann erfunden — die drei Mandeln symbolisieren die drei Söhne. Heute gibt es sie in jeder Frankfurter Bäckerei zur Adventszeit. Süß, mandelig und mit knuspriger Oberseite.',
      beispiel: 'Zur Adventszeit dürfen Bethmännche nicht fehle!',
      beispiel_hd: 'Zur Adventszeit dürfen Bethmännchen nicht fehlen!',
      kategorie: 'essen'
    },
    {
      id: 'h-090',
      ausdruck: 'Brieselche',
      hochdeutsch: 'Brezel (verkleinert)',
      bedeutung: 'Die hessische Verkleinerungsform von Brezel — ein „Brieselche" ist ein kleines, niedliches Brezel. Brezeln gehören in Hessen zu jedem Frühstück und Abendessen, oft mit Butter oder als Beilage zum Apfelwein. In Sachsenhausen werden Brezelverkäufer mit großen Körben durch die Apfelweinwirtschaften ziehen — ein Brieselche zum Geripptes ist Tradition.',
      beispiel: 'En Brieselche zum Schoppe, des is Frankforter Lebensgefühl!',
      beispiel_hd: 'Eine Brezel zum Apfelweinglas, das ist Frankfurter Lebensgefühl!',
      kategorie: 'essen'
    },
    {
      id: 'h-091',
      ausdruck: 'Schäfer',
      hochdeutsch: 'Schäfer (Beruf)',
      bedeutung: 'Der Schäfer ist in den hessischen Mittelgebirgen — besonders in der Rhön und im Vogelsberg — noch ein lebendiger Beruf. Hessische Schäfer hüten ihre Herden auf den Hochweiden und Wacholderheiden. Die Rhönschafe sind eine traditionelle hessische Rasse. Das Schäferleben ist hart, aber der Beruf wird in Hessen aktiv erhalten als Kulturlandschaftspflege.',
      beispiel: 'In der Rhön gibts noch echte Schäfer, die im Sommer mit ihre Schaf wandere.',
      beispiel_hd: 'In der Rhön gibt es noch echte Schäfer, die im Sommer mit ihren Schafen wandern.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-092',
      ausdruck: 'Mei Lieber!',
      hochdeutsch: 'Meine Güte! / Mein Lieber!',
      bedeutung: 'Ein hessischer Ausruf der Überraschung, des Erstaunens oder der freundlichen Begrüßung. „Mei Lieber!" wird ausgesprochen wie eine kleine Ode an die Verwunderung. Kann auch als direkte Anrede gemeint sein („Mei Lieber, was machst du da?") oder als alleinstehender Ausruf bei Überraschung. Sehr typisch für ältere Hessen.',
      beispiel: 'Mei Lieber, des wars vielleicht en Tag!',
      beispiel_hd: 'Meine Güte, das war vielleicht ein Tag!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-093',
      ausdruck: 'Bach runner',
      hochdeutsch: 'den Bach hinunter / kaputt gehen',
      bedeutung: 'Eine bildhafte hessische Redewendung für etwas, das verloren geht, kaputt geht oder schlecht endet. „Des geht den Bach runner!" bedeutet, dass etwas in die Brüche geht oder ein Projekt scheitert. Im Frankfurter Lokalkolorit hat „Bach" eine doppelte Bedeutung — auch der Main wird so genannt (siehe h-075). Ein häufig benutzter Ausdruck.',
      beispiel: 'Wenn des so weidergeht, geht die Firma den Bach runner.',
      beispiel_hd: 'Wenn das so weitergeht, geht die Firma den Bach hinunter.',
      kategorie: 'redensart'
    },
    {
      id: 'h-094',
      ausdruck: 'Schorle',
      hochdeutsch: 'Schorle (Wein- oder Apfelweinschorle)',
      bedeutung: 'Die hessische Schorle ist meist eine Apfelweinschorle — Ebbelwoi gemischt mit Mineralwasser, im Sommer das ideale Erfrischungsgetränk. „Sauer-Gespritzte" nennt man die saure Variante, „Süß-Gespritzte" die Version mit Limonade. In den Frankfurter Wirtschaften wird die Mischung im Verhältnis 50:50 angesetzt. Eine Schorle ist leichter als reiner Apfelwein.',
      beispiel: 'Im Sommer trink ich am liebsten en Sauer-Gespritzte, also Ebbelwoi-Schorle mit Sprudel.',
      beispiel_hd: 'Im Sommer trinke ich am liebsten eine saure Apfelweinschorle, also Apfelwein mit Sprudelwasser.',
      kategorie: 'essen'
    },
    {
      id: 'h-095',
      ausdruck: 'Vorm Lade',
      hochdeutsch: 'vor dem Laden / vor der Türe',
      bedeutung: 'Eine typisch hessische Ortsangabe — „vorm Lade" bedeutet vor dem Geschäft oder Wirtshaus. Klassisch ist „die Bank vorm Lade" — der Sitzplatz vor der Apfelweinwirtschaft, wo die Stammgäste im Sommer Bier oder Apfelwein trinken und das Treiben beobachten. Ein soziales Zentrum kleiner hessischer Orte.',
      beispiel: 'Komm, mer setze uns vorm Lade — dort isses am gemütlichste!',
      beispiel_hd: 'Komm, wir setzen uns vor das Wirtshaus — dort ist es am gemütlichsten!',
      kategorie: 'orte'
    },
    {
      id: 'h-096',
      ausdruck: 'Pellkartoffele',
      hochdeutsch: 'Pellkartoffeln',
      bedeutung: 'Pellkartoffeln sind in Hessen Standard-Beilage zu Grüner Soße, Handkäs und vielen anderen Gerichten. Mit Schale gekocht, dann gepellt und manchmal noch warm mit Salz, Butter oder Quark serviert. „Grumbeere mit der Pell" sagen ältere Hessen. Die Kartoffel ist seit dem 18. Jahrhundert hessisches Grundnahrungsmittel — der „Kartoffelkrieg" von 1778 spielte teilweise auf hessischem Gebiet.',
      beispiel: 'Zur Grie Soß gehöre einfach warme Pellkartoffele dazu!',
      beispiel_hd: 'Zur Grünen Soße gehören einfach warme Pellkartoffeln dazu!',
      kategorie: 'essen'
    },
    {
      id: 'h-097',
      ausdruck: 'Halbe',
      hochdeutsch: 'halber Liter Bier',
      bedeutung: 'Die „Halbe" ist im hessischen Wirtshaus die Standardbestellung für Bier — ein halber Liter. Anders als in Bayern (wo die „Maß" zu einem Liter Standard ist) und ähnlich wie in Franken trinkt der Hesse seine Halbe. Die Frankfurter Wirtschaftsleute haben sich auch hier von ihren bayerischen Nachbarn distanziert — Apfelwein und Halbe statt Maß sind hessische Norm.',
      beispiel: 'Drei Halbe Pils, biddesche!',
      beispiel_hd: 'Drei halbe Liter Pils, bitte!',
      kategorie: 'essen'
    },
    {
      id: 'h-098',
      ausdruck: 'Sauwedder',
      hochdeutsch: 'Sauwetter / schlechtes Wetter',
      bedeutung: 'Eine deftige hessische Bezeichnung für miserables Wetter — Regen, Sturm, Kälte oder alles zusammen. „Sauwedder" verbindet das Wort „Sau" (als Verstärkung) mit „Wedder" (hessische Aussprache von Wetter). Der Ausdruck ist im gesamten deutschen Sprachraum verbreitet, klingt aber im hessischen Mund besonders kernig.',
      beispiel: 'So en Sauwedder, da bleib mer doch im Haus!',
      beispiel_hd: 'So ein Sauwetter, da bleibt man doch im Haus!',
      kategorie: 'natur'
    },
    {
      id: 'h-099',
      ausdruck: 'Babbelwasser',
      hochdeutsch: 'Alkohol / Schwatzdrink',
      bedeutung: 'Eine humorvolle hessische Bezeichnung für alkoholische Getränke — meist Apfelwein oder Bier — die einen zum Reden bringen. Die Verbindung von „babbeln" (reden) und „Wasser" (Trinken) macht klar: Wenn das Babbelwasser fließt, hört das Reden nicht mehr auf. Selbstironisch gemeint — Hessen wissen um ihre Vorliebe fürs Schwätzchen.',
      beispiel: 'Nach drei Schoppe Babbelwasser hört der nimmer auf zu rede!',
      beispiel_hd: 'Nach drei Gläsern Apfelwein hört der nicht mehr auf zu reden!',
      kategorie: 'redensart'
    },
    {
      id: 'h-100',
      ausdruck: 'Hessebabb',
      hochdeutsch: 'Hessenstolz / Hessenliebe',
      bedeutung: 'Ein selbstironisch-stolzer hessischer Begriff für den ausgeprägten Heimatstolz der Hessen. Der „Hessebabb" mag sein Land über alles — Ebbelwoi, Grie Soß, Eintracht Frankfurt, der Vogelsberg und das hemdsärmelige Wesen seiner Landsleute. „Ich bin halt en echter Hessebabb!" ist Bekenntnis und Liebeserklärung an die Heimat zugleich. Hessisches Identitätsgefühl in einem Wort.',
      beispiel: 'Ich bin Hessebabb durch und durch — Frankfurt is meine Heimat!',
      beispiel_hd: 'Ich bin Hesse durch und durch — Frankfurt ist meine Heimat!',
      kategorie: 'menschen'
    },
    {
      id: 'h-104',
      ausdruck: 'Wiesbaden',
      hochdeutsch: 'Wiesbaden (Landeshauptstadt Hessens)',
      bedeutung: 'Wiesbaden ist die Landeshauptstadt Hessens — eine elegante Kurstadt mit reicher Bädertradition. Berühmt: das Kurhaus mit dem Casino (Dostojewski verspielte hier sein Vermögen), die Kaiser-Friedrich-Therme und der historische Marktplatz. Auch Sitz der Hessischen Landesregierung. Im Gegensatz zum hektischen Frankfurt ist Wiesbaden gediegen und etwas alt-modisch — was den Charme der Stadt ausmacht.',
      beispiel: 'In Wiesbaden in den Thermen baden — pure Erholung.',
      beispiel_hd: 'In Wiesbaden in den Thermen baden — pure Erholung.',
      kategorie: 'orte'
    },
    {
      id: 'h-105',
      ausdruck: 'Rüdesheim',
      hochdeutsch: 'Rüdesheim am Rhein',
      bedeutung: 'Rüdesheim am Rhein ist eine Touristen-Hochburg an der Rheinschleife — bekannt für die Drosselgasse (eine 144 m lange Weinstraße mit Restaurants), die Niederwald-Statue (Germania-Denkmal) und Asbach Uralt (Weinbrand). Im Sommer drängen sich Touristen aus aller Welt durch die Gassen. Ehrlicher hessischer Rheingauer Riesling und der typische Lebensstil sind hier zu erleben.',
      beispiel: 'Nach Rüdesheim in die Drosselgasse fahr i nur wegen dem Riesling.',
      beispiel_hd: 'Nach Rüdesheim in die Drosselgasse fahre ich nur wegen des Rieslings.',
      kategorie: 'orte'
    },
    {
      id: 'h-106',
      ausdruck: 'Rheingau',
      hochdeutsch: 'Rheingau (Weinregion)',
      bedeutung: 'Der Rheingau ist eine der wichtigsten deutschen Weinregionen — am Rhein zwischen Wiesbaden und Lorch. Berühmt für Spätlese- und Auslese-Rieslinge. Schloss Johannisberg, Kloster Eberbach (mit „Steinberg") und Schloss Vollrads sind ikonische Weingüter. Der „Riesling-Sommer" Rheingau Musik Festival lockt Touristen. Die spätsommerliche Weinlese ist hier seit über 1.200 Jahren Tradition — Karl der Große ordnete den Weinbau hier an.',
      beispiel: 'En guter Rheingau-Riesling — des isch hessischer Weingenuss pur.',
      beispiel_hd: 'Ein guter Rheingau-Riesling — das ist hessischer Weingenuss pur.',
      kategorie: 'essen'
    },
    {
      id: 'h-110',
      ausdruck: 'Hessenpark',
      hochdeutsch: 'Freilichtmuseum Hessenpark',
      bedeutung: 'Der Hessenpark in Neu-Anspach (Taunus) ist Hessens großes Freilichtmuseum — 60 Hektar mit historischen Häusern, Kirchen, Mühlen und Werkstätten aus ganz Hessen, dort wieder aufgebaut. Besucher erleben hessisches Landleben der letzten Jahrhunderte. Handwerker zeigen traditionelle Künste (Schmieden, Töpfern, Bierbrauen). Ein einzigartiges Museum, das hessisches Erbe lebendig hält.',
      beispiel: 'Im Hessenpark erlebst du Hessen aus 500 Jahren.',
      beispiel_hd: 'Im Hessenpark erlebst du Hessen aus 500 Jahren.',
      kategorie: 'orte'
    },
    {
      id: 'h-113',
      ausdruck: 'Eintracht-Hymne',
      hochdeutsch: 'Im Herzen von Europa (Eintracht-Hymne)',
      bedeutung: 'Die Eintracht-Hymne „Im Herzen von Europa" (gesungen vom hessischen Liedermacher Hans-Jürgen „Hänsel" Klotz) ist seit den 80er Jahren die offizielle Vereinshymne der Eintracht Frankfurt. Im Waldstadion (Deutsche Bank Park) singen 50.000 Fans bei jedem Heimspiel mit. „Eintracht Frankfurt, in unseren Herzen / Im Herzen von Europa." Pflicht-Karaoke für jeden Frankfurter Fan.',
      beispiel: 'Wenn die SGE-Hymne läuft, krieg i Gänsehaut.',
      beispiel_hd: 'Wenn die Eintracht-Hymne läuft, bekomme ich Gänsehaut.',
      kategorie: 'sport'
    },
    {
      id: 'h-114',
      ausdruck: 'Frankfurter Buchmesse',
      hochdeutsch: 'Frankfurter Buchmesse (Weltmesse)',
      bedeutung: 'Die Frankfurter Buchmesse ist die größte Buchmesse der Welt — seit 1949 jährlich im Oktober. Über 7.300 Aussteller aus 100 Ländern, 250.000 Besucher. Hier werden internationale Lizenzen verhandelt, neue Bücher vorgestellt, der Friedenspreis des Deutschen Buchhandels verliehen. Ehrengast ist jährlich ein anderes Land. Für die deutsche Buchbranche ist die Buchmesse das wichtigste Ereignis des Jahres.',
      beispiel: 'Zur Buchmesse pilgern Autoren und Verlage nach Frankfurt.',
      beispiel_hd: 'Zur Buchmesse pilgern Autoren und Verlage nach Frankfurt.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-115',
      ausdruck: 'Frankfurter Banken',
      hochdeutsch: 'Frankfurt als Finanzmetropole',
      bedeutung: 'Frankfurt ist Deutschlands Finanzmetropole und Sitz der Europäischen Zentralbank (EZB), der Deutschen Bundesbank und über 200 Banken. Die Frankfurter Skyline mit Wolkenkratzern wie Commerzbank Tower und Main Tower wird „Mainhattan" genannt. Der Standort macht Hessen wirtschaftsstark. Bankerwitze sind in Frankfurt Alltag: „Was sind drei Banker an einer Bar? Pflicht-Treffen."',
      beispiel: 'Die Frankfurter Skyline isch wie Mini-Manhattan — Mainhattan.',
      beispiel_hd: 'Die Frankfurter Skyline ist wie Mini-Manhattan — Mainhattan.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-116',
      ausdruck: 'Frankfurter Flughafen',
      hochdeutsch: 'Flughafen Frankfurt (Drehkreuz)',
      bedeutung: 'Der Flughafen Frankfurt am Main (FRA) ist Deutschlands größter Flughafen und drittgrößter Europas — Drehkreuz der Lufthansa. Über 65 Millionen Passagiere jährlich. Der Flughafen ist Hessens größter Arbeitgeber (über 80.000 Beschäftigte). Die Hessen sind stolz darauf — und gleichzeitig genervt vom Fluglärm. Frankfurt-Hahn (im Hunsrück, eigentlich Rheinland-Pfalz) wird auch oft mit dem Flughafen Frankfurt verwechselt.',
      beispiel: 'Frankfurt Flughafen — Tor zur Welt für viele Hessen.',
      beispiel_hd: 'Frankfurt Flughafen — Tor zur Welt für viele Hessen.',
      kategorie: 'orte'
    },
    {
      id: 'h-119',
      ausdruck: 'Frankfurter Würstchen',
      hochdeutsch: 'Frankfurter Würstchen (Spezialität)',
      bedeutung: 'Frankfurter Würstchen sind eine traditionelle Frankfurter Spezialität — feine, lange Brühwürste aus Schweinefleisch, in einem Naturdarm, leicht geräuchert. Die echten dürfen nur in einem Frankfurter Stadtgebiet hergestellt werden — geschützte geografische Angabe. Werden in heißem (nicht kochendem!) Wasser erwärmt — niemals gekocht! Klassische Beilagen: Brot, Senf und Kartoffelsalat.',
      beispiel: 'Echte Frankfurter Würstchen — net kochen, nur erwärmen!',
      beispiel_hd: 'Echte Frankfurter Würstchen — nicht kochen, nur erwärmen!',
      kategorie: 'essen'
    },
    {
      id: 'h-121',
      ausdruck: 'Bethmännchen',
      hochdeutsch: 'Bethmännchen (Marzipan-Plätzchen)',
      bedeutung: 'Bethmännchen sind eine Frankfurter Spezialität — kleine, runde Marzipanplätzchen mit drei Mandelhälften außen. Erfunden 1838 vom Bankier Simon Moritz von Bethmann für seine vier Söhne — daher die ursprünglich vier Mandeln. Als ein Sohn starb, wurde nur noch mit drei Mandeln gebacken. Heute Frankfurter Weihnachtsbäckerei und ganzjährige Spezialität. Hessisches Marzipan-Erbe.',
      beispiel: 'A Tüten Bethmännchen vom Bäcker — Frankfurter Genuss.',
      beispiel_hd: 'Eine Tüte Bethmännchen vom Bäcker — Frankfurter Genuss.',
      kategorie: 'essen'
    },
    {
      id: 'h-123',
      ausdruck: 'Gefillde',
      hochdeutsch: 'Gefüllte Klöße (hessische Spezialität)',
      bedeutung: 'Gefillde sind hessische gefüllte Kartoffelklöße — außen Kartoffelteig, innen Fleisch- oder Speckfüllung. Eine traditionelle hessische Mahlzeit, vor allem in Oberhessen und im Vogelsberg verbreitet. Werden meist mit Sauerkraut und brauner Soße serviert. Sättigend, deftig und typisch hessisch — Soulfood des Vogelsbergs. Die Großmütter haben die besten Rezepte, die nicht ausgeplaudert werden.',
      beispiel: 'Mutters Gefillde mit Soß — hessisches Lieblingsessen.',
      beispiel_hd: 'Mutters gefüllte Klöße mit Soße — hessisches Lieblingsessen.',
      kategorie: 'essen'
    },
    {
      id: 'h-124',
      ausdruck: 'Käseschnitten',
      hochdeutsch: 'Käseschnitten (hessische Variante)',
      bedeutung: 'Käseschnitten — eine hessische und nordhessische Spezialität: Brotscheiben mit Käse überbacken, oft mit Schinken, Ei oder Spargel. Einfaches Pendant zu schweizerischen Älplermagronen oder französischen Croque-Monsieur. Vor allem in Schulkantinen und einfachen Restaurants beliebt. Hessisches Comfort-Food — schnell, sättigend, lecker.',
      beispiel: 'Heut Mittag Käseschnitten mit Salat — schnelle Hausmannskost.',
      beispiel_hd: 'Heute Mittag Käseschnitten mit Salat — schnelle Hausmannskost.',
      kategorie: 'essen'
    },
    {
      id: 'h-125',
      ausdruck: 'Hessisch reden',
      hochdeutsch: 'Hessen redet Hessisch',
      bedeutung: 'Hessen sind nicht so verbissen wie Bayern oder Schwaben mit ihrem Dialekt — Hessisch wird mit Selbstironie und Humor gepflegt. Volker Bouffier, Roland Koch und viele andere Politiker haben offen Hessisch geredet. Die Comedy-Serien „Bei uns dahem", „Familie Heinz Becker" (eigentlich saarländisch, aber ähnlich) feiern hessische Mentalität. Hessen sind unkomplizierte Redner — niemals Krampf, immer Lockerheit.',
      beispiel: 'Mer redet ja Hessisch, weil mer net anders kann.',
      beispiel_hd: 'Wir reden ja Hessisch, weil wir nicht anders können.',
      kategorie: 'redensart'
    },
    {
      id: 'h-127',
      ausdruck: 'Limes',
      hochdeutsch: 'Obergermanisch-Raetischer Limes (UNESCO)',
      bedeutung: 'Der Obergermanisch-Raetische Limes ist die ehemalige Grenze des Römischen Reiches — verläuft 550 km durch Hessen, Baden-Württemberg und Bayern. UNESCO-Welterbe seit 2005. In Hessen liegen Saalburg (vollständig rekonstruiertes Römerkastell im Taunus), Feldberg-Kastell und der bekannte Limeswanderweg. Wer den Limes erwandert, lernt römische Geschichte hautnah kennen.',
      beispiel: 'Am Limes auf der Saalburg sin no römische Mauern zu sehe.',
      beispiel_hd: 'Am Limes auf der Saalburg sind noch römische Mauern zu sehen.',
      kategorie: 'orte'
    },
    {
      id: 'h-130',
      ausdruck: 'Heinrich Heine',
      hochdeutsch: 'Heinrich Heine (Dichter aus Düsseldorf, Frankfurt-Bezug)',
      bedeutung: 'Heinrich Heine (1797-1856) — eigentlich Düsseldorfer — verbrachte prägende Jahre in Frankfurt am Main. Er lernte hier den jungen Goethe nicht direkt kennen, aber die Bankerstadt prägte seine Sicht auf das Bürgertum. Sein „Loreley" (1822) ist Weltkulturgut. Die Hessen claimen ihn für die Buchmesse-Mitarbeit und die kurze Frankfurter Episode. Hessen verbindet Banker- und Buchmenschen-Kultur.',
      beispiel: 'Heines „Ich weiß nicht, was soll es bedeuten" — Loreley-Klassiker.',
      beispiel_hd: 'Heines „Ich weiß nicht, was soll es bedeuten" — Loreley-Klassiker.',
      kategorie: 'menschen'
    },
    {
      id: 'h-131',
      ausdruck: 'Friedrich Stoltze',
      hochdeutsch: 'Friedrich Stoltze (hessischer Mundartdichter)',
      bedeutung: 'Friedrich Stoltze (1816-1891) war Frankfurts berühmtester Mundartdichter — sein hessischer Witz und sein Sinn für Lokalkolorit machten ihn zur Frankfurter Legende. Sein Werk „Die Frankfurter Bibel" parodiert die Bibel ins Hessische. Die Stoltze-Stiftung pflegt sein Erbe. Auf seinem Grab im Frankfurter Hauptfriedhof versammeln sich noch heute Hessen-Liebhaber. Stoltze-Sätze sind in Frankfurt allgegenwärtig.',
      beispiel: 'Stoltze hat dem Frankfurter Hessisch sein Profil gegeben.',
      beispiel_hd: 'Stoltze hat dem Frankfurter Hessisch sein Profil gegeben.',
      kategorie: 'menschen'
    },
    {
      id: 'h-132',
      ausdruck: 'Battonn',
      hochdeutsch: 'Battonn (Frankfurter Spitzname Stadtwappen)',
      bedeutung: '„Battonn" bezieht sich auf den Frankfurter Stadtteil Bornheim und seine Bewohner — eine wienerisch-anmutende Verkleinerungsform mit „-onn"-Endung. Auch ein liebevoller Begriff für jemand aus Frankfurt-Bornheim. „En echte Battonn" ist jemand mit echter Bornheimer Mentalität — humorvoll, eckenkantig, herzlich. Der Begriff wird heute selten verwendet — Insider-Wissen für Frankfurter Originale.',
      beispiel: 'Der ist en echte Battonn — Bornheimer durch und durch.',
      beispiel_hd: 'Der ist ein echter Bornheimer — Bornheimer durch und durch.',
      kategorie: 'menschen'
    },
    {
      id: 'h-134',
      ausdruck: 'Heinz Schenk',
      hochdeutsch: 'Heinz Schenk (Hessischer Volksschauspieler)',
      bedeutung: 'Heinz Schenk (1924-2014) war einer der bekanntesten hessischen Volksschauspieler — durch die TV-Sendung „Zum Blauen Bock" (1957-1987) wurde er einem Millionenpublikum bekannt. „Et hat noch immer gut gegange" war sein Markenzeichen. Mit Schoppen-Gerippten in der Hand verkörperte er hessische Lebensart. Bis heute Erinnerungs-Ikone für ältere Hessen.',
      beispiel: 'Heinz Schenk un sei Bembel — hessische Wohnzimmer-Legende.',
      beispiel_hd: 'Heinz Schenk und sein Bembel — hessische Wohnzimmer-Legende.',
      kategorie: 'menschen'
    },
    {
      id: 'h-135',
      ausdruck: 'Bei uns dahem',
      hochdeutsch: 'TV-Serie aus Hessen',
      bedeutung: 'Die TV-Comedy-Serie „Bei uns dahem" (HR) zeigt hessisches Familienleben in karikiert-realistischer Form — Generationen-Konflikte, Apfelweinkultur und Frankfurt-Alltag. Mit hessischem Dialekt und Augenzwinkern. Kult bei Hessen, weniger bekannt außerhalb. Solche Mundart-Comedies sind Kennzeichen hessischer TV-Kultur — der hr produziert sie liebevoll.',
      beispiel: '„Bei uns dahem" wird mer all jeden Sonntag geguckt.',
      beispiel_hd: '„Bei uns dahem" wird man jeden Sonntag geschaut.',
      kategorie: 'musik'
    },
    {
      id: 'h-136',
      ausdruck: 'Battenberg',
      hochdeutsch: 'Battenberg (hessische Adelsfamilie)',
      bedeutung: 'Die Battenbergs waren eine hessische Adelsfamilie, die später ins britische Königshaus einheiratete — sie wurden zu den Mountbattens. Prinz Philip, Ehemann von Queen Elizabeth II., gehörte zu dieser Familie. Die hessische Adelslinie hat damit die britische Monarchie geprägt. Eine wenig bekannte hessisch-britische Geschichte, die in Schloss Heiligenberg in Seeheim-Jugenheim besucht werden kann.',
      beispiel: 'Die Battenbergs aus Hessen wurden zu Königen in England.',
      beispiel_hd: 'Die Battenbergs aus Hessen wurden zu Königen in England.',
      kategorie: 'menschen'
    },
    {
      id: 'h-137',
      ausdruck: 'Lahn',
      hochdeutsch: 'Lahn (Fluss durch Hessen)',
      bedeutung: 'Die Lahn ist ein 246 km langer Fluss, der durch Mittelhessen fließt — von Marburg über Wetzlar nach Limburg und weiter nach Rheinland-Pfalz. Die Lahn ist beliebte Kanu- und Wanderregion. Die Stadt Marburg liegt malerisch an der Lahn. Auch die Lahnauen mit der berühmten Fritzlarer Region prägt hessische Naturlandschaft. Die Lahn ist hessisches Wasser-Erbe.',
      beispiel: 'Die Lahn entlang fahren mit\'m Kanu — Hessen pur.',
      beispiel_hd: 'Die Lahn entlang fahren mit dem Kanu — Hessen pur.',
      kategorie: 'natur'
    },
    {
      id: 'h-138',
      ausdruck: 'Hauptbahnhof Frankfurt',
      hochdeutsch: 'Frankfurter Hauptbahnhof (Drehkreuz)',
      bedeutung: 'Der Frankfurter Hauptbahnhof ist mit über 500.000 Passagieren täglich Deutschlands zweitgrößter Bahnhof (nach München). Eröffnet 1888, mit drei riesigen Hallendächern. Wichtiger Knotenpunkt für ICE, Regionalzüge und S-Bahnen. Verbindung zum Frankfurter Flughafen in 11 Minuten. Vor dem Bahnhof: das Bahnhofsviertel mit Rotlichtmilieu und Drogenszene — das berüchtigte „Frankfurter Bahnhofsviertel".',
      beispiel: 'Im Frankfurter Hauptbahnhof verlierst dich leicht.',
      beispiel_hd: 'Im Frankfurter Hauptbahnhof verlierst du dich leicht.',
      kategorie: 'orte'
    },
    {
      id: 'h-139',
      ausdruck: 'Schoppen-Hannes',
      hochdeutsch: 'Hannes mit dem Apfelwein-Glas',
      bedeutung: 'Der „Schoppen-Hannes" ist eine traditionelle Frankfurter Karnevalsfigur — ein dicker, gemütlicher Mann mit Apfelwein-Glas und hessischer Schoppen-Mentalität. Verkörpert die Lokalpolitik mit Augenzwinkern. Eine Karikatur, die hessische Lebensart zelebriert: gemütlich, etwas träge, aber herzlich. Im Frankfurter Karneval immer dabei. Symbol für hessisches Lebensgefühl.',
      beispiel: 'Der Schoppen-Hannes is am Karneval immer dabei.',
      beispiel_hd: 'Der Schoppen-Hannes ist am Karneval immer dabei.',
      kategorie: 'menschen'
    },
    {
      id: 'h-140',
      ausdruck: 'Hessischer Apfelwein',
      hochdeutsch: 'Geschützte Marke „Hessischer Apfelwein"',
      bedeutung: 'Der Begriff „Hessischer Apfelwein" ist EU-weit als geografische Angabe geschützt — nur Apfelwein aus Hessen darf so heißen. Säuerlich, klar, mit 5-7% Alkohol. Aus speziellen Mostäpfeln (Bittenfelder, Bohnapfel) gekeltert. Die Tradition geht bis ins Mittelalter zurück — Karl der Große ließ schon Apfelwein keltern. Hessen produziert über 40 Millionen Liter pro Jahr. Apfelwein ist hessisches Kulturerbe.',
      beispiel: 'Echter hessischer Apfelwein muss aus Hessen kommen — sonst is\'er net echt.',
      beispiel_hd: 'Echter hessischer Apfelwein muss aus Hessen kommen — sonst ist er nicht echt.',
      kategorie: 'essen'
    },
    {
      id: 'h-141',
      ausdruck: 'Speierling',
      hochdeutsch: 'Speierling (Baum für Apfelwein)',
      bedeutung: 'Der Speierling — eine Eberesche-ähnliche Sorbaceae — liefert die berühmten Speierling-Beeren, die in hessischen Apfelwein gegeben werden. Sie verleihen ihm Gerbstoffe und seinen typisch herben Geschmack. Der Speierling-Baum ist heute selten — Speierlinge werden gezielt gepflanzt, um die Apfelwein-Tradition zu erhalten. Auch genießt der Speierling den Status eines Kulturbaums.',
      beispiel: 'Ohne Speierling kein echter Ebbelwoi.',
      beispiel_hd: 'Ohne Speierling kein echter Apfelwein.',
      kategorie: 'natur'
    },
    {
      id: 'h-142',
      ausdruck: 'Bembelfresser',
      hochdeutsch: 'Spitzname für Apfelwein-Liebhaber',
      bedeutung: '„Bembelfresser" ist die humorvolle Bezeichnung für jemand, der besonders viel Apfelwein aus dem Bembel trinkt — ein Frankfurter Original. Hier wird die liebevolle Hessen-Mentalität ausgedrückt: Wer den Bembel leerleert, gehört dazu. Niemals beleidigend gemeint, sondern als Zeichen von Trinkfestigkeit und Heimatliebe. Wer Bembelfresser ist, hat hessischen Stolz.',
      beispiel: 'Der Otto isch en echter Bembelfresser — hessischer Trinker.',
      beispiel_hd: 'Der Otto ist ein echter Bembelfresser — hessischer Trinker.',
      kategorie: 'menschen'
    },
    {
      id: 'h-144',
      ausdruck: 'Schunkel',
      hochdeutsch: 'Schunkeln (Sitz-Tanzen am Tisch)',
      bedeutung: 'Das „Schunkeln" — sich am Tisch unterhakend hin und her wiegen — ist eine hessische und allgemein-deutsche Tradition, vor allem auf Festen, in Apfelweinwirtschaften und beim Kerb. Bei hessischen Liedern wie „En Mool dahem an unsrem schee Frankfurt" wird automatisch geschunkelt. Eine harmlose, fröhliche Tradition, die Gemeinschaftsgefühl stiftet. Hessen schunkeln gerne und mit Hingabe.',
      beispiel: 'Beim Kerb wird gschunkelt, dass die Bank wackelt.',
      beispiel_hd: 'Beim Volksfest wird geschunkelt, dass die Bank wackelt.',
      kategorie: 'redensart'
    },
    {
      id: 'h-146',
      ausdruck: 'Kerbborsche',
      hochdeutsch: 'Kerb-Burschen (junge Kerb-Organisatoren)',
      bedeutung: 'Die „Kerbborsche" sind die jungen Männer eines hessischen Dorfes, die die Kerb organisieren und feiern — als Übergangsritus vom Jungen zum Mann. Sie tragen Trachten, errichten den Kerbbaum, halten die „Kerb-Rede" und kümmern sich ums Fest. Eine wichtige Tradition in vielen hessischen Dörfern. Wer mal Kerbborsche war, gehört zur Dorfgemeinschaft.',
      beispiel: 'Als Kerbborsche hab i die schönschdr Erinnerunge.',
      beispiel_hd: 'Als Kerbbursche habe ich die schönsten Erinnerungen.',
      kategorie: 'menschen'
    },
    {
      id: 'h-147',
      ausdruck: 'Hessen-Wappen',
      hochdeutsch: 'Hessischer Löwe (Wappen)',
      bedeutung: 'Das hessische Wappen zeigt den blau-weiß gestreiften „hessischen Löwen" — eines der ältesten erhaltenen Wappenbilder Europas. Die rot-blau gestreifte Löwenfigur stammt aus dem Hause Brabant (12. Jahrhundert). Heute ziert der Löwe das Wappen Hessens, die hessische Flagge, hessische Polizei und alle staatlichen Symbole. Beim Eintracht-Spiel werden Hessen-Flaggen geschwenkt.',
      beispiel: 'Der hessische Löwe is auf jeder Hessen-Flagge.',
      beispiel_hd: 'Der hessische Löwe ist auf jeder Hessen-Flagge.',
      kategorie: 'menschen'
    },
    {
      id: 'h-148',
      ausdruck: 'Bauernregeln',
      hochdeutsch: 'Hessische Bauernregeln',
      bedeutung: 'Hessen hat eine reiche Tradition an Bauernregeln — Volksweisheiten über Wetter, Ernte und Jahreszeiten. „Märzenschnee tut den Saaten weh" oder „Aprilsonne und Frauengunst dauert nicht lang". Diese Reime wurden über Generationen weitergegeben. In ländlichen Regionen Hessens (Vogelsberg, Westerwald, Rhön) sind sie noch lebendig. Bäuerliche Mündlichkeit als Hessenerbe.',
      beispiel: '„Mai-Regen bringt Segen" — alte hessische Bauernweisheit.',
      beispiel_hd: '„Mai-Regen bringt Segen" — alte hessische Bauernweisheit.',
      kategorie: 'natur'
    },
    {
      id: 'h-150',
      ausdruck: 'Hessen3',
      hochdeutsch: 'Hessen 3 (TV-Fernsehprogramm)',
      bedeutung: '„Hessen 3" — heute offiziell „hr-fernsehen" — ist das dritte Programm des Hessischen Rundfunks (HR). Mit Sendungen wie „herrlich ehrlich", „Hessenschau" (lokale Nachrichten), „Service: Reisen", „Maintower" oder „Friedrichs!". Für viele Hessen ist Hessen 3 der heimatliche Sender — informativ, unterhaltsam und mit deutlicher Hessen-Identität. Ältere Hessen schauen es täglich.',
      beispiel: 'Die Hessenschau um 19:30 — Pflichttermin für jeden Hessen.',
      beispiel_hd: 'Die Hessenschau um 19:30 — Pflichttermin für jeden Hessen.',
      kategorie: 'musik'
    },
    {
      id: 'h-151',
      ausdruck: 'Aschermittwoch',
      hochdeutsch: 'Aschermittwoch / Ende Karneval',
      bedeutung: 'Der Aschermittwoch beendet die hessisch-rheinische Karnevalssaison — der Tag, an dem die Fastenzeit beginnt. „An Aschermittwoch ist alles vorbei" ist eine alte hessische Redensart. In hessischen Apfelweinlokalen gibt es Heringessen als Tradition. Ein nachdenklicher Tag nach der Narrenzeit — Buße tun, fasten, sich besinnen. Hessisches Kirchenjahr-Highlight.',
      beispiel: 'Am Aschermittwoch is alles vorbei — Fastenzeit beginnt.',
      beispiel_hd: 'Am Aschermittwoch ist alles vorbei — Fastenzeit beginnt.',
      kategorie: 'redensart'
    },
    {
      id: 'h-152',
      ausdruck: 'Wäldche',
      hochdeutsch: 'Stadtwald (Frankfurter Wäldchen)',
      bedeutung: 'Das „Frankfurter Wäldche" ist Frankfurts Stadtwald — mit 4.800 Hektar einer der größten Stadtwälder Europas. Naherholungsgebiet für Frankfurter: Joggen, Wandern, Pilze sammeln, Picknicken. Der Goetheturm im Wald ist nach einem Brand 2017 wieder neu erbaut worden. „Mer geh ins Wäldche" ist hessischer Standardspruch fürs Wochenend-Naturerlebnis.',
      beispiel: 'Sonntags ins Wäldche — Frankfurter Tradition.',
      beispiel_hd: 'Sonntags ins Stadtwald — Frankfurter Tradition.',
      kategorie: 'natur'
    },
    {
      id: 'h-153',
      ausdruck: 'Mainufer',
      hochdeutsch: 'Frankfurter Mainufer',
      bedeutung: 'Das Frankfurter Mainufer mit dem Museumsufer auf der Sachsenhäuser Seite ist eines der schönsten Stadt-Spaziergänge. Über die alte Mainbrücke (Eiserner Steg) verbindet es Altstadt und Sachsenhausen. Hier finden im Sommer das Museumsuferfest und das Mainfest statt. Wassertaxis fahren Touristen. Frankfurter joggen am Main, picknicken auf den Treppen. Hessisches Flussfeeling.',
      beispiel: 'Am Mainufer joggen — beste Frankfurter Therapie.',
      beispiel_hd: 'Am Mainufer joggen — beste Frankfurter Therapie.',
      kategorie: 'orte'
    },
    {
      id: 'h-154',
      ausdruck: 'Museumsufer',
      hochdeutsch: 'Sachsenhäuser Museumsufer',
      bedeutung: 'Das Museumsufer am Sachsenhäuser Mainufer ist Frankfurts kulturelle Magistrale — 15 Museen auf engstem Raum: Städel (Gemälde), Liebieghaus (Skulpturen), Kommunikationsmuseum, Filmmuseum, Architekturmuseum etc. Eine einzigartige Konzentration deutscher Kulturschätze. Die jährlichen „Museumsuferfest" lockt 3 Millionen Besucher. Hessens Hochkultur-Konzentration.',
      beispiel: 'Am Museumsufer ein Jahr lang Museen besuchen — Frankfurter Programm.',
      beispiel_hd: 'Am Museumsufer ein Jahr lang Museen besuchen — Frankfurter Programm.',
      kategorie: 'orte'
    },
    {
      id: 'h-155',
      ausdruck: 'Städel Museum',
      hochdeutsch: 'Städel Museum (Gemäldegalerie)',
      bedeutung: 'Das Städel Museum am Frankfurter Museumsufer ist Deutschlands ältestes bürgerliches Kunstmuseum — gegründet 1815 von Johann Friedrich Städel. Berühmte Werke: Tischbeins „Goethe in der Campagna", Vermeers „Geograph", Botticelli, Rembrandt, Picasso, Beckmann. Über 380.000 Besucher jährlich. Das modernisierte Gebäude (2012 erweitert) ist architektonisch beeindruckend. Hessens Kulturkrone.',
      beispiel: 'Im Städel hängt das berühmteste Goethe-Bild.',
      beispiel_hd: 'Im Städel hängt das berühmteste Goethe-Bild.',
      kategorie: 'orte'
    },
    {
      id: 'h-156',
      ausdruck: 'Goethe-Haus',
      hochdeutsch: 'Goethe-Geburtshaus Frankfurt',
      bedeutung: 'Das Goethe-Haus im Großen Hirschgraben ist Goethes Geburtshaus — geboren am 28. August 1749. Im Krieg zerstört, originalgetreu wieder aufgebaut. Heute Museum mit Goethes Originalmöbeln. Das Goethe-Museum nebenan zeigt seine Wirkung. Ein Pilgerort für deutsche Literaturliebhaber. Hessens stolzester Sohn — wenn auch Goethe mehr in Weimar als in Frankfurt verbrachte.',
      beispiel: 'Goethe-Haus besichtigen — Pflicht für jeden Frankfurt-Besucher.',
      beispiel_hd: 'Goethe-Haus besichtigen — Pflicht für jeden Frankfurt-Besucher.',
      kategorie: 'orte'
    },
    {
      id: 'h-157',
      ausdruck: 'Frankfurter Schule',
      hochdeutsch: 'Philosophie-Schule am Main',
      bedeutung: 'Die Frankfurter Schule ist eine philosophische Bewegung — entstanden am 1923 gegründeten Institut für Sozialforschung. Adorno, Horkheimer, Marcuse, Habermas waren Hauptvertreter. Die „Kritische Theorie" prägt bis heute Soziologie, Politikwissenschaft, Philosophie weltweit. Frankfurt war intellektuelles Zentrum — und Hessen damit weltgeistig bedeutend. Studenten pilgern noch heute zum IfS.',
      beispiel: 'Adorno und die Frankfurter Schule — hessische Geistesgeschichte.',
      beispiel_hd: 'Adorno und die Frankfurter Schule — hessische Geistesgeschichte.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-158',
      ausdruck: 'Paulskirche',
      hochdeutsch: 'Paulskirche (Wiege der deutschen Demokratie)',
      bedeutung: 'Die Paulskirche in Frankfurt ist die „Wiege der deutschen Demokratie" — hier tagte 1848/49 das erste deutsche Parlament der Nationalversammlung. Die Frankfurter Verfassung wurde hier verfasst (auch wenn sie scheiterte). Heute Ehrenraum und Symbol für Demokratie. Bundesregierung und Bundestag treffen sich hier zu wichtigen Anlässen. Hessen ist Demokratie-Geburtsstätte.',
      beispiel: 'In der Paulskirche wurde die deutsche Demokratie geboren.',
      beispiel_hd: 'In der Paulskirche wurde die deutsche Demokratie geboren.',
      kategorie: 'orte'
    },
    {
      id: 'h-159',
      ausdruck: 'Hessenstreich',
      hochdeutsch: 'Hessen-Mentalität (auch andere bekam man so)',
      bedeutung: 'Der „Hessenstreich" ist eine humorvolle Bezeichnung für hessische Originalität, oft mit einem Augenzwinkern: Wer einen Hessenstreich vollführt, hat etwas typisch Hessisches gemacht — bauernschlau, ehrlich-direkt, mit Lokalstolz. Die Hessen sind bekannt für ihre Direktheit und ihren Humor, der manchmal subversiv ist. Politische Hessenstreiche gibt\'s viele in der Landesgeschichte.',
      beispiel: 'Roland Koch hat oft Hessenstreiche gemacht — Politik mit Lokalcolorit.',
      beispiel_hd: 'Roland Koch hat oft Hessenstreiche gemacht — Politik mit Lokalcolorit.',
      kategorie: 'redensart'
    },
    {
      id: 'h-160',
      ausdruck: 'Wetterau',
      hochdeutsch: 'Wetterau (fruchtbare Ebene)',
      bedeutung: 'Die Wetterau ist eine fruchtbare Ebene nördlich von Frankfurt — der „Korngrund Hessens". Bekannt für Zuckerrüben, Weizen, Zwiebeln und seit Neuestem Spargel. Bad Vilbel, Friedberg und Butzbach sind Hauptorte. Die Wetterauer sind als bodenständig und freundlich bekannt. Geologisch interessant: kalkhaltige Böden mit Brunnenwasser, das in Mineralwasser-Quellen mündet (Vilbeler Wasser).',
      beispiel: 'In der Wetterau wächst das beste hessische Brot.',
      beispiel_hd: 'In der Wetterau wächst das beste hessische Brot.',
      kategorie: 'natur'
    },
    {
      id: 'h-161',
      ausdruck: 'Bergstraße',
      hochdeutsch: 'Hessische Bergstraße (Weinregion)',
      bedeutung: 'Die Hessische Bergstraße ist eine kleine Weinregion am östlichen Rand der Rheinebene zwischen Darmstadt und Heppenheim — sehr mildes Klima dank Mainzer-Niederung-Schutz. Die Bergstraße ist „Deutschlands Frühlings-Garten" — Mandelbäume blühen hier als erstes, Obstbäume folgen. Die Weine: Riesling, Müller-Thurgau und Burgunder. Heppenheim und Bensheim sind die Wein-Zentren.',
      beispiel: 'Im Frühjahr blüht die Bergstraße — Apfelbäume und Mandeln.',
      beispiel_hd: 'Im Frühjahr blüht die Bergstraße — Apfelbäume und Mandeln.',
      kategorie: 'natur'
    },
    {
      id: 'h-163',
      ausdruck: 'Friedrichsdorf',
      hochdeutsch: 'Friedrichsdorf (Zwieback-Hauptstadt)',
      bedeutung: 'Friedrichsdorf im Taunus ist berühmt für seine Zwieback-Tradition — die Brandt-Zwieback-Fabrik produziert hier seit 1912 die berühmten Brandt-Zwieback. Auch berühmt: das Philantropinum (eine pädagogische Anstalt des 18. Jahrhunderts). Der Ort wurde 1687 von französischen Hugenotten gegründet, die vor Religionsverfolgung flohen. Hessische Toleranz-Geschichte.',
      beispiel: 'Brandt-Zwieback gibt\'s seit 100 Jahren aus Friedrichsdorf.',
      beispiel_hd: 'Brandt-Zwieback gibt es seit 100 Jahren aus Friedrichsdorf.',
      kategorie: 'orte'
    },
    {
      id: 'h-164',
      ausdruck: 'Darmstadt',
      hochdeutsch: 'Darmstadt (Wissenschaftsstadt)',
      bedeutung: 'Darmstadt ist die „Wissenschaftsstadt" Hessens — TU Darmstadt (eine der besten technischen Universitäten Deutschlands), GSI (Forschungszentrum für Schwerionenforschung — hat 7 chemische Elemente entdeckt!), ESA-Kontrollzentrum. Die Mathildenhöhe (UNESCO-Welterbe) zeigt das Jugendstil-Erbe. Auch Darmstädter Echo und SV Darmstadt 98. Hessens intellektuelles Zentrum.',
      beispiel: 'In Darmstadt entstehen neue chemische Elemente — Wissenschafts-Hochburg.',
      beispiel_hd: 'In Darmstadt entstehen neue chemische Elemente — Wissenschafts-Hochburg.',
      kategorie: 'orte'
    },
    {
      id: 'h-165',
      ausdruck: 'Mathildenhöhe',
      hochdeutsch: 'Mathildenhöhe Darmstadt (UNESCO-Welterbe)',
      bedeutung: 'Die Mathildenhöhe in Darmstadt ist seit 2021 UNESCO-Welterbe — eine Künstlerkolonie um 1900 mit Jugendstil-Bauten, dem Hochzeitsturm, der Russischen Kapelle und Künstlerateliers. Großherzog Ernst Ludwig von Hessen-Darmstadt rief die Kolonie ins Leben — Maler, Architekten, Designer wirkten hier. Eine der bedeutendsten Künstler-Kolonien Europas. Hessens Jugendstil-Hauptstadt.',
      beispiel: 'Die Mathildenhöhe in Darmstadt — Jugendstil pur.',
      beispiel_hd: 'Die Mathildenhöhe in Darmstadt — Jugendstil pur.',
      kategorie: 'orte'
    },
    {
      id: 'h-166',
      ausdruck: 'TU Darmstadt',
      hochdeutsch: 'Technische Universität Darmstadt',
      bedeutung: 'Die TU Darmstadt — eine der besten technischen Universitäten Deutschlands — wurde 1877 gegründet. Excellence-Initiative-Mitglied. Über 25.000 Studierende. Bekannt für Maschinenbau, Elektrotechnik, Informatik, Materialwissenschaften. Die TU prägt Darmstadt als Wissenschafts-Hub und macht Hessen zur Technik-Region. Mit der Goethe-Universität (Frankfurt) und der Justus-Liebig-Uni (Gießen) ein hessisches Hochschul-Triumvirat.',
      beispiel: 'TU Darmstadt — wenn du Ingenieur werden willst.',
      beispiel_hd: 'TU Darmstadt — wenn du Ingenieur werden willst.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-167',
      ausdruck: 'Justus-Liebig',
      hochdeutsch: 'Justus von Liebig (Chemiker aus Gießen)',
      bedeutung: 'Justus von Liebig (1803-1873) war einer der bedeutendsten Chemiker des 19. Jahrhunderts — er arbeitete in Gießen. Begründer der modernen organischen Chemie und der Düngemittelchemie. Erfand das „Liebigsche Minimumgesetz" (Pflanzenwachstum), den Liebig-Kühler und die Massenherstellung von Düngemitteln. Die Justus-Liebig-Universität Gießen trägt seinen Namen. Hessens größter Wissenschaftler.',
      beispiel: 'Ohne Justus von Liebig gäb\'s keine moderne Landwirtschaft.',
      beispiel_hd: 'Ohne Justus von Liebig gäbe es keine moderne Landwirtschaft.',
      kategorie: 'menschen'
    },
    {
      id: 'h-169',
      ausdruck: 'Hessen-Liedel',
      hochdeutsch: 'Hessisches Volkslied',
      bedeutung: 'Hessische Volkslieder werden im Hessenparrk, auf hessischen Festen und in der Familie weiter getragen. „Wir Hessen sind ein froh Geschlecht" und „Wo der Main entlang strömt" sind klassische Hessenlieder. Friedrich Stoltze hat viele Lieder geschrieben. Hessisches Liedgut ist weniger bekannt als bayerisches, aber identitätsstiftend für Hessen.',
      beispiel: '„Bei uns dahem" — typisches Hessisch-Lied.',
      beispiel_hd: '„Bei uns daheim" — typisches Hessisch-Lied.',
      kategorie: 'musik'
    },
    {
      id: 'h-170',
      ausdruck: 'Hessisches Wörterbuch',
      hochdeutsch: 'Wörterbuch hessischer Mundart',
      bedeutung: 'Das Hessische Wörterbuch (mehrbändig) der Phil.-hist. Klasse Mainz dokumentiert systematisch den hessischen Wortschatz seit 1965. Über 70.000 Stichwörter. Eine wissenschaftliche Großtat — vergleichbar mit dem schwäbischen oder bayerischen Wörterbuch. Hessen-Forscher und Sprachwissenschaftler nutzen es. Das Dialekterbe wird so für die Zukunft bewahrt.',
      beispiel: 'Im Hessischen Wörterbuch findest jedes verloren gegangene Wort.',
      beispiel_hd: 'Im Hessischen Wörterbuch findest du jedes verloren gegangene Wort.',
      kategorie: 'redensart'
    },
    {
      id: 'h-171',
      ausdruck: 'Brüder Grimm-Werk',
      hochdeutsch: 'Deutsches Wörterbuch (Grimm)',
      bedeutung: 'Die Brüder Grimm aus Hanau und Kassel begannen das „Deutsche Wörterbuch" — das größte deutschsprachige Wörterbuch der Welt. 1838 begonnen, 1961 (!) fertig — über 123 Jahre Arbeitszeit, 32 Bände, ~400.000 Wörter. Eine wissenschaftliche Leistung historischer Dimension. Die Brüder Grimm haben nicht nur Märchen gesammelt, sondern auch die deutsche Sprache wissenschaftlich erfasst. Hessisches Sprachgut.',
      beispiel: 'Das Deutsche Wörterbuch der Brüder Grimm — Lebenswerk.',
      beispiel_hd: 'Das Deutsche Wörterbuch der Brüder Grimm — Lebenswerk.',
      kategorie: 'menschen'
    },
    {
      id: 'h-172',
      ausdruck: 'Sechsbacher',
      hochdeutsch: 'Sechs Apfelweine (hessische Trinkrunde)',
      bedeutung: '„En Sechsbacher" ist im Frankfurter Apfelweinwirtschaftsbetrieb ein humorvoller Ausdruck für sechs Schoppen Apfelwein — etwa eine 0,3-Liter-Schoppen-Sitzung von 1,8 Litern. Beweis für hessische Trinkfestigkeit. „Hessen können was vertragen" ist ein liebevoll-stolzer Selbstbild. Apfelwein-Trinken ist Sport, Kunst und Sozialaktivität in einem.',
      beispiel: 'En Sechsbacher heut Abend — Frankfurter Trinkleistung.',
      beispiel_hd: 'Sechs Apfelweine heute Abend — Frankfurter Trinkleistung.',
      kategorie: 'essen'
    },
    {
      id: 'h-173',
      ausdruck: 'Saure Rippche',
      hochdeutsch: 'Saure Rippchen (hessische Spezialität)',
      bedeutung: '„Saure Rippche" oder „Saure Rippchen" sind hessische gepökelte und in Essig-Marinade eingelegte Schweinerippen, anschließend gegart. Eine traditionelle Frankfurter Hausmannskost, oft mit Sauerkraut und Kartoffeln serviert. Die Sauer-Note kommt vom Essig. Eine kräftige, würzige hessische Mahlzeit — perfekt nach langer Arbeit und zum Apfelwein.',
      beispiel: 'Saure Rippche mit Sauerkraut — hessische Magenfreude.',
      beispiel_hd: 'Saure Rippchen mit Sauerkraut — hessische Magenfreude.',
      kategorie: 'essen'
    },
    {
      id: 'h-175',
      ausdruck: 'Hessenpoltik',
      hochdeutsch: 'Hessen-Politik (CDU-Hochburg)',
      bedeutung: 'Hessen ist seit Jahrzehnten politisch ein Bundesland im Wechsel — von Hans Karry (SPD) über Roland Koch (CDU), Volker Bouffier (CDU) bis Boris Rhein (CDU). Jeder Hessenpräsident hat seine eigene hessische Note. Hessische Politik gilt als humorvoll-pragmatisch. Die Hessenrunde im hr ist Pflicht für politik-interessierte Hessen. Politik mit hessischem Schmäh.',
      beispiel: 'Hessenpolitik — immer mit Schmäh und Lokalkolorit.',
      beispiel_hd: 'Hessenpolitik — immer mit Schmäh und Lokalkolorit.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-176',
      ausdruck: 'Hessenring',
      hochdeutsch: 'Autobahnring um Frankfurt (A661/A3/A66)',
      bedeutung: 'Der Hessenring ist der inoffizielle Begriff für den Autobahnring um Frankfurt — A3, A5, A66 und A661 umschließen das Rhein-Main-Gebiet. Mit dem Frankfurter Kreuz, einem der wichtigsten Autobahnknotenpunkte Europas. Pendler kennen die Staus „auf\'m Ring" — bis zu 200.000 Fahrzeuge täglich am Frankfurter Kreuz. Hessischer Verkehrsalltag.',
      beispiel: 'Stau auf\'m Hessenring — typisch Berufsverkehr.',
      beispiel_hd: 'Stau auf dem Hessenring — typisch Berufsverkehr.',
      kategorie: 'orte'
    },
    {
      id: 'h-177',
      ausdruck: 'Bad Vilbel',
      hochdeutsch: 'Bad Vilbel (Mineralwasserstadt)',
      bedeutung: 'Bad Vilbel nördlich von Frankfurt ist eine kleine Stadt, berühmt für ihre Mineralquellen — „Bad Vilbeler Wasser" gehört zu den bekanntesten Tafelwassern Hessens. Die Hassia-Quellen und die Vilbeler Burg prägen die Stadt. Mit den jährlichen Burgfestspielen, einem regional bedeutsamen Open-Air-Theater. Hessen-Wasserkultur in einer kleinen Stadt.',
      beispiel: 'Bad Vilbeler Wasser — hessisches Mineralwasser-Original.',
      beispiel_hd: 'Bad Vilbeler Wasser — hessisches Mineralwasser-Original.',
      kategorie: 'orte'
    },
    {
      id: 'h-182',
      ausdruck: 'Sababurg',
      hochdeutsch: 'Sababurg (Dornröschenschloss)',
      bedeutung: 'Schloss Sababurg in Nordhessen wird als „Dornröschen-Schloss" bezeichnet — die Brüder Grimm sollen hier Inspiration für ihr Märchen bekommen haben. Die Burg auf einem Berg ist heute Hotel und Restaurant, umgeben von Tierpark Sababurg (über 900 Jahre alter Park mit seltenen Haustierrassen). Märchenhafte hessische Idylle für Romantiker.',
      beispiel: 'Im Schloss Sababurg übernachten — Dornröschen-Erlebnis.',
      beispiel_hd: 'Im Schloss Sababurg übernachten — Dornröschen-Erlebnis.',
      kategorie: 'orte'
    },
    {
      id: 'h-183',
      ausdruck: 'Bad Wildungen',
      hochdeutsch: 'Bad Wildungen (Kurstadt)',
      bedeutung: 'Bad Wildungen ist Deutschlands größte Kurstadt — mit über 6 Millionen Übernachtungen jährlich. Berühmt für die Wildunger Quellen (Helenenquelle, König Otto Quelle). Auch der Geburtsort Wilhelm Heinrich Riehls, ethnographer der Hessen. Mit dem Schloss Friedrichstein und der historischen Altstadt. Hessisches Kurort-Lebensgefühl.',
      beispiel: 'Bad Wildungen — wo Hessen entspannt und gesund werden.',
      beispiel_hd: 'Bad Wildungen — wo Hessen entspannt und gesund werden.',
      kategorie: 'orte'
    },
    {
      id: 'h-185',
      ausdruck: 'Waldecker Land',
      hochdeutsch: 'Waldecker Land (Region in Hessen)',
      bedeutung: 'Das Waldecker Land im Nordwesten Hessens ist eine traditionsreiche Region — bis 1929 Fürstentum Waldeck. Geprägt von Wäldern, dem Edersee, dem Kellerwald (UNESCO-Welterbe Buchenwälder). Mit der Residenzstadt Bad Arolsen und Schloss Waldeck. Ländlich, naturreich, mit eigener Kultur. Hessens grünes Herz.',
      beispiel: 'Im Waldecker Land bist du fast in einem anderen Hessen.',
      beispiel_hd: 'Im Waldecker Land bist du fast in einem anderen Hessen.',
      kategorie: 'orte'
    },
    {
      id: 'h-186',
      ausdruck: 'Wilhelmshöhe',
      hochdeutsch: 'Bergpark Wilhelmshöhe (UNESCO-Welterbe)',
      bedeutung: 'Der Bergpark Wilhelmshöhe in Kassel ist seit 2013 UNESCO-Welterbe — der größte Bergpark Europas mit der berühmten Herkules-Statue, dem Schloss Wilhelmshöhe und den weltgrößten künstlichen Wasserspielen. Wenn am Sonntag das Wasser läuft, fließt es 250 m über Kaskaden hinab — beeindruckendes Schauspiel seit 1714. Hessens Vorzeige-Park.',
      beispiel: 'Sonntags die Wasserspiele auf Wilhelmshöhe — spektakulär.',
      beispiel_hd: 'Sonntags die Wasserspiele auf Wilhelmshöhe — spektakulär.',
      kategorie: 'orte'
    },
    {
      id: 'h-188',
      ausdruck: 'Geheimnis',
      hochdeutsch: 'Hessisches Wissen (Insider)',
      bedeutung: 'Hessen hat viele „Geheimnisse" — wenig bekannte Orte und Bräuche, die nur Einheimische kennen. Vom „Loreley der Hessen" (Lorelei am Rhein, eigentlich rheinland-pfälzisch, aber Hessen claimen sie) bis zu kleinen Schluchten, alten Brauhäusern und vergessenen Klöstern. Hessens „Geheimnisse" sind charme der Region. Insider-Wissen ist Stolz.',
      beispiel: 'In Hessen gibt\'s viele Geheimnisse — frag die Alten.',
      beispiel_hd: 'In Hessen gibt es viele Geheimnisse — frag die Alten.',
      kategorie: 'redensart'
    },
    {
      id: 'h-189',
      ausdruck: 'Frankfurter Stadtbahn',
      hochdeutsch: 'U-Bahn Frankfurt (RMV)',
      bedeutung: 'Frankfurt hat eine besondere U-Bahn — die Stadtbahn fährt teilweise oberirdisch (Stadtbahn) und teilweise unterirdisch (U-Bahn). Das RMV-Netz (Rhein-Main-Verkehrsverbund) ist eines der größten Deutschlands. 9 U-Bahn-Linien, plus S-Bahn-Ring. Eine ständige Quelle des Frankfurter Stolzes — und der Frustration bei Verspätungen. Hessen-Mobilität.',
      beispiel: 'Mit der U-Bahn kommst du in Frankfurt überall hin.',
      beispiel_hd: 'Mit der U-Bahn kommst du in Frankfurt überall hin.',
      kategorie: 'orte'
    },
    {
      id: 'h-190',
      ausdruck: 'Hessen-Burger',
      hochdeutsch: 'Hessisches Burger-Restaurant',
      bedeutung: 'Hessen hat seine eigene Burger-Kultur — von „Bembel & Burger" in Frankfurt bis zu lokalen Restaurants, die ungewöhnliche Kombinationen anbieten (Apfelwein-Burger, Grüne-Soße-Burger). Moderne hessische Gastronomie verbindet Tradition mit Innovation. Die hessische Esskultur ist heute oft unkonventionell und kreativ. Junges Hessen.',
      beispiel: 'Heute Hessen-Burger — Tradition trifft Modernes.',
      beispiel_hd: 'Heute Hessen-Burger — Tradition trifft Modernes.',
      kategorie: 'essen'
    },
    {
      id: 'h-191',
      ausdruck: 'Stoltze-Brunnen',
      hochdeutsch: 'Friedrich-Stoltze-Brunnen Frankfurt',
      bedeutung: 'Der Friedrich-Stoltze-Brunnen am Hühnermarkt in Frankfurt ehrt den hessischen Mundartdichter. Eine Bronze-Skulptur mit Stoltze und seinem charakteristischen Gerippten-Glas. Ein Symbol für die Pflege hessischer Mundart und Kultur. In der „Neuen Altstadt" rekonstruiert. Hessisches Stadtbild-Highlight.',
      beispiel: 'Der Stoltze-Brunnen erinnert an unseren Mundartdichter.',
      beispiel_hd: 'Der Stoltze-Brunnen erinnert an unseren Mundartdichter.',
      kategorie: 'orte'
    },
    {
      id: 'h-192',
      ausdruck: 'Neue Altstadt',
      hochdeutsch: 'Frankfurt Neue Altstadt (Rekonstruktion)',
      bedeutung: 'Die Neue Altstadt in Frankfurt wurde 2018 fertiggestellt — eine Rekonstruktion historischer Fachwerk- und Steinhäuser, die im Krieg zerstört wurden. 35 Häuser, 15 davon Reproduktionen. Mit der Goldenen Waage, dem Stoltze-Brunnen und engen Gassen. Eine Mischung aus Touristen-Magnet und historischer Wiederherstellung. Hessisches Wiederaufbau-Projekt der Spitzenklasse.',
      beispiel: 'In der Neuen Altstadt erleben wir Frankfurt wie vor 1944.',
      beispiel_hd: 'In der Neuen Altstadt erleben wir Frankfurt wie vor 1944.',
      kategorie: 'orte'
    },
    {
      id: 'h-193',
      ausdruck: 'Bembel-Kunst',
      hochdeutsch: 'Frankfurter Bembel-Handwerk',
      bedeutung: 'Die Bembel-Kunst ist hessisches Töpfer-Handwerk — die charakteristischen blau-grauen Steinzeug-Krüge werden von wenigen Manufakturen noch handgemacht. Original-Bembel kommen aus dem Westerwald (eigentlich Rheinland-Pfalz), aber Hessen verbindet sie mit ihrer Apfelweinkultur. Echte Bembel sind keine Massenware — Kennerstücke kosten 50-200 Euro.',
      beispiel: 'En original Bembel — Familien-Erbstück.',
      beispiel_hd: 'Ein original Bembel — Familien-Erbstück.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-194',
      ausdruck: 'Hessischer Löwentaler',
      hochdeutsch: 'Hessischer Löwentaler (Hessen-Münze)',
      bedeutung: 'Der Löwentaler — historische Hessen-Münze — zeigt den blau-weiß gestreiften hessischen Löwen. Heute Sammlerstück und Souvenir. Auch der „Hessen-Taler" wurde zum 800-jährigen Hessen-Jubiläum 2013 herausgegeben. Hessisches Münzerbe für Numismatiker und Heimatfreunde. Stolz auf Hessen-Geschichte in Metall.',
      beispiel: 'Den Löwentaler hab ich von Opa geerbt — alt und schön.',
      beispiel_hd: 'Den Löwentaler habe ich von Opa geerbt — alt und schön.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-195',
      ausdruck: 'Eppertshausen',
      hochdeutsch: 'Eppertshausen (typisches Hessen-Dorf)',
      bedeutung: 'Eppertshausen ist eine kleine hessische Gemeinde im Landkreis Darmstadt-Dieburg — 6.000 Einwohner, stellvertretend für hunderte ähnlicher Dörfer. Mit Apfelweinkultur, Vereinen, Schoppen-Tradition. Hessisches Dorfleben mit seinen charakteristischen Merkmalen — Bürgermeister kennen alle, Vereine sind aktiv, Kerb wird gefeiert. Hessisches Land in Reinkultur.',
      beispiel: 'In Eppertshausen kennt jeder jeden — hessisches Dorfleben.',
      beispiel_hd: 'In Eppertshausen kennt jeder jeden — hessisches Dorfleben.',
      kategorie: 'orte'
    },
    {
      id: 'h-196',
      ausdruck: 'Hessenwall',
      hochdeutsch: 'Wall-Stadtbefestigung (historisch)',
      bedeutung: 'Der „Hessenwall" ist ein historischer Begriff für die Stadtbefestigungen vieler hessischer Städte — Marburg, Friedberg, Wetzlar haben noch erhaltene Wallanlagen. Im Mittelalter schützten sie die Bürgerschaft. Heute sind sie Parkanlagen und Wanderwege. Hessisches mittelalterliches Erbe als grüner Stadtring.',
      beispiel: 'Auf\'m Hessenwall spazieren — hessische Stadtgeschichte.',
      beispiel_hd: 'Auf dem Hessenwall spazieren — hessische Stadtgeschichte.',
      kategorie: 'orte'
    },
    {
      id: 'h-197',
      ausdruck: 'Frankfurter Pferdemarkt',
      hochdeutsch: 'Frankfurter Pferdemarkt (Festival)',
      bedeutung: 'Der Frankfurter Pferdemarkt war historisch wichtig — heute lebt diese Tradition in jährlichen Pferdesportveranstaltungen und Reittourismus weiter. Auch die Frankfurter Pferderennbahn in Niederrad ist regional bedeutsam. Hessen pflegt seine reiterliche Tradition — von Großherzog Ludwig (Ludwigsburg) bis heute. Hessische Reitkultur.',
      beispiel: 'Frankfurter Pferderennen — hessische Tradition mit modernem Anstrich.',
      beispiel_hd: 'Frankfurter Pferderennen — hessische Tradition mit modernem Anstrich.',
      kategorie: 'sport'
    },
    {
      id: 'h-198',
      ausdruck: 'Schaffe schaffe',
      hochdeutsch: 'Schaffen schaffen (hessische Variante)',
      bedeutung: 'Auch wenn klassischerweise schwäbisch — „Schaffe schaffe" ist im hessischen Volksmund verbreitet als Ausdruck von Fleiß und Arbeitsethos. Eingewanderte Schwaben haben den Spruch mitgebracht. In Frankfurt sagt man eher „Babbeln un Schaffen" — Reden und Arbeiten. Hessen arbeiten anders als Schwaben, aber mit ähnlichem Ergebnis. Arbeitsethos der Region.',
      beispiel: 'Schaffe schaffe — auch in Hessen, nicht nur in Schwaben.',
      beispiel_hd: 'Schaffen schaffen — auch in Hessen, nicht nur in Schwaben.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-199',
      ausdruck: 'Hessische Bürgerwehr',
      hochdeutsch: 'Hessische Demokratie-Aktion 1830',
      bedeutung: 'Die Hessische Bürgerwehr 1830 war eine demokratische Bewegung in Hessen-Kassel — Bürger forderten Verfassung und Rechtsstaat. Eine wichtige Episode auf dem Weg zu deutscher Demokratie, lange vor 1848. Hessen war damit Pionierland für Bürgerrechte. Hessische Demokratie-Tradition wird heute noch gepflegt.',
      beispiel: 'Die Hessische Bürgerwehr — Demokratie made in Hessen.',
      beispiel_hd: 'Die Hessische Bürgerwehr — Demokratie made in Hessen.',
      kategorie: 'redensart'
    },
    {
      id: 'h-200',
      ausdruck: 'Wir Hessen',
      hochdeutsch: 'Hessisches Selbstbewusstsein',
      bedeutung: '„Wir Hessen" ist ein liebevoller Gemeinschaftsbegriff — drückt hessisches Selbstbewusstsein aus. Hessen sind sich ihrer Identität bewusst: Apfelweintrinker, Eintracht-Fans, Buchmesse-Besucher, ehrlich-direkt im Umgang. „Wir Hessen sind anders" — humorvoll-stolz ausgesprochen. Hessisches „Wir" ist tolerant und einladend — wer hier wohnt, ist dabei.',
      beispiel: 'Wir Hessen — herzlich, ehrlich und immer mit Schmäh.',
      beispiel_hd: 'Wir Hessen — herzlich, ehrlich und immer mit Schmäh.',
      kategorie: 'menschen'
    },
    {
      id: 'h-201',
      ausdruck: 'Ebbelwoi-Express',
      hochdeutsch: 'Apfelwein-Straßenbahn',
      bedeutung: 'Der „Ebbelwoi-Express" ist eine Frankfurter Touristen-Institution — eine historische Straßenbahn, die durch die Stadt fährt und an Bord Ebbelwoi und Brezeln serviert. Eröffnet 1977, fährt heute jeden Samstag und Sonntag durch Frankfurt. Touristen und Frankfurter feiern an Bord mit Live-Musik und Hessen-Gesang. Symbol für Frankfurter Lebensfreude und Apfelwein-Kultur. Nicht zu verwechseln mit den Verkehrs-Straßenbahnen.',
      beispiel: 'Am Wochenend fährt der Ebbelwoi-Express — komm mit!',
      beispiel_hd: 'Am Wochenende fährt der Apfelwein-Express — komm mit!',
      kategorie: 'orte'
    },
    {
      id: 'h-202',
      ausdruck: 'Sachsenhausen',
      hochdeutsch: 'Sachsenhausen (Frankfurter Stadtteil)',
      bedeutung: 'Sachsenhausen, südlich des Mains, ist DAS Apfelwein-Viertel Frankfurts. Hier befinden sich die traditionellen Ebbelwoi-Wirtschaften wie „Zur Sonne", „Atschel", „Lorsbacher Thal" und „Wagner". Im Sommer sitzt man im Garten unter Kastanien. „Sachsenhäuser Hut" ist ein Promenadenort. Das Viertel hat sein eigenes Selbstbewusstsein — die Sachsenhäuser nennen sich selbst „die Hibbdebach" (auf dieser Seite des Bachs). Inbegriff hessischer Gemütlichkeit.',
      beispiel: 'Heut Abend gehen mir nach Sachsenhausen aufn Ebbelwoi.',
      beispiel_hd: 'Heute Abend gehen wir nach Sachsenhausen auf einen Apfelwein.',
      kategorie: 'orte'
    },
    {
      id: 'h-203',
      ausdruck: 'Geripptes',
      hochdeutsch: 'Apfelwein-Glas mit Rautenmuster',
      bedeutung: 'Das „Geripptes" ist DAS Frankfurter Apfelwein-Glas — ein 0,3-Liter-Glas mit charakteristischen Rautenmuster (16 Rauten). Wurde im 19. Jahrhundert entwickelt, damit fettige Hände durch das Rippenprofil nicht abrutschten. Wird randvoll eingeschenkt — „der Apfelwein muss bis zum letzten Rippen reichen". Wer ein Geripptes leer trinkt, ist Frankfurter. Ikonisches Symbol Frankfurts, weltweit bekannt. Touristen kaufen es als Souvenir.',
      beispiel: 'Bring mer noch e Geripptes Ebbelwoi!',
      beispiel_hd: 'Bring mir noch ein Geripptes Apfelwein!',
      kategorie: 'essen'
    },
    {
      id: 'h-204',
      ausdruck: 'Stöffche',
      hochdeutsch: 'Apfelwein (kosend)',
      bedeutung: '„Stöffche" ist die kosend-liebevolle Bezeichnung für Apfelwein — vom „Stoff", was eigentlich Material bedeutet. Steht für die Vertrautheit der Frankfurter mit ihrem Ebbelwoi. „A klees Stöffche" ist ein kleines Glas Apfelwein. Wird oft mit „bittsche" („bittschön") kombiniert: „A klees Stöffche, bittsche!". Drückt Heimatgefühl und Genuss aus. In Apfelwein-Liedern und Frankfurter Volksgut omnipräsent.',
      beispiel: 'A klees Stöffche zum Feierabend, bittsche!',
      beispiel_hd: 'Ein kleines Stöffchen zum Feierabend, bitte!',
      kategorie: 'essen'
    },
    {
      id: 'h-205',
      ausdruck: 'Handkäs mit Musik',
      hochdeutsch: 'Handkäse mit Marinade',
      bedeutung: '„Handkäs mit Musik" ist DAS Frankfurter Nationalgericht — Sauermilchkäse in Marinade aus Essig, Öl, Zwiebeln, Kümmel und Pfeffer. „Mit Musik" weil die Zwiebeln später für Blähungen sorgen (= die Musik). Wird mit Brot und Ebbelwoi serviert. Stammt aus dem 18. Jahrhundert. Polarisierend: Hessen lieben es, Touristen schauen skeptisch. Bestes Beispiel hessischer kulinarischer Direktheit — riecht stark, schmeckt würzig.',
      beispiel: 'Handkäs mit Musik zum Stöffche — des is Frankfurt!',
      beispiel_hd: 'Handkäse mit Musik zum Apfelwein — das ist Frankfurt!',
      kategorie: 'essen'
    },
    {
      id: 'h-206',
      ausdruck: 'Frankfurter Kranz',
      hochdeutsch: 'Frankfurter Kranz (Torte)',
      bedeutung: 'Der „Frankfurter Kranz" ist eine berühmte Buttercreme-Torte aus Frankfurt — ringförmig, mit Krokant, Vanille-Buttercreme und Kirschen. Erfunden im 18. Jahrhundert, als Frankfurt eine freie Reichsstadt war. Soll an die Kaiserkrönungen im Frankfurter Dom erinnern (kranzförmig wie eine Krone). Heute Konditorei-Klassiker in ganz Deutschland. Jede hessische Konditorei hat ihn — manche besser, manche schlechter. Familientortenrezept oft generationenübergreifend.',
      beispiel: 'Zum Geburtstag gibt\'s Frankfurter Kranz von der Oma.',
      beispiel_hd: 'Zum Geburtstag gibt es Frankfurter Kranz von der Oma.',
      kategorie: 'essen'
    },
    {
      id: 'h-207',
      ausdruck: 'Grie Soß',
      hochdeutsch: 'Grüne Soße',
      bedeutung: '„Grie Soß" ist Frankfurts kulinarisches Wahrzeichen — kalte Kräutersoße aus sieben Kräutern: Borretsch, Kerbel, Kresse, Petersilie, Pimpinelle, Sauerampfer, Schnittlauch. Wird mit gekochten Kartoffeln und Eiern serviert. Goethe liebte sie. „Grie-Soß-Festival" findet jährlich auf dem Roßmarkt statt. Die sieben Kräuter sind exakt definiert — eine Variation gilt als Sakrileg. Symbol für Frankfurter Kulinarik-Stolz.',
      beispiel: 'Sonntags gibt\'s Grie Soß mit Kartoffeln und Eiern.',
      beispiel_hd: 'Sonntags gibt es Grüne Soße mit Kartoffeln und Eiern.',
      kategorie: 'essen'
    },
    {
      id: 'h-208',
      ausdruck: 'Wertheimer',
      hochdeutsch: 'Apfelwein-Schoppen-Ständer',
      bedeutung: 'Der „Wertheimer" ist eine Frankfurter Apfelwein-Tradition — ein hölzernes Tablett mit Halterungen für mehrere Geripptes, sodass die Glas-Krüge nicht umfallen. Stammt aus der Zeit, als Frankfurter Wirtschaften eng waren. Heute Sammlerstück. Wird in Apfelwein-Lokalen oft als Deko verwendet. Erinnert an die Geselligkeit alter Sachsenhäuser Stuben. Auch als Souvenir-Artikel erhältlich.',
      beispiel: 'Auf\'m Wertheimer kannste sechs Geripptes tragen.',
      beispiel_hd: 'Auf dem Wertheimer kannst du sechs Geripptes tragen.',
      kategorie: 'essen'
    },
    {
      id: 'h-209',
      ausdruck: 'Eintracht!',
      hochdeutsch: 'Eintracht Frankfurt (Fußballverein)',
      bedeutung: '„Eintracht!" ist der Schlachtruf der Eintracht-Frankfurt-Fans — ein Mantra in der Commerzbank-Arena. Eintracht Frankfurt wurde 1899 gegründet, gewann 1959 die Deutsche Meisterschaft, 1980 und 2022 den DFB-Pokal, und 2022 die Europa League. Hessischer Fußball-Identität pur. „Schwarz-weiß" sind die Vereinsfarben. Fans nennen sich „Schwarz-weißes Karussell". Die Bornheimer Hang ist die Heimstätte. Eintracht-Niederlagen gehören zum hessischen Lebenszyklus.',
      beispiel: 'Eintracht! — geh\'mer ins Stadion, heut spielen wir gegen Bayern.',
      beispiel_hd: 'Eintracht! — gehen wir ins Stadion, heute spielen wir gegen Bayern.',
      kategorie: 'sport'
    },
    {
      id: 'h-210',
      ausdruck: 'Adler',
      hochdeutsch: 'Adler (Eintracht-Wappentier)',
      bedeutung: 'Der „Adler" ist das Wappentier von Eintracht Frankfurt — schwarz-weiß stilisiert. Bezieht sich auf den Reichsadler aus der Zeit, als Frankfurt freie Reichsstadt war. „Mir san die Adler!" ist ein Eintracht-Sprechchor. Auch Spitzname für die Mannschaft: „die Adler" gewannen die Europa League. Tattoo-Motiv vieler Fans. Adler-Statue im Stadion. Symbol für Frankfurter Größe — historisch und sportlich. Die schwarz-weißen Adler-Trikots sind weltweit erkennbar.',
      beispiel: 'Die Adler haben endlich mal wieder gewonnen!',
      beispiel_hd: 'Die Adler (Eintracht) haben endlich mal wieder gewonnen!',
      kategorie: 'sport'
    },
    {
      id: 'h-211',
      ausdruck: 'Mainmetropole',
      hochdeutsch: 'Main-Metropole (Frankfurt)',
      bedeutung: '„Mainmetropole" ist die offizielle Eigenwerbung Frankfurts — die Stadt am Main. Wird in Touristik-Werbung und Geschäftspressemitteilungen verwendet. Frankfurt ist Banken-Hauptstadt Deutschlands („Bankfurt"), Messemetropole und Sitz der Europäischen Zentralbank. „Skyline am Main" ist das ikonische Bild. Die Hessen sind stolz auf ihre Mainmetropole — aber auch ein wenig spöttisch über die Banker-Imagepflege.',
      beispiel: 'Die Mainmetropole ist Bankenhauptstadt und Messezentrum.',
      beispiel_hd: 'Die Main-Metropole ist Bankenhauptstadt und Messezentrum.',
      kategorie: 'orte'
    },
    {
      id: 'h-212',
      ausdruck: 'Mainhattan',
      hochdeutsch: 'Mainhattan (Frankfurter Skyline)',
      bedeutung: '„Mainhattan" ist der humorvolle Spitzname für die Frankfurter Skyline — Anspielung auf Manhattan. Frankfurt hat die höchste Skyline Deutschlands: Commerzbank Tower (259m), Messeturm, EZB-Tower, MainTower. Vom Maintaunus aus gesehen erinnert die Silhouette an New York. Hessen sind stolz auf die Skyline — sie ist Deutschlands einzige echte Wolkenkratzer-Skyline. Auch als Marketing-Begriff verwendet. Nachts beleuchtet besonders fotogen.',
      beispiel: 'Bei Sonnenuntergang schaust du dir die Mainhattan-Skyline an.',
      beispiel_hd: 'Bei Sonnenuntergang schaust du dir die Mainhattan-Skyline an.',
      kategorie: 'orte'
    },
    {
      id: 'h-213',
      ausdruck: 'Hibbdebach',
      hochdeutsch: 'Diesseits des Mains (Sachsenhausen-Sicht)',
      bedeutung: '„Hibbdebach" ist die Sachsenhäuser Selbstbezeichnung — „hibb de Bach" („auf dieser Seite des Bachs/Mains"). Sachsenhausen liegt südlich des Mains. Frankfurt jenseits des Mains wird „Dribbdebach" („drüben dem Bach") genannt. Sachsenhäuser sehen sich als die echten Frankfurter, weil Apfelwein-Tradition hier zuhause ist. „Hibbdebach is Hessen, Dribbdebach is Bankfurt". Lokalpatriotismus, der nordwestlich des Mains nicht teilt.',
      beispiel: 'Wir Hibbdebacher sind die echten Frankfurter!',
      beispiel_hd: 'Wir Sachsenhäuser sind die echten Frankfurter!',
      kategorie: 'orte'
    },
    {
      id: 'h-214',
      ausdruck: 'Dribbdebach',
      hochdeutsch: 'Jenseits des Mains (Frankfurter Innenstadt)',
      bedeutung: '„Dribbdebach" ist die Sachsenhäuser Bezeichnung für die nördliche Frankfurter Innenstadt — „drüben dem Bach". Im Gegensatz zu „Hibbdebach" (Sachsenhausen). Dribbdebach ist Banken, Messe, Römer, Goethehaus. Klingt leicht spöttisch — die Sachsenhäuser sehen ihre Seite als gemütlicher. „Dribbdebacher" sind die anonymen Banker, „Hibbdebacher" die echten Frankfurter. Sprachliches Spiel mit alten Stadtteil-Rivalitäten.',
      beispiel: 'Die Dribbdebacher sitzen den ganzen Tag im Büro.',
      beispiel_hd: 'Die Frankfurter (Innenstadt) sitzen den ganzen Tag im Büro.',
      kategorie: 'menschen'
    },
    {
      id: 'h-215',
      ausdruck: 'Höchst',
      hochdeutsch: 'Höchst (Frankfurter Stadtteil)',
      bedeutung: 'Höchst, westlich von Frankfurt, war bis 1928 eine eigenständige Stadt. Heute ein Frankfurter Stadtteil mit eigenem Charakter — Altstadt mit Fachwerk, Höchster Schloss, Chemie-Industriestandort (Höchst AG). Hat eigene Identität als „Höchster" — weder Frankfurter noch Vorortbewohner. Stolz auf die Höchster Porzellan-Manufaktur (gegründet 1746). „Bunter Höchster" wird auf Fastnacht gerufen. Spannungen mit Frankfurt: Höchster wollen oft als eigenständig wahrgenommen werden.',
      beispiel: 'In Höchst gibt\'s noch alte Fachwerkhäuser zum Bestaunen.',
      beispiel_hd: 'In Höchst gibt es noch alte Fachwerkhäuser zum Bestaunen.',
      kategorie: 'orte'
    },
    {
      id: 'h-216',
      ausdruck: 'Bornheim',
      hochdeutsch: 'Bornheim (Frankfurter Stadtteil)',
      bedeutung: 'Bornheim, östlich vom Frankfurter Stadtzentrum, ist „dat lustige Dorf" — Spitzname für den eigenständigen Stadtteil. Hat eigene Apfelwein-Wirtschaften, kleine Geschäfte, Wochenmarkt am „Berger Straße". Bornheim wurde 1877 eingemeindet, behält aber dörflichen Charakter. „Bornheimer Hang" beherbergt das Eintracht-Stadion. „Bornheimer" pflegen ihre Tradition gegen die Frankfurter Gentrifizierung. Symbol für hessische Bodenständigkeit innerhalb der Großstadt.',
      beispiel: 'Bornheim ist das lustige Dorf in Frankfurt.',
      beispiel_hd: 'Bornheim ist das lustige Dorf in Frankfurt.',
      kategorie: 'orte'
    },
    {
      id: 'h-217',
      ausdruck: 'Goethe-Stadt',
      hochdeutsch: 'Goethe-Stadt (Frankfurt)',
      bedeutung: '„Goethe-Stadt" ist Frankfurts Selbstbezeichnung als Geburtsort Johann Wolfgang von Goethes. Goethe wurde 1749 in Frankfurt geboren (heute Goethehaus am Großen Hirschgraben). Die Stadt pflegt Goethes Erbe — Goethe-Universität, Goethe-Denkmal, Goethe-Plakette. Frankfurter Tourismus baut massiv auf Goethe-Tourismus. Goethe selbst war ambivalent über Frankfurt — zog später nach Weimar. Hessen sind stolz auf ihren berühmtesten Sohn.',
      beispiel: 'Frankfurt is die Goethe-Stadt — von hier kommt der Dichter!',
      beispiel_hd: 'Frankfurt ist die Goethe-Stadt — von hier kommt der Dichter!',
      kategorie: 'orte'
    },
    {
      id: 'h-218',
      ausdruck: 'Römer',
      hochdeutsch: 'Römer (Frankfurter Rathaus)',
      bedeutung: 'Der „Römer" ist Frankfurts historisches Rathaus am Römerberg — drei verbundene gotische Häuser mit der ikonischen Stufengiebel-Front. Wurde seit dem 15. Jahrhundert als Rathaus genutzt. Der Kaisersaal beherbergt die Porträts aller deutschen Kaiser. Heute Treffpunkt: Eintracht-Spieler werden hier nach Titelgewinnen empfangen. Symbol Frankfurts. Auch Standort des Christkindlmarkts. Beliebtes Touristen- und Hochzeits-Ziel.',
      beispiel: 'Am Römer treffen wir uns nach dem Eintracht-Sieg!',
      beispiel_hd: 'Am Römer treffen wir uns nach dem Eintracht-Sieg!',
      kategorie: 'orte'
    },
    {
      id: 'h-219',
      ausdruck: 'Skyline',
      hochdeutsch: 'Frankfurter Skyline',
      bedeutung: 'Die „Skyline" ist Frankfurts Wahrzeichen — die einzige echte Wolkenkratzer-Skyline Deutschlands. Höchstes Gebäude: Commerzbank Tower (259m), gefolgt von Messeturm und MainTower. Best bestaunbar vom Maintaunus aus, vom Sachsenhäuser Mainufer oder von der Mainspitze. „Skyline-View" ist beliebtes Restaurant-Konzept. Bei Sonnenuntergang besonders fotogen. Auch international: Frankfurts Skyline ist neben Berliner Fernsehturm wohl Deutschlands meistfotografiertes Stadtsymbol.',
      beispiel: 'Bei Sonnenuntergang ist die Skyline am schönsten.',
      beispiel_hd: 'Bei Sonnenuntergang ist die Skyline am schönsten.',
      kategorie: 'orte'
    },
    {
      id: 'h-220',
      ausdruck: 'Buchmesse',
      hochdeutsch: 'Frankfurter Buchmesse',
      bedeutung: 'Die „Buchmesse" ist DIE wichtigste Buchmesse der Welt — jeden Oktober in Frankfurt mit 7.000 Ausstellern aus 100 Ländern. Tradition seit 1949, wurzelt aber im 15. Jahrhundert. Verleihung des Friedenspreises des Deutschen Buchhandels in der Paulskirche während der Messe. Hessen sind stolz: „mir habbe die Buchmesse!". Internationales Medienereignis. Verlage stellen neue Bücher vor, Rechte werden gehandelt. Frankfurts Beitrag zur Weltliteratur.',
      beispiel: 'Im Oktober kommen alle Verleger der Welt zur Buchmesse.',
      beispiel_hd: 'Im Oktober kommen alle Verleger der Welt zur Buchmesse.',
      kategorie: 'feiern'
    },
    {
      id: 'h-221',
      ausdruck: 'IAA',
      hochdeutsch: 'Internationale Automobil-Ausstellung',
      bedeutung: 'Die „IAA" — Internationale Automobil-Ausstellung — war jahrzehntelang in Frankfurt zuhause (1951-2021). Welt-Automobilmesse mit allen großen Herstellern. Wurde 2021 nach München verlegt, was Frankfurt schmerzlich traf. Hessen erinnern sich nostalgisch an die IAA-Zeit. „Mir habbe ja unsre Messe verloren!". Für Frankfurter ein Stück Identität. IAA-Hostessen, Auto-Premieren, internationale Presse — alles Geschichte heute. Wirtschaftlich bedeutender Verlust für Frankfurt.',
      beispiel: 'Frieher war die IAA in Frankfurt — heute is\' in München.',
      beispiel_hd: 'Früher war die IAA in Frankfurt — heute ist sie in München.',
      kategorie: 'feiern'
    },
    {
      id: 'h-222',
      ausdruck: 'Hauptwache',
      hochdeutsch: 'Hauptwache (Frankfurter Platz)',
      bedeutung: 'Die „Hauptwache" ist Frankfurts zentraler Platz und U-Bahn-Knoten. Benannt nach dem barocken Wachhaus von 1730. Treffpunkt zwischen Goethe-Straße, Bockenheimer Anlage und Zeil. Heute moderne U-Bahn-Station unter dem historischen Wachhaus. „Treffen wir uns an der Hauptwache" ist Standard-Verabredung. Touristen-Magnet wegen der barocken Architektur. Wirtschaftlich bedeutsame Adresse — viele Bankzentralen in der Nähe. Symbol für Frankfurter Treffpunkt-Kultur.',
      beispiel: 'Treffen wir uns um 18 Uhr an der Hauptwache?',
      beispiel_hd: 'Treffen wir uns um 18 Uhr an der Hauptwache?',
      kategorie: 'orte'
    },
    {
      id: 'h-223',
      ausdruck: 'Zeil',
      hochdeutsch: 'Zeil (Frankfurter Einkaufsstraße)',
      bedeutung: 'Die „Zeil" ist Deutschlands umsatzstärkste Einkaufsstraße — Fußgängerzone in Frankfurts Zentrum, zwischen Hauptwache und Konstablerwache. 1,2 km lang. Galeria Karstadt, Kaufhof, MyZeil mit moderner Glasfassade. Während der Buchmesse und der Weihnachtszeit überfüllt. Hessen kommen zur Zeil zum Shopping aus dem ganzen Bundesland. Auch Treffpunkt für Demonstrationen. „Auf der Zeil shoppen" ist klassisches Frankfurter Wochenend-Programm.',
      beispiel: 'Samstags geh ich gern auf der Zeil bummeln.',
      beispiel_hd: 'Samstags gehe ich gerne auf der Zeil bummeln.',
      kategorie: 'orte'
    },
    {
      id: 'h-224',
      ausdruck: 'Bembelche',
      hochdeutsch: 'kleiner Bembel',
      bedeutung: 'Das „Bembelche" ist die Diminutiv-Form von Bembel — ein kleiner Apfelweinkrug. Wird oft als Souvenir verkauft oder als persönliches Geschenk verschenkt („A Bembelche für die Tante"). Klingt liebevoll-zärtlich. Auch metaphorisch verwendet für etwas Kleines, Zerbrechliches, Wertvolles. In Sachsenhäuser Apfelwein-Lokalen oft als Probier-Größe für Frauen oder Anfänger angeboten. Symbol für hessische Liebe zum Detail.',
      beispiel: 'Hier hast a Bembelche für die Reise — viel Spaß!',
      beispiel_hd: 'Hier hast du einen kleinen Bembel für die Reise — viel Spaß!',
      kategorie: 'essen'
    },
    {
      id: 'h-225',
      ausdruck: 'Wirt',
      hochdeutsch: 'Wirt (Apfelwein-Wirt)',
      bedeutung: 'Der „Wirt" ist mehr als nur ein Gastwirt — er ist die Seele der Sachsenhäuser Apfelwein-Wirtschaft. Kennt die Stammgäste mit Namen, weiß was sie trinken, ohne zu fragen. „Der oide Wirt" ist eine respektvolle Bezeichnung. Wenn ein Wirt einer Sachsenhäuser Wirtschaft stirbt, ist das ein Stadtteil-Ereignis. Symbol für hessische Gastfreundschaft und kontinuierliche Tradition. Familienwirtschaften oft über Generationen weitergegeben.',
      beispiel: 'Der Wirt vom „Atschel" kennt mich seit zwanzig Jahren.',
      beispiel_hd: 'Der Wirt vom „Atschel" kennt mich seit zwanzig Jahren.',
      kategorie: 'menschen'
    },
    {
      id: 'h-226',
      ausdruck: 'Schoppe',
      hochdeutsch: 'Schoppen (Apfelwein-Glas)',
      bedeutung: 'Der „Schoppe" ist die hessische Bezeichnung für ein Glas Apfelwein — meist 0,25 oder 0,3 Liter (also ein Geripptes). „Mir geh\'n auf an Schoppe" ist klassische Verabredung. „Schoppe-Petze" sind die Frühaufsteher in Apfelwein-Wirtschaften. „Schoppe-Sänger" sind Volkssänger in Sachsenhausen, die zu Ebbelwoi-Liedern Apfelwein-Trinklieder vortragen. Symbol hessischer Geselligkeit. Auch metaphorisch: „auf an Schoppe" gehen heißt einen entspannten Abend planen.',
      beispiel: 'Geh\'mer auf an Schoppe nach Sachsenhausen?',
      beispiel_hd: 'Gehen wir auf einen Schoppen nach Sachsenhausen?',
      kategorie: 'essen'
    },
    {
      id: 'h-227',
      ausdruck: 'Hessen-Schmäh',
      hochdeutsch: 'hessischer Witz',
      bedeutung: '„Hessen-Schmäh" ist der charakteristische hessische Humor — direkter, ehrlicher Witz mit Bauernschläue. Hessen lachen über sich selbst und ihre Mitmenschen, oft mit hintergründigem Sarkasmus. Karl Wagner („Im Frühtau zu Berge"), Heinz Schenk („Zum blauen Bock"), Bodo Bach — alles Vertreter des Hessen-Schmähs. Im Gegensatz zum bayerischen oder kölnischen Humor weniger derb, aber genauso wirkungsvoll. Frankfurter Mundart-Komödie lebt davon.',
      beispiel: 'Der Hessen-Schmäh — direkt, ehrlich und herzlich.',
      beispiel_hd: 'Der hessische Witz — direkt, ehrlich und herzlich.',
      kategorie: 'redensart'
    },
    {
      id: 'h-228',
      ausdruck: 'Mainfest',
      hochdeutsch: 'Mainfest (Frankfurter Sommerfest)',
      bedeutung: 'Das „Mainfest" ist eine der ältesten Frankfurter Volksfeste — am Mainufer in Sachsenhausen und auf dem Römerberg. Tradition seit dem 14. Jahrhundert. Anfang August mit Feuerwerk, Live-Musik, Bratwurst, Bier und Apfelwein. Höhepunkt: das Feuerwerk über dem Main, das tausende Frankfurter anzieht. Familientreffen und Touristen-Magnet. Symbol für Frankfurter Lebensfreude im Sommer.',
      beispiel: 'Beim Mainfest treffen sich alle Frankfurter am Mainufer.',
      beispiel_hd: 'Beim Mainfest treffen sich alle Frankfurter am Mainufer.',
      kategorie: 'feiern'
    },
    {
      id: 'h-229',
      ausdruck: 'Apfelweinland',
      hochdeutsch: 'Apfelweinland (Hessen)',
      bedeutung: '„Apfelweinland" ist eine Selbstbezeichnung Hessens — wegen der weltweit einzigartigen Apfelweintradition. Hessen produziert 90% des deutschen Apfelweins. Apfelwein-Routen führen durch Streuobstwiesen, Apfelwein-Wirtschaften und Mostereien. „Hessisches Apfelwein-Museum" in Frankfurt. Im Apfelweinland gibt\'s eigene Apfelsorten, eigene Pressrezepte und eine eigene Kultur des Trinkens. Hessens Antwort auf Bayerns Bier-Identität.',
      beispiel: 'Im Apfelweinland Hessen wächst der beste Apfel.',
      beispiel_hd: 'Im Apfelweinland Hessen wächst der beste Apfel.',
      kategorie: 'orte'
    },
    {
      id: 'h-230',
      ausdruck: 'Hessentag',
      hochdeutsch: 'Hessentag (Landesfest)',
      bedeutung: 'Der „Hessentag" ist das größte und älteste Landesfest Deutschlands — gegründet 1961 von Ministerpräsident Georg August Zinn. Findet jährlich in einer anderen hessischen Stadt statt, dauert 10 Tage, zieht 1-2 Millionen Besucher an. Mit Festumzug, Live-Musik, Trachtenfest, Hessen-Kabarett. Jede hessische Stadt bewirbt sich, der Hessentag bringt Investitionen mit. Symbol für hessisches Selbstbewusstsein und Landesidentität. Politische Wahlkampfauftritte allgegenwärtig.',
      beispiel: 'Der Hessentag bringt jedes Jahr eine andere Stadt ins Rampenlicht.',
      beispiel_hd: 'Der Hessentag bringt jedes Jahr eine andere Stadt ins Rampenlicht.',
      kategorie: 'feiern'
    },
    {
      id: 'h-231',
      ausdruck: 'Marburg',
      hochdeutsch: 'Marburg an der Lahn',
      bedeutung: 'Marburg ist mittelhessische Universitätsstadt mit Bergcharakter — Philipps-Universität gegründet 1527 als erste protestantische Universität der Welt. Heinrich Heine, Friedrich Carl von Savigny und die Brüder Grimm studierten oder lehrten hier. Steile Gassen, Schloss auf dem Berg, Elisabethkirche (älteste rein-gotische Kirche Deutschlands). „Marburg, wo Studenten die Treppe hochkriechen". Symbol für mittelhessische Bildungs-Tradition. Hessische Identität jenseits der Mainmetropole.',
      beispiel: 'Marburg ist die schönste Studentenstadt im Land.',
      beispiel_hd: 'Marburg ist die schönste Studentenstadt im Land.',
      kategorie: 'orte'
    },
    {
      id: 'h-232',
      ausdruck: 'Gießen',
      hochdeutsch: 'Gießen an der Lahn',
      bedeutung: 'Gießen ist mittelhessische Universitätsstadt — Justus-Liebig-Universität gegründet 1607, benannt nach dem Chemiker Justus Liebig (Erfinder des Kunstdüngers). „Gießener Anzeiger" ist regionale Tageszeitung. Stadt der Wissenschaft und Medizin — Universitätsklinikum. Im 2. Weltkrieg stark zerstört, danach modern wiederaufgebaut. Studenten-Hochburg. „Mittelhessen-Hauptstadt" Selbstbezeichnung. Konkurriert sportlich-akademisch mit Marburg.',
      beispiel: 'Mei Sohn studiert in Gießen Medizin.',
      beispiel_hd: 'Mein Sohn studiert in Gießen Medizin.',
      kategorie: 'orte'
    },
    {
      id: 'h-233',
      ausdruck: 'Lahnaue',
      hochdeutsch: 'Lahnaue (Mittelhessen-Landschaft)',
      bedeutung: 'Die „Lahnaue" ist die Auenlandschaft entlang der Lahn — Mittelhessens prägende Flusslandschaft. Verläuft durch Marburg, Gießen, Wetzlar, Limburg. Beliebt für Radwanderungen (Lahn-Radweg, 250 km), Kanu-Touren, Naturbeobachtung. Lahnaue als Naturschutzgebiet seit 2008. Bezeichnet auch das spezifische Lebensgefühl der Lahnauen-Bewohner: ländlich-mittelhessisch, mit Liebe zu Wandern und Bratwurst-Stand am Fluss. Hessens grüne Seite.',
      beispiel: 'Am Wochenend radeln wir durch die Lahnaue.',
      beispiel_hd: 'Am Wochenende radeln wir durch die Lahnaue.',
      kategorie: 'natur'
    },
    {
      id: 'h-234',
      ausdruck: 'Wetzlar',
      hochdeutsch: 'Wetzlar (Optik-Stadt)',
      bedeutung: 'Wetzlar ist mittelhessische Stadt — Welt-Hauptstadt der Optik. Leica-Kameras, Zeiss Microscopes, Optische Industrie. Goethe lebte hier während seines Praktikums am Reichskammergericht (1772) — schrieb hier „Werthers Leiden". Wetzlarer Dom mit gotischer Architektur. „Wetzlarer Optiktage" jährliche Fachmesse. Bekannte Wetzlarer: Hugo Junkers (Flugzeugbau). Spaß-Spitzname: „die Wetzlarer Linse" für Brillen und Objektive. Symbol mittelhessischer Industrietradition.',
      beispiel: 'In Wetzlar wurde die erste Leica gebaut.',
      beispiel_hd: 'In Wetzlar wurde die erste Leica gebaut.',
      kategorie: 'orte'
    },
    {
      id: 'h-235',
      ausdruck: 'Bachgauer',
      hochdeutsch: 'Bachgauer Region',
      bedeutung: 'Der „Bachgau" ist eine mittelhessische Landschaft südlich des Odenwalds — eingebettet zwischen Aschaffenburg und Darmstadt. Ländliche Region mit Obstbau, Apfelwein-Tradition (sogar mehr als in Frankfurt!), Trachten und Volksmusik. „Bachgauer" sind die Einwohner — als verschmitzt, freundlich und apfelwein-trinkfest bekannt. „Bachgauer Singspiel" ist regionale Theater-Tradition. Bachgau-Trachtenverein pflegt regionale Identität. Wenig touristisch — hessisches Hinterland.',
      beispiel: 'Die Bachgauer machen den besten Apfelwein der Welt.',
      beispiel_hd: 'Die Bachgauer machen den besten Apfelwein der Welt.',
      kategorie: 'menschen'
    },
    {
      id: 'h-236',
      ausdruck: 'Vogelsberg',
      hochdeutsch: 'Vogelsberg (Mittelgebirge)',
      bedeutung: 'Der „Vogelsberg" ist größtes erloschenes Vulkanmassiv Mitteleuropas — mittelhessisches Mittelgebirge mit 773m Höhe (Hoherodskopf). Ländliche Region mit Streuobstwiesen, Wandern, Skifahren im Winter. „Vogelsberger Trachten-Verein" pflegt regionale Bräuche. Im Winter zur Skihütte, im Sommer zu Wanderpfaden. Ländlich-bodenständig — der Gegensatz zur Frankfurter Mainhattan. Symbol für hessisches Hinterland. Beliebtes Wochenend-Ziel der Frankfurter.',
      beispiel: 'Im Winter geh\'n wir auf\'n Vogelsberg Ski fahren.',
      beispiel_hd: 'Im Winter gehen wir auf den Vogelsberg Ski fahren.',
      kategorie: 'natur'
    },
    {
      id: 'h-237',
      ausdruck: 'Rhön',
      hochdeutsch: 'Rhön (Mittelgebirge)',
      bedeutung: 'Die „Rhön" ist östliches hessisches Mittelgebirge — UNESCO-Biosphärenreservat seit 1991. „Land der offenen Fernen" wegen weiter Aussicht. Hessen, Bayern und Thüringen treffen sich hier. Wasserkuppe (950m, Hessens höchster Berg) ist Wiege des Segelflugs. „Rhöner Streuselkuchen" ist regionale Spezialität. Schäferei-Tradition (Rhönschafe). Ländlich, ruhig, naturnah. Beliebt für Wandern, Mountainbiken, Drachenfliegen. Auch UNESCO-Sternenpark — wenig Lichtverschmutzung.',
      beispiel: 'In der Rhön gibt\'s die beste Aussicht von Hessen.',
      beispiel_hd: 'In der Rhön gibt es die beste Aussicht von Hessen.',
      kategorie: 'natur'
    },
    {
      id: 'h-238',
      ausdruck: 'Wasserkuppe',
      hochdeutsch: 'Wasserkuppe (höchster Berg Hessens)',
      bedeutung: 'Die „Wasserkuppe" ist mit 950m Hessens höchster Berg — in der Rhön gelegen. Wiege des Segelflugs in Deutschland (seit 1920er Jahren). Segelflugmuseum, Modellflug-Tradition. Im Winter Skifahren auf Hessens einzigem nennenswerten Skigebiet. Auf dem Gipfel: Aussichtsplattform, Radom (alte Radaranlage). Symbol für hessische Naturschönheit jenseits der Großstädte. „Auf die Wasserkuppe" ist klassischer Wochenend-Ausflug der Frankfurter.',
      beispiel: 'Von der Wasserkuppe siehst du bis nach Thüringen.',
      beispiel_hd: 'Von der Wasserkuppe siehst du bis nach Thüringen.',
      kategorie: 'orte'
    },
    {
      id: 'h-239',
      ausdruck: 'Limburg',
      hochdeutsch: 'Limburg an der Lahn',
      bedeutung: 'Limburg ist mittelhessische Bischofsstadt — gotischer Limburger Dom (1235) mit ikonischen sieben Türmen. Fachwerk-Altstadt aus dem 14. Jahrhundert. Limburger Käse (mit Kümmel) ist regionales Produkt. Bahnknotenpunkt: Schnellbahn-Strecke Frankfurt-Köln passiert hier. Tebartz-van-Elst-Skandal (2012-13) machte Limburg negativ berühmt („Protz-Bischof"). Trotz Skandals: Stadt mit Charme und Geschichte. Westhessisches Tor zu Westerwald und Taunus.',
      beispiel: 'Der Limburger Dom is\' der schönste Hessen.',
      beispiel_hd: 'Der Limburger Dom ist der schönste Hessens.',
      kategorie: 'orte'
    },
    {
      id: 'h-240',
      ausdruck: 'Taunus',
      hochdeutsch: 'Taunus (Mittelgebirge nördlich Frankfurts)',
      bedeutung: 'Der „Taunus" ist hessisches Mittelgebirge nördlich von Frankfurt — beliebtes Wochenend-Ausflugsgebiet der Frankfurter. Großer Feldberg (881m), Kleiner Feldberg, Saalburg (Römerkastell), Bad Homburg, Königstein. Reich an römischer Geschichte (Limes-Wall). Heute Wanderparadies, Skihütte im Winter. Wohnort der Frankfurter Banker (Kronberg, Königstein — die teuerste Wohngegend Deutschlands). „Auf\'n Taunus" ist Standard-Wochenend-Programm.',
      beispiel: 'Am Sonntag wandern wir auf\'n Taunus.',
      beispiel_hd: 'Am Sonntag wandern wir in den Taunus.',
      kategorie: 'natur'
    },
    {
      id: 'h-241',
      ausdruck: 'Saalburg',
      hochdeutsch: 'Saalburg (römisches Kastell)',
      bedeutung: 'Die „Saalburg" ist ein rekonstruiertes römisches Kastell am Limes im Taunus — UNESCO-Welterbe seit 2005. Wurde im 19. Jahrhundert wiederaufgebaut, ist heute Freilichtmuseum. Zeigt römische Militärarchitektur an der nördlichen Grenze des Imperiums. Beliebt für Schulausflüge und Familientouren. Symbol für hessische Geschichte — von römischer Zeit bis heute. Saalburg-Museum mit nachgebauter römischer Lebenswelt.',
      beispiel: 'Mit der Klasse machten wir Ausflug zur Saalburg.',
      beispiel_hd: 'Mit der Klasse machten wir Ausflug zur Saalburg.',
      kategorie: 'orte'
    },
    {
      id: 'h-242',
      ausdruck: 'Bad Homburg',
      hochdeutsch: 'Bad Homburg vor der Höhe',
      bedeutung: 'Bad Homburg ist mondäne Kurstadt am Taunus-Fuß — Sitz der Privatbank Hauck Aufhäuser, Konzernzentralen, Spielbank-Casino. „Hessisches Bath" wegen heißer Mineralquellen. Kurpark mit klassizistischen Bauten. Bekannter Sport-Resort: Bad Homburg Tennis Open. Wohnort vieler Frankfurter Banker. „Hut von Bad Homburg" — der Homburger Hut ist weltberühmtes Modeaccessoire. Kombination aus Wellness, Wirtschaft und Tradition.',
      beispiel: 'In Bad Homburg gehen die Frankfurter ins Kurbad.',
      beispiel_hd: 'In Bad Homburg gehen die Frankfurter ins Kurbad.',
      kategorie: 'orte'
    },
    {
      id: 'h-243',
      ausdruck: 'Steinhäger',
      hochdeutsch: 'Steinhäger (Klarer Schnaps)',
      bedeutung: '„Steinhäger" ist Wacholderschnaps — eigentlich aus Westfalen, aber in Hessen als „Korn"-Variante beliebt. Wird zum Bier als Korn bestellt: „A Pils und a Steinhäger, bittsche!". Auch zu Brotzeit und Apfelwein. Im hessischen Sprachgebrauch verwendet. Bekanntes Bauernschnäpschen. „Steinhäger-Glas" ist eigene kleine Glasform. Stammt vom Steinhäger Schloss in Steinhagen (Westfalen), in Hessen jedoch übernommen ins regionale Apfelwein-Sortiment.',
      beispiel: 'A Steinhäger zum Bier, bittsche!',
      beispiel_hd: 'Ein Steinhäger zum Bier, bitte!',
      kategorie: 'essen'
    },
    {
      id: 'h-244',
      ausdruck: 'Bergstraß',
      hochdeutsch: 'Bergstraße (Weinregion Südhessens)',
      bedeutung: 'Die „Bergstraß" ist Südhessens Weinregion — entlang des östlichen Oberrhein-Talrands von Darmstadt bis Heidelberg. Mildes Klima (Mittagstemperatur 12°C, „deutsche Toskana"), Mandelblüte im Februar. Riesling und Auxerrois als Hauptrebsorten. „Bergsträßer Wein-Wanderweg" ist beliebtes Tourist-Ziel. „Heppenheim" als Hauptort. Symbol für hessische Wein-Identität (selten — Hessen ist vorrangig Apfelwein-Land). Konzentriert auf 70 km² beste Weinanbauflächen.',
      beispiel: 'An der Bergstraß wächst der beste Riesling Hessens.',
      beispiel_hd: 'An der Bergstraße wächst der beste Riesling Hessens.',
      kategorie: 'orte'
    },
    {
      id: 'h-245',
      ausdruck: 'Odenwald',
      hochdeutsch: 'Odenwald (Mittelgebirge)',
      bedeutung: 'Der „Odenwald" ist südhessisches Mittelgebirge — verteilt sich auf Hessen, Bayern und Baden-Württemberg. Höchster Berg: Katzenbuckel (626m). Reich an Sagen — Siegfried wurde im Odenwald von Hagen ermordet (Nibelungenlied). Burgen wie Burg Frankenstein (inspirierte angeblich Mary Shelley). „Odenwälder" gelten als bodenständig, etwas eigen, sehr heimat-verbunden. Beliebt für Wandern, Erlbach-Tropfsteinhöhle. Hessens „dunkler" Wald.',
      beispiel: 'Im Odenwald spukt es noch — sagen die Alten.',
      beispiel_hd: 'Im Odenwald spukt es noch — sagen die Alten.',
      kategorie: 'orte'
    },
    {
      id: 'h-246',
      ausdruck: 'Schwarzwurz',
      hochdeutsch: 'Schwarzwurzel',
      bedeutung: 'Die „Schwarzwurz" ist die Schwarzwurzel — auch „Winter-Spargel" genannt. Wurzelgemüse mit erdig-nussigem Geschmack. In Mittelhessen traditionelles Wintergemüse — wird mit Sahne-Béchamel oder als „Schwarzwurz-Suppe" zubereitet. Beliebt zu Wild und Braten. „Schwarzwurz schälen" ist mühsam (Saft schwarz auf Händen). In hessischen Bauernküchen ein Klassiker. Heute meist tiefgefroren oder eingelegt.',
      beispiel: 'Z\'Weihnachten gibt\'s Schwarzwurz mit Béchamel-Soß.',
      beispiel_hd: 'Zu Weihnachten gibt es Schwarzwurzel mit Béchamel-Soße.',
      kategorie: 'essen'
    },
    {
      id: 'h-247',
      ausdruck: 'Hauwerk',
      hochdeutsch: 'mittelhessischer Bauernhof',
      bedeutung: '„Hauwerk" ist die mittelhessische Bezeichnung für einen Bauernhof oder ein Anwesen — vor allem in Vogelsberg und Hinterland verwendet. Stammt vom „Hofwerk", einer alten Wirtschaftseinheit. „Mei Hauwerk" für „mein Hof". Drückt Bodenständigkeit und Heimatverbundenheit aus. In Volkslied und Volksmusik allgegenwärtig. Heute selten im aktiven Wortschatz, aber in mittelhessischen Heimatfilmen und Mundart-Theater präsent.',
      beispiel: 'Mei Hauwerk geht von einer Generation zur nächsten.',
      beispiel_hd: 'Mein Bauernhof geht von einer Generation zur nächsten.',
      kategorie: 'orte'
    },
    {
      id: 'h-248',
      ausdruck: 'Marburger Bart',
      hochdeutsch: 'Marburger Vollbart',
      bedeutung: 'Der „Marburger Bart" ist Spitzname für die akademisch-bärtige Erscheinung der Marburger Professoren und Studenten — meist Vollbart, oft grau-meliert. „A echter Marburger Bart" als wohlwollender Spott. Stammt aus dem 19. Jahrhundert, als bärtige Universitätsprofessoren das Stadtbild prägten. Heute noch als Klischee verwendet. Auch metaphorisch: ein „Marburger Bart" deutet auf einen Akademiker oder eine intellektuelle Person hin.',
      beispiel: 'Der oide Professor hat noch a Marburger Bart.',
      beispiel_hd: 'Der alte Professor hat noch einen Marburger Vollbart.',
      kategorie: 'menschen'
    },
    {
      id: 'h-249',
      ausdruck: 'Eelisabeth',
      hochdeutsch: 'Heilige Elisabeth (von Thüringen-Marburg)',
      bedeutung: 'Die „heilige Elisabeth" (1207-1231) ist die Schutzpatronin Marburgs — ungarische Königstochter, lebte in Marburg, gründete Hospital, pflegte Aussätzige. Wurde 1235 heiliggesprochen. Marburger Elisabethkirche (1235-1283) ist erste reine Gotik-Kirche Deutschlands. „Elisabeth-Wallfahrten" im Mittelalter brachten Wohlstand. Heute Symbol mittelhessischer christlicher Tradition. Wallfahrer aus aller Welt besuchen ihr Grab.',
      beispiel: 'D\'heilige Eelisabeth liegt in Marburg begraben.',
      beispiel_hd: 'Die heilige Elisabeth liegt in Marburg begraben.',
      kategorie: 'menschen'
    },
    {
      id: 'h-250',
      ausdruck: 'Hütte',
      hochdeutsch: 'Hütte (im Hessischen)',
      bedeutung: 'Die „Hütte" hat in Hessen mehrere Bedeutungen: 1) Wanderhütte im Vogelsberg/Taunus/Rhön — beliebter Wochenendziel. 2) Studentenbude — „seine Hütte" für die kleine Wohnung. 3) Werkstatt-Schuppen — „Vater is\' in seiner Hütte am Werkeln". Diminutiv von „Haus", aber spezifisch hessisch verwendet. „Hütten-Wirtschaft" ist eine einfache Berggaststätte. Symbol für hessische Wander-Tradition und studentisches Wohnen.',
      beispiel: 'In meiner Hütte hab ich kaum Platz für die Bücher.',
      beispiel_hd: 'In meiner Bude habe ich kaum Platz für die Bücher.',
      kategorie: 'orte'
    },
    {
      id: 'h-251',
      ausdruck: 'Brüder Grimm',
      hochdeutsch: 'Brüder Grimm (Märchen-Sammler)',
      bedeutung: 'Die „Brüder Grimm" (Jacob 1785-1863, Wilhelm 1786-1859) sind hessische National-Helden — Sprachforscher und Märchen-Sammler. Geboren in Hanau, lebten in Steinau, Kassel, Marburg, Göttingen, Berlin. Sammelten ab 1812 die berühmten Kinder- und Hausmärchen („Hänsel und Gretel", „Rotkäppchen", „Aschenputtel"). Begründeten die Germanistik mit Deutscher Grammatik und Deutschem Wörterbuch. „Deutsche Märchenstraße" führt durch Hessen. Symbol für hessisches kulturelles Erbe.',
      beispiel: 'D\'Brüder Grimm sammelten Märchen in Hessen.',
      beispiel_hd: 'Die Brüder Grimm sammelten Märchen in Hessen.',
      kategorie: 'menschen'
    },
    {
      id: 'h-252',
      ausdruck: 'Schwälmer Tracht',
      hochdeutsch: 'Schwälmer Tracht',
      bedeutung: 'Die „Schwälmer Tracht" ist eine der berühmtesten deutschen Volkstrachten — aus der Schwalm (Nordhessen). Frauen tragen rote Röcke (Verheiratete) oder grüne (Unverheiratete), schwarze Schürzen, weißes Kopftuch. Männer in schwarzem Tuchanzug und Zylinder. Inspirierte das Aussehen des „Rotkäppchens" der Brüder Grimm — die Schwälmer Tracht ist DAS Rotkäppchen-Original. Heute zu Schwälmer Hochzeitstrachten-Festen getragen. Symbol für nordhessische Tradition.',
      beispiel: 'Die Schwälmer Tracht is\' Rotkäppchens Original.',
      beispiel_hd: 'Die Schwälmer Tracht ist Rotkäppchens Original.',
      kategorie: 'alltag'
    },
    {
      id: 'h-253',
      ausdruck: 'Schwalm',
      hochdeutsch: 'Schwalm (nordhessische Region)',
      bedeutung: 'Die „Schwalm" ist eine nordhessische Region — Flachland zwischen Vogelsberg und Knüllgebirge. Berühmt für die Schwälmer Tracht und das „Rotkäppchen". Ländlich-bäuerlich, mit Streuobstwiesen und Pferdezucht. Schwälmer Bauern gelten als bodenständig, ehrlich, etwas eigen. „Mei Großmutter kommt aus der Schwalm" als hessische Stammvater-Verweisung. Treysa und Schwalmstadt als Hauptorte. Symbol für hessische Landwirtschaft und Tradition.',
      beispiel: 'In der Schwalm wächst der beste Hafer Hessens.',
      beispiel_hd: 'In der Schwalm wächst der beste Hafer Hessens.',
      kategorie: 'orte'
    },
    {
      id: 'h-254',
      ausdruck: 'Wäldsche',
      hochdeutsch: 'kleiner Wald / Wäldchen',
      bedeutung: '„Wäldsche" ist mittelhessischer Diminutiv für Wald — ein kleiner Wald oder Hain. „Mir geh\'n in\'s Wäldsche" für „wir gehen in den Wald". Klingt liebevoll-zärtlich. Auch metaphorisch: ein „Wäldsche von Bürokratie" für viel Bürokratie. In mittelhessischer Kindheits-Sprache allgegenwärtig — Großeltern erzählten Geschichten „aus\'m Wäldsche". Symbol für hessische Naturnähe und liebevollen Umgang mit Sprache.',
      beispiel: 'Im Wäldsche haben wir als Kinder Beeren gesammelt.',
      beispiel_hd: 'Im Wäldchen haben wir als Kinder Beeren gesammelt.',
      kategorie: 'natur'
    },
    {
      id: 'h-255',
      ausdruck: 'Backes',
      hochdeutsch: 'Dorf-Backhaus',
      bedeutung: 'Das „Backes" ist das dorfgemeinschaftliche Backhaus — typisch für mittelhessische Dörfer (Vogelsberg, Rhön, Knüll). Bauern brachten ihren Brotteig hin, wurde gemeinschaftlich gebacken. Soziales Treff-Punkt-Gebäude. Heute oft restauriert als Volksfest-Stätte: „Backes-Fest" mit gebackenem Brot, Bratwurst, Hausschnaps. Symbol für hessische Dorfgemeinschaft und alte Bauernzeit. Manche Dörfer haben noch funktionierende Backes — Backtage mit Vereins-Bewirtung.',
      beispiel: 'Beim Backes-Fest gibt\'s frisches Bauernbrot.',
      beispiel_hd: 'Beim Backes-Fest gibt es frisches Bauernbrot.',
      kategorie: 'orte'
    },
    {
      id: 'h-256',
      ausdruck: 'Schäferhund',
      hochdeutsch: 'Deutscher Schäferhund (aus Hessen)',
      bedeutung: 'Der „Schäferhund" — Deutscher Schäferhund — wurde 1899 von Max von Stephanitz in Hessen entwickelt (Karlsruhe, Mannheim, später Wachen, Hessen-Süd). Stephanitz züchtete den Schäferhund als universellen Dienst- und Familienhund. Heute eine der bekanntesten Hunderassen der Welt. Hessisches Stolz: „Der Schäferhund kommt aus Hessen!". In hessischen Familien beliebt als Schutzhund. Auch in Volkslied und Witzen vertreten — der treue „Hund vom Hof".',
      beispiel: 'Mei Schäferhund is\' a hessischer Original.',
      beispiel_hd: 'Mein Schäferhund ist ein hessisches Original.',
      kategorie: 'natur'
    },
    {
      id: 'h-257',
      ausdruck: 'Lahnberg',
      hochdeutsch: 'Marburger Lahnberge',
      bedeutung: 'Die „Lahnberge" sind die Hügel um Marburg — Standort des Universitätsklinikums, der naturwissenschaftlichen Fakultäten und vieler Studentenwohnheime. „Auf\'m Lahnberg" ist Marburger Standardphrase. Verbunden mit der Innenstadt durch die Lahnberg-Bahn (Standseilbahn). Studenten studieren „auf\'m Lahnberg", wohnen „inner Innenstadt". Symbolische Trennung zwischen akademischer und sozialer Welt Marburgs. Markante Marburger Topographie.',
      beispiel: 'D\'Medizinstudenten lernen alle auf\'m Lahnberg.',
      beispiel_hd: 'Die Medizinstudenten lernen alle auf den Lahnbergen.',
      kategorie: 'orte'
    },
    {
      id: 'h-258',
      ausdruck: 'Spätzlepfanne',
      hochdeutsch: 'Käsespätzle (in Hessen)',
      bedeutung: '„Spätzlepfanne" ist die hessische Variante der Käsespätzle — Eierteig-Nudeln mit Käse überbacken. Eigentlich schwäbisch, aber in hessischen Wirtschaften (vor allem im südlichen Bachgau und an der Bergstraß) sehr beliebt. „Hessische Spätzlepfanne" mit Speck und Zwiebeln zubereitet. Wird als deftige Hauptmahlzeit serviert, oft im Winter. Adaptation einer Nachbar-Tradition mit hessischer Note. Beliebt in Wirtshäusern an der hessisch-baden-württembergischen Grenze.',
      beispiel: 'Z\'Mittag gibt\'s Spätzlepfanne mit Salat.',
      beispiel_hd: 'Zu Mittag gibt es Käsespätzle mit Salat.',
      kategorie: 'essen'
    },
    {
      id: 'h-259',
      ausdruck: 'Apfelwein-Route',
      hochdeutsch: 'Apfelwein-Wander-Route',
      bedeutung: 'Die „Apfelwein-Route" ist ein hessisches Tourismus-Programm — Routen durch Apfelwein-Wirtschaften, Mostereien und Streuobstwiesen. Mehrere markierte Routen in Sachsenhausen, Bachgau und Vogelsberg. Wanderung mit Ebbelwoi-Verkostung. „Apfelwein-Pass" für gesammelte Stempel als Souvenir. Familienprogramm: Erwachsene trinken Ebbelwoi, Kinder Apfelschorle. Symbol für hessische Tourismus-Strategie. Beliebt im Herbst zur Apfel-Erntezeit.',
      beispiel: 'Auf der Apfelwein-Route besuchen wir drei Wirtschaften.',
      beispiel_hd: 'Auf der Apfelwein-Route besuchen wir drei Wirtschaften.',
      kategorie: 'feiern'
    },
    {
      id: 'h-260',
      ausdruck: 'Hessische Direktheit',
      hochdeutsch: 'hessische Direktheit',
      bedeutung: '„Hessische Direktheit" ist ein hessisches Selbstverständnis — Hessen reden offen, ehrlich, manchmal ungehobelt, aber immer authentisch. Im Gegensatz zur norddeutschen Reserviertheit oder bayerischen Gemütlichkeit. „Sag, wie\'s is\'!" ist hessisches Motto. Hessische Direktheit wird oft mit Schmäh kombiniert — ehrlich sein, aber liebevoll. Politiker, Journalisten und Manager aus Hessen sind dafür bekannt. Symbol für hessisches Charakter-Profil.',
      beispiel: 'Mit hessischer Direktheit gesagt: Des is\' Quatsch!',
      beispiel_hd: 'Mit hessischer Direktheit gesagt: Das ist Quatsch!',
      kategorie: 'redensart'
    },
    {
      id: 'h-261',
      ausdruck: 'Kassel',
      hochdeutsch: 'Kassel (Nordhessen-Hauptstadt)',
      bedeutung: 'Kassel ist nordhessische Großstadt — ehemals kurfürstliche Residenz, heute Documenta-Stadt (alle 5 Jahre weltweit bedeutendste Kunstausstellung). Bergpark Wilhelmshöhe (UNESCO-Welterbe) mit Schloss, Herkules-Statue und Wasserspielen. Stadt der Brüder Grimm — sie lebten 30 Jahre hier. Kasselaner reden „Kasseläner Platt" mit eigenem Akzent. Symbol für nordhessische Kultur und Wissenschaft. Universitätsstadt (UniKassel).',
      beispiel: 'Zur Documenta nach Kassel kommen Künstler aus der ganzen Welt.',
      beispiel_hd: 'Zur Documenta nach Kassel kommen Künstler aus der ganzen Welt.',
      kategorie: 'orte'
    },
    {
      id: 'h-262',
      ausdruck: 'Documenta',
      hochdeutsch: 'Documenta (Kunstausstellung Kassel)',
      bedeutung: 'Die „Documenta" ist DIE wichtigste Kunstausstellung der Welt — alle 5 Jahre in Kassel, gegründet 1955 von Arnold Bode. Zeigt zeitgenössische Kunst aus aller Welt für 100 Tage. „Documenta 15" (2022) hatte 738.000 Besucher. Kasselaner sind stolz: „mir habbe die Documenta!". Internationaler Tourismus-Magnet. Kunst-Skandale, politische Debatten — die Documenta ist immer kontrovers. Symbol für Kassel als Kunst-Weltmetropole.',
      beispiel: 'D\'Documenta zieht Hunderttausende nach Kassel.',
      beispiel_hd: 'Die Documenta zieht Hunderttausende nach Kassel.',
      kategorie: 'feiern'
    },
    {
      id: 'h-263',
      ausdruck: 'Bergpark Wilhelmshöhe',
      hochdeutsch: 'Bergpark Wilhelmshöhe (UNESCO-Welterbe)',
      bedeutung: 'Der „Bergpark Wilhelmshöhe" ist UNESCO-Welterbe (seit 2013) — größter Bergpark Europas, 240 Hektar mit Wasserspielen, Schloss Wilhelmshöhe, Herkules-Statue (8m hoch), Pyramide, Romantischen Wasserfällen. Wasserspiele finden zweimal wöchentlich im Sommer statt — beeindruckende Kaskaden ohne Pumpen, nur durch natürliches Gefälle. Kassels größter Touristen-Magnet. Symbol für hessische Garten-Kunst und barocke Pracht.',
      beispiel: 'Sonntags machen wir Spaziergang im Bergpark Wilhelmshöhe.',
      beispiel_hd: 'Sonntags machen wir Spaziergang im Bergpark Wilhelmshöhe.',
      kategorie: 'orte'
    },
    {
      id: 'h-264',
      ausdruck: 'Herkules',
      hochdeutsch: 'Herkules (Kasseler Wahrzeichen)',
      bedeutung: 'Der „Herkules" ist Kassels Wahrzeichen — 8m hohe Bronze-Statue auf 70m hohem Oktagon, gesamthöhe 70,5m. Errichtet 1714-1717 als Wahrzeichen des Bergparks. Symbol für kurfürstliche Stärke. Jeder Kasselaner kennt den Spruch „der Herkules schaut auf uns". Bei den Wasserspielen wird über das Oktagon Wasser gepumpt, das durch den Park stürzt. Bekanntes Foto-Motiv. Symbol für nordhessisches Selbstbewusstsein.',
      beispiel: 'Der Herkules wacht über Kassel — immer schon.',
      beispiel_hd: 'Der Herkules wacht über Kassel — immer schon.',
      kategorie: 'orte'
    },
    {
      id: 'h-265',
      ausdruck: 'Waldeck',
      hochdeutsch: 'Waldeck (Region und Ort)',
      bedeutung: '„Waldeck" ist nordhessische Region und Ort am Edersee — ehemals Fürstentum Waldeck-Pyrmont (bis 1929). Edersee ist drittgrößte Talsperre Deutschlands. Schloss Waldeck auf dem Bergrücken bietet spektakulärer Edersee-Blick. Wandergebiet im Nationalpark Kellerwald-Edersee (UNESCO-Buchenwald-Welterbe). Symbol für nordhessische Natur und Geschichte. Beliebtes Wochenend-Ziel der Kasselaner.',
      beispiel: 'Am Edersee in Waldeck verbringen wir den Urlaub.',
      beispiel_hd: 'Am Edersee in Waldeck verbringen wir den Urlaub.',
      kategorie: 'orte'
    },
    {
      id: 'h-266',
      ausdruck: 'Edersee',
      hochdeutsch: 'Edersee (Talsperre)',
      bedeutung: 'Der „Edersee" ist Hessens größter See — drittgrößte Talsperre Deutschlands (1908-1914 gebaut). Bei Niedrigwasser werden überflutete Dörfer („Eder-Atlantis") sichtbar — wahre Sensation. Eder-Staudamm wurde 1943 von britischen Bombern zerstört („Operation Chastise"), Wasser-Flutwelle tötete 1.700 Menschen. Heute beliebt für Segeln, Schwimmen, Wandern, Wildpark. Symbol für nordhessische Wasserwirtschaft und Tragik.',
      beispiel: 'Bei Niedrigwasser sieht man im Edersee die alte Kirche.',
      beispiel_hd: 'Bei Niedrigwasser sieht man im Edersee die alte Kirche.',
      kategorie: 'natur'
    },
    {
      id: 'h-267',
      ausdruck: 'Knüll',
      hochdeutsch: 'Knüllgebirge (Mittelhessen)',
      bedeutung: 'Der „Knüll" ist mittelhessisches Mittelgebirge — zwischen Schwalm und Fulda, höchster Berg „Eisenberg" (635m). Ländliche Region mit kleinen Dörfern, Streuobstwiesen, Buchenwäldern. „Knüller" sind die Einwohner — gelten als zurückhaltend, traditionsbewusst. „Knüllköppel" ist eine charakteristische Bergform. Wenig touristisch — echtes hessisches Hinterland. Wandergebiet für Eingeweihte. Symbol für hessische Bodenständigkeit.',
      beispiel: 'Im Knüll wandert man stundenlang ohne Menschen zu treffen.',
      beispiel_hd: 'Im Knüll wandert man stundenlang ohne Menschen zu treffen.',
      kategorie: 'natur'
    },
    {
      id: 'h-268',
      ausdruck: 'Fulda',
      hochdeutsch: 'Fulda (Stadt)',
      bedeutung: 'Fulda ist osthessische Bischofsstadt — barocker Dom (1704-1712), Bonifatius-Grab. Bonifatius (672-754) brachte das Christentum nach Hessen, wurde hier begraben. Heute Sitz des katholischen Bistums Fulda. Schloss Fulda mit Klostergarten. Universitätsstadt mit Hochschule Fulda. Stadt der Gegenreformation und barocken Architektur. Fulda war auch DDR-Grenzstadt — „Fulda-Gap" galt im Kalten Krieg als wahrscheinlichste Invasionsroute der Sowjets.',
      beispiel: 'Fulda is\' die schönste Barockstadt Hessens.',
      beispiel_hd: 'Fulda ist die schönste Barockstadt Hessens.',
      kategorie: 'orte'
    },
    {
      id: 'h-269',
      ausdruck: 'Fulda-Gap',
      hochdeutsch: 'Fulda-Gap (Kalter-Krieg-Begriff)',
      bedeutung: 'Das „Fulda-Gap" war im Kalten Krieg der wahrscheinlichste Invasionsweg der Sowjets — Tal zwischen Fulda und Frankfurt galt als strategisch verwundbarste Stelle der NATO. US-Truppen waren bis 1990 in Fulda stationiert. Tausende NATO-Manöver hier simuliert. Heute Geschichte — aber älteren Hessen ist „Fulda-Gap" noch Begriff aus der Zeit. Symbol für hessische Lage im Zentrum Deutschlands. Touristen-Tour zu ehemaligen NATO-Stellungen heute möglich.',
      beispiel: 'D\'Amerikaner standen am Fulda-Gap bereit.',
      beispiel_hd: 'Die Amerikaner standen am Fulda-Gap bereit.',
      kategorie: 'orte'
    },
    {
      id: 'h-270',
      ausdruck: 'Niederhessisch',
      hochdeutsch: 'Niederhessischer Dialekt',
      bedeutung: '„Niederhessisch" ist der nordhessische Dialekt — gesprochen in Kassel, Hofgeismar, Bad Hersfeld. Im Gegensatz zum „Oberhessischen" (Frankfurt, Marburg, Gießen). Klingt anders: „ich" wird zu „ek" oder „ich" (nicht „isch"). Beeinflusst vom mitteldeutschen Sprachraum. Niederhessisch hat eigenen Wortschatz und Sprachmelodie — Kasselaner verstehen Frankfurter aber finden ihr Hessisch „komisch". Beide Varianten sind „Hessisch" — innerhalb von 200 km verschieden.',
      beispiel: 'Niederhessisch is\' anders als Oberhessisch.',
      beispiel_hd: 'Niederhessisch ist anders als Oberhessisch.',
      kategorie: 'redensart'
    },
    {
      id: 'h-271',
      ausdruck: 'Mottl',
      hochdeutsch: 'Murrkopf',
      bedeutung: 'Der „Mottl" ist im Nordhessischen ein nörgelnder, mürrischer Mensch — meist älter, mit Gewohnheits-Frust. „Was bist du heut\' für e Mottl?". Drückt liebevollen Spott aus. Stammt vermutlich vom Wort „motzen" (nörgeln). Im Vogelsberg auch verwendet. Wer mottelt, beklagt sich permanent — über Wetter, Politik, Nachbarschaft. Hessische Charakterisierung — kein Schimpfwort, eher resignierende Beschreibung.',
      beispiel: 'Mei Opa is\' im Alter zum Mottl geworden.',
      beispiel_hd: 'Mein Opa ist im Alter zum Murrkopf geworden.',
      kategorie: 'menschen'
    },
    {
      id: 'h-272',
      ausdruck: 'Klööppen',
      hochdeutsch: 'Klöppeln',
      bedeutung: '„Klööppen" ist nordhessisch für „klöppeln" — Spitzen-Handarbeit mit Klöppel-Stöcken. In nordhessischen Dörfern war Klöppeln traditionelle Hausarbeit. „Klööppe-Frau" oder „Klööpplerin" verdiente Geld mit Heimarbeit. Klöppel-Kissen sind in nordhessischen Stuben oft als Familienerbstücke vorhanden. Heute meist als Volkskunst-Hobby. Auch im Erzgebirge und Schwarzwald verbreitet. Symbol für hessische Frauen-Tradition und Handwerk.',
      beispiel: 'D\'Großmutter hat den ganzen Winter geklööppt.',
      beispiel_hd: 'Die Großmutter hat den ganzen Winter geklöppelt.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-273',
      ausdruck: 'Bratwurst',
      hochdeutsch: 'Bratwurst (nordhessische Spezialität)',
      bedeutung: 'Die „Bratwurst" ist nordhessisches Grundnahrungsmittel — vor allem die „Ahle Worscht" (alte Wurst) aus Schweinefleisch, luftgetrocknet, monatelang gereift. Nordhessen produziert weltweit beste Ahle Worscht. „Lüftungs-Hessen" sind die nordhessischen Bauern, die ihre Wurst luftig hängen lassen. „Worscht-Markt" ist in Marbach, Lichtenfels. Wird mit Brot, Senf und Bier serviert. Symbol für nordhessische Wurst-Identität.',
      beispiel: 'Z\'Brotzeit gibt\'s nordhessische Bratwurst, des is Ahle Worscht, und a Bier.',
      beispiel_hd: 'Zur Brotzeit gibt es nordhessische Bratwurst, das ist Ahle Worscht, und ein Bier.',
      kategorie: 'essen'
    },
    {
      id: 'h-274',
      ausdruck: 'Speckkuchen',
      hochdeutsch: 'Speckkuchen (nordhessisch)',
      bedeutung: 'Der „Speckkuchen" ist nordhessisches Bauerngericht — flacher Hefeteig mit Speck, Zwiebeln und saurer Sahne belegt, im Backofen gebacken. Ähnlich dem Elsässer Flammkuchen, aber mit dickerem Teig. Beliebt in nordhessischen Wirtschaften, vor allem in Waldeck und Schwalm. Auch zu Volksfesten serviert. „Speckkuchen-Abend" als familiäre Tradition. Symbol für nordhessische Bauernküche und Genuss.',
      beispiel: 'Der Speckkuchen meiner Tante is\' der beste!',
      beispiel_hd: 'Der Speckkuchen meiner Tante ist der beste!',
      kategorie: 'essen'
    },
    {
      id: 'h-275',
      ausdruck: 'Zwiwwelplootz',
      hochdeutsch: 'Zwiebelkuchen',
      bedeutung: '„Zwiwwelplootz" ist die nordhessische Bezeichnung für Zwiebelkuchen — flacher Hefeteig mit Zwiebeln, Speck und saurer Sahne. „Zwiwwel" für Zwiebel, „Plootz" für flaches Gebäck. Wird zu Federweißem (junger Wein) im Herbst gegessen. Saisonal-Speise zur Apfel-Erntezeit. „Plootz" stammt vom mittelhochdeutschen „platz" für flaches Gebäck. Symbol für nordhessische Herbst-Tradition und kulinarische Vielfalt.',
      beispiel: 'Im Herbst gibt\'s Zwiwwelplootz mit Federweißem.',
      beispiel_hd: 'Im Herbst gibt es Zwiebelkuchen mit Federweißem.',
      kategorie: 'essen'
    },
    {
      id: 'h-276',
      ausdruck: 'Diemel',
      hochdeutsch: 'Diemel (Fluss in Nordhessen)',
      bedeutung: 'Die „Diemel" ist nordhessischer Fluss — mündet bei Bad Karlshafen in die Weser. Diemelsee als Naherholungsgebiet. Diemel-Tal ist landschaftlich reizvoll, mit Fachwerkstädtchen wie Trendelburg (Rapunzel-Turm-Schauplatz der Grimm-Brüder). Schloss Trendelburg gilt als „Rapunzels Turm". Im Tal Streuobstwiesen, Forellen-Fischerei. Symbol für nordhessische Flusstäler und Märchenlandschaft.',
      beispiel: 'D\'Diemel fließt durch die schönsten Fachwerkdörfer.',
      beispiel_hd: 'Die Diemel fließt durch die schönsten Fachwerkdörfer.',
      kategorie: 'natur'
    },
    {
      id: 'h-277',
      ausdruck: 'Werra',
      hochdeutsch: 'Werra (Fluss)',
      bedeutung: 'Die „Werra" ist osthessisch-thüringischer Fluss — vereinigt sich bei Hann. Münden mit der Fulda zur Weser. Verläuft durch Bad Hersfeld, Eschwege. „Werra-Aue" ist landschaftliches Naherholungsgebiet. Wirtschaftsraum mit Kali-Bergbau (Werra-Salinen). Mythisches Land: hier traf Frau Holle (Grimm-Märchen) ihre Mägde. Symbol für hessisch-thüringische Grenze und gemeinsame Geschichte. Werra-Radweg ist beliebte Touristenroute.',
      beispiel: 'Wir radeln den Werra-Radweg bis zur Weser.',
      beispiel_hd: 'Wir radeln den Werra-Radweg bis zur Weser.',
      kategorie: 'natur'
    },
    {
      id: 'h-278',
      ausdruck: 'Frau Holle',
      hochdeutsch: 'Frau Holle (Grimm-Märchen)',
      bedeutung: '„Frau Holle" ist Märchen der Brüder Grimm — Hexe wirft Federkissen aus, wenn es schneit. Spielt am Hohen Meißner in Nordhessen — die „Frau-Holle-Quelle" auf dem Berg ist Touristenziel. Klassisches deutsches Märchen: faules Mädchen wird mit Pech bestraft, fleißiges mit Gold belohnt. „Frau-Holle-Pfad" ist Wanderweg. Symbol für hessisches Märchen-Erbe der Brüder Grimm. Wird im Winter mit Schnee allgegenwärtig zitiert.',
      beispiel: 'Wenn\'s schneit, hat d\'Frau Holle\'s Bett geschüttelt.',
      beispiel_hd: 'Wenn es schneit, hat Frau Holle das Bett geschüttelt.',
      kategorie: 'menschen'
    },
    {
      id: 'h-279',
      ausdruck: 'Hoher Meißner',
      hochdeutsch: 'Hoher Meißner (Berg)',
      bedeutung: 'Der „Hohe Meißner" ist nordhessischer Berg (754m) — angeblicher Wohnort der Frau Holle. Erloschener Basalt-Vulkan, beliebtes Wandergebiet im Naturpark Meißner-Kaufunger Wald. „Meißner-Plateau" ist Bergplateau auf 700m. 1913 trafen sich hier 5.000 Jugendliche zur Freideutschen Jugendbewegung — „Meißnertag" gilt als Gründungsereignis der modernen deutschen Jugendbewegung. Symbol für nordhessische Mythologie und Geschichte.',
      beispiel: 'Auf\'m Hohen Meißner wohnt d\'Frau Holle.',
      beispiel_hd: 'Auf dem Hohen Meißner wohnt Frau Holle.',
      kategorie: 'orte'
    },
    {
      id: 'h-280',
      ausdruck: 'Märchenstraße',
      hochdeutsch: 'Deutsche Märchenstraße',
      bedeutung: 'Die „Deutsche Märchenstraße" ist Touristikroute durch Hessen — von Hanau (Geburtsort der Grimm-Brüder) über Steinau, Marburg, Kassel bis nach Bremen (Bremer Stadtmusikanten). 600 km lang, verbindet 70 Orte mit Grimm-Bezug. Hessen profitiert massiv von der Märchen-Tourismus. „Märchen-Erlebnis" in Tracht ist Touristen-Programm. Symbol für hessische Marketing-Strategie auf Märchen-Basis. Beliebt bei japanischen und amerikanischen Touristen.',
      beispiel: 'D\'Märchenstraße führt von Hanau bis Bremen durch Hessen.',
      beispiel_hd: 'Die Märchenstraße führt von Hanau bis Bremen durch Hessen.',
      kategorie: 'orte'
    },
    {
      id: 'h-281',
      ausdruck: 'Kasseler',
      hochdeutsch: 'Kasseler (Schweinefleisch)',
      bedeutung: '„Kasseler" ist gepökeltes und leicht geräuchertes Schweinefleisch — wurde im 19. Jahrhundert vom Kasseler Metzgermeister Cassel (oder einem fiktiven Vorbild) entwickelt. Heute deutschlandweit als „Kasseler" bekannt. Wird mit Sauerkraut oder Erbsenpüree serviert. „Kasseler vom Knochen" als Sonntagsbraten. Hessisches Erbe in deutscher Küche. Symbol für nordhessische kulinarische Tradition. Nicht zu verwechseln mit dem Stadtnamen.',
      beispiel: 'Z\'Sonntag gibt\'s Kasseler mit Sauerkraut.',
      beispiel_hd: 'Zum Sonntag gibt es Kasseler mit Sauerkraut.',
      kategorie: 'essen'
    },
    {
      id: 'h-282',
      ausdruck: 'Pumpernickel',
      hochdeutsch: 'Pumpernickel (Roggenbrot)',
      bedeutung: 'Der „Pumpernickel" ist westfälisches Vollkorn-Roggenbrot, aber in Nordhessen weit verbreitet. Über 24 Stunden im Ofen gebacken — daher die dunkle, fast schwarze Farbe. Süßlich-erdiger Geschmack. Wird mit Käse oder Wurst serviert. Nordhessische Variante mit Anis oder Kümmel gewürzt. „Pumpernickel-Brot" hat lange Haltbarkeit (mehrere Wochen). Symbol für nordhessisch-westfälische Brot-Tradition. Auch metaphorisch: ein „Pumpernickel" ist eine dunkle, stoische Person.',
      beispiel: 'Pumpernickel mit Käs is\' a gute Brotzeit.',
      beispiel_hd: 'Pumpernickel mit Käse ist eine gute Brotzeit.',
      kategorie: 'essen'
    },
    {
      id: 'h-283',
      ausdruck: 'Steinau',
      hochdeutsch: 'Steinau an der Straße',
      bedeutung: 'Steinau ist nordhessisches Städtchen — wichtiges Etappenziel auf der Märchenstraße. Die Brüder Grimm lebten hier in der Kindheit (1791-1798) im Amtshaus ihres Vaters. „Brüder Grimm-Haus" als Museum. Fachwerk-Altstadt aus dem 16. Jahrhundert. Schloss Steinau gilt als Kulisse für Grimm-Märchen. Hier sammelten die Brüder Grimm erste Märchen-Versionen von der Marie Hassenpflug. Symbol für hessisches Märchen-Erbe und Kindheits-Geschichte der Brüder Grimm.',
      beispiel: 'In Steinau verbrachten d\'Brüder Grimm ihre Kindheit.',
      beispiel_hd: 'In Steinau verbrachten die Brüder Grimm ihre Kindheit.',
      kategorie: 'orte'
    },
    {
      id: 'h-284',
      ausdruck: 'Hanau',
      hochdeutsch: 'Hanau (Geburtsort der Brüder Grimm)',
      bedeutung: 'Hanau ist osthessische Stadt — Geburtsort der Brüder Grimm (Jacob 1785, Wilhelm 1786). „Brüder-Grimm-Stadt" als offizieller Beiname. Hier beginnt die Deutsche Märchenstraße. Jährliche „Brüder-Grimm-Festspiele" im Schloss Philippsruhe. Auch Goldschmiede-Stadt seit dem 17. Jahrhundert — Hanauer Brand, Hanauer Schmuck. Heute wirtschaftlich bedeutender Industriestandort. Nordrhein-Westfalen ist gegenüber. Tragisches Ereignis 2020 (Hanauer Anschlag) erinnerte Deutschland.',
      beispiel: 'In Hanau wurden d\'Brüder Grimm geboren.',
      beispiel_hd: 'In Hanau wurden die Brüder Grimm geboren.',
      kategorie: 'orte'
    },
    {
      id: 'h-285',
      ausdruck: 'Oberhess',
      hochdeutsch: 'Oberhessisch',
      bedeutung: '„Oberhessisch" ist die südliche hessische Dialekt-Variante — Frankfurt, Marburg, Gießen, Hessen-Süd. Im Gegensatz zum „Niederhessischen" (Kassel, Nordhessen). Klingt anders: typischere „isch"-Endungen, mehr „a"-Laute statt „e". Frankfurter Hessisch ist der bekannte Vertreter — durch Eintracht-Übertragungen und Karl-Wagner-Mundart-Sendungen deutschlandweit bekannt. „Oberhess" als Region: Vogelsberg, Hinterland, mit eigenem Wortschatz und Akzent.',
      beispiel: 'In Oberhess sagen mir „isch" statt „ich".',
      beispiel_hd: 'In Oberhessen sagen wir „isch" statt „ich".',
      kategorie: 'redensart'
    },
    {
      id: 'h-286',
      ausdruck: 'Eckmüller',
      hochdeutsch: 'Müller an einer Wassermühle',
      bedeutung: 'Der „Eckmüller" ist im hessischen Sprachgebrauch ein Müller an einer Wassermühle in einer Ecke des Tals — also nicht in der Dorfmitte, sondern abgelegen. Bezeichnet auch Charaktere mit etwas eigentümlichem, unangepasstem Wesen — der „Eckmüller im Tal" lebt für sich. Stammt aus der Zeit, als jede Wassermühle einen Familiennamen prägte (Mecklenburger Eckmüller wurde später deutscher Familienname). In hessischen Dorfgeschichten allgegenwärtig.',
      beispiel: 'Beim oiden Eckmüller war\'s schon immer e bissel komisch.',
      beispiel_hd: 'Beim alten Eckmüller war es schon immer ein bisschen komisch.',
      kategorie: 'menschen'
    },
    {
      id: 'h-287',
      ausdruck: 'Sauwetterstub',
      hochdeutsch: 'Stube für Sauwetter',
      bedeutung: 'Die „Sauwetterstub" ist eine spezielle Stube im hessischen Bauernhaus — wo man bei schlechtem Wetter saß, las, strickte oder sich erwärmte. Meist mit Kachelofen ausgestattet. Heute oft als „Wohnzimmer" gleichgesetzt. „Sich in die Sauwetterstub setzen" bedeutet sich vor dem Wetter zu verkriechen. Symbol für hessische Hausbau-Tradition und gemütliches Familienleben. In neuen Häusern selten — eher Erinnerungsbegriff der älteren Generation.',
      beispiel: 'Bei Regen sitzen wir in der Sauwetterstub am Kachelofen.',
      beispiel_hd: 'Bei Regen sitzen wir in der Wetterstube am Kachelofen.',
      kategorie: 'orte'
    },
    {
      id: 'h-288',
      ausdruck: 'Mochln',
      hochdeutsch: 'mucksen / nicht regen',
      bedeutung: '„Mochln" ist nordhessisch für sich regen, etwas sagen oder reagieren. Meist verneint: „Net mochln!" für „nicht muxen, nichts sagen!". In Schlaf-Liedern und Mahnungen an Kinder verbreitet. „Ohne zu mochln" bedeutet ohne Beschwerde, klaglos. Lautmalerei für minimales Geräusch. Drückt hessische Strenge und Erwartung an Disziplin aus. Auch metaphorisch: „mochel ja nichts!" als Drohung.',
      beispiel: 'Du sitzt da und mochelst keinen Ton!',
      beispiel_hd: 'Du sitzt da und sagst keinen Ton!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-289',
      ausdruck: 'Eschwege',
      hochdeutsch: 'Eschwege (Stadt in Nordhessen)',
      bedeutung: 'Eschwege ist nordhessische Stadt — am Werra-Fluss gelegen, im Werratal. Größte Stadt im Werra-Meißner-Kreis. Fachwerk-Altstadt mit ikonischem Brückentor. „Eschweger Schaller" ist ein historisches Karussell. Hier wurde der erste deutsche Bonbon hergestellt. „Eschweger Plündern" — alte Jahrmarkt-Tradition. Wirtschaftlich bedeutend mit Kabelwerk und Holzindustrie. Tor zum Werra-Meißner-Wandergebiet. Symbol für nordhessische Mittelstadt.',
      beispiel: 'In Eschwege gibt\'s die schönste Fachwerk-Altstadt.',
      beispiel_hd: 'In Eschwege gibt es die schönste Fachwerk-Altstadt.',
      kategorie: 'orte'
    },
    {
      id: 'h-290',
      ausdruck: 'Tankwart',
      hochdeutsch: 'Tankstellenbetreiber',
      bedeutung: 'Der „Tankwart" ist im hessischen Sprachgebrauch der Tankstellenbetreiber oder -mitarbeiter. „Mei Tankwart" für „mein Tankstellenbetreiber". Hessische Adel-Bezeichnung für eigentlich einfachen Beruf — drückt Wertschätzung für regelmäßigen Kontakt aus. Tankwart kennt seine Kunden, weiß wer welches Auto fährt. In Dörfern oft auch Auto-Reparatur-Werkstatt. Symbol für hessisches Sozialleben und Geschäftsbeziehungen.',
      beispiel: 'Mei Tankwart erinnert sich an jeden Stammkunden.',
      beispiel_hd: 'Mein Tankstellenbetreiber erinnert sich an jeden Stammkunden.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-291',
      ausdruck: 'Babbele',
      hochdeutsch: 'reden / quatschen',
      bedeutung: '„Babbele" bedeutet im Hessischen reden, schwätzen, plaudern. Sehr universell verwendet: „Mer babbele nochmal" für „Wir reden später nochmal". „Babbel net!" für „Quatsch keinen Unsinn!". Auch substantivisch: „der Babbel" für jemanden, der gerne redet. „Babbelei" ist endloses Geschwätz. Stammt vom mittelhochdeutschen „babbeln" — lautmalerisch für undeutliches Reden. Tief im hessischen Wortschatz verwurzelt. Klingt liebevoll bis spöttisch je nach Kontext.',
      beispiel: 'Mer babbele schon den ganzen Abend.',
      beispiel_hd: 'Wir reden schon den ganzen Abend.',
      kategorie: 'redensart'
    },
    {
      id: 'h-292',
      ausdruck: 'Net wahr',
      hochdeutsch: 'nicht wahr?',
      bedeutung: '„Net wahr" ist DAS hessische Bekräftigungs-Partikel — angehängt an Aussagen, um Zustimmung zu erwarten. „Des is\' gut, net wahr?". Drückt nichts wirklich Hessen-spezifisches aus, aber der hessische Tonfall macht es zum Marker. Vergleichbar mit „ne?" oder „odda?". In hessischen Gesprächen alle paar Sätze einmal verwendet. Charakteristisches Element der hessischen Gesprächs-Melodie. Touristen erkennen Hessen sofort an „net wahr".',
      beispiel: 'Der Apfelwein is\' lecker, net wahr?',
      beispiel_hd: 'Der Apfelwein ist lecker, nicht wahr?',
      kategorie: 'redensart'
    },
    {
      id: 'h-293',
      ausdruck: 'A weng',
      hochdeutsch: 'ein wenig / ein bisschen',
      bedeutung: '„A weng" ist hessisch für „ein wenig" — universale Mengenangabe. „A weng Salz" für eine Prise Salz. „A weng warten" für kurz warten. „A weng Geld" für etwas Geld. Drückt hessische Bescheidenheit und Verharmlosung aus. Stammt vom „wenig". Sehr häufig verwendet im hessischen Alltag, auch in Kombinationen wie „a klee weng" (ein klein wenig) für noch kleinere Mengen. Charakteristisch hessische Wortbildung.',
      beispiel: 'Wartest a weng — i komm gleich!',
      beispiel_hd: 'Wartest ein wenig — ich komme gleich!',
      kategorie: 'redensart'
    },
    {
      id: 'h-294',
      ausdruck: 'Bobbelche',
      hochdeutsch: 'Baby / kleines Kind',
      bedeutung: 'Das „Bobbelche" ist hessisch für ein Baby oder Kleinkind — liebevolle Anrede. „Mei klees Bobbelche" für „mein kleines Baby". Diminutiv von „Bobbel", was wiederum Variation von „Puppe" sein könnte. Großeltern verwenden es oft für Enkelkinder. „Bobbelche im Wagen" als typische Familien-Szene. Klingt zärtlich und beschützend. In Volkslied und Kindergebrochen omnipräsent. Symbol für hessische Familien-Wärme.',
      beispiel: 'Mei klees Bobbelche schläft jetzt.',
      beispiel_hd: 'Mein kleines Baby schläft jetzt.',
      kategorie: 'familie'
    },
    {
      id: 'h-295',
      ausdruck: 'Murmelle',
      hochdeutsch: 'flüstern / leise reden',
      bedeutung: '„Murmelle" ist hessisch für leise reden, flüstern oder murmeln. „Was murmelst du da vor dich hin?". Lautmalerei für undeutliches Reden. Im Gegensatz zu „babbele" (laut quatschen) ist „murmelle" leise und intim. Bei Liebeserklärungen, Geheimnissen oder schlechtem Gewissen. „Murmel-Gebet" als religiöses Bittgebet. Klingt zärtlich. Wird oft mit „in sich hinein" kombiniert: „in sich hinein murmelle" für stilles Selbstgespräch.',
      beispiel: 'Was murmelst du da in deinen Bart hinein?',
      beispiel_hd: 'Was murmelst du da in deinen Bart hinein?',
      kategorie: 'redensart'
    },
    {
      id: 'h-296',
      ausdruck: 'Frenne',
      hochdeutsch: 'Fragen / Wissbegierde',
      bedeutung: '„Frenne" ist hessisch für viel und ausgiebig fragen, neugierig sein. „D\'Kinder frennen den ganzen Tag" für die ständigen Kinder-Fragen. „Frenne-Bua" ist ein neugieriger Junge. Stammt vermutlich von „forschen" oder mittelhochdeutschen Formen. Drückt liebevolle Spott über kindliche oder erwachsene Neugier aus. Manchmal auch negativ: jemand frennt zu viel — wird als aufdringlich empfunden. Hessische Sprache der täglichen Sozialkommunikation.',
      beispiel: 'D\'Kinder frennen den ganzen Tag „warum?".',
      beispiel_hd: 'Die Kinder fragen den ganzen Tag „warum?".',
      kategorie: 'redensart'
    },
    {
      id: 'h-297',
      ausdruck: 'Watt',
      hochdeutsch: 'was',
      bedeutung: '„Watt" ist die hessische Aussprache von „was" — vor allem in Nordhessen und im Westerwald-Raum. „Watt machst du da?". Im Gegensatz zur süddeutschen „wos"-Aussprache. Klingt fast norddeutsch (Westfalen-Einfluss). Auch im Frankfurter Hessisch hörbar, dort eher „wassu?" (was du?). „Wattn?" als hessische Variante von „Was?" (Erstaunen). Charakteristisches Lautmerkmal hessischer Dialekt-Variation.',
      beispiel: 'Watt machst du da im Wäldsche?',
      beispiel_hd: 'Was machst du da im Wäldchen?',
      kategorie: 'redensart'
    },
    {
      id: 'h-298',
      ausdruck: 'Hawwe',
      hochdeutsch: 'haben',
      bedeutung: '„Hawwe" ist hessische Variante von „haben" — typisch frankfurterisch und oberhessisch. „I hawwe nix" für „ich habe nichts". „Ham mir noch was?" wird zu „hawwe mer noch was?". Stammt von der niederdeutschen Beeinflussung über Frankfurt — Sprachmischung über Jahrhunderte. Wird oft mit anderen hessischen Partikeln kombiniert: „hawwe mer doch", „hawwe se gesagt". Sehr typisch — Touristen lernen es als erstes hessisches Wort.',
      beispiel: 'I hawwe heut noch Termin beim Doktor.',
      beispiel_hd: 'Ich habe heute noch Termin beim Doktor.',
      kategorie: 'redensart'
    },
    {
      id: 'h-299',
      ausdruck: 'Aach',
      hochdeutsch: 'auch',
      bedeutung: '„Aach" ist hessische Aussprache von „auch" — sehr verbreitet im Frankfurter Hessisch. „I will aach mitkommen" für „ich will auch mitkommen". Klangcharakteristisch — der „au"-Diphthong wird zu „aa" zusammengezogen. Auch in Kombinationen: „aach noch" (auch noch), „aach mol" (auch mal). Ein hessisches Markenzeichen — wer „aach" sagt, ist eindeutig Hesse. In Volkslied und Mundart-Komödie zentraler Lautmerkmal.',
      beispiel: 'I komm aach mit nach Sachsenhause.',
      beispiel_hd: 'Ich komme auch mit nach Sachsenhausen.',
      kategorie: 'redensart'
    },
    {
      id: 'h-300',
      ausdruck: 'Ach was!',
      hochdeutsch: 'Ach was!',
      bedeutung: '„Ach was!" ist universeller hessischer Ausruf der Verwunderung, Empörung oder Begeisterung. Multifunktional je nach Tonfall: „Ach was, Schnaps zum Apfelwein? Bin ich Bauer?" (Empörung). „Ach was, die hat Geburtstag? Glückwunsch!" (Überraschung). „Ach was, Frankfurt gegen Bayern? Wir gewinnen!" (Begeisterung). Hessische Lautcharakteristik — wird gedehnt ausgesprochen, oft mit Hand-Gesten begleitet. Charakteristisch hessisch.',
      beispiel: 'Ach was — d\'Lottozahlen sind richtig!',
      beispiel_hd: 'Ach was — die Lottozahlen sind richtig!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-301',
      ausdruck: 'Mer',
      hochdeutsch: 'wir / man',
      bedeutung: '„Mer" ist hessische Variante von „wir" oder „man". „Mer geh\'n in Wirtschaft" für „wir gehen in die Wirtschaft". „Des macht mer net" für „das macht man nicht". Charakteristische hessische Pronomen-Vereinfachung. Stammt vom alten deutschen „mir" (wir). Sehr typisch — wird oft mehrfach pro Satz verwendet: „Mer hawwe mer mal überlegt, dass mer mol nach Sachsenhause gehen". Hessische Sprach-Identität.',
      beispiel: 'Mer geh\'n morgen in d\'Schule.',
      beispiel_hd: 'Wir gehen morgen in die Schule.',
      kategorie: 'redensart'
    },
    {
      id: 'h-302',
      ausdruck: 'Sich aach',
      hochdeutsch: 'sich auch / sicher auch',
      bedeutung: '„Sich aach" ist hessisches Bekräftigungs-Idiom — Mischung aus „sich auch" und „sicher auch". „Sich aach, des werd gut!" für „Klar, das wird gut!". Drückt Selbstverständlichkeit und Zustimmung aus. Wird oft am Satz-Anfang verwendet, manchmal als Antwort: „Geht\'s dir gut?" — „Sich aach!". Hessische Sprach-Charakteristik. Klingt locker und entspannt. Schwer ins Hochdeutsche zu übersetzen — die Bedeutung liegt im Tonfall.',
      beispiel: 'Sich aach komm i mit auf\'n Apfelwein!',
      beispiel_hd: 'Sicher komme ich mit auf einen Apfelwein!',
      kategorie: 'redensart'
    },
    {
      id: 'h-303',
      ausdruck: 'Babbedeckel',
      hochdeutsch: 'Bierdeckel',
      bedeutung: 'Der „Babbedeckel" ist hessische Bezeichnung für Bierdeckel — Pappuntersetzer für Apfelwein-Gläser oder Biergläser in der Wirtschaft. „Babbe" (Pappe) + „Deckel". Wird auch metaphorisch verwendet: „a flacher Babbedeckel" für etwas Dünnes, Unbedeutendes. Frankfurter Wirtschaften haben oft Eintracht-Babbedeckel. Sammler-Objekte für manche. „Babbedeckel-Sammlung" als Hobby. Symbol für hessische Wirtschaftskultur und Alltagsgegenstände.',
      beispiel: 'Bring mer noch a paar Babbedeckel für d\'Geripptes.',
      beispiel_hd: 'Bring mir noch ein paar Bierdeckel für die Geripptes.',
      kategorie: 'alltag'
    },
    {
      id: 'h-304',
      ausdruck: 'Schnurrn',
      hochdeutsch: 'schnurren / zufrieden sein',
      bedeutung: '„Schnurrn" bedeutet im Hessischen zufrieden sein, sich behaglich fühlen — wie eine schnurrende Katze. „Der schnurrt vor Zufriedenheit". Lautmalerei vom Katzen-Schnurren. Wird verwendet, um tiefe Behaglichkeit zu beschreiben — nach gutem Essen, beim Apfelwein, im warmen Bett. „Sich schnurren machen" bedeutet sich entspannen. Klingt liebevoll, fast kindlich. Hessische Sprache der täglichen Befindlichkeit. Auch metaphorisch: ein Motor „schnurrt" wenn er gut läuft.',
      beispiel: 'Nach\'em Mittagessen schnurrt der Opa auf\'m Sofa.',
      beispiel_hd: 'Nach dem Mittagessen schnurrt der Opa auf dem Sofa.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-305',
      ausdruck: 'Krätschl',
      hochdeutsch: 'kleiner Mensch / Knirps',
      bedeutung: 'Ein „Krätschl" ist im Hessischen ein kleiner Mensch — meist ein Kind oder klein gewachsener Erwachsener. „A klees Krätschl" für ein klein gewachsenes Kind. Liebevolle Verniedlichung. Auch leicht spöttisch: „der oide Krätschl" für jemand, der sich aufspielt obwohl klein. Stammt vermutlich vom „Kratze" (Reibahlen). In hessischer Kindheits-Sprache verbreitet. Großeltern verwenden es oft für Enkel. Symbol für hessische Wärme im Spott.',
      beispiel: 'Wat\'n nettes Krätschl, dei klee Schwester!',
      beispiel_hd: 'Was für ein nettes Knirps, deine kleine Schwester!',
      kategorie: 'menschen'
    },
    {
      id: 'h-306',
      ausdruck: 'Schmackes',
      hochdeutsch: 'Wucht / Kraft / Schwung',
      bedeutung: '„Schmackes" beschreibt im Hessischen Wucht, Kraft, Energie oder Schwung. „A Schlag mit Schmackes" für einen kraftvollen Schlag. „Mit Schmackes durchstarten" für mit voller Energie loslegen. Im Sport, beim Arbeiten, beim Tanzen verwendet. „Eintracht-Schmackes" als Fan-Begriff. Auch metaphorisch: „a Idee mit Schmackes" für eine wirkungsvolle Idee. Hessisches Sprachbild mit kräftiger Konnotation. Drückt Aktivität und Begeisterung aus.',
      beispiel: 'Mit Schmackes hat die Eintracht gespielt!',
      beispiel_hd: 'Mit Wucht hat die Eintracht gespielt!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-307',
      ausdruck: 'Tuwacka',
      hochdeutsch: 'Tabak',
      bedeutung: '„Tuwacka" ist hessisch für Tabak — meist Pfeifen-Tabak. Stammt vom mittelhochdeutschen Lehnwort, das in Hessen Variante „Tuwacka" entwickelt hat. „A Pfeifche Tuwacka" für eine Pfeife Tabak. Auch metaphorisch: „so a Tuwacka!" als hessischer Ausruf der Empörung über etwas Schlechtes (wie Tabak schmeckt schlecht?). Im hessischen Sprachgebrauch der älteren Generation üblich. Heute selten — Pfeifenraucher werden weniger.',
      beispiel: 'Mei Großvater rauchte immer Tuwacka.',
      beispiel_hd: 'Mein Großvater rauchte immer Tabak.',
      kategorie: 'essen'
    },
    {
      id: 'h-308',
      ausdruck: 'Zackeli',
      hochdeutsch: 'klein und flink',
      bedeutung: '„Zackeli" beschreibt im Hessischen einen kleinen, flinken, lebhaften Menschen — meist ein Kind. „Sei doch nicht so zackeli!" als Ermahnung an unruhiges Kind. Stammt vom „Zacke" oder „zackern" (zappeln). „A Zackeli" als Kompliment für Behendigkeit, aber auch Spott über Hyperaktivität. Im hessischen Familienleben verwendet. Klingt liebevoll. Auch als Charakterisierung: „der is\' so a Zackeli" für einen rastlosen, ungeduldigen Menschen.',
      beispiel: 'Mei Klee is\' so a Zackeli — keine Minute still.',
      beispiel_hd: 'Mein Kleines ist so ein Zappelphilipp — keine Minute still.',
      kategorie: 'menschen'
    },
    {
      id: 'h-309',
      ausdruck: 'Maul halten',
      hochdeutsch: 'still sein',
      bedeutung: '„Maul halten" ist hessisch-derbe Aufforderung, still zu sein. „Halt dei Maul!" als direkte Anweisung. Hessische Direktheit ungeschönt — keine Höflichkeit, klare Ansage. Im Gegensatz zu „sei bitte ruhig" sehr direkt. Wird in hessischen Familien, unter Kollegen, im Sport-Vereinsleben verwendet. Manchmal liebevoll-spöttisch: „Halt doch dei Maul, du Tunichtgut!". Trotz Härte oft mit Augenzwinkern. Klassisches Beispiel hessischer Direktheit.',
      beispiel: 'Halt endlich dei Maul, i kann mich nicht konzentrieren!',
      beispiel_hd: 'Halt endlich den Mund, ich kann mich nicht konzentrieren!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-310',
      ausdruck: 'Grappa-Reste',
      hochdeutsch: 'gemixte Schnaps-Reste',
      bedeutung: '„Grappa-Reste" ist hessische Bezeichnung für die Reste verschiedener Schnaps-Flaschen, die zusammen getrunken werden. Tradition in Sachsenhäuser Apfelwein-Wirtschaften — gegen Mitternacht werden die Reste verschiedener Schnäpse gemischt und ausgeschenkt. Charakteristisch hessisch — nichts wird verschwendet. „A Grappa-Reste, bittsche!" als spätabendliche Bestellung. Hessische Sparsamkeit trifft hessische Lebensfreude. Symbol für unkonventionelle Apfelwein-Wirtschaftskultur.',
      beispiel: 'Z\'mitternacht gibt\'s Grappa-Reste im Atschel.',
      beispiel_hd: 'Zur Mitternacht gibt es gemixte Schnaps-Reste im Atschel.',
      kategorie: 'essen'
    },
    {
      id: 'h-311',
      ausdruck: 'Schau',
      hochdeutsch: 'so wie es ist / na ja',
      bedeutung: '„Schau" ist hessische Füllpartikel — meist am Satzanfang oder als Antwort verwendet. „Schau, des is\' halt so" für „so wie es ist, ist es eben". Drückt resignierende Zustimmung aus. Vergleichbar mit norddeutschem „nu ja" oder bayrischem „naja". Wird oft mit Schulterzucken kombiniert. Hessische Lakonie pur. Klingt entspannt und ergeben. Wer „schau" sagt, akzeptiert die Realität ohne weiter zu diskutieren. Hessische Lebensphilosophie.',
      beispiel: 'Schau, des Leben is\' halt net immer fair.',
      beispiel_hd: 'Naja, das Leben ist halt nicht immer fair.',
      kategorie: 'redensart'
    },
    {
      id: 'h-312',
      ausdruck: 'Wässerche',
      hochdeutsch: 'Wässerchen / Wasser',
      bedeutung: 'Das „Wässerche" ist hessische Diminutiv-Form von Wasser — meist als „a Wässerche" bestellt im Restaurant oder im Glas auf dem Esstisch. Klingt zärtlich, höflich, fast schon übertrieben bescheiden — „nur a Wässerche, bittsche!". Auch metaphorisch: „a klees Wässerche" für ein paar Tropfen. Hessische Sprachlichkeit der Bescheidenheit. In gehobenen Wirtschaften, beim Doktor, bei der Schwiegermutter — überall, wo man nicht zu viel fordern will.',
      beispiel: 'A Wässerche zum Essen, bittsche!',
      beispiel_hd: 'Ein Wässerchen zum Essen, bitte!',
      kategorie: 'essen'
    },
    {
      id: 'h-313',
      ausdruck: 'Knust',
      hochdeutsch: 'Brotanschnitt / Endstück',
      bedeutung: 'Der „Knust" ist hessisch für das Endstück eines Brotlaibes — meist mit dicker Kruste. „Den Knust gibst dem Vater" als hessische Tradition: das beste Stück (mit Kruste) bekommt der Familienvater. Wird mit Butter und Salz oder Schmalz gegessen. Symbol für hessische Brot-Tradition und Familienhierarchie. Auch metaphorisch: „der Knust" für etwas Hartes, Schweres zu Knabbern. In norddeutschen Dialekten ähnlich verwendet, hessisch übernommen.',
      beispiel: 'Der Knust mit Schmalz is\' was Feines.',
      beispiel_hd: 'Das Brotendstück mit Schmalz ist etwas Feines.',
      kategorie: 'essen'
    },
    {
      id: 'h-314',
      ausdruck: 'Hellebraunes',
      hochdeutsch: 'helles Bier',
      bedeutung: '„Hellebraunes" ist hessische Verniedlichung von „helles Bier" oder „Pilsner". „A Hellebraunes, bittsche!" als Bestellung beim Wirt. Drückt Vertrautheit und liebevolle Bestell-Routine aus. Im Gegensatz zum „Dunkelbraunen" (Schwarzbier oder Stout). Hessische Sprachfreude — viele Wörter werden mit -es-Endung zu Substantiven mit Eigenidentität. „Schoppe Hellebraunes" wird oft kombiniert. Wirtshaus-Sprache der älteren Generation.',
      beispiel: 'A Hellebraunes und a Schnaps, bittsche!',
      beispiel_hd: 'Ein helles Bier und einen Schnaps, bitte!',
      kategorie: 'essen'
    },
    {
      id: 'h-315',
      ausdruck: 'Geh fott',
      hochdeutsch: 'geh weg / hau ab',
      bedeutung: '„Geh fott" ist hessische Aufforderung, sich zu entfernen. „Fott" für „fort". „Geh fott mit dei Scherz!" als Ablehnung von Witzelei. Auch metaphorisch: „Des is\' geh-fott!" für etwas Unwahres oder Unsinniges. „Ach geh fott!" als typisch hessischer Ausdruck der Verwunderung („das kann nicht sein!"). Multifunktional. Klingt direkt aber nicht beleidigend. Hessische Direktheit in idiomatischer Form. Wird mit Hand-Gesten unterstützt.',
      beispiel: 'Geh fott, des kann nicht stimmen!',
      beispiel_hd: 'Geh weg, das kann nicht stimmen!',
      kategorie: 'redensart'
    },
    {
      id: 'h-316',
      ausdruck: 'Hopfe',
      hochdeutsch: 'Hopfen',
      bedeutung: '„Hopfe" ist hessische Aussprache von „Hopfen" — Bestandteil des Bieres. „Hopfen und Malz, Gott erhalt\'s!" als hessisches Brauspruch. Im Vogelsberg gab es früher Hopfenanbau. „Hopfe-Vögele" ist eine Vogelart, die zwischen Hopfenstangen lebt. Klingt heimelig und bauerntümlich. In hessischen Brauereien-Wirtschaften omnipräsent — die Marken-Sprüche der hessischen Biere drehen sich oft um Hopfe und Malz. Symbol für hessische Brauer-Tradition.',
      beispiel: 'A guats Bier kommt von Hopfe und Malz.',
      beispiel_hd: 'Ein gutes Bier kommt von Hopfen und Malz.',
      kategorie: 'essen'
    },
    {
      id: 'h-317',
      ausdruck: 'Stadtschnack',
      hochdeutsch: 'Stadt-Geschwätz',
      bedeutung: '„Stadtschnack" ist hessisch für Klatsch und Tratsch in der Stadt — was die Leute reden, oft gerüchteweise. „Hessen-Schmäh" trifft auf „Schnack" (Geschwätz). „Was is\' der neue Stadtschnack?" als Frage nach den neuesten Gerüchten. In Frankfurter Apfelwein-Wirtschaften und Sachsenhäuser Stuben omnipräsent. Hessen lieben den Stadtschnack — er hält die Stadt lebendig. Symbol für hessische Sozial-Kommunikation. Klingt vertraulich, intim.',
      beispiel: 'Im Atschel hörst du den ganzen Stadtschnack.',
      beispiel_hd: 'Im Atschel hörst du das ganze Stadt-Geschwätz.',
      kategorie: 'redensart'
    },
    {
      id: 'h-318',
      ausdruck: 'Klamotten',
      hochdeutsch: 'Kleidung',
      bedeutung: '„Klamotten" ist umgangssprachlich für Kleidung — in Hessen sehr verbreitet. „Schicke Klamotten" für tolle Kleidung. „Klamotten kaufen" als Sams-tags-Aktivität. Stammt vom Wort „Klamotte" (eigentlich Geröll, später auch „alte Klamotten" für altes Zeug). Hessische Verwendung sehr lässig — Mütter erinnern Kinder: „Zieh dir vernünftige Klamotten an!". In Frankfurter Shopping-Kultur (Zeil!) zentral. Sprache der jüngeren Generation.',
      beispiel: 'I hol mer auf der Zeil neue Klamotten.',
      beispiel_hd: 'Ich hole mir auf der Zeil neue Kleidung.',
      kategorie: 'alltag'
    },
    {
      id: 'h-319',
      ausdruck: 'Schnütz',
      hochdeutsch: 'Schnauze / Mund',
      bedeutung: 'Die „Schnütz" ist hessisch für die Schnauze, den Mund — meist liebevoll oder spöttisch. „Mach die Schnütz auf!" für „mach den Mund auf!". „A süße Schnütz" für ein süßes Babylein. Klingt zärtlich und derb zugleich — typisch hessisch. Im Volksmund auch für tierische Schnauzen verwendet. Stammt vom mittelhochdeutschen „snuze". Im hessischen Familienleben omnipräsent — Eltern verwenden es liebevoll, Streitende derb.',
      beispiel: 'Mach mol die Schnütz auf, dann gib i dir den Bissen.',
      beispiel_hd: 'Mach mal die Schnauze auf, dann gebe ich dir den Bissen.',
      kategorie: 'koerper'
    },
    {
      id: 'h-320',
      ausdruck: 'Schunkeln',
      hochdeutsch: 'sich rhythmisch wiegen',
      bedeutung: '„Schunkeln" ist die kollektive hessische Tradition — auf Volksfesten, in Apfelwein-Wirtschaften, bei Eintracht-Spielen wiegt man sich rhythmisch zur Musik, oft Arm in Arm mit den Nachbarn. „Schunkel-Lieder" gehören zum Sachsenhäuser Repertoire. „Bei dem Lied muss man schunkeln!" als hessisches Imperativ. Vergleichbar mit rheinischer Karnevals-Tradition. Symbol für hessische Gemeinschafts-Erfahrung. Touristen erleben das im Apfelwein-Express oder in Sachsenhausen.',
      beispiel: 'Bei „Ich han nur Zeit" wird gschunkelt!',
      beispiel_hd: 'Bei „Ich habe nur Zeit" wird geschunkelt!',
      kategorie: 'feiern'
    },
    {
      id: 'h-321',
      ausdruck: 'Kerb',
      hochdeutsch: 'Kirmes / Kirchweih',
      bedeutung: 'Die „Kerb" ist hessisches Dorf-/Stadtfest — Kirchweih oder Kirmes. Jeder hessische Ort hat seine eigene Kerb mit traditionellem Ablauf: Kerb-Burschen (junge Männer) und Kerb-Mädchen organisieren Festumzug, Tanz, Schießbude, Bratwurst, Bier und Apfelwein. „Kerb-Vater" als Spitzname für den Hauptorganisator. Höhepunkt: das Aufstellen des „Kerb-Baums" auf dem Dorfplatz. Wenn die Kerb vorbei ist, wird der Kerb-Baum „beerdigt". Symbol für hessisches Dorfleben.',
      beispiel: 'Z\'Sommer is\' wieder Kerb in unserm Dorf.',
      beispiel_hd: 'Zum Sommer ist wieder Kirmes in unserem Dorf.',
      kategorie: 'feiern'
    },
    {
      id: 'h-322',
      ausdruck: 'Maibaum',
      hochdeutsch: 'Maibaum',
      bedeutung: 'Der „Maibaum" ist hessische Volkstradition — am 1. Mai wird auf dem Dorfplatz ein hoher Baumstamm (oft Tanne) aufgestellt, geschmückt mit Bändern und Kränzen. Junge Männer beschützen ihn gegen Diebstahl durch Nachbardörfer. „Maibaum-Klau" ist beliebtes Schabernack-Ritual. Wer einen Maibaum stiehlt, muss vom bestohlenen Dorf mit Bier und Wurst ausgelöst werden. Symbol für hessische Frühlings-Tradition und Dorf-Konkurrenz.',
      beispiel: 'Am 1. Mai wird der Maibaum auf\'m Dorfplatz aufgestellt.',
      beispiel_hd: 'Am 1. Mai wird der Maibaum auf dem Dorfplatz aufgestellt.',
      kategorie: 'feiern'
    },
    {
      id: 'h-323',
      ausdruck: 'Fastnacht',
      hochdeutsch: 'Fastnacht (Karneval)',
      bedeutung: 'Die „Fastnacht" ist hessischer Karneval — vor allem im Süden und Westen Hessens stark ausgeprägt. Mainz und Frankfurt haben eigene Fastnacht-Tradition. „Helau" als Hessen-Schlachtruf (im Gegensatz zum kölnischen „Alaaf"). Höhepunkte: Weiberfastnacht, Rosenmontag-Umzug, Aschermittwoch. Hessische Fastnacht ist organisiert in Fastnachts-Vereinen mit Prinzenpaar, Garde, Funken. Lustige Hessen-Witze, politische Büttenreden, Trinkfeste. Symbol für hessischen Karneval.',
      beispiel: 'In der Fastnacht-Zeit gibt\'s Helau in ganz Südhessen.',
      beispiel_hd: 'In der Karneval-Zeit gibt es Helau in ganz Südhessen.',
      kategorie: 'feiern'
    },
    {
      id: 'h-324',
      ausdruck: 'Helau!',
      hochdeutsch: 'Helau! (hessischer Karnevalsruf)',
      bedeutung: '„Helau!" ist DER hessisch-rheinhessische Karnevalsruf — im Gegensatz zum kölnischen „Alaaf". Wird in Mainz, Frankfurt, Wiesbaden, Darmstadt während der Fastnacht gerufen. Etymologie unklar — vielleicht von „Hell auf" oder „Halleluja". Drückt Karnevalsfreude und Gemeinschaftsgefühl aus. „Mainzer Helau" und „Frankfurter Helau" sind eigenständige Traditionen. Drei Helau-Rufe als hessisches Standard-Begrüßungsritual zur Fastnachtszeit. Symbol für hessische Karneval-Identität.',
      beispiel: 'Helau! Helau! Helau! — die Hessen feiern Fastnacht.',
      beispiel_hd: 'Helau! Helau! Helau! — die Hessen feiern Karneval.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-325',
      ausdruck: 'Büttenrede',
      hochdeutsch: 'Karnevals-Rede',
      bedeutung: 'Die „Büttenrede" ist hessische Karnevalstradition — humorvolle, oft politische Rede aus einer Bütt (Holzfass). Berühmte Büttenredner: Lothar Müller-Westerhagen, Jürgen Becker. Wird im Frankfurter Fernsehen übertragen („Mainzer Fastnacht im ZDF"). Themen: Politiker, lokale Skandale, Nachbar-Streitigkeiten. Reim und Rhythmus pflicht. „Büttenredner" werden Karnevals-Stars. Symbol für hessischen Karnevals-Witz. Klassisches Format der hessischen Mundart-Komik.',
      beispiel: 'Die Büttenrede vom Müller war wieder Spitze!',
      beispiel_hd: 'Die Karnevals-Rede vom Müller war wieder Spitze!',
      kategorie: 'feiern'
    },
    {
      id: 'h-326',
      ausdruck: 'Närrische Wochen',
      hochdeutsch: 'Karnevalszeit',
      bedeutung: 'Die „närrischen Wochen" sind die offizielle Karnevalszeit in Hessen — vom 11.11. um 11:11 Uhr bis Aschermittwoch. „Sessions-Eröffnung" am 11.11. als großes Fest. Während dieser Zeit gilt eine andere Welt: Politik wird verspottet, Hierarchien werden umgedreht, alle dürfen Verkleidung tragen. Hessische Karnevalsvereine (KKV, Karneval-Klub-Verband) organisieren Sitzungen mit Prinzenpaar, Tanzgarde und Büttenreden. Symbol für hessisches Brauchtum.',
      beispiel: 'In den närrischen Wochen wird drei Monate gefeiert.',
      beispiel_hd: 'In den närrischen Wochen wird drei Monate gefeiert.',
      kategorie: 'feiern'
    },
    {
      id: 'h-327',
      ausdruck: 'Prinzessin',
      hochdeutsch: 'Karnevals-Prinzessin',
      bedeutung: 'Die „Prinzessin" ist Karnevals-Hauptdarstellerin — wird jährlich aus den Vereinsmitgliedern gewählt. Trägt ein Krönchen, prachtvolle Kleidung und vertritt den Karnevalsverein offiziell. Mainzer Prinzessin, Frankfurter Prinzessin, Darmstädter Prinzessin — jede Stadt hat ihre eigene. Ehrenamt mit hohem Prestige. „Prinzessin-Wahl" ist Höhepunkt der Saison. Symbol für hessische Karnevals-Glamour. Touristen und Medien lieben die Prinzessinnen.',
      beispiel: 'Die Mainzer Prinzessin trägt schöne Trachtenkleider.',
      beispiel_hd: 'Die Mainzer Prinzessin trägt schöne Trachtenkleider.',
      kategorie: 'menschen'
    },
    {
      id: 'h-328',
      ausdruck: 'Wirthsche Kerb',
      hochdeutsch: 'Wirthsche Kerb (Frankfurter Trad.)',
      bedeutung: 'Die „Wirthsche Kerb" ist eine Frankfurt-Sachsenhäuser Tradition — am Wochenende vor dem 11. November findet in der Wirths-Wirtschaft (Frankfurter Apfelwein-Lokal) die letzte Kerb des Jahres statt. Vergleichbar mit dem rheinischen Saisonschluss. Sachsenhäuser Apfelwein-Wirte versammeln sich, es gibt Tanz, Lieder und Stimmungsmusik. Touristen-Magnet. Symbol für Frankfurter Sommer- und Herbst-Tradition. Klassisches Beispiel für lokal verankerte Bräuche.',
      beispiel: 'Bei der Wirthsche Kerb singen alle hessischen Lieder.',
      beispiel_hd: 'Bei der Wirthsche Kerb singen alle hessischen Lieder.',
      kategorie: 'feiern'
    },
    {
      id: 'h-329',
      ausdruck: 'Wäldercher',
      hochdeutsch: 'kleine Wälder',
      bedeutung: '„Wäldercher" ist hessische Diminutiv-Plural von „Wald" — kleine Wäldchen, Hain. „Mer geh\'n durch d\'Wäldercher" für Spaziergang durch mehrere Wäldchen. In hessischer Landschaft typisch: viele kleine, gepflegte Wäldchen zwischen Feldern. „Wäldercher" als landschaftliches Element — schöner als ein Großwald, weil überschaubarer. In Volkslied und Mundart-Liedern verbreitet. Symbol für hessische Landschafts-Sprache.',
      beispiel: 'In den Wäldercher sind im Frühjahr viele Schneeglöckchen.',
      beispiel_hd: 'In den Wäldchen sind im Frühjahr viele Schneeglöckchen.',
      kategorie: 'natur'
    },
    {
      id: 'h-330',
      ausdruck: 'Schluckwasser',
      hochdeutsch: 'Schluckwasser / Aperitif',
      bedeutung: 'Das „Schluckwasser" ist hessisch für einen ersten kleinen Trunk als Aperitif — meist Schnaps vor dem Essen. „A klees Schluckwasser zum Anfang" als hessisches Ritual. Stammt von „Schluck" + „Wasser" — wobei das Wasser hier ironisch klein und harmlos klingt, obwohl es eigentlich Schnaps ist. Hessische Sprachfreude. Auch metaphorisch: „a Schluckwasser zum Mut anfassen" für einen Mutmach-Schluck. Im Wirtshaus-Sprachgebrauch der älteren Generation.',
      beispiel: 'A klees Schluckwasser bevor wir essen!',
      beispiel_hd: 'Ein kleines Schluckwasser bevor wir essen!',
      kategorie: 'essen'
    },
    {
      id: 'h-331',
      ausdruck: 'Geburtstag',
      hochdeutsch: 'Geburtstag',
      bedeutung: 'Der „Geburtstag" hat in Hessen eigene Bräuche — Erwachsene laden zur „Geburtstags-Feier" mit hessischer Bewirtung: Apfelwein, Bier, Bratwurst, Handkäse mit Musik. „Geburtstagsständchen" wird oft gesungen. Bei runden Geburtstagen (50, 60, 70) gibt\'s große Familienfeste mit Verwandtschaft aus ganz Hessen. „Geburtstags-Sträußchen" als typisches Geschenk. Symbol für hessische Familien-Tradition und Gastfreundschaft.',
      beispiel: 'Z\'meinem 50. Geburtstag kamen alle Verwandten.',
      beispiel_hd: 'Zu meinem 50. Geburtstag kamen alle Verwandten.',
      kategorie: 'feiern'
    },
    {
      id: 'h-332',
      ausdruck: 'Weihnachtsmarkt',
      hochdeutsch: 'Weihnachtsmarkt',
      bedeutung: 'Der „Weihnachtsmarkt" ist hessische Tradition — vor allem der Frankfurter Weihnachtsmarkt am Römerberg gilt als einer der ältesten Deutschlands (seit 1393!). Bratwurst, Glühwein, Lebkuchenherzen, Reibekuchen. Auch in Marburg, Kassel, Wiesbaden, Limburg große Weihnachtsmärkte. „Apfelwein heiß mit Zimt" als hessische Spezialität auf dem Weihnachtsmarkt. Symbol für hessischen Winter-Genuss und Tourismus.',
      beispiel: 'Auf\'m Frankfurter Weihnachtsmarkt gibt\'s heißen Apfelwein.',
      beispiel_hd: 'Auf dem Frankfurter Weihnachtsmarkt gibt es heißen Apfelwein.',
      kategorie: 'feiern'
    },
    {
      id: 'h-333',
      ausdruck: 'Glühebbelwoi',
      hochdeutsch: 'heißer Apfelwein',
      bedeutung: '„Glühebbelwoi" ist die hessische Variante des Glühweins — heißer Apfelwein mit Zimt, Nelken, Sternanis, Zitronenschale. Wird auf Weihnachtsmärkten serviert. Frankfurter Spezialität, die langsam deutschlandweit bekannt wird. Süßer und milder als Glühwein, perfekt für Apfelwein-Liebhaber im Winter. Auch im Apfelwein-Express im Winter ausgeschenkt. Symbol für hessische Winter-Tradition und Apfelwein-Kreativität.',
      beispiel: 'Im Winter trinkt man Glühebbelwoi mit Zimt.',
      beispiel_hd: 'Im Winter trinkt man heißen Apfelwein mit Zimt.',
      kategorie: 'essen'
    },
    {
      id: 'h-334',
      ausdruck: 'Spätzleshaus',
      hochdeutsch: 'Spezielles Wirtshaus',
      bedeutung: 'Das „Spätzleshaus" ist hessischer Begriff für ein speziales Wirtshaus mit eigener Atmosphäre — meist mit eigenem Charakter, Stammtisch, traditionellem Essen. „Mer geh\'n ins Spätzleshaus" für „wir gehen in unsere Stammkneipe". Nicht zu verwechseln mit dem schwäbischen Spätzle-Konzept. Hessischer Sprachgebrauch für Vertrautheit. Auch als Witz: „Mei Spätzleshaus is\' im Eltzbachtal" als Geheimtipp. Symbol für hessische Wirtshaus-Kultur.',
      beispiel: 'Treffen wir uns im Spätzleshaus um die Ecke?',
      beispiel_hd: 'Treffen wir uns in der Stammkneipe um die Ecke?',
      kategorie: 'orte'
    },
    {
      id: 'h-335',
      ausdruck: 'Lebkuche',
      hochdeutsch: 'Lebkuchen',
      bedeutung: '„Lebkuche" ist hessische Aussprache von „Lebkuchen" — Weihnachtsgebäck aus Honig, Gewürzen und Mehl. „Hessische Lebkuche" ist regional besonders: mit Honig vom Vogelsberg oder Apfelmus statt Sirup. „Lebkuchenherzen" auf Volksfesten und Weihnachtsmärkten. Auch metaphorisch: „a süßes Lebkuche" für eine liebenswerte Person. In Frankfurter Konditoreien als Weihnachtsspezialität bekannt. Symbol für hessische Weihnachts-Tradition.',
      beispiel: 'Z\'Weihnachten gibt\'s frisches Lebkuche von der Tante.',
      beispiel_hd: 'Zu Weihnachten gibt es frischen Lebkuchen von der Tante.',
      kategorie: 'essen'
    },
    {
      id: 'h-336',
      ausdruck: 'Hessisches Weihnachten',
      hochdeutsch: 'hessische Weihnachts-Tradition',
      bedeutung: '„Hessisches Weihnachten" hat eigene Rituale — am 24. um 17 Uhr Bescherung, Festtagsessen mit Karpfen oder Gans, hessische Lieder am Weihnachtsbaum singen. Mit Familienverwandtschaft aus ganz Hessen. „Hessischer Weihnachts-Witz" ist eigene Tradition. Weihnachtskrippen-Tradition besonders im katholischen Hessen-Süd. Apfelwein-Familien servieren Glühebbelwoi unter dem Tannenbaum. Symbol für hessische Familien-Werte und Tradition.',
      beispiel: 'Hessisches Weihnachten ohne Apfelwein? Geht net!',
      beispiel_hd: 'Hessisches Weihnachten ohne Apfelwein? Geht nicht!',
      kategorie: 'feiern'
    },
    {
      id: 'h-337',
      ausdruck: 'Schoppe-Sänger',
      hochdeutsch: 'Apfelwein-Sänger',
      bedeutung: '„Schoppe-Sänger" sind Sachsenhäuser Volksmusiker — singen Apfelwein-Trinklieder in Sachsenhäuser Apfelwein-Wirtschaften. Tradition seit dem 19. Jahrhundert. Bekannte Lieder: „Schmeißt nau die Hosenträger weg!", „Ich han nur Zeit". Schoppe-Sänger reisen zwischen Wirtschaften, animieren das Publikum zum Mitsingen und Schunkeln. Berufsmusiker mit eigenem Kostüm (oft Schlosser-Hemd, Schiebermütze). Symbol für hessische Volkskultur und Apfelwein-Tradition.',
      beispiel: 'Im Atschel singen heut die Schoppe-Sänger!',
      beispiel_hd: 'Im Atschel singen heute die Apfelwein-Sänger!',
      kategorie: 'musik'
    },
    {
      id: 'h-338',
      ausdruck: 'Bornheimer Mitt',
      hochdeutsch: 'Bornheimer Mittagessen / Wirtshaus',
      bedeutung: '„Bornheimer Mitt" ist Frankfurter Bornheim-Tradition — das Mittagessen in den traditionellen Bornheimer Apfelwein-Wirtschaften. „Bornheimer Mitt" als Selbstbezeichnung der Bornheimer Gastronomie. Bekannte Wirtschaften: „Zum Fichtekränzi", „Bornheimer Hang". Sonntags-Mitt mit Familie, Apfelwein und Schnitzel. Symbol für Frankfurter Bornheim-Identität. Bornheimer sind stolz auf ihre Wirtshaus-Tradition gegen die Sachsenhäuser Konkurrenz.',
      beispiel: 'Sonntags geh\'n mir auf die Bornheimer Mitt.',
      beispiel_hd: 'Sonntags gehen wir auf das Bornheimer Mittagessen.',
      kategorie: 'essen'
    },
    {
      id: 'h-339',
      ausdruck: 'Kerb-Bursche',
      hochdeutsch: 'Kirmes-Bursche (junger Mann)',
      bedeutung: 'Die „Kerb-Burschen" sind die jungen Männer eines hessischen Dorfes, die die Kerb organisieren — Aufstellen des Maibaums, Festumzug, Tanzabende. Tradition über Generationen vererbt. Wer Kerb-Bursche wird, muss zwischen 16 und 30 Jahre alt, ledig und im Dorf wohnhaft sein. „Kerb-Burschen-Heft" als Buch der Tradition. Wird oft mit Frauen-Pendant „Kerb-Mädchen" kombiniert. Symbol für hessische Dorf-Jugend und Brauchtums-Pflege.',
      beispiel: 'D\'Kerb-Burschen organisieren d\'Fest seit Jahrzehnten.',
      beispiel_hd: 'Die Kirmes-Burschen organisieren das Fest seit Jahrzehnten.',
      kategorie: 'menschen'
    },
    {
      id: 'h-340',
      ausdruck: 'Erntedank',
      hochdeutsch: 'Erntedankfest',
      bedeutung: 'Das „Erntedank" ist hessisches Bauern-Fest — meist am ersten Sonntag im Oktober. Kirchen werden mit Ernte-Gaben geschmückt (Getreide, Obst, Gemüse). Festumzug durch das Dorf, traditioneller Erntedank-Gottesdienst. Apfelwein-Verkostung der neuen Ernte. „Hessischer Erntedank" verbindet christliche Tradition mit bäuerlicher Identität. Symbol für hessische Landwirtschaft. Symbolik vor allem im ländlichen Vogelsberg und Wetterau.',
      beispiel: 'Z\'Erntedank schmückt mer d\'Kirche mit Korngarben.',
      beispiel_hd: 'Zu Erntedank schmückt man die Kirche mit Korngarben.',
      kategorie: 'feiern'
    },
    {
      id: 'h-341',
      ausdruck: 'Buntling',
      hochdeutsch: 'kleiner bunter Mensch / Kind',
      bedeutung: 'Ein „Buntling" ist im Hessischen ein lustig-bunt gekleideter Mensch — meist ein Kind im Karneval oder ein extrovertierter Erwachsener. „A bunter Buntling" als doppelmoppliche Verstärkung. Liebevoll-spöttisch verwendet. Im Vogelsberg auch für extrovertierte Persönlichkeiten verwendet. Stammt vom „bunt sein". Symbol für hessische Lebensfreude und liebevollen Umgang mit Auffälligkeit. Klingt nicht beleidigend.',
      beispiel: 'Was bist du heut für a Buntling?',
      beispiel_hd: 'Was bist du heute für ein bunter Vogel?',
      kategorie: 'menschen'
    },
    {
      id: 'h-342',
      ausdruck: 'Sankt-Martin',
      hochdeutsch: 'St. Martin (11.11.)',
      bedeutung: '„Sankt-Martin" ist hessische Tradition — am 11.11. wird St. Martin (Sankt Martin von Tours) gefeiert. Kinder ziehen mit selbstgebastelten Laternen durchs Dorf, singen Martins-Lieder. Höhepunkt: das Martins-Feuer und das Verteilen von „Martins-Brezeln". Hessischer Brauch: ein Bursche reitet als St. Martin auf einem Pferd voran. Karneval beginnt am gleichen Tag um 11:11 Uhr. Symbol für hessische Kinder-Tradition und christliches Brauchtum.',
      beispiel: 'Z\'Sankt-Martin ziehen d\'Kinder mit Laternen durchs Dorf.',
      beispiel_hd: 'Zu Sankt-Martin ziehen die Kinder mit Laternen durchs Dorf.',
      kategorie: 'feiern'
    },
    {
      id: 'h-343',
      ausdruck: 'Wäldsche-Picknick',
      hochdeutsch: 'Picknick im kleinen Wald',
      bedeutung: 'Das „Wäldsche-Picknick" ist hessische Sommer-Tradition — Familien-Picknick in einem nahegelegenen Wäldchen. Mitgebracht: Decke, Korb mit Brotzeit, Apfelwein-Bembel, Obst. „Wir machen e Wäldsche-Picknick" als typische Wochenend-Planung. Im Vogelsberg, Taunus oder Odenwald besonders verbreitet. Symbol für hessische Naturnähe und Familien-Aktivitäten. Klassische Kindheits-Erinnerung vieler Hessen.',
      beispiel: 'Am Sonntag machen wir e Wäldsche-Picknick im Taunus.',
      beispiel_hd: 'Am Sonntag machen wir ein Wäldchen-Picknick im Taunus.',
      kategorie: 'feiern'
    },
    {
      id: 'h-344',
      ausdruck: 'Frühschoppe',
      hochdeutsch: 'Frühschoppen',
      bedeutung: 'Der „Frühschoppe" ist hessische Sonntagsmorgen-Tradition — Männer treffen sich vor dem Mittagessen zum ersten Apfelwein oder Bier in der Stammkneipe. „Wir gehen auf\'n Frühschoppe" ist klassische Männer-Aktivität. „Politik-Frühschoppe" mit ZDF-Sendung „Internationaler Frühschoppen" (1952-1987) war legendär. Mütter wissen Bescheid: Vater kommt erst nachmittags zurück. Symbol für hessisches Männer-Sozialleben und Wirtshaus-Tradition.',
      beispiel: 'Mei Vater is\' am Sonntag immer auf\'m Frühschoppe.',
      beispiel_hd: 'Mein Vater ist am Sonntag immer auf dem Frühschoppen.',
      kategorie: 'feiern'
    },
    {
      id: 'h-345',
      ausdruck: 'Hocketse-Festle',
      hochdeutsch: 'kleines Hocketse-Fest',
      bedeutung: '„Hocketse-Festle" ist hessisch-schwäbisches Mini-Fest in einem Dorf — meist im Sommer, organisiert von Sport-, Schützen- oder Musikverein. Bier, Wurst, Live-Musik, Tanz. Kleinere Variante der großen Kerb. „Hocketse-Festle" als Stiftungsfest oder Saisonabschluss. Beim Ortsverein-Picknick. Symbol für hessisch-südliche Vereins-Tradition. Wird oft mit Karten-Verkauf an die Dorf-Gemeinschaft kombiniert.',
      beispiel: 'Am Wochenend is\' wieder Hocketse-Festle vom Sportverein.',
      beispiel_hd: 'Am Wochenende ist wieder Hocketse-Fest vom Sportverein.',
      kategorie: 'feiern'
    },
    {
      id: 'h-346',
      ausdruck: 'Bornheimer Hang',
      hochdeutsch: 'Bornheimer Hang (Eintracht-Stadion)',
      bedeutung: 'Der „Bornheimer Hang" ist das alte Eintracht-Frankfurt-Stadion (1925-1955), heute Heimat des FSV Frankfurt. Lag am Bornheimer Berg. Heute touristisches Ziel für Eintracht-Fans und Sport-Historiker. „Auf\'m Bornheimer Hang" als nostalgische Erinnerung. Stadium-Tradition vor der Commerzbank-Arena. Symbol für Frankfurter Fußball-Geschichte und Bornheimer Identität. Vereinsfans pilgern hierher.',
      beispiel: 'Mei Großvater hat noch Eintracht auf\'m Bornheimer Hang gesehen.',
      beispiel_hd: 'Mein Großvater hat noch Eintracht auf dem Bornheimer Hang gesehen.',
      kategorie: 'orte'
    },
    {
      id: 'h-347',
      ausdruck: 'Glasewacht',
      hochdeutsch: 'Glaswächter / Glasbrand-Aufsicht',
      bedeutung: 'Die „Glasewacht" war in hessischen Glasbläserei-Dörfern (Vogelsberg, Spessart) die Nachtwache bei den Schmelzöfen. Glasbläserei war Hessens historische Industrie — Schmelzöfen durften nicht ausgehen. „Glasewächter" war ehrenamtlich, oft alte Männer. Heute Begriff für „jemand, der nachts wacht oder aufmerksam ist". „Wie eine Glasewacht" für sehr aufmerksam sein. Symbol für hessisches Handwerker-Erbe.',
      beispiel: 'Der Hausmeister is\' eine echte Glasewacht.',
      beispiel_hd: 'Der Hausmeister ist ein echter Wächter.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-348',
      ausdruck: 'Kirschblütenfest',
      hochdeutsch: 'Kirschblütenfest',
      bedeutung: 'Das „Kirschblütenfest" ist hessisches Frühlings-Fest — vor allem im Maintal und an der Bergstraß. Wenn die Kirschblüten weiß-rosa blühen (Mitte April), wird gefeiert. „Bergsträßer Kirschblütenfest" mit Kirschbier, Kirschkuchen, Kirsch-Schnaps. Tradition seit dem Mittelalter. Touristen-Magnet. Symbol für hessischen Frühling und Obstbau-Tradition. Bestes Programm: Spaziergang durch blühende Kirschplantagen mit Schnapsverkostung.',
      beispiel: 'Z\'Kirschblütenfest is\' d\'Bergstraß rosa.',
      beispiel_hd: 'Zur Kirschblütenfestzeit ist die Bergstraße rosa.',
      kategorie: 'feiern'
    },
    {
      id: 'h-349',
      ausdruck: 'Pfingstkönig',
      hochdeutsch: 'Pfingst-König (alte hessische Tradition)',
      bedeutung: 'Der „Pfingstkönig" ist alte hessische Brauchtums-Tradition — am Pfingstmontag wird in manchen Dörfern ein junger Mann zum „Pfingstkönig" gewählt. Er trägt eine grüne Birkenkrone und reitet vor dem Pfingstumzug. Tradition seit dem 18. Jahrhundert. Heute nur noch in wenigen Dörfern (Bachgau, Spessart) gepflegt. Junger Mann muss tapfer, geselllig und im Dorf beliebt sein. Symbol für hessisches Brauchtum und Dorf-Hierarchien.',
      beispiel: 'D\'Wahl zum Pfingstkönig is\' große Ehre.',
      beispiel_hd: 'Die Wahl zum Pfingstkönig ist große Ehre.',
      kategorie: 'feiern'
    },
    {
      id: 'h-350',
      ausdruck: 'Hessen-Tanz',
      hochdeutsch: 'hessischer Volkstanz',
      bedeutung: 'Der „Hessen-Tanz" sind hessische Volkstänze — meist Polka, Walzer oder Schwälmer Tanz. Auf hessischen Trachtenfesten, Kerb und Hochzeiten getanzt. „Hessen-Tanz-Verein" pflegt regionale Tänze. „Schwälmer Trachtentanz" mit dem rot-grünen Trachten ist berühmt. Im Vogelsberg und Spessart eigene Tanz-Variationen. Touristen können auf Trachtenfesten mittanzen. Symbol für hessisches Brauchtum und Tanz-Tradition.',
      beispiel: 'Auf der Kerb wird Hessen-Tanz getanzt.',
      beispiel_hd: 'Auf der Kirmes wird hessischer Volkstanz getanzt.',
      kategorie: 'musik'
    },
    {
      id: 'h-351',
      ausdruck: 'Digga',
      hochdeutsch: 'Kumpel / Alter',
      bedeutung: '„Digga" ist hessisch-jugendsprachliche Anrede für Freunde — vor allem in Frankfurt verbreitet. Stammt aus dem hamburgischen „Digger", in Hessen aber etabliert. „Was geht, Digga?" als Standard-Begrüßung. Junge Hessen verwenden es als universelle Anrede. Im Gegensatz zur älteren Generation, die „Schorsch" oder „Hansi" sagt. Beispiel für moderne Hessen-Jugendsprache. Symbol für urbane Frankfurt-Identität der jüngeren Generation.',
      beispiel: 'Was machst du heut Abend, Digga?',
      beispiel_hd: 'Was machst du heute Abend, Kumpel?',
      kategorie: 'menschen'
    },
    {
      id: 'h-352',
      ausdruck: 'Geil',
      hochdeutsch: 'toll / super',
      bedeutung: '„Geil" ist hessisch-jugendsprachlich für „toll", „super", „cool" — verbreitet in der jüngeren Generation. Anders als die ältere Verwendung als „lüstern" hat „geil" als Verstärker heute keine sexuelle Konnotation mehr. „Voll geil!" für „Klasse!". Hessen sind sprachlich offen für jugendsprachliche Adaptionen. Auch in Werbung verwendet („Geile Preise!"). Symbol für moderne hessische Umgangssprache. Mütter klagen oft über die Verwendung.',
      beispiel: 'Des Konzert war voll geil!',
      beispiel_hd: 'Das Konzert war voll super!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-353',
      ausdruck: 'Auf jeden',
      hochdeutsch: 'auf jeden Fall',
      bedeutung: '„Auf jeden" ist verkürzte hessisch-jugendsprachliche Variante von „auf jeden Fall". „Auf jeden komm i mit!" für „Auf jeden Fall komme ich mit!". Drückt 100% Zustimmung aus. Hessische Sprachfreude — Wörter werden gekürzt für mehr Lebendigkeit. Im Gegensatz zur älteren Generation, die ausführlich spricht. „Auf jeden, Digga!" als doppelte Verstärkung. Symbol für moderne hessische Effizienz im Sprechen.',
      beispiel: 'Auf jeden geh i morgen Abend in d\'Wirtschaft.',
      beispiel_hd: 'Auf jeden Fall gehe ich morgen Abend in die Wirtschaft.',
      kategorie: 'redensart'
    },
    {
      id: 'h-354',
      ausdruck: 'Krass',
      hochdeutsch: 'krass / heftig',
      bedeutung: '„Krass" ist universeller Jugend-Verstärker für „intensiv", „heftig", „beeindruckend". In Hessen sehr verbreitet. „Des is krass!" kann positiv (super) oder negativ (schlimm) gemeint sein — je nach Kontext und Tonfall. „Krass derbe" als verstärkende Doppelung. Mütter klagen, dass Kinder „nur noch krass" sagen. Hessische jüngere Generation verwendet es täglich. Symbol für moderne jugendliche Hessen-Sprache.',
      beispiel: 'Der Eintracht-Sieg war krass!',
      beispiel_hd: 'Der Eintracht-Sieg war heftig (super)!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-355',
      ausdruck: 'Lan',
      hochdeutsch: 'Mann / Junge',
      bedeutung: '„Lan" ist hessisch-jugendsprachliche Anrede, stammt aus dem türkischen „lan" („Mann"). In Frankfurt durch die multikulturelle Jugend verbreitet. „Was geht, Lan?" als Standard-Begrüßung. Drückt Vertrautheit und gleiches Niveau aus. Mehr verbreitet in städtischen Vierteln (Sachsenhausen, Bornheim, Höchst) als in ländlichen Gegenden. Symbol für hessische multikulturelle Sprache und Integration. Wird auch von deutschen Jugendlichen verwendet.',
      beispiel: 'Was machst du heut, Lan?',
      beispiel_hd: 'Was machst du heute, Mann?',
      kategorie: 'menschen'
    },
    {
      id: 'h-356',
      ausdruck: 'Voll der/die/das',
      hochdeutsch: 'völlig der/die/das',
      bedeutung: '„Voll der X" ist hessisch-jugendsprachliche Verstärkung — „Voll der gute Apfelwein!" für „Wirklich guter Apfelwein!". „Voll die Stimmung!" für tolle Stimmung. „Voll das Theater!" für viel Aufregung. Konstruktion mit Artikel und Substantiv — modern, lebendig, jugendlich. Ältere Hessen finden\'s ungewohnt. „Voll der Spaß!" als ironische Wendung. Symbol für moderne hessische Adjektiv-Verstärkung.',
      beispiel: 'Voll der gute Apfelwein heut!',
      beispiel_hd: 'Wirklich guter Apfelwein heute!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-357',
      ausdruck: 'Diggi',
      hochdeutsch: 'kleiner Kumpel',
      bedeutung: '„Diggi" ist Diminutiv-Variante von „Digga" — noch zärtlicher, oft für kleinere Kinder oder vertraute Freunde verwendet. „Komm her, Diggi!" als liebevolle Anrede. In Frankfurt-Bornheim und Sachsenhausen häufig zu hören. Drückt enge Freundschaft oder familiäre Vertrautheit aus. Hessische Sprach-Innovation — Diminutiv-Variation populärer Jugend-Anreden. Symbol für moderne hessische Wärme im Slang.',
      beispiel: 'Mei Diggi, des is\' ja unglaublich!',
      beispiel_hd: 'Mein Kumpel, das ist ja unglaublich!',
      kategorie: 'menschen'
    },
    {
      id: 'h-358',
      ausdruck: 'Bombe!',
      hochdeutsch: 'super / fantastisch',
      bedeutung: '„Bombe!" ist hessisch-jugendsprachlicher Begeisterungsausruf — „Voll Bombe!" für „Absolut super!". Drückt extreme positive Bewertung aus. Stammt vom „Knaller" (Bombe als Symbol für überwältigend). „Des is\' Bombe!" als allgemeine Anerkennung. In Frankfurt-Slang sehr beliebt, vor allem in Sport- und Musik-Kontexten. Symbol für moderne hessische Verstärkung. Im Gegensatz zu „doof" oder „mies".',
      beispiel: 'Der neue Song is\' voll Bombe!',
      beispiel_hd: 'Der neue Song ist absolut super!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-359',
      ausdruck: 'Verkackt',
      hochdeutsch: 'verloren / kaputt',
      bedeutung: '„Verkackt" ist hessisch-jugendsprachliche Bezeichnung für „etwas schiefgegangen ist" — „Des is\' verkackt!" für „Das ist kaputt/schlecht gelaufen". Stammt vom derberen „verkacken" (verlieren, verderben). Im Sport oft verwendet: „Eintracht hat verkackt!". Auch metaphorisch für misslungene Pläne. Mütter mahnen Kinder: „So spricht man nicht!". Trotzdem im jugendlichen Hessen-Sprach weit verbreitet. Symbol für direkte jugendliche Bewertung.',
      beispiel: 'Mei Klassenarbeit hab i total verkackt.',
      beispiel_hd: 'Meine Klassenarbeit habe ich total versaut.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-360',
      ausdruck: 'Bratzeit',
      hochdeutsch: 'Brotzeit (umgangssprachlich)',
      bedeutung: '„Bratzeit" ist hessisch-jugendsprachliche Verballhornung von „Brotzeit" — meist mit Augenzwinkern verwendet. „Auf in die Bratzeit!" für „auf zur Pause/Mahlzeit". Im Kontext mit Hessen-Schmäh und Selbstironie. Drückt liebevolle Distanz zur älteren Generation aus, die „Brotzeit" ernst meint. Modern-hessische Sprachfreude. Auch metaphorisch: „Sich zur Bratzeit machen" für sich entspannen. Symbol für junge hessische Wortspielfreude.',
      beispiel: 'Komm, mer machen Bratzeit!',
      beispiel_hd: 'Komm, machen wir Brotzeit!',
      kategorie: 'essen'
    },
    {
      id: 'h-361',
      ausdruck: 'Geht ab',
      hochdeutsch: 'geht los / startet',
      bedeutung: '„Geht ab" ist hessisch-jugendsprachlich für „etwas geht los, beginnt mit voller Power". „Heut Abend geht ab!" für „heute Abend ist Party!". „Die Eintracht geht ab!" als Fan-Begeisterung. Drückt Energie und Erwartung aus. Stammt vom „abgehen" (loslegen). Im hessischen Sport- und Party-Kontext verbreitet. Mütter verstehen es als Warnung: das Kind plant etwas Lautes. Symbol für moderne hessische Aktion-Sprache.',
      beispiel: 'Heut Abend geht ab im Atschel!',
      beispiel_hd: 'Heute Abend geht es ab im Atschel!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-362',
      ausdruck: 'Chillen',
      hochdeutsch: 'entspannen',
      bedeutung: '„Chillen" ist hessisch-jugendsprachliche Anglizismus für „entspannen". „Mer chillen heut Abend in der Wirtschaft" für „wir entspannen heute Abend in der Wirtschaft". Drückt moderne hessische Lässigkeit aus. Mütter klagen: „Was heißt chillen? Wir sagen entspannen!". Trotzdem im Sprachgebrauch der jüngeren Generation universell. Hessen integrieren Anglizismen in den Dialekt. Symbol für moderne hessische Sprachmischung.',
      beispiel: 'Lasst uns mol chillen am Mainufer.',
      beispiel_hd: 'Lasst uns mal entspannen am Mainufer.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-363',
      ausdruck: 'Was geht?',
      hochdeutsch: 'wie geht\'s? / was ist los?',
      bedeutung: '„Was geht?" ist hessisch-jugendsprachliche Standard-Begrüßung — vergleichbar mit englischem „What\'s up?". „Was geht, Digga?" als Eingangsfrage. Drückt lockere Interesse aus. Im Gegensatz zur älteren „Wie geht\'s?" lockerer und weniger förmlich. Hessische Jugend verwendet es täglich. Im Frankfurt-Slang etabliert. Symbol für moderne hessische Anrede. Antwort meist: „Geht so", „Voll geil", oder „Nix Besonderes".',
      beispiel: 'Was geht, Digga? Was machst du heut?',
      beispiel_hd: 'Was ist los, Kumpel? Was machst du heute?',
      kategorie: 'begruessung'
    },
    {
      id: 'h-364',
      ausdruck: 'Boah',
      hochdeutsch: 'Wow / Oh',
      bedeutung: '„Boah" ist hessisch-jugendsprachlicher Ausruf der Verwunderung, Bewunderung oder Empörung. „Boah, des is\' krass!" als allgemeine Reaktion. Wird mit verschiedenen Tonfällen verwendet — von Bewunderung („Boah, gut!") bis zu Empörung („Boah, nervig!"). Lautmalerei für intensive Emotion. In hessischer Jugendsprache omnipräsent. Mütter sagen: „Sag nicht ständig Boah!". Symbol für moderne hessische emotionale Reaktionen.',
      beispiel: 'Boah, der Sieg war echt knapp!',
      beispiel_hd: 'Wow, der Sieg war echt knapp!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-365',
      ausdruck: 'Sahne',
      hochdeutsch: 'super / klasse',
      bedeutung: '„Sahne" ist hessisch-jugendsprachliche Bewertung für „klasse, super". „Voll Sahne!" als Verstärkung. Anders als die ältere Verwendung (Milchprodukt) heute Synonym für „toll". Stammt vermutlich von „Sahnehäubchen" (Sahne als Krönung). Im Frankfurt-Slang etabliert, vor allem unter Eintracht-Fans. „Sahne-Tor" für ein perfektes Tor. Hessische Sprachfreude — alltägliche Wörter werden zu Bewertungen. Symbol für moderne hessische Verstärkung.',
      beispiel: 'Voll Sahne, der neue Stürmer!',
      beispiel_hd: 'Voll klasse, der neue Stürmer!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-366',
      ausdruck: 'Atze',
      hochdeutsch: 'Bruder / Kumpel',
      bedeutung: '„Atze" ist hessisch-jugendsprachliche Anrede für engen Freund — „Was geht, Atze?". Stammt vom alten deutschen „Atze" (älterer Bruder, eng verbundener Mann). In Frankfurter Jugendsprache als Synonym für „Digga" verwendet. Drückt brüderliche Vertrautheit aus. „Mei Atze" als „mein Bester". Im sportlichen Kontext (Eintracht-Fans) und in der städtischen Jugendsprache. Symbol für hessische multikulturelle Anreden-Vielfalt.',
      beispiel: 'Komm, Atze, mer geh\'n auf\'n Apfelwein.',
      beispiel_hd: 'Komm, Bruder, wir gehen auf einen Apfelwein.',
      kategorie: 'menschen'
    },
    {
      id: 'h-367',
      ausdruck: 'Voll der Hessen',
      hochdeutsch: 'echter Hesse',
      bedeutung: '„Voll der Hessen" ist Selbstcharakterisierung der jüngeren Generation — drückt hessische Identität mit modernem Selbstbewusstsein aus. „I bin halt voll der Hessen!" als ironische Verstärkung. Verbindet jugend-sprachliche „voll der X"-Konstruktion mit traditioneller Hessen-Identität. Symbol für moderne hessische Selbstwahrnehmung — bodenständig und urban zugleich. Auch in Werbespots verwendet.',
      beispiel: 'I bin voll der Hessen — Apfelwein muss sein!',
      beispiel_hd: 'Ich bin voll der Hesse — Apfelwein muss sein!',
      kategorie: 'menschen'
    },
    {
      id: 'h-368',
      ausdruck: 'Wallah',
      hochdeutsch: 'wirklich / ehrlich',
      bedeutung: '„Wallah" ist hessisch-multikulturelle Beteuerung — stammt aus dem Arabischen „wallahi" (bei Gott). In Frankfurt durch die multikulturelle Jugend etabliert. „Wallah, des stimmt!" für „Wirklich, das stimmt!". Drückt Wahrheit und Beteuerung aus. Mehr verbreitet in städtischen Vierteln (Bockenheim, Höchst, Bornheim). Symbol für hessische multikulturelle Sprache. Wird auch von deutschen Jugendlichen verwendet, manchmal mit ironischer Note.',
      beispiel: 'Wallah, des is\' Wahrheit!',
      beispiel_hd: 'Ehrlich, das ist Wahrheit!',
      kategorie: 'redensart'
    },
    {
      id: 'h-369',
      ausdruck: 'Hessebabbler',
      hochdeutsch: 'hessisch sprechender Mensch',
      bedeutung: '„Hessebabbler" ist humorvolle Selbstbezeichnung — „einer, der babbelt wie a Hesse". Kann liebevoll oder spöttisch gemeint sein. In Komödien und Mundart-Theater verwendet. Drückt Stolz auf den Dialekt aus. „A echter Hessebabbler" für jemand mit starkem hessischen Akzent. Im Frankfurter Selbstbild positiv. Symbol für hessische Mundart-Identität. Wird auch als Markenname von Bratwurst-Imbissen verwendet („Hessebabbler-Wurst").',
      beispiel: 'Mei Opa is\' a echter Hessebabbler.',
      beispiel_hd: 'Mein Opa ist ein echter Hesse-Plauderer.',
      kategorie: 'menschen'
    },
    {
      id: 'h-370',
      ausdruck: 'Banane!',
      hochdeutsch: 'Quatsch! / Unsinn!',
      bedeutung: '„Banane!" ist hessisch-umgangssprachlicher Ausruf der Ablehnung — „Banane, des is\' doch Quatsch!". Stammt vom „alles Banane" für „alles Mist". Klingt liebevoll-spöttisch, keine harte Beleidigung. Vergleichbar mit „Quatsch mit Soße!". Wird mit Hand-Geste begleitet — Wedeln. In hessischen Diskussionen verbreitet. Symbol für hessische Lockerheit beim Widersprechen. Mütter sagen liebevoll: „Banane, mei Schatz!".',
      beispiel: 'Banane! Des hat nix mit der Wahrheit zu tun!',
      beispiel_hd: 'Quatsch! Das hat nichts mit der Wahrheit zu tun!',
      kategorie: 'redensart'
    },
    {
      id: 'h-371',
      ausdruck: 'Komplett crazy',
      hochdeutsch: 'völlig verrückt',
      bedeutung: '„Komplett crazy" ist hessisch-jugendsprachliches Anglizismus für „völlig verrückt". „Des is\' komplett crazy!" als Verstärkung. Drückt Überraschung oder Unverständnis aus. Im hessischen Frankfurt-Slang etabliert. Mütter klagen: „Sag verrückt, nicht crazy!". Trotzdem im jugendlichen Wortschatz universell. Symbol für moderne hessische Anglizismen-Integration. Hessische Sprachoffenheit für englische Lehnwörter.',
      beispiel: 'Des Wochenend war komplett crazy!',
      beispiel_hd: 'Das Wochenende war völlig verrückt!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-372',
      ausdruck: 'Kollege',
      hochdeutsch: 'Kollege / Freund',
      bedeutung: '„Kollege" ist hessisch-jugendsprachliche Anrede für engen Freund — vergleichbar mit Digga, Atze, Lan. „Was geht, Kollege?" als Begrüßung. Stammt vom Arbeitsumfeld, aber semantisch erweitert. In Frankfurter Jugendsprache als universelle männliche Anrede. „Mei Kollege" für „mein Bester". Im sportlichen und kulturellen Kontext verbreitet. Symbol für hessische Anredevielfalt. Kann auch ironisch gemeint sein.',
      beispiel: 'Hey Kollege, wann sehen wir uns wieder?',
      beispiel_hd: 'Hey Kollege, wann sehen wir uns wieder?',
      kategorie: 'menschen'
    },
    {
      id: 'h-373',
      ausdruck: 'Bombenstimmung',
      hochdeutsch: 'tolle Stimmung',
      bedeutung: '„Bombenstimmung" ist hessisch-umgangssprachlich für „tolle Stimmung" — auf Volksfesten, Konzerten, Sport-Events. „Im Stadion herrschte Bombenstimmung!" als Eintracht-Fan-Bewertung. Drückt extreme positive Atmosphäre aus. „Bombe" + „Stimmung" — typisch hessische Verstärkungs-Wortbildung. Symbol für hessische Lebensfreude und Fest-Kultur. Auch in Reisebericht-Sprache: „Auf Mallorca herrschte Bombenstimmung!".',
      beispiel: 'Auf der Kerb war Bombenstimmung bis spät in d\'Nacht.',
      beispiel_hd: 'Auf der Kirmes war tolle Stimmung bis spät in die Nacht.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-374',
      ausdruck: 'Mach\'s gut',
      hochdeutsch: 'Tschüss / mach\'s gut',
      bedeutung: '„Mach\'s gut" ist hessische Standard-Verabschiedung — neutraler als „Pfiat di" (südländisch), wärmer als „Tschüss". Wird unter Freunden, Kollegen, Familien verwendet. Drückt aufrichtige Wunsch nach Wohlergehen aus. „Mach\'s gut, mei Liaba!" als hessische Variation. Symbol für hessische Mittel-Ebene zwischen Förmlichkeit und Intimität. Universell verwendbar. Auch im Geschäftsleben akzeptiert.',
      beispiel: 'Mach\'s gut, mer sehe uns nächst Woch!',
      beispiel_hd: 'Mach\'s gut, wir sehen uns nächste Woche!',
      kategorie: 'begruessung'
    },
    {
      id: 'h-375',
      ausdruck: 'Bro',
      hochdeutsch: 'Bruder / Kumpel',
      bedeutung: '„Bro" ist hessisch-jugendsprachliche Kurzform von „Bruder" — Anglizismus, der durch US-Hip-Hop in den hessischen Slang gekommen ist. „Was geht, Bro?" als Standardanrede unter jüngeren Männern. Drückt brüderliche Vertrautheit aus. In Frankfurt-Sachsenhausen und Bornheim verbreitet. Im Gegensatz zu „Digga" oder „Atze" stärker amerikanisiert. Symbol für hessische multikulturelle Sprach-Adaptation. Wird auch ironisch verwendet.',
      beispiel: 'Was geht, Bro? Hast du Lust auf Ebbelwoi?',
      beispiel_hd: 'Was geht, Bruder? Hast du Lust auf Apfelwein?',
      kategorie: 'menschen'
    },
    {
      id: 'h-376',
      ausdruck: 'Bombe drauf',
      hochdeutsch: 'gute Laune',
      bedeutung: '„Bombe drauf" ist hessisch-jugendsprachlich für „gute Laune haben". „I hab heut Bombe drauf!" für „ich habe heute Top-Laune!". Verstärkung durch „Bombe". Drückt Energie und Optimismus aus. Im Frankfurter Jugendslang verbreitet. Mütter erkennen daran, dass das Kind gut gelaunt ist. Vergleichbar mit „I hab heut a guter Tag". Symbol für moderne hessische Selbstbewertung und Energie-Sprache.',
      beispiel: 'I hab heut Bombe drauf — Eintracht hat gewonnen!',
      beispiel_hd: 'Ich habe heute gute Laune — Eintracht hat gewonnen!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-377',
      ausdruck: 'Klamotten checken',
      hochdeutsch: 'Kleidung prüfen / Mode checken',
      bedeutung: '„Klamotten checken" ist hessisch-jugendsprachlich für „die Kleidung prüfen" — meist vor Ausgehen oder vor Party. „Lass mer noch d\'Klamotten checken!" als Bestätigung der Mode-Tauglichkeit. Anglizismus „check" + hessisches „Klamotten". Drückt Selbstinszenierung und Mode-Bewusstsein aus. In Frankfurt-Sachsenhausen-Jugendkultur verbreitet. Symbol für moderne hessische Mode-Sprache. Beziehungsweise besonders in der Frankfurter Modeszene.',
      beispiel: 'Vor\'m Ausgehen müssen mer noch d\'Klamotten checken.',
      beispiel_hd: 'Vor dem Ausgehen müssen wir noch die Kleidung checken.',
      kategorie: 'alltag'
    },
    {
      id: 'h-378',
      ausdruck: 'Frankfurter Brett',
      hochdeutsch: 'Frankfurter Bart-Stil',
      bedeutung: 'Das „Frankfurter Brett" ist Vollbart-Mode der Frankfurter Hipster — gestylter Vollbart, oft kombiniert mit Sidecut, Mütze und Apfelwein. In Bornheim und im Westend (Frankfurts Hipster-Viertel) verbreitet. „Ein Brett tragen" für gestylten Vollbart. Frankfurter Identität-Detail. Auch in Werbung für hessisches Bier oder Apfelwein verwendet. Symbol für moderne urbane hessische Mode-Identität.',
      beispiel: 'Der Hipster mit\'m Frankfurter Brett trinkt Ebbelwoi.',
      beispiel_hd: 'Der Hipster mit dem Frankfurter Bart trinkt Apfelwein.',
      kategorie: 'alltag'
    },
    {
      id: 'h-379',
      ausdruck: 'Hessenraum',
      hochdeutsch: 'Hessen-Region',
      bedeutung: '„Hessenraum" ist offizielle Bezeichnung für die Region Hessen — vor allem in Politik und Wirtschaft verwendet. „Im Hessenraum gibt\'s viele mittelständische Unternehmen". Wird auch von hessischen Politikern und Marketing-Strategen verwendet, um regionale Identität zu betonen. Im Gegensatz zum simplen „Hessen" mit offiziellerem, professionellerem Klang. Symbol für hessische Wirtschafts- und Marketing-Sprache. Auch in Statistiken und Wirtschaftsberichten.',
      beispiel: 'Im Hessenraum wachsen die KMUs am stärksten.',
      beispiel_hd: 'In der Hessen-Region wachsen die KMUs am stärksten.',
      kategorie: 'orte'
    },
    {
      id: 'h-380',
      ausdruck: 'Hessen for life',
      hochdeutsch: 'Hessen ein Leben lang',
      bedeutung: '„Hessen for life" ist hessisch-jugendsprachlicher Identitäts-Slogan — vor allem in Eintracht-Fan-Kreisen und auf T-Shirts. Verbindet hessische Heimat-Treue mit englischer Sprachform. „Hessen for life, baby!" als Bekenntnis. Drückt unzerbrechliche regionale Loyalität aus. Im Frankfurter Stadion oft als Banner zu sehen. Symbol für moderne hessische Identität — sprachlich modern, kulturell traditionell. Hessen-Stolz neuer Generation.',
      beispiel: 'Hessen for life — auch wenn d\'Eintracht verliert!',
      beispiel_hd: 'Hessen ein Leben lang — auch wenn die Eintracht verliert!',
      kategorie: 'menschen'
    },
    {
      id: 'h-381',
      ausdruck: 'Frankforterisch',
      hochdeutsch: 'Frankfurterisch (Stadt-Dialekt)',
      bedeutung: 'Das „Frankforterisch" ist der spezifische Frankfurter Stadtdialekt — eine Variante des Hessischen mit Bankenmetropolen-Einschlag. „I red Frankforterisch, kei Hessisch ausm Land!" Mit Wörtern wie Bembel, Schoppe, Handkäs aufgewachsen. Mehr Hochdeutsch durchsetzt als das Landhessisch. Im Volkstheater (Volkstheater Frankfurt) gepflegt. Frankfurter Stadtidentität.',
      beispiel: 'Frankforterisch sprech ich nur noch mit der Familie.',
      beispiel_hd: 'Frankfurterisch spreche ich nur noch mit der Familie.',
      kategorie: 'menschen'
    },
    {
      id: 'h-382',
      ausdruck: 'Bembelmann',
      hochdeutsch: 'Bembel-Träger / Apfelwein-Liebhaber',
      bedeutung: 'Ein „Bembelmann" ist im Hessischen ein Apfelwein-Liebhaber, der seinen Bembel (Apfelweinkrug) immer dabei hat. „Der echte Bembelmann reist mit seinem Bembel!" Verbreitet in der hessischen Apfelweinkultur. Im Apfelwein-Express, in den Sachsenhäuser Wirtschaften, beim Hessentag — überall zu sehen. Symbol für die hessische Apfelwein-Identität.',
      beispiel: 'Mei Onkel isch a echter Bembelmann!',
      beispiel_hd: 'Mein Onkel ist ein echter Bembelmann!',
      kategorie: 'menschen'
    },
    {
      id: 'h-383',
      ausdruck: 'Sachsenhäuser Apfelwein-Tour',
      hochdeutsch: 'Sachsenhäuser Apfelwein-Tour',
      bedeutung: 'Die „Sachsenhäuser Apfelwein-Tour" ist eine klassische Frankfurter Touren-Aktivität — von Apfelwein-Wirtschaft zu Apfelwein-Wirtschaft im Stadtteil Sachsenhausen ziehen. „Die Sachsenhäuser Apfelwein-Tour endet meist bei der Schlachten Pott!" Beliebte Junggesellenabschiede und Touristen-Ausflüge. Symbol für die Frankfurter Apfelwein-Kultur. Hessische Geselligkeitsform.',
      beispiel: 'Zum Geburtstag macht mer Sachsenhäuser Apfelwein-Tour!',
      beispiel_hd: 'Zum Geburtstag macht man Sachsenhäuser Apfelwein-Tour!',
      kategorie: 'feiern'
    },
    {
      id: 'h-384',
      ausdruck: 'Worschdebrot',
      hochdeutsch: 'Wurstbrot (hessisch)',
      bedeutung: 'Das „Worschdebrot" ist im Hessischen das Wurstbrot — die typische Brotzeit-Mahlzeit zwischen den Hauptmahlzeiten. „Pack mer\'n Worschdebrot für die Pause!" Klassisch mit Hessischer Bratwurst, Lyoner oder Mortadella. Eine bodenständige hessische Speise. Mit dem charakteristischen hessischen „-de"-Suffix. Im Schulpausen-Kontext alltäglich.',
      beispiel: 'Für die Brotzeit gibts a Worschdebrot mit Mostbirn.',
      beispiel_hd: 'Für die Brotzeit gibt es ein Wurstbrot mit Mostbirne.',
      kategorie: 'essen'
    },
    {
      id: 'h-385',
      ausdruck: 'Hessehosa',
      hochdeutsch: 'Hessen-Hose / Trachten-Hose',
      bedeutung: 'Die „Hessehosa" ist die traditionelle hessische Tracht-Hose — meist Lederhose oder Bauern-Hose mit Trägern. „Beim Hessentag tragen alle Hessehosa!" Verbreitet in der hessischen Trachten-Tradition. Heute oft nur noch bei Volksfesten und Trachtenfesten getragen. Mit Stolz und Augenzwinkern. Symbol für hessische Heimat-Identität.',
      beispiel: 'Mei Großvater hat noch seine alte Hessehosa.',
      beispiel_hd: 'Mein Großvater hat noch seine alte Hessen-Hose.',
      kategorie: 'alltag'
    },
    {
      id: 'h-386',
      ausdruck: 'Mainmetropol-Hektik',
      hochdeutsch: 'Mainmetropol-Hektik (Frankfurter Stress)',
      bedeutung: 'Die „Mainmetropol-Hektik" ist die typische Frankfurter Großstadt-Hektik — Bankenmetropole, Verkehr, Termine. „In der Mainmetropol-Hektik vergeht die Zeit so schnell!" Im Gegensatz zur ländlich-hessischen Gemütlichkeit. Symbol für Frankfurts urbanen Charakter. Auch Begründung für viele Hessen, die Frankfurt verlassen. Hessische Soziologie.',
      beispiel: 'Die Mainmetropol-Hektik stresst mich jeden Tag!',
      beispiel_hd: 'Die Mainmetropol-Hektik stresst mich jeden Tag!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-387',
      ausdruck: 'Hessenwurschd',
      hochdeutsch: 'Hessen-Wurst',
      bedeutung: 'Die „Hessenwurschd" ist eine traditionelle hessische Wurst — meist Bratwurst oder Mettwurst, regional unterschiedlich. „D\'Hessenwurschd gibts in vielen Sorten!" Hessische Metzgerei-Tradition. Auf Hessentagen und Volksfesten reichlich vertreten. Mit Bembel-Apfelwein die perfekte Kombination. Bodenständige hessische Esskultur.',
      beispiel: 'Auf em Hessentag gibts Hessenwurschd zu jedem Bembel.',
      beispiel_hd: 'Auf dem Hessentag gibt es Hessenwurst zu jedem Bembel.',
      kategorie: 'essen'
    },
    {
      id: 'h-388',
      ausdruck: 'Vogelsbergler',
      hochdeutsch: 'Vogelsbergler (Mensch aus dem Vogelsberg)',
      bedeutung: 'Ein „Vogelsbergler" ist ein Mensch aus dem Vogelsberg — die mittelhessische Mittelgebirgsregion. „D\'Vogelsbergler sind a für si Sturheit bekannt!" Mit eigener Mundart-Variante. Vulkanische Landschaft, sanfte Berge, kleine Dörfer. Hessische Identität mit regionalem Akzent. Symbol für ländliches Hessen.',
      beispiel: 'D\'Vogelsbergler hen ihr eigenes Hessisch.',
      beispiel_hd: 'Die Vogelsbergler haben ihr eigenes Hessisch.',
      kategorie: 'menschen'
    },
    {
      id: 'h-390',
      ausdruck: 'Kuhdorf-Hessen',
      hochdeutsch: 'Ländliches Hessen / Dorf-Hessen',
      bedeutung: 'Das „Kuhdorf-Hessen" ist humorvoll-spöttisch das ländliche Hessen — kleine Dörfer, Bauernhöfe, weite Felder. „D\'Großstadtmenschen lachen über s\'Kuhdorf-Hessen!" Aber: viele Hessen sind stolz auf ihre ländliche Herkunft. Reflektiert die Spannung zwischen Frankfurter Banken-Welt und hessischer Land-Kultur. Mit Selbstironie verwendet.',
      beispiel: 'Aus em Kuhdorf-Hessen kommt mei beschdes Essen!',
      beispiel_hd: 'Aus dem ländlichen Hessen kommt mein bestes Essen!',
      kategorie: 'orte'
    },
    {
      id: 'h-391',
      ausdruck: 'Goethehaus',
      hochdeutsch: 'Goethe-Haus (Frankfurter Geburtshaus)',
      bedeutung: 'Das „Goethehaus" ist Goethes Geburtshaus in Frankfurt — 1749 hier geboren, heute Museum am Großen Hirschgraben. „Im Goethehaus sieht man Goethes Kinderstube!" Im 2. Weltkrieg zerstört, originalgetreu wiederaufgebaut. Eine wichtige Frankfurter Kulturstätte. Pilgerstätte für Goethe-Liebhaber aus aller Welt. Symbol für Frankfurts Kultur-Erbe.',
      beispiel: 'Im Goethehaus erfährt mer alles über sei Kindheit.',
      beispiel_hd: 'Im Goethehaus erfährt man alles über seine Kindheit.',
      kategorie: 'orte'
    },
    {
      id: 'h-392',
      ausdruck: 'Hessenkollege',
      hochdeutsch: 'Hessen-Kollege / Hessischer Freund',
      bedeutung: 'Ein „Hessenkollege" ist im Hessischen der hessische Freund oder Arbeitskollege — meist mit langer Verbindung und Vertrauen. „Mei Hessenkollege hilft immer aus!" Eine warme, regionale Form der Freundschaftsbenennung. Reflektiert die hessische Wertschätzung für lange, treue Beziehungen. Wichtige Sozialform in der Arbeitswelt.',
      beispiel: 'Mein Hessenkollege hilft mir immer beim Hausbau.',
      beispiel_hd: 'Mein Hessenkollege hilft mir immer beim Hausbau.',
      kategorie: 'menschen'
    },
    {
      id: 'h-393',
      ausdruck: 'Apfelwein-Sommer',
      hochdeutsch: 'Apfelwein-Sommer (Hessen-Sommer)',
      bedeutung: 'Der „Apfelwein-Sommer" ist die hessische Sommer-Tradition — Apfelwein-Wirtschaften im Freien, Bembel teilen, hessische Geselligkeit. „Im Apfelwein-Sommer ist die ganze Stadt entspannter!" Verbreitet in Sachsenhausen, Bornheim, im Apfelwein-Wirtschaftspark. Symbol für hessische Lebenslust und Sommer-Gemeinschaft. Klassische Frankfurter Tradition.',
      beispiel: 'Im Apfelwein-Sommer trinkt mer jeden Abend Bembel.',
      beispiel_hd: 'Im Apfelwein-Sommer trinkt man jeden Abend Bembel.',
      kategorie: 'feiern'
    },
    {
      id: 'h-394',
      ausdruck: 'Hessischer Löwe',
      hochdeutsch: 'Hessischer Löwe (Wappen)',
      bedeutung: 'Der „Hessische Löwe" ist das traditionelle Wappentier von Hessen — ein silberner und roter aufrechter Löwe. „D\'Hessischen Löwen sieht mer auf jedem Hessen-Wappen!" Symbol für hessische Identität seit dem Mittelalter. Auf Polizeiuniformen, Beamten-Anstecknadeln, hessischen Trachten. Eine wichtige hessische Symbolik mit historischer Tiefe.',
      beispiel: 'Auf jedem Hessen-Schild ist der hessische Löwe.',
      beispiel_hd: 'Auf jedem Hessen-Schild ist der hessische Löwe.',
      kategorie: 'orte'
    },
    {
      id: 'h-395',
      ausdruck: 'Hessen-Allianz',
      hochdeutsch: 'Hessen-Allianz (politische Verbindung)',
      bedeutung: 'Die „Hessen-Allianz" ist im Hessischen eine politische oder geschäftliche Verbindung — typische hessische Vernetzung zwischen Familien, Vereinen, Parteien. „D\'Hessen-Allianz öffnet viele Türen!" Reflektiert das hessische Netzwerk-Denken. Mit Anerkennung der Beziehungs-Wichtigkeit. Frankfurter Banker und hessische Landpolitiker pflegen ihre Hessen-Allianz.',
      beispiel: 'Mit der Hessen-Allianz komm ich überall ran.',
      beispiel_hd: 'Mit der Hessen-Allianz komme ich überall ran.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-396',
      ausdruck: 'Rheingau-Riesling',
      hochdeutsch: 'Rheingau-Riesling (Hessen-Wein)',
      bedeutung: 'Der „Rheingau-Riesling" ist Hessens berühmter Weißwein — aus dem Rheingau zwischen Bingen und Wiesbaden. „A Rheingau-Riesling zum Käse — perfekt!" Eine der wichtigsten deutschen Weinregionen mit über 1000 Jahren Tradition. Klosterwein-Tradition (Eberbach). Auch international hoch geschätzt. Symbol für hessische Weinkultur.',
      beispiel: 'Zum Abendessen trink ich gerne a Rheingau-Riesling.',
      beispiel_hd: 'Zum Abendessen trinke ich gerne einen Rheingau-Riesling.',
      kategorie: 'essen'
    },
    {
      id: 'h-397',
      ausdruck: 'Hessenpark-Sonntag',
      hochdeutsch: 'Hessenpark-Sonntag (Freilichtmuseum-Tag)',
      bedeutung: 'Der „Hessenpark-Sonntag" ist ein klassischer hessischer Familien-Tag — Besuch im Hessenpark-Freilichtmuseum in Neu-Anspach im Taunus. „Am Hessenpark-Sonntag lernen d\'Kinder unsere Tradition!" Zeigt traditionelle hessische Architektur und Lebensweise. Historische Häuser aus ganz Hessen wieder aufgebaut. Wichtige hessische Bildungs-Tradition.',
      beispiel: 'Am Wochenende machen wir Hessenpark-Sonntag mit den Kindern.',
      beispiel_hd: 'Am Wochenende machen wir Hessenpark-Sonntag mit den Kindern.',
      kategorie: 'orte'
    },
    {
      id: 'h-398',
      ausdruck: 'Frankfurter-Würschdsche',
      hochdeutsch: 'Frankfurter-Würstchen',
      bedeutung: 'Die „Frankfurter-Würschdsche" sind die original Frankfurter Würstchen — schlanke, aus reinem Schweinefleisch hergestellte Brühwürste. „A Frankfurter-Würschdsche zum Frühstück!" Geschützte Herkunftsbezeichnung. Klassisch mit Senf und Brot serviert. Welt-bekannt. Frankfurter Stadtsymbol. Hessische Wurstkultur mit internationaler Verbreitung.',
      beispiel: 'Zum Frühstück gibts Frankfurter-Würschdsche mit Brötschen.',
      beispiel_hd: 'Zum Frühstück gibt es Frankfurter Würstchen mit Brötchen.',
      kategorie: 'essen'
    },
    {
      id: 'h-399',
      ausdruck: 'Bornemer Schnauz',
      hochdeutsch: 'Bornheimer Schnauze / Direktheit',
      bedeutung: 'Die „Bornemer Schnauz" ist die direkte, manchmal etwas rüde Frankfurter Bornheimer Sprechweise — vergleichbar mit der Berliner Schnauze. „Die Bornemer Schnauz lernt mer schnell kennen!" Bornheim als Frankfurter Stadtteil hat eigene Charakterprägung. Mit Stolz oder Augenzwinkern erwähnt. Hessische Direktheit in Großstadt-Variante.',
      beispiel: 'Mit der Bornemer Schnauz hörste schnell, was Sache is.',
      beispiel_hd: 'Mit der Bornheimer Schnauze hörst du schnell, was Sache ist.',
      kategorie: 'redensart'
    },
    {
      id: 'h-400',
      ausdruck: 'Hessisches Schunkel',
      hochdeutsch: 'Hessisches Schunkellied',
      bedeutung: 'Das „Hessische Schunkel" ist das hessische Volkslied im Schunkel-Rhythmus — meistens auf Festen, in Wirtschaften, beim Hessentag. „Beim Hessischen Schunkel verbinden sich Generationen!" Klassiker wie „Hessenliedel" oder „Frankfurter Bub". Symbol für hessische Geselligkeit und Tradition. Lebendig erhaltene Volkskultur.',
      beispiel: 'Beim Hessischen Schunkel sind sich alle einig!',
      beispiel_hd: 'Beim Hessischen Schunkel sind sich alle einig!',
      kategorie: 'musik'
    },
    {
      id: 'h-401',
      ausdruck: 'Schoppe-Pedder',
      hochdeutsch: 'Schoppen-Petrus / Apfelwein-Stammgast',
      bedeutung: 'Der „Schoppe-Pedder" ist im Hessischen ein Apfelwein-Stammgast — einer, der jeden Abend bei seinem Schoppen Apfelwein sitzt. „Der alte Schoppe-Pedder vom Eck-Beck!" Eine warme, humorvoll-augenzwinkernde Bezeichnung. Klassische Figur der hessischen Apfelwein-Wirtschaften. Mit liebevollem Respekt verwendet. Hessische Sozialfigur.',
      beispiel: 'Beim Wirt am Eck sitzt jeden Abend a Schoppe-Pedder.',
      beispiel_hd: 'Beim Wirt am Eck sitzt jeden Abend ein Schoppen-Petrus.',
      kategorie: 'menschen'
    },
    {
      id: 'h-402',
      ausdruck: 'Hessischer Käse',
      hochdeutsch: 'Hessischer Käse (Handkäs)',
      bedeutung: 'Der „Hessische Käse" oder Handkäs ist eine hessische Käse-Spezialität — kleine, runde, kräftig riechende Sauermilchkäse. „A Hessischer Käse mit Musik!" Mit Zwiebeln, Essig, Öl, Pfeffer und Kümmel mariniert. Traditionell zum Apfelwein. Eine charakteristische hessische Speise. Geschützte Herkunftsbezeichnung. Symbol für hessische Esskultur.',
      beispiel: 'Bei jedem Apfelwein-Schoppe gibts Hessischen Käse!',
      beispiel_hd: 'Bei jedem Apfelwein-Schoppen gibt es Hessischen Käse!',
      kategorie: 'essen'
    },
    {
      id: 'h-403',
      ausdruck: 'Frankforter Sonderzeichen',
      hochdeutsch: 'Frankfurter Sonderzeichen (Verkehrszeichen)',
      bedeutung: 'Das „Frankforter Sonderzeichen" ist humorvoll die Tatsache, dass Frankfurter Verkehrsregeln eigene Auslegungen bekommen — die berühmte Frankfurter Rücksichtslosigkeit im Straßenverkehr. „D\'Frankforter Sonderzeichen kennen nur d\'Frankforter selbst!" Eine charmante hessische Selbstreflexion. Mit Augenzwinkern. Reflektiert Großstadt-Realität.',
      beispiel: 'Mit dem Frankforter Sonderzeichen kommt mer schnell zur Arbeit.',
      beispiel_hd: 'Mit dem Frankfurter Sonderzeichen kommt man schnell zur Arbeit.',
      kategorie: 'alltag'
    },
    {
      id: 'h-404',
      ausdruck: 'Wetterau-Wein',
      hochdeutsch: 'Wetterau-Wein (regionaler Wein)',
      bedeutung: 'Der „Wetterau-Wein" ist Wein aus der hessischen Wetterau-Region — eine kleinere, aber traditionsreiche Weinregion zwischen Frankfurt und Gießen. „A Wetterau-Wein für d\'Familie!" Lokale Weinmacher pflegen alte Sorten. Heute mit dem touristischen „Wetterauer Weinpfad" erschlossen. Symbol für regionale hessische Weinkultur.',
      beispiel: 'Zum Sonntagsessen trinken wir an Wetterau-Wein.',
      beispiel_hd: 'Zum Sonntagsessen trinken wir einen Wetterau-Wein.',
      kategorie: 'essen'
    },
    {
      id: 'h-405',
      ausdruck: 'Buchmess-Tag',
      hochdeutsch: 'Buchmesse-Tag (Frankfurter Buchmesse)',
      bedeutung: 'Der „Buchmess-Tag" ist der Tag der Frankfurter Buchmesse — die größte Buchmesse der Welt im Oktober. „Am Buchmess-Tag isch d\'ganze Stadt voller Verleger und Autoren!" 7.500 Aussteller, 285.000 Besucher jährlich. Internationale Literaturhauptstadt für 5 Tage. Symbol für Frankfurts Kulturhauptstadt-Funktion. Wichtige Frankfurter Tradition seit 1949.',
      beispiel: 'Am Buchmess-Tag sind alle Hotels in Frankfurt ausgebucht.',
      beispiel_hd: 'Am Buchmesse-Tag sind alle Hotels in Frankfurt ausgebucht.',
      kategorie: 'feiern'
    },
    {
      id: 'h-406',
      ausdruck: 'Spessart-Sage',
      hochdeutsch: 'Spessart-Sage (hessische Räubergeschichten)',
      bedeutung: 'Die „Spessart-Sage" sind hessische Sagen aus dem Spessart — Räuber, Spukgeister, geheimnisvolle Wege. „Wilhelm Hauffs Spessart-Sage hat mich als Kind fasziniert!" Wilhelm Hauffs Märchen „Das Wirtshaus im Spessart" weltberühmt. Der Spessart als kulturreiche Naturlandschaft. Wichtige hessische Erzähltradition.',
      beispiel: 'Im Spessart erzählen sie noch heut Spessart-Sagen.',
      beispiel_hd: 'Im Spessart erzählen sie noch heute Spessart-Sagen.',
      kategorie: 'redensart'
    },
    {
      id: 'h-407',
      ausdruck: 'Hessen-Geschäft',
      hochdeutsch: 'Hessen-Geschäft / Hessisches Geschäftsleben',
      bedeutung: 'Das „Hessen-Geschäft" ist die traditionelle hessische Geschäftskultur — bodenständig, ehrlich, mit Beziehungspflege. „Mit em Hessen-Geschäft macht mer keine Halbheiten!" Reflektiert die hessische Wertschätzung für direkte Geschäftsbeziehungen. Im Gegensatz zur Frankfurter Banken-Welt mehr lokal-traditionell. Eine wichtige hessische Berufskultur.',
      beispiel: 'Im Hessen-Geschäft zählt noch der Handschlag.',
      beispiel_hd: 'Im Hessen-Geschäft zählt noch der Handschlag.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-408',
      ausdruck: 'Bembel-Souvenir',
      hochdeutsch: 'Bembel-Souvenir (Hessen-Andenken)',
      bedeutung: 'Das „Bembel-Souvenir" ist das klassische Hessen-Andenken — der grau-blaue Apfelwein-Krug aus Steingut. „Touristen nehmen immer a Bembel-Souvenir mit!" Auch Mini-Bembel als Schlüsselanhänger. Symbol für hessische Identität in handwerklicher Form. Traditionell in der Bembel-Manufaktur Höhr-Grenzhausen hergestellt.',
      beispiel: 'Zum Geburtstag schenk ich a Bembel-Souvenir aus Hessen.',
      beispiel_hd: 'Zum Geburtstag schenk ich ein Bembel-Souvenir aus Hessen.',
      kategorie: 'alltag'
    },
    {
      id: 'h-409',
      ausdruck: 'Hessenfest-Sonntag',
      hochdeutsch: 'Hessenfest-Sonntag',
      bedeutung: 'Der „Hessenfest-Sonntag" ist der Höhepunkt eines hessischen Volksfestes — meist mit Festumzug, Live-Musik, Apfelwein, hessischen Spezialitäten. „Am Hessenfest-Sonntag sind alle hessischen Vereine vertreten!" Wichtige Volkskultur-Tradition. Verbindet die Region in fröhlicher Geselligkeit. Symbol für lebendiges hessisches Brauchtum.',
      beispiel: 'Am Hessenfest-Sonntag is d\'ganze Familie zusammen.',
      beispiel_hd: 'Am Hessenfest-Sonntag ist die ganze Familie zusammen.',
      kategorie: 'feiern'
    },
    {
      id: 'h-410',
      ausdruck: 'Hessisch-rund-um',
      hochdeutsch: 'Hessisch rundherum (hessische Identität)',
      bedeutung: '„Hessisch-rund-um" ist eine moderne hessische Identitäts-Wendung — alles, was hessisch ist: Sprache, Essen, Kultur, Mentalität. „Bei mir isch alles Hessisch-rund-um!" Mit Stolz und Augenzwinkern. Im Tourismus-Marketing oft verwendet. Symbol für hessische Selbstbewusstheit in der modernen Welt. Hessenstolz als Lebensphilosophie.',
      beispiel: 'Hessisch-rund-um — so leb ich mei Leben!',
      beispiel_hd: 'Hessisch rundherum — so lebe ich mein Leben!',
      kategorie: 'menschen'
    },
    {
      id: 'h-411',
      ausdruck: 'ebbes',
      hochdeutsch: 'etwas',
      bedeutung: 'Das hessische Wort „ebbes" steht für „etwas" und gehört zum Grundwortschatz des Dialekts. Man hört es überall: „Willste ebbes esse?" oder „Da stimmt ebbes ned." Die weiche Aussprache mit dem doppelten „b" ist typisch hessisch und zeigt, wie sehr der Dialekt harte Konsonanten aufweicht.',
      beispiel: 'Magste ebbes vom Kuche?',
      beispiel_hd: 'Möchtest du etwas vom Kuchen?',
      kategorie: 'alltag'
    },
    {
      id: 'h-412',
      ausdruck: 'Stöffsche',
      hochdeutsch: 'Apfelwein (Koseform)',
      bedeutung: 'Das „Stöffsche" ist die liebevolle Verkleinerung von „Stöffche" und meint zärtlich den Apfelwein — das Stöffchen schlechthin. Wer in Sachsenhausen „a Stöffsche" bestellt, zeigt, dass er die hessische Trinkkultur kennt. Der Ausdruck verrät die innige Beziehung der Hessen zu ihrem Nationalgetränk.',
      beispiel: 'Komm, mer trinke noch a Stöffsche zusamme!',
      beispiel_hd: 'Komm, wir trinken noch ein Apfelweinchen zusammen!',
      kategorie: 'essen'
    },
    {
      id: 'h-413',
      ausdruck: 'aafange',
      hochdeutsch: 'anfangen',
      bedeutung: 'Das hessische „aafange" bedeutet „anfangen" — das „an" wird zu einem gedehnten „aa" verschliffen. „Mer müsse langsam aafange" hört man oft, wenn etwas beginnen soll. Diese Vokaldehnung ist ein Markenzeichen der hessischen Aussprache und macht den Dialekt so unverwechselbar gemütlich.',
      beispiel: 'Wann wolle mer mit der Arbeit aafange?',
      beispiel_hd: 'Wann wollen wir mit der Arbeit anfangen?',
      kategorie: 'arbeit'
    },
    {
      id: 'h-414',
      ausdruck: 'Schnoog',
      hochdeutsch: 'Schnake / Stechmücke',
      bedeutung: 'Die „Schnoog" ist im Hessischen die Stechmücke oder Schnake, die einem an lauen Sommerabenden am Mainufer das Leben schwer macht. „Die Schnoog hat mich gebisse!" klagt mancher nach einem Abend im Biergarten. Das Wort ist im ganzen hessischen Raum verbreitet und klingt fast schon liebevoll für so ein lästiges Tier.',
      beispiel: 'Am Owend komme die Schnoog vom Bach hoch.',
      beispiel_hd: 'Am Abend kommen die Stechmücken vom Fluss hoch.',
      kategorie: 'natur'
    },
    {
      id: 'h-415',
      ausdruck: 'hibbelig',
      hochdeutsch: 'zappelig / nervös',
      bedeutung: 'Wer „hibbelig" ist, kann nicht stillsitzen, ist unruhig, zappelig und nervös. „Sei doch ned so hibbelig!" sagt man zu einem aufgeregten Kind oder einem ungeduldigen Erwachsenen. Das Wort ist im Hessischen weit verbreitet und beschreibt anschaulich einen Zustand innerer Unruhe, bei dem man kaum auf dem Stuhl bleiben kann.',
      beispiel: 'Vor der Prüfung war ich ganz hibbelig.',
      beispiel_hd: 'Vor der Prüfung war ich ganz zappelig.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-416',
      ausdruck: 'Krische',
      hochdeutsch: 'Kirsche',
      bedeutung: 'Die „Krische" ist im Hessischen die Kirsche — der Bergstraße und dem Odenwald sei Dank, wo im Frühling die Krischebääm blühen. „Die Krische sin dies Jahr besonders süß" freut sich mancher Gärtner. Die hessische Aussprache verschluckt das „r" und macht aus der Kirsche eine weiche, runde Krische.',
      beispiel: 'Im Garte hänge die Krische schon ganz rot.',
      beispiel_hd: 'Im Garten hängen die Kirschen schon ganz rot.',
      kategorie: 'essen'
    },
    {
      id: 'h-417',
      ausdruck: 'Schlappe',
      hochdeutsch: 'Hausschuhe / Pantoffeln',
      bedeutung: 'Die „Schlappe" sind im Hessischen die Hausschuhe oder Pantoffeln, in die man daheim schlüpft. „Zieh dir die Schlappe an, sonst werste kalt an de Füß!" mahnt die Großmutter. Der Name kommt vom schlappenden Geräusch, das die lockeren Schuhe beim Gehen über den Boden machen — herrlich gemütlich und bodenständig.',
      beispiel: 'Daheim lauf ich am liebste in meine Schlappe rum.',
      beispiel_hd: 'Zu Hause laufe ich am liebsten in meinen Hausschuhen herum.',
      kategorie: 'alltag'
    },
    {
      id: 'h-418',
      ausdruck: 'Gewidder',
      hochdeutsch: 'Gewitter',
      bedeutung: 'Das „Gewidder" ist im Hessischen das Gewitter — mit dem typisch weichen „d" statt „t". „Es zieht a Gewidder uff!" warnt man, wenn sich der Himmel verdunkelt. Im Sommer sind die Gewidder über dem Taunus und der Wetterau oft heftig, und mancher Hesse beobachtet sie vom Fenster aus mit ehrfürchtigem Respekt vor der Natur.',
      beispiel: 'Heut Nacht gabs a fürchterlichs Gewidder.',
      beispiel_hd: 'Heute Nacht gab es ein fürchterliches Gewitter.',
      kategorie: 'natur'
    },
    {
      id: 'h-419',
      ausdruck: 'fei',
      hochdeutsch: 'wirklich / aber (Betonungspartikel)',
      bedeutung: 'Das Wörtchen „fei" ist eine hessische Betonungspartikel, die eine Aussage verstärkt oder einen freundlichen Hinweis gibt. „Des is fei wahr!" oder „Du musst fei aufpasse!" Es lässt sich kaum direkt übersetzen und gibt dem Satz eine warme, vertrauliche Note. Besonders im südhessischen und fränkisch geprägten Raum hört man „fei" sehr häufig.',
      beispiel: 'Des Essen schmeckt fei richtig gut!',
      beispiel_hd: 'Das Essen schmeckt wirklich richtig gut!',
      kategorie: 'redensart'
    },
    {
      id: 'h-420',
      ausdruck: 'Dippe',
      hochdeutsch: 'Topf',
      bedeutung: 'Die „Dippe" ist im Hessischen der Topf — egal ob Kochtopf oder Blumentopf. „Stell die Dippe uff den Herd!" sagt man beim Kochen. Aus diesem Wort entstand auch das bekannte hessische Gericht „Dippehas" (Hase aus dem Topf). Die Dippe gehört zum alltäglichen Küchenvokabular und zeigt die bodenständige hessische Kochkultur.',
      beispiel: 'In der große Dippe koch ich heut a Supp.',
      beispiel_hd: 'In dem großen Topf koche ich heute eine Suppe.',
      kategorie: 'essen'
    },
    {
      id: 'h-421',
      ausdruck: 'Strolch',
      hochdeutsch: 'frecher Junge / Lausbub',
      bedeutung: 'Ein „Strolch" ist im Hessischen ein frecher, aber liebenswerter Junge — ein Lausbub, der Streiche ausheckt. „Du klaaner Strolch!" sagt die Oma mit einem Augenzwinkern, wenn das Enkelkind wieder Unsinn gemacht hat. Das Wort schwankt zwischen Tadel und Zärtlichkeit und gehört zum hessischen Repertoire der gutmütigen Schimpfwörter.',
      beispiel: 'Der klaa Strolch hat die ganze Schokolad aufgesse!',
      beispiel_hd: 'Der kleine Lausbub hat die ganze Schokolade aufgegessen!',
      kategorie: 'menschen'
    },
    {
      id: 'h-422',
      ausdruck: 'verzehle',
      hochdeutsch: 'erzählen',
      bedeutung: 'Das hessische „verzehle" bedeutet „erzählen" — eine Geschichte zum Besten geben oder berichten, was passiert ist. „Verzehl mer mol, wie\'s war!" bittet man neugierig. Im Hessischen sitzt man gern zusammen, trinkt ein Schoppe und verzehlt sich gegenseitig die neuesten Geschichten aus dem Dorf oder der Nachbarschaft.',
      beispiel: 'Verzehl mer mol, was gestern passiert is!',
      beispiel_hd: 'Erzähl mir mal, was gestern passiert ist!',
      kategorie: 'alltag'
    },
    {
      id: 'h-423',
      ausdruck: 'Dunnerkeil',
      hochdeutsch: 'Donnerwetter! / Mein Gott!',
      bedeutung: 'Der Ausruf „Dunnerkeil!" ist ein hessischer Kraftausdruck der Verblüffung oder des Ärgers — wörtlich ein „Donnerkeil", also ein Blitz. „Dunnerkeil, des is awwer teuer!" entfährt es einem bei einer Überraschung. Der Ausruf ist deftig, aber harmlos und drückt ehrliche, ungekünstelte Verwunderung auf gut hessische Art aus.',
      beispiel: 'Dunnerkeil, hast du des ganz allaa gemacht?',
      beispiel_hd: 'Donnerwetter, hast du das ganz allein gemacht?',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-424',
      ausdruck: 'Schtubb',
      hochdeutsch: 'Stube / Wohnzimmer',
      bedeutung: 'Die „Schtubb" ist im Hessischen die gute Stube, das Wohnzimmer, in dem man Gäste empfängt und sich am Abend zusammensetzt. „Komm in die Schtubb, da is geheizt!" lädt man freundlich ein. Die hessische Aussprache macht aus der Stube eine behagliche Schtubb, in der hessische Gemütlichkeit und Gastfreundschaft zu Hause sind.',
      beispiel: 'In der Schtubb steht der Owetisch fürs Esse.',
      beispiel_hd: 'In der Stube steht der Esstisch fürs Essen.',
      kategorie: 'alltag'
    },
    {
      id: 'h-425',
      ausdruck: 'Hannebambel',
      hochdeutsch: 'Schwächling / Trottel',
      bedeutung: 'Ein „Hannebambel" ist im Frankfurter Raum ein einfältiger, schwächlicher oder unselbständiger Mensch, der sich nicht durchsetzen kann. „Sei doch kaa Hannebambel!" fordert man jemanden auf, sich nicht alles gefallen zu lassen. Das Wort ist urhessisch und gehört zu den klassischen, farbenfrohen Schimpfwörtern der Mainmetropole.',
      beispiel: 'Lass dich ned ausnutze, sei kaa Hannebambel!',
      beispiel_hd: 'Lass dich nicht ausnutzen, sei kein Schwächling!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-426',
      ausdruck: 'Schnudd',
      hochdeutsch: 'Mund / Schnute',
      bedeutung: 'Die „Schnudd" ist im Hessischen der Mund oder die Schnute — besonders, wenn jemand sie schmollend verzieht. „Mach ned so a Schnudd!" sagt man zu einem beleidigten Kind. Das Wort ist liebevoll-spöttisch und beschreibt anschaulich das hängende, verärgerte Gesicht, das man im hessischen Alltag öfter mal zu sehen bekommt.',
      beispiel: 'Was ziehst du denn so a Schnudd?',
      beispiel_hd: 'Warum ziehst du denn so eine Schnute?',
      kategorie: 'koerper'
    },
    {
      id: 'h-427',
      ausdruck: 'rumbabbele',
      hochdeutsch: 'herumreden / dummes Zeug reden',
      bedeutung: 'Das hessische „rumbabbele" bedeutet, ziel- und sinnloses Zeug zu reden oder lange um den heißen Brei herumzureden. „Hör uff zu rumbabbele und sag, was Sach is!" fordert man ungeduldig. Es ist eine Steigerung von „babbeln" und drückt aus, dass jemand viel redet, ohne auf den Punkt zu kommen — ein klassischer hessischer Vorwurf.',
      beispiel: 'Tu ned so lang rumbabbele, komm zur Sach!',
      beispiel_hd: 'Rede nicht so lange herum, komm zur Sache!',
      kategorie: 'redensart'
    },
    {
      id: 'h-428',
      ausdruck: 'Bub',
      hochdeutsch: 'Junge',
      bedeutung: 'Der „Bub" ist im Hessischen der Junge — ein Wort, das im ganzen süddeutschen Raum verbreitet ist und im Hessischen herzlich klingt. „Der Bub is groß geworde!" stellt man stolz fest. Im Gegensatz zum norddeutschen „Jung" ist der „Bub" tief in der hessischen Sprache verwurzelt und wird liebevoll für Söhne und kleine Jungen verwendet.',
      beispiel: 'Mei Bub geht jetzt schon in die Schul.',
      beispiel_hd: 'Mein Junge geht jetzt schon in die Schule.',
      kategorie: 'familie'
    },
    {
      id: 'h-429',
      ausdruck: 'Mädsche',
      hochdeutsch: 'Mädchen',
      bedeutung: 'Das „Mädsche" ist im Hessischen das Mädchen — mit der typischen Verkleinerungsendung „-sche" statt „-chen". „Des Mädsche is awwer hübsch!" sagt man anerkennend. Die weiche hessische Verkleinerungsform verleiht dem Wort eine besondere Zärtlichkeit und gehört zum Grundvokabular, mit dem man in Hessen über Töchter und kleine Mädchen spricht.',
      beispiel: 'Des klaa Mädsche kann schon laufe.',
      beispiel_hd: 'Das kleine Mädchen kann schon laufen.',
      kategorie: 'familie'
    },
    {
      id: 'h-430',
      ausdruck: 'Gickel',
      hochdeutsch: 'Hahn',
      bedeutung: 'Der „Gickel" ist im Hessischen der Hahn — der morgens auf dem Misthaufen kräht. „Der Gickel weckt des ganze Dorf!" beschwert sich mancher Frühaufsteher unfreiwillig. Das Wort ist in der hessischen Landwirtschaft fest verankert und beschreibt anschaulich, mit dem hellen „i"-Laut, das stolze Federvieh, das den Bauernhof regiert.',
      beispiel: 'Der Gickel kräht jeden Morge um fünfe.',
      beispiel_hd: 'Der Hahn kräht jeden Morgen um fünf.',
      kategorie: 'natur'
    },
    {
      id: 'h-431',
      ausdruck: 'Brieche',
      hochdeutsch: 'Brötchen',
      bedeutung: 'Das „Brieche" ist im Frankfurter Raum das Brötchen — die hessische Verkleinerung des Brotes. „Hol mer beim Bäcker a paar Brieche!" bittet man am Morgen. Frische Brieche zum Frühstück mit Butter und Marmelade gehören zum hessischen Alltag, und der Gang zum Bäcker, um warme Brieche zu holen, ist ein sonntägliches Ritual in vielen Familien.',
      beispiel: 'Zum Frühstück gibts frische Brieche vom Bäcker.',
      beispiel_hd: 'Zum Frühstück gibt es frische Brötchen vom Bäcker.',
      kategorie: 'essen'
    },
    {
      id: 'h-432',
      ausdruck: 'Aameis',
      hochdeutsch: 'Ameise',
      bedeutung: 'Die „Aameis" ist im Hessischen die Ameise — mit der typischen Dehnung des Anlauts zu „Aa". „Im Garte sin überall Aameis!" stellt man fest, wenn die kleinen Krabbler unterwegs sind. Das Wort zeigt schön, wie der hessische Dialekt Vokale dehnt und Konsonanten weicher macht, und gehört zum alltäglichen Naturvokabular.',
      beispiel: 'Die Aameis trage Krümel in ihrn Bau.',
      beispiel_hd: 'Die Ameisen tragen Krümel in ihren Bau.',
      kategorie: 'natur'
    },
    {
      id: 'h-433',
      ausdruck: 'schaffe',
      hochdeutsch: 'arbeiten',
      bedeutung: 'Das hessische „schaffe" bedeutet „arbeiten" — ein Wort, das den Fleiß und die Bodenständigkeit der Hessen ausdrückt. „Ich muss morge schaffe gehe" sagt man ganz selbstverständlich. Anders als das hochdeutsche „schaffen" (im Sinne von erreichen) meint „schaffe" im Hessischen schlicht die tägliche Arbeit und Mühe, mit der man seinen Lebensunterhalt verdient.',
      beispiel: 'Mer müsse hart schaffe für unser Geld.',
      beispiel_hd: 'Wir müssen hart arbeiten für unser Geld.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-434',
      ausdruck: 'Hawwerkaste',
      hochdeutsch: 'unruhiger Mensch / Hektiker',
      bedeutung: 'Ein „Hawwerkaste" (Haferkasten) ist im Hessischen jemand, der ständig zappelt, übermütig oder hektisch ist — vergleichbar mit einem Pferd, das zu viel Hafer bekommen hat. „Bleib mol ruhig, du Hawwerkaste!" sagt man zu einem übermütigen Kind. Das Wort ist bildhaft und liebevoll-spöttisch und beschreibt überschäumende, kaum zu bändigende Energie.',
      beispiel: 'Des Kind is a richticher Hawwerkaste heut!',
      beispiel_hd: 'Das Kind ist heute ein richtiger Wildfang!',
      kategorie: 'menschen'
    },
    {
      id: 'h-435',
      ausdruck: 'Buwwespitzle',
      hochdeutsch: 'Kartoffelnudeln / Schupfnudeln',
      bedeutung: 'Die „Buwwespitzle" (auch Bubenspitzle) sind längliche Kartoffelnudeln aus Kartoffelteig, die in der südhessischen und odenwälderischen Küche beliebt sind. „Heut gibts Buwwespitzle mit Sauerkraut!" freut man sich. Das deftige Gericht gehört zur traditionellen hessischen Hausmannskost und wird gern mit Speck, Zwiebeln oder Sauerkraut serviert.',
      beispiel: 'Die Oma macht die beste Buwwespitzle weit und breit.',
      beispiel_hd: 'Die Oma macht die besten Schupfnudeln weit und breit.',
      kategorie: 'essen'
    },
    {
      id: 'h-436',
      ausdruck: 'aagedotzt',
      hochdeutsch: 'angeschlagen / leicht beschädigt',
      bedeutung: 'Etwas „aagedotzt" ist im Hessischen angeschlagen, leicht beschädigt oder angestoßen — etwa eine Tasse mit einem kleinen Sprung. „Der Teller is a bissje aagedotzt." Auch auf Menschen übertragen kann es bedeuten, dass jemand gesundheitlich nicht ganz auf der Höhe ist. Das Wort beschreibt liebevoll-nachsichtig einen leicht ramponierten Zustand.',
      beispiel: 'Die Vas is aagedotzt, awwer mer kann sie noch nehme.',
      beispiel_hd: 'Die Vase ist angeschlagen, aber man kann sie noch verwenden.',
      kategorie: 'alltag'
    },
    {
      id: 'h-437',
      ausdruck: 'Knaschder',
      hochdeutsch: 'alter, knorriger Mann',
      bedeutung: 'Ein „Knaschder" ist im Hessischen ein alter, knorriger und oft eigensinniger Mann — manchmal auch im Sinne von schlechtem Tabak. „Der alt Knaschder sitzt jeden Tag im selbe Eck." Das Wort ist deftig, aber nicht unbedingt böse gemeint und gehört zur Galerie der hessischen Typenbezeichnungen für die markanten Originale eines jeden Dorfes.',
      beispiel: 'Der alt Knaschder erzählt immer die gleiche Geschichte.',
      beispiel_hd: 'Der alte Knorrige erzählt immer die gleiche Geschichte.',
      kategorie: 'menschen'
    },
    {
      id: 'h-438',
      ausdruck: 'Schnigge',
      hochdeutsch: 'Schnecke',
      bedeutung: 'Die „Schnigge" ist im Hessischen die Schnecke — mit dem typisch weichen „gg" statt „ck". „Nach\'m Rege sin überall Schnigge!" stellt man im Garten fest. Auch übertragen kann man jemanden, der langsam ist, als Schnigge bezeichnen. Das Wort zeigt schön die hessische Vorliebe für weiche Konsonanten und gehört zum alltäglichen Naturwortschatz.',
      beispiel: 'Die Schnigge frisst mer den ganze Salat weg.',
      beispiel_hd: 'Die Schnecke frisst mir den ganzen Salat weg.',
      kategorie: 'natur'
    },
    {
      id: 'h-439',
      ausdruck: 'allaa',
      hochdeutsch: 'allein',
      bedeutung: 'Das hessische „allaa" bedeutet „allein" — das „ei" wird zu einem langen „aa" gedehnt, wie so oft im Dialekt. „Ich bin heut ganz allaa daheim" sagt man. Die Vokaldehnung ist eines der auffälligsten Merkmale des Hessischen und macht aus dem nüchternen „allein" ein weiches, fast melancholisches „allaa", das man sofort als hessisch erkennt.',
      beispiel: 'Des hab ich ganz allaa hingekriegt!',
      beispiel_hd: 'Das habe ich ganz allein hinbekommen!',
      kategorie: 'redensart'
    },
    {
      id: 'h-440',
      ausdruck: 'Bachstelz',
      hochdeutsch: 'lebhaftes, zappeliges Mädchen',
      bedeutung: 'Eine „Bachstelz" ist im Hessischen ein lebhaftes, zappeliges Mädchen, das nicht stillsitzen kann — benannt nach dem Vogel, der ständig mit dem Schwanz wippt. „Die klaa Bachstelz hüpft den ganze Tag rum!" Das Wort ist liebevoll und beschreibt die ungestüme Lebensfreude eines quirligen Kindes, das vor Energie nur so sprüht.',
      beispiel: 'Unser Tochter is a richtige Bachstelz.',
      beispiel_hd: 'Unsere Tochter ist ein richtiger Wirbelwind.',
      kategorie: 'menschen'
    },
    {
      id: 'h-441',
      ausdruck: 'Maad',
      hochdeutsch: 'Mädchen / junge Frau',
      bedeutung: 'Die „Maad" ist im Hessischen ein Mädchen oder eine junge Frau — ein altes Wort, das früher auch die Magd auf dem Bauernhof bezeichnete. „Die Maad is fleißig!" lobt man. Heute hört man es vor allem im ländlichen Hessen, wo es liebevoll und respektvoll für junge Frauen verwendet wird und ein Stück Sprachgeschichte bewahrt.',
      beispiel: 'Die jung Maad hilft im Hof mit.',
      beispiel_hd: 'Die junge Frau hilft im Hof mit.',
      kategorie: 'familie'
    },
    {
      id: 'h-442',
      ausdruck: 'sutsche',
      hochdeutsch: 'langsam / sachte / vorsichtig',
      bedeutung: 'Das hessische „sutsche" bedeutet langsam, sachte oder vorsichtig — man macht etwas ohne Hast. „Mach\'s sutsche!" rät man jemandem, der sich zu sehr beeilt. Das Wort drückt die hessische Gemütlichkeit aus, die Hektik ablehnt und stattdessen für ein bedächtiges, ruhiges Vorgehen plädiert. Sutsche kommt man auch ans Ziel — nur entspannter.',
      beispiel: 'Geh sutsche die Trepp runner, sonst fällste!',
      beispiel_hd: 'Geh langsam die Treppe hinunter, sonst fällst du!',
      kategorie: 'redensart'
    },
    {
      id: 'h-443',
      ausdruck: 'Hutzel',
      hochdeutsch: 'getrocknete Birne / runzelige Frucht',
      bedeutung: 'Eine „Hutzel" ist im Hessischen eine getrocknete Birne oder eine runzelige, eingeschrumpelte Frucht. „Im Winter koche mer Hutzelbrot." Übertragen nennt man auch eine kleine, gebückte alte Person liebevoll „Hutzel". Das Wort ist tief in der ländlichen hessischen Tradition des Obsttrocknens verwurzelt und klingt herrlich altmodisch und gemütlich.',
      beispiel: 'Aus de Hutzel back ich a leckeres Brot.',
      beispiel_hd: 'Aus den Dörrbirnen backe ich ein leckeres Brot.',
      kategorie: 'essen'
    },
    {
      id: 'h-444',
      ausdruck: 'Buddik',
      hochdeutsch: 'kleiner Laden / Bude',
      bedeutung: 'Die „Buddik" (von franz. boutique) ist im Hessischen ein kleiner Laden, ein Kiosk oder eine Bude — oft die Trinkhalle an der Ecke. „Ich geh schnell zur Buddik a Zeitung hole." Das Wort zeigt den französischen Einfluss auf das Hessische und bezeichnet liebevoll den kleinen Eckladen, der zum Treffpunkt der Nachbarschaft geworden ist.',
      beispiel: 'An der Buddik gibts Eis und Zeitunge.',
      beispiel_hd: 'An dem Kiosk gibt es Eis und Zeitungen.',
      kategorie: 'orte'
    },
    {
      id: 'h-445',
      ausdruck: 'Schmu',
      hochdeutsch: 'Betrug / Schwindel',
      bedeutung: 'Der „Schmu" ist im Hessischen ein kleiner Betrug, Schwindel oder Unsinn. „Mach kaa Schmu!" warnt man jemanden, der mogeln will. Das Wort stammt aus dem Rotwelschen und Jiddischen und hat sich im Hessischen fest eingebürgert. Es beschreibt unredliches Verhalten meist im kleineren Rahmen — nicht den großen Betrug, sondern die alltägliche Mogelei.',
      beispiel: 'Bei dem Geschäft is doch Schmu dabei!',
      beispiel_hd: 'Bei dem Geschäft ist doch Schwindel dabei!',
      kategorie: 'redensart'
    },
    {
      id: 'h-446',
      ausdruck: 'Zores',
      hochdeutsch: 'Ärger / Streit',
      bedeutung: 'Der „Zores" ist im Hessischen Ärger, Streit oder Durcheinander. „Mach mer kaan Zores!" bittet man um Ruhe. Das Wort stammt aus dem Jiddischen (zores = Sorgen) und ist besonders im Frankfurter Raum geläufig, wo es über Jahrhunderte ins Hessische eingeflossen ist. Es beschreibt anschaulich jeden Wirbel und jede Aufregung, die einem das Leben schwer macht.',
      beispiel: 'Ich will kaan Zores, lass uns vernünftig rede.',
      beispiel_hd: 'Ich will keinen Ärger, lass uns vernünftig reden.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-447',
      ausdruck: 'Maloche',
      hochdeutsch: 'harte Arbeit / Schufterei',
      bedeutung: 'Die „Maloche" ist im Hessischen die harte, schwere Arbeit, die Schufterei. „Des war heut a echte Maloche!" stöhnt man nach einem anstrengenden Tag. Das Wort kommt aus dem Jiddischen (melocho = Arbeit) und ist im Rhein-Main-Gebiet weit verbreitet. Es drückt anerkennend aus, dass jemand körperlich richtig hart gearbeitet und sich abgeplagt hat.',
      beispiel: 'Nach der Maloche schmeckt der Schoppe doppelt gut.',
      beispiel_hd: 'Nach der Schufterei schmeckt der Apfelwein doppelt gut.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-448',
      ausdruck: 'Reibekuche',
      hochdeutsch: 'Kartoffelpuffer / Reibeplätzchen',
      bedeutung: 'Die „Reibekuche" sind im Hessischen Kartoffelpuffer aus geriebenen rohen Kartoffeln, die in der Pfanne goldbraun gebraten werden. „Zur Kerb gibts Reibekuche mit Apfelmus!" Das deftige Gericht ist auf Festen und Märkten beliebt und gehört zur hessischen Küche. Frisch aus der Pfanne, knusprig und herzhaft, sind Reibekuche ein wahrer Volksgenuss.',
      beispiel: 'Die Reibekuche schmecke am beste mit Apfelmus.',
      beispiel_hd: 'Die Kartoffelpuffer schmecken am besten mit Apfelmus.',
      kategorie: 'essen'
    },
    {
      id: 'h-449',
      ausdruck: 'Plärre',
      hochdeutsch: 'laut weinen / schreien',
      bedeutung: 'Das hessische „plärre" bedeutet laut weinen, schreien oder herumheulen — meist auf Kinder bezogen. „Hör uff zu plärre!" sagt man zu einem weinenden Kind. Das Wort ist lautmalerisch und beschreibt anschaulich das anhaltende, laute Geheul. Es kann auch für übertrieben lautes Reden oder Plärren aus dem Radio verwendet werden und klingt leicht genervt.',
      beispiel: 'Des Bobbelsche tut die ganze Nacht plärre.',
      beispiel_hd: 'Das Baby weint die ganze Nacht.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-450',
      ausdruck: 'Schubkarsch',
      hochdeutsch: 'Schubkarre',
      bedeutung: 'Der „Schubkarsch" ist im Hessischen die Schubkarre — mit der typisch hessischen Endung „-arsch" statt „-arre". „Hol mer den Schubkarsch ausm Schuppe!" sagt man bei der Gartenarbeit. Das Wort gehört zum bodenständigen Werkzeugvokabular und zeigt, wie der hessische Dialekt selbst alltägliche Geräte mit seiner unverwechselbaren Klangfärbung versieht.',
      beispiel: 'Mit\'m Schubkarsch fahr ich die Erd in de Garte.',
      beispiel_hd: 'Mit der Schubkarre fahre ich die Erde in den Garten.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-451',
      ausdruck: 'Bagaasch',
      hochdeutsch: 'Gesindel / Bagage / Sippschaft',
      bedeutung: 'Die „Bagaasch" ist im Hessischen abwertend die Sippschaft, das Gesindel oder eine unliebsame Gruppe von Leuten — abgeleitet vom französischen „bagage". „Die ganze Bagaasch is gekomme!" sagt man halb spöttisch, halb genervt. Manchmal wird das Wort aber auch augenzwinkernd für die eigene große Verwandtschaft verwendet, die zahlreich zu Besuch erscheint.',
      beispiel: 'Zum Geburtstag kommt die ganze Bagaasch.',
      beispiel_hd: 'Zum Geburtstag kommt die ganze Verwandtschaft.',
      kategorie: 'familie'
    },
    {
      id: 'h-452',
      ausdruck: 'Geseier',
      hochdeutsch: 'Gejammer / sinnloses Gerede',
      bedeutung: 'Das „Geseier" ist im Hessischen langatmiges Gejammer, Gerede oder Geschwätz ohne echten Inhalt. „Hör uff mit dem Geseier!" sagt man genervt. Das Wort stammt aus dem Jiddischen und ist im Frankfurter Raum geläufig. Es beschreibt das endlose Lamentieren und Drumherumreden, bei dem viel gesprochen, aber nichts Wesentliches gesagt wird.',
      beispiel: 'Des ewige Geseier kann ich nimmer höre!',
      beispiel_hd: 'Das ewige Gejammer kann ich nicht mehr hören!',
      kategorie: 'redensart'
    },
    {
      id: 'h-453',
      ausdruck: 'Schlawiner',
      hochdeutsch: 'gerissener Kerl / Schlitzohr',
      bedeutung: 'Ein „Schlawiner" ist im Hessischen ein gerissener, listiger Kerl, der es faustdick hinter den Ohren hat. „Du aler Schlawiner!" sagt man halb tadelnd, halb bewundernd. Das Wort beschreibt jemanden, der mit Charme und List immer einen Vorteil herausschlägt — nicht wirklich bösartig, sondern eher ein durchtriebenes Schlitzohr, dem man nicht ganz trauen darf.',
      beispiel: 'Der Schlawiner hat mer schon widder a Verspreche abgeluchst.',
      beispiel_hd: 'Der Schlawiner hat mir schon wieder ein Versprechen abgeluchst.',
      kategorie: 'menschen'
    },
    {
      id: 'h-454',
      ausdruck: 'Gickelhahn',
      hochdeutsch: 'aufgeregter / streitsüchtiger Mensch',
      bedeutung: 'Ein „Gickelhahn" ist im Hessischen ein aufbrausender, streitsüchtiger Mensch, der schnell in die Höhe geht — wie ein kampflustiger Hahn. „Sei ned so a Gickelhahn!" beruhigt man jemanden. Das Wort verbindet den „Gickel" (Hahn) mit dem kämpferischen Wesen und beschreibt anschaulich einen reizbaren Zeitgenossen, der bei jeder Kleinigkeit den Kamm schwellen lässt.',
      beispiel: 'Der Nachbar is a echter Gickelhahn, immer am Streite.',
      beispiel_hd: 'Der Nachbar ist ein echter Streithahn, immer am Streiten.',
      kategorie: 'menschen'
    },
    {
      id: 'h-455',
      ausdruck: 'Quatschkopp',
      hochdeutsch: 'Schwätzer / jemand der Unsinn redet',
      bedeutung: 'Ein „Quatschkopp" ist im Hessischen jemand, der viel Unsinn und dummes Zeug redet. „Du aler Quatschkopp!" sagt man liebevoll-spöttisch. Das Wort verbindet „Quatsch" mit „Kopp" (Kopf) und ist im ganzen mitteldeutschen Raum verbreitet. Es ist selten wirklich böse gemeint und gehört zu den gutmütigen hessischen Bezeichnungen für einen geschwätzigen Zeitgenossen.',
      beispiel: 'Glaab dem Quatschkopp doch kaa Wort!',
      beispiel_hd: 'Glaub dem Schwätzer doch kein Wort!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-456',
      ausdruck: 'Boltze',
      hochdeutsch: 'Bolzen / kräftiger Schuss',
      bedeutung: 'Ein „Boltze" ist im hessischen Fußballjargon ein kräftiger, harter Schuss aufs Tor — abgeleitet vom Bolzen. „Was a Boltze!" ruft man begeistert, wenn der Stürmer den Ball wuchtig ins Netz drischt. Auch das wilde Fußballspielen auf dem Bolzplatz nennt man „boltze". Das Wort gehört zum Sportvokabular besonders der Eintracht-Fans im Stadion.',
      beispiel: 'Der hat den Ball mit\'m echte Boltze rein gehaue!',
      beispiel_hd: 'Der hat den Ball mit einem echten Bolzen reingehauen!',
      kategorie: 'sport'
    },
    {
      id: 'h-457',
      ausdruck: 'Kappes',
      hochdeutsch: 'Kohl / Unsinn',
      bedeutung: 'Der „Kappes" ist im Hessischen einerseits der Weißkohl, andererseits übertragen der Unsinn oder Quatsch. „Red kaan Kappes!" entspricht „Red keinen Unsinn!". Das Wort kommt vom lateinischen „caput" über das Rheinische ins Hessische. In der Küche meint Kappes den Kohl, im Alltag aber meistens das dumme Gerede, das man nicht ernst nehmen sollte.',
      beispiel: 'Des is doch alles Kappes, was der erzählt!',
      beispiel_hd: 'Das ist doch alles Unsinn, was der erzählt!',
      kategorie: 'redensart'
    },
    {
      id: 'h-458',
      ausdruck: 'Schluri',
      hochdeutsch: 'unordentlicher / nachlässiger Mensch',
      bedeutung: 'Ein „Schluri" ist im Hessischen ein nachlässiger, unordentlicher oder unzuverlässiger Mensch, der alles schludrig macht. „Der Schluri hat\'s widder ned fertig gemacht!" Das Wort drückt milden Tadel aus über jemanden, der es mit der Sorgfalt und Pünktlichkeit nicht so genau nimmt. Ein Schluri ist nicht bösartig, nur eben liederlich und unzuverlässig.',
      beispiel: 'So a Schluri, der räumt nie hinter sich uff!',
      beispiel_hd: 'So ein Schludrian, der räumt nie hinter sich auf!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-459',
      ausdruck: 'Schmackeduzje',
      hochdeutsch: 'kleiner Schlag / Klaps',
      bedeutung: 'Ein „Schmackeduzje" ist im hessischen Raum ein kleiner, leichter Schlag oder Klaps — meist liebevoll oder zur sanften Ermahnung. „Wenn de ned hörst, gibt\'s a Schmackeduzje!" droht man scherzhaft. Das Wort verbindet „Schmackes" (Wucht) mit einer Verkleinerung und beschreibt anschaulich den ganz leichten Klaps, der mehr Geste als wirkliche Strafe ist.',
      beispiel: 'Gleich gibt\'s a Schmackeduzje, wenn de frech wirst!',
      beispiel_hd: 'Gleich gibt es einen Klaps, wenn du frech wirst!',
      kategorie: 'koerper'
    },
    {
      id: 'h-460',
      ausdruck: 'Babbschachtel',
      hochdeutsch: 'geschwätzige Person / Plappermaul',
      bedeutung: 'Eine „Babbschachtel" ist im Hessischen ein geschwätziger Mensch, ein Plappermaul, das ununterbrochen redet. „Die alt Babbschachtel weiß alles vom ganze Dorf!" Das Wort verbindet „babbe" (reden) mit „Schachtel" und ist liebevoll-spöttisch gemeint. Es bezeichnet jemanden, meist eine Frau, die gern und viel klatscht und über alles und jeden Bescheid weiß.',
      beispiel: 'Erzähl der Babbschachtel nix, des weiß sonst gleich jeder!',
      beispiel_hd: 'Erzähl dem Plappermaul nichts, das weiß sonst gleich jeder!',
      kategorie: 'menschen'
    },
    {
      id: 'h-461',
      ausdruck: 'Quetschekommod',
      hochdeutsch: 'Akkordeon / Ziehharmonika',
      bedeutung: 'Die „Quetschekommod" ist die scherzhaft-hessische Bezeichnung für das Akkordeon oder die Ziehharmonika — weil man sie zum Spielen zusammenquetscht. „Bei der Kerb spielt aaner die Quetschekommod!" Das Instrument gehört zur hessischen Volksmusik und sorgt auf Festen für Stimmung. Der bildhafte Name beschreibt liebevoll-humorvoll die ausgezogene und zusammengedrückte Balgmechanik.',
      beispiel: 'Uff\'m Fest spielt der Schorsch die Quetschekommod.',
      beispiel_hd: 'Auf dem Fest spielt der Georg das Akkordeon.',
      kategorie: 'musik'
    },
    {
      id: 'h-462',
      ausdruck: 'Gusche',
      hochdeutsch: 'Mund / Maul',
      bedeutung: 'Die „Gusche" ist im Hessischen derb für den Mund oder das Maul. „Halt die Gusche!" ist eine deftige Aufforderung zu schweigen. Das Wort ist im mitteldeutschen Raum verbreitet und drückt je nach Tonfall Ärger oder grobe Vertrautheit aus. „Mach die Gusche uff!" kann auch heißen, dass jemand endlich etwas sagen soll, statt zu schweigen.',
      beispiel: 'Jetzt halt emol die Gusche und lass mich ausrede!',
      beispiel_hd: 'Jetzt halt mal den Mund und lass mich ausreden!',
      kategorie: 'koerper'
    },
    {
      id: 'h-463',
      ausdruck: 'pussiere',
      hochdeutsch: 'flirten / turteln',
      bedeutung: 'Das hessische „pussiere" bedeutet flirten, turteln oder eine Liebelei haben — abgeleitet vom französischen „pousser". „Die zwaa pussiere schon a Weil!" stellt man schmunzelnd fest. Das Wort ist altmodisch-charmant und beschreibt das Anbandeln und verliebte Tändeln junger Leute. Es klingt herrlich nostalgisch und gehört zur hessischen Sprache der Herzensangelegenheiten.',
      beispiel: 'Der Bub un des Mädsche pussiere am Gartezaun.',
      beispiel_hd: 'Der Junge und das Mädchen turteln am Gartenzaun.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-464',
      ausdruck: 'Schmalznudel',
      hochdeutsch: 'Schmalzgebäck / Krapfen',
      bedeutung: 'Die „Schmalznudel" ist im Hessischen ein in Schmalz oder Fett ausgebackenes Hefegebäck, ähnlich einem Krapfen oder Auszogenen. „Zur Kerb gibts frische Schmalznudel!" Das süße Gebäck wird oft mit Zucker bestreut und gehört zum traditionellen hessischen Festgebäck. Warm aus der Pfanne ist die Schmalznudel ein Hochgenuss auf jedem Jahrmarkt und Volksfest.',
      beispiel: 'Die Schmalznudel uff\'m Markt sin himmlisch!',
      beispiel_hd: 'Das Schmalzgebäck auf dem Markt ist himmlisch!',
      kategorie: 'essen'
    },
    {
      id: 'h-465',
      ausdruck: 'Stuss',
      hochdeutsch: 'Unsinn / dummes Zeug',
      bedeutung: 'Der „Stuss" ist im Hessischen Unsinn, dummes Zeug oder Quatsch. „Erzähl kaan Stuss!" entspricht „Red keinen Unsinn!". Das Wort stammt aus dem Jiddischen und ist im Frankfurter Raum besonders geläufig. Es bezeichnet alles Unsinnige und Sinnlose und wird im Alltag häufig verwendet, um eine abwegige Behauptung oder einen dummen Plan kurz und bündig abzutun.',
      beispiel: 'Was du da redest, is doch der größte Stuss!',
      beispiel_hd: 'Was du da redest, ist doch der größte Unsinn!',
      kategorie: 'redensart'
    },
    {
      id: 'h-466',
      ausdruck: 'Heckewirtschaft',
      hochdeutsch: 'saisonale Straußwirtschaft',
      bedeutung: 'Eine „Heckewirtschaft" (auch Besenwirtschaft) ist im Rheingau und in hessischen Weingegenden eine saisonale Straußwirtschaft, in der Winzer ihren eigenen Wein und einfache Speisen ausschenken. „Mer gehn heut Owend in die Heckewirtschaft!" Erkennbar ist sie am ausgehängten Kranz oder Besen. Die gemütliche Heckewirtschaft ist ein beliebter Treffpunkt zur Weinlese-Zeit.',
      beispiel: 'In der Heckewirtschaft gibts den neue Wein.',
      beispiel_hd: 'In der Straußwirtschaft gibt es den neuen Wein.',
      kategorie: 'orte'
    },
    {
      id: 'h-467',
      ausdruck: 'Hannüberschwer',
      hochdeutsch: 'sehr schwer / kaum zu heben',
      bedeutung: 'Etwas, das „hannübersch schwer" oder „hannüberschwer" ist, ist im Hessischen außerordentlich schwer und kaum zu heben. „Der Sack is ja hannüberschwer!" stöhnt man. Die hessische Verstärkung übertreibt anschaulich das Gewicht. Das Wort gehört zu den ausdrucksstarken Steigerungen, mit denen Hessen die Anstrengung beim Tragen oder Heben drastisch unterstreichen.',
      beispiel: 'Der Kaste mit de Bembel is hannüberschwer!',
      beispiel_hd: 'Der Kasten mit den Bembeln ist unglaublich schwer!',
      kategorie: 'alltag'
    },
    {
      id: 'h-468',
      ausdruck: 'verbabbele',
      hochdeutsch: 'sich verplappern / verraten',
      bedeutung: 'Sich „verbabbele" bedeutet im Hessischen, sich zu verplappern und unabsichtlich ein Geheimnis auszuplaudern. „Jetzt hab ich mich verbabbelt!" ärgert man sich, wenn einem etwas herausgerutscht ist. Das Wort baut auf „babbe" (reden) auf und beschreibt das Missgeschick, vor lauter Reden etwas zu verraten, das eigentlich hätte geheim bleiben sollen.',
      beispiel: 'Pass uff, dass de dich ned verbabbelst!',
      beispiel_hd: 'Pass auf, dass du dich nicht verplapperst!',
      kategorie: 'redensart'
    },
    {
      id: 'h-469',
      ausdruck: 'Knöllsche',
      hochdeutsch: 'Strafzettel / Knöllchen',
      bedeutung: 'Das „Knöllsche" ist im Hessischen das Knöllchen, also der Strafzettel fürs Falschparken. „Schon widder a Knöllsche an de Scheib!" ärgert man sich. Mit der typischen hessischen Verkleinerungsendung „-sche" klingt selbst der ärgerliche Strafzettel fast harmlos. Das Wort gehört zum modernen Alltagsvokabular der Stadt und sorgt regelmäßig für Verdruss bei Autofahrern.',
      beispiel: 'Ich hab a Knöllsche kriegt, weil ich falsch geparkt hab.',
      beispiel_hd: 'Ich habe einen Strafzettel bekommen, weil ich falsch geparkt habe.',
      kategorie: 'alltag'
    },
    {
      id: 'h-470',
      ausdruck: 'Schmeißfliesch',
      hochdeutsch: 'Schmeißfliege',
      bedeutung: 'Die „Schmeißfliesch" ist im Hessischen die Schmeißfliege — die dicke, brummende Fliege, die im Sommer ums Essen kreist. „Mach\'s Fenster zu, sonst kommt die Schmeißfliesch rein!" Mit dem typisch hessischen „sch" statt „g" klingt das lästige Insekt gleich noch ekliger. Das Wort gehört zum sommerlichen Alltagsvokabular und ruft bei jedem sofort ein genervtes Gefühl hervor.',
      beispiel: 'Die Schmeißfliesch summt schon de ganze Tag rum.',
      beispiel_hd: 'Die Schmeißfliege summt schon den ganzen Tag herum.',
      kategorie: 'natur'
    },
    {
      id: 'h-471',
      ausdruck: 'Plärrkopp',
      hochdeutsch: 'Schreihals / weinerliches Kind',
      bedeutung: 'Ein „Plärrkopp" ist im Hessischen ein Schreihals oder ein weinerliches Kind, das viel heult und jammert. „Sei doch kaa Plärrkopp!" tröstet und tadelt man zugleich. Das Wort verbindet „plärre" (weinen) mit „Kopp" (Kopf) und ist liebevoll-spöttisch gemeint. Es beschreibt anschaulich ein Kind, das bei jeder Kleinigkeit gleich in Tränen ausbricht.',
      beispiel: 'Unser Klaaner is heut a richticher Plärrkopp.',
      beispiel_hd: 'Unser Kleiner ist heute ein richtiger Schreihals.',
      kategorie: 'menschen'
    },
    {
      id: 'h-472',
      ausdruck: 'Schissmelina',
      hochdeutsch: 'ängstlicher Mensch / Angsthase',
      bedeutung: 'Eine „Schissmelina" ist im Hessischen ein ängstlicher Mensch, ein Angsthase, der sich vor allem fürchtet. „Sei kaa Schissmelina, des is doch ned gefährlich!" mutigt man jemanden auf. Das deftige, humorvolle Wort verbindet derbe Vulgärsprache mit einem Frauennamen und ist liebevoll-spöttisch gemeint. Es ist ein Klassiker unter den hessischen Bezeichnungen für Hasenfüße.',
      beispiel: 'Trau dich endlich, du klaa Schissmelina!',
      beispiel_hd: 'Trau dich endlich, du kleiner Angsthase!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-473',
      ausdruck: 'Owacht',
      hochdeutsch: 'Acht / Vorsicht',
      bedeutung: 'Das hessische „Owacht" bedeutet Acht oder Vorsicht — man gibt „Owacht", wenn man aufpasst. „Gib Owacht, dass de ned hinfällst!" warnt man fürsorglich. Das Wort ist eine dialektale Form von „Obacht" und gehört zum alltäglichen Wortschatz der Fürsorge und Warnung. Wer in Hessen Owacht gibt, ist achtsam und passt gut auf sich und andere auf.',
      beispiel: 'Gib Owacht beim Überquere von der Straß!',
      beispiel_hd: 'Gib Acht beim Überqueren der Straße!',
      kategorie: 'alltag'
    },
    {
      id: 'h-474',
      ausdruck: 'Hannekloppes',
      hochdeutsch: 'einfältiger Mensch / Dummkopf',
      bedeutung: 'Ein „Hannekloppes" ist im Frankfurter Raum ein einfältiger, tölpelhafter Mensch — ein liebevoll-spöttisches Schimpfwort für jemanden, der nicht der Hellste ist. „So a Hannekloppes!" sagt man kopfschüttelnd. Das Wort gehört zu den traditionellen hessischen Typenbezeichnungen und ist selten wirklich böse, sondern beschreibt mit augenzwinkerndem Spott den begriffsstutzigen Zeitgenossen.',
      beispiel: 'Der Hannekloppes hat\'s widder ned kapiert.',
      beispiel_hd: 'Der Tölpel hat es wieder nicht kapiert.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-475',
      ausdruck: 'Kerbeplatz',
      hochdeutsch: 'Kirmesplatz / Festplatz',
      bedeutung: 'Der „Kerbeplatz" ist im Hessischen der Festplatz, auf dem die Kerb (Kirchweih) gefeiert wird — mit Karussells, Bierzelt und Musik. „Treffe mer uns am Kerbeplatz?" Der Kerbeplatz ist das gesellige Zentrum des Dorffestes, wo Jung und Alt zusammenkommen, tanzen und feiern. Er gehört zum festen Bestandteil der hessischen Festkultur und Dorfgemeinschaft.',
      beispiel: 'Am Wochenend is der Kerbeplatz voller Leut.',
      beispiel_hd: 'Am Wochenende ist der Kirmesplatz voller Leute.',
      kategorie: 'feiern'
    },
    {
      id: 'h-476',
      ausdruck: 'gewwe',
      hochdeutsch: 'geben',
      bedeutung: 'Das hessische „gewwe" bedeutet „geben" — das harte „b" wird zum weichen „ww" verschliffen, wie so oft im Dialekt. „Kannste mer mol des Salz gewwe?" bittet man am Tisch. Auch „Was gibt\'s?" wird zu „Was gewwt\'s?". Das Wort gehört zum absoluten Grundwortschatz und zeigt exemplarisch die hessische Konsonantenerweichung, die den Dialekt so weich klingen lässt.',
      beispiel: 'Tu mer mol a Stück Brot gewwe!',
      beispiel_hd: 'Gib mir mal ein Stück Brot!',
      kategorie: 'alltag'
    },
    {
      id: 'h-477',
      ausdruck: 'Schlackes',
      hochdeutsch: 'großer, schlaksiger Mensch',
      bedeutung: 'Ein „Schlackes" ist im Hessischen ein großer, dünner, schlaksiger Mensch mit langen Gliedmaßen. „Der Schlackes muss sich am Türrahme bücke!" sagt man über einen besonders Hochgewachsenen. Das Wort ist liebevoll-spöttisch und beschreibt anschaulich die hagere, aufgeschossene Gestalt. Ein Schlackes überragt alle und wirkt mit seinen langen Armen und Beinen oft etwas linkisch.',
      beispiel: 'Der lang Schlackes spielt bestimmt gut Baskeball.',
      beispiel_hd: 'Der lange Schlaks spielt bestimmt gut Basketball.',
      kategorie: 'koerper'
    },
    {
      id: 'h-478',
      ausdruck: 'Bembelrunde',
      hochdeutsch: 'gesellige Apfelweinrunde',
      bedeutung: 'Die „Bembelrunde" ist im Hessischen die gesellige Runde, die sich um einen Bembel Apfelwein versammelt und zusammen trinkt, babbelt und lacht. „Heut Owend treffe mer uns zur Bembelrunde!" Es ist eine fest etablierte Form hessischer Geselligkeit, bei der der Bembel von Hand zu Hand geht und die Gläser immer wieder neu gefüllt werden. Gemütlichkeit pur.',
      beispiel: 'In der Bembelrunde wird viel gelacht und gebabbelt.',
      beispiel_hd: 'In der Apfelweinrunde wird viel gelacht und geredet.',
      kategorie: 'feiern'
    },
    {
      id: 'h-479',
      ausdruck: 'verkasematuckeln',
      hochdeutsch: 'erklären / verständlich machen',
      bedeutung: 'Das hessische „verkasematuckeln" bedeutet, etwas umständlich zu erklären oder verständlich zu machen — manchmal auch im Sinne von verputzen oder aufessen. „Des muss mer mer erst emol verkasematuckeln!" Das herrlich lange, verschnörkelte Wort ist im Frankfurter Raum bekannt und drückt mit humorvoller Ausführlichkeit aus, dass etwas erst gründlich auseinandergesetzt werden muss.',
      beispiel: 'Kannste mer des nochmol verkasematuckeln?',
      beispiel_hd: 'Kannst du mir das nochmal erklären?',
      kategorie: 'redensart'
    },
    {
      id: 'h-480',
      ausdruck: 'Schoppestecher',
      hochdeutsch: 'eingefleischter Apfelweintrinker',
      bedeutung: 'Ein „Schoppestecher" ist im Hessischen ein passionierter Apfelweintrinker, der gern und regelmäßig sein Schoppe Ebbelwoi „sticht". „Der alt Schoppestecher kennt jede Wertschaft in Sachsenhause!" Das Wort beschreibt anerkennend-spöttisch den Stammgast, für den der Apfelwein zum Lebenselixier gehört und der die hessische Trinkkultur in Perfektion verkörpert.',
      beispiel: 'Mei Opa war a echter Schoppestecher sei Lebe lang.',
      beispiel_hd: 'Mein Opa war ein echter Apfelweintrinker sein Leben lang.',
      kategorie: 'menschen'
    },
    {
      id: 'h-481',
      ausdruck: 'Dippcher',
      hochdeutsch: 'kleine Töpfchen',
      bedeutung: 'Die „Dippcher" sind im Hessischen kleine Töpfchen — die Verkleinerung von „Dippe" (Topf). „Stell die Dippcher mit der Marmelad in de Schrank!" sagt man. Die kleinen Dippcher werden für Eingemachtes, Gewürze oder Marmelade verwendet. Mit der hessischen Verkleinerungsform „-cher" klingen selbst die alltäglichen Küchengefäße liebevoll und gemütlich.',
      beispiel: 'In de Dippcher tu ich mei selbstgemachte Marmelad.',
      beispiel_hd: 'In die Töpfchen fülle ich meine selbstgemachte Marmelade.',
      kategorie: 'essen'
    },
    {
      id: 'h-482',
      ausdruck: 'oogucke',
      hochdeutsch: 'anschauen / ansehen',
      bedeutung: 'Das hessische „oogucke" bedeutet „anschauen" oder „ansehen" — das „an" wird zu „oo" verschliffen. „Guck der des mol oo!" fordert man jemanden auf, etwas zu betrachten. Das Wort gehört zum alltäglichen Grundwortschatz und zeigt die typische hessische Verschleifung der Vorsilbe „an". Wer in Hessen etwas oogucke will, will es sich genau und in Ruhe ansehen.',
      beispiel: 'Komm, mer gehn uns die neue Wohnung oogucke!',
      beispiel_hd: 'Komm, wir gehen uns die neue Wohnung ansehen!',
      kategorie: 'alltag'
    },
    {
      id: 'h-483',
      ausdruck: 'Schnorres',
      hochdeutsch: 'Schnurrbart',
      bedeutung: 'Der „Schnorres" ist im Hessischen der Schnurrbart — der Oberlippenbart, den mancher Hesse mit Stolz trägt. „Der hat sich a stattliche Schnorres wachse lasse!" Das Wort ist liebevoll-spöttisch und gehört zum hessischen Körpervokabular. Ein gepflegter Schnorres galt früher als Zeichen von Männlichkeit, und der Begriff klingt herrlich urig und bodenständig.',
      beispiel: 'Der Wirt hat a mächtiche Schnorres unter der Nas.',
      beispiel_hd: 'Der Wirt hat einen mächtigen Schnurrbart unter der Nase.',
      kategorie: 'koerper'
    },
    {
      id: 'h-484',
      ausdruck: 'Stippche',
      hochdeutsch: 'kleiner Augenblick / Moment',
      bedeutung: 'Ein „Stippche" ist im Hessischen ein kurzer Augenblick, ein winziger Moment. „Wart a Stippche, ich komm gleich!" sagt man, wenn man jemanden um etwas Geduld bittet. Das Wort mit der zärtlichen Verkleinerungsendung beschreibt eine ganz kleine Zeitspanne und gehört zum charmanten hessischen Zeitvokabular. Ein Stippche dauert nur einen Wimpernschlag.',
      beispiel: 'Gib mer a Stippche, dann bin ich fertig.',
      beispiel_hd: 'Gib mir einen kleinen Moment, dann bin ich fertig.',
      kategorie: 'redensart'
    },
    {
      id: 'h-485',
      ausdruck: 'Schtumbe',
      hochdeutsch: 'Stoß / Schubs',
      bedeutung: 'Ein „Schtumbe" ist im Hessischen ein Stoß oder Schubs, den man jemandem gibt. „Gib mer kaan Schtumbe, ich fall sonst!" warnt man. Das Wort beschreibt den leichten oder kräftigen Anstoß mit der typischen hessischen Aussprache. Ein Schtumbe kann freundschaftlich gemeint sein oder aus Versehen passieren, wenn es im Gedränge mal eng wird.',
      beispiel: 'Im Gedräng hat mer aaner a Schtumbe gegewwe.',
      beispiel_hd: 'Im Gedränge hat mir einer einen Stoß gegeben.',
      kategorie: 'koerper'
    },
    {
      id: 'h-486',
      ausdruck: 'Mauke',
      hochdeutsch: 'Kartoffelbrei / Püree',
      bedeutung: 'Die „Mauke" ist im nord- und osthessischen Raum der Kartoffelbrei oder das Kartoffelpüree. „Heut gibts Bratwurst mit Mauke!" freut man sich. Das deftige Gericht gehört zur traditionellen hessischen Hausmannskost und wird gern mit Soße, Würstchen oder Sauerkraut serviert. Die cremige Mauke ist ein Klassiker, der auf vielen hessischen Mittagstischen zu finden ist.',
      beispiel: 'Zu de Klöß schmeckt a Portion Mauke prima.',
      beispiel_hd: 'Zu den Klößen schmeckt eine Portion Kartoffelbrei prima.',
      kategorie: 'essen'
    },
    {
      id: 'h-487',
      ausdruck: 'Schlawittche',
      hochdeutsch: 'Kragen / Genick (jemanden packen)',
      bedeutung: 'Das „Schlawittche" meint im Hessischen den Kragen oder das Genick — meist in der Wendung „aaner am Schlawittche packe", also jemanden am Kragen fassen. „Pack ihn am Schlawittche!" sagt man. Das urige Wort beschreibt bildhaft das energische Zupacken und gehört zu den ausdrucksstarken hessischen Redewendungen, die eine handfeste, beherzte Geste anschaulich machen.',
      beispiel: 'Der Lehrer hat de Strolch am Schlawittche genomme.',
      beispiel_hd: 'Der Lehrer hat den Lausbub am Kragen genommen.',
      kategorie: 'koerper'
    },
    {
      id: 'h-488',
      ausdruck: 'Bachegucker',
      hochdeutsch: 'neugieriger Mensch / Gaffer',
      bedeutung: 'Ein „Bachegucker" ist im hessischen Raum ein neugieriger Mensch, der überall hinschaut und seine Nase in alles steckt — ein Gaffer, der nichts verpassen will. „Die alte Bachegucker stehe schon am Fenster!" Das Wort beschreibt liebevoll-spöttisch die Schaulustigen, die bei jedem Ereignis im Dorf sofort zur Stelle sind und alles ganz genau beobachten müssen.',
      beispiel: 'Bei jedem Unfall sammle sich gleich die Bachegucker.',
      beispiel_hd: 'Bei jedem Unfall sammeln sich gleich die Gaffer.',
      kategorie: 'menschen'
    },
    {
      id: 'h-489',
      ausdruck: 'Brimborium',
      hochdeutsch: 'unnötiger Aufwand / Getue',
      bedeutung: 'Das „Brimborium" ist im Hessischen unnötiges Getue, übertriebener Aufwand oder Drumherum um eine eigentlich einfache Sache. „Mach ned so a Brimborium drum!" winkt man ab. Das Wort stammt aus dem Französischen und ist im Hessischen geläufig. Es beschreibt den ganzen überflüssigen Zinnober und das Theater, das manche Leute um Belanglosigkeiten veranstalten.',
      beispiel: 'Wege so ner Klaanigkeit a solches Brimborium!',
      beispiel_hd: 'Wegen so einer Kleinigkeit ein solches Getue!',
      kategorie: 'redensart'
    },
    {
      id: 'h-490',
      ausdruck: 'Schmeicheltäschsche',
      hochdeutsch: 'Schmeichler / Schleimer',
      bedeutung: 'Ein „Schmeicheltäschsche" ist im Hessischen ein Mensch, der gern schmeichelt und sich einschmeichelt, um etwas zu erreichen. „Du klaa Schmeicheltäschsche, was willste denn?" sagt man halb amüsiert. Das Wort ist liebevoll-spöttisch und beschreibt mit der hessischen Verkleinerungsform den charmanten Schleimer, der mit honigsüßen Worten sein Ziel zu erreichen versucht.',
      beispiel: 'Des Schmeicheltäschsche will bestimmt widder ebbes habe.',
      beispiel_hd: 'Der Schmeichler will bestimmt wieder etwas haben.',
      kategorie: 'menschen'
    },
    {
      id: 'h-491',
      ausdruck: 'Worschtsupp',
      hochdeutsch: 'Wurstsuppe / Schlachtbrühe',
      bedeutung: 'Die „Worschtsupp" ist im Hessischen die Wurstsuppe oder Schlachtbrühe, die beim Hausschlachten entsteht, wenn die Würste im Kessel gekocht werden. „Beim Schlachtfest gibts frische Worschtsupp!" Die kräftige, herzhafte Brühe ist eine ländliche Spezialität und gehört zur Tradition der hessischen Hausschlachtung. Mit etwas Brot serviert, wärmt sie an kalten Tagen herrlich von innen.',
      beispiel: 'Nach\'m Schlachte gibts a deftige Worschtsupp.',
      beispiel_hd: 'Nach dem Schlachten gibt es eine deftige Wurstsuppe.',
      kategorie: 'essen'
    },
    {
      id: 'h-492',
      ausdruck: 'fott',
      hochdeutsch: 'fort / weg',
      bedeutung: 'Das hessische „fott" bedeutet „fort" oder „weg" — mit dem typisch weichen Doppel-„t". „Der is schon fott!" sagt man, wenn jemand bereits gegangen ist. Auch „Geh fott!" bedeutet „Geh weg!" oder drückt ungläubiges Erstaunen aus. Das Wort gehört zum hessischen Grundwortschatz und zeigt die charakteristische Lautverschiebung von „fort" zum knappen, runden „fott".',
      beispiel: 'Wo is denn mei Schlüssel fott?',
      beispiel_hd: 'Wo ist denn mein Schlüssel hin?',
      kategorie: 'alltag'
    },
    {
      id: 'h-493',
      ausdruck: 'Schubbser',
      hochdeutsch: 'kleiner Stoß / Anstoß',
      bedeutung: 'Ein „Schubbser" ist im Hessischen ein kleiner Stoß oder Anstoß, ein freundlicher Schubs. „Gib mer a Schubbser, dann komm ich übern Zaun!" Das Wort beschreibt mit der hessischen Verdopplung des „b" den leichten Anstoß, der jemandem hilft oder ihn antreibt. Auch im übertragenen Sinn kann ein Schubbser eine kleine Ermutigung sein, etwas endlich anzupacken.',
      beispiel: 'Mit a klaane Schubbser hat er\'s dann geschafft.',
      beispiel_hd: 'Mit einem kleinen Anstoß hat er es dann geschafft.',
      kategorie: 'koerper'
    },
    {
      id: 'h-494',
      ausdruck: 'Wingert',
      hochdeutsch: 'Weinberg',
      bedeutung: 'Der „Wingert" ist im Rheingau und in hessischen Weingegenden der Weinberg, in dem die Reben wachsen. „Mir schaffe heut im Wingert!" sagt der Winzer zur Lesezeit. Das alte Wort stammt aus dem Lateinischen (vinea) und ist tief in der hessischen Weinkultur verwurzelt. Im Herbst werden in den steilen Wingerten am Rhein die Trauben für den berühmten Riesling geerntet.',
      beispiel: 'Im Herbst is im Wingert die meiste Arbeit.',
      beispiel_hd: 'Im Herbst ist im Weinberg die meiste Arbeit.',
      kategorie: 'natur'
    },
    {
      id: 'h-495',
      ausdruck: 'Schunkelliedsche',
      hochdeutsch: 'Schunkellied / Stimmungslied',
      bedeutung: 'Ein „Schunkelliedsche" ist im Hessischen ein fröhliches Stimmungslied, zu dem man sich unterhakt und im Takt hin und her schunkelt. „Spiel a Schunkelliedsche!" ruft man dem Musiker auf der Kerb zu. Solche Lieder gehören zur hessischen Fest- und Wirtshauskultur und sorgen für ausgelassene Stimmung, wenn die ganze Runde Arm in Arm im Takt mitwiegt und mitsingt.',
      beispiel: 'Bei dem Schunkelliedsche hält\'s kaan mehr uff\'m Stuhl.',
      beispiel_hd: 'Bei dem Schunkellied hält es keinen mehr auf dem Stuhl.',
      kategorie: 'musik'
    },
    {
      id: 'h-496',
      ausdruck: 'Krawwel',
      hochdeutsch: 'Gekrabbel / Wirrwarr / Durcheinander',
      bedeutung: 'Der „Krawwel" ist im Hessischen ein Durcheinander, Gewimmel oder Wirrwarr — etwa wenn viele Leute durcheinanderlaufen. „Was is denn des für a Krawwel?" fragt man verwirrt. Das Wort beschreibt anschaulich das unübersichtliche Gewusel und Krabbeln und gehört zum hessischen Vokabular für chaotische Situationen, in denen man kaum noch durchblickt.',
      beispiel: 'Uff\'m Markt is heut a richticher Krawwel.',
      beispiel_hd: 'Auf dem Markt ist heute ein richtiges Gewimmel.',
      kategorie: 'alltag'
    },
    {
      id: 'h-497',
      ausdruck: 'Schnüffche',
      hochdeutsch: 'Schnäuzchen / Näschen',
      bedeutung: 'Das „Schnüffche" ist im Hessischen das kleine Näschen oder Schnäuzchen — meist liebevoll auf Kinder oder Tiere bezogen. „Putz dir dei Schnüffche!" sagt man zärtlich zum erkälteten Kind. Mit der hessischen Verkleinerungsendung klingt das Wort herzlich und gehört zum liebevollen Körpervokabular, mit dem Eltern und Großeltern über ihre Kleinen sprechen.',
      beispiel: 'Des Bobbelsche hat a rotes Schnüffche vom Schnupfe.',
      beispiel_hd: 'Das Baby hat ein rotes Näschen vom Schnupfen.',
      kategorie: 'koerper'
    },
    {
      id: 'h-498',
      ausdruck: 'Latschari',
      hochdeutsch: 'langsamer / träger Mensch',
      bedeutung: 'Ein „Latschari" ist im hessischen Raum ein langsamer, träger oder energieloser Mensch, der lustlos herumlatscht. „Beweg dich, du Latschari!" treibt man jemanden an. Das Wort verbindet „latsche" (schlurfen) mit einer scherzhaften Endung und ist liebevoll-spöttisch gemeint. Ein Latschari nimmt das Leben gemächlich und lässt sich von niemandem zur Eile drängen.',
      beispiel: 'Der Latschari kommt immer als Letzter an.',
      beispiel_hd: 'Der Trödler kommt immer als Letzter an.',
      kategorie: 'menschen'
    },
    {
      id: 'h-499',
      ausdruck: 'Quetschelatwerg',
      hochdeutsch: 'Zwetschgenmus / Pflaumenmus',
      bedeutung: 'Das „Quetschelatwerg" ist im Hessischen das Zwetschgenmus oder Pflaumenmus, das aus eingekochten Zwetschgen entsteht. „Aufs Brot streich ich mer Quetschelatwerg!" Das dunkle, süße Mus wird über Stunden eingekocht und ist eine traditionelle hessische Spezialität. „Latwerg" stammt vom lateinischen „electuarium" und zeigt, wie alte Wörter im hessischen Küchenvokabular überdauern.',
      beispiel: 'Frisch Brot mit Quetschelatwerg is a Gedicht!',
      beispiel_hd: 'Frisches Brot mit Pflaumenmus ist ein Gedicht!',
      kategorie: 'essen'
    },
    {
      id: 'h-500',
      ausdruck: 'Bo ey!',
      hochdeutsch: 'Boah! / Wow! (Ausruf)',
      bedeutung: 'Der Ausruf „Bo ey!" ist im hessischen Raum, besonders bei jüngeren Leuten, ein Ausdruck des Staunens, der Begeisterung oder der Empörung. „Bo ey, hast du des gesehe?" Der knappe Ausruf verbindet das gedehnte „Bo" mit dem typischen „ey" und gehört zur lebendigen Alltagssprache der Mainmetropole. Je nach Tonfall drückt er Bewunderung oder Ärger aus.',
      beispiel: 'Bo ey, des is ja der Wahnsinn!',
      beispiel_hd: 'Boah, das ist ja der Wahnsinn!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-501',
      ausdruck: 'Krombeerschnitz',
      hochdeutsch: 'Kartoffelschnitze / Bratkartoffelstücke',
      bedeutung: 'Die „Krombeerschnitz" sind im Hessischen Kartoffelschnitze — in Spalten geschnittene Kartoffeln, die gebraten oder im Ofen gegart werden. „Zu de Worscht gibts Krombeerschnitz!" Das Wort verbindet „Grumbeer/Krombeer" (Kartoffel) mit „Schnitz" (Spalte) und gehört zum bodenständigen hessischen Küchenvokabular. Knusprig gebraten sind die Krombeerschnitz eine beliebte Beilage.',
      beispiel: 'Die Krombeerschnitz ausm Ofe sin schön knusprig.',
      beispiel_hd: 'Die Kartoffelschnitze aus dem Ofen sind schön knusprig.',
      kategorie: 'essen'
    },
    {
      id: 'h-502',
      ausdruck: 'Schääl',
      hochdeutsch: 'schielend / scheel blickend',
      bedeutung: 'Wer „schääl" guckt, schaut im Hessischen schielend, schräg oder misstrauisch — entweder im wörtlichen Sinn oder als neidisch-argwöhnischer Blick. „Was guckst du so schääl?" fragt man. Das Wort beschreibt sowohl ein körperliches Schielen als auch den schiefen, missgünstigen Blick. Mit der gedehnten hessischen Aussprache klingt es besonders ausdrucksvoll und bildhaft.',
      beispiel: 'Guck ned so schääl, ich hab nix gemacht!',
      beispiel_hd: 'Schau nicht so scheel, ich habe nichts gemacht!',
      kategorie: 'koerper'
    },
    {
      id: 'h-503',
      ausdruck: 'Hoschd',
      hochdeutsch: 'Husten',
      bedeutung: 'Der „Hoschd" ist im Hessischen der Husten — mit dem typisch hessischen „sch"-Laut. „Ich hab a fürchterliche Hoschd!" klagt man bei einer Erkältung. Das Wort gehört zum hessischen Gesundheitsvokabular und zeigt schön die charakteristische Lautfärbung. Im Winter geht der Hoschd in vielen hessischen Stuben um, und man kuriert ihn gern mit heißem Tee und Honig.',
      beispiel: 'Mit dem Hoschd bleibste heut besser daheim.',
      beispiel_hd: 'Mit dem Husten bleibst du heute besser zu Hause.',
      kategorie: 'koerper'
    },
    {
      id: 'h-504',
      ausdruck: 'Bremme',
      hochdeutsch: 'Bremse (Insekt)',
      bedeutung: 'Die „Bremme" ist im Hessischen die Bremse — die stechende Fliege, die im Sommer Mensch und Vieh plagt. „Die Bremme beiße heut wie verrückt!" klagt man auf der Weide. Das Wort gehört zum hessischen Naturvokabular und beschreibt das lästige Insekt, dessen schmerzhafter Stich besonders an heißen, schwülen Tagen gefürchtet ist. Mit der weichen Endung klingt sie fast harmlos.',
      beispiel: 'Bei der Hitz fliege die Bremme um die Kuh.',
      beispiel_hd: 'Bei der Hitze fliegen die Bremsen um die Kuh.',
      kategorie: 'natur'
    },
    {
      id: 'h-505',
      ausdruck: 'Stippvisit',
      hochdeutsch: 'kurzer Besuch',
      bedeutung: 'Eine „Stippvisit" ist im Hessischen ein kurzer, schneller Besuch — man schaut nur kurz vorbei. „Ich mach heut nur a Stippvisit bei der Oma." Das Wort verbindet „stippe" (kurz eintauchen) mit „Visite" und beschreibt den flüchtigen Besuch, bei dem man nicht lange bleibt. Eine Stippvisit ist herzlich gemeint, aber zeitlich knapp bemessen.',
      beispiel: 'Komm wenigstens uff a Stippvisit vorbei!',
      beispiel_hd: 'Komm wenigstens auf einen kurzen Besuch vorbei!',
      kategorie: 'alltag'
    },
    {
      id: 'h-506',
      ausdruck: 'Brummbär',
      hochdeutsch: 'mürrischer Mensch / Griesgram',
      bedeutung: 'Ein „Brummbär" ist im Hessischen ein mürrischer, grantiger Mensch, der oft brummt und schlecht gelaunt ist. „Sei doch kaa Brummbär!" muntert man jemanden auf. Das Wort vergleicht den Griesgram liebevoll-spöttisch mit einem brummenden Bären. Hinter der mürrischen Fassade steckt oft ein gutes Herz — der Brummbär ist nicht böse, nur eben grummelig und wortkarg.',
      beispiel: 'Mei Onkel is morgens immer a richticher Brummbär.',
      beispiel_hd: 'Mein Onkel ist morgens immer ein richtiger Griesgram.',
      kategorie: 'menschen'
    },
    {
      id: 'h-507',
      ausdruck: 'Schoppeglas',
      hochdeutsch: 'Apfelweinglas / Geripptes',
      bedeutung: 'Das „Schoppeglas" ist im Hessischen das geriffelte Glas, aus dem man den Apfelwein trinkt — auch „Geripptes" genannt. „Reich mer mol a Schoppeglas!" Die typische Rautenstruktur des Glases reflektiert das Licht und sorgt für besseren Halt mit fettigen Fingern. Das Schoppeglas fasst genau einen Schoppen und gehört untrennbar zur hessischen Apfelweinkultur.',
      beispiel: 'Aus\'m Schoppeglas schmeckt der Ebbelwoi am beste.',
      beispiel_hd: 'Aus dem Apfelweinglas schmeckt der Apfelwein am besten.',
      kategorie: 'essen'
    },
    {
      id: 'h-508',
      ausdruck: 'Heckmeck',
      hochdeutsch: 'unnötiges Gerede / Aufhebens',
      bedeutung: 'Der „Heckmeck" ist im Hessischen unnötiges Gerede, Durcheinander oder überflüssiges Aufhebens um eine Sache. „Mach ned so a Heckmeck!" winkt man genervt ab. Das lautmalerische Wort beschreibt den ganzen Wirbel und das Theater, das manche Leute um Kleinigkeiten veranstalten. Es gehört zum hessischen Vokabular für übertriebenes Getue und sinnloses Hin und Her.',
      beispiel: 'Wege dem bissje Heckmeck reg ich mich ned uff.',
      beispiel_hd: 'Wegen dem bisschen Gewese rege ich mich nicht auf.',
      kategorie: 'redensart'
    },
    {
      id: 'h-509',
      ausdruck: 'Knöterich',
      hochdeutsch: 'eigensinniger / widerspenstiger Mensch',
      bedeutung: 'Ein „Knöterich" ist im Hessischen ein eigensinniger, widerspenstiger Mensch, der sich querstellt und nicht nachgibt — benannt nach der zähen, wuchernden Pflanze. „Mit dem Knöterich kann mer ned rede!" Das Wort beschreibt jemanden, der so verbissen und zäh an seiner Meinung festhält wie der Knöterich, der sich durch jeden Garten rankt und kaum auszurotten ist.',
      beispiel: 'Der alt Knöterich gibt einfach kaa Ruh.',
      beispiel_hd: 'Der alte Sturkopf gibt einfach keine Ruhe.',
      kategorie: 'menschen'
    },
    {
      id: 'h-510',
      ausdruck: 'Schnuckelche',
      hochdeutsch: 'Liebling / Süßer (Kosename)',
      bedeutung: 'Ein „Schnuckelche" ist im Hessischen ein liebevoller Kosename für eine vertraute, geliebte Person oder ein niedliches Kind. „Komm her, mei Schnuckelche!" sagt man zärtlich. Das Wort mit der hessischen Verkleinerungsendung drückt Zuneigung und Herzlichkeit aus und gehört zum liebevollen Vokabular zwischen Partnern oder Eltern und Kindern. Ein Schnuckelche ist einfach zum Liebhaben.',
      beispiel: 'Mei klaa Schnuckelche schläft schon ganz fest.',
      beispiel_hd: 'Mein kleiner Liebling schläft schon ganz fest.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-511',
      ausdruck: 'Kappeszeit',
      hochdeutsch: 'Krautzeit / Erntezeit des Kohls',
      bedeutung: 'Die „Kappeszeit" ist im Hessischen die Zeit der Kohlernte im Herbst, wenn der Kappes (Weißkohl) reif ist und eingemacht wird. „In der Kappeszeit wird Sauerkraut gemacht!" Traditionell hobelte man den Kohl und legte ihn in großen Fässern zum Gären ein. Die Kappeszeit gehört zum bäuerlichen Jahreskreis und sicherte früher die Vitaminversorgung über den Winter.',
      beispiel: 'In der Kappeszeit riecht\'s im ganze Dorf nach Kraut.',
      beispiel_hd: 'In der Krautzeit riecht es im ganzen Dorf nach Kohl.',
      kategorie: 'natur'
    },
    {
      id: 'h-512',
      ausdruck: 'Schorschbembel',
      hochdeutsch: 'gemütlicher hessischer Stammtischbruder',
      bedeutung: 'Ein „Schorschbembel" ist im Frankfurter Raum scherzhaft der gemütliche, bodenständige Hesse am Stammtisch, der gern seinen Bembel leert — eine liebevolle Personifikation des typischen Apfelwein-Hessen. „Der is a echter Schorschbembel!" Das Wort verbindet den Namen Schorsch mit dem Bembel und feiert augenzwinkernd den geselligen, trinkfreudigen Stammgast hessischer Wirtschaften.',
      beispiel: 'Am Stammtisch sitze die alte Schorschbembel.',
      beispiel_hd: 'Am Stammtisch sitzen die alten Apfelwein-Brüder.',
      kategorie: 'menschen'
    },
    {
      id: 'h-513',
      ausdruck: 'verhaspele',
      hochdeutsch: 'sich verheddern / verhaspeln',
      bedeutung: 'Sich „verhaspele" bedeutet im Hessischen, sich beim Reden zu verheddern, ins Stocken zu geraten oder durcheinanderzukommen. „Vor Aufregung hab ich mich glatt verhaspelt!" Das Wort beschreibt das Stolpern über die eigenen Worte, wenn man zu schnell oder zu nervös spricht. Es gehört zum hessischen Alltagsvokabular und passiert jedem mal, der aufgeregt zu viel auf einmal sagen will.',
      beispiel: 'Bei der Red hab ich mich total verhaspelt.',
      beispiel_hd: 'Bei der Rede habe ich mich total verheddert.',
      kategorie: 'redensart'
    },
    {
      id: 'h-514',
      ausdruck: 'Eemerche',
      hochdeutsch: 'Eimerchen / kleiner Eimer',
      bedeutung: 'Ein „Eemerche" ist im Hessischen ein kleiner Eimer — etwa das Sandeimerchen der Kinder oder ein kleines Gefäß. „Hol des Eemerche fürs Wasser!" sagt man. Mit der hessischen Verkleinerungsendung „-erche" und der gedehnten Aussprache von „Eimer" zu „Eemer" klingt das Wort besonders liebevoll. Das Eemerche gehört zum alltäglichen Vokabular in Haus, Hof und Garten.',
      beispiel: 'Des Kind buddelt mit\'m Eemerche im Sand.',
      beispiel_hd: 'Das Kind buddelt mit dem Eimerchen im Sand.',
      kategorie: 'alltag'
    },
    {
      id: 'h-515',
      ausdruck: 'Schlotzer',
      hochdeutsch: 'Lutscher / Schnuller',
      bedeutung: 'Ein „Schlotzer" ist im hessischen Raum ein Lutscher, eine Süßigkeit zum Lutschen oder auch der Schnuller eines Babys. „Des Kind will sei Schlotzer!" Das Wort kommt von „schlotze" (lutschen, schlürfen) und gehört zum hessischen Vokabular rund um Kinder und Süßes. Mancherorts meint der Schlotzer auch einen Bonbon am Stiel, an dem die Kleinen genüsslich lecken.',
      beispiel: 'Ohne sei Schlotzer schläft des Bobbelsche ned ei.',
      beispiel_hd: 'Ohne seinen Schnuller schläft das Baby nicht ein.',
      kategorie: 'familie'
    },
    {
      id: 'h-516',
      ausdruck: 'Boppelmatz',
      hochdeutsch: 'pummeliges Kind / Knirps',
      bedeutung: 'Ein „Boppelmatz" ist im Hessischen ein kleines, rundliches, pummeliges Kind — ein liebevoller Kosename für einen niedlichen Knirps. „Komm her, du klaaner Boppelmatz!" sagt man zärtlich. Das Wort verbindet „Boppel/Bobbel" (Knirps) mit „Matz" und drückt Zuneigung aus. Ein Boppelmatz ist ein kugelrundes, gemütliches Kind, das man einfach knuddeln möchte.',
      beispiel: 'Unser Klaaner is a richticher Boppelmatz geworde.',
      beispiel_hd: 'Unser Kleiner ist ein richtiger Pummel geworden.',
      kategorie: 'familie'
    },
    {
      id: 'h-517',
      ausdruck: 'Schnegg',
      hochdeutsch: 'Schnecke (Gebäck) / hübsches Mädchen',
      bedeutung: 'Ein „Schnegg" ist im Hessischen einerseits ein schneckenförmiges Hefegebäck, andererseits umgangssprachlich ein hübsches Mädchen. „A süßer Schnegg!" kann beides meinen. Das Wort mit dem weichen hessischen „gg" gehört sowohl zur Bäckersprache als auch zur lockeren Alltagssprache. Auf dem Kaffeetisch ist der Schnegg eine süße Verlockung mit Rosinen und Zucker.',
      beispiel: 'Zum Kaffee hol ich uns a paar Schnegg vom Bäcker.',
      beispiel_hd: 'Zum Kaffee hole ich uns ein paar Hefeschnecken vom Bäcker.',
      kategorie: 'essen'
    },
    {
      id: 'h-518',
      ausdruck: 'Hessebub',
      hochdeutsch: 'echter hessischer Junge',
      bedeutung: 'Ein „Hessebub" ist ein waschechter hessischer Junge — bodenständig, treu und mit Apfelwein im Blut. „Mei Sohn is a echter Hessebub!" sagt man stolz. Das Wort verbindet „Hesse" mit „Bub" (Junge) und drückt heimatverbundenen Stolz aus. Ein Hessebub wächst mit dem Dialekt, der Eintracht und dem Ebbelwoi auf und trägt die hessische Lebensart selbstbewusst weiter.',
      beispiel: 'Der klaa Hessebub babbelt schon richtig Dialekt.',
      beispiel_hd: 'Der kleine Hessenjunge spricht schon richtig Dialekt.',
      kategorie: 'familie'
    },
    {
      id: 'h-519',
      ausdruck: 'Schnüsch',
      hochdeutsch: 'Gemüseeintopf / Allerlei',
      bedeutung: 'Der „Schnüsch" ist im nordhessischen Raum ein einfacher Gemüseeintopf aus allem, was Garten und Vorratskammer hergeben — ein buntes Allerlei. „Heut koch ich a großer Schnüsch!" Das Wort bezeichnet das resteverwertende Eintopfgericht, das je nach Jahreszeit unterschiedlich ausfällt. Der deftige Schnüsch gehört zur sparsamen, bodenständigen hessischen Landküche.',
      beispiel: 'Im Schnüsch is alles drin, was der Garte hergibt.',
      beispiel_hd: 'Im Gemüseeintopf ist alles drin, was der Garten hergibt.',
      kategorie: 'essen'
    },
    {
      id: 'h-520',
      ausdruck: 'Räuberzivil',
      hochdeutsch: 'lässige Alltagskleidung / legere Kleidung',
      bedeutung: 'Das „Räuberzivil" ist im Hessischen die legere, bequeme Alltagskleidung, in der man sich daheim oder bei der Gartenarbeit zeigt — nichts Feines, sondern praktisch und abgetragen. „Ich bin noch im Räuberzivil, komm ned rein!" Das humorvolle Wort beschreibt den ungezwungenen Aufzug fernab jeder Eleganz und gehört zum augenzwinkernden hessischen Alltagsvokabular.',
      beispiel: 'Im Garte lauf ich nur im Räuberzivil rum.',
      beispiel_hd: 'Im Garten laufe ich nur in legerer Kleidung herum.',
      kategorie: 'alltag'
    },
    {
      id: 'h-521',
      ausdruck: 'Ei gude wie?',
      hochdeutsch: 'Hallo, wie geht es dir?',
      bedeutung: 'Die ausgebaute Vollform der hessischen Standardbegrüßung. Während „Ei guude" allein schon grüßt, fügt das „wie?" die Frage nach dem Befinden an — ohne dass eine ausführliche Antwort erwartet wird. „Ei gude wie?" ist das hessische Pendant zum „Na, wie läufts?" und eröffnet fast jedes Gespräch im Wirtshaus, beim Bäcker oder auf der Straße.',
      beispiel: 'Ei gude wie, alles fit bei dir?',
      beispiel_hd: 'Hallo, wie geht es, alles in Ordnung bei dir?',
      kategorie: 'begruessung'
    },
    {
      id: 'h-522',
      ausdruck: 'Kreppel',
      hochdeutsch: 'Berliner / Pfannkuchen (Gebäck)',
      bedeutung: 'Der „Kreppel" ist in Hessen das in Fett ausgebackene, mit Marmelade gefüllte Hefegebäck, das anderswo Berliner oder Pfannkuchen heißt. Besonders zur Fastnacht werden Kreppel kistenweise gegessen. „Hol beim Bäcker a Tüt Kreppel!" Das Wort gehört fest zur hessischen Backstube, und ein frischer, mit Puderzucker bestäubter Kreppel ist der süße Höhepunkt der närrischen Tage.',
      beispiel: 'Zur Fassenacht ess ich am liebste a frischer Kreppel.',
      beispiel_hd: 'Zur Fastnacht esse ich am liebsten einen frischen Berliner.',
      kategorie: 'essen'
    },
    {
      id: 'h-523',
      ausdruck: 'datt',
      hochdeutsch: 'das / dort',
      bedeutung: 'Das nordhessisch-niederhessische „datt" steht für „das" und klingt für Süddeutsche fast plattdeutsch. „Datt is doch klar!" In der Gegend um Kassel und Waldeck ist diese harte Aussprache des „das" charakteristisch und unterscheidet den nordhessischen Tonfall deutlich vom weichen Frankfurterisch des Rhein-Main-Gebiets.',
      beispiel: 'Datt hab ich dir doch gestern schon gesagt!',
      beispiel_hd: 'Das habe ich dir doch gestern schon gesagt!',
      kategorie: 'alltag'
    },
    {
      id: 'h-524',
      ausdruck: 'Dippegucker',
      hochdeutsch: 'neugieriger Mensch / Topfgucker',
      bedeutung: 'Ein „Dippegucker" (Topfgucker) ist im Hessischen jemand, der überall die Nase reinsteckt und schaut, was in fremden Töpfen kocht — sprich ein neugieriger, naseweiser Mensch. „Sei net so a Dippegucker!" Das Wort verbindet „Dippe" (Topf) mit dem Gucken und beschreibt augenzwinkernd die Wissbegier, die andere Leute angeht.',
      beispiel: 'Der alt Dippegucker muss aach immer alles wisse.',
      beispiel_hd: 'Der alte Topfgucker muss auch immer alles wissen.',
      kategorie: 'menschen'
    },
    {
      id: 'h-525',
      ausdruck: 'Aaschloch',
      hochdeutsch: 'Arschloch (Schimpfwort)',
      bedeutung: 'Das hessisch ausgesprochene „Aaschloch" ist ein derbes Schimpfwort für einen gemeinen, unfairen Menschen. Das gedehnte „Aa" statt „Ar" ist typisch für den Dialekt. „So a Aaschloch, der!" Trotz seiner Grobheit fällt das Wort im hessischen Wirtshausalltag oft eher temperamentvoll als wirklich böse und gehört zum direkten, ungeschminkten Tonfall.',
      beispiel: 'So a Aaschloch, der hat mich glatt bescheisse wolle!',
      beispiel_hd: 'So ein Arschloch, der wollte mich glatt betrügen!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-526',
      ausdruck: 'Assa!',
      hochdeutsch: 'Ach was! / Wirklich?',
      bedeutung: 'Der südhessisch-Darmstädter Ausruf „Assa!" drückt Erstaunen, Unglauben oder Bewunderung aus — vergleichbar mit „Donnerwetter!" oder „Ach was!". „Assa, des hätt ich net gedacht!" Die Interjektion ist kurz und kraftvoll und gehört zum spontanen Gefühlsausdruck im Odenwald und der Bergstraße.',
      beispiel: 'Assa, des Auto is ja nagelneu!',
      beispiel_hd: 'Donnerwetter, das Auto ist ja nagelneu!',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-527',
      ausdruck: 'Schlappmaul',
      hochdeutsch: 'Schwätzer / wer nichts für sich behält',
      bedeutung: 'Ein „Schlappmaul" ist im Hessischen jemand, der zu viel und unbedacht redet, klatscht oder Geheimnisse ausplaudert — das Maul sitzt locker. „Erzähl dem Schlappmaul bloß nix!" Das Wort tadelt die Unfähigkeit, etwas für sich zu behalten, und verbindet „schlapp" (locker, lose) mit dem Maul zu einem bildhaften Schimpfwort.',
      beispiel: 'Dem Schlappmaul kannst du gar nix anvertraue.',
      beispiel_hd: 'Dem Schwätzer kannst du gar nichts anvertrauen.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-528',
      ausdruck: 'Schoppepetzer',
      hochdeutsch: 'fleißiger Apfelweintrinker',
      bedeutung: 'Ein „Schoppepetzer" ist im Frankfurter Raum jemand, der dem Apfelwein gern und reichlich zuspricht — das „Petzen" steht hier fürs kräftige Trinken aus dem Schoppenglas. „Der alt Schoppepetzer sitzt jeden Abend im Wirtshaus!" Das Wort ist liebevoll-spöttisch und beschreibt den treuen Stammgast der Apfelweinwirtschaft, der seinem Gerippten nie abgeneigt ist.',
      beispiel: 'Der Schoppepetzer kennt jede Wirtschaft in Sachsehause.',
      beispiel_hd: 'Der Apfelweintrinker kennt jede Wirtschaft in Sachsenhausen.',
      kategorie: 'menschen'
    },
    {
      id: 'h-529',
      ausdruck: 'Dollbohrer',
      hochdeutsch: 'Dummkopf / Tollpatsch',
      bedeutung: 'Ein „Dollbohrer" ist im Hessischen ein begriffsstutziger, ungeschickter Mensch, der eine Sache vergeigt. „Du Dollbohrer, jetzt is alles im Eimer!" Das Wort ist ein gutmütig-grobes Schimpfwort und gehört zum direkten hessischen Tadel, mit dem man Tollpatschigkeit und Dummheit zugleich auf den Punkt bringt.',
      beispiel: 'So a Dollbohrer, jetzt hat er des Glas umgeschmisse!',
      beispiel_hd: 'So ein Tollpatsch, jetzt hat er das Glas umgestoßen!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-530',
      ausdruck: 'Worschtsalat',
      hochdeutsch: 'Wurstsalat',
      bedeutung: 'Der „Worschtsalat" ist eine deftige hessische Wirtshausspeise aus in Streifen geschnittener Fleischwurst mit Zwiebeln, Essig und Öl, oft mit Käse zum „Schweizer Wurstsalat" erweitert. „Ich nehm a Worschtsalat un a Brot dazu!" Die saure, kräftige Beilage passt hervorragend zum Apfelwein und gehört zur klassischen hessischen Vesperkarte.',
      beispiel: 'Zum Schoppe schmeckt a Worschtsalat am beste.',
      beispiel_hd: 'Zum Apfelwein schmeckt ein Wurstsalat am besten.',
      kategorie: 'essen'
    },
    {
      id: 'h-531',
      ausdruck: 'Spundekäs',
      hochdeutsch: 'pikanter Frischkäseaufstrich',
      bedeutung: 'Der „Spundekäs" ist ein cremiger, mit Zwiebeln und Paprika gewürzter Frischkäseaufstrich aus dem rheinhessisch-südhessischen Raum, der zum Wein oder Apfelwein mit Brot und Brezeln gereicht wird. „Mach mer a Spundekäs zum Woi!" Die kegelförmig angerichtete Spezialität gehört zur geselligen Vesper und ist besonders an der Bergstraße und im Rheingau beliebt.',
      beispiel: 'Zum Riesling gibts a Spundekäs mit Brezel.',
      beispiel_hd: 'Zum Riesling gibt es einen Frischkäseaufstrich mit Brezel.',
      kategorie: 'essen'
    },
    {
      id: 'h-532',
      ausdruck: 'Schnuddebernd',
      hochdeutsch: 'verdrießlicher, mürrischer Mensch',
      bedeutung: 'Ein „Schnuddebernd" ist im Hessischen ein griesgrämiger, schlecht gelaunter Mensch, der die Unterlippe (Schnudde) hängen lässt. „Sei doch net so a Schnuddebernd!" Das Wort verbindet die hängende Schnute mit dem Namen Bernd zu einer bildhaften Beschreibung des ewigen Miesepeters und gehört zum spöttischen hessischen Menschenvokabular.',
      beispiel: 'Der Schnuddebernd lacht ja nie, der is immer mürrisch.',
      beispiel_hd: 'Der Miesepeter lacht ja nie, der ist immer mürrisch.',
      kategorie: 'menschen'
    },
    {
      id: 'h-533',
      ausdruck: 'verbabbelt',
      hochdeutsch: 'sich verplaudert / die Zeit verredet',
      bedeutung: 'Wer sich „verbabbelt" hat, hat sich im Gespräch verplaudert und darüber die Zeit oder den Termin vergessen — vom hessischen „babbele" (reden). „Tschuldigung, ich hab mich glatt verbabbelt!" Die Wendung beschreibt das typische hessische Phänomen, beim Schwätzen die Zeit zu vergessen, und ist eine charmante Entschuldigung fürs Zuspätkommen.',
      beispiel: 'Ich hab mich an der Theke total verbabbelt un de Bus verpasst.',
      beispiel_hd: 'Ich habe mich an der Theke total verplaudert und den Bus verpasst.',
      kategorie: 'alltag'
    },
    {
      id: 'h-534',
      ausdruck: 'Ranze',
      hochdeutsch: 'Bauch / dicker Bauch',
      bedeutung: 'Der „Ranze" ist im Hessischen der Bauch, besonders ein gut gefüllter. „Vom viele Ebbelwoi krischt mer a Ranze!" Das derb-humorvolle Wort beschreibt den Wohlstandsbauch und gehört zum bildhaften Körpervokabular. „Sich den Ranze vollschlage" bedeutet, sich ordentlich satt zu essen — ein geselliges hessisches Vergnügen.',
      beispiel: 'Nach dem Schweinsbrate hab ich a volle Ranze.',
      beispiel_hd: 'Nach dem Schweinebraten habe ich einen vollen Bauch.',
      kategorie: 'koerper'
    },
    {
      id: 'h-535',
      ausdruck: 'Buggel',
      hochdeutsch: 'Rücken / Buckel',
      bedeutung: 'Der „Buggel" ist im Hessischen der Rücken oder Buckel. „Mir tut der Buggel weh vom viele Bücke!" Das Wort gehört zum alltäglichen Körpervokabular. In Redensarten wie „rutsch mer de Buggel nunner" (lass mich in Ruhe) lebt es kräftig fort und zeigt den direkten, bodenständigen hessischen Tonfall.',
      beispiel: 'Vom Garteumgrabe tut mir de ganze Buggel weh.',
      beispiel_hd: 'Vom Gartenumgraben tut mir der ganze Rücken weh.',
      kategorie: 'koerper'
    },
    {
      id: 'h-536',
      ausdruck: 'Hannsgickel',
      hochdeutsch: 'eingebildeter Wichtigtuer',
      bedeutung: 'Ein „Hannsgickel" ist im Hessischen ein aufgeblasener, eingebildeter Mensch, der sich aufspielt wie ein stolzer Hahn (Gickel). „Der spielt sich auf wie a Hannsgickel!" Das Wort verbindet den Namen Hanns mit dem Gickel zu einem treffenden Spottnamen für Angeber und gehört zum reichen hessischen Schimpfvokabular.',
      beispiel: 'So a Hannsgickel, der meint, er wär was Besseres.',
      beispiel_hd: 'So ein Wichtigtuer, der meint, er wäre etwas Besseres.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-537',
      ausdruck: 'Quetschebaam',
      hochdeutsch: 'Zwetschgenbaum / Pflaumenbaum',
      bedeutung: 'Der „Quetschebaam" ist der Zwetschgenbaum, dessen Früchte („Quetsche") in Hessen zu Kuchen, Mus und Schnaps verarbeitet werden. „Im Garte steht a alter Quetschebaam." Das Wort gehört zur ländlichen Obstkultur Südhessens, und die Ernte vom Quetschebaam liefert die Zutaten für den geliebten Quetschekuchen im Spätsommer.',
      beispiel: 'Unner dem Quetschebaam liege schon die reife Früchte.',
      beispiel_hd: 'Unter dem Zwetschgenbaum liegen schon die reifen Früchte.',
      kategorie: 'natur'
    },
    {
      id: 'h-538',
      ausdruck: 'Knorze',
      hochdeutsch: 'Brotkanten / Endstück vom Brot',
      bedeutung: 'Der „Knorze" ist im Hessischen das harte Endstück eines Brotlaibs, der Brotkanten. „Den Knorze ess ich am liebste mit Butter!" Das Wort bezeichnet das knusprige Anschnittstück und gehört zum alltäglichen Brotvokabular. Mancherorts kämpfen die Kinder geradezu um den begehrten Knorze mit seiner harten Kruste.',
      beispiel: 'Gib mer de Knorze, ich mag die harte Kruste.',
      beispiel_hd: 'Gib mir den Brotkanten, ich mag die harte Kruste.',
      kategorie: 'essen'
    },
    {
      id: 'h-539',
      ausdruck: 'Schlabbe',
      hochdeutsch: 'Hausschuhe / Pantoffeln',
      bedeutung: 'Die „Schlabbe" sind im Hessischen die bequemen Hausschuhe oder Pantoffeln, die man daheim trägt. „Zieh dir die Schlabbe an, kalt is es!" Das Wort gehört zum häuslichen Alltag und ist eng verwandt mit der „Schlappe" (Ohrfeige/Niederlage), wird aber hier eindeutig für das Schuhwerk benutzt, in das man am Feierabend schlüpft.',
      beispiel: 'Daheim lauf ich nur in meine Schlabbe rum.',
      beispiel_hd: 'Zu Hause laufe ich nur in meinen Hausschuhen herum.',
      kategorie: 'alltag'
    },
    {
      id: 'h-540',
      ausdruck: 'aagschmiert',
      hochdeutsch: 'betrogen / reingelegt',
      bedeutung: 'Wer „aagschmiert" ist, wurde betrogen, getäuscht oder ist auf etwas hereingefallen — hessisch für „angeschmiert". „Da bist du aber aagschmiert worde!" Die Wendung drückt aus, dass jemand bei einem Geschäft oder einer Sache übers Ohr gehauen wurde, und gehört zum direkten hessischen Alltagsausdruck der Enttäuschung.',
      beispiel: 'Mit dem Gebrauchtwage bin ich richtig aagschmiert worde.',
      beispiel_hd: 'Mit dem Gebrauchtwagen bin ich richtig betrogen worden.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-541',
      ausdruck: 'Schäfsche',
      hochdeutsch: 'Schäfchen / Liebkosung',
      bedeutung: 'Das „Schäfsche" ist im Hessischen ein Kosewort für ein liebes Kind oder einen geliebten Menschen — wörtlich das kleine Schaf. „Komm her, mei Schäfsche!" Die zärtliche Verkleinerung mit der typischen Endung „-sche" drückt Zuneigung aus und gehört zum liebevollen Familienvokabular, mit dem Eltern und Großeltern ihre Lieben rufen.',
      beispiel: 'Mei klaa Schäfsche, schlaf jetzt schön.',
      beispiel_hd: 'Mein kleines Schäfchen, schlaf jetzt schön.',
      kategorie: 'familie'
    },
    {
      id: 'h-542',
      ausdruck: 'Grumbeerebrei',
      hochdeutsch: 'Kartoffelbrei / Kartoffelpüree',
      bedeutung: 'Der „Grumbeerebrei" ist der hessische Kartoffelbrei — von „Grumbeer" (Grundbirne = Kartoffel). „Zum Brate gibts Grumbeerebrei!" Das Gericht gehört zur bodenständigen hessischen Hausmannskost und wird zu Braten, Frikadellen oder Sauerkraut gereicht. Der sämige Grumbeerebrei mit viel Butter ist ein klassisches Sonntagsessen.',
      beispiel: 'De Grumbeerebrei macht mei Mutter mit viel Butter.',
      beispiel_hd: 'Den Kartoffelbrei macht meine Mutter mit viel Butter.',
      kategorie: 'essen'
    },
    {
      id: 'h-543',
      ausdruck: 'Hannickel',
      hochdeutsch: 'einfältiger Mensch / Trottel',
      bedeutung: 'Ein „Hannickel" ist im hessisch-nassauischen Raum ein einfältiger, etwas tölpelhafter Mensch — ursprünglich der Spottname für die einfachen Wanderarbeiter „Hann un Nickel". „Stell dich net so a wie a Hannickel!" Das Wort ist ein gutmütiges Schimpfwort für Begriffsstutzigkeit und gehört zum bildhaften Volksvokabular der Region.',
      beispiel: 'Der Hannickel hat de Weg schon wieder net gefunne.',
      beispiel_hd: 'Der Tropf hat den Weg schon wieder nicht gefunden.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-544',
      ausdruck: 'Bletz',
      hochdeutsch: 'Fleck / Schmutzfleck',
      bedeutung: 'Ein „Bletz" ist im Hessischen ein Fleck oder Schmutzfleck auf der Kleidung. „Du hast a Bletz uffm Hemd!" Das Wort gehört zum alltäglichen Vokabular und kann auch einen Flicken oder ein Stück Stoff bezeichnen. Ein dicker Bletz vom Ebbelwoi auf dem guten Hemd ist im Wirtshaus schnell passiert.',
      beispiel: 'Vom Ebbelwoi hab ich a großer Bletz uff de Hose.',
      beispiel_hd: 'Vom Apfelwein habe ich einen großen Fleck auf der Hose.',
      kategorie: 'alltag'
    },
    {
      id: 'h-545',
      ausdruck: 'sich verhebe',
      hochdeutsch: 'sich beim Heben verletzen',
      bedeutung: 'Wer sich „verhebt", hat sich beim Anheben einer schweren Last den Rücken verrenkt oder gezerrt. „Heb net so schwer, sonst verhebst dich!" Die Wendung warnt vor zu schwerem Tragen und gehört zum Alltag von Garten und Handwerk. Wer sich verhebt, hat oft tagelang Kreuzschmerzen und muss kürzertreten.',
      beispiel: 'Beim Kisteschleppe kann mer sich verhebe ganz schnell.',
      beispiel_hd: 'Beim Kistenschleppen kann man sich ganz schnell verheben.',
      kategorie: 'koerper'
    },
    {
      id: 'h-546',
      ausdruck: 'Kappche',
      hochdeutsch: 'Mütze / kleine Kappe',
      bedeutung: 'Das „Kappche" ist im Hessischen die Mütze oder kleine Kappe, die man bei kaltem Wetter aufsetzt — die Verkleinerung von „Kapp". „Setz dir a Kappche auf, es zieht!" Das Wort gehört zum alltäglichen Kleidungsvokabular. Im Winter mahnen Mütter ihre Kinder stets, das warme Kappche nicht zu vergessen.',
      beispiel: 'Bei der Kält brauchst du a warmes Kappche.',
      beispiel_hd: 'Bei der Kälte brauchst du eine warme Mütze.',
      kategorie: 'alltag'
    },
    {
      id: 'h-547',
      ausdruck: 'Hungerleider',
      hochdeutsch: 'armer Schlucker / Geizhals',
      bedeutung: 'Ein „Hungerleider" ist im Hessischen entweder ein bedauernswert armer Mensch oder, spöttisch, ein Geizkragen, der am Essen spart. „Sei doch net so a Hungerleider, gib a anständig Trinkgeld!" Das Wort tadelt übertriebene Sparsamkeit und gehört zum direkten hessischen Urteil über knausrige Zeitgenossen.',
      beispiel: 'So a Hungerleider gönnt sich ja gar nix.',
      beispiel_hd: 'So ein Geizhals gönnt sich ja gar nichts.',
      kategorie: 'menschen'
    },
    {
      id: 'h-548',
      ausdruck: 'Schmierlabbe',
      hochdeutsch: 'Spülschwamm / Putzlappen',
      bedeutung: 'Der „Schmierlabbe" ist im Hessischen der feuchte Lappen oder Schwamm, mit dem man Tisch und Spüle abwischt. „Wisch mit dem Schmierlabbe de Tisch ab!" Das Wort gehört zum Küchen- und Haushaltsvokabular. Der gut ausgewrungene Schmierlabbe darf in keiner hessischen Küche fehlen, wenn nach dem Essen aufgeräumt wird.',
      beispiel: 'Hol de Schmierlabbe, hier is was verschütt.',
      beispiel_hd: 'Hol den Putzlappen, hier ist etwas verschüttet.',
      kategorie: 'alltag'
    },
    {
      id: 'h-549',
      ausdruck: 'Gebabbels',
      hochdeutsch: 'Geschwätz / leeres Gerede',
      bedeutung: 'Das „Gebabbels" ist im Hessischen das endlose, oft inhaltsleere Gerede — abgeleitet vom „babbele" (reden). „Hör auf mit dem Gebabbels!" Das Wort drückt Genervtheit über ausuferndes Geschwätz aus und gehört zum gefühlsbetonten hessischen Wortschatz. Wenn beim Stammtisch nur noch Gebabbels herrscht, ist es Zeit zu gehen.',
      beispiel: 'Bei dem ewige Gebabbels krieg ich Kopfschmerze.',
      beispiel_hd: 'Bei dem ewigen Geschwätz bekomme ich Kopfschmerzen.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-550',
      ausdruck: 'Plünn',
      hochdeutsch: 'alte Kleider / Klamotten',
      bedeutung: 'Die „Plünn" (auch Plünnen) sind im hessischen Raum alte, abgetragene Kleidungsstücke oder allgemein der Plunder. „Räum dei Plünn weg!" Das Wort hat einen abwertenden Beiklang und bezeichnet wertloses Zeug oder schäbige Kleider. Wer seine Plünn nicht aufräumt, hört das schnell von der Hausherrin.',
      beispiel: 'Die alte Plünn kannst du glatt wegschmeiße.',
      beispiel_hd: 'Die alten Klamotten kannst du ruhig wegwerfen.',
      kategorie: 'alltag'
    },
    {
      id: 'h-551',
      ausdruck: 'Schnaagde',
      hochdeutsch: 'Mücken / Stechmücken',
      bedeutung: 'Die „Schnaagde" (Schnaken) sind in Hessen die Stechmücken, die besonders an lauen Sommerabenden am Wasser plagen. „Am Maa wimmelts vor Schnaagde!" Das Wort gehört zum Naturvokabular der warmen Jahreszeit. Wer abends am Bembel im Garten sitzt, muss sich der lästigen Schnaagde erwehren.',
      beispiel: 'Im Sommer am Weiher beiße die Schnaagde schlimm.',
      beispiel_hd: 'Im Sommer am Weiher beißen die Mücken schlimm.',
      kategorie: 'natur'
    },
    {
      id: 'h-552',
      ausdruck: 'Bruddler',
      hochdeutsch: 'jemand, der vor sich hin murrt',
      bedeutung: 'Ein „Bruddler" ist im Hessischen jemand, der ständig leise vor sich hin schimpft und murrt — vom „bruddele" (brummeln, meckern). „Der alt Bruddler is mit nix zufriede!" Das Wort beschreibt liebevoll-spöttisch den ewigen Nörgler, der unter dem Atem murrt, und gehört zum bildhaften hessischen Menschenvokabular.',
      beispiel: 'Mei Nachbar is a richticher Bruddler, der meckert über alles.',
      beispiel_hd: 'Mein Nachbar ist ein richtiger Nörgler, der meckert über alles.',
      kategorie: 'menschen'
    },
    {
      id: 'h-553',
      ausdruck: 'bruddele',
      hochdeutsch: 'murren / vor sich hin schimpfen',
      bedeutung: 'Das hessische „bruddele" bedeutet, leise und unzufrieden vor sich hin zu murren oder zu meckern. „Hör auf zu bruddele un pack mit an!" Das Wort beschreibt das brummelnde Unmutsäußern unter dem Atem und gehört zum gefühlsbetonten Alltagswortschatz. Wer beim Arbeiten bruddelt, ist meist nicht ernsthaft böse, sondern nur missmutig.',
      beispiel: 'Der Opa fängt schon wieder an zu bruddele.',
      beispiel_hd: 'Der Opa fängt schon wieder an zu murren.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-554',
      ausdruck: 'Schlotterbach',
      hochdeutsch: 'ängstlicher Mensch / Hasenfuß',
      bedeutung: 'Ein „Schlotterbach" ist im Hessischen ein ängstlicher, zaghafter Mensch, dem vor Furcht die Knie schlottern. „Sei doch kaa Schlotterbach, des is doch ungefährlich!" Das Wort verbindet das Schlottern mit der Endung „-bach" zu einem bildhaften Spottnamen für Hasenfüße und gehört zum reichen hessischen Schimpfvokabular.',
      beispiel: 'So a Schlotterbach, der traut sich ja gar nix.',
      beispiel_hd: 'So ein Hasenfuß, der traut sich ja gar nichts.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-555',
      ausdruck: 'Kämmerche',
      hochdeutsch: 'kleines Zimmer / Kammer',
      bedeutung: 'Das „Kämmerche" ist im Hessischen ein kleiner Raum, eine winzige Kammer oder ein gemütliches Stübchen — die Verkleinerung von „Kammer". „Im Kämmerche unterm Dach schlaf ich am liebste." Das Wort gehört zum häuslichen Vokabular und beschreibt liebevoll den engen, aber heimeligen Raum, in dem man sich zurückzieht.',
      beispiel: 'Des klaa Kämmerche is mei Lieblingsplatz im Haus.',
      beispiel_hd: 'Das kleine Zimmer ist mein Lieblingsplatz im Haus.',
      kategorie: 'alltag'
    },
    {
      id: 'h-556',
      ausdruck: 'Buwekerl',
      hochdeutsch: 'kräftiger junger Bursche',
      bedeutung: 'Ein „Buwekerl" ist im Hessischen ein stattlicher, kräftiger junger Mann — eine Verstärkung von „Bub" (Junge) mit „Kerl". „Der is a strammer Buwekerl worde!" Das Wort drückt anerkennende Bewunderung für einen herangewachsenen jungen Mann aus und gehört zum bildhaften Menschenvokabular, mit dem stolze Eltern und Nachbarn reden.',
      beispiel: 'Aus dem klaa Bub is a richticher Buwekerl worde.',
      beispiel_hd: 'Aus dem kleinen Jungen ist ein richtiger Bursche geworden.',
      kategorie: 'menschen'
    },
    {
      id: 'h-557',
      ausdruck: 'Heeschehupser',
      hochdeutsch: 'Heuschrecke / Grashüpfer',
      bedeutung: 'Der „Heeschehupser" ist im hessischen Raum die Heuschrecke oder der Grashüpfer, der über die sommerliche Wiese springt. „Guck, a Heeschehupser im Gras!" Das bildhafte Wort verbindet „Heesche" (Heu) mit dem Hüpfen und gehört zum kindlich-anschaulichen Naturvokabular der Sommerwiesen und Felder.',
      beispiel: 'Im hohe Gras hüpfe die Heeschehupser nur so rum.',
      beispiel_hd: 'Im hohen Gras hüpfen die Grashüpfer nur so herum.',
      kategorie: 'natur'
    },
    {
      id: 'h-558',
      ausdruck: 'Maulaff',
      hochdeutsch: 'Maulaffe / wer untätig gafft',
      bedeutung: 'Ein „Maulaff" ist im Hessischen jemand, der mit offenem Mund untätig herumsteht und gafft, statt mit anzupacken. „Steh net rum wie a Maulaff!" Die Redensart „Maulaffe feilhalten" meint, müßig zu glotzen. Das Wort tadelt Untätigkeit und Begriffsstutzigkeit zugleich und gehört zum direkten hessischen Tadel.',
      beispiel: 'Steh net da wie a Maulaff, hilf mol mit!',
      beispiel_hd: 'Steh nicht da wie ein Maulaffe, hilf mal mit!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-559',
      ausdruck: 'sich verkrümele',
      hochdeutsch: 'sich heimlich davonmachen',
      bedeutung: 'Wer sich „verkrümelt", macht sich unauffällig und leise aus dem Staub. „Bevors ans Aufräume geht, verkrümelt der sich immer!" Die Wendung beschreibt das stille Verschwinden, oft um einer unangenehmen Aufgabe zu entgehen, und gehört zum bildhaften hessischen Alltagsausdruck — als würde man sich in kleine Krümel auflösen.',
      beispiel: 'Nach dem Esse will sich keiner verkrümele vorm Spüle.',
      beispiel_hd: 'Nach dem Essen will sich keiner vor dem Spülen davonmachen.',
      kategorie: 'alltag'
    },
    {
      id: 'h-560',
      ausdruck: 'Kerschblut',
      hochdeutsch: 'Kirschblüte',
      bedeutung: 'Die „Kerschblut" ist die Kirschblüte, die in Hessen besonders im Frühling die Obstgärten und die Bergstraße in weiß-rosa Pracht taucht. „Im April is die Kerschblut am schönste!" Das Wort gehört zum Naturvokabular des Frühlings, und ein Spaziergang durch die blühenden Kerschbäum gehört für viele Hessen zu den schönsten Momenten des Jahres.',
      beispiel: 'An der Bergstraß is die Kerschblut a echtes Erlebnis.',
      beispiel_hd: 'An der Bergstraße ist die Kirschblüte ein echtes Erlebnis.',
      kategorie: 'natur'
    },
    {
      id: 'h-561',
      ausdruck: 'Schwummerich',
      hochdeutsch: 'schwindelig / flau',
      bedeutung: 'Wem „schwummerich" ist, dem ist schwindelig, flau oder mulmig zumute. „Mir werd ganz schwummerich vom viele Ebbelwoi!" Das Wort beschreibt sowohl körperliches Schwindelgefühl als auch ein unbehagliches Gefühl in der Magengegend und gehört zum gefühlsbetonten hessischen Körpervokabular. Auch vor einer Prüfung kann einem schwummerich werden.',
      beispiel: 'Nach der Achterbahn war mir ganz schwummerich.',
      beispiel_hd: 'Nach der Achterbahn war mir ganz schwindelig.',
      kategorie: 'koerper'
    },
    {
      id: 'h-562',
      ausdruck: 'Schubbkarrch',
      hochdeutsch: 'Schubkarre',
      bedeutung: 'Der „Schubbkarrch" ist im Hessischen die Schubkarre, das unentbehrliche Gefährt für Garten- und Bauarbeiten. „Hol de Schubbkarrch, mer fahre de Mist weg!" Das Wort gehört zum ländlichen Arbeitsvokabular. Mit dem Schubbkarrch transportiert man Erde, Laub, Steine und alles, was im Garten anfällt, von einer Ecke zur anderen.',
      beispiel: 'De Schubbkarrch is voll mit Gartenabfall.',
      beispiel_hd: 'Die Schubkarre ist voll mit Gartenabfall.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-563',
      ausdruck: 'Hennegickel',
      hochdeutsch: 'Haushahn / Gockel',
      bedeutung: 'Der „Hennegickel" ist im Hessischen der Haushahn, der über die Hennen wacht und am Morgen kräht. „De Hennegickel kräht schon im Morgegraue!" Das Wort verbindet „Henne" mit „Gickel" (Hahn) und gehört zum bäuerlichen Vokabular. Übertragen kann ein eingebildeter, stolzierender Mann auch als Hennegickel verspottet werden.',
      beispiel: 'Beim Bauer kräht de Hennegickel jeden Morge.',
      beispiel_hd: 'Beim Bauern kräht der Hahn jeden Morgen.',
      kategorie: 'natur'
    },
    {
      id: 'h-564',
      ausdruck: 'Schnüffler',
      hochdeutsch: 'neugieriger Spitzel',
      bedeutung: 'Ein „Schnüffler" ist im Hessischen jemand, der heimlich herumspioniert und in fremden Angelegenheiten herumschnüffelt. „Der Schnüffler will immer alles ganz genau wisse!" Das Wort tadelt aufdringliche Neugier und Spitzeltum und gehört zum kritischen Menschenvokabular. Einen Schnüffler hat im Dorf niemand gern, weil er alles weitererzählt.',
      beispiel: 'Pass auf, was du sagst, der Schnüffler hört alles.',
      beispiel_hd: 'Pass auf, was du sagst, der Spitzel hört alles.',
      kategorie: 'menschen'
    },
    {
      id: 'h-565',
      ausdruck: 'Quasselstripp',
      hochdeutsch: 'Vielrednerin / Plappermaul',
      bedeutung: 'Eine „Quasselstripp" ist im Hessischen jemand, der ununterbrochen redet und kaum Luft holt. „Die Quasselstripp hört gar net mehr auf!" Das Wort verbindet das „Quasseln" mit „Strippe" (Schnur, Telefonleitung) und beschreibt liebevoll-spöttisch ein unermüdliches Plappermaul. Mit einer echten Quasselstripp kommt man selbst kaum zu Wort.',
      beispiel: 'Mei Tante is a echte Quasselstripp am Telefon.',
      beispiel_hd: 'Meine Tante ist ein echtes Plappermaul am Telefon.',
      kategorie: 'menschen'
    },
    {
      id: 'h-566',
      ausdruck: 'Bredche',
      hochdeutsch: 'Brettchen / kleines Schneidebrett',
      bedeutung: 'Das „Bredche" ist im Hessischen das kleine Brettchen, auf dem man Wurst, Käse oder Brot schneidet und serviert — die Verkleinerung von „Brett". „Schneid die Worscht aufm Bredche!" Das Wort gehört zum Küchenvokabular. Beim Vesper bekommt jeder sein eigenes Bredche, auf dem das Abendbrot angerichtet wird.',
      beispiel: 'Leg de Käs aufs Bredche un schneid a Brot dazu.',
      beispiel_hd: 'Leg den Käse auf das Brettchen und schneide ein Brot dazu.',
      kategorie: 'essen'
    },
    {
      id: 'h-567',
      ausdruck: 'Schaffskopp',
      hochdeutsch: 'Dummkopf / Schafskopf',
      bedeutung: 'Ein „Schaffskopp" ist im Hessischen ein begriffsstutziger, einfältiger Mensch — ein Schafskopf. „Du Schaffskopp, des war doch klar!" Das Wort ist ein gutmütig-derbes Schimpfwort für Dummheit und gehört zum direkten hessischen Tadel. Trotz seiner Grobheit wird es oft eher kopfschüttelnd als wirklich böse verwendet.',
      beispiel: 'So a Schaffskopp, der kapiert aber aach gar nix.',
      beispiel_hd: 'So ein Schafskopf, der kapiert aber auch gar nichts.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-568',
      ausdruck: 'Latwersch',
      hochdeutsch: 'Pflaumenmus / Latwerge',
      bedeutung: 'Die „Latwersch" ist im Hessischen das dunkle, eingekochte Pflaumenmus (Latwerge), das traditionell stundenlang im Kessel gerührt wird. „Aufs Brot kommt a dicke Latwersch!" Das Wort gehört zur ländlichen Vorratsküche Südhessens. Selbstgemachte Latwersch aus reifen Quetschen ist ein beliebter Brotaufstrich, der den ganzen Winter hält.',
      beispiel: 'Die selbstgemachte Latwersch schmeckt am beste aufm Budderbrot.',
      beispiel_hd: 'Das selbstgemachte Pflaumenmus schmeckt am besten auf dem Butterbrot.',
      kategorie: 'essen'
    },
    {
      id: 'h-569',
      ausdruck: 'Grembel',
      hochdeutsch: 'Krempel / Gerümpel',
      bedeutung: 'Der „Grembel" ist im Hessischen wertloser Kram, alter Plunder oder Gerümpel. „Schmeiß de ganze Grembel endlich weg!" Das Wort hat einen abwertenden Beiklang und bezeichnet allerlei nutzloses Zeug, das sich in Keller, Speicher oder Garage ansammelt. Den alten Grembel auszumisten ist eine ungeliebte, aber nötige Arbeit.',
      beispiel: 'Im Keller steht nur noch alter Grembel rum.',
      beispiel_hd: 'Im Keller steht nur noch alter Krempel herum.',
      kategorie: 'alltag'
    },
    {
      id: 'h-570',
      ausdruck: 'Schnoogestich',
      hochdeutsch: 'Mückenstich',
      bedeutung: 'Ein „Schnoogestich" ist im Hessischen der juckende Stich einer Stechmücke (Schnaake). „Der Schnoogestich juckt wie verrückt!" Das Wort gehört zum sommerlichen Alltagsvokabular. Wer abends im Garten am Bembel sitzt, fängt sich schnell den ein oder anderen Schnoogestich an Armen und Beinen ein.',
      beispiel: 'De Schnoogestich am Bein juckt mich schon de ganze Tag.',
      beispiel_hd: 'Der Mückenstich am Bein juckt mich schon den ganzen Tag.',
      kategorie: 'koerper'
    },
    {
      id: 'h-571',
      ausdruck: 'Worschdesupp',
      hochdeutsch: 'Wurstsuppe / Wurstbrühe',
      bedeutung: 'Die „Worschdesupp" ist im Hessischen die kräftige Brühe, in der Wurst gekocht wurde, oder eine deftige Suppe mit Wursteinlage. „Bei der Schlachtung gibts immer Worschdesupp!" Das Wort gehört zum bodenständigen Schlachtvokabular. Die warme, würzige Worschdesupp wird traditionell an kalten Schlachttagen frisch serviert.',
      beispiel: 'Nach der Hausschlachtung gabs heiße Worschdesupp.',
      beispiel_hd: 'Nach der Hausschlachtung gab es heiße Wurstsuppe.',
      kategorie: 'essen'
    },
    {
      id: 'h-572',
      ausdruck: 'Hannswurscht',
      hochdeutsch: 'Spaßmacher / Hanswurst',
      bedeutung: 'Ein „Hannswurscht" ist im Hessischen ein alberner Spaßmacher oder jemand, den man nicht ernst nimmt. „Mach doch net immer de Hannswurscht!" Das Wort tadelt einerseits albernes Getue, kann aber auch einen herumkaspernden Clown liebevoll bezeichnen und gehört zum bildhaften Menschenvokabular der Region.',
      beispiel: 'Der gibt uff jeder Feier de Hannswurscht.',
      beispiel_hd: 'Der gibt auf jeder Feier den Hanswurst.',
      kategorie: 'menschen'
    },
    {
      id: 'h-573',
      ausdruck: 'Wasserhäusje',
      hochdeutsch: 'Kiosk / Trinkhalle',
      bedeutung: 'Das „Wasserhäusje" ist im Frankfurter Raum der Kiosk oder die Trinkhalle an der Straßenecke, wo es Getränke, Süßigkeiten und Zeitungen gibt. „Ich hol uns was am Wasserhäusje!" Der Name geht auf die früheren Verkaufsstände für Mineralwasser zurück. Das Wasserhäusje ist sozialer Treffpunkt im Viertel und gehört fest zum Frankfurter Stadtbild.',
      beispiel: 'Am Wasserhäusje an der Eck treffe sich abends die Nachbarn.',
      beispiel_hd: 'Am Kiosk an der Ecke treffen sich abends die Nachbarn.',
      kategorie: 'orte'
    },
    {
      id: 'h-574',
      ausdruck: 'Schmackofatz',
      hochdeutsch: 'Leckerbissen / etwas Köstliches',
      bedeutung: 'Ein „Schmackofatz" ist im Hessischen etwas besonders Schmackhaftes, ein Leckerbissen. „Des Esse war a echter Schmackofatz!" Das verspielte Wort drückt Genuss und Wohlgeschmack aus und gehört zum fröhlichen Esskultur-Vokabular. Wenn etwas ein richtiger Schmackofatz ist, dann schmeckt es vorzüglich und macht Appetit auf mehr.',
      beispiel: 'Die Grie Soß heut war a richticher Schmackofatz.',
      beispiel_hd: 'Die Grüne Soße heute war ein richtiger Leckerbissen.',
      kategorie: 'essen'
    },
    {
      id: 'h-575',
      ausdruck: 'Mores lehre',
      hochdeutsch: 'jemandem Anstand beibringen',
      bedeutung: 'Wer jemandem „Mores lehrt", bringt ihm mit Nachdruck Anstand, gutes Benehmen oder Respekt bei — von lat. mores (Sitten). „Dem werd ich mol Mores lehre!" Die Redensart drückt aus, dass man jemanden zurechtweisen und ihm Manieren beibringen will. Sie gehört zum direkten hessischen Erziehungs- und Drohvokabular.',
      beispiel: 'Wenn der so frech is, muss mer ihm Mores lehre.',
      beispiel_hd: 'Wenn der so frech ist, muss man ihm Anstand beibringen.',
      kategorie: 'redensart'
    },
    {
      id: 'h-576',
      ausdruck: 'Bambes',
      hochdeutsch: 'Kartoffelpuffer aus dem Ofen',
      bedeutung: 'Der „Bambes" ist im nordhessischen Raum ein deftiger Kartoffelauflauf oder dicker Kartoffelpuffer, der im Ofen gebacken wird. „Heut gibts Bambes mit Apfelmus!" Das Wort gehört zur bodenständigen Landküche. Der herzhafte Bambes aus geriebenen Kartoffeln wird oft mit Speck verfeinert und sättigt eine ganze Familie.',
      beispiel: 'De Bambes ausm Ofe schmeckt mit Apfelmus am beste.',
      beispiel_hd: 'Der Kartoffelauflauf aus dem Ofen schmeckt mit Apfelmus am besten.',
      kategorie: 'essen'
    },
    {
      id: 'h-577',
      ausdruck: 'Schnüssje',
      hochdeutsch: 'Schnäuzchen / Mündchen (Kosewort)',
      bedeutung: 'Das „Schnüssje" ist im Hessischen das kleine Mündchen oder Gesichtchen, oft als Kosewort für ein Kind — die Verkleinerung von „Schnüss" (Mund, Schnauze). „Putz dir des Schnüssje ab!" Das zärtliche Wort gehört zum liebevollen Familienvokabular. Wenn ein Kind ein verschmiertes Schnüssje hat, wischt die Mutter es liebevoll sauber.',
      beispiel: 'Mach dei Schnüssje sauber, du hast Schokolad dran.',
      beispiel_hd: 'Mach dein Mündchen sauber, du hast Schokolade daran.',
      kategorie: 'koerper'
    },
    {
      id: 'h-578',
      ausdruck: 'Hawwe un Knawwe',
      hochdeutsch: 'Hab und Gut / alles Mögliche',
      bedeutung: 'Mit „Hawwe un Knawwe" meint der Hesse seinen gesamten Besitz, sein Hab und Gut, oder allerlei Kram. „Mit Hawwe un Knawwe is er ausgezoge!" Die rhythmische Zwillingsformel gehört zum bildhaften Redensartvokabular und beschreibt augenzwinkernd, wenn jemand mit Sack und Pack samt allem Hausrat aufbricht oder umzieht.',
      beispiel: 'Er hat sei ganze Hawwe un Knawwe ins neue Haus geschafft.',
      beispiel_hd: 'Er hat sein ganzes Hab und Gut ins neue Haus geschafft.',
      kategorie: 'redensart'
    },
    {
      id: 'h-579',
      ausdruck: 'Schnüddel',
      hochdeutsch: 'Schnodder / Nasenschleim',
      bedeutung: 'Der „Schnüddel" ist im Hessischen der Nasenschleim, besonders bei einem erkälteten Kind. „Wisch dem Klaane de Schnüddel ab!" Das wenig vornehme, aber bildhafte Wort gehört zum alltäglichen Körpervokabular. Bei Schnupfenwetter läuft den Kindern der Schnüddel, und das Taschentuch ist ständig im Einsatz.',
      beispiel: 'Bei der Erkältung läuft dem Bub de Schnüddel.',
      beispiel_hd: 'Bei der Erkältung läuft dem Jungen der Nasenschleim.',
      kategorie: 'koerper'
    },
    {
      id: 'h-580',
      ausdruck: 'Gickelhahnche',
      hochdeutsch: 'kleiner Hahn / aufgeweckter Bub',
      bedeutung: 'Das „Gickelhahnche" ist im Hessischen wörtlich der kleine Hahn, übertragen ein aufgewecktes, vorlautes Bübchen, das sich keck aufspielt. „So a freches Gickelhahnche!" Das liebevoll-spöttische Wort verbindet „Gickel" mit der Verkleinerung und gehört zum bildhaften Familienvokabular für lebhafte, schlagfertige kleine Jungen.',
      beispiel: 'Des klaa Gickelhahnche hat uff alles a Antwort.',
      beispiel_hd: 'Der kleine Hahn hat auf alles eine Antwort.',
      kategorie: 'familie'
    },
    {
      id: 'h-581',
      ausdruck: 'fuddele',
      hochdeutsch: 'schludrig arbeiten / pfuschen',
      bedeutung: 'Wer „fuddelt", arbeitet hastig, schludrig und unsauber, pfuscht also herum. „Fuddel net so, mach des ordentlich!" Das Wort tadelt nachlässiges, schlampiges Werken und gehört zum hessischen Arbeitsvokabular. Wer beim Handwerken fuddelt, liefert keine saubere Arbeit ab und muss oft nachbessern.',
      beispiel: 'Wenn du beim Streiche fuddele tust, sieht mer jede Stell.',
      beispiel_hd: 'Wenn du beim Streichen pfuschst, sieht man jede Stelle.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-582',
      ausdruck: 'schepp',
      hochdeutsch: 'schief / schräg',
      bedeutung: 'Etwas „schepp" ist im Hessischen schief, schräg oder krumm. „Des Bild hängt ja ganz schepp!" Das Wort gehört zum alltäglichen Vokabular und beschreibt alles, was nicht gerade ist. „Schepp gucke" bedeutet, jemanden schief und missbilligend anzusehen. Ein schepp sitzender Hut oder ein schepper Zaun fällt sofort ins Auge.',
      beispiel: 'Dei Mütz sitzt ganz schepp uffm Kopp.',
      beispiel_hd: 'Deine Mütze sitzt ganz schief auf dem Kopf.',
      kategorie: 'alltag'
    },
    {
      id: 'h-583',
      ausdruck: 'Schnabbeldigewupp',
      hochdeutsch: 'schwuppdiwupp / blitzschnell',
      bedeutung: 'Mit „Schnabbeldigewupp" drückt der Hesse aus, dass etwas blitzschnell und im Handumdrehen geschieht — vergleichbar mit „schwuppdiwupp". „Un Schnabbeldigewupp war des Esse weg!" Das verspielte, lautmalerische Wort gehört zum fröhlichen Erzählvokabular und unterstreicht, wie rasch etwas vor sich geht.',
      beispiel: 'Schnabbeldigewupp, un schon war der Kuche aufgegesse.',
      beispiel_hd: 'Schwuppdiwupp, und schon war der Kuchen aufgegessen.',
      kategorie: 'redensart'
    },
    {
      id: 'h-584',
      ausdruck: 'Schluppe',
      hochdeutsch: 'Schleife / Schnürsenkelschleife',
      bedeutung: 'Die „Schluppe" ist im Hessischen die Schleife, etwa am Schnürsenkel, im Haar oder als Geschenkschleife. „Bind dir die Schluppe am Schuh!" Das Wort gehört zum alltäglichen Vokabular. Kindern bringt man früh bei, eine ordentliche Schluppe in die Schnürsenkel zu binden, damit sie nicht über die offenen Bänder stolpern.',
      beispiel: 'Mach dir a Schluppe ins Haar, des sieht hübsch aus.',
      beispiel_hd: 'Mach dir eine Schleife ins Haar, das sieht hübsch aus.',
      kategorie: 'alltag'
    },
    {
      id: 'h-585',
      ausdruck: 'Suddelei',
      hochdeutsch: 'Sauerei / Schmiererei',
      bedeutung: 'Eine „Suddelei" ist im Hessischen eine Schmiererei, Kleckerei oder unordentliche Sauerei. „Was is denn des für a Suddelei aufm Tisch!" Das Wort tadelt unsauberes, kleckerndes Tun und gehört zum gefühlsbetonten Alltagsvokabular. Wenn Kinder beim Malen oder Essen eine Suddelei veranstalten, muss hinterher gründlich geputzt werden.',
      beispiel: 'Beim Marmelade-Esse macht der Bub immer a Suddelei.',
      beispiel_hd: 'Beim Marmelade-Essen macht der Junge immer eine Schmiererei.',
      kategorie: 'alltag'
    },
    {
      id: 'h-586',
      ausdruck: 'Krische gucke',
      hochdeutsch: 'verärgert dreinschauen',
      bedeutung: 'Wer „Krische guckt", schaut verärgert, beleidigt oder mürrisch drein. „Guck net so a Krische, des war doch nur Spaß!" Die Wendung beschreibt das schmollende, finstere Gesicht und gehört zum bildhaften Gefühlsvokabular. Wenn jemand Krische guckt, ist er eingeschnappt und zeigt seinen Unmut deutlich im Gesicht.',
      beispiel: 'Sie tut nur noch Krische gucke, weil se beleidigt is.',
      beispiel_hd: 'Sie schaut nur noch verärgert drein, weil sie beleidigt ist.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-587',
      ausdruck: 'Worschdkessel',
      hochdeutsch: 'Wurstkessel / Siedekessel',
      bedeutung: 'Der „Worschdkessel" ist im Hessischen der große Kessel, in dem bei der Hausschlachtung die Würste gebrüht werden. „De Worschdkessel dampft im Hof!" Das Wort gehört zum traditionellen Schlachtvokabular. Rund um den heißen Worschdkessel versammelt sich am Schlachttag die Familie, und es gibt frische Wurst und Worschdesupp.',
      beispiel: 'Beim Schlachte brodelt de Worschdkessel de ganze Tag.',
      beispiel_hd: 'Beim Schlachten brodelt der Wurstkessel den ganzen Tag.',
      kategorie: 'essen'
    },
    {
      id: 'h-588',
      ausdruck: 'Schmierfink',
      hochdeutsch: 'unordentlicher Mensch / Schmutzfink',
      bedeutung: 'Ein „Schmierfink" ist im Hessischen jemand, der sich oder seine Sachen schmutzig macht und herumkleckert. „Du klaaner Schmierfink, guck dei Hände an!" Das Wort tadelt gutmütig-spöttisch Unsauberkeit, besonders bei Kindern, und gehört zum bildhaften Menschenvokabular. Ein Schmierfink kommt vom Spielen stets verdreckt nach Hause.',
      beispiel: 'Der Schmierfink hat sich beim Esse wieder voll bekleckert.',
      beispiel_hd: 'Der Schmutzfink hat sich beim Essen wieder voll bekleckert.',
      kategorie: 'menschen'
    },
    {
      id: 'h-589',
      ausdruck: 'Kappesblatt',
      hochdeutsch: 'dummes Zeug / Unsinn',
      bedeutung: 'Ein „Kappesblatt" ist im Hessischen übertragen dummes Geschwätz oder Unsinn — wörtlich ein Kohlblatt (Kappes = Kohl). „Erzähl doch kaa Kappesblatt!" Das Wort tadelt törichtes Gerede und gehört zum bildhaften Schimpfvokabular. Wer nur Kappesblatt redet, gibt unsinniges, wertloses Zeug von sich, das niemand ernst nimmt.',
      beispiel: 'Des is doch alles Kappesblatt, was der babbelt.',
      beispiel_hd: 'Das ist doch alles Unsinn, was der redet.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-590',
      ausdruck: 'Knoddel',
      hochdeutsch: 'kleiner Klumpen / Häufchen',
      bedeutung: 'Ein „Knoddel" ist im Hessischen ein kleiner Klumpen, ein Häufchen oder etwas Zusammengeballtes. „Mach a Knoddel Teig draus!" Das Wort gehört zum alltäglichen Vokabular und kann Teig, Dreck oder zusammengeknülltes Papier bezeichnen. Übertragen ist ein „klaaner Knoddel" auch ein liebevoller Name für ein kleines, rundliches Kind.',
      beispiel: 'Form aus dem Teig a klaaner Knoddel für jedes Brötche.',
      beispiel_hd: 'Form aus dem Teig einen kleinen Klumpen für jedes Brötchen.',
      kategorie: 'alltag'
    },
    {
      id: 'h-591',
      ausdruck: 'Schoppestächer',
      hochdeutsch: 'kräftiger Apfelweintrinker',
      bedeutung: 'Ein „Schoppestächer" ist im Frankfurter Raum jemand, der dem Schoppen Apfelwein kräftig zuspricht — wörtlich einer, der die Schoppen „sticht". „Der alt Schoppestächer trinkt jeden Abend sei Bembel leer!" Das Wort ist liebevoll-spöttisch und beschreibt den trinkfreudigen Stammgast in der Apfelweinwirtschaft, der seinem Stöffche treu ergeben ist.',
      beispiel: 'Als echter Schoppestächer kennt er jede Wirtschaft.',
      beispiel_hd: 'Als echter Apfelweintrinker kennt er jede Wirtschaft.',
      kategorie: 'menschen'
    },
    {
      id: 'h-592',
      ausdruck: 'Schlotzje',
      hochdeutsch: 'Lutscher / Bonbon',
      bedeutung: 'Das „Schlotzje" ist im Hessischen ein Lutscher oder Bonbon zum Schlecken — abgeleitet vom „schlotze" (lutschen, langsam trinken). „Des Kind krischt a Schlotzje vom Opa!" Das Wort gehört zum kindlichen Süßigkeitenvokabular. Ein buntes Schlotzje vom Jahrmarkt oder vom Großvater ist für die Kleinen ein besonderes Vergnügen.',
      beispiel: 'Fürs brave Kind gibts a Schlotzje vonner Oma.',
      beispiel_hd: 'Für das brave Kind gibt es einen Lutscher von der Oma.',
      kategorie: 'essen'
    },
    {
      id: 'h-593',
      ausdruck: 'schlotze',
      hochdeutsch: 'genüsslich trinken / schlürfen',
      bedeutung: 'Das hessische „schlotze" bedeutet, ein Getränk genüsslich und langsam zu trinken oder zu schlürfen. „Mer schlotze gemütlich unser Schoppe!" Das Wort beschreibt das behagliche, in Ruhe Trinken und gehört zum geselligen Wirtshausvokabular. Wer seinen Apfelwein schlotzt, genießt ihn in aller Gemütlichkeit, ohne Eile.',
      beispiel: 'Am Abend schlotze mer noch gemütlich a Schoppe Ebbelwoi.',
      beispiel_hd: 'Am Abend trinken wir noch gemütlich einen Schoppen Apfelwein.',
      kategorie: 'essen'
    },
    {
      id: 'h-594',
      ausdruck: 'Stubbedick',
      hochdeutsch: 'rundliches Kind / Pummelchen',
      bedeutung: 'Ein „Stubbedick" ist im Hessischen ein kleines, rundliches, wohlgenährtes Kind — liebevoll für ein Pummelchen. „Unser klaaner Stubbedick is so süß!" Das Wort verbindet die Stube (in der man sitzt) augenzwinkernd mit der Rundlichkeit und gehört zum zärtlichen Familienvokabular für mollige, gemütliche kleine Kinder.',
      beispiel: 'Der klaa Stubbedick krabbelt vergnügt durchs Zimmer.',
      beispiel_hd: 'Das kleine Pummelchen krabbelt vergnügt durchs Zimmer.',
      kategorie: 'familie'
    },
    {
      id: 'h-595',
      ausdruck: 'Schnüffelnas',
      hochdeutsch: 'neugieriger Mensch',
      bedeutung: 'Eine „Schnüffelnas" ist im Hessischen jemand, der überall die Nase reinsteckt und neugierig herumschnüffelt. „Sei net so a Schnüffelnas!" Das Wort verbindet das Schnüffeln mit der Nase zu einem bildhaften Spottnamen für aufdringlich Neugierige und gehört zum hessischen Menschenvokabular. Eine Schnüffelnas will stets alles ganz genau wissen.',
      beispiel: 'Die Schnüffelnas vonner Nachbarschaft weiß immer alles.',
      beispiel_hd: 'Der Neugierige aus der Nachbarschaft weiß immer alles.',
      kategorie: 'menschen'
    },
    {
      id: 'h-596',
      ausdruck: 'Riwweleskuche',
      hochdeutsch: 'Streuselkuchen',
      bedeutung: 'Der „Riwweleskuche" ist im Hessischen der Streuselkuchen mit den typischen Butterstreuseln (Riwwele) obendrauf. „Zum Kaffee gibts Riwweleskuche!" Das Wort gehört zur hessischen Backtradition. Der frisch gebackene Riwweleskuche mit seiner knusprigen Streuseldecke ist ein Klassiker auf jeder Kaffeetafel und beim Sonntagsbesuch.',
      beispiel: 'Die Oma backt de beste Riwweleskuche weit un breit.',
      beispiel_hd: 'Die Oma backt den besten Streuselkuchen weit und breit.',
      kategorie: 'essen'
    },
    {
      id: 'h-597',
      ausdruck: 'verdaddert',
      hochdeutsch: 'verwirrt / durcheinander',
      bedeutung: 'Wer „verdaddert" ist, ist verwirrt, durcheinander oder fahrig — verwandt mit „daddrich". „Ich bin heut ganz verdaddert!" Das Wort beschreibt einen Zustand der Konfusion und Zerstreutheit und gehört zum gefühlsbetonten Alltagsvokabular. Wer verdaddert ist, vergisst Dinge, verlegt Schlüssel und weiß kaum, wo ihm der Kopf steht.',
      beispiel: 'Vom viele Stress bin ich heut ganz verdaddert.',
      beispiel_hd: 'Vom vielen Stress bin ich heute ganz durcheinander.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-598',
      ausdruck: 'Worschdezipfel',
      hochdeutsch: 'Wurstende / Wurstzipfel',
      bedeutung: 'Der „Worschdezipfel" ist im Hessischen das abgebundene Endstück einer Wurst. „De Worschdezipfel krischt de Hund!" Das Wort gehört zum alltäglichen Essvokabular. Das kleine Endstück der Wurst, der Worschdezipfel, landet oft im Napf des Haushunds oder wird als letzter Bissen verspeist.',
      beispiel: 'De letzte Worschdezipfel hat de Hund gleich verschlunge.',
      beispiel_hd: 'Das letzte Wurstende hat der Hund gleich verschlungen.',
      kategorie: 'essen'
    },
    {
      id: 'h-599',
      ausdruck: 'Hosescheißer',
      hochdeutsch: 'Feigling / Angsthase',
      bedeutung: 'Ein „Hosescheißer" ist im Hessischen ein Feigling, der vor lauter Angst die Hosen voll hat. „Sei kaa Hosescheißer, spring endlich!" Das derb-bildhafte Wort tadelt Ängstlichkeit und Mutlosigkeit und gehört zum direkten hessischen Schimpfvokabular. Trotz seiner Grobheit wird es oft eher neckisch unter Freunden gebraucht.',
      beispiel: 'So a Hosescheißer, der traut sich ja nix.',
      beispiel_hd: 'So ein Angsthase, der traut sich ja nichts.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-600',
      ausdruck: 'Schnüss',
      hochdeutsch: 'Mund / Schnauze',
      bedeutung: 'Die „Schnüss" ist im Hessischen der Mund oder die Schnauze, oft etwas derb gebraucht. „Halt dei Schnüss!" bedeutet, still zu sein. Das Wort gehört zum direkten Körpervokabular. „A große Schnüss hawwe" meint, vorlaut und großmäulig zu sein. Die Schnüss kommt in vielen kräftigen hessischen Wendungen vor.',
      beispiel: 'Mach net so a große Schnüss un beweis es erst mol!',
      beispiel_hd: 'Mach nicht so eine große Schnauze und beweise es erst mal!',
      kategorie: 'koerper'
    },
    {
      id: 'h-601',
      ausdruck: 'Schissbüggs',
      hochdeutsch: 'Angsthase / Feigling',
      bedeutung: 'Eine „Schissbüggs" (Scheißbüchse) ist im Hessischen ein furchtsamer Mensch, ein Angsthase. „Stell dich net so a, du Schissbüggs!" Das derbe, aber meist scherzhaft gebrauchte Wort tadelt übergroße Ängstlichkeit und gehört zum bildhaften Schimpfvokabular. Eine echte Schissbüggs zaudert bei jeder Mutprobe und macht lieber einen Rückzieher.',
      beispiel: 'Die Schissbüggs traut sich net mol vom Dreier ins Wasser.',
      beispiel_hd: 'Der Angsthase traut sich nicht mal vom Dreier ins Wasser.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-602',
      ausdruck: 'Knäppche',
      hochdeutsch: 'Brötchenende / kleiner Brotkanten',
      bedeutung: 'Das „Knäppche" ist im Frankfurter Raum das knusprige Endstück eines Brötchens oder Brotlaibs — verwandt mit dem Knorze. „Des Knäppche schmeckt mit Butter am beste!" Das Wort gehört zum Brotvokabular. Um das begehrte, knusprige Knäppche mit der harten Kruste streiten sich am Frühstückstisch gern die Kinder.',
      beispiel: 'Gib mer des Knäppche, ich mag die knusprige Kruste.',
      beispiel_hd: 'Gib mir das Brötchenende, ich mag die knusprige Kruste.',
      kategorie: 'essen'
    },
    {
      id: 'h-603',
      ausdruck: 'Gewerch',
      hochdeutsch: 'mühsame Arbeit / Plackerei',
      bedeutung: 'Das „Gewerch" ist im Hessischen mühsame, anstrengende Arbeit oder eine umständliche Plackerei. „Des war vielleicht a Gewerch heut!" Das Wort drückt aus, dass etwas viel Mühe und Schweiß gekostet hat, und gehört zum hessischen Arbeitsvokabular. Nach einem langen Tag voller Gewerch sehnt man sich nach dem wohlverdienten Feierabend.',
      beispiel: 'De Umzug war a einziges Gewerch von früh bis spät.',
      beispiel_hd: 'Der Umzug war eine einzige Plackerei von früh bis spät.',
      kategorie: 'arbeit'
    },
    {
      id: 'h-604',
      ausdruck: 'Schmierbatze',
      hochdeutsch: 'Schmierfleck / Klecks',
      bedeutung: 'Ein „Schmierbatze" ist im Hessischen ein dicker Schmierfleck, Klecks oder verwischter Schmutzfleck. „Du hast a Schmierbatze aufm Gesicht!" Das Wort verbindet das Schmieren mit „Batze" (Klumpen) und gehört zum bildhaften Alltagsvokabular. Ein Schmierbatze von Marmelade oder Farbe ist schnell gemacht und oft mühsam zu entfernen.',
      beispiel: 'Aufm Tisch is a großer Schmierbatze von der Schokolad.',
      beispiel_hd: 'Auf dem Tisch ist ein großer Schmierfleck von der Schokolade.',
      kategorie: 'alltag'
    },
    {
      id: 'h-605',
      ausdruck: 'Schnüffelei',
      hochdeutsch: 'aufdringliche Neugier / Spionage',
      bedeutung: 'Die „Schnüffelei" ist im Hessischen das aufdringliche Herumschnüffeln in fremden Angelegenheiten. „Die ständige Schnüffelei geht mer auf de Geist!" Das Wort tadelt indiskrete Neugier und Spitzeltum und gehört zum gefühlsbetonten Menschenvokabular. Wer ständig Schnüffelei betreibt, macht sich in der Nachbarschaft schnell unbeliebt.',
      beispiel: 'Die Schnüffelei vom Nachbar nervt die ganze Straß.',
      beispiel_hd: 'Die Spionage vom Nachbarn nervt die ganze Straße.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-606',
      ausdruck: 'Stippche mache',
      hochdeutsch: 'kurz vorbeischauen / einen Abstecher machen',
      bedeutung: 'Wer „a Stippche macht", schaut kurz bei jemandem vorbei oder macht einen kleinen Abstecher. „Ich mach noch schnell a Stippche bei der Oma!" Die Wendung beschreibt den kurzen, unangekündigten Besuch und gehört zum geselligen Alltagsvokabular. Auf dem Heimweg macht man gern noch ein Stippche bei Freunden oder Verwandten.',
      beispiel: 'Aufm Heimweg will ich noch a Stippche mache beim Schorsch.',
      beispiel_hd: 'Auf dem Heimweg will ich noch kurz beim Georg vorbeischauen.',
      kategorie: 'alltag'
    },
    {
      id: 'h-607',
      ausdruck: 'Gickelche',
      hochdeutsch: 'Küken / kleines Huhn',
      bedeutung: 'Das „Gickelche" ist im Hessischen ein kleines Küken oder Hühnchen — die Verkleinerung von „Gickel". „Guck die süße Gickelche im Hof!" Das Wort gehört zum bäuerlichen Naturvokabular. Im Frühjahr piepsen die frisch geschlüpften Gickelche auf dem Bauernhof und folgen der Glucke auf Schritt und Tritt.',
      beispiel: 'Die klaane Gickelche piepse im ganze Hof.',
      beispiel_hd: 'Die kleinen Küken piepsen im ganzen Hof.',
      kategorie: 'natur'
    },
    {
      id: 'h-608',
      ausdruck: 'Schnüsseldier',
      hochdeutsch: 'verschmustes Tier / Schmusekatze',
      bedeutung: 'Ein „Schnüsseldier" ist im Hessischen ein anschmiegsames, verschmustes Tier oder, liebevoll, ein verschmuster Mensch — vom Schnüss (Schnauze, Mund). „Die Katz is a echtes Schnüsseldier!" Das zärtliche Wort gehört zum liebevollen Vokabular und beschreibt jeden, der gern kuschelt und Nähe sucht, ob Mensch oder Haustier.',
      beispiel: 'Unser Hund is a richtiges Schnüsseldier un will immer kuschele.',
      beispiel_hd: 'Unser Hund ist ein richtiges Schmusetier und will immer kuscheln.',
      kategorie: 'natur'
    },
    {
      id: 'h-609',
      ausdruck: 'Worschdmaschin',
      hochdeutsch: 'Fleischwolf / Wurstmaschine',
      bedeutung: 'Die „Worschdmaschin" ist im Hessischen der Fleischwolf oder die Wurstmaschine, mit der bei der Hausschlachtung Wurst gemacht wird. „Dreh des Fleisch durch die Worschdmaschin!" Das Wort gehört zum traditionellen Schlachtvokabular. An der handbetriebenen Worschdmaschin wurde früher das Brät für die hausgemachte Wurst gewolft.',
      beispiel: 'Mit der alte Worschdmaschin macht Opa nochs selbst die Worscht.',
      beispiel_hd: 'Mit der alten Wurstmaschine macht Opa noch selbst die Wurst.',
      kategorie: 'essen'
    },
    {
      id: 'h-610',
      ausdruck: 'verbabbeln',
      hochdeutsch: 'sich versprechen / verplappern',
      bedeutung: 'Wer sich „verbabbelt", verspricht sich beim Reden oder plaudert etwas aus, das geheim bleiben sollte — vom „babbele". „Pass auf, dass du dich net verbabbelst!" Die Wendung warnt davor, sich im Eifer des Gesprächs zu verplappern, und gehört zum hessischen Alltagsvokabular rund ums viele Reden.',
      beispiel: 'Beim Klatsche tu ich mich leicht verbabbeln un sag zu viel.',
      beispiel_hd: 'Beim Tratschen verplappere ich mich leicht und sage zu viel.',
      kategorie: 'alltag'
    },
    {
      id: 'h-611',
      ausdruck: 'Hutzelmännche',
      hochdeutsch: 'kleines verschrumpeltes Männchen',
      bedeutung: 'Ein „Hutzelmännche" ist im Hessischen ein kleines, runzliges, verschrumpeltes altes Männlein — von „hutzelig" (verschrumpelt). „Des alt Hutzelmännche wohnt am Waldrand." Das Wort hat einen märchenhaften Klang und gehört zum bildhaften Menschenvokabular. In Sagen und Geschichten taucht das geheimnisvolle Hutzelmännche oft als Waldgeist auf.',
      beispiel: 'Im Märche kommt a klaaner Hutzelmännche vor.',
      beispiel_hd: 'Im Märchen kommt ein kleines verschrumpeltes Männchen vor.',
      kategorie: 'menschen'
    },
    {
      id: 'h-612',
      ausdruck: 'Schoppeglöckche',
      hochdeutsch: 'Feierabendzeit / Zeit für den Apfelwein',
      bedeutung: 'Das „Schoppeglöckche" ist im Frankfurter Raum scherzhaft die Zeit, zu der man Feierabend macht und sich den ersten Schoppen Apfelwein gönnt. „Es läut des Schoppeglöckche!" Die Wendung signalisiert humorvoll, dass die Arbeit getan ist und die gesellige Runde im Wirtshaus beginnen kann.',
      beispiel: 'Punkt sechs läut fürn Schorsch des Schoppeglöckche.',
      beispiel_hd: 'Punkt sechs läutet für den Georg die Feierabendzeit.',
      kategorie: 'feiern'
    },
    {
      id: 'h-613',
      ausdruck: 'Schnäppche',
      hochdeutsch: 'kleiner Schnaps / Stamperl',
      bedeutung: 'Das „Schnäppche" ist im Hessischen ein kleiner Schnaps, ein Stamperl, das man zum Verdauen oder zur Geselligkeit trinkt. „Komm, mer trinke noch a Schnäppche!" Das Wort gehört zum geselligen Trinkvokabular. Nach einem deftigen Essen rundet ein klares Schnäppche die Mahlzeit ab und fördert die Verdauung.',
      beispiel: 'Nachem Esse gibts a Schnäppche zum Verdaue.',
      beispiel_hd: 'Nach dem Essen gibt es einen kleinen Schnaps zum Verdauen.',
      kategorie: 'essen'
    },
    {
      id: 'h-614',
      ausdruck: 'Plärrbabbe',
      hochdeutsch: 'Schreihals / Heulsuse',
      bedeutung: 'Eine „Plärrbabbe" ist im Hessischen jemand, der viel und laut weint oder schreit — vom „plärre" (laut weinen). „Sei kaa Plärrbabbe, des is doch net schlimm!" Das Wort tadelt liebevoll-spöttisch häufiges Weinen, besonders bei Kindern, und gehört zum bildhaften Menschenvokabular. Eine echte Plärrbabbe fängt bei jeder Kleinigkeit an zu heulen.',
      beispiel: 'Der klaa Plärrbabbe heult wege jedem Kratzer.',
      beispiel_hd: 'Der kleine Schreihals heult wegen jedem Kratzer.',
      kategorie: 'menschen'
    },
    {
      id: 'h-615',
      ausdruck: 'Kerwe',
      hochdeutsch: 'Kirchweihfest / Dorffest',
      bedeutung: 'Die „Kerwe" ist in Südhessen das Kirchweihfest, das ausgelassene Dorffest mit Festzelt, Musik und Apfelwein. „Am Wochenend is bei uns Kerwe!" Das Wort (auch Kerb) bezeichnet den jährlichen Höhepunkt im Dorfleben, wenn die Kerweborsche den Kerwebaum aufstellen und die ganze Gemeinde drei Tage lang feiert.',
      beispiel: 'Zur Kerwe stelle die Borsche de Kerwebaam uff.',
      beispiel_hd: 'Zur Kirchweih stellen die Burschen den Kirchweihbaum auf.',
      kategorie: 'feiern'
    },
    {
      id: 'h-616',
      ausdruck: 'Schoppestub',
      hochdeutsch: 'Apfelweinwirtschaft / Gaststube',
      bedeutung: 'Die „Schoppestub" ist im Hessischen die gemütliche Gaststube, in der Apfelwein im Schoppen ausgeschenkt wird. „Mer treffe uns in der Schoppestub!" Das Wort gehört zum geselligen Wirtshausvokabular. In der urigen Schoppestub sitzt man auf Holzbänken, trinkt sein Geripptes und babbelt mit den Nachbarn.',
      beispiel: 'In der Schoppestub is heut Abend richtig was los.',
      beispiel_hd: 'In der Apfelweinstube ist heute Abend richtig was los.',
      kategorie: 'orte'
    },
    {
      id: 'h-617',
      ausdruck: 'Bobbeskält',
      hochdeutsch: 'Eiseskälte / klirrende Kälte',
      bedeutung: 'Die „Bobbeskält" ist im Hessischen eine klirrende, beißende Kälte — eine derb-bildhafte Verstärkung für strenge Winterkälte. „Draußen herrscht a Bobbeskält!" Das Wort gehört zum gefühlsbetonten Naturvokabular der kalten Jahreszeit. Bei dieser Bobbeskält bleibt man am liebsten am warmen Ofen sitzen und geht nicht vor die Tür.',
      beispiel: 'Heut morge war a richtige Bobbeskält draußen.',
      beispiel_hd: 'Heute Morgen war eine richtige Eiseskälte draußen.',
      kategorie: 'natur'
    },
    {
      id: 'h-618',
      ausdruck: 'Schnaagdestich',
      hochdeutsch: 'Mückenstich (norddt. Form)',
      bedeutung: 'Ein „Schnaagdestich" ist im nordhessischen Raum der juckende Stich einer Schnaake (Stechmücke). „De Schnaagdestich juckt fürchterlich!" Das Wort gehört zum sommerlichen Körpervokabular und ist die nordhessische Variante des Mückenstichs. Nach einem lauen Sommerabend im Garten hat man schnell etliche Schnaagdestich an Armen und Beinen.',
      beispiel: 'Vom Abend am See hab ich überall Schnaagdestich.',
      beispiel_hd: 'Vom Abend am See habe ich überall Mückenstiche.',
      kategorie: 'koerper'
    },
    {
      id: 'h-619',
      ausdruck: 'Schwätzerstub',
      hochdeutsch: 'Treffpunkt zum Plaudern / Klatschecke',
      bedeutung: 'Die „Schwätzerstub" ist im Hessischen scherzhaft der Ort, an dem man sich zum ausgiebigen Plaudern und Klatschen trifft. „Beim Bäcker is die reinste Schwätzerstub!" Das Wort verbindet den „Schwätzer" mit der Stube und gehört zum geselligen Alltagsvokabular. In der dörflichen Schwätzerstub erfährt man alle Neuigkeiten aus der Nachbarschaft.',
      beispiel: 'Der Friseurlade is bei uns die richtige Schwätzerstub.',
      beispiel_hd: 'Der Friseurladen ist bei uns die richtige Klatschecke.',
      kategorie: 'orte'
    },
    {
      id: 'h-620',
      ausdruck: 'Worschdebrüh',
      hochdeutsch: 'Wurstbrühe / Suppengrundlage',
      bedeutung: 'Die „Worschdebrüh" ist im Hessischen die kräftige Brühe vom Wurstkochen, die als würzige Suppengrundlage dient. „Aus der Worschdebrüh koche mer a deftige Supp!" Das Wort gehört zum bodenständigen Küchenvokabular. Die heiße Worschdebrüh vom Schlachttag wird sparsam verwertet und gibt der Suppe ihren herzhaften Geschmack.',
      beispiel: 'In der Worschdebrüh koche mer noch Nudele rein.',
      beispiel_hd: 'In der Wurstbrühe kochen wir noch Nudeln hinein.',
      kategorie: 'essen'
    },
    {
      id: 'h-621',
      ausdruck: 'allbott',
      hochdeutsch: 'immer wieder / ständig',
      bedeutung: 'Das hessische „allbott" bedeutet „immer wieder", „dauernd" oder „bei jeder Gelegenheit". „Der kommt allbott vorbei un will was!" Das Wort gehört zum alltäglichen Vokabular und drückt eine sich wiederholende Häufigkeit aus. Wer allbott dasselbe sagt, wiederholt sich ständig und nervt damit seine Mitmenschen.',
      beispiel: 'Du fragst mich allbott des Gleiche, des nervt langsam.',
      beispiel_hd: 'Du fragst mich ständig dasselbe, das nervt langsam.',
      kategorie: 'alltag'
    },
    {
      id: 'h-622',
      ausdruck: 'Schmierkäs',
      hochdeutsch: 'Streichkäse / Frischkäse',
      bedeutung: 'Der „Schmierkäs" ist im Hessischen der weiche Streichkäse oder Frischkäse, den man aufs Brot streicht. „Aufs Brieche kommt a dicker Schmierkäs!" Das Wort gehört zum alltäglichen Brotvokabular. Ein frisches Brötchen mit cremigem Schmierkäs und etwas Schnittlauch ist ein beliebtes hessisches Frühstück oder Vesper.',
      beispiel: 'Streich mer a bissje Schmierkäs aufs Brot.',
      beispiel_hd: 'Streich mir ein bisschen Streichkäse aufs Brot.',
      kategorie: 'essen'
    },
    {
      id: 'h-623',
      ausdruck: 'Hennegack',
      hochdeutsch: 'Hühnergegacker / Durcheinandergerede',
      bedeutung: 'Das „Hennegack" ist im Hessischen das laute Gegacker der Hühner, übertragen aufgeregtes Durcheinandergerede mehrerer Leute. „Bei euch is ja a Hennegack wie im Stall!" Das bildhafte Wort vergleicht wirres, lautes Geschnatter mit gackernden Hühnern und gehört zum spöttischen Alltagsvokabular für lärmende Gesprächsrunden.',
      beispiel: 'Bei dem Hennegack versteht mer ja sei eigenes Wort net.',
      beispiel_hd: 'Bei dem Durcheinandergerede versteht man ja sein eigenes Wort nicht.',
      kategorie: 'gefuehle'
    },
    {
      id: 'h-624',
      ausdruck: 'Grumbeeresupp',
      hochdeutsch: 'Kartoffelsuppe',
      bedeutung: 'Die „Grumbeeresupp" ist die hessische Kartoffelsuppe — von „Grumbeer" (Kartoffel). „Heut gibts a deftige Grumbeeresupp mit Würstcher!" Das Wort gehört zur bodenständigen Hausmannskost. Die sämige Grumbeeresupp mit Suppengrün und Wurstscheiben ist ein wärmendes Wintergericht und ein Klassiker der hessischen Küche.',
      beispiel: 'Die Grumbeeresupp koch ich mit viel Majoran.',
      beispiel_hd: 'Die Kartoffelsuppe koche ich mit viel Majoran.',
      kategorie: 'essen'
    },
    {
      id: 'h-625',
      ausdruck: 'Schlappschwanz',
      hochdeutsch: 'energieloser Mensch / Schwächling',
      bedeutung: 'Ein „Schlappschwanz" ist im Hessischen ein energieloser, antriebsarmer oder mutloser Mensch. „Sei kaa Schlappschwanz, jetzt streng dich a!" Das Wort tadelt Schlaffheit und mangelnde Tatkraft und gehört zum direkten hessischen Schimpfvokabular. Wer als Schlappschwanz gilt, lässt sich gehen und packt nicht beherzt an.',
      beispiel: 'So a Schlappschwanz, der gibt bei allem gleich auf.',
      beispiel_hd: 'So ein Schwächling, der gibt bei allem gleich auf.',
      kategorie: 'schimpf'
    },
    {
      id: 'h-626',
      ausdruck: 'Schoppewein',
      hochdeutsch: 'offener Wein im Schoppenglas',
      bedeutung: 'Der „Schoppewein" ist im Hessischen der offen ausgeschenkte Wein, der im Schoppenglas serviert wird — besonders im Rheingau und an der Bergstraße. „Mer trinke a Schoppewein zum Vesper!" Das Wort gehört zur Weinkultur der hessischen Weinregionen. Der frische, junge Schoppewein wird gern in der Straußwirtschaft genossen.',
      beispiel: 'Im Rheigau gibts de beste Schoppewein direkt vom Winzer.',
      beispiel_hd: 'Im Rheingau gibt es den besten offenen Wein direkt vom Winzer.',
      kategorie: 'essen'
    },
    {
      id: 'h-627',
      ausdruck: 'Schnüddelche',
      hochdeutsch: 'Schnäuzchen / kleines Näschen',
      bedeutung: 'Das „Schnüddelche" ist im Hessischen das kleine Näschen eines Kindes oder ein Kosewort dafür — die Verkleinerung von Schnüddel. „Putz dem Bobbelsche des Schnüddelche!" Das zärtliche Wort gehört zum liebevollen Familienvokabular. Liebevoll wischt die Mutter dem Kleinen das verschnupfte Schnüddelche und tröstet es dabei.',
      beispiel: 'Komm her, ich putz dir des Schnüddelche ab.',
      beispiel_hd: 'Komm her, ich putze dir das Näschen ab.',
      kategorie: 'familie'
    },
    {
      id: 'h-628',
      ausdruck: 'Worschdmarkt',
      hochdeutsch: 'Volksfest mit Wurstständen',
      bedeutung: 'Der „Worschdmarkt" ist im hessischen Raum ein traditionelles Volks- und Marktfest, auf dem Wurst, Wein und allerlei Köstlichkeiten feilgeboten werden. „Am Wochenend gehe mer auf de Worschdmarkt!" Das Wort gehört zum festlichen Vokabular. Auf dem geselligen Worschdmarkt trifft sich die ganze Gegend zum Schlemmen und Feiern.',
      beispiel: 'Aufm Worschdmarkt gibts Bratwurscht un Schoppewein.',
      beispiel_hd: 'Auf dem Wurstmarkt gibt es Bratwurst und offenen Wein.',
      kategorie: 'feiern'
    },
    {
      id: 'h-629',
      ausdruck: 'verschnuffe',
      hochdeutsch: 'verschnaufen / Atem holen',
      bedeutung: 'Wer „verschnuft", holt nach einer Anstrengung Atem und ruht sich kurz aus. „Lass mich erst mol verschnuffe!" Das Wort gehört zum hessischen Alltagsvokabular nach körperlicher Mühe. Nach dem Treppensteigen oder der Gartenarbeit muss man erst einmal verschnuffe, bevor man weitermacht.',
      beispiel: 'Nach der steile Trepp muss ich erst mol verschnuffe.',
      beispiel_hd: 'Nach der steilen Treppe muss ich erst mal verschnaufen.',
      kategorie: 'koerper'
    },
    {
      id: 'h-630',
      ausdruck: 'Schmierseif',
      hochdeutsch: 'Schmierseife / weiche Seife',
      bedeutung: 'Die „Schmierseif" ist im Hessischen die weiche, grüne Schmierseife, mit der früher Böden und grober Schmutz geputzt wurden. „Wisch de Bode mit Schmierseif!" Das Wort gehört zum alltäglichen Haushaltsvokabular. Mit Wasser und kräftiger Schmierseif wurden die Holzdielen und Steinböden gründlich geschrubbt.',
      beispiel: 'Den dreckige Bode schrubb ich mit Schmierseif.',
      beispiel_hd: 'Den dreckigen Boden schrubbe ich mit Schmierseife.',
      kategorie: 'alltag'
    },
    {
      id: 'h-631',
      ausdruck: 'Gehannsbeer',
      hochdeutsch: 'Johannisbeere',
      bedeutung: 'Die „Gehannsbeer" ist im Hessischen die Johannisbeere, die um den Johannistag (24. Juni) reif wird. „Aus de rote Gehannsbeer mach ich Gelee!" Das Wort gehört zum Garten- und Obstvokabular. Die roten und schwarzen Gehannsbeer aus dem heimischen Garten werden zu Marmelade, Saft und Kuchen verarbeitet.',
      beispiel: 'Im Juni pflück ich die rote Gehannsbeer im Garte.',
      beispiel_hd: 'Im Juni pflücke ich die roten Johannisbeeren im Garten.',
      kategorie: 'natur'
    },
    {
      id: 'h-632',
      ausdruck: 'Hannebambeleskram',
      hochdeutsch: 'unnötiger Schnickschnack / Kinderkram',
      bedeutung: 'Der „Hannebambeleskram" ist im Hessischen unnötiger Schnickschnack, kindischer Unfug oder umständliches Getue — abgeleitet vom „Hannebambel" (Schwächling, Tollpatsch). „Lass de Hannebambeleskram un mach es g\'scheit!" Das Wort tadelt überflüssigen, läppischen Aufwand und gehört zum bildhaften hessischen Alltagsvokabular.',
      beispiel: 'De ganze Hannebambeleskram brauche mer doch gar net.',
      beispiel_hd: 'Den ganzen unnötigen Schnickschnack brauchen wir doch gar nicht.',
      kategorie: 'alltag'
    },
    {
      id: 'h-633',
      ausdruck: 'Worschdfest',
      hochdeutsch: 'Schlachtfest',
      bedeutung: 'Das „Worschdfest" ist im Hessischen das geselliges Schlachtfest, bei dem nach der Hausschlachtung frische Wurst, Wellfleisch und Worschdesupp gegessen werden. „Beim Bauer is am Samstag Worschdfest!" Das Wort gehört zur ländlichen Festtradition. Zum Worschdfest kommt die ganze Verwandtschaft zusammen und lässt es sich gut gehen.',
      beispiel: 'Aufm Worschdfest gibts frische Bratwurscht un Wellfleisch.',
      beispiel_hd: 'Auf dem Schlachtfest gibt es frische Bratwurst und Wellfleisch.',
      kategorie: 'feiern'
    },
    {
      id: 'h-634',
      ausdruck: 'Schlabberlatz',
      hochdeutsch: 'Lätzchen / Sabberlätzchen',
      bedeutung: 'Der „Schlabberlatz" ist im Hessischen das Lätzchen, das man kleinen Kindern beim Essen umbindet, damit sie sich nicht bekleckern. „Bind dem Bobbelsche de Schlabberlatz um!" Das Wort gehört zum Familienvokabular rund ums Kleinkind. Ohne Schlabberlatz wäre nach jeder Mahlzeit das ganze Hemdchen voller Brei.',
      beispiel: 'Ohne Schlabberlatz bekleckert sich des Kind beim Esse total.',
      beispiel_hd: 'Ohne Lätzchen bekleckert sich das Kind beim Essen total.',
      kategorie: 'familie'
    },
    {
      id: 'h-635',
      ausdruck: 'Schnüddelnas',
      hochdeutsch: 'Kind mit laufender Nase / Rotznase',
      bedeutung: 'Eine „Schnüddelnas" ist im Hessischen ein Kind mit laufender Nase oder, spöttisch, ein vorlauter kleiner Dreikäsehoch. „Du klaa Schnüddelnas, was babbelst du da!" Das Wort verbindet den Schnüddel (Nasenschleim) mit der Nase und gehört zum bildhaften Familienvokabular für naseweise oder verschnupfte Kinder.',
      beispiel: 'Die klaa Schnüddelnas will schon alles besser wisse.',
      beispiel_hd: 'Die kleine Rotznase will schon alles besser wissen.',
      kategorie: 'familie'
    },
    {
      id: 'h-636',
      ausdruck: 'Bettschisser',
      hochdeutsch: 'Löwenzahn (Volksname)',
      bedeutung: 'Der „Bettschisser" ist im Hessischen ein derb-volkstümlicher Name für den Löwenzahn, dessen harntreibende Wirkung dem Volksmund den Namen gab. „Auf der Wiese blühe lauter Bettschisser!" Das Wort gehört zum bäuerlichen Naturvokabular. Die gelben Bettschisser bedecken im Frühling ganze Wiesen und Wegränder mit ihrer leuchtenden Blütenpracht.',
      beispiel: 'Die Wiese is im Mai voller gelber Bettschisser.',
      beispiel_hd: 'Die Wiese ist im Mai voller gelbem Löwenzahn.',
      kategorie: 'natur'
    },
    {
      id: 'h-637',
      ausdruck: 'Schoppekönig',
      hochdeutsch: 'trinkfester Apfelweinkenner',
      bedeutung: 'Ein „Schoppekönig" ist im Frankfurter Raum scherzhaft der trinkfeste Stammgast, der sich beim Apfelwein wie ein König fühlt und die Runde anführt. „Der Schorsch is de Schoppekönig vonner Wirtschaft!" Das Wort ist liebevoll-anerkennend und gehört zum geselligen Wirtshausvokabular rund um den Ebbelwoi und seine treuesten Liebhaber.',
      beispiel: 'Als Schoppekönig gibt de Schorsch im Wirtshaus de Ton a.',
      beispiel_hd: 'Als Apfelweinkenner gibt der Georg im Wirtshaus den Ton an.',
      kategorie: 'menschen'
    },
    {
      id: 'h-638',
      ausdruck: 'Quetschekommodde',
      hochdeutsch: 'Akkordeon / Ziehharmonika',
      bedeutung: 'Die „Quetschekommodde" ist im Hessischen ein scherzhafter Name fürs Akkordeon oder die Ziehharmonika — weil man das Instrument zusammenquetscht wie eine Kommode. „Hol die Quetschekommodde, mer singe a Liedsche!" Das Wort gehört zum musikalischen Vokabular. Zur Kerwe und beim Frühschoppen spielt einer auf der Quetschekommodde zum Schunkeln auf.',
      beispiel: 'Zur Feier spielt de Opa uff der Quetschekommodde.',
      beispiel_hd: 'Zur Feier spielt der Opa auf dem Akkordeon.',
      kategorie: 'musik'
    },
    {
      id: 'h-639',
      ausdruck: 'Schunkelmusik',
      hochdeutsch: 'Musik zum Schunkeln',
      bedeutung: 'Die „Schunkelmusik" ist im Hessischen die fröhliche, im Dreivierteltakt schwingende Musik, zu der man sich Arm in Arm hin und her wiegt. „Bei der Schunkelmusik hält keiner still!" Das Wort gehört zum festlichen Musikvokabular. Auf jeder Kerwe und Fastnachtsfeier sorgt die Schunkelmusik dafür, dass die ganze Runde mitschunkelt.',
      beispiel: 'Sobald die Schunkelmusik losgeht, wiege sich alle mit.',
      beispiel_hd: 'Sobald die Schunkelmusik losgeht, wiegen sich alle mit.',
      kategorie: 'musik'
    },
    {
      id: 'h-640',
      ausdruck: 'Worschdsänger',
      hochdeutsch: 'mäßiger Sänger / Gelegenheitssänger',
      bedeutung: 'Ein „Worschdsänger" ist im Hessischen ein mittelmäßiger Gelegenheitssänger, der eher aus Geselligkeit als aus Können singt. „Im Chor sind a paar Worschdsänger dabei!" Das Wort ist gutmütig-spöttisch und gehört zum musikalischen Menschenvokabular. Ein echter Worschdsänger trifft nicht jeden Ton, hat aber bei Kerwe und Stammtisch die größte Freude am Singen.',
      beispiel: 'Als Worschdsänger schmettert er trotzdem jedes Liedsche mit.',
      beispiel_hd: 'Als Gelegenheitssänger schmettert er trotzdem jedes Liedchen mit.',
      kategorie: 'musik'
    },
    {
      id: 'h-641',
      ausdruck: 'Gerippte',
      hochdeutsch: 'geripptes Apfelwein-Glas',
      bedeutung: 'Es Gerippte ist das typische Frankfurter Apfelwein-Glas mit dem rautenförmig geripptem Muster, das den Schoppen besser greifbar macht. Aus em Gerippte schmeckt der Ebbelwoi am beschte. Ein Wahrzeichen der hessischen Trinkkultur.',
      beispiel: 'Schenk mer en Schobbe ins Gerippte!',
      beispiel_hd: 'Schenk mir einen Schoppen ins geripptes Glas!',
      kategorie: 'essen'
    },
    {
      id: 'h-642',
      ausdruck: 'Handkäs',
      hochdeutsch: 'Sauermilchkäse',
      bedeutung: 'Handkäs ist der gelbe Sauermilchkäse, der mit Musik (Zwiebeln, Essig, Öl) serviert wird. Handkäs mit Musik gehört zum Ebbelwoi wie de Bembel. Eine ikonische hessische Spezialität mit kräftigem Geruch und Geschmack.',
      beispiel: 'Zum Schobbe gibts Handkäs mit Musik.',
      beispiel_hd: 'Zum Schoppen gibt es Handkäse mit Musik.',
      kategorie: 'essen'
    },
    {
      id: 'h-643',
      ausdruck: 'Schobbe',
      hochdeutsch: 'Schoppen (Glas Apfelwein)',
      bedeutung: 'Da Schobbe ist der Schoppen, das Standardmaß Apfelwein im Gerippte. Mer trinke noch en Schobbe heißt „wir trinken noch ein Glas Apfelwein". Maßeinheit der hessischen Geselligkeit.',
      beispiel: 'Mer trinke noch en Schobbe Ebbelwoi.',
      beispiel_hd: 'Wir trinken noch einen Schoppen Apfelwein.',
      kategorie: 'essen'
    },
    {
      id: 'h-644',
      ausdruck: 'Riwwele',
      hochdeutsch: 'Streusel',
      bedeutung: 'Riwwele sind die Streusel aus Mehl, Butter und Zucker, die auf den Kuchen kommen. En Riwwelkuche ist ein Streuselkuchen. Vom Verb riwwele (zerreiben). Ein Klassiker der hessischen Backstube.',
      beispiel: 'Aufn Kuche kumme dicke Riwwele.',
      beispiel_hd: 'Auf den Kuchen kommen dicke Streusel.',
      kategorie: 'essen'
    },
    {
      id: 'h-645',
      ausdruck: 'Brieh',
      hochdeutsch: 'Brühe',
      bedeutung: 'Die Brieh ist die Brühe oder Suppe, in der Klöße oder Nudeln schwimmen. A heeße Brieh wärmt im Winter. Ein alltägliches Küchenwort der hessischen Mundart.',
      beispiel: 'In de Brieh schwimme Griesnockerle.',
      beispiel_hd: 'In der Brühe schwimmen Grießnockerl.',
      kategorie: 'essen'
    },
    {
      id: 'h-646',
      ausdruck: 'Krischer',
      hochdeutsch: 'Schreihals / Heulsuse',
      bedeutung: 'En Krischer ist jemand, der viel schreit oder weint, vom hessischen krische (schreien, weinen). Sei kä Krischer! mahnt ein weinerliches Kind. Ein bildhaftes Menschenwort.',
      beispiel: 'Des Kind is heut a rechter Krischer.',
      beispiel_hd: 'Das Kind ist heute eine rechte Heulsuse.',
      kategorie: 'menschen'
    },
    {
      id: 'h-647',
      ausdruck: 'dabbisch',
      hochdeutsch: 'ungeschickt / tollpatschig',
      bedeutung: 'dabbisch heißt ungeschickt, tollpatschig oder etwas dümmlich. Stell dich net so dabbisch o! tadelt jemanden für Ungeschick. Ein häufiges hessisches Eigenschaftswort.',
      beispiel: 'Sei net so dabbisch, halt s fest!',
      beispiel_hd: 'Sei nicht so ungeschickt, halt es fest!',
      kategorie: 'schimpf'
    },
    {
      id: 'h-648',
      ausdruck: 'babbisch',
      hochdeutsch: 'klebrig / pappig',
      bedeutung: 'babbisch beschreibt etwas Klebriges oder Pappiges, vom hessischen babbe (kleben). Die Händ sind ganz babbisch vom Bonbon. Ein anschauliches Alltagswort.',
      beispiel: 'Mei Händ sind ganz babbisch.',
      beispiel_hd: 'Meine Hände sind ganz klebrig.',
      kategorie: 'alltag'
    },
    {
      id: 'h-649',
      ausdruck: 'Schnudde',
      hochdeutsch: 'Nasenschleim / Rotznase',
      bedeutung: 'Die Schnudde ist der Nasenschleim oder die Rotznase, vor allem bei verschnupften Kindern. Wisch der die Schnudd ab! Ein deftiges hessisches Körperwort.',
      beispiel: 'Des Bübsche hat die Schnudd am laafe.',
      beispiel_hd: 'Der kleine Junge hat die Nase am Laufen.',
      kategorie: 'koerper'
    },
    {
      id: 'h-650',
      ausdruck: 'Gosch',
      hochdeutsch: 'Mund',
      bedeutung: 'Die Gosch ist der Mund, oft im Sinne von vorlautem Reden. Halt die Gosch! heißt „sei still!". Ein deftiges Alltagswort, das Hessisch mit anderen Mundarten teilt.',
      beispiel: 'Etz halt emol die Gosch!',
      beispiel_hd: 'Jetzt halt mal den Mund!',
      kategorie: 'koerper'
    }
  ]
};
