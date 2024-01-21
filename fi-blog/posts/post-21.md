---
title: Türme wechseln
des: Heute implementiere ich die Funktionalität über Tasten Kombinationen die Türme wechseln zu können
date: 2024-01-21
imagepath: articlesheads/Artikel21.jpeg
id: DevLog
topic: "12"
emote: 🎚️
---

# Einleitung

Heute kümmere ich mich um das letzte Kernfeature des Spiels. Das Wechseln zwischen den verschiedenen Turrets. Heute habe ich des Weiteren die Entscheidung getroffen, dass wir kein Baumenü persé in das Spiel integrieren werden, dies aber über die möglichen Inputs lösen werden. Immerhin haben wir einen Build-Button und diesen finde ich nach wie vor sinnvoll. Mir ist aber eine bessere Lösung eingefallen, als ein Menü zu öffnen. Wenn ich als Spieler den Baumenü-Button gedrückt halte und dann mit dem Joy-Stick nach links und rechts navigiere, soll ich so durch die Turrets navigieren können. Die Idee finde ich sehr gut. Die Umsetzung hier stellt für mich allerdings eine große Schwierigkeit dar, denn dieser Anwendungsbereich ist so spezifisch, dass ich mir darüber erstmal Gedanken machen muss, wie man dies konzipieren kann.

# Ist das Ziel bereits vor den Augen?

Meine erste Idee, die ich umsetzen möchte ist die folgende: Es ist bereits implementiert, dass zwischen verschiedenen Gegnern unterschieden werden kann. Dies über Dictionaries in einer gesonderten Datei. Diese Idee finde ich interessant und vielleicht lässt sich diese auch auf die Turrets ummünzen.

## Datei erstellen und konfigurieren

```python
#turret_data.py
TURRET_DATA = {
    "base": {
    "attack_cooldown": 1000,
    "radius": 90,
    "cost": 200
  },
    "medium": {
    "attack_cooldown": 2000,
    "radius": 120,
    "cost": 400
  },
    "strong": {
    "attack_cooldown": 2500,
    "radius": 150,
    "cost": 600
  }
}
```

## Das Erstellen eines Turrets dynamisch machen

### Konstruktor der Turret Klasse

Nach aktuellem Stand ist es lediglich möglich das Base Turret zu erstellen und die entsprechenden Werte sind fest im Code eingetragen. Dies werden wir jetzt ändern. Zunächst im Konstruktor der Turret Datei selbst:

```python
class Turret(pygame.sprite.Sprite):
    def __init__(self, turret_type, sprite_sheet, tile_x, tile_y):
        pygame.sprite.Sprite.__init__(self)

				#Entsprechende Werte aus den Dictionaries holen
        self.range = TURRET_DATA.get(turret_type)["range"]
        self.cooldown = TURRET_DATA.get(turret_type)["attack_cooldown"]

        self.last_shot = pygame.time.get_ticks()
        self.selected = False
        self.target = None
        self.tile_x = tile_x
        self.tile_y = tile_y
				#(...)
```

### createTurret() in der Maingame Datei

Jetzt müssen wir darüber nachdenken, dass sich die gesamte Funktionsweise der createTurret() Methode aus der maingame Datei auf das dynamische System anpassen muss. Das bedeutet auch, dass wir Basiswerte brauchen, mit denen der Spieler anfängt. Startet der Spieler in das Spiel hinein, dann wird er zuerst das Base Turret setzen können, also legen wir dies auch als Grundvariable fest und bauen dann darauf auf, die createTurret() Methode entsprechend zu verändern

```python
#Init Area der maingame Datei
turret_sheet_base = pygame.image.load('assets/images/turrets/turret_1_new.png').convert_alpha()
turret_sheet_medium = pygame.image.load('assets/images/turrets/turret_2_new.png').convert_alpha()
turret_sheet_strong = pygame.image.load('assets/images/turrets/turret_3_new.png').convert_alpha()

#Startwerte
turret_sheet = turret_sheet_base
turret_type = "base"

...

#createTurret() 
def create_turret():
    mouse_tile_x = x // c.TILE_SIZE
    mouse_tile_y = y // c.TILE_SIZE

    #calculate the sequential number of the tile
    mouse_tile_num = (mouse_tile_y * c.COLS) + mouse_tile_x
    
    if world.tile_map[mouse_tile_num] != 11:
        #Check ob das Tile besetzt ist
        space_is_free = True
        for turret in turret_group:
            if(mouse_tile_x, mouse_tile_y) == (turret.tile_x, turret.tile_y):
                space_is_free = False
        #Wenn der Platz frei ist, dann setzen wir ein Turret
        if space_is_free == True:
            new_turret = Turret(turret_type, turret_sheet, mouse_tile_x, mouse_tile_y)
            turret_group.add(new_turret)
            #costs
            world.money -= c.BUY_COST
```

Was wichtig ist, ist dass wir einen weiteren Wert für jedes erstellte Turret übergeben müssen. turret_type, denn dieser entscheidet darüber welches Turret gerade ausgewählt ist.

### Anpassungen am Event-Handler

Jetzt wäre es schön, wenn wir die Turrets auch wirklich wchseln könnten. Dafür setze ich folgendes Event auf:

```python
if keys[pygame.K_l]:
        if keys[pygame.K_v] and current_time - last_movement_time > movement_timeout:
            #Switch between Turrets - right Strong Turret
            
            turret_sheet = turret_sheet_strong
            turret_type = "strong"
        if keys[pygame.K_c] and  current_time - last_movement_time > movement_timeout:
            #Switch between Turrets - up Medium Turret
            turret_sheet = turret_sheet_medium
            turret_type = "medium"
        if keys[pygame.K_x] and  current_time - last_movement_time > movement_timeout:
            #Switch between Turrets - left Base Turret
            turret_sheet = turret_sheet_base
            turret_type = "base"

```

Hier wird erst überprüft, ob ich die L Taste gedrückt halte und dann gecheckt, ob ich entweder x,c oder v auf meiner Tastatur drücke.

*“Wieso X,C und V? Ich dachte du willst die Richtungstasten verwenden?”*

Will ich auch, aber das scheint so ohne weiteres nicht Möglich zu sein, da dann 2 Input-Events mit einem Key verbunden sind. Ich habe aber gelesen, dass man dies über Booleans ändern kann. Dies wird allerdings der Inhalt eines späteren Artikels (und fällt eigentlich in das Gebiet von Herrn Overlack, daher fällt ihm vielleicht ein, wie man dies mit dem RasberryPi zusammen erledigen kann).

Jedenfalls haben wir es damit geschafft! Das Wechseln zwischen den Turrets ist implementiert und muss somit nur noch verfeinert werden.🥳

---

# Schlusswort / Review

Ich möchte dieses Schlusswort nutzen um ein bisschen in die vergangenen drei Monate zu schauen und ein Paar Gedankengänge zu teilen. Die Entwicklung dieses Spiels bestand aus diversen Höhen, zwei Tiefs, die in diesem Blog ein bisschen untergegangen sein könnten (das Turret Switching heute und die Designs, die im kommenden Artikel thematisiert werden). Zusammengefasst wächst mir jedes Projekt, das ich hier an der Hochschule machen darf ein gutes Stück weit ans Herz und mal davon abgesehen, dass man solche Projekte perfekt ins Portfolio aufnehmen kann, wächst man sowohl persönlich, wie auch als Entwickler / Informatiker mit jedem Projekt mit (wenn man nicht einmal im gesamten Entwicklungsprozess hinterfragt, wie man das alles schaffen sollte, dann hat man nicht richtig gearbeitet… ).

Wichtig ist, dass man am Ende mit dem Ergebnis und mit der entsprechenden Note zufrieden ist. Mir ist durchaus klar, dass der Blog hier nicht einmal 25% der Gesamtnote ausmacht, aber für mich ist es wichtig eine Aufgabe zu 100% und bewusst zu erledigen. Halbherzig hätte ich mir diesen Blog auch sparen können. Wir bekommen durch diesen Blog ein kleines “Projekt-Sprachrohr” und es ist natürlich jedem selbst überlassen, wie und ob er von diesem Gebrauch machen möchte. Während der Veranstaltung fiel immer wieder die Anmerkung: “Mit dem Blog kann man die mündliche Prüfung lenken”, was mir ein bisschen sauer aufstößt. Nicht grundsätzlich, sondern eher wie man es als Student auslegen kann. Für mich stand dies nie im Fokus. Wie gesagt: Ganz oder gar nicht. Klar könnte ich hingehen und hier nur die Dinge dokumentieren, die mir während der Programmierung leicht gefallen sind und alle anderen Faktoren lasse ich gerade so im Blog, dass eine Kausalität und ein Zusammenhang entsteht, damit ich genau weiß, was ich in der mündlichen Prüfung gefragt werde. Finde ich irgendwie nicht richtig. Als !Vollzeitstudent! hat man 8 Stunden täglich zu füllen. Im besten Fall rundum 8 bis 9 Stunden pro Modul. Dann kommt man nach Adam Riese auf ca. 60 Stunden pro Woche und hat einen Vollzeitjob. Vielleicht sehe ich dies ein bisschen sehr eng, aber das ist der Anspruch, den man an sich stellen sollte (meiner Ansicht nach (!es ist vollkommen in Ordnung dies anders zu sehen!)). 
Das Konzept einen Blog zu erstellen ist genau richtig und ich finde, dass dies in mehr Modulen der Fall sein sollte.

Danke für die Möglichkeit an dieser Stelle.

Im nächsten Artikel kümmern wir uns um die Designs des Spiels.