---
title: Gegnerwellen
des: Heute werde ich den Prozess automatisieren Gegner zu spawnen und übergebe Metadaten um Wellen zu erstellen.
date: 2024-01-12
imagepath: articlesheads/Artikel17.jpeg
id: DevLog
topic: "08"
emote: 🧑‍🤝‍🧑
---

# Einleitung

Heute möchte ich mich darum kümmern, dass nicht nur ein Gegner durch ein Level fährt, sondern Wellen von Gegnern, die von den Turrets besiegt werden sollen. Damit deckt dieser Artikel die “Aufgabe” ab, die an den Spieler gestellt wird, wenn er sich dazu entscheidet das Spiel zu spielen. Die Gegnerwellen angreifen.

# Der aktuelle Stand

Wenn wir uns daran zurückerinnern, wie der aktuelle Stand ist, dann erfahren wir folgendes: 

Aktuell wird ein Gegner manuell erstellt und eingebunden. Zwar bereits so, dass dieser eine Gegner in einer Gruppe generiert wird, die dann in der Gameloop abgerufen wird, dennoch ist es nur einer und die bisherige Lösung ist nicht wirklich optimiert. Das ändern wir heute.

```python
#Enemy Gruppe erstellen
enemy_group = pygame.sprite.Group()
#Enemy Instanz erstellen
enemy = Enemy(world.waypoints, enemy_image)
#Enemy der Gruppe hinzufügen
enemy_group.add(enemy)
```

# Verschiedene Gegnertypen

Eigentlich möchte ich sogar, dass verschiedene Gegnertypen auftauchen können. Nach aktuellem Stand haben wir drei verschiedene Enemy Typen. Um vorerst Ressourcen zu sparen werde ich die Gegner als einzelnes Bild in das Spiel integrieren. Dafür verwende ich den jeweils ersten Sprite des Spritesheets, erstellt von unserem Designer.

Die sinnvollste Art und Weise an das Generieren von Gegnern heran zu gehen ist über ein Dictionary (wenn wir schon mit Python programmieren, dann können wir uns auch die Vorteile zu Nutze machen).

```python
#enemies
enemy_images = {
    "weak": pygame.image.load('assets/images/enemies/enemy_1_s.png').convert_alpha(),
    "medium": pygame.image.load('assets/images/enemies/enemy_2_s.png').convert_alpha(),
    "strong": pygame.image.load('assets/images/enemies/enemy_3_s.png').convert_alpha()

}
```

### Kleiner Exkurs: Unterschied zwischen Arrays und Dictionaries

Arrays gibts in Python gar nicht. Arrays heißen in Python “Listen", funktionieren aber genau wie Arrays. Ich lege einen Wert an und dieser ist über einen Index erreichbar.

```python
mein_array = [1, 2, 3, 4, 5]
print(mein_array[2])  # Gibt das dritte Element aus, also 3
```

Dictionaries hingegen arbeiten mit Key-Value Stores (Schlüssel-Wert Paaren). Ich kann meine Informationen also über einen Schlüssel erhalten. Im Fall oben über die Keys “weak”, ”medium”, ”strong”. Dictionaries sind besonders bei großen Datensätzen um ein Vielfaches effizienter als Listen/Arrays, daher sollte man diese auch nutzen, wenn sich der Zeitpunkt bietet.

Dieses Dictionary übergebe ich nun an meine Enemy Klasse, zusammen mit einem weiteren Argument “enemy_type” und schreibe die Klasse nun ein bisschen um.

```python
enemy_type = "weak"
enemy = Enemy(enemy_type, world.waypoints, enemy_images)
 #Gegner der Gruppe hinzufügen
```

# Änderungen an der Enemy Klasse

In der Klasse Enemy nehme ich folgende Änderungen vor:

```python
#enemy.py
import pygame
from pygame.math import Vector2
import math

class Enemy(pygame.sprite.Sprite):
  def __init__(self, enemy_type, waypoints, images, initial_size=(40,40)):
    pygame.sprite.Sprite.__init__(self)
    self.waypoints = waypoints
    self.pos = Vector2(self.waypoints[0])
    self.target_waypoint = 1
    #Lebensanzahl des Gegners
    self.health = 10
    #Geschwindigkeit des Gegners
    self.speed = 2
    self.angle = 0
    #Enemy Typ
    self.original_image = images.get(enemy_type)
    self.scaled_image = pygame.transform.scale(self.original_image, initial_size)
    self.image = pygame.transform.rotate(self.scaled_image, self.angle)
    self.rect = self.image.get_rect()
    self.rect.center = self.pos

  def update(self):
    self.move()
    self.rotate()

  def move(self):
    if self.target_waypoint < len(self.waypoints):
      self.target = Vector2(self.waypoints[self.target_waypoint])
      self.movement = self.target - self.pos
    else:
      self.kill()
    dist = self.movement.length()
    if dist >= self.speed:
      self.pos += self.movement.normalize() * self.speed
    else:
      if dist != 0:
        self.pos += self.movement.normalize() * dist
      self.target_waypoint += 1

  def rotate(self):
    dist = self.target - self.pos
    self.angle = math.degrees(math.atan2(-dist[1], dist[0]))
    self.image = pygame.transform.rotate(self.scaled_image, self.angle)
    self.rect = self.image.get_rect()
    self.rect.center = self.pos
```

Ich bringe so nach und nach verschiedene Variablen mit in den Code ein.

Wenn ich das Skript jetzt teste, sollte immer noch alles wie vorher funktionieren und der erste Gegner sollte ein mal ins Spiel geladen werden.

![Test 1](/articlecontents/Artikel17/Test1.png)

Sehr schön. Geht. Was nicht geht ist die Rotation, aber das lösen wir am Ende.

## Enemy Spawn Data

Was wir jetzt tun werden ist eine neue Python Datei anzulegen und zum Einen Infos über die Gegner speichern und zum Anderen werden wir speichern wie häufig diese Gegner im aktuellen Level vorkommen werden.

```python
#enemy_data.py
ENEMY_SPAWN_DATA = [
  {
    #1
    "weak": 15,
    "medium": 0,
    "strong": 0
  },
  {
    #2
    "weak": 30,
    "medium": 0,
    "strong": 0
  },
  {
    #3
    "weak": 20,
    "medium": 5,
    "strong": 0
  },
  {
    #4
    "weak": 30,
    "medium": 15,
    "strong": 0
  },
  {
    #5
    "weak": 5,
    "medium": 20,
    "strong": 0
  },
  {
    #6
    "weak": 15,
    "medium": 15,
    "strong": 4
  },
  {
    #7
    "weak": 20,
    "medium": 25,
    "strong": 5
  },
  {
    #8
    "weak": 10,
    "medium": 20,
    "strong": 15
  },
  {
    #9
    "weak": 15,
    "medium": 10,
    "strong": 5
  },
  {
    #10
    "weak": 0,
    "medium": 100,
    "strong": 0
  },
  {
    #11
    "weak": 5,
    "medium": 10,
    "strong": 12
  },
  {
    #12
    "weak": 0,
    "medium": 15,
    "strong": 10
  },
  {
    #13
    "weak": 20,
    "medium": 0,
    "strong": 25
  },
  {
    #14
    "weak": 15,
    "medium": 15,
    "strong": 15
  },
  {
    #15
    "weak": 25,
    "medium": 25,
    "strong": 25
  }
]

ENEMY_DATA = {
    "weak": {
    "health": 10,
    "speed": 2
  },
    "medium": {
    "health": 15,
    "speed": 3
  },
    "strong": {
    "health": 20,
    "speed": 4
  }
}
```

Optimistisch, wie ich eben bin setze ich an diesem Punkt einfach mal voraus, dass wir am Ende auf 15 Level kommen werden (die ich im nächsten Artikel erstellen möchte) und übergebe als einfach Integer wie viele Gegner des entsprechenden Typs im Level vorkommen werden (ENEMY_SPAWN_DATA). Des Weiteren übergebe ich die Metadaten der einzelnen Gegnertypen “health” und “speed” (ENEMY_DATA). 

Wenn ich den Konstruktor meiner Enemy Klasse jetzt auf die Daten der Liste ENEMY_DATA anpasse sieht dieser nun so aus:

```python
#enemy.py
import pygame
from pygame.math import Vector2
import math
from enemy_data import ENEMY_DATA

class Enemy(pygame.sprite.Sprite):
  def __init__(self, enemy_type, waypoints, images, initial_size=(40,40)):
    pygame.sprite.Sprite.__init__(self)
    self.waypoints = waypoints
    self.pos = Vector2(self.waypoints[0])
    self.target_waypoint = 1
    #Lebensanzahl des Gegners
    self.health = ENEMY_DATA.get(enemy_type)["health"]
    #Geschwindigkeit des Gegners
    self.speed = ENEMY_DATA.get(enemy_type)["speed"]
    self.angle = 0
    #Enemy Typ
    self.original_image = images.get(enemy_type)
    self.scaled_image = pygame.transform.scale(self.original_image, initial_size)
    self.image = pygame.transform.rotate(self.scaled_image, self.angle)
    self.rect = self.image.get_rect()
    self.rect.center = self.pos
```

Damit werden die entsprechenden Daten basierend auf enemy_type dynamisch aktualisiert.

## Automatisierung

Vollkommen autonom ist das jetzt ja noch nicht, da immernoch alles auf von enemy_type aus der maingame.py Datei abhängt.

Hierfür nehmen wir ein Paar weitere Änderungen vor. Für mich ist es am sinnvollsten das Spawning von Enemies in der world.py Datei zu erledigen, diese Mechanik Bestandteil jedes Levels sein soll.

Ich ändere den Konstruktor der Klasse wie folgt ab:

```python
class World():
    def __init__(self, data, map_image):
        self.level = 1
        self.tile_map = []
        self.waypoints = []
        self.moveofJSON = 0
        self.level_data = data
        self.image = map_image
        self.enemy_list = []
        self.spawned_enemies = 0
```

Und nun schreibe ich folgende Funktion in die Datei:

```python
def process_enemies(self):
        enemies = ENEMY_SPAWN_DATA[self.level-1]
        for enemy_type in enemies:
            #Speichern wie viele Gegner ich von welcher Sorte brauche
            enemies_to_spawn = enemies[enemy_type]
            #Gegnerinstanzen erstellen
            for enemy in range(enemies_to_spawn):
                self.enemy_list.append(enemy_type)
        #Randomizing enemies
        random.shuffle(self.enemy_list)
```

Was genau passiert hier?

1. ENEMY_SPAWN_DATA ist eine Liste und Listen beginnen beim Index 0, daher das -1
2. In der ersten for-Schleife wird gespeichert wie viele Gegner ich von welchem Typen für dieses Level benötige und speichere diese in einer Liste
3. In der zweiten for-Schleife erstelle ich solange Gegner Instanzen, wie diese Liste lang ist und füge diese Einträge der finalen enemy_list hinzu.
4. Da ich nicht möchte, dass die Gegner alle nacheinander erscheinen (das würde bedeuten, dass immer erst die leichten, dann die medium und dann die schweren Gegner spawnen) randomisiere ich die Liste, damit dies nun dem Zufall überlassen werden kann.

## Einbinden in die GameLoop

Damit sind wir grundsätzlich fertig mit der Automatisierung an sich. Jetzt muss ich nur noch dafür sorgen, dass diese sinnvoll in die Gameloop eingebunden wird. Dies möglichst nah am Event Handler.

```python
#Spawn enemies
    if pygame.time.get_ticks() - last_enemy_spawn > c.SPAWN_COOLDOWN:
        if world.spawned_enemies < len(world.enemy_list):
            enemy_type = world.enemy_list[world.spawned_enemies]
            enemy = Enemy(enemy_type, world.waypoints, enemy_images)
            #Gegner der Gruppe hinzufügen
            enemy_group.add(enemy)
            #Counter erhöhen
            world.spawned_enemies += 1 
            last_enemy_spawn = pygame.time.get_ticks()

#Dieser Code Block steht direkt über dem Event Handler
```

Führen wir dieses Skript jetzt aus, dann sehen wir, dass Level 1 (15 leichte Gegner) funktioniert.

—Okay. Eigenartig ist, dass kein Gegner spawnt, ich aber auch keine Fehlermeldung erhalte warum.

Naja, dann nutzen wir diesen Moment doch mal, um ein bisschen Debugging Arbeit zu erledigen.

Ich werde jetzt zu jedem Funktionsschritt ein print Statement schreiben, damit ich sehe, was funktioniert und was nicht.

Nach ersten Tests habe ich folgendes herausfinden können.

```python
#maingame.py
if pygame.time.get_ticks() - last_enemy_spawn > c.SPAWN_COOLDOWN:
	#!!Ab hier gehts nicht mehr weiter. 
        if world.spawned_enemies < len(world.enemy_list):
            print("Spawned Enemies ist kleiner als die Länge der Gegnerliste")
            enemy_type = world.enemy_list[world.spawned_enemies]
            enemy = Enemy(enemy_type, world.waypoints, enemy_images)
            #Gegner der Gruppe hinzufügen
            enemy_group.add(enemy)
            #Counter erhöhen
            world.spawned_enemies += 1 
            last_enemy_spawn = pygame.time.get_ticks()
```

Das ist interessant, da dann irgendetwas mit spawned_enemies oder mit enemy_list verkehrt laufen muss.

—5 Minuten später…

Ich simuliere hier kurz meine Reaktion, als ich den Fehler gefunden habe:

“AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH”.

Nunja, wie formuliere ich das jetzt… Funktionen sind großartig… wenn man sie irgendwo aufrufen würde. Damit die Gegner gesetzt werden können, muss die Funktion im Init Bereich der main Datei aufgerufen werden.

```python
#Init Bereich der Main Game Datei

##########vorher##########
world = World(world_data, map_image)
world.process_data()

#########nachher###########

#World Gruppe
world = World(world_data, map_image)
world.process_data()
world.process_enemies()

```

Vergessen wir diesen Moment einfach ganz schnell und tun so als hätte alles reibungslos funktioniert.

![Test 2](/articlecontents/Artikel17/Test2.png)

# Das Rotationsproblem

Die wenigsten Raumschiffe, die ich kenne fliegen seitwärts :))  

Wir haben vor Zeiten mal eine Funktion angelegt, um die Rotation der Gegner anzupassen.

Diese sieht aktuell so aus:

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

Ziehen wir mal 90 von self.angle ab…

```python
def rotate(self):
    dist = self.target - self.pos
    self.angle = math.degrees(math.atan2(-dist[1], dist[0]))
		#90 Grad abziehen
		self.angle -= 90
    self.image = pygame.transform.rotate(self.scaled_image, self.angle)
    self.rect = self.image.get_rect()
    self.rect.center = self.pos
```

![Test 3](/articlecontents/Artikel17/Test3.png)

Na geht doch!🥳

---

# Schlusswort

Tatsächlich freue ich mich gerade sehr, weil das Spiel so langsam fertig wird und ein erfolgreiches Ende des Projekts in Sicht ist. Bei Programmierprojekten ist es (zumindest bei mir) häufig so, dass mir dieses Projekt ein Stück weit ans Herz wächst und ich entsprechend auch sehen möchte, wie dieses “wächst” und “erfolgreich” wird. Erfolgreich hier meint, dass ich mir mit jedem Artikel sicherer werden kann, dass dieses Projekt meinen Ansprüchen entspricht und gute Chancen hat die entsprechende Note, die ich mir wünsche einzuspielen.
