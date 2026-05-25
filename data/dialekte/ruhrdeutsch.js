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
    },
    {
      id: 'ru-051',
      ausdruck: 'Schimanski',
      hochdeutsch: 'Horst Schimanski (Tatort-Kommissar)',
      bedeutung: 'Horst Schimanski (gespielt von Götz George) war der Duisburger Tatort-Kommissar, der von 1981 bis 1991 das Bild des Ruhrgebiets im Fernsehen prägte. Mit seiner Jeansjacke, dem Halbleger und seiner unverblümten Art repräsentierte er den Ruhrpott-Mann par excellence. Sein berühmtes „Scheiße!" und die rauen Methoden machten ihn zur Kultfigur. Auch nach seinem Tod 2016 bleibt Schimanski Symbol des Ruhrgebiets.',
      beispiel: 'Schimi war wie\'n Vater fürn Pott — n echter Kerl.',
      beispiel_hd: 'Schimanski war wie ein Vater fürs Ruhrgebiet — ein echter Kerl.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-052',
      ausdruck: 'Tatort',
      hochdeutsch: 'Tatort (Krimireihe)',
      bedeutung: 'Der Tatort ist Deutschlands populärste Krimireihe — seit 1970 jeden Sonntag um 20:15 Uhr im Ersten. Das Ruhrgebiet hat eigene Tatort-Teams: Dortmund mit Faber, Bönisch & Co., früher Schimanski in Duisburg. Die Ruhrpott-Tatorte zeigen authentisch das industrielle Erbe, die Arbeiterviertel und die direkte Mentalität der Region. Sonntag Abend versammelt der Tatort Millionen vor dem Fernseher.',
      beispiel: 'Sonntag Abend Tatort gucken — Ruhrpott-Pflicht.',
      beispiel_hd: 'Sonntag Abend Tatort schauen — Ruhrpott-Pflicht.',
      kategorie: 'musik'
    },
    {
      id: 'ru-053',
      ausdruck: 'Bochum total',
      hochdeutsch: 'Open-Air-Festival in Bochum',
      bedeutung: 'Bochum Total ist Europas größtes kostenloses Innenstadt-Festival, das jährlich Anfang Juli in der Bochumer Innenstadt stattfindet. Auf mehreren Bühnen treten 100+ Bands auf — Indie, Rock, Pop. 800.000 Besucher kommen aus dem ganzen Ruhrgebiet. Das Festival ist Symbol für Bochums Musikszene und das junge, kreative Ruhrgebiet. Nach Herbert Grönemeyers Hymne „Bochum" ist Bochum Total das zweitwichtigste Bochum-Erlebnis.',
      beispiel: 'Auf Bochum Total triffst die ganze Pott-Szene — verrückt!',
      beispiel_hd: 'Auf Bochum Total triffst du die ganze Ruhrpott-Szene — verrückt!',
      kategorie: 'musik'
    },
    {
      id: 'ru-054',
      ausdruck: 'Grönemeyer',
      hochdeutsch: 'Herbert Grönemeyer (Musiker, „Bochum")',
      bedeutung: 'Herbert Grönemeyer (geb. 1956 in Göttingen, aufgewachsen in Bochum) ist Deutschlands erfolgreichster deutschsprachiger Musiker — sein Album „Mensch" (2002) ist mit über 4 Millionen verkauften Exemplaren das meistverkaufte deutsche Album aller Zeiten. Sein Hit „Bochum" (1984) wurde inoffizielle Hymne der Ruhrgebietsstadt. Sein engagierter Stil und seine Verbundenheit zum Pott machen ihn zur Ruhrpott-Ikone.',
      beispiel: 'Bochum, ich komm aus dir — wer kennt nich diesen Song?',
      beispiel_hd: 'Bochum, ich komme aus dir — wer kennt nicht diesen Song?',
      kategorie: 'musik'
    },
    {
      id: 'ru-055',
      ausdruck: 'Westfalenstadion',
      hochdeutsch: 'Signal Iduna Park (BVB-Stadion)',
      bedeutung: 'Das Westfalenstadion — heute offiziell Signal Iduna Park — ist die Heimat von Borussia Dortmund. Mit 81.365 Plätzen ist es Deutschlands größtes Fußballstadion. Die berühmte Südtribüne („Gelbe Wand") mit 25.000 Stehplätzen ist die größte stehende Tribüne Europas und bietet eine der intensivsten Atmosphären im Weltfußball. Champions League-Spiele hier sind legendär — Reporter weltweit kommen für die Stimmung.',
      beispiel: 'Auf der Gelben Wand stehen — des isch a Erlebnis.',
      beispiel_hd: 'Auf der Gelben Wand stehen — das ist ein Erlebnis.',
      kategorie: 'sport'
    },
    {
      id: 'ru-056',
      ausdruck: 'Veltins-Arena',
      hochdeutsch: 'Stadion von Schalke 04',
      bedeutung: 'Die Veltins-Arena (früher Arena AufSchalke) ist das Stadion des FC Schalke 04 in Gelsenkirchen. Mit 62.271 Plätzen ist sie eines der modernsten Stadien Europas — mit verschiebbarem Dach und Innenfeld, das nach draußen geschoben werden kann. Die Arena wurde 2001 eröffnet und beherbergte mehrere WM-Spiele 2006. Auch wenn Schalke aktuell in der 2. Liga spielt — die Veltins-Arena bleibt Wallfahrtsort der königsblauen Fans.',
      beispiel: 'In der Veltins-Arena ist die Stimmung immer kochend, ob 1. oder 2. Liga.',
      beispiel_hd: 'In der Veltins-Arena ist die Stimmung immer kochend, ob 1. oder 2. Liga.',
      kategorie: 'sport'
    },
    {
      id: 'ru-057',
      ausdruck: 'Zollverein',
      hochdeutsch: 'Zeche Zollverein (UNESCO-Welterbe)',
      bedeutung: 'Die Zeche Zollverein in Essen ist das wohl bekannteste Symbol des Strukturwandels im Ruhrgebiet. Bis 1986 die größte Steinkohlenzeche der Welt, ist sie heute UNESCO-Welterbe (seit 2001) und ein Kulturzentrum mit Museen, Restaurants und Veranstaltungen. Die Bauhaus-Architektur des Förderturms ist Ikone. Die Doppelbockturm-Silhouette ist das Wahrzeichen des Ruhrgebiets schlechthin.',
      beispiel: 'Auf Zollverein gehts heut zur Ausstellung — Industriekultur pur.',
      beispiel_hd: 'Auf Zollverein gehen wir heute zur Ausstellung — Industriekultur pur.',
      kategorie: 'orte'
    },
    {
      id: 'ru-058',
      ausdruck: 'Landschaftspark Nord',
      hochdeutsch: 'Duisburg-Nord (alter Hochofen)',
      bedeutung: 'Der Landschaftspark Duisburg-Nord ist ein einzigartiges Symbol für den Strukturwandel des Ruhrgebiets — auf dem Gelände eines stillgelegten Hochofenwerks entstand ein riesiger öffentlicher Park mit erhaltenen Industriekolossen. Die Hochöfen kann man besteigen, in alten Gasometern wird getaucht (!), und nachts wird das ganze Areal spektakulär farbig beleuchtet. Ein Vorzeigeprojekt der IBA Emscher Park.',
      beispiel: 'Im Landschaftspark Nord kannst du in alten Gasometern tauchen!',
      beispiel_hd: 'Im Landschaftspark Nord kannst du in alten Gasometern tauchen!',
      kategorie: 'orte'
    },
    {
      id: 'ru-059',
      ausdruck: 'Tiger und Turtle',
      hochdeutsch: 'Landmarke Duisburg (begehbare Achterbahn)',
      bedeutung: '„Tiger und Turtle — Magic Mountain" ist eine begehbare Stahlskulptur in Duisburg, geöffnet 2011. Sie sieht aus wie eine Achterbahn — Besucher können sie aber zu Fuß begehen (außer den Looping, der nur gucken). Die Aussicht über das Ruhrgebiet ist atemberaubend. Ein modernes Symbol für die kreative Neuerfindung der Industrieregion. Bei Nacht beleuchtet ist sie spektakulär.',
      beispiel: 'Wenn de Sonn untergeht, leuchtet Tiger und Turtle gelb.',
      beispiel_hd: 'Wenn die Sonne untergeht, leuchtet Tiger und Turtle gelb.',
      kategorie: 'orte'
    },
    {
      id: 'ru-060',
      ausdruck: 'Kappes',
      hochdeutsch: 'Weißkohl / Sauerkraut',
      bedeutung: '„Kappes" ist im Ruhrpott und Rheinland das Wort für Weißkohl. Aus dem Lateinischen „caput" (Kopf — der Kohlkopf). Sauerkraut, eingelegter Weißkohl, ist ein zentrales Element der Ruhrpott- und rheinischen Küche. Reibekuchen mit Kappes, Eintopf mit Kappes, gekochter Kappes mit Speck — die Variationen sind endlos. „Schief gewickelt sein wie ein Kappes" — eine Redensart für Verwirrung.',
      beispiel: 'Heute Eintopf mit Kappes und Speck — typisch Ruhrpott.',
      beispiel_hd: 'Heute Eintopf mit Weißkohl und Speck — typisch Ruhrpott.',
      kategorie: 'essen'
    },
    {
      id: 'ru-061',
      ausdruck: 'Pommes Schranke',
      hochdeutsch: 'Pommes mit Ketchup und Mayo',
      bedeutung: '„Pommes Schranke" ist die Ruhrpott-Spezial-Bestellung an der Frittenbude: Pommes mit halb Mayo, halb Ketchup — die roten und gelben Streifen erinnern an die geschlossene Bahnschranke. Eine ikonische Imbissbestellung des Reviers. „Pommes rot-weiß" ist die Standard-Variante. Imbissbuden („Frittenschmieden") sind soziale Knotenpunkte im Ruhrpott, oft direkt vor Fußballstadien oder Trinkhallen.',
      beispiel: 'Einmal Pommes Schranke, bitte — und ne Currywurst dazu!',
      beispiel_hd: 'Einmal Pommes mit Ketchup und Mayo, bitte — und eine Currywurst dazu!',
      kategorie: 'essen'
    },
    {
      id: 'ru-062',
      ausdruck: 'Vatertag',
      hochdeutsch: 'Vatertag im Ruhrpott (Bollerwagen-Tour)',
      bedeutung: 'Der Vatertag (Christi Himmelfahrt) ist im Ruhrgebiet eine eigene Institution: Männergruppen ziehen mit einem Bollerwagen voller Bier durch die Natur, von einer Trinkstation zur nächsten. Das endet meistens spät und feuchtfröhlich. Eine deutschlandweit verbreitete Tradition, im Ruhrpott aber besonders ausgeprägt. „Vatertagstour" gehört zum Männerjahr wie das Bier zum Pott.',
      beispiel: 'Vatertag heute? Da is Bollerwagen-Tour mit den Kumpels!',
      beispiel_hd: 'Vatertag heute? Da ist Bollerwagen-Tour mit den Freunden!',
      kategorie: 'redensart'
    },
    {
      id: 'ru-063',
      ausdruck: 'Düsseldorf',
      hochdeutsch: 'Düsseldorf (NRW-Landeshauptstadt)',
      bedeutung: 'Düsseldorf — manchmal abfällig als „Schickimicki-Stadt" vom Ruhrpott unterschieden — ist die Landeshauptstadt Nordrhein-Westfalens, Sitz vieler Versicherungen und der Königsallee. Düsseldorf und das Ruhrgebiet haben eine traditionelle Rivalität: Düsseldorf gilt als elegant, der Pott als bodenständig. Das Düsseldorfer Altbier vs. Kölsch in Köln und Helles im Pott — alle haben ihre Eigenheiten.',
      beispiel: 'Düsseldorf is Pott-Konkurrenz — aber wir bleiben Ruhrpott-Original.',
      beispiel_hd: 'Düsseldorf ist Ruhrpott-Konkurrenz — aber wir bleiben Ruhrpott-Original.',
      kategorie: 'orte'
    },
    {
      id: 'ru-064',
      ausdruck: 'Datt is',
      hochdeutsch: 'Das ist (ruhrdeutsche Aussprache)',
      bedeutung: '„Datt" ist die Ruhrpott-Variante von „das" — mit dem charakteristischen Doppel-T statt dem Hochdeutschen „das". Begleitet von einem rollenden Tonfall und der typischen direkten Aussprache. „Datt is doch klar!", „Datt geht so nich!". Das Wort ist Markenzeichen des Ruhrdeutschen — wer „datt" sagt, identifiziert sich als Pottmensch. Ein kleines Wort mit großer Identität.',
      beispiel: 'Datt is doch klar wie Kloßbrühe!',
      beispiel_hd: 'Das ist doch glasklar!',
      kategorie: 'alltag'
    },
    {
      id: 'ru-065',
      ausdruck: 'dasse',
      hochdeutsch: 'Dass du (ruhrdeutsche Aussprache)',
      bedeutung: '„Dasse" ist im Ruhrpott die zusammengezogene Form von „dass du" — mit dem typisch verschluckten „du". „Mein\' dasse jetzt schon gehs?" — „Meinst du, dass du jetzt schon gehst?". Diese Verschmelzung kommt aus dem schnellen, direkten Sprechstil des Ruhrpotts. Die Sprache ist effizient — keine unnötigen Silben.',
      beispiel: 'Glaubse echt, dasse das schaffs?',
      beispiel_hd: 'Glaubst du echt, dass du das schaffst?',
      kategorie: 'alltag'
    },
    {
      id: 'ru-066',
      ausdruck: 'nach Aldi gehen',
      hochdeutsch: 'Zu Aldi gehen (typische Ruhrpott-Grammatik)',
      bedeutung: 'Im Ruhrpott sagt man „ich geh nach Aldi" statt „zu Aldi" — eine grammatikalische Eigenheit, die das Hochdeutsche umgeht. Auch: „nach Schalke gehen" (zu Schalke). Diese Präposition macht das Ruhrdeutsch zum unverwechselbaren Regiolekt. Sprachwissenschaftler studieren diese „Ruhrpott-Grammatik" als Erbe slawischer und niederdeutscher Einflüsse.',
      beispiel: 'Ich geh schnell nach Aldi — brauchst du was?',
      beispiel_hd: 'Ich gehe schnell zu Aldi — brauchst du etwas?',
      kategorie: 'alltag'
    },
    {
      id: 'ru-067',
      ausdruck: 'Tachchen!',
      hochdeutsch: 'Tag (informelle Begrüßung)',
      bedeutung: '„Tachchen" ist eine warme, freundliche Ruhrpott-Begrüßung — eine verniedlichte Form von „Tach" (Tag). Es klingt herzlich, ohne kindisch zu sein. Verwendet zwischen Bekannten und Nachbarn beim Vorbeikommen, beim Einkaufen oder am Kiosk. Die Verkleinerungsform „-chen" macht die Begrüßung weicher und persönlicher — typisch Ruhrpott-Direktheit mit menschlichem Touch.',
      beispiel: 'Tachchen, Frau Schmidt — wie geht\'s denn so?',
      beispiel_hd: 'Hallo, Frau Schmidt — wie geht es Ihnen?',
      kategorie: 'begruessung'
    },
    {
      id: 'ru-068',
      ausdruck: 'Frittenbude',
      hochdeutsch: 'Frittenbude / Imbiss',
      bedeutung: 'Die „Frittenbude" ist im Ruhrpott die klassische Imbiss-Institution: Pommes, Currywurst, Schaschlik, Schnitzel-Brötchen. Oft als rote Bude an Straßenecken, vor Stadien oder neben der Trinkhalle. Die „Pommesfrau" oder der „Pommesmann" kennt jeden Stammkunden mit Namen und Lieblingsbestellung. Treffpunkt der Arbeiter nach der Schicht, Treffpunkt der Fans nach dem Spiel.',
      beispiel: 'Nach\'m Spiel noch schnell zur Frittenbude — Pommes-Currywurst-Sache.',
      beispiel_hd: 'Nach dem Spiel noch schnell zur Frittenbude — Pommes-Currywurst-Sache.',
      kategorie: 'orte'
    },
    {
      id: 'ru-069',
      ausdruck: 'Ringen',
      hochdeutsch: 'Ringen (Pott-Traditionssport)',
      bedeutung: 'Das Ringen ist im Ruhrgebiet ein traditionsreicher Sport — fast jedes größere Dorf hat einen Ringerverein. Die Bochumer Ringergebiet ist deutschlandweit erfolgreich, die KSV Aalen-Aalen-Athletik-Köln-Mühlheim sind Ringerligen-Top-Vereine. Bergleute hatten früher die körperliche Substanz für diesen Kraftsport. Heute kämpft Ringen mit dem Nachwuchsmangel, aber die Vereinstradition lebt.',
      beispiel: 'Mein Opa war Ringer — fünfmal westdeutscher Meister.',
      beispiel_hd: 'Mein Opa war Ringer — fünfmal westdeutscher Meister.',
      kategorie: 'sport'
    },
    {
      id: 'ru-070',
      ausdruck: 'Bergmannsstrophe',
      hochdeutsch: 'Steigerlied / Bergmannshymne',
      bedeutung: 'Das „Glück Auf! Der Steiger kommt!" ist die berühmteste deutsche Bergmannshymne — eine Volkslied, das seit dem 17. Jahrhundert in allen deutschen Bergbauregionen gesungen wird. Im Ruhrgebiet ist es identitätsstiftend: bei Beerdigungen von Bergleuten, bei Festen, bei Vereinstreffen. Schalke 04 spielt es bei Heimspielen. „Steiger" war der Aufsichtsbeamte unter Tage — der Vorgesetzte der Bergleute.',
      beispiel: 'Beim Stadtfest singt jeder „Glück auf, der Steiger kommt" mit.',
      beispiel_hd: 'Beim Stadtfest singt jeder „Glück auf, der Steiger kommt" mit.',
      kategorie: 'musik'
    },
    {
      id: 'ru-071',
      ausdruck: 'Bottroper',
      hochdeutsch: 'Bottroper / aus Bottrop',
      bedeutung: 'Bottroper sind die Bewohner Bottrops — einer 117.000-Einwohner-Stadt im westlichen Ruhrgebiet. Heimat des Movie Parks Germany (ehemals Warner Bros. Movie World) und der Halde Beckstraße mit dem berühmten „Tetraeder" (Aussichtsplattform). Die Stadt zeigt den Strukturwandel: Zechen sind geschlossen, Logistik und Dienstleistung übernehmen. Bottrop ist authentischer Ruhrpott, weniger touristisch als Essen oder Dortmund.',
      beispiel: 'In Bottrop kannst du auf den Tetraeder steigen — geile Aussicht.',
      beispiel_hd: 'In Bottrop kannst du auf den Tetraeder steigen — tolle Aussicht.',
      kategorie: 'orte'
    },
    {
      id: 'ru-072',
      ausdruck: 'Karneval Pottstil',
      hochdeutsch: 'Karneval im Ruhrgebiet (anders als Köln)',
      bedeutung: 'Karneval im Ruhrgebiet hat einen eigenen Stil — herzlicher und proletarischer als in Köln, weniger touristisch. Städte wie Dorsten, Recklinghausen und Bottrop feiern ihren Karneval mit Sitzungen, Rosenmontagszügen und der berühmten Bergmannstradition. Die „Bergmännischen Garden" tragen historische Bergmannsuniformen. Pottkarneval ist Karneval ohne Schickimicki, mit echten Menschen und ehrlichem Bier.',
      beispiel: 'Karneval im Pott isch authentischer als Köln — keine Touristen.',
      beispiel_hd: 'Karneval im Pott ist authentischer als Köln — keine Touristen.',
      kategorie: 'redensart'
    },
    {
      id: 'ru-073',
      ausdruck: 'Schalker Gefühl',
      hochdeutsch: 'Identifikation mit Schalke 04',
      bedeutung: 'Das „Schalker Gefühl" ist ein Begriff der Schalke 04-Fans — eine fast religiöse Bindung an den Verein, unabhängig von sportlichem Erfolg. Schalke 04 ist mehr als ein Fußballverein: er ist ein Stück Gelsenkirchener Identität, Bergmannsverein, Arbeiterklub. Die Vereinsfarben (königsblau-weiß) und das Schalker Wappen mit dem Kreuz tragen Generationen weiter. „Auf Schalke" zu gehen — Heimspielbesuch — ist Lebensaufgabe.',
      beispiel: 'Egal ob 1. oder 2. Liga: Schalker Gefühl bleibt für immer.',
      beispiel_hd: 'Egal ob 1. oder 2. Liga: Schalker Gefühl bleibt für immer.',
      kategorie: 'sport'
    },
    {
      id: 'ru-074',
      ausdruck: 'BVB-Liebe',
      hochdeutsch: 'Identifikation mit Borussia Dortmund',
      bedeutung: 'BVB-Liebe ist die schwarz-gelbe Hingabe der Borussia Dortmund-Fans — gegründet 1909, achtmaliger Deutscher Meister. Die Borussia steht für Leidenschaft, Tradition und die Stadt Dortmund. Spieler wie Marco Reus, Mats Hummels, Erling Haaland sind/waren Idole. Die „Borussia Familie" mit ihren 200.000 Vereinsmitgliedern ist die zweitgrößte Mitgliederfamilie eines deutschen Sportvereins (nach Bayern).',
      beispiel: 'BVB-Liebe is lebenslang — egal was passiert.',
      beispiel_hd: 'BVB-Liebe ist lebenslang — egal was passiert.',
      kategorie: 'sport'
    },
    {
      id: 'ru-075',
      ausdruck: 'Bergmannssarg',
      hochdeutsch: 'Bergmannsbeerdigung mit Helm und Schlägel',
      bedeutung: 'Die Bergmannsbeerdigung im Ruhrgebiet folgt eigenen Traditionen: Auf dem Sarg liegen oft Bergmannshelm und „Schlägel und Eisen" (das Symbol des Bergbaus). Bergleute in historischen Uniformen begleiten den Sarg, das Steigerlied wird gesungen. Diese Tradition zeigt: Auch wenn die Zechen geschlossen sind, lebt die Bergmannskultur weiter — und ehrt ihre Toten mit einem Ritual, das tief in der Ruhrgebiets-Identität verankert ist.',
      beispiel: 'Bei der Bergmannssarg liegt Helm und Schlägel — Respekt vor dem Beruf.',
      beispiel_hd: 'Bei der Bergmannsbeerdigung liegen Helm und Schlägel — Respekt vor dem Beruf.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-076',
      ausdruck: 'Duisburg',
      hochdeutsch: 'Duisburg (Stadt am Rhein)',
      bedeutung: 'Duisburg ist mit 500.000 Einwohnern die fünftgrößte Stadt NRWs und beherbergt den größten Binnenhafen Europas — den „Duisport". Die Stahlindustrie (Thyssenkrupp) prägt die Stadt. Berühmt: das Landschaftspark Duisburg-Nord, das Lehmbruck-Museum und die Duisburger Innenhafen-Promenade. Heimat der MSV Duisburg „Zebras" und Schauplatz des tragischen Loveparade-Unglücks 2010.',
      beispiel: 'Duisburg is Pott pur — Stahl, Hafen und MSV.',
      beispiel_hd: 'Duisburg ist Ruhrgebiet pur — Stahl, Hafen und MSV.',
      kategorie: 'orte'
    },
    {
      id: 'ru-077',
      ausdruck: 'Gelsenkirchen',
      hochdeutsch: 'Gelsenkirchen (Schalke-Stadt)',
      bedeutung: 'Gelsenkirchen mit 260.000 Einwohnern ist Heimat des FC Schalke 04 und der Veltins-Arena. Einst „Stadt der tausend Feuer" wegen der Zechen, heute eine der ärmsten Großstädte Deutschlands — Hartz-IV-Quote über 20%. Aber: stolze Bergmannstradition, ZOOM Erlebniswelt, Schalkes Heimstadion. „Auf Schalke" ist Pilgerziel der königsblauen Fans.',
      beispiel: 'Gelsenkirchen lebt fürn Schalke — mehr braucht\'s nich.',
      beispiel_hd: 'Gelsenkirchen lebt für den Schalke — mehr braucht es nicht.',
      kategorie: 'orte'
    },
    {
      id: 'ru-078',
      ausdruck: 'Hagen',
      hochdeutsch: 'Hagen (Tor zum Sauerland)',
      bedeutung: 'Hagen mit 188.000 Einwohnern liegt am Südrand des Ruhrgebiets und gilt als „Tor zum Sauerland". Bekannt: das Westfälische Freilichtmuseum, der Künstlerort Hohenhagen mit Hagener Impuls (Karl Ernst Osthaus). Die Stadt hat den höchsten Punkt unter Tage im deutschen Bergbau gehabt — das Bergbau-Erbe ist auch hier prägend.',
      beispiel: 'Hagen is dat Tor zum Sauerland — und hat Industriegeschichte.',
      beispiel_hd: 'Hagen ist das Tor zum Sauerland — und hat Industriegeschichte.',
      kategorie: 'orte'
    },
    {
      id: 'ru-079',
      ausdruck: 'Wuppertal',
      hochdeutsch: 'Wuppertal (Stadt mit Schwebebahn)',
      bedeutung: 'Wuppertal mit 360.000 Einwohnern ist berühmt für die Schwebebahn — seit 1901 fährt sie 13 km über der Wupper. Einziges öffentliches Verkehrsmittel dieser Art weltweit. Heimat des Bayer-Konzerns, der Pina Bausch und des Tanztheaters. Friedrich Engels wurde hier 1820 geboren. Liegt am östlichen Rand des Ruhrgebiets.',
      beispiel: 'Mit\'er Schwebebahn übern Fluss — Wuppertal halt!',
      beispiel_hd: 'Mit der Schwebebahn über den Fluss — Wuppertal halt!',
      kategorie: 'orte'
    },
    {
      id: 'ru-080',
      ausdruck: 'Wattenscheid',
      hochdeutsch: 'Wattenscheid (Bochumer Stadtteil)',
      bedeutung: 'Wattenscheid war bis 1975 eigenständige Stadt, dann nach Bochum eingemeindet — bis heute pflegen Wattenscheider ihre eigene Identität. Der SG Wattenscheid 09 (kurz „Watter") war jahrzehntelang Profi-Verein, spielte in der Bundesliga. Heimat von Heike Drechsler (Olympiasiegerin im Weitsprung). Stadtteil mit Stolz und Eigensinn.',
      beispiel: 'Wattenscheider sind keine Bochumer — basta!',
      beispiel_hd: 'Wattenscheider sind keine Bochumer — basta!',
      kategorie: 'orte'
    },
    {
      id: 'ru-081',
      ausdruck: 'Recklinghausen',
      hochdeutsch: 'Recklinghausen (Festspielstadt)',
      bedeutung: 'Recklinghausen mit 115.000 Einwohnern ist Sitz der Ruhrfestspiele — seit 1947 eines der ältesten und wichtigsten Theaterfestivals Europas. Idee: Künstler und Arbeiter zusammenbringen. Das Festspielhaus wurde 1965 eröffnet. Auch Eisarena Recklinghausen ist bekannt. Wirtschaftlich vom Strukturwandel stark betroffen.',
      beispiel: 'Bei de Ruhrfestspiele in Recklinghausen siehste Welttheater.',
      beispiel_hd: 'Bei den Ruhrfestspielen in Recklinghausen siehst du Welttheater.',
      kategorie: 'orte'
    },
    {
      id: 'ru-082',
      ausdruck: 'Castrop-Rauxel',
      hochdeutsch: 'Castrop-Rauxel (Bezeichnung wie Doppelname)',
      bedeutung: 'Castrop-Rauxel mit 73.000 Einwohnern entstand 1926 durch Zusammenschluss zweier Gemeinden — daher der charakteristische Doppelname. Berühmt durch Loriots Stadtteil-Sketch „Die Höxter". Heimat des Olympiastützpunkts Westfalen für Boxen. Bekannt für das Stadtmotto „Stadt im Zentrum der Vest". Ausgeprägter Ruhrpott-Charme.',
      beispiel: 'Castrop-Rauxel — der Name allein is schon Ruhrpott-Kabarett.',
      beispiel_hd: 'Castrop-Rauxel — der Name allein ist schon Ruhrpott-Kabarett.',
      kategorie: 'orte'
    },
    {
      id: 'ru-083',
      ausdruck: 'Herne',
      hochdeutsch: 'Herne (Industriestadt im Pott)',
      bedeutung: 'Herne mit 156.000 Einwohnern ist eine der am dichtesten besiedelten Städte Deutschlands. Im 19. Jahrhundert wuchs die kleine Bauernsiedlung durch den Bergbau explosionsartig. Bekannt: die Cranger Kirmes — eines der größten Volksfeste Deutschlands (4 Millionen Besucher jährlich). Heimat des FC Schalke 04-Anhangs „Westkurve". Charmant industriell.',
      beispiel: 'Cranger Kirmes in Herne — größte Volksfest im Pott!',
      beispiel_hd: 'Cranger Kirmes in Herne — größtes Volksfest im Ruhrgebiet!',
      kategorie: 'orte'
    },
    {
      id: 'ru-084',
      ausdruck: 'Manni Breuckmann',
      hochdeutsch: 'Manni Breuckmann (WDR-Sportreporter)',
      bedeutung: 'Manni Breuckmann (geb. 1951 in Witten) ist DIE Stimme des Ruhrpotts in Sachen Fußball — über 30 Jahre WDR-Reporter, Konferenzsprecher der ARD-Bundesliga-Sendung. Sein direkter, witziger, authentischer Stil mit Ruhrpott-Akzent machte ihn zur Kultfigur. „Goldene Hand"-Träger. Generationen von Fußballfans wuchsen mit seiner Stimme auf.',
      beispiel: 'Manni Breuckmann — Pott-Stimme bei Bundesliga-Konferenz!',
      beispiel_hd: 'Manni Breuckmann — Ruhrpott-Stimme bei der Bundesliga-Konferenz!',
      kategorie: 'menschen'
    },
    {
      id: 'ru-085',
      ausdruck: 'Frank Goosen',
      hochdeutsch: 'Frank Goosen (Bochumer Schriftsteller)',
      bedeutung: 'Frank Goosen (geb. 1966 in Bochum) ist der wohl bekannteste literarische Chronist des Ruhrgebiets. Romane wie „Liegen lernen" (2000) und „Sommerfest" (2017) erzählen humorvoll und liebevoll vom Pott-Leben. Sein Bochum, sein Pott — authentisch dokumentiert. Auch Tresenleser bei Kabarett-Veranstaltungen. VfL-Bochum-Fan durch und durch.',
      beispiel: 'Frank Goosen — der Schriftsteller vom Pott für\'n Pott.',
      beispiel_hd: 'Frank Goosen — der Schriftsteller vom Ruhrgebiet für das Ruhrgebiet.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-086',
      ausdruck: 'Herbert Knebel',
      hochdeutsch: 'Herbert Knebel (Kabarettfigur)',
      bedeutung: 'Herbert Knebel ist eine fiktive Kabarettfigur, gespielt von Uwe Lyko (geb. 1954 in Essen). Der „Mann mit der schwarzen Lederjacke" hat seit den 1980ern Generationen mit seinen Geschichten aus dem Ruhrpott zum Lachen gebracht. „Affentheater" und „Knebel TV" sind Kult. Verkörpert den klassischen Pottmensch: derb, direkt, herzlich, mit unfreiwilligem Humor.',
      beispiel: 'Herbert Knebel — der typische Pott-Mensch auf der Bühne!',
      beispiel_hd: 'Herbert Knebel — der typische Ruhrpott-Mensch auf der Bühne!',
      kategorie: 'menschen'
    },
    {
      id: 'ru-087',
      ausdruck: 'Ralf Husmann',
      hochdeutsch: 'Ralf Husmann (Drehbuchautor „Stromberg")',
      bedeutung: 'Ralf Husmann (geb. 1964) ist ein bekannter deutscher Drehbuchautor und Showrunner aus dem Ruhrgebiet. Schöpfer der Erfolgsserie „Stromberg" (2004-2012), einer deutschen Adaption von „The Office". Auch „Mord mit Aussicht" und „Beste Schwestern" stammen aus seiner Feder. Verkörpert den intelligenten, beißenden Ruhrpott-Humor in der modernen Fernsehunterhaltung.',
      beispiel: 'Stromberg von Ralf Husmann — schwarzer Pott-Humor pur.',
      beispiel_hd: 'Stromberg von Ralf Husmann — schwarzer Ruhrpott-Humor pur.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-088',
      ausdruck: 'Strukturwandel',
      hochdeutsch: 'Strukturwandel (Zechenende, Neuanfang)',
      bedeutung: 'Der „Strukturwandel" ist DAS politische und gesellschaftliche Schlüsselwort für das Ruhrgebiet seit den 1960ern: der Wandel von Kohle und Stahl zu Dienstleistung, Bildung und Kultur. Mit der Schließung der letzten Zeche 2018 endete eine 200-jährige Ära. Universitäten (Bochum, Dortmund, Essen-Duisburg), IT, Logistik prägen die neue Zeit. Trauma und Chance zugleich.',
      beispiel: 'Der Strukturwandel hat ganze Generationen veränderd.',
      beispiel_hd: 'Der Strukturwandel hat ganze Generationen verändert.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-089',
      ausdruck: 'Emscher',
      hochdeutsch: 'Emscher (Fluss durchs Ruhrgebiet)',
      bedeutung: 'Die Emscher fließt 83 km mitten durchs Ruhrgebiet — bis vor wenigen Jahren Europas größte offene Abwasserkanal („Köttelbecke"). Seit 1991 läuft das Emscher-Umbau-Großprojekt: Renaturierung, unterirdische Kläranlagen, der Fluss wird wieder sauber. Symbol für ökologischen Strukturwandel. Bis 2021 wurde sie offiziell „abwasserfrei".',
      beispiel: 'D\'Emscher is sauber jetz — endlich wieder Fluss un keine Köttelbecke.',
      beispiel_hd: 'Die Emscher ist sauber jetzt — endlich wieder Fluss und keine Kloake.',
      kategorie: 'natur'
    },
    {
      id: 'ru-090',
      ausdruck: 'RVR',
      hochdeutsch: 'Regionalverband Ruhr',
      bedeutung: 'Der Regionalverband Ruhr (RVR) ist der Zusammenschluss von 53 Städten und Kreisen des Ruhrgebiets — gegründet 1920 als „Siedlungsverband Ruhrkohlenbezirk". Größter Kommunalverband Deutschlands mit 5,1 Millionen Einwohnern. Verantwortlich für Regionalplanung, Naherholung (Halden, Routen), Kultur. RVR-Schilder mit weißem Tigertor sind Wahrzeichen.',
      beispiel: 'Der RVR sorgt dafür, dass die Region zusammen denkt.',
      beispiel_hd: 'Der RVR sorgt dafür, dass die Region zusammen denkt.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-091',
      ausdruck: 'Pott-Liebe',
      hochdeutsch: 'Liebe zum Ruhrgebiet',
      bedeutung: '„Pott-Liebe" ist die fast schon religiöse Verbundenheit der Ruhrgebietsbewohner mit ihrer Heimat. Anders als andere Regionen, die einzelne Städte verehren, lieben Pottmenschen die ganze Region — von Duisburg bis Dortmund, von Essen bis Bottrop. Diese Pott-Liebe entstand in den Bergbau-Generationen, als Solidarität überlebenswichtig war. Heute Lebenshaltung.',
      beispiel: 'Pott-Liebe — die hörd nie auf, egal wohin man zieht.',
      beispiel_hd: 'Pott-Liebe — die hört nie auf, egal wohin man zieht.',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-092',
      ausdruck: 'Pottoriginal',
      hochdeutsch: 'Echter Ruhrpott-Charakter',
      bedeutung: 'Ein „Pottoriginal" ist ein authentischer Ruhrpott-Mensch mit ausgeprägter Persönlichkeit — meist im Alter mit Lebenserfahrung. Direkte Sprache, derber Humor, herzlicher Kern. Sie sitzen in der Trinkhalle, am Stammtisch oder vor der Frittenbude. Pottoriginale werden im ganzen Stadtteil gekannt. Mit dem Strukturwandel werden sie weniger — aber sie sind das kulturelle Gedächtnis des Reviers.',
      beispiel: 'Onkel Heinz is\'n echtes Pottoriginal — den kennen alle inner Bude.',
      beispiel_hd: 'Onkel Heinz ist ein echtes Ruhrpott-Original — den kennen alle in der Kneipe.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-093',
      ausdruck: 'Helga',
      hochdeutsch: 'Helga (typischer Pott-Frauenname)',
      bedeutung: '„Helga" ist ein klassischer Frauenname der Generation 1950er/60er-Jahre — im Ruhrpott besonders häufig vertreten. Heute eher selten neugeboren, aber Helga-Generationen prägen Kioske, Frittenbuden und Vereinsbüros. Steht stellvertretend für die starken Pott-Frauen, die während der Bergbau-Zeit den Alltag managten, während ihre Männer unter Tage waren. Symbol weiblicher Pott-Härte.',
      beispiel: 'Helga an der Trinkhalle kennt jeden Stammkunden mit Namen.',
      beispiel_hd: 'Helga am Kiosk kennt jeden Stammkunden mit Namen.',
      kategorie: 'familie'
    },
    {
      id: 'ru-094',
      ausdruck: 'Schalke-Hymne',
      hochdeutsch: '„Blau und Weiß, wie lieb ich dich"',
      bedeutung: 'Die Schalker Vereinshymne „Blau und Weiß, wie lieb ich dich" wird vor jedem Heimspiel in der Veltins-Arena gesungen — 62.000 Stimmen gemeinsam. Komposition aus dem Repertoire der Volksmusik, mit Schalke-Text. Gänsehaut-Moment für jeden königsblauen Fan. Verbunden mit dem 1934er-Meistertitel-Schalke und der Tradition als Bergmannsverein. Mehr als ein Lied — eine Religion.',
      beispiel: 'Wenn 62.000 die Schalke-Hymne singen, fließen Tränen.',
      beispiel_hd: 'Wenn 62.000 die Schalke-Hymne singen, fließen Tränen.',
      kategorie: 'musik'
    },
    {
      id: 'ru-095',
      ausdruck: 'Pillemann',
      hochdeutsch: 'Penis (Ruhrpott-Slang)',
      bedeutung: '„Pillemann" ist im Ruhrpott der scherzhaft-derbe Ausdruck für den Penis. Kein scharfes Schimpfwort, sondern eher humorvoll-anatomisch. Wird oft in Witzen und in der Männersprache verwendet. Zeigt die direkte, unverklemmte Art des Ruhrpotts beim Sprechen über alltägliche Dinge — auch unter der Gürtellinie. Im Karneval und Stammtischwitz beliebt.',
      beispiel: 'Mach kein Theater wegen so\'m Pillemann — is halt nur n Witz.',
      beispiel_hd: 'Mach kein Theater wegen sowas — ist halt nur ein Witz.',
      kategorie: 'koerper'
    },
    {
      id: 'ru-096',
      ausdruck: 'Pommesgabel',
      hochdeutsch: 'Holzgabel für Pommes',
      bedeutung: 'Die „Pommesgabel" ist die kleine Holzgabel, die zur Currywurst und Pommes an der Frittenbude gereicht wird — meist 2-zinkig, einmal verwendbar. Eine ikonische Komponente des Ruhrpott-Imbiss-Erlebnisses. Wer im Pott Pommes ohne Pommesgabel isst, gilt als Tourist. Symbol des praktisch-bodenständigen Genusses ohne Schickimicki. Mit Pommes Schranke und Currywurst ein Set.',
      beispiel: 'Ohne Pommesgabel keine richtigen Pommes — auch wenn\'s scheiße fürs Klima is.',
      beispiel_hd: 'Ohne Pommesgabel keine richtigen Pommes — auch wenn es schlecht für das Klima ist.',
      kategorie: 'essen'
    },
    {
      id: 'ru-097',
      ausdruck: 'Knipsen',
      hochdeutsch: 'Fotografieren (Ruhrpott-Slang)',
      bedeutung: '„Knipsen" ist im Ruhrpott das Fotografieren — von „Knipser" für eine billige Kompaktkamera. Heute scherzhaft für jeden Smartphone-Knipser. „Mach mal n\'Foto, knips!" Auch verwendet für unbedacht-schnelles Handeln: „Der hat\'s einfach durchgeknipst." Zeigt den humorvoll-leichten Umgang der Pottmenschen mit moderner Technik.',
      beispiel: 'Komm her, ich knips dich kurz vor\'m BVB-Schild!',
      beispiel_hd: 'Komm her, ich fotografiere dich kurz vor dem BVB-Schild!',
      kategorie: 'alltag'
    },
    {
      id: 'ru-098',
      ausdruck: 'Ne dat',
      hochdeutsch: 'Nein das (Ruhrpott-Verneinung)',
      bedeutung: '„Ne dat" ist die typisch ruhrpötterische Verneinung — kurz, knapp, direkt. „Ne, dat geht so nich" oder „Ne dat is doch Quatsch". Das Wort „ne" als Verneinung kommt aus dem Niederdeutschen, das „dat" ersetzt das hochdeutsche „das". Ein klassisches Beispiel für die Verschmelzung niederdeutscher Einflüsse mit dem Hochdeutschen — Markenzeichen des Ruhrpott-Dialekts.',
      beispiel: 'Wars du heut beim Bäcker? — Ne dat hab ich vergessen.',
      beispiel_hd: 'Warst du heute beim Bäcker? — Nein, das habe ich vergessen.',
      kategorie: 'alltag'
    },
    {
      id: 'ru-099',
      ausdruck: 'Mantaplatte',
      hochdeutsch: 'Currywurst mit Pommes und Getränk',
      bedeutung: 'Die „Mantaplatte" ist ein humorvoller Ruhrpott-Begriff aus den 80ern für die Komplett-Bestellung an der Frittenbude: Currywurst, Pommes und ein Bier. Benannt nach dem Opel Manta — dem Kultauto der Ruhrpott-Macho-Szene. Der Manta-Fahrer kam vom Stahlwerk und aß nach Schicht seine Mantaplatte. Heute scherzhaft für das klassische Imbiss-Menü.',
      beispiel: 'Eine Mantaplatte bitte — Currywurst, Pommes, Pils!',
      beispiel_hd: 'Eine Mantaplatte bitte — Currywurst, Pommes, Pils!',
      kategorie: 'essen'
    },
    {
      id: 'ru-100',
      ausdruck: 'Doppelkopf',
      hochdeutsch: 'Doppelkopf (Kartenspiel der Bergleute)',
      bedeutung: 'Doppelkopf — kurz „Doko" — ist DAS Kartenspiel des Ruhrgebiets. Vier Spieler, 48 Karten, komplexe Regeln. Bergleute spielten es nach der Schicht in der Trinkhalle oder zu Hause. Heute pflegen Doko-Stammtische die Tradition in jeder Pott-Stadt. Mehr als Karten — soziales Ritual, Generationen-Bindung, Alltagspoesie. Wer Doko spielt, gehört zum Pott.',
      beispiel: 'Donnerstag is Doko-Abend bei uns — Tradition seit 30 Jahren.',
      beispiel_hd: 'Donnerstag ist Doko-Abend bei uns — Tradition seit 30 Jahren.',
      kategorie: 'sport'
    }
  ]
};