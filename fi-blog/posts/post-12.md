---
title: Würstchen grillen im Laser Cutter
des: In diesem Artikel erläutere ich, wie man rein theoretisch Würstchen im Laser Cutter grillen kann.
date: 2023-12-18
imagepath: /articlecontents/Artikel12/LaserCutter.jpg
id: Hausaufgabe
topic: Hausaufgabe 06
---
# Einleitung

Da ja (wie jeder weiß) jeder des Kurses einen Artikel über den Lasercutter schreiben muss, ist hier meine Variante eines Tutorials, wie man den Lasercutter bedient und was man alles (90% davon sind definitiv mit den Ordnungen des FabLabs konform, bei den Aktivitäten, die am Ende des Artikels geschildert werden, liegt die volle Verantwortung bei Mika) damit machen kann.

![Laser Fusion M2](/articlecontents/Artikel12/LaserCutter.jpg)

Genauer gesagt dreht sich dieser Artikel um den Epilog Laser Fusion M2.

# Software

Bevor ich etwas lasern kann, muss ich etwas entwerfen. Solange ich es zweidimensional auf Filament, Holz oder MDF (Medium-Density-Fiberboard) lasern kann ist meiner Fantasie freien Lauf gesetzt. Ich habe mit Frau Hartmann zusammen einen 2D-Wasserkocher als Insider für Prof. Dr. Siebenlist entworfen, den man sich an den Weihnachtsbaum hängen kann. Für Professor Bök wollten wir ein Bärchen mit der Aufschrift “Bökibärchen” lasern. Dieses Projekt verschwand allerdings aus zeitlichen Gründen in der Versenkung. Jedenfalls kann ich mehrere Softwarelösungen verwenden um eine solche Skizze zu entwerfen. Der entscheidende Punkt ist: Die Software muss in ein Format kompilieren, welches dem Drucker Vektoren übergibt. Mehr dazu aber gleich.

## Fusion 360

![Fusion360](/articlecontents/Artikel12/Fusion.png)

(Quelle: Edwin Revera - Autodesk Fusion Tutorial | YouTube)

Fusion 360 kann zwar so viel mehr als 2D Modellierung, ist aber perfekt dafür geeignet Projekte zu entwerfen. Ich hab mir sagen lassen, dass es sehr klobig in der Handhabung sein soll und dass Blender mittlerweile auch in der Lage ist im selben Format zu exportieren, aber dazu fehlt mir das Wissen (Kann man Herrn Paassen aber fragen, der weiß das und kennt sich aus).

## InkScape

![InkScape](/articlecontents/Artikel12/InkScape.png)

(Quelle: Offizielle InkScape Seite)

InkScape ist schon eher mein Zuhause. Zumindest kommt es meinem Webentwickler Job näher, als Fusion, oder Blender. Der entscheidende Punkt hier ist: InkScape ist darauf ausgelegt SVG Grafiken zu erstellen. Andere Programme, wie Gimp oder Photoshop können dies nicht (nicht ohne weiteres und dann auch nicht vernünftig). Ich habe mir sagen lassen, dass man früher mal Adobe Illustrator verwendet hat, allerdings sei dies veraltet und darüber hinaus: Wer interessiert an einem Jahresabo bei Adobe ist, ist ohnehin verloren).

Was ja auch Sinn ergibt. Ein PNG Image ist eine Aneinanderreihung von verlustfrei komprimierten Pixeln mit Alphakanal, während eine SVG Datei Koordinaten enthält, die in der Regel in XML geschrieben sind.

## Farberkennung

In meinen Skizzen kann ich zweifarbig arbeiten, da Lasercutter nicht nur schneiden, sondern auch gravieren kann. Ich habe mir von Mika sagen lassen, dass man in der Regel rot für das Schneiden und schwarz für das gravieren verwendet, das ist aber vollkommen egal.

![Hase](/articlecontents/Artikel12/Hase.png)

Ich habe hier diese Zeichnung in InkScape angefertigt, um das eben beschriebene abermals zu verdeutlichen. Der Lasercutter würde jetzt im Kreis entlang schneiden und dabei diesen Hasen gravieren (Der ist echt niedlich, ich glaube ich weiß, was ich als nächstes drucken lasse). 

**Anmerkung:**

Es spielt keine Rolle, welche dicke die Linien haben. Der 3D Drucker errechnet den Mittelwert der Linien und lasert dort entlang. Ein weiterer Grund warum Vektor Koordinaten nötig sind.

# Handhabung vor dem lasern

## Schritt 01: Ebene justieren

Nachdem ich den Lasercutter eingeschaltet habe, ist der erste Schritt, nachdem ich mir ein passendes Material gesucht und es in die Maschine gelegt habe die Ebene zu justieren. Der Lasercutter verfügt über verschiedene Modi, die sich über einen JoyStick steuern lassen für das Einstellen der Ebene ist die Fokus Funktion nötig.

![Abstandsmesser](/articlecontents/Artikel12/JustierStück.jpg)

Dafür kann ich ein unscheinbares, aber sehr hilfreiches Werkzeug verwenden. Einen Abstandsmesser. 

![Abstandsmesser aus Ebene](/articlecontents/Artikel12/JustierEbene.jpg)

Dieser Abstandsmesser sollte gerade so, wirklich nur ganz dezent über der Ebene liegen, damit diese optimal justiert ist. Danach wird der Abstandsmesser wieder aus der Maschine entfernt und der Laser kann eingestellt werden.

## Schritt 02: Laser einstellen

Und zwar über einen Rotpunkt. Genauer gesagt muss als nächstes der Nullpunkt gesetzt werden. Der Nullpunkt ist quasi der Ausgangspunkt für den Laser. Der Ort wo er anfängt zu rechnen und sich zu bewegen. Oder einfacher gesagt: Oben links, da der Lasercutter über Koordinaten arbeitet. 

![Nullpunkt](/articlecontents/Artikel12/JustierLaser.jpg)

Das Bild hier spiegelt zwar sehr stark, aber der rote Punkt ist dennoch erkennbar. Der Laser lässt sich über eine weitere Funktion des Cutters bewegen. Über die Jog Funktion und den JoyStick.  

## Schritt 03: Datei übergeben

Damit ist der Lasercutter eingestellt und wir können zum PC übergehen. 

![Konfiguration am PC](/articlecontents/Artikel12/SoftwareSettings.jpg)

Hier ist ein Design, welches Mika umsetzen wollte. Diese SVG Grafik wird in die Software des Lasercutters geladen und dann wird darauf geachtet, dass das Programm erkennt welche Farbe zum gravieren und welche zum schneiden gedacht war. Wenn alles passt wird der Auftrag an den Lasercutter übergeben. 

Mir wurde an dieser Stelle mitgeteilt, dass ich ein Zitat von einem anonymen Mitarbeiter, der bestimmt nicht namentlich in diesem Artikel erwähnt wurde einbauen sollte…

“Die PCs hier im Lab sind alle scheiße”.

Habe ich hiermit getan.

## Schritt 04: Sicherheit geht vor

Der vorletzte Schritt ist wichtig. Bevor der Lasercutter gestartet wird, sollten 2 Abzüge eingeschaltet werden.

### Die Absauge

Die Absauge ist dafür da, dass Schadstoffe, die beim lasern entstehen aus dem Lab geleitet werden, damit wir nicht krank werden. 

### Der Air Assist

Der Air Assist ist dafür da, dass der Schmaug der beim lasern entsteht nicht an die Linse des Lasers gelangt, damit dieser möglichst präzise und sauber bleibt.

## Schritt 05: Vorgang starten

Ist der Auftrag übergeben und sind alle Maschinen an, kann der Vorgang über den grünen Startknopf am Lasercutter gestartet werden.

![Vorgang starten](/articlecontents/Artikel12/AnSchalter.jpg)

# Handhabung während des laserns

Während des Vorgangs sind 2 wichtige Dinge zu beachten!

### 1. Es muss immer einer am Lasercutter sein

Für den Fall, dass etwas schief geht, oder es aus Gründen von Fehlfunktionen oder Ähnlichem zu Bränden kommen sollte, muss immer einer da sein, der den Vorgang beaufsichtigt.

### 2. Nicht direkt in den Laser schauen

Der Laser ist so hell, dass dieser schlecht für die Augen ist, daher sollte man gekonnt am Laser vorbei schauen.

### Im Falle eines Notfalls

![Not Ausschalter](/articlecontents/Artikel12/NotAus.jpg)

Der Lasercutter verfügt über einen Not-Ausschalter, das ist der unscheinbare, rote Knopf vorne an der Maschine, wo in dezentem gelb-schwarz “EMERGENCY STOP” steht, einfach für den Fall, dass man das übersehen hat.  

# Handhabung nach dem lasern

Wenn der Vorgang vollständig abgeschlossen ist, kann das fertige Kunstwerk aus dem Lasercutter genommen und bewundert werden. Schön wäre, wenn man sein restliches Material wegräumt und und die Absauge und den Air-Assist wieder ausmacht… Das Lab hat alles an Geschichten schon gehabt, daher sollte man dies dazu erwähnen.

# Power und Speed

Als kleinen Anhang möchte ich noch erwähnen, dass der Lasercutter verschiedene Tiefen gravieren kann. Dafür ist das Zusammenspiel aus Power und Geschwindigkeit verantwortlich, die beide in der Konfiguration vorhin eingestellt werden können. Hier ist eine gelaserte Tabelle, welche die unterschiedlichen Tiefen verdeutlicht.

![Verhältnis Power und Speed](/articlecontents/Artikel12/PowerSpeed.jpg)

---

# Schlusswort

Ich habe die Anweisung zwar sehr genossen, aber wirklich “hängenbleiben” kann der Arbeitsablauf nur dann, wenn man nach der Einweisung auch wirklich anfängt regelmäßig mit dem Lasercutter zu arbeiten, was ich jedem nur ans Herz legen kann, es macht wirklich Spaß und ist ein tolles Angebot!


