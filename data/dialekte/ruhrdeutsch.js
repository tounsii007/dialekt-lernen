// Ruhrdeutsch — Dialektdaten

export default {
  id: 'ruhrdeutsch',
  name: 'Ruhrdeutsch',
  region: 'Ruhrgebiet (Dortmund, Essen, Bochum, Gelsenkirchen, Duisburg)',
  bundesland: 'Nordrhein-Westfalen',
  flag: '⚒️',
  farbe: '#e36414',
  beschreibung: 'Ruhrdeutsch (oder Ruhrpott-Deutsch) ist der Regiolekt des Ruhrgebiets, entstanden durch die Mischung vieler Arbeitermigrantengruppen im 19. und 20. Jahrhundert. Polnische, tschechische und plattdeutsche Einflüsse prägen den einzigartigen, direkten Ruhrpott-Tonfall. Typisch sind der weggelassene Genitiv, maskuline Artikel und die unverblümte, herzliche Direktheit der Bergleute.',
  sprecher: 'ca. 5 Mio.',
  ausdruecke: [
    {
      id: 'ru-001',
      ausdruck: 'Moin / Tach',
      hochdeutsch: 'Hallo / Guten Tag',
      bedeutung: 'Im Ruhrpott begrüßt man sich mit „Moin" (aus dem Plattdeutschen) oder dem verkürzten „Tach" für „Guten Tag". Beide Grüße funktionieren zu jeder Tageszeit und sind herzlich ohne steif zu sein. Die Kürze ist typisch für den direkten Ruhrpott-Stil: Kein unnötiges Drumherum.',
      beispiel: 'Tach zusammen, wat geht ab?',
      beispiel_hd: 'Hallo zusammen, was ist los?',
      kategorie: 'begruessung'
    },
    {
      id: 'ru-002',
      ausdruck: 'Glück auf!',
      hochdeutsch: 'Bergmannsgruß / Auf Wiedersehen',
      bedeutung: '„Glück auf!" ist der traditionelle Bergmannsgruß und das Wahrzeichen der Ruhrpott-Kultur. Er wünschte dem Bergmann, dass sich der Stollen vor ihm öffne und er wohlbehalten wieder ans Tageslicht zurückkehre. Heute ist er ein Symbol für die gesamte Bergbauidentität des Ruhrgebiets und wird bei Treffen und Verabschiedungen benutzt.',
      beispiel: 'Glück auf, Kumpel — pass auf dich auf!',
      beispiel_hd: 'Viel Glück, Freund — pass auf dich auf!',
      kategorie: 'begruessung'
    },
    {
      id: 'ru-003',
      ausdruck: 'Alter!',
      hochdeutsch: 'Ausruf der Überraschung / Anrede unter Freunden',
      bedeutung: '„Alter!" ist im Ruhrpott ein Universalausruf, der Staunen, Empörung, Begeisterung oder einfach Aufmerksamkeit ausdrückt. Als Anrede ist er neutral bis freundschaftlich: Man sagt es zu Männern und Frauen gleichermaßen. Der Tonfall entscheidet, ob es überraschte Begeisterung oder echte Empörung ist.',
      beispiel: 'Alter, hast du das Spiel gesehen? Drei zu null!',
      beispiel_hd: 'Mann, hast du das Spiel gesehen? Drei zu null!',
      kategorie: 'redensart'
    },
    {
      id: 'ru-004',
      ausdruck: 'Flappe',
      hochdeutsch: 'Mund / Klappe',
      bedeutung: 'Die „Flappe" ist im Ruhrpott der Mund, meist in Verbindung mit der Aufforderung, still zu sein. „Halt die Flappe!" ist direkter und derber als „Sei still!", aber im Ruhrpott nicht unbedingt feindselig gemeint. Das Wort kommt aus dem Niederdeutschen und ist im ganzen Westfälischen verbreitet.',
      beispiel: 'Hald mal die Flappe, ich kann nix verstehen!',
      beispiel_hd: 'Halt mal den Mund, ich kann nichts verstehen!',
      kategorie: 'koerper'
    },
    {
      id: 'ru-005',
      ausdruck: 'Maloche',
      hochdeutsch: 'Schwere Arbeit / Schufterei',
      bedeutung: 'Die „Maloche" bezeichnet schwere körperliche Arbeit, wie sie im Bergbau und in der Stahlindustrie des Ruhrgebiets alltäglich war. Das Wort stammt aus dem Hebräischen (über das Rotwelsche) und bedeutet ursprünglich „Arbeit, Mühe". Es trägt eine gewisse Würde in sich: Wer malocht, schuftet ehrlich für sein Brot.',
      beispiel: 'Nach acht Stunden Maloche bin ich am Ende.',
      beispiel_hd: 'Nach acht Stunden Schwerarbeit bin ich erschöpft.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-006',
      ausdruck: 'malochen',
      hochdeutsch: 'schuften / hart arbeiten',
      bedeutung: 'Das Verb „malochen" beschreibt schwere, körperlich anstrengende Arbeit. Im Ruhrgebiet war Malochen auf der Zeche oder im Stahlwerk das Leben einer ganzen Generation von Arbeitern. Wer malocht, wird respektiert — es ist kein Jammern, sondern ein Ausdruck von Fleiß und Arbeiterstolz.',
      beispiel: 'Mein Vater hat vierzig Jahre auf der Zeche gemaloched.',
      beispiel_hd: 'Mein Vater hat vierzig Jahre auf dem Bergwerk gearbeitet.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-007',
      ausdruck: 'Schicht',
      hochdeutsch: 'Arbeitsschicht / Schicht im Bergwerk',
      bedeutung: 'Die „Schicht" ist die Arbeitseinheit des Bergmanns — Frühschicht, Spätschicht, Nachtschicht. Der Bergmann lebte im Rhythmus der Schichten, und die Familie richtete sich danach. „Schicht im Schacht" bedeutet „Feierabend" oder im übertragenen Sinne: Jetzt ist Schluss, jetzt reicht es.',
      beispiel: 'Ich fahr gleich ein zur Schicht.',
      beispiel_hd: 'Ich fahre gleich zur Arbeit in die Grube.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-008',
      ausdruck: 'Zeche',
      hochdeutsch: 'Bergwerk / Kohlenzeche',
      bedeutung: 'Die Zeche ist das Bergwerk, in dem Steinkohle abgebaut wird. Das Ruhrgebiet war über 150 Jahre das wichtigste Steinkohlenrevier Europas mit Hunderten von Zechen. Namen wie Zeche Zollverein (UNESCO-Welterbe), Zeche Consolidation oder Zeche Auguste Victoria sind Teil der Ruhrpott-Identität.',
      beispiel: 'Die Zeche Zollverein ist heute ein Weltkulturerbe.',
      beispiel_hd: 'Das Bergwerk Zollverein ist heute ein Weltkulturerbe.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-009',
      ausdruck: 'Pütt',
      hochdeutsch: 'Bergwerk / Zeche (umgangssprachlich)',
      bedeutung: 'Der „Pütt" ist die liebevolle, umgangssprachliche Bezeichnung für das Bergwerk oder die Zeche. Das Wort kommt aus dem Niederländischen „put" (Brunnen, Grube) und zeigt die westfälisch-niederrheinischen Spracheinflüsse. „Auf dem Pütt" zu arbeiten bedeutete, sein Leben dem Bergbau zu widmen.',
      beispiel: 'Mein Opa hat sein ganzes Leben auf dem Pütt gemaloched.',
      beispiel_hd: 'Mein Opa hat sein ganzes Leben im Bergwerk gearbeitet.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-010',
      ausdruck: 'Kumpel',
      hochdeutsch: 'Bergmannskollege / enger Freund',
      bedeutung: 'Der „Kumpel" war ursprünglich der Bergmannskollege, dem man sein Leben anvertrauen musste — unter Tage war man aufeinander angewiesen. Das Wort stammt vom polnischen „kumpan" (Gefährte) und zeigt die starke Zuwanderung aus Polen ins Ruhrgebiet. Heute ist „Kumpel" die allgemeine Bezeichnung für einen echten, verlässlichen Freund.',
      beispiel: 'Mein Kumpel hilft mir immer, wenn ich Probleme hab.',
      beispiel_hd: 'Mein Freund hilft mir immer, wenn ich Probleme habe.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-011',
      ausdruck: 'Kohle',
      hochdeutsch: 'Geld / Steinkohle',
      bedeutung: 'Im Ruhrpott bedeutet „Kohle" sowohl das schwarze Mineral als auch umgangssprachlich Geld. „Ich hab keine Kohle" heißt „Ich bin pleite". Diese Doppelbedeutung ist typisch für den Ruhrpott, wo Steinkohle buchstäblich der Motor des Wohlstands war — kein Wunder, dass sie zum Synonym für Geld wurde.',
      beispiel: 'Ich hab keine Kohle mehr bis Ende des Monats.',
      beispiel_hd: 'Ich habe kein Geld mehr bis Ende des Monats.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-012',
      ausdruck: 'Schicht im Schacht',
      hochdeutsch: 'Feierabend / Schluss / Jetzt reicht es',
      bedeutung: 'Der Ausruf „Schicht im Schacht" bedeutet, dass die Arbeit beendet ist oder dass etwas aufgehört hat. Er kommt direkt aus dem Bergbau, wo das Ende einer Schicht das Signal zum Auffahren war. Im Alltag benutzt man ihn, wenn eine Situation, ein Streit oder eine Aktivität zu Ende ist.',
      beispiel: 'So, nach drei Stunden Umzug: Schicht im Schacht, jetzt gibt es Bier!',
      beispiel_hd: 'So, nach drei Stunden Umzug: Feierabend, jetzt gibt es Bier!',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-013',
      ausdruck: 'Ruhrpott',
      hochdeutsch: 'Das Ruhrgebiet',
      bedeutung: 'Der „Ruhrpott" ist der liebevolle Spitzname für das Ruhrgebiet, die größte Metropolregion Deutschlands. Er vereint Städte wie Dortmund, Essen, Bochum, Duisburg und Gelsenkirchen. Der Begriff „Pott" kommt wohl von der kesselartigen Topografie oder der Analogie zum Schmelztiegel der Kulturen. Ruhrpottler sind stolz auf ihren Pott.',
      beispiel: 'Wer einmal im Ruhrpott lebt, der bleibt.',
      beispiel_hd: 'Wer einmal im Ruhrgebiet lebt, der bleibt.',
      kategorie: 'orte'
    },
    {
      id: 'ru-014',
      ausdruck: 'Currywurst mit Pommes',
      hochdeutsch: 'Currywurst mit Pommes frites',
      bedeutung: 'Die Currywurst mit Pommes ist das Nationalgericht des Ruhrpotts — eine gebratene Bratwurst mit Tomatensauce und Currypulver, dazu Pommes mit Mayonnaise. An jedem Imbissstand, vor jedem Stadion und in jedem Vereinsheim ist dieses Gericht unverzichtbar. Im Ruhrpott bestellt man gerne einmal Curry mit Schranke (mit Pommes).',
      beispiel: 'Nach dem Spiel direkt zum Imbiss: Curry mit Pommes und Mayo.',
      beispiel_hd: 'Nach dem Spiel direkt zum Imbiss: Currywurst mit Pommes und Mayonnaise.',
      kategorie: 'essen'
    },
    {
      id: 'ru-015',
      ausdruck: 'Schmalzbrötchen',
      hochdeutsch: 'Brötchen mit Schweineschmalz',
      bedeutung: 'Das Schmalzbrötchen ist ein einfaches, sättigendes Arbeiteressen: ein Brötchen bestrichen mit Schweineschmalz, oft mit Grieben und etwas Salz. Es war das klassische Frühstück des Bergmanns vor der Schicht, weil es lange satt hält und billig ist. Heute gilt es als nostalgisches Kultessen des Ruhrpotts.',
      beispiel: 'Ein Schmalzbrötchen morgens vor der Schicht — mehr braucht man nicht.',
      beispiel_hd: 'Ein Brötchen mit Schmalz morgens vor der Arbeit — mehr braucht man nicht.',
      kategorie: 'essen'
    },
    {
      id: 'ru-016',
      ausdruck: 'Bochumer',
      hochdeutsch: 'Einwohner von Bochum',
      bedeutung: 'Ein „Bochumer" ist der typische Ruhrpottler: direkt, herzlich, fußballverrückt und stolz auf seine Stadt. Bochum ist die Stadt des VfL Bochum, des Schauspielhauses und des Deutschen Bergbau-Museums. Das Lied „Bochum" von Herbert Grönemeyer ist quasi die Hymne der Stadt und des Ruhrpotts schlechthin.',
      beispiel: 'Die Bochumer feiern ihren Aufstieg in die Erste Liga.',
      beispiel_hd: 'Die Bochumer feiern ihren Aufstieg in die Erste Liga.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-017',
      ausdruck: 'Dortmunder',
      hochdeutsch: 'Einwohner von Dortmund',
      bedeutung: 'Dortmunder sind die Einwohner der größten Stadt im Ruhrgebiet und BVB-Fans durch und durch. Dortmund hat eine der ältesten Stadtrechte Deutschlands und war Mitglied der Hanse. Heute ist Dortmund bekannt für den Signal-Iduna-Park, das Dortmunder U und eine lebhafte Kulturszene.',
      beispiel: 'Echter Dortmunder: schwarz-gelb im Blut.',
      beispiel_hd: 'Echter Dortmunder: schwarz-gelb im Blut.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-018',
      ausdruck: 'BVB gegen Schalke',
      hochdeutsch: 'Revierderby: Borussia Dortmund gegen FC Schalke 04',
      bedeutung: 'Das Revierderby zwischen Borussia Dortmund (BVB) und dem FC Schalke 04 ist eines der leidenschaftlichsten Derbys in Europa. Dortmunder tragen Schwarz-Gelb, Schalker Königsblau — beide Seiten würden alles für einen Derbysieg geben. Das Derby teilt das Ruhrgebiet in zwei Lager und bestimmt den Alltag in der ganzen Region.',
      beispiel: 'Samstag ist Derby — Ruhrpott steht still.',
      beispiel_hd: 'Samstag ist Derby — das Ruhrgebiet steht still.',
      kategorie: 'sport'
    },
    {
      id: 'ru-019',
      ausdruck: 'auf Schalke',
      hochdeutsch: 'im Schalker Stadion / in Gelsenkirchen',
      bedeutung: '„Auf Schalke" bedeutet im Stadion des FC Schalke 04 in Gelsenkirchen. Die Veltins-Arena ist eines der modernsten Stadien Deutschlands mit einem verschließbaren Dach. „Auf Schalke" fahren ist für Schalker Fans ein Ritual und gleichbedeutend mit Heimspiel, Emotionen und königsblauer Farbe überall.',
      beispiel: 'Heute Abend fahr ich auf Schalke zum Spiel.',
      beispiel_hd: 'Heute Abend fahre ich ins Schalker Stadion zum Spiel.',
      kategorie: 'sport'
    },
    {
      id: 'ru-020',
      ausdruck: 'Reviersport',
      hochdeutsch: 'Fußball im Ruhrgebiet',
      bedeutung: 'Der Begriff „Reviersport" beschreibt den Fußball im Ruhrgebiet als Gesamtphänomen — von der Kreisliga bis zur Bundesliga. Das Revier hat eine unvergleichliche Fußballkultur: mehr Profivereine auf engem Raum als irgendwo sonst in Deutschland. Reviersport ist auch der Name eines bekannten regionalen Sportmagazins.',
      beispiel: 'Im Ruhrgebiet ist Fußball mehr als Sport — es ist Kultur.',
      beispiel_hd: 'Im Ruhrgebiet ist Fußball mehr als Sport — es ist Kultur.',
      kategorie: 'sport'
    },
    {
      id: 'ru-021',
      ausdruck: 'Rote Erde',
      hochdeutsch: 'Historischer Sportplatz des BVB Dortmund',
      bedeutung: 'Die „Rote Erde" war der historische Sportplatz des BVB Borussia Dortmund, bevor das Westfalenstadion gebaut wurde. Der Name leitet sich von der roten Aschebahn ab. Heute ist „Rote Erde" noch der Name eines kleinen Nebenplatzes am Signal-Iduna-Park und steht symbolisch für die Wurzeln des Dortmunder Fußballs.',
      kategorie: 'sport'
    },
    {
      id: 'ru-022',
      ausdruck: 'Hau ab!',
      hochdeutsch: 'Hau ab! / Mach, dass du wegkommst!',
      bedeutung: '„Hau ab!" ist eine direkte Aufforderung zu gehen, von mild (scherzhaft) bis scharf (ernst gemeint). Im Ruhrpott ist Direktheit eine Tugend, und diese Formel ist weniger beleidigend als anderswo — der Ton macht die Musik. Wer im Ruhrpott aufgewachsen ist, weiß, ob es ernst oder humorvoll gemeint ist.',
      beispiel: 'Hau ab und hol uns mal zwei Bier!',
      beispiel_hd: 'Mach dich auf den Weg und hol uns zwei Bier!',
      kategorie: 'schimpf'
    },
    {
      id: 'ru-023',
      ausdruck: 'Jetzt reicht es!',
      hochdeutsch: 'Jetzt ist Schluss! / Jetzt ist es genug!',
      bedeutung: '„Jetzt reicht es!" ist die Explosion der Ruhrpott-Geduld: direkt, klar und ohne Umschweife. Der Ruhrpottler duldet viel und sagt wenig — aber wenn er es sagt, meint er es ernst. Es ist kein leeres Drohen, sondern die klare Ansage, dass eine Grenze überschritten wurde.',
      beispiel: 'Jetzt reicht es! Das lasse ich mir nicht mehr gefallen.',
      beispiel_hd: 'Jetzt ist Schluss! Das lasse ich mir nicht mehr gefallen.',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-024',
      ausdruck: 'knorke',
      hochdeutsch: 'toll / klasse / prima (veraltet)',
      bedeutung: '„Knorke" ist ein altmodischer Berliner und westdeutscher Ausdruck für etwas Tolles oder Hervorragendes. Im Ruhrpott wurde er besonders in den 1950er und 1960er Jahren benutzt. Heute ist er nostalgisch und leicht ironisch gemeint — ältere Generationen benutzen ihn noch, jüngere eher zum Schmunzeln.',
      beispiel: 'Das warn knorkes Spiel heute — absolut klasse!',
      beispiel_hd: 'Das war ein tolles Spiel heute — absolut klasse!',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-025',
      ausdruck: 'dufte',
      hochdeutsch: 'prima / toll / wunderbar',
      bedeutung: '„Dufte" bedeutet im Ruhrpott-Slang so viel wie „toll" oder „super". Das Wort kommt aus dem Berliner Dialekt und hat sich im Ruhrgebiet etabliert. Es ist etwas veraltet, aber noch bekannt und wird manchmal nostalgisch oder ironisch eingesetzt — ähnlich wie „knorke".',
      beispiel: 'Das Konzert gestern war echt dufte!',
      beispiel_hd: 'Das Konzert gestern war wirklich toll!',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-026',
      ausdruck: 'inne',
      hochdeutsch: 'in der / in die',
      bedeutung: '„Inne" ist die typisch ruhrpötterische Verschmelzung von „in der" oder „in die". Man sagt „inne Bude" (in die Bude), „inne Stadt" (in die Stadt) oder „inne Schule" (in der Schule). Diese Kontraktion ist eines der auffälligsten grammatischen Merkmale des Ruhrdeutsch.',
      beispiel: 'Ich geh inne Stadt einkaufen.',
      beispiel_hd: 'Ich gehe in die Stadt einkaufen.',
      kategorie: 'alltag'
    },
    {
      id: 'ru-027',
      ausdruck: 'Bude',
      hochdeutsch: 'Zimmer / Wohnung / Hütte',
      bedeutung: 'Die „Bude" ist im Ruhrpott das Zimmer, die Wohnung oder einfach der eigene Bereich. „Meine Bude" bedeutet mein Zuhause, mein Zimmer oder mein Reich. Das Wort kommt aus dem Mittelniederdeutschen und ist im gesamten norddeutschen Sprachraum verbreitet, aber im Ruhrpott besonders lebendig.',
      beispiel: 'Komm heute Abend zu mir inne Bude, wir schauen Fußball.',
      beispiel_hd: 'Komm heute Abend zu mir, wir schauen Fußball.',
      kategorie: 'orte'
    },
    {
      id: 'ru-028',
      ausdruck: 'aufm Pott',
      hochdeutsch: 'im Ruhrgebiet / hier bei uns',
      bedeutung: '„Aufm Pott" bedeutet „hier im Ruhrgebiet" und ist ein Ausdruck der regionalen Zugehörigkeit. Es ist liebevoll-selbstironisch: Man lebt auf dem Pott, man ist vom Pott, und man ist verdammt stolz darauf. Der Ausdruck zeigt die ungebrochene lokale Identität trotz aller wirtschaftlichen Veränderungen nach dem Bergbauende.',
      beispiel: 'Aufm Pott kennt jeder jeden — das ist das Schöne hier.',
      beispiel_hd: 'Im Ruhrgebiet kennt jeder jeden — das ist das Schöne hier.',
      kategorie: 'orte'
    },
    {
      id: 'ru-029',
      ausdruck: 'Pottmensch',
      hochdeutsch: 'echter Ruhrpottler / Ruhrgebiet-Bewohner',
      bedeutung: 'Ein „Pottmensch" ist jemand, der nicht nur im Ruhrgebiet lebt, sondern wirklich von dort kommt und die Ruhrpott-Mentalität verinnerlicht hat. Direkt, herzlich, fußballverrückt und nicht zimperlich — das sind die Attribute eines echten Pottmenschen. Zugezogene können nach Jahren auch Pottmenschen werden, wenn sie die Werte annehmen.',
      beispiel: 'Mein Opa war ein echter Pottmensch: Bergmann, BVB-Fan und immer für die Nachbarn da.',
      beispiel_hd: 'Mein Opa war ein echter Ruhrpottler: Bergmann, BVB-Fan und immer für die Nachbarn da.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-030',
      ausdruck: 'am Start sein',
      hochdeutsch: 'bereit sein / da sein / parat sein',
      bedeutung: '„Am Start sein" bedeutet, bereit und verfügbar zu sein — ob für ein Treffen, eine Aufgabe oder ein Abenteuer. Der Ausdruck kommt aus dem Sportbereich, wo der Athlet am Start wartet. Im Ruhrpott-Slang ist es ein allgemeines Wort für Verfügbarkeit und Einsatzbereitschaft.',
      beispiel: 'Bist du am Start für heute Abend? Wir gehen weg.',
      beispiel_hd: 'Bist du dabei für heute Abend? Wir gehen aus.',
      kategorie: 'redensart'
    },
    {
      id: 'ru-031',
      ausdruck: 'Halt die Fresse',
      hochdeutsch: 'Halt den Mund (derb)',
      bedeutung: '„Halt die Fresse" ist eine grobe Aufforderung zu schweigen. Im Ruhrpott ist Direktheit Ehrlichkeit, und manchmal wird auch bei Beleidigungen nicht um den heißen Brei herumgeredet. Unter Freunden kann es weniger scharf klingen als zwischen Fremden. Es bleibt ein derber Ausdruck und sollte mit Bedacht eingesetzt werden.',
      beispiel: 'Halt die Fresse, ich versuch hier zu schlafen!',
      beispiel_hd: 'Sei still, ich versuche hier zu schlafen!',
      kategorie: 'schimpf'
    },
    {
      id: 'ru-032',
      ausdruck: 'wat willste machen',
      hochdeutsch: 'was will man machen / da kann man nichts tun',
      bedeutung: '„Wat willste machen" ist ein fatalistischer Seufzer, der Resignation oder Gleichmut ausdrückt. Wenn das Wetter schlecht ist, der Bus wieder mal zu spät kommt oder das Team verliert: Wat willste machen. Es ist kein Aufruf zur Passivität, sondern ruhrpötterische Gelassenheit gegenüber dem Unkontrollierbaren.',
      beispiel: 'BVB verliert schon wieder. — Ja, wat willste machen.',
      beispiel_hd: 'BVB verliert schon wieder. — Ja, was kann man machen.',
      kategorie: 'redensart'
    },
    {
      id: 'ru-033',
      ausdruck: 'inner Pott',
      hochdeutsch: 'hier im Ruhrgebiet',
      bedeutung: '„Inner Pott" ist die verkürzte Form von „in dem Pott" und meint dasselbe wie aufm Pott — nämlich das Ruhrgebiet. Diese Kontraktionen sind charakteristisch für das Ruhrdeutsch, das Präpositionen und Artikel gerne verschmilzt. Inner Pott ist Zuhause, ist Heimat, ist Identität.',
      beispiel: 'Inner Pott weiß man, was Zusammenhalt bedeutet.',
      beispiel_hd: 'Im Ruhrgebiet weiß man, was Zusammenhalt bedeutet.',
      kategorie: 'orte'
    },
    {
      id: 'ru-034',
      ausdruck: 'Schrottplatz',
      hochdeutsch: 'Schrottplatz / Recyclinghof / Autoverwertung',
      bedeutung: 'Der Schrottplatz ist im Ruhrgebiet nicht nur ein Ort zum Entsorgen, sondern ein kulturelles Symbol für den industriellen Wandel. Ganze Stahlwerke, Zechen und Maschinen landeten nach der Zechenschließung auf Schrottplätzen oder wurden zu Industriedenkmälern umgebaut. Im Ruhrpott-Alltag ist der Schrottplatz der Ort, wo man günstig Autoteile besorgt.',
      beispiel: 'Den Auspuff hol ich billig vom Schrottplatz.',
      beispiel_hd: 'Den Auspuff besorge ich günstig vom Schrottplatz.',
      kategorie: 'orte'
    },
    {
      id: 'ru-035',
      ausdruck: 'Mülheim',
      hochdeutsch: 'Mülheim an der Ruhr',
      bedeutung: 'Mülheim an der Ruhr ist eine Stadt im südlichen Ruhrgebiet, direkt an der Ruhr gelegen. Sie ist bekannt für das Witthausbusch-Erholungsgebiet, das Theater an der Ruhr und eine etwas bürgerlichere Atmosphäre. Mülheimer gelten im Ruhrpott-Vergleich als etwas gesetzter — was oft zu freundlichem Spott führt.',
      beispiel: 'In Mülheim ist die Ruhr noch richtig schön grün.',
      beispiel_hd: 'In Mülheim ist die Ruhr noch richtig schön grün.',
      kategorie: 'orte'
    },
    {
      id: 'ru-036',
      ausdruck: 'Hochofen',
      hochdeutsch: 'Hochofen / Schmelzofen für Stahl',
      bedeutung: 'Der Hochofen ist das Symbol der Stahlindustrie und steht für die zweite Säule des Ruhrgebiets neben dem Bergbau. In Duisburg, Dortmund und Bochum prägten Hochöfen über Jahrzehnte das Stadtbild. Viele dieser Industriedenkmäler wurden erhalten, wie die Hochöfen im Landschaftspark Duisburg-Nord.',
      beispiel: 'Der Hochofen in Duisburg leuchtet nachts orange — beeindruckend.',
      beispiel_hd: 'Der Hochofen in Duisburg leuchtet nachts orange — beeindruckend.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-037',
      ausdruck: 'Stahlwerk',
      hochdeutsch: 'Stahlwerk / Stahlhütte',
      bedeutung: 'Das Stahlwerk war neben der Zeche der wichtigste Arbeitgeber im Ruhrgebiet. Krupp in Essen und die Hoesch-Hüttenwerke in Dortmund beschäftigten Zehntausende von Arbeitern. Die Schließung der Stahlwerke in den 1980er Jahren bedeutete für viele Familien eine existenzielle Krise und prägte die soziale Geschichte des Ruhrpotts.',
      beispiel: 'Mein Vater hat 30 Jahre im Stahlwerk gearbeitet.',
      beispiel_hd: 'Mein Vater hat 30 Jahre im Stahlwerk gearbeitet.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-038',
      ausdruck: 'Glück auf, der Steiger kommt',
      hochdeutsch: 'Bergmannslied / Bergmanns-Hymne',
      bedeutung: '„Glück auf, der Steiger kommt" ist das bekannteste Bergmannslied Deutschlands und die inoffizielle Hymne des Ruhrgebiets. Es wurde unter Tage gesungen und bei Feiern gespielt, um den Zusammenhalt zu stärken. Der Steiger war der Vorarbeiter im Bergwerk, der Sicherheit und Ordnung kontrollierte.',
      beispiel: 'Glück auf, der Steiger kommt — das singt hier noch jedes Kind.',
      beispiel_hd: 'Das Bergmannslied kennt hier noch jedes Kind.',
      kategorie: 'musik'
    },
    {
      id: 'ru-039',
      ausdruck: 'Kohlenstaub',
      hochdeutsch: 'Kohlenstaub / Feinstaub aus dem Bergbau',
      bedeutung: 'Der Kohlenstaub ist das dunkle, buchstäbliche Erbe des Ruhrbergbaus: Er setzte sich auf Fenster, Wäsche und Lungen ab. Viele Bergleute erkrankten an Silikose, der gefürchteten Staublunge. Heute ist der Kohlenstaub verschwunden, aber er steht symbolisch für die harte Arbeit und die gesundheitlichen Opfer der Bergleute.',
      kategorie: 'natur'
    },
    {
      id: 'ru-040',
      ausdruck: 'Grüne Ruhr',
      hochdeutsch: 'Die Ruhr als naturnaher Fluss',
      bedeutung: 'Die Ruhr ist der namengebende Fluss des Ruhrgebiets. Heute ist sie wieder sauber und umgeben von Grünflächen, Radwegen und Badeseen. Die Renaturierung der Ruhr zeigt, dass der Pott längst mehr ist als Kohle und Stahl — ein grüner Freizeitfluss mitten in der Industrie.',
      beispiel: 'Am Wochenende fahren wir die Ruhr entlang mit dem Rad.',
      beispiel_hd: 'Am Wochenende fahren wir entlang der Ruhr mit dem Fahrrad.',
      kategorie: 'natur'
    },
    {
      id: 'ru-041',
      ausdruck: 'Halden',
      hochdeutsch: 'Bergehalden / Abraumhalden aus dem Bergbau',
      bedeutung: 'Die Halden sind die künstlichen Hügel aus dem Abraum des Bergbaus — das taubgesteinige Material, das beim Kohleabbau anfiel. Im flachen Ruhrgebiet sind die Halden manchmal die einzigen Erhebungen und wurden zu Aussichtspunkten und Kunstprojekten umgestaltet. Die Halde Hoheward und die Halde Haniel sind bekannte Beispiele.',
      beispiel: 'Vun der Halde aus siehste den ganzen Pott.',
      beispiel_hd: 'Von der Halde aus sieht man das ganze Ruhrgebiet.',
      kategorie: 'orte'
    },
    {
      id: 'ru-042',
      ausdruck: 'Tetra Pak',
      hochdeutsch: 'Schachtelwein / Wein in der Pappschachtel',
      bedeutung: 'Im Ruhrpott-Jargon ist „Tetra Pak" scherzhaft der Name für Wein aus der Pappschachtel. Wer im Ruhrgebiet keine großen Ansprüche an den Wein stellt oder feiern geht, greift gerne zu Tetra-Pak-Wein. Der Begriff ist humorvoll selbstironisch und steht für die pragmatische Einstellung zum Genuss.',
      beispiel: 'Für die Gartenparty holen wir Tetra Pak — das reicht.',
      beispiel_hd: 'Für die Gartenparty holen wir Schachtelwein — das reicht.',
      kategorie: 'essen'
    },
    {
      id: 'ru-043',
      ausdruck: 'Mettbrötchen',
      hochdeutsch: 'Brötchen mit rohem Hackfleisch',
      bedeutung: 'Das Mettbrötchen ist ein westfälisches Kultessen: ein Brötchen belegt mit rohem, gewürztem Schweinehackfleisch (Mett). Im Ruhrgebiet wird es bei fast jeder Vereins- oder Familienfeier gereicht. Die Gewürzmischung aus Zwiebeln, Salz, Pfeffer und Kümmel macht das Mett zu einer regionalen Besonderheit.',
      beispiel: 'Ohne Mettbrötchen ist kein Vereinsfest komplett.',
      beispiel_hd: 'Ohne Mettbrötchen ist kein Vereinsfest vollständig.',
      kategorie: 'essen'
    },
    {
      id: 'ru-044',
      ausdruck: 'Radler',
      hochdeutsch: 'Radler / Bier-Limonade-Mix',
      bedeutung: 'Das Radler ist ein Mix aus Bier und Zitronenlimonade — im Ruhrgebiet besonders an heißen Sommertagen und nach langen Schichten beliebt. Im nördlichen Deutschland heißt es manchmal auch „Alsterwasser". Ruhrpott-Kumpel trinken es gerne am Biergarten oder nach der Arbeit als erfrischende Alternative zum reinen Bier.',
      beispiel: 'Bei dem Wetter ist ein kühles Radler genau das Richtige.',
      beispiel_hd: 'Bei dem Wetter ist ein kühles Radler genau das Richtige.',
      kategorie: 'essen'
    },
    {
      id: 'ru-045',
      ausdruck: 'Hammer',
      hochdeutsch: 'Toll / Klasse / Wahnsinn (Ausruf der Begeisterung)',
      bedeutung: '„Hammer!" ist im Ruhrpott ein Ausruf der Begeisterung — es bedeutet, dass etwas außergewöhnlich gut oder eindrucksvoll ist. Der Bezug zum Schmiedehammer aus der Stahl- und Bergbautradition ist nicht zufällig: Was hammerhart ist, das ist stark. Im Alltag kann ein gutes Tor, ein leckeres Essen oder ein toller Abend ein echter Hammer sein.',
      beispiel: 'Hast du das Tor gesehen? Hammer, oder?!',
      beispiel_hd: 'Hast du das Tor gesehen? Wahnsinn, oder?!',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-046',
      ausdruck: 'Trinkhalle',
      hochdeutsch: 'Kiosk / Büdchen / Spätkauf',
      bedeutung: 'Die Trinkhalle — im Ruhrpott auch „Büdchen" oder schlicht „Kiosk" — ist weit mehr als ein Lebensmittelladen: Sie ist das soziale Herzstück des Stadtviertels. Hier kauft man Zigaretten, Zeitungen und Kaltgetränke, erfährt die Neuigkeiten aus dem Viertel und redet über den BVB. Die Trinkhalle ist eine Institution, die den Zusammenhalt im Ruhrgebiet lebendig hält — und oft bis tief in die Nacht geöffnet ist.',
      beispiel: 'Treff mich an der Trinkhalle — ich hol uns zwei Bier.',
      beispiel_hd: 'Triff mich am Kiosk — ich hole uns zwei Bier.',
      kategorie: 'orte'
    },
    {
      id: 'ru-047',
      ausdruck: 'aufm Pott',
      hochdeutsch: 'Im Ruhrgebiet / Hier bei uns',
      bedeutung: '„Aufm Pott" heißt: hier bei uns im Ruhrgebiet. „Der Pott" ist die liebevolle Selbstbezeichnung für die Region — nicht abwertend, sondern mit Stolz gemeint. Wer „aufm Pott" groß geworden ist, gehört zur Gemeinschaft der Ruhrpottler, die ihre Heimat trotz aller Wandlungen treu verbunden bleiben. „Aufm Pott läuft des anner als woanders" gilt als stolze Aussage über die eigene Einzigartigkeit.',
      beispiel: 'Aufm Pott kennt jeder jeden — des macht die Heimat aus.',
      beispiel_hd: 'Im Ruhrgebiet kennt jeder jeden — das macht die Heimat aus.',
      kategorie: 'orte'
    },
    {
      id: 'ru-048',
      ausdruck: 'Schicht im Schacht',
      hochdeutsch: 'Feierabend / Schluss / Ende der Arbeit',
      bedeutung: '„Schicht im Schacht" war der Ruf des Steigers, wenn die Arbeitsschicht unter Tage beendet war: Die Bergleute konnten ans Tageslicht. Heute verwendet man die Redewendung allgemein für das Ende einer Sache — Feierabend, Schluss, alles erledigt. Sie steht für den Ruhrpott-Humor: kurz, direkt, mit einem Augenzwinkern. Wer „Schicht im Schacht" sagt, meint: jetzt ist Ruhe, jetzt haben wir es geschafft.',
      beispiel: 'Schicht im Schacht, Leute — der Tag ist rum und wir sind fertig!',
      beispiel_hd: 'Feierabend, Leute — der Tag ist rum und wir sind fertig!',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-049',
      ausdruck: 'Currywurst',
      hochdeutsch: 'Currywurst (Ruhrpott-Kultessen)',
      bedeutung: 'Die Currywurst ist nicht nur in Berlin bekannt — im Ruhrgebiet ist sie genauso Kult. Gebratene oder gedämpfte Bratwurst, abgeschnitten oder am Stück, mit Ketchup und Currypulver. An Imbissen neben Zechen und Stahlwerken war die Currywurst das Arbeitermittagessen schlechthin. In Bochum gibt es sogar ein Deutsches Currywurst-Museum-Ableger, und Dortmund führt die eigene Currywurst-Tradition mit Stolz fort.',
      beispiel: 'Eine Currywurst mit Pommes nach der Schicht — das ist Ruhrpott.',
      beispiel_hd: 'Eine Currywurst mit Pommes nach der Schicht — das ist Ruhrpott.',
      kategorie: 'essen'
    },
    {
      id: 'ru-050',
      ausdruck: 'Zechensiedlung',
      hochdeutsch: 'Bergarbeitersiedlung / Colonie',
      bedeutung: 'Die Zechensiedlungen (auch „Colonien") sind ein prägendes Architekturmerkmal des Ruhrgebiets: Von Bergbaugesellschaften gebaute Arbeitersiedlungen mit einheitlichen Backsteinhäusern, Gärten und Gemeinschaftseinrichtungen. Sie entstanden ab den 1850er Jahren, um Bergleute in der Nähe der Zechen anzusiedeln. Heute stehen viele dieser Siedlungen unter Denkmalschutz und sind begehrte Wohngebiete — Gelsenkirchen-Bismarck, Dortmund-Hörde, Essen-Altenessen.',
      beispiel: 'Meine Oma hat noch in der Zechensiedlung gewohnt — rote Backsteinhäuser, Gärten, alles ordentlich.',
      beispiel_hd: 'Meine Oma hat noch in der Bergarbeitersiedlung gewohnt — rote Backsteinhäuser, Gärten, alles ordentlich.',
      kategorie: 'orte'
    }
  ]
};