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
    },
    {
      id: 'ru-101',
      ausdruck: 'Schalker Markt',
      hochdeutsch: 'Schalker Markt (Stadtteil-Zentrum Gelsenkirchen)',
      bedeutung: 'Der Schalker Markt ist das Herz des Stadtteils Schalke in Gelsenkirchen — historisches Zentrum mit Markttagen, Eckkneipen und der Schalker Meile. Hier wurde 1904 der FC Schalke 04 als Westfalia Schalke gegründet. Königsblaue Geschichte überall: Schalke-Souvenirs, alte Bergmannsfamilien, jeder kennt jeden. Ein authentisches Ruhrpott-Quartier mit Identität und Stolz.',
      beispiel: 'Am Schalker Markt findse jede Schalke-Devotionalie, die\'s gibt.',
      beispiel_hd: 'Am Schalker Markt findest du jedes Schalke-Souvenir, das es gibt.',
      kategorie: 'orte'
    },
    {
      id: 'ru-102',
      ausdruck: 'Borsigplatz',
      hochdeutsch: 'Borsigplatz (BVB-Gründungsort Dortmund)',
      bedeutung: 'Der Borsigplatz in Dortmund-Nord ist die Wiege von Borussia Dortmund — 1909 in der Wirtschaft „Zum Wildschütz" gegründet. Bis heute Pilgerstätte: Nach jedem Meistertitel fährt der BVB mit dem Cabrio über den Platz. Arbeiterviertel mit Migrationsgeschichte, geprägt von der ehemaligen Borsig-Lokomotivfabrik. Schwarz-gelbe Wandbilder zieren die Häuser. Heiliger Boden.',
      beispiel: 'Am Borsigplatz schlägt das schwarz-gelbe Herz seit 1909.',
      beispiel_hd: 'Am Borsigplatz schlägt das schwarz-gelbe Herz seit 1909.',
      kategorie: 'sport'
    },
    {
      id: 'ru-103',
      ausdruck: 'Westfalenpark',
      hochdeutsch: 'Westfalenpark Dortmund (Stadtpark)',
      bedeutung: 'Der Westfalenpark in Dortmund ist mit 70 Hektar einer der größten Innenstadtparks Europas — 1959 zur Bundesgartenschau angelegt. Wahrzeichen: der 209 Meter hohe Florianturm mit Drehrestaurant und Aussichtsplattform. Rosarium mit 3.000 Rosenarten, Seebühne, Sommerkonzerte, Lichterfest. Naherholung für Dortmunder — Spaziergänge, Picknick, Familienausflüge. Grüne Oase mitten im Pott.',
      beispiel: 'Sonntag gehts in Westfalenpark — Florianturm und Eis essen.',
      beispiel_hd: 'Sonntag geht es in den Westfalenpark — Florianturm und Eis essen.',
      kategorie: 'orte'
    },
    {
      id: 'ru-104',
      ausdruck: 'Phoenix-See',
      hochdeutsch: 'Phoenix-See Dortmund (Stadtsee auf Stahlwerksgelände)',
      bedeutung: 'Der Phoenix-See in Dortmund-Hörde ist ein 24 Hektar großer künstlicher See, der 2010 auf dem Gelände des ehemaligen Hoesch-Stahlwerks Phoenix-Ost geflutet wurde. Beispielhafter Strukturwandel: Wo Hochöfen rauchten, segeln heute Boote. Rundweg, Restaurants, Wohnviertel im noblen Stil. Manche Pottmenschen sehen den See als Verrat an der Industriegeschichte — andere als Hoffnungszeichen.',
      beispiel: 'Am Phoenix-See trinkt man Aperol wo früher Stahl gegossen wurde.',
      beispiel_hd: 'Am Phoenix-See trinkt man Aperol, wo früher Stahl gegossen wurde.',
      kategorie: 'orte'
    },
    {
      id: 'ru-105',
      ausdruck: 'Ruhrpott-Karneval',
      hochdeutsch: 'Karneval im Ruhrgebiet (anders als Köln)',
      bedeutung: 'Der Ruhrpott-Karneval ist eine eigene Spielart — bodenständiger und weniger pompös als der Kölner. Statt Mariechen und Funkengarden gibt es Vereinsfeste, Karnevalssitzungen in Mehrzweckhallen und derbe Büttenreden über Maloche und Politik. Die Bochumer und Recklinghäuser Karnevalsgesellschaften pflegen die Tradition. Im Pott säuft man Bier, nicht Kölsch — und lacht über sich selbst.',
      beispiel: 'Karneval im Pott — kein Kölsch, sondern Pils und derbe Sprüche.',
      beispiel_hd: 'Karneval im Ruhrgebiet — kein Kölsch, sondern Pils und derbe Sprüche.',
      kategorie: 'alltag'
    },
    {
      id: 'ru-106',
      ausdruck: 'Büdchenkönig',
      hochdeutsch: 'Trinkhallen-Inhaber als Stadtteil-Original',
      bedeutung: 'Der „Büdchenkönig" ist die Persönlichkeit hinter dem Tresen einer Trinkhalle — meist seit Jahrzehnten im Viertel verwurzelt, kennt jeden Stammkunden, jeden Tratsch, jeden Liebeskummer. Er verkauft nicht nur Bier und Lottoscheine, sondern hört zu, vermittelt und gibt Lebensweisheiten. Ein Stadtteil-Original, das oft persönlicher ist als jeder Therapeut. Die Trinkhalle als zweites Zuhause.',
      beispiel: 'Onkel Manni is Büdchenkönig aufm Wickingplatz seit 40 Jahren.',
      beispiel_hd: 'Onkel Manni ist Trinkhallen-Inhaber auf dem Wickingplatz seit 40 Jahren.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-107',
      ausdruck: 'Eckkneipe',
      hochdeutsch: 'Eckkneipe (klassische Pott-Kneipe)',
      bedeutung: 'Die Eckkneipe ist die klassische Ruhrpott-Wirtschaft an der Straßenecke — kleine, oft verrauchte Gaststätte mit Stammtisch, Theke, Dartautomat und immer dem gleichen Wirt. Hier trifft man sich nach der Schicht, hört Schlager und diskutiert über BVB und Schalke. Mit jeder Eckkneipen-Schließung stirbt ein Stück Ruhrpott-Kultur. Die wenigen verbliebenen sind Museum und Sozialraum zugleich.',
      beispiel: 'Inner Eckkneipe um die Ecke kennt mich jeder.',
      beispiel_hd: 'In der Eckkneipe um die Ecke kennt mich jeder.',
      kategorie: 'orte'
    },
    {
      id: 'ru-108',
      ausdruck: 'Hüttenarbeiter',
      hochdeutsch: 'Stahlarbeiter (Hochofen, Walzwerk)',
      bedeutung: 'Der Hüttenarbeiter war neben dem Bergmann der zweite große Beruf des Ruhrgebiets — er arbeitete am Hochofen, am Konverter oder im Walzwerk der Stahlhütten. Bei Hitze, Lärm und Lebensgefahr formte er den Stahl, der Deutschland aufbaute. Krupp, Thyssen, Hoesch — diese Namen sind mit den Hüttenarbeitern verwoben. Heute eine fast ausgestorbene Berufsgruppe, aber stolze Erinnerung in Familien.',
      beispiel: 'Mein Opa war Hüttenarbeiter bei Thyssen in Duisburg.',
      beispiel_hd: 'Mein Opa war Stahlarbeiter bei Thyssen in Duisburg.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-109',
      ausdruck: 'Vatter',
      hochdeutsch: 'Vater (Ruhrpott-Form)',
      bedeutung: 'Der „Vatter" ist im Ruhrpott die liebevoll-direkte Bezeichnung für den Vater — etwas derber und herzlicher als das hochdeutsche „Vater". Die Doppel-T-Aussprache ist typisch fürs Niederdeutsche, das im Pott noch nachklingt. Der Vatter ist die Autoritätsperson im Haus, oft Bergmann oder Stahlarbeiter, gibt seine Lebensweisheiten in knappen Sätzen weiter. Familienpatriarch in der traditionellen Pott-Familie.',
      beispiel: 'Mein Vatter hat immer gesagt: Maloche, dann wird das wat!',
      beispiel_hd: 'Mein Vater hat immer gesagt: Arbeite hart, dann wird das was!',
      kategorie: 'familie'
    },
    {
      id: 'ru-110',
      ausdruck: 'Mutter',
      hochdeutsch: 'Mutter (im Ruhrpott zentrale Figur)',
      bedeutung: 'Die „Mutter" ist im Ruhrpott die heimliche Chefin der Familie — während der Vatter unter Tage malochte, hielt sie zu Hause alles zusammen. Sie kochte, putzte, erzog die Kinder und verwaltete die schmale Lohntüte. Mutter-Figuren wie Tante Erna, Helga oder Inge prägen ganze Stadtteile. Die Pott-Mutter ist herzlich, streng und unverwüstlich — das wahre Rückgrat der Bergmanns-Familien.',
      beispiel: 'Mutter hat den Haushalt geschmissen, während Vatter inne Grube war.',
      beispiel_hd: 'Mutter hat den Haushalt geschmissen, während Vater in der Grube war.',
      kategorie: 'familie'
    },
    {
      id: 'ru-111',
      ausdruck: 'Oma',
      hochdeutsch: 'Großmutter (Ruhrpott-Familienzentrum)',
      bedeutung: 'Die „Oma" ist im Ruhrpott die Hüterin der Familientraditionen — sie kocht den Sonntagsbraten, erzählt von der Maloche der Großeltern und behütet die Enkel. Wenn der Vatter nachts Schicht hatte und die Mutter arbeitete, war Oma da. Häkelt Topflappen, schimpft auf den Müll und schenkt heimlich Süßes. Generationen-Bindung in Reinkultur. Eine Pott-Oma ist Goldwert.',
      beispiel: 'Bei Oma gibts immer Reibekuchen und ne Mark fürs Sparschwein.',
      beispiel_hd: 'Bei Oma gibt es immer Reibekuchen und eine Mark für das Sparschwein.',
      kategorie: 'familie'
    },
    {
      id: 'ru-112',
      ausdruck: 'Grönemeyer-Hymne',
      hochdeutsch: 'Bochum von Herbert Grönemeyer',
      bedeutung: 'Die Grönemeyer-Hymne „Bochum" (1984) ist mehr als ein Lied — sie ist die offizielle Erkennungsmelodie des ganzen Ruhrpotts. „Du bist keine Schönheit, vor Arbeit ganz grau" beschreibt das Ruhrgebiet ehrlich und liebevoll zugleich. Beim VfL Bochum wird sie vor jedem Spiel gespielt, 30.000 singen mit. Hat es sogar in den Bochumer Stadtrat geschafft — offizielles Bekenntnis zur Identität.',
      beispiel: 'Bei „Bochum, ich komm aus dir" weinen sogar gestandene Männer.',
      beispiel_hd: 'Bei „Bochum, ich komme aus dir" weinen sogar gestandene Männer.',
      kategorie: 'musik'
    },
    {
      id: 'ru-113',
      ausdruck: 'Westernhagen',
      hochdeutsch: 'Marius Müller-Westernhagen (Düsseldorf-Pott-Connection)',
      bedeutung: 'Marius Müller-Westernhagen (geb. 1948 in Düsseldorf) ist zwar gebürtiger Düsseldorfer, aber sein Sound aus „Sexy", „Freiheit" und „Mit Pfefferminz bin ich dein Prinz" prägt auch das Ruhrgebiet. Seine raue, gerade Art passt zur Pott-Mentalität. Konzerte in der Schalke-Arena oder im Westfalenstadion sind Massenereignisse. Brücke zwischen Rheinland und Pott durch direkte, ehrliche Rockmusik.',
      beispiel: 'Westernhagen-Konzert inne Schalke-Arena — 60.000 singen mit.',
      beispiel_hd: 'Westernhagen-Konzert in der Schalke-Arena — 60.000 singen mit.',
      kategorie: 'musik'
    },
    {
      id: 'ru-114',
      ausdruck: 'BAP-Sound',
      hochdeutsch: 'BAP-Connection ins Ruhrgebiet',
      bedeutung: 'Obwohl BAP aus Köln stammt, hat ihr Sound auch im Ruhrgebiet eine treue Fangemeinde — die Mischung aus Rock, sozialkritischen Texten und Mundart spricht auch Pottmenschen an. Wolfgang Niedeckens Stimme klingt nach Arbeitermilieu und harten Wahrheiten. „Verdamp lang her" wird auch inne Pott-Kneipe gesungen. Brücke zwischen Kölner und Ruhrpott-Kultur über die Mundart-Rock-Schiene.',
      beispiel: 'BAP-Konzert in der Westfalenhalle — Pott und Köln in Eintracht.',
      beispiel_hd: 'BAP-Konzert in der Westfalenhalle — Pott und Köln in Eintracht.',
      kategorie: 'musik'
    },
    {
      id: 'ru-115',
      ausdruck: 'dat',
      hochdeutsch: 'das (Ruhrpott-Form)',
      bedeutung: '„Dat" ist die typisch ruhrpötterische Form von „das" — ein eindeutiges Merkmal des Dialekts, das aus dem Niederdeutschen stammt. Ohne „dat" gibt es keinen echten Ruhrpott-Klang: „Dat is dat", „Dat geht net", „Wat is dat denn?". Wer im Pott groß wird, sagt es automatisch. Norddeutsche Eltern haben es vererbt, polnische und tschechische Migranten haben es übernommen. Identitätsmerkmal.',
      beispiel: 'Dat is doch klar — wat willste machen?',
      beispiel_hd: 'Das ist doch klar — was willst du machen?',
      kategorie: 'redensart'
    },
    {
      id: 'ru-116',
      ausdruck: 'wat',
      hochdeutsch: 'was (Ruhrpott-Form)',
      bedeutung: '„Wat" ist im Ruhrpott die Form von „was" — wie „dat" aus dem Niederdeutschen entstanden. „Wat willste?", „Wat is los?", „Wat soll dat?". Das W-Wort prägt jeden Pott-Dialog. Die Aussprache mit hartem T statt weichem S macht den Klang direkt und ehrlich. Wer „was" sagt statt „wat", ist entweder zugezogen oder steht für Hochdeutsch. Im Pott regiert „wat".',
      beispiel: 'Wat hasse denn gemacht heute? — Ach, dat üblich.',
      beispiel_hd: 'Was hast du denn heute gemacht? — Ach, das Übliche.',
      kategorie: 'redensart'
    },
    {
      id: 'ru-117',
      ausdruck: 'datt',
      hochdeutsch: 'das (extreme Ruhrpott-Form)',
      bedeutung: '„Datt" mit doppeltem T ist die besonders harte, betonte Form von „dat" — wenn ein Pottmensch nachdrücklich sein will. „Datt iss so!", „Datt geht garnich!". Die Verdoppelung des T zeigt Emphase, manchmal auch Empörung. Sprachwissenschaftlich eine Verstärkungsform, im Alltag ein Ausdruck der Pott-Direktheit. Wer „datt" sagt, meint es ernst.',
      beispiel: 'Datt machst du jetzt nich nochmal, klar?',
      beispiel_hd: 'Das machst du jetzt nicht noch einmal, klar?',
      kategorie: 'redensart'
    },
    {
      id: 'ru-118',
      ausdruck: 'Dödel',
      hochdeutsch: 'Trottel (gemäßigtes Pott-Schimpfwort)',
      bedeutung: 'Ein „Dödel" ist im Ruhrpott ein liebenswerter Trottel — jemand, der ungeschickt oder begriffsstutzig ist, aber kein böser Mensch. Eher freundliches als scharfes Schimpfwort, oft unter Freunden oder in der Familie. „Du Dödel!" sagt man, wenn jemand was Dummes getan hat. Der Pott pflegt diese gemäßigten Schimpfwörter, die mehr Hänselei als Beleidigung sind.',
      beispiel: 'Du Dödel, hast die Schlüssel wieder vergessen!',
      beispiel_hd: 'Du Trottel, hast die Schlüssel wieder vergessen!',
      kategorie: 'schimpf'
    },
    {
      id: 'ru-119',
      ausdruck: 'Pinöckel',
      hochdeutsch: 'kleiner ungeschickter Mensch (Ruhrpott-Wort)',
      bedeutung: 'Ein „Pinöckel" ist im Ruhrpott ein kleiner, oft ungeschickter Mensch — meist liebevoll-tadelnd gemeint. Kann auch für ein Kind verwendet werden, das gerade etwas anstellt. Klingt absurd und ist genau deshalb so beliebt: die Lautmalerei macht den Spott freundlich. Pott-Schimpfwörter sind selten richtig böse — meistens schwingt Zuneigung mit.',
      beispiel: 'Komm her, du kleiner Pinöckel — wat hast du angestellt?',
      beispiel_hd: 'Komm her, du kleiner Frechdachs — was hast du angestellt?',
      kategorie: 'schimpf'
    },
    {
      id: 'ru-120',
      ausdruck: 'Schwebebahn',
      hochdeutsch: 'Wuppertaler Schwebebahn (Hängebahn)',
      bedeutung: 'Die Wuppertaler Schwebebahn ist eine technische Sensation und das Wahrzeichen Wuppertals — eröffnet 1901, fährt sie in 8 bis 12 Metern Höhe über die Wupper. 13,3 km lang, das älteste elektrische Hängebahnsystem der Welt. Wuppertal selbst gilt als „Tor zum Ruhrgebiet" — bergisches Land mit Pott-Anschluss. Touristen aus aller Welt kommen für die einzigartige Fahrerfahrung.',
      beispiel: 'Wer in Wuppertal war und nich Schwebebahn gefahren is, war nich richtig da.',
      beispiel_hd: 'Wer in Wuppertal war und nicht Schwebebahn gefahren ist, war nicht richtig da.',
      kategorie: 'orte'
    },
    {
      id: 'ru-121',
      ausdruck: 'Düsseldorf-Rivalität',
      hochdeutsch: 'Pott gegen Düsseldorf (Mentalitätsstreit)',
      bedeutung: 'Die Rivalität zwischen Ruhrpott und Düsseldorf ist legendär — die Pottler sehen die Düsseldorfer als arrogant, schickimicki und überheblich; die Düsseldorfer sehen den Pott als grau, ungehobelt und altmodisch. Königsallee gegen Trinkhalle. Fortuna gegen BVB und Schalke. Altbier gegen Pils. Im Fußball, im Karneval, im Lebensstil — die Konkurrenz zwischen NRW-Metropolen ist herzhaft.',
      beispiel: 'Düsseldorf? Nee, da fahr ich nich freiwillig hin — zu schicki.',
      beispiel_hd: 'Düsseldorf? Nein, da fahre ich nicht freiwillig hin — zu schick.',
      kategorie: 'orte'
    },
    {
      id: 'ru-122',
      ausdruck: 'Pott-Ehrlichkeit',
      hochdeutsch: 'Direktheit und Aufrichtigkeit (Pott-Tugend)',
      bedeutung: 'Die Pott-Ehrlichkeit ist die wichtigste Tugend des Ruhrpottlers — kein um den heißen Brei reden, kein Falsches Lächeln, kein Schickimicki. Wer im Pott was zu sagen hat, sagt es direkt ins Gesicht. Das wirkt manchmal hart, ist aber gemeint als Zeichen von Respekt: Du bist mir wichtig genug für die Wahrheit. Diese Direktheit prägt jeden Arbeitsplatz, jede Kneipe, jede Familie im Revier.',
      beispiel: 'Pott-Ehrlichkeit — wir reden Klartext, da gibts nix zu beschönigen.',
      beispiel_hd: 'Pott-Ehrlichkeit — wir reden Klartext, da gibt es nichts zu beschönigen.',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-123',
      ausdruck: 'Schnauze',
      hochdeutsch: 'Mund / direkte Sprache (Pott-Eigenschaft)',
      bedeutung: 'Die „Schnauze" ist im Pott die direkte, ungeschönte Sprache — eine berühmte Charaktereigenschaft. „Die hat ne Schnauze!" ist ein Kompliment: Die Person sagt, was Sache ist. Auch „Schnauze halten!" ist eine derbe Aufforderung zu schweigen. Wer im Pott seine Schnauze einsetzen kann, gewinnt Respekt. Mit der Schnauze überlebt man im Kohleflöz und auf der Hütte.',
      beispiel: 'Die Frau hat ne Schnauze — die sagt jedem die Meinung.',
      beispiel_hd: 'Die Frau hat eine Schnauze — die sagt jedem die Meinung.',
      kategorie: 'koerper'
    },
    {
      id: 'ru-124',
      ausdruck: 'Ruhrpott-Mentalität',
      hochdeutsch: 'Lebenseinstellung des Reviers',
      bedeutung: 'Die Ruhrpott-Mentalität vereint Direktheit, Herzlichkeit, Solidarität und Pragmatismus. Geformt durch die harte Arbeit unter Tage und auf der Hütte, durch Migration aus Polen und Italien, durch Strukturkrisen und Wiederaufbau. Pottmenschen helfen sich gegenseitig, schimpfen auf alles und meinen es trotzdem gut. Wer einmal Pottmentalität erlebt hat, weiß: Es geht nicht um Geld, sondern um Würde und Gemeinschaft.',
      beispiel: 'Ruhrpott-Mentalität — Schnauze, Herz und Zusammenhalt in einem.',
      beispiel_hd: 'Ruhrpott-Mentalität — Direktheit, Herz und Zusammenhalt in einem.',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-125',
      ausdruck: 'Halbacht',
      hochdeutsch: 'Vatersohn / Sonderling (Pott-Schimpfwort)',
      bedeutung: 'Ein „Halbacht" ist im Ruhrpott jemand, der nicht ganz auf der Höhe ist — leicht verschroben, sonderbar oder nicht ganz dicht. Der Ausdruck kommt vermutlich von einer Uhrenangabe („halb acht" = nicht voll, nicht richtig). Gemäßigtes Schimpfwort, eher kopfschüttelnd als verletzend gemeint. Im Pott kennt man genug Halbachte — Charaktere, die jeder im Viertel kennt und die zum Lokalkolorit gehören.',
      beispiel: 'Der Kalle is\'n bisschen Halbacht — aber n guter Kerl.',
      beispiel_hd: 'Der Kalle ist ein bisschen verschroben — aber ein guter Kerl.',
      kategorie: 'schimpf'
    },
    {
      id: 'ru-126',
      ausdruck: 'Wattenscheid',
      hochdeutsch: 'Stadtteil von Bochum (mit eigener Identität)',
      bedeutung: 'Wattenscheid ist seit 1975 ein Stadtteil von Bochum — aber die Wattenscheider selbst sehen das anders: „Mir sind Wattenscheider, nicht Bochumer!" Eigene Innenstadt, eigene Geschichte, eigene Fußballtradition (SG Wattenscheid 09, einmal Bundesliga). Die Eingemeindung 1975 ist bis heute Stoff für Lokalpatriotismus. Wer in Wattenscheid groß wird, betont die eigenständige Herkunft. Klassischer Pott-Stolz auf den Stadtteil.',
      beispiel: 'Ich bin aus Wattenscheid — nich aus Bochum, dat is wat anneres!',
      beispiel_hd: 'Ich bin aus Wattenscheid — nicht aus Bochum, das ist etwas anderes!',
      kategorie: 'orte'
    },
    {
      id: 'ru-127',
      ausdruck: 'Festspielhaus',
      hochdeutsch: 'Ruhrfestspielhaus Recklinghausen',
      bedeutung: 'Das Ruhrfestspielhaus in Recklinghausen ist eines der wichtigsten Theater des Ruhrgebiets — Sitz der Ruhrfestspiele, die seit 1947 stattfinden. Gegründet wurden sie als Dank der Bergleute, die im Winter 1946 mit Kohle gegen Theateraufführungen tauschten — Kunst gegen Wärme. Heute renommiertes Festival mit internationalem Programm. Symbol für die Verbindung von Arbeiterkultur und Hochkultur im Pott. Mai bis Juni Festival-Zeit.',
      beispiel: 'Die Ruhrfestspiele inne Recklinghausen sind Theater für Arbeiter — gegründet mit Kohle.',
      beispiel_hd: 'Die Ruhrfestspiele in Recklinghausen sind Theater für Arbeiter — gegründet mit Kohle.',
      kategorie: 'musik'
    },
    {
      id: 'ru-128',
      ausdruck: 'Mülheim-Ruhr',
      hochdeutsch: 'Mülheim an der Ruhr (Pott-Stadt)',
      bedeutung: 'Mülheim an der Ruhr liegt zwischen Duisburg und Essen direkt an der Ruhr — mit 170.000 Einwohnern eine der kleineren Pott-Städte, aber mit eigenem Charakter. Sitz von Aldi Süd (Stammhaus der Brüder Albrecht), Camera Obscura im Wasserturm, Theater an der Ruhr. Etwas gehobener als andere Pott-Städte, gilt als „grüne Stadt am Fluss". Die Mülheimer wirken im Pott-Vergleich gediegener — was ihnen freundlichen Spott einbringt.',
      beispiel: 'Mülheim is\'n bisschen feiner als der Rest vom Pott — aber trotzdem dabei.',
      beispiel_hd: 'Mülheim ist ein bisschen feiner als der Rest vom Pott — aber trotzdem dabei.',
      kategorie: 'orte'
    },
    {
      id: 'ru-129',
      ausdruck: 'Centro',
      hochdeutsch: 'CentrO Oberhausen (Einkaufszentrum)',
      bedeutung: 'Das CentrO in Oberhausen ist eines der größten Einkaufszentren Europas — 1996 auf dem Gelände des stillgelegten Thyssen-Stahlwerks eröffnet. Symbolisch: Wo früher Stahl floss, fließt heute der Konsum. 250 Geschäfte, Coca-Cola-Oase, Sea Life, Gasometer. Für viele Pottler das Wochenendziel, für andere das Symbol des Strukturwandels — gut oder schlecht, je nach Sichtweise. Tatsache: Ohne CentrO wäre Oberhausen heute weniger.',
      beispiel: 'Samstag fährt halb Pott ins CentrO — shoppen wo früher Stahl gekocht wurde.',
      beispiel_hd: 'Samstag fährt halb Ruhrgebiet ins CentrO — shoppen, wo früher Stahl gekocht wurde.',
      kategorie: 'orte'
    },
    {
      id: 'ru-130',
      ausdruck: 'Hagen',
      hochdeutsch: 'Hagen (Tor zum Sauerland)',
      bedeutung: 'Hagen am südöstlichen Rand des Ruhrgebiets gilt als „Tor zum Sauerland" — Übergang vom industriellen Pott zur grünen Mittelgebirgslandschaft. 188.000 Einwohner, Sitz der Fernuniversität Hagen (Deutschlands einzige staatliche Fernuni). Berühmt: Karl Ernst Osthaus Museum, Walgemüt-Park. Hagener gelten als bodenständig und etwas zurückhaltender als die zentralen Pottler. Die Stadt war stark betroffen von der Hochwasserkatastrophe 2021.',
      beispiel: 'Hagen is\'s Tor zum Sauerland — halb Pott, halb Sauerländer.',
      beispiel_hd: 'Hagen ist das Tor zum Sauerland — halb Pott, halb Sauerländer.',
      kategorie: 'orte'
    },
    {
      id: 'ru-131',
      ausdruck: 'Schwebebahn-Skandal',
      hochdeutsch: 'Wuppertaler Schwebebahn 1950 — der Elefant Tuffi',
      bedeutung: 'Der berühmteste Schwebebahn-Vorfall: 1950 sprang der kleine Zirkuselefant Tuffi aus einem Werbe-Fahrzeug der Wuppertaler Schwebebahn in die Wupper — fiel 12 Meter, überlebte unverletzt. Bilder gingen um die Welt, Wuppertal wurde zur „Elefanten-Stadt". Eine Tuffi-Statue erinnert heute an den Stunt. Die Schwebebahn ist nicht nur Technik, sondern Geschichte voller skurriler Anekdoten. Bis heute fahren Touristen extra für die Tuffi-Geschichte.',
      beispiel: 'Tuffi der Elefant ist 1950 ausse Schwebebahn gesprungen — Wuppertaler Legende.',
      beispiel_hd: 'Tuffi der Elefant ist 1950 aus der Schwebebahn gesprungen — Wuppertaler Legende.',
      kategorie: 'orte'
    },
    {
      id: 'ru-132',
      ausdruck: 'Manni Breuckmann',
      hochdeutsch: 'Manfred Breuckmann (WDR-Reporter)',
      bedeutung: 'Manfred „Manni" Breuckmann (1951-2024) war über 40 Jahre WDR-Sportreporter und DIE Stimme des Ruhrpott-Fußballs in der Konferenzschaltung der Bundesliga. Sein lakonischer, trockener Ruhrpott-Witz, gemixt mit Sachverstand, machte ihn zur Kultfigur. „Tor in Dortmund!" mit seiner Stimme — Pott-Sound pur. 2009 Henri-Nannen-Preis. Sein Tod im Mai 2024 wurde im ganzen Ruhrgebiet betrauert — eine Ära ging zu Ende.',
      beispiel: 'Manni Breuckmanns Stimme — dat war Bundesliga-Konferenz für Generationen.',
      beispiel_hd: 'Manni Breuckmanns Stimme — das war Bundesliga-Konferenz für Generationen.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-133',
      ausdruck: 'Lokalzeit',
      hochdeutsch: 'WDR-Regionalsendung (Lokalzeit Ruhr / Dortmund)',
      bedeutung: 'Die „Lokalzeit" des WDR ist die wichtigste Regional-Nachrichtensendung im Ruhrgebiet — getrennt für Ruhr, Dortmund, Duisburg und das Bergische Land. 19:30 Uhr, direkt vor der Tagesschau. Berichte über Stadtteil-Politik, Kriminalität, Vereinsleben, BVB und Schalke. Für viele Pottmenschen das tägliche Fenster zur Heimat. Moderiert von vertrauten Gesichtern, die im Pott bekannter sind als jeder Bundespolitiker. Pflichttermin im Wohnzimmer.',
      beispiel: 'Halb sieben Lokalzeit guckn — dat is bei Vatter Pflichttermin.',
      beispiel_hd: 'Halb sieben Lokalzeit schauen — das ist bei Vater Pflichttermin.',
      kategorie: 'musik'
    },
    {
      id: 'ru-134',
      ausdruck: 'Frank Goosen',
      hochdeutsch: 'Frank Goosen (Bochumer Autor und Kabarettist)',
      bedeutung: 'Frank Goosen (geb. 1966 in Bochum) ist DER Chronist des modernen Ruhrgebiets — Autor („Liegen lernen", „Pokorny lacht"), Kabarettist und VfL-Bochum-Fanatiker. Seine Bücher fangen die Pott-Mentalität, die Bochumer Eckkneipen und die Familiengeschichten der Nach-Bergbau-Generation ein. Mit Tresenlesen-Kollege Jochen Malmsheimer prägte er das Ruhrpott-Kabarett. Seine Romane spielen meist in seinem geliebten Bochum.',
      beispiel: 'Frank Goosens Bochum-Bücher — Pott-Literatur, die jeder gelesen haben sollte.',
      beispiel_hd: 'Frank Goosens Bochum-Bücher — Pott-Literatur, die jeder gelesen haben sollte.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-135',
      ausdruck: 'Herbert Knebel',
      hochdeutsch: 'Herbert Knebel (Kunstfigur von Uwe Lyko)',
      bedeutung: 'Herbert Knebel ist die berühmteste Kunstfigur des Essener Kabarettisten Uwe Lyko (geb. 1954) — ein graumelierter Pott-Rentner mit Schiebermütze, Brille und Igittigittigitt-Sprüchen über alles Moderne. Seit den 1980er Jahren in der WDR-Sendung „Herbert Knebels Affentheater" und auf Theaterbühnen. Verkörpert die etwas mufflige, aber liebenswerte Pott-Rentner-Mentalität. Sätze wie „Da kann man ja nur den Kopf schütteln" sind Kult.',
      beispiel: 'Herbert Knebel mit seinem Igittigittigitt — Pott-Kabarett in Reinkultur.',
      beispiel_hd: 'Herbert Knebel mit seinem Igittigittigitt — Pott-Kabarett in Reinkultur.',
      kategorie: 'menschen'
    },
    {
      id: 'ru-136',
      ausdruck: 'Karl Konietzny',
      hochdeutsch: 'Pott-Original / Bergmannstyp',
      bedeutung: 'Karl Konietzny — der Name steht stellvertretend für tausende polnischstämmige Bergmannsfamilien im Ruhrgebiet. Ab 1880 wanderten massenhaft polnische Bergleute (Ruhrpolen) ins Revier — sie machten zeitweise ein Viertel der Bevölkerung aus. Nachnamen auf -ski, -czyk und -ny sind heute noch häufig. Konietzny ist Sinnbild für die polnische Wurzel des Pottlers — Maloche, Familie, katholische Volksfrömmigkeit. Pott-Identität ist immer auch polnische Identität.',
      beispiel: 'Mein Opa hieß Konietzny — Bergmann mit polnischen Wurzeln, typisch Pott.',
      beispiel_hd: 'Mein Opa hieß Konietzny — Bergmann mit polnischen Wurzeln, typisch Pott.',
      kategorie: 'familie'
    },
    {
      id: 'ru-137',
      ausdruck: 'Gelbe Wand',
      hochdeutsch: 'BVB-Fanchoreografie (Südtribüne)',
      bedeutung: 'Die „Gelbe Wand" ist die berühmte Südtribüne im Signal-Iduna-Park — 25.000 stehende Fans, größte Stehtribüne Europas. Vor jedem Spiel werden gigantische Choreografien aus Bildern, Bannern und Konfetti gestaltet, die monatelang von Fan-Gruppen wie „The Unity" und „Desperados" geplant werden. Bei Champions-League-Spielen sind die Choreos weltweit berühmt — selbst gegnerische Trainer wie Pep Guardiola haben sie gefeiert. Pott-Fußballkultur auf Weltniveau.',
      beispiel: 'Die Gelbe Wand mit Choreo — das schönste Stadion-Bild der Welt.',
      beispiel_hd: 'Die Gelbe Wand mit Choreo — das schönste Stadion-Bild der Welt.',
      kategorie: 'sport'
    },
    {
      id: 'ru-138',
      ausdruck: 'Schalke-Mythos',
      hochdeutsch: 'Königsblauer Mythos (FC Schalke 04)',
      bedeutung: 'Der Schalke-Mythos lebt von siebenmaliger deutscher Meisterschaft (zuletzt 1958), UEFA-Cup 1997, treuesten Fans der Welt und der Verbundenheit zur Bergbau-Tradition. „Wir sind Schalker" ist mehr als Vereinszugehörigkeit — es ist Identität, oft über Generationen vererbt. Trotz Abstiege und Krisen bleiben über 160.000 Mitglieder. Die Veltins-Arena ist königsblaue Wallfahrtsstätte. „Glück auf Schalke!" verbindet Bergmannstradition mit Fußballglauben.',
      beispiel: 'Schalke is nich Verein — Schalke is Familie, Glaube, Heimat.',
      beispiel_hd: 'Schalke ist nicht Verein — Schalke ist Familie, Glaube, Heimat.',
      kategorie: 'sport'
    },
    {
      id: 'ru-139',
      ausdruck: 'Pommes-Mayo',
      hochdeutsch: 'Pommes mit Mayonnaise (Pott-Standard)',
      bedeutung: 'Pommes-Mayo ist der Ruhrpott-Standard an der Frittenbude — Pommes frites mit großzügigem Schlag Mayonnaise, oft kombiniert mit Currywurst. Im Vergleich zu „Pommes rot-weiß" (mit Ketchup und Mayo) oder „Pommes Schranke" (gleicher Mix) die pure Form. An jedem Imbiss, vor jedem Stadion, neben jeder Trinkhalle. Die richtige Mayo ist Geschmackssache — manche schwören auf Thomy, andere auf Heinz. Ein Pott-Klassiker.',
      beispiel: 'Pommes-Mayo nach\'m Spiel — Pflichtprogramm im Pott.',
      beispiel_hd: 'Pommes mit Mayo nach dem Spiel — Pflichtprogramm im Pott.',
      kategorie: 'essen'
    },
    {
      id: 'ru-140',
      ausdruck: 'Manta-Witz',
      hochdeutsch: 'Opel-Manta-Witze (Pott-Humor)',
      bedeutung: 'Die Manta-Witze waren in den 1980er Jahren das beliebteste Witzgenre im Ruhrgebiet — sie zielten auf den klischeehaften Opel-Manta-Fahrer: Fuchsschwanz an der Antenne, Friseuse als Beifahrerin, mehr Mut als Verstand. Filme wie „Manta — Der Film" (1991) mit Til Schweiger machten den Mythos populär. Im Pott war der Manta DAS Auto der Arbeiterjugend — günstig, schnell, mit dickem Spoiler. Heute Kult, damals Lebensstil.',
      beispiel: 'Manta-Witze waren früher der Pott-Humor schlechthin — Friseuse und Fuchsschwanz.',
      beispiel_hd: 'Manta-Witze waren früher der Pott-Humor schlechthin — Friseuse und Fuchsschwanz.',
      kategorie: 'redensart'
    },
    {
      id: 'ru-141',
      ausdruck: 'Pottliebe',
      hochdeutsch: 'Liebe zum Ruhrgebiet (Heimatgefühl)',
      bedeutung: 'Die „Pottliebe" ist das tiefe, oft unerklärliche Heimatgefühl der Ruhrgebietsbewohner — eine Mischung aus Stolz, Trotz und Zuneigung trotz aller Hässlichkeit. Grönemeyer hat es in „Bochum" perfekt eingefangen: „Du bist keine Schönheit, aber...". Pottler ziehen weg und kommen zurück. Sie schimpfen über den Pott, aber lassen niemand anderem schimpfen. Diese Liebe verbindet alle Generationen, alle Herkünfte, alle Stadtteile. Pottliebe ist Identität.',
      beispiel: 'Pottliebe is, wenn de wegziehst und doch immer zurück willst.',
      beispiel_hd: 'Pottliebe ist, wenn du wegziehst und doch immer zurück willst.',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-142',
      ausdruck: 'Steigerlied',
      hochdeutsch: '„Glück auf, der Steiger kommt" (Bergmanns-Hymne)',
      bedeutung: 'Das Steigerlied „Glück auf, der Steiger kommt" ist die offizielle Hymne des deutschen Bergbaus — und insbesondere des Ruhrgebiets. Entstanden im 16. Jahrhundert im sächsischen Erzgebirge, übernommen vom Ruhrbergbau. Es wird bei Schalke-Heimspielen vor jedem Anstoß gesungen — eines der bewegendsten Stadion-Rituale Deutschlands. Auch bei Beerdigungen ehemaliger Bergleute Pflicht. Der Steiger war der Vorarbeiter im Schacht. Ende des Bergbaus 2018 machte das Lied noch wichtiger.',
      beispiel: 'Bei Schalke vor\'m Anpfiff: Steigerlied — Gänsehaut für jeden Pottler.',
      beispiel_hd: 'Bei Schalke vor dem Anpfiff: Steigerlied — Gänsehaut für jeden Pottler.',
      kategorie: 'musik'
    },
    {
      id: 'ru-143',
      ausdruck: 'Karneval-Verteidiger',
      hochdeutsch: 'Sicherheits-Notruf vor Bochumer Karneval',
      bedeutung: 'Der „Karneval-Verteidiger" ist ein humorvoller Pott-Ausdruck für jemand, der dem rheinischen Karneval-Wahn standhält und beim Bier in der Eckkneipe sitzt, während alle anderen verkleidet rumlaufen. Im Pott ist Karneval anders — bodenständiger, weniger pompös. Echte Pottler verteidigen ihre Ruhe vor dem „Helau-Wahnsinn". Eine Mischung aus Selbstironie und stillem Stolz auf die Pott-Eigenart.',
      beispiel: 'Karneval? Ich bin Karneval-Verteidiger — bleib in der Eckkneipe.',
      beispiel_hd: 'Karneval? Ich bin Karneval-Verteidiger — bleibe in der Eckkneipe.',
      kategorie: 'redensart'
    },
    {
      id: 'ru-144',
      ausdruck: 'Tante-Emma-Pott',
      hochdeutsch: 'kleiner Lebensmittelladen im Stadtteil',
      bedeutung: 'Der „Tante-Emma-Pott" ist die liebevolle Pott-Variante des klassischen Tante-Emma-Ladens — ein kleiner Lebensmittelladen, oft an der Straßenecke, geführt von einer Familie. Die Inhaberin kennt jeden Kunden, schreibt an, gibt Tipps. Im Pott haben polnische, türkische und kurdische Familien diese Tradition übernommen und erweitert. Wo das Tante-Emma-Geschäft stirbt, stirbt ein Stück Pott-Nachbarschaft. Aldi und Rewe können den Plausch nicht ersetzen.',
      beispiel: 'Der Tante-Emma-Pott an der Ecke kennt mich seit ich Kind war.',
      beispiel_hd: 'Der Tante-Emma-Laden an der Ecke kennt mich, seit ich Kind war.',
      kategorie: 'orte'
    },
    {
      id: 'ru-145',
      ausdruck: 'Halde Hoheward',
      hochdeutsch: 'Halde Hoheward (Herten/Recklinghausen)',
      bedeutung: 'Die Halde Hoheward zwischen Herten und Recklinghausen ist mit 152 Metern eine der höchsten Bergehalden Europas — auf dem Plateau steht das spektakuläre „Horizontobservatorium", zwei riesige Stahlbögen, die die Sonnenwenden und Tagundnachtgleichen markieren. Begehbare Sonnenuhr. Aussichtspunkt über das ganze Ruhrgebiet — bei klarem Wetter sieht man von Köln bis Münster. Vorzeigeprojekt der Renaturierung — wo Abraum lag, ist Erholung.',
      beispiel: 'Von der Halde Hoheward siehste den ganzen Pott — schönster Aussichtspunkt.',
      beispiel_hd: 'Von der Halde Hoheward siehst du das ganze Ruhrgebiet — schönster Aussichtspunkt.',
      kategorie: 'orte'
    },
    {
      id: 'ru-146',
      ausdruck: 'Pott-Hochzeit',
      hochdeutsch: 'Hochzeit im Ruhrgebiet-Stil',
      bedeutung: 'Die Pott-Hochzeit ist eine eigene Spielart — meistens katholisch-polnisch geprägt, mit großer Familie (alle 80 Cousins eingeladen), Vereinslokal statt Schloss, Schäufele und Pommes statt Tafelspitz, polnischer Musik und Bier statt Champagner. Der Tag dauert bis morgens, alle tanzen mit Onkel Karli und Tante Helga, am Sonntag ist Restl-Essen. Authentisch, bodenständig, herzlich — und garantiert ohne Schickimicki. So feiert der Pott.',
      beispiel: 'Pott-Hochzeit — 200 Leute, polnische Musik, Schäufele und Bier bis morgens.',
      beispiel_hd: 'Pott-Hochzeit — 200 Leute, polnische Musik, Schäufele und Bier bis morgens.',
      kategorie: 'familie'
    },
    {
      id: 'ru-147',
      ausdruck: 'Maloche-Stolz',
      hochdeutsch: 'Stolz auf harte Arbeit (Pott-Ethos)',
      bedeutung: 'Der Maloche-Stolz ist der Kern der Pott-Identität — der Stolz auf ehrliche, harte Arbeit, oft körperlich, oft schmutzig, immer wertvoll. Im Pott zählt nicht der Akademikertitel, sondern was du mit deinen Händen geleistet hast. Der Bergmann, der Stahlarbeiter, der Hafenarbeiter — sie haben Deutschland aufgebaut. Diese Wertschätzung von körperlicher Arbeit unterscheidet den Pott bis heute von der gefühlten Akademiker-Welt anderer Regionen. Würde durch Maloche.',
      beispiel: 'Mein Vatter hat malocht — und dat war mehr wert als jedes Diplom.',
      beispiel_hd: 'Mein Vater hat malocht — und das war mehr wert als jedes Diplom.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-148',
      ausdruck: 'Pott-Solidarität',
      hochdeutsch: 'Zusammenhalt in der Nachbarschaft',
      bedeutung: 'Die Pott-Solidarität ist die berühmte Hilfsbereitschaft im Ruhrgebiet — wenn ein Nachbar Hilfe braucht, ist man da, ohne zu fragen. Wurzelt in der Bergmanns-Tradition: Unter Tage war man aufeinander angewiesen. Heute zeigt sie sich beim Umzug, in der Krankheit, bei Stadtteil-Festen. „Im Pott lässt man niemand alleine" — das ist mehr als Spruch, das ist gelebte Praxis. Diese Solidarität hat alle Strukturkrisen überstanden.',
      beispiel: 'Pott-Solidarität — wenn was is, sind die Nachbarn da. Ohne zu fragen.',
      beispiel_hd: 'Pott-Solidarität — wenn was ist, sind die Nachbarn da. Ohne zu fragen.',
      kategorie: 'gefuehle'
    },
    {
      id: 'ru-149',
      ausdruck: 'Strukturwandel',
      hochdeutsch: 'Transformation nach Bergbau und Stahl',
      bedeutung: 'Der Strukturwandel beschreibt den schmerzhaften Wandel des Ruhrgebiets nach dem Ende von Bergbau (2018) und Stahlindustrie (ab 1980er). Zechen wurden zu Kulturzentren (Zollverein), Stahlwerke zu Parks (Landschaftspark Nord), Halden zu Aussichtspunkten. Hunderttausende Arbeiter mussten sich neu orientieren — viele Familien betroffen. Heute Dienstleistungsregion, IT-Standort, Universitätsregion. Erfolgreich, aber mit Verlustgefühl. Strukturwandel ist Pott-Schicksal.',
      beispiel: 'Strukturwandel — Kohle weg, aber Pott noch da. Anders, aber da.',
      beispiel_hd: 'Strukturwandel — Kohle weg, aber Ruhrgebiet noch da. Anders, aber da.',
      kategorie: 'arbeit'
    },
    {
      id: 'ru-150',
      ausdruck: 'Glück Auf für Immer',
      hochdeutsch: 'Bergmannsgruß als ewiges Symbol',
      bedeutung: '„Glück Auf für Immer" — am 21. Dezember 2018 wurde mit der Zeche Prosper-Haniel in Bottrop die letzte Steinkohlenzeche Deutschlands geschlossen. 150 Jahre Bergbau im Pott gingen zu Ende. Das Steigerlied wurde gesungen, Bergleute weinten. „Glück Auf" bleibt aber ewiger Gruß — bei Schalke, bei Familienfeiern, bei Beerdigungen. Der Bergmann ist gegangen, aber sein Geist und sein Gruß leben weiter im Pott. Ein ganzes Zeitalter hat die Erinnerung geprägt — und prägt weiter.',
      beispiel: 'Glück Auf für Immer — die Zechen sind weg, der Gruß bleibt für ewig.',
      beispiel_hd: 'Glück Auf für Immer — die Zechen sind weg, der Gruß bleibt für ewig.',
      kategorie: 'arbeit'
    }
  ]
};