---
title: Unterschied zwischen Python und PyGame
des: In diesem Artikel soll näher erläutert werden wo genau der Unterschied zwischen Python und PyGame liegt.
date: 2023-10-17
imagepath: articlesheads/Artikel03.jpeg
id: Hausaufgabe
topic: Hausaufgabe 01
---

# Einleitung

In diesem ersten Artikel, der im Rahmen der Hausaufgabe für die Programmierer entsteht, möchte ich die Unterschiede zwischen Python und PyGame näher erläutern, um ein allgemeineres Verständnis liefern zu können. Ich gebe im Folgenden 5 segnifikante Unterschiede mit auf den Weg.

## 01. Library oder Programmiersprache?

Der erste Punkt ist zwar trivial, aber sehr wichtig.
Python ist eine Programmiersprache, während PyGame eine Library für die Entwicklung von Spielen ohne Framework für Python ist.

## 02. Der Anwendungsbereich

Der Punkt geht ein Stück weit mit dem vorherigen einher. Da Python eine Programmiersprache ist, verfügt diese über eine Vielfalt von Anwendungsbereichen. Gerade Python ist besonders vielseitig. Mit Python können unter anderem die Anwendungsbereiche:

- KI Modellierung
- Rechenoperationen
- Webserver
- Front-End Webentwicklung

angegangen werden.

PyGame ist eine Library die extra für einen bestimmten Anwendungsbereich erstellt wurde:
Das Entwickeln von 2D Spielen ohne dabei Gebrauch von einer Game-Engine wie Unity, Unreal oder Gadoot machen zu müssen.

## 03. Aufwand

Python glänzt damit komplexe Programme, mit möglichst wenig Code zu schreiben. PyGame wandert hier in die ganz andere Richtung. PyGame verfügt über interne Libraries, die das Entwickeln von Spielen leichter machen, jedoch sind diese durchaus ressourcenfressend. Daher geht der Trend hier eher in die Richtung sich die einzelnen Funktionalitäten selbst auszutüfteln, was häufig zu sehr viel Code aber **viel mehr Freiraum** führt.

## 04. SDL

PyGame basiert auf SDL (Simple DirectMediaStructure). Einfach formuliert ist dies ein C++ Tool, um Grafikoberflächen zu erstellen. Das bedeutet auch, dass PyGame Code immer erst zu C++ kompiliert werden muss, was dazu führt, dass PyGame **eigentlich** sehr langsam ist was das Thema Laufzeit betrifft. Da Spiele aber nun in jedem Fall ein FPS Limit bekommen, ist dies mehr oder weniger _"egal"_, da 60 FPS für einen Computer sehr langsam ist.

Python ist in der Regel zwar in der Lage eine Benutzeroberfläche zu erstellen, aber eigentlich liegt die Qualität in der Berechnung von komplexeren Datenmengen.

**Anmerkung:**
Es ist _"egal"_ solange man immernoch darauf achtet, ordentlichen Code zu schreiben. Das ist aber eigentlich in jeder Programmiersprache der Fall.

## 05. Syntaxbindung

Ein Pythonprogramm ist nicht an eine gewisse Syntax gebunden.

PyGame braucht einen Initialisierungsbereich und eine Game-Loop.

**Anmerkung:** Dies ist auch bei Processing und "unter der Haube" bei Unity (C#) der Fall.

**Bonusanmerkung:** Für diesen Artikel tatsächlich komplett unwichtig, aber ich finds super interessant,
dass Gadoot eine eigenen Programmiersprache für die Engine ins Leben gerufen hat. Die übrigens ebenfalls auf Python
aufbaut.

---

# Schlusswort

Dieser erste kurze Beitrag sollte einen kleinen Grundbaustein legen, um in den kommenden Artikeln mit der tatsächlichen Arbeit an einem PyGame Projekt zu starten.
