---
title: Neues Level einladen
des: Heute erstellen wir die Funktionalität, um weitere Level in das Spiel einzuladen.
date: 2024-01-20
imagepath: articlesheads/Artikel20.jpeg
id: DevLog
topic: "11"
emote: 🥗
---

# Einleitung

Heute kümmere ich mich um eine weitere “Kleinigkeit”, die Großes bewirken soll. Den nach aktuellem Stand werden zwar wieder und wieder die neuen Gegnerwellen eingeladen, aber das Level ändert sich nicht, was unter anderem auch daran liegen könnte, dass wir noch keine weiteren haben, aber das ändert sich zumindest teilweise heute. Dieser Artikel soll erstmal nur die grundliegende Mechanik einbauen, dass das Spiel zwischen den Leveln switcht. Die hier verwendeten Level sind nach wie vor nicht final und werden zusammen mit weiteren Designs für das Spiel eingebaut.  

# Der aktuelle Stand

Der aktuelle Stand des Projekts lädt genau ein Level und der Code ist auch darauf ausgelegt nur ein Level zu laden:

```python
#load json data for level
with open('levels/map.tmj') as file:
    world_data = json.load(file)
```

Wir haben jetzt mehrere Möglichkeiten etwas daran zu ändern. 

![Tiled](/articlecontents/Artikel20/TiledII.png)

Das hier ist das Level, was ich für den Moment als “zweites Level” vorgesehen habe. 

# Schritt 1 - Dynamisches Level loading

Das Statement oben zeigt, wie ich ein einzelnes Level manuell in das Spiel integrieren kann. Das wollen wir jetzt ändern. Wir schreiben das Statement also erstmal so um, dass das einladen des Levels von einer Variable abhängig ist:

```python
#load json data for level
current_level = 1
with open(f'levels/map_{current_level}.tmj') as file:
    world_data = json.load(file)
```

Was f Strings sind haben wir im ersten Semester Java zur Genüge gelernt. 

## Anpassungen an der Game Loop

Im Artikel [Game-Over](https://nico-puelacher-fi.vercel.app/posts/post.19) habe ich bereits eine Funktion aufgesetzt, wo überprüft wird, ob der Spieler ein Level abgeschlossen hat, oder nicht. Diese Funktion lässt sich so erweitern, dass bei bestehen eines Levels auch direkt das nächste Level eingeladen wird.

```python
world.check_level_complete()
        if world.level_complete == True:
            world.money += c.LEVEL_COMPLETE_REWARD
            world.level += 1
            selected_turret = None
            last_enemy_spawn = pygame.time.get_ticks()
						#counter erhöhen
            current_level += 1
						#Der Spieler kann kurz keine Turrets setzen
            placing_turrets = False
						#Level neustarten
            world.reset_level()
						#Turret Gruppe leeren
            turret_group.empty()
						#Neues Bild einladen
            world.image = pygame.image.load(f'levels/map_{current_level}.png')
						#Neues JSON für den Weg der Gegner einladen
            with open(f'levels/map_{current_level}.tmj') as file:
                world.level_data = json.load(file)
						#Neuen Daten verarbeiten
            world.process_data()
            world.process_enemies()
            world.level_complete = False

```

In diesem Codeblock wird die Funktion world.reset_level() aufgerufen. An dieser habe ich ebenfalls Änderungen vorgenommen:

```python
def reset_level(self):
        self.enemy_list = []
				#Das aktuelle Tileset muss geleert werden.
        self.tile_map = []
				#Liste der Wegpunkte muss geleert werden
        self.waypoints = []
        self.spawned_enemies = 0
        self.killed_enemies = 0
        self.missed_enemies = 0
```

Und Tadaaaa!🥳

Wenn ich das erste Level bestehe, wird das zweite Level eingeladen:

![Test 1](/articlecontents/Artikel20/Test1.png)

---

# Schlusswort

Heute sind wir dem Abschluss des Projekts einen Schritt näher gekommen!👍🏻