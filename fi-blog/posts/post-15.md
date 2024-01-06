---
title: Der Grid-Controller 1
des: In diesem Artikel nehme ich die Maussteuerung aus dem Spiel und ersetze sie durch ein vorher getestetes Grid System.
date: 2024-01-06
imagepath: articlecontents/Artikel15/Test3.png
id: DevLog
topic: DevLog 06
---
# Einleitung

Heute machen wir etwas durchaus komplexes und aufregendes. Wir bauen den Grid Controller und versuchen uns so von der Maussteuerung zu distanzieren. Hier muss ich sagen, dass ich hier absolut neues Terrain betrete und kein direktes Vorwissen aus meinen privaten Projekten mitbringen kann, einfach weil ich noch nie eine Grid Steuerung aufgesetzt habe, besonders nicht in der Größe. Das möchte ich aber heute ändern. Ich werde diesen Artikel aber etwas anders gestalten, aber das wird das Endergebnis nicht weiter beeinflussen.

# Die Planung

*“Was soll dieser Grid Controller eigentlich tun?”*

Folgende Stichpunkte fallen mir auf Anhieb zu dieser Frage ein:

- Das Spielfeld in ein Grid aufteilen
- Einen Zeiger erstellen, der sich mit Tasten lenken lässt.
- Auf Knopfdruck ein Turret platzieren.

Sobald ein Baumenü hinzugefügt wurde sollen diese Funktionen folgen:

- Auf weiteren Knopfdrück in dieses Menü wechseln und Turm auswählen können

# Prototyp

Ganz Recht. Ich will den Grid-Controller bevor ich ihn ins Spiel einarbeite einmal in einem Testprojekt “vorprogrammieren”, damit ich im eigentlichen Spiel erstmal nichts kaputt machen kann. Wir arbeiten den Code dann im nächsten Schritt in das Spiel ein. 

Wir fangen mit dieser Grundstruktur an und arbeiten uns dann weiter durch:

```python
import pygame
import constants as c

pygame.init()
clock = pygame.time.Clock()
screen = pygame.display.set_mode((c.SCREEN_WIDTH,c.SCREEN_HEIGHT))
pygame.display.set_caption("Gird Controller")

#game loop
run = True
while run:
    clock.tick(c.FPS)
    screen.fill("black")

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False

    pygame.display.flip()

pygame.quit()
```

Damit habe ich einfach erstmal ein einfaches schwarzes Fenster. 

## Blaues Viereck, dass sich bewegen lässt

Soweit so einfach.

```python
import pygame
import sys
import constants as c

pygame.init()
clock = pygame.time.Clock()

blue = (0,0,255)
speed = c.TILE_SIZE // 2
x, y = 0, 0

screen = pygame.display.set_mode((c.SCREEN_WIDTH,c.SCREEN_HEIGHT))
pygame.display.set_caption("Gird Controller")

run = True
while run:
    clock.tick(c.FPS)
    screen.fill("black")

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
            pygame.quit()
            sys.exit()
        keys = pygame.key.get_pressed()
        if keys[pygame.K_w]:
            y -= speed
        if keys[pygame.K_s]:
            y += speed
        if keys[pygame.K_a]:
            x -= speed
        if keys[pygame.K_d]:
            x += speed
        
            

    pygame.draw.rect(screen, blue, (x, y, c.TILE_SIZE, c.TILE_SIZE))

    pygame.display.flip()

pygame.quit()
```

![Test 1](/articlecontents/Artikel15/Test1.png)

Damit erstelle ich ein blaues Rechteck, welches sich auf einem Grid-System bewegen lässt. Ich kann aber immer noch an den Seiten raus und diagonales navigieren ist auch noch ein Problem. 

## Border Check

Das erste Problem kriegen allerdings sehr einfach gelöst.

```python
import pygame
import sys
import constants as c

pygame.init()
clock = pygame.time.Clock()

blue = (0,0,255)
speed = c.TILE_SIZE // 2
x, y = 0, 0

screen = pygame.display.set_mode((c.SCREEN_WIDTH,c.SCREEN_HEIGHT))
pygame.display.set_caption("Gird Controller")

run = True
while run:
    clock.tick(c.FPS)
    screen.fill("black")

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
            pygame.quit()
            sys.exit()
        keys = pygame.key.get_pressed()
        if keys[pygame.K_w]:
            if y > 0:
                y -= speed
        if keys[pygame.K_s]:
            if y < c.SCREEN_HEIGHT - c.TILE_SIZE:
                y += speed
        if keys[pygame.K_a]:
            if x > 0: 
                x -= speed
        if keys[pygame.K_d]:
            if x < c.SCREEN_WIDTH - c.TILE_SIZE:
              x += speed
        
            

    pygame.draw.rect(screen, blue, (x, y, c.TILE_SIZE, c.TILE_SIZE))

    pygame.display.flip()

pygame.quit()
```

**Das Wichtigste hier:** 

immer schön drüber nachdenken, dass die Checks zwar das Quadrat betreffen, aber eigentlich immer nur eine Koordinate gecheckt wird. Die Koordinate oben, links vom Quadrat. Das sollte bei den Abfragen berücksichtigt werden.

## Timeouts

Das System funktioniert aber immer noch nicht so 100% richtig, was daran liegt, dass wir keine Restriktion haben wie viele Schritte pro Druck gelaufen werden können, was zu Problemen in der Gameloop führen kann. Möchte ich auch nicht. Aber ich möchte den Intervall erhöhen indem sich das Quadrat bewegt.

Dies kann man über Timeouts lösen:

```python
#...Timeout im Init Bereich
movement_timeout = 75
last_movement_time = pygame.time.get_ticks()

run = True
while run:
    clock.tick(c.FPS)
    screen.fill("black")

#Timeouts in die Events einbinden
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
            pygame.quit()
            sys.exit()

    current_time = pygame.time.get_ticks()
    keys = pygame.key.get_pressed()
    if keys[pygame.K_w] and current_time - last_movement_time > movement_timeout:
        if y > 0:
            y -= speed
            last_movement_time = current_time
    if keys[pygame.K_s] and current_time - last_movement_time > movement_timeout:
        if y < c.SCREEN_HEIGHT - c.TILE_SIZE:
            y += speed
            last_movement_time = current_time
    if keys[pygame.K_a] and current_time - last_movement_time > movement_timeout:
        if x > 0:
            x -= speed
            last_movement_time = current_time
    if keys[pygame.K_d] and current_time - last_movement_time > movement_timeout:
        if x < c.SCREEN_WIDTH - c.TILE_SIZE:
            x += speed
            last_movement_time = current_time        
```

Damit ist die Bewegung des Quadrats abgeschlossen. Jetzt folgt der leichte Teil. Ein weiteres Event soll passieren, wenn ich eine weitere Taste drücke. Im Spiel soll dann entweder das Baumenü betreten oder ein Turret platziert werden. 

## Button Event

Wir haben aktuell kein Baumenü (dieses wird aber laut meines Planes im nächsten Artikel erstellt), daher fügen wir exemplarisch eine Funktion ein, die die Farbe des Quadrats verändert.

Dies wird durch diese Änderung möglich

```python
...Farbe rot zu den Farben hinzufügen und eine neue Variable currentColor anlegen
blue = (0,0,255)
red = (255,0,0)
speed = c.TILE_SIZE
x, y = 0, 0
currentColor = blue
...

...In Event-Handler der GameLoop eine neue Funktion einfügen
 
    if keys[pygame.K_o] and current_time - last_movement_time > movement_timeout:
        currentColor = red if currentColor == blue else blue
        last_movement_time = current_time 

...In der draw Methode für das Rect dymanisch die Farbe angeben
    pygame.draw.rect(screen, currentColor, (x, y, c.TILE_SIZE, c.TILE_SIZE))
```

## Gesamter Code des Prototyps

Jetzt haben wir alle Funktionen, die wir für den Moment brauchen. Das hier ist der gesamte Code den ich in der test.py Datei angelegt habe:

```python
import pygame
import sys
import constants as c

pygame.init()
clock = pygame.time.Clock()

blue = (0,0,255)
red = (255,0,0)
speed = c.TILE_SIZE
x, y = 0, 0
currentColor = blue

screen = pygame.display.set_mode((c.SCREEN_WIDTH,c.SCREEN_HEIGHT))
pygame.display.set_caption("Gird Controller")

movement_timeout = 75
last_movement_time = pygame.time.get_ticks()

run = True
while run:
    clock.tick(c.FPS)
    screen.fill("black")

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
            pygame.quit()
            sys.exit()

    current_time = pygame.time.get_ticks()
    keys = pygame.key.get_pressed()
    if keys[pygame.K_w] and current_time - last_movement_time > movement_timeout:
        if y > 0:
            y -= speed
            last_movement_time = current_time
    if keys[pygame.K_s] and current_time - last_movement_time > movement_timeout:
        if y < c.SCREEN_HEIGHT - c.TILE_SIZE:
            y += speed
            last_movement_time = current_time
    if keys[pygame.K_a] and current_time - last_movement_time > movement_timeout:
        if x > 0:
            x -= speed
            last_movement_time = current_time
    if keys[pygame.K_d] and current_time - last_movement_time > movement_timeout:
        if x < c.SCREEN_WIDTH - c.TILE_SIZE:
            x += speed
            last_movement_time = current_time        
    if keys[pygame.K_o] and current_time - last_movement_time > movement_timeout:
        currentColor = red if currentColor == blue else blue
        last_movement_time = current_time 

    pygame.draw.rect(screen, currentColor, (x, y, c.TILE_SIZE, c.TILE_SIZE))

    pygame.display.flip()

pygame.quit()
```

# Das Einarbeiten in das Projekt

Jetzt folgt der schwere Teil dieses Artikels, denn dieser Prototyp wird sich nicht einfach in das Spiel einarbeiten lassen. 

## Das Hauptproblem

Das Hauptproblem (welches ich bewusst haben wollte) ist, dass das Spiel aktuell auf den Mauszeiger ausgelegt ist. Die gesamte Technologie dahinter ist obsolet und muss durch den Grid-Controller ausgetauscht werden.

## Schritt 01: Erstellen der Variablen.

Um das Gridsystem in das Spiel einzuarbeiten brauchen wir die entsprechenden Variablen aus dem Test. Diese unterscheiden sich nicht in Art und Position zum Test, daher werde ich hier auch keinen weiteren Code Schnipsel einbringen.

## Schritt 02: Einbringen des Vierecks

Hierbei werden wir den Eventhandler um die Funktionen erweitern, die wir bereits in den Test geschrieben haben.

```python
#EventHandler maingame.py
for event in pygame.event.get():
        #Möglichkeit das Spiel zu beenden
        if event.type == pygame.QUIT:
            run = False
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            mouse_pos = pygame.mouse.get_pos()
            if mouse_pos[0] < c.SCREEN_WIDTH and mouse_pos[1] < c.SCREEN_HEIGHT:
                create_turret(mouse_pos)

    current_time = pygame.time.get_ticks()
    keys = pygame.key.get_pressed()
    if keys[pygame.K_w] and current_time - last_movement_time > movement_timeout:
        if y > 0:
            y -= speed
            last_movement_time = current_time
    if keys[pygame.K_s] and current_time - last_movement_time > movement_timeout:
        if y < c.SCREEN_HEIGHT - c.TILE_SIZE:
            y += speed
            last_movement_time = current_time
    if keys[pygame.K_a] and current_time - last_movement_time > movement_timeout:
        if x > 0:
            x -= speed
            last_movement_time = current_time
    if keys[pygame.K_d] and current_time - last_movement_time > movement_timeout:
        if x < c.SCREEN_WIDTH - c.TILE_SIZE:
            x += speed
            last_movement_time = current_time

    pygame.draw.rect(screen, currentColor, (x, y, c.TILE_SIZE, c.TILE_SIZE))
```

Damit haben wir das blaue Quadrat in unserem Spiel und können es mit den Tasten W, A, S, D bewegen. 

![Test 2](/articlecontents/Artikel15/Test2.png)

## Schritt 03: Turrets platzieren

Jetzt ändern wir die aktuelle Funktion zum platzieren von Turrets so ab, dass wir die Position des Grid Controllers nutzen können.

An dieser Stelle wäre es sinnvoll den Artikel [Türme platzieren](https://nico-puelacher-fi.vercel.app/posts/post-14) gelesen zu haben, um die Funktion zu verstehen, die ich jetzt verändern werde.

Das hier ist die aktuelle Funktion ohne Änderungen:

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

Zunächst brauchen wir keine Bedingungen mehr, was auch bedeutet, dass ich mouse_pos aus der Funktion streichen kann. Meine erste Idee, wäre zunächst x und y ohne weitere Änderungen zu verwenden.

Mein erster Vorschlag, den ich testen möchte ist dieser hier:

```python
def create_turret():
    mouse_tile_x = x // c.TILE_SIZE
    mouse_tile_y = y // c.TILE_SIZE

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

Und das funktioniert tatsächlich bereits. Wenn ich die O Taste auf der Tastatur drücke werden Turrets platziert.

![Test3](/articlecontents/Artikel15/Test3.png)

Das ist tatsächlich großartig, da wir die ersten Funktionalitäten des Grid-Controllers direkt ins System einbauen konnten!

---

# Schlusswort

Ich habe aus diesem Artikel zwei Dinge mitgenommen. Zum Einen ist es überhaupt nicht schlimm mal überhaupt keine Vorstellung zu haben, wie man etwas umsetzen könnte und es einfach erstmal zu versuchen ohne zu wissen, ob es funktioniert oder nicht. 

Zum Anderen muss ich zugeben, dass ich mich ein bisschen davor gedrückt habe diese Änderungen vorzunehmen und mich erstmal auf eine Maussteuerung zu versteifen, weil ich diese bereits kannte und man mit dem Grid-System durchaus einiges hätte kaputt machen können. Habe ich jetzt gar nicht und ich habe auch nur ca. 2 Stunden an den Änderungen und dem Schreiben des Artikels gesessen.

Was das Spiel jetzt allerdings brauchen sind Grafiken. Unser Designer sollte sich damit auseinander setzen.