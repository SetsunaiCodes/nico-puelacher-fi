---
title: Türme platzieren
des: In diesem Artikel baue ich eine weitere Mechanik in das Spiel ein. Das Platzieren von Türmen.
date: 2024-01-01
imagepath: articlesheads/Artikel16.png
id: DevLog
topic: DevLog 05
---
# Einleitung

Heute werden wir den Counter Part zu den Gegnern programmieren. Die Türme, die den Gegnern schaden zufügen sollen. Die erste Version soll noch mit einer Maus spielbar sein und nicht mit Tasten und einem Grid System. Im Endeffekt mache ich mir damit mehr Arbeit, aber ich habe ein leichters Spiel, wenn es darum geht StarGuard zu testen. Außerdem wird der Grid-Controller nochmal ein bisschen anstrengender, daher möchte ich zunächst den einfacheren Weg gehen und später einen weiteren Artikel über den Grid-Controller schreiben.

# Theorie

Fangen wir damit an ein bisschen Inspiration und Wissen aus bereits existierenden Tower Defense spielen mit in diesen Artikel einfließen zu lassen recherchieren mal was sich die 3 berühmtesten Tower Defense Spiele ausgedacht haben, um den Spieler bei Laune zu halten und um das Spiel einzigartiger zu machen.

Tower Defense Spiele gibt es mittlerweile nicht mehr nur in der klassischen Form wie wir es bauen werden (Oder wie es beispielsweise Bloons TD jedes Jahr aufs neue tut).  Tower Defense Spiele gibt es mittlerweile in vielen Variationen und Stilen mit verschiedensten Schwerpunkten, daher schauen wir uns diese extravaganten Beispiele an und nehmen uns Notizen für die spätere Entwicklung mit.

## They are Billions

![They Are Billions](/articlecontents/Artikel14/TheyAreBillions.png)

(They are Billions | Numantian Games)

In They are Billions geht es darum in einer Steampunk Welt Wellen von Zombies abzuwehren. Interessant hier ist Verwalten von Ressourcen, was den Spieler unter Zugzwang setzen soll. Das Aufsammeln von Ressourcen kann verbessert werden, indem man Gebäude setzt, die bei der Produktion helfen. 

Aktuell ist geplant, dass der Spieler ein Art Währung bekommt. Aktuell Schwanke ich in Richtung “Schrauben” oder “Traktorzellen”, das überlege ich mir für den entsprechenden Artikel.

Was ich jetzt aber aus diesem Beispiel mitnehmen möchte ist ein **Turm**, der das **Erhalten** der entsprechenden **Ressource verschnellert**. ****

## Plants vs. Zombies

![Plants vs. Zombies](/articlecontents/Artikel14/PlantsVSZombies.png)

(Plants vs. Zombies | PopCap und EA Games)

Das Spiel kennt wahrscheinlich jeder aus meiner Generation und hat es mindestens 1 Mal auf dem Handy oder Tablet durchgespielt. Hier muss man keine Ebene sondern Reihen verwalten indem man wie auf einem Schachbrett Truppen setzen kann. Pflanzen, die man mit Sonnenenergie sammeln muss. Die Sonnenblume ist ein weiteres Beispiel für ein Turm der erst etwas kostet, dann aber die Produktion beschleunigt. 

Aus diesem Spiel möchte ich aber eine andere Komponente als Inspiration mitnehmen. Die **Statuseffekte.** Denn neben den normalen Erbsenschießern, gibt es auch Varianten wie Eis-Erbsenschießer, Feuer-Erbsenschießer etc. 

Da es sich bei StarGuard um ein Sci-Fi Spiel handelt dachte ich eher an Statuseffekte wie:

- Gehackt
- Elektrisiert
- Verpestet

Sowas in die Richtung.

## Bad North

![Bad North](/articlecontents/Artikel14/BadNorth.png)

(Bad North | Plausible Concept)

Bad North ist ein richtiger Exot, was Tower Defense Spiele angeht. Hier geht es darum, seine Insel zu verteidigen, Stämme aufzubauen und Nachts Wellen von Angreifern zu überstehen. Das allerdings möglichst minimalistisch und klein gehalten. 

Wirklich schön hier finde ich, dass das Spiel Elemente in der Umgebung verwenden muss, um die **Stimmung** des Spiels zu definieren. Wir werden in unserem Spiel nicht viel Gelegenheit finden Dekoration zu platzieren, was auch bedeutet, dass ich mir besondere Gedanken machen sollte, wie ich die verschiedenen Level Gestalte und in welchem Setting ich die Welten halte.

# Praxis

Nehmen wir die Ergebnisse der Theorie auf, schieben sie aber für einen Moment beiseite und fangen erstmal damit an einen Basis-Turret in das Spiel zu implementieren. Dafür erstellen wir eine weitere Python Datei in unserem Projekt, die wir turrets.py nennen. Wie immer möchte ich sicher gehen, dass ich direkt flexibel Arbeiten kann, daher schreiben wir eine Turret Klasse. 

```python
#turrets.py
import pygame

class Turret(pygame.sprite.Sprite):
    def __init__(self, image, pos):
        self.image = image
        self.rect = self.image.get_rect()
        self.rect.center = pos
```

Da Turrets sichtbare Sprites verwenden, importieren wir hier, wie bei den Gegnern auch die Sprite Methoden von Pygame in den Konstruktor der Klasse. Der Rest ist auch erstmal klassisch, wie Instanzen die sich bewegen, bewegt werden können oder mit denen anderweitig interagiert werden können erstellt. Das kennen wir soweit schon von den Enemies.

## Mauszeiger Preview

Das ist tatsächlich sogar ein bisschen Vorarbeit für den Grid Controller. Ich möchte, dass der Spieler ein bisschen Feedback erhält wo er sich gerade befindet. Dies über eine Voransicht, wo er den aktuellen Turm platzieren würde, wenn er den entsprechenden Knopf drückt.

Dafür importieren wir die Turret Klasse in die Maingame Datei und initialisieren das Image dort, wo auch alle anderen Images geladen werden.

```python
from turrets import Turret

...
#load images
#map
map_image = 
pygame.image.load('levels/map.png').convert_alpha()
#individual turret image for mouse cursor
cursor_turret = 
pygame.image.load('assets/images/turrets/cursor_turret.png').convert_alpha()
#enemy
enemy_image = 
pygame.image.load('assets/images/enemies/enemy_1.png').convert_alpha()
...
```

Jetzt erstellen wir eine Gruppe, wo wir die Turrets drin speichern können, genau wie bei den Gegnern auch.

```python
...
#Enemy Gruppe
enemy_group = pygame.sprite.Group()
#Turret Gruppe
turret_group = pygame.sprite.Group()
...
```

## Turrets platzieren

Jetzt wo alles bereit ist, um ein Turret auf der Karte zu platzieren übergeben wir der Gameloop, dass ich mit einem Mausklick dafür sorge, dass sich ein Turret platziert. Dafür gehen wir in den Event Handler und fügen die Funktionalität hinzu.

```python
#draw groups
    enemy_group.update()
    enemy_group.draw(screen)
#Turrets auf dem Bildschirm anzeigen
    turret_group.draw(screen)

    for event in pygame.event.get():
        #Möglichkeit das Spiel zu beenden
        if event.type == pygame.QUIT:
            run = False
#Mausklick mit Funktionalität versehen (event.button == 1 ist Linksklick)
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            mouse_pos = pygame.mouse.get_pos()
            turret = Turret(cursor_turret, mouse_pos)
            turret_group.add(turret)
```

Wenn ich das Spiel jetzt starte und irgendwo hinklicke erscheint die erste der Platzhalter Grafiken, die ich für den Moment vorgesehen habe:

![Test 1](/articlecontents/Artikel14/Test1.png)

Bisschen groß das Ding, aber das soll uns erstmal nicht weiter stören, da es sich hier um Platzhalter handelt. Was wir ebenfalls jetzt schonmal tun können ist  das Platzieren von Turrets auf das Spielfeld zu begrenzen, da sich das Fenster hier ja noch so verändern wird, dass ein Baumenü auf der rechten Seite erscheinen wird. Dies können wir so übernehmen:

```python
for event in pygame.event.get():
        #Möglichkeit das Spiel zu beenden
        if event.type == pygame.QUIT:
            run = False
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            mouse_pos = pygame.mouse.get_pos()
						#Check ob wir noch im Levelbildschirm sind:
            if mouse_pos[0] < c.SCREEN_WIDTH and mouse_pos[1] < c.SCREEN_HEIGHT:
                turret = Turret(cursor_turret, mouse_pos)
                turret_group.add(turret)
```

Das nächste Problem, was ich habe bedarf wenig Worten, sondern eher diesem Bild: 

![Test 2](/articlecontents/Artikel14/Test2.png)

Es wäre schön, wenn ich nur ein Turret pro Tile setzen könnte, was auch bedeutet, dass wir das Größenproblem lösen sollten.

Was wir jetzt tun werden ist PyGame mitzuteilen, dass wir in einem Gridsystem arbeiten wollen, was den Grid-Controller später auch sehr vereinfachen wird. 

Das braucht jetzt allerdings ein bisschen Arbeit, was auch bedeutet, dass ich nach der Sicherheitsabfrage, ob sich der Mauszeiger noch im Level befindet eine Funktion aufrufen werde und den ganzen Code in den Init Bereich des Spiels schreiben werde.

```python
def create_turret(mouse_pos):
    mouse_tile_x = mouse_pos[0] // c.TILE_SIZE
    mouse_tile_y = mouse_pos[1] // c.TILE_SIZE

    turret = Turret(cursor_turret, mouse_tile_x, mouse_tile_y)
    turret_group.add(turret)
```

Dann ist das Turret wie erwähnt viel zu groß, daher passen wir die Größe direkt auf das neue Gridsystem an:

```python
#turrets.py
import pygame
import constants as c

class Turret(pygame.sprite.Sprite):
		#initial_size gibt die Größe des Tiles an. Könnte man auch dynamisch machen.
    def __init__(self, image, tile_x, tile_y, initial_size=(32,32)):
        pygame.sprite.Sprite.__init__(self)
        self.tile_x = tile_x
        self.tile_y = tile_y

        #calculate center coordinates
        self.x = (self.tile_x + 0.5) * c.TILE_SIZE
        self.y = (self.tile_y + 0.5) * c.TILE_SIZE
        self.original_image = image
        self.image = pygame.transform.scale(self.original_image, initial_size)
        self.rect = self.image.get_rect()
        self.rect.center = (self.x, self.y)
```

Damit kommen wir schonmal soweit:

![Test 3](/articlecontents/Artikel14/Test3.png)

Nun haben wir ein perfektes Gridsystem auch wenn die Platzhaltergrafik schlecht darauf abgestimmt ist, soll mich aber für den Moment nicht weiter stören, gehen wir lieber das nächste Problem an.

Ich kann Turrets mitten auf dem Weg platzieren. Das wollen wir auch nicht. Diese Info kriege ich aus unserer wunderbaren JSON Datei, die mit jedem Level dazukommt.

Diese Restriktion schreiben wir am besten mit in die World Klasse:

```python
#world.py
    def process_data(self):
        #Das JSON nach dem Sektor polyline durchsuchen und zurückgeben
        for layer in self.level_data["layers"]:
            if layer["name"] == "tilemap":
                self.tilemap = layer["data"]
            elif layer["name"] == "waypoints":
                for obj in layer["objects"]:
                    self.moveofJSON = obj.get("x")
                    waypoint_data = obj["polyline"]
                    self.process_waypoints(waypoint_data)
```

Jetzt muss ich die Funktion in der Maingame Datei erweitern, die wir vorhin erstellt haben:

```python
def create_turret(mouse_pos):
    mouse_tile_x = mouse_pos[0] // c.TILE_SIZE
    mouse_tile_y = mouse_pos[1] // c.TILE_SIZE

    #calculate the sequential number of the tile
    mouse_tile_num = (mouse_tile_y * c.COLS) + mouse_tile_x
    #check if that tile a placeable or not (11 in the JSON is placeable tile)
    if world.tile_map[mouse_tile_num] == 11:
        turret = Turret(cursor_turret, mouse_tile_x, mouse_tile_y)
        turret_group.add(turret)
```

Damit ist das Problem auch aus der Welt geschafft. Ich kann jetzt keine Türme mehr auf dem Weg der Gegner legen.

Das letzte, was ich für diesen Moment erledigen möchte, ist dass ich auch wirklich nur eine Instanz eines Turrets auf ein Tile setzen kann. Genau genommen ist es aktuell möglich unendlich viele Instanzen auf ein Tile zu platzieren, man sieht es einfach nur nicht.

Das möchten wir nicht. Noch weniger möchte das der RasberryPi. Daher bauen wir weitere Checks in die Funktion ein. Das hier ist die finale Funktion:

```python
def create_turret(mouse_pos):
    mouse_tile_x = mouse_pos[0] // c.TILE_SIZE
    mouse_tile_y = mouse_pos[1] // c.TILE_SIZE

    #calculate the sequential number of the tile
    mouse_tile_num = (mouse_tile_y * c.COLS) + mouse_tile_x
    
    if world.tile_map[mouse_tile_num] != 11:
        #Check ob das Tile besetzt ist
        space_is_free = True
        for turret in turret_group:
            if(mouse_tile_x, mouse_tile_y) == (turret.tile_x, turret.tile_y):
                space_is_free = False
        #Wenn der Platz frei ist, dann setzen wir ein Turret
        if space_is_free == True:
            new_turret = Turret(cursor_turret, mouse_tile_x, mouse_tile_y)
            turret_group.add(new_turret)
```

Nach ein Paar Tests über Print Statements kann ich sagen, dass auch dies reibungslos funktioniert.

---

# Schlusswort

Noch kann das Turret nicht schießen, das soll es aber auch noch gar nicht können. Aktuell ist das Ziel möglichst alle Elemente in das Spiel zu bekommen. Das schlussendliche Schießen passiert mehr oder weniger automatisch und hat nichts mit einem Input zutun.