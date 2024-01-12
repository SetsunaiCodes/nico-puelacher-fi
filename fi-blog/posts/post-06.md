---
title: Erste Konzeption
des: In diesem ersten richtigen DevLog Eintrag gehe ich auf die ersten Grundideen des Spiels ein.
date: 2023-10-30
imagepath: articlesheads/Artikel06.jpeg
id: DevLog
topic: "01"
emote: 🖌️
---

# Einleitung

Es gibt Leute die behaupten, dass die Planung eines Projekts wichtiger ist, als die schlussendliche Umsetzung. Ich bin ein solcher Mensch. Genau deswegen möchte ich in diesem ersten DevLog Eintrag darüber sprechen, wie ich an das Projekt Tower Defense Game herangehen möchte und wie ich mir das Spiel vorstelle.

**Anmerkung:**

Ich schildere hier (wie der Titel schon sagt nur eine Konzeption. Es kann gut sein, dass ich in der Entwicklung spontan abweiche und etwas anders machen werde). 

# Kleine, aber wichtige Schritte

Ich fange in der Regel mit einer Idee an, die mir irgendwann im Alltag kommt. Meist beim spazieren oder allgemein bei Aktivitäten, die dafür sorgen, dass man sich entspannt. Sowas wie:

- Joggen
- Gym
- Duschen
- Meditieren

So kam mir die erste Idee für das Layout des Spiels im Gym. 

David Allen sagte mal: “The mind is for having ideas. Not for holding them” - (Der Verstand ist dafür gedacht Ideen zu haben. Nicht dafür sie zu behalten).

Ich holte mein Handy raus und machte mir eine erste Notiz, die in der Regel meist nur ich verstehe, aber der springende Punkt ist, dass ich einen Ankerpunkt habe zu dem ich später, wenn ich Zeit habe zurückkehren kann. Dieser “Ankerpunkt” sah im Gym so aus:

![FirstScetch.jpg](/articlecontents/FirstScetch.jpg)

Was man halt so im Gym macht, während man einfach vor einem Gerät steht und es nicht benutzt… 
Diese Zeichnung sieht zwar unglaublich wirr aus, enthält aber soooo viele Informationen.
Gehen wir diese doch mal zusammen durch!

## 2 Areale

Das Spiel soll in 2 Areale aufgeteilt werden.

In einen Bereich, wo der Spieler Türme und Geräte auswählen kann und einen Bereich wo das Spiel passiert, der Spieler Türme setzen und die Gegner sehen kann. 

## 20 : 80 Schnitt

Im Webdesign (und in vielen anderen Rubriken des Designs) wird häufig vom **goldenen Schnitt** geredet. Dieser Ansatz beschäftigt sich damit wie das Auge etwas wahrnimmt, was es als “schön” bezeichnen würde. Simplifiziert spricht man im WebDev Universum von der 60:40 Regel. Der Hauptbereich (Die Main-Area) einer Seite sollte irgendwo zwischen 60 bis 80 Prozent des Bildschirms einnehmen, während der Nebenbereich (Die Aside-Area) einer Seite zwischen 20 bis 40 Prozent des Bildschirms einnehmen sollte. Dieser Blog hier ist ein gutes Beispiel, denn dieser hat einen Main-Bereich mit einer breite von 80% und einen Aside-Bereich von 20%. Genauso möchte ich das im Spiel ebenfalls handhaben. Wir sind uns gruppenintern noch nicht einig, ob wir einen 4:3 oder einen 16:9 Bildschirm verwenden wollen. Dies wird allerdings grundliegend entscheiden, wie ich die einzelnen Bereiche aufteilen möchte. Der Main-Bereich soll natürlich im Fokus stehen. Ein 4:3 Bildschirm ist (oh Wunder) schmaler als ein 16:9 Bildschirm, daher werde ich diese Entscheidung später nochmal thematisieren, wenn wir uns klar darüber sind und ich den Bildschirm ein Mal gesehen habe, den wir schlussendliche verwenden werden. 

## Festes Pathfinding

Diese großartige Linie, die sich durch den Main Bereich streckt ist der Path, den die Gegner in diesem Level langlaufen werden. Hier sind jetzt einige wichtige Merkmale gefallen. Ich möchte mich zu 100% für festes Pathfinding (die Gegner folgen einer (in jedem Level unterschiedlichen)  vorgegebenen Strecke und der Spieler kann Türme drum herum setzen) entscheiden, aus 2 Gründen:

### Grund 1: Leveldesign

Wenn die Mechaniken hinter diesem System einmal funktionieren und optimiert sind, dann lassen sich unglaublich schnell Level bauen. Mal angenommen ich exportiere eine JSON Datei wo 0 für “interagierbarer Boden” und 1 für “Gegnerpath” steht. Unter dieser Bedingung lassen sich sehr schnell sehr viele Level bauen. 

### Grund 2: Der User

Der User könnte, wenn wir keine festen Unterschiede machen würden und die Gegner sich zufällig in das Bild bewegen würden so viele Vorteile nutzen um das Spiel kaputt zu machen (Einfach eine Art “Wand” aus Türmen aufstellen, dann kommt ja kein Gegner mehr vorbei), dass sich dies für uns nicht lohnt. In der gegebenen Zeitspanne wäre das Beta-Testing und Debugging für so etwas **viel** zu massiv. Unser Anspruch ist ein richtig gutes Spiel. Kein halbgares Spiel. Daher entschieden wir uns als Gruppe festes Pathfinding zu verwenden.

## Auswählen und platzieren

Der Pfeil steht dafür, dass der Spieler einen Turm auswählen und dann auf dem Spielfeld platzieren können soll. Dies über einen Knopf und den Joystick. Im Hintergrund läuft ein Gridsystem, damit das Platzieren ein bisschen berechenbarer bleibt. 

# Roadmap

Jedes Spiel in der Industrie und auch unter Indie Developern sollte eine Roadmap haben.

### Was ist eine Roadmap und wieso sollte ich sowas machen?

Eine Roadmap ist sowas wie dein Schlachtplan. Ein Plan, den du aufsetzt an welchen Tag du was machst. Jeder Tag auf dieser Roadmap sollte sich mit einer Rubrik des Spiels beschäftigen, um diese zu verbessern. Dabei sollte darauf geachtet werden, dass man sich genügend Zeit für alles nimmt und dabei chronologisch und mit Sinn an ein Projekt herantritt. 

Der für mich wichtigste Punkt an einer Roadmap ist aber, dass ich nicht mittendrin neue Ideen haben kann, die das ganze Spiel über den Haufen schmeißt und ich am liebsten alles löschen und neu anfangen will, die Deadlines nicht einhalten kann und dann einfach… weine. 

Ich habe einen Plan. Dieser Plan wird umgesetzt. Komme was wolle. Dieser Plan soll mich nicht einschränken, er soll mich leiten, mir dabei aber den Freiraum lassen, das Projekt so umzusetzen, wie ich es mir wünsche.

Der Nachteil: Es kostet Zeit ( und Verstand ) eine solche Roadmap zu erstellen.

---

# Schlusswort

Im nächsten Artikel zeige ich meine geplante Roadmap für dieses Projekt. Ich mache dies nicht mehr im Rahmen dieses Artikels, weil eine Roadmap sehr groß werden kann und ich auch im Hinblick auf die mündliche Prüfung unterteilen möchte, weil ich mir sehr gut vorstellen kann, dass diese Roadmap thematisiert werden **könnte**.

**¯\*(ツ)*/¯**