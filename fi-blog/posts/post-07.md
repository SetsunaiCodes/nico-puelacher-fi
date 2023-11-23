---
title: JoyStick Inputs mit PyGame
des: In diesem Artikel setzte ich mich mit Max Overlack zusammen, um das Input Script für den JoyStick zu testen.
date: 2023-11-21
imagepath: articlesheads/JoySticks.jpg
id: Hausaufgabe
topic: Hausaufgabe 03
---


# Hausaufgabe 03: JoyStick Inputs

# Einleitung

Pfiffigen Augen wird aufgefallen sein, dass hier eigentlich ein anderer Artikel zum Thema JoyStick Inputs in PyGame stehen sollte. Ich entschied mich dazu diesen Artikel wieder offline zu nehmen, da dieser weder großartigen Mehrwert bietet, noch Skripte thematisiert, die tatsächlich 100%ig funktionieren. Ich möchte mit diesem Artikel ein bisschen Aufklärungsarbeit betreiben. Dies in einem informativeren und strukturierteren Rahmen als zuvor. Sollte sich irgendwer über den vorherigen Artikel gefreut haben, so kann ich nur mit

**¯\_(ツ)_/¯**

reagieren.

Fangen wir also direkt mit der Aufklärungsarbeit an!

# Theorie

## RasberryPi

### Allgemeines

Ein Raspberry Pi ist ein kleiner, preiswerter Computer, der von der **“Raspberry Pi Foundation“** entwickelt wurde. Er wurde entworfen, um Menschen aller Altersgruppen das Erlernen von Programmierung und Computertechnik zu ermöglichen. Trotz seiner Größe verfügt der Raspberry Pi über alle wesentlichen Elemente eines normalen Computers, einschließlich Prozessor, Arbeitsspeicher, USB-Anschlüsse und mehr.

In der Regel wird ein RasberryPi mit **Linux** als Betriebssystem verwendet.

Ich kannte den RasberryPi bisher auch nur als Möglichkeit Retro-Spiele, über ein eigenständiges System wieder zum Leben zu erwecken. Ich habe mal ein bisschen umherrecherchiert und dabei herausgefunden, dass man den RasberryPi sogar als Webserver benutzen könnte. Das bedeutet, dass ich mit meiner Berufung Webentwickler näher an RasberryPis sein könnte, als erwartet. Auch Dinge wie Smarthome-Technologie sind einfach möglich, auch wenn ich dabei eher auf Arduinos setzen würde, aber das ist ja jetzt nicht Thema. Was ich sagen will ist, dass RasberryPis vielseitig angewendet werden können.

### GPIO-Pins

Damit der RasberryPi mehr kann als Luft auf die CPU pusten und rot leuchten brauchts sowohl GPIO-Pins, Kabel und die entsprechenden Komponenten, die man verwenden will. 

Das Thema GPIO-Pins kann komplexer sein, als man im ersten Moment vielleicht denkt, daher kann diese Grafik hier, die ich auf der offiziellen RasberryPi Seite gefunden habe Hilfestellung bieten.

![PinInputs](/articlecontents/PiInputs.png)

Ein Meer aus Abkürzungen, die alle super wichtig und entscheidend wirken. Damit ich vollständig innerhalb dieses Artikels aufklären kann liefere ich im folgenden eine geschriebene Tabelle, die all diese Abkürzungen kurz erklärt. Ich möchte wirklich, dass man etwas aus diesem Artikel mitnehmen kann, die Foundation für dieses Projekt sollte fest und klar verständlich sein. Außerdem kann ich mir ganz ehrlich gut vorstellen, dass ich mir das Hobby Arcade Systeme entwerfen nach diesem Modul beibehalten werde und da ist ein solches Wissen ohnehin nicht schlecht.

![Table](/articlecontents/Table.png)

Tatsächlich werden wir für dieses Projekt nicht im Ansatz Gebrauch von allen Inputs machen dennoch fühle ich mich sehr wohl mit dieser Tabelle!

### HIGH und LOW

Wie man bereits aus der Tabelle entnehmen kann gibt es 2 verschiedene “Power-Pins” (geiles Wort). 

Auch wenn ich gleich erst genauer darauf eingehen möchte schneide ich hier schonmal an:

GPIO Pins können je nach Input entweder HIGH oder LOW sein. Äquivalent zu an oder aus. 1 oder 0. Man versteht das System denke ich. High bei einem RasberryPi bedeutet 3,3 Volt, Low bedeutet ca. 0 Volt. 

### Always HIGH / Always LOW JoySticks

Kurzer Exkurs zu JoySticks. Es existieren 2 gängige Varianten von Arcade JoySticks, die sich mit einem RasberryPi verbinden lassen. Ein Arcade JoyStick besteht in der Regel aus 4 analogen Inputs (oben, unten, rechts, links). Bei unserem JoyStick kann man diese sogar sehen, da die untere Seite transparent ist.

![JoyStick von unten](/articlecontents/JoyStickBottom.jpg)

(Wenn man genau ins Innenleben schaut, kann man die roten Knöpfe erkennen)

**Always HIGH:** Bei Betrieb laufen alle 4 Pins auf Spannung. Der Input der über den JoyStick gedrückt wird, wird blockiert und so entsteht ein Input.

**Always LOW:** Das genaue Gegenteil. Alle Inputs verfügen über keine Spannung. Betätige ich den JoyStick, dann wird die entsprechende Richtung mit Strom befeuert. 

# Praxis

Max Overlack und ich trafen uns, um gemeinsam dem RasberryPi zu verkabeln und das Skript zu testen.

## Download der Software

Auf der offiziellen Seite von RasberryPi fanden wir Download Links zum entsprechenden Betriebssystem RasberryPi OS. Wirklich schön ist, dass Python, PyGame, RPIO (Die Library um GPIO Pins einzulesen) bereits vorinstalliert mit dem System gekommen sind.

https://www.raspberrypi.com/software/

![Rasberry Pi Set Up 01](/articlecontents/PiOSSetup.jpg)

Hier sieht man einen Screenshot vom Installationsvorgang. Herr Overlack mag zwar über ein Macbook aus diesem Jahrhundert verfügen, doch zu unseren Gunsten verfügt dieses immernoch über ein internes SD-Karten Lesegerät. Heureka.

![Rasberry Pi Set Up 02](/articlecontents/PiOSSetup2.jpg)

(Hier ein Screenshot der Installationsmöglichkeiten des Pis)

Hier konnten wir verschiedenste Einstellungen vor dem Download des Betriebssystems festlegen, damit dies im Nachhinein nicht mehr getan werden muss.

Wir schlossen Maus, Tastatur und HDMI an den Pi an und warteten auf den Abschluss des Schreibvorgangs.

![RasberryPi](/articlecontents/RasberryPi.jpg)

Nach erfolgreichem Schreieben des OS auf die SD Karte, steckten wir diese in den Pi und schlossen ihn an den Strom an. Daraufhin erschien dieses Bild und alles startete perfekt.

![RasberryPi Launch](/articlecontents/RasberryPiLaunch.png)

Nach diversen Neustarts wegen der Installation des Systems ging es dann auch los. Der Pi ist startklar.

## Anschließen des JoySticks

Für eine ausführliche Erklärung wie man den JoyStick an den RasberryPi anschließt verweise ich an dieser Stelle an den entsprechenden Artikel von Herrn Overlack (ist ja auch nicht meine Aufgabe).

Jedenfalls sah das Endprodukt so aus:

![Rasberry Pi mit JoyStick](/articlecontents/PimitJoyStick.jpg)

## Inputs einlesen

Nun zu meiner Aufgabe des Abends. Das Aufsetzen eines Skripts. Angekommen bin ich mit diesem Skript:

```python
import time
import pygame
import RPi.GPIO as GPIO

pygame.init()

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.PUD_UP)
GPIO.setup(17, GPIO.PUD_UP)
GPIO.setup(27, GPIO.PUD_UP)
GPIO.setup(22, GPIO.PUD_UP)

while True:
    direcion = ""
    if GPIO.input(17):
        direction = "hoch"
        print("JoyStick Richtung:" + direction)
    if GPIO.input(18):
        direction = "links"
        print("JoyStick Richtung:" + direction)
    if GPIO.input(27):
        direction = "runter"
        print("JoyStick Richtung:" + direction)
    if GPIO.input(22):
        direction = "rechts"
        print("JoyStick Richtung:" + direction)                     
        
            
GPIO.cleanup()
```

Und der erste Test schlug vollkommen fehl. Es ging gar nichts. Dann recherchierte ich nochmal kurz und erkannte, dass es ein Syntax Problem beim initialisieren der Pins gibt. Dies änderte ich so ab:

```python
import time
import pygame
import RPi.GPIO as GPIO
pygame.init()

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(17, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(27, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down = GPIO.PUD_UP)

while True:
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

            
            
GPIO.cleanup()
```

Und dann wurde das Skript ausgeführt. Allerdings nicht so, wie gedacht. Denn es wurden immer wieder hintereinander alle Input Nachrichten ausgegeben. Wieder und wieder. 

Nach kurzem überlegen kam mir dann die Erleuchtung. Ich erinnerte mich an die Vorlesung zu JoySticks (und an heute Morgen, immerhin hab ich es bereits in diesem Artikel thematisiert), dass es Always High und Always Low JoySticks gibt. 

*”Wenn doch immer **ALLE** Ausgänge abgefeuert werden und wir wissen, dass das Skript funktioniert, dann heißt das, dass auf allen Inputs permanent Strom liegen muss. Dann ist das hier ein Always High JoyStick! Das bedeutet, dass wir nicht nach einem High fragen müssen, sondern nach einem LOW!(oder in unserem Fall nach einem “nicht High”)”* war das wahrscheinlich einzig 100% geistreiche was an diesem Tag aus mir herausgekommen war, aber genau das war die Lösung.

Ich änderte das Skript abermals so ab:

```python
import time
import pygame
import RPi.GPIO as GPIO
pygame.init()

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(17, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(27, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down = GPIO.PUD_UP)

while True:
#Das ist ein Always High JoyStick, das bedeutet, 
#dass wir nach if not fragen, da wir nach KEINEM Strom für einen Input suchen
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

            
GPIO.cleanup()
```

Und siehe da: Es funktioniert🥳🥳

Damit man hier in diesem Artikel auch sehen kann, dass es funktioniert haben wir hier ein Beweisvideo angefügt.

[Testvideo](/articlecontents/JoyStickTest.mp4)

# Schlusswort

Ich hab aus diesem Tag tatsächlich mehrere Learnings mitgenommen.

### RasberryPi Set-Up

Es geht unfassbar schnell und das RasberryPi OS zu konfigurieren und die Voreinstellung, die man für das Schreiben des OS treffen kann ersparen einem den ein oder anderen Kopfschmerz im Bash Terminal.

## Man lese die Beschreibung

Ich bin mir ziemlich sicher, dass auf der Arcade Express Seite des JoySticks steht, dass es sich bei diesem Modell um einen Always High JoyStick handelt. Alternativ opfert man 1,2 Gehirnzellen.