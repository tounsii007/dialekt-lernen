// Kärntnerisch — Dialektdaten
// Format: jedes Objekt ist ein Ausdruck im Dialekt mit Bedeutung auf Hochdeutsch.

export default {
  id: 'kaerntnerisch',
  name: 'Kärntnerisch',
  region: 'Kärnten',
  bundesland: 'Kärnten (Österreich)',
  flag: '🏞️',
  farbe: '#1976d2',
  beschreibung: 'Kärntnerisch ist ein südbairischer Dialekt, gesprochen im südlichsten Bundesland Österreichs. Bekannt für seinen singenden Tonfall, das vielseitige Wörtchen Lei und eine eigenständige Küche mit Kasnudln und Reindling. Geprägt von Seen, Bergen und slowenischen Spracheinflüssen.',
  sprecher: 'ca. 0,5 Mio.',
  lang: 'de-AT',
  ausdruecke: [
    {
      id: 'kt-001',
      ausdruck: 'Griaß di',
      hochdeutsch: 'Hallo / Grüß dich',
      bedeutung: 'Griaß di ist der alltägliche Kärntner Gruß unter Bekannten, mit singendem Tonfall. Bei mehreren sagt man Griaß enk, förmlicher Griaß Gott.',
      beispiel: 'Griaß di, wia gehts da denn so?',
      beispiel_hd: 'Hallo, wie geht es dir denn so?',
      kategorie: 'begruessung'
    },
    {
      id: 'kt-002',
      ausdruck: 'Pfiat di',
      hochdeutsch: 'Tschüss / Behüt dich',
      bedeutung: 'Pfiat di ist die Verabschiedung, von „behüte dich Gott". Zu mehreren sagt man Pfiat enk. Ein herzlicher Kärntner Abschiedsgruß.',
      beispiel: 'Pfiat di, kimm guat hoam!',
      beispiel_hd: 'Tschüss, komm gut nach Hause!',
      kategorie: 'begruessung'
    },
    {
      id: 'kt-003',
      ausdruck: 'Lei',
      hochdeutsch: 'nur / bloß',
      bedeutung: 'Lei bedeutet nur oder bloß und ist das wohl typischste Kärntner Wort. Lei net heißt „nur nicht", lei so „einfach so". Es durchzieht die ganze Mundart.',
      beispiel: 'I hob lei a Stunde Zeit.',
      beispiel_hd: 'Ich habe nur eine Stunde Zeit.',
      kategorie: 'redensart'
    },
    {
      id: 'kt-004',
      ausdruck: 'Lei-Lei',
      hochdeutsch: 'Villacher Faschingsruf',
      bedeutung: 'Lei-Lei ist der berühmte Schlachtruf des Villacher Faschings. Einer ruft Lei, die Menge antwortet Lei. Ein Ausdruck der ausgelassenen Kärntner Faschingsfreude.',
      beispiel: 'Beim Faschingsumzug ruafn olle Lei-Lei!',
      beispiel_hd: 'Beim Faschingsumzug rufen alle Lei-Lei!',
      kategorie: 'feiern'
    },
    {
      id: 'kt-005',
      ausdruck: 'Kasnudl',
      hochdeutsch: 'Kärntner Kasnudeln',
      bedeutung: 'Kasnudl sind große, halbmondförmige Teigtaschen, gefüllt mit Topfen, Kartoffeln und Minze, am Rand kunstvoll gekrendelt. Das Kärntner Nationalgericht schlechthin.',
      beispiel: 'Z Mittag gibts a Brettl voll Kasnudl.',
      beispiel_hd: 'Zu Mittag gibt es ein Brett voll Kasnudeln.',
      kategorie: 'essen'
    },
    {
      id: 'kt-006',
      ausdruck: 'Reindling',
      hochdeutsch: 'Kärntner Hefekuchen',
      bedeutung: 'Reindling ist ein gewundener Hefekuchen mit Zimt, Zucker und Rosinen, der in einer Reine gebacken wird. Zu Ostern gehört der Reindling auf jeden Kärntner Tisch.',
      beispiel: 'Zu Ostern backt d Oma an Reindling.',
      beispiel_hd: 'Zu Ostern backt die Oma einen Reindling.',
      kategorie: 'essen'
    },
    {
      id: 'kt-007',
      ausdruck: 'Strankerln',
      hochdeutsch: 'grüne Fisolen / Bohnen',
      bedeutung: 'Strankerln sind die grünen Gartenbohnen. Als Strankerlnsalat mit Kernöl oder im Eintopf gehören sie zur bodenständigen Kärntner Küche.',
      beispiel: 'Im Garten ziehn ma Strankerln.',
      beispiel_hd: 'Im Garten ziehen wir grüne Bohnen.',
      kategorie: 'essen'
    },
    {
      id: 'kt-008',
      ausdruck: 'Ritschert',
      hochdeutsch: 'Eintopf aus Rollgerste und Bohnen',
      bedeutung: 'Ritschert ist ein deftiger Eintopf aus Rollgerste, Bohnen und Geselchtem. Ein sättigendes Wintergericht der bäuerlichen Kärntner Küche.',
      beispiel: 'Im Winter kocht ma a warms Ritschert.',
      beispiel_hd: 'Im Winter kocht man einen warmen Gerstentopf.',
      kategorie: 'essen'
    },
    {
      id: 'kt-009',
      ausdruck: 'Frigga',
      hochdeutsch: 'gebratener Käse (Gailtal)',
      bedeutung: 'Frigga ist ein Gericht aus gebratenem Gailtaler Almkäse mit Speck, das direkt aus der Pfanne mit Polenta oder Brot gegessen wird. Eine Spezialität aus dem Gailtal.',
      beispiel: 'In da Pfann brutzlt a Frigga mit Speck.',
      beispiel_hd: 'In der Pfanne brutzelt gebratener Käse mit Speck.',
      kategorie: 'essen'
    },
    {
      id: 'kt-010',
      ausdruck: 'Hadn',
      hochdeutsch: 'Buchweizen / Heiden',
      bedeutung: 'Hadn ist der Buchweizen, aus dem man Hadnsterz oder Hadnmuas macht. Früher ein wichtiges Getreide der kargen Kärntner Bergböden.',
      beispiel: 'Aus Hadn kocht ma an Sterz.',
      beispiel_hd: 'Aus Buchweizen kocht man einen Sterz.',
      kategorie: 'natur'
    },
    {
      id: 'kt-011',
      ausdruck: 'Klachelsuppe',
      hochdeutsch: 'Suppe aus Schweinsknochen',
      bedeutung: 'Klachelsuppe ist eine kräftige Suppe aus Schweinsknochen (Klacheln), oft mit Knödl. Ein deftiges, traditionelles Gericht der Kärntner Hausschlachtung.',
      beispiel: 'Noch da Sau gibts a Klachelsuppe.',
      beispiel_hd: 'Nach dem Schlachten gibt es eine Knochensuppe.',
      kategorie: 'essen'
    },
    {
      id: 'kt-012',
      ausdruck: 'Maschger',
      hochdeutsch: 'Faschingsmaskierter',
      bedeutung: 'A Maschger ist eine verkleidete, maskierte Gestalt im Fasching, die von Haus zu Haus zieht. Das Maschgern ist ein alter Kärntner Faschingsbrauch.',
      beispiel: 'Im Fasching ziahn d Maschger durchs Dorf.',
      beispiel_hd: 'Im Fasching ziehen die Maskierten durchs Dorf.',
      kategorie: 'feiern'
    },
    {
      id: 'kt-013',
      ausdruck: 'Pfoad',
      hochdeutsch: 'Hemd',
      bedeutung: 'D Pfoad ist das Hemd. Zieh da a saubere Pfoad o heißt, ein frisches Hemd anzuziehen. Ein altes bairisch-kärntnerisches Kleidungswort.',
      beispiel: 'Zum Fest zieht er a weiße Pfoad o.',
      beispiel_hd: 'Zum Fest zieht er ein weißes Hemd an.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-014',
      ausdruck: 'Putscherl',
      hochdeutsch: 'junges Tier / Ferkel',
      bedeutung: 'A Putscherl ist ein junges Tier, oft ein Ferkel oder Kälbchen, liebevoll gemeint. Auch zu Kindern sagt man manchmal scherzhaft Putscherl.',
      beispiel: 'D Sau hot fünf Putscherln kriagt.',
      beispiel_hd: 'Die Sau hat fünf Ferkel bekommen.',
      kategorie: 'natur'
    },
    {
      id: 'kt-015',
      ausdruck: 'Häusl',
      hochdeutsch: 'Toilette / Häuschen',
      bedeutung: 'S Häusl ist die Toilette, früher das Plumpsklo im Hof. I muass aufs Häusl heißt „ich muss auf die Toilette". Ein gängiges österreichisches Alltagswort.',
      beispiel: 'Wo is denn do des Häusl?',
      beispiel_hd: 'Wo ist denn hier die Toilette?',
      kategorie: 'orte'
    },
    {
      id: 'kt-016',
      ausdruck: 'Tschick',
      hochdeutsch: 'Zigarette',
      bedeutung: 'A Tschick ist eine Zigarette, vom italienischen cicca. A Tschick rauchn heißt rauchen. Ein in ganz Österreich verbreitetes umgangssprachliches Wort.',
      beispiel: 'Geh ma vor d Tür auf a Tschick.',
      beispiel_hd: 'Gehen wir vor die Tür auf eine Zigarette.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-017',
      ausdruck: 'Bichl',
      hochdeutsch: 'kleiner Hügel',
      bedeutung: 'A Bichl ist ein kleiner Hügel oder eine Anhöhe. Aufn Bichl steht oft a Kapelln. Viele Kärntner Orts- und Flurnamen enthalten das Wort Bichl.',
      beispiel: 'Aufn Bichl hot ma an schenen Ausblick.',
      beispiel_hd: 'Auf dem Hügel hat man einen schönen Ausblick.',
      kategorie: 'natur'
    },
    {
      id: 'kt-018',
      ausdruck: 'schiach',
      hochdeutsch: 'hässlich / unschön',
      bedeutung: 'schiach bedeutet hässlich, unschön oder auch wütend (schiach wern). A schiachs Wetter ist ein garstiges Wetter. Ein vielseitiges österreichisches Wort.',
      beispiel: 'Heit is a richtig schiachs Wetter.',
      beispiel_hd: 'Heute ist ein richtig garstiges Wetter.',
      kategorie: 'gefuehle'
    },
    {
      id: 'kt-019',
      ausdruck: 'narrisch',
      hochdeutsch: 'verrückt / närrisch',
      bedeutung: 'narrisch heißt verrückt oder ganz aus dem Häuschen. Narrisch wern bedeutet, vor Freude oder Ärger außer sich zu geraten. Ein lebhaftes Gefühlswort.',
      beispiel: 'I wer narrisch bei dem Larm.',
      beispiel_hd: 'Ich werde verrückt bei dem Lärm.',
      kategorie: 'gefuehle'
    },
    {
      id: 'kt-020',
      ausdruck: 'Erdäpfel',
      hochdeutsch: 'Kartoffeln',
      bedeutung: 'Erdäpfel sind die Kartoffeln, das österreichische Wort. Sie füllen die Kasnudl und kommen als Erdäpfelsalat auf den Tisch. Ein Grundnahrungsmittel.',
      beispiel: 'In d Kasnudl kummen Erdäpfel und Topfen.',
      beispiel_hd: 'In die Kasnudeln kommen Kartoffeln und Topfen.',
      kategorie: 'essen'
    },
    {
      id: 'kt-021',
      ausdruck: 'Krügerl',
      hochdeutsch: 'halber Liter Bier',
      bedeutung: 'A Krügerl ist ein Glas Bier zu einem halben Liter. Am See bestellt man im Sommer gern a kühls Krügerl. Ein gängiges österreichisches Wirtshausmaß.',
      beispiel: 'Am Wörthersee trink ma a Krügerl.',
      beispiel_hd: 'Am Wörthersee trinken wir ein halbes Bier.',
      kategorie: 'essen'
    },
    {
      id: 'kt-022',
      ausdruck: 'Most',
      hochdeutsch: 'vergorener Apfel- oder Birnensaft',
      bedeutung: 'Most ist der vergorene Apfel- oder Birnensaft vom Bauernhof. A Glasl Most gehört zur zünftigen Jause. Ein traditionelles Getränk im ländlichen Kärnten.',
      beispiel: 'Zur Jausn schenkt da Bauer Most aus.',
      beispiel_hd: 'Zur Jause schenkt der Bauer Most aus.',
      kategorie: 'essen'
    },
    {
      id: 'kt-023',
      ausdruck: 'fesch',
      hochdeutsch: 'schick / hübsch',
      bedeutung: 'fesch beschreibt jemanden oder etwas als hübsch und schick. A fesches Dirndl ist ein hübsches Mädchen. Ein beliebtes österreichisches Lob.',
      beispiel: 'Im Dirndl schaugst richtig fesch aus.',
      beispiel_hd: 'Im Dirndl siehst du richtig schick aus.',
      kategorie: 'gefuehle'
    },
    {
      id: 'kt-024',
      ausdruck: 'deppat',
      hochdeutsch: 'dumm / blöd',
      bedeutung: 'deppat heißt dumm oder blöd. So a deppate Gschicht ist eine dumme Angelegenheit. Vom Depp abgeleitet, im ganzen österreichischen Raum gebräuchlich.',
      beispiel: 'Des war a deppate Idee.',
      beispiel_hd: 'Das war eine dumme Idee.',
      kategorie: 'schimpf'
    },
    {
      id: 'kt-025',
      ausdruck: 'leiwand',
      hochdeutsch: 'großartig / super',
      bedeutung: 'leiwand bedeutet großartig oder super. Des is leiwand! ist ein begeistertes Lob. Ursprünglich Wiener Slang, heute in ganz Österreich verbreitet.',
      beispiel: 'Da Badetag am See war leiwand.',
      beispiel_hd: 'Der Badetag am See war großartig.',
      kategorie: 'gefuehle'
    },
    {
      id: 'kt-026',
      ausdruck: 'Watschn',
      hochdeutsch: 'Ohrfeige',
      bedeutung: 'A Watschn ist eine Ohrfeige. Die Androhung „du fangst glei a Watschn" ist ein bekannter Spruch. Ein deftiges Wort des südbairischen Raums.',
      beispiel: 'Wennst frech bist, fangst a Watschn.',
      beispiel_hd: 'Wenn du frech bist, fängst du eine Ohrfeige.',
      kategorie: 'schimpf'
    },
    {
      id: 'kt-027',
      ausdruck: 'Diandl',
      hochdeutsch: 'Mädchen / Dirndl',
      bedeutung: 'A Diandl ist ein Mädchen oder eine junge Frau, zugleich das Trachtenkleid. Beim Kirchtag tanzn d Diandl in da Tracht. Ein bairisches Wort.',
      beispiel: 'S Diandl singt im Kärntner Chor.',
      beispiel_hd: 'Das Mädchen singt im Kärntner Chor.',
      kategorie: 'familie'
    },
    {
      id: 'kt-028',
      ausdruck: 'Bua',
      hochdeutsch: 'Bub / Junge',
      bedeutung: 'Da Bua ist der Bub oder junge Mann, Mehrzahl Buabm. Auch als anerkennende Anrede unter Männern gebräuchlich. Ein zentrales bairisches Wort.',
      beispiel: 'Da Bua geht fischn am See.',
      beispiel_hd: 'Der Junge geht am See fischen.',
      kategorie: 'familie'
    },
    {
      id: 'kt-029',
      ausdruck: 'Gschropp',
      hochdeutsch: 'kleines Kind',
      bedeutung: 'A Gschropp ist ein kleines Kind, oft liebevoll-augenzwinkernd gemeint. D Gschroppm toben durchs Haus. Ein bairisch-kärntnerisches Familienwort.',
      beispiel: 'D Gschroppm planschn im See.',
      beispiel_hd: 'Die kleinen Kinder planschen im See.',
      kategorie: 'familie'
    },
    {
      id: 'kt-030',
      ausdruck: 'heuer',
      hochdeutsch: 'dieses Jahr',
      bedeutung: 'heuer bedeutet „in diesem Jahr". Heuer is da See warm meint, dieses Jahr ist der See warm. Im ganzen österreichischen Raum gebräuchlich.',
      beispiel: 'Heuer is da See schee warm.',
      beispiel_hd: 'Dieses Jahr ist der See schön warm.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-031',
      ausdruck: 'Buschenschank',
      hochdeutsch: 'Straußwirtschaft des Winzers',
      bedeutung: 'Ein Buschenschank ist die Schank eines Bauern oder Winzers mit eigenem Wein, Most und kalter Jause. Der ausgehängte Buschen zeigt, dass geöffnet ist.',
      beispiel: 'Am Ownd kehrn ma in Buschenschank ei.',
      beispiel_hd: 'Am Abend kehren wir in die Straußwirtschaft ein.',
      kategorie: 'orte'
    },
    {
      id: 'kt-032',
      ausdruck: 'a so',
      hochdeutsch: 'ach so / tatsächlich',
      bedeutung: 'a so ist ein häufiger Ausruf des Verstehens oder Staunens, etwa „ach so" oder „tatsächlich". Mit langgezogenem Ton drückt es kärntnerische Gemütlichkeit aus.',
      beispiel: 'A so, des hob i gar net gwusst.',
      beispiel_hd: 'Ach so, das habe ich gar nicht gewusst.',
      kategorie: 'redensart'
    }
  ]
};
