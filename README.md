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

![ScreenShot](Screenshots/worklog_overview.PNG)



