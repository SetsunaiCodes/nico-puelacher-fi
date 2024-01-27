---
title: Zelluläre Automaten
des: In diesem Artikel arbeite ich zusammen mit 2 Online Quellen eine Möglichkeit aus fallenden Sand in PyGame darzustellen.
date: 2024-01-26
imagepath: articlesheads/Artikel24.jpg
id: Exkurse
topic: "03"
emote: ⏳
---
# Einleitung

Wir bekamen den Auftrag 2 Videos von Dan Shiffman zu schauen, die sich mit dem Thema **“Wie simuliere ich fallenden Sand?”** und dem Thema **“Zellulare Autoamten”** beschäftigen. Was diese Videos vermitteln und was ich daraus mitnehme schildere ich in diesem Artikel.

# Zelluläre Automaten

Nachdem ich gelernt habe, wie man “Automata” wirklich ausspricht…

![Automata](/articlecontents/Artikel24/Automata.png)

jaaaa…

war ich direkt vollkommen fasziniert, von den Dingen, die mir Dan Shiffman beibringen wollte.

Der zelluläre Atamutu stammt aus der Feder von **Stephen Wolfram**, der im Rahmen seines Buches **“A new kind of Scienes”** publizieren wollte, was er erforscht hat. Durch zelluläre Automaten entstehen so schicke Werke, wie diese hier:

![Test1](/articlecontents/Artikel24/Test1.png)

## Was ist ein zellulärer Automat?

Teilen wir den Namen für diese Definition einfach mal auf. 

***Woher stammt das “zellulär”?***

Naja, mal angenommen das hier ist eine Zelle:

![Zelle.jpg](/articlecontents/Artikel24/Zelle.jpg)

In diesem Modell können Zellen mehrere Zustände annehmen. Im simpelsten Falle 0 oder 1. Damit unsere Zelle nicht so einsam sein muss, lebt diese in einer “Nachbarschaft”. Im Kontext der Nachbarschaften entscheidet sich auch, ob hier ein eindimensionaler zellulärer Automat, oder ein zweidimensionaler zellulärer Automat vorliegt. Eine Nachbarschaft besteht wie der Name bereits verlauten lässt, aus den direkten Nachbarn der Zelle. 

![Schaubild1.png](/articlecontents/Artikel24/Schaubild1.png)

Im Falle eines eindimensionalen ZA hat die Zelle maximal 2 Nachbarn. Einen links und einen rechts. Im Falle eines zweidimensionalen ZAs kann unsere Zelle bis zu 8 Nachbarn gleichzeitig haben.

![Schaubild2.png](/articlecontents/Artikel24/Schaubild2.png)

Das hier ist in der Theorie ein ZA. In seiner simpelsten Form. Viel interessanter ist ja aber unter welchen Regeln sich die Einträge verändern.

## Alles eine Frage der Möglichkeiten

Bei einer eindimensionalen Nachbarschaft hätte ich also 8 verschiedene Möglichkeiten, welche Resultate ich erhalten könnte:

000

001

010

100

101

011

110

111

Es gibt immer 2 Möglichkeiten, für 3 verschiedene Werte, daher kommt man auf 8 Möglichkeiten, da  $2^3 = 8$ .

## Das Regelwerk

Wolfram beschreibt folgende Regeln für die verschiedenen Kombinationsmöglichkeiten von Dreierpaaren:

000 =  0

001 = 1

010 = 0

011 = 0

100 = 1

101 = 1

110 = 0

111 = 1 

So lässt sich folgender ZA nach dem Regelwerk umstellen:

Generation 0 = 1001010

Generation 1 = N11010N

Anmerkung: N steht in diesem Fall für NULL, da die Zelle leer bleibt, weil kein Dreierpaar gebildet werden kann. Man könnte die Ecken auf verschiedene Art und Weise füllen, im Video wird sich dafür entschieden die Zustände einfach erstmal zu übernehmen.

“***Wie kommen die Regeln eigentlich zustande?”***

Unter der Bedingung, dass die neuen Generationen immer untereinander gesetzt werden und der weiteren Bedingung, dass Generation 0 wie folgt aussieht:

00100

würde dieses Ergebnis entstehen:

![Untitled](/articlecontents/Artikel24/Test2.png)

Ein Wolfram ZA!

Dieser ZA unterliegt 256 verschiedenen Regeln. Je nachdem welche ich wähle kommt ein anderes Ergebnis raus. Alle Regeln sind auf der Seite [mathworld.wolfram.com](http://mathworld.wolfram.com) zu finden.

Oben gezeigt ist Regel 178. Wie ich darauf komme?

Schreiben wir die Regeln mal nebeneinander und erinnern uns an das erste Semester GDI, wo es darum ging Binärzahlen ins dezimale System zu konvertieren:

10110010  = 178 

AHAAAAAAA. Sehr schlau. Deswegen kann es auch nur maximal 256 Regeln geben. 

Es ist tatsächlich schlau mal einen Blick auf die Seite zu wagen, denn was dort für Ergebnisse entstehen können, ist sehr genial

# Das will ich auch machen!

Dieses Video hat mich so fasziniert, dass ich fallenden Sand in PyGame implementieren möchte. Dazu nehme ich mir das zweite VIdeo zur Hilfe und schaue, ob ich das schaffen kann. Im folgenden schildere ich die Implementierung.

## Wie kriege ich dieses System zu fallendem Sand?

Das ist “eigentlich” ganz einfach formuliert. Angenommen ich nehme eine Generation während eine 1 belegt und eine 0 frei ist. Wenn ich also Gravitation und Mouse Tracking hinzufüge und dafür sorge, dass man mit einem Klick eine 1 in einem zweidimensionalen ZA platzieren kann, die solange fällt, bis sie auf eine 1 trifft habe ich “fallenden Sand”. 

Ich habe wie bereits erwähnt Erfahrung darin Platformer Games zu bauen, das bedeutet, dass ich eigentlich wissen müsste, wie man Gravitation in PyGame implementiert.

## Die Konfiguration

Ich werde das gesamte Programm in eine einzige Datei schreiben, in der Hoffnung, dass es nicht allzu unübersichtlich wird. Des Weiteren werde ich NumPy benutzen. Eine Library, die in der Lage ist sehr gut mit mehrdimensionalen Listen und Arrays zu arbeiten. Wenn man sich dieses Projekt also selbst anschauen möchte, muss man neben PyGame auch Numpy installieren.

```python
pip install numpy
```

## Der Init Bereich

```json
WIDTH, HEIGHT = 600,600
screen = pygame.display.set_mode((WIDTH,HEIGHT))
pygame.display.set_caption("Sand Simulation")
WHITE= (255,255,255)
SAND_COLOR=(194, 178, 250)
T=8 #Size of one sand piece
```

Klassisches wie Größe des Fensters, die Farbe Weiß, die Farbe des Sandes, der Titel der Anwendung.

## Die Klasse Grid

Da ich für dieses Projekt Numpy benutze kann ich ein Gridsystem einfach wie folgt erstellen:

```python
class Grid:
    def __init__(self):
        self.grid=np.zeros((WIDTH*2,HEIGHT+T))
        self.position=[]
```

In Position werde ich die von der Maus platzierten “Sandkörner” losschicken, damit diese nach unten Fallen.

## Sandkörner der Oberfläche hinzufügen

```python
#Sand der Liste positions hinzufügen.
    def addSand(self,pointX, pointY):
        #Wenn sich der Mausezeiger innerhalb des Fensters befindet (und geklickt wird)
        if pointX>=0 and pointX<=WIDTH and pointY>=0 and pointY<=HEIGHT:
            if self.grid[pointX][pointY]==0:
                self.grid[pointX][pointY]=1
                self.position.append((pointX,pointY))
```

Da wir jetzt in einer zweidimensionalen Liste sind, müssen wir immer mit X und Y Koordinaten arbeiten. 

## Die Gravitation

Das ist der schwerste Punkt, wobei ich mir vorstellen kann, dass ich einfach nur sehr viel Code schreiben muss. Was passieren sollte, habe ich oben bereits geschrieben.

```python
def update_position(self):
        for points in self.position:
            listpoints = list(points)
            self.position.remove(points)

            # Überprüfen, ob die Zelle unterhalb der aktuellen Position leer ist
            if points[1] >= HEIGHT - T:
                self.position.append(points)
            
            # Fall: Die Zelle unterhalb der aktuellen Position ist leer
            elif self.grid[points[0]][points[1] + T] == 0:
                # Aktualisiere das Gitter und die Position des Sandpartikels
                self.grid[points[0]][points[1]] = 0
                self.grid[points[0]][points[1] + T] = 1
                listpoints[1] += T
                points = tuple(listpoints)
                self.position.append(points)
            
            # Fall: Die Zelle unterhalb der aktuellen Position ist bereits belegt
            elif self.grid[points[0]][points[1] + T] == 1:
                # Überprüfen der umliegenden Zellen
                if (self.grid[points[0] + T][points[1] + T] == 1)
				and (self.grid[points[0] - T][points[1] + T] == 1):
                    # Wenn beide umliegenden Zellen belegt sind, 
					# behalte die aktuelle Position bei
                    self.position.append(points)
                    
                elif (self.grid[points[0] + T][points[1] + T] == 1)
				and (self.grid[points[0] - T][points[1] + T] == 0):
                    # Wenn nur die rechte obere Zelle belegt ist, 
					# bewege das Sandpartikel nach links oben
                    self.grid[points[0]][points[1]] = 0
                    self.grid[points[0] - T][points[1] + T] = 1
                    listpoints[0] -= T
                    listpoints[1] += T
                    points = tuple(listpoints)
                    self.position.append(points)
                    
                elif (self.grid[points[0] + T][points[1] + T] == 0) 
				and (self.grid[points[0] - T][points[1] + T] == 1):
                    # Wenn nur die linke obere Zelle belegt ist, 
				    # bewege das Sandpartikel nach rechts oben
                    self.grid[points[0]][points[1]] = 0
                    self.grid[points[0] + T][points[1] + T] = 1
                    listpoints[0] += T
                    listpoints[1] += T
                    points = tuple(listpoints)
                    self.position.append(points)
                    
                else:
                    # Wenn beide umliegenden Zellen leer sind, 
					# bewege das Sandpartikel zufällig nach links oder rechts oben
                    self.grid[points[0]][points[1]] = 0
                    a = random.randint(0, 1)
                    if a == 0:
                        a = -1
                    self.grid[points[0] + a * T][points[1] + T] = 1
                    listpoints[0] += a * T
                    listpoints[1] += T
                    points = tuple(listpoints)
                    self.position.append(points)
```

Ich habe hiermit probiert wirklich alle Eventualitäten abzudecken.

## Sandkörner anzeigen

```python
def draw(self, screen):
        for points in self.position:
            pygame.draw.rect(screen, SAND_COLOR, (points[0],points[1],T,T), 0)       
```

## Die Gameloop

```python
def main():
    run= True
    clock= pygame.time.Clock()
    
    sandbox= Grid()
    
    while run:
        clock.tick(30)
        screen.fill((0,0,0))
        for event in pygame.event.get():
            if event.type== pygame.QUIT:
                run= False
            
            elif pygame.mouse.get_pressed()[0]:
                pos=pygame.mouse.get_pos()
                btn=pygame.mouse
								# Modulo T nehmen, damit das Gridsystem eingehalten wird
                sandbox.addSand(pos[0]-pos[0]%T,pos[1]-pos[1]%T)
        
        sandbox.update_position()
        sandbox.draw(screen)
        
                
               
        pygame.display.update()
    pygame.quit()
    
main()
```

## Das Ergebnis

Ich sitze seit geschlagenen 10 Minuten staunend vor meinem Bildschirm. Es ist wunderschön.

[Sand.mp4](/articlecontents/Artikel24/Sand.mp4)

---

# Schlusswort

Das war fast schon cooler als das eigentliche Projekt. Bitte mehr davon. 👍🏻