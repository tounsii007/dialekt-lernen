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
    },
    {
      id: 'kt-033',
      ausdruck: 'Marille',
      hochdeutsch: 'Aprikose',
      bedeutung: 'Marille ist die Aprikose, das österreichische Wort. Aus Marillen macht man Marmelade, Knödl und Schnaps. Ein beliebtes Sommerobst.',
      beispiel: 'Aus Marillen koch ma a Marmelad.',
      beispiel_hd: 'Aus Aprikosen kochen wir Marmelade.',
      kategorie: 'natur'
    },
    {
      id: 'kt-034',
      ausdruck: 'Powidl',
      hochdeutsch: 'Pflaumenmus',
      bedeutung: 'Powidl ist eingekochtes Pflaumenmus ohne Zucker, das in Powidltascherl oder aufs Brot kommt. Übertragen heißt des is mir powidl auch „das ist mir egal".',
      beispiel: 'In d Tascherl kummt Powidl eini.',
      beispiel_hd: 'In die Teigtaschen kommt Pflaumenmus hinein.',
      kategorie: 'essen'
    },
    {
      id: 'kt-035',
      ausdruck: 'Palatschinke',
      hochdeutsch: 'dünner Eierkuchen',
      bedeutung: 'A Palatschinke ist ein dünner, gefüllter Eierkuchen, süß mit Marmelade oder Topfen. Eine Mehlspeise, die in ganz Österreich beliebt ist.',
      beispiel: 'Zum Nachtisch gibts a Palatschinke.',
      beispiel_hd: 'Zum Nachtisch gibt es einen Eierkuchen.',
      kategorie: 'essen'
    },
    {
      id: 'kt-036',
      ausdruck: 'Germknödel',
      hochdeutsch: 'Hefekloß mit Powidl',
      bedeutung: 'A Germknödel ist ein flaumiger Hefekloß, gefüllt mit Powidl und übergossen mit Vanillesoße und Mohn. Eine warme Mehlspeise, oft auf der Skihütte.',
      beispiel: 'Auf da Hüttn iss i an Germknödel.',
      beispiel_hd: 'Auf der Hütte esse ich einen Germknödel.',
      kategorie: 'essen'
    },
    {
      id: 'kt-037',
      ausdruck: 'Häferl',
      hochdeutsch: 'Tasse / Becher',
      bedeutung: 'A Häferl ist eine Tasse oder ein Becher, etwa fürs Kaffeetrinken. A Häferl Kaffee am Morgen gehört dazu. Ein gängiges österreichisches Wort.',
      beispiel: 'I trink a Häferl Kaffee.',
      beispiel_hd: 'Ich trinke eine Tasse Kaffee.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-038',
      ausdruck: 'Sessel',
      hochdeutsch: 'Stuhl',
      bedeutung: 'Der Sessel ist in Österreich der einfache Stuhl, nicht der Polstersessel. Setz di auf an Sessel heißt, sich auf einen Stuhl zu setzen. Eine österreichische Eigenheit.',
      beispiel: 'Hol da an Sessel und setz di her.',
      beispiel_hd: 'Hol dir einen Stuhl und setz dich her.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-039',
      ausdruck: 'Polster',
      hochdeutsch: 'Kissen',
      bedeutung: 'Der Polster ist das Kopfkissen, auf dem man schläft. A weicher Polster lässt gut schlafen. Das österreichische Wort fürs Kissen.',
      beispiel: 'I brauch an weichen Polster zum Schlafn.',
      beispiel_hd: 'Ich brauche ein weiches Kissen zum Schlafen.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-040',
      ausdruck: 'Tuchent',
      hochdeutsch: 'Bettdecke / Federdecke',
      bedeutung: 'D Tuchent ist die dicke Federbett-Decke, unter die man sich im Winter kuschelt. Eine warme Tuchent gehört zum österreichischen Schlafzimmer.',
      beispiel: 'Im Winter zieh i d Tuchent bis ans Kinn.',
      beispiel_hd: 'Im Winter ziehe ich die Bettdecke bis ans Kinn.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-041',
      ausdruck: 'Sackerl',
      hochdeutsch: 'Tüte / Beutel',
      bedeutung: 'A Sackerl ist eine kleine Tüte oder ein Beutel, etwa fürs Einkaufen. Tua de Semmeln ins Sackerl. Ein typisch österreichisches Wort.',
      beispiel: 'Geben S ma bitte a Sackerl dazua.',
      beispiel_hd: 'Geben Sie mir bitte eine Tüte dazu.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-042',
      ausdruck: 'Trafik',
      hochdeutsch: 'Tabak- und Zeitungsladen',
      bedeutung: 'D Trafik ist der kleine Laden für Zigaretten, Zeitungen und Fahrscheine, oft von einem Trafikanten geführt. Eine österreichische Institution.',
      beispiel: 'In da Trafik kauf i a Zeitung.',
      beispiel_hd: 'Im Tabakladen kaufe ich eine Zeitung.',
      kategorie: 'orte'
    },
    {
      id: 'kt-043',
      ausdruck: 'Stiege',
      hochdeutsch: 'Treppe',
      bedeutung: 'D Stiege ist die Treppe. Über d Stiege geht man in den ersten Stock. Ein im österreichischen Raum verbreitetes Wort fürs Treppenhaus.',
      beispiel: 'Geh d Stiege auffi, s Zimmer is obn.',
      beispiel_hd: 'Geh die Treppe hinauf, das Zimmer ist oben.',
      kategorie: 'orte'
    },
    {
      id: 'kt-044',
      ausdruck: 'Jänner',
      hochdeutsch: 'Januar',
      bedeutung: 'Jänner ist der Januar, der erste Monat des Jahres. Im Jänner liegt am Berg viel Schnee. Das Wort ist in ganz Österreich üblich.',
      beispiel: 'Im Jänner is da See zugfrorn.',
      beispiel_hd: 'Im Januar ist der See zugefroren.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-045',
      ausdruck: 'Topfen',
      hochdeutsch: 'Quark',
      bedeutung: 'Topfen ist der Quark, Grundlage vieler Mehlspeisen wie Topfenstrudel oder der Fülle für d Kasnudl. Ein vielseitiges österreichisches Milchprodukt.',
      beispiel: 'In d Kasnudl kummt Topfen eini.',
      beispiel_hd: 'In die Kasnudeln kommt Quark hinein.',
      kategorie: 'essen'
    },
    {
      id: 'kt-046',
      ausdruck: 'Obers',
      hochdeutsch: 'Sahne / Rahm',
      bedeutung: 'Obers ist die Schlagsahne oder der Rahm. Auf an Kaffee kummt a Schlagobers. Ein gängiges österreichisches Küchenwort.',
      beispiel: 'Auf d Palatschinke kummt a Obers.',
      beispiel_hd: 'Auf den Eierkuchen kommt Sahne.',
      kategorie: 'essen'
    },
    {
      id: 'kt-047',
      ausdruck: 'Beisl',
      hochdeutsch: 'kleine Wirtschaft / Kneipe',
      bedeutung: 'A Beisl ist eine kleine, einfache Wirtschaft oder Kneipe, in der man günstig isst und trinkt. Ins Beisl geh heißt, in die Stammkneipe zu gehen.',
      beispiel: 'Am Ownd treffma uns im Beisl.',
      beispiel_hd: 'Am Abend treffen wir uns in der Kneipe.',
      kategorie: 'orte'
    },
    {
      id: 'kt-048',
      ausdruck: 'Vogerlsalat',
      hochdeutsch: 'Feldsalat',
      bedeutung: 'Vogerlsalat ist der Feldsalat, gern mit Kürbiskernöl und Erdäpfeln angemacht. Eine beliebte Beilage in der Kärntner und österreichischen Küche.',
      beispiel: 'Als Beilag gibts an Vogerlsalat.',
      beispiel_hd: 'Als Beilage gibt es Feldsalat.',
      kategorie: 'essen'
    },
    {
      id: 'kt-049',
      ausdruck: 'Tschurtschn',
      hochdeutsch: 'Tannenzapfen',
      bedeutung: 'A Tschurtschn ist ein Tannen- oder Fichtenzapfen, den man im Wald aufklaubt. Scherzhaft sagt man zu einem tappigen Menschen auch „du Tschurtschn". Ein typisch Kärntner Wort.',
      beispiel: 'Im Woid liegn lauter Tschurtschn umadum.',
      beispiel_hd: 'Im Wald liegen lauter Tannenzapfen herum.',
      kategorie: 'natur'
    },
    {
      id: 'kt-050',
      ausdruck: 'Pratzn',
      hochdeutsch: 'große, grobe Hand',
      bedeutung: 'D Pratzn ist die große, grobe Hand oder Pfote. Wasch da amol deine Pratzn heißt, sich die schmutzigen Hände zu waschen. Ein deftiges südbairisches Wort.',
      beispiel: 'Wasch da amol deine Pratzn vorm Essn.',
      beispiel_hd: 'Wasch dir einmal die Hände vor dem Essen.',
      kategorie: 'koerper'
    },
    {
      id: 'kt-051',
      ausdruck: 'Goschn',
      hochdeutsch: 'Mund / Maul',
      bedeutung: 'D Goschn ist derb der Mund oder das Maul. Holt di Goschn heißt „sei still". A große Goschn hom bedeutet, vorlaut zu sein. Ein im ganzen Süden gebräuchliches Wort.',
      beispiel: 'Jetz holt amol dei Goschn!',
      beispiel_hd: 'Jetzt halt einmal deinen Mund!',
      kategorie: 'koerper'
    },
    {
      id: 'kt-052',
      ausdruck: 'tschentschn',
      hochdeutsch: 'jammern / nörgeln',
      bedeutung: 'tschentschn heißt jammern, nörgeln oder wehleidig klagen. Heer auf zan tschentschn meint, mit dem Gejammere aufzuhören. Ein lautmalerisches Kärntner Wort.',
      beispiel: 'Heer endlich auf zan tschentschn!',
      beispiel_hd: 'Hör endlich auf zu jammern!',
      kategorie: 'redensart'
    },
    {
      id: 'kt-053',
      ausdruck: 'Tschoppale',
      hochdeutsch: 'ungeschickter Mensch',
      bedeutung: 'A Tschoppale ist ein tollpatschiger, ungeschickter Mensch, meist gutmütig-spöttisch gemeint. Zu einem tappigen Kind sagt man liebevoll a kloans Tschoppale. Ein Kärntner Ausdruck.',
      beispiel: 'Du kloans Tschoppale, gib her, des moch i.',
      beispiel_hd: 'Du kleiner Tollpatsch, gib her, das mache ich.',
      kategorie: 'menschen'
    },
    {
      id: 'kt-054',
      ausdruck: 'gach',
      hochdeutsch: 'jäh / plötzlich',
      bedeutung: 'gach bedeutet jäh, plötzlich oder steil. Es is ma gach gwordn heißt, jemandem ist plötzlich schwindlig oder schlecht geworden. A gacher Steig ist ein steiler Pfad.',
      beispiel: 'Beim Aufsteh is ma gach gwordn.',
      beispiel_hd: 'Beim Aufstehen ist mir plötzlich schwindlig geworden.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-055',
      ausdruck: 'Hatscher',
      hochdeutsch: 'langer, mühsamer Fußmarsch',
      bedeutung: 'A Hatscher ist ein langer, mühsamer Fußmarsch oder Weg. Bis auffi af d Hüttn is a ordentlicher Hatscher. Wer hatscht, geht langsam und beschwerlich. Ein österreichisches Wort.',
      beispiel: 'Bis auffi af d Hüttn is a rechter Hatscher.',
      beispiel_hd: 'Bis hinauf zur Hütte ist es ein ordentlicher Fußmarsch.',
      kategorie: 'alltag'
    },
    {
      id: 'kt-056',
      ausdruck: 'Jause',
      hochdeutsch: 'Zwischenmahlzeit / Brotzeit',
      bedeutung: 'D Jause ist die kleine Zwischenmahlzeit am Vor- oder Nachmittag, oft Brot, Speck und Käse. Das Wort stammt vom slowenischen južina und ist in ganz Österreich gebräuchlich.',
      beispiel: 'Am Nochmittog mochma a zünftige Jausn.',
      beispiel_hd: 'Am Nachmittag machen wir eine zünftige Brotzeit.',
      kategorie: 'essen'
    }
  ]
};
