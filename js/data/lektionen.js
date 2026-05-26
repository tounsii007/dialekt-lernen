// Mini-Lektionen — kurze Hochdeutsch-Artikel über Sprache, Geschichte
// und Kultur der deutschen Dialekte. Verlinkt auf konkrete Ausdrücke
// im Datensatz, damit Lesen und Lernen ineinandergreifen.
//
// Schema:
//   {
//     id:                'eindeutige-id',
//     title:             'Artikel-Titel',
//     kategorie:         'sprache' | 'geschichte' | 'kultur' | 'regionen',
//     dialekte:          ['koelsch', 'plattdeutsch'],   // betroffene Dialekt-IDs
//     emoji:             '🎭',
//     summary:           'ein bis zwei Sätze für die Karte',
//     content:           'Markdown-leichter Body (## Headlines, Leerzeilen = neue Absätze)',
//     relatedExpressions: [{ dialektId: 'koelsch', id: 'k-001' }, …]
//   }

export const LEKTIONEN = [
  {
    id: 'koelsch-jot',
    title: 'Warum hat Kölsch „jot" statt „gut"? — die rheinische Lautverschiebung',
    kategorie: 'sprache',
    dialekte: ['koelsch'],
    emoji: '🗣️',
    summary: 'Wer im Rheinland aufwächst, sagt nicht „gut", sondern „jot". Hinter diesem kleinen Vokal-Tausch steckt eine ganze Sprachgrenze.',
    content: `## Die magische „Benrather Linie"
Mitten durch Deutschland verläuft eine unsichtbare Sprachgrenze, die Linguisten die **Benrather Linie** nennen. Sie zieht sich von Aachen über Düsseldorf-Benrath bis nach Frankfurt/Oder. Nördlich dieser Linie sprechen die Menschen Niederdeutsch oder Mitteldeutsch — südlich davon Oberdeutsch.

## Was hat das mit „jot" zu tun?
Im 8. Jahrhundert vollzog sich im süddeutschen Raum die zweite oder „hochdeutsche" Lautverschiebung. Aus dem „p" wurde ein „pf", aus dem „t" ein „z" oder „ss" — und das „g" am Wortanfang wurde im Hochdeutschen zum harten Verschlusslaut. Im Rheinland und im Norden Deutschlands aber blieb das „g" oft ein weicher Reibelaut, fast ein „j".

## Die Kölner Spielart
Im Kölschen ist diese Tendenz besonders ausgeprägt:
- „gut" → **jot**
- „Geld" → **Jeld**
- „gerne" → **jän** (oder „jeer")
- „Gott" → **Jott**

Manche Sprachhistoriker vermuten, dass die Aussprache mit dem Einfluss des Niederländischen zu tun hat, das ebenfalls weichere Frikative bevorzugt. Andere führen sie auf den engen Kontakt der Rheinländer mit französischsprachigen Nachbarn zurück.

## Identitätsmerkmal Nummer eins
Kölner sind stolz auf ihr „jot". Wenn ein Kölner Karnevalist auf der Bühne ruft: „Et es jot, datt mer Kölle hann!" (Es ist gut, dass wir Köln haben!), dann ist das nicht nur ein netter Satz — es ist eine bewusste sprachliche Identitätsbekundung.

## Mehr als nur ein Vokal
Hinter dem „jot" steckt also über tausend Jahre Sprachgeschichte. Wer es ausspricht, transportiert ein Stück mittelalterliche Lautlehre und westgermanisches Erbe — und macht gleichzeitig ein Statement: „Hier bin ich zuhause."`,
    relatedExpressions: [
      { dialektId: 'koelsch', id: 'k-001' },
      { dialektId: 'koelsch', id: 'k-002' }
    ]
  },

  {
    id: 'maultaschen-mythos',
    title: 'Maultaschen-Mythos — schwäbische Fastenzeit-List',
    kategorie: 'kultur',
    dialekte: ['schwaebisch'],
    emoji: '🥟',
    summary: 'Wie die Schwaben in der Fastenzeit Fleisch in Teigtaschen versteckten und damit dem lieben Gott ein Schnippchen schlugen.',
    content: `## Der Herrgottsbescheißerle-Trick
Im katholischen Schwaben darf während der Fastenzeit kein Fleisch gegessen werden — so will es die kirchliche Tradition. Doch wer einmal Maultaschen probiert hat, weiß: Manche Versuchungen sind zu groß. Der Legende nach erfanden die Zisterzienser-Mönche von **Maulbronn** im 17. Jahrhundert eine geniale List: Sie hackten Fleisch klein, mischten es mit Spinat und versteckten alles in einem Quadrat aus Nudelteig. „Was Gott nicht sieht, das wird er nicht bemerken", soll der Abt gesagt haben.

So entstand der inoffizielle Beiname der Maultasche: **Herrgottsbescheißerle** — kleines Ding, mit dem man den lieben Gott betrügt.

## Stimmt das wirklich?
Sprachwissenschaftler sind skeptisch. Der Name **Maultasche** taucht erst im 18. Jahrhundert in schriftlichen Quellen auf, und das Wort „Maul" bezieht sich vermutlich schlicht auf die Form: eine kleine Tasche, die ans Maul erinnert — oder an den Beutel, in dem man Münzen und kleines Gerät trug.

Die Mönchs-Geschichte ist also wahrscheinlich eine spätere Erfindung — aber eine sehr schöne. Sie wird in Schwaben mit großem Schmunzeln erzählt und gehört zum schwäbischen Selbstbild dazu.

## Die kulinarische Realität
Heute gibt es Maultaschen in unzähligen Varianten: mit Bratenfüllung, mit Kalb, vegetarisch mit Spinat und Ricotta, sogar süß mit Pflaumen. In Suppe serviert, „geschmälzt" mit Röstzwiebeln und Butter, oder gebraten in Scheiben. Seit 2009 ist die schwäbische Maultasche eine **geschützte geografische Angabe** der EU.

## Die Moral von der Geschicht'
Ob Mönchslist oder Erfindung der Hausfrauen: Die Maultasche steht für eine schwäbische Tugend, die schon Hegel beschrieb — den **Sparsinn**. Aus Resten Fleisch, etwas Spinat und Teig wird ein vollwertiges Gericht. Und mit einer guten Geschichte schmeckt es gleich doppelt so gut.`,
    relatedExpressions: [
      { dialektId: 'schwaebisch', id: 's-002' }
    ]
  },

  {
    id: 'wien-wean',
    title: 'Wieso heißt Wien „Wean"? — der k. u. k.-Sprachen-Mix',
    kategorie: 'sprache',
    dialekte: ['wienerisch'],
    emoji: '🎻',
    summary: 'Im Wienerischen wird aus jedem langen „i" ein „ea" — der Klang einer Stadt, die jahrhundertelang Sprachen mischte.',
    content: `## Wean, Mean, Wean
Wenn ein Wiener sagt, er sei „daham in Wean", dann denkt der norddeutsche Tourist erst einmal, er habe sich verhört. Aber nein: Im Wienerischen wird das lange „ie" konsequent zum Diphthong „ea". Aus „Wien" wird **Wean**, aus „mir" wird **mea**, aus „Bier" wird **Bea**.

## Eine Lautverschiebung mit Geschichte
Diese sogenannte **Diphthongierung** ist ein klassisches Merkmal der oberdeutschen Mundarten. Sie entstand im späten Mittelalter und breitete sich von Süden nach Norden aus. In Hochdeutschen wurde sie standardisiert (mhd. „mîn" → nhd. „mein"), aber das „ie" als langes „i" blieb. Im Bairisch-Österreichischen ging die Verschiebung weiter — und so wurde auch aus dem langen „i" ein zweisilbiger Laut.

## Der k. u. k.-Faktor
Wien war bis 1918 Hauptstadt eines Vielvölkerstaates: Deutsche, Ungarn, Tschechen, Slowaken, Polen, Italiener, Kroaten, Juden aus Galizien — sie alle lebten in Wien und sprachen miteinander. Das Wienerische saugte Wörter aus allen Sprachen auf:

- **Tschechisch:** „Powidl" (Pflaumenmus), „Maschekseitn" (linke Seite)
- **Italienisch:** „Krawattl" (Krawatte, von ital. „cravatta"), „Tschecherl" (kleines Wirtshaus)
- **Französisch:** „Trottoir" (Bürgersteig), „Plafond" (Decke), „Lawór" (Waschschüssel)
- **Jiddisch:** „Beisl" (Kneipe), „Schmonzes" (Unsinn), „Hawara" (Freund)
- **Ungarisch:** „Fogosch" (Zander), „Palatschinken" (von ung. „palacsinta")

## Eine Stadt, ein Klang
Das Wienerische ist also kein „verzogenes" Hochdeutsch, sondern ein eigenständiger Stadtdialekt mit einer einzigartigen Mischung aus oberdeutscher Phonetik und dem Wortschatz halb Europas. Wenn ein Wiener sagt: „I geh in's Beisl auf a Krügerl Bier", dann hat er in einem Satz drei Sprachen vereint — und das ganz ohne nachzudenken.

## Hörbar Heimat
Junge Wiener mischen ihr Wienerisch heute oft mit Standarddeutsch — der „Wiener Schmäh" lebt aber weiter, in Liedern, Kabarett und im täglichen Plausch. Wer einmal in einem echten Wiener Beisl saß und sich von einem Wirt eine Geschichte erzählen ließ, vergisst diesen Klang nie wieder.`,
    relatedExpressions: [
      { dialektId: 'wienerisch', id: 'w-001' }
    ]
  },

  {
    id: 'platt-und-englisch',
    title: 'Plattdeutsch und Englisch — der gemeinsame niederdeutsche Ursprung',
    kategorie: 'sprache',
    dialekte: ['plattdeutsch'],
    emoji: '⛵',
    summary: 'Wer Plattdeutsch versteht, versteht plötzlich auch viel Englisch — und umgekehrt. Eine Reise in die gemeinsame Vergangenheit zweier Sprachen.',
    content: `## Geschwister, keine Cousins
Englisch und Hochdeutsch sind verwandt, aber relativ entfernt. Englisch und **Plattdeutsch** dagegen sind so nah miteinander verwandt, dass viele Wörter sich auf den ersten Blick ähneln. Der Grund: Beide Sprachen entstanden aus dem **Niederdeutschen** — der Sprache der Angeln, Sachsen und Friesen, die im 5. Jahrhundert nach Britannien auswanderten.

## Direkte Wortvergleiche
| Plattdeutsch | Englisch | Hochdeutsch |
|---|---|---|
| Water | water | Wasser |
| Appel | apple | Apfel |
| maken | to make | machen |
| Schipp | ship | Schiff |
| holpen | help | helfen |
| Dag | day | Tag |
| Wind | wind | Wind |
| Snee | snow | Schnee |
| Hus | house | Haus |
| Tied | time | Zeit |

In dieser Tabelle springt sofort ins Auge: **Plattdeutsch hat die hochdeutsche Lautverschiebung nicht mitgemacht.** Während aus dem alten „p" im Hochdeutschen ein „pf" oder „f" wurde („Appel" → „Apfel"), blieb es im Plattdeutschen ein einfaches „p" — genau wie im Englischen.

## Die Hanse als Brücke
Im Mittelalter war Plattdeutsch die **Lingua Franca** des Ostseeraums. Die Hanse handelte von London bis Nowgorod, ihre Geschäftssprache war Mittelniederdeutsch. Englische Hafenstädte übernahmen Hunderte plattdeutscher Wörter — und umgekehrt. Wörter wie „skipper", „boom", „mast", „freight" — alle haben niederdeutsche Wurzeln.

## Heute: Brückenfunktion
Plattdeutsche müssen im Englisch-Unterricht oft weniger pauken als andere Deutsche. Sätze wie „Dat is mien Hus" (Das ist mein Haus) klingen für englische Ohren fast schon bekannt: „That is my house". Auch grammatische Strukturen sind ähnlicher: Plattdeutsch nutzt keine umlautenden Pluralformen mehr, sondern oft ein einfaches „-s" wie das Englische („Bookers" = books).

## Vom Schiff zur Sprache
Wer Plattdeutsch lernt, betritt also eine Sprachlandschaft, die einen direkten Draht ins Englische hat. Und wer schon Englisch kann, versteht beim ersten Hören mehr Platt, als er denkt. Eine schöne Erinnerung daran, dass Sprachen keine starren Mauern haben — sondern Wege übers Wasser.`,
    relatedExpressions: [
      { dialektId: 'plattdeutsch', id: 'p-001' }
    ]
  },

  {
    id: 'karneval-fasching-fasnet',
    title: 'Karneval, Fasching, Fasnet — drei Wörter, drei Welten',
    kategorie: 'kultur',
    dialekte: ['koelsch', 'bayerisch', 'alemannisch', 'schwaebisch'],
    emoji: '🎭',
    summary: 'Eigentlich ist es dieselbe Zeit vor der Fastenzeit. Aber wie sie genannt wird — und wie sie gefeiert wird — sagt viel über die Regionen aus.',
    content: `## Drei Namen, eine Wurzel
Die fünfte Jahreszeit beginnt am 11. November um 11:11 Uhr und endet am Aschermittwoch. Aber wenn ein Kölner zu einem Münchner sagt: „Wir feiern Karneval!", wird er bestenfalls irritierte Blicke ernten. Denn was der Rheinländer „Karneval" nennt, heißt im bayerischen Raum **Fasching** und im alemannischen Süden **Fasnet**.

## Die Etymologie
Alle drei Wörter haben ihren Ursprung in der Fastenzeit, dem 40-tägigen Verzicht vor Ostern:

- **Karneval** kommt vom lateinischen „**carne vale**" — „Fleisch, lebe wohl!" Die letzte große Festzeit, bevor das Fleisch für 40 Tage verschwand.
- **Fasching** geht zurück auf das mittelhochdeutsche „**vaschanc**" oder „**vastschang**" — der Ausschank vor der Fastenzeit, der letzte ausgelassene Trunk.
- **Fasnet** (auch „Fastnacht") leitet sich vom „**Vorabend des Fastens**" ab — der Abend vor dem großen Verzicht. Dieser Name ist der älteste der drei und schon im Mittelalter belegt.

## Drei Welten, drei Charaktere
Der **Kölner Karneval** ist laut, bunt, politisch. Karnevalssitzungen, Büttenreden, Schunkellieder, der Rosenmontagszug mit seinen riesigen Persiflagewagen — Karneval ist Spektakel, mit eigener Musik und einer ganzen Industrie aus Vereinen.

Der **bayerische und österreichische Fasching** ist familienorientiert und etwas zurückhaltender. Faschingsbälle in Tracht, der Faschingsdienstag mit Krapfen, Schulfeste, manche bäuerliche Bräuche — Fasching ist Kostümierung und Tanz.

Die **alemannische Fasnet** wiederum ist der älteste Brauchtumskreis. Sie kennt keine Karnevalsvereine, sondern **Narrenzünfte**, die schon im 15. Jahrhundert dokumentiert sind. Die Masken sind kunstvoll geschnitzte Holz-Larven, die oft Jahrhunderte alt sind und vom Vater an den Sohn weitergereicht werden. Hier geht es nicht um Witze, sondern um den Austrieb des Winters — fast schon rituell.

## Wo verläuft die Grenze?
Linguistisch verläuft die „Karneval-Grenze" etwa entlang des Mains. Nördlich davon spricht man eher von Karneval, südlich von Fasching oder Fasnet. In Hessen sagt man je nach Region beides. In Berlin? Da sagt man eigentlich gar nichts — der Karneval ist dort nie wirklich heimisch geworden. „Berliner können nicht karnevalen", heißt es spöttisch.

## Eines verbindet alle drei
Egal ob Karneval, Fasching oder Fasnet: Die Idee ist die gleiche — einmal im Jahr darf man der sein, der man sonst nicht sein darf. Mit Maske, in Kostümen, in der Sprache der Narren. Das Volk regiert für ein paar Tage, der Bürgermeister gibt sich geschlagen, die Welt steht Kopf. Und am Aschermittwoch ist dann doch alles vorbei.`,
    relatedExpressions: [
      { dialektId: 'koelsch', id: 'k-001' }
    ]
  },

  {
    id: 'bayern-vs-franken',
    title: 'Bayern vs. Franken — der ewige Streit',
    kategorie: 'regionen',
    dialekte: ['bayerisch', 'fraenkisch'],
    emoji: '⚔️',
    summary: 'Auf Karten gehört Franken zu Bayern. Im Herzen der Franken aber? Niemals. Eine kurze Geschichte einer fortwährenden Identitätsfrage.',
    content: `## „Mir san net Bayern!"
Wer einem Franken sagt, er sei „doch ein Bayer", löst zuverlässig Empörung aus. Dabei ist Franken seit 1806 staatsrechtlich Teil des Königreichs (heute Freistaat) Bayern. Aber die fränkische Identität ist viel älter als diese politische Zuordnung — und sie hat sich nie unterordnen lassen.

## Die napoleonische Hochzeit
Bis ins 19. Jahrhundert war Franken ein Patchwork aus Hochstiften (Würzburg, Bamberg, Eichstätt), Reichsstädten (Nürnberg, Rothenburg) und Markgrafschaften. Erst die Säkularisierung unter **Napoleon** und der **Reichsdeputationshauptschluss** von 1803 zerschlugen diese Strukturen. 1806 wurde dann das **Königreich Bayern** ausgerufen — und Franken wurde, ob es wollte oder nicht, ein Teil davon.

## Die Sprachgrenze
Auch sprachlich gibt es einen klaren Unterschied. Während **Bairisch** zum Oberdeutschen gehört (Lautverschiebung „p" → „pf", „t" → „ts"), ist **Fränkisch** ein ostfränkischer Dialekt, näher am Mitteldeutschen. Typische Unterschiede:

- Bayerisch: „**Wasser**" → /va-sserr/, Fränkisch: /va-ßer/
- Bayerisch: „**Bua**" für Junge — Fränkisch sagt „**Booch**" oder „Bua"
- Bayerisch: „**Servus!**" — Fränkisch sagt eher „**Grüß Gott!**" oder „Hawedere"
- Bayerisch: hartes Konsonanten-T — Fränkisch: weiches D wo Hochdeutsch ein T hat („**Doch**" für „Tag", „**Drebbm**" für „Treppe")

## Das Bier-Argument
Bier ist nicht nur Getränk, sondern auch Identitätsmerkmal. Bayern ist stolz auf sein **Reinheitsgebot** von 1516. Franken hält jedoch dagegen: Hier gibt es die **größte Brauereidichte der Welt** — über 250 Brauereien auf dem Gebiet Oberfrankens. Jede fränkische Kleinstadt hat ihr eigenes Bier, oft seit Jahrhunderten. „Mia ham mehr Brauereien als ganz Bayern zusammen", sagen die Franken — und es stimmt.

## Die Symbol-Schlacht
- Bayern: weiß-blaue Rauten, der Löwe, das Hofbräuhaus, Lederhose, Maß Bier, Wiesn-Hendl
- Franken: rot-weißer Rechen, der Fränkische Rechen, Bocksbeutel-Wein, Schäuferla mit Klöß, Drei-im-Weckla (drei Bratwürste im Brötchen)

Wer in Nürnberg „Wos für a Wurst?" fragt, bekommt mit Bestimmtheit eine **Nürnberger Rostbratwurst** — niemals eine Weißwurst. Und Bocksbeutel ist die einzige Weinflasche, die das EU-Recht namentlich schützt — sie steht für Frankenwein.

## Versöhnung? Vielleicht
Der Streit ist heute meist gutmütig. Auf dem Oktoberfest verkaufen Münchner T-Shirts mit „Free Franken!" — als ironischen Gag. Und Franken kommen tatsächlich zur Wiesn, trinken Bier und beschweren sich nur halbherzig über die Süffigkeit des Weizenbiers. Aber sobald die Touristen verschwinden, sagt der Franke wieder: „Mei, mir san halt net wia die Bayern. Mir san Franken."

## Die Lektion
Wer in Nürnberg „Servus" sagt, outet sich sofort als Münchner oder Tourist. Wer „Grüß Gott" oder „Hawedere" sagt, gehört dazu. So einfach ist das. Und so kompliziert.`,
    relatedExpressions: [
      { dialektId: 'fraenkisch', id: 'fr-001' }
    ]
  },

  {
    id: 'berliner-schnauze',
    title: 'Berliner Schnauze — wie eine Hauptstadt sprechen lernt',
    kategorie: 'kultur',
    dialekte: ['berlinisch'],
    emoji: '🐻',
    summary: 'Schlagfertig, ruppig, herzlich — die Berliner Schnauze ist legendär. Aber woher kommt diese besondere Art zu reden?',
    content: `## Schlagfertigkeit als Lebensform
„**Wat denkste eigentlich, wer du bist?**" — kaum eine Stadt hat ihren Sprachstil so kultiviert wie Berlin. Die berühmte Berliner Schnauze ist Schlagfertigkeit, Direktheit und Witz in einem. Wer in Berlin morgens Brötchen kauft und freundlich „Guten Morgen" sagt, kann es passieren, dass die Verkäuferin antwortet: „Na, was Besseres jefunden hamse heut nicht?" Und das ist nicht böse gemeint — das ist Berliner Liebe.

## Eine Stadt voller Zuwanderer
Berlin war schon im 17. Jahrhundert eine Einwanderer-Stadt. **Hugenotten** aus Frankreich, **Salzburger Exulanten**, polnische und schlesische Arbeiter, böhmische Glaubensflüchtlinge — sie alle brachten ihre Sprachen mit. Aus diesem Sprachen-Cocktail entstand das Berlinische — ursprünglich ein Mitteldeutscher Dialekt, der sich mit niederdeutschem Substrat, französischen Lehnwörtern und jiddischen Einflüssen mischte.

Typische Wörter aus dieser Geschichte:
- **„Boulette"** — von französisch „boulette" (Kügelchen): die Berliner Frikadelle
- **„Mokick"** — französisch „motocyclette" verkürzt
- **„meschugge"** — jiddisch „verrückt"
- **„Schlamassel"** — jiddisch „Unheil, schlimme Lage"
- **„koscher"** — jiddisch „in Ordnung"

## Der Klang
Phonetisch ist das Berlinische geprägt durch:
- **„ick"** statt „ich" (auch in nicht-betonten Positionen: „**Det weeß ick nich**")
- **„j"** statt „g" am Wortanfang („**jut, jeht, jewesen**")
- **„au"** wird breit zu „**oo**" („**ooch**" für „auch")
- **Umlaute werden entrundet:** „**Bröt**chen" wird zu „**Brötchen**" mit hellem Vokal

## Die Schnauze als Selbstschutz
Die ruppige Direktheit der Berliner ist historisch zu erklären. Eine wachsende Industrie-Metropole im 19. Jahrhundert, voller Fabrikarbeiter, Marktfrauen, Droschkenkutscher und Dienstboten — in diesem Milieu war Schlagfertigkeit Lebensnotwendigkeit. Wer auf dem Wochenmarkt am **Hackeschen Markt** nicht laut wurde, verkaufte nichts. Wer in der Mietskaserne nicht zurückgab, wurde überrollt.

So entstand ein Sprachstil, der ungerührt wirkt, aber Wärme darunter trägt. „**Ick liebe dir**" sagen Berliner in einer eigentümlichen, fast falschen Dativ-Form — aber sie meinen es. Direkter als ein „Ich liebe dich".

## Reuter, Falladar, Zille
Berliner Schriftsteller haben das Berlinische literarisch geadelt. **Heinrich Zille** porträtierte das Milljöh um 1900 mit Zeichnungen und Bildunterschriften in Mundart. **Hans Fallada**, **Alfred Döblin** („Berlin Alexanderplatz") nutzten den Dialekt als Stilmittel. Und natürlich **Otto Reuter**, der mit Berliner Couplets die Vorkriegszeit prägte: „**In fünfzig Jahren ist alles vorbei!**"

## Heute: Bedrohte Mundart
Das echte Berlinische wird seltener. Junge Berliner sprechen oft Standarddeutsch, mit höchstens einem leichten Akzent. Die alte „Berliner Schnauze" hört man noch bei älteren Generationen, in Kreuzberg, Neukölln, Wedding, Pankow. Aber sie verschwindet langsam, weil ständig neue Bewohner zuziehen — aus Schwaben, aus Bayern, aus aller Welt.

Wer das Berlinische noch lebendig erleben will, sollte einen alten Späti besuchen, eine Currywurst-Bude am S-Bahnhof, oder einen Senior auf der Parkbank ansprechen. Vielleicht antwortet der dann: „**Wat willste, junger Mann? Ick hab keene Zeit für Quatsch.**" Und das ist dann gut — denn das ist Berlin pur.`,
    relatedExpressions: [
      { dialektId: 'berlinisch', id: 'b-001' }
    ]
  },

  {
    id: 'schwizerduetsch-mehrsprachigkeit',
    title: 'Schwizerdütsch ist kein Deutsch — die Mehrsprachigkeit der Schweiz',
    kategorie: 'sprache',
    dialekte: ['schwizerduetsch'],
    emoji: '🇨🇭',
    summary: 'Schweizerdeutsch ist nicht eine Mundart, sondern Dutzende. Und mit Hochdeutsch hat es manchmal weniger zu tun, als man denkt.',
    content: `## Vier Landessprachen, ein Land
Die Schweiz hat vier offizielle Landessprachen: **Deutsch** (ca. 63 %), **Französisch** (ca. 23 %), **Italienisch** (ca. 8 %) und **Rätoromanisch** (knapp 0,5 %). Schon das macht die Schweiz besonders. Aber innerhalb des deutschsprachigen Teils gibt es nochmals eine ganze Welt für sich: das **Schwizerdütsch**.

## Was ist Schwizerdütsch eigentlich?
Schwizerdütsch ist **kein einheitlicher Dialekt**, sondern eine Sammlung von alemannischen Dialekten, die in der Deutschschweiz gesprochen werden. Ein Berner, ein Zürcher und ein Walliser verstehen einander zwar — meistens —, aber sie sprechen sehr unterschiedlich:

- **Berndeutsch**: gedehnt, weich, mit gerolltem R („Bärndütsch")
- **Zürichdeutsch**: schnell, klar, leicht zu lernen
- **Walliserdeutsch**: archaisch, oft sogar für andere Schweizer schwer verständlich
- **Baseldeutsch**: stark vom Französischen beeinflusst, beweglich
- **St. Galler Dialekt**: trocken, knapp, mit einem Hang zur Untertreibung

## Schwizerdütsch hat keine Standardform
Das Bemerkenswerte: Es gibt **keine schriftliche Standardform** für Schwizerdütsch. Geschrieben wird Standarddeutsch (also Hochdeutsch). Gesprochen wird Mundart — immer und überall. Auch im Fernsehen, in den Nachrichten (außer „Tagesschau"-Stil), am Arbeitsplatz, in der Schule (informell). Hochdeutsch sprechen Schweizer nur, wenn sie müssen — z. B. mit Ausländern oder in formellen Reden.

## Die berühmte Diglossie
Linguisten nennen das eine **Diglossie**: zwei Sprachen, die in unterschiedlichen Situationen verwendet werden. In der Schweiz lebt jeder mit beiden — Schwizerdütsch ist die Muttersprache, Hochdeutsch ist eine erlernte „Fremdsprache", die in der Schule gepaukt wird. Schüler in Zürich oder Bern sprechen ihr Hochdeutsch oft mit hörbarem Schweizer Akzent — was wiederum von Deutschen als „niedlich" empfunden wird, was die Schweizer wiederum nervt.

## Wörter, die kein Deutscher versteht
Schwizerdütsch hat einen eigenen Wortschatz, der oft nichts mit Hochdeutsch zu tun hat:

- **Velo** (Französisch für „Fahrrad" — kein „Fahrrad")
- **Trottoir** (Bürgersteig)
- **Glace** (Eis, gesprochen [ˈɡlas])
- **Coiffeur** (Friseur)
- **Pneu** (Reifen, von franz. „pneu")
- **Billet** (Fahrkarte)

Aus dem Italienischen kamen Wörter wie **„Spaghetti"** als Alltagswort lange vor Deutschland. Aus dem Französischen praktisch das ganze Vokabular des täglichen Lebens. Und dazu kommen Eigenkreationen wie **„Müesli"** (das berühmte schweizer Frühstück), **„Rösti"** (Bratkartoffel-Klassiker) oder **„Cervelat"** (Wurst).

## Der Röstigraben
Innerhalb der Schweiz gibt es eine berühmte Sprachgrenze: den **Röstigraben** — die Linie zwischen deutsch- und französischsprachiger Schweiz. „Röstigraben" ist eine ironische Bezeichnung für die kulturellen Unterschiede: Die Welschen (Französischsprachigen) wählen tendenziell linker, die Deutschschweizer konservativer. Bei Abstimmungen sind die Resultate oft genau entgegengesetzt — und Schweizer Politiker müssen damit leben.

## Eine eigene Identität
Schwizerdütsch ist nicht nur Sprache, sondern Identität. Wenn ein Schweizer im Ausland einen anderen Schweizer hört — egal woher in der Schweiz —, fühlt er sich sofort zuhause. Der Klang ist Heimat. Und auch wenn jüngere Schweizer durch Globalisierung und Migration ihren Dialekt verändern, bleibt eines: Sie werden niemals freiwillig auf Hochdeutsch wechseln. Außer es muss sein.`,
    relatedExpressions: [
      { dialektId: 'schwizerduetsch', id: 'sd-001' }
    ]
  },

  {
    id: 'haendelsprache-hanse',
    title: 'Die Hanse — als Plattdeutsch die Weltsprache des Nordens war',
    kategorie: 'geschichte',
    dialekte: ['plattdeutsch'],
    emoji: '⛵',
    summary: 'Zwischen 1200 und 1600 sprach man von Brügge bis Nowgorod eine gemeinsame Sprache: Mittelniederdeutsch. Wie kam es dazu — und wieso verschwand sie?',
    content: `## Die Liga der freien Städte
Im Mittelalter schlossen sich Kaufleute aus norddeutschen Hafenstädten zur **Hanse** zusammen — einer Handels- und Verteidigungs-Allianz, die etwa 200 Städte umfasste. Kernländer waren Lübeck (Haupt-Stadt), Hamburg, Bremen, Rostock, Stralsund, Danzig — aber auch Kontor-Städte wie Brügge (Belgien), Bergen (Norwegen), London (England) und Nowgorod (Russland).

Sie führten Handelsschiffe, organisierten Märkte, vermittelten Recht — und sie alle sprachen miteinander **Mittelniederdeutsch**, eine Vorform des heutigen Plattdeutschen.

## Die Lingua Franca des Nordens
Mittelniederdeutsch war von 1200 bis etwa 1600 die **Geschäftssprache des Ostseeraums**. Verträge, Briefe, Rechnungen wurden in Plattdeutsch verfasst. Skandinavische Königshäuser kommunizierten plattdeutsch mit deutschen Kaufleuten. Hunderte Wörter wanderten von Plattdeutsch ins Schwedische, Norwegische, Dänische:

- Schwedisch **„fönster"** (Fenster) ← plattdeutsch „Finster" (statt deutsch „Fenster")
- Norwegisch **„språk"** (Sprache) ← plattdeutsch „Sprake"
- Dänisch **„begynde"** (beginnen) ← plattdeutsch „beginnen"

Sprachhistoriker schätzen, dass **30–50 % des heutigen schwedischen und dänischen Wortschatzes** auf plattdeutsche Lehnwörter zurückgehen. Eine beeindruckende Spur.

## Der Niedergang
Mit dem Aufstieg der frühneuhochdeutschen Hochsprache — vor allem durch **Luthers Bibelübersetzung** ins Mitteldeutsche (1534) — verlor Plattdeutsch seinen Status als Schriftsprache. Die Hanse selbst zerbröselte: Konkurrenten wie die Niederländer, Engländer und Schweden übernahmen den Seehandel. Mit der Hanse verschwand auch die plattdeutsche Schriftkultur.

Bis ins 19. Jahrhundert wurde Plattdeutsch nur noch mündlich gesprochen — von Bauern, Fischern, Hafenarbeitern. Es wurde zur „Sprache der einfachen Leute".

## Die Renaissance
Im 19. Jahrhundert wurden Volkssprachen plötzlich wieder geadelt — die Romantik entdeckte die Mundart als Träger nationaler Identität. Schriftsteller wie **Klaus Groth** und **Fritz Reuter** schrieben Romane und Gedichte auf Plattdeutsch und wurden Bestseller-Autoren. Es entstanden plattdeutsche Wörterbücher, Theatergruppen, Liedersammlungen.

## Heute: Lebendig und bedroht
Plattdeutsch hat heute noch etwa **2,5 Millionen Sprecher** in Norddeutschland — und ist 1999 in der **Europäischen Sprachencharta** als Regional- oder Minderheitensprache anerkannt worden. Es wird an Schulen unterrichtet (z. B. in Schleswig-Holstein), im Radio gesendet (z. B. „**Plattdüütsch in NDR**"), in Kirchen gepredigt.

Aber die Sprecherzahl sinkt jedes Jahrzehnt. Junge Norddeutsche sprechen oft kein Platt mehr — höchstens noch ein paar Wörter, in nostalgischen Gespräch mit dem Großvater. Trotzdem: Wer im Hamburger Hafen einen Schiffer beim Klönsnack hört, hört noch immer einen Nachhall der **Hanse-Welt-Sprache**.

## Eine schöne Lektion
Sprachen sind keine festen Größen. Sie steigen auf, dominieren ihr Reich, weichen wieder anderen Sprachen. Mittelniederdeutsch war einmal so wichtig wie heute Englisch — und ist heute fast vergessen. Vielleicht ist das ein nachdenklicher Hinweis darauf, dass auch die heutigen Weltsprachen einmal verschwinden werden. Plattdeutsch zeigt: Sprachen leben. Auch wenn sie kleiner werden.`,
    relatedExpressions: [
      { dialektId: 'plattdeutsch', id: 'p-001' }
    ]
  },

  {
    id: 'saechsisch-luther',
    title: 'Sächsisch und Luther — die Mutter des Hochdeutschen',
    kategorie: 'geschichte',
    dialekte: ['saechsisch'],
    emoji: '📖',
    summary: 'Heute wird Sächsisch oft belächelt. Dabei ist es einer der Vorväter des heutigen Hochdeutschen — durch einen Mann mit Tinte und Bibelübersetzung.',
    content: `## Vom Hofdialekt zur Hochsprache
Wenn heute jemand sagt: „Sächsisch klingt komisch" — dann ist das eine historische Ironie. Denn der **obersächsisch-meißnische Kanzleidialekt** war im 16. Jahrhundert die Grundlage, auf der das heutige Hochdeutsch aufgebaut wurde. Wir alle sprechen heute eine Sprache, die eine moderne Variante des damaligen Sächsischen ist.

## Martin Luther und die Bibel
**Martin Luther** (1483–1546) übersetzte zwischen 1521 und 1534 die Bibel ins Deutsche. Damals gab es noch keine einheitliche deutsche Sprache — jede Region sprach ihren Dialekt, und es kursierten unterschiedliche regionale Schreibsprachen. Luther entschied sich, für seine Bibel-Übersetzung den **obersächsisch-meißnischen Kanzleidialekt** zu wählen — die Verwaltungssprache des sächsischen Hofes in Wittenberg.

Sein Ziel: Eine Sprache, die in ganz Deutschland verstanden werden konnte. Er nahm Wörter aus verschiedenen Regionen auf, fragte einfache Leute („**dem Volk aufs Maul schauen**"), und schuf so eine geschriebene Sprache, die im katholischen Süden ebenso wie im protestantischen Norden lesbar war.

## Warum gerade Sächsisch?
Das Sächsische des 16. Jahrhunderts war aus mehreren Gründen prädestiniert:

1. **Geographische Mitte**: Sachsen lag zwischen Nord- und Süddeutschland — sprachlich ein Kompromiss zwischen den großen Dialektgruppen.
2. **Politisches Gewicht**: Der sächsische Kurfürstenhof war einer der mächtigsten Höfe des Reiches.
3. **Druckerwesen**: Wittenberg und Leipzig hatten bedeutende Buchdruckereien — Luthers Bibel wurde dort gedruckt und verbreitete sich rasend schnell.
4. **Reformatorischer Schub**: Mit der Reformation wurde Luthers Sprache zur protestantischen „Sakralsprache" — und damit zur Sprache der Gebildeten in halb Europa.

## Wie modernisierte sich die Schreibsprache?
Aus dem Frühneuhochdeutschen Luthers entwickelte sich über die Jahrhunderte das heutige Standarddeutsch. Phonetisch entfernte es sich von der gesprochenen sächsischen Mundart — Lautverschiebungen, Umlaute und Vokalqualitäten wurden vereinheitlicht. Was geblieben ist: der **Wortschatz** und die **Grammatik**.

## Was hat das mit dem heutigen Sächsisch zu tun?
Wenig — und gleichzeitig viel. Das heutige **gesprochene Sächsisch** (z. B. „Da Mor**g**n is **g**roß**ßzü**gig") hat sich phonetisch deutlich weiterentwickelt und klingt anders als die Schriftsprache. Die rundenden Vokale („Käse" → „Käeshe"), die weichen B/P-Konsonanten, das gerollte R — all das macht das Sächsische heute zu einer eigenständigen Mundart, die mit dem Standard-Hochdeutschen oft nicht mehr sofort als „Mutter" identifizierbar ist.

## Sächsisch hat ein PR-Problem
Trotzdem genießt Sächsisch heute einen schwierigen Ruf. In Umfragen rangiert es regelmäßig auf den letzten Plätzen der „beliebtesten deutschen Dialekte". Komiker imitieren es für Lacher. Politiker wechseln vor Kameras instinktiv ins Hochdeutsche, um nicht als „Provinzler" zu wirken. Das ist historisch ungerecht — denn ohne das Sächsische des 16. Jahrhunderts würden wir alle heute anders sprechen.

## Eine Versöhnung
Vielleicht hilft das Wissen, dass Sächsisch die historische Wurzel des Hochdeutschen ist, beim nächsten Mal, wenn man jemanden über das Sächsische lachen hört. Es war einmal die prestigeträchtigste Sprache des deutschen Sprachraums. Und auch wenn das heute viele nicht mehr wissen — die Geschichte wird durch Verschweigen nicht vergessen.`,
    relatedExpressions: [
      { dialektId: 'saechsisch', id: 'sx-001' }
    ]
  },
];

export function getLektion(id) {
  return LEKTIONEN.find(l => l.id === id) || null;
}

export function getLektionenByDialekt(dialektId) {
  return LEKTIONEN.filter(l => l.dialekte.includes(dialektId));
}
