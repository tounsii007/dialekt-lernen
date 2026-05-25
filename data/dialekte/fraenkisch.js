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
    }
  ]
};
