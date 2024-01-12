---
title: Der Level-Editor
des: In diesem Artikel bauen wir das erste Level und schreiben eine Klasse, die dynamisch korrekte Waypoints setzt.
date: 2023-12-31
imagepath: articlesheads/Artikel13.jpeg
id: DevLog
topic: "04"
emote: 👨🏻‍🎨
---

# Einleitung

In diesem Artikel werden wir damit anfangen Level zu bauen, damit das Spiel skaliert werden kann. Hierfür werde ich den Level Editor “Tiled” verwenden, da dieser in der Lage ist im korrekten Format für die Entwicklung mit PyGame zu exportieren, mehr dazu aber gleich.

# Theorie

## Was ist ein Level-Editor?

Die Frage klingt erstmal so, als wäre sie leicht zu beantworten…ist sie theoretisch auch.

*Ein Level-Editor ist eine Software-Lösung mit der man über eine grafische Oberfläche visualisiert Level für Videospiele erstellen und exportieren kann.*

Würde für eine Unterhaltung auf einer Feier vielleicht reichen, aber ein bisschen mehr Kontext kann nie schaden. Leveleditoren gibt es in sämtlichen Ausführungen und Freiheitsmöglichkeiten. Sie vereint zwar der Zweck, aber die Umsetzung könnte verschiedener nicht sein. Auf ein Paar Beispiele möchte ich in den kommenden Paragraphen eingehen.

## Level-Editor in Unity

Frameworks wie Unity, Gadoot oder Unreal verfolgen alle den Sinn Spieleentwicklung zu visualisieren, damit das Erstellen von Videospielen visualisiert werden kann. So gesehen sind diese Frameworks große Leveleditoren.

![Unity](/articlecontents/Artikel13/Unity.png)

(Unity Docs)

**Unity** zum Beispiel verfügt über Gridsysteme, die Möglichkeit Licht und Schatten zu beeinflussen,  Texturen zu erstellen, Skripte zu programmieren (solange man der Sprache C# mächtig ist (oder googeln kann)) oder Player Instanzen zu erstellen. Alles **visualisiert** in einem Überblick. Das Erstellen eines Spiels war noch nie so leicht, wie in unserem aktuellen Zeitalter, da jeder (mit einem entsprechend guten PC) Spiele programmieren und veröffentlichen kann. 

**Zusammengefasst:** Frameworks sind ganz klar die größten “Level-Editoren”, die man auf dem Markt aktuell finden kann.

**Theoretisch** könnte man dies aber als **Nachteil** auslegen, denn durch das visualisieren abstrahiert man die eigentliche Arbeit, die der Computer auf sich nehmen muss. Dabei geht dem Entwickler das Wissen über den ein oder anderen spannenden Prozess im Hintergrund flöten (vorausgesetzt man interessiert sich dafür). 

## Level-Editoren in Spielen

Die Gaming Industrie hat allerdings bereits verstanden, dass Spieler es lieben würden, wenn sie ihre eigenen Ideen in die Tat umsetzen könnten und dafür sorgen könnten, dass andere Spieler ihre Level spielen könnten.

![Super Mario Maker 2](/articlecontents/Artikel13/MarioMaker.png)

(Super Mario Maker 2 | Nintendo)

Das bekannteste Beispiel ist Nintendos “**Super Mario Maker**”, wo Spieler aus aller Welt Level erstellen und im Internet hochladen können, damit man diese spielen kann. Der Editor des Spiels ist mittlerweile soweit, dass Spieler ihre eigenen Super Mario Spiele bauen können. Mit eigenen Welten und Levelideen aus bereits bekannten Super Mario Spielen.

**Und mal ganz unter uns:** Nintendo hat damit den großen Vorteil, dass sie sich Ideen für das nächste Super Mario Bros. Hauptspiel abschauen können.

**Der Nachteil hier:** Völlig neue Konzepte lassen sich natürlich nicht selbst programmieren. Man muss also damit leben, was der Editor einem gibt. Bei Unity ist dies anders. Da bin ich als Entwickler für wirklich alles selbst verantwortlich.

## Level-Editoren in PyGame

PyGame verfügt so über keinen eigenen Level-Editor, aber das hält ja keinen davon ab einen zu programmieren, den man dann benutzen kann. Das hab ich ein Mal für ein Jump’n’Run Projekt meinerseits getan. Der Editor ist sehr rudimentär, allerdings reicht dieser, um das komplette Spiel zu entwickeln und fertig zu stellen. Ich kann den Player platzieren, Gegner platzieren und die Umgebung aufbauen.

Der Editor sieht so aus:

![Mein PyGame Editor](/articlecontents/Artikel13/MeinEditor.png)

Der Editor erkennt, wo ich mit der Maus hin fahre und zeigt eine Preview des aktuell ausgewählten Elements (oben links auch nochmal angezeigt). Mit dem Mausrad kann ich die Elemente wechseln. Wenn ich o drücke, dann trackt der Editor die gesetzten Elemente und gleicht sie so an, dass am Rand die Eckstücke, oben der Boden und in der Mitte die einfarbigen Elemente platziert werden. Mit p kann ich mein Level als JSON Datei ins Spiel exportieren.

Hier ist der Code für den Editor:

```python
#editor.py
import sys
import pygame

from scripts.utils import load_images
from scripts.tilemap import Tilemap

RENDER_SCALE = 2.0

class Editor:
    def __init__(self):
        pygame.init()

        pygame.display.set_caption('Editor')
        self.screen = pygame.display.set_mode((640, 480))
        self.display = pygame.Surface((320, 240))

        self.clock = pygame.time.Clock()
        
        
        self.assets = {
            'decor': load_images('tiles/decor'),
            'grass': load_images('tiles/grass'),
            'large_decor': load_images('tiles/large_decor'),
            'stone': load_images('tiles/stone'),
            'spawners': load_images('tiles/spawners'),
        }
        
        self.movement = [False, False, False, False]
        
        self.tilemap = Tilemap(self, tile_size=16)

        try:
            self.tilemap.load('map.json')
        except FileNotFoundError:
            pass
        
        self.scroll = [0, 0]

        self.tile_list = list(self.assets)
        self.tile_group = 0
        self.tile_variant = 0

        self.clicking = False
        self.right_clicking = False
        self.shift = False
        self.ongrid = True
        
    def run(self):
        while True:
            self.display.fill((0,0,0))

            self.scroll[0] += (self.movement[1] - self.movement[0]) * 2
            self.scroll[1] += (self.movement[3] - self.movement[2]) * 2
            render_scroll = (int(self.scroll[0]), int(self.scroll[1]))

            self.tilemap.render(self.display, offset=render_scroll)

            current_tile_img = self.assets[self.tile_list[self.tile_group]][self.tile_variant].copy()
            current_tile_img.set_alpha(100)

            mpos = pygame.mouse.get_pos()
            mpos = (mpos[0] / RENDER_SCALE, mpos[1] / RENDER_SCALE)
            tile_pos = (int((mpos[0] + self.scroll[0])
             // self.tilemap.tile_size), int((mpos[1] + self.scroll[1])
              // self.tilemap.tile_size))
            
            if self.ongrid:
                self.display.blit(current_tile_img, 
                (tile_pos[0] * self.tilemap.tile_size - self.scroll[0]
                , tile_pos[1] * self.tilemap.tile_size - self.scroll[1]))
            else:
                self.display.blit(current_tile_img, mpos)

            if self.clicking and self.ongrid:
                self.tilemap.tilemap[str(tile_pos[0])
                 + ';' + str(tile_pos[1])] =
                  {'type': self.tile_list[self.tile_group],
                   'variant': self.tile_variant, 'pos': tile_pos}
            if self.right_clicking:
                tile_loc = str(tile_pos[0]) + ';' + str(tile_pos[1])
                if tile_loc in self.tilemap.tilemap:
                    del self.tilemap.tilemap[tile_loc]
                for tile in self.tilemap.offgrid_tiles.copy():
                    tile_img = self.assets[tile['type']][tile['variant']]
                    tile_r = pygame.Rect(tile['pos'][0] - self.scroll[0]
                    , tile['pos'][1] - self.scroll[1], tile_img.get_width(), tile_img.get_height())
                    if tile_r.collidepoint(mpos):
                        self.tilemap.offgrid_tiles.remove(tile)

            self.display.blit(current_tile_img, (5,5))

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.MOUSEBUTTONDOWN:
                    if event.button == 1:
                        self.clicking = True
                        if not self.ongrid:
                            self.tilemap.offgrid_tiles.append(
                            {'type': self.tile_list[self.tile_group],
                             'variant': self.tile_variant, 'pos': (mpos[0] + self.scroll[0],
                              mpos[1] + self.scroll[1])})
                    if event.button == 3:
                        self.right_clicking = True  
                    if self.shift:
                        if event.button == 4:
                            self.tile_variant = (self.tile_variant - 1)
                             % len(self.assets[self.tile_list[self.tile_group]])
                        if event.button == 5:
                            self.tile_variant = (self.tile_variant + 1)
                             % len(self.assets[self.tile_list[self.tile_group]])
                    else:
                        if event.button == 4:
                            self.tile_group = (self.tile_group - 1)
                             % len(self.tile_list)
                            self.tile_variant = 0
                        if event.button == 5:
                            self.tile_group = (self.tile_group + 1)
                             % len(self.tile_list)
                            self.tile_variant = 0
                if event.type == pygame.MOUSEBUTTONUP:
                    if event.button == 1:
                        self.clicking = False
                    if event.button == 3:
                        self.right_clicking = False

                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_a:
                        self.movement[0] = True
                    if event.key == pygame.K_d:
                        self.movement[1] = True
                    if event.key == pygame.K_w:
                        self.movement[2] = True
                    if event.key == pygame.K_s:
                        self.movement[3] = True
                    if event.key == pygame.K_g:
                        self.ongrid = not self.ongrid
                    if event.key == pygame.K_t:
                        self.tilemap.autotile()
                    if event.key == pygame.K_o:
                        self.tilemap.save('map.json')
                    if event.key == pygame.K_LSHIFT:
                        self.shift = True
                if event.type == pygame.KEYUP:
                    if event.key == pygame.K_a:
                        self.movement[0] = False
                    if event.key == pygame.K_d:
                        self.movement[1] = False
                    if event.key == pygame.K_w:
                        self.movement[2] = False
                    if event.key == pygame.K_s:
                        self.movement[3] = False
                    if event.key == pygame.K_LSHIFT:
                        self.shift = False
            
            self.screen.blit(pygame.transform.scale(self.display, 
            self.screen.get_size()), (0, 0))
            pygame.display.update()
            self.clock.tick(60)

Editor().run()
```

```python
#Tilemap.py
import json
import pygame

AUTOTILE_MAP = {
   tuple(sorted([(1,0), (0,1)])): 0,
   tuple(sorted([(1,0), (0,1), (-1,0)])): 1,
   tuple(sorted([(-1,0), (0,1)])): 2,
   tuple(sorted([(-1,0), (0,-1), (0, 1)])): 3,
   tuple(sorted([(-1,0), (0,-1)])): 4,
   tuple(sorted([(-1,0), (0,-1), (1,0)])): 5,
   tuple(sorted([(1,0), (0,-1)])): 6,
   tuple(sorted([(1,0), (0,-1), (0,1)])): 7,
   tuple(sorted([(1,0),(-1,0),(0,1),(0,-1)])): 8,
}

NEIGHBOR_OFFSETS = [(-1, 0), (-1, -1), (0, -1), 
(1, -1), (1, 0), (0, 0), (-1, 1), (0, 1), (1, 1)]
PHYSICS_TILES = {'grass', 'stone'}
AUTOTILE_TYPES = {'grass', 'stone'}

class Tilemap:
    def __init__(self, game, tile_size=16):
        self.game = game
        self.tile_size = tile_size
        self.tilemap = {}
        self.offgrid_tiles = []
    
    def extract(self, id_pairs, keep=False):
        matches = []
        for tile in self.offgrid_tiles.copy():
            if (tile['type'], tile['variant']) in id_pairs:
                matches.append(tile.copy())
                if not keep:
                    self.offgrid_tiles.remove(tile)
        
        for loc in self.tilemap:
            tile = self.tilemap[loc]
            if (tile['type'], tile['variant']) in id_pairs:
                matches.append(tile.copy())
                matches[-1]['pos'] = matches[-1]['pos'].copy()
                matches[-1]['pos'][0] *= self.tile_size
                matches[-1]['pos'][1] *= self.tile_size
                if not keep:
                    del self.tilemap[loc]
        return matches

    def tiles_around(self, pos):
        tiles = []
        tile_loc = (int(pos[0] // self.tile_size), int(pos[1] // self.tile_size))
        for offset in NEIGHBOR_OFFSETS:
            check_loc = str(tile_loc[0] + offset[0]) + ';'
             + str(tile_loc[1] + offset[1])
            if check_loc in self.tilemap:
                tiles.append(self.tilemap[check_loc])
        return tiles
    
    def save(self, path):
        f = open(path, 'w')
        json.dump({'tilemap': self.tilemap, 
        'tile_size': self.tile_size, 'offgrid': self.offgrid_tiles}, f)
        f.close()

    
    def load(self, path):
        f = open(path, 'r')
        map_data = json.load(f)
        f.close()

        self.tilemap = map_data['tilemap']
        self.tile_size = map_data['tile_size']
        self.offgrid_tiles = map_data['offgrid']

    
    def physics_rects_around(self, pos):
        rects = []
        for tile in self.tiles_around(pos):
            if tile['type'] in PHYSICS_TILES:
                rects.append(pygame.Rect(tile['pos'][0] * self.tile_size, 
                tile['pos'][1] * self.tile_size, self.tile_size, self.tile_size))
        return rects

    def autotile(self):
        for loc in self.tilemap:
            tile = self.tilemap[loc]
            neighbors = set()
            for shift in [(1,0), (-1,0), (0,1), (0,-1)]:
                check_loc = str(tile['pos'][0] + shift[0])
                 + ';' + str(tile['pos'][1] + shift[1])
                if check_loc in self.tilemap:
                    if self.tilemap[check_loc]['type'] == tile['type']:
                        neighbors.add(shift)
            neighbors = tuple(sorted(neighbors))
            if (tile['type'] in AUTOTILE_TYPES) and (neighbors in AUTOTILE_MAP):
                tile['variant'] = AUTOTILE_MAP[neighbors]

    def render(self, surf, offset=(0, 0)):
        for tile in self.offgrid_tiles:
            surf.blit(self.game.assets[tile['type']]
            [tile['variant']], (tile['pos'][0] - offset[0], tile['pos'][1] - offset[1]))
            
        for x in range(offset[0] // self.tile_size, 
        (offset[0] + surf.get_width()) // self.tile_size + 1):
            for y in range(offset[1] // self.tile_size, 
            (offset[1] + surf.get_height()) // self.tile_size + 1):
                loc = str(x) + ';' + str(y)
                if loc in self.tilemap:
                    tile = self.tilemap[loc]
                    surf.blit(self.game.assets[tile['type']][tile['variant']], 
                    (tile['pos'][0] * self.tile_size - offset[0], tile['pos'][1]
                     * self.tile_size - offset[1]))
```

```python
#load_images from utils.py
import os
import pygame

BASE_IMG_PATH = 'data/images/'

def load_image(path):
    img = pygame.image.load(BASE_IMG_PATH + path).convert()
    img.set_colorkey((0, 0, 0))
    return img

def load_images(path):
    images = []
    for img_name in sorted(os.listdir(BASE_IMG_PATH + path)):
        images.append(load_image(path + '/' + img_name))
    return images

class Animation:
    def __init__(self, images, img_dur=5, loop=True):
        self.images = images
        self.loop = loop
        self.img_duration = img_dur
        self.done = False
        self.frame = 0
    
    def copy(self):
        return Animation(self.images, self.img_duration, self.loop)
    
    def update(self):
        if self.loop:
            self.frame = (self.frame + 1) % (self.img_duration * len(self.images))
        else:
            self.frame = min(self.frame + 1, self.img_duration * len(self.images) - 1)
            if self.frame >= self.img_duration * len(self.images) - 1:
                self.done = True
    
    def img(self):
        return self.images[int(self.frame / self.img_duration)]

```

Ich denke damit erübrigt sich auch die Frage, warum ich keinen Editor für dieses Projekt aufsetzen werde, denn allein dafür würde ich 3 Monate Arbeit brauchen :))))

Ist aber dennoch sehr schön sowas mal gemacht zu haben.

## Externe Software

![Tiled](/articlecontents/Artikel13/TiledPrev.png)

(Tiled Docs | Tiled)

Damit man sich solche Mühen eben nicht machen muss, gibt es externe Software Lösungen wie zum Beispiel “Tiled”. Mit einer solchen Software kann ich ähnlich wie bei Unity 2D Pixelart Maps erstellen und diese **als JSON** exportieren. Das ist wichtig, da ich meinem Spiel auch so direkt sagen kann, wo es Wegpunkte setzen soll.

# Praxis

Nun wo ich ein bisschen darüber philosophieren konnte was Level-Editoren sind, können wir damit anfangen unser Spiel weiter zu gestalten und Level zu erschaffen. 

## Tilemaps, Tilesets und Tiles?

### Canvas

Ein Canvas ist soetwas wie meine Leinwand, auf der ich frei nach meinen Vorstellungen Tiles zeichnen kann.

### Tiles

Tiles (auch Sprites genannt, wobei das nochmal eine etwas andere Bedeutung hat) sind einzelne Elemente auf einem Tileset. Meist bestehen diese aus einem 64x64 breiten Canvas. Eine einzelne Wegplatte wäre ein Tile. 

### Tilesets

Ein Tileset ist eine Ansammlung aus Tiles, die zusammen eine Möglichkeit liefern Level zu bauen. Soetwas wie die Farbpalette beim Malen.

### Tilemaps

Eine Tilemap umschreibt alle zusammengeführten Tilesets, die ich für mein Spiel verwenden möchte.

## Unser Tileset

Unser Designer hat bereits an einem ersten Tileset für StarGuard gearbeitet. Dieses sieht so aus:

![Tileset Designer](/articlecontents/Artikel13/TilesetNoah.png)

Dieses Tileset enthält erstmal alles, was wir brauchen, um erste Level aufsetzen zu können, da wir Turrets und Gegner erstmal durch Platzhalter Grafiken ersetzten können. Die Grundsätzlichen Level aber nicht.

## Tiled Set-Up

![First Launch Tiled](/articlecontents/Artikel13/FirstLaunch.png)

Wenn ich Tiled das erste Mal starte, werde ich von diesem Bildschirm hier begrüßt, Wir sollten also damit anfangen ein neues Projekt aufzusetzen.

![Create Map Tiled](/articlecontents/Artikel13/CreateMap.png)

Daraufhin werde ich gefragt, welche Maße meine Tiles und welche Maße mein Level haben sollte.

Unsere Map (gelb) wird begrenzt auf 15 x 15 Tiles (pink), die alle 32 x 32 Pixel groß sind.

![First View Tiled](/articlecontents/Artikel13/FirstView.png)

Nach einem Klick auf Okay öffnet sich dann auch der Editor und wir können beginnen.

Am besten damit das aktuelle Tileset in Tiled zu importieren.

![Tiled with Tileset](/articlecontents/Artikel13/TileSetdrin.png)

So. Damit haben wir alles was wir brauchen, geben Sie mir also eine kleine Minute Zeit, ich zaubere kurz.

![Erstes Level](/articlecontents/Artikel13/LevelGebaut.png)

Nach Abschluss dieses Levels vielen mir mehrere Dinge auf, die ich unserem Designer weitergeben sollte.

- Die Wegstücke schließen alle in sich selbst ab, das sollte so nicht sein, da dies für die grauen Streifen in der Mitte des Weges sorgt.
- Die Umgebung wirkt sehr leer, da wir bisher einfach nur eine graue Oberfläche dafür haben. Das sieht noch nicht aus, wie ein Raumschiff.

Da ich mit diesem Artikel einfach erstmal die Technologie, wie Level in das Spiel kommen testen und darstellen möchte, ist dies kein Problem, wir haben Zeit, dennoch sollte sich dies bis zum “Release” des Spiels ändern. Ich bleibe gespannt und im Zweifel greife ich dort ein bisschen unter die Arme und schaue, was sich machen lässt. Nun aber erstmal weiter mit unserem Projekt.

Um das Level an sich ins Spiel zu bringen, reicht es zunächst die Map als Image zu exportieren und zum Code zurückzukehren.

Hierfür erstelle ich einen neuen Ordner in unserem Projekt, den ich “levels” nenne und exportiere die aktuelle Map als png in das Projekt.

Der sinnvollste Punkt, um die Map in das Spiel zu laden ist über dem Laden des Enemy Sprites.

```python
#maingame.py
...

#load images
#map
map_image = pygame.image.load('levels/map.png').convert_alpha()
#enemy
enemy_image = pygame.image.load('assets/images/enemies/enemy_1.png').convert_alpha()
...
```

An dieser Stelle möchte ich kurz innehalten und darüber sprechen, dass Level im Spiel ein größeres Thema ist, als bisher angesprochen. Stellen wir uns kurz folgende Frage:

*“Was ist eigentlich wichtig, wenn es um das Thema Level-Handling in einem Tower Defense Spiel geht?”*

Hier ein paar Stichpunkte:

- Wie wechsle ich von einem Level zum anderen?
- Was passiert, wenn ich gewinne?
- Was passiert, wenn ich verliere?
- Woher weiß das Spiel jetzt, wo sich Weg für die Gegner befindet und wo ich Türme platzieren kann?

All diese Fragen werden in den kommenden Artikeln noch thematisiert werden, jedenfalls möchte ich fürs erste einfach aufmerksam machen. Darauf, dass es viele Faktoren zu beachten gibt, was auch der Grund sein wird, warum ich alles zum Thema Welten-Design in eine neue Datei lagern werde, die ich world.py nenne. Es bietet sich genauso an die “Welt” im Rahmen einer Klasse zu programmieren, damit wir möglichst alle Funktionen berücksichtigen können. 

Um die Map einfach erstmal zu laden reicht dieser Code hier hier:

```python
import pygame

class World():
    def __init__(self, map_image):
        self.image = map_image

    def draw(self, surface):
        surface.blit(self.image, (0,0))
```

Dann bauen wir die “Welt” doch mal in unser Spiel ein. Dafür importieren wir die Klasse in unserer Hauptdatei und initialisieren eine “Welt-Instanz”.

Ich möchte den Code direkt so verfassen, dass direkt mehrere Level gleichzeitig geladen werden, wenn man das Spiel startet. Aus Performancegründen sollte man am Ende der Entwicklung nochmal über diesen Code nachdenken, denn am effizientesten wäre es, wenn man neben aktuell laufenden Level immer nur ein Folgelevel lädt und nicht permanent das gesamte Spiel im Speicher hat. 

Das fällt für mich allerdings unter sogenannten “Quality of Life changes”.

Das ist ein tatsächlich existierender Begriff in der Gaming Branche und umschreibt Spieländerungen, die das allgemeine Wahrnehmen der Erfahrung verbessert.

Punkte wie:

- Gute Menüführung
- Konstante Performance (immer schön 60 FPS)
- Wenig bis keine Ladezeiten (Bei uns unwichtig, wir haben so kurze Ladezeiten, dass ein wir dies nicht berücksichtigen müssen, es wird keinem Spieler auffallen)
- Passende Grafiken, die dem Spieler eine schöne Oberwelt bieten ohne “erdrückend” zu wirken.

fallen unter “Quality of Life”. Mehr dazu aber in einem späteren Artikel.

Ich lagere die Level, wie bei den Gegnern auch in einer Gruppe aus. Für den Moment möchte ich das Level aber einfach erstmal anzeigen.

```python
#World Gruppe
world = World(map_image)

#Enemy Gruppe
enemy_group = pygame.sprite.Group()
```

Nachdem wir die Welt in die Gameloop eingebaut haben, können wir direkt einen ersten Test durchführen.

```python
#game loop
run = True
while run:
    clock.tick(c.FPS)
    screen.fill("grey100")

    world.draw(screen)

    pygame.draw.lines(screen, "grey0", False, waypoints)

    #draw groups
    enemy_group.update()

    enemy_group.draw(screen)

    for event in pygame.event.get():
        #Möglichkeit das Spiel zu beenden
        if event.type == pygame.QUIT:
            run = False

    pygame.display.flip()

pygame.quit()
```

![Test 1](/articlecontents/Artikel13/Test1.png)

Sehr schick, PyGame importiert das Image bereits, allerdings hat es die falsche Größe und dem Weg folgen kann unser Gegner auch noch nicht. Dann gehen wir dies doch jetzt mal an.

Hierfür müssen wir ein bisschen Mathe machen (natürlich lassen wir Python für uns rechnen) und nochmal in zurück zu Tiled gehen.
Das Problem ist, dass wir bei unseren Constants angegeben haben, dass unser Spielfeld 500 x 500 Pixel groß ist. 

```python
#consants.py
SCREEN_WIDTH = 500
SCREEN_HEIGHT = 500
FPS = 60
```

Wenn wir jetzt aber in Tiled nachschauen, dann haben wir 15 Reihen x 15 Reihen bestehend aus Tiles, die 32 x 32 Pixel breit und hoch sind.

Dann müssten wir ja eigentlich auf

$$
15px * 32px =480px 
$$

kommen. 

Wenn ich dies nun manuell eintragen würde, dann wäre dies schlechter Programmierstil. 

Daher regeln wir dies doch lieber so:

```python
#consants.py
ROWS = 15
COLS = 15
TILE_SIZE = 32
SCREEN_WIDTH = TILE_SIZE * COLS
SCREEN_HEIGHT = TILE_SIZE * ROWS
FPS = 60
```

Wenn ich das Spiel jetzt nochmal starte, dann müsste alles passen:

![Test 2](/articlecontents/Artikel13/Test2.png)

Und tatsächlich passt alles :))   

Nun möchte ich, dass sich der Spieler auf dem angegebenen Weg bewegt. Wer sich noch an den Artikel [Gegner AI](https://nico-puelacher-fi.vercel.app/posts/post-11) erinnert, der weiß auch noch, dass ich manuell Wegpunkte angegeben habe, damit unser Gegner sich auf dem Spielfeld bewegen kann. Nach näherem Betrachten des ersten Prototyp Levels ist mir meine Zeit zu wertvoll das alles von Hand zu machen. Glücklicherweise kann Tiled das für mich übernehmen. 

![Tiled With Waypoints](/articlecontents/Artikel13/WithWaypoints.png)

In einer neuen Eben füge ich Polygone ein oder mit anderen Worten: Ich füge eine Linie ein, die an bestimmten Punkten abzweigt, aber immer noch verbunden ist. Na… Wem kommt das bekannt vor? ;)).

Diese Wegpunkte kann ich separiert als JSON Datei exportieren und in mein Projekt einbinden.

Diese JSON Datei sieht so aus:

```python
{ "compressionlevel":-1,
 "height":15,
 "infinite":false,
 "layers":[
        {
         "data":[18, 2, 2, 2, 2, 2, 2, 2, 2, 2, 18, 19, 11, 11, 17,
            19, 6, 8, 8, 8, 8, 8, 8, 8, 10, 17, 19, 11, 11, 17,
            19, 11, 6, 8, 8, 8, 8, 8, 10, 11, 2, 24, 11, 11, 17,
            19, 11, 11, 12, 1, 1, 1, 1, 11, 16, 7, 7, 20, 11, 17,
            19, 11, 11, 17, 18, 18, 18, 19, 16, 8, 7, 7, 7, 20, 17,
            19, 11, 11, 17, 18, 2, 2, 2, 2, 2, 1, 1, 1, 1, 18,
            19, 11, 11, 17, 19, 6, 7, 7, 7, 10, 17, 18, 18, 18, 18,
            19, 11, 11, 22, 24, 11, 6, 7, 10, 11, 17, 18, 18, 18, 18,
            19, 11, 16, 7, 7, 20, 11, 13, 11, 11, 17, 18, 18, 18, 18,
            19, 16, 7, 7, 7, 7, 20, 18, 11, 11, 22, 2, 2, 2, 18,
            18, 1, 1, 1, 1, 1, 1, 18, 11, 16, 8, 8, 8, 10, 17,
            2, 2, 2, 2, 2, 2, 2, 24, 16, 8, 8, 8, 10, 11, 17,
            7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 20, 11, 17,
            7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 20, 17,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18],
         "height":15,
         "id":1,
         "name":"Kachelebene 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":2,
         "name":"waypoints",
         "objects":[
                {
                 "height":0,
                 "id":1,
                 "name":"",
                 "polyline":[
                        {
                         "x":0,
                         "y":0
                        }, 
                        {
                         "x":0.666666666666686,
                         "y":134.666666666667
                        }, 
                        {
                         "x":-127.333333333333,
                         "y":134.666666666667
                        }, 
                        {
                         "x":-127.333333333333,
                         "y":70.6666666666667
                        }, 
                        {
                         "x":-351.333333333333,
                         "y":70.6666666666667
                        }, 
                        {
                         "x":-351.333333333333,
                         "y":294.666666666667
                        }, 
                        {
                         "x":-223.333333333333,
                         "y":294.666666666667
                        }, 
                        {
                         "x":-223.333333333333,
                         "y":230.666666666667
                        }, 
                        {
                         "x":-127.333333333333,
                         "y":230.666666666667
                        }, 
                        {
                         "x":-127.333333333333,
                         "y":358.666666666667
                        }, 
                        {
                         "x":0.666666666666686,
                         "y":358.666666666667
                        }, 
                        {
                         "x":0.666666666666686,
                         "y":422.666666666667
                        }, 
                        {
                         "x":-447.333333333333,
                         "y":422.666666666667
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":415.333333333333,
                 "y":-6.66666666666667
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":3,
 "nextobjectid":2,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.10.2",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/LevelTiles.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":"1.10",
 "width":15
}
```

Hier ist alles drin, was Python wissen muss. Genauer gesagt geht es um den Punkt “Polyline”. Dort sind X und Y Koordinaten gespeichert, die PyGame braucht. Das sind unsere Wegpunkte. Alles was wir also jetzt noch tun müssen ist diesen Content aus der JSON Datei zu extrahieren und einzubinden. 

Dafür importieren wir das json package in PyGame hinein und initialisieren die JSON in einer Variable.

Erstmal geben wir der World Klasse die JSON Datei mit und verwalten diese dann in der entsprechenden Klasse von vorhin.

```python
#maingame.py

#load json data for level
with open('levels/level.tmj') as file:
    world_data = json.load(file)

#World Gruppe
world = World(world_data, map_image)
```

Ich habe folgende Änderungen an der World Klasse vorgenommen:

```python
#world.py
import pygame

class World():
    def __init__(self, data, map_image):
        self.waypoints = []
        self.level_data = data
        self.image = map_image

    def process_data(self):
        #Das JSON nach dem Sektor polyline durchsuchen und zurückgeben
        for layer in self.level_data["layers"]:
            if layer["name"] == "waypoints":
                for obj in layer["objects"]:
                    waypoint_data = obj["polyline"]

    def process_waypoints(self, data):
        #Die einzelnen Wegpunkte raussuchen und als Wegpunkt speichern
        for point in data: 
            temp_x = point.get("x")
            temp_y = point.get("y")
            self.waypoints.append((temp_x, temp_y))

    def draw(self, surface):
        surface.blit(self.image, (0,0))
```

Zusammengefasst passiert hier folgendes:

- `process-data` durchsucht das json nach der Sektion polyline und gibt das Ergebnis zurück.
- `process_waypoints` durchsucht das Ergebnis weiter nach den genauen Koordinaten und füllt dann eine Liste mit dem Namen `self.waypoints` .
- Diese Liste ist im Endergebnis genau das Gleiche wie unsere manuell eingetragenen Koordinaten aus dem Artikel [Gegner AI](https://nico-puelacher-fi.vercel.app/posts/post-11).

Der letzte Schritt ist diese neuen Wegpunkte an den Gegner zu übermitteln. Das machen wir, indem wir dem Gegner nicht die manuelle Liste geben (die lösche ich jetzt auch, die brauchen wir nicht mehr) sondern unsere neu generierte.

```python
enemy = Enemy(world.waypoints, enemy_image)

...
#Auch in der Gameloop müssen wir die Koordinaten anpassen
world.draw(screen)
pygame.draw.lines(screen, "grey0", False, world.waypoints)
```

Und siehe da:

![Test 3](/articlecontents/Artikel13/Test3.png)

Zusammen mit Tiled und dem export von JSON können wir jetzt so viele Level bauen wir wir möchten. Wie man die Level jetzt wechselt und in das Spiel hinein und wieder hinauslädt wird teil eines anderen Artikels werden. 

---

# Schlusswort

Level Editoren sind schon was Feines. Sie vereinfachen dem Entwickler das skalieren der Spiele ungemein und selbst für PyGame gibt es entsprechende Lösungen, wie eben Tiled.






