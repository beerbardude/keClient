# keClient

## Einleitung

Das keClient Projekt stellt die Client Seite für eine Known Error Datenbank dar.
Fehler werden vom Express Server abgerufen und gerendert.

Neue Fehler und neue Worklogs zu bestehenden Fehlern können erfasst und auf dem Server gespeichert werden.

Das dazugehörige Projekt für die Server Seite ist unter folgendem Link zu finden:

[Pojekt keServer](https://github.com/ibwgr/keServer)

## Entwicklung

Als Grundlage für den Client wird Node.js mit [gulp](http://gulpjs.com/) verwendet.

Weitere Libraries und Erweiterungen die bei der Entwicklung zum Zug kamen:

- [Bootstrap](http://getbootstrap.com/) - Hauptsächlich für Design verwendet
- [jquery](https://jquery.com/)  - Abhängigkeiten von Bootstrap Tables zu jquery
- [datatables.net](https://datatables.net/)  - jquery Plugin für erweiterte Table Funktionen
- [datatables.net-bs](https://datatables.net/manual/styling/bootstrap) - Bootstrap Styling für Datatables
- [request](https://github.com/request/request)  - Einfache Lösung um http calls auszuführen

## Installation

Alle nötigen Dependencies wurden im package.json File erfasst. Nach dem Pull können aus dem Projekt mit yarn install die benötigten Ergänzungen installiert werden.

Sollten hierbei unerwartet Probleme auftauchen, können die Module auch manuell installiert werden:

```
npm install bootstrap@3

npm install jquery

npm install datatables.net

npm install datatables.net-bs

npm install gulp

npm install request
```

## Starten des Servers

Ist die Installation abgeschlossen, kann der Server mit dem Befehl gulp gestartet werden.
WICHTIG: Ist der gulp Befehl nicht als Variable im OS definiert, muss in den node_modules/.bin Folder gewechselt werden.

Der Server ist läuft auf localhost:8008. Um direkt auf die Startseite zu gelangen kann http://localhost:8008/src aufgerufen werden.

## GUI und Funktionen

Die Startseite (/src) sieht folgendermassen aus:

![ScreenShot](Screenshots/start_page.PNG)

Der Title eines jeweiligen Known Errors ist ein Link der in eine Detail View wechselt, in welcher die erfassten Worklogs für den spezifischen Known Error angezeigt werden:

![ScreenShot](Screenshots/worklogs_overview.PNG)

### Suchfunktion

Um eine Suche auszuführen, kann der gewünschte Text im markierten Suchfeld in der navbar eingegeben werden. Die Suche wird ausgeführt sobald die Enter Taste betätigt wird. Es werden der Titel der Known Errors sowie der Titel und die Beschreibung der Worklogs durchsucht.

![ScreenShot](Screenshots/search_function.png)

### Hinzufügen eines neuen Known Errors

Ein neuer Eintrag für einen Known Error kann direkt auf der Startseite hinzugefügt werden. Dazu muss im Title Feld ein Text erfasst werden und die gewünschten Werte in den Drop Down Feldern ausgewählt werden. Sobald der "Add" Link in der navbar angeklickt wird, wird der erfasst Text als Known Error gespeichert.

![ScreenShot](Screenshots/add_ke.png)

### Filtern und sortieren, Anzeige anpassen

Filter können über die Drop Down Felder am unteren Ende der Seite ausgewählt werden. Die Kombination von mehreren Filtern ist möglich.
Die Sortier Funktion befindet sich in den Table Headers.

Über das "Show x entries" Menü kann eingestellt werden, was für eine Anzahl Known Errors auf der Startseite angezeigt werden soll.
Die Navigation für die nächste Seite befindet sich unten rechts

![ScreenShot](Screenshots/filter_sort.PNG)

### Hinzufügen eines neuen Worklogs

Um einen neuen Worklog zu erfassen, muss in die Detailansicht vom Known Error gewechselt werden (Klick auf "Title" des entsprechenden Fehlers). In der Detailansicht kann auf "Add Worklog" geklickt werden. Dies klappt eine Eingabemaske auf. Dort können die gewünschten Daten erfasst und mit dem Klicken auf "Save" gespeichert werden

![ScreenShot](Screenshots/add_wl.PNG)

### Allgemeine Infos zu den Funktionen

Um den Status eines bestehenden Known Errors anzupassen, muss ein neuer Worklog erfasst werden. Eine Statusänderung ohne ein Update (in Form eines Worklog Eintrags) ist NICHT möglich.

Der Title eines Known Errors muss "Unique" sein. Bei den Worklog Einträgen gibt es diese Einschränkung nicht.

WICHTIG: Einmal erfasste Einträge können nicht mehr geändert werden. Nur der Status eines Known Errors kann nach Erfassung angepasst werden.

Dies ist bewusst so umgesetzt, damit nicht nachträglich die History eines Known Errors verändert werden kann.
