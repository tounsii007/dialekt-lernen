// Ostfriesisch — Dialektdaten
// Format: jedes Objekt ist ein Ausdruck im Dialekt mit Bedeutung auf Hochdeutsch.

export default {
  id: 'ostfriesisch',
  name: 'Ostfriesisch',
  region: 'Ostfriesland',
  bundesland: 'Niedersachsen',
  flag: '🫖',
  farbe: '#0b7a75',
  beschreibung: 'Ostfriesisches Platt ist eine niederdeutsche (plattdeutsche) Mundart der Nordseeküste. Geprägt von Seefahrt, Watt und Deich — und vor allem von der berühmten ostfriesischen Teekultur mit Kluntje und Wölkje. Der Gruß Moin gilt zu jeder Tageszeit.',
  sprecher: 'ca. 0,2 Mio.',
  lang: 'de-DE',
  ausdruecke: [
    {
      id: 'of-001',
      ausdruck: 'Moin',
      hochdeutsch: 'Hallo (zu jeder Tageszeit)',
      bedeutung: 'Moin ist der allgegenwärtige ostfriesische Gruß — morgens, mittags, abends. Er kommt nicht von Morgen, sondern von einem Wort für gut. Ein einzelnes Moin genügt völlig.',
      beispiel: 'Moin, allns klor bi di?',
      beispiel_hd: 'Hallo, alles in Ordnung bei dir?',
      kategorie: 'begruessung'
    },
    {
      id: 'of-002',
      ausdruck: 'Moin moin',
      hochdeutsch: 'Hallo (doppelt)',
      bedeutung: 'Moin moin ist die verdoppelte Begrüßung. Viele Ostfriesen sehen das doppelte Moin schon als Geschwätz, denn ein einfaches Moin reicht eigentlich aus.',
      beispiel: 'Moin moin, lang nich sehn!',
      beispiel_hd: 'Hallo, lange nicht gesehen!',
      kategorie: 'begruessung'
    },
    {
      id: 'of-003',
      ausdruck: 'Tschüss un Adjüs',
      hochdeutsch: 'Tschüss / Auf Wiedersehen',
      bedeutung: 'Adjüs (vom französischen adieu) ist der plattdeutsche Abschiedsgruß. Oft hört man auch die Wendung Tschüss un Adjüs beim Auseinandergehen an der Küste.',
      beispiel: 'Tschüss un Adjüs, kumm good na Hus!',
      beispiel_hd: 'Tschüss, komm gut nach Hause!',
      kategorie: 'begruessung'
    },
    {
      id: 'of-004',
      ausdruck: 'Kluntje',
      hochdeutsch: 'Kandiszucker',
      bedeutung: 'Ein Kluntje ist der große weiße Kandiszucker, der bei der Teezeremonie zuerst in die Tasse gelegt wird. Wenn der heiße Tee darüber gegossen wird, knistert der Kluntje hörbar.',
      beispiel: 'Erst kummt de Kluntje in de Kopp.',
      beispiel_hd: 'Zuerst kommt der Kandiszucker in die Tasse.',
      kategorie: 'essen'
    },
    {
      id: 'of-005',
      ausdruck: 'Wölkje',
      hochdeutsch: 'Sahnewölkchen im Tee',
      bedeutung: 'Das Wölkje ist das Sahnewölkchen, das man vorsichtig an den Tassenrand in den Tee gleiten lässt. Es darf keinesfalls umgerührt werden — so entsteht das typische Wölkje.',
      beispiel: 'Loop de Sahn an de Rand rin, denn givt dat en Wölkje.',
      beispiel_hd: 'Lass die Sahne am Rand hineinlaufen, dann gibt es ein Wölkchen.',
      kategorie: 'essen'
    },
    {
      id: 'of-006',
      ausdruck: 'Theetied',
      hochdeutsch: 'Teezeit',
      bedeutung: 'Theetied ist die heilige ostfriesische Teezeit. Mehrmals täglich wird stark schwarzer Tee mit Kluntje und Wölkje getrunken — ein immaterielles Kulturerbe der Region.',
      beispiel: 'Üm dree is bi uns Theetied.',
      beispiel_hd: 'Um drei ist bei uns Teezeit.',
      kategorie: 'essen'
    },
    {
      id: 'of-007',
      ausdruck: 'Köm',
      hochdeutsch: 'Kümmel- oder Kornschnaps',
      bedeutung: 'Köm ist der klare Schnaps, oft Kümmel- oder Kornbrand, der an der Küste gegen Wind und Wetter getrunken wird. Ein Lütt un Lütt verbindet Bier mit einem Köm.',
      beispiel: 'Na de Arbeit smeckt en Köm.',
      beispiel_hd: 'Nach der Arbeit schmeckt ein Schnaps.',
      kategorie: 'essen'
    },
    {
      id: 'of-008',
      ausdruck: 'Deern',
      hochdeutsch: 'Mädchen',
      bedeutung: 'Deern ist das Mädchen oder die junge Frau, ein liebevolles norddeutsches Wort. Männliches Gegenstück ist de Jung. Lütte Deern bedeutet kleines Mädchen.',
      beispiel: 'De lütte Deern speelt an Strand.',
      beispiel_hd: 'Das kleine Mädchen spielt am Strand.',
      kategorie: 'familie'
    },
    {
      id: 'of-009',
      ausdruck: 'Jung',
      hochdeutsch: 'Junge',
      bedeutung: 'Jung ist der Junge oder Bub, auch als vertraute Anrede unter Männern: Na, Jung? Zusammen mit Deern das übliche Wortpaar für Kinder im Plattdeutschen.',
      beispiel: 'De Jung helpt sien Vader an Boot.',
      beispiel_hd: 'Der Junge hilft seinem Vater am Boot.',
      kategorie: 'familie'
    },
    {
      id: 'of-010',
      ausdruck: 'lütt',
      hochdeutsch: 'klein',
      bedeutung: 'lütt heißt klein. En lütte Pause ist eine kleine Pause, een Lütten ein Schnaps. Eines der charakteristischsten Wörter des Plattdeutschen überhaupt.',
      beispiel: 'Wi maakt mal en lütte Pause.',
      beispiel_hd: 'Wir machen mal eine kleine Pause.',
      kategorie: 'alltag'
    },
    {
      id: 'of-011',
      ausdruck: 'Schiet',
      hochdeutsch: 'Mist / Dreck',
      bedeutung: 'Schiet bezeichnet Dreck, aber auch Ärger oder dummes Zeug. De ganze Schiet meint den ganzen Kram. Ein deftiges, gutmütig gebrauchtes Allzweckwort.',
      beispiel: 'So en Schiet, dat Wedder is leep!',
      beispiel_hd: 'So ein Mist, das Wetter ist schlecht!',
      kategorie: 'schimpf'
    },
    {
      id: 'of-012',
      ausdruck: 'Buddel',
      hochdeutsch: 'Flasche',
      bedeutung: 'Buddel ist die Flasche. Das Buddelschiff ist das berühmte Flaschenschiff. An der Küste wird so manche Buddel Köm geleert. Ein urtümliches Wort.',
      beispiel: 'Maak mal de Buddel apen.',
      beispiel_hd: 'Mach mal die Flasche auf.',
      kategorie: 'alltag'
    },
    {
      id: 'of-013',
      ausdruck: 'tüdelig',
      hochdeutsch: 'verwirrt / wirr',
      bedeutung: 'tüdelig ist, wer durcheinander, vergesslich oder leicht verwirrt ist. Davon kommt auch der Tüddelkram. Ein freundliches Wort für kleine Schusseligkeit.',
      beispiel: 'Ik bün vandaag ganz tüdelig.',
      beispiel_hd: 'Ich bin heute ganz durcheinander.',
      kategorie: 'gefuehle'
    },
    {
      id: 'of-014',
      ausdruck: 'Tüddelkram',
      hochdeutsch: 'Krimskrams / Unsinn',
      bedeutung: 'Tüddelkram ist unnützes Zeug, Krimskrams oder umständlicher Unsinn. Mach kien Tüddelkram bedeutet, sich nicht mit Nebensächlichem aufzuhalten.',
      beispiel: 'Lat den Tüddelkram un kumm to Pott.',
      beispiel_hd: 'Lass den Krimskrams und komm zur Sache.',
      kategorie: 'alltag'
    },
    {
      id: 'of-015',
      ausdruck: 'Klönschnack',
      hochdeutsch: 'gemütliches Plaudern',
      bedeutung: 'Ein Klönschnack ist das gemütliche, zwanglose Schwätzchen, oft beim Tee. Der Klönschnack pflegt die Gemeinschaft und gehört zum norddeutschen Alltag.',
      beispiel: 'Wi harrn en lütten Klönschnack över Tee.',
      beispiel_hd: 'Wir hatten ein kleines Schwätzchen beim Tee.',
      kategorie: 'redensart'
    },
    {
      id: 'of-016',
      ausdruck: 'klönen',
      hochdeutsch: 'gemütlich plaudern',
      bedeutung: 'klönen heißt entspannt und ausgiebig plaudern. Man klönt mit Nachbarn über Gott und die Welt. Das Substantiv dazu ist der Klönschnack.',
      beispiel: 'Wi hebbt lang över de Tuun klöönt.',
      beispiel_hd: 'Wir haben lange über den Zaun geplaudert.',
      kategorie: 'alltag'
    },
    {
      id: 'of-017',
      ausdruck: 'Watt',
      hochdeutsch: 'Wattenmeer',
      bedeutung: 'Dat Watt ist der bei Ebbe trockenfallende Meeresboden, das Wattenmeer. Eine Wattwanderung führt bei Niedrigwasser hinaus. Prägend für Natur und Tourismus der Küste.',
      beispiel: 'Bi Ebb gaht wi in dat Watt.',
      beispiel_hd: 'Bei Ebbe gehen wir ins Wattenmeer.',
      kategorie: 'natur'
    },
    {
      id: 'of-018',
      ausdruck: 'Priel',
      hochdeutsch: 'Wasserrinne im Watt',
      bedeutung: 'Ein Priel ist eine Wasserrinne im Watt, die auch bei Ebbe Wasser führt. Priele können bei auflaufender Flut schnell gefährlich werden — Vorsicht beim Wattwandern.',
      beispiel: 'Pass op, de Priel löppt gau vull.',
      beispiel_hd: 'Pass auf, die Wasserrinne füllt sich schnell.',
      kategorie: 'natur'
    },
    {
      id: 'of-019',
      ausdruck: 'Deich',
      hochdeutsch: 'Deich',
      bedeutung: 'De Deich schützt das tief liegende Land vor der Nordsee. Wat nich will dieken, mutt wieken (Wer nicht deichen will, muss weichen) ist ein altes Küstensprichwort.',
      beispiel: 'Wi maakt en Spazeergang op den Deich.',
      beispiel_hd: 'Wir machen einen Spaziergang auf dem Deich.',
      kategorie: 'orte'
    },
    {
      id: 'of-020',
      ausdruck: 'Schapp',
      hochdeutsch: 'Schrank',
      bedeutung: 'Dat Schapp ist der Schrank. Im Schapp werden Geschirr, Wäsche oder Vorräte verstaut. Ein gängiges Möbelwort des plattdeutschen Haushalts.',
      beispiel: 'De Tassen staht in dat Schapp.',
      beispiel_hd: 'Die Tassen stehen im Schrank.',
      kategorie: 'alltag'
    },
    {
      id: 'of-021',
      ausdruck: 'fix un fardig',
      hochdeutsch: 'völlig erschöpft',
      bedeutung: 'Wer fix un fardig ist, ist vollkommen erschöpft und am Ende seiner Kräfte. Eine sehr gebräuchliche norddeutsche Wendung nach harter Arbeit.',
      beispiel: 'Na de Schicht bün ik fix un fardig.',
      beispiel_hd: 'Nach der Schicht bin ich völlig erschöpft.',
      kategorie: 'gefuehle'
    },
    {
      id: 'of-022',
      ausdruck: 'dröge',
      hochdeutsch: 'trocken / nüchtern',
      bedeutung: 'dröge heißt trocken, sowohl beim Wetter als auch beim Humor. Ein dröger Typ hat einen trockenen, hintergründigen Witz. Vielseitiges Küstenwort.',
      beispiel: 'He hett en dröge Aart to vertellen.',
      beispiel_hd: 'Er hat eine trockene Art zu erzählen.',
      kategorie: 'gefuehle'
    },
    {
      id: 'of-023',
      ausdruck: 'Smutje',
      hochdeutsch: 'Schiffskoch',
      bedeutung: 'De Smutje ist der Koch an Bord eines Schiffes. Vom Smutje hängt die Stimmung der Mannschaft ab — ein guter Smutje ist auf See viel wert.',
      beispiel: 'De Smutje kookt vandaag Labskaus.',
      beispiel_hd: 'Der Schiffskoch kocht heute Labskaus.',
      kategorie: 'arbeit'
    },
    {
      id: 'of-024',
      ausdruck: 'Fischkopp',
      hochdeutsch: 'Norddeutscher (Spitzname)',
      bedeutung: 'Fischkopp ist der scherzhafte Spitzname für die Küstenbewohner Norddeutschlands. Die Fischköpp tragen ihn mit Stolz — ein gutmütiges Necken aus dem Süden.',
      beispiel: 'Wi Fischköpp mögt dat Water.',
      beispiel_hd: 'Wir Norddeutschen mögen das Wasser.',
      kategorie: 'menschen'
    },
    {
      id: 'of-025',
      ausdruck: 'Matjes',
      hochdeutsch: 'junger, milder Hering',
      bedeutung: 'Matjes ist ein junger, mild gesalzener Hering, an der Küste eine Delikatesse. Frischer Matjes mit Zwiebeln und Brot ist im Frühsommer ein Festschmaus.',
      beispiel: 'To Pingsten gifft dat frischen Matjes.',
      beispiel_hd: 'Zu Pfingsten gibt es frischen Matjes.',
      kategorie: 'essen'
    },
    {
      id: 'of-026',
      ausdruck: 'Stuten',
      hochdeutsch: 'Weißbrot / Rosinenbrot',
      bedeutung: 'Stuten ist ein süßliches Weiß- oder Rosinenbrot, das gern zum Tee gegessen wird. Der Rosinenstuten ist besonders zu festlichen Anlässen beliebt.',
      beispiel: 'To de Tee givt dat Stuten mit Botter.',
      beispiel_hd: 'Zum Tee gibt es Rosinenbrot mit Butter.',
      kategorie: 'essen'
    },
    {
      id: 'of-027',
      ausdruck: 'proten',
      hochdeutsch: 'reden / sprechen',
      bedeutung: 'proten heißt reden oder sprechen. Platt proten bedeutet, Plattdeutsch zu sprechen. Wer veel proot, redet viel. Ein zentrales Verb des Niederdeutschen.',
      beispiel: 'Kannst du Platt proten?',
      beispiel_hd: 'Kannst du Plattdeutsch sprechen?',
      kategorie: 'alltag'
    },
    {
      id: 'of-028',
      ausdruck: 'Ebbe un Floot',
      hochdeutsch: 'Ebbe und Flut',
      bedeutung: 'Ebbe un Floot, der ständige Wechsel der Gezeiten, bestimmt das Leben an der Küste. Nach Ebbe kummt Floot ist auch ein tröstliches Sprichwort für schlechte Zeiten.',
      beispiel: 'Ebbe un Floot wesselt twee Maal an Dag.',
      beispiel_hd: 'Ebbe und Flut wechseln zweimal am Tag.',
      kategorie: 'natur'
    },
    {
      id: 'of-029',
      ausdruck: 'Butt',
      hochdeutsch: 'Plattfisch / Scholle',
      bedeutung: 'De Butt ist der Plattfisch, etwa die Scholle oder Flunder. Aus dem Märchen kennt man den Butt, der Wünsche erfüllt. Ein typischer Fisch der Nordsee.',
      beispiel: 'Vandaag hebbt wi en Butt fungen.',
      beispiel_hd: 'Heute haben wir einen Plattfisch gefangen.',
      kategorie: 'natur'
    },
    {
      id: 'of-030',
      ausdruck: 'sutje',
      hochdeutsch: 'langsam / sachte',
      bedeutung: 'sutje (auch sachte) heißt langsam, vorsichtig, mit Ruhe. Sutje an bedeutet, etwas gemächlich angehen zu lassen — passend zur gelassenen Küstenmentalität.',
      beispiel: 'Man sutje, wi hebbt Tied.',
      beispiel_hd: 'Immer langsam, wir haben Zeit.',
      kategorie: 'alltag'
    },
    {
      id: 'of-031',
      ausdruck: 'Lepel',
      hochdeutsch: 'Löffel',
      bedeutung: 'De Lepel ist der Löffel. Bei der Teezeremonie hat er eine besondere Rolle: Legt man den Lepel in die Tasse, signalisiert man höflich, dass man satt ist und keinen Tee mehr möchte.',
      beispiel: 'Na dree Koppen lee ik de Lepel rin.',
      beispiel_hd: 'Nach drei Tassen lege ich den Löffel hinein.',
      kategorie: 'alltag'
    },
    {
      id: 'of-032',
      ausdruck: 'leep',
      hochdeutsch: 'schlimm / schlecht',
      bedeutung: 'leep bedeutet schlimm, böse oder schlecht. Dat is leep heißt, das ist übel. Ein altes niederdeutsches Wort für eine unerfreuliche Lage.',
      beispiel: 'Dat Wedder is vandaag richtig leep.',
      beispiel_hd: 'Das Wetter ist heute richtig schlimm.',
      kategorie: 'gefuehle'
    }
  ]
};
