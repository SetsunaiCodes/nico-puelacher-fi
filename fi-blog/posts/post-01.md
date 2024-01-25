---
title: Python vs. Processing
des: Ziel diesen Artikels ist es die grundsätzliche Anmerkungen zu thematisieren und bereits ein laufendes Spielfenster zu erhalten.
date: 2023-10-16
imagepath: articlesheads/Artikel01.jpeg
id: Exkurse
topic: "01"
emote: 🐍
---

# Einleitung

In diesem ersten Artikel zum Thema _'Exkurse'_ möchte ich darauf eingehen, warum ich mich bei der Wahl der Programmier-Library für PyGame (Python) entschieden habe und nicht für Processing. Dies geschieht, indem ich folgende Gesichtspunkte die mir wichig waren miteinander vergleiche:

- Persönliche Präferenz und gesammelte Erfahrung
- Community bei Fragen und Baustellen
- Flexibilität
- Plattformübergreifende Kompilierung

**Anmerkung:**
Ich hätte mich wahrscheinlich in jedem Fall für PyGame entschieden, dennoch möchte ich mit diesem Artikel möglichst fair argumentieren, warum ich mich so entscheide und nun im folgenden Pro-Argumente liefern.

## 01. Persönliche Präferenz und Erfahrung

Der definitiv subjektivste Punkt auf dieser Liste. Es ist einfach so, dass ich in der Vergangenheit bereits diverse Platformer Games (Jump'N'Runs oder storybasierte walking simulator) in PyGame entwickelt habe und damit ein kleines "Erfahrungs-Skillset" erlangen konnte. Im ersten Semester thematisierten wir die Grundlagen von Processing und mussten auch damit arbeiten (Tabellen und Diagramme erstellen und rendern), jedoch gefiel mir diese Arbeit überhaupt nicht. Sie machte mir grundsätzlich einfach keinen Spaß, da ich Processing als "anstrengend" und "einschränkend" aufgefasst habe, was **nicht** bedeutet, dass man mit Processing nicht genau die gleichen Resultate erreichen könnte wie mit PyGame, versteht sich.

## 02. Community und Fragen bei Baustellen

PyGame hat eine ähnlich große Community, wie Processing auch. Der springende Punkt hier ist einfach, dass die primäre Processing Community eher darauf aus ist, künstlerische Projekte und nicht direkt Videospielentwicklung umzusetzen. Des Weiteren kenne ich persönlich diverse Libraries, die das Arbeiten mit PyGame weiter vereinfachen, über die es großartige Dokumentationen gibt.

## 03. Flexibilität

Obwohl PyGame ohne Engine daherkommt, ist es unfassbar schön eine "eigene Engine" aufsetzen zu können.
Diese Erkenntnis erhielt ich spätestens, als ich anfing meine eigenen Leveleditoren mit PyGame zu programmieren, die direkten Einfluss auf In- und Export meiner Maps gehabt haben.

Über Processing ist mir eine solche Mechanik nicht bekannt (was nicht bedeutet, dass sie nicht existiert). Generell wirkt Processing ein bisschen "einfacher gestrickt" als PyGame, was bei kleineren Games mit Sicherheit auch seine Vorteile bieten kann.

## 04. Plattformübergreifende Kompilierung

PyGame baut auf Python auf. Das bedeutet, dass es immer einen Weg gibt, die Spiele auf jedem gängigen Betriebssystem ausführen zu können. Klar muss man sich manchmal besondere Gedanken machen (gerade beim Stichwort _"Linux"_), aber dafür hat Python sehr gute Lösungen gefunden.

## Bonus: Syntax

Wer liebt es nicht? Python kommt mit weniger Klammern aus und glänzt mit schön eingereihtem Code! :)))))))

---

# Schlusswort

Diese 5 Argumente sprechen für die Entwicklung mit PyGame. Ich möchte abermals hervorheben, dass es mindestens genauso viele Argumente gibt mit Processing zu arbeiten, dennoch überwiegt für mich der große Vorteil bei PyGame. Primär wegen bereits gesammelter Erfahrungen.
