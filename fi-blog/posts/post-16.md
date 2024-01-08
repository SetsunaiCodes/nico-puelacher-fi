---
title: Designs, Animationen, Aiming und Schießen
des: In diesem Artikel zeige ich unsere neuen Designs, baue diese ein und beginne mit der Arbeit am Ziel und Schieß System.
date: 2024-01-08
imagepath: articlesheads/Artikel14.jpeg
id: DevLog
topic: DevLog 07
---
# Einleitung

In diesem Artikel haben wir eine Menge vor. Allgemein würde ich die Inhalte der Artikel gerne erweitern und diese dafür besser unterteilen. Jedenfalls wird in diesem Artikel folgendes abgedeckt:

- Neuen Designs unseres Designers zeigen
- Einen Animation-Handler aufsetzen und die neuen Sprites ins Spiel einbringen
- Die Türme endlich ziele suchen und schießen lassen

Damit ist der Plan für heute klar. Fangen wir also ohne Weiteres an!

# Designs

Beginnen wir damit die Designs unseres Designers hervorzuheben!

## Verbessertes Tileset

![Tileset](/articlecontents/Artikel16/Tileset.png)

In der aktuellen Variante hatten sich kleinere Fehler eingeschlichen, die sich mit den neuen und verbesserten Tileset beheben lassen. Nun kann ich damit beginnen Level aufzusetzen und das Spiel zu skalieren. 

## Turm 1 - Basisturm

![Turm 1](/articlecontents/Artikel16/Turm1.png)

## Turm 2 - Schnellfeuerturm

![Turm 2](/articlecontents/Artikel16/Turret2.png)

## Turm 3 - Plasmaturm

![Turm 3](/articlecontents/Artikel16/Turret3.png)

## Turm 4 - Radonmine

![Turm 4](/articlecontents/Artikel16/Turret4.png)

## Turm 5 - Eisturm

![Turm 5](/articlecontents/Artikel16/Turret5.png)

## Gegner Variante 1

![Enemy 1](/articlecontents/Artikel16/Enemy1.png)

## Gegner Variante 2

![Enemy 2](/articlecontents/Artikel16/Enemy2.png)

## Großer Gegner Variante 1

![Enemy 3](/articlecontents/Artikel16/Enemy3.png)

Das Einzige, was ich nun kritisieren würde wäre, dass die Designs nicht immer gleich viele Sprites für die entsprechende Animation haben, da hab ich aber noch Code aus einem anderen Projekt von mir, den wir hier verwenden können. 

# Animation

Ich konnte im Artikel [Animation](https://nico-puelacher-fi.vercel.app/posts/post-04) bereits thematisieren, wie Spritesheets eingelesen und verarbeitet werden. Ich werde hier nach dem selben Prinzip vorgehen. Ich schreibe etwas anderen Code, aber das Prinzip wird genau das selbe sein. Ich werde dieses auch nicht weiter im Rahmen dieses Blogs darstellen.

—Zeitsprung

Soeben habe ich die Animationsmechaniken in das Spiel implementiert. Wenn ich das Spiel nun starte und ein Turret platziere wird die entsprechende Animation abgespielt:

[Test1.mp4](/articlecontents/Artikel16/Test1.mp4)

# Zielen und Feuern

Nun zum spaßigen Teil dieses Artikels. Ich möchte, dass die Türme die Gegner angreifen, wenn die Gegner in den Radius der Türme gelangen. 

Hierfür müssen wir ein Vorkehrungen getroffen werden, die ich im Folgenden näher erläutern werde. Vorerst halten wir uns in der turret.py Datei auf und werden Änderungen an der aktuellen Turret Entität vornehmen.

## Der Radius

Um den Radius zu implementieren legen wir zuerst einen festen Wert an, der den Radius des Turrets bestimmen soll. Im späteren Verlauf des Spiels werden wir diese dynamisch ändern, weil ich verschiedene Varianten von Türmen ins Spiel implementieren möchte. Des Weiteren möchte ich, dass der Spieler den Radius des Turmes sehen kann, wenn er diesen platziert, einfach damit dieser A mehr Feedback erhält und B taktischer spielen kann. Anhand der Kommentare lässt sich sehen welche Änderungen ich hierfür zunächst vorgenommen habe:

```python
#turrets.py
import pygame
import constants as c

class Turret(pygame.sprite.Sprite):
    def __init__(self, sprite_sheet, tile_x, tile_y):
        pygame.sprite.Sprite.__init__(self)
        #Reichweitenvariable
        self.range = 90
        self.cooldown = 1000
        self.last_shot = pygame.time.get_ticks()
        self.tile_x = tile_x
        self.tile_y = tile_y

        self.x = (self.tile_x + 0.5) * c.TILE_SIZE
        self.y = (self.tile_y + 0.5) * c.TILE_SIZE

        self.sprite_sheet = sprite_sheet
        self.animation_list = self.load_images()
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

        self.image = self.animation_list[self.frame_index]
        self.rect = self.image.get_rect()
        self.rect.center = (self.x, self.y)

        #Transparenter Kreis mit Umrandung, der die Reichweite anzeigt
        self.range_image = pygame.Surface((self.range *2, self.range *2))
        self.range_image.fill((0,0,0))
        self.range_image.get_colorkey((0,0,0))
        pygame.draw.circle(self.range_image, "grey100",(self.range, self.range), self.range)
        self.range_image.set_alpha(100)
        self.range_rect = self.range_image.get_rect()
        self.range_rect.center = self.rect.center

    
    def load_images(self):
        size = self.sprite_sheet.get_height()
        animation_list = []
        for x in range(c.ANIMATION_STEPS):
            temp_img = self.sprite_sheet.subsurface(x * size, 0, size, size)
            temp_img_scaled = pygame.transform.scale(temp_img, (c.TILE_SIZE,c.TILE_SIZE))
            animation_list.append(temp_img_scaled)
        return animation_list
    
    def update(self):
        if pygame.time.get_ticks() - self.last_shot > self.cooldown:
            self.play_animation()

    def play_animation(self):
        self.image = self.animation_list[self.frame_index]
        if pygame.time.get_ticks() - self.update_time > c.ANIMATION_DELAY:
            self.update_time = pygame.time.get_ticks()
            self.frame_index += 1
        if self.frame_index >= len(self.animation_list):
            self.frame_index = 0
            self.last_shot = pygame.time.get_ticks()

#Zeichenfunktion damit Radius gezeichnet wird.
    def draw(self, surface):
        surface.blit(self.range_image, self.range_rect)
```

Jetzt haben wir aber ein Problem. Ich habe doch schon eine draw Methode, die in der Gameloop ausgeführt wird, die den “Radius-Kreis” nicht berücksichtigt. Ich kann mir aber keine zweite dazu holen. 

Wobei…doch, kann ich…theoretisch.

Wenn ich in der Gameloop nicht wie gewohnt

```python
turret_group.draw(screen)
```

verwende, sondern:

```python
for turret in turret_group:
        turret.draw(screen)
```

Setze ich mit jedem turret_group indirekt eine Draw Methode und kann dann die zweite verwenden. Wenn ich das Spiel jetzt starten würde, dann könnte ich aber keine Turrets mehr platzieren, sondern nur noch Radien. Das liegt daran, dass wir das Turret in unserer neuen Draw Methode auch direkt das Turret zeichnen sollten, das wir haben wollen und nicht wie zuvor nur den Radius.

```python
#turrets.py

...
#Zeichenfunktion damit Radius gezeichnet wird.
    def draw(self, surface):
        surface.blit(self.range_image, self.range_rect)
        surface.blit(self.image, self.rect)
```

Wenn ich das Spiel jetzt starte, erhalte ich dies hier:

![Test 2](/articlecontents/Artikel16/Test2.png)

Ich möchte aber nicht, dass die Radien permanent sichtbar sind. Eigentlich interessiert mich ja nur welchen Radius das Turret hat, das ich gerade setzen möchte, was auch bedeutet, dass wir unsere Logik ein bisschen ändern müssen.

```python
#turrets.py
import pygame
import constants as c

class Turret(pygame.sprite.Sprite):
    def __init__(self, sprite_sheet, tile_x, tile_y):
        pygame.sprite.Sprite.__init__(self)
        self.range = 90
        self.cooldown = 1000
        self.last_shot = pygame.time.get_ticks()
        #Check nach ausgewähltem Turret
        self.selected = False
        self.tile_x = tile_x
        self.tile_y = tile_y

        self.x = (self.tile_x + 0.5) * c.TILE_SIZE
        self.y = (self.tile_y + 0.5) * c.TILE_SIZE

        self.sprite_sheet = sprite_sheet
        self.animation_list = self.load_images()
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

        self.image = self.animation_list[self.frame_index]
        self.rect = self.image.get_rect()
        self.rect.center = (self.x, self.y)

        self.range_image = pygame.Surface((self.range *2, self.range *2))
        self.range_image.fill((0,0,0))
        self.range_image.set_colorkey((0,0,0))
        pygame.draw.circle(self.range_image, "grey100",(self.range, self.range), self.range)
        self.range_image.set_alpha(100)
        self.range_rect = self.range_image.get_rect()
        self.range_rect.center = self.rect.center

    
    def load_images(self):
        size = self.sprite_sheet.get_height()
        animation_list = []
        for x in range(c.ANIMATION_STEPS):
            temp_img = self.sprite_sheet.subsurface(x * size, 0, size, size)
            temp_img_scaled = pygame.transform.scale(temp_img, (c.TILE_SIZE,c.TILE_SIZE))
            animation_list.append(temp_img_scaled)
        return animation_list
    
    def update(self):
        if pygame.time.get_ticks() - self.last_shot > self.cooldown:
            self.play_animation()

    def play_animation(self):
        self.image = self.animation_list[self.frame_index]
        if pygame.time.get_ticks() - self.update_time > c.ANIMATION_DELAY:
            self.update_time = pygame.time.get_ticks()
            self.frame_index += 1
        if self.frame_index >= len(self.animation_list):
            self.frame_index = 0
            self.last_shot = pygame.time.get_ticks()

#Zeichenfunktion damit Radius gezeichnet wird.
    def draw(self, surface):
        #Nur das ausgewählte Turret umranden
        if self.selected:
            surface.blit(self.range_image, self.range_rect)
        surface.blit(self.image, self.rect)
```

Den schlauen Füchsen unter Ihnen wird aufgefallen sein, dass ich hier zwar einen Boolean erstelle, diesem aber nie auf True setze. Das soll die Turret Instanz auch gar nicht können. Das machen wir in der maingame.py !

```python
#maingame.py
#InitArea
#Gamebooleans
...
placing_turrets = False
#selected Turrets wird zu Beginn auf None gesetzt
selected_turret = None

#Es ist super cool, dass Python 3 Möglichkeiten für
#Booleans besitzt!
```

Jetzt setzen wir eine Funktion auf, die das ausgewählte Turret zurückgibt. Hierfür können wir die bereits existierende create_turret() Funktion als Vorlage nehmen und abändern:

```python
#maingame.py
#init area
def select_turret():
    mouse_tile_x = x // c.TILE_SIZE
    mouse_tile_y = y // c.TILE_SIZE
    for turret in turret_group:
        if(mouse_tile_x, mouse_tile_y) == (turret.tile_x, turret.tile_y):
            return turret
```

Dann bauen wir diese Funktion nur noch in die Gameloop ein. 

```python
#game loop
run = True
while run:
    clock.tick(c.FPS)
    screen.fill("grey100")

    world.draw(screen)

    pygame.draw.lines(screen, "grey0", False, world.waypoints)

    #draw groups
    enemy_group.update()
    turret_group.update()

    
    #Highlight selected turret
    if selected_turret:
        if selected_turret.selected == False or selected_turret.selected == None:
            selected_turret.selected = True
        else:
            selected_turret.selected = False

    enemy_group.draw(screen)
    for turret in turret_group:
        turret.draw(screen)

    

    for event in pygame.event.get():
        #Möglichkeit das Spiel zu beenden
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
        create_turret()

    pygame.draw.rect(screen, currentColor, (x, y, c.TILE_SIZE, c.TILE_SIZE))

    pygame.display.flip()

pygame.quit()
```

Wenn ich nun im Spiel mit dem Cursor über ein gesetztes Turret gehe, dann kann ich den Radius sehen. Wird dieser bereits angezeigt, dann wird dieser wieder weggemacht.

## Schießen

Jetzt gehen wir zu dem Teil über an dem unsere Turrets schießen lernen.

Ich definiere also eine Sonderfunktion in der turret Datei, die immer wieder durch die aktuellen Gegner iteriert und überprüft, ob sich diese in der Reichweite des Turrets befinden:

```python
def pick_target(self,enemy_group):
        #Den Gegner finden
        x_dist = 0
        y_dist = 0
        #Distanz zu jedem Gegner überprüen
        for enemy in enemy_group:
            x_dist = enemy.pos[0] - self.x
            y_dist = enemy.pos[1] - self.y
            dist = math.sqrt(x_dist ** 2 + y_dist ** 2)
            if dist < self.range:
                self.target = enemy
```

## Bewegen des Sprites

Der Sprite sollte in die richtige Richtung schauen, damit das Spiel ein bisschen mehr Sinn erhält. Dafür nehme ich diese Änderungen vor:

```python
#turrets.py
import pygame
import math
import constants as c

class Turret(pygame.sprite.Sprite):
    def __init__(self, sprite_sheet, tile_x, tile_y):
        pygame.sprite.Sprite.__init__(self)
        self.range = 90
        self.cooldown = 1000
        self.last_shot = pygame.time.get_ticks()
        self.selected = False
        self.target = None
        self.tile_x = tile_x
        self.tile_y = tile_y

        self.x = (self.tile_x + 0.5) * c.TILE_SIZE
        self.y = (self.tile_y + 0.5) * c.TILE_SIZE

        self.sprite_sheet = sprite_sheet
        self.animation_list = self.load_images()
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

        #Startwinkel
        self.angle = 90
        self.original_image = self.animation_list[self.frame_index]
        #entsprechende Drehung
        self.image = pygame.transform.rotate(self.original_image, self.angle)
        self.rect = self.image.get_rect()
        self.rect.center = (self.x, self.y)

        self.range_image = pygame.Surface((self.range *2, self.range *2))
        self.range_image.fill((0,0,0))
        self.range_image.set_colorkey((0,0,0))
        pygame.draw.circle(self.range_image, "grey100",(self.range, self.range), self.range)
        self.range_image.set_alpha(100)
        self.range_rect = self.range_image.get_rect()
        self.range_rect.center = self.rect.center

    
    def load_images(self):
        size = self.sprite_sheet.get_height()
        animation_list = []
        for x in range(c.ANIMATION_STEPS):
            temp_img = self.sprite_sheet.subsurface(x * size, 0, size, size)
            temp_img_scaled = pygame.transform.scale(temp_img, (c.TILE_SIZE,c.TILE_SIZE))
            animation_list.append(temp_img_scaled)
        return animation_list
    
    def update(self,enemy_group):
        if pygame.time.get_ticks() - self.last_shot > self.cooldown:
            self.play_animation()
            self.pick_target(enemy_group)

    def pick_target(self,enemy_group):
        #Den Gegner finden
        x_dist = 0
        y_dist = 0
        #Distanz zu jedem Gegner überprüen
        for enemy in enemy_group:
            x_dist = enemy.pos[0] - self.x
            y_dist = enemy.pos[1] - self.y
            dist = math.sqrt(x_dist ** 2 + y_dist ** 2)
            if dist < self.range:
                self.target = enemy
                #Drehung, wenn das Ziel gefunden wurde
                self.angle = math.degrees(math.atan2(-y_dist, x_dist))

    def play_animation(self):
        self.original_image = self.animation_list[self.frame_index]
        if pygame.time.get_ticks() - self.update_time > c.ANIMATION_DELAY:
            self.update_time = pygame.time.get_ticks()
            self.frame_index += 1
        if self.frame_index >= len(self.animation_list):
            self.frame_index = 0
            self.last_shot = pygame.time.get_ticks()
        
    #Drawmethode anpassen, damit in jedem Draw (60 Mal die Sekunde)
    #gedreht wird.
    def draw(self, surface):
        self.image = pygame.transform.rotate(self.original_image, self.angle -90)
        self.rect = self.image.get_rect()
        self.rect.center = (self.x, self.y)
        if self.selected:
            surface.blit(self.range_image, self.range_rect)
        surface.blit(self.image, self.rect)
```

Wenn ich das Spiel nun ausführe, funktioniert die Drehung einwandfrei.

![Test 3](/articlecontents/Artikel16/Test3.png)

Um das tatsächliche vernichten der Gegner möchte ich mich aber in einem späteren Artikel kümmern

# Design Nachtrag.

Soeben erhielt ich ein besseres Design für einen Cursor, damit wir kein blaues Viereck mehr verwenden müssen:

![New Border](/articlecontents/Artikel16/NewBorder.png)

Diesen werde ich nun implementieren und danach einen neuen Screenshot zeigen:

![Test 4](/articlecontents/Artikel16/Test4.png)

Sieht doch direkt schicker aus!

----
# Schlusswort
In diesem Artikel haben wir einiges an Fortschritt gemacht und weitere Grundbausteine gelegt, die sehr entscheidend
für die Grundmechaniken des Spiels sein werden. In den folgenden Artikeln werden wir diese erweitern.
