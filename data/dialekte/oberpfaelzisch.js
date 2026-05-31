// Oberpfälzisch — Dialektdaten
// Format: jedes Objekt ist ein Ausdruck im Dialekt mit Bedeutung auf Hochdeutsch.

export default {
  id: 'oberpfaelzisch',
  name: 'Oberpfälzisch',
  region: 'Oberpfalz',
  bundesland: 'Bayern',
  flag: '🍺',
  farbe: '#c47a1e',
  beschreibung: 'Oberpfälzisch ist ein nordbairischer Dialekt im Osten Bayerns. Charakteristisch sind die „gestürzten" Zwielaute (Broud für Brot, Kniedla für Knödel). Eine kulturelle Besonderheit ist der Zoigl, das gemeinschaftlich gebraute Kommunbräu-Bier.',
  sprecher: 'ca. 1 Mio.',
  lang: 'de-DE',
  ausdruecke: [
    {
      id: 'op-001',
      ausdruck: 'Griaß di',
      hochdeutsch: 'Hallo / Grüß dich',
      bedeutung: 'Griaß di ist der alltägliche oberpfälzische Gruß unter Bekannten. Bei mehreren sagt man Griaß enk, förmlicher Griaß God. Ein herzlicher bairischer Gruß.',
      beispiel: 'Griaß di, wos machst n so?',
      beispiel_hd: 'Hallo, was machst du denn so?',
      kategorie: 'begruessung'
    },
    {
      id: 'op-002',
      ausdruck: 'Pfiat di',
      hochdeutsch: 'Tschüss / Behüt dich',
      bedeutung: 'Pfiat di ist die Verabschiedung, von „behüte dich Gott". Zu mehreren sagt man Pfiat enk. Ein herzlicher oberpfälzischer Abschiedsgruß.',
      beispiel: 'Pfiat di, mir segn ins boid.',
      beispiel_hd: 'Tschüss, wir sehen uns bald.',
      kategorie: 'begruessung'
    },
    {
      id: 'op-003',
      ausdruck: 'Zoigl',
      hochdeutsch: 'oberpfälzisches Kommunbräu-Bier',
      bedeutung: 'Zoigl ist das untergärige Bier, das in alten Kommunbrauhäusern gemeinschaftlich gebraut und reihum ausgeschenkt wird. Ein gezacktes Bierzeichen (der Zoiglstern) zeigt an, wo gerade Zoigl frisch ist.',
      beispiel: 'Heit gibts beim Nachbarn an frischn Zoigl.',
      beispiel_hd: 'Heute gibt es beim Nachbarn ein frisches Zoigl-Bier.',
      kategorie: 'essen'
    },
    {
      id: 'op-004',
      ausdruck: 'Zoiglstubn',
      hochdeutsch: 'Zoigl-Ausschank in der Wohnstube',
      bedeutung: 'Die Zoiglstubn ist die einfache Wirtsstube, in der ein Kommunbrauer seinen Zoigl ausschenkt, oft nur an wenigen Tagen. Ein einzigartiger Teil der Oberpfälzer Wirtshauskultur.',
      beispiel: 'Am Freitag kehrn mir in da Zoiglstubn ei.',
      beispiel_hd: 'Am Freitag kehren wir in der Zoiglstube ein.',
      kategorie: 'orte'
    },
    {
      id: 'op-005',
      ausdruck: 'Broud',
      hochdeutsch: 'Brot',
      bedeutung: 'Broud ist das Brot, mit dem für die Oberpfalz typischen gestürzten Zwielaut. A Stickl Broud zur Brotzeit gehört dazu. Ein Kennzeichen der nordbairischen Aussprache.',
      beispiel: 'Schneid ma a Stickl Broud o.',
      beispiel_hd: 'Schneide mir ein Stück Brot ab.',
      kategorie: 'essen'
    },
    {
      id: 'op-006',
      ausdruck: 'Kniedla',
      hochdeutsch: 'Knödel',
      bedeutung: 'Kniedla sind die Knödel, in nordbairischer Lautung. Ob als Semmel- oder Kartoffelkniedla, sie gehören zum Braten mit Soße dazu. Ein Grundpfeiler der Küche.',
      beispiel: 'Zum Bradl gibts zwoa Kniedla.',
      beispiel_hd: 'Zum Braten gibt es zwei Knödel.',
      kategorie: 'essen'
    },
    {
      id: 'op-007',
      ausdruck: 'Erdäpfi',
      hochdeutsch: 'Kartoffeln',
      bedeutung: 'Erdäpfi sind die Kartoffeln, in oberpfälzischer Lautung. Aus Erdäpfi macht man Kniedla, Salat oder Bratkartoffeln. Ein Grundnahrungsmittel der Region.',
      beispiel: 'Mir setzn im Garten Erdäpfi.',
      beispiel_hd: 'Wir setzen im Garten Kartoffeln.',
      kategorie: 'essen'
    },
    {
      id: 'op-008',
      ausdruck: 'Brotzeit',
      hochdeutsch: 'kalte Vesper',
      bedeutung: 'Die Brotzeit ist die deftige kalte Jause aus Broud, Wurst und Käse, gern zum Zoigl. Brotzeit machn heißt, eine Vesperpause einzulegen. Fester Bestandteil des Tages.',
      beispiel: 'Um zehne machmr a Brotzeit.',
      beispiel_hd: 'Um zehn machen wir eine Brotzeit.',
      kategorie: 'essen'
    },
    {
      id: 'op-009',
      ausdruck: 'Schmankerl',
      hochdeutsch: 'Leckerbissen / Spezialität',
      bedeutung: 'A Schmankerl ist eine besondere kulinarische Köstlichkeit. Die Oberpfälzer Küche hat viele Schmankerl zu bieten, vom Bradl bis zum Mehlspeis. Ein liebevolles Wort.',
      beispiel: 'A frischer Zoigl is a echts Schmankerl.',
      beispiel_hd: 'Ein frisches Zoigl ist ein echter Leckerbissen.',
      kategorie: 'essen'
    },
    {
      id: 'op-010',
      ausdruck: 'Brezn',
      hochdeutsch: 'Brezel',
      bedeutung: 'D Brezn ist die Brezel, frisch gebacken mit grobem Salz. Zur Brotzeit oder zum Bier passt a Brezn immer. Ein Klassiker der bairischen Backkunst.',
      beispiel: 'Zum Bier schmeckt a frische Brezn.',
      beispiel_hd: 'Zum Bier schmeckt eine frische Brezel.',
      kategorie: 'essen'
    },
    {
      id: 'op-011',
      ausdruck: 'Bua',
      hochdeutsch: 'Bub / Junge',
      bedeutung: 'Da Bua ist der Bub oder junge Mann, Mehrzahl Buam. Auch als anerkennende Anrede gebräuchlich. Ein zentrales Wort des bairischen Wortschatzes.',
      beispiel: 'Da Bua hilft beim Heia mit.',
      beispiel_hd: 'Der Junge hilft beim Heuen mit.',
      kategorie: 'familie'
    },
    {
      id: 'op-012',
      ausdruck: 'Diandl',
      hochdeutsch: 'Mädchen / Dirndl',
      bedeutung: 'A Diandl ist ein Mädchen oder eine junge Frau, zugleich das Trachtenkleid. Beim Kirwa tanzn d Diandl in da Tracht. Ein bairisches Wort.',
      beispiel: 'S Diandl geht zum Kirwa-Tanz.',
      beispiel_hd: 'Das Mädchen geht zum Kirchweihtanz.',
      kategorie: 'familie'
    },
    {
      id: 'op-013',
      ausdruck: 'Muada',
      hochdeutsch: 'Mutter',
      bedeutung: 'D Muada ist die Mutter. Sie kocht d Kniedla und hält die Familie zusammen. Zusammen mit Voda eines der wichtigsten Familienwörter.',
      beispiel: 'D Muada kocht heit a Bradl.',
      beispiel_hd: 'Die Mutter kocht heute einen Braten.',
      kategorie: 'familie'
    },
    {
      id: 'op-014',
      ausdruck: 'Voda',
      hochdeutsch: 'Vater',
      bedeutung: 'Da Voda ist der Vater. Er schafft am Hof oder im Betrieb. Mit Muada und de Kinder bildet er die oberpfälzische Familie.',
      beispiel: 'Mei Voda braut sein eignan Zoigl.',
      beispiel_hd: 'Mein Vater braut sein eigenes Zoigl.',
      kategorie: 'familie'
    },
    {
      id: 'op-015',
      ausdruck: 'Hax',
      hochdeutsch: 'Bein',
      bedeutung: 'D Hax ist das Bein, Mehrzahl Haxn. Beim Wandern kann man sich d Hax vertretn. Ein kerniges bairisches Wort für die Gliedmaßen.',
      beispiel: 'Mir tuat noch da Wanderung d Hax weh.',
      beispiel_hd: 'Mir tut nach der Wanderung das Bein weh.',
      kategorie: 'koerper'
    },
    {
      id: 'op-016',
      ausdruck: 'Goschn',
      hochdeutsch: 'Mund',
      bedeutung: 'D Goschn ist der Mund, oft im Sinne von vorlautem Reden. Hoit dei Goschn! heißt „sei still". Ein deftiges Alltagswort des bairischen Raums.',
      beispiel: 'Etz hoit amoi dei Goschn!',
      beispiel_hd: 'Jetzt halt mal deinen Mund!',
      kategorie: 'koerper'
    },
    {
      id: 'op-017',
      ausdruck: 'Watschn',
      hochdeutsch: 'Ohrfeige',
      bedeutung: 'A Watschn ist eine Ohrfeige. Die Androhung „du fangst glei a Watschn" ist ein bekannter Spruch. Ein deftiges bairisches Wort.',
      beispiel: 'Wennst ned ruig bist, fangst a Watschn.',
      beispiel_hd: 'Wenn du nicht ruhig bist, fängst du eine Ohrfeige.',
      kategorie: 'schimpf'
    },
    {
      id: 'op-018',
      ausdruck: 'deppat',
      hochdeutsch: 'dumm / blöd',
      bedeutung: 'deppat heißt dumm oder blöd. So a deppate Gschicht ist eine dumme Angelegenheit. Vom Depp abgeleitet, im ganzen bairischen Raum gebräuchlich.',
      beispiel: 'Stell di ned so deppat o!',
      beispiel_hd: 'Stell dich nicht so dumm an!',
      kategorie: 'schimpf'
    },
    {
      id: 'op-019',
      ausdruck: 'gscheid',
      hochdeutsch: 'klug / vernünftig',
      bedeutung: 'gscheid bedeutet klug oder ordentlich. Sei gscheid! mahnt zur Vernunft. A gscheide Brotzeit ist eine ordentliche Vesper. Ein vielseitiges Wort.',
      beispiel: 'Iss amoi gscheid, na bist satt.',
      beispiel_hd: 'Iss mal ordentlich, dann bist du satt.',
      kategorie: 'alltag'
    },
    {
      id: 'op-020',
      ausdruck: 'fei',
      hochdeutsch: 'aber / wirklich (Verstärkung)',
      bedeutung: 'fei ist ein Würzwort zur Betonung, etwa „aber" oder „wirklich". Des is fei wahr betont, dass etwas tatsächlich stimmt. In der Oberpfalz besonders häufig.',
      beispiel: 'Der Zoigl is fei guad heit.',
      beispiel_hd: 'Das Zoigl ist aber gut heute.',
      kategorie: 'redensart'
    },
    {
      id: 'op-021',
      ausdruck: 'a weng',
      hochdeutsch: 'ein bisschen',
      bedeutung: 'a weng bedeutet ein bisschen oder ein wenig. Wart no a weng heißt „warte noch ein bisschen". Ein häufiges Mengen- und Zeitwort.',
      beispiel: 'Gib ma no a weng Soß dazua.',
      beispiel_hd: 'Gib mir noch ein bisschen Soße dazu.',
      kategorie: 'alltag'
    },
    {
      id: 'op-022',
      ausdruck: 'etz',
      hochdeutsch: 'jetzt',
      bedeutung: 'etz heißt jetzt. Etz aber gschwind! drängt zur Eile. Ein häufiges Zeitwort des oberpfälzischen Alltags, oft am Satzanfang.',
      beispiel: 'Etz miass ma aba los.',
      beispiel_hd: 'Jetzt müssen wir aber los.',
      kategorie: 'alltag'
    },
    {
      id: 'op-023',
      ausdruck: 'wos',
      hochdeutsch: 'was',
      bedeutung: 'wos ist das nordbairische „was". Wos host gsagt? heißt „was hast du gesagt?". Ein häufiges Fragewort mit der typisch dunklen oberpfälzischen Lautung.',
      beispiel: 'Wos host n do gmacht?',
      beispiel_hd: 'Was hast du denn da gemacht?',
      kategorie: 'redensart'
    },
    {
      id: 'op-024',
      ausdruck: 'dahoam',
      hochdeutsch: 'zu Hause / daheim',
      bedeutung: 'dahoam bedeutet zu Hause. Dahoam is dahoam drückt die Verbundenheit mit der Heimat aus. Ein warmherziges Wort des bairischen Raums.',
      beispiel: 'Am liabstn bin i dahoam.',
      beispiel_hd: 'Am liebsten bin ich zu Hause.',
      kategorie: 'alltag'
    },
    {
      id: 'op-025',
      ausdruck: 'Goaß',
      hochdeutsch: 'Ziege',
      bedeutung: 'D Goaß ist die Ziege, die auf den mageren Oberpfälzer Weiden gehalten wird. Aus da Goaßmilch macht man Käse. Ein Wort der bäuerlichen Welt.',
      beispiel: 'D Goaß steht hinterm Stoi am Hang.',
      beispiel_hd: 'Die Ziege steht hinter dem Stall am Hang.',
      kategorie: 'natur'
    },
    {
      id: 'op-026',
      ausdruck: 'heuer',
      hochdeutsch: 'dieses Jahr',
      bedeutung: 'heuer bedeutet „in diesem Jahr". Heuer is da Zoigl guad gratn meint, dieses Jahr ist das Bier gut geworden. Im bairischen Raum gebräuchlich.',
      beispiel: 'Heuer hamma a guade Ernte.',
      beispiel_hd: 'Dieses Jahr haben wir eine gute Ernte.',
      kategorie: 'alltag'
    },
    {
      id: 'op-027',
      ausdruck: 'Reng',
      hochdeutsch: 'Regen',
      bedeutung: 'Reng ist der Regen, in nordbairischer Lautung. Bei Reng bleibt ma dahoam. Ein häufiges Wetterwort der Oberpfalz.',
      beispiel: 'Bei dem Reng geh i ned naus.',
      beispiel_hd: 'Bei dem Regen gehe ich nicht hinaus.',
      kategorie: 'natur'
    },
    {
      id: 'op-028',
      ausdruck: 'Sunna',
      hochdeutsch: 'Sonne',
      bedeutung: 'D Sunna ist die Sonne. Wenn d Sunna scheint, sitzt ma gern vor da Zoiglstubn. Ein freundliches Naturwort der bairischen Mundart.',
      beispiel: 'Heit scheint d Sunna den ganzn Doch.',
      beispiel_hd: 'Heute scheint die Sonne den ganzen Tag.',
      kategorie: 'natur'
    },
    {
      id: 'op-029',
      ausdruck: 'Baam',
      hochdeutsch: 'Baum',
      bedeutung: 'Da Baam ist der Baum, Mehrzahl Baam. Unter am Baam findt ma im Summa Schattn. Ein gängiges Naturwort des nordbairischen Raums.',
      beispiel: 'Vorm Haus steht a oida Baam.',
      beispiel_hd: 'Vor dem Haus steht ein alter Baum.',
      kategorie: 'natur'
    },
    {
      id: 'op-030',
      ausdruck: 'Wåssa',
      hochdeutsch: 'Wasser',
      bedeutung: 'Wåssa ist das Wasser, mit dem dunklen nordbairischen a. A Glasl Wåssa zum Zoigl schadt ned. Ein alltägliches Grundwort.',
      beispiel: 'Gib ma a Glasl Wåssa.',
      beispiel_hd: 'Gib mir ein Glas Wasser.',
      kategorie: 'natur'
    },
    {
      id: 'op-031',
      ausdruck: 'Muich',
      hochdeutsch: 'Milch',
      bedeutung: 'D Muich ist die Milch, mit der typischen Lautung. Frische Muich hoit ma vom Bauern. Ein Grundnahrungsmittel der ländlichen Oberpfalz.',
      beispiel: 'D Muich is heit frisch vom Bauern.',
      beispiel_hd: 'Die Milch ist heute frisch vom Bauern.',
      kategorie: 'essen'
    },
    {
      id: 'op-032',
      ausdruck: 'schee',
      hochdeutsch: 'schön',
      bedeutung: 'schee heißt schön. Des is schee! ist ein begeistertes Lob. A schee Madl, a schee Landschaft — ein vielseitiges Eigenschaftswort.',
      beispiel: 'D Landschaft is do echt schee.',
      beispiel_hd: 'Die Landschaft ist hier echt schön.',
      kategorie: 'gefuehle'
    },
    {
      id: 'op-033',
      ausdruck: 'oiwei',
      hochdeutsch: 'immer',
      bedeutung: 'oiwei bedeutet immer oder ständig. Der kummt oiwei z spät heißt „der kommt immer zu spät". Ein häufiges Zeitwort der bairischen Rede.',
      beispiel: 'Du host oiwei was zum Meckern.',
      beispiel_hd: 'Du hast immer etwas zu meckern.',
      kategorie: 'alltag'
    },
    {
      id: 'op-034',
      ausdruck: 'Ohrwaschl',
      hochdeutsch: 'Ohr',
      bedeutung: 'S Ohrwaschl ist das Ohr. Schreib da des hinter d Ohrwaschl heißt, sich etwas gut zu merken. Ein anschauliches bairisches Körperwort.',
      beispiel: 'Mir is heit s Ohrwaschl kalt.',
      beispiel_hd: 'Mir ist heute das Ohr kalt.',
      kategorie: 'koerper'
    },
    {
      id: 'op-035',
      ausdruck: 'Kerwa',
      hochdeutsch: 'Kirchweihfest',
      bedeutung: 'D Kerwa ist das Kirchweihfest, das größte Dorffest mit Musik, Tanz und Bier. Auf da Kerwa trifft sich das ganze Dorf. Ein Höhepunkt im Festkalender.',
      beispiel: 'Am Wochenend is bei uns Kerwa.',
      beispiel_hd: 'Am Wochenende ist bei uns Kirchweih.',
      kategorie: 'feiern'
    },
    {
      id: 'op-036',
      ausdruck: 'dees',
      hochdeutsch: 'das / dieses',
      bedeutung: 'dees ist das nordbairische „das" oder „dieses". Dees do mecht i heißt „das da möchte ich". Ein häufiges Hinweiswort der Mundart.',
      beispiel: 'Dees do schmeckt ma am bestn.',
      beispiel_hd: 'Das da schmeckt mir am besten.',
      kategorie: 'redensart'
    }
  ]
};
