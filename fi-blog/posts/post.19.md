---
title: Game-Over, Next Level
des: Heute erstelle ich einen Game-Over Bildschirm und die Möglichkeit weitere Level zu laden.
date: 2024-01-17
imagepath: articlesheads/Artikel19.jpeg
id: DevLog
topic: "10"
emote: ❎
---
# Einleitung

Jetzt wo die grundliegenden Mechaniken des Spiels fertig sind, können wir damit beginnen Mechaniken um das Spiel herum zu bauen. Dazu zählt unter anderem

- Game-Over Handling, wenn der Spieler keine Lebenspunkte mehr hat
- Das Wechseln zwischen den Leveln, wenn der Spieler eines bestanden hat
- Attract-Mode
- Menüs

Mit ersterem werden wir uns heute intensiv beschäftigen und vielleicht noch auf die anderen Punkte eingehen.

# Tracking, ob eine Welle beendet wurde

Sowohl für einen Game-Over, wie auch für das Wechseln der Level muss das Spiel wissen, ob alle Gegner entweder durchgelaufen, oder getötet worden sind. Dafür müssen wir ein Paar Variablen erstellen, die uns diese Berechnungen erleichtern werden.

Wir fangen damit an den Konstruktor der World Klasse zu erweitern

```python
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
        #Neue Variablen
        self.killed_enemies = 0
        self.missed_enemies = 0
```

Hier muss man über eine wichtige Sache nachdenken:

*“Warum tracke ich nicht über spawned_enemies, ob die Welle bereits vorbei?”*

Weil spawned_enemies überhaupt nichts darüber aussagt, wie weit der Spieler eigentlich gekommen ist. Spawned_enemies sagt nur aus, dass das Spiel es geschafft hat alle Entitäten auf dem Spielfeld zu platzieren, aber nicht was weiterhin mit diesen passiert.

Und weil mich interessiert, wie der Spieler abgeschnitten hat (mögliches Scoreboard vielleicht), unterscheide ich zwischen killed_enemies und missed_enemies. 

Beide Werte lassen sich in der Enemy Klasse einrichten, da für beide Fälle Funktionen implementiert sind.

```python
def check_alive(self, world):
    if self.health <= 0:
		#Gegner wurde getötet
     world.killed_enemies += 1
     world.money += c.KILL_REWARD
     self.kill()
```

```python
def move(self,world):
    if self.target_waypoint < len(self.waypoints):
      self.target = Vector2(self.waypoints[self.target_waypoint])
      self.movement = self.target - self.pos
    else:
      self.kill()
      world.health -= 1
			#Gegner hat das Ende passiert
      world.missed_enemies += 1
```

Jetzt haben wir alles, was wir brauchen, um zu überprüfen, ob eine Welle abgeschlossen wurde:

```python
def check_level_complete(self):
        if(self.killed_enemies + self.missed_enemies) == len(self.enemy_list):
            return True
```

Bauen wir diese Funktion doch direkt in die GameLoop der maingame Datei ein.

# Welle wechseln bei geschaffter Welle

Jetzt erachte ich es für sinnvoll, dafür zu sorgen, dass die nächste Welle geladen wird, wenn die vorherige abgeschlossen wurde.

**Anmerkung:**

Eigentlich ist der Plan, dass es verschiedene Level und nicht nur verschiedene Wellen gibt. Hier gibt es ein Problem. Wir haben keine weiteren Level. Das macht aber nichts, diese werde ich in kommenden Artikeln erstellen. Diese lassen sich dann problemlos in den Code hier einarbeiten. Das weitaus komplexere ist das wechseln der Wellen.

Aber nun zurück zur GameLoop

```python
if world.check_level_complete() == True:
        world.level += 1
        last_enemy_spawn = pygame.time.get_ticks()
```

Hier erhöhen wir das Level. Was ist aber mit unseren tracking Variablen (enemies_spawned, enemies_killed und enemies_missed)? Hierfür würde ich eine weitere Funktion in meiner world Klasse erstellen, die ich reset nenne. Ich könnte die  Werte auch in der GameLoop zurücksetzen, aber einfach der Ordnung halber möchte ich das nicht tun.

```python
def reset_level(self):
        self.enemy_list = []
        self.spawned_enemies = 0
        self.killed_enemies = 0
        self.missed_enemies = 0
```

Diese Funktion setzen wir jetzt ebenfalls in die if Bedingung der GameLoop ein.

```python
if world.check_level_complete() == True:
        world.level += 1
        last_enemy_spawn = pygame.time.get_ticks()
        world.reset_level()
```

Was jetzt aber noch fehlt ist das verwalten der neuen Gegner, damit die nächste Welle startet, diese Funktion haben wir aber bereits zuvor erstellt.

```python
if world.check_level_complete() == True:
        world.level += 1
        last_enemy_spawn = pygame.time.get_ticks()
        world.reset_level()
        world.process_enemies()
```

Damit ist alles implementiert, was wir zum Wechsel zwischen den Leveln brauchen. Jetzt möchte ich dies noch visualisieren, damit der Spieler weiß in welchem Level er sich befindet.

Dafür setze ich meine draw_text Methode aus vorherigen Artikeln abermals ein:

```python
draw_text(str(world.health), text_font, "grey100", 0,0)
draw_text(str(world.money), text_font, "grey100", 0, 30)
#Anzeigen des aktuellen Levels
draw_text(str(world.level), text_font, "grey100", 0,60)
```

# Belohnung für geschaffte Welle

Eine Kleinigkeit, aber eigentlich wäre es ganz niedlich wenn der Spieler dafür belohnt werden würde, wenn er eine Welle geschafft hat. Ich spreche von einem kleinen finanziellen Bonus.

Dafür erstellen wir wie immer eine Konstante in der entsprechenden Datei. Was wir bereits hatten, ist die Belohnung für einen getöteten Gegner:

```python
#1 Punkt für das töten eines Gegners
KILL_REWARD = 1
#100 Punkte für das erfolgreiche abschließen eines Levels
LEVEL_COMPLETE_REWARD = 100
```

Dafür erweitern wir die Funktion der GameLoop von zuvor ein weiteres kleines Mal:

```python
if world.check_level_complete() == True:
				#Finanzieller Bonus
        world.money += c.LEVEL_COMPLETE_REWARD
        world.level += 1
        last_enemy_spawn = pygame.time.get_ticks()
        world.reset_level()
        world.process_enemies()
```

# Game-Over

Wirklich verlieren kann der Spieler bisher ja noch nicht. Das möchte ich jetzt ändern. Wenn die Lebensanzahl des Spielers auf 0 fällt, dann läuft das Spiel einfach weiter. Was wir jetzt ändern werden.

Dafür setzen wir erstmal ein Paar Variablen in den Init Bereich der maingame Datei:

```python
#Gamevariables
game_over = False
game_outcome = 0
```

Game_over ist recht selbsterklärend, aber game_outcome wird noch sehr spannend werden.

game_outcome wird soetwas wie eine permanente Prognose, wie das Spiel enden wird. Warum ich das mache wird im Laufe jetzt gleich klar, aber das System soll so funktionieren:

- -1 steht für “verloren”
- 0 steht für “gewinnen”

Nutzen wir diese Variablen doch direkt in unserem Code. Wir können mit diesen Variablen diverse Checks in der GameLoop machen. 

Ich werde hier nun den gesamten Code der GameLoop !außer den Eventhandler! zeigen, da ich an diesem nichts ändern werde. 

```python
#game loop
run = True
while run:
    clock.tick(c.FPS)
    screen.fill("grey100")

    world.draw(screen)

    pygame.draw.lines(screen, "grey0", False, world.waypoints)

#Ich will, dass die Gegner nur dann noch aktualisiert werden,
#wenn das Spiel noch läuft, sonst brauche ich das ja nicht mehr.
    if game_over == False:
        if world.health <= 0:
            game_over = True
            game_outcome = -1 #Verloren

        enemy_group.update(world)
        turret_group.update(enemy_group)

        
        if selected_turret:
            if selected_turret.selected == False or selected_turret.selected == None:
                selected_turret.selected = True
            else:
                selected_turret.selected = False

    enemy_group.draw(screen)
    for turret in turret_group:
        turret.draw(screen)
    
    draw_text(str(world.health), text_font, "grey100", 0,0)
    draw_text(str(world.money), text_font, "grey100", 0, 30)
    draw_text(str(world.level), text_font, "grey100", 0,60)

    
#Das weitere einfügen von Gegnern und das aktualisieren der Kontostände und
#weiteren Variablen ist, wenn der Spieler verloren hat auch überflüssig.
    if game_over == False:
        if pygame.time.get_ticks() - last_enemy_spawn > c.SPAWN_COOLDOWN:
            if world.spawned_enemies < len(world.enemy_list):
                enemy_type = world.enemy_list[world.spawned_enemies]
                enemy = Enemy(enemy_type, world.waypoints, enemy_images)
                enemy_group.add(enemy)
                world.spawned_enemies += 1 
                last_enemy_spawn = pygame.time.get_ticks()

        if world.check_level_complete() == True:
            world.money += c.LEVEL_COMPLETE_REWARD
            world.level += 1
            last_enemy_spawn = pygame.time.get_ticks()
            world.reset_level()
            world.process_enemies()

#####EVENT-HANDLER######

pygame.quit()
```

# Restart

Jetzt geht es darum, dass der Spieler in der Lage sein sollte das Spiel neu zu starten, wenn er das Spiel verloren hat. Für den Moment möchte ich keinen “Game Over” Bildschirm zeigen, sondern einfach erstmal eine Taste auf der Tastatur “freigeben”, damit der Spieler das Spiel neu starten kann.

Dennoch möchte ich, dass der Spieler des aktuellen Standes irgend ein Feedback erhält, wenn er verliert, daher schreibe ich diesen Code: 

```python
if game_over == False:
        if pygame.time.get_ticks() - last_enemy_spawn > c.SPAWN_COOLDOWN:
            if world.spawned_enemies < len(world.enemy_list):
                enemy_type = world.enemy_list[world.spawned_enemies]
                enemy = Enemy(enemy_type, world.waypoints, enemy_images)
                enemy_group.add(enemy)
                world.spawned_enemies += 1 
                last_enemy_spawn = pygame.time.get_ticks()

        if world.check_level_complete() == True:
            world.money += c.LEVEL_COMPLETE_REWARD
            world.level += 1
            last_enemy_spawn = pygame.time.get_ticks()
            world.reset_level()
            world.process_enemies()
    #Ergenenzung, wennn der Spieler verliert:
    else:
        pygame.draw.rect(screen, "dodgerblue", (200,150,400,200), border_radius=30)
        if game_outcome == -1:
            draw_text("GAME OVER", large_font, "grey0", 310, 160)
            draw_text("R to restart", large_font, "grey0", 290, 200)
```

![Test 1](/articlecontents/Artikel19/Test1.png)

Das ist weder schön, noch zentriert, aber es ist eine Form von Feedback, die ohnehin nicht lange im  Spiel bleiben wird.

In diesem Fall sollte der Spieler nachdem er verloren hat auf die Taste R drücken, um das Spiel neu zu starten. Diese Inputs sind allgemein nur für den Moment relevant, weil wir die Inputs im späteren Verlauf auf Tasten legen werden.

Jetzt erweitern wir den Event Handler der GameLoop so, dass die Funktionalität für den R Knopf eingearbeitet wird:

```python
for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
            
    current_time = pygame.time.get_ticks()
    keys = pygame.key.get_pressed()
    if keys[pygame.K_w] and current_time - last_movement_time > movement_timeout:
        if y > 0:
            y -= speed
            last_movement_time = current_time
            selected_turret = select_turret()
    if keys[pygame.K_s] and current_time - last_movement_time > movement_timeout:
        if y < c.SCREEN_HEIGHT - c.TILE_SIZE:
            y += speed
            last_movement_time = current_time
            selected_turret = select_turret()
    if keys[pygame.K_a] and current_time - last_movement_time > movement_timeout:
        if x > 0:
            x -= speed
            last_movement_time = current_time
            selected_turret = select_turret()
    if keys[pygame.K_d] and current_time - last_movement_time > movement_timeout:
        if x < c.SCREEN_WIDTH - c.TILE_SIZE:
            x += speed
            last_movement_time = current_time
            selected_turret = select_turret()
    if keys[pygame.K_o] and current_time - last_movement_time > movement_timeout:
        if world.money >= c.BUY_COST:
         create_turret()
    #Restart Option
    if keys[pygame.K_r] and game_over == True:
        game_over = False
        placing_turrets = False
        select_turret = None
        last_enemy_spawn = pygame.time.get_ticks()
        world = World(world_data, map_image)
        world.process_data()
        world.process_enemies()
        enemy_group.empty()
        turret_group.empty()
        
    screen.blit(cursor_image, (x, y))

    pygame.display.flip()
```

Man sollte bedenken, dass “das Spiel neu starten” bedeutet, dass **alle** relevanten Variablen wieder zurück gesetzt werden müssen. In diesem Fall ist das noch halbwegs übersichtlich (ich hoffe, dass ich an alles gedacht habe, aber ich bin zuversichtlich). 

Nach einem ersten Test funktioniert alles. Während des Spiels verändert R nichts und wenn das Spiel verloren ist, kann ich mit der Taste R das Spiel neu starten.

---

# Schlusswort

Jetzt rechnet sich, dass ich in den vergangenen Artikeln so viel Vorarbeit in alle möglichen Richtungen geleistet habe, da wir jetzt nur noch Kleinigkeiten an den Spielmechaniken ändern müssen. Das ist mir im letzten Artikel schon aufgefallen und ich bin sehr froh darüber und ich denke, dass das im Regelfall auch so bleiben wird.