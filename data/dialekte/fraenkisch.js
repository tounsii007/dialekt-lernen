// Fränkisch — Dialektdaten

export default {
  id: 'fraenkisch',
  name: 'Fränkisch',
  region: 'Franken (Nordbayern, Würzburg, Nürnberg, Bamberg, Coburg)',
  bundesland: 'Bayern (Nordbayern)',
  flag: '🦅',
  farbe: '#f77f00',
  beschreibung: 'Fränkisch ist eine mitteldeutsche Dialektgruppe, die im Gegensatz zum Bairischen im nördlichen Bayern, in Thüringen und Teilen Sachsens gesprochen wird. Markante Merkmale sind das gerollte R, das offene „a" und die einzigartigen Intonationsmuster. Nürnberg, Würzburg und Bamberg sind die Zentren dieses lebendigen Dialekts.',
  sprecher: 'ca. 6 Mio.',
  ausdruecke: [
    {
      id: 'fr-001',
      ausdruck: 'Gell',
      hochdeutsch: 'Gell? / Nicht wahr? / Oder?',
      bedeutung: 'Zustimmungspartikel am Satzende, die eine Bestätigung vom Gesprächspartner erwartet. Im Fränkischen weit verbreitet, ähnlich wie im Bayerischen und Hessischen, aber mit charakteristisch fränkischem Tonfall. Wird oft gedehnt gesprochen: „Geelll?".',
      beispiel: 'Des war a guuder Film, gell?',
      beispiel_hd: 'Das war ein guter Film, oder?',
      kategorie: 'redensart'
    },
    {
      id: 'fr-002',
      ausdruck: 'Bassd scho',
      hochdeutsch: 'Passt schon / Ist in Ordnung',
      bedeutung: 'Die fränkische Universalformel der Gelassenheit. Ob etwas nicht ganz stimmt, ob man überbezahlt hat oder ob etwas nur halb fertig ist — „Bassd scho" macht alles gut. Steht für die fränkische Mentalität: pragmatisch, entspannt, unaufgeregt.',
      beispiel: 'Hast du zu viel Wechselgeld gegeben. — Ach, bassd scho.',
      beispiel_hd: 'Du hast zu viel Wechselgeld gegeben. — Ach, passt schon.',
      kategorie: 'redensart'
    },
    {
      id: 'fr-003',
      ausdruck: 'Hawwe mir',
      hochdeutsch: 'Haben wir',
      bedeutung: 'Fränkische Form des Verbs „haben" in der ersten Person Plural. Typisch für das Fränkische ist das „h" am Anfang, das im Hochdeutschen nach „wir" fehlt. Ein Merkmal, das Fränkisch klar vom benachbarten Bairischen unterscheidet.',
      beispiel: 'Hawwe mir des net schon letscht Woch besprochen?',
      beispiel_hd: 'Haben wir das nicht schon letzte Woche besprochen?',
      kategorie: 'alltag'
    },
    {
      id: 'fr-004',
      ausdruck: 'Des',
      hochdeutsch: 'Das',
      bedeutung: 'Die fränkische Form des Demonstrativpronomens „das". Im Fränkischen ist das „a" oft zu einem offenen „e" geworden. „Des" ist eines der häufigsten Wörter im fränkischen Alltag und taucht in fast jedem Satz auf.',
      beispiel: 'Des is awwa nedd guat.',
      beispiel_hd: 'Das ist aber nicht gut.',
      kategorie: 'alltag'
    },
    {
      id: 'fr-005',
      ausdruck: 'Desdeweng',
      hochdeutsch: 'Deswegen / Deshalb',
      bedeutung: 'Die fränkische Kausalpartikel, zusammengezogen aus „des" (das) und „deswegen". Ein typisches Beispiel für die fränkische Neigung zur Lautverschiebung und Verschleifung. Wird oft am Satzanfang oder Satzende eingesetzt.',
      beispiel: 'Er war krank, desdeweng is er nedd kumma.',
      beispiel_hd: 'Er war krank, deshalb ist er nicht gekommen.',
      kategorie: 'redensart'
    },
    {
      id: 'fr-006',
      ausdruck: 'Frankn',
      hochdeutsch: 'Franken (die Region)',
      bedeutung: 'Die fränkische Eigenbezeichnung für die historische Region Franken, die heute auf die Regierungsbezirke Ober-, Mittel- und Unterfranken aufgeteilt ist. Franken haben eine starke regionale Identität und betonen gerne, dass sie keine Bayern sind — obwohl sie politisch zu Bayern gehören.',
      beispiel: 'In Frankn lebt man gut — guder Wein, guds Bier, guds Essa!',
      beispiel_hd: 'In Franken lebt man gut — guter Wein, gutes Bier, gutes Essen!',
      kategorie: 'orte'
    },
    {
      id: 'fr-007',
      ausdruck: 'Nämberch',
      hochdeutsch: 'Nürnberg',
      bedeutung: 'Die fränkische Aussprache von Nürnberg, der größten Stadt Frankens. Das „ü" wird zu einem offenen „ä", das „g" am Ende wird zu einem weichen „ch" — typisch für den fränkischen Lautwandel. Nürnberg war jahrhundertelang eine der bedeutendsten Freien Reichsstädte des Heiligen Römischen Reiches.',
      beispiel: 'In Nämberch gibt\'s die beschde Bratwürscht.',
      beispiel_hd: 'In Nürnberg gibt es die besten Bratwürste.',
      kategorie: 'orte'
    },
    {
      id: 'fr-008',
      ausdruck: 'Wärschbursch',
      hochdeutsch: 'Würzburg',
      bedeutung: 'Die fränkische Aussprache von Würzburg, der Hauptstadt Unterfrankens. Die Stadt liegt am Main und ist bekannt für die Residenz (UNESCO), den Frankenwein und die Römerbrücke. Das charakteristische Fränkisch zeigt sich in der Abschwächung und Dehnung der Vokale.',
      kategorie: 'orte'
    },
    {
      id: 'fr-009',
      ausdruck: 'Bamberch',
      hochdeutsch: 'Bamberg',
      bedeutung: 'Die fränkische Aussprache von Bamberg, der Welterbestadt Oberfrankens. Auch hier wird das „g" am Ende wie im gesamten Fränkischen zu einem weichen „ch" abgeschwächt. Bamberg ist für sein Rauchbier, seine Gärtnerstadt und den Dom bekannt.',
      beispiel: 'In Bamberch schmeckd des Rauchbier am bäschden.',
      beispiel_hd: 'In Bamberg schmeckt das Rauchbier am besten.',
      kategorie: 'orte'
    },
    {
      id: 'fr-010',
      ausdruck: 'Fürth',
      hochdeutsch: 'Fürth',
      bedeutung: 'Fürth ist die Nachbarstadt Nürnbergs und hat eine eigene stolze Identität. Die Rivalität zwischen Nürnberg und Fürth ist legendär — der 1. FC Nürnberg gegen die SpVgg Greuther Fürth ist eines der traditionsreichsten deutschen Derbys. Fürther betonen stets: „Mir sein kaa Nämbercher!"',
      kategorie: 'orte'
    },
    {
      id: 'fr-011',
      ausdruck: 'Schäufele',
      hochdeutsch: 'Schaufelbraten / Schweineschulter',
      bedeutung: 'Das fränkische Nationalgericht schlechthin: eine gebratene Schweineschulter (Schaufelknochen) mit knuspriger Kruste, meist mit Kloß und Soße serviert. Jede fränkische Gasthaus hat sein eigenes Rezept und hütet es wie einen Schatz. Ein Schäufele am Sonntag ist Familienkultur.',
      beispiel: 'Ein Schäufele mid Klöß — des is fränkisch!',
      beispiel_hd: 'Ein Schaufelbraten mit Klößen — das ist fränkisch!',
      kategorie: 'essen'
    },
    {
      id: 'fr-012',
      ausdruck: 'Bratworscht',
      hochdeutsch: 'Bratwurst (Nürnberger)',
      bedeutung: 'Die Nürnberger Rostbratwurst ist durch eine EU-Herkunftsbezeichnung geschützt: nur 7 bis 9 Zentimeter lang, aus fein gewürztem Schweinefleisch mit Majoran. Traditionell werden drei oder sechs Stück auf einem Zinnschälchen mit Sauerkraut oder Kartoffelsalat gereicht. Weltweit ein Symbol für Nürnberg.',
      beispiel: 'Sechs Bratworscht mid Kraud, biddscheen!',
      beispiel_hd: 'Sechs Bratwürste mit Sauerkraut, bitte!',
      kategorie: 'essen'
    },
    {
      id: 'fr-013',
      ausdruck: 'Drei im Weggla',
      hochdeutsch: 'Drei Bratwürste im Brötchen',
      bedeutung: 'Der schnelle Nürnberger Imbiss: drei kleine Rostbratwürste in einem Brötchen (Weggla), mit Senf. Ein Nürnberger Klassiker, der an Ständen vor der Frauenkirche oder am Hauptmarkt serviert wird. „Weggla" ist das fränkische Wort für Brötchen — vom mittelhochdeutschen „Weggli".',
      beispiel: 'Gib mir drei im Weggla mid schafem Senf.',
      beispiel_hd: 'Gib mir drei Bratwürste im Brötchen mit scharfem Senf.',
      kategorie: 'essen'
    },
    {
      id: 'fr-014',
      ausdruck: 'Seidla',
      hochdeutsch: 'Bierkrug (0,5 Liter)',
      bedeutung: 'Im Fränkischen ist die Maßeinheit für Bier das Seidla — ein Krug zu einem halben Liter, anders als die bayerische Maß (1 Liter). Die fränkische Bierkultur ist enorm reich: Franken hat die höchste Brauereidichte der Welt, besonders in der Fränkischen Schweiz rund um Bamberg.',
      beispiel: 'Noch a Seidla Ungspunden, biddscheen!',
      beispiel_hd: 'Noch einen Krug Kellerbier, bitte!',
      kategorie: 'essen'
    },
    {
      id: 'fr-015',
      ausdruck: 'Frankenwein',
      hochdeutsch: 'Frankenwein im Bocksbeutel',
      bedeutung: 'Der Wein aus Franken, bekannt durch die charakteristische bauchige Bocksbeutel-Flasche. Hauptanbaugebiet ist das Maindreieck rund um Würzburg mit dem Stein als bekanntester Lage. Silvaner, Müller-Thurgau und Bacchus sind typische fränkische Rebsorten. Der Wein ist trocken und mineralisch — wie die Franken selbst.',
      kategorie: 'essen'
    },
    {
      id: 'fr-016',
      ausdruck: 'Lebkuchen',
      hochdeutsch: 'Nürnberger Lebkuchen',
      bedeutung: 'Die Nürnberger Lebkuchen gehören zu den ältesten und bekanntesten Backwaren Deutschlands und sind durch eine EU-Herkunftsbezeichnung geschützt. Seit dem 14. Jahrhundert werden sie in Nürnberg hergestellt, ursprünglich von Klosterbrüdern. Elisenlebkuchen, die edelste Sorte, enthalten mindestens 25 % Nüsse und kein Mehl.',
      beispiel: 'Zu Weihnachdn kummd ma an Lebkuchen nedd vorbei.',
      beispiel_hd: 'Zu Weihnachten kommt man an Lebkuchen nicht vorbei.',
      kategorie: 'essen'
    },
    {
      id: 'fr-017',
      ausdruck: 'Äbbärn',
      hochdeutsch: 'Äpfel / Äppelbräuner',
      bedeutung: 'Im Fränkischen werden Äpfel oft einfach „Äbbärn" genannt, abgeleitet von einer alten regionalen Bezeichnung. In Franken gibt es eine reiche Streuobstwiesenkultur, und Apfelwein sowie Apfelbrand spielen eine wichtige Rolle in der regionalen Kulinarik neben dem allgegenwärtigen Bier und Frankenwein.',
      kategorie: 'essen'
    },
    {
      id: 'fr-018',
      ausdruck: 'Kerschdnsdallar',
      hochdeutsch: 'Kirschenstaller / Kirschauflauf',
      bedeutung: 'Ein traditioneller fränkischer Kirschauflauf oder Kirschkuchen, der vor allem in der Erntezeit mit frischen Sauerkirschen gebacken wird. Das Wort ist ein schönes Beispiel für die fränkische Lautfärbung: „Kirsch" wird zu „Kerschdn", „Staller" ist eine regionale Bezeichnung für einen Auflauf oder Brei.',
      kategorie: 'essen'
    },
    {
      id: 'fr-019',
      ausdruck: 'Grumbeer',
      hochdeutsch: 'Kartoffeln',
      bedeutung: 'Fränkisch (wie auch hessisch) für Kartoffeln, abgeleitet von „Grundbirne" — der alten deutschen Bezeichnung für die Knolle, die aus der Erde wächst. Im Bairischen heißen sie „Erdäpfel", in anderen Regionen „Kartoffeln". Die „Grumbeer" ist ein sicheres Zeichen, dass man sich in Franken oder Hessen befindet.',
      beispiel: 'Heut gibd\'s Grumbeerbei mid Quark.',
      beispiel_hd: 'Heute gibt es Kartoffelbrei mit Quark.',
      kategorie: 'essen'
    },
    {
      id: 'fr-020',
      ausdruck: 'Schnitz',
      hochdeutsch: 'Schnitzel / Stück / Schnitte',
      bedeutung: 'Im Fränkischen bedeutet „Schnitz" ein Stück oder eine Scheibe, kann aber auch das Schnitzel meinen. Das Wort ist verwandt mit dem Verb „schnitzen" und bezeichnet allgemein etwas Abgeschnittenes. In der Küche: ein Stück Brot, eine Scheibe Käse oder eben ein Schnitzel.',
      kategorie: 'essen'
    },
    {
      id: 'fr-021',
      ausdruck: 'Fränggisch',
      hochdeutsch: 'Fränkisch (die Sprache / Mundart)',
      bedeutung: 'Die fränkische Eigenbezeichnung für ihren Dialekt. Franken sind stolz auf ihre Mundart und betonen, dass Fränkisch mit dem Bairischen nichts zu tun hat — trotz der gemeinsamen Verwaltungszugehörigkeit zu Bayern. „Fränggisch" klingt mit dem doppelten „g" und dem weichen Sch ganz anders als Hochdeutsch.',
      beispiel: 'I schwätz fränggisch, ned bayrisch!',
      beispiel_hd: 'Ich spreche fränkisch, nicht bayerisch!',
      kategorie: 'redensart'
    },
    {
      id: 'fr-022',
      ausdruck: 'Sou is des',
      hochdeutsch: 'So ist das / So ist es nun mal',
      bedeutung: 'Eine typisch fränkische Schlussformel, die Resignation oder Bestätigung ausdrückt. Fränkische Gelassenheit in drei Worten — man nimmt die Dinge wie sie kommen. Kann zustimmend gemeint sein, aber auch fatalistisch: Daran lässt sich nun mal nichts ändern.',
      beispiel: 'Der Bus ist wieder zu spät. — Sou is des.',
      beispiel_hd: 'Der Bus ist wieder zu spät. — So ist das.',
      kategorie: 'redensart'
    },
    {
      id: 'fr-023',
      ausdruck: 'Na freilich',
      hochdeutsch: 'Na klar / Selbstverständlich',
      bedeutung: 'Eine kräftige Bejahung, die im Fränkischen wie auch im Bairischen gebräuchlich ist. „Freilich" stammt vom mittelhochdeutschen „vrîlich" (frei, ungehindert) und drückt Selbstverständlichkeit aus. Im Fränkischen oft etwas nüchterner betont als im bayerischen Raum.',
      beispiel: 'Kommst du mit? — Na freilich!',
      beispiel_hd: 'Kommst du mit? — Na klar!',
      kategorie: 'redensart'
    },
    {
      id: 'fr-024',
      ausdruck: 'Heee?',
      hochdeutsch: 'Wie bitte? / Was sagst du?',
      bedeutung: 'Der typisch fränkische Nachfrage-Ausruf, oft gedehnt und mit steigender Intonation. Kann echtes Nichtverstehen signalisieren, aber auch Überraschung oder leichte Empörung. Der Tonfall macht den Unterschied: ein kurzes „He?" ist Nachfrage, ein langes „Heeee?" ist Verwunderung.',
      beispiel: 'Heee? Des hab ich jetzt nedd verstanden!',
      beispiel_hd: 'Wie bitte? Das habe ich jetzt nicht verstanden!',
      kategorie: 'redensart'
    },
    {
      id: 'fr-025',
      ausdruck: 'Krischla',
      hochdeutsch: 'Sauerkirschen / Kirschen',
      bedeutung: 'Die fränkische Bezeichnung für Sauerkirschen oder Kirschen allgemein. Franken ist ein bedeutendes Kirschenanbaugebiet, und die Kirschen spielen eine wichtige Rolle in der regionalen Küche: Kirschwasser, Kirschkuchen, Kirschmarmelade. In der Fränkischen Schweiz gibt es traditionell Kirschenanbau seit Jahrhunderten.',
      beispiel: 'Im Sommer gibt\'s frische Krischla direkt vom Baum.',
      beispiel_hd: 'Im Sommer gibt es frische Kirschen direkt vom Baum.',
      kategorie: 'essen'
    },
    {
      id: 'fr-026',
      ausdruck: 'Zwiebelkuchen',
      hochdeutsch: 'Zwiebelkuchen',
      bedeutung: 'Im Herbst, zur Zeit des neuen Weins (Federweißen), ist Zwiebelkuchen im fränkischen und schwäbisch-alemannischen Raum ein Pflichtprogramm. Der herzhafte Kuchen aus Mürbeteig mit Zwiebeln, Speck und Schmand passt perfekt zum jungen, leicht süßlichen Federweißen. Eine saisonale Tradition in Weinbauregionen.',
      beispiel: 'Im Herbst gibt\'s Zwiebelkuchen mid neuem Wein.',
      beispiel_hd: 'Im Herbst gibt es Zwiebelkuchen mit neuem Wein.',
      kategorie: 'essen'
    },
    {
      id: 'fr-027',
      ausdruck: 'Spitz',
      hochdeutsch: 'Schnapsglas / kleines Stamperl',
      bedeutung: 'Im Fränkischen ist ein „Spitz" ein kleines Glas Schnaps oder Korn — die fränkische Version des bayerischen Stamperls. In Franken gibt es eine lange Tradition von Obstbränden und Tresterbränden, vor allem aus Frankenwein. Ein Spitz nach dem Essen gilt als verdauungsfördernd.',
      beispiel: 'Nach dem Schäuferla noch an Spitz — des muss sein!',
      beispiel_hd: 'Nach dem Schäufele noch ein Schnapsgläschen — das muss sein!',
      kategorie: 'essen'
    },
    {
      id: 'fr-028',
      ausdruck: 'Bub',
      hochdeutsch: 'Junge / Bub',
      bedeutung: 'Die fränkische Bezeichnung für einen Jungen oder jungen Mann, ähnlich dem bayerischen „Bua". Im Fränkischen wird das Wort mit kurzem „u" gesprochen und ist eine freundliche, normale Anrede für Jungen. Auch als väterliche Anrede an einen Sohn oder als Teamnamen unter Männern üblich.',
      beispiel: 'Der Bub is heut brav.',
      beispiel_hd: 'Der Junge ist heute brav.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-029',
      ausdruck: 'Madla',
      hochdeutsch: 'Mädchen',
      bedeutung: 'Die fränkische Diminutivform für Mädchen, ähnlich dem bayerischen „Madl". Im Fränkischen wird die Endung „-la" als Verkleinerungssuffix verwendet, während das Bairische oft „-l" oder „-erl" benutzt. Ein „Madla" ist eine junge Frau oder ein Mädchen — freundlich und ohne abwertenden Unterton.',
      beispiel: 'Die Madla aus unsrer Klass san scho schlau.',
      beispiel_hd: 'Die Mädchen aus unserer Klasse sind schon schlau.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-030',
      ausdruck: 'Dalkert',
      hochdeutsch: 'Trottel / Dummkopf',
      bedeutung: 'Eine fränkische Bezeichnung für einen ungeschickten, tölpelhaften Menschen. Weniger scharf als andere Schimpfwörter, eher humorvoll-tadelnd gemeint. „Du Dalkert!" wird gerne unter Freunden oder in der Familie bei kleinen Missgeschicken benutzt. Das Wort kommt von „dalken" (tölpeln, ungeschickt sein).',
      beispiel: 'Du Dalkert, des Glas hättest du doch net da hinstelln solln!',
      beispiel_hd: 'Du Trottel, das Glas hättest du doch nicht da hinstellen sollen!',
      kategorie: 'schimpf'
    },
    {
      id: 'fr-031',
      ausdruck: 'Dräck',
      hochdeutsch: 'Dreck / Schmutz',
      bedeutung: 'Die fränkische Aussprache von „Dreck", wobei das „e" leicht geöffnet und das „r" gerollt wird. Typisch fränkisch. Kann wörtlich Schmutz bedeuten, aber auch übertragen für Wertloses oder Schlechtes: „Des is doch aller Dräck!" (Das ist doch wertlos!).',
      beispiel: 'Des is doch aller Dräck, was der da erzählt!',
      beispiel_hd: 'Das ist doch alles Unsinn, was der da erzählt!',
      kategorie: 'alltag'
    },
    {
      id: 'fr-032',
      ausdruck: 'Hausdrachen',
      hochdeutsch: 'zänkische Ehefrau / Xanthippe',
      bedeutung: 'Ein fränkischer (und allgemein volkstümlicher) Begriff für eine strenge, zänkische Hausfrau, die ihrem Mann das Leben schwer macht. Der Drachen als mythisches Wesen steht hier für Schrecklichkeit und Unberechenbarkeit. Heute veraltend und sexistisch konnotiert, aber in der regionalen Volkssprache noch bekannt.',
      kategorie: 'schimpf'
    },
    {
      id: 'fr-033',
      ausdruck: 'Schbundl',
      hochdeutsch: 'Schlampige Person / Schluderer',
      bedeutung: 'Im Fränkischen bezeichnet ein „Schbundl" eine unordentliche, schlampige oder liederliche Person. Das Wort klingt derb und wird entsprechend eingesetzt. Es kann auf eine unordentliche Arbeitsweise oder eine nachlässige Erscheinung anspielen. Im Kontext eher eine mittelstarke Beleidigung.',
      kategorie: 'schimpf'
    },
    {
      id: 'fr-034',
      ausdruck: 'Laafm',
      hochdeutsch: 'Laufen / Gehen',
      bedeutung: 'Im Fränkischen wird „gehen" oft durch „laafm" (laufen) ersetzt, ähnlich wie in anderen deutschen Dialekten. „Ich geh laafm" bedeutet nicht, dass man rennt, sondern schlicht, dass man zu Fuß geht. Typisch für viele Dialekte, in denen „laufen" die allgemeine Bedeutung von Fortbewegung hat.',
      beispiel: 'Ich geh in die Stadt laafm.',
      beispiel_hd: 'Ich gehe zu Fuß in die Stadt.',
      kategorie: 'alltag'
    },
    {
      id: 'fr-035',
      ausdruck: 'Houch',
      hochdeutsch: 'Hoch / weit oben',
      bedeutung: 'Die fränkische Aussprache von „hoch", wobei das „o" zu einem offenen „ou" gediphtongiert wird. Ein typisches Beispiel für den fränkischen Vokalismus. „Des is houch oben" beschreibt etwas Hochgelegenes und zeigt die charakteristische Lautverschiebung des Fränkischen.',
      beispiel: 'Die Burg is houch oben auf dem Berg.',
      beispiel_hd: 'Die Burg ist weit oben auf dem Berg.',
      kategorie: 'natur'
    },
    {
      id: 'fr-036',
      ausdruck: 'Seggendorf',
      hochdeutsch: 'Kleines unbedeutendes Dorf / Kaff',
      bedeutung: 'Im Fränkischen steht „Seggendorf" (manchmal auch „Hinterdupfing" o.ä.) scherzhaft für ein kleines, unbedeutendes Dorf irgendwo in der Provinz. Es ist ein Ausdruck für Abgelegenheit und Bedeutungslosigkeit — ein Ort, von dem niemand gehört hat. Heute meist humorvoll eingesetzt.',
      kategorie: 'orte'
    },
    {
      id: 'fr-037',
      ausdruck: 'Maid',
      hochdeutsch: 'Magd / Dienstmädchen',
      bedeutung: 'Veraltet, aber im fränkischen Sprachraum noch bekannt: die „Maid" war das Dienstmädchen oder die Magd auf dem Bauernhof. Im Mittelhochdeutschen bezeichnete „maget" allgemein eine Jungfrau oder unverheiratete Frau. Heute taucht das Wort noch in Flurnamen und Ortsnamen auf.',
      kategorie: 'arbeit'
    },
    {
      id: 'fr-038',
      ausdruck: 'Knecht',
      hochdeutsch: 'Knecht / Geselle / Diener',
      bedeutung: 'Der Knecht war auf dem Bauernhof der männliche Arbeiter, das Pendant zur Maid. Im handwerklichen Bereich ist ein Geselle manchmal noch „Knecht" in alten Ausdrücken. Das Wort lebt fort in Figuren wie dem Knecht Ruprecht (Begleiter des Nikolaus), der im fränkischen Brauchtum eine wichtige Rolle spielt.',
      kategorie: 'arbeit'
    },
    {
      id: 'fr-039',
      ausdruck: 'Hafenmarkt',
      hochdeutsch: 'Töpfermarkt / Markt am Hafen',
      bedeutung: 'Der Hafenmarkt in Würzburg am Main ist ein historischer Marktplatz, wo früher Töpferwaren (Hafen = Töpfe) gehandelt wurden. Solche Märkte waren im fränkischen Raum zentral für das Wirtschaftsleben. In Würzburg ist der Bereich am Main heute ein beliebter Treffpunkt und Veranstaltungsort.',
      kategorie: 'orte'
    },
    {
      id: 'fr-040',
      ausdruck: 'Christkindlesmarkt',
      hochdeutsch: 'Nürnberger Christkindlesmarkt',
      bedeutung: 'Der Nürnberger Christkindlesmarkt ist einer der bekanntesten und ältesten Weihnachtsmärkte der Welt, urkundlich erwähnt seit 1628. Das Christkind als Marktöffnerin — eine blonde, gekrönte Figur — ist ein Nürnberger Alleinstellungsmerkmal. Der Markt auf dem Hauptmarkt zieht jährlich zwei Millionen Besucher an.',
      beispiel: 'Auf\'m Christkindlesmarkt gibt\'s Glühwein und Lebkuchen.',
      beispiel_hd: 'Auf dem Christkindlesmarkt gibt es Glühwein und Lebkuchen.',
      kategorie: 'musik'
    },
    {
      id: 'fr-041',
      ausdruck: 'Hans Sachs',
      hochdeutsch: 'Hans Sachs (Meistersinger)',
      bedeutung: 'Hans Sachs (1494–1576) war der berühmteste Nürnberger Meistersinger, Schuhmacher und Dichter. Er schrieb über 6.000 Meisterlieder, Spruchdichtungen und Schwänke. Richard Wagner verewigt ihn in der Oper „Die Meistersinger von Nürnberg" (1868). Sachs ist ein Sinnbild für fränkische Bürgerlichkeit, Kunstsinn und Handwerk.',
      kategorie: 'musik'
    },
    {
      id: 'fr-042',
      ausdruck: 'Dürer',
      hochdeutsch: 'Albrecht Dürer (Maler und Humanist)',
      bedeutung: 'Albrecht Dürer (1471–1528) ist Nürnbergs berühmtester Sohn: Maler, Zeichner, Kupferstecher und Humanist. Sein Selbstbildnis von 1500 gehört zu den ikonischsten Werken der Kunstgeschichte. Dürers Geburtshaus steht noch heute in der Nürnberger Altstadt und ist ein Pflichtbesuch. Er verbindet die fränkische Bürgerkultur mit dem Geist der Renaissance.',
      kategorie: 'musik'
    },
    {
      id: 'fr-043',
      ausdruck: 'Reichstädter',
      hochdeutsch: 'Bürger der Freien Reichsstadt',
      bedeutung: 'Ein Bewohner der Freien Reichsstadt Nürnberg, der direkt dem Kaiser und nicht einem Landesfürsten unterstand. Nürnberg war bis 1806 eine der bedeutendsten Freien Reichsstädte. Die reichsstädtische Tradition prägt noch heute den Nürnberger Bürgerstolz und das Selbstbewusstsein der fränkischen Metropole.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-044',
      ausdruck: 'Frankenalb',
      hochdeutsch: 'Fränkische Alb / Fränkische Schweiz',
      bedeutung: 'Die Fränkische Alb ist eine Kalksteinlandschaft im Norden Bayerns mit Tälern, Höhlen, Burgen und typischen Wacholderheiden. Die Fränkische Schweiz um Pottenstein, Tüchersfeld und Gößweinstein ist besonders bekannt. Mit der höchsten Brauereidichte der Welt und unzähligen Wanderwegen ist sie ein Paradies für Naturfreunde.',
      beispiel: 'In der Frankenalb gibt\'s die schenschden Wanderwege.',
      beispiel_hd: 'In der Fränkischen Alb gibt es die schönsten Wanderwege.',
      kategorie: 'natur'
    },
    {
      id: 'fr-045',
      ausdruck: 'Altmühltal',
      hochdeutsch: 'Altmühltal (Flusslandschaft)',
      bedeutung: 'Das Altmühltal ist eine der schönsten Flusslandschaften Frankens, wo die Altmühl durch tiefe Kalksteintäler mäandert. Der Altmühltal-Radweg zählt zu Deutschlands beliebtesten Fahrradrouten. Solnhofener Kalkplatten, auf denen Archaeopteryx-Fossilien gefunden wurden, stammen aus dieser Region. Das Tal verbindet Naturschönheit mit geologischer Geschichte.',
      beispiel: 'Im Altmühltal Rad fahren mit der ganzen Familie — des is Urlaub!',
      beispiel_hd: 'Im Altmühltal Rad fahren mit der ganzen Familie — das ist Urlaub!',
      kategorie: 'natur'
    },
    {
      id: 'fr-046',
      ausdruck: 'Schäuferla',
      hochdeutsch: 'Schäufele (Schweineschulter mit Knochen)',
      bedeutung: 'Das Schäuferla (oder Schäufele) ist das Nationalgericht Frankens — eine langsam im Ofen gegarte Schweineschulter mit knuspriger Kruste, serviert mit Kloß und Sauerkraut oder Blaukraut. Der Name kommt von der Form des Schulterblatts, das an eine kleine Schaufel erinnert. Kein Kirchweih, kein Familienfest ohne Schäuferla. In jedem fränkischen Gasthof steht es auf der Karte — und jeder Wirt behauptet, das beste zu servieren.',
      beispiel: 'A Schäuferla mit Kloß — des is fränkische Seelenküche.',
      beispiel_hd: 'Ein Schäufele mit Kloß — das ist fränkische Seelenküche.',
      kategorie: 'essen'
    },
    {
      id: 'fr-047',
      ausdruck: 'Zeidler',
      hochdeutsch: 'Imker / Waldbienenpfleger (historisch)',
      bedeutung: 'Der „Zeidler" war im mittelalterlichen Franken ein Waldbienen-Imker: Er kletterte auf Bäume, um wilden Bienen Honig abzunehmen und pflegte Bienenstöcke im Wald. Das Zeidlerwesen war ein angesehenes Handwerk mit eigenen Zünften und Rechten. Nürnberg war das Zentrum des deutschen Zeidlerwesens — die Reichsstadt verlieh den Zeidlern besondere Privilegien. Heute erinnert das Zeidlermuseum in Feucht bei Nürnberg an dieses fast vergessene Handwerk.',
      beispiel: 'Der Zeidler klettert auf Bäume, um den Honigsegen der Wildbiena zu ernten.',
      beispiel_hd: 'Der Imker klettert auf Bäume, um den Honig der Wildbienen zu ernten.',
      kategorie: 'arbeit'
    },
    {
      id: 'fr-048',
      ausdruck: 'Kirchweih',
      hochdeutsch: 'Kirchweihfest / Kärwa / Dorfkirmes',
      bedeutung: 'Die Kirchweih (fränkisch: „Kärwa") ist das wichtigste Dorffest Frankens — ursprünglich die jährliche Feier zum Jahrestag der Kirchenweihe, heute mehrtägiges Volksfest mit Bierzelt, Karussell, Volksmusik und traditionellen Speisen. Im September und Oktober finden tausende Kirchweihfeste statt — jedes Dorf hat seine eigene. Das Schäuferla, der Kloß und der Frankenwein sind Pflichtbestandteile. „Nürnberger Altstadtfest" und „Erlanger Bergkirchweih" sind die berühmtesten.',
      beispiel: 'Zur Kärwa kummt die ganze Familie zamm — des isch Tradition.',
      beispiel_hd: 'Zur Kirchweih kommt die ganze Familie zusammen — das ist Tradition.',
      kategorie: 'redensart'
    },
    {
      id: 'fr-049',
      ausdruck: 'Mee',
      hochdeutsch: 'Mehr',
      bedeutung: '„Mee" ist die fränkische Form von „mehr" — ein kleines Wort mit großem Charakter. Im Fränkischen klingt das Hochdeutsch weicher, gedehnte Vokale treten an die Stelle scharfer Konsonanten. „Willste noch a mee?" (Möchtest du noch etwas mehr?) ist eine typische Gastfrage am fränkischen Esstisch. Das Wort steht exemplarisch für die sanfte Melodie des Fränkischen, die oft als freundlicher und weniger hart klingt als andere süddeutsche Dialekte.',
      beispiel: 'Magst du noch a mee Bier, oder host gnua?',
      beispiel_hd: 'Möchtest du noch ein weiteres Bier, oder hast du genug?',
      kategorie: 'alltag'
    },
    {
      id: 'fr-050',
      ausdruck: 'Fränkische Schweiz',
      hochdeutsch: 'Fränkische Schweiz (Landschaft in Oberfranken)',
      bedeutung: 'Die Fränkische Schweiz ist eine Kalksteinlandschaft in Oberfranken zwischen Forchheim, Bayreuth und Bamberg — benannt nach der Schweiz wegen ihrer zerklüfteten Felslandschaft. Sie gilt als Region mit der höchsten Brauereidichte der Welt: Auf engstem Raum gibt es über 200 Brauereien. Burgen, Höhlen (Teufelshöhle, Sophienhöhle), Kletterfelsen und idyllische Täler machen sie zum Wanderparadies. Im Herbst leuchten Hopfengärten in Goldgelb.',
      beispiel: 'In der Fränkische Schweiz gibt\'s an jeder Ecke a neue Brauerei.',
      beispiel_hd: 'In der Fränkischen Schweiz gibt es an jeder Ecke eine neue Brauerei.',
      kategorie: 'natur'
    },
    {
      id: 'fr-051',
      ausdruck: '1. FC Nürnberg',
      hochdeutsch: '1. FC Nürnberg (Fußballverein „Der Club")',
      bedeutung: 'Der 1. FC Nürnberg, liebevoll „Der Club" genannt, ist Frankens bekanntester Fußballverein — gegründet 1900, neunmaliger deutscher Meister (allerdings der letzte Titel von 1968). Heimstadion: das Max-Morlock-Stadion. Spieler wie Max Morlock und Stefan Reuter sind Vereinslegenden. Der Club hat zwar viele Auf- und Abstiege erlebt, bleibt aber Identitätskern Nürnbergs. „Auf gehts, Glubb!" ist der fränkische Schlachtruf.',
      beispiel: 'Mein Opa ist sein Lebn lang Club-Fan gewesn — durch dick und dünn.',
      beispiel_hd: 'Mein Opa ist sein Leben lang Club-Fan gewesen — durch dick und dünn.',
      kategorie: 'sport'
    },
    {
      id: 'fr-052',
      ausdruck: 'Bratwurst-Glöckle',
      hochdeutsch: 'Berühmte Nürnberger Bratwursthütte',
      bedeutung: 'Die „Bratwurst-Glöckle" ist eine traditionelle Bratwursthütte direkt unter dem Glockenturm der Sebalduskirche in Nürnberg. Seit 1313 (!) werden hier Nürnberger Rostbratwürste gegrillt — eine der ältesten Imbisstraditionen der Welt. Drei oder sechs der kleinen Würstchen im Zinnschälchen mit Sauerkraut sind Kult. Generationen von Nürnbergern und Touristen haben hier ihr Bratwurst-Erlebnis. Eine echte Nürnberger Institution.',
      beispiel: 'Im Bratwurst-Glöckle haben schon Kaiser gegessen!',
      beispiel_hd: 'Im Bratwurst-Glöckle haben schon Kaiser gegessen!',
      kategorie: 'essen'
    },
    {
      id: 'fr-053',
      ausdruck: 'Kaiserburg',
      hochdeutsch: 'Nürnberger Kaiserburg',
      bedeutung: 'Die Nürnberger Kaiserburg thront über der Altstadt — eine der bedeutendsten Reichsburgen des Heiligen Römischen Reiches. Seit dem 11. Jahrhundert empfingen hier Kaiser und Könige (insgesamt 33 Kaiser von Konrad III. bis Karl V.) Gäste. Der Sinwellturm (Bergfried, 1200) und die Doppelkapelle sind Highlights. Der tiefe Burgbrunnen mit 50 Metern ist eine technische Meisterleistung. Heute Museum und Wahrzeichen Nürnbergs.',
      beispiel: 'Auf der Kaiserburg kannst du die Schätze vergangener Zeiten sehn.',
      beispiel_hd: 'Auf der Kaiserburg kannst du die Schätze vergangener Zeiten sehen.',
      kategorie: 'orte'
    },
    {
      id: 'fr-054',
      ausdruck: 'Wagner',
      hochdeutsch: 'Richard Wagner (Bayreuther Festspiele)',
      bedeutung: 'Richard Wagner (1813–1883) wählte das fränkische Bayreuth als Standort für sein Festspielhaus — das einzige Theater der Welt, das nur für seine Werke gebaut wurde. Seit 1876 finden hier die Bayreuther Festspiele statt — das wichtigste Wagner-Festival weltweit. Tickets sind 10 Jahre im Voraus ausgebucht. „Tannhäuser", „Tristan und Isolde", „Der Ring des Nibelungen" werden hier in einzigartiger Akustik aufgeführt. Wagner-Pilgerstätte.',
      beispiel: 'Ein Wagner in Bayreuth zu erleben — des is ein Lebensziel für Klassikfans.',
      beispiel_hd: 'Ein Wagner in Bayreuth zu erleben — das ist ein Lebensziel für Klassikfans.',
      kategorie: 'musik'
    },
    {
      id: 'fr-055',
      ausdruck: 'Bayreuther Festspielhaus',
      hochdeutsch: 'Bayreuther Festspielhaus (Wagner-Theater)',
      bedeutung: 'Das Bayreuther Festspielhaus auf dem Grünen Hügel — 1876 nach Wagners Plänen erbaut — ist ein architektonisches Unikat: Der Orchestergraben ist verdeckt, die Akustik ist unvergleichlich, die Sitze sind hölzern und unbequem (Wagner wollte keinen Komfort, der vom Werk ablenkt). Tickets werden über eine Warteliste vergeben — Geduld von 10+ Jahren ist nötig. Eines der spirituellsten Theatererlebnisse der Welt.',
      beispiel: 'Im Bayreuther Festspielhaus sitzt mer 4 Stunden auf hartem Holz — und liebts.',
      beispiel_hd: 'Im Bayreuther Festspielhaus sitzt man 4 Stunden auf hartem Holz — und liebt es.',
      kategorie: 'orte'
    },
    {
      id: 'fr-056',
      ausdruck: 'Würzburg',
      hochdeutsch: 'Würzburg (Stadt am Main, UNESCO-Welterbe)',
      bedeutung: 'Würzburg ist die fränkische Universitätsstadt am Main — bekannt für die Residenz (UNESCO-Welterbe, Tiepolo-Fresko), die Festung Marienberg auf dem Berg, die Alte Mainbrücke mit Heiligenstatuen und die Würzburger Weine. Mit 130.000 Einwohnern eine charmante Mittelstadt. Im Zweiten Weltkrieg fast komplett zerstört, dann mit großem Aufwand wieder aufgebaut. Die Universität gehört zu den ältesten in Deutschland.',
      beispiel: 'In Würzburg trinkst du Frankenwein auf der Alten Brück — herrlich!',
      beispiel_hd: 'In Würzburg trinkst du Frankenwein auf der Alten Brücke — herrlich!',
      kategorie: 'orte'
    },
    {
      id: 'fr-057',
      ausdruck: 'Residenz',
      hochdeutsch: 'Würzburger Residenz (UNESCO-Welterbe)',
      bedeutung: 'Die Würzburger Residenz ist eines der bedeutendsten Schlösser des Barock — erbaut 1720–1744 von Balthasar Neumann für die Würzburger Fürstbischöfe. Das Treppenhaus mit dem 600 m² großen Deckenfresko von Giovanni Battista Tiepolo gilt als bedeutendstes Deckengemälde der Welt. Seit 1981 UNESCO-Welterbe. Im Krieg schwer zerstört, das Fresko überlebte wundersamerweise. Heute eines der meistbesuchten Schlösser Deutschlands.',
      beispiel: 'Tiepolos Fresko in der Würzburger Residenz isch Weltklasse.',
      beispiel_hd: 'Tiepolos Fresko in der Würzburger Residenz ist Weltklasse.',
      kategorie: 'orte'
    },
    {
      id: 'fr-058',
      ausdruck: 'Coburg',
      hochdeutsch: 'Coburg (Stadt in Oberfranken)',
      bedeutung: 'Coburg ist eine historische Residenzstadt in Oberfranken — bis 1918 Hauptstadt des Herzogtums Sachsen-Coburg-Gotha. Die Veste Coburg, „Fränkische Krone", ist eine der größten Burgen Deutschlands. Coburg ist berühmt für seine Beziehung zum europäischen Hochadel: Prinz Albert (Coburg) heiratete Königin Victoria, womit die Coburger weltweit verbreitet wurden. Heute fragwürdig: AfD-Stadt. Aber historisch und kulturell bedeutend.',
      beispiel: 'Auf der Veste Coburg lebte Martin Luther a Zeit lang.',
      beispiel_hd: 'Auf der Veste Coburg lebte Martin Luther eine Zeit lang.',
      kategorie: 'orte'
    },
    {
      id: 'fr-059',
      ausdruck: 'Bocksbeutel',
      hochdeutsch: 'Bocksbeutel (Frankenwein-Flasche)',
      bedeutung: 'Der Bocksbeutel ist die charakteristische bauchig-flache Weinflasche des Frankenweins — eine geschützte Flaschenform, die ausschließlich für fränkische Qualitätsweine reserviert ist. Die Form geht auf das mittelalterliche Trinkgefäß zurück. Mit 0,75 Liter Inhalt steht der Bocksbeutel für Frankenwein-Tradition — Silvaner, Müller-Thurgau, Bacchus. Im Bocksbeutel-Stadl-Restaurant in Würzburg ist es Heimstatt der fränkischen Weinkultur.',
      beispiel: 'En guter Frankenwein muss im Bocksbeutel sein — sonst isses ka echter.',
      beispiel_hd: 'Ein guter Frankenwein muss im Bocksbeutel sein — sonst ist es keiner echter.',
      kategorie: 'essen'
    },
    {
      id: 'fr-060',
      ausdruck: 'Silvaner',
      hochdeutsch: 'Silvaner (Frankenwein-Rebsorte)',
      bedeutung: 'Der Silvaner ist die klassische Frankenwein-Rebsorte — bereits 1659 erstmals in Franken urkundlich erwähnt. Würzig, mineralisch, mit Nuancen von Birne und Heu. Die fränkischen Weingüter im Maintal (Castell, Bürgerspital Würzburg, Iphofen) produzieren weltbekannte Silvaner. Im Bocksbeutel wird er traditionell serviert. Mit der GG-Klassifikation (Grosses Gewächs) zählt er zu Deutschlands Spitzenweinen. Pasta-Begleiter par excellence.',
      beispiel: 'En trockner Silvaner zu Spargel — fränkischer Frühlingsgenuss.',
      beispiel_hd: 'Ein trockener Silvaner zu Spargel — fränkischer Frühlingsgenuss.',
      kategorie: 'essen'
    },
    {
      id: 'fr-061',
      ausdruck: 'Rauchbier',
      hochdeutsch: 'Rauchbier (Bamberger Spezialität)',
      bedeutung: 'Rauchbier ist eine Bamberger Bierspezialität — das Malz wird über Buchenholz-Feuer geräuchert, was dem Bier einen unverwechselbaren Rauchgeschmack verleiht. Die Brauerei Schlenkerla in der Bamberger Altstadt braut das berühmteste Rauchbier seit 1405 (!). Der Geschmack ist gewöhnungsbedürftig — manche finden ihn an Schinken erinnernd. Wer einmal hängengeblieben ist, kann nicht mehr ohne.',
      beispiel: 'Schlenkerla-Rauchbier in Bamberg — fränkisches Bier-Unikum.',
      beispiel_hd: 'Schlenkerla-Rauchbier in Bamberg — fränkisches Bier-Unikum.',
      kategorie: 'essen'
    },
    {
      id: 'fr-062',
      ausdruck: 'Kellerbier',
      hochdeutsch: 'Kellerbier (Fränkische Bierspezialität)',
      bedeutung: 'Kellerbier ist ein ungespundetes, naturtrübes Bier, das direkt vom Brauereikeller serviert wird — ein urfränkischer Klassiker. Vor allem in den Bierkellern der Fränkischen Schweiz (Forchheim, Bamberg) wird Kellerbier im Holzfass gelagert und im Biergarten direkt aus dem Keller serviert. Niedrige Säure, sanft moussierend, mit einem leicht hefigen Geschmack. Beste Begleitung: ein Schäuferla.',
      beispiel: 'Auf\'m Forchheimer Kellerwald a Kellerbier — Frankenglück pur.',
      beispiel_hd: 'Auf dem Forchheimer Kellerwald ein Kellerbier — Frankenglück pur.',
      kategorie: 'essen'
    },
    {
      id: 'fr-063',
      ausdruck: 'Ungespundeter',
      hochdeutsch: 'Ungespundetes Bier (Fasskeller-Bier)',
      bedeutung: '„Ungespundeter" ist ein nicht-pressurisiertes Bier, das direkt aus dem offenen Holzfass im Keller serviert wird — daher milder und weicher als modernes Bier mit künstlicher Kohlensäure. Diese fränkische Brautradition wird in den Kellerwäldern um Bamberg und Forchheim noch heute gepflegt. „En Seidla Ungespundeter" zu einem Schäufela oder einem Wurstbrot ist fränkische Esskultur in Reinform.',
      beispiel: 'Noch en Seidla Ungespundeter, biddscheen.',
      beispiel_hd: 'Noch ein Krug Kellerbier, bitte.',
      kategorie: 'essen'
    },
    {
      id: 'fr-064',
      ausdruck: 'Erlanger Bergkirchweih',
      hochdeutsch: 'Bergkirchweih (zweitältestes Volksfest Bayerns)',
      bedeutung: 'Die Erlanger Bergkirchweih, im Volksmund „Berg", ist mit über 1,5 Millionen Besuchern eines der größten Bierfeste in Süddeutschland — nach dem Oktoberfest. Sie findet seit 1755 jährlich Pfingsten im Erlanger Burgberg statt. Auf dem Berg gibt es Bierkeller (alle ungespundet!), Brotzeit, Karussells und einen besonderen volksnahen Charakter. Vom Tisch aus genießt man die Aussicht über Erlangen.',
      beispiel: 'Auf de Berg geht jeder Erlanger — Pflichttermin im Juni.',
      beispiel_hd: 'Auf den Berg geht jeder Erlanger — Pflichttermin im Juni.',
      kategorie: 'redensart'
    },
    {
      id: 'fr-065',
      ausdruck: 'Lebkuchen-Schmidt',
      hochdeutsch: 'Nürnberger Lebkuchen-Hersteller',
      bedeutung: 'Lebkuchen-Schmidt aus Nürnberg ist die wohl bekannteste Marke für Nürnberger Elisenlebkuchen — gegründet 1927. Die handsignierten Lebkuchendosen, die rechtzeitig zur Weihnachtszeit deutschlandweit verschickt werden, sind Kult. Echte Nürnberger Elisenlebkuchen müssen mindestens 25% Nüsse enthalten, viel höher als gewöhnliche Lebkuchen. Die Tradition geht auf das mittelalterliche Nürnberg zurück — Honig, Gewürze und Klosterrezepte.',
      beispiel: 'Zu Weihnachten gibts a Dose Lebkuchen-Schmidt von der Oma.',
      beispiel_hd: 'Zu Weihnachten gibt es eine Dose Lebkuchen-Schmidt von der Oma.',
      kategorie: 'essen'
    },
    {
      id: 'fr-066',
      ausdruck: 'Christkind',
      hochdeutsch: 'Nürnberger Christkind (Marktöffner)',
      bedeutung: 'Das Nürnberger Christkind ist eine alle zwei Jahre neu gewählte Jugendliche (16-19 Jahre alt) aus Nürnberg, die als blond-gelocktes Christkind mit goldener Krone und weiß-goldenem Gewand den weltberühmten Christkindlesmarkt eröffnet. Eine Nürnberger Tradition seit 1948. Die Wahl ist hoch begehrt — tausende Mädchen bewerben sich. Das Christkind verkündet vom Balkon der Frauenkirche den Prolog: „Ihr Männer und Frauen ...".',
      beispiel: 'Wenn s\'Christkind den Prolog spricht, beginnt für uns Weihnachten.',
      beispiel_hd: 'Wenn das Christkind den Prolog spricht, beginnt für uns Weihnachten.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-067',
      ausdruck: 'Käthe Wohlfahrt',
      hochdeutsch: 'Rothenburger Weihnachtsdorf',
      bedeutung: 'Das Käthe Wohlfahrt Weihnachtsdorf in Rothenburg ob der Tauber ist eine fränkische Tourismusattraktion — ein riesiges Geschäft für Weihnachtsschmuck und -figuren, geöffnet das ganze Jahr. Gegründet 1964, ist es ein Pilgerort für deutsch-amerikanische Touristen und Asiaten. Die handgeschnitzten Schwibbögen, Räuchermännchen und Christbaumkugeln sind Souvenirs aus „echtem Deutschland". Käthe Wohlfahrt verkörpert deutsche Weihnachts-Romantik weltweit.',
      beispiel: 'In Rothenburg findest du Käthe Wohlfahrt — Weihnachten im Juli!',
      beispiel_hd: 'In Rothenburg findest du Käthe Wohlfahrt — Weihnachten im Juli!',
      kategorie: 'orte'
    },
    {
      id: 'fr-068',
      ausdruck: 'Rothenburg',
      hochdeutsch: 'Rothenburg ob der Tauber',
      bedeutung: 'Rothenburg ob der Tauber ist die wohl meistphotographierte Stadt Deutschlands — eine fast vollständig erhaltene mittelalterliche Stadt mit ihrer Stadtmauer, Türmen, Toren und Fachwerkhäusern. Im Krieg sollte sie zerstört werden, wurde aber durch einen amerikanischen Generalsdiplomatisches Geschick gerettet. Heute Pilgerstätte japanischer und amerikanischer Touristen. Burgermeisters-Trunk-Legende und Schneeballen sind weitere Markenzeichen.',
      beispiel: 'In Rothenburg fühlsts du dich wie im Mittelalter — krass!',
      beispiel_hd: 'In Rothenburg fühlst du dich wie im Mittelalter — krass!',
      kategorie: 'orte'
    },
    {
      id: 'fr-069',
      ausdruck: 'Lederhosn-Wandern',
      hochdeutsch: 'Fränkische Wanderkultur (oft in Tracht)',
      bedeutung: 'In Franken wird auch beim Wandern oft Tracht getragen — Lederhose oder Trachtenrock, Wadenstrümpfe und Hut. Die fränkischen Wandervereine pflegen diese Tradition besonders im Frankenwald, der Fränkischen Schweiz und der Frankenalb. Wandern ist hier Pflicht — bei jedem Wetter, mit Brotzeit und einem Schluck Frankenwein. Auf den Bierkellern und Brotzeitstationen am Wanderweg trifft sich die fränkische Gemeinschaft.',
      beispiel: 'In der Fränkischen Schweiz wandern manche noch in Lederhosn.',
      beispiel_hd: 'In der Fränkischen Schweiz wandern manche noch in Lederhose.',
      kategorie: 'sport'
    },
    {
      id: 'fr-070',
      ausdruck: 'Walberla',
      hochdeutsch: 'Walberla (Berg in der Fränk. Schweiz)',
      bedeutung: 'Das Walberla ist der bekannteste Berg der Fränkischen Schweiz — eine 532 m hohe Kalkstein-Tafelbergkuppe mit der Walpurgis-Kapelle. Jedes Jahr Anfang Mai findet hier das traditionelle „Walberla-Fest" statt — Wallfahrt und Volksfest in einem. Familien aus ganz Mittelfranken pilgern auf den Berg, oft in Tracht, und feiern den Frühlingsbeginn mit Bier und Brotzeit. Eine echt fränkische Tradition.',
      beispiel: 'Aufs Walberla pilgern d\'Erlanger jedes Jahr im Mai.',
      beispiel_hd: 'Aufs Walberla pilgern die Erlanger jedes Jahr im Mai.',
      kategorie: 'natur'
    },
    {
      id: 'fr-071',
      ausdruck: 'Schorsch',
      hochdeutsch: 'Kosename für Georg (fränkisch typisch)',
      bedeutung: '„Schorsch" ist im Fränkischen (und Hessischen, Pfälzischen) die volkstümliche Form von Georg — sehr verbreitet als Vorname und Spitzname. „Schorsch" klingt herzlich, bodenständig, typisch fränkisch. In Franken kennt jeder einen Schorsch. Der Name hat eine fast komödiantische Qualität — perfekt für Geschichten und Witze. Schorsch Glanzberger und Schorsch Glanzler sind klassische fränkische Namensformen.',
      beispiel: 'Mein Onkel Schorsch ist a echter Franke — und a Original!',
      beispiel_hd: 'Mein Onkel Georg ist ein echter Franke — und ein Original!',
      kategorie: 'familie'
    },
    {
      id: 'fr-072',
      ausdruck: 'Mariendarstellung',
      hochdeutsch: 'Maria mit Kind (fränkische Kunst)',
      bedeutung: 'Die Mariendarstellung ist ein Hauptmotiv der fränkischen Kunst — Tilman Riemenschneider (1460–1531) aus Heiligenstadt schuf in Würzburg unvergleichliche Mariendarstellungen aus Holz und Stein. Seine Schnitzwerke in der Marienkapelle (Würzburg), der Herrgottskirche (Creglingen) und vielen fränkischen Kirchen sind Meisterwerke der spätmittelalterlichen Bildhauerkunst. Riemenschneider gilt als wichtigster deutscher Bildhauer seiner Zeit.',
      beispiel: 'Riemenschneider-Madonnen — fränkische Kunstweltklasse.',
      beispiel_hd: 'Riemenschneider-Madonnen — fränkische Kunstweltklasse.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-073',
      ausdruck: 'Pegnitz',
      hochdeutsch: 'Pegnitz (Fluss durch Nürnberg)',
      bedeutung: 'Die Pegnitz ist Nürnbergs Fluss — sie durchquert die Altstadt und teilt sie in Sankt Sebald (Nordstadt) und Sankt Lorenz (Südstadt). Beide Stadtteile haben jeweils ihre eigene Kirche. Berühmt: die Pegnitzbrücken wie die Maxbrücke und der Henkersteg. Die Pegnitz mündet später in die Regnitz und damit über den Main in den Rhein. Das Pegnitzufer ist Lieblings-Spaziergang der Nürnberger.',
      beispiel: 'An der Pegnitz spazieren — Nürnberg von seiner schönsten Seite.',
      beispiel_hd: 'An der Pegnitz spazieren — Nürnberg von seiner schönsten Seite.',
      kategorie: 'natur'
    },
    {
      id: 'fr-074',
      ausdruck: 'Glubb',
      hochdeutsch: 'Spitzname für 1. FC Nürnberg',
      bedeutung: '„Der Glubb" ist die liebevolle fränkische Bezeichnung für den 1. FC Nürnberg — vom Wort „Club" mit dem typisch fränkischen „g" am Anfang. Fans rufen „Auf gehts, Glubb!" und die Vereinszeitschrift heißt „Glubb-Zeitung". Der Name unterstreicht die unverwechselbar fränkische Identität des Vereins — kein Plastikclub, sondern eine Familie mit über 120 Jahren Geschichte. Wer „Glubb" sagt, ist Insider.',
      beispiel: 'Glubb-Fan in dritter Generation — des is Familie!',
      beispiel_hd: 'Glubb-Fan in dritter Generation — das ist Familie!',
      kategorie: 'sport'
    },
    {
      id: 'fr-075',
      ausdruck: 'Würschdla',
      hochdeutsch: 'Würstchen (Verkleinerungsform)',
      bedeutung: '„Würschdla" sind die fränkischen Würstchen — vor allem die berühmten Nürnberger Bratwürstchen, kleiner und feiner als andere deutsche Würste. Das fränkische Diminutiv „-la" (statt „-lein") macht das Wort verniedlicht und liebevoll. Auch „Bratwürschdla" oder „Wirschdla" gehören in den Wortschatz. Drei Bratwürschdla auf Sauerkraut sind die klassische fränkische Mahlzeit — schnell, lecker, traditionell.',
      beispiel: 'Sechs Würschdla mit Senf, biddscheen.',
      beispiel_hd: 'Sechs Würstchen mit Senf, bitte.',
      kategorie: 'essen'
    },
    {
      id: 'fr-076',
      ausdruck: 'Erlangen',
      hochdeutsch: 'Erlangen (Universitätsstadt)',
      bedeutung: 'Erlangen ist eine 116.000-Einwohner-Universitätsstadt im Mittelfränkischen. Sitz der Friedrich-Alexander-Universität und großer Standort der Siemens AG. Bekannt: die barocke Hugenotten-Altstadt (Schloss, Schlossgarten), die Bergkirchweih und der Schlossgarten-Konzerte. Hat eine der höchsten Akademiker-Quoten Deutschlands. Innovativ und gleichzeitig fränkisch-bodenständig.',
      beispiel: 'In Erlangen forsche se bei Siemens an die Zukunft.',
      beispiel_hd: 'In Erlangen forschen sie bei Siemens an der Zukunft.',
      kategorie: 'orte'
    },
    {
      id: 'fr-077',
      ausdruck: 'Forchheim',
      hochdeutsch: 'Forchheim (Tor zur Fränkischen Schweiz)',
      bedeutung: 'Forchheim mit 32.000 Einwohnern ist Tor zur Fränkischen Schweiz und hat das wohl höchste Bierkeller-Aufkommen Deutschlands — der „Kellerwald" mit über 20 traditionellen Bierkellern unter Eichen. Die Annafest im Juli, eines der ältesten Volksfeste Bayerns. Schöne Fachwerk-Altstadt mit Rathaus und Kaiserpfalz. Bier-Pilgerort der Frankenliebhaber.',
      beispiel: 'Im Forchheimer Kellerwald a Seidla — Frankenglück pur.',
      beispiel_hd: 'Im Forchheimer Kellerwald ein Krug Bier — Frankenglück pur.',
      kategorie: 'orte'
    },
    {
      id: 'fr-078',
      ausdruck: 'Bayreuth',
      hochdeutsch: 'Bayreuth (Wagner-Stadt)',
      bedeutung: 'Bayreuth mit 73.000 Einwohnern ist die Wagner-Stadt schlechthin — Sitz der Bayreuther Festspiele seit 1876. Auch sonst kulturhistorisch reich: das Markgräfliche Opernhaus (UNESCO-Welterbe), das Eremitage-Schloss der Markgräfin Wilhelmine. Universität Bayreuth ist jung und innovativ. Liegt im Bayreuther Land, einer hügeligen Landschaft Oberfrankens.',
      beispiel: 'Bayreuth lebt jedes Jahr im Sommer vom Wagner-Festival.',
      beispiel_hd: 'Bayreuth lebt jedes Jahr im Sommer vom Wagner-Festival.',
      kategorie: 'orte'
    },
    {
      id: 'fr-079',
      ausdruck: 'Hof',
      hochdeutsch: 'Hof (Stadt im Frankenwald)',
      bedeutung: 'Hof an der Saale mit 47.000 Einwohnern ist die nordöstlichste Stadt Bayerns — direkt an der Grenze zu Sachsen und Thüringen. Bekannt: die Internationalen Hofer Filmtage (Mai), eines der wichtigsten deutschen Filmfestivals. Die Stadt ist klimatisch rauer als das übrige Franken („Bayerisch Sibirien"). Industriestadt mit Strukturwandel-Geschichte.',
      beispiel: 'Hof is das Tor zum Frankenwald — und manchmal a a bissle eiskalt.',
      beispiel_hd: 'Hof ist das Tor zum Frankenwald — und manchmal auch ein bisschen eiskalt.',
      kategorie: 'orte'
    },
    {
      id: 'fr-080',
      ausdruck: 'Schweinfurt',
      hochdeutsch: 'Schweinfurt (Industriestadt am Main)',
      bedeutung: 'Schweinfurt mit 54.000 Einwohnern ist Industriestandort der Wälzlagerindustrie (SKF, FAG, Schaeffler) — Weltmarkt. Im Zweiten Weltkrieg massiv bombardiert wegen der Kugellager-Produktion. Geburtsstadt von Friedrich Rückert (Dichter). Heimat der Bratwurst „Schweinfurter Bratworscht". Echtes Arbeiter-Franken am Main.',
      beispiel: 'In Schweinfurt baun se die Wälzlager für die ganz Welt.',
      beispiel_hd: 'In Schweinfurt bauen sie die Wälzlager für die ganze Welt.',
      kategorie: 'orte'
    },
    {
      id: 'fr-081',
      ausdruck: 'Aschaffenburg',
      hochdeutsch: 'Aschaffenburg („Bayerisches Nizza")',
      bedeutung: 'Aschaffenburg mit 71.000 Einwohnern liegt im Nordwesten Bayerns am Main, fast schon hessische Grenze. Bekannt als „Bayerisches Nizza" wegen des milden Klimas. Berühmt: Schloss Johannisburg (Renaissance), das Pompejanum (Ludwig I. ließ ein römisches Haus nachbauen). Mischzone zwischen fränkischem und hessischem Dialekt. Industrie- und Bildungsstadt.',
      beispiel: 'Aschaffenburg nennt mer\'s Bayrische Nizza — wegen dem milden Klima.',
      beispiel_hd: 'Aschaffenburg nennt man das Bayerische Nizza — wegen dem milden Klima.',
      kategorie: 'orte'
    },
    {
      id: 'fr-082',
      ausdruck: 'Ansbach',
      hochdeutsch: 'Ansbach (Mittelfränkische Residenzstadt)',
      bedeutung: 'Ansbach mit 42.000 Einwohnern ist die Hauptstadt Mittelfrankens und einstige Markgrafenresidenz. Berühmt: die Markgrafen-Residenz (Rokoko), die Markgrafen-Theater. Heimat des Bachwoche Ansbach (eines der wichtigsten Bach-Festivals weltweit). Auch militärisch bedeutend — US-Militärstandort seit 1945. Charmante kleine Barockstadt im fränkischen Stil.',
      beispiel: 'Die Bachwoche in Ansbach is\'s wichtigste fränkische Klassikfest.',
      beispiel_hd: 'Die Bachwoche in Ansbach ist das wichtigste fränkische Klassikfest.',
      kategorie: 'orte'
    },
    {
      id: 'fr-083',
      ausdruck: 'Schwabach',
      hochdeutsch: 'Schwabach (Goldschlägerstadt)',
      bedeutung: 'Schwabach südlich von Nürnberg mit 41.000 Einwohnern ist die deutsche Hauptstadt des Goldschlägerhandwerks — Blattgold wird hier seit Jahrhunderten von Hand hergestellt. Über 80% des deutschen Blattgolds kommt aus Schwabach. Auch die Schwabacher Schrift (Vorgänger der Frakturschrift) trägt ihren Namen. Charmante kleine Stadt mit großem Handwerksgewicht.',
      beispiel: 'In Schwabach wird das Goldblatt für die Kirchen gschlogn.',
      beispiel_hd: 'In Schwabach wird das Blattgold für die Kirchen geschlagen.',
      kategorie: 'orte'
    },
    {
      id: 'fr-084',
      ausdruck: 'Iphofen',
      hochdeutsch: 'Iphofen (Weinort in Unterfranken)',
      bedeutung: 'Iphofen mit 4.500 Einwohnern ist eines der bedeutendsten fränkischen Weinorte — sieben Weinlagen mit Topweinen (Julius-Echter-Berg, Kalb, Kronsberg). Das mittelalterliche Stadtbild mit Stadtmauer, Türmen und Fachwerkhäusern ist hervorragend erhalten. Knauf-Konzern hat hier seinen Sitz. Kunst- und Weinstadt — kleines Juwel des Maindreiecks.',
      beispiel: 'A Silvaner aus Iphofen — fränkische Spitzenweinlage.',
      beispiel_hd: 'Ein Silvaner aus Iphofen — fränkische Spitzenweinlage.',
      kategorie: 'orte'
    },
    {
      id: 'fr-085',
      ausdruck: 'Volkach',
      hochdeutsch: 'Volkach (Maindreieck-Weinort)',
      bedeutung: 'Volkach mit 8.500 Einwohnern liegt malerisch in einer Mainschleife („Mainviereck") und ist Frankenwein-Hochburg. Die Wallfahrtskirche Maria im Weingarten mit der berühmten Madonna im Rosenkranz von Tilman Riemenschneider ist Pilgerort. Jährliches Weinfest, charmante Altstadt, beste Frankenweine. Lebensgefühl auf dem Mainviereck.',
      beispiel: 'Volkach im Mainviereck — Weingarten und Riemenschneider.',
      beispiel_hd: 'Volkach im Mainviereck — Weingarten und Riemenschneider.',
      kategorie: 'orte'
    },
    {
      id: 'fr-086',
      ausdruck: 'Steigerwald',
      hochdeutsch: 'Steigerwald (Mittelgebirge)',
      bedeutung: 'Der Steigerwald ist ein Mittelgebirge zwischen Würzburg und Bamberg — hügelige Buchenwälder, Streuobstwiesen, Weinberge am Rand. Naturpark mit zahlreichen Wanderwegen. Berühmt: die Schwanberg-Klosteranlage, das Kloster Ebrach (Zisterzienser-Erbe). Eine ruhige, ursprüngliche Landschaft, die vom Tourismus noch verschont ist — fränkische Geheimnis-Region.',
      beispiel: 'Im Steigerwald wandern is wie a Zeitreise — Stille, Wald und Tradition.',
      beispiel_hd: 'Im Steigerwald wandern ist wie eine Zeitreise — Stille, Wald und Tradition.',
      kategorie: 'natur'
    },
    {
      id: 'fr-087',
      ausdruck: 'Spessart',
      hochdeutsch: 'Spessart (Mittelgebirge in Unterfranken)',
      bedeutung: 'Der Spessart ist Deutschlands größtes zusammenhängendes Laubwaldgebiet — 2.440 km² Buchen- und Eichenwald zwischen Aschaffenburg und Würzburg. Bekannt durch Wilhelm Hauffs Märchen „Das Wirtshaus im Spessart". Räubergeschichten, Köhlertradition, dichte Wälder. Heute Wanderparadies und Naturpark. Eine der ursprünglichsten Landschaften Mitteleuropas.',
      beispiel: 'Im Spessart spukt\'s ned mehr — aber wandern kann mer wunderschön.',
      beispiel_hd: 'Im Spessart spukt es nicht mehr — aber wandern kann man wunderschön.',
      kategorie: 'natur'
    },
    {
      id: 'fr-088',
      ausdruck: 'Rhön',
      hochdeutsch: 'Rhön (Mittelgebirge — „Land der offenen Fernen")',
      bedeutung: 'Die Rhön ist ein Mittelgebirge zwischen Bayern, Hessen und Thüringen — UNESCO-Biosphärenreservat. Besondere offene Hochflächen mit Schafhaltung, vulkanische Berge wie Wasserkuppe (höchster Berg, 950 m). „Land der offenen Fernen" wegen der weiten Aussichten. Bekannt: Rhöner Schafe, Rhöner Wurst, Segelflug von der Wasserkuppe. Authentisch ländliches Franken.',
      beispiel: 'Auf der Wasserkuppe in der Rhön weht der Wind über die Hochfläche.',
      beispiel_hd: 'Auf der Wasserkuppe in der Rhön weht der Wind über die Hochfläche.',
      kategorie: 'natur'
    },
    {
      id: 'fr-089',
      ausdruck: 'Hassberge',
      hochdeutsch: 'Haßberge (Mittelgebirge)',
      bedeutung: 'Die Haßberge sind ein Mittelgebirge im Norden Unterfrankens zwischen Coburg und Schweinfurt. Wenig touristisch erschlossen, dafür ursprünglich. Berühmt: das Schloss Bettenburg, der „Burgenwinkel" mit zahlreichen mittelalterlichen Ruinen. Eine der Geheimtipp-Regionen Frankens für Wanderer und Liebhaber stiller Landschaften. Naturpark Haßberge.',
      beispiel: 'In de Hassberge findest noch echte Stille — kaum Touristen.',
      beispiel_hd: 'In den Haßbergen findest du noch echte Stille — kaum Touristen.',
      kategorie: 'natur'
    },
    {
      id: 'fr-090',
      ausdruck: 'Tilman Riemenschneider',
      hochdeutsch: 'Tilman Riemenschneider (Bildschnitzer)',
      bedeutung: 'Tilman Riemenschneider (ca. 1460-1531) ist der bedeutendste fränkische Bildhauer und einer der wichtigsten deutschen Künstler überhaupt. Geboren in Heiligenstadt (Thüringen), wirkte er hauptsächlich in Würzburg. Seine Holzschnitzwerke (Marienaltar in Creglingen, Heilig-Blut-Altar in Rothenburg, Madonna in Volkach) sind Weltkunst. Auch Würzburger Bürgermeister — wurde im Bauernkrieg gefoltert.',
      beispiel: 'Riemenschneiders Madonnen sind Weltkunst aus Franken.',
      beispiel_hd: 'Riemenschneiders Madonnen sind Weltkunst aus Franken.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-091',
      ausdruck: 'Veit Stoß',
      hochdeutsch: 'Veit Stoß (Nürnberger Bildhauer)',
      bedeutung: 'Veit Stoß (ca. 1450-1533) war ein berühmter Nürnberger Bildhauer und Maler. Sein Marienaltar in der Krakauer Marienkirche (1477-1489) gilt als Meisterwerk des Spätmittelalters. Auch der Englische Gruß in der Nürnberger Lorenzkirche stammt von ihm. Sein Leben war turbulent — er wurde wegen Fälschung gebrandmarkt. Trotzdem unsterblich als Künstlergenie.',
      beispiel: 'Veit Stoß hat den Englischen Gruß in St. Lorenz geschnitzt.',
      beispiel_hd: 'Veit Stoß hat den Englischen Gruß in St. Lorenz geschnitzt.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-092',
      ausdruck: 'Peter Vischer',
      hochdeutsch: 'Peter Vischer (Nürnberger Bronzegießer)',
      bedeutung: 'Peter Vischer der Ältere (ca. 1455-1529) war der berühmteste Nürnberger Bronzegießer der Renaissance. Sein Hauptwerk: das Sebaldusgrab in der Sebalduskirche Nürnberg — eine Meisterleistung der Bronzegusskunst mit lebensgroßen Heiligenfiguren und Apostelfiguren. Vischer hat sich selbst als kleine Figur in einer Schürze eingefügt — Markenzeichen seiner Werkstatt. Renaissance-Genie.',
      beispiel: 'Das Sebaldusgrab von Peter Vischer is Renaissance-Kunst in Bronze.',
      beispiel_hd: 'Das Sebaldusgrab von Peter Vischer ist Renaissance-Kunst in Bronze.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-093',
      ausdruck: 'Walther von der Vogelweide',
      hochdeutsch: 'Walther von der Vogelweide (Minnesänger)',
      bedeutung: 'Walther von der Vogelweide (ca. 1170-1230) ist der berühmteste Minnesänger des deutschen Mittelalters. Seine Herkunft ist umstritten — Franken (Würzburg-Region), Tirol oder Bayern. Sein Grab soll in Würzburg liegen, im Lusamgärtchen am Dom. Schrieb über Liebe, Politik und Religion — ein universeller mittelalterlicher Dichter. Heute Schulstoff.',
      beispiel: 'Walther von der Vogelweide liegt im Würzburger Lusamgärtchen.',
      beispiel_hd: 'Walther von der Vogelweide liegt im Würzburger Lusamgärtchen.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-094',
      ausdruck: 'Marktbreit',
      hochdeutsch: 'Marktbreit (Mainfränkische Kleinstadt)',
      bedeutung: 'Marktbreit am Main mit 4.000 Einwohnern ist eine der schönsten erhaltenen mittelalterlichen Kleinstädte Frankens. Pittoreske Fachwerkhäuser, das Maintor, die Mainbrücke und der berühmte Schwedische Kanzler im Schloss machen sie zum Anziehungspunkt. Tor zum Maindreieck. Auch berühmt durch die Asthma-Forschung Robert Kochs.',
      beispiel: 'Marktbreit — Fachwerk-Idyll am Main, fränkische Postkarte.',
      beispiel_hd: 'Marktbreit — Fachwerk-Idyll am Main, fränkische Postkarte.',
      kategorie: 'orte'
    },
    {
      id: 'fr-095',
      ausdruck: 'Maintal',
      hochdeutsch: 'Maintal (Weinlandschaft)',
      bedeutung: 'Das Maintal ist die zentrale Weinlandschaft Frankens — vom Spessart bis zum Steigerwald. Die Mainschleifen bilden charakteristische Landschaftsbilder. Hier wachsen die besten Frankenweine: Würzburger Stein, Volkacher Ratsherr, Iphofener Julius-Echter-Berg. Auch Tourismusroute „Mainradweg" — von der Quelle bei Bayreuth bis zur Mündung in Mainz.',
      beispiel: 'Im Maintal wachsn die besten fränkischen Wein.',
      beispiel_hd: 'Im Maintal wachsen die besten fränkischen Weine.',
      kategorie: 'natur'
    },
    {
      id: 'fr-096',
      ausdruck: 'Marktheidenfeld',
      hochdeutsch: 'Marktheidenfeld (Mainfränkische Stadt)',
      bedeutung: 'Marktheidenfeld am Main mit 11.000 Einwohnern liegt im Maindreieck. Bekannt für Warema (Markisenhersteller, Weltmarktführer) und Bürkert (Mess- und Regeltechnik). Schöne mittelalterliche Altstadt mit historischer Mainbrücke. Im Spessart-Westen gelegen, klassisches mainfränkisches Mittelstadt-Idyll. Wirtschaftlich überraschend stark für die Größe.',
      beispiel: 'Marktheidenfeld is klein, aber mit weltbekannten Firmen.',
      beispiel_hd: 'Marktheidenfeld ist klein, aber mit weltbekannten Firmen.',
      kategorie: 'orte'
    },
    {
      id: 'fr-097',
      ausdruck: 'Wertheim',
      hochdeutsch: 'Wertheim (Stadt am Mainzusammenfluss)',
      bedeutung: 'Wertheim mit 22.000 Einwohnern liegt am Zusammenfluss von Main und Tauber — sehr malerisch. Die Burgruine Wertheim thront hoch über der Stadt. Bekannt: das Glasmuseum, das Outlet-Center (Designer Outlet Wertheim — eines der größten Deutschlands). Mischzone fränkisch-badisch. Liegt im Main-Tauber-Kreis (Baden-Württemberg), aber kulturell fränkisch geprägt.',
      beispiel: 'In Wertheim kannst du shoppen und Burgruine angucken — beides in einem Tag.',
      beispiel_hd: 'In Wertheim kannst du shoppen und Burgruine angucken — beides in einem Tag.',
      kategorie: 'orte'
    },
    {
      id: 'fr-098',
      ausdruck: 'Coburg-Stadt',
      hochdeutsch: 'Coburg (Veste-Stadt)',
      bedeutung: 'Coburg-Stadt ist die historische Residenzstadt der Herzöge von Sachsen-Coburg-Gotha. Die Veste Coburg, „Fränkische Krone", ist eine der mächtigsten Burgen Deutschlands — Martin Luther verbrachte hier 1530 ein halbes Jahr während des Augsburger Reichstags. Über die Coburger Linie kamen Hochadelige nach Europa — Prinz Albert heiratete Victoria. Berühmt: Coburger Bratwurst.',
      beispiel: 'Coburg hat Hochadel und Bratwurst — beides gleichermaßen stolz.',
      beispiel_hd: 'Coburg hat Hochadel und Bratwurst — beides gleichermaßen stolz.',
      kategorie: 'orte'
    },
    {
      id: 'fr-099',
      ausdruck: 'Federweißer',
      hochdeutsch: 'Federweißer (Junger fränkischer Wein)',
      bedeutung: 'Federweißer ist im Herbst der noch gärende, junge Wein — leicht süß, leicht prickelnd, niedrigprozentig. Im Fränkischen serviert man ihn mit Zwiebelkuchen als saisonale Spezialität von September bis Oktober. „Federweißer-Saison" ist gesellschaftliches Ereignis — Familien und Freunde treffen sich beim Winzer. Achtung: Der Wein gärt im Magen weiter! Locker trinken, sonst gibt\'s Bauchschmerzen.',
      beispiel: 'Federweißer und Zwiebelkuchen — fränkischer Herbst-Klassiker.',
      beispiel_hd: 'Federweißer und Zwiebelkuchen — fränkischer Herbst-Klassiker.',
      kategorie: 'essen'
    },
    {
      id: 'fr-100',
      ausdruck: 'Kärwa-Bua',
      hochdeutsch: 'Kirchweihbub (Festburschen)',
      bedeutung: 'Die „Kärwa-Buam" (oder „Kärwabuam") sind die ungeheirateten jungen Männer eines fränkischen Dorfes, die die Kirchweih organisieren — Bierzelt aufstellen, Kärwabaum (Maibaum) ausgraben, Tanz organisieren, Tradition pflegen. Eine ehrenvolle Aufgabe, die Generationen weitergegeben wird. Mit ihrem Kärwa-Heiß bringen sie die Mädchen zum Tanzen. Echtes fränkisches Volkstum, das in vielen Dörfern bis heute lebendig ist.',
      beispiel: 'D\'Kärwabuam stellen morgen den Kärwabaum auf.',
      beispiel_hd: 'Die Kirchweihbuben stellen morgen den Kirchweihbaum auf.',
      kategorie: 'redensart'
    },
    {
      id: 'fr-101',
      ausdruck: 'Müller-Thurgau',
      hochdeutsch: 'Müller-Thurgau (fränkische Weißweinrebe)',
      bedeutung: 'Der Müller-Thurgau ist eine der meistangebauten Weißweinrebsorten Frankens — 1882 vom Schweizer Hermann Müller aus dem Thurgau gezüchtet. Leicht, blumig, niedrige Säure, früh reif. Perfekt für den fränkischen Trinkanlass: zum Schäuferla, zum Vesper, zur Brotzeit. Auf Lössböden im Maintal gedeiht er hervorragend. In der QbA-Klasse ein zuverlässiger Alltagswein, in höheren Qualitäten überraschend elegant.',
      beispiel: 'En frischer Müller-Thurgau im Sommer auf\'m Weinberg — herrlich.',
      beispiel_hd: 'Ein frischer Müller-Thurgau im Sommer auf dem Weinberg — herrlich.',
      kategorie: 'essen'
    },
    {
      id: 'fr-102',
      ausdruck: 'Bacchus',
      hochdeutsch: 'Bacchus (fränkische Aromasorte)',
      bedeutung: 'Der Bacchus ist eine in Franken besonders verbreitete Weißweinrebsorte — 1933 in Geilweilerhof aus Silvaner, Riesling und Müller-Thurgau gezüchtet. Sehr aromatisch mit Noten von Holunder, Muskat und exotischen Früchten. Wird oft als Cuvée-Partner oder als typischer „Heuriger-Wein" zum Federweißen ausgebaut. Trotz seiner Aromatik bleibt er trocken und elegant. Fränkische Spezialität, kaum außerhalb Frankens zu finden.',
      beispiel: 'Bacchus passt perfekt zum Spargel — fränkische Spätlese-Magie.',
      beispiel_hd: 'Bacchus passt perfekt zum Spargel — fränkische Spätlese-Magie.',
      kategorie: 'essen'
    },
    {
      id: 'fr-103',
      ausdruck: 'Domina',
      hochdeutsch: 'Domina (fränkische Rotweinrebe)',
      bedeutung: 'Die Domina ist eine fränkische Rotweinrebe — 1927 in Geilweilerhof aus Portugieser und Spätburgunder gezüchtet. Tiefdunkler Wein mit fülligem Geschmack, Aromen von dunklen Beeren und Schokolade. Robuster Wachstumscharakter macht sie auf fränkischen Böden ideal. Wird gerne im Eichenfass ausgebaut. Im Maindreieck und in der Frankenwein-Region gewinnt sie zunehmend Anhänger — fränkische Antwort auf internationale Rotweine.',
      beispiel: 'En kräftiger Domina zum Wildbraten — fränkische Rotweinkunst.',
      beispiel_hd: 'Ein kräftiger Domina zum Wildbraten — fränkische Rotweinkunst.',
      kategorie: 'essen'
    },
    {
      id: 'fr-104',
      ausdruck: 'Frauenkloster',
      hochdeutsch: 'Fränkisches Frauenkloster (Tradition)',
      bedeutung: 'Frankens Frauenklöster prägten die Region geistlich und wirtschaftlich. Berühmt: Kloster Kitzingen (Liobakloster), Kloster Wechterswinkel, Kloster Tückelhausen. Viele wurden in der Reformation oder Säkularisation aufgelöst, einige sind aktive Klöster geblieben. Sie führten Hospitäler, Schulen und Weingüter. Bürgerspital Würzburg und Juliusspital sind Nachfahren der klösterlichen Wein- und Sozialtradition.',
      beispiel: 'Die fränkische Frauenklöster ham viel Wein und Weisheit hinterlassen.',
      beispiel_hd: 'Die fränkischen Frauenklöster haben viel Wein und Weisheit hinterlassen.',
      kategorie: 'orte'
    },
    {
      id: 'fr-105',
      ausdruck: 'Würzburger Hofkeller',
      hochdeutsch: 'Würzburger Hofkeller (historisches Weingut)',
      bedeutung: 'Der Staatliche Hofkeller Würzburg unter der Residenz ist eines der ältesten und bedeutendsten Weingüter Deutschlands — gegründet 1128 durch die Würzburger Fürstbischöfe. 120 Hektar Weinberge in besten Lagen wie Würzburger Stein. Die Fassweinkeller unter der Residenz sind 4.000 m² groß — einzigartige Atmosphäre. Geführte Verkostungen sind Pflichtprogramm für Weinliebhaber. Geschichte schmecken.',
      beispiel: 'Im Würzburger Hofkeller probier ma Wein wo schon Kaiser tranken.',
      beispiel_hd: 'Im Würzburger Hofkeller probiert man Wein, den schon Kaiser tranken.',
      kategorie: 'orte'
    },
    {
      id: 'fr-106',
      ausdruck: 'Bürgerspital',
      hochdeutsch: 'Bürgerspital Würzburg (Weingut und Sozialstiftung)',
      bedeutung: 'Das Bürgerspital zum Heiligen Geist in Würzburg ist eine 1316 gegründete Sozialstiftung — bis heute Pflegeheim mit Klinik und gleichzeitig eines der besten Weingüter Frankens (110 Hektar). Die Lagen Stein, Pfaffenberg und Würzburger Pfaffenstuhl gehören dazu. Erträge finanzieren die Altenpflege — Stiftungswirtschaft seit 700 Jahren. Im Bürgerspital-Weinstuben in der Altstadt verkostet man frische Frankenweine.',
      beispiel: 'Im Bürgerspital trinkt man Wein, dessen Erlös Senioren hilft.',
      beispiel_hd: 'Im Bürgerspital trinkt man Wein, dessen Erlös Senioren hilft.',
      kategorie: 'orte'
    },
    {
      id: 'fr-107',
      ausdruck: 'Hesselberg',
      hochdeutsch: 'Hesselberg (höchster Berg Mittelfrankens)',
      bedeutung: 'Der Hesselberg mit 689 Metern ist der höchste Berg Mittelfrankens — im Landkreis Ansbach gelegen, weithin sichtbar in der Hahnenkamm-Region. Heiliger Berg der Hermunduren, später Kultort. Die NS-Zeit missbrauchte ihn als „Frankenberg" für Großkundgebungen — heute mahnt eine Gedenkstätte. Im Sommer Drachenflieger-Mekka, Wandermöglichkeiten und herrlicher Ausblick übers Frankenland.',
      beispiel: 'Vom Hesselberg siehst du an klaren Tagen bis nach Württemberg.',
      beispiel_hd: 'Vom Hesselberg siehst du an klaren Tagen bis nach Württemberg.',
      kategorie: 'natur'
    },
    {
      id: 'fr-108',
      ausdruck: 'Walberla',
      hochdeutsch: 'Walberla (Berg in der Fränkischen Schweiz)',
      bedeutung: 'Das Walberla (eigentlich Ehrenbürg, 532 m) ist der heilige Berg der Fränkischen Schweiz — weithin sichtbar zwischen Forchheim und Kirchehrenbach. Der Name leitet sich von der Walburgiskapelle ab. Am ersten Maiwochenende findet das Walberlafest statt — eines der ältesten Volksfeste Frankens. Wandern, Bierkeller, Aussicht — ein fränkisches Heiligtum. Geologisch ein typischer Jurazeit-Zeugenberg.',
      beispiel: 'Aufs Walberla zum Mai-Fest — fränkische Tradition seit Jahrhunderten.',
      beispiel_hd: 'Auf das Walberla zum Mai-Fest — fränkische Tradition seit Jahrhunderten.',
      kategorie: 'natur'
    },
    {
      id: 'fr-109',
      ausdruck: 'Doktor Eisenbarth',
      hochdeutsch: 'Doktor Eisenbarth (fränkische Sage)',
      bedeutung: 'Johann Andreas Eisenbarth (1663-1727), der legendäre Wanderchirurg aus Oberfranken, ist Held des bekannten Spottlieds „Ich bin der Doktor Eisenbarth". In Wirklichkeit ein angesehener Mediziner seiner Zeit, in der Sage als Quacksalber verspottet. Bayreuth und Hannoversch Münden streiten um sein Grab. Symbol fränkischer Volksmedizin und Marktschreierei. Im Lied: „Glory, Viktoria, Glory, Viktoria!"',
      beispiel: 'Ich bin der Doktor Eisenbarth — fränkisches Spottlied bis heute bekannt.',
      beispiel_hd: 'Ich bin der Doktor Eisenbarth — fränkisches Spottlied bis heute bekannt.',
      kategorie: 'redensart'
    },
    {
      id: 'fr-110',
      ausdruck: 'Frankenwald',
      hochdeutsch: 'Frankenwald (Mittelgebirge in Oberfranken)',
      bedeutung: 'Der Frankenwald ist ein Mittelgebirge in Oberfranken — sanfte Höhen bis 800 m, ausgedehnte Fichtenwälder, klare Bäche. Grenzgebiet zum Thüringer Wald und Vogtland. Naturpark Frankenwald bietet Wanderwege, Floßfahrten auf der Saale und Wintersport. Kronach (Cranach-Stadt), Kulmbach (Bier-Hauptstadt) und Hof sind die wichtigsten Städte. Wirtschaftlich strukturschwach, landschaftlich wunderschön und ursprünglich.',
      beispiel: 'Im Frankenwald wanderst du Stunden, ohne jemand zu treffen.',
      beispiel_hd: 'Im Frankenwald wanderst du Stunden, ohne jemand zu treffen.',
      kategorie: 'natur'
    },
    {
      id: 'fr-111',
      ausdruck: 'Vadder',
      hochdeutsch: 'Vater (fränkische Form)',
      bedeutung: 'Der „Vadder" ist im Fränkischen die familiäre Bezeichnung für den Vater — etwas lieber und bodenständiger als das hochdeutsche „Vater". Die T-Verdopplung zeigt den fränkischen Hang zur Verstärkung weicher Konsonanten. Vadder ist der Familienpatriarch — meist Handwerker, Bauer oder Beamter, gibt Lebensweisheiten in knappen fränkischen Sätzen weiter. Generationen-Brücke in der traditionellen fränkischen Familie.',
      beispiel: 'Mei Vadder hat immer gsagt: Erst die Arbeit, dann des Vergnügen.',
      beispiel_hd: 'Mein Vater hat immer gesagt: Erst die Arbeit, dann das Vergnügen.',
      kategorie: 'familie'
    },
    {
      id: 'fr-112',
      ausdruck: 'Muddi',
      hochdeutsch: 'Mutter (fränkische Koseform)',
      bedeutung: '„Muddi" ist die fränkische Koseform für Mutter — herzlich, vertraut, kindlich. Wird auch von Erwachsenen liebevoll für die eigene Mutter verwendet. Im Gegensatz zum bayerischen „Mutta" klingt fränkisches Muddi weicher und intimer. Die fränkische Mutter ist die Hüterin der Familientraditionen, kocht das Schäuferla zum Sonntag und hält die Familie zusammen. Familienzentrum schlechthin.',
      beispiel: 'Muddi backt den besten Lebkuchen weit und breit.',
      beispiel_hd: 'Mutter backt den besten Lebkuchen weit und breit.',
      kategorie: 'familie'
    },
    {
      id: 'fr-113',
      ausdruck: 'Oma',
      hochdeutsch: 'Großmutter (fränkische Familienfigur)',
      bedeutung: 'Die „Oma" ist im Fränkischen die Hüterin der Familientraditionen — sie kennt die alten Rezepte, die Geschichten der Vorfahren und die Mundart-Sprichwörter. Oft im selben Haus oder gleich nebenan wohnend, ist sie der Babysitter, Köchin und Vertraute der Enkel. Eine fränkische Oma macht Schäuferla, Klöß und Krapfen besser als jeder Sternekoch. Generationenbindung ist in Franken stark — Oma ist Kult.',
      beispiel: 'Bei Oma gibts immer Brotzeit und a Glas Most.',
      beispiel_hd: 'Bei Oma gibt es immer Brotzeit und ein Glas Most.',
      kategorie: 'familie'
    },
    {
      id: 'fr-114',
      ausdruck: 'Saubär',
      hochdeutsch: 'unordentlicher Mensch (fränkisches Schimpfwort)',
      bedeutung: 'Ein „Saubär" ist im Fränkischen ein unordentlicher, schmutziger Mensch — wörtlich „Schweinebär". Mittelstarkes Schimpfwort, meist in der Familie oder unter Freunden verwendet, wenn jemand mit dreckigen Schuhen ins Haus kommt oder sein Zimmer verwüstet. „Du Saubär!" ruft die Muddi entrüstet, wenn die Kinder im Matsch gespielt haben. Mehr Augenrollen als echte Verärgerung.',
      beispiel: 'Du Saubär, schau dich mal an — wo warst denn?',
      beispiel_hd: 'Du Saubär, schau dich mal an — wo warst denn?',
      kategorie: 'schimpf'
    },
    {
      id: 'fr-115',
      ausdruck: 'Schaffix',
      hochdeutsch: 'fleißiger Mensch (fränkisches Lob)',
      bedeutung: 'Ein „Schaffix" ist im Fränkischen ein besonders fleißiger, tüchtiger Mensch — abgeleitet von „schaffen" (arbeiten). „Der is a richtiger Schaffix!" ist ein hohes Lob für jemand, der nicht jammert, sondern anpackt. In Franken zählt Fleiß und Pflichtbewusstsein viel mehr als Reichtum oder Bildung — der Schaffix wird respektiert. Klassisch handwerkliche Tugend, die in Franken hochgehalten wird.',
      beispiel: 'Die Anna is a echter Schaffix — von früh bis spät am Arbeiten.',
      beispiel_hd: 'Die Anna ist eine echte Arbeiterin — von früh bis spät am Arbeiten.',
      kategorie: 'menschen'
    },
    {
      id: 'fr-116',
      ausdruck: 'Handi',
      hochdeutsch: 'Handy (fränkische Aussprache)',
      bedeutung: 'Das „Handi" ist im Fränkischen die liebevoll-vereinfachte Form des Wortes „Handy" — die englische Y-Endung wird zur kindlichen i-Endung. Zeigt, wie Fränkisch moderne Anglizismen sanft in den Dialekt integriert. Auch ältere Generationen sagen „Handi" — eine sprachliche Verniedlichung der manchmal feindseligen Technik. Charme der fränkischen Lautmalerei trifft modernes Leben.',
      beispiel: 'Wo isch mei Handi? Ich hab\'s wieder verlegt.',
      beispiel_hd: 'Wo ist mein Handy? Ich habe es wieder verlegt.',
      kategorie: 'alltag'
    },
    {
      id: 'fr-117',
      ausdruck: 'Auto',
      hochdeutsch: 'Auto (fränkischer Stolz)',
      bedeutung: 'In Franken wird das Auto besonders ernst genommen — das eigene Fahrzeug ist Status, Identität und Liebhaberei. Nürnberg und Ingolstadt sind Auto-Zentren mit MAN und Audi. Fränkische Männer pflegen ihre Autos akribisch, waschen sie sonntags und parken sie sorgsam in der Garage. „Mei Audi" oder „mei Beemwehr" wird oft mit Vornamen genannt — fast wie ein Familienmitglied. Stolzer Pragmatismus.',
      beispiel: 'Mei Audi steht in der Garach — mit Liebe gepflegt.',
      beispiel_hd: 'Mein Audi steht in der Garage — mit Liebe gepflegt.',
      kategorie: 'alltag'
    },
    {
      id: 'fr-118',
      ausdruck: 'Internet',
      hochdeutsch: 'Internet (im modernen Franken)',
      bedeutung: 'Das Internet hat auch in Franken Einzug gehalten — die ältere Generation steht ihm oft skeptisch gegenüber („Des hammer doch früher au ned braucht!"), die Jugend nutzt es selbstverständlich. Erlangen ist mit Siemens und der Friedrich-Alexander-Universität ein wichtiger IT-Standort. Auch die fränkische Wirtschaft (Schaeffler, Adidas, Puma) ist digital. Die Spannung zwischen Tradition und Moderne prägt das fränkische Leben.',
      beispiel: 'Ohne Internet komm i jetzt au ned mehr klar — gibt halt ned anders.',
      beispiel_hd: 'Ohne Internet komme ich jetzt auch nicht mehr klar — es geht halt nicht anders.',
      kategorie: 'alltag'
    },
    {
      id: 'fr-119',
      ausdruck: 'Heißmann',
      hochdeutsch: 'Volker Heißmann (fränkischer Kabarettist)',
      bedeutung: 'Volker Heißmann (geb. 1969) ist einer der bekanntesten fränkischen Kabarettisten — als „Waltraud Heißmann" in Frauenkleidern tritt er mit seinem Partner Martin Rassau im Comödie Fürth auf. Bayerischer Kabarettpreis und Deutscher Kleinkunstpreis. Sein boulevardesker Humor mit fränkischer Mundart und Verkleidungskunst füllt seit über 25 Jahren Säle. Symbol für die lebendige fränkische Unterhaltungskultur.',
      beispiel: 'Heißmann in Frauenklamotten — fränkisches Kabarett pur.',
      beispiel_hd: 'Heißmann in Frauenkleidern — fränkisches Kabarett pur.',
      kategorie: 'musik'
    },
    {
      id: 'fr-120',
      ausdruck: 'Lippert',
      hochdeutsch: 'Wolfgang Lippert (fränkischer Schlagerstar)',
      bedeutung: 'Wolfgang Lippert (geb. 1952 in Plauen) ist zwar gebürtiger Sachse, aber durch jahrzehntelange Auftritte fester Bestandteil der fränkischen Unterhaltungswelt. „Erna kommt!" wurde Hit. Als Showmoderator und Schlagersänger prägte er das fränkische Fernsehen. Heute oft auf Volksfesten und in Bierzelten zu sehen. Sein bodenständiger Stil passt zur fränkischen Mentalität — keine Allüren, sondern Volkstümlichkeit.',
      beispiel: 'Lippert auf der Kärwa — Schlager und Stimmung garantiert.',
      beispiel_hd: 'Lippert auf der Kirchweih — Schlager und Stimmung garantiert.',
      kategorie: 'musik'
    },
    {
      id: 'fr-121',
      ausdruck: 'Drud',
      hochdeutsch: 'Hexe / böser Geist (fränkische Sage)',
      bedeutung: 'Die „Drud" (oder „Trude") ist in fränkischen Volkssagen ein böser Geist oder eine Hexe, die nachts auf der Brust schlafender Menschen sitzt und Albträume verursacht. Volksglauben aus dem Mittelalter, in fränkischen Dörfern lange lebendig. „Druddrücken" beschreibt das Gefühl der Schlafparalyse. Schutz boten Drudenfuß-Symbole (Pentagramm) an Türen. Sagenmotive aus dem fränkischen Volksglauben.',
      beispiel: 'Die Drud hat mich heut Nacht geritten — schlecht geschlafen.',
      beispiel_hd: 'Die Druddrücken-Hexe hat mich heute Nacht geritten — schlecht geschlafen.',
      kategorie: 'natur'
    },
    {
      id: 'fr-122',
      ausdruck: 'Wilde Jagd',
      hochdeutsch: 'Wilde Jagd (fränkische Mythologie)',
      bedeutung: 'Die „Wilde Jagd" ist ein zentraler Mythos im fränkischen Volksglauben — ein gespenstischer Jagdzug, der nachts über die Felder zieht, angeführt vom „Wodan" oder dem Teufel. Wer ihm begegnet, soll Unheil erfahren oder mitgerissen werden. Die Sage ist im Frankenwald, Steigerwald und Spessart noch lebendig. Erzählt von Großeltern an Enkel weitergegeben. Heutige Heavy-Metal-Bands und Folkloristen halten das Motiv lebendig.',
      beispiel: 'In stürmischen Nächten zieht die Wilde Jagd übers Feld — sagt die Oma.',
      beispiel_hd: 'In stürmischen Nächten zieht die Wilde Jagd über das Feld — sagt die Oma.',
      kategorie: 'natur'
    },
    {
      id: 'fr-123',
      ausdruck: 'Spessart',
      hochdeutsch: 'Spessart (Mittelgebirge in Unterfranken)',
      bedeutung: 'Der Spessart ist ein Mittelgebirge im westlichen Unterfranken — dichteste Eichen- und Buchenwälder Deutschlands. Berüchtigt durch Wilhelm Hauffs „Wirtshaus im Spessart" und die historischen Räuberbanden. Heute Naturpark mit ruhigen Tälern, Burgruinen und Wanderwegen. Mespelbrunn, Lohr, Aschaffenburg sind die wichtigsten Spessart-Städte. Die Schweinfurter Wirtschaft profitierte historisch vom Spessart-Holz.',
      beispiel: 'Im Spessart soll\'s früher Räuber gegeben haben — wia in der Sage.',
      beispiel_hd: 'Im Spessart soll es früher Räuber gegeben haben — wie in der Sage.',
      kategorie: 'natur'
    },
    {
      id: 'fr-124',
      ausdruck: 'Brotzeit',
      hochdeutsch: 'Fränkische Brotzeit (Vesper)',
      bedeutung: 'Die fränkische Brotzeit ist ein heiliges Ritual — meist nachmittags oder abends. Bauernbrot, Fränkische Bratwurst, Pressack, Leberkäs, Käse, Gurken, Senf, eingelegte Zwiebeln. Dazu ein Seidla Kellerbier oder ein Schoppen Frankenwein. Im Sommer im Wirtshausgarten, im Winter in der Stube. Mehr als eine Mahlzeit — soziales Ereignis, Familienzeit, Genuss. In jedem fränkischen Wirtshaus selbstverständlich.',
      beispiel: 'A zünftige Brotzeit mit Pressack und Bier — fränkisches Glück.',
      beispiel_hd: 'Eine zünftige Brotzeit mit Pressack und Bier — fränkisches Glück.',
      kategorie: 'essen'
    },
    {
      id: 'fr-125',
      ausdruck: 'Bassd schoo',
      hochdeutsch: 'Passt schon (verstärkte Form)',
      bedeutung: '„Bassd schoo" mit gedehntem „oo" ist die verstärkte fränkische Form von „bassd scho" — fränkische Gelassenheit auf höchstem Niveau. Bedeutet so viel wie „ist völlig in Ordnung" oder „macht überhaupt nichts". Wird gesagt, wenn jemand sich entschuldigt, wenn etwas schiefläuft oder wenn man großzügig sein will. Die Dehnung des Vokals zeigt fränkische Wärme und Toleranz. Wahre fränkische Lebenskunst in einem Wort.',
      beispiel: 'Tschuldigung wegen dem Wartn. — Ach bassd schoo, mach dir koan Stress.',
      beispiel_hd: 'Entschuldigung wegen dem Warten. — Ach passt schon, mach dir keinen Stress.',
      kategorie: 'redensart'
    }
  ]
};
