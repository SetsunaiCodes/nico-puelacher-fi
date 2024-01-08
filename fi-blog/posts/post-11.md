---
title: Die Gegner AI
des: In diesem Artikel sorge ich dafür, dass der Gegner auf jedem Satz von Wegpunkten laufen kann und sich entsprechend dreht
date: 2023-12-09
imagepath: articlesheads/Artikel11.jpeg
id: DevLog
topic: DevLog 03
---
# Einleitung

In diesem DevLog möchte ich die AI und das Pathfinding für die Gegner aufsetzen, damit ich im nächsten Artikel direkt damit anfangen kann erste Level zum testen aufzusetzen.

Der Plan steht also! Legen wir direkt los!

**Anmerkung:**
In diesem Artikel verwende ich Ingame Screenshots, die offensichtlich nicht meine eigenen sein können. Ich habe weder Rechte an den Spielen noch an den Bildern. Die Rechte liegen immer beim entsprechenden Entwicklerstudio. Ich gebe das entsprechende Studio unter den Bildern an.

# Das Pathfinding

## Was ist Pathfinding?

“Pathfinding” umschreibt in unserem Kontext eine Spielmechanik, wo eine Instanz (ein COM, wie man in Spielen so schön sagt) einem festgelegten Weg folgen soll. Pathfinding wird immer seltener in der aktuellen Gamingwelt, da AI Support besonders auf den Spieler an sich achtet und mit diesem interagiert, aber dennoch ist es immernoch eine valide Mechanik besonders in Tower Defense Spielen. Hier ist ein Beispiel für einen solchen Path aus dem Spiel “**Bloons TD 6**”. 

![BloonsTD6](/articlecontents/Artikel11/BloonsTD.png)

(Bloons TD6, Ninja Kiwi)

Hier sieht man klar, wo die Gegner entlang laufen werden. Über den Steg. Damit dies funktioniert müssen die Gegner Instanzen aber wissen, wo der Weg entlang läuft. Dafür wird “Pathfinding” genutzt. 

Pathfinding ist allerdings um einiges vielseitiger, als man in Tower Defense Spielen sieht. Eigentlich läuft Pathfinding in den meisten Fällen “unter der Haube” von den meisten Stealth-Games (Spiele wo es darum geht sich an Gegnern vorbei zu schleichen oder diese zu überwältigen). “Unter der Haube” meint in diesem Fall, dass man den Weg den die Gegner gehen nicht direkt sehen kann, weil diese nicht durch einen festen Weg, Pfeile oder Sonstiges gekennzeichnet werden. Dazu möchte ich zwei Spiele zeigen, die ein solches System verwenden, ohne den Path aufzuzeigen, da das Spiel sonst zu “berechenbar” wäre und das “nicht wissen” zum Stilmittel für Stimmung gehört.

![The Last of Us Part II](/articlecontents/Artikel11/TheLastofUsII.png)

(The Last of Us Part II, Naughty Dog)


Hier sehen wir einen Screenshot aus dem Spiel “**The Last of Us Part II**”. Dem wahrscheinlich besten Spiel in Punkto Atmosphäre, Storytelling und Gameplay (Neben dem Vorgänger “**The Last of Us**”. Auch hier wieder: Wer eine PS4 / PS5 besitzt **muss** dieses Spiel gespielt haben…). Jedenfalls laufen die Gegner hier einen immer nahezu gleichen Weg ab und der Spieler muss darauf achten, wo der Gegner stehen bleibt, mit welchen Objekten er interagiert und wo er hinschaut, um nicht entdeckt zu werden. Dabei verfügt der Spieler über kaum Munition und ist so dazu gezwungen sich das Pathfinding anzusehen, da ein Schusswechsel die letzte Option sein sollte. 

![Assassins Creed: Mirage](/articlecontents/Artikel11/ACMirage.png)

(Assassins Creed: Mirage, Ubisoft)

Da hat jetzt bestimmt niemand mit gerechnet, aber das hier ist “**Assassins Creed: Mirage**”. Die Vorzeige-Spielereihe in Sachen Stealth Games. Hier versteckt sich der Spieler in einer Unterhaltung um so den Gegner in rot zu inspizieren und sich seinen Weg einzuprägen und zu verfolgen. Das direkte Pathfinding ist auch hier nicht zu erkennen.

![Horizon Zero Dawn](/articlecontents/Artikel11/HorizonZeroDawn.png)

(Horizon: Zero Dawn, Guerilla Games)

Ausnahmen bestätigen die Regel. In **Horizon: Zero Dawn** gehört es zum grundliegenden Gameplay dazu das Pathfinding der Gegner sehen zu können, um so eine Strategie zu entwickeln, wie sich Fallen innerhalb der Wege setzen lassen. Der Path der Gegner wird hier dreidimensional auf die Map gelegt, wenn man diesen Gegner scannt. 

**Um das Thema zusammenzufassen:** Pathfinding kann ein Werkzeug sein um innovatives Gameplay oder Atmosphäre möglich zu machen und ist eben nicht nur wichtig, um in Tower Defense Spielen grundliegendes Gameplay zu ermöglichen.

# Implementierung

## Korrektur der Enemy Class

Mir ist beim Start des Programms gerade etwas aufgefallen, was mir beim letzten Mal wohl entgangen ist. 

*Der Gegner ist viel zu groß, der nimmt ja den halben Bildschirm ein.* 

*Das sollte so nicht sein,* 

*daher fügen wir weiteren Code in die enemy.py hinein.*

Soviel zur Lyrikstunde für diesen Blog. Ich habe das Skript nun wie folgt abgeändert:

```python
#enemy.py
import pygame

class Enemy(pygame.sprite.Sprite):
    def __init__(self, pos, image, initial_size=(40, 40)):
        pygame.sprite.Sprite.__init__(self)
        self.original_image = image
        self.image = pygame.transform.scale(self.original_image, initial_size)
        self.rect = self.image.get_rect()
        self.rect.center = pos

    def update(self):
        self.move()

    def move(self):
        self.rect.x += 1
```

Ich übergebe eine initial_size von 40 x 40 Pixeln mit im Konstruktor der Klasse und wende diese auf das Image an. Hier nutze ich die transform Methode von Pygame. Damit wird unser Gegner im Spiel auch direkt kleiner.

![Corrected Enemy](/articlecontents/Artikel11/KorrekturEnemy.png)

## Manuelles Setzen von Wegpunkten

Ich möchte als erstes damit anfangen überhaupt erstmal Wegpunkte ins Spiel hineinzubekommen, die sich dann am Ende zu einem Weg zusammensetzen. Dafür erstelle ich eine temporäre Sektion in der maingame Datei:

```python
#maingame.py - Init Area
waypoints = [
    (100,100),
    (400,200),
    (400,100),
    (200,300)
]
```

Die Waypoints werden in einer Liste im Init Bereich gespeichert. Letzten Endes sind die Wegpunkte nichts als x und y Koordinaten, die als Tupel gespeichert werden.

In der Gameloop werde ich diese Waypoints nun zu Linien zusammenführen:

```python
#maingame.py - GameLoop
pygame.draw.lines(screen, "grey0", False, waypoints)
```

Hierfür nutze ich eine der pygame.draw Methoden. Diese Methode benötigt den Bildschirm, die Farbe für die Linien, ob Python die Linien zusammenführen soll oder nicht und die Liste an Punkten.

Damit sieht unser Bildschirm beim Start schonmal so aus:

![Line Drawn](/articlecontents/Artikel11/LineDrawn.png)

Das ist doch schonmal was! Wir haben eine Linie. 

## Enemy startet bei erster Koordinate

Damit der Enemy dem Weg folgen kann sollten wir damit anfangen ihm die waypoints zu übergeben.

Dafür weise ich dem Enemy in der maingame Datei keiner festen Startkoordinate mehr zu, sondern übergebe direkt die Liste waypoints.

```python
#maingame.py Init Area
enemy = Enemy(waypoints, enemy_image)
```

Das zerschießt uns natürlich unsere aktuelle Enemy Klasse, aber das ändern wir jetzt.

```python

#enemy.py
import pygame

class Enemy(pygame.sprite.Sprite):
    def __init__(self, waypoints, image, initial_size=(40, 40)):
        pygame.sprite.Sprite.__init__(self)
        #Liste übergeben
        self.waypoints = waypoints
        #Start Koordinate ist immer der erste Eintrag der Liste
        self.pos = waypoints[0]

        self.original_image = image
        self.image = pygame.transform.scale(self.original_image, initial_size)
        self.rect = self.image.get_rect()
        self.rect.center = self.pos

    def update(self):
        self.move()

    def move(self):
        self.rect.x += 1
```

Wir fangen damit an den Konstruktor abermals umzuschreiben und die Startposition auf den ersten Eintrag in der Liste waypoints zu setzen. Damit startet unser Gegner schonmal an der richtigen Koordinate läuft dann aber rechts aus dem Bild raus.

## Von einer Koordinate zur anderen

Wenn man sich das Bild der Linie nochmal anschaut, dann sehen wir, das unsere Linie auch diagonal verlaufen kann. Darauf sind wir noch nicht vorbereitet, können dies aber mit ein bisschen Trigonometrie lösen. Dafür gibt es eingebaute PyGame Libraries, wie zum Beispiel “Vector2”.

Ziel ist es nun, dass unser Gegner von einem Wegpunkt zum anderen laufen kann.

Dafür machen wir nun folgendes:

```python
#enemy.py
import pygame
from pygame.math import Vector2

class Enemy(pygame.sprite.Sprite):
    def __init__(self, waypoints, image, initial_size=(40, 40)):
        pygame.sprite.Sprite.__init__(self)
        self.waypoints = waypoints
        #Start Koordinate zum Vektor machen
        self.pos = Vector2(waypoints[0])
        #Zielwegpunkt
        self.target_waypoint = 1

        self.original_image = image
        self.image = pygame.transform.scale(self.original_image, initial_size)
        self.rect = self.image.get_rect()
        self.rect.center = self.pos

    def update(self):
        self.move()

    def move(self):
        #Zielwegpunkt
        self.target = Vector2(self.waypoints[self.target_waypoint])
        #Bewegung - Normalisierung von 2 Punkten im 2 Dimensionalen Koordinatensystem
        self.movement = self.target - self.pos
        self.pos += self.movement.normalize()
        self.rect.center = self.pos

```

Ich glaube ich war noch nie so dankbar Mathe bei Dr. Frank Zimmer gehabt zu haben, sonst hätte ich dies so nicht hinbekommen. Was hier passiert ist, dass Zwischen Punkt 1 und Punkt 2 ein Vektor gespannt wird, dessen Werte normalisiert wurden. Damit kann der Gegner der ersten Linie problemlos folgen und bleibt danach stehen.

Hier ist ein anschauliches Bild was Normalisierung eigentlich tut: 

![Trigonometrie](/articlecontents/Artikel11/TrigonometrieDrawn.png)

Als Ergebnis in unserem Skript kriegen wir ca. 60 Koordinaten pro Sekunde und damit mehr als genug um unseren Gegner auf die Reise zu schicken.

![Gegner on Track](/articlecontents/Artikel11/GegnerAufTrack.png)

## Geschwindigkeit der Gegner

In großartiger Voraussicht denke ich jetzt schonmal daran, dass wir viele Gegner auf dem Spielfeld haben werden, die nicht alle gleich sein werden. Angefangen damit, dass sich manche schneller bewegen werden als andere. Dennoch sollten beide die selbe Klasse verwenden können, daher füge ich die Konstruktor Variable speed hinzu:

```python
#enemy.py
import pygame
from pygame.math import Vector2

class Enemy(pygame.sprite.Sprite):
    def __init__(self, waypoints, image, initial_size=(40, 40)):
        pygame.sprite.Sprite.__init__(self)
        self.waypoints = waypoints
        self.pos = Vector2(waypoints[0])
        self.target_waypoint = 1
        #Das ist zum angeben der Geschwindigkeit
        self.speed = 2
        self.original_image = image
        self.image = pygame.transform.scale(self.original_image, initial_size)
        self.rect = self.image.get_rect()
        self.rect.center = self.pos

    def update(self):
        self.move()

    def move(self):
        self.target = Vector2(self.waypoints[self.target_waypoint])
        self.movement = self.target - self.pos
        self.pos += self.movement.normalize()
        self.rect.center = self.pos
```

## Der Enemy folgt jeden Wegpunkt

Der nächste Schritt ist wirklich dafür zu sorgen, dass unser Enemy von einem Punkt zum anderen läuft und direkt abzufragen ob der Enemy bereits angekommen ist.

```python
#enemy.py
import pygame
from pygame.math import Vector2

class Enemy(pygame.sprite.Sprite):
    def __init__(self, waypoints, image, initial_size=(40, 40)):
        pygame.sprite.Sprite.__init__(self)
        self.waypoints = waypoints
        self.pos = Vector2(waypoints[0])
        self.target_waypoint = 1
        #Das ist zum angeben der Geschwindigkeit
        self.speed = 2
        self.original_image = image
        self.image = pygame.transform.scale(self.original_image, initial_size)
        self.rect = self.image.get_rect()
        self.rect.center = self.pos

    def update(self):
        self.move()

    def move(self):
        self.target = Vector2(self.waypoints[self.target_waypoint])
        self.movement = self.target - self.pos

        #Distanz zwischen den Zielen ausrechnen
        dist = self.movement.length()
        if dist >= self.speed:
            self.pos += self.movement.normalize() * self.speed
        
        else:
            self.pos += self.movement.normalize() * dist

        self.rect.center = self.pos
```

Hier habe ich also eine if-else Abfrage eingebaut, die wie folgt funktioniert:

Wenn die bevorstehende Distanz immer noch kleiner ist als die Geschwindigkeit, dann kann unser Gegner noch mindestens einen Schritt weitergehen. Das macht er dann auch und zwar mit der festgelegten Geschwindigkeit. Kann unser Gegner keinen vollen Schritt mehr gehen muss der Gegner aber **auf jeden Fall** beim Vektor 0 ankommen, damit er dann vernünftig vom neuen Wegpunkt zum anderen Wegpunkt gehen kann. 

Jetzt gibt es nur ein Problem… Der Vektor 0 lässt sich nicht normalisieren. Mit anderen Worten: Das Programm stürzt ab.

```python
#enemy.py
import pygame
from pygame.math import Vector2

class Enemy(pygame.sprite.Sprite):
    def __init__(self, waypoints, image, initial_size=(40, 40)):
        pygame.sprite.Sprite.__init__(self)
        self.waypoints = waypoints
        self.pos = Vector2(waypoints[0])
        self.target_waypoint = 1
        #Das ist zum angeben der Geschwindigkeit
        self.speed = 2
        self.original_image = image
        self.image = pygame.transform.scale(self.original_image, initial_size)
        self.rect = self.image.get_rect()
        self.rect.center = self.pos

    def update(self):
        self.move()

    def move(self):
        self.target = Vector2(self.waypoints[self.target_waypoint])
        self.movement = self.target - self.pos

        #Distanz zwischen den Zielen ausrechnen
        dist = self.movement.length()
        if dist >= self.speed:
            self.pos += self.movement.normalize() * self.speed
        
        else:
            if dist != 0:
                self.pos += self.movement.normalize() * dist
                self.target_waypoint += 1

        self.rect.center = self.pos
```

Das bedeutet, dass wir das Else um eine weitere Abfrage erweitern müssen. Wir kriegen 60 Koordinaten, pro Sekunde, das bedeutet, dass der Unterschied marginal wäre, wenn einer ausgelassen wird. Wenn wir aufgrund von self.speed keine weitere Bewegung machen können und nicht beim 0 Vektor angekommen sind, dann reicht dies, um den Wegpunkt zu wechseln. Die Mechanik funktioniert also schonmal perfekt und wird nach dem nächsten Kapitel demonstriert!

## Der Gegner dreht sich nicht mit

Das geht ja mal überhaupt gar nicht. Das lösen wir mit dieser Funktion hier:

```python
def rotate(self):
    #Distanz zum nächsten Wegpunkt
    dist = self.target - self.pos
    #Mit dem Abstand zum Wegpunkt kann der Winkel berechnet werden
    self.angle = math.degrees(math.atan2(-dist[1], dist[0]))
    #Bild drehen und auch auch das Rechteck abändern 
    self.image = pygame.transform.rotate(self.scaled_image, self.angle)
    self.rect = self.image.get_rect()
    self.rect.center = self.pos
```

Wenn ich 2 gegebene Vektoren habe, dann kann ich ebenfalls den Winkel ausrechnen, den der normalisierte Vektor einschlägt. Dann drehe ich das Image um genau diesen Wert. Damit ich dafür keine eigenen Gleichungen implementieren muss,  nutze ich die Python-Math Library, für die eine solche Operation ein Kinderspiel ist.

Anbei gebe ich noch ein Video, um den Gegner zu demonstrieren:

[StarGuardAIEnemy.mp4](/articlecontents/Artikel11/StarGuardAIEnemy.mp4)

---

# Schlusswort

Damit ist es vollbracht. Ich kann irgendwelche Koordinaten übergeben und immer wird der Gegner folgen. Damit ist die Grundlage für das Bauen von Leveln gesetzt und ich kann im nächsten Artikel mit dem aufsetzen des Level-Editors “Tiled” beginnen und die ersten Level aufsetzen.

# Ganzer Code

```python
#enemy.py
import pygame
from pygame.math import Vector2
import math

class Enemy(pygame.sprite.Sprite):
  def __init__(self, waypoints, image, initial_size=(40,40)):
    pygame.sprite.Sprite.__init__(self)
    self.waypoints = waypoints
    self.pos = Vector2(self.waypoints[0])
    self.target_waypoint = 1
    self.speed = 2
    self.angle = 0
    self.original_image = image
    self.scaled_image = pygame.transform.scale(self.original_image, initial_size)
    self.image = pygame.transform.rotate(self.scaled_image, self.angle)
    self.rect = self.image.get_rect()
    self.rect.center = self.pos

  def update(self):
    self.move()
    self.rotate()

  def move(self):
    #define a target waypoint
    if self.target_waypoint < len(self.waypoints):
      self.target = Vector2(self.waypoints[self.target_waypoint])
      self.movement = self.target - self.pos
    else:
      #enemy has reached the end of the path
      self.kill()

    #calculate distance to target
    dist = self.movement.length()
    #check if remaining distance is greater than the enemy speed
    if dist >= self.speed:
      self.pos += self.movement.normalize() * self.speed
    else:
      if dist != 0:
        self.pos += self.movement.normalize() * dist
      self.target_waypoint += 1

  def rotate(self):
    #Distanz zum nächsten Wegpunkt
    dist = self.target - self.pos
    #Mit dem Abstand zum Wegpunkt kann der Winkel berechnet werden
    self.angle = math.degrees(math.atan2(-dist[1], dist[0]))
    #Bild drehen und auch auch das Rechteck abändern 
    self.image = pygame.transform.rotate(self.scaled_image, self.angle)
    self.rect = self.image.get_rect()
    self.rect.center = self.pos
```

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

waypoints = [
    (100,100),
    (400,200),
    (400,100),
    (200,300)
]

enemy = Enemy(waypoints, enemy_image)
 
 #Gegner der Gruppe hinzufügen
enemy_group.add(enemy)

#game loop
run = True
while run:
    clock.tick(c.FPS)
    screen.fill("grey100")

    pygame.draw.lines(screen, "grey0", False, waypoints)

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

```python
#consants.py
SCREEN_WIDTH = 500
SCREEN_HEIGHT = 500
FPS = 60
```