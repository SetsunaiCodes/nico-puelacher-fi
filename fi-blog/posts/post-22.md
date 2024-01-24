---
title: Designs.
des: In diesem Artikel erstelle ich alle relevanten Designs (Attract-Mode, 5 erste Level, Game-Over Screen, Icons)
date: 2024-01-24
imagepath: articlesheads/Artikel22.jpeg
id: DevLog
topic: "13"
emote: 🎨
---
# Einleitung

Dies hier wird der letzte große Artikel dieses Projekts werden. Vielleicht ist dieser Artikel sogar der wichtigste des gesamten Blogs. Denn heute werde ich darüber entscheiden, wie das Spiel final aussehen wird und näher bringen, was genau dafür nötig ist.

# -Akt I: Grafiken

## Kapitel 1: Tilesets von [Itch.io](http://Itch.io)

Unser Designer fällt aus gegebenem Anlass weiterhin aus. Das bedeutet auch, dass wir eine alternative brauchen, um Designs in das Spiel einbringen zu können. Eigentlich bin ich ein großer Freund davon Designs, die ich für Spiele Projekte benötige selbst zu erstellen. In Anbetracht der noch verbleibenden Zeit ist dies unmöglich, was auch bedeutet, dass wir eine Alternative brauchen. Genau dafür kann man die Arbeit anderer Designer verwenden, die ihre Arbeit auf Seiten, wie [Itch.io](http://Itch.io) zur (nicht immer) freien Verfügung gestellt haben (die müssen ja auch von irgendwas leben). Nun stellt sich die Frage, welche Tileset verwendet werden sollen. Ich führe hier mal die Beispiele auf, die ich verwenden werde:

[Zelda like futuristic - tileset pack by Deakcor (itch.io)](https://deakcor.itch.io/zelda-like-futuristic-tileset)

Dieses Tileset hat es mir sehr angetan. Ich find alles daran richtig gut gelungen und sehr schön.

### Alles eine Frage der Perspektive… leider.

Unser Spiel ist zu 100% Top-Down. Das bedeutet, dass wir von ganz oben herunter auf das Geschehen blicken. Die meisten Tilesets in Spielen sind nicht so aufgebaut. Top Down aus der Vogelperspektive im Kontext Videospiele bedeutet eigentlich, dass die Kamera “angeschrägt” nach unten auf das Spiel blickt. Dieser Winkel macht es möglich mehr Details und mehr Tiefe anzeigen zu können. Dies würde ich auch gerne in das Spiel integrieren. Das würde allerdings bedeuten, dass alle Assets, die jetzt gerade im Spiel sind unbrauchbar wären. Das möchte ich natürlich vermeiden und ist auch nicht das Ziel dieses Projekts. Das erschwert es nur Grafiken zu finden, die wir direkt einarbeiten können. In unserem Fall spricht man von 2D-Top Down

**—10 Minuten später, nach der Suche weiterer Tilesets**

Ich muss mich korrigieren. Das oben gelistete Pack ist das einzige Assetpack auf Itch, welches sich an der 2D Top-Down Ansicht orientiert. Das ist schlecht. Sehr schlecht sogar. Kein Weltuntergang, aber doof. Mitten im Spiel die Ansicht zu wechseln wäre auch komisch, aber vielleicht wird dies nötig sein, ich schaue mal weiter.

**—Weitere 10 Minuten später.**

Spätestens beim Thema Dekorationen würde das Perspektivenproblem dann ohnehin auffallen. Mal schauen, wie schlimm es wird.

[Tech Dungeon: Roguelite - Asset Pack by Pupkin (itch.io)](https://trevor-pupkin.itch.io/tech-dungeon-roguelite) 

Dieses Assetpack finde ich auch sehr schön.

[Free-Space Station-Game asset by Jonik9i (itch.io)](https://jonik9i.itch.io/free-space-station-game-asset)

Ich habe hier noch ein Assetpack gefunden, dass sich vielleicht verwenden lässt.

## Kapitel 2: Dekorationen / Atmosphäre

Hier möchte ich das erste Mal einen kleinen Theorieschub kombiniert mit persönlichen Erfahrungen einbringen. Ich für meinen Teil entwickle Videospiele um eine Geschichte zu erzählen und den Spieler in eine Welt zu entführen, die besonders Authentisch und schön gestaltet ist, gepaart mit einer Story, die den Spieler zum nachdenken bringen und bewegen soll. Warum? Weil das auch genau die Spiele sind, die ich am liebsten spiele. Und selbst aus einem Tower Defense Spiel kann man eine Menge Atmosphäre rausholen. In diesem Fall über authentische Umgebungen, die nicht nur aus Böden bestehen. Sei es über Computer in der Umgebung, oder kaputte Plasmazellen, die herumliegen, Lichter und Bilder über Ereignisse sind auch immer gut. 

Hier muss ich mich dann auf die Dekoration, die im entsprechenden Assetpack enthalten ist beschränken und kann diese dann entsprechend einbauen, da sich die herausgesuchten Assetpacks grundliegend unterscheiden.

## Kapitel 3: Die Entscheidung

[Zelda like futuristic - tileset pack by Deakcor (itch.io)](https://deakcor.itch.io/zelda-like-futuristic-tileset)

Ich habe mich dafür entschieden dieses Assetpack zu verwenden. Für das gesamte Spiel. Die Türme und die Gegner werde ich in das finale Spiel übernehmen, zumindest solange keine Vollkatastrophe passiert und sich ein schwarzes Loch vor meinem Bildschirm öffnet. Die 5€ für das Tileset kann ich auch gut verschmerzen, wenn das bedeutet, dass das Spiel am Ende richtig schick wird.

Des Weiteren enthält das Tileset Tiles mit der Größe von 32x32 Pixeln, was perfekt auf die Maße des Spiels passen würde. Daher werden wir dieses Tileset verwenden.

Die Rechte des Tilesets verbieten, dass man das Tileset ohne Arbeitsprozess teilt, der werde ich das Grundtileset hier nicht teilen, dafür aber die fertigen Level.

# -Akt II: Level

Der zweite Punkt dieses **genialen Epos** hier beschäftigt sich mit dem gestalten von Leveln. Jetzt, wo wir ein Tileset haben, dass wir für das Spiel verwenden können.

## Kapitel 1: Leveldesign in Videospielen

Leveldesign hat nicht nur etwas mit schönen Umgebungen zutun, sondern auch damit den Spieler vor Herausforderungen zu stellen. Im Falle eines Tower Defense Spiels, sollte das Spiel progressiv schwerer werden. Das bedeutet: Die Strecken werden entweder kürzer, oder die Gegner stärker und schneller. 

## Kapitel 2: Der Genuss.

Wie bereits diverse Male erwähnt möchte ich, dass das Spiel am Ende der Entwicklung auf 15 verschiedene Level kommt. Das bedeutet auch, dass ich insgesamt 30 Bilder und 15 JSON Dateien exportieren darf und diese schlussendlich ins Spiel laden darf. Das ist wie schick Essen gehen…
Also damit meine ich: Deine Frau isst und du bezahlst die Rechnung… 

**—Anmerkung 5 Level später**

Die ersten 5 Level haben nun über eine Stunde Zeit benötigt, weil ich unglaublich perfektionistisch beim Gestalten dieser bin. ich werde die restlichen 10 Level immer mal wieder Nachreichen, bis zur Prüfung. Vom Grundprinzip ist es ohnehin immer das Selbe, daher reicht es, wenn ich für den Moment 5 Level gestalten werde, ich möchte heute auf jeden Fall noch durch die anderen Punkte auf meiner Liste kommen, daher stelle ich dies nun erstmal hinten an.

## Kapitel 3: Die Galerie der Level

Hier zeige ich die ersten 5 Level, die ich für die erste Welt im Spiel vorgesehen habe:

### Level 1

![map_1.png](/articlecontents/Artikel22/map_1.png)

### Level 2

![map_2.png](/articlecontents/Artikel22/map_2.png)

### Level 3

![map_3.png](/articlecontents/Artikel22/map_3.png)

### Level 4

![map_4.png](/articlecontents/Artikel22/map_4.png)

### Level 5
![map_5.png](/articlecontents/Artikel22/map_5.png)

# -Akt III - Game Over Screen

## Kapitel 01: Generieren eines Hintergrundes

In Akt III dieses legendengleichen Artikel kümmere ich mich um den letzten großen “Schandfleck” des Spiels, den Game-Over Bildschirm. Ich möchte ein Bild eines zerstörten Raumschiffes dunkel im Hintergrund anzeigen und dann eine Pixel-Art Schriftart verwenden, um die Statistiken anzuzeigen.

Für das Bild habe ich den Microsoft Image Creator in Erwägung gezogen und folgenden Prompt formuliert:

***“Ein zerstörtes blaues Raumschiff im Weltall. Pixel Art Style”***

Das hier war das beste Ergebnis:

![ZerstörtesRaumschiff.jpeg](/articlecontents/Artikel22/ZerstrtesRaumschiff.jpeg)

Das finde ich ehrlich gesagt richtig gut. Ich bin immer wieder davon begeistert, was KI alles kann. Alles was ich noch tun muss, ist das Bild ein bisschen dunkler zu machen und in das Spiel einzuarbeiten. 

### Dunkler machen

Um  das Bild dunkler zu kriegen könnte ich Rechenleistung verschwenden und dies über PyGame machen, oder ich öffne das Bildbearbeitungsprogramm meiner Wahl und mache es selbst:

![ZerstörtesRaumschiff.jpeg](/articlecontents/Artikel22/ZerstrtesRaumschiff.jpeg)

Dieses Bild wirkt alleine zu dunkel, was auch bedeutet, dass es perfekt ist, um als Hintergrundgrafik zu dienen.

## Kapitel 2: Einarbeitungsphase

Dafür füge ich das Image wie gewohnt ein und ändere die Funktion, die den Game-Over Screen generiert ein bisschen ab.

```python
#Init Bereich maingame.py
game_over_image = pygame.image.load("assets/images/ZerstörtesRaumschiff.jpeg")
#Das Bild ist so zu groß, muss also auf die Bildschirmgröße gemappt werden.
game_over_image = pygame.transform.scale(
    game_over_image, (c.SCREEN_HEIGHT, c.SCREEN_WIDTH)
)

#In der Game-Loop
if game_over == False:
		(...)
    # Ergenenzung, wennn der Spieler verliert:
    else:
				#Game Over Image
        screen.blit(game_over_image, (0, 0))
```

Damit wird das Bild angezeigt, wenn der Spieler das Spiel verliert. Jetzt brauchen wir eine ansprechende Schriftart.

## Kapitel 3: Das Fonting

Schriftarten spielen eine unfassbar wichtige Rolle, besonders bei “Bewegmedien” und Websites. Sie entscheidet über die Stimmung der Seite und ob die Seite in sich schlüssig aussieht, oder nicht.

PyGame verfügt über eine interne Pixel-Art Schrift, das bedeutet, dass wir in diesem Fall keine eigene importieren müssen.

```python
text_font = pygame.font.SysFont("upheavalttbrk", 35)
large_font = pygame.font.SysFont("upheavalttbrk", 40)

# function for outputting text
def draw_text(text, font, text_col, x, y):
    img = font.render(text, True, text_col)
    screen.blit(img, (x, y))
```

Hier ist ein sogenanntes Fonting-Frame. Eine Tabelle, die alle Buchstaben einmal einzeln zeigt:

![Fonting](/articlecontents/Artikel22/Fonting.png)

Jetzt kann der User einen Game-Over Screen sehen, kriegt aber noch kein Feedback, was er jetzt tun soll, um das Spiel neu zu starten, nämlich R drücken.

Fügen wir also eine sogenannte “CTA” (Call to Action) ein, damit der Nutzer weiß, wie es weitergeht.

```python
draw_text("Press R to restart", text_font, "white", 65, 220)
```

Damit kommen wir auf dieses nicht perfekte Endergebnis, aber wir haben jetzt einen Game-Over Screen.

![Test 1](/articlecontents/Artikel22/Test1.png)

# -Akt IV - Attract Mode

## Kapitel 1: Die Planung

Akt IV kümmert sich um den Attract Mode, der letzten Endes der ausschlaggebende Punkt sein wird, warum potentielle Spieler aufmerksam auf unser Projekt werden. Der Attract Mode, den ich mir vorstelle besteht aus 4 Elementen.

- Einem Hintergrund
- Einem fliegenden Raumschiff
- Dem Logo des Spiels
- Einer Call to Action (”Press G key to start”).

Ich schlage vor, dass ich die einzelnen Elemente zusammensuche und gestalte und dann zusammenführen werde.

## Kapitel 2: Der Hintergrund

Auch hier würde ich auf die Power von KI setzen und aus zeitlichen Gründen den Image Creator darum bitten folgende Grafik zu generieren:

***“Eine Weltraum Umgebung, in der futuristische Raumschiffe fliegen und blauen und orangenen Lichtakzente hat. Pixel Art Style”***

![StarGuardBackGroundImage.jpeg](/articlecontents/Artikel22/StarGuardBackGroundImage.jpeg)

## Kapitel 2: Das Logo

Mega. Jetzt muss ich tatsächlich auch nochmal was tun, denn ich muss unser Logo “pixeln”. Oder mit anderen Worten: Unser Logo ist A nicht transparent und B nicht im Pixel-Art Style gehalten. Das würde ich ungern einer KI überlassen, außerdem sollte ich hier auch noch etwas übernehmen.

Dafür öffne ich das Bildbearbeitungsprogramm meiner Wahl, schneide das Logo aus, exportiere es als Image und skaliere das Bild runter auf 200x200 Pixel. 

## Kapitel 3: Das Einarbeiten

Alles andere kann ich im Code lösen. Wir haben aber ein ganz anderes Problem aktuell, da wir nach aktuellem Stand überhaupt keine Funktion für einen Attract Mode haben. Das ändere ich aber nun.

Dies lösen wir über einen Boolean in der Game-Loop.

```python
#Variable im Init Bereich
attract_mode = False

#Nötige Bilder einladen
#attract Mode
attract_mode_bg = pygame.image.load("assets/images/StarGuardBackGroundImage.jpeg")
attract_mode_bg = pygame.transform.scale(
    attract_mode_bg, (c.SCREEN_HEIGHT, c.SCREEN_WIDTH)
)
#Logo
attract_mode_logo = pygame.image.load("assets/LogoGepixelt.png")

#Game-Loop
# game loop
run = True
while run:
    clock.tick(c.FPS)

    if attract_mode == True:
        screen.blit(attract_mode_bg, (0,0))
        screen.blit(attract_mode_logo, (130, 100))
        draw_text("Press G to start", text_font, "grey100", 100, 350)
        
    else:
    #(..Game Code..)

pygame.quit()
```

Jetzt sieht der Attract-Mode wie folgt aus: 

![Test2](/articlecontents/Artikel22/Test2.png)

Im Rahmen der aktuell noch verfügbaren Zeit und dem Fakt, dass dies hier nicht meine primäre Aufgabe ist,  finde ich diesen Attract-Mode doch sehr schick.

# -Akt V - Ingame Visualisierungen

Der finale Akt schließt dieses Christopher Nolan ähnliche Werk ab und rundet diesen Artikel bis zur “Perfektion” ab. Wenn man sich das Spiel aktuell anschaut, dann wird zwar bereits angezeigt in welchem Level sich der Spieler befindet, wie viele Leben er noch hat und wie viele Münzen er bereits sammeln konnte, aber wirklich ersichtlich sind diese Werte am Anfang noch nicht. Und wirklich schön eingearbeitet sind diese auch nicht. Das werde ich jetzt ändern.

## Kapitel 1: Die Icons

Es gibt einen Satz im Design, der mir auch im Alltag als Webentwickler wieder und wieder über den Weg läuft.

***“Don’t tell them. Show them.”***

Diesen Satz habe ich glaube ich bereits in einem vorherigen Artikel verwendet, aber auch in diesem Kontext greift er mal wieder. Anstatt jetzt “Health:”, “Money:” in die Box zu schreiben, würde ich gerne Icons verwenden und diese in die Textbox einarbeiten. Hierfür habe ich mir diese Icons aus dem Internet gesucht. 

![Heart](/articlecontents/Artikel22/Heart.png)

![Coin](/articlecontents/Artikel22/Coin.png)

Diese beiden Bilder stammen aus einer Free-to-use Library namens Clipart. Beim Thema “Level:” würde ich vorerst schauen wollen, wie das finale Resultat aussieht und entscheide dann, ob ich den Text ersetzen werde, oder nicht. 

## Kapitel 2: Das Einarbeiten

Wie bei allem anderen auch fügen wir die Grafiken nun zu einem Gesamtprodukt zusammen. Dafür können wir die bereits existierende Passage in der Gameloop verwenden, wenn wir die Bilder in das Projekt geladen und skaliert haben. 

```python
^#Initbereich
#Heart,Coin and Textbox
heart_icon = pygame.image.load("assets/images/Heart.png")
coin_icon = pygame.image.load("assets/images/Coin.png")
text_box = pygame.image.load("assets/images/Textbox.png")

heart_icon = pygame.transform.scale(
    heart_icon, (50,50)
)
coin_icon = pygame.transform.scale(
    coin_icon, (50,50)
)

#Game-Loop

```

Damit sieht das finale Endprodukt nach aktuellem Stand also so aus:

![Test3](/articlecontents/Artikel22/Test3.png)

---

# Schlusswort

So einfach schreibt sich ein Drama in 5 Akten… ich weiß gar nicht warum man für Werke, wie “Nathan der Weise” mehrere Jahre gebraucht hat, ich hab das Drama hier ja auch innerhalb von 13 Stunden (von 23:00 bis 12:00 Uhr) verfasst…🫠

Im nächsten Artikel werde ich sogenannte Playtests durchführen. Das bedeutet, dass ich das Spiel durchspielen und mir Bugs, die mir auffallen (wie auch visuelle Unstimmigkeiten) notiere, sie beheben werde und dann werde ich das Spiel nochmal durchspielen, bis alles geht. Gibt schlimmere Aufgaben😉