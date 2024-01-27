---
title: Gehäusebau, Elektronik und Design
des: In diesem Artikel schildere ich den Arbeitsablauf der anderen Gruppenmitglieder und erläutere was in den jeweiligen Bereichen zu beachten war
date: 2024-01-25
imagepath: articlesheads/Artikel23.jpeg
id: Exkurse
topic: "02"
emote: 🧑🏻
---

# Einleitung

In diesem Artikel möchte ich auf die Arbeit der anderen Gruppenmitglieder eingehen, deren Anwendungsbereich schildern und darüber schreiben, was jene über die 3 Monate Entwicklungsprozess bereits erreicht haben.

# Gehäusebau - Das Skelet.

Das Gehäuse eines Arcade Automaten will sehr gut konzipiert sein, damit am Ende ein “gutes” Ergebnis auf die Beine gestellt werden kann. Aber was macht das Endergebnis hier “gut”?

Entscheidend sind folgende Faktoren:

## Statik

Als Material, um den Automaten final zu lasern nutzen wir an der Hochschule **MDF**, was die Kurzform von **Medium-Density-Fibreboard** ist. Ein **mitteldichter Holzwerkstoff**, der in Dicken von **2mm** bis **60mm** erhältlich ist. Mitteldicht bedeutet, dass die einzelnen Holzschichten mit einer Dichte von **600 kg/m³ bis 1000 kg/m³** zusammengeleimt wurden. Einfacher gesagt: MDF ist **resistent**, **leicht**, aber noch lange **nicht so stabil wie Vollholz**.

Was auch der Grund ist, warum der Gehäusebauer **mehrere Schichten** MDF einplanen sollte.

## Software

Auf Papier zeichnen hätte zwar Stil, wäre aber unglaublich anstrengend, daher verwenden die Gehäusebauer die Open-Source Software **“Fusion360”**. Eine Modellierungs-Software zur Gestaltung von Bauprojekten jeglicher Art, die mit einem Lasercutter oder ähnlicher Gerätschaft zusammenhängen.

Sehr Charmant ist der Fakt, dass Fusion 360 im .dxf Format exportieren kann. Das Format, mit dem der Lasercutter im FabLab arbeiten und Lasern kann. Wie der Lasercutter dies übernimmt ist im Artikel [“Der Lasercutter”](https://nico-puelacher-fi.vercel.app/posts/post-12) genauer beschrieben.

## Konzeption

Die Konzeption eines Arcade-Automaten führt den Verantwortlichen vor die ein oder andere Hürde. Ein Paar davon erläutere ich hier kurz.

### Platz

Der Automat sollte **groß genug** sein, damit Alle Komponenten des Elektronikers Platz finden. 

### Luft

Der Automat braucht **Schlitze**, durch die Luft zirkulieren kann. 

### Monitorhalterung

Der Monitor sollte dem zukünftigen Spieler **leicht angeschrägt** gegenüberstehen.

### Platzieren der Lautsprechermulden

Damit der Spieler rein Reichweitentechnisch bereits vom **Sound** erreicht werden kann sollte hier Vorsorge geleistet werden.

### Standfüßchen

An der Unterseite des Automaten sollten Standfüße (bei Experten aus Silikon), damit der Automat noch **robuster** werden kann.

### Eine Luke an der Rückseite

**Wartungsarbeiten** bleiben nie aus. Es wäre schön, wenn man den Pi im Falle eines Problem erreichen kann, auch nachdem er bereits in den Automaten eingearbeitet wurde. 

### Positionierung der Knöpfe

Der Gehäusebauer muss sich mit der Frage auseinander setzen in welchem **Abstand** er den Joy-Stick zu den Buttons setzt und wie weit diese auseinanderliegen sollten.

### Achtung beim platzieren des RasberryPi

Der Pi sollte nie direkt in die MDF Platte geschraubt werden, da zu Einen immer ein Abstand unten bestehen muss und zu Anderen, weil Holz “atmet” und dies sehr schlecht für die Platine sein kann.

## Einarbeitung von Dekorelementen

Für das **visuelle “Etwas”** ist eigentlich der Designer zuständig, aber den Grundbaustein legt der Gehäusebauer, denn dieser muss Platz und Fläche für solche Elemente einplanen. 

### Bazel

![Bazel](/articlecontents/Artikel23/Bazel.png)

Ein **Bazel** ist eine Art **“Panel”**, welches **über** dem **Bildschirm** angesiedelt ist. Es ist dazu da das **Logo des Spiels hervorzuheben** und weitere Grafiken des Spiels in  Szene zu setzen. Ein Bazel lässt sich sogar **beleuchten**, wenn entsprechende LED Leisten und transparente Materialien eingeplant werden. Hier auf dem Bild steht “Games Machine” auf dem Bazel drauf.

### U-Moldings, T-Moldings

![UMolding](/articlecontents/Artikel23/UMoldings.png)

Sie haben sich doch sicherlich mal an Papier geschnitten… schreckliches Gefühl. **Scharfe Kanten** an einem Automaten möchte man genauso wenig haben. Dafür können **U-Moldings** und **T-Moldings** genutzt werden. Ein **Silikonschlauch**, der in das Gehäuse eingearbeitet werden kann, damit man sich nicht über scharfe Kanten aufregen muss. Der **Unterschied** zwischen T und U liegt in der **Form**.

**T-Moldings** haben ein **weiteres Silikonstück in der Mitte**, damit dieses im Gehäuse verankert werden kann.

## Das Resultat unseres Gehäusebauers (Stand 24.01.2024)

![Gehäuse](/articlecontents/Artikel23/Gehäuse.png)

# Elektronik - Die Organe.

Der Elektroniker hat die Aufgabe die benötigten Komponenten die der RasberryPi (Arduino oder PC) benötigt zu verbinden. Ich habe mir hierzu kurz Gedanken gemacht, welche Komponenten an einen Rasberry Pi angeschlossen werden könnten. Des Weiteren wird der Umgang mit dem Lötkolben im FabLab vermittelt und Fragen wie ***“Wie kann ich den Pi korrekt herunterfahren, wenn dieser bereits eingebaut ist?”*** müssen vom Elektroniker beantwortet werden können. 

## Eingabegeräte

Der Elektroniker kann in erster Linie Informationen darüber liefern, welche **Input-Geräte** für das Projekt geeignet sind und ob es sich nicht sogar lohnen würde einen etwas exotischeren Input zu wählen.

### Gängige Input Geräte

- Joy-Sticks
- Buttons

### Exotischere Input Geräte

- Trackballs
- Potentiometer
- Pistolen, die per Funk Signale senden

## Ausgabegeräte

- Bildschirm
- Lautsprecher
- weiterer, kleinerer Bildschirm

### Der Ton macht die Musik

Wenn ein Rasberry Pi überhaupt über ein Ausgabegerät für Ton verfügt, dann hört dies in einem mehrschichtigen Holzkasten ohnehin keiner mehr. Allerdings bringt ein Rasberry Pi nicht ohne weiteres genügend Leistung auf, um direkt mit Lautsprechern verbunden zu werden. Dafür muss ein entsprechender **“Amplifier” (Verstärker)** zwischengeschalten werden. Dieser braucht allerdings auch eine eigene Stromquelle.

## Lüfter

In einem geschlossenen, mehrschichtigen Holzkasten, wo nur an einer Stelle die Möglichkeit des Lüftens besteht, sollte der Elektroniker darüber nachdenken, **wie lang die Kabel sein müssen**, damit der Lüfter entsprechend platziert werden kann.

## Skripte

Sind die Komponenten erst zusammengeführt sollte sich der Elektroniker darum kümmern, dass **Eingaben** der Komponenten vom Rasberry Pi gelesen werden. Des Weiteren muss die Funktion eines An- und Ausschalters implementiert werden.

Zum Testen der Komponenten reichen einfache Skripts, die Funktionalitäten, wie: **“Ich bewege ein Quadrat und auf Knopfdruck wechselt es die Farbe”** abdeckt. Wie diese Skripts aussehen und wie man das entsprechende Betriebssystem auf dem Rasberry Pi installieren kann, ist im Artikel [“Joy-Stick Inputs mit Pygame”](https://nico-puelacher-fi.vercel.app/posts/post-07), sowie im Artikel [“Button Inputs mit PyGame”](https://nico-puelacher-fi.vercel.app/posts/post-09) nachzulesen.

# Designer - Die Haut.

Der Designer hat eigentlich die wichtigste Aufgabe, denn jeder User wird sofort mit dem Design des Automaten und dem Design des Spiels konfrontiert. Nicht jeder der Videospiele spielt möchte sich automatisch über das Gehäuse, die Elektronik oder die Programmierung informieren, aber die Designs sind **unumgänglich** sichtbar, was für mich mit einer Menge **Verantwortung** zusammenhängt. Im Zeitalter von **KI** kann dem Designer einiges an Arbeit abgenommen und **Inspiration** gesammelt werden, dennoch muss die kreative Idee hinter einem Gesamtbild immer vom Designer selbst kommen. Hierfür ist bereits vorhandenes Wissen in der Design Theorie definitiv löblich und hilft dem Designer Entscheidungen treffen zu können.

## Gamedesign

Ein schönes Gehäuse bringt nicht viel, wenn das Spiel nicht gut aussieht. Die Videospielindustrie legt (leider) immer mehr Wert darauf, dass Spiele schick aussehen, anstatt neue Gameplay Mechaniken in deren Spiele zu implementieren. Gegen diesen Fakt kann man aber nichts ändern. Designer müssen damit leben. In unserem Fall, einem 2D Pixel-Art Tower Defense Spiel musste mit **Tiles** eines **Tilesets** gearbeitet werden. Mehr zum Thema **Tiles, Tilesets, Tilemaps und Assets** ist in meinem Artikel [“Der Leveleditor”](https://nico-puelacher-fi.vercel.app/posts/post-13) zu finden.

## Gehäusedesign

Gerade durch KI war es noch nie leichter Grafiken, thematisch zum Spiel zu konfigurieren und dann auf den Automaten zu **folieren**. So erhält das Spiel auch über analoge Wege mehr **“Tiefe”** und mehr **“Geschichte”**. 

## Bazeldesign

Bazel lassen sich, wie bereits erwähnt wunderbar beleuchten. Dafür braucht es einen sogenannten **“Paralax Effekt”**. Ein Effekt, wo mehrere Schichten mit verschiedenen Grafiken übereinander gelegt werden, welche zusammen eine eigene Komposition ergeben und man so einen Tiefe Effekt erhalten kann. 

## Logodesign

Zum Logo Design gehört eine Menge Erfahrung fern ab des Gamedesigns. Ich habe einen ganzen Artikel zum Erstellen eines Logos geschrieben und welche **Farbtheorien** hinter der **Erstellung** stecken können und habe daraufhin ein **Logo mit KI** generiert. Mehr dazu ist im Artikel [“Das Logo”](https://nico-puelacher-fi.vercel.app/posts/post-08) zu finden. 

# Programmierer - Der Verstand

Im Rahmen dieses Blogs konnte ich weitreichend schildern, wie der Arbeitsalltag des Programmierers für dieses Modul aussehen sollte. Ich hoffe ich könnte viele Inhalte vermitteln, dem Leser immer mal wieder ein Schmunzeln zaubern und zeigen, dass Programmierung Höhen und Tiefen haben kann, die nach der Überwindung aber unglaublich viel vermitteln können. Ich bin sehr stolz auf meine Leistung im Rahmen dieses Projekts und verweise dementsprechend auf sämtliche DevLog Artikel.