---
title: JoyStick Inputs mit PyGame
des: In diesem Artikel versuche ich ein Script zu schreiben, welches JoyStick Inputs von einem RasberryPi entgegen nimmt
date: 2023-11-06
imagepath: articlesheads/JoySticks.jpg
id: Hausaufgabe
topic: Hausaufgabe 03
---

# Hausaufgabe 03: Inputs einlesen Python

# Einleitung

Hier wandere ich tatsächlich auf vollkommen fremden Terrain. Ich hab mich immer für Arcade Automaten interessiert, aber nie darüber nachgedacht selbst welche zu bauen, was sich nach diesem Modul durchaus ändern könnte, weil ich das Thema durchaus spannend finde und man so ein Projekt über ein ganzen Jahr haben könnte. Immer nebenbei. Jedenfalls soll es in diesem Artikel darum gehen, wie man mit PyGame JoyStick Inputs einließt. Wie bereits erwähnt weiß ich nicht zu 100%, wie dies funktioniert, ich weiß aber wie man Controller (PlayStation oder XBOX) als Input Source für Spiele verwenden kann. In diesem Artikel werde ich Gedankengänge und Versuche schildern und nach der Vorlesung vom 06.11 werde ich hier nachtragen, ob das Script, wie ich es mir vorgestellt habe funktioniert, oder nicht. Lernmaterial Verweise ich unten in den Quellen.

# Was frage ich mich aktuell?

Die Primärfrage, die ich mir stelle, ist ob der Rasberry Pi, den ich in der Veranstaltung verwende bereits pip und pygame installiert hat. Falls nein, sollte dies erst noch geregelt werden.

### Python installieren

Mit Python kommt auch der Package Manager pip, den wir auf jeden Fall brauchen werden.

[Download Python](https://www.python.org/downloads/)

### PyGame installieren

Ich erinnere mich noch daran, wie anstrengend es war PyGame zu installieren, weil es quasi 100 verschiedene Wege gibt den entsprechenden Call in der Kommandozeile zu machen.

**Wichtig Teil 1:** Es gibt 2 verschiedene Arten von PyGame. PyGame und PyGame-CE (Community Edition). Die CE ist VIEL, also wirklich VIEL stabiler, als die Grundversion, daher sollte sich immer für diese entschieden werden. 

**Wichtig Teil 2** ist, dass man die Kommandozeile so öffnet, dass man im User Verzeichnis ist, wenn man beginnt Kommandos einzugeben (da wo Python auch installiert sein sollte!). 

Ich liste hier mal alle Varianten auf, die mir auf Anhieb einfallen:

```python
py -m pip install pygame-ce
```

```python
pip install pygame-ce
```

```python
pip3 install pygame-ce
```

```python
python pip install pygame-ce
```

```python
python3 pip install pygame-ce
```

Was ich nach Recherche (ein Freund von mir ist Linux-Crack) rausgekriegt habe ist, dass es in den meisten Fällen

```python
python3 pip install pygame-ce
```

ist (Ich hoffe, dass das auch hier der Fall ist).

# JoyStick Inputs einlesen - Theorie

Wie gesagt kenne ich mich mit JoyStick Inputs nicht aus, allerdings habe ich in Technischer Informatik in Semester 2 aufgepasst und weiß, dass es 2 verschiedene Möglichkeiten für einen JoyStick gibt, wenn es darum geht die Inputs zu lesen.

### Basics

Die 4 (eigentlich 6, oder 9, oder 32 (mittlerweile sind es glaube ich sogar mehr)) Richtungen werden mit verschiedenen Volt Stärken kommuniziert. Hier gibt es 2 verschiedene Ansätze, die im Code berücksichtigt werden sollten.

### Always High

Hier sind alle Richtungen immer mit auf voller Stärke an und nur die Richtung, die gerade gedrückt wird, wird unterdrückt.

Bei RasberryPi's (bei Arduinos auch) ist es so, dass zwischen "High" und "Low" (an oder aus / 1 oder 0) unterschieden wird. Jenachdem wie viel Spannung gerade auf einen GPIO-Pin gesetzt wird, wird entweder das Eine oder das Andere "aktiviert". 

Man merke sich:

**High:** 3,3 Volt

**Low:** ca. 0 Volt

### Always Low

Hier ist es genau anders herum. Hier sind alle Eingänge im Low. Bewege ich in den JoyStick in eine bestimmte Richtung, dann wechselt diese ins High.

### Zusammenfassend

lässt sich also feststellen, dass die entsprechenden Ports so eingelesen werden können.

# JoyStick Inputs einlesen - Erste Idee

## Was ich weiß

Ich weiß, dass es eine PyGame Library gibt, die sich genau darum kümmert. Controller Inputs einzulesen und entsprechend zu verwalten. Ich hab mir dazu folgende Gedanken gemacht. Hier für sollten die Kommentare im  Code gelesen werden:

```python
### Init ###
import pygame

def main():
    pygame.init()

###Fenster und Titel als Formalie (brauchen wir nicht) ###

    window = pygame.display.set_mode((400, 400))
    pygame.display.set_caption("Joystick Inputs")

###JoyStick über die Lib erfassen Joystick(0) nimmt sich den ersten JoyStick,
### den er findet. ###

###Danach initialisieren ###

    joystick = pygame.joystick.Joystick(0)
    joystick.init()

###Schleife ###

    while True:
        for event in pygame.event.get():
    
    ### Fenster soll sich wieder schließen können, wenn ich auf das rote X klicke ###
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
    
    ### Horizontale Achse und vertikale Achse erfassen (Kann die JoyStick Lib
		### auch über einen Tupel (x,y)). ###
        
        horizontal_axis = joystick.get_axis(0)
        vertical_axis = joystick.get_axis(1)

    ### Damit man dann gleich was sieht möchte ich die entsprechende Richtung
		### speichern ###

        direction = ""

    ### Für Always High JoySticks ###

    ### Wenn die vertikale Achse kleiner ist als negativ 0,5 dann wird
		### der Stick nach oben gedrückt ###
    ### Gleiches System für alle anderen auch ###
    ### Die JoyStick Lib hängt ein Minus an hoch und links dran, um unterscheiden
		### zu können...### 
        if vertical_axis < -0.5:
            direction = "OBEN"
        elif vertical_axis > 0.5:
            direction = "UNTEN"
        elif horizontal_axis < -0.5:
            direction = "LINKS"
        elif horizontal_axis > 0.5:
            direction = "RECHTS"

        print("Richtung:", direction)

main()
```

# — Nachtrag 07.11.2023

# Wir haben ein Problem

Das Script was ich hier geschrieben habe funktioniert nicht mit einem Rasberry Pi. Dieses Script funktioniert tatsächlich einwandfrei mit einem XBOX oder Playstation Controller aber nicht mit einem JoyStick oder den entsprechenden Buttons. Hätte mich auch ein bisschen gewundert, wenn PyGame wirklich so smart gewesen wäre die SerialPins automatisch durch zu tracken.

Aber das ist noch lange kein Weltuntergang. Ich habe eine bisschen hin und hergesucht und diverse Lösungen gefunden wie ich mit meinem Code GPIO Pins auslesen kann. 

Dafür kann man die RPi.GPIO Library benutzen und damit den bereits bestehenden Code verändern. 

Wichtig ist, dass sich dadurch die Struktur eines PyGame Projects ein bisschen verändert.

Ein PyGame besteht aus einem Init Bereich und der Loop. Mit der GPIO Library erweitert sich dieses Projekt um ein Stet-Up Bereich für die Pins.

Das System dahinter ist tatsächlich genau das selbe, wie man es eigentlich kennt. Pins initialisieren ist eigentlich ja auch immer ähnlich.

```python
import time
import pygame
import RPi.GPIO as GPIO
# Zählweise der Pins festlegen

GPIO.setmode(GPIO.BOARD)
#setup gpio
GPIO.setmode(GPIO.BCM)
GPIO.setup(22, GPIO.OUT)
GPIO.setup(23, GPIO.OUT)
GPIO.setup(24, GPIO.OUT)
GPIO.setup(25, GPIO.OUT)

###Hier müssten dann jetzt die Assets geladen, der Player und das Fenster erstellt werden
###damit das Spiel dann läuft. Aktuell werden nur Konsolen Inputs geregelt.

while True:
     
     for event in pygame.event.get():
            
            direcion = ""
    
    ### Fenster soll sich wieder schließen können, wenn ich auf das rote X klicke ###
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            if event.type == pygame.K_w:
                     GPIO.output(22, GPIO.HIGH)
                     direction = "hoch"

            if event.type == pygame.K_a:
                     GPIO.output(23, GPIO.HIGH)
                     direction = "links"
            if event.type == pygame.K_s:
                     GPIO.output(24, GPIO.HIGH)
                     direction = "runter"
            if event.type == pygame.K_a:
                     GPIO.output(24, GPIO.HIGH)
                     direction = "rechts"
            
            print("JoyStick Richtung:" + direction)
        
            
# Ausgänge wieder freigeben
GPIO.cleanup()
```

## Mini Problem

Diese Library lässt sich nicht außerhalb eines RasberryPi s kompilieren, was auch bedeutet, dass ich immernoch nicht 100% weiß, ob der Code, den ich hier geschrieben habe funktioniert oder nicht. Das ist aber eigentlich kein großes Problem, im Fokus steht die Entwicklung des Spiels selbst.  

# Schlusswort

Wir werden sehen, ob dieses Script funktioniert, oder nicht, da bleiben wir gespannt, ich werde ein entsprechendes Update geben, wenn es soweit ist. 

## — Nachtrag 07.11.2023

Ich habe hier dann jetzt eine finale Lösung, wie man GPIO Pins in Python auslesen und verwenden kann. Sobald wir einen RasberryPi und den entsprechenden JoyStick habe, werde ich das Script testen.

## Quellen
[Read GPIO.output to make something happen in PyGame](https://raspberrypi.stackexchange.com/questions/38371/read-gpio-output-to-make-something-happen-in-pygame)