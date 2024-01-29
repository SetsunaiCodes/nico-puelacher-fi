---
title: Bufixing und finishing touches
des: In diesem letzten Artikel werde ich die letzten Fehler des Spiels beheben, sodass eine vollständig spielbare Version entsteht.
date: 2024-01-29
imagepath: articlesheads/Artikel26.jpeg
id: DevLog
topic: "14"
emote: 🏁
---

# Einleitung

Dies wird der letzte Artikel dieses Blogs. Heute korrigieren wir die letzten Fehler, die ich im Spiel gefunden habe und finalisieren so das Projekt. Ich bin unglaublich zufrieden mit diesem Blog und muss sagen, dass ich wenig Module in diesem Studium hatte, die mir mehr Spaß gemacht haben, als dieses hier. Ich habe sehr viel gelernt und freue mich schon sehr darauf mir dieses Bastelhobby weiterhin zu behalten.

Gehen wir die Punkte, die ich mir notiert habe einfach nacheinander durch und arbeiten diese ab.

# Variablen des Spiels

Diese Sektion wird sich lediglich mit der constants.py Datei beschäftigen und lediglich Nummern anpassen.

## Alles eine Frage des Geldes

Die aktuellen Werte im Bezug auf das Geld, welches dem Spieler zur Verfügung gestellt wird, ergibt wenig Sinn. Irgendwann im Laufe des Spiels hat der Spieler zu viel Geld. 

```python
######## ALTER STAND #########

#Startgeld
MONEY = 650
#Belohnung für getöteten Gegner
KILL_REWARD = 50
#Kosten für ein Turret
BUY_COST = 200
#Belohnung für das Abschließen eines Levels
LEVEL_COMPLETE_REWARD = 100

######## NEUER STAND #########
MONEY = 400
KILL_REWARD = 10
BUY_COST = 180
LEVEL_COMPLETE_REWARD = 80
```

Es ist gut möglich, dass ich im Laufe bis zur Prüfung noch ein bisschen mit diesem Werten spielen werde, einfach weil ich das Spiel leichter oder schwerer gestalten möchte, jetzt sind wir aber auf jeden Fall näher an einer fairen Bedingung dran.

## Spieler hat nur 1 Leben

Dies ist noch von den Tests des Game-Over Screens übrig geblieben. Eigentlich sollte der Spieler 100 Lebenspunkte haben.

```python
######## ALTER STAND #########
HEALTH = 1
######## NEUER STAND #########
HEALTH = 100
```

# Coding

In dieser Sektion soll es um Fehler gehen, die mir während der Programmierung passiert sind.

## Neustarten geht nicht richtig

Wenn ich das Spiel nachdem ich verloren habe Neustarten will, dann stürzt das Spiel ab, wenn ich einen neuen Turm setzen möchte.

Dieses Problem lag an einem Tippfehler meinerseits:

```python
###### ALTER STAND #######
# Restart Option
    if keys[pygame.K_r] and game_over == True:
        game_over = False
        select_turret = None
        last_enemy_spawn = pygame.time.get_ticks()
        world = World(world_data, map_image)
        world.process_data()
        world.process_enemies()
        enemy_group.empty()
        turret_group.empty()
```

select_turret ist eine Funktion, kann daher nicht vom Typ None sein. Was ich eigentlich meinte, war der Boolean selected_turret.

```python
######## NEUER STAND #######
# Restart Option
    if keys[pygame.K_r] and game_over == True:
        game_over = False
        selected_turret = None
        last_enemy_spawn = pygame.time.get_ticks()
        world = World(world_data, map_image)
        world.process_data()
        world.process_enemies()
        enemy_group.empty()
        turret_group.empty()
```

Das löst das Problem, das Spiel kann nun so häufig man möchte neu gestartet werden.

## Platzierabfrage muss erweitert werden

Die Platzierabfrage nervt mich ein bisschen, weil ich nicht ganz genau weiß, wie ich damit umgehen soll. Ich habe folgendes Problem: Da ich die Wegpunkte und die Map als JSON Objekt in das Spiel einbinde könnte ich in der Theorie einfach danach fragen auf welchem Tile der Cursor gerade steht und ob der Spieler an dieser Stelle ein Turret platzieren können soll, oder nicht. Das Problem an der Sache ist, ist dass Tiled immer andere numerische Werte für die Klassifizierung gewählt hat. Damit kann ich nicht einheitlich abfragen.

Ich muss nun also durch die 10 Level gehen und einheitliche Werte festlegen. Zumindest für die Tiles, auf denen Türme platziert werden dürfen. Das ist zwar super ärgerlich und umständlich, aber ich denke, dass es keine Alternative gibt, die zuverlässig genug ist, um das Spiel nicht weiter fehleranfällig zu machen. Damit hätte ich 100%ige Sicherheit, dass es funktioniert, daher werde ich mir nun die Zeit dafür nehmen. Dann darf ich mir jetzt eine Zahl aussuchen, die als “platzierbares Tile” gilt. Nehmen wir die Zahl 99, weil wieso nicht.

```python
####### ALTER STAND #######
if world.tile_map[mouse_tile_num] != 11:
        # Check ob das Tile besetzt ist
        space_is_free = True
        for turret in turret_group:
            if (mouse_tile_x, mouse_tile_y) == (turret.tile_x, turret.tile_y):
                space_is_free = False
        # Wenn der Platz frei ist, dann setzen wir ein Turret
        if space_is_free == True:
            new_turret = Turret(turret_type, turret_sheet, mouse_tile_x, mouse_tile_y)
            turret_group.add(new_turret)
            # costs
            world.money -= c.BUY_COST

####### NEUER STAND #######
if world.tile_map[mouse_tile_num] == 99:
        # Check ob das Tile besetzt ist
        space_is_free = True
        for turret in turret_group:
            if (mouse_tile_x, mouse_tile_y) == (turret.tile_x, turret.tile_y):
                space_is_free = False
        # Wenn der Platz frei ist, dann setzen wir ein Turret
        if space_is_free == True:
            new_turret = Turret(turret_type, turret_sheet, mouse_tile_x, mouse_tile_y)
            turret_group.add(new_turret)
            # costs
            world.money -= c.BUY_COST
```

Das hat jetzt zwar einiges an Zeit gekostet, aber jetzt ist jedes Level vollständig spielbar, so wie es gedacht ist. Das war es mir wert.

## Anzeigen des Radius funktioniert nicht richtig

Das Problem hier liegt dabei, dass der Radius nicht wirklich “an” und “aus” geschaltet wird, wenn ich mit dem Cursor über ein Turret fahre. Er geht im Zweifel 60 Mal die Sekunde an und wieder aus, solange ich mit dem Cursor über das Turret gehe. Das wollen wir nicht. 

Dafür werden wir folgendes unternehmen. Den Boolean “selected_turret” haben wir bereits, allerdings werde ich der “select_turret()” Funktion die Fähigkeit wegnehmen diesen wieder auf False zu setzen. Allerdings werde ich diesen jedes Mal wieder auf False setzen, wenn ich den Cursor bewege.

```python
######## ALTER STAND ########
# Highlight selected turret
            if selected_turret:
                if (
                    selected_turret.selected == False
                    or selected_turret.selected == None
                ):
                    selected_turret.selected = True
                else:
                    selected_turret.selected = False

####### NEUER STAND #######
# Highlight selected turret
            if selected_turret:
                if (
                    selected_turret.selected == False
                    or selected_turret.selected == None
                ):
                    selected_turret.selected = True

#Beispiel für die Bewegung des Cursors
if keys[pygame.K_w] and current_time - last_movement_time > movement_timeout:
        if y > 0:
            y -= speed
            last_movement_time = current_time
            if(selected_turret):
                selected_turret.selected = None
            selected_turret = select_turret()
```

Damit ist auch das Problem gelöst, wenn ich mit dem Cursor auf einem Turret fahre, wird der Radius zuverlässig angezeigt. Bewege ich mit weg, verschwindet dieser auch wieder.

# UI Design

## Lebensanzeige des Spielers braucht mehr Raum

Dies war etwas, was ich im Artikel [Designs](https://nico-puelacher-fi.vercel.app/posts/post-22) nicht bedacht habe. Ich habe die Abstände so eingerichtet, dass das die Anzeigen passen, wenn der Spieler mit einem Leben anfängt. Das macht aber nichts, denn dies kann über Änderungen der X-Koordinate der anderen Elemente gefixt werden.

```python
####### ALTER STAND #######
screen.blit(heart_icon, (40, 5))
        screen.blit(coin_icon, (95, 5))
        draw_text("Level: ", text_font, "grey100", 185, 7)
        draw_text(str(world.health), text_font, "grey100", 75, 7)
        draw_text(str(world.money), text_font, "grey100", 105, 7)
        draw_text(str(world.level), text_font, "grey100", 275, 7)

####### NEUER STAND ########
screen.blit(heart_icon, (40, 5))
        screen.blit(coin_icon, (120, 5))
        draw_text("Level: ", text_font, "grey100", 210, 7)
        draw_text(str(world.health), text_font, "grey100", 75, 7)
        draw_text(str(world.money), text_font, "grey100", 150, 7)
        draw_text(str(world.level), text_font, "grey100", 295, 7)
```

## Anzeige welches Turret gerade genutzt wird fehlt

Was mir erst nach mehrfachem spielen den Spiels aufgefallen ist, ist dass der Spieler gar nicht sehen kann, welches der 3 Turrets gerade “ausgerüstet” sind. Das sollte ich definitiv noch anpassen.

Dafür brauche ich jeweils ein Image von jedem Turret, mit nur einem Sprite drauf, welches ich als Icon verwenden kann. Dafür öffne ich das allseits bekannte und beliebte Bildbearbeitungsprogramm meiner Wahl und schneide einen Sprite aus und exportiere diesen als .png Image. Gesagt getan, jetzt zum Code Teil. Was ich bereits habe ist ein Indikator, welches Turret aktuell ausgewählt ist. Ich muss ihn nur entsprechend verwenden:

```python
#Init Bereich

#Indikator (exisiterte zuvor bereits)
#wird ebenfalls dafür verwendet tatsächlich das Turret 
#zu wechseln
turret_type = "base"

#turret icons einladen
turret_icons = {
    "base": 
		pygame.image.load("assets/images/turrets/base_turret_icon.png")
		.convert_alpha(),
    "medium": 
		pygame.image.load("assets/images/turrets/medium_turret_icon.png")
		.convert_alpha(),
    "strong": 
		pygame.image.load("assets/images/turrets/strong_turret_icon.png")
		.convert_alpha()
}

#Game-Loop
#Generieren des Icons in hellgrauer Box
pygame.draw.rect(screen, "grey100",(c.SCREEN_WIDTH-60,5,32,32))
screen.blit(turret_icons[f"{turret_type}"], (c.SCREEN_WIDTH-60, 5))

```

Ein Hoch auf fStrings!

## Flacker-Effekt bei Press G to Start und Restart

Das ist eine Kleinigkeit, aber eigentlich hätte ich gerne, dass der Text “Press G to start” im Sekundentakt verschwindet und wieder auftaucht, um mehr Aufmerksamkeit auf sich zu lenken.

Dafür brauche ich jeweils einen Timer und eine Angabe nach welcher Zeit der Text verschwinden, beziehungsweise wieder auftauchen soll.

```python
#Init Bereich möglichst nah an der Game-Loop
timer = 0
timer_abgelaufen = 1000
text_sichtbar = True

#Game-Loop
#Attract Mode Area
if attract_mode == True:
        screen.blit(attract_mode_bg, (0, 0))
        screen.blit(attract_mode_logo, (130, 100))
        timer += 35
        if timer >= timer_abgelaufen:
            timer = 0
            text_sichtbar = not text_sichtbar 
        if text_sichtbar:
            draw_text("Press G to start", text_font, "grey100", 125, 350)

```

Die gleichen Änderungen müssen ebenfalls im Game-Over Screen vorgenommen werden. Das Prinzip ist allerdings genau das selbe, daher werde ich dieses nicht dokumentieren.

---

# Schlusswort

Das war der letzte Artikel, der im Rahmen dieses Blogs entstehen sollte, meine Arbeit an dem Projekt ist also abgeschlossen. Das Projekt an sich ist aber noch nicht abgeschlossen. Es gibt noch einen Punkt, der abgedeckt werden sollte. Das Einbinden des Joy-Sticks und der Buttons in das finale Spiel. Dies ist aber abhängig vom Fortschritt des Elektrikers. Des Weiteren haben wir aktuell keinen Zugriff auf die Elektronik des Spiels. Dies wird also hoffentlich innerhalb der kommenden Tage noch thematisiert werden.