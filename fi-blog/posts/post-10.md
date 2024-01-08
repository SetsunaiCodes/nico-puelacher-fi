---
title: Der Gegner
des: Heute beginnen wir mit der eigentlichen Entwicklung des Spiels indem ich eine erste Gegnerklasse erstellen.
date: 2023-12-04
imagepath: articlesheads/Artikel10.jpeg
id: DevLog
topic: DevLog 02
---
# Einleitung

Endlich beginnt die Entwicklung!🥳🥳

Wir beginnen jetzt damit die Roadmap abzuarbeiten, die ich aufgesetzt habe!
Auch wenn die Roadmap bereits eine gute Aussicht bietet, möchte ich hier nochmal etwas erläutern:
Anfangen möchte ich mit den Gegnern und dann weiter auf diesen aufbauen. Es könnte im ersten Moment ein bisschen komisch wirken, mit den Gegnern anzufangen mein Plan sieht folgendes vor:

Ich fange jetzt mit den Gegnern an und baue dann auf diesen auf. Mein Plan sieht vor als nächstes die AI aufzusetzen mit der Gegner sich auf einer Strecke bewegen können. Danach werde ich mit der Unterstützung der Software [Tiled](https://www.mapeditor.org/) Level zu bauen und das Spiel so direkt zu Beginn hochskalieren zu können. Danach führe ich die Türme und die Menüführung ein. Den Attract-Mode und die Button Inputs um den Pi an und auszuschalten habe ich ebenfalls nicht vergessen. Es ist aber einfach sinnvoll mit der primären Gameplay Mechanik anzufangen.

**Anmerkung:** Dieser Artikel baut ein Stück weit auf dem [DevLog 00: "Getting Started"](https://nico-puelacher-fi.vercel.app/posts/post-02) auf, da dort gezeigt wird, wie man PyGame initialisiert und die Grundstruktur des Projekts aufsetzt. Das werde ich hier also nicht weiter erläutern. Wir fangen mit diesem Code an:

```python
#maingame.py
import pygame
import constants as c

#Initialisierung
pygame.init()

#Clock erstellen

clock = pygame.time.Clock()

#Fenstereinstellungen treffen
screen = pygame.display.set_mode((c.SCREEN_WIDTH,c.SCREEN_HEIGHT))
pygame.display.set_caption("StarGuard")

#game loop
run = True
while run:

    clock.tick(c.FPS)
    for event in pygame.event.get():
        #Möglichkeit das Spiel zu beenden
        if event.type == pygame.QUIT:
            run = False

pygame.quit()
```

**Nur eine Kleinigkeit dazu:** Ich lagere alle Konstanten in einer weiteren Datei aus. In constants.py. Das hat den einfachen Grund, dass über die Zeit hinweg ein Paar Konstanten entstehen werden und ich für möglichst viel Übersicht sorgen will. Ich importiere diese ganz oben in der maingame Datei und spreche die einzelnen Konstanten dann mit c. an.

Aktuell sieht constants.py so aus:

```python
#constants.py
SCREEN_WIDTH = 500
SCREEN_HEIGHT = 500
FPS = 60
```

Nun aber genug des Vorgeplenkels! Fangen wir an einen Gegner aufzusetzen!

# Enemy Class Setup

Wir fangen damit an eine weitere Datei zu erstellen und diese enemy.py zu nennen. Jede Python Klasse braucht zu Beginn einen Konstruktor mit dem sie arbeiten kann. Der Enemy Konstruktor sieht zu Beginn so aus:

```python
#enemy.py
import pygame

class Enemy(pygame.sprite.Sprite):
    def __init__(self, pos, image):
        pygame.sprite.Sprite(self)
        self.image = image
        self.rect = self.image.get_rect()
        self.rect.center = pos,
```

Hier gibt es eine Besonderheit!

### pygame.sprite.Sprite

PyGame bietet eine eingebaute Möglichkeit Sprites zu verwalten und diese auch als Entität zu kennzeichnen mit der sich direkt arbeiten lässt. Ich kann in der Hauptdatei direkt Methoden für Entitäten aufrufen, ohne dass ich weitere Vorkehrungen zu treffen. Ich könnte einen Spriteloader auch direkt selbst schreiben, wie ich es im Artikel “Movement-Skript” bereits getan habe, allerdings sehe ich nach dem aktuellen Stand noch keinen Grund dazu. Sollte ich mich mit dem PyGame Spriteloader unwohl fühlen, werde ich diesen austauschen und hier in einem weiteren Artikel vorzeigen. 

# Platzhalterbilder einladen

Wir wollen ja gleich auch was sehen. Das bedeutet wir brauchen ein Bild mit dem sich arbeiten lässt. 

Nehmen wir für den Anfang dieses hier:

![Untitled](/articlecontents/enemy_1.png)

Das Bild hier ist nicht selbst gemacht, sondern das Ergebnis von 15 Sekunden intensiver Google Suche. Leben wir also einfach damit, dass sich der Kollege auch vorerst nicht bewegen wird, das machen wir zu einem späteren Zeitpunkt.

In unserem Projekt sollten wir eine entsprechende Ordnerstruktur herstellen. Wie dies geht habe ich ebenfalls bereits im Artikel [Hausaufgabe 03: "Movement Skript"](https://nico-puelacher-fi.vercel.app/posts/post-05) thematisiert.

Das Ergebnis ist jedenfalls diese Ordner Struktur:

![Untitled](/articlecontents/Structure.png)

Jetzt bewegen wir uns rüber in den Init Bereich der maingame.py und rufen das gerade gezeigte Image auf und weisen es zu:

```python

#load images
#!!DIRECTIORY ERSTELLEN 
enemy_image = pygame.image.load('assets/images/enemies/enemy_1.png').convert_alpha()
```

# Gegner Instanz erstellen

Jetzt wo das Image im Code vorkommt, können wir hergehen und eine Enemy Entität aufsetzen.

```python

enemy_image = pygame.image.load('assets/images/enemies/enemy_1.png').convert_alpha()
#Hier wird initialisiert
enemy = Enemy((200,300), enemy_image)
```

Wie bereits im Konstruktor der Enemy Klasse angegeben brauchen wir zum Einen ein Starttupel. Dort wird angegeben wo auf dem Bildschirm unser Gegner starten soll, wenn das Spiel beginnt. Zum Anderen braucht die Enemy Klasse ein Image, dass sie verwalten kann. Im Artikel [Hausaufgabe 02: "Animation"](https://nico-puelacher-fi.vercel.app/posts/post-04) habe ich bereits thematisiert, wie man Sprites nacheinander einließt und im Zusammenhang mit Events abspielen kann.

# Groups

Das Spiel wäre ziemlich langweilig, wenn ich lediglich einen Gegner im Spiel einbauen würde. Mehre Gegner setzen aber voraus, dass ich diese gut organisieren kann. Dafür kann  ich mir nun aussuchen, ob ich Listen oder Gruppen verwenden möchte. Der Unterschied liegt so tief im Detail, dass dieser unwichtig wird. Ich entscheide mich in diesem Fall einfach aus Lust dazu Gruppen zu verwenden. Hierfür muss **bevor** der Gegner initialisiert wird die Gruppe erstellt werden. Ein weiterer Vorteil der PyGame Sprite Subklasse. Wenn der Enemy erstellt wurde, lässt sich dieser einfach mit einer add Funktion der Gruppe hinzufügen.

```python
#Enemy Gruppe
enemy_group = pygame.sprite.Group()

enemy = Enemy((200,300), enemy_image)
 
 #Gegner der Gruppe hinzufügen
enemy_group.add(enemy)
```

Hätte ich mich aus welchem Grund auch immer für Listen entschieden, dann würde dies nach dem gleichen Prinzip funktionieren, nur dass ich nicht "add" sondern "append" verwenden müsste.

Der letzte große Schritt ist unsere Gruppe in der Game Loop einzubauen. Objekte in das Spiel einzubinden geht über die draw Methode!

```python
#draw groups
enemy_group.draw(screen)
```

*“Naja, dann müssten wir ja jetzt eigentlich alles geschafft haben, um unseren Gegner auf dem Bildschirm sehen zu können, richtig?”*

![Untitled](/articlecontents/Nothing.png)

Nein.

2 Kleinigkeiten sollten wir noch abarbeiten.

Wir sollten zum Einen angeben, dass sich das Sichtfeld des Spiels mit jedem Clock tick ändern kann.

```python
pygame.display.flip()
```

Dann sollten wir noch angeben, dass sich mit jedem Frame die Hintergrundfarbe anpasst, einfach weil sonst jeder Schritt des Gegners sichtbar wäre.

```python
screen.fill('black')
```

Und Tadaaaaaaaaaa. Da ist unser Gegner.

![Untitled](/articlecontents/WalkingEnemy.png)

Es steht aber einfach still, daher bringen wir jetzt Bewegung in die Sache!

# Bewegung in eine Richtung

## Move Funktion

Innerhalb der enemy.py erstellen wir eine weiter Funktion, die sich **Move** nennt. Dort legen wir jetzt einfach fest, dass unser Gegner von seinem Spawnpunkt aus nach rechts laufen soll, bis er aus dem Bild verschwunden ist. Was wir dann auch noch schreiben **müssen**, ist eine Update Methode, damit ich diese in der Gameloop aufrufen kann und so festlegen kann wann innerhalb des Spielflusses die Gegner aktualisiert werden sollten. Damit sieht die gesamte Enemy Klasse so aus:

```python
#enemy.py
import pygame

class Enemy(pygame.sprite.Sprite):
    def __init__(self, pos, image):
        pygame.sprite.Sprite.__init__(self)
        self.image = image
        self.rect = self.image.get_rect()
        self.rect.center = pos,

    def update(self):
        self.move()
        
    def move(self):
        self.rect.x += 1
```

Die Gameloop in der Hauptdatei sieht nun so aus:

```python
#maingame.py
#game loop
run = True
while run:
    clock.tick(c.FPS)
    screen.fill("grey100")

    #draw groups
    enemy_group.update()

    enemy_group.draw(screen)

    

    for event in pygame.event.get():
        #Möglichkeit das Spiel zu beenden
        if event.type == pygame.QUIT:
            run = False

    pygame.display.flip()

pygame.quit()
```


Und das funktioniert!

---

# Schlusswort

Dieser Artikel alleine stellt mehr da, als angenommen. Denn was wir jetzt bereits abhaken können ist, dass wir einen Gegner haben der sich in eine Richtung bewegen kann. 

Das ist Grundlage genug eine AI zu schreiben, die es schafft einem Weg zu folgen!

Dies wird im nächsten Artikel geschehen. Auf diesen Teil der Arbeit freue ich mich ganz besonders, weil dies der wichtigste Meilenstein im Projekt wird. Wenn die AI gut funktioniert, dann kann eigentlich nicht mehr viel schief gehen! :))

# Gesamter Code

### maingame.py

```python
#maingame.py
import pygame
from enemy import Enemy
import constants as c

#Initialisierung
pygame.init()

#Clock erstellen
clock = pygame.time.Clock()

#Fenstereinstellungen treffen
screen = pygame.display.set_mode((c.SCREEN_WIDTH,c.SCREEN_HEIGHT))
pygame.display.set_caption("StarGuard")

#load images
enemy_image = pygame.image.load('assets/images/enemies/enemy_1.png').convert_alpha()

#Enemy Gruppe
enemy_group = pygame.sprite.Group()

enemy = Enemy((200,300), enemy_image)
 
 #Gegner der Gruppe hinzufügen
enemy_group.add(enemy)

#game loop
run = True
while run:
    clock.tick(c.FPS)
    screen.fill("grey100")

    #draw groups
    enemy_group.update()

    enemy_group.draw(screen)

    

    for event in pygame.event.get():
        #Möglichkeit das Spiel zu beenden
        if event.type == pygame.QUIT:
            run = False

    pygame.display.flip()

pygame.quit()
```

### constants.py

```python
#enemy.py
import pygame

class Enemy(pygame.sprite.Sprite):
    def __init__(self, pos, image):
        pygame.sprite.Sprite.__init__(self)
        self.image = image
        self.rect = self.image.get_rect()
        self.rect.center = pos,

    def update(self):
        self.move()
        
    def move(self):
        self.rect.x += 1
```

### enemy.py
```py
#enemy.py
import pygame

class Enemy(pygame.sprite.Sprite):
    def __init__(self, pos, image):
        pygame.sprite.Sprite.__init__(self)
        self.image = image
        self.rect = self.image.get_rect()
        self.rect.center = pos,

    def update(self):
        self.move()
        
    def move(self):
        self.rect.x += 1
```
