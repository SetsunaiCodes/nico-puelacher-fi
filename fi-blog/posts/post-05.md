---
title: Movement-Script
des: In diesem Artikel wird thematisiert, wie man einen Player auf einem Screen anzeigen und mit den Pfeiltasten bewegen kann.
date: 2023-10-28
imagepath: articlesheads/WASDWallpaper.png
id: Hausaufgabe
topic: Hausaufgabe 03
---

# Einleitung

Ich möchte im Folgenden auf den Ergebnissen des Artikels “Hausaufgabe 02: Animation” aufbauen und dort weitermachen, wo ich aufgehört habe, um die gegebene Hausaufgabe umzusetzen. Hier gilt wieder: Viele Wege führen nach Rom. Das bedeutet, dass mein Weg nicht der perfekte Weg ist, besonders weil ich im Folgenden erstmal nur die Aufgabe erfüllen werde und keine Vorbereitung leiste, für den Fall, dass wir diese Aufgabe weiter verfeinern sollen. Sollten wir diese Anwendungen weiter ausbauen müssen, dann werde ich entsprechende Änderungen in einem weiteren Artikel vorführen und hier dokumentieren. 

Jetzt wo dies gesagt ist, kann ich kurz aufzeigen, wie der “Schlachtplan” für diesen Artikel aussehen wird:

- Movement Script schreiben
- Animationen mit Movement Script verbinden, damit unser Läufer sich bewegen kann

Legen wir also direkt los!

---

# Movement-Script

Bevor ich mit dem programmieren begann, stellte ich mir die Frage, was der Player eigentlich können muss?

- Nach oben laufen
- Nach unten laufen
- Nach rechts laufen
- Nach links laufen

In der Realität ist ein Player um einiges komplexer. In der Realität geht es bei einem Player ebenfalls um Themen wie:

- Collisions
- Gravitation (Velocity)

und je nach Spiel auch 

- Angriffe
- Schüsse
- Schaden
- Lebensanzeigen

Ich bin jedenfalls sehr gespannt wohin die Reise in dieser Hausaufgabenreihe noch geht und ich hätte richtig Lust nebenbei noch einen kleinen Plattformer zu bauen. Nichts wildes, aber Mario, oder Bomber Man.

## Player Klasse

Für den Moment fange ich aber erstmal an eine Klasse zu schreiben, mit der wir einen Spieler bewegen können. Diese Klasse braucht sich selbst und die jeweilige X und Y Koordinate des Spielers. 

Wenn man sich Movement im Kontext Computer oder Mathe vorstellt , dann ist bewegen nichts anderes als:

oben = ich bewege mich um X viele Einheiten auf der y Achse nach oben (positiver)

unten = ich bewege mich um X viele Einheiten auf der y Achse nach unten (negativer)

rechts = ich bewege mich um X viele Einheiten auf der x Achse nach rechts (positiver)

links = ich bewege mich um X viele Einheiten auf der x Achse nach links (negativer)

Ich denke man versteht meinen Punkt und genauso ist es in der Entwicklung hier auch. Ich lege einen Wert fest, der umschreibt um wie viele Einheiten sich bewegt werden soll, wenn der Button ein Mal gedrückt wird. 

Hierfür habe ich 4 verschiedene Funktionen geschrieben, die im Endeffekt genau das tun, was ich gerade umschrieben habe.

```python
class Player:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.speed = 5

    def move_up(self):
        self.y -= self.speed

    def move_down(self):
        self.y += self.speed

    def move_left(self):
        self.x -= self.speed

    def move_right(self):
        self.x += self.speed
```

## Änderungen an der Game Klasse

Eine Klasse ist nichts wert, wenn man sie nicht einbaut! Daher werden wir der bereits bestehenden Game Klasse einen Player initialisieren:

```python
class Game:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Hausaufgabe Movement')
        window_height = 640
        window_width = 480
        self.screen = pygame.display.set_mode((window_height, window_width))
        self.clock = pygame.time.Clock() 

        self.assets = {
            'player/idle': Animation(load_images('entities/player/idle'), img_dur=6),
            'player/walking': Animation(load_images('entities/player/walking'), img_dur=4),
            'player/running': Animation(load_images('entities/player/running'), img_dur=5),
        }

        self.player = Player(window_width // 2, window_height //2)
```

Hier werden die Startkoordinaten des Players mit übergeben. Ich möchte, dass der Player in der Mitte erscheint, wenn ich das Spiel starte, daher teile ich sowohl die Höhe, wie auch die Breite durch 2, damit der Player in der Mitte spawnt. 

## Änderungen an der Game Loop

Theoretisch hat das Programm jetzt alles, was es braucht um einen Spieler erscheinen und sich bewegen zu lassen… alles außer Inputs. daher weise ich jetzt noch Inputs zu, damit das Programm weiß, wenn sich der Player bewegt und wenn nicht. 

Dies wird immer über den Event-Handler geregelt. Jeder Input wird dort thematisiert.

```python
def run(self):
        while True:
            self.screen.fill((0,0,0))

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()

            keys = pygame.key.get_pressed()
            if keys[pygame.K_UP]:
                self.player.move_up()
            if keys[pygame.K_DOWN]:
                self.player.move_down()
            if keys[pygame.K_LEFT]:
                self.player.move_left()
            if keys[pygame.K_RIGHT]:
                self.player.move_right()

            pygame.display.update()
            self.clock.tick(60)
```

# Der erste Test

Damit wir jetzt gleich was sehen erstelle ich ein blaues Quadrat um zu testen, ob der bisherige Code funktioniert:

```python

	   def run(self):
        while True:
            self.screen.fill((0,0,0))

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()

            keys = pygame.key.get_pressed()
            if keys[pygame.K_UP]:
                self.player.move_up()
            if keys[pygame.K_DOWN]:
                self.player.move_down()
            if keys[pygame.K_LEFT]:
                self.player.move_left()
            if keys[pygame.K_RIGHT]:
                self.player.move_right()

            
            pygame.draw.rect(self.screen, (0, 0, 255), (self.player.x, self.player.y, 20, 20))

            pygame.display.update()
            self.clock.tick(60)

Game().run()
```

Und tatsächlich! Wenn ich das Programm starte, dann sehen wir ein blaues Quadrat, was sich mit den Pfeiltasten steuern lässt!

![Test1](/articlecontents/Test01.png)

# Die Animation

Was jetzt also noch passieren muss ist, dass der Player die Animationen verwaltet, je nachdem, ob er gerade steht, oder läuft.

## Änderungen an der Player Klasse

An dieser Stelle sollte man sich fragen, was alles schief gehen könnte, beim Thema Animationen.

Auf Anhieb komme ich auf 2 Kernthemen:

- Die Animationen gehen nur in eine Richtung und prinzipiell bin ich Freund davon nicht nach hinten zu sehen und immer nach vorne zu laufen, aber die Möglichkeit sich umdrehen zu können, wäre doch ganz schön.
- Wie sorge ich dafür, dass die Animation flüssig nacheinander durchläuft?
- Wie erkennt mein Spieler ob ich mich gerade bewege, oder nicht?

Um all diese Problematiken anzugehen traf ich einige Vorkehrungen. Im Init-Bereich meiner Player Klasse legte ich folgendes fest:

```python
class Player:
    def __init__(self, x, y, width, height, assets):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.speed = 5
        self.assets = assets
        self.current_animation = self.assets['player/idle']
        self.is_flipped = False
```

Die Richtung soll mit self.is_flipped abgefragt werden. Dann brauche ich eine aktuelle Animation, die abgespielt werden soll. Standardmäßig (wenn nichts gedrückt wird, dann bewegt sich der Spieler nicht, also idlet er. Dann brauche ich alle Assets, damit ich diese verwalten kann.

Das hier ist der gesamte Code für die Player Klasse:

```python
class Player:
    def __init__(self, x, y, width, height, assets):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.speed = 5
        self.assets = assets
        self.current_animation = self.assets['player/idle']
        self.is_flipped = False

    def move_up(self):
        self.y -= self.speed
        self.current_animation = self.assets['player/walking']
        self.is_flipped = False

    def move_down(self):
        self.y += self.speed
        self.current_animation = self.assets['player/walking']
        self.is_flipped = False

    def move_left(self):
        self.x -= self.speed
        self.current_animation = self.assets['player/walking']
        self.is_flipped = False

    def move_right(self):
        self.x += self.speed
        self.current_animation = self.assets['player/walking']
        self.is_flipped = True

    def rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)

    def update(self):
        self.current_animation.update()

    def render(self, surf):
        sprite = self.current_animation.img()
        if self.is_flipped:
            sprite = pygame.transform.flip(sprite, True, False)
        surf.blit(sprite, (self.x, self.y))
```

Gehen wir die einzelnen Methoden doch mal durch. 

Rect zeichnet ein neues Eck auf dem “Spielfeld”. Update aktualisiert die die aktuelle Animation je nachdem welche Aktion gerade getätigt wird. 

Die einzelnen Move Funktionen haben sich auch ein bisschen verändert. Je nachdem wohin ich gehe muss eine Animation getriggert werden.

Wenn ich nach rechts gehe, dann wird in der Render Methode die PyGame interne Funktion für das flippen von Sprites verwendet.

## Änderungen an der Game Klasse

Eigentlich muss ich hier nur die Attribute erweitern, die der Player benötigt. Darunter Höhe und Breite, sowie die Animationen, die in den assets gespeichert werden.

```python
class Game:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Hausaufgabe Movement')
        window_width = 640
        window_height = 480
        self.screen = pygame.display.set_mode((window_width, window_height))
        self.clock = pygame.time.Clock()

        self.assets = {
            'player/idle': Animation(load_images('entities/player/idle'), img_dur=6),
            'player/walking': Animation(load_images('entities/player/walking'), img_dur=4),
            'player/running': Animation(load_images('entities/player/running'), img_dur=5),
        }

        self.player = Player(window_width // 2, window_height // 2, 20, 20, self.assets)

```

## Änderungen in der Game Loop

In der Game Loop muss ich nur festlegen, dass die Idle Animation abgespielt wird, wenn ich nichts drücke und sowohl die render, wie auch die update Methode aufrufen.

**Anmerkung:**

Die Game Loop wird 60 Mal die Sekunde ausgeführt, dass heißt es wird nicht nur 1 Mal geupdatet und dann gerendert sondern 60 Mal die Sekunde und genau deswegen funktioniert das auch. 

# Der finale Test

Schauen wir doch mal, ob das alles klappt:

![Test2](/articlecontents/Test02.png)

Das klappt! Und das laufen geht auch korrekt! Super, dann läuft ja alles!

----

# Schlusswort

Ich habe es bereits erwähnt, wenn wir dieses Programm erweitern sollen, dann werde ich die Player Klasse in eine weitere Datei auslagern, um dann weiter damit zu arbeiten. Für den Moment soll es das aber gewesen sein. Ich freue mich bereits auf die nächste Aufgabe!

## Gesamter Code