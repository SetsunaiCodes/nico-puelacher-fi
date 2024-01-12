---
title: Button Inputs mit PyGame
des: In diesem kurzen Artikel möchte ich einen Nachtrag zum Joy Stick Script liefern
date: 2023-12-01
imagepath: articlesheads/Artikel09.jpeg
id: Hausaufgabe
topic: "05"
emote: 🎮
---

# Einleitung

Dieser Artikel baut auf den Ergebnissen von [Hausaufgabe 3 - JoyStick Inputs mit PyGame](https://nico-puelacher-fi.vercel.app/posts/post-09) auf und verfolgt das Ziel das dort entstandene Skript um eine interagierbare Oberfläche zu erweitern zu erweitern.

# Kontext

Nachdem Max und ich den JoyStick an den Pi angeschlossen hatten fiel uns am nächsten Tag auf, dass wir auch bereits Buttons haben, die wir verkabeln könnten. Alles was uns da also noch fehlte war ein Skript, mit dem man herumspielen kann. 

Zur darauffolgenden FI Sitzung sollte also ein Skript geschrieben werden, mit dem wir die Button Inputs testen können. Schön wäre auch, wenn man dies ein bisschen spielerisch gestalten könnte.

Mir schwebte ein Quadrat vor, dass sich über den JoyStick bewegen lässt und auf Knopfdruck die Farbe wechseln kann. 

Das Ziel ist also gesetzt! Fangen wir gleich an zu programmieren!

# Das Skript

## Ausgangscode

Mit diesem Code hier haben wir zuletzt aufgehört.

```python
import time
import pygame
import RPi.GPIO as GPIO

pygame.init()

#setup gpio
GPIO.setmode(GPIO.BCM)

##JoyStick Inputs
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(17, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(27, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down = GPIO.PUD_UP)

###Hier müssten dann jetzt die Assets geladen, der Player und das Fenster erstellt werden
###damit das Spiel dann läuft. Aktuell werden nur Konsolen Inputs geregelt.

while True:
            
            
#Das ist ein Always High JoyStick, das bedeutet, 
##dass wir nach if not fragen, da wir nach KEINEM Strom für einen Input suchen
    direcion = ""
    if not GPIO.input(17):
        direction = "hoch"
        print("JoyStick Richtung:" + direction)
    if not GPIO.input(18):
        direction = "links"
        print("JoyStick Richtung:" + direction)
    if not GPIO.input(27):
        direction = "runter"
        print("JoyStick Richtung:" + direction)
    if not GPIO.input(22):
        direction = "rechts"
        print("JoyStick Richtung:" + direction)

            
            
            
        
            
# Ausgänge wieder freigeben
GPIO.cleanup()
```

## Button Inputs auslesen

Buttons werden nach genau dem selben Prinzip ausgelesen, wie JoyStick Inputs auch.

```python
##Button Inputs
GPIO.setup(25, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(28, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
```

## Overhead für das Spielfenster

Damit wir gleich neben den Konsolenausgaben auch ein weiteres Fenster bekommen können, sollten wir die relevanten Faktoren für dieses Fenster definieren.

```python

# Definieren der Farben
BLACK = (0, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0,255,0)
RED = (255, 0, 0)

# Definieren der Größe des Fensters und des Quadrats
window_size = (400, 400)
square_size = 40

# Initialisieren des Fensters
screen = pygame.display.set_mode(window_size)
pygame.display.set_caption('Steuerung mit Pygame')

# Initialisieren der Position des Quadrats
square_x, square_y = window_size[0] // 2, window_size[1] // 2

# Geschwindigkeit in Pixeln pro Schritt
speed = 40

# Standardfarbe
square_color = BLUE

```

Ich definiere im Vorfeld welche Farben wir gleich brauchen werden, um dem Viereck den Farbwechsel-Effekt zu geben. BLACK initialisiere ich nur, weil ich gleich zu "gemächlich" sein werde es in der Loop zu tun (hat aber keine Auswirkung auf das Programm), um den Hintergrund zu definieren, macht aber eigentlich keinen großen Unterschied.

## Die Gameloop

```python
while True:
    #Das ist ein Always High JoyStick, das bedeutet, dass wir nach 
    #if not fragen, da wir nach KEINEM Strom für einen Input suchen
    direcion = ""

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    if not GPIO.input(17):
        direction = "hoch"
        print("JoyStick Richtung:" + direction)
        square_y -= speed if square_y - speed >= 0 else 0
    if not GPIO.input(18):
        direction = "links"
        print("JoyStick Richtung:" + direction)
        square_x -= speed if square_x - speed >= 0 else 0
    if not GPIO.input(27):
        direction = "runter"
        print("JoyStick Richtung:" + direction)
        square_y += speed if square_y + speed + square_size <= window_size[1] else 0
    if not GPIO.input(22):
        direction = "rechts"
        print("JoyStick Richtung:" + direction)
        square_x += speed if square_x + speed + square_size <= window_size[0] else 0
    
    ##Hier müssten dann noch die Inputs für die Buttons rein
    if not GPIO.input(25):
        print("Button 1 gedrückt!")
        square_color = RED if square_color == BLUE else BLUE
    if not GPIO.input(28):
        print("Button 2 gedrückt!")
        square_color = GREEN if square_color == BLUE else BLUE
    
		#Mit jedem Tick sollte das Bild aktualisiert werden
    pygame.display.update()

    # Zeichne das Quadrat
    pygame.draw.rect(screen, square_color, (square_x, square_y, square_size, square_size))

    # Aktualisiere den Bildschirm
    pygame.display.flip()

    # Kontrolliere die Aktualisierungsrate
    pygame.time.Clock().tick(30)
    
    
        
            
# Ausgänge wieder freigeben
GPIO.cleanup()
```

Der Code hier ähnelt sich stark dem was wir bereits in der Ausgangssituation hatten, mit dem Unterschied, dass neben dem Print Statement eben noch das Bewegen des Quadrates erfolgt. 

Ich erinnere mich hier an meinen Artikel [DevLog 01: Getting Started](https://nico-puelacher-fi.vercel.app/posts/post-02), wo ich bereits erklärt habe, wie man ein Quadrat bewegen kann.

Bei einem Button Knopfdruck sollte sich die Farbe des Quadrates ändern. Dies erfolgt indem wir die dafür erstellte Variable umschreiben.

# Anschließen in der Hochschule

Dann war der Tag gekommen an dem wir unser Skript getestet haben.  Wir verkabelten die Buttons mit dem RasberryPi und fügten das Skript in die IDE des Rasberry Pi’s ein. Wie genau wir den Pi verkabelt haben ist nicht mein Anwendungsbereich, die Ehre gebührt Herrn Overlack. 

Hier sieht man zwei Fotos aus dem Media Lab 2, wo wir am Projekt gearbeitet haben.

![Pimitbtn.jpg](/articlecontents/Pimitbtn.jpg)

![Pimitbtn2.jpg](/articlecontents/Pimitbtn2.jpg)

# Testing des Skripts

Wir spielten das Skript ab und die Magie nahm ihren Lauf. In diesem Video kann man gut sehen, dass es funktioniert. 

[testingpimitbtn.mp4](/articlecontents/testingpimitbtn.mp4)

Ich habe nur eine kleine Anmerkung, die ich im fertigen Spiel berücksichtigen möchte. 

**Eigentlich** sollte man unter Button Inputs immer einen Sleep setzen. Das bedeutet, dass der Input nicht solange wieder und wieder abgefeuert werden kann, wie ich den Knopf gedrückt halte. Ein Knopfdruck ist nicht immer direkt auch nur ein Input. Der Input wird ohne Sleep solange gefeuert, wie es dem Computer möglich ist, während ich Strom auf den Button bringe.

Das ist hier im fertigen Skript nicht implementiert, wird aber im fertigen Spiel zum tragen kommen.

---

# Gesamter Code

```python
import time
import pygame
import sys
import RPi.GPIO as GPIO

pygame.init()

GPIO.setmode(GPIO.BCM)
#setup gpio

##JoyStick Inputs
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(17, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(27, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down = GPIO.PUD_UP)

##Button Inputs
GPIO.setup(25, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(28, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)

# Definiere Farben
BLACK = (0, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0,255,0)
RED = (255, 0, 0)

# Definiere die Größe des Fensters und des Quadrats
window_size = (400, 400)
square_size = 40

# Initialisiere das Fenster
screen = pygame.display.set_mode(window_size)
pygame.display.set_caption('Steuerung mit Pygame')

# Initialisiere die Position des Quadrats
square_x, square_y = window_size[0] // 2, window_size[1] // 2

# Setze die Geschwindigkeit in Pixeln pro Schritt
speed = 40

# Setze die Standardfarbe
square_color = BLUE

while True:
    #Das ist ein Always High JoyStick, das bedeutet, dass wir nach 
    #if not fragen, da wir nach KEINEM Strom für einen Input suchen
    direcion = ""

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    if not GPIO.input(17):
        direction = "hoch"
        print("JoyStick Richtung:" + direction)
        square_y -= speed if square_y - speed >= 0 else 0
    if not GPIO.input(18):
        direction = "links"
        print("JoyStick Richtung:" + direction)
        square_x -= speed if square_x - speed >= 0 else 0
    if not GPIO.input(27):
        direction = "runter"
        print("JoyStick Richtung:" + direction)
        square_y += speed if square_y + speed + square_size <= window_size[1] else 0
    if not GPIO.input(22):
        direction = "rechts"
        print("JoyStick Richtung:" + direction)
        square_x += speed if square_x + speed + square_size <= window_size[0] else 0
    
    ##Hier müssten dann noch die Inputs für die Buttons rein
    if not GPIO.input(25):
        print("Button 1 gedrückt!")
        square_color = RED if square_color == BLUE else BLUE
    if not GPIO.input(28):
        print("Button 2 gedrückt!")
        square_color = GREEN if square_color == BLUE else BLUE
    

    pygame.display.update()

    # Zeichne das Quadrat
    pygame.draw.rect(screen, square_color, (square_x, square_y, square_size, square_size))

    # Aktualisiere den Bildschirm
    pygame.display.flip()

    # Kontrolliere die Aktualisierungsrate
    pygame.time.Clock().tick(30)
    
    
        
            
# Ausgänge wieder freigeben
GPIO.cleanup()
```

# Schlusswort

Grundsätzlich ist das ganze Testing eine gute Sache, um zu schauen ob die Verkabelung funktioniert oder nicht. Macht schon sehr viel Sinn sich ausreichend Zeit für die entsprechende Vorbereitung zu nehmen.