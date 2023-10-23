---
title: Getting started
des: Ziel diesen Artikels ist es die grundsätzliche Anmerkungen zu thematisieren und bereits ein laufendes Spielfenster zu erhalten.
date: 2023-10-17
imagepath: articlesheads/DevLog0Thumb.jpg
id: DevLog
topic: DevLog 00
---

# Anmerkungen

Es dürfte offensichtlich sein, aber ich möchte kurz hervorheben, dass es für das Schreiben von PyGame Projekten viele Wege gibt, die sich teilweise sehr in der Performance unterscheiden können, aber auch teilweise einfach strukturierter und “schöner” aussehen. Neben meinem Weg, wird es noch viele andere Wege geben Probleme anzugehen. Klingt erstmal offensichtlich, wenn es um das Thema “Programmierung” geht, dennoch wollte ich dies einfach loswerden.

# Terminologie

Grundsätzlich nicht notwendig, allerdings hat es sich bei PyGame Games etabliert, dass man die “Hauptdatei” (damit meine ich jene Datei, in der schlussendlich das Spiel läuft) “game.py” nennt, so auch in diesem Projekt.

# Die Klasse "Game"

Ich speichere alles, was relevant für den direkten Spielfluss ist in einer gesonderten Klasse mit dem Namen “Game”. Dazu zählen unter anderem Faktoren wie:

- Screen Width und Screen Height
- Clock
- Name des Spiels
- Assets
- Player Position und Größe
- Tilemaps
- Particles
- Kameraposition beim Start

Für das reine Starten eines Spielfensters braucht es in der Klasse Game erstmal nur Folgendes:

## Screen Width und Screen Height

Nachdem Grundliegendes wie das Initialisieren von PyGame und das Erstellen der Klasse Game erfolgt ist, erstelle ich eine Variable “self.screen” und speichere darin wie groß mein Fenster werden soll. Hierfür lässt sich eine Funktion aus der PyGame Bibliothek verwenden, die einen Tupel entgegen nimmt, der erst die Höhe und dann die Breite des Spiels speichert.

```py
import pygame

class Game:
    def __init__(self):
        pygame.init()

        self.screen = pygame.display.set_mode((1280, 960))
```

“set_mode” klingt eigentlich ein bisschen irreführend, wenn man so darüber nachdenkt, da es hier nicht um irgendeinen Modus geht, sondern darum Metadaten über die Fenstergröße zu übergeben.

## Clock

Jetzt möchte ich mich darum kümmern mit welcher Framerate das Spiel laufen soll.

In der Regel sind 60 Bilder pro Sekunde eigentlich Standard geworden. Es gibt zwar heute auch noch Spiele, die es nicht hinkriegen 60 Bilder pro Sekunde anzuzeigen, besonders wenn man seinen Blick auf die Nintendo Switch richtet, aber das ist ein anderes Thema. Jedenfalls laufen die meisten Spiele entweder mit 30 oder 60 FPS.

In PyGame spielt dies eine **sehr** relevante Rolle. Wenn man kurz darüber nachdenkt was FPS eigentlich heißt, dann erschließt sich, dass die schlussendliche Game-Loop 60 (oder 30) Mal pro Sekunde durchlaufen wird.

**Übrigens:** Würde man keinen Framecap festlegen, dann würde die Game-Loop so schnell es geht wieder und wieder sequentiell durchlaufen werden, was A zu 100% CPU Auslastung und B zu inkonsistenten Werten führen würde.
Die Bildwiederholrate steht zum Beispiel in Zusammenhang damit, wie schnell der Player laufen oder springen kann. Generell werden Bewegungsabläufe durch die Bildwiederholrate beeinflusst.

Ich habe hierfür eine Anlage verlinkt, die den hier zwar sehr kleinen, aber doch existierenden Unterschied am Beispiel Super Mario 64 zeigt. Dort spielt ein Speedrunner genau den selben Bewegungsablauf, nur 1 Mal in 30 und 1 Mal in 60 FPS. Dabei reagiert das Spiel marginal anders.

_”Dafür muss es doch aber eine Lösung geben! Das kann ja eigentlich nicht sein. Die meisten Spiele haben doch sogar mehrere Optionen, um unterschiedliche Framerates festzulegen und da geht nicht alles kaputt???”_ wäre an dieser Stelle eine gute Anmerkung.

Die Antwort hier ist: _“Natürlich gibt es dafür eine Lösung. Diese nennt sich Delta-Time!”_

Was genau das ist und ob wir diese überhaupt verwenden werden, wird in einem späteren Artikel geklärt, denn bei Arcade Automaten gibt es eigentlich keine Einstellungen zu Bildrate oder Fenstergröße, dennoch wollte ich dies einmal erwähnt haben.

Nun aber zurück zum Code:

In der Klasse Game wird die Clock nun initialisiert. Den FPS Wert werde ich erst in der Gameloop festlegen. Clock ist ebenfalls eine Funktion, die sich aus der PyGame Library importieren lässt.

```py
import pygame

class Game:
    def __init__(self):
        pygame.init()

        self.screen = pygame.display.set_mode((1280, 960))
        self.clock = pygame.time.Clock()
```

## Name des Spiels

Eine Kleinigkeit, aber es wäre schön, wenn beim Start des Spiels nicht “PyGame Projekt #1” am Fensterrand stehen würde.

Dafür lässt sich diese Methode verwenden:

```py
import pygame

class Game:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Tower Defense Game')
        self.screen = pygame.display.set_mode((1280, 960))
        self.clock = pygame.time.Clock()
```

Bis der Gruppe ein passender Name eingefallen ist, wird das Projekt _“Tower Defense Game”_ heißen.

Diese grundsätzlichen Dinge reichen für die Klasse Game auch erstmal, um ein Fenster zu erstellen.

# Die Game-Loop

Damit jetzt wirklich was passieren kann braucht es eine Game-Loop.

## Das Erstellen einer Game-Loop

Eigentlich wird uns im Unterricht (besonders bei Java) immer beigebracht, dass Endlosschleifen katastrophal wären und dazu führen, dass sich ein schwarzen Loch vor unserem Bildschirm bildet und das Universum vernichten wird (Quelle: Professor Richter).

NA DANN PROBIEREN WIR DIES DOCH MAL AUS!

Denn damit ein Spiel “laufen kann”, braucht es eine solche Endlosschleife.

Hierfür erstelle ich eine while-Schleife und setze diese einfach permanent auf True.

```py
import pygame

class Game:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Tower Defense Game')
        self.screen = pygame.display.set_mode((1280, 960))
        self.clock = pygame.time.Clock()


		def run(self):
		    while True:
```

Ich lege noch einen schwarzen Hintergrund fest, damit gleich genossen werden kann, dass wir nichts sehen werden.

Da dieser Artikel im Internet gelandet ist, wird zum Stand 17.10.2023, 12:47 kein schwarzes Loch aufgetaucht sein. Wir wurden also 3 Monate belogen...

## DOCH VORSICHT!

Jetzt gibt es eine Kleinigkeit, die ich, als ich mit PyGame begonnen habe, wieder und wieder vergessen habe. In PyGame ist es so, dass **wirklich jeder** Input in der Gameloop in einem Event-Handler untergebracht werden muss…

Darunter fällt auch, dass sich das Spiel schließen soll, wenn ich auf das rote X oben rechts am Bildschirmrand klicke.
Im späteren Verlauf wird die Anwendung über ein Shell Script beendet werden, sobald man den Automaten ausschaltet, aber für die Entwicklung des Spiel wäre es ratsam, wenn ich das Fenster wieder schließen könnte.

Daher schreibe ich diesen Event-Handler, der später auch dafür zuständig sein wird alle anderen Inputs entgegen zu nehmen:

```py
import sys
import pygame

class Game:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Tower Defense Game')
        self.screen = pygame.display.set_mode((1280, 960))
        self.clock = pygame.time.Clock()


		def run(self):
		    while True:
		        self.screen.fill((0,0,0))

		        for event in pygame.event.get():
		            if event.type == pygame.QUIT:
		                pygame.quit()
		                sys.exit()
```

So, nun sind wir alle auf der sicheren Seite und müssen die Anwendung nicht über den Taskmanager zum Schließen zwingen… Glück gehabt.

## Framerate und Update

Jetzt gibt es noch eine Kleinigkeit zu beachten. Damit nicht jeder Frame den anderen einfach überschreibt, sollte man den Screen mit jedem neuen Frame einmal leeren. Das merkt der Spieler so auch nicht.

Dann wird schlussendlich die Framerate festgelegt. In diesem Fall werden wie bereits erwähnt keine Delta-Time Keys verwendet, sondern einfach die Zahl 60.

```py
import sys
import pygame

class Game:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Tower Defense Game')
        self.screen = pygame.display.set_mode((1280, 960))
        self.clock = pygame.time.Clock()


		def run(self):
		    while True:
		        self.screen.fill((0,0,0))

		        for event in pygame.event.get():
		            if event.type == pygame.QUIT:
		                pygame.quit()
		                sys.exit()

        pygame.display.update()
        self.clock.tick(60)

Game().run()
```

Dann wird das Spiel zusammen mit seiner neuen Methode **run** ausgeführt und das Ergebnis ist ein solcher Bildschirm hier:

![Screenshot](/articlecontents/ScreenshotOfEmpty.png)

# Schlusswort

Damit ist es vollbracht. Die Entwicklung am Spiel kann nun beginnen, wir haben nun die “Leinwand” geschaffen und die Kreativität kann ihren Lauf nehmen.

In den kommenden DevLog Artikeln wird sich mit der Grundmechanik eines Tower Defense Spiels beschäftigt.

---

# Anlagen

Super Mario 64: 30 vs 60 FPS:
[Super Mario 64 - 60 Fps vs 30 Fps](https://youtu.be/3XEvED6VEfQ)
