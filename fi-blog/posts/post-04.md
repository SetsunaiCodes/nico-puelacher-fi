---
title: Animationen
des: In diesem Artikel möchte ich näher bringen, wie man in PyGame mit Spritesheets umgehen kann und diese in einer Liste (einem “Frame by Frame Animation - Array” ) zwischenspeichert und an das Spiel übergeben kann.
date: 2023-10-19
imagepath: articlesheads/Artikel04.jpeg
id: Hausaufgabe
topic: "02"
emote: 🏃🏻"
---

# Das Spritesheet

![Spritesheet](/articlecontents/Sprites.png)

Das hier ist das Spritesheet, was mir für die Ausarbeitung dieser Aufgabe zur Verfügung gestellt wurde. An diesem Spritesheet gibt es mehrere Probleme, die alle nacheinander durchgearbeitet werden um diese zu lösen. Es existieren folgende 3 Probleme:

## Das Spritesheet ist weiß und nicht transparent

Immer dann, wenn unser Läufer über einem nicht weißen Hintergrund laufen wird, dann wird ihn ein Viereck umranden. Das wünscht man ja keinem, daher sollte dieser verschwinden.

## Das hier ist 1 Image und kein richtiges Tileset

Das ist **grundsätzlich** kein Problem, wobei das nicht ganz stimmt. Es wäre kein Problem einen “Leser” zu schreiben, der sich die einzelnen Frames selbst holt, allerdings ist mir dieser Ansatz zu performancefressend. Daher wird dieses Problem anderweitig gelöst.

## Es gibt keine Idle Animation

Es liegen jeweils 17 Animationen vor, die entweder laufen oder sprinten repräsentieren. Es gibt aber keinen Sprite, wo unser Läufer still steht. Das ist eine Kleinigkeit, aber dies wird im Folgenden ebenfalls gelöst.

# Projektinitialisierung

Ich referiere an dieser Stelle auf den Artikel [DevLog 0: Getting Started](https://nico-puelacher-fi.vercel.app/posts/post-02), wo sehr detailliert geschildert wird, wie man ein Projekt erstellt und wie man es schafft am Ende ein Fenster zu öffnen, daher führe ich an dieser Stelle direkt den Start Code des Projekts “Hausaufgabe Movement” an:

```python
import sys
import pygame

class Game:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Hausaufgabe Movement')
        self.screen = pygame.display.set_mode((640, 480))
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

# Problemlösung

Bevor nun weiter am Code gearbeitet werden kann, müssen die zuvor geschilderten Probleme gelöst werden, damit wir weiter programmieren können.

## Thema 01: Das Bild aufteilen

Das hier ist die zeitlich weitaus aufwendigste, aber ressourcenfreundlichste Lösung, die auch weniger Code hervorbringen wird.

Ich nehme mir das Bildbearbeitungsprogramm meines Vertrauens GIMP und teile das Bild in 34 (17 Laufsprites +17 Sprintsprites) Teile auf…

An dieser Stelle möchte ich, dass Sie (der Leser) eine kurze Pause einlegen und in Mark und Bein fließen lassen, was das für ein Schmerz gewesen ist…

Gesagt getan.

Die einzelnen Sprites werden dann auf 2 Ordner im Projekt aufgeteilt. Ein Ordner “running” und ein Ordner “walking”.

**Anmerkung:** Beim Aufteilen der Sprites ist es ratsam darauf zu achten, dass die Bilder alle gleich groß sind. Ich zeige später im Code einen kleinen Trick mit dem dieses Detail unwichtig wird. Dies sorgt für ein bisschen mehr Code, aber viel mehr Freiheit. In diesem Fall haben wir das Glück, dass beide Animationsabfolgen 17 Sprites lang sind. Das ist aber nicht der Regelfall, daher werden wir auch diese Abhängigkeit später im Code relativieren, einfach damit ich auch diese Thematiken in diesem Blog festhalten kann.

## Thema 02: Es gibt keine Idle Animation

Damit es wenigstens so aussieht, als könnte unser Läufer stehen, entschied ich mich dazu einen bestehenden Sprite zu nehmen und zu verändern. Ich habe nach dem Sprite gesucht, der am nächsten an “stehen” dran war und versuchte eine Animation dafür zu entwerfen. Ausgehend von Sprite 7 in der oberen Reihe entstand dann dieser 18. Sprite:

![IdleSprite](/articlecontents/IdleSprite.png)

Alles, was ich getan habe ist das “hintere” Bein wegzuschneiden. Dann sieht es so aus, als hätte der Läufer beide Beine nebeneinanderstehen und man könnte das andere Bein einfach nicht sehen. Da es sich bei diesem Läufer um kein hochauflösendes Bild handelt, fällt diese Herangehensweise auch nicht auf. Jetzt kann unser Läufer auch mal durchatmen und muss sich nicht permanent anstrengen.

Die Lösung zum dritten Thema wird im Laufe des folgenden Abschnitts gelöst.

# Implementierung

Nachdem diese Vorarbeit geleistet wurde, konnte ich mich wieder dem Code widmen.

Zum Verständnis hänge ich hier nochmal die aktuelle Struktur des Ordners “walking” im Verzeichnis data / images / enteties / player / walking an:

![StructureOfSprite](/articlecontents/StructureOfSprites.png)

Hier möchte ich anmerken:

Würde ich die einzelnen Sprites 1 , 2 , 3, 4, 5 etc. nennen, dann würde dies die Reihenfolge durcheinander werfen, da Computer so sortieren würden: 1, 11, 12, 13, …, 19, 2, 3, 4 etc.
Daher die Struktur. Diese ist relevant, da die Einträge später chronologisch abgespielt werden sollen.

## Das Utility Script

Für die reine Übersicht erstellte ich einen Ordner namens "scripts", wo dann die erste neue Datei utiliy.py entsteht. Hier sollen alle Funktionen gelagert werden, die damit zusammenhängen, Ladevorgänge zu verwalten.

### Load_Image(path)

```python
import pygame

BASE_IMG_PATH = "data/images"

def load_image(path):
    img = pygame.image.load(BASE_IMG_PATH + path).convert()
    img.set_colorkey((0, 0, 0))
    return img
```

Load_Image() ist eine Funktion, die eigentlich nichts anderes machen wird, als sich ein Image aus einem bestimmten Path zu nehmen und dieses zu returnen. Dafür muss der Funktion nur der hintere Teil des Paths mitübergeben werden. Da der Anfang aller Paths ohnehin immer gleich ist, kann man diesen auch zwischenspeichern (siehe BASE_IMG_PATH).
Was diese Funktion ebenfalls übernimmt ist die Lösung für das Problem “Die Sprites haben einen weißen Hintergrund”.

Der Ablauf ist wie folgt:

1. Image aus dem angegebenen path nehmen und zwischenspeichern
2. Image mit der PyGame internen Funktion .convert() versehen
3. Diese Methode braucht einen Colorkey und entfernt diesen vollständig aus dem Bild. In diesem Fall (255,255,255), also weiß
4. Das Image wieder returnen

Diese Funktion ist gängig bei den meisten PixelArt Spielen, die mit PyGame gemacht werden, daher hoffen wir an dieser Stelle einfach, dass unser Läufer ordentlich gepixelt wurde, sonst entsteht hierbei ein weiteres Problem.

### Load_Images(path)

```python
import os
import pygame

BASE_IMG_PATH = "data/images"

def load_image(path):
    img = pygame.image.load(BASE_IMG_PATH + path).convert()
    img.set_colorkey((0, 0, 0))
    return img

def load_images(path):
    images = []
    for img_name in sorted(os.listdir(BASE_IMG_PATH + path)):
        images.append(load_image(path + '/' + img_name))
    return images
```

Der Unterschied liegt nicht nur im hinteren "s", sondern auch in der Funktionsweise. Ziel dieser Funktion ist es, alle Sprites in einer Liste / einem Array zu speichern und zurückzugeben.

Dafür wird erst die leere Liste "images" erstellt und danach wird über eine for-Schleife chronologisch durch den Ordner iteriert, um dann nacheinander die Liste mit Einträgen zu füllen und schlussendlich wieder zurückzugeben. Dabei kann diese Funktion von der vorherigen profitieren, da die Bilder so leichter “herangezogen” werden können.

_”Was ist dieses sorted und os.listdir?”_ wäre an dieser Stelle eine durchaus berechtigte Frage.

Ich habe bereits thematisiert, dass sich die Reihenfolge der abzuspielenden Sprites ändert je nachdem, ob ich nun 1.png, oder 01.png schreibe. Bei Linux Betriebssystemen kommt es bei manchen Fällen immernoch zu Fehlern, die teilweise die Spiele kaputt machen können. Um sich also doppelt und dreifach abzusichern, dass der Ordner wirklich von oben nach unten gelesen wird, wird er zunächsten “gesorted”, was eine pythoninterne Funktion ist und dann nochmal über die Python Library os der Liste hinzugefügt, damit wirklich nichts mehr schief gehen kann und man auf der absolut sicheren Seite ist (os ist dafür zuständig ebenfalls zu sortieren).

### Animation Klasse

Mit dem aktuellen Code ist es möglich, die Sprites in einer Liste zu speichern. Jetzt sollte ich mich darum kümmern, dass diese Sprites nacheinander abgespielt werden, sodass eine Animation entsteht. Dafür erstellte ich die Klasse Animation:

```python
import os
import pygame

BASE_IMG_PATH = "data/images"

def load_image(path):
    img = pygame.image.load(BASE_IMG_PATH + path).convert()
    img.set_colorkey((0, 0, 0))
    return img

def load_images(path):
    images = []
    for img_name in sorted(os.listdir(BASE_IMG_PATH + path)):
        images.append(load_image(path + '/' + img_name))
    return images

class Animation:
    def __init__(self, images, img_dur=5, loop=True):
        self.images = images
        self.loop = loop
        self.img_duration = img_dur
        self.done = False
        self.frame = 0
```

Diese Klasse muss diverse Parameter entgegen nehmen, damit am Ende richtig operiert werden kann.

Wirklich besonders erwähnenswert sind hier aber nur die self.img_dur, die darüber entscheiden wird, wie schnell die Bilder nacheinander abgespielt werden und die self.loop. Ein Boolean, der darüber entscheidet ob nach Ablauf der Animation wieder von vorne begonnen wird oder nicht.

self.frame startet bei 0, was klar ist, die Animation soll ja am Anfang starten.

self.done geht mit loop einher, damit geschaut werden kann, wann wieder neu gestartet wird.

self.images liefert die Liste an Bildern.

Dieser Klasse habe ich 3 Funktionen zugefügt, um möglichst flexibel zu sein.

```python
import os
import pygame

BASE_IMG_PATH = "data/images"

def load_image(path):
    img = pygame.image.load(BASE_IMG_PATH + path).convert()
    img.set_colorkey((0, 0, 0))
    return img

def load_images(path):
    images = []
    for img_name in sorted(os.listdir(BASE_IMG_PATH + path)):
        images.append(load_image(path + '/' + img_name))
    return images

class Animation:
    def __init__(self, images, img_dur=5, loop=True):
        self.images = images
        self.loop = loop
        self.img_duration = img_dur
        self.done = False
        self.frame = 0

    def copy(self):
        return Animation(self.images, self.img_duration, self.loop)

    def update(self):
        if self.loop:
            self.frame = (self.frame + 1) % (self.img_duration * len(self.images))
        else:
            self.frame = min(self.frame + 1, self.img_duration * len(self.images) - 1)
            if self.frame >= self.img_duration * len(self.images) - 1:
                self.done = True

    def img(self):
        return self.images[int(self.frame / self.img_duration)]
```

Copy ruft die Klasse in sich abermals auf.

img returnt das entsprechende Image, was laut self.frame geteilt durch die image duration gerade dran ist. Dies wird als separierte Funktion geregelt, da dies in der Implementierung in der game.py gleich große Vorteile mit sich bringt.

Wirklich interessant ist die update Funktion. Dort wird abgefragt ob loop True ist und erhöht dadurch den Frame und teilt diese mittels Modulo durch den Wert aus der Duration und oder Länge der Images Liste.

Ist loop gerade False, dann wird self.frame auf den minimalen Wert bestehend aus Frame +1, der Image Duration mal der Länge der Imageliste -1 genommen und self.done auf True gesetzt.

Schnell formuliert ist die Idee hinter der update Funktion, dass die Loop so entsprechend verwaltet werden kann und durch die Liste iteriert werden kann, um die Animation schlussendlich in einer bestimmten Geschwindigkeit anzeigen zu können. Update ist des Weiteren dazu da, um in der Gameloop aufgerufen werden zu können.

## Integration in die Game Klasse

Die Game Klasse habe ich bereits wie oben angegeben erstellt und diese wird nun um ein Paar Werte erweitert.

```python
import sys
import pygame
from scripts.utils import load_image, load_images, Animation

class Game:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Hausaufgabe Movement')
        self.screen = pygame.display.set_mode((640, 480))
        self.clock = pygame.time.Clock()

        self.assets = {
            'player/idle': Animation(load_images('entities/player/idle'), img_dur=6),
            'player/walking': Animation(load_images('entities/player/walking'), img_dur=4),
            'player/running': Animation(load_images('entities/player/running'), img_dur=5),
        }

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

Innerhalb der Game Klasse wird self.assets dazu genutzt alle spielrelevanten Assets zu laden.

---

# Schlusswort

Das wars schon. Damit müssen diese Animationen nur noch einem Player zugewiesen werden, damit man diesen dann auch entsprechend steuern kann. Wie das funktioniert zeige ich im nächsten Artikel zum Thema Hausaufgaben.
