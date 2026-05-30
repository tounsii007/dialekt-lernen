// Brandenburgisch — Dialektdaten
// Format: jedes Objekt ist ein Ausdruck im Dialekt mit Bedeutung auf Hochdeutsch.

export default {
  id: 'brandenburgisch',
  name: 'Brandenburgisch',
  region: 'Brandenburg',
  bundesland: 'Brandenburg',
  flag: '🥒',
  farbe: '#d7263d',
  beschreibung: 'Brandenburgisch (Berlin-Brandenburgisch / Märkisch) wird in der Mark Brandenburg rund um Berlin gesprochen. Auf niederdeutschem Untergrund stark vom Berlinischen geprägt. Eigene Farbe geben Spreewald-Wörter wie Fließ und Kahn sowie Begriffe der Sumpf- und Seenlandschaft.',
  sprecher: 'ca. 2,5 Mio.',
  lang: 'de-DE',
  ausdruecke: [
    {
      id: 'br-001',
      ausdruck: 'icke',
      hochdeutsch: 'ich',
      bedeutung: 'icke ist das nachdrückliche „ich" im Berlin-Brandenburgischen. Icke, dette, kieke mal ist ein bekannter Spruch. Es betont die eigene Person mit Stolz.',
      beispiel: 'Wer war dat? Na icke!',
      beispiel_hd: 'Wer war das? Na ich!',
      kategorie: 'menschen'
    },
    {
      id: 'br-002',
      ausdruck: 'wat',
      hochdeutsch: 'was',
      bedeutung: 'wat ist das berlin-brandenburgische „was". Wat is n los? heißt „was ist denn los?". Eines der prägendsten Lautmerkmale der Mundart.',
      beispiel: 'Wat willste denn noch?',
      beispiel_hd: 'Was willst du denn noch?',
      kategorie: 'redensart'
    },
    {
      id: 'br-003',
      ausdruck: 'det',
      hochdeutsch: 'das',
      bedeutung: 'det (auch dette) ist das berlin-brandenburgische „das". Det is doch klar! betont eine Selbstverständlichkeit. Zusammen mit wat ein Markenzeichen der Mundart.',
      beispiel: 'Det jlaub ick dir nich.',
      beispiel_hd: 'Das glaube ich dir nicht.',
      kategorie: 'redensart'
    },
    {
      id: 'br-004',
      ausdruck: 'Bulette',
      hochdeutsch: 'Frikadelle',
      bedeutung: 'Die Bulette ist die Frikadelle, ein Klassiker der Berlin-Brandenburger Küche. Ran an die Buletten! heißt übertragen „los gehts, packt zu!". Vom französischen boulette.',
      beispiel: 'Zu de Kartoffeln gibts ne Bulette.',
      beispiel_hd: 'Zu den Kartoffeln gibt es eine Frikadelle.',
      kategorie: 'essen'
    },
    {
      id: 'br-005',
      ausdruck: 'Stulle',
      hochdeutsch: 'Butterbrot',
      bedeutung: 'Die Stulle ist die Scheibe Brot mit Belag, das Butterbrot. Eine Stulle mit Wurst kommt mit zur Arbeit. Ein typisches Berlin-Brandenburger Wort.',
      beispiel: 'Ick schmier mir ne Stulle mit Leberwurst.',
      beispiel_hd: 'Ich schmiere mir ein Butterbrot mit Leberwurst.',
      kategorie: 'essen'
    },
    {
      id: 'br-006',
      ausdruck: 'Schrippe',
      hochdeutsch: 'Brötchen',
      bedeutung: 'Die Schrippe ist das knusprige Weizenbrötchen. Beim Bäcker holt man morgens frische Schrippen. Das Standardwort für Brötchen in Berlin und Brandenburg.',
      beispiel: 'Hol mal frische Schrippen vom Bäcker.',
      beispiel_hd: 'Hol mal frische Brötchen vom Bäcker.',
      kategorie: 'essen'
    },
    {
      id: 'br-007',
      ausdruck: 'Molle',
      hochdeutsch: 'Glas Bier',
      bedeutung: 'Eine Molle ist ein Glas Bier. Eene Molle und een Kurzer ist Bier mit Schnaps. Ein geselliges Wort aus der Berlin-Brandenburger Kneipenkultur.',
      beispiel: 'Komm, wa trinken noch ne Molle.',
      beispiel_hd: 'Komm, wir trinken noch ein Bier.',
      kategorie: 'essen'
    },
    {
      id: 'br-008',
      ausdruck: 'knorke',
      hochdeutsch: 'toll / super',
      bedeutung: 'knorke heißt großartig, prima, super. Det is ja knorke! ist ein begeistertes Lob. Ein traditionsreiches Berlin-Brandenburger Wort der Anerkennung.',
      beispiel: 'Det Wetter is heute echt knorke.',
      beispiel_hd: 'Das Wetter ist heute echt super.',
      kategorie: 'gefuehle'
    },
    {
      id: 'br-009',
      ausdruck: 'dufte',
      hochdeutsch: 'prima / klasse',
      bedeutung: 'dufte bedeutet prima, klasse oder fein. Een dufter Typ ist ein anständiger, sympathischer Kerl. Ein altberliner Wort, das auch in Brandenburg lebt.',
      beispiel: 'Det haste ja dufte hinjekriegt.',
      beispiel_hd: 'Das hast du ja prima hinbekommen.',
      kategorie: 'gefuehle'
    },
    {
      id: 'br-010',
      ausdruck: 'Jöre',
      hochdeutsch: 'Kind / freches Mädchen',
      bedeutung: 'Eine Jöre ist ein Kind, oft ein lebhaftes oder freches Mädchen. Die Jören spielen uffm Hof. Ein liebevoll-spöttisches Wort der Region.',
      beispiel: 'Die Jören toben uffm Hof rum.',
      beispiel_hd: 'Die Kinder toben auf dem Hof herum.',
      kategorie: 'familie'
    },
    {
      id: 'br-011',
      ausdruck: 'Fisematenten',
      hochdeutsch: 'Unsinn / Umstände',
      bedeutung: 'Fisematenten sind Unsinn, Flausen oder unnötige Umstände. Mach keene Fisematenten! heißt, keine Dummheiten oder Umschweife zu machen. Ein altes Wort der Region.',
      beispiel: 'Nu mach keene Fisematenten un komm!',
      beispiel_hd: 'Nun mach keine Umstände und komm!',
      kategorie: 'redensart'
    },
    {
      id: 'br-012',
      ausdruck: 'jwd',
      hochdeutsch: 'ganz weit draußen / abgelegen',
      bedeutung: 'jwd steht für „janz weit draußen" und meint einen sehr abgelegenen Ort weit vor der Stadt. Det liegt ja jwd! beklagt eine entlegene Adresse. Typisch Berlin-Brandenburg.',
      beispiel: 'Der wohnt echt jwd, ewig weit raus.',
      beispiel_hd: 'Der wohnt echt weit draußen, ewig weit raus.',
      kategorie: 'orte'
    },
    {
      id: 'br-013',
      ausdruck: 'mang',
      hochdeutsch: 'unter / zwischen',
      bedeutung: 'mang bedeutet unter oder zwischen, ein niederdeutsches Erbe. Mang die Leute jehen heißt, sich unter die Leute zu mischen. Ein altes märkisches Wort.',
      beispiel: 'Misch dir ruhig mang die Leute.',
      beispiel_hd: 'Misch dich ruhig unter die Leute.',
      kategorie: 'alltag'
    },
    {
      id: 'br-014',
      ausdruck: 'Luch',
      hochdeutsch: 'Sumpf- / Moorlandschaft',
      bedeutung: 'Ein Luch ist eine feuchte Niederung, eine Sumpf- und Moorlandschaft, wie das Havelländische Luch. Ein typisches Wort für die wasserreiche Brandenburger Natur.',
      beispiel: 'Im Luch brüten viele Vögel.',
      beispiel_hd: 'Im Moorgebiet brüten viele Vögel.',
      kategorie: 'natur'
    },
    {
      id: 'br-015',
      ausdruck: 'Fließ',
      hochdeutsch: 'kleiner Wasserlauf (Spreewald)',
      bedeutung: 'Ein Fließ ist ein schmaler, natürlicher Wasserlauf, wie die zahllosen Fließe im Spreewald. Auf den Fließen gleiten die Kähne durch die Auenlandschaft.',
      beispiel: 'Der Kahn gleitet übers schmale Fließ.',
      beispiel_hd: 'Der Kahn gleitet über den schmalen Wasserlauf.',
      kategorie: 'natur'
    },
    {
      id: 'br-016',
      ausdruck: 'Kahn',
      hochdeutsch: 'Spreewaldkahn',
      bedeutung: 'Der Kahn ist das flache Holzboot, mit dem man im Spreewald über die Fließe staken lässt. Eine Kahnfahrt gehört zu jedem Spreewaldbesuch.',
      beispiel: 'Wir machen ne Kahnfahrt durch n Spreewald.',
      beispiel_hd: 'Wir machen eine Kahnfahrt durch den Spreewald.',
      kategorie: 'alltag'
    },
    {
      id: 'br-017',
      ausdruck: 'Spreewaldgurke',
      hochdeutsch: 'eingelegte Gurke aus dem Spreewald',
      bedeutung: 'Die Spreewaldgurke ist die berühmte, sauer eingelegte Gurke aus dem Spreewald, ein geschütztes Markenzeichen Brandenburgs. Knackig und würzig, in jedem Glas ein Stück Heimat.',
      beispiel: 'Zur Stulle gibts ne Spreewaldgurke.',
      beispiel_hd: 'Zum Butterbrot gibt es eine Spreewaldgurke.',
      kategorie: 'essen'
    },
    {
      id: 'br-018',
      ausdruck: 'Plinse',
      hochdeutsch: 'Eierkuchen / Pfannkuchen',
      bedeutung: 'Plinse sind dünne Eierkuchen aus der Pfanne, süß mit Zucker oder Apfelmus gegessen. Ein beliebtes einfaches Gericht in Brandenburg und der Lausitz.',
      beispiel: 'Oma backt uns ne Pfanne voll Plinse.',
      beispiel_hd: 'Oma backt uns eine Pfanne voll Eierkuchen.',
      kategorie: 'essen'
    },
    {
      id: 'br-019',
      ausdruck: 'Buddel',
      hochdeutsch: 'Flasche',
      bedeutung: 'Die Buddel ist die Flasche. Eene Buddel Bier wird am Lagerfeuer geöffnet. Ein niederdeutsches Wort, das in der ganzen Region gebräuchlich ist.',
      beispiel: 'Mach mal die Buddel uff.',
      beispiel_hd: 'Mach mal die Flasche auf.',
      kategorie: 'alltag'
    },
    {
      id: 'br-020',
      ausdruck: 'Plautze',
      hochdeutsch: 'Bauch',
      bedeutung: 'Die Plautze ist der Bauch. Sich die Plautze vollschlagen heißt, kräftig zu essen. Ein deftiges berlin-brandenburgisches Körperwort.',
      beispiel: 'Ick hab mir die Plautze volljeschlagen.',
      beispiel_hd: 'Ich habe mir den Bauch vollgeschlagen.',
      kategorie: 'koerper'
    },
    {
      id: 'br-021',
      ausdruck: 'Eisbein',
      hochdeutsch: 'gepökelte Schweinshaxe',
      bedeutung: 'Eisbein ist die gepökelte, gekochte Schweinshaxe, traditionell mit Sauerkraut und Erbspüree. Ein deftiges Berlin-Brandenburger Traditionsgericht.',
      beispiel: 'Zum Eisbein gibts Sauerkraut.',
      beispiel_hd: 'Zum Eisbein gibt es Sauerkraut.',
      kategorie: 'essen'
    },
    {
      id: 'br-022',
      ausdruck: 'meckern',
      hochdeutsch: 'nörgeln / sich beschweren',
      bedeutung: 'meckern heißt nörgeln oder sich beschweren. Der meckert über allet ist einer, der ständig etwas zu beanstanden hat. Eine als typisch geltende Eigenart.',
      beispiel: 'Nu hör uff zu meckern!',
      beispiel_hd: 'Nun hör auf zu nörgeln!',
      kategorie: 'alltag'
    },
    {
      id: 'br-023',
      ausdruck: 'latschen',
      hochdeutsch: 'gemächlich gehen / trotten',
      bedeutung: 'latschen heißt gemächlich, schlurfend gehen. Den ganzen Weg latschen meint, eine weite Strecke zu Fuß zu trotten. Davon kommen auch die Latschen (Pantoffeln).',
      beispiel: 'Wir sind den janzen Weg jelatscht.',
      beispiel_hd: 'Wir sind den ganzen Weg gegangen.',
      kategorie: 'alltag'
    },
    {
      id: 'br-024',
      ausdruck: 'Pampe',
      hochdeutsch: 'Matsch / Brei',
      bedeutung: 'Pampe ist ein dicker, unappetitlicher Brei oder Matsch. Bei Tauwetter wird der Weg zur Pampe. Auch ein misslungenes Essen kann Pampe heißen.',
      beispiel: 'Der Weg is nur noch Pampe.',
      beispiel_hd: 'Der Weg ist nur noch Matsch.',
      kategorie: 'alltag'
    },
    {
      id: 'br-025',
      ausdruck: 'nu',
      hochdeutsch: 'nun / na',
      bedeutung: 'nu leitet als „nun" oder „na" viele Sätze ein. Nu komm schon! drängt zur Eile. Ein häufiges Füllwort, das der Rede Rhythmus gibt.',
      beispiel: 'Nu mach schon, wir komm zu spät!',
      beispiel_hd: 'Nun mach schon, wir kommen zu spät!',
      kategorie: 'redensart'
    },
    {
      id: 'br-026',
      ausdruck: 'Mark',
      hochdeutsch: 'die Mark Brandenburg (Landschaft)',
      bedeutung: 'Die Mark ist die Landschaft der Mark Brandenburg mit ihren Kiefernwäldern, Seen und Sandböden. In de Mark rausfahren heißt, ins ländliche Brandenburg zu fahren.',
      beispiel: 'Am Wochenende fahrn wir raus in de Mark.',
      beispiel_hd: 'Am Wochenende fahren wir raus in die Mark Brandenburg.',
      kategorie: 'orte'
    }
  ]
};
