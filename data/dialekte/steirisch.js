// Steirisch — Dialektdaten
// Format: jedes Objekt ist ein Ausdruck im Dialekt mit Bedeutung auf Hochdeutsch.

export default {
  id: 'steirisch',
  name: 'Steirisch',
  region: 'Steiermark',
  bundesland: 'Steiermark (Österreich)',
  flag: '🎃',
  farbe: '#2e7d32',
  beschreibung: 'Steirisch ist ein bairischer Dialekt der Steiermark, der „Grünen Mark". Geprägt von Wein (Schilcher), Kürbiskernöl, Buschenschank und einer herzhaft-rustikalen Lebensart. Verwandt mit dem Wienerischen und Kärntnerischen, aber mit eigener, breiter Klangfärbung.',
  sprecher: 'ca. 1,2 Mio.',
  lang: 'de-AT',
  ausdruecke: [
    {
      id: 'st-001',
      ausdruck: 'Griaß di',
      hochdeutsch: 'Hallo / Grüß dich',
      bedeutung: 'Griaß di ist der alltägliche steirische Gruß unter Bekannten. Bei mehreren sagt man Griaß enk, förmlicher Griaß Gott. Ein herzlicher bairischer Gruß.',
      beispiel: 'Griaß di, wia gehts da?',
      beispiel_hd: 'Hallo, wie geht es dir?',
      kategorie: 'begruessung'
    },
    {
      id: 'st-002',
      ausdruck: 'Pfiat di',
      hochdeutsch: 'Tschüss / Behüt dich',
      bedeutung: 'Pfiat di ist die Verabschiedung, von „behüte dich Gott". Zu mehreren sagt man Pfiat enk. Ein herzlicher steirischer Abschiedsgruß.',
      beispiel: 'Pfiat di, mir segn ins eh boid wieder.',
      beispiel_hd: 'Tschüss, wir sehen uns eh bald wieder.',
      kategorie: 'begruessung'
    },
    {
      id: 'st-003',
      ausdruck: 'Kernöl',
      hochdeutsch: 'Kürbiskernöl',
      bedeutung: 'Kernöl ist das dunkelgrüne Steirische Kürbiskernöl, ein geschütztes Aushängeschild der Region. Es kommt über den Salat, aufs Vanilleeis und sogar in Aufstriche.',
      beispiel: 'Übern Salat kummt a guats Kernöl.',
      beispiel_hd: 'Über den Salat kommt ein gutes Kürbiskernöl.',
      kategorie: 'essen'
    },
    {
      id: 'st-004',
      ausdruck: 'Sterz',
      hochdeutsch: 'geröstete Mehl- oder Grießspeise',
      bedeutung: 'Sterz ist eine zerstoßene, in Fett geröstete Mehl- oder Heidenspeise, etwa der Heidensterz aus Buchweizen. Ein traditionelles, sättigendes steirisches Bauerngericht.',
      beispiel: 'Zum Sterz gibts a Glasl Buttermilch.',
      beispiel_hd: 'Zum Sterz gibt es ein Glas Buttermilch.',
      kategorie: 'essen'
    },
    {
      id: 'st-005',
      ausdruck: 'Käferbohne',
      hochdeutsch: 'Käfer- / Feuerbohne',
      bedeutung: 'Die Steirische Käferbohne ist eine große, gefleckte Bohne, die lauwarm mit Kernöl und Zwiebel als Salat serviert wird. Ein geschütztes regionales Produkt.',
      beispiel: 'Der Käferbohnensalat schmeckt mit Kernöl.',
      beispiel_hd: 'Der Käferbohnensalat schmeckt mit Kürbiskernöl.',
      kategorie: 'essen'
    },
    {
      id: 'st-006',
      ausdruck: 'Verhackert',
      hochdeutsch: 'gehackter Speckaufstrich',
      bedeutung: 'Verhackert ist ein würziger Aufstrich aus fein gehacktem, geselchtem Speck, der aufs Bauernbrot gestrichen wird. Eine deftige Spezialität der steirischen Brettljause.',
      beispiel: 'Aufs Brot streich ma s Verhackert.',
      beispiel_hd: 'Aufs Brot streichen wir den Speckaufstrich.',
      kategorie: 'essen'
    },
    {
      id: 'st-007',
      ausdruck: 'Brettljause',
      hochdeutsch: 'deftige Vesperplatte',
      bedeutung: 'Die Brettljause ist eine kalte Jause mit Speck, Verhackert, Käse und Kren, serviert auf einem Holzbrettl. Höhepunkt jedes Besuchs im Buschenschank.',
      beispiel: 'Im Buschenschank gibts a zünftige Brettljause.',
      beispiel_hd: 'Beim Buschenschank gibt es eine zünftige Vesperplatte.',
      kategorie: 'essen'
    },
    {
      id: 'st-008',
      ausdruck: 'Buschenschank',
      hochdeutsch: 'Straußwirtschaft des Winzers',
      bedeutung: 'Ein Buschenschank ist die saisonale Schank eines Winzers, der eigenen Wein und kalte Jause anbietet. Ein ausgehängter Buschen zeigt an, dass geöffnet ist.',
      beispiel: 'Am Sunntag fahr ma in Buschenschank.',
      beispiel_hd: 'Am Sonntag fahren wir zur Straußwirtschaft.',
      kategorie: 'orte'
    },
    {
      id: 'st-009',
      ausdruck: 'Schilcher',
      hochdeutsch: 'steirischer Roséwein',
      bedeutung: 'Schilcher ist ein säurebetonter, rosafarbener Wein aus der Blauen Wildbacher Traube, eine Spezialität der Weststeiermark. Sein herber Charakter ist unverwechselbar.',
      beispiel: 'Im Sommer trink ma an gspritzten Schilcher.',
      beispiel_hd: 'Im Sommer trinken wir einen Schilcher gespritzt.',
      kategorie: 'essen'
    },
    {
      id: 'st-010',
      ausdruck: 'Backhendl',
      hochdeutsch: 'paniertes Brathuhn',
      bedeutung: 'Das Backhendl ist ein knusprig paniertes und herausgebackenes Hühnchen, ein Klassiker der steirischen und österreichischen Wirtshausküche, oft mit Vogerlsalat.',
      beispiel: 'Beim Wirt gibts a knuspriges Backhendl.',
      beispiel_hd: 'Beim Wirt gibt es ein knuspriges Brathuhn.',
      kategorie: 'essen'
    },
    {
      id: 'st-011',
      ausdruck: 'Kletzn',
      hochdeutsch: 'gedörrte Birnen',
      bedeutung: 'Kletzn sind gedörrte Birnen, die zur Weihnachtszeit ins Kletzenbrot kommen. Ein süßes, haltbares Wintervorrats-Obst der steirischen Bauernküche.',
      beispiel: 'Ins Kletzenbrot kummen Kletzn und Nüss.',
      beispiel_hd: 'Ins Früchtebrot kommen gedörrte Birnen und Nüsse.',
      kategorie: 'essen'
    },
    {
      id: 'st-012',
      ausdruck: 'Krügerl',
      hochdeutsch: 'halber Liter Bier',
      bedeutung: 'A Krügerl ist ein Glas Bier zu einem halben Liter, der Henkelkrug. Beim Wirt bestellt man a Krügerl, während s Seidl der kleinere Drittelliter ist.',
      beispiel: 'I nimm a Krügerl, du a?',
      beispiel_hd: 'Ich nehme ein halbes Bier, du auch?',
      kategorie: 'essen'
    },
    {
      id: 'st-013',
      ausdruck: 'Seidl',
      hochdeutsch: 'kleines Bier (0,3 l)',
      bedeutung: 'A Seidl ist das kleine Bierglas mit rund drei Deziliter. Wer nicht zu viel will, bestellt a Seidl statt a Krügerl. Ein gängiges österreichisches Wirtshausmaß.',
      beispiel: 'Mir langt a Seidl zum Essen.',
      beispiel_hd: 'Mir genügt ein kleines Bier zum Essen.',
      kategorie: 'essen'
    },
    {
      id: 'st-014',
      ausdruck: 'Spritzer',
      hochdeutsch: 'Weinschorle',
      bedeutung: 'A Spritzer ist Wein mit Mineralwasser, das Standardgetränk im Sommer und beim Buschenschank. A gspritzter Schilcher ist besonders beliebt.',
      beispiel: 'Bei der Hitz schmeckt a Spritzer.',
      beispiel_hd: 'Bei der Hitze schmeckt eine Weinschorle.',
      kategorie: 'essen'
    },
    {
      id: 'st-015',
      ausdruck: 'Most',
      hochdeutsch: 'vergorener Apfel- oder Birnensaft',
      bedeutung: 'Most ist der vergorene Apfel- oder Birnensaft, ein traditionelles Getränk der Bauernhöfe. Auf der Mostschank wird selbstgepresster Most ausgeschenkt.',
      beispiel: 'Der Bauer schenkt sein eigenen Most aus.',
      beispiel_hd: 'Der Bauer schenkt seinen eigenen Most aus.',
      kategorie: 'essen'
    },
    {
      id: 'st-016',
      ausdruck: 'Vogerlsalat',
      hochdeutsch: 'Feldsalat',
      bedeutung: 'Vogerlsalat ist der Feldsalat, der mit Kernöl und Kürbiskernen angemacht und gern zum Backhendl serviert wird. Ein typischer Bestandteil der steirischen Küche.',
      beispiel: 'Zum Backhendl gibts Vogerlsalat mit Kernöl.',
      beispiel_hd: 'Zum Brathuhn gibt es Feldsalat mit Kürbiskernöl.',
      kategorie: 'essen'
    },
    {
      id: 'st-017',
      ausdruck: 'Gschropp',
      hochdeutsch: 'kleines Kind',
      bedeutung: 'A Gschropp ist ein kleines Kind, oft liebevoll-augenzwinkernd gemeint. D Gschroppm sind die Kinder, die durchs Haus toben. Ein bairisch-steirisches Wort.',
      beispiel: 'D Gschroppm spuin im Hof.',
      beispiel_hd: 'Die kleinen Kinder spielen im Hof.',
      kategorie: 'familie'
    },
    {
      id: 'st-018',
      ausdruck: 'Diandl',
      hochdeutsch: 'Mädchen / Dirndl',
      bedeutung: 'A Diandl ist ein Mädchen oder eine junge Frau, zugleich das Trachtenkleid. Beim Aufsteirern tragen viele Diandl ihr schönstes Dirndl. Ein bairisches Wort.',
      beispiel: 'S Diandl tanzt beim Fest in da Tracht.',
      beispiel_hd: 'Das Mädchen tanzt beim Fest in der Tracht.',
      kategorie: 'familie'
    },
    {
      id: 'st-019',
      ausdruck: 'Bua',
      hochdeutsch: 'Bub / Junge',
      bedeutung: 'Da Bua ist der Bub oder junge Mann, Mehrzahl Buabm. Auch als anerkennende Anrede unter Männern gebräuchlich. Ein zentrales bairisches Wort.',
      beispiel: 'Da Bua hüft beim Heign mit.',
      beispiel_hd: 'Der Junge hilft beim Heuen mit.',
      kategorie: 'familie'
    },
    {
      id: 'st-020',
      ausdruck: 'fesch',
      hochdeutsch: 'schick / hübsch',
      bedeutung: 'fesch beschreibt jemanden oder etwas als hübsch, schick und ansprechend. A fesches Diandl ist ein hübsches Mädchen. Ein beliebtes österreichisches Lob.',
      beispiel: 'Du schaugst heit richtig fesch aus.',
      beispiel_hd: 'Du siehst heute richtig schick aus.',
      kategorie: 'gefuehle'
    },
    {
      id: 'st-021',
      ausdruck: 'deppat',
      hochdeutsch: 'dumm / blöd',
      bedeutung: 'deppat heißt dumm oder blöd. So a deppate Gschicht ist eine dumme Angelegenheit. Vom Depp abgeleitet, im ganzen österreichischen Raum gebräuchlich.',
      beispiel: 'Stö di ned so deppat o!',
      beispiel_hd: 'Stell dich nicht so dumm an!',
      kategorie: 'schimpf'
    },
    {
      id: 'st-022',
      ausdruck: 'Watschn',
      hochdeutsch: 'Ohrfeige',
      bedeutung: 'A Watschn ist eine Ohrfeige. Die Androhung „du fangst glei a Watschn" ist ein klassischer Spruch. Ein deftiges bairisch-steirisches Wort.',
      beispiel: 'Wennst ned ruaig bist, fangst a Watschn.',
      beispiel_hd: 'Wenn du nicht ruhig bist, fängst du eine Ohrfeige.',
      kategorie: 'schimpf'
    },
    {
      id: 'st-023',
      ausdruck: 'tschindern',
      hochdeutsch: 'auf dem Eis schlittern',
      bedeutung: 'tschindern heißt, im Winter über eine glatte Eisfläche zu schlittern oder zu rutschen. Die Kinder tschindern auf dem gefrorenen Teich. Ein anschauliches Wintervergnügen.',
      beispiel: 'D Kinder tschindern am gfrornen Teich.',
      beispiel_hd: 'Die Kinder schlittern auf dem gefrorenen Teich.',
      kategorie: 'alltag'
    },
    {
      id: 'st-024',
      ausdruck: 'Gstetten',
      hochdeutsch: 'verwilderte Böschung / Brachland',
      bedeutung: 'A Gstetten ist eine verwilderte, ungepflegte Böschung oder ein brachliegendes Grundstück voller Gestrüpp. Ein typisch österreichisches Wort für wilde Natur am Rand.',
      beispiel: 'Hinterm Haus is a wuide Gstetten.',
      beispiel_hd: 'Hinter dem Haus ist eine wilde Böschung.',
      kategorie: 'natur'
    },
    {
      id: 'st-025',
      ausdruck: 'Marterl',
      hochdeutsch: 'Wegkreuz / Gedenktafel',
      bedeutung: 'A Marterl ist ein kleines Wegkreuz oder eine Bildtafel am Wegrand, oft zum Gedenken an einen Verunglückten. Sie prägen die Landschaft im Alpenraum.',
      beispiel: 'Am Wegrand steht a oids Marterl.',
      beispiel_hd: 'Am Wegrand steht ein altes Wegkreuz.',
      kategorie: 'orte'
    },
    {
      id: 'st-026',
      ausdruck: 'Almrausch',
      hochdeutsch: 'Alpenrose',
      bedeutung: 'Almrausch ist die Alpenrose, die im Sommer die Berghänge rot färbt. Wenn der Almrausch blüht, ist die schönste Zeit auf der Alm gekommen.',
      beispiel: 'Im Juni blüht da Almrausch am Hang.',
      beispiel_hd: 'Im Juni blüht die Alpenrose am Hang.',
      kategorie: 'natur'
    },
    {
      id: 'st-027',
      ausdruck: 'Greißler',
      hochdeutsch: 'kleiner Lebensmittelladen',
      bedeutung: 'Da Greißler ist der kleine Tante-Emma-Laden im Ort, wo es Lebensmittel und Alltägliches gibt. Viele Greißler sind verschwunden, gelten aber als Stück Heimat.',
      beispiel: 'Beim Greißler kriagst no a frische Semmel.',
      beispiel_hd: 'Beim kleinen Laden bekommst du noch frische Brötchen.',
      kategorie: 'arbeit'
    },
    {
      id: 'st-028',
      ausdruck: 'tschinageln',
      hochdeutsch: 'hart arbeiten / schuften',
      bedeutung: 'tschinageln heißt schwer und ausdauernd arbeiten, schuften. Den ganzen Tag tschinageln meint, sich abzurackern. Ein ausdrucksstarkes österreichisches Wort.',
      beispiel: 'Mir hams am Bau orntlich tschinaglt.',
      beispiel_hd: 'Wir haben auf dem Bau ordentlich geschuftet.',
      kategorie: 'arbeit'
    },
    {
      id: 'st-029',
      ausdruck: 'Haxn',
      hochdeutsch: 'Bein / Beine',
      bedeutung: 'D Haxn sind die Beine, Einzahl Hax. Reiß d Haxn zsamm! mahnt zur Haltung. Ein kerniges bairisch-steirisches Wort für die Gliedmaßen.',
      beispiel: 'Mir tuan noch da Wanderung d Haxn weh.',
      beispiel_hd: 'Mir tun nach der Wanderung die Beine weh.',
      kategorie: 'koerper'
    },
    {
      id: 'st-030',
      ausdruck: 'Goschn',
      hochdeutsch: 'Mund',
      bedeutung: 'D Goschn ist der Mund, oft im Sinne von vorlautem Reden. Hoit dei Goschn! heißt „sei still". Ein deftiges Alltagswort des bairischen Raums.',
      beispiel: 'Etz hoit amoi dei Goschn!',
      beispiel_hd: 'Jetzt halt mal deinen Mund!',
      kategorie: 'koerper'
    },
    {
      id: 'st-031',
      ausdruck: 'Erdäpfel',
      hochdeutsch: 'Kartoffeln',
      bedeutung: 'Erdäpfel sind die Kartoffeln, das österreichische Wort. Erdäpfelsalat mit Kernöl ist eine steirische Spezialität. Grundlage vieler bodenständiger Gerichte.',
      beispiel: 'Zum Backhendl gibts Erdäpfelsalat.',
      beispiel_hd: 'Zum Brathuhn gibt es Kartoffelsalat.',
      kategorie: 'essen'
    },
    {
      id: 'st-032',
      ausdruck: 'Paradeiser',
      hochdeutsch: 'Tomaten',
      bedeutung: 'Paradeiser sind die Tomaten, das österreichische Wort vom Paradiesapfel. Frische Paradeiser kommen im Sommer aus dem eigenen Garten in den Salat.',
      beispiel: 'D Paradeiser reifn im Glashaus.',
      beispiel_hd: 'Die Tomaten reifen im Gewächshaus.',
      kategorie: 'essen'
    },
    {
      id: 'st-033',
      ausdruck: 'oba',
      hochdeutsch: 'aber',
      bedeutung: 'oba heißt aber. Des is oba schee! bedeutet „das ist aber schön!". Ein häufiges Bindewort, das im Steirischen breit und gedehnt klingt.',
      beispiel: 'Des is oba a guate Idee.',
      beispiel_hd: 'Das ist aber eine gute Idee.',
      kategorie: 'redensart'
    },
    {
      id: 'st-034',
      ausdruck: 'leiwand',
      hochdeutsch: 'großartig / super',
      bedeutung: 'leiwand bedeutet großartig, toll oder super. Des war leiwand! ist ein begeistertes Lob. Ursprünglich Wiener Slang, heute in ganz Österreich verbreitet.',
      beispiel: 'Des Konzert war voi leiwand.',
      beispiel_hd: 'Das Konzert war total großartig.',
      kategorie: 'gefuehle'
    },
    {
      id: 'st-035',
      ausdruck: 'heuer',
      hochdeutsch: 'dieses Jahr',
      bedeutung: 'heuer bedeutet „in diesem Jahr" und ist im ganzen österreichischen Raum gebräuchlich. Heuer war a guate Weinernte meint die diesjährige Ernte.',
      beispiel: 'Heuer hamma an guatn Wein.',
      beispiel_hd: 'Dieses Jahr haben wir einen guten Wein.',
      kategorie: 'alltag'
    },
    {
      id: 'st-036',
      ausdruck: 'Jause',
      hochdeutsch: 'Zwischenmahlzeit / Vesper',
      bedeutung: 'D Jause ist die kalte Zwischenmahlzeit am Vormittag oder Nachmittag, oft mit Brot, Speck und Käse. A zünftige Jause gehört zum Ausflug dazu.',
      beispiel: 'Um zehne mach ma a Jause.',
      beispiel_hd: 'Um zehn machen wir eine Jause.',
      kategorie: 'essen'
    },
    {
      id: 'st-037',
      ausdruck: 'Kipferl',
      hochdeutsch: 'Hörnchen / Croissant',
      bedeutung: 'A Kipferl ist ein gebogenes Hörnchen aus Germteig, zum Frühstück mit Butter und Marmelade. Das Vanillekipferl ist ein beliebtes Weihnachtsgebäck.',
      beispiel: 'Zum Kaffee iss i a Kipferl.',
      beispiel_hd: 'Zum Kaffee esse ich ein Hörnchen.',
      kategorie: 'essen'
    },
    {
      id: 'st-038',
      ausdruck: 'Faschiertes',
      hochdeutsch: 'Hackfleisch',
      bedeutung: 'Faschiertes ist das Hackfleisch, aus dem man Faschierte Laibchen formt. Ein Grundbegriff der österreichischen Küche, vom Faschieren durch den Wolf.',
      beispiel: 'Aus Faschiertem mach i Laibchen.',
      beispiel_hd: 'Aus Hackfleisch mache ich Frikadellen.',
      kategorie: 'essen'
    },
    {
      id: 'st-039',
      ausdruck: 'Karfiol',
      hochdeutsch: 'Blumenkohl',
      bedeutung: 'Karfiol ist der Blumenkohl, vom italienischen cavolfiore. Gebacken oder mit Bröseln ist Karfiol eine beliebte Beilage der steirischen Küche.',
      beispiel: 'An Karfiol back ma in da Pfann.',
      beispiel_hd: 'Den Blumenkohl backen wir in der Pfanne.',
      kategorie: 'essen'
    },
    {
      id: 'st-040',
      ausdruck: 'Fisolen',
      hochdeutsch: 'grüne Bohnen',
      bedeutung: 'Fisolen sind die grünen Gartenbohnen. Gekocht als Beilage oder im Eintopf gehören Fisolen zur sommerlichen Hausmannskost der Steiermark.',
      beispiel: 'Als Beilag gibts heut Fisolen.',
      beispiel_hd: 'Als Beilage gibt es heute grüne Bohnen.',
      kategorie: 'essen'
    },
    {
      id: 'st-041',
      ausdruck: 'Ribisel',
      hochdeutsch: 'Johannisbeeren',
      bedeutung: 'Ribisel sind die Johannisbeeren, rot oder schwarz. Aus Ribisel macht man Saft und Marmelade. Das Wort ist im ganzen österreichischen Raum gebräuchlich.',
      beispiel: 'Im Garten hängen d Ribisel rot am Strauch.',
      beispiel_hd: 'Im Garten hängen die Johannisbeeren rot am Strauch.',
      kategorie: 'natur'
    },
    {
      id: 'st-042',
      ausdruck: 'Häusl',
      hochdeutsch: 'Toilette / Häuschen',
      bedeutung: 'S Häusl ist die Toilette, früher das Plumpsklo im Hof. I muass aufs Häusl heißt „ich muss auf die Toilette". Ein gängiges Alltagswort.',
      beispiel: 'Wo is denn do des Häusl?',
      beispiel_hd: 'Wo ist denn hier die Toilette?',
      kategorie: 'orte'
    },
    {
      id: 'st-043',
      ausdruck: 'Tschick',
      hochdeutsch: 'Zigarette',
      bedeutung: 'A Tschick ist eine Zigarette, vom italienischen cicca. A Tschick rauchn heißt rauchen. Ein in ganz Österreich verbreitetes umgangssprachliches Wort.',
      beispiel: 'Geh ma vor d Tür auf a Tschick.',
      beispiel_hd: 'Gehen wir vor die Tür auf eine Zigarette.',
      kategorie: 'alltag'
    },
    {
      id: 'st-044',
      ausdruck: 'Sackerl',
      hochdeutsch: 'Tüte / Beutel',
      bedeutung: 'A Sackerl ist eine kleine Tüte oder ein Beutel, etwa fürs Einkaufen. Tua d Erdäpfel ins Sackerl. Ein typisch österreichisches Wort.',
      beispiel: 'Geben S ma a Sackerl dazua.',
      beispiel_hd: 'Geben Sie mir eine Tüte dazu.',
      kategorie: 'alltag'
    },
    {
      id: 'st-045',
      ausdruck: 'Häferl',
      hochdeutsch: 'Tasse / Becher',
      bedeutung: 'A Häferl ist eine Tasse oder ein Becher. A Häferl Kaffee am Morgen gehört dazu. Ein gängiges österreichisches Wort für das Trinkgefäß.',
      beispiel: 'I trink a Häferl Kaffee am Morgn.',
      beispiel_hd: 'Ich trinke eine Tasse Kaffee am Morgen.',
      kategorie: 'alltag'
    }
  ]
};
