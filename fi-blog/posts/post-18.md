---
title: Game Mechanics
des: Heute führen wir alles so zusammen, dass Turrets schießen, Gegner sterben können und der Spieler leben verlieren und Geld erhalten kann.
date: 2024-01-14
imagepath: articlesheads/Artikel18.jpeg
id: DevLog
topic: "09"
emote: 🤝
---

# Einleitung

In diesem Artikel werde ich alles, was ich in den vergangenen Artikeln geschrieben haben zusammenführen. Heute baue ich unter anderem das Schießen und das erste bisschen eines “Geldsystems” ein. Ziel ist es nach diesem Artikel die erste spielbare Variante des Spiels zu haben und von da aus nur noch Add - Ons hinzufügen zu müssen. Es gibt also eine Menge Arbeit, verlieren wir also keine weitere Zeit und fangen direkt an!

# Konstanten erstellen

Wir beginnen damit neue Konstanten in unserer Constants Datei zu erstellen, mit denen wir heute arbeiten wollen.

```python
#consants.py
ROWS = 15
COLS = 15
TILE_SIZE = 32
SIDE_PANEL = 300
SCREEN_WIDTH = TILE_SIZE * COLS
SCREEN_HEIGHT = TILE_SIZE * ROWS
FPS = 60
#Leben und Geld
HEALTH = 100
MONEY = 650
SPAWN_COOLDOWN = 400
TURRET_LEVELS = 3
#Kosten für ein Turret
BUY_COST = 200
ANIMATION_STEPS = 15
ANIMATION_DELAY = 150
#Schaden eines Turrets
DAMAGE = 5
```

 

# Anzeigen der Leben und des Geldes

Als erstes möchte ich, dass der Spieler sehen kann wie viele Leben er noch hat und wie viel Geld er aktuell zur freien Verfügung hat. Dafür übergeben wir die Informationen zu Health und zu Money an die World Datei und arbeiten darauf hin in der Maingame Datei eine Möglichkeit aus diese Informationen anzuzeigen.

```python
#world.py
class World():
    def __init__(self, data, map_image):
        self.level = 1
        self.health = c.HEALTH
        self.money = c.MONEY
        self.tile_map = []
        self.waypoints = []
        self.moveofJSON = 0
        self.level_data = data
        self.image = map_image
        self.enemy_list = []
        self.spawned_enemies = 0
```

Text in PyGame anzuzeigen ist ein bisschen schwieriger, als in anderen Umgebungen, wie Unity oder Processing. Ich schreibe eine Funktion, die folgende Funktionalitäten erfüllt.

- Text als String entgegen nehmen
- Schriftart entgegen nehmen
- Koordinaten des Textes entgegen nehmen
- Angegebenen Text in ein Bild umwandeln
- Bild positionieren und anzeigen

```python
#maingame.py
def draw_text(text, font, text_col, x, y):
    img = font.render(text, True, text_col)
    screen.blit(img, (x,y))
```

Text in Form von Strings lässt sich nicht in einem PyGame Projekt anzeigen, aber lässt sich zum Bild machen und mit jeder Iteration der GameLoop aktualisieren.

Rufen wir diese Funktion also in der GameLoop auf und starten das Spiel, sehen wir diese erste Test Anzeige:

![Test 1](/articlecontents/Artikel18/Test1.png)

Oben sehen wir die 100 Leben, unten sehen wir das aktuelle Geld. 

# Bezahlen von Turrets

Für Sachen zu bezahlen, die man gerne hätte macht in der Regel keinen Spaß, jedoch ist es ein wichtiger Bestandteil im Leben und  bei Spielmechaniken, da wir so lernen, wie wir unsere Ressourcen einsetzen wollen. Damit schließe ich den Erziehungsratgeber für heute und beginne die Konstanten, die wir erstellt haben in die create_turret Funktion einzuarbeiten und zwar als letzte Abfrage, bevor das Turret erstellt wird.

```python
def create_turret():
    mouse_tile_x = x // c.TILE_SIZE
    mouse_tile_y = y // c.TILE_SIZE

    mouse_tile_num = (mouse_tile_y * c.COLS) + mouse_tile_x
    
    if world.tile_map[mouse_tile_num] != 11:
        space_is_free = True
        for turret in turret_group:
            if(mouse_tile_x, mouse_tile_y) == (turret.tile_x, turret.tile_y):
                space_is_free = False
        if space_is_free == True:
            new_turret = Turret(turret_sheet, mouse_tile_x, mouse_tile_y)
            turret_group.add(new_turret)
            #Kosten für ein Turret vom Geld des Spielers abziehen.
            world.money -= c.BUY_COST
```

Wenn ich jetzt ein Turret platziere, dann wird mir der Preis vom Konto abgezogen.

![Test 2](/articlecontents/Artikel18/Test2.png)

Nachdem ich drei Turrets gekauft habe ist also schluss mit dem Kauf weiterer. 

# Turrets schießen lassen

Wir haben eigentlich bereits jeglicher Vorkehrung getroffen, um die Turrets schießen zu lassen. 

Wir modifizieren jetzt nur noch die pick_target() Funktion. 

```python
def pick_target(self,enemy_group):
        x_dist = 0
        y_dist = 0
        for enemy in enemy_group:
            if enemy.health > 0:
                x_dist = enemy.pos[0] - self.x
                y_dist = enemy.pos[1] - self.y
                dist = math.sqrt(x_dist ** 2 + y_dist ** 2)
                if dist < self.range:
                    self.target = enemy
                    self.angle = math.degrees(math.atan2(-y_dist, x_dist))
                    #damage
                    self.target.health -= c.DAMAGE
                    break
```

Jedes Mal wenn ein Turret einen Gegner getrackt hat, wird er auf ihn schießen, indem er diesem Schaden zufügt, welcher dann von der Lebensanzahl des Gegners abgezogen wird. Fällt die Lebensanzahl eines Gegners unter 0, wird dieser über die PyGame Funktion kill() aus dem Speicher und somit aus dem Spiel gelöscht.

Diese Funktionalität bauen wir in eine kleine Funktion ein und setzen sie ganz unten an die enemy.py Datei:

```python
def check_alive(self):
    if self.health <= 0:
     self.kill()
```

# Geld verdienen

Solange die Turrets ihre Füße unter meinem Tisch haben sollten sie dafür sorgen, dass regelmäßig Geld in die Kasse fließt… oder so.

Jedenfalls sollten wir dafür sorgen, dass das töten eines Gegners dazu führt, dass sich die Kriegskasse wieder füllt wir somit neue Turrets kaufen können. Hierfür erstellen wir eine neue Konstante in der entsprechenden Datei und nennen diese KILL_REWARD und setzen diesen = 1.

So kriegen wir jedes Mal eine Münze dazu, wenn wir einen Gegner töten. Nach aktuellem Stand nur in der Theorie, aber das ändern wir jetzt.

Hierfür erweitern wir die Funktion von gerade eben so, dass wir einen finanziellen Zuschuss bekommen, wenn ein Gegner gestorben ist.

```python
def check_alive(self, world):
    if self.health <= 0:
     world.money += c.KILL_REWARD
     self.kill()
```

![Test 3](/articlecontents/Artikel18/Test3.png)

Jetzt kriegen wir jedes Mal eine Münze dazu, wenn ein Turret einen Gegner tötet. Ist nicht viel, aber immerhin gehen diese jetzt endlich arbei… tragen diese jetzt zum Spielfluss bei. 

 

# Schaden erhalten, wenn ein Gegner durchkommt

Jetzt fehlt nach wie vor die Schwierigkeit, denn noch erhält der Spieler keinen Schaden, wenn ein Gegner es schafft den gesamten Weg bis zum Ende durchzulaufen. Um dies möglich zu machen gehen wir wieder in die Enemy Klasse und nehmen folgende Änderungen an der move() Funktion vor. Wir haben eigentlich auch schon einen Weg integriert, um zu überprüfen, ob ein Gegner das Ende erreicht hat oder nicht:

```python
def move(self):
    if self.target_waypoint < len(self.waypoints):
      self.target = Vector2(self.waypoints[self.target_waypoint])
      self.movement = self.target - self.pos
    else:
      #Gegner hat das Ende erreicht
      self.kill()
```

In das else kann man nun noch folgendes dazuschreiben:

```python
def move(self,world):
if self.target_waypoint < len(self.waypoints):
      self.target = Vector2(self.waypoints[self.target_waypoint])
      self.movement = self.target - self.pos
    else:
      self.kill()
      world.health -= 1
```

Wenn die Gegner jetzt das Ende passieren, verliert der Spieler jeweils 1 Leben pro Gegner:

![Test 4](/articlecontents/Artikel18/Test4.png)

---

# Schlusswort

Damit sind die grundliegenden Mechaniken des Spiels verbunden und es ist nun endlich möglich das Spiel zu spielen. Für das erste Level zumindest. Was wir also als nächstes tun sollten, ist dafür zu sorgen, dass das nächste Level beginnt, wenn das vorherige abgeschlossen wurde.