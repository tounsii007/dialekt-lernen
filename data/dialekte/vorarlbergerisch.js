// Vorarlbergerisch — Dialektdaten
// Format: jedes Objekt ist ein Ausdruck im Dialekt mit Bedeutung auf Hochdeutsch.

export default {
  id: 'vorarlbergerisch',
  name: 'Vorarlbergerisch',
  region: 'Vorarlberg',
  bundesland: 'Vorarlberg (Österreich)',
  flag: '🧀',
  farbe: '#bc4749',
  beschreibung: 'Vorarlbergerisch ist der einzige nicht-bairische Dialekt Österreichs — es gehört zum Alemannischen und ist eng mit dem Schweizerdeutschen und Schwäbischen verwandt. Berühmt ist das Wort Gsi (gewesen), das den Vorarlbergern den Spitznamen „Gsiberger" einbrachte. Geprägt von Alpkäserei und Walser Siedlungsgeschichte.',
  sprecher: 'ca. 0,4 Mio.',
  lang: 'de-AT',
  ausdruecke: [
    {
      id: 'vb-001',
      ausdruck: 'Gsi',
      hochdeutsch: 'gewesen',
      bedeutung: 'Gsi heißt gewesen — I bin det gsi bedeutet „ich bin dort gewesen". Das Wort ist so typisch, dass die Vorarlberger im übrigen Österreich Gsiberger genannt werden.',
      beispiel: 'I bi gescht in Bregenz gsi.',
      beispiel_hd: 'Ich bin gestern in Bregenz gewesen.',
      kategorie: 'redensart'
    },
    {
      id: 'vb-002',
      ausdruck: 'Hoi',
      hochdeutsch: 'Hallo',
      bedeutung: 'Hoi ist der lockere alemannische Gruß, den Vorarlberg mit der Schweiz teilt. Man grüßt Freunde und Bekannte mit einem kurzen Hoi. Förmlicher wäre Grüß Gott.',
      beispiel: 'Hoi, wie gohts der?',
      beispiel_hd: 'Hallo, wie geht es dir?',
      kategorie: 'begruessung'
    },
    {
      id: 'vb-003',
      ausdruck: 'Habidere',
      hochdeutsch: 'Begrüßung (Habe die Ehre)',
      bedeutung: 'Habidere kommt von „habe die Ehre" und dient als gehobener Gruß. Wird sowohl beim Kommen als auch scherzhaft-höflich im Alltag verwendet.',
      beispiel: 'Habidere mitanand!',
      beispiel_hd: 'Habe die Ehre miteinander!',
      kategorie: 'begruessung'
    },
    {
      id: 'vb-004',
      ausdruck: 'Pfüot di',
      hochdeutsch: 'Auf Wiedersehen / Behüt dich',
      bedeutung: 'Pfüot di ist der Abschiedsgruß, von „behüte dich Gott". Zu mehreren sagt man Pfüot ich. Ein herzlicher Gruß beim Auseinandergehen.',
      beispiel: 'Pfüot di, mir gsehnd is morn.',
      beispiel_hd: 'Tschüss, wir sehen uns morgen.',
      kategorie: 'begruessung'
    },
    {
      id: 'vb-005',
      ausdruck: 'Käsknöpfle',
      hochdeutsch: 'Käsespätzle',
      bedeutung: 'Käsknöpfle sind die Vorarlberger Käsespätzle, mit reichlich Bergkäse und Röstzwiebeln, dazu Apfelmus. Das Nationalgericht des Ländles und auf jeder Alpe zu Hause.',
      beispiel: 'Auf dr Alp gits zmittag Käsknöpfle.',
      beispiel_hd: 'Auf der Alm gibt es mittags Käsespätzle.',
      kategorie: 'essen'
    },
    {
      id: 'vb-006',
      ausdruck: 'Riebel',
      hochdeutsch: 'gebröselte Grießmehlspeise',
      bedeutung: 'Riebel ist eine in der Pfanne goldbraun geröstete Mehl-Grieß-Speise, die zerkleinert und süß mit Apfelmus gegessen wird. Ein traditionelles Vorarlberger Bauerngericht.',
      beispiel: 'Zmorga essend mir gern Riebel.',
      beispiel_hd: 'Zum Frühstück essen wir gern Riebel.',
      kategorie: 'essen'
    },
    {
      id: 'vb-007',
      ausdruck: 'Sura Kees',
      hochdeutsch: 'Sauerkäse',
      bedeutung: 'Sura Kees ist ein magerer, würziger Sauermilchkäse aus dem Bregenzerwald, sauer mit Essig und Zwiebel angemacht. Eine geschützte Spezialität mit langer Tradition.',
      beispiel: 'Dr Sura Kees schmeckt mit Zibele.',
      beispiel_hd: 'Der Sauerkäse schmeckt mit Zwiebeln.',
      kategorie: 'essen'
    },
    {
      id: 'vb-008',
      ausdruck: 'Mostbröckle',
      hochdeutsch: 'luftgetrocknetes Rindfleisch',
      bedeutung: 'Mostbröckle ist luftgetrocknetes, gepökeltes Rindfleisch, hauchdünn aufgeschnitten. Eine Vorarlberger Spezialität, die gern zu einem Glas Most gereicht wird.',
      beispiel: 'Zum Most gits Mostbröckle.',
      beispiel_hd: 'Zum Most gibt es luftgetrocknetes Rindfleisch.',
      kategorie: 'essen'
    },
    {
      id: 'vb-009',
      ausdruck: 'Ländle',
      hochdeutsch: 'Vorarlberg (Kosename)',
      bedeutung: 'Es Ländle ist der liebevolle Kosename der Vorarlberger für ihr eigenes Bundesland. Im Ländle daheim zu sein ist Ausdruck von Heimatstolz und Verbundenheit.',
      beispiel: 'Im Ländle isch s am scheenschta.',
      beispiel_hd: 'In Vorarlberg ist es am schönsten.',
      kategorie: 'orte'
    },
    {
      id: 'vb-010',
      ausdruck: 'Bueb',
      hochdeutsch: 'Junge',
      bedeutung: 'Dr Bueb ist der Junge oder junge Mann. Auch als anerkennende Anrede gebräuchlich. Weibliches Gegenstück ist s Modle. Ein alemannisches Grundwort.',
      beispiel: 'Dr Bueb hilft am Hof mit.',
      beispiel_hd: 'Der Junge hilft am Hof mit.',
      kategorie: 'familie'
    },
    {
      id: 'vb-011',
      ausdruck: 'Modle',
      hochdeutsch: 'Mädchen',
      bedeutung: 'S Modle ist das Mädchen, die alemannische Verkleinerung. Ein liebevolles Wort für ein Mädchen oder eine junge Frau, das Pendant zum Bueb.',
      beispiel: 'S Modle goht in d Schuel.',
      beispiel_hd: 'Das Mädchen geht in die Schule.',
      kategorie: 'familie'
    },
    {
      id: 'vb-012',
      ausdruck: 'Götti',
      hochdeutsch: 'Pate / Taufpate',
      bedeutung: 'Dr Götti ist der Taufpate, s Gotta die Patin. Götti und Gotta haben eine wichtige Rolle im Familienleben und beschenken die Patenkinder. Ein alemannisches Wort.',
      beispiel: 'Mi Götti schenkt mr ebbas zum Geburtstag.',
      beispiel_hd: 'Mein Pate schenkt mir etwas zum Geburtstag.',
      kategorie: 'familie'
    },
    {
      id: 'vb-013',
      ausdruck: 'luaga',
      hochdeutsch: 'schauen / gucken',
      bedeutung: 'luaga heißt schauen oder gucken. Luag emol! bedeutet „schau mal!". Ein typisch alemannisches Verb, das Vorarlberg mit der Schweiz und Baden teilt.',
      beispiel: 'Luag emol, was do los isch!',
      beispiel_hd: 'Schau mal, was hier los ist!',
      kategorie: 'alltag'
    },
    {
      id: 'vb-014',
      ausdruck: 'gschiid',
      hochdeutsch: 'klug / gescheit',
      bedeutung: 'gschiid bedeutet klug oder vernünftig. Sei gschiid! mahnt zur Vernunft. Übertrieben gschiid daherreden kann auch besserwisserisch wirken.',
      beispiel: 'Des isch gschiid gmacht gsi.',
      beispiel_hd: 'Das war klug gemacht.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-015',
      ausdruck: 'ebbas',
      hochdeutsch: 'etwas',
      bedeutung: 'ebbas heißt etwas, das Gegenstück ist nüd (nichts). Wer ebbas Rechts gleert hat, hat etwas Ordentliches gelernt. Ein alemannisches Grundwort.',
      beispiel: 'I muess no ebbas erledige.',
      beispiel_hd: 'Ich muss noch etwas erledigen.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-016',
      ausdruck: 'nüd',
      hochdeutsch: 'nicht / nichts',
      bedeutung: 'nüd bedeutet nicht oder nichts. Des isch nüd wohr heißt „das ist nicht wahr". Eines der häufigsten Verneinungswörter im alemannischen Vorarlberg.',
      beispiel: 'I han nüd gwüsst dervo.',
      beispiel_hd: 'Ich habe nichts davon gewusst.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-017',
      ausdruck: 'Stüble',
      hochdeutsch: 'Stube / gute Stube',
      bedeutung: 'S Stüble ist die getäfelte, beheizte Wohnstube des Bauernhauses, oft mit Kachelofen. Ein gemütlicher Rückzugsort, in dem sich die Familie versammelt.',
      beispiel: 'Im Stüble isch s schö warm.',
      beispiel_hd: 'In der Stube ist es schön warm.',
      kategorie: 'orte'
    },
    {
      id: 'vb-018',
      ausdruck: 'Schopf',
      hochdeutsch: 'Schuppen / Anbau',
      bedeutung: 'Dr Schopf ist ein Schuppen oder offener Anbau am Haus, in dem Holz, Geräte oder das Auto Platz finden. Ein alemannisches Wort für den Nebenbau.',
      beispiel: 'S Holz lit hinterm Schopf.',
      beispiel_hd: 'Das Holz liegt hinter dem Schuppen.',
      kategorie: 'orte'
    },
    {
      id: 'vb-019',
      ausdruck: 'Tobel',
      hochdeutsch: 'Schlucht / Waldgraben',
      bedeutung: 'Es Tobel ist eine enge, bewaldete Schlucht mit einem Bach, wie sie in den Vorarlberger Bergen häufig vorkommt. Viele Orts- und Flurnamen enthalten das Wort Tobel.',
      beispiel: 'Dr Wäg führt durchs Tobel.',
      beispiel_hd: 'Der Weg führt durch die Schlucht.',
      kategorie: 'natur'
    },
    {
      id: 'vb-020',
      ausdruck: 'Walser',
      hochdeutsch: 'Nachkommen der Walliser Siedler',
      bedeutung: 'Die Walser sind Nachkommen der im Mittelalter aus dem Wallis eingewanderten Siedler, etwa im Großen Walsertal. Ihr Walserdialekt und ihre Kultur sind bis heute eigenständig.',
      beispiel: 'D Walser hand a eigeni Sproch.',
      beispiel_hd: 'Die Walser haben eine eigene Sprache.',
      kategorie: 'menschen'
    },
    {
      id: 'vb-021',
      ausdruck: 'zmorga',
      hochdeutsch: 'Frühstück / morgens',
      bedeutung: 'zmorga bezeichnet das Frühstück oder die Tageszeit am Morgen. Z Morga essa heißt frühstücken. Entsprechend gibt es zmittag und znacht für die übrigen Mahlzeiten.',
      beispiel: 'Zmorga gits Kaffee und Riebel.',
      beispiel_hd: 'Zum Frühstück gibt es Kaffee und Riebel.',
      kategorie: 'essen'
    },
    {
      id: 'vb-022',
      ausdruck: 'znacht',
      hochdeutsch: 'Abendessen / abends',
      bedeutung: 'znacht ist das Abendessen oder die Zeit am Abend. Z Nacht essa heißt zu Abend essen. Teil der alemannischen Reihe zmorga, zmittag, znacht.',
      beispiel: 'Was gits hüt znacht?',
      beispiel_hd: 'Was gibt es heute zum Abendessen?',
      kategorie: 'essen'
    },
    {
      id: 'vb-023',
      ausdruck: 'schwätza',
      hochdeutsch: 'reden / sprechen',
      bedeutung: 'schwätza heißt reden oder sich unterhalten, ohne abwertenden Beiklang. Vorarlbergerisch schwätza bedeutet, den Dialekt zu sprechen. Ein häufiges Alltagsverb.',
      beispiel: 'Mir hand lang mitanand gschwätzt.',
      beispiel_hd: 'Wir haben lange miteinander geredet.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-024',
      ausdruck: 'gugg',
      hochdeutsch: 'Tüte / Papiersack',
      bedeutung: 'A Gugg ist eine Tüte oder ein Papiersack, etwa für Süßigkeiten oder Einkäufe. Ein im alemannischen und bairischen Raum verbreitetes Wort.',
      beispiel: 'Tue d Öpfel in d Gugg.',
      beispiel_hd: 'Tu die Äpfel in die Tüte.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-025',
      ausdruck: 'Öpfel',
      hochdeutsch: 'Apfel',
      bedeutung: 'Dr Öpfel ist der Apfel, aus dem im Ländle auch der Most gepresst wird. Die alemannische Lautung mit Ö ist typisch und unterscheidet Vorarlberg vom übrigen Österreich.',
      beispiel: 'Im Herbst gits viel Öpfel.',
      beispiel_hd: 'Im Herbst gibt es viele Äpfel.',
      kategorie: 'natur'
    },
    {
      id: 'vb-026',
      ausdruck: 'Most',
      hochdeutsch: 'Apfel- oder Birnenmost',
      bedeutung: 'Dr Most ist der vergorene Apfel- oder Birnensaft, ein traditionelles Getränk. In vielen Höfen wird eigener Most gepresst und im Keller gelagert.',
      beispiel: 'Dr Bur presst sin eigene Most.',
      beispiel_hd: 'Der Bauer presst seinen eigenen Most.',
      kategorie: 'essen'
    },
    {
      id: 'vb-027',
      ausdruck: 'gampa',
      hochdeutsch: 'wackeln / nicht fest stehen',
      bedeutung: 'gampa oder gampfa heißt wackeln oder schaukeln, wenn etwas nicht fest steht. Dr Tisch gampet bedeutet, der Tisch wackelt. Ein anschauliches Bewegungswort.',
      beispiel: 'Dr Stuel gampet, sitz nüd druf.',
      beispiel_hd: 'Der Stuhl wackelt, setz dich nicht drauf.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-028',
      ausdruck: 'huara',
      hochdeutsch: 'sehr / extrem (Verstärkung)',
      bedeutung: 'huara ist eine derbe, aber sehr gebräuchliche Verstärkung im Sinne von „extrem" oder „sehr". Huara guat heißt „richtig gut". Unter Jüngeren allgegenwärtig.',
      beispiel: 'Des isch huara guat gsi.',
      beispiel_hd: 'Das ist richtig gut gewesen.',
      kategorie: 'gefuehle'
    },
    {
      id: 'vb-029',
      ausdruck: 'Bürle',
      hochdeutsch: 'Brötchen / Weckle',
      bedeutung: 'A Bürle ist ein rundes Brötchen oder Weckle. Beim Beck holt man morgens frische Bürle. Die Verkleinerung auf -le ist alemannisch typisch.',
      beispiel: 'I hol no zwei Bürle.',
      beispiel_hd: 'Ich hole noch zwei Brötchen.',
      kategorie: 'essen'
    },
    {
      id: 'vb-030',
      ausdruck: 'Bsuach',
      hochdeutsch: 'Besuch',
      bedeutung: 'Dr Bsuach ist der Besuch. Wenn Bsuach kunnt, wird aufgetischt, denn Gastfreundschaft wird im Ländle großgeschrieben. Auf Bsuach goh heißt jemanden besuchen.',
      beispiel: 'Am Sunntig kunnt dr Bsuach.',
      beispiel_hd: 'Am Sonntag kommt der Besuch.',
      kategorie: 'familie'
    },
    {
      id: 'vb-031',
      ausdruck: 'Muotter',
      hochdeutsch: 'Mutter',
      bedeutung: 'D Muotter ist die Mutter. Sie hält die Familie zusammen und kocht die Käsknöpfle. Zusammen mit Vatter eines der wichtigsten Familienwörter im Ländle.',
      beispiel: 'D Muotter kocht hüt znacht.',
      beispiel_hd: 'Die Mutter kocht heute Abend.',
      kategorie: 'familie'
    },
    {
      id: 'vb-032',
      ausdruck: 'Vatter',
      hochdeutsch: 'Vater',
      bedeutung: 'Dr Vatter ist der Vater. Er arbeitet, schafft am Hof oder im Betrieb. Mit Muotter und de Kinder bildet er die alemannische Familie.',
      beispiel: 'Mi Vatter schafft in dr Fabrik.',
      beispiel_hd: 'Mein Vater arbeitet in der Fabrik.',
      kategorie: 'familie'
    },
    {
      id: 'vb-033',
      ausdruck: 'Chind',
      hochdeutsch: 'Kind',
      bedeutung: 'Es Chind ist das Kind, Mehrzahl d Chinder. Die alemannische Lautung mit Ch ist typisch und verbindet Vorarlberg eng mit dem Schweizerdeutschen.',
      beispiel: 'D Chinder spielnd im Garta.',
      beispiel_hd: 'Die Kinder spielen im Garten.',
      kategorie: 'familie'
    },
    {
      id: 'vb-034',
      ausdruck: 'Wätter',
      hochdeutsch: 'Wetter',
      bedeutung: 'Es Wätter ist das Wetter, in den Bergen oft wechselhaft. Bei schö Wätter goht man wandern, bei schlecht Wätter blibt man dahei. Ein häufiges Naturwort.',
      beispiel: 'Hüt hämmer es schö Wätter.',
      beispiel_hd: 'Heute haben wir schönes Wetter.',
      kategorie: 'natur'
    },
    {
      id: 'vb-035',
      ausdruck: 'Reaga',
      hochdeutsch: 'Regen',
      bedeutung: 'Dr Reaga ist der Regen, der im Bregenzerwald häufig fällt. Bei Reaga zieht man d Gummistiefel a. Ein alltägliches Wetterwort des Ländles.',
      beispiel: 'Bi dem Reaga blibmr lieber dahei.',
      beispiel_hd: 'Bei diesem Regen bleiben wir lieber daheim.',
      kategorie: 'natur'
    },
    {
      id: 'vb-036',
      ausdruck: 'Sunna',
      hochdeutsch: 'Sonne',
      bedeutung: 'D Sunna ist die Sonne. Wenn d Sunna scht, sitzt man gern am See. Ein freundliches Wort, das die warme Jahreszeit am Bodensee ankündigt.',
      beispiel: 'D Sunna schint hüt dr ganz Tag.',
      beispiel_hd: 'Die Sonne scheint heute den ganzen Tag.',
      kategorie: 'natur'
    },
    {
      id: 'vb-037',
      ausdruck: 'Schnee',
      hochdeutsch: 'Schnee',
      bedeutung: 'Dr Schnee fällt im Winter reichlich in den Bergen und lockt zum Schifahren. Viel Schnee bedeutet gute Pisten im Montafon oder Bregenzerwald.',
      beispiel: 'Am Berg liit scho viel Schnee.',
      beispiel_hd: 'Am Berg liegt schon viel Schnee.',
      kategorie: 'natur'
    },
    {
      id: 'vb-038',
      ausdruck: 'Senn',
      hochdeutsch: 'Senner / Älpler',
      bedeutung: 'Dr Senn bewirtschaftet im Sommer die Alp und macht aus der Milch den Bergkäse. Die Arbeit als Senn ist hart, gehört aber zur Vorarlberger Tradition.',
      beispiel: 'Dr Senn macht obn an guata Käs.',
      beispiel_hd: 'Der Senner macht oben einen guten Käse.',
      kategorie: 'arbeit'
    },
    {
      id: 'vb-039',
      ausdruck: 'Suppa',
      hochdeutsch: 'Suppe',
      bedeutung: 'D Suppa ist die Suppe, oft als erster Gang oder leichtes Abendessen. A warmi Suppa tut bei kaltem Wätter gut. Ein alltägliches Küchenwort.',
      beispiel: 'Z Mittag gits a haaßi Suppa.',
      beispiel_hd: 'Zu Mittag gibt es eine heiße Suppe.',
      kategorie: 'essen'
    },
    {
      id: 'vb-040',
      ausdruck: 'znüni',
      hochdeutsch: 'Vormittagsjause',
      bedeutung: 'Es znüni ist die kleine Zwischenmahlzeit am Vormittag, gegen neun Uhr. Beim znüni gibts a Brot und an Kaffee. Ein alemannisches Wort, geteilt mit der Schweiz.',
      beispiel: 'Zum znüni gits a Käsbrot.',
      beispiel_hd: 'Zur Vormittagsjause gibt es ein Käsebrot.',
      kategorie: 'essen'
    },
    {
      id: 'vb-041',
      ausdruck: 'zvieri',
      hochdeutsch: 'Nachmittagsjause',
      bedeutung: 'Es zvieri ist die Zwischenmahlzeit am Nachmittag, gegen vier Uhr. Beim zvieri trinkt man Kaffee und isst ebbas Süaßes. Pendant zum znüni am Vormittag.',
      beispiel: 'Am Nomittag mächmr es zvieri.',
      beispiel_hd: 'Am Nachmittag machen wir eine Jause.',
      kategorie: 'essen'
    },
    {
      id: 'vb-042',
      ausdruck: 'Hus',
      hochdeutsch: 'Haus',
      bedeutung: 'Es Hus ist das Haus. Hei is Hus goh bedeutet nach Hause gehen. Im Ländle baut man gern ein eigenes Hus mit viel Holz. Ein zentrales Ortswort.',
      beispiel: 'Üser Hus stoht am Berghang.',
      beispiel_hd: 'Unser Haus steht am Berghang.',
      kategorie: 'orte'
    },
    {
      id: 'vb-043',
      ausdruck: 'Schual',
      hochdeutsch: 'Schule',
      bedeutung: 'D Schual ist die Schule. D Chinder gönd in d Schual. Ein alltägliches Wort, das den Tagesablauf vieler Familien bestimmt.',
      beispiel: 'S Modle goht gern in d Schual.',
      beispiel_hd: 'Das Mädchen geht gern in die Schule.',
      kategorie: 'orte'
    },
    {
      id: 'vb-044',
      ausdruck: 'goh',
      hochdeutsch: 'gehen',
      bedeutung: 'goh heißt gehen. I goh hei bedeutet „ich gehe heim". Ein zentrales Verb, das in vielen Wendungen vorkommt, etwa go luaga (schauen gehen).',
      beispiel: 'I goh jetz langsam hei.',
      beispiel_hd: 'Ich gehe jetzt langsam heim.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-045',
      ausdruck: 'cho',
      hochdeutsch: 'kommen',
      bedeutung: 'cho heißt kommen. Chuscht du au? bedeutet „kommst du auch?". Ein alemannisches Grundverb, das Vorarlberg eng mit der Schweiz teilt.',
      beispiel: 'Chuscht du morn au mit?',
      beispiel_hd: 'Kommst du morgen auch mit?',
      kategorie: 'alltag'
    },
    {
      id: 'vb-046',
      ausdruck: 'macha',
      hochdeutsch: 'machen',
      bedeutung: 'macha heißt machen oder tun. Was machsch? bedeutet „was machst du?". Eines der häufigsten Verben im alltäglichen Vorarlberger Sprachgebrauch.',
      beispiel: 'Was machsch du am Wuchenend?',
      beispiel_hd: 'Was machst du am Wochenende?',
      kategorie: 'alltag'
    },
    {
      id: 'vb-047',
      ausdruck: 'schaffa',
      hochdeutsch: 'arbeiten',
      bedeutung: 'schaffa heißt arbeiten. Viel schaffa müaßa bedeutet „viel arbeiten müssen". Der Fleiß hat im Ländle einen hohen Stellenwert.',
      beispiel: 'I muass morn wieder schaffa.',
      beispiel_hd: 'Ich muss morgen wieder arbeiten.',
      kategorie: 'arbeit'
    },
    {
      id: 'vb-048',
      ausdruck: 'hüt',
      hochdeutsch: 'heute',
      bedeutung: 'hüt bedeutet heute. Hüt han i frei heißt „heute habe ich frei". Zusammen mit moarn (morgen) und gescht (gestern) ein wichtiges Zeitwort.',
      beispiel: 'Hüt bliibmr dahei.',
      beispiel_hd: 'Heute bleiben wir daheim.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-049',
      ausdruck: 'moarn',
      hochdeutsch: 'morgen',
      bedeutung: 'moarn bedeutet morgen, der kommende Tag. Bis moarn! sagt man beim Abschied. Gegenstück sind hüt (heute) und gescht (gestern).',
      beispiel: 'Moarn gömmr ga wandera.',
      beispiel_hd: 'Morgen gehen wir wandern.',
      kategorie: 'alltag'
    },
    {
      id: 'vb-050',
      ausdruck: 'guat',
      hochdeutsch: 'gut',
      bedeutung: 'guat heißt gut. Des isch guat gsi bedeutet „das ist gut gewesen". Eines der häufigsten Eigenschaftswörter, auch im Gruß alles Guate.',
      beispiel: 'Des Essa isch richtig guat gsi.',
      beispiel_hd: 'Das Essen ist richtig gut gewesen.',
      kategorie: 'gefuehle'
    }
  ]
};
