---
title: Ein- und Ausgabegeräte
des: In diesem Artikel gehe ich auf die Geschichte der Ein- und Ausgabegeräte ein und bringe ein bisschen persönliche Erfahrungen ein.
date: 2024-01-27
imagepath: articlesheads/Artikel25.jpg
id: Exkurse
topic: "04"
emote: ⏳
---
# Einleitung

Dieser Artikel fasst die Historie der Ein- und Ausgabegeräte zusammen. Interessanter, als es zuerst den Anschein macht, wenn man bereit dafür ist von der aktuell kommerzialisierten “Maus und Tastatur” Handhabung abzusehen und seine Horizonte erweitern will.

# I/O

Wie wir auch im Rahmen des Moduls Betriebssysteme wissen sollten ist ein Input / Output Device ein Gerät um analoges Feedback zu digitalisieren und für einen Computer verwertbar zu machen. 

I/O spielt nicht nur bei PCs und Smartphones eine Rolle, sondern auch bei Waschmaschinen, Autos und auch bei Mikrowellen, Backöfen oder kurz: Alles, was einen steuerbaren (Mikro-)Computer hat.

Wie alles in Deutschland ist die Definition eines Eingabegerätes per DIN genormt. 

***DIN EN ISO 9241: Ergonomie der Mensch-System-Interaktion besagt:
“Ein Eingabegerät stellt einen Sensor dar, der Änderungen des Verhaltens des
Benutzers (Gestik, Fingerbewegungen usw.) feststellt und diese in Signale umwandelt,
die das interaktive System interpretieren kann.”***

# Verwertung von Inputs

Ich denke keiner hier ist verwirrt, dass sich CPU(s) darum kümmern Inputs zu verwalten und an die anderen Komponenten des Computers weitergibt und dann weiter zu operieren. Für die verschiedenen Anforderungsbereiche hat ein Computer verschiedene Komponenten. Audiosignale werden in der Regel von einer Soundkarte übernommen. Grafikelemente werden von der GPU Einheit (der Grafikkarte) übernommen.

Soundkarten sind hier besonders. Wie wir für das Modul Medientechnik wissen sollten wird analoger Sound über einen A/D Wandler “digitalisiert”. Wenn ich ein YouTube Video über meine Boxen schaue, dann geht das Signal vorher durch einen D/A Wandler. 

# Die Geschichte der Eingabegeräte

## Ein Lochkartenlesegerät

![Untitled](articlecontents/Artikel25/Lochkarten.png)

Ich habe gerade ein [YouTube Video](https://www.youtube.com/watch?v=WR2HXQO2RWg) gefunden, wo ein Lochkartenlesegerät aus LEGO gebaut wurde.

Links sieht man eine Karte, die verschiedene weiße und schwarze Kästchen hat. Diese Kombination ergibt die Nachricht, die auf dem Bildschirm zu lesen ist. 

## Lichtgriffel

![Untitled](articlecontents/Artikel25/Lightpen.png)

[Ivan Sutherland demonstriert im Jahre 1963 das Sketchpad.](https://en.wikipedia.org/w/index.php?curid=8641142)

Was hier passiert ist folgendes:

Der Lightpen hat einen Fototransistor der Licht an einen Bildschirm sendet. Dieser enthält einen Computer der diese Signale konvertiert und in “Striche” umwandelt. Letzten Endes war dies der Vorgänger des Touchscreens. Der Touchscreen ist zwar noch sehr weit weg, da nicht direkt die Berührung und die Position des Fingers verwertet wird, sondern Licht und dessen Geschwindigkeit, aber das war ein ziemlich großer Fortschritt.

## Maus

![Untitled](articlecontents/Artikel25/Maus.png)

(Douglas Engelbart | Der erste Prototyp einer Maus)

Die Maus ist das wohl gängigste Medium an einem PC aktuell. Wichtig ist auch, dass man darüber nachdenkt, dass die UI von Betriebssystemen und Software darauf ausgelegt ist, von einer Maus, oder mindestens einer Tastatur gesteuert werden. Heute selbstverständlich aber folgendes Zitat von Douglas Engelbart war revolutionierend zu seiner Zeit, einfach da dieses Zitat zwar simpel ist, aber ein großes Problem zu dieser Zeit angesprochen hat:

***“When you were interacting considerable with the screen, you needed some sort of device to
select objects on the screen, to tell the computer that you wanted to do something with them.”***

1983 brachte Microsoft dann die erste Maus auf den Markt.

## Trackballs

![Untitled](articlecontents/Artikel25/Trackball.png)

Auch nicht unbekannt ist der Trackball. Ein Ball in einer Fassung, der sich in alle Richtungen bewegen lässt. Auch gut geeignet um einen Maus Cursor bewegen zu können.

## Touchpad

Machen wir an dieser Stelle einen kleinen Sprung und sprechen über Touchpads. Gerade bei Notebooks ist immer eins integriert. 

# Tangibles

![Untitled](articlecontents/Artikel25/Tisch.png)

Das hier ist ein Tisch. Mit dem Twist, dass Analoge Objekte vom Tisch erkannt werden.

![Untitled](articlecontents/Artikel25/Skylanders.png)

Kennt Sie noch **“Skylanders”**? Das wahrscheinlich bekannteste Beispiel für Tangibles.

Ein Videospiel welches mit einem Portal geliefert wird und Figuren scannt, die der Spieler dann im Spiel spielen kann. Activision Blizzard hat da kurzzeitig verdammt viel Geld mit verdienen können, weil jeder Spieler die neusten Figuren spielen wollte und Sammlerwert spielt da auch nochmal eine Rolle. Ich konnte meine erste Generation an Skylanders (40 Figuren) für 500€ verkaufen.

Heute ist das Branding fast vollkommen von der Bildfläche verschwunden. 

## Motion Capture

![Untitled](articlecontents/Artikel25/Motion.png)

Viele Menschen sagen, dass sie es wichtig finden kein Gerät mehr in der Hand zu haben, sondern möglichst nah am Körper zu sein, dafür gibt es mittlerweile Anzüge, die Bewegungen digitalisieren. 

An all jene, die God of War Ragnarök gespielt haben: 

![Untitled](articlecontents/Artikel25/Gow.png)

Hier ist ein [Making Of Video](https://youtu.be/g90-Srl541I), wie die Szenen des Spiels entstehen. Mittlerweile werden Schauspieler engagiert um Rollen in Videospielen zu übernehmen. Es ist unglaublich interessant. 

# Ergänzung: Chips unter der Haut

Ich habe letztes Jahr einen Vortrag auf der WestVisions (eine Messe, die Informatik Trends präsentiert) gesehen, wo ein Herr hingegangen ist und Implantate vorgestellt hat, die man sich unter die Haut setzen lassen kann, um so ihre Haustüre aufschließen, Per EC bezahlen oder Nachrichten erhalten kann.

# Virtual Reality

Aktuell versucht man ebenfalls Menschen nah in die digitale Welt heranzuführen. 

Dies über Brillen und Controller. Hier wird über einen leistungsstarken PC das Bild an ein VR Headset gestreamt. Die Bewegungen werden dreidimensionale Vektoren im verwaltet und es passiert einiges an Mathematik im Hintergrund.

Dies lässt sich sogar soweit erweitert, dass ganze Bewegungen verwertet werden können:

![Untitled](articlecontents/Artikel25/Lauf.png)

---

# Schlusswort

Ich muss ehrlich zugeben: Vor dem Schreiben des Artikels habe ich noch mit einem Controller Monster Hunter Generations Ultimate auf der Nintendo Switch gespielt (ein Spiel, welches eine sehr komplexe Steuerung hat) und sich gerade danach mit dem Thema Input Geräte und deren Historie zu beschäftigen war eine Bereicherung für mich.