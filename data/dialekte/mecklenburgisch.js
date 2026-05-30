// Mecklenburgisch — Dialektdaten
// Format: jedes Objekt ist ein Ausdruck im Dialekt mit Bedeutung auf Hochdeutsch.

export default {
  id: 'mecklenburgisch',
  name: 'Mecklenburgisch',
  region: 'Mecklenburg',
  bundesland: 'Mecklenburg-Vorpommern',
  flag: '🐂',
  farbe: '#0d5eaf',
  beschreibung: 'Mecklenburgisch ist eine niederdeutsche (plattdeutsche) Mundart im Nordosten Deutschlands, bekannt durch den Dichter Fritz Reuter. Geprägt von Ostsee, Seenplatte und Landwirtschaft. Charakteristisch sind Wörter wie plietsch (schlau) und Dösbaddel (Dummkopf).',
  sprecher: 'ca. 0,3 Mio.',
  lang: 'de-DE',
  ausdruecke: [
    {
      id: 'mk-001',
      ausdruck: 'Moin',
      hochdeutsch: 'Hallo (zu jeder Tageszeit)',
      bedeutung: 'Moin ist der allgegenwärtige Gruß im Norden, zu jeder Tageszeit. Ein einzelnes Moin genügt; das doppelte Moin moin gilt manchen schon als zu gesprächig.',
      beispiel: 'Moin, allns good bi di?',
      beispiel_hd: 'Hallo, alles gut bei dir?',
      kategorie: 'begruessung'
    },
    {
      id: 'mk-002',
      ausdruck: 'plietsch',
      hochdeutsch: 'schlau / clever',
      bedeutung: 'plietsch heißt schlau, pfiffig und aufgeweckt. En plietsch Kind ist ein cleveres Kind. Ein typisch norddeutsches Lob für Schläue und Lebenstüchtigkeit.',
      beispiel: 'De Lütte is bannig plietsch.',
      beispiel_hd: 'Der Kleine ist sehr clever.',
      kategorie: 'gefuehle'
    },
    {
      id: 'mk-003',
      ausdruck: 'Dösbaddel',
      hochdeutsch: 'Dummkopf / Trottel',
      bedeutung: 'En Dösbaddel ist ein verträumter, begriffsstutziger Mensch, ein Trottel. Das Wort wird gutmütig-spöttisch verwendet, vom Dösen (vor sich hin träumen).',
      beispiel: 'Nu stell di nich so an, du Dösbaddel!',
      beispiel_hd: 'Nun stell dich nicht so an, du Trottel!',
      kategorie: 'schimpf'
    },
    {
      id: 'mk-004',
      ausdruck: 'Dwarsdriewer',
      hochdeutsch: 'Querkopf / Quertreiber',
      bedeutung: 'En Dwarsdriewer ist einer, der immer quer (dwars) liegt und alles besser weiß. Ein bildhaftes plattdeutsches Wort für einen sturen Widerspruchsgeist.',
      beispiel: 'He is so en olen Dwarsdriewer.',
      beispiel_hd: 'Er ist so ein alter Quertreiber.',
      kategorie: 'menschen'
    },
    {
      id: 'mk-005',
      ausdruck: 'Deern',
      hochdeutsch: 'Mädchen',
      bedeutung: 'Deern ist das Mädchen oder die junge Frau, ein liebevolles norddeutsches Wort. Männliches Gegenstück ist de Jung. Lütt Deern bedeutet kleines Mädchen.',
      beispiel: 'De Deern speelt an Strand.',
      beispiel_hd: 'Das Mädchen spielt am Strand.',
      kategorie: 'familie'
    },
    {
      id: 'mk-006',
      ausdruck: 'Jung',
      hochdeutsch: 'Junge',
      bedeutung: 'Jung ist der Junge oder Bub, auch als vertraute Anrede: Na, Jung? Zusammen mit Deern das übliche Wortpaar für Kinder im Plattdeutschen.',
      beispiel: 'De Jung helpt up den Hoff.',
      beispiel_hd: 'Der Junge hilft auf dem Hof.',
      kategorie: 'familie'
    },
    {
      id: 'mk-007',
      ausdruck: 'lütt',
      hochdeutsch: 'klein',
      bedeutung: 'lütt heißt klein. En lütt Pause ist eine kleine Pause. Eines der charakteristischsten Wörter des Plattdeutschen, auch im Norden Mecklenburgs allgegenwärtig.',
      beispiel: 'Wi maakt en lütt Pause.',
      beispiel_hd: 'Wir machen eine kleine Pause.',
      kategorie: 'alltag'
    },
    {
      id: 'mk-008',
      ausdruck: 'Schietwedder',
      hochdeutsch: 'schlechtes Wetter',
      bedeutung: 'Schietwedder ist mieses, nasskaltes Wetter, wie es an der Ostsee oft herrscht. Bi Schietwedder bleibt man besser binnen. Eine deftige, treffende Beschreibung.',
      beispiel: 'Vandaag is dat en richtig Schietwedder.',
      beispiel_hd: 'Heute ist das ein richtiges Mistwetter.',
      kategorie: 'natur'
    },
    {
      id: 'mk-009',
      ausdruck: 'Schummern',
      hochdeutsch: 'Dämmerung',
      bedeutung: 'Dat Schummern ist die Dämmerung, die Zeit zwischen Tag und Nacht. In dat Schummern sitten heißt, in der Dämmerung gemütlich beisammenzusitzen.',
      beispiel: 'Wi sitt in dat Schummern op de Bank.',
      beispiel_hd: 'Wir sitzen in der Dämmerung auf der Bank.',
      kategorie: 'natur'
    },
    {
      id: 'mk-010',
      ausdruck: 'tüdern',
      hochdeutsch: 'anbinden / festbinden',
      bedeutung: 'tüdern heißt anbinden, etwa eine Ziege an einen Pfahl, damit sie grasen kann. Davon abgeleitet ist tüdelig (verwirrt). Ein altes ländliches Wort.',
      beispiel: 'De Zeeg word an den Poll tüdert.',
      beispiel_hd: 'Die Ziege wird an den Pfahl angebunden.',
      kategorie: 'arbeit'
    },
    {
      id: 'mk-011',
      ausdruck: 'Knust',
      hochdeutsch: 'Brotkanten / Endstück',
      bedeutung: 'De Knust ist das knusprige Endstück vom Brot, der Kanten. Den Knust mit Botter mag mancher am liebsten. Ein gemütliches norddeutsches Brotwort.',
      beispiel: 'Ik mag den Knust mit dick Botter.',
      beispiel_hd: 'Ich mag den Brotkanten mit dick Butter.',
      kategorie: 'essen'
    },
    {
      id: 'mk-012',
      ausdruck: 'Kniffte',
      hochdeutsch: 'Butterbrot / belegte Stulle',
      bedeutung: 'En Kniffte ist eine dick belegte Stulle, ein herzhaftes Butterbrot für unterwegs. Auf die Arbeit nimmt man sich en Kniffte mit. Ein norddeutsches Wort.',
      beispiel: 'Ik nehm mi en Kniffte mit op Arbeit.',
      beispiel_hd: 'Ich nehme mir ein Butterbrot mit zur Arbeit.',
      kategorie: 'essen'
    },
    {
      id: 'mk-013',
      ausdruck: 'Pott',
      hochdeutsch: 'Topf / Tasse',
      bedeutung: 'De Pott ist der Topf oder die Tasse. En Pott Kaffee ist eine Tasse Kaffee. To Pott kamen heißt, zur Sache zu kommen. Ein vielseitiges Alltagswort.',
      beispiel: 'Wullt du noch en Pott Kaffee?',
      beispiel_hd: 'Möchtest du noch eine Tasse Kaffee?',
      kategorie: 'alltag'
    },
    {
      id: 'mk-014',
      ausdruck: 'Rotspon',
      hochdeutsch: 'in Norddeutschland gereifter Rotwein',
      bedeutung: 'Rotspon ist französischer Rotwein, der traditionell in den Hansestädten wie Wismar und Rostock in Eichenfässern reift. Eine norddeutsche Weinspezialität mit Geschichte.',
      beispiel: 'To dat Eten drinkt he en Glas Rotspon.',
      beispiel_hd: 'Zum Essen trinkt er ein Glas Rotwein.',
      kategorie: 'essen'
    },
    {
      id: 'mk-015',
      ausdruck: 'Buddel',
      hochdeutsch: 'Flasche',
      bedeutung: 'De Buddel ist die Flasche. Dat Buddelschipp ist das Flaschenschiff. So manche Buddel Rotspon wird an langen Abenden geleert. Ein urtümliches Wort.',
      beispiel: 'Maak maal de Buddel apen.',
      beispiel_hd: 'Mach mal die Flasche auf.',
      kategorie: 'alltag'
    },
    {
      id: 'mk-016',
      ausdruck: 'Snut',
      hochdeutsch: 'Mund / Schnauze',
      bedeutung: 'De Snut ist der Mund oder die Schnauze. Hool de Snut bedeutet „halt den Mund". Auch wer schmollt, zieht eine Snut. Ein deftiges Körperwort.',
      beispiel: 'Nu hool maal de Snut!',
      beispiel_hd: 'Nun halt mal den Mund!',
      kategorie: 'koerper'
    },
    {
      id: 'mk-017',
      ausdruck: 'klönen',
      hochdeutsch: 'gemütlich plaudern',
      bedeutung: 'klönen heißt entspannt und ausgiebig plaudern, etwa bei einem Pott Kaffee. Das gesellige Klönen pflegt die Nachbarschaft. Ein zentrales norddeutsches Wort.',
      beispiel: 'Wi hebbt över den Tuun klöönt.',
      beispiel_hd: 'Wir haben über den Zaun geplaudert.',
      kategorie: 'alltag'
    },
    {
      id: 'mk-018',
      ausdruck: 'Schiet',
      hochdeutsch: 'Mist / Unsinn',
      bedeutung: 'Schiet bezeichnet Dreck, aber auch Ärger oder dummes Zeug. So en Schiet! ist ein Ausruf des Unmuts. Ein deftiges, gutmütig gebrauchtes Allzweckwort.',
      beispiel: 'So en Schiet, nu regents ook noch!',
      beispiel_hd: 'So ein Mist, jetzt regnet es auch noch!',
      kategorie: 'schimpf'
    },
    {
      id: 'mk-019',
      ausdruck: 'Tüffel',
      hochdeutsch: 'Kartoffeln',
      bedeutung: 'Tüffel sind die Kartoffeln, ein niederdeutsches Wort. Tüffel mit Fisch ist ein typisches Essen an der Ostseeküste. Grundlage vieler herzhafter Gerichte.',
      beispiel: 'To Middag gifft dat Tüffel mit Hering.',
      beispiel_hd: 'Zu Mittag gibt es Kartoffeln mit Hering.',
      kategorie: 'essen'
    },
    {
      id: 'mk-020',
      ausdruck: 'achtern',
      hochdeutsch: 'hinten / dahinter',
      bedeutung: 'achtern bedeutet hinten, das Gegenstück ist vörn. Achtern Huus heißt hinter dem Haus. Auch der Achtersteven (das Heck) eines Schiffes leitet sich davon ab.',
      beispiel: 'De Goorn liggt achtern Huus.',
      beispiel_hd: 'Der Garten liegt hinter dem Haus.',
      kategorie: 'alltag'
    },
    {
      id: 'mk-021',
      ausdruck: 'Pannkoken',
      hochdeutsch: 'Pfannkuchen',
      bedeutung: 'Pannkoken sind die Pfannkuchen, in der Pann gebacken, süß oder mit Speck. Dicke Pannkoken sind ein beliebtes Hauptgericht der norddeutschen Küche.',
      beispiel: 'Vandaag backt Mudder Pannkoken.',
      beispiel_hd: 'Heute backt Mutter Pfannkuchen.',
      kategorie: 'essen'
    },
    {
      id: 'mk-022',
      ausdruck: 'Plünnen',
      hochdeutsch: 'Klamotten / alte Kleider',
      bedeutung: 'Plünnen sind Kleider, oft im Sinne von alten Klamotten. Truck di dröge Plünnen an heißt, sich trockene Sachen anzuziehen. Ein gemütliches Alltagswort.',
      beispiel: 'Truck di dröge Plünnen an, du büst natt.',
      beispiel_hd: 'Zieh dir trockene Sachen an, du bist nass.',
      kategorie: 'alltag'
    },
    {
      id: 'mk-023',
      ausdruck: 'Nu',
      hochdeutsch: 'nun / na',
      bedeutung: 'Nu leitet als „nun" oder „na" viele Sätze ein und gibt dem Plattdeutschen seinen Rhythmus. Nu maak man! bedeutet „nun mach mal!". Ein häufiges Füllwort.',
      beispiel: 'Nu kumm man rin, dat is koolt buten.',
      beispiel_hd: 'Nun komm doch rein, es ist kalt draußen.',
      kategorie: 'redensart'
    },
    {
      id: 'mk-024',
      ausdruck: 'Murr',
      hochdeutsch: 'schlechte Laune / Brummigkeit',
      bedeutung: 'Wer de Murr hett, ist mürrisch und schlecht gelaunt. Een murrige Keerl ist ein brummiger Kerl. Ein anschauliches Wort für norddeutsche Wortkargheit am Morgen.',
      beispiel: 'Vandaag hett he de Murr.',
      beispiel_hd: 'Heute ist er schlecht gelaunt.',
      kategorie: 'gefuehle'
    },
    {
      id: 'mk-025',
      ausdruck: 'Buur',
      hochdeutsch: 'Bauer',
      bedeutung: 'De Buur ist der Bauer, der das weite Land der Mecklenburger Felder bestellt. De Buurfru ist die Bäuerin. Die Landwirtschaft prägt die Region bis heute.',
      beispiel: 'De Buur föhrt mit den Trecker op dat Feld.',
      beispiel_hd: 'Der Bauer fährt mit dem Traktor aufs Feld.',
      kategorie: 'arbeit'
    },
    {
      id: 'mk-026',
      ausdruck: 'tofreden',
      hochdeutsch: 'zufrieden',
      bedeutung: 'tofreden heißt zufrieden. Ik bün tofreden bedeutet „ich bin zufrieden". Die ruhige, genügsame Zufriedenheit gilt als typisch für das mecklenburgische Wesen.',
      beispiel: 'Mit dat lütt Huus bün ik tofreden.',
      beispiel_hd: 'Mit dem kleinen Haus bin ich zufrieden.',
      kategorie: 'gefuehle'
    },
    {
      id: 'mk-027',
      ausdruck: 'Water',
      hochdeutsch: 'Wasser',
      bedeutung: 'Water ist das Wasser, an der Ostseeküste allgegenwärtig. Op dat Water kieken heißt aufs Meer schauen. Ein niederdeutsches Grundwort.',
      beispiel: 'Dat Water is vandaag ganz still.',
      beispiel_hd: 'Das Wasser ist heute ganz still.',
      kategorie: 'natur'
    },
    {
      id: 'mk-028',
      ausdruck: 'Sünn',
      hochdeutsch: 'Sonne',
      bedeutung: 'De Sünn ist die Sonne. Wenn de Sünn schient, sitt man giern an Strand. Ein freundliches Naturwort der niederdeutschen Mundart.',
      beispiel: 'Endlich kummt de Sünn rut.',
      beispiel_hd: 'Endlich kommt die Sonne heraus.',
      kategorie: 'natur'
    },
    {
      id: 'mk-029',
      ausdruck: 'Regen',
      hochdeutsch: 'Regen',
      bedeutung: 'Regen fällt an der Küste oft und reichlich. Bi Regen blifft man binnen un drinkt Tee. Ein häufiges Wetterwort im Norden.',
      beispiel: 'De Regen hört gor nich op.',
      beispiel_hd: 'Der Regen hört gar nicht auf.',
      kategorie: 'natur'
    },
    {
      id: 'mk-030',
      ausdruck: 'Boom',
      hochdeutsch: 'Baum',
      bedeutung: 'De Boom ist der Baum, Mehrzahl Bööm. Ünner den Boom find man Schatten. Ein niederdeutsches Wort, das in vielen Ortsnamen steckt.',
      beispiel: 'Vör dat Huus steiht en olen Boom.',
      beispiel_hd: 'Vor dem Haus steht ein alter Baum.',
      kategorie: 'natur'
    },
    {
      id: 'mk-031',
      ausdruck: 'Katt',
      hochdeutsch: 'Katze',
      bedeutung: 'De Katt ist die Katze, die es sich am warmen Ofen gemütlich macht. De Katt fangt de Müüs. Ein gängiges niederdeutsches Tierwort.',
      beispiel: 'De Katt liggt op de Fensterbank.',
      beispiel_hd: 'Die Katze liegt auf der Fensterbank.',
      kategorie: 'natur'
    },
    {
      id: 'mk-032',
      ausdruck: 'Peerd',
      hochdeutsch: 'Pferd',
      bedeutung: 'Dat Peerd ist das Pferd, das früher den Acker pflügte. Mecklenburg ist bekannt für seine Pferdezucht. Ein wichtiges Wort der ländlichen Welt.',
      beispiel: 'Dat Peerd treckt den Wagen.',
      beispiel_hd: 'Das Pferd zieht den Wagen.',
      kategorie: 'natur'
    },
    {
      id: 'mk-033',
      ausdruck: 'Huus',
      hochdeutsch: 'Haus',
      bedeutung: 'Dat Huus ist das Haus, oft ein altes Backsteinhaus mit Reetdach. Na Huus gahn heißt nach Hause gehen. Ein zentrales niederdeutsches Wort.',
      beispiel: 'Wi gaht nu na Huus.',
      beispiel_hd: 'Wir gehen jetzt nach Hause.',
      kategorie: 'orte'
    },
    {
      id: 'mk-034',
      ausdruck: 'Disch',
      hochdeutsch: 'Tisch',
      bedeutung: 'De Disch ist der Tisch, an dem die Familie sitzt und isst. Den Disch decken heißt den Tisch decken. Ein alltägliches Möbelwort.',
      beispiel: 'Dat Eten steiht al op den Disch.',
      beispiel_hd: 'Das Essen steht schon auf dem Tisch.',
      kategorie: 'alltag'
    },
    {
      id: 'mk-035',
      ausdruck: 'Hand',
      hochdeutsch: 'Hand',
      bedeutung: 'De Hand ist die Hand, Mehrzahl Hannen. Een Hand wäscht de anner ist ein bekanntes Sprichwort. Ein niederdeutsches Körperwort.',
      beispiel: 'Giff mi maal de Hand.',
      beispiel_hd: 'Gib mir mal die Hand.',
      kategorie: 'koerper'
    },
    {
      id: 'mk-036',
      ausdruck: 'eten',
      hochdeutsch: 'essen',
      bedeutung: 'eten heißt essen. Wat gifft dat to eten? fragt nach dem Essen. Dat Eten ist auch die Mahlzeit selbst. Ein zentrales Alltagsverb.',
      beispiel: 'Kumm, wi wüllt eten.',
      beispiel_hd: 'Komm, wir wollen essen.',
      kategorie: 'alltag'
    }
  ]
};
